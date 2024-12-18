// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Admonition from '@theme/Admonition';

const LinkList = [
  {
    title: 'Data Exchange Standards',
    to: '/reference/data-exchange',
  },
  {
    title: 'ODS/API Platform',
    to: '/reference/ods-api',
  },
  {
    title: 'Admin API',
    to: '/reference/admin-api',
  },
  {
    title: 'MetaEd',
    to: '/reference/metaed',
  },
  {
    title: 'API Publisher',
    to: '/reference/api-publisher',
  },
  {
    title: 'Data Import',
    to: '/reference/data-import',
  },
  {
    title: 'Admin App',
    to: '/reference/admin-app',
  },
  {
    title: 'Docker Deployments',
    to: '/reference/docker',
  },
];

function ListItem({ title, to }) {
  return (
    <li>
      <Link to={to}>{title}</Link>
    </li>
  );
}

function Main() {
  return (
    <div className="main">
      <div className="container">
        <div className="row margin-top--lg">
          <div className="col">
            <Admonition type="tip">
              Reference landing page content coming soon. For now, just
              providing basic links out to component pages.
            </Admonition>
            {LinkList.map((props, idx) => (
              <ListItem key={idx} {...props} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="hero hero--primary">
      <div className="container">
        <div className="row">
          <div className="col">
            <Heading as="h1">Ed-Fi Technology Reference</Heading>
            <p className="hero__subtitle">
              Reference documentation for the Ed-Fi Data Standard and Ed-Fi
              technology suite
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Partners() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Reference">
      <Header></Header>
      <Main></Main>
    </Layout>
  );
}
