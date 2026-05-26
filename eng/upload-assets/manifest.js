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
