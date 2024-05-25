// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// const lightCodeTheme = require('prism-react-renderer/themes/github');
// const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Ed-Fi Alliance',
  tagline: 'Connecting Education Data. Seamlessly. Securely.',
  favicon: 'img/tech-congress-favicon.png',

  // Set the production url of your site here
  url: 'https://ed-fi-alliance-oss.github.io',
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
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ed-fi-alliance-oss/ed-fi-alliance-oss.github.io/tree/main/packages/docs/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/ed-fi-alliance-oss/ed-fi-alliance-oss.github.io/tree/main/blog/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/ed-fi-social-card.jpg',
      navbar: {
        //title: 'Ed-Fi Alliance ',
        logo: {
          alt: 'Ed-Fi Docs Logo',
          src: 'img/ed-fi-logo.webp',
        },
        items: [
          // {to: '/getting-started', label: 'Getting Started', position: 'left'},
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'API Docs',
          },
          {
            type: 'docsVersionDropdown',
            position: 'left',
          },
          {to: '/blog', label: 'Developer Blog', position: 'left'},
          {
            href: 'https://github.com/Ed-Fi-Alliance-OSS/',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://success.ed-fi.org/',
            label: 'Community',
            position: 'right',
          },
          {
            href: 'https://academy.ed-fi.org/',
            label: 'Academy',
            position: 'right',
          },
        ],
      },
      // algolia: {
      //   // The application ID provided by Algolia
      //   appId: 'FO340LC414',

      //   // Public API key: it is safe to commit it
      //   apiKey: 'b6725a50a8f5cc2d56e128cd62b5ef1f',

      //   indexName: 'teched-fi',

      //   // Optional: see doc section below
      //   contextualSearch: true,

      //   // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      //   externalUrlRegex: 'external\\.com|domain\\.com',

      //   // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      //   replaceSearchResultPathname: {
      //     from: '/docs/', // or as RegExp: /\/docs\//
      //     to: '/',
      //   },

      //   // Optional: Algolia search parameters
      //   searchParameters: {},

      //   // Optional: path for search page that enabled by default (`false` to disable it)
      //   searchPagePath: 'search',

      //   placeholder: 'Ask me something',

      //   //... other Algolia params
      //   headerLinks: [
      //     { search: true }
      //   ],
      // },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Ed-Fi Academy',
                href: 'https://academy.ed-fi.org',
              },
              {
                label: 'Ed-Fi Success',
                href: 'https://success.ed-fi.org',
              },
              {
                label: 'Ed-Fi Slack',
                href: '#',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'News',
                to: 'https://www.ed-fi.org/blog',
              },
              {
                label: 'Ed-Fi GitHub',
                href: 'https://github.com/Ed-Fi-Alliance-OSS/',
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
      // prism: {
      //   theme: lightCodeTheme,
      //   darkTheme: darkCodeTheme,
      // },
    }),
};

export default config;
