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
  assert.ok(!content.includes('/img/foo.png'), 'old /img/ link should be replaced');
  assert.ok(!content.includes('static/img/foo.png'), 'old static/ link should be replaced');
  assert.ok(content.includes('https://edfidocs.blob.core.windows.net/$web/img/foo.webp'), 'new Azure URL should appear');
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
  assert.ok(fs.readFileSync(path.join(docsRoot, 'other.txt'), 'utf8').includes('/img/x.png'));
});
