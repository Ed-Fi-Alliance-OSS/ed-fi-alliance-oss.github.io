const fs = require('fs');
const path = require('path');
const { load } = require('cheerio');

function safeReadJson(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    return null;
  }
}

function listFiles(dir) {
  try {
    return fs.readdirSync(dir);
  } catch {
    return [];
  }
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function normalizeSlug(str) {
  return String(str || '')
    .toLowerCase()
    .replace(/[^a-z0-9\-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isVersionedPlugin(pluginId) {
  return pluginId === 'odsApi' || pluginId === 'dataStandard';
}

function readVersionList(siteDir, pluginId) {
  const fileMap = {
    odsApi: 'odsApi_versions.json',
    dataStandard: 'dataStandard_versions.json',
  };
  const fileName = fileMap[pluginId];
  if (!fileName) return [];
  const filePath = path.join(siteDir, fileName);
  const arr = safeReadJson(filePath);
  return Array.isArray(arr) ? arr : [];
}

function compareVersion(a, b) {
  // simple comparator for versions like '7.3', '6.2', '6'
  const ap = String(a).split('.').map((x) => parseInt(x, 10));
  const bp = String(b).split('.').map((x) => parseInt(x, 10));
  const len = Math.max(ap.length, bp.length);
  for (let i = 0; i < len; i++) {
    const ai = ap[i] || 0;
    const bi = bp[i] || 0;
    if (ai > bi) return 1;
    if (ai < bi) return -1;
  }
  return 0;
}

function getLatestVersion(versions) {
  if (!versions || versions.length === 0) return null;
  return versions.slice().sort(compareVersion).pop();
}

function resolveVersion(metaVersion, pluginId, versions) {
  if (!isVersionedPlugin(pluginId)) return metaVersion || 'current';
  if (metaVersion && metaVersion !== 'current') return metaVersion;
  const latest = getLatestVersion(versions);
  return latest || 'current';
}

function findSidebarData(siteDir, pluginId) {
  const pDir = path.join(siteDir, '.docusaurus', 'docusaurus-plugin-content-docs', pluginId, 'p');
  const pFiles = listFiles(pDir).filter((f) => f.endsWith('.json'));
  if (pFiles.length === 0) return null;
  const filePath = path.join(pDir, pFiles[0]);
  return safeReadJson(filePath);
}

function findVersionedSidebar(siteDir, pluginId, version) {
  // Prefer repo-managed versioned sidebars if present
  const repoSidebarsDirMap = {
    odsApi: 'odsApi_versioned_sidebars',
    dataStandard: 'dataStandard_versioned_sidebars',
  };
  const dirName = repoSidebarsDirMap[pluginId];
  if (!dirName) return null;
  const filePath = path.join(siteDir, dirName, `version-${version}-sidebars.json`);
  const data = safeReadJson(filePath);
  return data;
}

function listDocMeta(siteDir, pluginId) {
  const docsDir = path.join(siteDir, '.docusaurus', 'docusaurus-plugin-content-docs', pluginId);
  const files = listFiles(docsDir).filter((f) => f.startsWith('site-') && f.endsWith('.json'));
  const metas = [];
  for (const f of files) {
    const meta = safeReadJson(path.join(docsDir, f));
    if (meta && meta.permalink) metas.push(meta);
  }
  return metas;
}

function buildBreadcrumbsFromSidebars(sidebarData, docMeta) {
  if (!sidebarData) return [];
  const sidebars = sidebarData.sidebars || sidebarData.docsSidebars || {};
  const targetId = docMeta.id;
  const targetPermalink = docMeta.permalink;

  function searchItems(items, trail) {
    for (const item of items || []) {
      if (item.type === 'category') {
        const newTrail = trail.concat([{ label: item.label, href: item.href || null }]);
        const found = searchItems(item.items, newTrail);
        if (found) return found;
      } else if (item.type === 'doc' && item.id === targetId) {
        return trail.concat([{ label: docMeta.title, href: targetPermalink }]);
      } else if (item.type === 'link' && item.href === targetPermalink) {
        return trail.concat([{ label: item.label || docMeta.title, href: targetPermalink }]);
      }
    }
    return null;
  }

  for (const sidebarKey of Object.keys(sidebars)) {
    const items = sidebars[sidebarKey];
    const foundTrail = searchItems(items, []);
    if (foundTrail) {
      return foundTrail;
    }
  }
  return [];
}

function parseHtmlForDoc(outDir, permalink) {
  // try /path/index.html then /path.html
  const base = permalink.replace(/^\//, '');
  const indexPath = path.join(outDir, base, 'index.html');
  let htmlPath = null;
  if (fs.existsSync(indexPath)) {
    htmlPath = indexPath;
  } else {
    const fileHtml = path.join(outDir, `${base}.html`);
    if (fs.existsSync(fileHtml)) {
      htmlPath = fileHtml;
    }
  }
  if (!htmlPath) return null;

  const html = fs.readFileSync(htmlPath, 'utf8');
  const $ = load(html);
  const article = $('article');
  const root = article.length ? article : $.root();

  const fullText = root.text().trim();
  const headings = root.find('h2, h3');
  const chunks = [];
  const allElems = root.find('*').toArray();
  const headingIndices = allElems
    .map((el, idx) => ({ el, idx }))
    .filter(({ el }) => ['h2', 'h3'].includes(el.tagName?.toLowerCase?.()));

  function extractRange(startIdx, endIdx) {
    const slice = allElems.slice(startIdx, endIdx);
    const htmlSlice = slice.map((el) => $.html(el)).join('\n');
    const textSlice = slice.map((el) => $(el).text()).join('\n').trim();
    return { html: htmlSlice, text: textSlice };
  }

  for (let i = 0; i < headingIndices.length; i++) {
    const { el, idx } = headingIndices[i];
    const nextIdx = i + 1 < headingIndices.length ? headingIndices[i + 1].idx : allElems.length;
    const headingText = $(el).text().trim();
    const headingId = $(el).attr('id') || normalizeSlug(headingText);
    const { html: htmlSlice, text: textSlice } = extractRange(idx, nextIdx);
    chunks.push({
      heading: headingText,
      headingId,
      level: el.tagName?.toLowerCase?.() || 'h2',
      html: htmlSlice,
      text: textSlice,
    });
  }

  const toc = headings.toArray().map((h) => ({
    id: $(h).attr('id') || normalizeSlug($(h).text()),
    value: $(h).text().trim(),
    level: h.tagName?.toLowerCase?.() === 'h3' ? 3 : 2,
  }));
  const images = root.find('img').toArray().map((img) => ({
    src: $(img).attr('src'),
    alt: $(img).attr('alt') || null,
  }));
  const links = root.find('a').toArray().map((a) => ({
    href: $(a).attr('href'),
    text: $(a).text().trim(),
  }));

  return { fullText, chunks, toc, images, links, htmlPath };
}

function writeJson(filePath, data) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function computeCanonicalPageId(pluginId, permalink, versions) {
  if (!isVersionedPlugin(pluginId) || !versions || versions.length === 0) {
    return `${pluginId}:${permalink}`;
  }
  const parts = permalink.split('/').filter(Boolean);
  const filtered = parts.filter((p) => !versions.includes(p));
  const canonicalPath = '/' + filtered.join('/');
  return `${pluginId}:${canonicalPath}`;
}

module.exports = function docsExportPlugin(context, options) {
  return {
    name: 'docs-export-plugin',
    async postBuild(props) {
      const siteDir = process.cwd();
      const outDir = props.outDir;

      const pluginIds = options.pluginIds || [
        'getting-started',
        'partners',
        'community',
        'reference',
        'odsApi',
        'dataStandard',
      ];

      for (const pluginId of pluginIds) {
        const versionList = isVersionedPlugin(pluginId) ? readVersionList(siteDir, pluginId) : [];
        const metas = listDocMeta(siteDir, pluginId);
        for (const meta of metas) {
          const resolvedVersion = resolveVersion(meta.version, pluginId, versionList);

          // Sidebar selection per version (fallback to generic)
          const sidebarData = isVersionedPlugin(pluginId)
            ? (findVersionedSidebar(siteDir, pluginId, resolvedVersion) || findSidebarData(siteDir, pluginId))
            : findSidebarData(siteDir, pluginId);

          const breadcrumbs = buildBreadcrumbsFromSidebars(sidebarData, meta);
          const parsed = parseHtmlForDoc(outDir, meta.permalink) || { fullText: '', chunks: [], toc: [], images: [], links: [], htmlPath: null };

          const docOutBase = path.join(outDir, 'export', 'docs', pluginId, String(resolvedVersion));
          const chunkOutBase = path.join(outDir, 'export', 'chunks', pluginId, String(resolvedVersion), meta.id);

          const compositeId = `${pluginId}:${resolvedVersion}:${meta.id}`;
          const canonicalPageId = computeCanonicalPageId(pluginId, meta.permalink, versionList);

          const docPayload = {
            id: meta.id,
            pluginId,
            version: resolvedVersion,
            locale: props.i18n?.defaultLocale || 'en',
            title: meta.title,
            description: meta.description,
            slug: meta.slug,
            permalink: meta.permalink,
            sourcePath: meta.source,
            sidebarId: meta.sidebar || null,
            breadcrumbs,
            frontMatter: meta.frontMatter || {},
            tags: meta.tags || [],
            previous: meta.previous || null,
            next: meta.next || null,
            toc: parsed.toc,
            images: parsed.images,
            links: parsed.links,
            htmlPath: parsed.htmlPath,
            text: parsed.fullText,
            compositeId,
            canonicalPageId,
          };

          writeJson(path.join(docOutBase, `${meta.id}.json`), docPayload);

          // Emit per-chunk files
          for (const chunk of parsed.chunks) {
            const chunkPayload = {
              id: meta.id,
              pluginId,
              version: resolvedVersion,
              locale: props.i18n?.defaultLocale || 'en',
              permalink: meta.permalink,
              heading: chunk.heading,
              headingId: chunk.headingId,
              level: chunk.level,
              html: chunk.html,
              text: chunk.text,
              breadcrumbs,
              toc: parsed.toc,
              frontMatter: meta.frontMatter || {},
              tags: meta.tags || [],
              compositeId,
              canonicalPageId,
            };
            const chunkFileName = `${normalizeSlug(chunk.headingId || chunk.heading || 'section')}.json`;
            writeJson(path.join(chunkOutBase, chunkFileName), chunkPayload);
          }
        }
      }
    },
  };
};
