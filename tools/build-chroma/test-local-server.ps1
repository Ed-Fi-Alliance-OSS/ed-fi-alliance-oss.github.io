#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Test ChromaDB vectorstore build against running server
.DESCRIPTION
    Builds vectorstore via HTTP to an existing ChromaDB server (e.g., Docker).
    Assumes server is already running. Useful for testing HTTP mode.
.EXAMPLE
    .\test-local-server.ps1 -ServerUrl "http://localhost:8000"
#>

param(
    [string]$ServerUrl = "http://localhost:8000",
    [int]$LimitDocs = 50
)

$ErrorActionPreference = "Stop"

Write-Host "🧪 Testing ChromaDB HTTP Mode Locally" -ForegroundColor Cyan
Write-Host ""

# Check for or create virtual environment
$venvPath = "$PSScriptRoot\.venv"
if (-not (Test-Path $venvPath)) {
    Write-Host "📦 Creating virtual environment..." -ForegroundColor Yellow
    python -m venv $venvPath
    Write-Host "✅ Virtual environment created" -ForegroundColor Green
}

# Activate virtual environment
Write-Host "🔌 Activating virtual environment..." -ForegroundColor Yellow
$activateScript = "$venvPath\Scripts\Activate.ps1"
if (Test-Path $activateScript) {
    & $activateScript
    Write-Host "✅ Virtual environment activated" -ForegroundColor Green
} else {
    Write-Host "❌ Could not find activation script" -ForegroundColor Red
    exit 1
}

# Install requirements
Write-Host "📦 Installing requirements..." -ForegroundColor Yellow
pip install -q -r "$PSScriptRoot\requirements.txt"
Write-Host "✅ Requirements installed" -ForegroundColor Green

# Verify chromadb installation
Write-Host "📦 Verifying ChromaDB installation..." -ForegroundColor Yellow
python -c "import chromadb; print(f'ChromaDB version: {chromadb.__version__}')"

Write-Host ""
Write-Host "🔗 Testing connection to ChromaDB server..." -ForegroundColor Yellow
Write-Host "   Server URL: $ServerUrl" -ForegroundColor Gray

# Test server connection
try {
    $response = Invoke-WebRequest -Uri "$ServerUrl/api/v1/heartbeat" -Method GET -TimeoutSec 5 -ErrorAction Stop
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Server is accessible!" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Could not connect to server: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure ChromaDB server is running:" -ForegroundColor Yellow
    Write-Host "  docker run -d -p 8000:8000 chromadb/chroma:latest" -ForegroundColor Gray
    exit 1
}

Write-Host ""

# Build test docs export
Write-Host "📄 Checking for docs export..." -ForegroundColor Yellow
$exportPath = "$PSScriptRoot\..\..\build\export"
if (-not (Test-Path $exportPath)) {
    Write-Host "❌ No docs export found at $exportPath" -ForegroundColor Red
    Write-Host "   Run 'npm run build' first to generate docs export" -ForegroundColor Gray
    exit 1
}

# Run build_vectorstore.py in HTTP mode
Write-Host "🔨 Building vectorstore via HTTP..." -ForegroundColor Green
Write-Host "   Server URL: $ServerUrl" -ForegroundColor Gray
Write-Host "   Limit docs: $LimitDocs" -ForegroundColor Gray
Write-Host ""

try {
    python "$PSScriptRoot\build_vectorstore.py" `
        --source-docs $exportPath `
        --server-url $ServerUrl `
        --collection-name ed-fi-docs `
        --embedding-model sentence-transformers/all-MiniLM-L6-v2 `
        --device cpu `
        --batch-size 500 `
        --limit-docs $LimitDocs `
        --verbose

    $buildResult = $LASTEXITCODE
} catch {
    Write-Host "❌ Build failed: $_" -ForegroundColor Red
    $buildResult = 1
}

Write-Host ""

# Check collection
if ($buildResult -eq 0) {
    Write-Host "✅ Build completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📊 Verifying collection..." -ForegroundColor Yellow
    
    # Query the collection via HTTP API
    try {
        $response = Invoke-RestMethod -Uri "$ServerUrl/api/v1/collections" -Method GET
        Write-Host "   Collections: $($response.Count)" -ForegroundColor Gray
        
        if ($response.Count -gt 0) {
            foreach ($coll in $response) {
                Write-Host "   - $($coll.name): $($coll.metadata)" -ForegroundColor Gray
            }
        }
    } catch {
        Write-Host "⚠️  Could not query collections: $_" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Build failed with exit code: $buildResult" -ForegroundColor Red
}

Write-Host ""
if ($buildResult -eq 0) {
    Write-Host "✨ Test completed successfully!" -ForegroundColor Green
} else {
    Write-Host "❌ Test failed" -ForegroundColor Red
}

exit $buildResult
