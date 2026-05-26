# Asset Upload Utility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a two-phase Node.js CLI + Claude skill that compresses/converts static images to WebP, uploads them to Azure Blob Storage, and replaces Markdown image links automatically.

**Architecture:** Phase 1 (`--prepare`) scans `static/img/`, backs up originals to `.asset-backup/`, converts to WebP via `sharp`, and writes `asset-upload-manifest.json`. Phase 2 (`--upload`) reads the manifest, uploads to Azure Blob Storage (`$web` container) via `@azure/storage-blob` + `DefaultAzureCredential`, then replaces image links in `docs/`. A Claude skill wraps both phases with guided checkpoints.

**Tech Stack:** Node.js 22 (CommonJS), `sharp`, `@azure/storage-blob`, `@azure/identity`, `node:test` + `node:assert` for unit tests (no extra test deps needed).

**Working directory for all commands:** `C:/Dev/local-ed-fi/ed-fi-alliance-oss.github.io/.worktrees/asset-upload-utility`

---

## File Map

| File | Status | Responsibility |
|---|---|---|
| `package.json` | Modify | Add npm scripts + 3 new deps |
| `.gitignore` | Modify | Add manifest, backup, tmp to gitignore |
| `eng/upload-assets.js` | Create | CLI entry point; parses flags, orchestrates phases |
| `eng/upload-assets/manifest.js` | Create | Read/write `asset-upload-manifest.json` |
| `eng/upload-assets/manifest.test.js` | Create | Tests for manifest.js |
| `eng/upload-assets/compress.js` | Create | Scan images, backup originals, process with sharp |
| `eng/upload-assets/compress.test.js` | Create | Tests for compress.js |
| `eng/upload-assets/link-replacer.js` | Create | Compute oldLinks; find references in docs; replace links |
| `eng/upload-assets/link-replacer.test.js` | Create | Tests for link-replacer.js |
| `eng/upload-assets/azure.js` | Create | getBlobName, getAzureUrl, getCredential, uploadBlob |
| `eng/upload-assets/azure.test.js` | Create | Tests for pure functions in azure.js |
| `.claude/skills/upload-assets/SKILL.md` | Create | Claude skill for `/upload-assets` |

---

### Task 1: Setup — dependencies, npm scripts, gitignore

**Files:**
- Modify: `package.json`
- Modify: `.gitignore`

- [ ] **Step 1: Install new dependencies**

```bash
npm install sharp @azure/storage-blob @azure/identity
```

Expected: packages added to `node_modules/`, `package-lock.json` updated.

- [ ] **Step 2: Add npm scripts to package.json**

Open `package.json`. Add these three lines inside the `"scripts"` block (after `"lint:fix"`):

```json
"assets:prepare": "node eng/upload-assets.js --prepare",
"assets:upload": "node eng/upload-assets.js --upload",
"assets": "node eng/upload-assets.js --prepare && node eng/upload-assets.js --upload"
```

- [ ] **Step 3: Add gitignore entries**

Add these lines to the end of `.gitignore`:

```
# Asset upload utility
asset-upload-manifest.json
.asset-backup/
eng/upload-assets/.tmp/
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .gitignore
git commit -m "chore: add asset upload utility deps and npm scripts"
```

---

### Task 2: manifest.js — read and write manifest file

**Files:**
- Create: `eng/upload-assets/manifest.js`
- Create: `eng/upload-assets/manifest.test.js`

- [ ] **Step 1: Create the test file**

Create `eng/upload-assets/manifest.test.js`:

```js
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { read, write, MANIFEST_FILENAME } = require('./manifest');

test('read returns null when manifest file does not exist', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'manifest-test-'));
  const result = read(tmpDir);
  assert.equal(result, null);
});

test('write creates manifest file with correct content', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'manifest-test-'));
  const manifest = { preparedAt: '2026-05-26T00:00:00.000Z', entries: [] };
  write(tmpDir, manifest);
  const filePath = path.join(tmpDir, MANIFEST_FILENAME);
  assert.ok(fs.existsSync(filePath), 'manifest file should exist');
  const parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  assert.deepEqual(parsed, manifest);
});

test('read returns written manifest', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'manifest-test-'));
  const manifest = {
    preparedAt: '2026-05-26T00:00:00.000Z',
    entries: [{ originalPath: 'static/img/foo.png', status: 'ready' }],
  };
  write(tmpDir, manifest);
  const result = read(tmpDir);
  assert.deepEqual(result, manifest);
});

test('MANIFEST_FILENAME is asset-upload-manifest.json', () => {
  assert.equal(MANIFEST_FILENAME, 'asset-upload-manifest.json');
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
node --test eng/upload-assets/manifest.test.js
```

