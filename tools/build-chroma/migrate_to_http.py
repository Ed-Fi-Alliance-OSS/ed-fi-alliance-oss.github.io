"""
Migrate ChromaDB collection to remote instance via HTTP endpoint with enhanced reliability.

This script connects to both local and remote ChromaDB instances and copies
all documents, embeddings, and metadata from the local collection to the remote one.
Enhanced with:
- Automatic retry logic with exponential backoff
- State tracking for resumption after failures
- Health check polling
- Configurable batch size

Usage:
    python migrate_to_http.py --remote-url https://your-chroma-endpoint.azurecontainerapps.io
"""

import argparse
import chromadb
from chromadb.config import Settings
import sys
from typing import Optional
import urllib3
import ssl
import os
import json
import time
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type

# Disable SSL warnings for corporate proxy
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Bypass SSL verification (for corporate proxies)
ssl._create_default_https_context = ssl._create_unverified_context

# Default settings
LOCAL_CHROMA_PATH = "./chroma_db"
LOCAL_COLLECTION = "ed-fi-docs"
BATCH_SIZE = 500  # Balanced for HTTP overhead vs failure granularity
STATE_FILE = "migration_state.json"
HTTP_TIMEOUT = 300  # 5 minutes per request


def load_migration_state(state_file: str) -> dict:
    """Load migration state from file."""
    if os.path.exists(state_file):
        try:
            with open(state_file, 'r') as f:
                state = json.load(f)
                print(f"📂 Loaded migration state: {state['uploaded']:,} documents already uploaded")
                return state
        except Exception as e:
            print(f"⚠️  Failed to load state file: {e}")
    return {"uploaded": 0, "failed_batches": []}


def save_migration_state(state_file: str, uploaded: int, failed_batches: list):
    """Save migration state to file."""
    try:
        with open(state_file, 'w') as f:
            json.dump({
                "uploaded": uploaded,
                "failed_batches": failed_batches,
                "timestamp": time.time()
            }, f)
    except Exception as e:
        print(f"⚠️  Failed to save state file: {e}")


def check_remote_health(client: chromadb.ClientAPI) -> bool:
    """Check if remote ChromaDB is healthy."""
    try:
        client.heartbeat()
        return True
    except Exception as e:
        print(f"⚠️  Health check failed: {e}")
        return False


def connect_local_chroma(path: str) -> chromadb.ClientAPI:
    """Connect to local persistent ChromaDB."""
    print(f"📁 Connecting to local ChromaDB at: {path}")
    try:
        client = chromadb.PersistentClient(
            path=path,
            settings=Settings(
                anonymized_telemetry=False,
                allow_reset=False
            )
        )
        print("✓ Local ChromaDB connected")
        return client
    except Exception as e:
        print(f"✗ Failed to connect to local ChromaDB: {e}")
        sys.exit(1)


def connect_remote_chroma(url: str, api_key: Optional[str] = None, timeout: int = HTTP_TIMEOUT) -> chromadb.ClientAPI:
    """Connect to remote ChromaDB via HTTP with timeout configuration."""
    print(f"🌐 Connecting to remote ChromaDB at: {url}")
    try:
        # Parse URL
        use_ssl = url.startswith("https://")
        host = url.replace("https://", "").replace("http://", "").rstrip("/")

        # Remove any path from host
        if "/" in host:
            host = host.split("/")[0]

        # Determine port - ChromaDB runs behind Azure Container Apps on standard HTTPS port
        if ":" in host:
            # Explicit port in URL
            port = int(host.split(":")[-1])
            host = host.split(":")[0]
        else:
            # Use standard ports
            port = 443 if use_ssl else 8000

        print(f"  Host: {host}")
        print(f"  Port: {port if port else '443 (HTTPS)' if use_ssl else '8000'}")
        print(f"  SSL: {use_ssl}")
        print(f"  Timeout: {timeout}s")

        settings = Settings(
            anonymized_telemetry=False,
            allow_reset=False,
            chroma_server_ssl_verify=False,  # Disable SSL verification for corporate proxies
            chroma_server_http_timeout=timeout
        )

        # Add authentication if provided
        if api_key:
            settings.chroma_client_auth_provider = "chromadb.auth.token.TokenAuthClientProvider"
            settings.chroma_client_auth_credentials = api_key

        # Try creating client
        client = chromadb.HttpClient(
            host=host,
            port=port,
            ssl=use_ssl,
            settings=settings
        )

        # Test connection
        print("  Testing heartbeat...")
        client.heartbeat()
        print("✓ Remote ChromaDB connected")
        return client
    except Exception as e:
        error_msg = str(e)
        print(f"✗ Failed to connect to remote ChromaDB: {error_msg}")

        # Provide more specific guidance
        if "404" in error_msg or "Not Found" in error_msg:
            print(f"   ⚠️  The endpoint is reachable but ChromaDB API not found.")
            print(f"   Possible causes:")
            print(f"      - ChromaDB not running in container")
            print(f"      - Wrong API path (check container logs)")
            print(f"      - Container needs port 8000 exposed")
        else:
            print(f"   Make sure the endpoint is accessible and ChromaDB is running")

        print(f"   Debug: Host={host}, Port={port}, SSL={use_ssl}")
        sys.exit(1)


