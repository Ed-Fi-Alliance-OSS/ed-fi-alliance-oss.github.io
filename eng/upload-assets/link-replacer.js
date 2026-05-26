const fs = require('fs');
const path = require('path');

function getOldLinks(filePath, repoRoot) {
  const rel = path.relative(repoRoot, filePath).replace(/\\/g, '/');
  const withoutStatic = rel.replace(/^static\//, '');
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
        const parts = content.split(oldLink);
        if (parts.length > 1) {
          content = parts.join(entry.newLink);
          totalReplacements += parts.length - 1;
          changed = true;
        }
      }
    }

    if (changed) fs.writeFileSync(docFile, content, 'utf8');
  }

  return totalReplacements;
}

module.exports = { getOldLinks, findReferences, replaceLinks };
