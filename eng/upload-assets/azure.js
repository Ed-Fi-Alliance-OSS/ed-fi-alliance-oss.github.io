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
  const withoutStatic = rel.replace(/^static\//, '');

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
