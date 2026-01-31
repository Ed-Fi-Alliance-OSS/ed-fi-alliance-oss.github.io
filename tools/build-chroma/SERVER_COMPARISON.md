# ChromaDB Server Configuration Comparison

## Azure Container App (Production) vs Local Docker (Testing)

### Azure Container App Configuration

**Base Image:** `python:3.11-slim`

**ChromaDB Version:** `1.4.0`

**Startup:**
- Wrapper script (`wrapper.py`) adds Azure Monitor telemetry
- Launches ChromaDB via: `uvicorn.run("chromadb.app:app", host="0.0.0.0", port=8000)`
- Proxy headers enabled: `proxy_headers=True`
- Access logging enabled: `access_log=True`

**Environment Variables (from wrapper.py):**
```python
CHROMA_SERVER_HOST="0.0.0.0"           # Default if not set
CHROMA_SERVER_HTTP_PORT="8000"         # Default if not set
CHROMA_DATA_PATH="/data/v2026-01-14"   # Default in code, overridden by Azure env var
IS_PERSISTENT=(not documented)
CHROMA_LOG_LEVEL=(not documented)
APPLICATIONINSIGHTS_CONNECTION_STRING  # Azure Monitor telemetry
```

**Storage:**
- Azure Files share mounted at `/data`
- Data persists to subdirectories like `/data/docs-vectordb-{branch}` or `/data/docs-vectordb-ci-{sha}`
- Path controlled via `CHROMA_DATA_PATH` environment variable

**Dependencies:**
```
chromadb==1.4.0
fastapi
uvicorn
azure-monitor-opentelemetry
numpy<2
```

---

### Local Docker (Testing)

**Base Image:** `chromadb/chroma:latest` (official image)

**ChromaDB Version:** Latest (should match 1.4.0 for consistency)

**Startup:**
- Direct ChromaDB CLI: `chroma run --host localhost --port 8000 --path /data`
- No wrapper, no telemetry
- Standard ChromaDB defaults

**Environment Variables:**
```bash
CHROMA_DATA_PATH=/data  # Or custom path
```

**Storage:**
- Docker volume or bind mount to local directory
- Data persists to specified path

**Dependencies:**
- Whatever's included in `chromadb/chroma:latest`
- Should be similar to production

---

## Key Differences & Implications

### 1. **Server Startup Method**
- **Production:** uvicorn launches `chromadb.app:app` with custom wrapper
- **Local:** ChromaDB CLI command
- **Impact:** Both expose the same HTTP API, but production has Azure Monitor hooks

### 2. **Proxy Headers**
- **Production:** `proxy_headers=True` - handles Azure Container Apps ingress headers
- **Local:** Default settings
- **Impact:** Production correctly handles X-Forwarded-For, X-Forwarded-Proto from Azure ingress

### 3. **Data Path**
- **Production:** `/data/{environment-specific-subdir}/` via Azure Files
- **Local:** `/data/` or custom path
- **Impact:** Production supports multiple isolated environments on same mount

### 4. **Telemetry**
- **Production:** Azure Monitor OpenTelemetry automatically captures metrics/traces
- **Local:** No telemetry
- **Impact:** Production has observability; local is blind

### 5. **Python Version**
- **Both:** Python 3.11
- **Impact:** None - versions match

### 6. **ChromaDB Version**
- **Production:** Pinned to `1.4.0`
- **Local:** Should use `1.4.0` to match
- **Impact:** Must ensure version parity for consistent behavior

---

## Recommendations for Local Testing

### Option A: Use Production Container (Recommended)
```bash
# Build and run the production image locally
.\run-prod-container.ps1 -Port 8000 -DataPath ./test-data

# Then test
.\test-local-server.ps1 -ServerUrl http://localhost:8000
```

**Pros:**
- **Exact production environment** - same wrapper, same versions
- Same logging and startup behavior as Azure
- Tests the actual deployed code
- Easy to reproduce production issues

**Cons:**
- Requires Ed-Fi-Chatbot repo to be cloned
- Azure Monitor warnings (harmless without connection string)

### Option B: Use Official Image
```bash
docker run -d \
  -p 8000:8000 \
  -v chroma-data:/chroma/chroma \
  chromadb/chroma:1.4.0
```

**Pros:**
- Simple, official image
- Matches ChromaDB version
- No dependencies on other repos

**Cons:**
- No Azure Monitor wrapper
- Default data path differs
- Not identical to production

### Option C: Build Production Image Manually
```bash
cd Ed-Fi-Chatbot/apps/fiona-vector-search
docker build -t fiona-vector-search:local .
docker run -d \
  -p 8000:8000 \
  -v chroma-data:/data \
  -e CHROMA_DATA_PATH=/data \
  fiona-vector-search:local
```

**Pros:**
- Exact production environment
- Manual control over build

**Cons:**
- More manual steps
- Need to manage container lifecycle yourself

---

## HTTP Client Configuration

Both environments expose the same HTTP API:
- **Endpoint:** `http://localhost:8000` (local) or `https://{fqdn}` (production)
- **Heartbeat:** `/api/v1/heartbeat`
- **Collections:** `/api/v1/collections`
- **Protocol:** HTTP/1.1

Our `build_vectorstore.py` HTTP mode settings:
```python
settings = Settings(
    anonymized_telemetry=False,
    allow_reset=False,
    chroma_server_ssl_verify=False  # For corporate proxies
)

client = chromadb.HttpClient(
    host=host,
    port=port,
    ssl=use_ssl,
    settings=settings
)
```

This configuration should work identically against both local Docker and production Azure Container App.

---

## Testing Checklist

- [ ] Verify ChromaDB version matches (`1.4.0`)
- [ ] Test HTTP mode locally: `.\test-local-server.ps1 -ServerUrl http://localhost:8000`
- [ ] Verify collection creation via API
- [ ] Test batch uploads (500 docs)
- [ ] Confirm data persistence after container restart
- [ ] Test against production Azure endpoint (read-only query to verify compatibility)

---

## Notes

1. **HTTPS vs HTTP:** Production uses HTTPS (handled by Azure ingress), local uses HTTP
2. **Authentication:** Neither production nor local have authentication enabled
3. **Network:** Production is internet-accessible; local is localhost-only
4. **Persistence:** Both use file-based persistence (SQLite + parquet files)
