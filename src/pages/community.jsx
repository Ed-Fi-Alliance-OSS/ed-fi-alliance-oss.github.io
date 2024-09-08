import React from "react";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./community.module.css";

export default function Hello() {
  return (
    <Layout title="Support" description="Ed-Fi Support Page">
      <header className="hero hero--primary">
        <Heading as="h1">Getting Support&hellip; and Giving Back</Heading>
      </header>
      <div className="container margin-top--lg">
        <div className="row margin-top--lg">
          <div className="col col--5">
            <Heading as="h2">Community Hub</Heading>
            <p>
              Here you can search for knowledge base articles for self-help;
              submit a case to the help desk for expert one-on-one advice, to
              share a bug report, or suggest an improvement; and interact with
              your peers in the community forums. Membership required:{" "}
              <Link to="https://www.ed-fi.org/create-an-account/">
                join now
              </Link>{" "}
              at no cost.
            </p>
            <p>
              <Link
                className="button button--primary button--lg"
                to="https://community.ed-fi.org"
              >
                Go »
              </Link>
            </p>
          </div>
          <div className="col col--offset-1 col--6">
            <Link to="https://community.ed-fi.org">
              <img
                src="/img/community-hub.jpg"
                alt="[Screenshot of the Community Hub]"
                className="shadow--md"
              />
            </Link>
          </div>
        </div>
        <div className="row margin-top--xl">
          <div className="col col--6">
            <Link to="https://ed-fi-alliance.slack.com/">
              <img
                src="/img/slack.jpg"
                alt="[Screenshot of Ed-Fi Slack sign-in page]"
                className="shadow--md"
              />
            </Link>
          </div>
          <div className="col col--offset-1 col--5">
            <Heading as="h2">Slack</Heading>
            <p>
              The Community Hub discussion forums are ideal for asynchronous
              conversations, for archival, and for the ability to sign-up for
              daily or weekly email digests.{" "}
              <a href="https://slack.com">Slack</a> remains an important tool
              for more real-time conversations. If you haven't received an
              invitation to join, just send a note to the{" "}
              <a href="mailto:help@ed-fi.org?subject=Slack Invitation">
                help desk
              </a>
              .
            </p>
            <p>
              <Link
                className="button button--primary button--lg"
                to="https://ed-fi-alliance.slack.com/"
              >
                Go »
              </Link>
            </p>
          </div>
          <div className="row margin-top--lg">
            <div className="col col--5">
              <Heading as="h2">Source Code</Heading>
              <p>
                Nearly all of the software maintained by the Ed-Fi Alliance is
                freely available for use and modification under the terms of the
                Apache License, Version 2.0. To report bugs or suggest
                improvements, please visit the{" "}
                <Link to="https://community.ed-fi.org">Community Hub</Link> to
                submit a case. When submitting a code contribution, please reach
                out in advance so that we can coordinate your work with our
                teams' ongoing efforts.
              </p>
              <p>
                <Link
                  className="button button--primary button--lg"
                  to="https://github.com/Ed-Fi-Alliance-OSS"
                >
                  Core Code »
                </Link>{" "}
                <Link
                  className="button button--secondary button--lg"
                  to="https://github.com/Ed-Fi-Exchange-OSS"
                >
                  Ed-Fi Exchange »
                </Link>
              </p>
            </div>
            <div className="col col--offset-1 col--6">
              <Link to="https://github.com/Ed-Fi-Alliance-OSS">
                <img
                  src="/img/github.jpg"
                  alt="[Screenshot of Ed-Fi Alliance on GitHub]"
                  className="shadow--md"
                />
              </Link>
            </div>
          </div>
          <div className="row margin-top--lg">
            <div className="col">
              <Heading as="h2">More information on getting involved</Heading>
              <ul>
                <li><Link to="/docs/code-of-conduct">Contributor Code of Conduct</Link></li>
                <li><Link to="/docs/ip-disclosure-policy">Intellectual Property Disclosure</Link></li>
                <li><Link to="/docs/ceds">CEDS and Ed-Fi Collaboration Guidelines</Link></li>
                {/* <li><Link to="">Code Contribution Guidelines</Link></li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
