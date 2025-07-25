const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Get the folder path from command line arguments
const folderPath = process.argv[2];

if (!folderPath) {
  console.error('Usage: node lint-folder.js <folder-path>');
  console.error('Example: node lint-folder.js docs/reference/8-admin-app');
  process.exit(1);
}

try {
  // Run markdownlint-cli2
  execSync(`markdownlint-cli2 "${folderPath}/**/*.md"`, { stdio: 'inherit' });
} catch (error) {
  console.error(`❌ markdownlint-cli2 failed`);
  process.exit(1);
}

try {
  // Check if any .mdx files exist before running ESLint
  const mdxPattern = path.join(folderPath, '**/*.mdx').replace(/\\/g, '/');
  const mdxFiles = glob.sync(mdxPattern);
  if (mdxFiles.length === 0) {
    console.log(`ℹ️  No .mdx files found in ${folderPath} - skipping ESLint`);
  } else {
    // Run eslint
    execSync(`eslint "${folderPath}/**/*.mdx"`, { stdio: 'inherit' });
  }
} catch (error) {
  console.error(`❌ ESLint failed: ${error.message}`);
  process.exit(1);
}

console.log('✅ Linting completed successfully');