@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=4, max=60),
    retry=retry_if_exception_type((Exception,)),
    reraise=True
)
def upload_batch_with_retry(remote_collection, batch_data: dict):
    """Upload a batch with automatic retry and exponential backoff."""
    remote_collection.add(**batch_data)


def migrate_collection(
    local_client: chromadb.ClientAPI,
    remote_client: chromadb.ClientAPI,
    collection_name: str,
    batch_size: int = BATCH_SIZE,
    recreate: bool = False,
    state_file: str = STATE_FILE,
    resume: bool = True
):
    """Migrate collection from local to remote with state tracking."""

    print(f"\n{'='*70}")
    print(f"Migrating Collection: {collection_name}")
    print(f"{'='*70}\n")

    # Load state if resuming
    state = {"uploaded": 0, "failed_batches": []} if not resume else load_migration_state(state_file)
    uploaded = state["uploaded"]
    failed_batches = state["failed_batches"]

    # Get local collection
    try:
        local_collection = local_client.get_collection(name=collection_name)
        local_count = local_collection.count()
        print(f"📊 Local collection has {local_count:,} documents")
    except Exception as e:
        print(f"✗ Failed to get local collection '{collection_name}': {e}")
        sys.exit(1)

    # Handle remote collection
    try:
        # Check if collection exists remotely
        try:
            remote_collection = remote_client.get_collection(name=collection_name)
            remote_count = remote_collection.count()
            print(f"📊 Remote collection already has {remote_count:,} documents")

            if recreate:
                print(f"⚠️  Recreating remote collection (deleting existing data)...")
                remote_client.delete_collection(name=collection_name)
                remote_collection = remote_client.create_collection(
                    name=collection_name,
                    metadata=local_collection.metadata
                )
                print(f"✓ Remote collection recreated")
                uploaded = 0  # Reset state
                failed_batches = []
            elif resume and uploaded > 0:
                print(f"↻ Resuming migration from {uploaded:,} documents")
            else:
                print(f"⚠️  Remote collection exists. Use --recreate to overwrite.")
                user_input = input("Continue and append data? [y/N]: ")
                if user_input.lower() != 'y':
                    print("Migration cancelled.")
                    sys.exit(0)
        except:
            # Collection doesn't exist, create it
            print(f"📝 Creating remote collection...")
            remote_collection = remote_client.create_collection(
                name=collection_name,
                metadata=local_collection.metadata
            )
            print(f"✓ Remote collection created")

    except Exception as e:
        print(f"✗ Failed to prepare remote collection: {e}")
        sys.exit(1)

    # Get all data from local collection
    print(f"\n📥 Fetching all documents from local collection...")
    try:
        all_data = local_collection.get(
            include=["embeddings", "documents", "metadatas"]
        )

        ids = all_data["ids"]
        embeddings = all_data["embeddings"]
        documents = all_data["documents"]
        metadatas = all_data["metadatas"]

        total_docs = len(ids)
        print(f"✓ Retrieved {total_docs:,} documents")

    except Exception as e:
        print(f"✗ Failed to fetch local data: {e}")
        sys.exit(1)

    # Upload in batches
    print(f"\n📤 Uploading to remote ChromaDB (batch size: {batch_size})...")

    batch_num = 0
    for i in range(uploaded, total_docs, batch_size):
        batch_num += 1
        batch_ids = ids[i:i + batch_size]
        batch_embeddings = embeddings[i:i + batch_size] if embeddings is not None else None
        batch_documents = documents[i:i + batch_size] if documents is not None else None
        batch_metadatas = metadatas[i:i + batch_size] if metadatas is not None else None

        batch_data = {
            "ids": batch_ids,
            "embeddings": batch_embeddings,
            "documents": batch_documents,
            "metadatas": batch_metadatas
        }

        try:
            upload_batch_with_retry(remote_collection, batch_data)
            uploaded += len(batch_ids)

            # Save state periodically
            save_migration_state(state_file, uploaded, failed_batches)

            # Progress indicator
            progress = (uploaded / total_docs) * 100
            print(f"  Progress: {uploaded:,}/{total_docs:,} ({progress:.1f}%)", end='\r')

            # Health check every 10 batches
            if batch_num % 10 == 0:
                if not check_remote_health(remote_client):
                    print(f"\n⚠️  Health check failed at batch {batch_num}")
                    raise ConnectionError("Remote ChromaDB unhealthy")

        except Exception as e:
            failed_batches.append(i)
            save_migration_state(state_file, uploaded, failed_batches)
            print(f"\n✗ Batch {batch_num} failed after retries: {e}")
            print(f"   State saved. Rerun with same command to resume.")
            sys.exit(1)

    # Clean up state file on success
    if os.path.exists(state_file):
        os.remove(state_file)

    print(f"\n\n{'='*70}")
    print(f"✓ Migration Complete!")
    print(f"{'='*70}")
    print(f"  Uploaded: {uploaded:,} documents")
    if failed_batches:
        print(f"  Failed batches: {len(failed_batches)}")
    print(f"  Remote count: {remote_collection.count():,}")
    print()


