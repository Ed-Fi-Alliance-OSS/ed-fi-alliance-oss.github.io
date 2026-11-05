---
description: How to get started using an Ed-Fi API - what an Ed-Fi API is, the prerequisites, which platform and version to use, and where to go next for tutorials and reference material.
---

# Getting Started with APIs

To get started with an Ed-Fi API, first understand what an Ed-Fi API is, then
gather the prerequisites below. Find out which platform and version the system
you will connect to runs, and then work through the
[Tutorial: Interacting with an Ed-Fi API](/reference/data-exchange/tutorial)
against the public Ed-Fi API sandbox. The sections below walk through each step
and link to the reference material you will need next.

## What is an Ed-Fi API?

An _Ed-Fi API_ is any REST API application that implements the
[Ed-Fi API Specifications](/reference/data-exchange#ed-fi-api-specifications)
and follows the [Ed-Fi API Guidelines](/reference/data-exchange/api-guidelines).
Client applications use it to read and write education data that conforms to
the [Ed-Fi Data Standard](/reference/data-exchange/data-standard/), using JSON
messages over HTTPS and OAuth 2.0 authentication.

The Ed-Fi Alliance publishes two Ed-Fi API platforms: the Ed-Fi ODS/API (versions
through 7.x) and Ed-Fi API v8, its replacement. See
[Ed-Fi API Platforms](/reference/ods-api-platform) for a description of each.
A client written against the API Specifications can work with any Ed-Fi API
that supports the same Data Standard version and extensions.

## Prerequisites

To learn the API:

- Basic knowledge of REST APIs, HTTP, and JSON.
- Basic familiarity with the
  [Ed-Fi data exchange standards](/reference/data-exchange).
- A web browser or an HTTP client. The public sandbox at
  [api.ed-fi.org](https://api.ed-fi.org/) provides sample credentials and
  synthetic data, so you do not need to install anything.

To build an integration with a real Ed-Fi API, you also need the following from
the organization that hosts it, such as a school district, education service
agency, or state education agency:

- The base URL of their Ed-Fi API.
- A client key and secret (`client_id` and `client_secret`) for your
  application. The hosting organization issues these; they are unique to each
  application and each installation.
- The Data Standard version and any extensions their API supports. The
  [Discovery API](/reference/data-exchange/tutorial#discovery) at the base URL
  reports the version, and if the API is extended, you need its OpenAPI
  definition to see the extended resources (see
  [SDKs and Development APIs](../../support/sdks-and-development-apis.md)).

Do not use the public sandbox for your own development or QA processes; see
[SDKs and Development APIs](../../support/sdks-and-development-apis.md) for
alternatives.

## Which platform and version should I use?

- **If you are building a client application** (for example, a student
  information system or an assessment product), you connect to whichever Ed-Fi
  API your customers run, so build against the API Specifications and the Data
  Standard versions they use. Most client applications built for the ODS/API
  continue to work with Ed-Fi API v8; review the
  [breaking changes and migration checklist](/reference/ed-fi-api/8/whats-new/release-notes#ed-fi-api-v80---breaking-changes-from-previous-releases)
  and test against Ed-Fi API v8.
- **If you are starting a new Ed-Fi implementation** (hosting an Ed-Fi API),
  plan it on the latest Ed-Fi API v8 release. See
  [Should a new Ed-Fi implementation use ODS/API 7.x or Ed-Fi API v8?](/reference/roadmap/api-faq#q-should-a-new-ed-fi-implementation-use-odsapi-7x-or-ed-fi-api-v8)
  for when ODS/API 7.3 is still the right choice.
- **If you are learning**, use the version the tutorial uses. The concepts are
  the same in all versions, and the tutorial version is not a recommendation for
  your own implementation.

For the support status of each release and the Data Standard versions it
supports, see [Supported Versions](/reference/roadmap/supported-versions).

## Where to go next

1. [Tutorial: Interacting with an Ed-Fi API](/reference/data-exchange/tutorial)
   walks through discovery, authentication, and reading and writing data with
   an Ed-Fi API.
2. [All Providers - Activity 1](./all-providers/all-providers-activity-1.md)
   makes a first API call from your browser using Swagger UI (see
   [All Providers](./all-providers/readme.md) for an introduction).
3. [Ed-Fi API Fundamentals](../ed-fi-api-fundamentals/readme.md) explains the
   design principles behind Ed-Fi APIs: descriptors, resource IDs and natural
   keys, authentication, authorization, and extensions.
4. The API Client Developers' Guide covers the details of building a client
   application:
   [ODS/API 7.3](/reference/ed-fi-api/client-developers-guide) and
   [Ed-Fi API v8](/reference/ed-fi-api/8/client-developers-guide).
5. [Ed-Fi API Integration Architecture for Data Providers](../ed-fi-api-integration-architecture-for-data-providers.md)
   describes a recommended architecture for a production integration that
   keeps an Ed-Fi API in sync with your application.

There are two main provider types in the current Ed-Fi ecosystem. To find API
use cases specific to each, follow the links below:

1. [Student Information System Providers - Implementation](../../specifics-by-provider-type/student-information-system-providers/implementation/readme.md)
2. [Assessment Domain API Tutorial](../../specifics-by-provider-type/assessment-providers/domain-api-tutorial/readme.md)

Note: There are always new integrations under development. You can take a look at the [drafts of proposed standards](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Technology-Roadmap/discussions?discussions_q=label%3Adata-standard+label%3Arfc)—also called Request for Comments, or RFCs—for info on upcoming integrations and modifications.
