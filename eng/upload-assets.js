#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { scanImages, backup, processImage, SKIP_BELOW_BYTES } = require('./upload-assets/compress');
const { getOldLinks, findReferences, replaceLinks } = require('./upload-assets/link-replacer');
const { getBlobName, getAzureUrl, getCredential, uploadBlob, STORAGE_ACCOUNT_URL } = require('./upload-assets/azure');
const { read: readManifest, write: writeManifest } = require('./upload-assets/manifest');

const REPO_ROOT = path.resolve(__dirname, '..');
const DEFAULT_SOURCE = path.join(REPO_ROOT, 'static', 'img');
const BACKUP_ROOT = path.join(REPO_ROOT, '.asset-backup');
const TMP_DIR = path.join(REPO_ROOT, 'eng', 'upload-assets', '.tmp');
const DOCS_ROOT = path.join(REPO_ROOT, 'docs');

function parseArgs(argv) {
  const args = argv.slice(2);
  return {
    prepare: args.includes('--prepare'),
    upload: args.includes('--upload'),
    noConvert: args.includes('--no-convert'),
    yes: args.includes('--yes'),
    deleteAfter: args.includes('--delete'),
    source: (() => {
      const i = args.indexOf('--source');
      return i !== -1 ? path.resolve(args[i + 1]) : DEFAULT_SOURCE;
    })(),
  };
}

async function runPrepare({ source, noConvert }) {
  console.log(`\n📂 Scanning ${source} for images...`);
  const files = scanImages(source);

  if (files.length === 0) {
    console.log('No image files found. Exiting.');
    process.exit(0);
  }
  console.log(`   Found ${files.length} image(s).`);

  console.log('\n💾 Backing up originals...');
  const backupDir = await backup(files, source, BACKUP_ROOT);
  console.log(`   Backup saved to: ${backupDir}`);

  if (fs.existsSync(TMP_DIR)) fs.rmSync(TMP_DIR, { recursive: true });
  fs.mkdirSync(TMP_DIR, { recursive: true });

  console.log('\n🔧 Processing images...');
  let totalOriginalBytes = 0;
  let totalProcessedBytes = 0;
  let skippedCount = 0;

  const processedFiles = [];

  for (const filePath of files) {
    const blobName = getBlobName(filePath, REPO_ROOT, noConvert);
    const relToSource = path.relative(source, filePath).replace(/\\/g, '/');
    const processedName = noConvert
      ? relToSource
      : relToSource.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const processedPath = path.join(TMP_DIR, processedName);

    const result = await processImage(filePath, processedPath, noConvert);
    if (result === null) {
      skippedCount++;
      continue;
    }

    totalOriginalBytes += result.originalSize;
    totalProcessedBytes += result.processedSize;

    const azureUrl = getAzureUrl(blobName);
    const oldLinks = getOldLinks(filePath, REPO_ROOT);

    processedFiles.push({
      originalPath: path.relative(REPO_ROOT, filePath).replace(/\\/g, '/'),
      processedPath: path.relative(REPO_ROOT, processedPath).replace(/\\/g, '/'),
      azureUrl,
      oldLinks,
      newLink: azureUrl,
      referencedIn: [],
      status: 'ready',
    });
  }

  console.log('\n🔍 Finding doc references...');
  const entries = processedFiles.map((e) => ({
    originalPath: path.join(REPO_ROOT, e.originalPath),
    oldLinks: e.oldLinks,
  }));
  const refs = findReferences(entries, DOCS_ROOT);
  for (const entry of processedFiles) {
    const absPath = path.join(REPO_ROOT, entry.originalPath);
    entry.referencedIn = (refs.get(absPath) || []).map((f) =>
      path.relative(REPO_ROOT, f).replace(/\\/g, '/')
    );
  }

  const manifest = {
    preparedAt: new Date().toISOString(),
    entries: processedFiles,
  };
  writeManifest(REPO_ROOT, manifest);

  const savedPct =
    totalOriginalBytes > 0
      ? Math.round((1 - totalProcessedBytes / totalOriginalBytes) * 100)
      : 0;

  console.log(`\n✅ Prepare complete`);
  console.log(`   Processed : ${processedFiles.length} file(s)`);
  console.log(`   Skipped   : ${skippedCount} file(s) (under ${SKIP_BELOW_BYTES / 1024}KB)`);
  console.log(
    `   Size      : ${(totalOriginalBytes / 1024).toFixed(1)}KB → ${(totalProcessedBytes / 1024).toFixed(1)}KB (${savedPct}% savings)`
  );
  console.log('\nReview asset-upload-manifest.json, then run: npm run assets:upload');
}

async function runUpload({ yes, deleteAfter }) {
  // Implemented in Task 7
  console.error('--upload not yet implemented');
  process.exit(1);
}

(async () => {
  const opts = parseArgs(process.argv);
  if (opts.prepare) {
    await runPrepare(opts);
  } else if (opts.upload) {
    await runUpload(opts);
  } else {
    console.error('Usage: node eng/upload-assets.js --prepare | --upload');
    console.error('       Add --no-convert, --yes, --delete, --source <path> as needed.');
    process.exit(1);
  }
})();
