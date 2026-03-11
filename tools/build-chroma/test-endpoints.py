#!/usr/bin/env python3
"""
Test ChromaDB endpoints after deployment.
Tests both raw HTTP endpoints and semantic query functionality.
"""
import argparse
import logging
import sys
from urllib.parse import urlparse

import chromadb
from chromadb.config import Settings
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def test_connection(server_url: str) -> bool:
    """Test basic connection to ChromaDB server."""
    logger.info(f"Testing connection to {server_url}")

    parsed = urlparse(server_url)
    host = parsed.hostname or 'localhost'
    port = parsed.port or (443 if parsed.scheme == 'https' else 8000)
    ssl = parsed.scheme == 'https'

    try:
        client = chromadb.HttpClient(
            host=host,
            port=port,
            ssl=ssl,
            settings=Settings(
                anonymized_telemetry=False,
                allow_reset=False,
                chroma_server_ssl_verify=False
            )
        )

        # Test heartbeat
        heartbeat = client.heartbeat()
        logger.info(f"✓ Heartbeat: {heartbeat}")

        # List collections
        collections = client.list_collections()
        logger.info(f"✓ Collections found: {len(collections)}")
        for coll in collections:
            logger.info(f"  - {coll.name}: {coll.count()} documents")

        return len(collections) > 0

    except Exception as e:
        logger.error(f"✗ Connection failed: {e}")
        return False


def test_semantic_query(server_url: str, query: str, n_results: int = 5) -> bool:
    """Test semantic search functionality."""
    logger.info(f"\nTesting semantic query: '{query}'")

    parsed = urlparse(server_url)
    host = parsed.hostname or 'localhost'
    port = parsed.port or (443 if parsed.scheme == 'https' else 8000)
    ssl = parsed.scheme == 'https'

    try:
        # Initialize embeddings (same as used during build)
        logger.info("Loading embedding model...")
        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        # Connect to remote ChromaDB
        logger.info(f"Connecting to ChromaDB at {server_url}")
        client = chromadb.HttpClient(
            host=host,
            port=port,
            ssl=ssl,
            settings=Settings(
                anonymized_telemetry=False,
                allow_reset=False,
                chroma_server_ssl_verify=False
            )
        )

        # Create vectorstore interface
        vs = Chroma(
            client=client,
            collection_name="ed-fi-docs",
            embedding_function=embeddings
        )

        # Perform similarity search
        logger.info(f"Searching for {n_results} results...")
        docs = vs.similarity_search(query, k=n_results)

        logger.info(f"✓ Found {len(docs)} results:\n")
        for i, doc in enumerate(docs, 1):
            logger.info(f"Result {i}:")
            logger.info(f"  Source: {doc.metadata.get('source', 'N/A')}")
            logger.info(f"  Preview: {doc.page_content[:200]}...")
            logger.info("")

        return len(docs) > 0

    except Exception as e:
        logger.error(f"✗ Semantic query failed: {e}")
        import traceback
        traceback.print_exc()
        return False


def test_specific_document(server_url: str, doc_id: str = None) -> bool:
    """Test retrieving a specific document by ID."""
    logger.info(f"\nTesting document retrieval")

    parsed = urlparse(server_url)
    host = parsed.hostname or 'localhost'
    port = parsed.port or (443 if parsed.scheme == 'https' else 8000)
    ssl = parsed.scheme == 'https'

    try:
        client = chromadb.HttpClient(
            host=host,
            port=port,
            ssl=ssl,
            settings=Settings(
                anonymized_telemetry=False,
                allow_reset=False,
                chroma_server_ssl_verify=False
            )
        )

        collection = client.get_collection("ed-fi-docs")

        # If no specific ID, get first few documents
        if doc_id:
            result = collection.get(ids=[doc_id], include=["metadatas", "documents"])
        else:
            result = collection.get(limit=3, include=["metadatas", "documents"])

        logger.info(f"✓ Retrieved {len(result['ids'])} documents:")
        for i, doc_id in enumerate(result['ids']):
            logger.info(f"\nDocument {i+1}:")
            logger.info(f"  ID: {doc_id}")
            logger.info(f"  Metadata: {result['metadatas'][i]}")
            logger.info(f"  Content: {result['documents'][i][:150]}...")

        return len(result['ids']) > 0

    except Exception as e:
        logger.error(f"✗ Document retrieval failed: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(description='Test ChromaDB endpoints after deployment')
    parser.add_argument(
        '--server-url',
        default='http://localhost:8000',
        help='ChromaDB server URL (default: http://localhost:8000)'
    )
    parser.add_argument(
        '--query',
        default='How do I configure the ODS/API?',
        help='Test query for semantic search'
    )
    parser.add_argument(
        '--results',
        type=int,
        default=5,
        help='Number of results to return (default: 5)'
    )
    parser.add_argument(
        '--skip-query',
        action='store_true',
        help='Skip semantic query test (only test connection)'
    )

    args = parser.parse_args()

    logger.info("=" * 60)
    logger.info("ChromaDB Endpoint Testing")
    logger.info("=" * 60)

    # Test 1: Basic connection
    logger.info("\n[Test 1] Connection and Collections")
    logger.info("-" * 60)
    connection_ok = test_connection(args.server_url)

    if not connection_ok:
        logger.error("\n✗ Connection test failed - stopping here")
        sys.exit(1)

    # Test 2: Document retrieval
    logger.info("\n[Test 2] Document Retrieval")
    logger.info("-" * 60)
    docs_ok = test_specific_document(args.server_url)

    # Test 3: Semantic query (optional, takes longer)
    if not args.skip_query:
        logger.info("\n[Test 3] Semantic Query")
        logger.info("-" * 60)
        query_ok = test_semantic_query(args.server_url, args.query, args.results)
    else:
        logger.info("\n[Test 3] Semantic Query - SKIPPED")
        query_ok = True

    # Summary
    logger.info("\n" + "=" * 60)
    logger.info("Test Summary")
    logger.info("=" * 60)
    logger.info(f"Connection:  {'✓ PASS' if connection_ok else '✗ FAIL'}")
    logger.info(f"Documents:   {'✓ PASS' if docs_ok else '✗ FAIL'}")
    logger.info(f"Query:       {'✓ PASS' if query_ok else '⊘ SKIP' if args.skip_query else '✗ FAIL'}")

    if connection_ok and docs_ok and query_ok:
        logger.info("\n✓ All tests passed!")
        sys.exit(0)
    else:
        logger.error("\n✗ Some tests failed")
        sys.exit(1)


if __name__ == "__main__":
    main()
