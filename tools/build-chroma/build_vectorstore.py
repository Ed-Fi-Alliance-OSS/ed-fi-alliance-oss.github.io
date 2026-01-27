#!/usr/bin/env python3
"""
Build Chroma vector store from Docusaurus documentation export.

This script converts exported documentation JSON files into a Chroma vector database
with semantic embeddings. It expects the Docusaurus export plugin to produce
JSON files under a root folder (typically build/export/).

Usage:
    python tools/build-chroma/build_vectorstore.py \
        --source-docs ./build/export \
        --output-dir ./chroma_db \
        --collection-name ed-fi-docs \
        --embedding-model sentence-transformers/all-MiniLM-L6-v2 \
        --device cpu
"""

import argparse
import json
import logging
import os
from pathlib import Path
from typing import List, Optional

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
    output_dir: Path,
    collection_name: str,
    embedding_model: str,
    device: str,
    verbose: bool = False,
    limit_docs: int = 0
) -> int:
    logger = setup_logging(verbose)

    if not source_docs.exists():
        logger.error("Source docs path does not exist: %s", source_docs)
        return 1

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

    output_dir.mkdir(parents=True, exist_ok=True)

    logger.info("Building Chroma collection '%s' at %s", collection_name, output_dir)
    vs = Chroma(persist_directory=str(output_dir), collection_name=collection_name, embedding_function=embeddings)

    # Add documents in batches to avoid ChromaDB batch size limit
    batch_size = 5000
    for i in range(0, len(docs), batch_size):
        batch = docs[i:i+batch_size]
        vs.add_documents(batch)
        logger.info("Added batch %d-%d", i, min(i+batch_size, len(docs)))

    # Ensure persistence
    try:
        vs.persist()
    except Exception:
        pass

    logger.info("Completed: %d documents indexed", len(docs))
    return 0


def main():
    parser = argparse.ArgumentParser(description="Build Chroma vectorstore from Docusaurus export")
    parser.add_argument('--source-docs', required=True, help='Root export directory (e.g., build/export)')
    parser.add_argument('--output-dir', required=True, help='Output directory for Chroma persistence')
    parser.add_argument('--collection-name', default='ed-fi-docs', help='Chroma collection name')
    parser.add_argument('--embedding-model', default='sentence-transformers/all-MiniLM-L6-v2', help='Embedding model')
    parser.add_argument('--device', default='cpu', choices=['cpu', 'cuda'], help='Embedding device')
    parser.add_argument('--verbose', action='store_true', help='Verbose logging')
        parser.add_argument('--limit-docs', type=int, default=0, help='Limit to first N documents (0=unlimited, for testing)')
    args = parser.parse_args()

    source = Path(args.source_docs)
    out = Path(args.output_dir)
    rc = build_vectorstore(source, out, args.collection_name, args.embedding_model, args.device, args.verbose, args.limit_docs)
    exit(rc)


if __name__ == '__main__':
    main()
