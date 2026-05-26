const { test } = require('node:test');
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
  // 300x300 truly random noise image ~270KB, well above SKIP_BELOW_BYTES
  const noise = Buffer.allocUnsafe(300 * 300 * 3);
  for (let i = 0; i < noise.length; i++) noise[i] = Math.floor(Math.random() * 256);
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
    () => Promise.resolve().then(() => backup([file], srcDir, backupRoot)),
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

test('processImage compresses JPG without converting when noConvert=true', async () => {
  const dir = makeTmpDir();
  const src = path.join(dir, 'large.jpg');
  const dest = path.join(dir, 'large-compressed.jpg');
  // Create a large JPG using sharp
  const noise = Buffer.alloc(300 * 300 * 3);
  for (let i = 0; i < noise.length; i++) noise[i] = Math.floor(Math.random() * 256);
  await sharp(noise, { raw: { width: 300, height: 300, channels: 3 } }).jpeg().toFile(src);
  assert.ok(fs.statSync(src).size > SKIP_BELOW_BYTES, 'test jpg should be > SKIP_BELOW_BYTES');

  const result = await processImage(src, dest, true);

  assert.ok(result !== null);
  assert.ok(fs.existsSync(dest), 'compressed jpg should exist');
  const meta = await sharp(dest).metadata();
  assert.equal(meta.format, 'jpeg');
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
