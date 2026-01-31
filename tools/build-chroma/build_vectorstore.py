#!/usr/bin/env python3
"""
Build Chroma vector store from Docusaurus documentation export.

This script converts exported documentation JSON files into a Chroma vector database
with semantic embeddings. It expects the Docusaurus export plugin to produce
JSON files under a root folder (typically build/export/).

Supports two modes:
- Local mode: Build vectorstore locally in a directory (default)
- HTTP mode: Build vectorstore directly on remote server via HTTP

Usage:
    # Local mode
    python tools/build-chroma/build_vectorstore.py \
        --source-docs ./build/export \
        --output-dir ./chroma_db \
        --collection-name ed-fi-docs \
        --embedding-model sentence-transformers/all-MiniLM-L6-v2 \
        --device cpu

    # HTTP mode
    python tools/build-chroma/build_vectorstore.py \
        --source-docs ./build/export \
        --server-url https://ci--fiona-vector-search.azurecontainerapps.io \
        --collection-name ed-fi-docs \
        --embedding-model sentence-transformers/all-MiniLM-L6-v2 \
        --device cpu \
        --batch-size 500
"""

import argparse
import json
import logging
import os
from pathlib import Path
from typing import List, Optional
import chromadb
from chromadb.config import Settings

from langchain_core.documents import Document
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma


def setup_logging(verbose: bool = False) -> logging.Logger:
    level = logging.DEBUG if verbose else logging.INFO
    logging.basicConfig(
        level=level,
        format='%(asctime)s - %(levelname)s - %(message)s'
    )
    return logging.getLogger(__name__)


def load_json_files(root: Path) -> List[Path]:
    files: List[Path] = []
    if not root.exists():
        return files
    for p in root.rglob('*.json'):
        files.append(p)
    return files


def extract_content(js: dict) -> Optional[str]:
    # Prefer common fields used by export plugin
    for key in (
        'content', 'markdown', 'md', 'text', 'body', 'html'
    ):
        val = js.get(key)
        if isinstance(val, str) and val.strip():
            return val
    # Fallback: join headings/sections if present
    if isinstance(js.get('sections'), list):
        parts = [s.get('content', '') for s in js['sections'] if isinstance(s, dict)]
        content = '\n\n'.join([p for p in parts if isinstance(p, str)])
        if content.strip():
            return content
    return None


def to_document(js: dict, rel_path: str) -> Optional[Document]:
    content = extract_content(js)
    if not content:
        return None
    meta = {}
    # capture helpful metadata if present
    for k in (
        'plugin', 'version', 'title', 'description', 'docPath', 'route', 'heading', 'id'
    ):
        if k in js and isinstance(js[k], (str, int, float, bool)):
            meta[k] = js[k]
    meta['source_path'] = rel_path
    return Document(page_content=content, metadata=meta)