Expected: error — `Cannot find module './manifest'`

- [ ] **Step 3: Create manifest.js**

Create `eng/upload-assets/manifest.js`:

```js
const fs = require('fs');
const path = require('path');

const MANIFEST_FILENAME = 'asset-upload-manifest.json';

function read(repoRoot) {
  const filePath = path.join(repoRoot, MANIFEST_FILENAME);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function write(repoRoot, manifest) {
  const filePath = path.join(repoRoot, MANIFEST_FILENAME);
  fs.writeFileSync(filePath, JSON.stringify(manifest, null, 2));
}

module.exports = { read, write, MANIFEST_FILENAME };
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
node --test eng/upload-assets/manifest.test.js
```

Expected: `✓ read returns null when manifest file does not exist`, `✓ write creates manifest file with correct content`, `✓ read returns written manifest`, `✓ MANIFEST_FILENAME is asset-upload-manifest.json` — all passing.

- [ ] **Step 5: Commit**

```bash
git add eng/upload-assets/manifest.js eng/upload-assets/manifest.test.js
git commit -m "feat: add manifest read/write module"
```

---

### Task 3: compress.js — scan images, backup, process with sharp

**Files:**
- Create: `eng/upload-assets/compress.js`
- Create: `eng/upload-assets/compress.test.js`

- [ ] **Step 1: Create the test file**

Create `eng/upload-assets/compress.test.js`:

