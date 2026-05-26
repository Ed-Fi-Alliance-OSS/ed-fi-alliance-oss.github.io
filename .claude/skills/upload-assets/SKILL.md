---
name: upload-assets
description: Upload static images to Azure Blob Storage — compresses, converts to WebP, uploads, and replaces Markdown links. Run when adding new images to static/img/ that need to go to Azure CDN.
---

Guide the user through uploading static assets to Azure Blob Storage in three checkpoints.

## Checkpoint 1 — Pre-flight

Run `az account show` to check the Azure login session:

```bash
az account show
```

If this fails, tell the user: "You need to log in first. Run `! az login` in the prompt."

Once authenticated, check for new images in static/img/:

```bash
git status static/img/
```

Ask the user:
1. Do you want to process all of `static/img/`, a specific subfolder, or specific files?
   - All: use default (no --source flag)
   - Subfolder: use `--source static/img/<subfolder>`
2. Do any of your images need to stay as PNG/JPG instead of converting to WebP? (e.g., images with transparency that WebP handles differently, or images that must keep a specific filename)
   - If yes: add the `--no-convert` flag

## Checkpoint 2 — Prepare and review manifest

Run the prepare phase with the chosen flags:

```bash
npm run assets:prepare
# or with flags: node eng/upload-assets.js --prepare --source static/img/subfolder --no-convert
```

After it completes, show the user a summary by reading the manifest:

```bash
node -e "
const m = require('./asset-upload-manifest.json');
console.log('Files to upload:', m.entries.length);
m.entries.forEach(e => console.log(' ', e.originalPath, '->', e.azureUrl));
"
```

Ask: "Does this manifest look correct? Any files you don't want to upload, or wrong paths?"

If anything looks wrong: the user can delete or move files from `static/img/`, then re-run `npm run assets:prepare`.

## Checkpoint 3 — Upload and verify

Before uploading, ask: "Do you want to delete the source files from `static/img/` automatically after upload? (Adds `--delete` flag)"

Run the upload phase:

```bash
npm run assets:upload --yes
# or with delete: node eng/upload-assets.js --upload --yes --delete
```

After completion:
- Show the upload summary (uploaded count, failed count, links replaced)
- If there were failures, show which files failed and offer: "Want me to retry? Just run `npm run assets:upload --yes` again — it skips already-uploaded entries."
- If `--delete` was not used, list the source files remaining in `static/` and remind the user to remove them before committing
- Remind the user to run `npm run build` to check for broken links:

```bash
npm run build
```

If the build passes, the assets are live and links are updated. Commit the changed docs files.
