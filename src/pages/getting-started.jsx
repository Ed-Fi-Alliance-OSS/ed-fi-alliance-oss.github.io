// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

// Original playbook text sourced from
// https://www.ed-fi.org/blog/introducing-ed-fi-implementation-playbooks/
const PLAYBOOKS = [
  {
    title: 'State Education Agency (SEA) Playbook',
    to: '/getting-started/sea-playbook',
    description: 'Guidance for state agencies managing Ed-Fi implementations.',
  },
  {
    title: 'Technology Provider Playbook',
    to: '/getting-started/provider-playbook',
    description: 'Best practices for vendors building Ed-Fi integrations.',
  },
  {
    title: 'Educational Service Agency (ESA) Playbook',
    to: '/getting-started/esa-playbook',
    description: 'Patterns for ESAs supporting districts with Ed-Fi data.',
  },
];

function Playbooks() {
  return (
    <div className="card shadow--md margin-top--md margin-bottom--sm padding--md">
      <Heading as="h2">Playbooks</Heading>
      <p>
        Every Ed-Fi implementation is unique, but the most successful ones share
        common foundations. Drawing from years of fieldwork with agencies and
        providers, our team has captured proven practices and patterns into
        clear guidance. Choose the playbook that matches your role:
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {PLAYBOOKS.map((pb) => (
          <li key={pb.to} className="margin-bottom--sm">
            <Link to={pb.to}>
              <strong>{pb.title}</strong>
            </Link>
            {' — '}
            {pb.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

function EducatorPipeline() {
  return (
    <div className="card shadow--md margin-top--sm margin-bottom--sm padding--md">
      <Heading as="h2">Educator Pipeline</Heading>
      <p>
        Track an educator’s career from pre-enrollment to student outcomes using
        the Ed-Fi Standard and EPDM.
      </p>
      <Link
        to="/getting-started/educator-pipeline"
        className="button button--primary"
      >
        Explore Educator Pipeline »
      </Link>
    </div>
  );
}

function CommunityTools() {
  return (
    <div className="card shadow--md margin-top--sm margin-bottom--md padding--md">
      <Heading as="h2">Ed-Fi Community Tools</Heading>
      <p>
        Browse community-contributed code, guides, and extensions aligned to the
        Ed-Fi Data Standard.
      </p>
      <Link
        to="/getting-started/community-tools"
        className="button button--primary"
      >
        Explore Community Tools »
      </Link>
    </div>
  );
}

function Header() {
  return (
    <header className="hero hero--primary">
      <div className="container">
        <div className="row">
          <div className="col">
            <Heading as="h1">Getting Started</Heading>
            <p className="hero__subtitle">
              Patterns and practices for starting or expanding on your Ed-Fi
              journey
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

function Main() {
  return (
    <div className="main">
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <Playbooks />
          </div>
        </div>
        <div className="row">
          <div className="col col--12">
            <EducatorPipeline />
          </div>
        </div>
        <div className="row">
          <div className="col col--12">
            <CommunityTools />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GetStarted() {
  return (
    <Layout title="Getting Started">
      <Header></Header>
      <Main></Main>
    </Layout>
  );
}