```js
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const sharp = require('sharp');
const { scanImages, backup, processImage, SKIP_BELOW_BYTES } = require('./compress');

// Helpers
function makeTmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'compress-test-'));
}

function touchFile(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, '');
}

async function makeLargePng(destPath) {
  // 300x300 noise image ~200KB, well above SKIP_BELOW_BYTES
  const noise = Buffer.alloc(300 * 300 * 3);
  for (let i = 0; i < noise.length; i++) noise[i] = (i * 37) % 256;
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  await sharp(noise, { raw: { width: 300, height: 300, channels: 3 } })
    .png()
    .toFile(destPath);
}

// scanImages tests
test('scanImages finds png, jpg, jpeg, gif, svg, webp files', () => {
  const dir = makeTmpDir();
  touchFile(path.join(dir, 'a.png'));
  touchFile(path.join(dir, 'sub', 'b.jpg'));
  touchFile(path.join(dir, 'c.jpeg'));
  touchFile(path.join(dir, 'd.gif'));
  touchFile(path.join(dir, 'e.svg'));
  touchFile(path.join(dir, 'f.webp'));
  touchFile(path.join(dir, 'ignored.txt'));
  const found = scanImages(dir);
  assert.equal(found.length, 6);
  assert.ok(found.some((f) => f.endsWith('a.png')));
  assert.ok(found.some((f) => f.endsWith('b.jpg')));
  assert.ok(!found.some((f) => f.endsWith('.txt')));
});

test('scanImages is case-insensitive for extensions', () => {
  const dir = makeTmpDir();
  touchFile(path.join(dir, 'A.PNG'));
  touchFile(path.join(dir, 'B.JPG'));
  const found = scanImages(dir);
  assert.equal(found.length, 2);
});

// backup tests
test('backup copies files preserving structure and returns backup dir path', async () => {
  const srcDir = makeTmpDir();
  const backupRoot = makeTmpDir();
  const file1 = path.join(srcDir, 'a.png');
  const file2 = path.join(srcDir, 'sub', 'b.jpg');
  fs.writeFileSync(file1, 'img1');
  fs.mkdirSync(path.dirname(file2), { recursive: true });
  fs.writeFileSync(file2, 'img2');

  const backupDir = await backup([file1, file2], srcDir, backupRoot);

  assert.ok(fs.existsSync(path.join(backupDir, 'a.png')));
  assert.ok(fs.existsSync(path.join(backupDir, 'sub', 'b.jpg')));
  assert.equal(fs.readFileSync(path.join(backupDir, 'a.png'), 'utf8'), 'img1');
});

test('backup aborts if timestamp folder already exists', async () => {
  const srcDir = makeTmpDir();
  const backupRoot = makeTmpDir();
  const file = path.join(srcDir, 'a.png');
  fs.writeFileSync(file, 'x');

  // Pre-create the dir backup would create this second (same timestamp format)
  const ts = new Date().toISOString().replace(/:/g, '-').replace(/\..+$/, '');
  fs.mkdirSync(path.join(backupRoot, ts));

  await assert.rejects(
    () => backup([file], srcDir, backupRoot),
    /already exists/
  );
});

// processImage tests
test('processImage returns null for files under SKIP_BELOW_BYTES', async () => {
  const dir = makeTmpDir();
  const src = path.join(dir, 'tiny.png');
  const dest = path.join(dir, 'tiny.webp');
  fs.writeFileSync(src, Buffer.alloc(100)); // 100 bytes, well under 10KB
  const result = await processImage(src, dest, false);
  assert.equal(result, null);
});

test('processImage converts PNG to WebP by default', async () => {
  const dir = makeTmpDir();
  const src = path.join(dir, 'large.png');
  const dest = path.join(dir, 'large.webp');
  await makeLargePng(src);
  assert.ok(fs.statSync(src).size > SKIP_BELOW_BYTES, 'test image should be > SKIP_BELOW_BYTES');

  const result = await processImage(src, dest, false);

  assert.ok(result !== null);
  assert.ok(fs.existsSync(dest), 'webp output should exist');
  assert.ok(result.processedSize > 0);
  assert.ok(result.originalSize > SKIP_BELOW_BYTES);
});

test('processImage compresses PNG without converting when noConvert=true', async () => {
  const dir = makeTmpDir();
  const src = path.join(dir, 'large.png');
  const dest = path.join(dir, 'large-compressed.png');
  await makeLargePng(src);

  const result = await processImage(src, dest, true);

  assert.ok(result !== null);
  assert.ok(fs.existsSync(dest), 'compressed png should exist');
  // Verify it's still a valid PNG (sharp can read it back)
  const meta = await sharp(dest).metadata();
  assert.equal(meta.format, 'png');
});

test('processImage copies SVG as-is regardless of size or noConvert flag', async () => {
  const dir = makeTmpDir();
  const src = path.join(dir, 'icon.svg');
  const dest = path.join(dir, 'icon-out.svg');
  const svgContent = '<svg xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100"/></svg>';
  // Pad to exceed SKIP_BELOW_BYTES
  fs.writeFileSync(src, svgContent.padEnd(SKIP_BELOW_BYTES + 100, ' '));

  const result = await processImage(src, dest, false);

  assert.ok(result !== null);
  assert.ok(fs.readFileSync(dest, 'utf8').startsWith('<svg'));
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
node --test eng/upload-assets/compress.test.js
```

Expected: error — `Cannot find module './compress'`

- [ ] **Step 3: Create compress.js**

Create `eng/upload-assets/compress.js`:

