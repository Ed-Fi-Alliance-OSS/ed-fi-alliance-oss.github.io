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

// Newcomer explanation sourced from "About the Ed-Fi Data Standard" and the
// ESA playbook's "What Is an Ed-Fi Data Hub?" section
const ROLES = [
  {
    role: 'State education agency',
    title: 'SEA Playbook',
    to: '/getting-started/sea-playbook',
  },
  {
    role: 'Technology provider',
    title: 'Technology Provider Playbook',
    to: '/getting-started/provider-playbook',
  },
  {
    role: 'Educational service agency',
    title: 'ESA Playbook',
    to: '/getting-started/esa-playbook',
  },
  {
    role: 'School district',
    title: 'What Is an Ed-Fi Data Hub?',
    to: '/getting-started/esa-playbook#what-is-an-ed-fi-data-hub',
    description:
      "how district systems send data to a hub's Ed-Fi API, usually run by an ESA or a state.",
  },
  {
    role: 'Developer learning the Ed-Fi API',
    title: 'Tutorial: Interacting with an Ed-Fi API',
    to: '/reference/data-exchange/tutorial',
  },
];

function NewToEdFi() {
  return (
    <div className="card shadow--md margin-top--md margin-bottom--sm padding--md">
      <Heading as="h2">New to the Ed-Fi Data Standard?</Heading>
      <p>
        The Ed-Fi Data Standard is a widely adopted, open-source data standard
        developed by the education community. It is the foundation for
        interoperability among K–12 education data systems. Ed-Fi API platforms,
        the Ed-Fi ODS/API and Ed-Fi API v8, implement the standard so that
        systems such as student information, assessment, and analytics systems
        can exchange data. Learn more in{' '}
        <Link to="/reference/data-exchange/data-standards">
          About the Ed-Fi Data Standard
        </Link>
        .
      </p>
      <Heading as="h3">Start here by role</Heading>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {ROLES.map((r) => (
          <li key={r.to} className="margin-bottom--sm">
            <strong>{r.role}:</strong> <Link to={r.to}>{r.title}</Link>
            {r.description && <> — {r.description}</>}
          </li>
        ))}
      </ul>
    </div>
  );
}

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
            <NewToEdFi />
          </div>
        </div>
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
