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
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/ed-fi-alliance-oss/ed-fi-alliance-oss.github.io/tree/main/blog/',
        },
        sitemap: {
          lastmod: 'date',
        },
        googleTagManager: {
          containerId: 'GTM-KGR2977',
        },
        theme: {
          customCss: ['./src/css/custom.css', './src/css/layout-overrides.css'],
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
        showLastUpdateTime: true,
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
        showLastUpdateTime: true,
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
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'odsApi',
        // path: 'docs/reference/2-ods-api',
        editUrl: ({ docPath, versionDocsDirPath }) =>
          `https://github.com/ed-fi-alliance-oss/ed-fi-alliance-oss.github.io/tree/main/${versionDocsDirPath}/${docPath}/`,
        routeBasePath: 'reference/ed-fi-api',
        sidebarPath: './sidebars.js',
        showLastUpdateTime: true,
        includeCurrentVersion: false,
        lastVersion: '7.3',
        versions: {
          5.4: {
            banner: 'none',
            badge: true,
            path: '5.4',
            className: 'unmaintained',
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
          8: {
            banner: 'none',
            badge: true,
            path: '8',
          },
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'dataStandard',
        editUrl: ({ docPath, versionDocsDirPath }) =>
          `https://github.com/ed-fi-alliance-oss/ed-fi-alliance-oss.github.io/tree/main/${versionDocsDirPath}/${docPath}`,
        routeBasePath: 'reference/data-exchange/data-standard',
        sidebarPath: './sidebars.js',
        showLastUpdateTime: true,
        includeCurrentVersion: false,
        lastVersion: '6',
        versions: {
          6: { banner: 'none', badge: true },
          5: {
            banner: 'none',
            badge: true,
            path: '5',
            className: 'active',
          },
          4: {
            banner: 'none',
            badge: true,
            path: '4',
            className: 'active',
          },
          3: {
            banner: 'unmaintained',
            badge: true,
            path: '3',
            className: 'unmaintained',
          },
        },
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // Legacy /system-administrators/* routes redirect directly to their
          // final destinations (no redirect chains).
          {
            from: '/reference/admin-app/system-administrators',
            to: '/reference/admin-app/getting-started',
          },
          {
            from: '/reference/admin-app/system-administrators/installing',
            to: '/reference/admin-app/getting-started',
          },
          {
            from: '/reference/admin-app/system-administrators/identity-provider',
            to: '/reference/admin-app/configuration/identity-provider',
          },
          {
            from: '/reference/admin-app/system-administrators/global-administration-tasks',
            to: '/reference/admin-app/configuration/global-administration-tasks',
          },
          {
            from: '/reference/admin-app/system-administrators/maintenance',
            to: '/reference/admin-app/maintenance',
          },
          {
            from: '/reference/admin-app/system-administrators/troubleshooting',
            to: '/reference/admin-app/troubleshooting',
          },
          {
            from: '/reference/admin-app/system-administrators/yopass-administrators-guide',
            to: '/reference/admin-app/configuration/yopass-administrators-guide',
          },
          {
            from: '/reference/admin-app/system-administrators/yopass-user-guide',
            to: '/reference/admin-app/configuration/yopass-administrators-guide/yopass-user-guide',
          },
          // Routes changed by the 2025 Admin App docs reorganization.
          {
            from: '/reference/admin-app/getting-started/installing/docker-installation',
            to: '/reference/admin-app/getting-started/admin-app-4.0/docker-installation',
          },
          {
            from: '/reference/admin-app/getting-started/installing/windows-iis-installation',
            to: '/reference/admin-app/getting-started/admin-app-4.0/windows-iis-installation',
          },
          {
            from: '/reference/admin-app/getting-started/installing/unix-installation',
            to: '/reference/admin-app/getting-started/admin-app-4.0/unix-installation',
          },
          {
            from: '/reference/admin-app/getting-started/identity-provider',
            to: '/reference/admin-app/configuration/identity-provider',
          },
          {
            from: '/reference/admin-app/getting-started/security-considerations',
            to: '/reference/admin-app/configuration/security-considerations',
          },
          {
            from: '/reference/admin-app/getting-started/global-administration-tasks',
            to: '/reference/admin-app/configuration/global-administration-tasks',
          },
          {
            from: '/reference/admin-app/getting-started/configuration',
            to: '/reference/admin-app/configuration/configuring-admin-app',
          },
          {
            from: '/reference/admin-app/getting-started/yopass-administrators-guide',
            to: '/reference/admin-app/configuration/yopass-administrators-guide',
          },
          {
            from: '/reference/admin-app/getting-started/yopass-user-guide',
            to: '/reference/admin-app/configuration/yopass-administrators-guide/yopass-user-guide',
          },
          {
            from: '/reference/admin-app/getting-started/maintenance',
            to: '/reference/admin-app/maintenance',
          },
          {
            from: '/reference/admin-app/getting-started/troubleshooting',
            to: '/reference/admin-app/troubleshooting',
          },
          // Renamed off of "exchange" as part of the Community Tools rebrand.
          {
            from: '/reference/roadmap/notifications/admin-app-to-exchange',
            to: '/reference/roadmap/notifications/admin-app-to-community-tools',
          },
          // Assessment provider pages moved under domain-api-tutorial.
          {
            from: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-implementation/assessment-providers-data-model/learning-standards-and-learning-objective-entities',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/domain-api-tutorial/assessment-providers-data-model/learning-standards-and-learning-objective-entities',
          },
          {
            from: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-implementation/assessment-providers-data-pull-model',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/domain-api-tutorial/assessment-providers-data-pull-model',
          },
          {
            from: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-implementation/assessment-providers-use-cases',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/domain-api-tutorial/assessment-providers-use-cases',
          },
          {
            from: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-implementation/assessment-providers-sandbox/assessment-providers-activity-1',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/domain-api-tutorial/assessment-providers-sandbox/assessment-providers-activity-1',
          },
          {
            from: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-implementation/ed-fi-ods-api-authorization-for-assessment-providers',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/domain-api-tutorial/ed-fi-ods-api-authorization-for-assessment-providers',
          },
          {
            from: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-implementation/assessment-providers-data-model/key-structure',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/domain-api-tutorial/assessment-providers-data-model/key-structure',
          },
          {
            from: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-implementation/assessment-providers-data-model/objective-assessment-entity',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/domain-api-tutorial/assessment-providers-data-model/objective-assessment-entity',
          },
          {
            from: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-implementation/assessment-providers-data-model',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/domain-api-tutorial/assessment-providers-data-model',
          },
          // Admin API docs moved under getting-started.
          {
            from: '/reference/admin-api/admin-api-2.x/installation-for-odsapi-7x/first-time-configuration-for-admin-api-2x',
            to: '/reference/admin-api/getting-started/admin-api-2.2-older/installation-for-odsapi-7x/first-time-configuration-for-admin-api-2x',
          },
          {
            from: '/reference/admin-api/admin-api-1.x/technical-articles/admin-api-1x-docker-microsoft-sql-server-support',
            to: '/reference/admin-api/getting-started/admin-api-1.x/technical-articles/admin-api-1x-docker-microsoft-sql-server-support',
          },
          {
            from: '/reference/admin-api/admin-api-1.x/technical-articles/quick-start-calling-admin-1x-api-using-python',
            to: '/reference/admin-api/getting-started/admin-api-1.x/technical-articles/quick-start-calling-admin-1x-api-using-python',
          },
          {
            from: '/reference/admin-api/admin-api-2.x/technical-articles/quick-start-calling-admin-api-2x-using-python',
            to: '/reference/admin-api/getting-started/admin-api-2.2-older/technical-articles/quick-start-calling-admin-api-2x-using-python',
          },
          {
            from: '/reference/admin-api/admin-api-1.x/installation-for-odsapi-5x-6x/admin-api-1x-docker-installation',
            to: '/reference/admin-api/getting-started/admin-api-1.x/installation-for-odsapi-5x-6x/admin-api-1x-docker-installation',
          },
          // ODS Admin App (pre-v4) docs moved to Community Tools.
          {
            from: '/reference/admin-app/getting-started/known-issues',
            to: '/getting-started/community-tools/technology/ods-admin-app/getting-started/known-issues',
          },
          {
            from: '/reference/admin-app/technical-articles/manually-restricting-access-to-a-single-education-organization',
            to: '/getting-started/community-tools/technology/ods-admin-app/technical-articles/manually-restricting-access-to-a-single-education-organization',
          },
          {
            from: '/reference/ods-admin-app/getting-started/next-steps',
            to: '/getting-started/community-tools/technology/ods-admin-app/next-steps',
          },
          {
            from: '/reference/admin-app/technical-articles/resetting-admin-app-configuration',
            to: '/getting-started/community-tools/technology/ods-admin-app/technical-articles/resetting-admin-app-configuration',
          },
          {
            from: '/reference/ods-admin-app/getting-started/multi-instance-connections',
            to: '/getting-started/community-tools/technology/ods-admin-app/getting-started/multi-instance-connections',
          },
          // Analytics Middle Tier docs moved to Community Tools.
          {
            from: '/reference/analytics-middle-tier/deployment-guide/replacing-the-edfi-schema-in-source-code',
            to: '/getting-started/community-tools/technology/analytics-middle-tier/deployment-guide/replacing-the-edfi-schema-in-source-code',
          },
          {
            from: '/reference/analytics-middle-tier/deployment-guide/limiting-impact-on-the-production-ods',
            to: '/getting-started/community-tools/technology/analytics-middle-tier/deployment-guide/limiting-impact-on-the-production-ods',
          },
          {
            from: '/reference/analytics-middle-tier/user-guide/how-to-use-the-student-dimensions',
            to: '/getting-started/community-tools/technology/analytics-middle-tier/user-guide/how-to-use-the-student-dimensions',
          },
          {
            from: '/reference/analytics-middle-tier/deployment-guide/administrative-security',
            to: '/getting-started/community-tools/technology/analytics-middle-tier/deployment-guide/administrative-security',
          },
          {
            from: '/reference/analytics-middle-tier/user-guide/collections/engage-online-learners-collection/engage_assignmentsubmissionfact-view',
            to: '/getting-started/community-tools/technology/analytics-middle-tier/user-guide/collections/engage-online-learners-collection/engage_assignmentsubmissionfact-view',
          },
          {
            from: '/reference/analytics-middle-tier/deployment-guide',
            to: '/getting-started/community-tools/technology/analytics-middle-tier/deployment-guide/',
          },
          {
            from: '/reference/analytics-middle-tier/user-guide/collections/installation-journal-tables',
            to: '/getting-started/community-tools/technology/analytics-middle-tier/user-guide/collections/installation-journal-tables',
          },
          {
            from: '/reference/analytics-middle-tier/user-guide/collections/core-view-collection/studentschooldim-view',
            to: '/getting-started/community-tools/technology/analytics-middle-tier/user-guide/collections/core-view-collection/studentschooldim-view',
          },
          {
            from: '/reference/analytics-middle-tier/user-guide/collections/assessment-collection',
            to: '/getting-started/community-tools/technology/analytics-middle-tier/user-guide/collections/assessment-collection/',
          },
          {
            from: '/reference/analytics-middle-tier/user-guide/collections/core-view-collection/studentlocaleducationagencydemographicsbridge-view',
            to: '/getting-started/community-tools/technology/analytics-middle-tier/user-guide/collections/core-view-collection/studentlocaleducationagencydemographicsbridge-view',
          },
          {
            from: '/reference/analytics-middle-tier/deployment-guide/descriptor-mapping',
            to: '/getting-started/community-tools/technology/analytics-middle-tier/deployment-guide/descriptor-mapping',
          },
          // "API Key Structures" renamed to "Resource IDs and Natural Keys" (#713).
          {
            from: '/getting-started/provider-playbook/implementation/ed-fi-api-fundamentals/api-key-structures',
            to: '/getting-started/provider-playbook/implementation/ed-fi-api-fundamentals/resource-ids-and-natural-keys',
          },
          // Other removed pages, redirected to the closest current equivalent.
          {
            from: '/getting-started/provider-playbook/common-use-cases/rostering-solution-guide/sample-application/setup-guide',
            to: '/reference/educator-pipeline/clinical-experience/setup-guide',
          },
          {
            from: '/reference/ed-fi-api/8.0/client-developers-guide/authorization',
            to: '/getting-started/provider-playbook/implementation/ed-fi-api-fundamentals/authorization',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/assessment-solution-guide/getting-data-flowing/authorization',
            to: '/getting-started/provider-playbook/implementation/ed-fi-api-fundamentals/authorization',
          },
          // Common use case solution guides removed in DOC-299 (#540), redirected
          // to the current page on the same topic.
          {
            from: '/getting-started/provider-playbook/common-use-cases',
            to: '/getting-started/provider-playbook/',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/assessment-solution-guide',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-playbook/',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/assessment-solution-guide/getting-data-flowing',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-playbook/part-v-integration-architecture-and-operations',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/assessment-solution-guide/getting-data-flowing/architecture',
            to: '/getting-started/provider-playbook/implementation/ed-fi-api-integration-architecture-for-data-providers',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/assessment-solution-guide/getting-data-flowing/data-requirements/assessment-systems',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-playbook/part-iii-data-modeling-requirements',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/assessment-solution-guide/getting-data-flowing/data-requirements/student-information-systems',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-playbook/part-iv-student-identity-and-rostering',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/assessment-solution-guide/getting-data-flowing/online-api-documentation-and-sandbox',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/domain-api-tutorial/assessment-providers-sandbox/',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/assessment-solution-guide/getting-data-flowing/sample-transactions',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/domain-api-tutorial/assessment-providers-sandbox/',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/assessment-solution-guide/tools-and-best-practices',
            to: '/getting-started/provider-playbook/implementation/best-practices-api-integration',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/assessment-solution-guide/tools-and-best-practices/common-api-errors',
            to: '/reference/ed-fi-api/client-developers-guide/error-response-knowledge-base',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/assessment-solution-guide/tools-and-best-practices/error-handling',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/domain-api-tutorial/assessment-providers-error-handling',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/assessment-solution-guide/understanding-ed-fi-apis',
            to: '/getting-started/provider-playbook/implementation/ed-fi-api-fundamentals/',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/assessment-solution-guide/understanding-ed-fi-apis/api-resource-keys',
            to: '/getting-started/provider-playbook/implementation/ed-fi-api-fundamentals/resource-ids-and-natural-keys',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/assessment-solution-guide/understanding-ed-fi-apis/api-routes',
            to: '/reference/ed-fi-api/client-developers-guide/api-routes',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/assessment-solution-guide/understanding-ed-fi-apis/dependency-ordering-for-resources',
            to: '/reference/ed-fi-api/client-developers-guide/resource-dependency-order/',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/assessment-solution-guide/understanding-ed-fi-apis/descriptors',
            to: '/getting-started/provider-playbook/implementation/ed-fi-api-fundamentals/enumerations-descriptors',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/chronic-absenteeism-solution-guide/getting-data-flowing/architecture',
            to: '/getting-started/provider-playbook/implementation/ed-fi-api-integration-architecture-for-data-providers',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/chronic-absenteeism-solution-guide/getting-data-flowing/data-requirements',
            to: '/partners/certification/available-certifications/sis-v5/use-cases/chronic-absenteeism',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/chronic-absenteeism-solution-guide/getting-data-flowing/sample-transactions',
            to: '/partners/certification/available-certifications/sis-v5/use-cases/chronic-absenteeism',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/chronic-absenteeism-solution-guide/getting-data-flowing/understanding-rest-apis',
            to: '/reference/ed-fi-api/client-developers-guide/basics',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/chronic-absenteeism-solution-guide/tools-and-best-practices/common-api-errors',
            to: '/reference/ed-fi-api/client-developers-guide/error-response-knowledge-base',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/rostering-solution-guide/sample-application/enrollment-api',
            to: '/reference/roadmap/notifications/enrollment-api-deprecation',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/rostering-solution-guide/workflow-in-postman/enrollment-api-via-postman',
            to: '/reference/roadmap/notifications/enrollment-api-deprecation',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/rostering-solution-guide/workflow-in-postman/setting-up-postman',
            to: '/reference/roadmap/notifications/enrollment-api-deprecation',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/student-equity-solution-guide/getting-data-flowing/architecture',
            to: '/getting-started/provider-playbook/implementation/ed-fi-api-integration-architecture-for-data-providers',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/student-equity-solution-guide/getting-data-flowing/authentication',
            to: '/getting-started/provider-playbook/implementation/ed-fi-api-fundamentals/authentication-and-oauth',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/student-equity-solution-guide/getting-data-flowing/authorization',
            to: '/getting-started/provider-playbook/implementation/ed-fi-api-fundamentals/authorization',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/student-equity-solution-guide/getting-data-flowing/data-requirements',
            to: '/partners/certification/available-certifications/sis-v5/use-cases/student-equity',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/student-equity-solution-guide/getting-data-flowing/online-api-documentation-and-sandbox',
            to: '/getting-started/provider-playbook/implementation/getting-started-with-apis/',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/student-equity-solution-guide/tools-and-best-practices',
            to: '/getting-started/provider-playbook/implementation/best-practices-api-integration',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/student-equity-solution-guide/tools-and-best-practices/best-practices',
            to: '/getting-started/provider-playbook/implementation/best-practices-api-integration',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/student-equity-solution-guide/tools-and-best-practices/common-api-errors',
            to: '/reference/ed-fi-api/client-developers-guide/error-response-knowledge-base',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/student-equity-solution-guide/tools-and-best-practices/error-handling',
            to: '/reference/ed-fi-api/client-developers-guide/error-handling-best-practices',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/student-equity-solution-guide/understanding-ed-fi-apis/api-resource-keys',
            to: '/getting-started/provider-playbook/implementation/ed-fi-api-fundamentals/resource-ids-and-natural-keys',
          },
          {
            from: '/getting-started/provider-playbook/common-use-cases/student-equity-solution-guide/understanding-ed-fi-apis/api-routes',
            to: '/reference/ed-fi-api/client-developers-guide/api-routes',
          },
          // Assessment provider pages removed or moved under domain-api-tutorial.
          {
            from: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-provider-overview',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-playbook/',
          },
          {
            from: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-implementation',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-playbook/',
          },
          {
            from: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-implementation/assessment-providers-data-model/assessment-entity',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/domain-api-tutorial/assessment-providers-data-model/assessment-entity',
          },
          {
            from: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-implementation/assessment-providers-sandbox/assessment-providers-activity-2',
            to: '/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/domain-api-tutorial/assessment-providers-sandbox/assessment-providers-activity-2',
          },
          // "What's new" pages that moved into versioned Data Standard docs or to
          // Community Tools.
          {
            from: '/reference/analytics-middle-tier/whats-new',
            to: '/getting-started/community-tools/technology/analytics-middle-tier/whats-new',
          },
          {
            from: '/reference/data-exchange/data-standard/next/model-reference/student-attendance-domain/best-practices-and-use-cases',
            to: '/reference/data-exchange/data-standard/model-reference/student-attendance-domain/',
          },
          {
            from: '/reference/data-exchange/data-standard/next/whats-new',
            to: '/reference/data-exchange/data-standard/whats-new/',
          },
          {
            from: '/reference/data-exchange/data-standard/whats-new/api-changes-5',
            to: '/reference/data-exchange/data-standard/5/whats-new/api-changes-5',
          },
          {
            from: '/reference/data-exchange/data-standard/whats-new/whats-new-v50',
            to: '/reference/data-exchange/data-standard/5/whats-new/whats-new-v50',
          },
          {
            from: '/reference/data-exchange/data-standard/whats-new/whats-new-v52',
            to: '/reference/data-exchange/data-standard/5/whats-new/whats-new-v52',
          },
          // Admin App, ODS Admin App, Admin API, and Analytics Middle Tier pages
          // that moved.
          {
            from: '/reference/admin-api/admin-api-1.x/technical-articles/endpoints-in-admin-api-1x',
            to: '/reference/admin-api/getting-started/admin-api-1.x/technical-articles/endpoints-in-admin-api-1x',
          },
          {
            from: '/reference/admin-app/getting-started/installation/older-versions-of-admin-app/admin-app-v17-for-ods-api-v33',
            to: '/getting-started/community-tools/technology/ods-admin-app/getting-started/installation',
          },
          {
            from: '/reference/admin-app/getting-started/installation/older-versions-of-admin-app/admin-app-v181-for-ed-fi-ods-api-v34',
            to: '/getting-started/community-tools/technology/ods-admin-app/getting-started/installation',
          },
          {
            from: '/reference/admin-app/getting-started/installation/older-versions-of-admin-app/admin-app-v30-for-odsapi-v60',
            to: '/getting-started/community-tools/technology/ods-admin-app/getting-started/installation',
          },
          {
            from: '/reference/admin-app/technical-articles/powershell-installation-ods-api-v33',
            to: '/getting-started/community-tools/technology/ods-admin-app/getting-started/installation',
          },
          {
            from: '/reference/admin-app/technical-articles/resetting-admin-app-configuration-admin-app-22',
            to: '/getting-started/community-tools/technology/ods-admin-app/technical-articles/resetting-admin-app-configuration',
          },
          {
            from: '/reference/admin-app/technical-articles/year-specific-mode-v1x',
            to: '/getting-started/community-tools/technology/ods-admin-app/technical-articles/year-specific-mode-v1x',
          },
          {
            from: '/reference/analytics-middle-tier/user-guide/collections/chronic-absenteeism-collection',
            to: '/getting-started/community-tools/technology/analytics-middle-tier/user-guide/collections/chronic-absenteeism-collection/',
          },
          {
            from: '/reference/analytics-middle-tier/user-guide/collections/early-warning-system-collection',
            to: '/getting-started/community-tools/technology/analytics-middle-tier/user-guide/collections/early-warning-system-collection/',
          },
          {
            from: '/reference/ods-admin-app',
            to: '/getting-started/community-tools/technology/ods-admin-app/',
          },
          {
            from: '/reference/ods-admin-app/technical-articles/configuration-settings-v2x',
            to: '/getting-started/community-tools/technology/ods-admin-app/technical-articles/configuration-settings-v2x',
          },
          {
            from: '/reference/ods-admin-app/whats-new',
            to: '/getting-started/community-tools/technology/ods-admin-app/whats-new',
          },
          // ODS / API pages renamed or not present in that version.
          {
            from: '/reference/ods-api/6.2/platform-dev-guide/configuration/api-client-and-ods-instance-configuration',
            to: '/reference/ed-fi-api/6.2/platform-dev-guide/configuration/',
          },
          {
            from: '/reference/ods-api/7.1/client-developers-guide/error-response-knowledge-base',
            to: '/reference/ed-fi-api/client-developers-guide/error-response-knowledge-base',
          },
          {
            from: '/reference/ods-api/7.1/how-to-guides/how-to-deploy-an-extension-plugin',
            to: '/reference/ed-fi-api/7.1/how-to-guides/how-to-create-an-extension-plugin',
          },
          {
            from: '/reference/ods-api/platform-dev-guide/security/api-configuration-data-stores',
            to: '/reference/ed-fi-api/platform-dev-guide/security/security-configuration-data-stores',
          },
        ],
        createRedirects(existingPath) {
          if (existingPath.includes('/reference/ed-fi-api')) {
            return [
              existingPath.replace(
                '/reference/ed-fi-api',
                '/reference/ods-api',
              ),
            ];
          }
          if (existingPath.includes('/getting-started/community-tools')) {
            const sources = [
              existingPath.replace(
                '/getting-started/community-tools',
                '/getting-started/edfi-exchange',
              ),
            ];
            // Data Import moved here from the reference section in 2026.
            if (
              existingPath.includes(
                '/getting-started/community-tools/technology/data-import',
              )
            ) {
              sources.push(
                existingPath.replace(
                  '/getting-started/community-tools/technology/data-import',
                  '/reference/data-import',
                ),
              );
            }
            return sources;
          }
          return undefined;
        },
      },
    ],
    function rawLoaderPlugin() {
      return {
        name: 'raw-loader-plugin',
        configureWebpack() {
          return {
            module: {
              rules: [
                {
                  resourceQuery: /raw/,
                  type: 'asset/source',
                },
              ],
            },
          };
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/ed-fi-social-card.jpg',
      navbar: {
        logo: {
          alt: 'Ed-Fi Docs Logo',
          src: 'img/ed-fi-logo-light.webp',
          srcDark: 'img/ed-fi-logo-dark.webp',
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
        additionalLanguages: [
          'powershell',
          'csharp',
          'sql',
          'json',
          'ini',
          'bash',
        ],
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
                href: '/getting-started/community-tools/',
                label: 'Community Tools',
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
                label: 'Ed-Fi Insights and Resources',
                href: 'https://www.ed-fi.org/resources',
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
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