```js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SKIP_BELOW_BYTES = 10 * 1024;
const CONVERT_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);
const PASSTHROUGH_EXTENSIONS = new Set(['.svg', '.gif']);
const ALL_EXTENSIONS = new Set([...CONVERT_EXTENSIONS, ...PASSTHROUGH_EXTENSIONS, '.webp']);
const WEBP_QUALITY = 85;
const JPEG_QUALITY = 85;
const PNG_COMPRESSION = 9;

function scanImages(sourceDir) {
  const results = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (ALL_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        results.push(fullPath);
      }
    }
  }
  walk(sourceDir);
  return results;
}

async function backup(files, sourceDir, backupRoot) {
  const timestamp = new Date()
    .toISOString()
    .replace(/:/g, '-')
    .replace(/\..+$/, '');
  const backupDir = path.join(backupRoot, timestamp);
  if (fs.existsSync(backupDir)) {
    throw new Error(
      `Backup directory already exists: ${backupDir}. Wait a moment and retry.`
    );
  }
  fs.mkdirSync(backupDir, { recursive: true });
  for (const file of files) {
    const rel = path.relative(sourceDir, file);
    const dest = path.join(backupDir, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(file, dest);
  }
  return backupDir;
}

async function processImage(srcPath, destPath, noConvert) {
  const stat = fs.statSync(srcPath);
  if (stat.size < SKIP_BELOW_BYTES) return null;

  const ext = path.extname(srcPath).toLowerCase();
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  if (PASSTHROUGH_EXTENSIONS.has(ext) || ext === '.webp') {
    fs.copyFileSync(srcPath, destPath);
    return { originalSize: stat.size, processedSize: fs.statSync(destPath).size };
  }

  if (noConvert) {
    if (ext === '.png') {
      await sharp(srcPath).png({ compressionLevel: PNG_COMPRESSION }).toFile(destPath);
    } else {
      await sharp(srcPath).jpeg({ quality: JPEG_QUALITY }).toFile(destPath);
    }
  } else {
    await sharp(srcPath).webp({ quality: WEBP_QUALITY }).toFile(destPath);
  }

  return { originalSize: stat.size, processedSize: fs.statSync(destPath).size };
}

module.exports = { scanImages, backup, processImage, SKIP_BELOW_BYTES };
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
node --test eng/upload-assets/compress.test.js
```

Expected: all tests pass. The large-image tests may take 1-2s due to sharp processing.

- [ ] **Step 5: Commit**

```bash
git add eng/upload-assets/compress.js eng/upload-assets/compress.test.js
git commit -m "feat: add image scan, backup, and compress/convert module"
```

---

### Task 4: link-replacer.js — find references and replace links in docs

**Files:**
- Create: `eng/upload-assets/link-replacer.js`
- Create: `eng/upload-assets/link-replacer.test.js`

- [ ] **Step 1: Create the test file**

Create `eng/upload-assets/link-replacer.test.js`:

