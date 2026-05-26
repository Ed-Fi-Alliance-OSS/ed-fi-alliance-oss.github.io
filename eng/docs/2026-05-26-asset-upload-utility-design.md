# Asset Upload Utility — Design Spec

**Date:** 2026-05-26
**Status:** Approved
**Author:** Robert Hunter Jr

## Overview

A two-phase Node.js CLI utility (`eng/upload-assets.js`) plus a Claude Code skill
(`.claude/skills/upload-assets.md`) that automates the manual workflow of
compressing, optimizing, uploading static assets to Azure Blob Storage, and
replacing in-repo `static/` references with Azure CDN URLs.

This replaces the current manual process described in DEVELOPER.md where a core
developer uploads images to Azure and hand-edits Markdown links.

## File Structure

```
eng/
  upload-assets.js              ← main CLI entry point (both phases)
  upload-assets/
    compress.js                 ← sharp-based image compression/conversion
    azure.js                    ← Azure Blob Storage upload via @azure/storage-blob
    link-replacer.js            ← scans docs/ and replaces static/* links
    manifest.js                 ← read/write asset-upload-manifest.json

.claude/skills/
  upload-assets.md              ← project-level Claude skill (/upload-assets)

asset-upload-manifest.json      ← generated during prepare phase (gitignored)
.asset-backup/                  ← timestamped backup folders (gitignored)
eng/upload-assets/.tmp/         ← processed images staging area (gitignored)
```

**New npm scripts (package.json):**

```json
"assets:prepare": "node eng/upload-assets.js --prepare",
"assets:upload":  "node eng/upload-assets.js --upload",
"assets":         "node eng/upload-assets.js --prepare && node eng/upload-assets.js --upload"
```

**New dependencies:**

| Package | Purpose |
|---|---|
| `sharp` | Image compression and WebP conversion |
| `@azure/storage-blob` | Azure Blob Storage upload client |
| `@azure/identity` | `DefaultAzureCredential` picks up active `az login` session |

## Authentication

Uses `az login` (Azure CLI). `DefaultAzureCredential` from `@azure/identity`
automatically picks up the active `az` session. If the credential check fails,
the script prints clear instructions to run `az login` and exits with a non-zero
code.

No secrets, SAS tokens, or connection strings are stored in the repo or `.env`
files.

## Phase 1 — Prepare

**Command:** `npm run assets:prepare`

**Flags:**

| Flag | Description |
|---|---|
| `--source <path>` | Override source directory (default: `static/img/`) |
| `--no-convert` | Compress in original format; skip WebP conversion |

**Steps (in order):**

1. **Scan** — finds all `*.png`, `*.jpg`, `*.jpeg`, `*.gif`, `*.svg` files under
   the source directory. Existing `*.webp` files are included (compressed, not
   re-converted). Files under 10KB are skipped.

2. **Backup** — copies originals to `.asset-backup/YYYY-MM-DD-HH-mm-ss/`
   preserving subdirectory structure. Aborts if a backup folder with the same
   timestamp already exists (prevents double-runs).

3. **Compress/convert** — processes each file using `sharp` into
   `eng/upload-assets/.tmp/`:
   - Default: converts PNG/JPG/JPEG → WebP at quality 85
   - `--no-convert`: compresses PNG → optimized PNG, JPG → optimized JPG at quality 85
   - SVG and GIF: copied as-is (sharp does not support these formats)
   - Files under 10KB: skipped (not worth processing)

4. **Write manifest** — saves `asset-upload-manifest.json` at repo root.

5. **Print summary** — files found, files processed, total size before/after,
   estimated savings %.

## Phase 2 — Upload

**Command:** `npm run assets:upload`

**Flags:**

| Flag | Description |
|---|---|
| `--yes` | Skip interactive confirmation prompt |
| `--delete` | Delete originals from `static/` after successful upload |

**Steps (in order):**

