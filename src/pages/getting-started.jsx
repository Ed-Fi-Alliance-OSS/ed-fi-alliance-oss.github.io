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
      <Heading as="h3">State Education Agency (SEA) Playbook</Heading>
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
      <Heading as="h3">Technology Provider Playbook</Heading>
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
      <Heading as="h3">Educational Service Agency (ESA) Playbook</Heading>
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
      Every Ed-Fi implementation is unique, but the most successful ones share common foundations. Drawing from years of fieldwork with agencies and providers, our team has captured proven practices and patterns into clear guidance. These Implementation Playbooks outline how to set priorities, build effective teams, and apply interoperability where it matters most—helping all Ed-Fi users move from setup to success.
      </p>
    </div>
  );
}

function EducatorPipeline() {
  return (
    <div className="margin-top--lg">
      <Heading as="h2">Educator Pipeline</Heading>
      <p>
      The Ed-Fi Alliance helps agencies unify data through the Ed-Fi Standard and EPDM, tracking an educator’s career from pre-enrollment to student outcomes.
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
    <div className="margin-top--lg margin-bottom--lg">
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
          <div className="col col--12">
            <GetStartedIntro></GetStartedIntro>
          </div>
        </div>
        <div className="row">
          <div className="col col--4">
            <SeaPlaybook></SeaPlaybook>
          </div>
          <div className="col col--4">
            <TechPlaybook></TechPlaybook>
          </div>
          <div className="col col--4">
            <EsaPlaybook></EsaPlaybook>
          </div>
        </div>
        <div className="row">
          <div className="col col--6">
            <EducatorPipeline></EducatorPipeline>
          </div>
          <div className="col col--6">
            <Exchange></Exchange>
          </div>
          {/* <div className="col col--2">
            <ThemedImage
              alt="Ed-Fi Exchange Logo"
              sources={{
                light,
                dark
              }}
            />
          </div> */}
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
