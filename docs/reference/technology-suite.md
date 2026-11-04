---
sidebar_position: 0.5
description:
  What makes up the Ed-Fi Technology Suite today - the Ed-Fi Data Standard and
  its specifications, the Ed-Fi ODS/API and Ed-Fi API v8 platforms that
  implement them, and the tools around them.
---

# Ed-Fi Technology Suite Overview

The Ed-Fi Alliance publishes data exchange standards for K-12 education data
and builds open-source software that implements them. Today the Ed-Fi
Technology Suite is made up of:

- **Standards:** the [Ed-Fi Data Standard](/reference/data-exchange/data-standard)
  and the specifications that express it.
- **Two API platforms that implement the standards:** the Ed-Fi ODS/API
  (versions through 7.x) and its long-term replacement, Ed-Fi API v8.
- **Tools** for administering those platforms, moving data between them, and
  extending the Data Standard.

For the versions that are supported right now, see [Currently
Supported](./0-roadmap/supported-versions.md#currently-supported).

## Standards and implementations are separate

The standards define the data and how it is exchanged; the platforms are
software that implements them. The Ed-Fi ODS/API and Ed-Fi API v8 are the Ed-Fi
Alliance's implementations, and any party can build a compatible one by
following the API specifications and guidelines. See [Data Exchange
Standards](./1-data-exchange/readme.md) for the standards the Ed-Fi Alliance
publishes, and [Ed-Fi certification](/partners/certification) for how vendor
products show that they exchange data correctly.

## What technologies make up the Ed-Fi Technology Suite?

### API platforms

- **[Ed-Fi API v8](/reference/ed-fi-api/8)**, the next-generation platform and
  the long-term replacement for the Ed-Fi ODS/API. It is made up of the Ed-Fi API
  and the Configuration Service.
- **[Ed-Fi ODS/API](./2-ods-api-platform/readme.mdx)** (versions through 7.x),
  the established platform.

See [Ed-Fi API Platforms](./2-ods-api-platform/readme.mdx) for how they compare
and the transition timeline.

### Administration

- **[Ed-Fi ODS Admin API](./4-admin-api/readme.md)** is a REST interface for
  managing client credentials ("key and secret") and security configuration on
  the Ed-Fi ODS/API. In Ed-Fi API v8, the Configuration Service takes this role.
- **[Ed-Fi Admin App](./5-admin-app/readme.md)** (v4) is a web application for
  organizations that manage multiple instances of the Ed-Fi ODS/API or Ed-Fi
  API v8 across tenants and environments.

### Data movement and other services

- **[Ed-Fi API Publisher](./6-api-publisher/readme.md)** moves data and changes
  between Ed-Fi API instances using the same Data Standard version. The source
  and target can each be an Ed-Fi ODS/API or Ed-Fi API v8.
- **[Ed-Fi OneRoster® service](./3-oneroster/readme.mdx)** serves a 1EdTech®
  OneRoster v1.2 Rostering API from data in an Ed-Fi ODS.

### Data Standard tooling

- **[MetaEd](./8-metaed/readme.md)** uses a domain-specific language to generate
  Data Standard artifacts. The MetaEd IDE lets community members build Ed-Fi
  Data Standard extensions.

## Which platform should a new implementation use?

The Ed-Fi Alliance recommends Ed-Fi API v8 for new implementations. For when
the Ed-Fi ODS/API 7.3 still fits, and what client application developers should
test, see [Should a new Ed-Fi implementation use ODS/API 7.x or Ed-Fi API
v8?](./0-roadmap/api-faq.md#q-should-a-new-ed-fi-implementation-use-odsapi-7x-or-ed-fi-api-v8)

## What is no longer part of the Technology Suite?

Some products the Ed-Fi Alliance once maintained have moved or are moving to
[Ed-Fi Community Tools](/getting-started/community-tools) and no longer carry an
Alliance support commitment. These include the Ed-Fi ODS/API Docker deployments,
Data Import, the Analytics Middle Tier, and the legacy Ed-Fi ODS Admin App 3.x.
See [Out of Support](./0-roadmap/supported-versions.md#out-of-support) for the
full list and the notice for each.
