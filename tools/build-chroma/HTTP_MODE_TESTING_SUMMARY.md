# ChromaDB HTTP Mode Testing Summary

## Date

2026-01-31

## Objective

Test the ChromaDB HTTP mode build against a locally running production container to validate the complete workflow before GitHub Actions deployment.

## Test Environment

- **Container**: `fiona-vector-search:local` (built from `Ed-Fi-Chatbot/apps/fiona-vector-search`)
- **Port**: 8000
- **Data Path**: `./test-data`
- **ChromaDB Version**: 1.4.0
- **Wrapper**: Azure Monitor OpenTelemetry wrapper (`wrapper.py`)

## Test Execution

### Step 1: Build and Start Production Container

```powershell
.\run-prod-container.ps1 -Port 8000
```

**Results**:

- ✅ Container image built successfully
- ✅ Container started (ID: cd4b4937c54a)
- ✅ ChromaDB server initialized on 0.0.0.0:8000
- ✅ Wrapper logged environment configuration correctly
- ✅ Server responded to heartbeat checks

### Step 2: Run HTTP Mode Build Test

```powershell
.\test-local-server.ps1 -ServerUrl http://localhost:8000 -LimitDocs 10
```

**Results**:

- ✅ Connected to remote ChromaDB server at `http://localhost:8000`
- ✅ Collection `ed-fi-docs` created successfully
- ✅ 10 documents processed and stored
- ✅ Embeddings generated using `sentence-transformers/all-MiniLM-L6-v2`
- ✅ Collection verification passed: 10 embeddings confirmed

## Key Findings

### HTTP Client Configuration

The following `Settings` configuration works correctly:

```python
Settings(
    anonymized_telemetry=False,
    allow_reset=False,
    chroma_server_ssl_verify=False
)
```

**Note**: `chroma_server_http_timeout` is **not** a valid setting and causes validation errors.

### Server Connection

- Connection established successfully with `HttpClient`
- SSL verification disabled for local testing
- Heartbeat endpoint responding correctly
- API v2 endpoints functioning as expected

### Data Persistence

- Documents added via `upsert` endpoint
- Data automatically persisted to server (no manual save required)
- Collection metadata properly stored

## GitHub Actions Readiness

### Recent Commits

1. `62a139d` - Fixed invalid Settings parameter
2. `571bfab` - Removed duplicate permission
3. `916398e` - Added id-token:write for Azure OIDC
4. `cef634e` - Converted workflow to HTTP mode
5. `f9da9d8` - Fixed IndentationError

### Workflow Configuration

- ✅ `id-token: write` permission configured correctly
- ✅ Azure Login step added to `build-vectorstore` job
- ✅ Build step uses `--server-url` instead of `--output-dir`
- ✅ Artifact upload/download removed (no longer needed)
- ✅ Azure Files operations removed (data persists on server)
- ✅ `azure-deploy` job simplified to revision labeling only

### Expected Workflow Behavior

1. **Build Job**: Docs build and deploy to GitHub Pages (unchanged)
2. **Build Vectorstore Job**:
   - Login to Azure
   - Get Container App FQDN
   - Connect to ChromaDB server via HTTPS
   - Build vectorstore directly on server
   - No file artifacts created
3. **Azure Deploy Job**:
   - Login to Azure
   - Update revision label to `ci-{SHA}`
   - No new revision created

## Production Deployment Differences

### Local Container

- **Telemetry**: Azure Monitor disabled (no connection string)
- **SSL**: Disabled for testing
- **Data Path**: `./test-data`
- **Network**: Exposed on localhost:8000

### Azure Container App

- **Telemetry**: Azure Monitor enabled with connection string
- **SSL**: Enabled (HTTPS)
- **Data Path**: Azure Files mount at `/data`
- **Network**: Internal only, accessed via Container App FQDN

## Recommendations

1. **Monitor First Deployment**: Watch GitHub Actions logs for any Azure-specific issues (SSL, network, permissions)
2. **Batch Size**: Consider reducing batch size in production (current: 5000, recommend: 500 for HTTP mode)
3. **Error Handling**: HTTP mode includes retry logic from `migrate_to_http.py`
4. **Revision Labeling**: Verify CI label is applied correctly after first successful build

## Test Scripts Available

### `run-prod-container.ps1`

- Builds and runs production Docker container locally
- Auto-detects Ed-Fi-Chatbot repo location
- Manages container lifecycle
- Parameters: `-Port`, `-DataPath`, `-Rebuild`

### `test-local-server.ps1`

- Tests HTTP mode build against running ChromaDB server
- Creates virtual environment
- Installs dependencies
- Runs vectorstore build
- Verifies collection
- Parameters: `-ServerUrl`, `-LimitDocs`

## Conclusion

✅ **HTTP mode is fully functional and ready for GitHub Actions deployment**

The local testing validated the complete workflow from connection to data persistence. All known issues have been resolved and committed. The workflow is configured correctly with proper Azure OIDC authentication.

## Next Steps

1. Merge PR to trigger GitHub Actions workflow
2. Monitor workflow execution
3. Verify revision labeling in Azure Container App
4. Test queries against newly built vectorstore