```js
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { getOldLinks, findReferences, replaceLinks } = require('./link-replacer');

function makeTmpDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'link-test-'));
}

function writeDoc(dir, filename, content) {
  const full = path.join(dir, filename);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
  return full;
}

// getOldLinks tests
test('getOldLinks returns filesystem and Docusaurus served paths', () => {
  const repoRoot = '/repo';
  const filePath = '/repo/static/img/sdlc/foo.png';
  const links = getOldLinks(filePath, repoRoot);
  assert.ok(links.includes('static/img/sdlc/foo.png'), 'should include filesystem path');
  assert.ok(links.includes('/img/sdlc/foo.png'), 'should include Docusaurus served path');
});

test('getOldLinks handles Windows-style backslashes', () => {
  const repoRoot = 'C:\\repo';
  const filePath = 'C:\\repo\\static\\img\\foo.png';
  const links = getOldLinks(filePath, repoRoot);
  assert.ok(links.some((l) => l.includes('/')), 'all links should use forward slashes');
  assert.ok(!links.some((l) => l.includes('\\')), 'no backslashes in output');
});

// findReferences tests
test('findReferences returns doc files that contain a matching link', () => {
  const docsRoot = makeTmpDir();
  writeDoc(docsRoot, 'page.md', '![foo](/img/sdlc/foo.png)');
  writeDoc(docsRoot, 'other.md', 'no images here');

  const entries = [
    { originalPath: '/repo/static/img/sdlc/foo.png', oldLinks: ['static/img/sdlc/foo.png', '/img/sdlc/foo.png'] },
  ];
  const result = findReferences(entries, docsRoot);
  const refs = result.get('/repo/static/img/sdlc/foo.png');
  assert.ok(refs, 'should have references for this image');
  assert.equal(refs.length, 1);
  assert.ok(refs[0].endsWith('page.md'));
});

test('findReferences matches both static/ and /img/ link styles', () => {
  const docsRoot = makeTmpDir();
  writeDoc(docsRoot, 'page-a.md', '![a](static/img/foo.png)');
  writeDoc(docsRoot, 'page-b.md', '![b](/img/foo.png)');

  const entries = [
    { originalPath: '/repo/static/img/foo.png', oldLinks: ['static/img/foo.png', '/img/foo.png'] },
  ];
  const result = findReferences(entries, docsRoot);
  const refs = result.get('/repo/static/img/foo.png');
  assert.equal(refs.length, 2);
});

test('findReferences returns empty map when no docs reference the image', () => {
  const docsRoot = makeTmpDir();
  writeDoc(docsRoot, 'page.md', 'no images');

  const entries = [
    { originalPath: '/repo/static/img/foo.png', oldLinks: ['static/img/foo.png', '/img/foo.png'] },
  ];
  const result = findReferences(entries, docsRoot);
  assert.ok(!result.has('/repo/static/img/foo.png'));
});

// replaceLinks tests
test('replaceLinks replaces old links with new Azure URL in doc files', () => {
  const docsRoot = makeTmpDir();
  const docPath = writeDoc(docsRoot, 'page.md', '![foo](/img/foo.png) and ![foo](static/img/foo.png)');

  const entries = [
    {
      originalPath: '/repo/static/img/foo.png',
      oldLinks: ['static/img/foo.png', '/img/foo.png'],
      newLink: 'https://edfidocs.blob.core.windows.net/$web/img/foo.webp',
      status: 'uploaded',
    },
  ];
  const count = replaceLinks(entries, docsRoot);
  const content = fs.readFileSync(docPath, 'utf8');
  assert.ok(
    !content.includes('/img/foo.png'),
    'old /img/ link should be replaced'
  );
  assert.ok(
    !content.includes('static/img/foo.png'),
    'old static/ link should be replaced'
  );
  assert.ok(
    content.includes('https://edfidocs.blob.core.windows.net/$web/img/foo.webp'),
    'new Azure URL should appear'
  );
  assert.equal(count, 2, 'should count 2 replacements');
});

test('replaceLinks skips entries that are not status=uploaded', () => {
  const docsRoot = makeTmpDir();
  const docPath = writeDoc(docsRoot, 'page.md', '![foo](/img/foo.png)');

  const entries = [
    {
      originalPath: '/repo/static/img/foo.png',
      oldLinks: ['/img/foo.png'],
      newLink: 'https://azure.example.com/foo.webp',
      status: 'failed',
    },
  ];
  replaceLinks(entries, docsRoot);
  const content = fs.readFileSync(docPath, 'utf8');
  assert.ok(content.includes('/img/foo.png'), 'failed entry should not be replaced');
});

test('replaceLinks processes .md and .mdx files', () => {
  const docsRoot = makeTmpDir();
  writeDoc(docsRoot, 'page.md', '![x](/img/x.png)');
  writeDoc(docsRoot, 'page.mdx', '<img src="/img/x.png" />');
  writeDoc(docsRoot, 'other.txt', '/img/x.png');

  const entries = [
    {
      originalPath: '/repo/static/img/x.png',
      oldLinks: ['/img/x.png'],
      newLink: 'https://azure.example.com/x.webp',
      status: 'uploaded',
    },
  ];
  replaceLinks(entries, docsRoot);
  assert.ok(!fs.readFileSync(path.join(docsRoot, 'page.md'), 'utf8').includes('/img/x.png'));
  assert.ok(!fs.readFileSync(path.join(docsRoot, 'page.mdx'), 'utf8').includes('/img/x.png'));
  // .txt should NOT be modified
  assert.ok(fs.readFileSync(path.join(docsRoot, 'other.txt'), 'utf8').includes('/img/x.png'));
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
node --test eng/upload-assets/link-replacer.test.js
```

Expected: error — `Cannot find module './link-replacer'`

- [ ] **Step 3: Create link-replacer.js**

Create `eng/upload-assets/link-replacer.js`:

