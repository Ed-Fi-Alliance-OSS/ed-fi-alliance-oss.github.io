#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Build and run the production ChromaDB container locally
.DESCRIPTION
    Builds the fiona-vector-search Docker image and runs it locally
    for testing. This includes the Azure Monitor wrapper.
.EXAMPLE
    .\run-prod-container.ps1 -Port 8000 -DataPath ./test-data
#>

param(
    [int]$Port = 8000,
    [string]$DataPath = "$PSScriptRoot\test-data",
    [switch]$Rebuild
)

$ErrorActionPreference = "Stop"

Write-Host "🐳 Production ChromaDB Container - Local Test" -ForegroundColor Cyan
Write-Host ""

# Resolve paths
$chatbotRoot = (Get-Item "$PSScriptRoot\..\..\..\Ed-Fi-Chatbot").FullName
$dockerContext = "$chatbotRoot\apps\fiona-vector-search"
$containerName = "fiona-vector-search-local"
$imageName = "fiona-vector-search:local"

if (-not (Test-Path $dockerContext)) {
    Write-Host "❌ Docker context not found: $dockerContext" -ForegroundColor Red
    Write-Host "   Make sure Ed-Fi-Chatbot repo is cloned at expected location" -ForegroundColor Gray
    exit 1
}

# Create data directory
$DataPath = (New-Item -ItemType Directory -Path $DataPath -Force).FullName
Write-Host "📁 Data path: $DataPath" -ForegroundColor Gray

# Check if container is already running
$existing = docker ps -a --filter "name=$containerName" --format "{{.Names}}"
if ($existing -eq $containerName) {
    Write-Host "🗑️  Removing existing container: $containerName" -ForegroundColor Yellow
    docker rm -f $containerName | Out-Null
}

# Build image if needed
$imageExists = docker images -q $imageName
if (-not $imageExists -or $Rebuild) {
    Write-Host "🔨 Building production Docker image..." -ForegroundColor Green
    Write-Host "   Context: $dockerContext" -ForegroundColor Gray

    Push-Location $dockerContext
    try {
        docker build -t $imageName .
        if ($LASTEXITCODE -ne 0) {
            throw "Docker build failed"
        }
        Write-Host "✅ Image built successfully" -ForegroundColor Green
    } finally {
        Pop-Location
    }
} else {
    Write-Host "✅ Using existing image: $imageName" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Starting container..." -ForegroundColor Green

# Run container
docker run -d `
    --name $containerName `
    -p "${Port}:8000" `
    -v "${DataPath}:/data" `
    -e CHROMA_DATA_PATH="/data" `
    -e CHROMA_SERVER_HOST="0.0.0.0" `
    -e CHROMA_SERVER_HTTP_PORT="8000" `
    $imageName

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to start container" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Container started: $containerName" -ForegroundColor Green
Write-Host ""
Write-Host "Container details:" -ForegroundColor Yellow
Write-Host "  Name: $containerName" -ForegroundColor Gray
Write-Host "  Image: $imageName" -ForegroundColor Gray
Write-Host "  Port: $Port -> 8000" -ForegroundColor Gray
Write-Host "  Data: $DataPath -> /data" -ForegroundColor Gray
Write-Host ""

# Wait for server to be ready
Write-Host "⏳ Waiting for server to be ready..." -ForegroundColor Yellow
$maxAttempts = 30
$attempt = 0
$serverReady = $false

while ($attempt -lt $maxAttempts -and -not $serverReady) {
    Start-Sleep -Seconds 1
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:${Port}/api/v1/heartbeat" -Method GET -TimeoutSec 2 -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            $serverReady = $true
        }
    } catch {
        $attempt++
        Write-Host "." -NoNewline
    }
}

Write-Host ""
if ($serverReady) {
    Write-Host "✅ Server is ready!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Server URL: http://localhost:$Port" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "View logs:" -ForegroundColor Yellow
    Write-Host "  docker logs -f $containerName" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Run test:" -ForegroundColor Yellow
    Write-Host "  .\test-local-server.ps1 -ServerUrl http://localhost:$Port" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Stop container:" -ForegroundColor Yellow
    Write-Host "  docker stop $containerName" -ForegroundColor Gray
} else {
    Write-Host "❌ Server failed to start within timeout" -ForegroundColor Red
    Write-Host ""
    Write-Host "Check logs:" -ForegroundColor Yellow
    Write-Host "  docker logs $containerName" -ForegroundColor Gray
    exit 1
}
