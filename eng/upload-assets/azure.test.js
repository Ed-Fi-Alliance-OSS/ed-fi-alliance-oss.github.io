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