```js
const fs = require('fs');
const path = require('path');

function getOldLinks(filePath, repoRoot) {
  const rel = path.relative(repoRoot, filePath).replace(/\\/g, '/');
  // rel = 'static/img/sdlc/foo.png'
  const withoutStatic = rel.replace(/^static\//, '');
  // withoutStatic = 'img/sdlc/foo.png'
  return [rel, `/${withoutStatic}`];
}

function findDocFiles(docsRoot) {
  const results = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
        results.push(fullPath);
      }
    }
  }
  walk(docsRoot);
  return results;
}

function findReferences(entries, docsRoot) {
  const docFiles = findDocFiles(docsRoot);
  const result = new Map();

  for (const docFile of docFiles) {
    const content = fs.readFileSync(docFile, 'utf8');
    for (const { originalPath, oldLinks } of entries) {
      for (const link of oldLinks) {
        if (content.includes(link)) {
          if (!result.has(originalPath)) result.set(originalPath, new Set());
          result.get(originalPath).add(docFile);
          break;
        }
      }
    }
  }

  return new Map([...result].map(([k, v]) => [k, [...v]]));
}

function replaceLinks(entries, docsRoot) {
  const docFiles = findDocFiles(docsRoot);
  const uploadedEntries = entries.filter((e) => e.status === 'uploaded');
  let totalReplacements = 0;

  for (const docFile of docFiles) {
    let content = fs.readFileSync(docFile, 'utf8');
    let changed = false;

    for (const entry of uploadedEntries) {
      for (const oldLink of entry.oldLinks) {
        if (content.includes(oldLink)) {
          content = content.split(oldLink).join(entry.newLink);
          totalReplacements++;
          changed = true;
        }
      }
    }

    if (changed) fs.writeFileSync(docFile, content, 'utf8');
  }

  return totalReplacements;
}

module.exports = { getOldLinks, findReferences, replaceLinks };
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
node --test eng/upload-assets/link-replacer.test.js
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add eng/upload-assets/link-replacer.js eng/upload-assets/link-replacer.test.js
git commit -m "feat: add link-replacer module for finding and replacing image links"
```

---

### Task 5: azure.js — blob name, Azure URL, credential, upload

**Files:**
- Create: `eng/upload-assets/azure.js`
- Create: `eng/upload-assets/azure.test.js`

Tests cover the pure functions only (`getBlobName`, `getAzureUrl`). `getCredential` and `uploadBlob` call Azure and are excluded from unit tests.

- [ ] **Step 1: Create the test file**

Create `eng/upload-assets/azure.test.js`:

```js
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { getBlobName, getAzureUrl, STORAGE_ACCOUNT_URL, CONTAINER_NAME } = require('./azure');

test('getBlobName strips static/ prefix and changes extension to .webp by default', () => {
  const repoRoot = '/repo';
  const filePath = '/repo/static/img/sdlc/foo.png';
  const result = getBlobName(filePath, repoRoot, false);
  assert.equal(result, 'img/sdlc/foo.webp');
});

test('getBlobName preserves original extension when noConvert=true', () => {
  const repoRoot = '/repo';
  const filePath = '/repo/static/img/sdlc/foo.png';
  const result = getBlobName(filePath, repoRoot, true);
  assert.equal(result, 'img/sdlc/foo.png');
});

test('getBlobName handles JPG extension change to webp', () => {
  const repoRoot = '/repo';
  const filePath = '/repo/static/img/photo.jpg';
  const result = getBlobName(filePath, repoRoot, false);
  assert.equal(result, 'img/photo.webp');
});

test('getBlobName does not change extension for SVG', () => {
  const repoRoot = '/repo';
  const filePath = '/repo/static/img/icon.svg';
  const result = getBlobName(filePath, repoRoot, false);
  assert.equal(result, 'img/icon.svg');
});

test('getBlobName does not change extension for GIF', () => {
  const repoRoot = '/repo';
  const filePath = '/repo/static/img/anim.gif';
  const result = getBlobName(filePath, repoRoot, false);
  assert.equal(result, 'img/anim.gif');
});

test('getBlobName handles nested subdirectories', () => {
  const repoRoot = '/repo';
  const filePath = '/repo/static/img/reference/ods-api/fig1.png';
  const result = getBlobName(filePath, repoRoot, false);
  assert.equal(result, 'img/reference/ods-api/fig1.webp');
});

test('getAzureUrl returns correct blob storage URL', () => {
  const url = getAzureUrl('img/sdlc/foo.webp');
  assert.equal(url, `${STORAGE_ACCOUNT_URL}/$web/img/sdlc/foo.webp`);
});

test('STORAGE_ACCOUNT_URL defaults to edfidocs', () => {
  assert.equal(STORAGE_ACCOUNT_URL, 'https://edfidocs.blob.core.windows.net');
});

test('CONTAINER_NAME is $web', () => {
  assert.equal(CONTAINER_NAME, '$web');
});
```

