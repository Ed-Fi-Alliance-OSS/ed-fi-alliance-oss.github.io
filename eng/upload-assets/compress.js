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
