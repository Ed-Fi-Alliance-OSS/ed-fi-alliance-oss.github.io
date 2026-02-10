// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

function Main() {
  return (
    <div className="main">
      <div className="container">
        <div className="row margin-top--lg">
          <div className="col">
            <p>
              The Ed-Fi technology suite is a comprehensive set of tools
              designed to empower educators and administrators by providing a
              unified view of educational data. Explore our suite to learn how
              we can help you streamline data management and enhance educational
              outcomes.
            </p>
            <h2>Ed-Fi Technology Roadmap</h2>
            <p>
              Stay up to date with the latest developments and future plans for
              the Ed-Fi technology suite. Our roadmap provides detailed
              information on upcoming releases and features.{' '}
              <Link to="/reference/roadmap/">
                Learn more about the Ed-Fi Technology Roadmap
              </Link>
            </p>
            <h2>Ed-Fi Data Exchange Standards</h2>
            <p>
              The Ed-Fi Alliance maintains the Ed-Fi Data Standard, a common
              language that allows educational technology systems to securely
              exchange data. It helps educators and administrators gain a
              comprehensive understanding of student progress and make informed
              decisions. The Ed-Fi API Standard define criteria for creation of
              HTTP-based API applications that use or support the Ed-Fi Data
              Standard.{' '}
              <Link to="/reference/data-exchange">
                Discover the Ed-Fi Data Exchange Standards
              </Link>
            </p>
            <h2>Ed-Fi ODS/API</h2>
            <p>
              The Ed-Fi ODS/API provides a robust platform for integrating and
              managing educational data through a REST-inspired HTTP interface.
              It enables seamless data exchange and supports various educational
              applications.{' '}
              <Link to="/reference/ods-api">Explore the Ed-Fi ODS/API</Link>
            </p>
            {/* useful text for future use, not ready to include here yet. */}
            {/* <h2>Ed-Fi Data Management Service</h2>
            <p>
              The Ed-Fi Data Management Service (DMS) is the next-generation
              solution for managing educational data. It offers enhanced
              performance and scalability, making it easier to handle large
              datasets. Learn more about the Ed-Fi Data Management Service
            </p> */}
            <h2>Ed-Fi Administration Tools</h2>
            <p>
              <Link to="/reference/admin-app">Ed-Fi Admin App</Link> (human-to-system) and the <Link to="/reference/admin-api">Ed-Fi ODS Admin API</Link> (system-to-system) provide administrative interfaces for managing the Ed-Fi
              ODS/API platform. They simplify common administrative tasks and
              support both Docker and Windows installations. See out tools below to get started.
              the
              <ul>
                <li>
                  <Link to="/reference/admin-app">Ed-Fi Admin App (version 4.0+)</Link>
                </li>
                <li>
                  <Link to="/reference/admin-api">Ed-Fi ODS Admin API</Link>
                </li>
                <li>
                  <Link to="/reference/ods-admin-app">ODS Admin App (legacy version 3 and earlier)</Link>
                </li>
              </ul>
            </p>
            <h2>Ed-Fi API Publisher</h2>
            <p>
              The Ed-Fi API Publisher is a utility for moving data between Ed-Fi
              ODS/API instances. It supports various deployment models and
              ensures secure data transfer.{' '}
              <Link to="/reference/api-publisher">
                Learn about the Ed-Fi API Publisher
              </Link>
            </p>
            <h2>MetaEd</h2>
            <p>
              MetaEd is a technology framework that uses a domain-specific
              language to auto-generate software, database, and data standard
              artifacts. It supports the development of Ed-Fi extensions and
              core components.{' '}
              <Link to="/reference/metaed">Discover MetaEd</Link>
            </p>
            <h2>Other Ed-Fi Tools</h2>
            <ul>
              <li>
                <Link to="/reference/educator-pipeline">
                  Educator Pipeline Use Cases / Dashboards
                </Link>
              </li>
              <li>
                <Link to="/reference/docker">Sample Docker Deployments</Link>
              </li>
              <li>
                <Link to="/reference/data-import">Data Import</Link>
              </li>
              <li>
                <Link to="/reference/ods-admin-app">Legacy ODS Admin App</Link>
              </li>
              <li>
                <Link to="/reference/analytics-middle-tier">
                  Analytics Middle Tier
                </Link>
              </li>
            </ul>
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