- [ ] **Step 2: Run tests to confirm they fail**

```bash
node --test eng/upload-assets/azure.test.js
```

Expected: error — `Cannot find module './azure'`

- [ ] **Step 3: Create azure.js**

Create `eng/upload-assets/azure.js`:

```js
const { BlobServiceClient } = require('@azure/storage-blob');
const { DefaultAzureCredential } = require('@azure/identity');
const fs = require('fs');
const path = require('path');

const STORAGE_ACCOUNT_URL =
  process.env.AZURE_STORAGE_ACCOUNT_URL || 'https://edfidocs.blob.core.windows.net';
const CONTAINER_NAME = '$web';

const CONVERT_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);

const CONTENT_TYPES = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

function getBlobName(filePath, repoRoot, noConvert) {
  const rel = path.relative(repoRoot, filePath).replace(/\\/g, '/');
  // rel = 'static/img/sdlc/foo.png'
  const withoutStatic = rel.replace(/^static\//, '');
  // withoutStatic = 'img/sdlc/foo.png'

  if (!noConvert) {
    const ext = path.extname(withoutStatic).toLowerCase();
    if (CONVERT_EXTENSIONS.has(ext)) {
      return withoutStatic.slice(0, -ext.length) + '.webp';
    }
  }
  return withoutStatic;
}

function getAzureUrl(blobName) {
  return `${STORAGE_ACCOUNT_URL}/$web/${blobName.replace(/\\/g, '/')}`;
}

async function getCredential() {
  const credential = new DefaultAzureCredential();
  await credential.getToken('https://storage.azure.com/.default');
  return credential;
}

async function uploadBlob(processedPath, blobName, credential) {
  const client = new BlobServiceClient(STORAGE_ACCOUNT_URL, credential);
  const containerClient = client.getContainerClient(CONTAINER_NAME);
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const ext = path.extname(processedPath).toLowerCase();
  const contentType = CONTENT_TYPES[ext] || 'application/octet-stream';

  await blockBlobClient.uploadFile(processedPath, {
    blobHTTPHeaders: {
      blobContentType: contentType,
      blobCacheControl: 'public, max-age=31536000',
    },
  });
}

module.exports = {
  getBlobName,
  getAzureUrl,
  getCredential,
  uploadBlob,
  STORAGE_ACCOUNT_URL,
  CONTAINER_NAME,
};
```

- [ ] **Step 4: Run tests to confirm they pass**

```bash
node --test eng/upload-assets/azure.test.js
```

Expected: all 9 tests pass.

- [ ] **Step 5: Commit**

```bash
git add eng/upload-assets/azure.js eng/upload-assets/azure.test.js
git commit -m "feat: add Azure blob name, URL computation, and upload module"
```

---

### Task 6: upload-assets.js Phase 1 — `--prepare`

**Files:**
- Create: `eng/upload-assets.js`

This is the CLI entry point. Phase 1 wires together `compress.js`, `link-replacer.js`, `azure.js`, and `manifest.js`. Manual smoke-test replaces unit tests here since it orchestrates file I/O, sharp, and the manifest.

- [ ] **Step 1: Create upload-assets.js with Phase 1**

Create `eng/upload-assets.js`:

```js
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

  // Clear tmp dir for fresh run
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
```

- [ ] **Step 2: Smoke-test Phase 1 against the actual static/img folder**

```bash
node eng/upload-assets.js --prepare
```

