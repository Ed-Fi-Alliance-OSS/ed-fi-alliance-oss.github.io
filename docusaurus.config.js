// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ed-Fi Alliance',
  tagline: 'Connecting Education Data. Seamlessly. Securely.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.ed-fi.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'ed-fi-alliance-oss', // Usually your GitHub org/user name.
  projectName: 'ed-fi-alliance-oss.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          id: 'getting-started',
          path: 'docs/getting-started',
          editUrl: ({ docPath }) =>
            `https://github.com/ed-fi-alliance-oss/ed-fi-alliance-oss.github.io/tree/main/docs/getting-started/${docPath}/`,
          routeBasePath: 'getting-started',
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/ed-fi-alliance-oss/ed-fi-alliance-oss.github.io/tree/main/blog/',
        },
        googleTagManager: {
          containerId: 'GTM-KGR2977',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'partners',
        path: 'docs/partners',
        editUrl: ({ docPath }) =>
          `https://github.com/ed-fi-alliance-oss/ed-fi-alliance-oss.github.io/tree/main/docs/partners/${docPath}/`,
        routeBasePath: 'partners',
        sidebarPath: './sidebars.js',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'reference',
        path: 'docs/reference',
        editUrl: ({ docPath }) =>
          `https://github.com/ed-fi-alliance-oss/ed-fi-alliance-oss.github.io/tree/main/docs/reference/${docPath}/`,
        routeBasePath: 'reference',
        sidebarPath: './sidebars.js',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'community',
        path: 'docs/community',
        editUrl: ({ docPath }) =>
          `https://github.com/ed-fi-alliance-oss/ed-fi-alliance-oss.github.io/tree/main/docs/community/${docPath}/`,
        routeBasePath: 'community',
        sidebarPath: './sidebars.js',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'odsApi',
        // path: 'docs/reference/2-ods-api',
        editUrl: ({ docPath,versionDocsDirPath }) =>
          `https://github.com/ed-fi-alliance-oss/ed-fi-alliance-oss.github.io/tree/main/${versionDocsDirPath}/${docPath}/`,
        routeBasePath: 'reference/ods-api',
        sidebarPath: './sidebars.js',
        includeCurrentVersion: false,
        lastVersion: '7.3',
        versions: {
          5.4: {
            banner: 'none',
            badge: true,
            path: '5.4',
            className: 'active',
          },
          6.2: {
            banner: 'none',
            badge: true,
            path: '6.2',
            className: 'active',
          },
          7.1: {
            banner: 'none',
            badge: true,
            path: '7.1',
            className: 'active',
          },
          7.2: { banner: 'unmaintained', badge: true, path: '7.2' },
          7.3: { banner: 'none', badge: true },
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'dataStandard',
        editUrl: ({ docPath,versionDocsDirPath }) =>
          `https://github.com/ed-fi-alliance-oss/ed-fi-alliance-oss.github.io/tree/main/${versionDocsDirPath}/${docPath}`,
        routeBasePath: 'reference/data-exchange/data-standard',
        sidebarPath: './sidebars.js',
        includeCurrentVersion: false,
        lastVersion: '5',
        versions: {
          5: { banner: 'none', badge: true },
          4: {
            banner: 'none',
            badge: true,
            path: '4',
            className: 'active',
          },
          3: {
            banner: 'none',
            badge: true,
            path: '3',
            className: 'active',
          },
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/ed-fi-social-card.jpg',
      navbar: {
        logo: {
          alt: 'Ed-Fi Docs Logo',
          src: 'img/ed-fi-logo.webp',
          srcDark: 'img/ed-fi-logo-light.webp',
        },
        items: [
          {
            to: '/getting-started',
            label: 'Getting Started',
            position: 'left',
          },
          { to: '/partners', label: 'Partners', position: 'left' },
          { to: '/community', label: 'Community', position: 'left' },
          { to: '/reference', label: 'Reference', position: 'left' },
          { to: '/blog', label: 'Dev Blog', position: 'left' },
          {
            href: 'https://academy.ed-fi.org/',
            label: 'Academy',
            position: 'right',
          },
          {
            href: 'https://www.ed-fi.org/',
            label: 'ed-fi.org',
            position: 'right',
          },
        ],
      },
      prism: {
        additionalLanguages: ['powershell', 'csharp', 'sql', 'json', 'ini', 'bash'],
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'HFTFG7KSKA',

        // Public API key: it is safe to commit it
        apiKey: 'a58d193c70793d68151589d3cfbdeb6b',

        indexName: 'ed-fi-alliance-ossio',

        // Optional: see doc section below
        contextualSearch: false,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp: /\/docs\//
          to: '/',
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

        placeholder: 'Ask me something',

        //... other Algolia params
        headerLinks: [{ search: true }],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              { to: '/getting-started', label: 'Getting Started' },
              { to: '/partners', label: 'Partners' },
              { to: '/community', label: 'Community' },
              { to: '/reference', label: 'Reference' },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                href: 'https://community.ed-fi.org/',
                label: 'Community Hub',
                position: 'right',
              },
              {
                href: 'https://academy.ed-fi.org/',
                label: 'Academy',
                position: 'right',
              },
              {
                href: '/getting-started/edfi-exchange/',
                label: 'Exchange',
                position: 'right',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Ed-Fi Alliance',
                href: 'https://www.ed-fi.org',
              },
              {
                label: 'Ed-Fi News',
                href: 'https://www.ed-fi.org/blog',
              },
              {
                label: 'Ed-Fi Events',
                href: 'https://www.ed-fi.org/events/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Ed-Fi Alliance.`,
      },
      docs: {
        sidebar: {
          hideable: true,
        },
      },
    }),
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
      },
    },
  ],
  stylesheets: [
    {
      href: 'https://unpkg.com/@antonz/codapi@0.19.7/dist/snippet.css',
    },
  ],
  scripts: [
    {
      src: 'https://unpkg.com/@antonz/codapi@0.19.7/dist/snippet.js',
      defer: true,
    },
  ],
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
