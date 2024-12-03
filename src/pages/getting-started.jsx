// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

/* Refactor opportunity: convert the two Playbooks into a list and use a single
component to define structure */

function SeaPlaybook() {
  return (
    <div className="margin-bottom--lg">
      <img src="/img/sea-playbook.jpg" alt="[SEA playbook cover image]" />
      <Heading as="h2">State Education Agency (SEA) Playbook</Heading>
      <Link
        to="/getting-started/sea-playbook"
        className="button button--primary button"
      >
        Go »
      </Link>
    </div>
  );
}

function TechPlaybook() {
  return (
    <div className="margin-bottom--lg">
      <img
        src="/img/tech-playbook.jpg"
        alt="[Tech provider playbook cover image]"
      />
      <Heading as="h2">Technology Provider Playbook</Heading>
      <Link
        to="/getting-started/provider-playbook"
        className="button button--primary button"
      >
        Go »
      </Link>
    </div>
  );
}

function GetStartedIntro() {
  // Original text sourced from
  // https://www.ed-fi.org/blog/introducing-ed-fi-implementation-playbooks/
  return (
    <div>
      <Heading as="h2">Playbooks</Heading>
      <p>
        No two Ed-Fi implementations look exactly alike. Each agency has their
        own priorities and specific challenges that they are attempting to solve
        with interoperability. That said, the most successful Ed-Fi
        implementations share many of the same genes, the same foundation. As
        the Ed-Fi Community has grown, we've seen best practices and patterns of
        success emerge.
      </p>
      <p>
        Our team has collected valuable field knowledge as we've helped local
        education agencies, state education agencies, technology providers,
        collaboratives, and other organizations get running on Ed-Fi. Now, Ed-Fi
        has a large enough sample size, with enough use case variety, to provide
        some universal implementation guidance for the benefit of all Ed-Fi
        users.
      </p>
      <p>
        Our team has done the work to document their knowledge on Ed-Fi
        implementation best practices. This includes information about how to
        identify your priority use case, the areas where interoperability can
        offer a robust solution, how to build an effective implementation team,
        and resources to help you move through implementation smoothly.
      </p>
      <p>
        We're calling these training resources the Implementation Playbooks.
      </p>
    </div>
  );
}

function UseCases() {
  return (
    <div className="margin-bottom--lg">
      <Heading as="h1">Use Cases</Heading>
      <p>
        The Ed-Fi Data Standard supports collection of data in a diverse set of domains that span the K-12 educational
        system, including elements for both student and workforce development. In this
        section you will find detailed descriptions of several different use cases that
        can be addressed by the Data Standard.
      </p>
      <Link
        to="/getting-started/use-cases"
        className="button button--primary button"
      >
        Go »
      </Link>
    </div>
  )
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
          <div className="col col--7">
            <GetStartedIntro></GetStartedIntro>
          </div>
          <div className="col col--4">
            <SeaPlaybook></SeaPlaybook>
            <TechPlaybook></TechPlaybook>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <UseCases></UseCases>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GetStarted() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Getting Started">
      <Header></Header>
      <Main></Main>
    </Layout>
  );
}