1. **Validate** — reads `asset-upload-manifest.json`. Aborts if:
   - File not found (prepare has not been run)
   - `preparedAt` is older than 24 hours (stale manifest warning)
   - `DefaultAzureCredential` cannot authenticate

2. **Preview** — prints the full before/after URL table. Requires `--yes` or
   interactive confirmation to proceed.

3. **Upload** — uploads each processed file from `.tmp/` to Azure Blob Storage:
   - Azure container: `$web` (Static Website container)
   - Target path mirrors `static/` structure:
     `static/img/sdlc/foo.png` → `$web/img/sdlc/foo.webp`
   - Public Azure URL: `https://edfidocs.blob.core.windows.net/$web/img/sdlc/foo.webp`
   - Sets `Content-Type` per format (`image/webp`, `image/png`, etc.)
   - Sets `Cache-Control: public, max-age=31536000`
   - Marks each entry `status: "uploaded"` in manifest as it completes
   - On failure: marks `status: "failed"`, logs error, continues remaining files
   - Re-runs skip already-`"uploaded"` entries (resumable)

4. **Replace links** — scans `docs/**/*.md` and `docs/**/*.mdx`, replaces exact
   string matches of `oldLink` → `newLink` for all `"uploaded"` entries only.
   Note: Docusaurus serves `static/img/foo.png` at `/img/foo.png` — the link
   replacer searches for both the filesystem path (`static/img/...`) and the
   served path (`/img/...`) to catch all reference styles.

5. **Cleanup** — if `--delete` is set, removes original files from `static/` for
   all `"uploaded"` entries. Otherwise prints a list of source files that can be
   manually removed.

6. **Print summary** — uploaded count, failed count, links replaced, files
   deleted.

## Manifest Format

```json
{
  "preparedAt": "2026-05-26T14:30:00.000Z",
  "entries": [
    {
      "originalPath": "static/img/sdlc/foo.png",
      "processedPath": "eng/upload-assets/.tmp/sdlc/foo.webp",
      "azureUrl": "https://edfidocs.blob.core.windows.net/$web/img/sdlc/foo.webp",
      "referencedIn": ["docs/reference/sdlc.md"],
      "oldLinks": ["static/img/sdlc/foo.png", "/img/sdlc/foo.png"],
      "newLink": "https://edfidocs.blob.core.windows.net/$web/img/sdlc/foo.webp",
      "status": "ready"
    }
  ]
}
```

**`status` values:** `ready` | `uploaded` | `failed`

## Claude Skill — `/upload-assets`

File: `.claude/skills/upload-assets.md`

The skill guides the user through three checkpoints:

### Checkpoint 1 — Pre-flight

- Runs `az account show` to verify an active `az login` session; if not, instructs
  the user to run `! az login`
- Checks for uncommitted changes in `static/img/` (advisory only, does not block)
- Asks which images to process: all of `static/img/`, a specific subfolder, or
  individual files (passed via `--source`)
- Asks whether to use `--no-convert` if SVG/GIF files are present

### Checkpoint 2 — Review manifest

- Runs `npm run assets:prepare` (with flags as needed)
- Displays the manifest summary: file count, size savings, before/after URL table
- Asks user to confirm the manifest looks correct before proceeding
- If anything looks wrong, user aborts, adjusts `static/`, and re-runs prepare

### Checkpoint 3 — Upload and verify

- Runs `npm run assets:upload --yes` (with `--delete` if requested)
- Reports upload summary (uploaded, failed, links replaced)
- If any failures, shows failed entries and offers to retry
- Reminds user to run `npm run build` to verify no broken links
- If `--delete` was not used, lists source files remaining in `static/` with a
  reminder to remove them before committing

## Gitignore Additions

```
asset-upload-manifest.json
.asset-backup/
eng/upload-assets/.tmp/
```

## Out of Scope

- Non-image files (PDFs, fonts, etc.) — `static/files/` is not targeted
- Automatic resizing or responsive image generation
- CI/CD integration — this is a developer workflow tool
- Rollback automation — the `.asset-backup/` folder is the manual restore path
