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