Expected output (abbreviated):
```
📂 Scanning .../static/img for images...
   Found N image(s).
💾 Backing up originals...
   Backup saved to: .../asset-backup/2026-...
🔧 Processing images...
🔍 Finding doc references...
✅ Prepare complete
   Processed : N file(s)
```

Check that `asset-upload-manifest.json` exists at repo root and contains valid JSON with entries.

- [ ] **Step 3: Verify manifest looks correct**

```bash
node -e "const m = require('./asset-upload-manifest.json'); console.log(JSON.stringify(m.entries.slice(0,2), null, 2))"
```

Each entry should have `originalPath`, `processedPath`, `azureUrl`, `oldLinks`, `newLink`, `referencedIn`, `status: 'ready'`.

- [ ] **Step 4: Run with --no-convert flag to verify it works**

```bash
node eng/upload-assets.js --prepare --no-convert
```

Expected: entries have `processedPath` ending in `.png` / `.jpg` (not `.webp`), and `azureUrl` also preserves original extension.

- [ ] **Step 5: Commit**

```bash
git add eng/upload-assets.js
git commit -m "feat: add upload-assets CLI Phase 1 (--prepare)"
```

---

### Task 7: upload-assets.js Phase 2 — `--upload`

**Files:**
- Modify: `eng/upload-assets.js` (replace the stub `runUpload` function)

- [ ] **Step 1: Replace the runUpload stub in upload-assets.js**

Replace the existing `runUpload` function (the stub from Task 6) with:

```js
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
```

(`STORAGE_ACCOUNT_URL` was already added to the azure import in Task 6 — no additional import needed.)

- [ ] **Step 2: Verify the full script still shows usage when called with no flags**

```bash
node eng/upload-assets.js
```

Expected:
```
Usage: node eng/upload-assets.js --prepare | --upload
       Add --no-convert, --yes, --delete, --source <path> as needed.
```

- [ ] **Step 3: Verify --upload validates missing manifest**

```bash
rm -f asset-upload-manifest.json && node eng/upload-assets.js --upload
```

Expected: `❌ No manifest found. Run: npm run assets:prepare first.` and exit code 1.

- [ ] **Step 4: Commit**

```bash
git add eng/upload-assets.js
git commit -m "feat: add upload-assets CLI Phase 2 (--upload)"
```

---

### Task 8: Claude skill — `/upload-assets`

**Files:**
- Create: `.claude/skills/upload-assets/SKILL.md`

- [ ] **Step 1: Create the skill directory and SKILL.md**

Create `.claude/skills/upload-assets/SKILL.md`:

```markdown
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
```

- [ ] **Step 2: Verify the skill file is discoverable**

```bash
node -e "const fs = require('fs'); const s = fs.readFileSync('.claude/skills/upload-assets/SKILL.md', 'utf8'); console.log('Skill found, length:', s.length)"
```

Expected: `Skill found, length: <number>` — no errors.

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/upload-assets/SKILL.md
git commit -m "feat: add /upload-assets Claude skill"
```

---

### Task 9: Run all tests and final verification

- [ ] **Step 1: Run the full test suite**

```bash
node --test eng/upload-assets/manifest.test.js eng/upload-assets/compress.test.js eng/upload-assets/link-replacer.test.js eng/upload-assets/azure.test.js
```

Expected: all tests pass, 0 failures.

- [ ] **Step 2: Run a full end-to-end prepare smoke test**

```bash
node eng/upload-assets.js --prepare
node -e "const m=require('./asset-upload-manifest.json'); console.log('Entries:', m.entries.length, '| First entry status:', m.entries[0]?.status)"
```

Expected: `Entries: N | First entry status: ready`

- [ ] **Step 3: Verify npm scripts work**

```bash
npm run assets:prepare -- --help 2>&1 | head -3
```

Expected: usage line from the script.

- [ ] **Step 4: Commit final state**

```bash
git add -A
git status
```

Verify only expected files are staged, then:

```bash
git commit -m "feat: complete asset upload utility implementation" --allow-empty-message 2>/dev/null || true
# (only commit if there are uncommitted changes from the above tasks)
```
