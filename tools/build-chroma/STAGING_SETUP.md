# Option 3: Hybrid Staging/Production Architecture

## Overview

Use a single Container App with path-based isolation. Feature branches and main use different subfolders in the same Azure Files share. Blue/green deployments protect production; feature branches deploy directly for fast iteration.

## Architecture

### Storage Structure

```
vecsearchlt6lkkkv3prfc (production storage account)
└─ vector-data (file share)
   ├─ docs-vectordb-prod/              ← Main branch (100% traffic, blue/green protected)
   │  ├─ chroma.db
   │  └─ ...
   ├─ docs-vectordb-add-chroma-workflow/ ← Feature branch (direct 100%, no health gate)
   │  ├─ chroma.db
   │  └─ ...
   └─ docs-vectordb-{other-branch}/    ← Other feature branches (same pattern)
```

### Container App Revisions

```
fiona-vector-search-container (single app, two deployment modes)
├─ Revision STABLE (Production)
│  └─ PERSIST_DIRECTORY=/data/docs-vectordb-prod
│  └─ Traffic: 100% (normal) / 90% (during main branch deploy)
│
└─ Revision NEW (Test only on main branch)
   └─ PERSIST_DIRECTORY=/data/docs-vectordb-prod
   └─ Traffic: 10% (test) → 100% (if pass) / 0% (if fail)
```

### Deployment Workflow

**Feature Branch (fast path)**:

```
push to feature branch
  ↓
Build vectorstore
  ↓
Upload to /data/docs-vectordb-{branch-name}/
  ↓
Update PERSIST_DIRECTORY=/data/docs-vectordb-{branch-name}
  ↓
✅ Complete (~2 minutes, no revisions created)
```

**Main Branch (safe path)**:

```
push to main
  ↓
Build vectorstore
  ↓
Upload to /data/docs-vectordb-prod/
  ↓
Create NEW revision with PERSIST_DIRECTORY=/data/docs-vectordb-prod
  ↓
Split traffic 90% STABLE / 10% NEW
  ↓
Health gate check (/api/v1/heartbeat)
  ↓
If PASS: Ramp to 100% NEW (fully deployed)
If FAIL: Rollback to 100% STABLE (previous version)
  ↓
✅ Complete (~5-10 minutes, safe blue/green deployment)
```

## Setup Steps

### One-Time: Add Federated Credential for All Branches

The existing credential only matches `refs/heads/main`. To support feature branches, add a wildcard credential:

```bash
az account set --subscription 7565e66b-a848-4f61-8825-24d4b835fc04

az identity federated-credential create \
  --resource-group edfi-fiona-rg \
  --identity-name ed-fi-docs-deploy \
  --name github-feature-branches \
  --issuer https://token.actions.githubusercontent.com \
  --subject "repo:Ed-Fi-Alliance-OSS/ed-fi-alliance-oss.github.io:ref:refs/heads/*" \
  --audiences api://AzureADTokenExchange
```

**Result**: GitHub Actions can now authenticate from ANY branch (main, feature branches, etc.)

### Storage Account (Already Exists ✅)

- **Name**: `vecsearchlt6lkkkv3prfc`
- **File Share**: `vector-data`
- **Subdirectories created on demand**:
  - `/docs-vectordb-prod/` (first main push)
  - `/docs-vectordb-{branch-name}/` (feature branch pushes)

### Container App (Already Exists ✅)

- **Name**: `fiona-vector-search-container`
- **Mount**: `/data` → `vector-data` file share
- **Existing env**: `PERSIST_DIRECTORY=/data/...` (updated by workflow)
