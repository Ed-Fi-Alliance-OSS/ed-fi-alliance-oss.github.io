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

function Header() {
  return (
    <header className="hero hero--primary">
      <div className="container">
        <div className="row">
          <div className="col">
            <Heading as="h1">Ed-Fi Alliance Partner Program</Heading>
            <p className="hero__subtitle">
              Find a certified partner or learn how to earn Ed-Fi badges and
              certification.
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
        <div className="row margin-bottom--lg">
          <div className="col">
            For general information on the Ed-Fi Alliance Partner Program, see{' '}
            <Link to="https://www.ed-fi.org/partner-program/">
              Become an Ed-Fi Alliance Partner
            </Link>{' '}
            on the main website.
          </div>
        </div>
        <div className="row margin-bottom--lg">
          <div className="col">
            <Heading as="h2">
              <img src="/img/edficert-small.jpg" alt="" /> Certification
            </Heading>
            <p>
              Ed-Fi certifications allow product developers to demonstrate a
              product's fidelity to Ed-Fi standards and guidelines, and for
              purchasers or users to be confident that a product conforms to
              those same Ed-Fi standards and guidelines.
            </p>
            <p>
              The Ed-Fi certification program was developed from the experience
              of many education agencies in certifying Ed-Fi-compliant data
              exchanges for their enterprise systems. The Ed-Fi Alliance has
              built on that foundation to provide a certification that can be
              used across different agencies and organizations, alleviating the
              need for vendors to undergo multiple, overlapping local
              certifications.
            </p>
            <Link
              to="/partners/certification"
              className="button button--primary button"
            >
              Read more »
            </Link>
          </div>
          <div className="col">
            <Heading as="h2">
              <img src="/img/edfibadge-small.jpg" alt="" /> Badging
            </Heading>
            <p>
              Ed-Fi Badges allow product developers to demonstrate support for
              Ed-Fi standards and technology, particularly in areas that are not
              yet covered by an Ed-Fi Certification.
            </p>
            <p>
              Many products that use Ed-Fi standardized APIs or integrate
              natively with Ed-Fi technology tools (such as the Ed-Fi
              Operational Data Store and API) are forging new ground in terms of
              defining data integration use cases valuable to schools. Badges
              allow these efforts to be validated and recognized by the
              community.
            </p>
            <p>
              Badges are not intended nor should they be used as a "lightweight"
              certification, either by technology providers or the education
              agencies they support. Over time, some badges may act as
              precursors to new certifications.
            </p>
            <p>
              Unlike certification, badges also focus on both Ed-Fi standards as
              well as Ed-Fi technology tools; by contrast, Ed-Fi certifications
              only focus on Ed-Fi standards.
            </p>
            <Link
              to="/partners/badging"
              className="button button--primary button"
            >
              Read more »
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Partners() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title="Partner Programs">
      <Header></Header>
      <Main></Main>
    </Layout>
  );
}
