// SPDX-License-Identifier: Apache-2.0
// Licensed to the Ed-Fi Alliance under one or more agreements.
// The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
// See the LICENSE and NOTICES files in the project root for more information.

import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Getting Started',
    description: (
      <>
        Patterns and practices for starting or expanding on your Ed-Fi journey.
      </>
    ),
    href: '/getting-started',
  },
  {
    title: 'Partners',
    description: (
      <>
        Find a certified partner or learn how to earn Ed-Fi badges and
        certification.
      </>
    ),
    href: '/partners',
  },
  {
    title: 'Community',
    description: (
      <>
        Connect with the Ed-Fi help desk or with the Ed-Fi community for expert
        support.
      </>
    ),
    href: '/community',
  },
  {
    title: 'Reference',
    description: (
      <>
        Reference documentation for the Ed-Fi Data Standard and Ed-Fi technology
        suite.
      </>
    ),
    href: '/reference',
  },
];
//text--center
function Feature({ title, description, href }) {
  return (
    <div className="col">
      <div className={`shadow--md text--center ${styles.featureBlock}`}>
      </div>
      <div className="padding-horiz--md margin-bottom--lg">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
        <a href={href} class="button button--primary">
          Read more »
        </a>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
