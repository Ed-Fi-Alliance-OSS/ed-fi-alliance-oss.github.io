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
  const manifest = readManifest(REPO_ROOT);
  if (!manifest) {
    console.error('❌ No manifest found. Run: npm run assets:prepare first.');
    process.exit(1);
  }

  const ageMs = Date.now() - new Date(manifest.preparedAt).getTime();
  if (ageMs > 24 * 60 * 60 * 1000) {
    console.warn(`⚠️  Manifest is ${Math.round(ageMs / 3600000)}h old. Consider re-running prepare.`);
  }

  const pending = manifest.entries.filter((e) => e.status === 'ready');
  if (pending.length === 0) {
    console.log('No entries with status=ready. Nothing to upload.');
    process.exit(0);
  }

  console.log(`\n📋 ${pending.length} file(s) to upload:\n`);
  for (const entry of pending) {
    console.log(`  ${entry.originalPath}`);
    console.log(`    → ${entry.azureUrl}`);
  }

  if (!yes) {
    const { createInterface } = require('readline');
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    const answer = await new Promise((resolve) =>
      rl.question('\nProceed with upload? (y/N) ', resolve)
    );
    rl.close();
    if (answer.trim().toLowerCase() !== 'y') {
      console.log('Aborted.');
      process.exit(0);
    }
  }

  console.log('\n🔐 Checking Azure credentials...');
  let credential;
  try {
    credential = await getCredential();
    console.log('   Authenticated via DefaultAzureCredential ✓');
  } catch (err) {
    console.error('❌ Azure authentication failed. Run: az login');
    console.error(`   Details: ${err.message}`);
    process.exit(1);
  }

  console.log('\n☁️  Uploading...');
  let uploadedCount = 0;
  let failedCount = 0;

  for (const entry of manifest.entries) {
    if (entry.status !== 'ready') continue;
    const processedAbsPath = path.join(REPO_ROOT, entry.processedPath);
    const blobName = entry.azureUrl.replace(`${STORAGE_ACCOUNT_URL}/$web/`, '');
    try {
      await uploadBlob(processedAbsPath, blobName, credential);
      entry.status = 'uploaded';
      uploadedCount++;
      console.log(`   ✓ ${entry.originalPath}`);
    } catch (err) {
      entry.status = 'failed';
      failedCount++;
      console.error(`   ✗ ${entry.originalPath}: ${err.message}`);
    }
    writeManifest(REPO_ROOT, manifest);
  }

  console.log('\n🔗 Replacing links in docs...');
  const replacements = replaceLinks(manifest.entries, DOCS_ROOT);
  console.log(`   ${replacements} link(s) replaced.`);

  if (deleteAfter) {
    console.log('\n🗑️  Deleting source files...');
    for (const entry of manifest.entries) {
      if (entry.status !== 'uploaded') continue;
      const absPath = path.join(REPO_ROOT, entry.originalPath);
      if (fs.existsSync(absPath)) {
        fs.unlinkSync(absPath);
        console.log(`   Deleted: ${entry.originalPath}`);
      }
    }
  } else {
    const remaining = manifest.entries
      .filter((e) => e.status === 'uploaded')
      .map((e) => e.originalPath);
    if (remaining.length > 0) {
      console.log('\n📁 Source files still in static/ (remove before committing):');
      for (const p of remaining) console.log(`   ${p}`);
    }
  }

  console.log(`\n✅ Upload complete`);
  console.log(`   Uploaded  : ${uploadedCount}`);
  console.log(`   Failed    : ${failedCount}`);
  console.log(`   Links replaced: ${replacements}`);

  if (failedCount > 0) {
    console.log('\n⚠️  Some uploads failed. Re-run: npm run assets:upload to retry.');
    process.exit(1);
  }

  console.log('\nRun `npm run build` to verify no broken links.');
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