def verify_migration(
    remote_client: chromadb.ClientAPI,
    collection_name: str,
    expected_count: int
):
    """Verify the migration succeeded."""
    print(f"\n🔍 Verifying migration...")

    try:
        remote_collection = remote_client.get_collection(name=collection_name)
        actual_count = remote_collection.count()

        if actual_count == expected_count:
            print(f"✓ Verification passed: {actual_count:,} documents")

            # Test a sample query
            results = remote_collection.query(
                query_texts=["test query"],
                n_results=1
            )
            print(f"✓ Sample query successful")
            return True
        else:
            print(f"⚠️  Count mismatch: Expected {expected_count:,}, got {actual_count:,}")
            return False

    except Exception as e:
        print(f"✗ Verification failed: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(
        description="Migrate ChromaDB collection to remote instance via HTTP with retry logic"
    )
    parser.add_argument(
        "--remote-url",
        required=True,
        help="Remote ChromaDB endpoint URL (e.g., https://fiona-vector-search.azurecontainerapps.io)"
    )
    parser.add_argument(
        "--local-path",
        default=LOCAL_CHROMA_PATH,
        help=f"Path to local ChromaDB directory (default: {LOCAL_CHROMA_PATH})"
    )
    parser.add_argument(
        "--collection",
        default=LOCAL_COLLECTION,
        help=f"Collection name to migrate (default: {LOCAL_COLLECTION})"
    )
    parser.add_argument(
        "--api-key",
        help="API key for remote ChromaDB authentication (if required)"
    )
    parser.add_argument(
        "--batch-size",
        type=int,
        default=BATCH_SIZE,
        help=f"Number of documents per batch (default: {BATCH_SIZE})"
    )
    parser.add_argument(
        "--timeout",
        type=int,
        default=HTTP_TIMEOUT,
        help=f"HTTP timeout in seconds (default: {HTTP_TIMEOUT})"
    )
    parser.add_argument(
        "--recreate",
        action="store_true",
        help="Delete and recreate remote collection if it exists"
    )
    parser.add_argument(
        "--no-resume",
        action="store_true",
        help="Do not resume from previous state (start fresh)"
    )
    parser.add_argument(
        "--state-file",
        default=STATE_FILE,
        help=f"Path to state file for resumption (default: {STATE_FILE})"
    )
    parser.add_argument(
        "--verify",
        action="store_true",
        default=True,
        help="Verify migration after completion (default: True)"
    )

    args = parser.parse_args()

    # Connect to both instances
    local_client = connect_local_chroma(args.local_path)
    remote_client = connect_remote_chroma(args.remote_url, args.api_key, args.timeout)

    # Get expected count for verification
    local_collection = local_client.get_collection(name=args.collection)
    expected_count = local_collection.count()

    # Migrate
    migrate_collection(
        local_client=local_client,
        remote_client=remote_client,
        collection_name=args.collection,
        batch_size=args.batch_size,
        recreate=args.recreate,
        state_file=args.state_file,
        resume=not args.no_resume
    )

    # Verify
    if args.verify:
        success = verify_migration(
            remote_client=remote_client,
            collection_name=args.collection,
            expected_count=expected_count
        )
        sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
