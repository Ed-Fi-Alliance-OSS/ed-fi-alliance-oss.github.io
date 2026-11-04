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

The Ed-Fi Data Standard is not software. It defines the data that education
systems exchange and how they exchange it. The Ed-Fi Alliance publishes it as:

- The [Unifying Data Model (UDM)](./1-data-exchange/udm/readme.md), the logical
  model behind the Data Standard.
- The [Ed-Fi REST API
  Specifications](./1-data-exchange/readme.md#ed-fi-api-specifications), the
  API resources and JSON messages used to exchange data that conforms to the
  Data Standard.
- The [Ed-Fi API Design and Implementation
  Guidelines](./1-data-exchange/api-guidelines/readme.md), the requirements an
  implementation must meet to conform.
- The [Extension Framework](./1-data-exchange/extensions-framework/readme.md),
  guidelines for adding data for a specific implementation.

See [Data Exchange Standards](./1-data-exchange/readme.md) for which of these
are normative, and [About the Ed-Fi Data
Standard](./1-data-exchange/data-standards.md#what-it-is-and-is-not) for what
the Data Standard is and is not.

The Ed-Fi ODS/API and Ed-Fi API v8 are the Ed-Fi Alliance's implementations of
these standards. They are not the standard itself: any party can build a
compatible implementation by following the API specifications and guidelines.
Ed-Fi API v8 implements existing versions of the Data Standard; it is not a new
Data Standard version. Vendor products show that they exchange data correctly
through [Ed-Fi certification](/partners/certification).

## What technologies make up the Ed-Fi Technology Suite?

### API platforms

- **[Ed-Fi API v8](/reference/ed-fi-api/8)** is the next-generation platform
  and the long-term replacement for the Ed-Fi ODS/API. It is made up of the
  Ed-Fi API, which serves the Data Standard resources over HTTP, and the
  Configuration Service, which manages API clients and deployment configuration
  and implements the Ed-Fi Management API Specification (v3). Kafka connectors
  for streaming data are optional. Data is stored in PostgreSQL or Microsoft
  SQL Server, and the services are deployed as Docker images.
- **[Ed-Fi ODS/API](./2-ods-api-platform/readme.mdx)** (versions through 7.x) is
  the established platform: an Operational Data Store (ODS) on PostgreSQL or
  Microsoft SQL Server and a companion REST API written in C#. The Ed-Fi
  Alliance plans to support the ODS/API Platform through the 2028-2029 school
  year and to fully replace it with Ed-Fi API v8 by the 2029-2030 school year.

Both platforms are vendor neutral: client applications can be written in any
language. See [Ed-Fi API Platforms](./2-ods-api-platform/readme.mdx) for how
they compare.

### Administration

- **[Ed-Fi ODS Admin API](./4-admin-api/readme.md)** is a REST interface for
  managing client credentials ("key and secret") and security configuration on
  the Ed-Fi ODS/API. In Ed-Fi API v8, the Configuration Service takes this role.
- **[Ed-Fi Admin App](./5-admin-app/readme.md)** (v4) is a web application for
  organizations that manage multiple instances of the Ed-Fi ODS/API or Ed-Fi API
  across tenants and environments.

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

## Which versions are supported?

[Ed-Fi Technology Suite Supported
Versions](./0-roadmap/supported-versions.md) is the source of truth for which
version of each product is supported, which Data Standard versions each API
version supports, and when support ends. This page does not list version
numbers.

## What is no longer part of the Technology Suite?

Some products the Ed-Fi Alliance once maintained have moved or are moving to
[Ed-Fi Community Tools](/getting-started/community-tools) and no longer carry an
Alliance support commitment. These include the Ed-Fi ODS/API Docker deployments,
Data Import, the Analytics Middle Tier, and the legacy Ed-Fi ODS Admin App 3.x. See
[Out of Support](./0-roadmap/supported-versions.md#out-of-support) for the full
list and the notice for each.
