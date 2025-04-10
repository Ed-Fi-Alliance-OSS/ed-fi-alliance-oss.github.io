// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ThemedImage from '@theme/ThemedImage';

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

function EsaPlaybook() {
  return (
    <div className="margin-bottom--lg">
      <img src="/img/esa-playbook.jpg" alt="[ESA playbook cover image]" />
      <Heading as="h2">Educational Service Agency (ESA) Playbook</Heading>
      <Link
        to="/getting-started/esa-playbook"
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

function EducatorPipeline() {
  return (
    <div className="margin-bottom--lg">
      <Heading as="h2">Educator Pipeline</Heading>
      <p>
        The Ed-Fi Alliance strives to help key stakeholders within Educator
        Preparation Programs (EPPs), state education agencies (SEAs), local
        education agencies (LEAs), and education service agencies (ESAs) make
        sense of their disparate data sets by bringing them all together in one
        place, the Ed-Fi Data Standard. The data standard, along with the
        Educator Preparation Data Model (EPDM) (previously the Teacher
        Preparation Data Model) can manage data on an educator's full-career
        lifecycle, from pre-enrollment through their time in an educator
        preparation program, the certification process and in-service work at
        K-12 institutions, and the outcomes of those students.
      </p>
      <Link
        to="/getting-started/educator-pipeline"
        className="button button--primary button"
      >
        Go »
      </Link>
    </div>
  );
}

function Exchange() {
  return (
    <div className="margin-bottom--lg">
      <Heading as="h2">Ed-Fi Exchange</Heading>
      <p>
        The Ed-Fi Exchange is a technology hub for community contributions aligned to the Ed-Fi Data Standard and Implementation Suite.
      </p>
      <Link
        to="/getting-started/edfi-exchange"
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
  const dark = 'https://edfidocs.blob.core.windows.net/$web/img/exchange-logo_white_250px.png';
  const light = 'https://edfidocs.blob.core.windows.net/$web/img/exchange-logo_black_250px.png';

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
            <EsaPlaybook></EsaPlaybook>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <EducatorPipeline></EducatorPipeline>
          </div>
        </div>
        <div className="row">
          <div className="col col--10">
            <Exchange></Exchange>
          </div>
          <div className="col col--2">
            <ThemedImage
              alt="Ed-Fi Exchange Logo"
              sources={{
                light,
                dark
              }}
            />
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