def build_vectorstore(
    source_docs: Path,
    output_dir: Optional[Path],
    collection_name: str,
    embedding_model: str,
    device: str,
    verbose: bool = False,
    limit_docs: int = 0,
    server_url: Optional[str] = None,
    batch_size: int = 5000,
    http_timeout: int = 300
) -> int:
    logger = setup_logging(verbose)

    if not source_docs.exists():
        logger.error("Source docs path does not exist: %s", source_docs)
        return 1

    # Validate mode
    if server_url and output_dir:
        logger.error("Cannot specify both --server-url and --output-dir")
        return 1
    if not server_url and not output_dir:
        logger.error("Must specify either --server-url or --output-dir")
        return 1

    mode = "HTTP" if server_url else "Local"
    logger.info("Running in %s mode", mode)

    # Collect files from both docs and chunks subfolders if present
    candidates: List[Path] = []
    for sub in (source_docs / 'docs', source_docs / 'chunks', source_docs):
        candidates.extend(load_json_files(sub))
    # De-duplicate
    seen = set()
    files: List[Path] = []
    for f in candidates:
        if f not in seen:
            files.append(f)
            seen.add(f)

    if not files:
        logger.error("No JSON files found under %s", source_docs)
        return 2

    logger.info("Found %d JSON files", len(files))

    docs: List[Document] = []
    for f in files:
        try:
            with f.open('r', encoding='utf-8') as fh:
                js = json.load(fh)
            rel = str(f.relative_to(source_docs)) if f.is_relative_to(source_docs) else str(f)
            d = to_document(js, rel)
            if d:
                docs.append(d)
        except Exception as e:
            logger.warning("Skipping %s: %s", f, e)

    if not docs:
        logger.error("No valid documents could be constructed from export JSON")
        return 3

    # Limit documents for testing if specified (0 = unlimited)
    if limit_docs > 0 and len(docs) > limit_docs:
        logger.info("Limiting to first %d documents (total: %d)", limit_docs, len(docs))
        docs = docs[:limit_docs]

    logger.info("Preparing embeddings: %s on %s", embedding_model, device)
    embeddings = HuggingFaceEmbeddings(
        model_name=embedding_model,
        model_kwargs={"device": device},
        encode_kwargs={"normalize_embeddings": True}
    )

    # Initialize Chroma client based on mode
    if server_url:
        # HTTP mode - connect to remote server
        logger.info("Connecting to remote ChromaDB server: %s", server_url)
        use_ssl = server_url.startswith("https://")
        host = server_url.replace("https://", "").replace("http://", "").rstrip("/")

        # Remove any path from host
        if "/" in host:
            host = host.split("/")[0]

        # Determine port
        if ":" in host:
            port = int(host.split(":")[-1])
            host = host.split(":")[0]
        else:
            port = 443 if use_ssl else 8000

        logger.info("  Host: %s, Port: %d, SSL: %s", host, port, use_ssl)

        settings = Settings(
            anonymized_telemetry=False,
            allow_reset=False,
            chroma_server_ssl_verify=False  # For corporate proxies
        )

        client = chromadb.HttpClient(host=host, port=port, ssl=use_ssl, settings=settings)

        # Test connection
        try:
            client.heartbeat()
            logger.info("✓ Remote ChromaDB connection successful")
        except Exception as e:
            logger.error("✗ Failed to connect to remote ChromaDB: %s", e)
            return 4

        # Create or get collection
        try:
            # Try to get existing collection
            collection = client.get_collection(name=collection_name)
            logger.warning("Collection '%s' already exists with %d documents", collection_name, collection.count())
            logger.warning("Will append to existing collection. Use --recreate to start fresh.")
        except:
            # Create new collection
            collection = client.create_collection(name=collection_name)
            logger.info("Created new collection '%s'", collection_name)

        vs = Chroma(
            client=client,
            collection_name=collection_name,
            embedding_function=embeddings
        )
    else:
        # Local mode - persist to directory
        output_dir.mkdir(parents=True, exist_ok=True)
        logger.info("Building Chroma collection '%s' at %s", collection_name, output_dir)
        vs = Chroma(
            persist_directory=str(output_dir),
            collection_name=collection_name,
            embedding_function=embeddings
        )

    # Add documents in batches to avoid ChromaDB batch size limit
    # Use smaller batch size for HTTP mode to reduce timeout risk
    for i in range(0, len(docs), batch_size):
        batch = docs[i:i+batch_size]
        vs.add_documents(batch)
        logger.info("Added batch %d-%d", i, min(i+batch_size, len(docs)))

    # Ensure persistence and verify
    if server_url:
        logger.info("HTTP mode: data automatically persisted to remote server")
    else:
        logger.info("Persisting vectorstore to disk...")
        try:
            vs.persist()
            logger.info("Persist call completed")
        except AttributeError:
            # Newer versions of langchain-chroma may not have persist() method
            # Data is auto-persisted, so this is safe to ignore
            logger.info("No explicit persist method (auto-persisted)")
        except Exception as e:
            logger.error("Failed to persist vectorstore: %s", e)
            return 4

    # Verify collection was created and has documents
    try:
        collection = vs._client.get_collection(collection_name)
        count = collection.count()
        logger.info("Verification: collection contains %d embeddings", count)
        if count != len(docs):
            logger.warning("Mismatch: indexed %d docs but collection has %d embeddings", len(docs), count)
    except Exception as e:
        logger.error("Failed to verify collection: %s", e)
        return 5

    logger.info("Completed: %d documents indexed", len(docs))
    return 0


def main():
    parser = argparse.ArgumentParser(description='Build Chroma vectorstore from Docusaurus export')
    parser.add_argument('--source-docs', required=True, help='Path to exported docs folder')
    parser.add_argument('--output-dir', help='Output directory for Chroma persistence (local mode)')
    parser.add_argument('--server-url', help='Remote ChromaDB server URL (HTTP mode, e.g., https://ci--app.azurecontainerapps.io)')
    parser.add_argument('--collection-name', default='ed-fi-docs', help='Chroma collection name')
    parser.add_argument('--embedding-model', default='sentence-transformers/all-MiniLM-L6-v2', help='Embedding model')
    parser.add_argument('--device', default='cpu', choices=['cpu', 'cuda'], help='Embedding device')
    parser.add_argument('--batch-size', type=int, default=5000, help='Batch size for adding documents (recommend 500 for HTTP mode)')
    parser.add_argument('--http-timeout', type=int, default=300, help='HTTP timeout in seconds (HTTP mode only)')
    parser.add_argument('--verbose', action='store_true', help='Verbose logging')
    parser.add_argument('--limit-docs', type=int, default=0, help='Limit to first N documents (0=unlimited, for testing)')
    args = parser.parse_args()

    source = Path(args.source_docs)
    out = Path(args.output_dir) if args.output_dir else None
    rc = build_vectorstore(
        source,
        out,
        args.collection_name,
        args.embedding_model,
        args.device,
        args.verbose,
        args.limit_docs,
        args.server_url,
        args.batch_size,
        args.http_timeout
    )
    exit(rc)


if __name__ == '__main__':
    main()
