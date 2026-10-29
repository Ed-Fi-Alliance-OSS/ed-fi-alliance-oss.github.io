# Data Exchange Standards

The Ed-Fi Alliance coordinates and publishes community-led standards for
education data and the exchange of that data. This page is a map of those
standards: what each one defines, which ones are normative, and where to find
the conceptual overview and the version-specific technical reference for each.

## Ed-Fi Data Standard

The [Ed-Fi Data Standard](./data-standards.md) is the widely
adopted, CEDS-aligned, open-source data standard developed by the educational
community for the betterment of the community. The Ed-Fi Data Standard serves as
the foundation for enabling interoperability among secure data systems and
contains a [Unifying Data Model](./udm/readme.md) designed to capture the
meaning and inherent structure in the most important information in the K–12
education enterprise.

➡️ [Documentation for version 6 (current)](/reference/data-exchange/data-standard/) \
➡️ [Documentation for version 5 (active)](/reference/data-exchange/data-standard/5/) \
➡️ [Documentation for version 4 (active)](/reference/data-exchange/data-standard/4/)

These version pages list the domains, entities, and descriptors in each
version; the other pages in this section apply across versions.

## What standards does the Ed-Fi Alliance publish?

- **[Ed-Fi Data Standard](./data-standards.md).** The community-developed
  standard for K–12 education data. It is expressed through the Unifying Data
  Model and the Ed-Fi REST API Specifications below; it is not a separate
  artifact. Major versions are released and supported on a published [release
  cadence](/reference/roadmap/cadence).
- **[Ed-Fi Unifying Data Model (UDM)](./udm/readme.md).** The logical model
  behind the Data Standard. Following Domain-Driven Design, its entities and
  relationships represent the data that source systems actually collect. The
  UDM doesn't by itself tell you how to build an API or an integration, and
  much of it is background. Its Best Practices pages, however, are normative
  guidance on how to conform to the standard.
- **[Ed-Fi REST API Specifications](#ed-fi-api-specifications).** The REST API
  endpoints and JSON messages used to exchange data that conforms to the Data
  Standard. Normative.
- **[Ed-Fi API Design and Implementation
  Guidelines](./api-guidelines/readme.md).** The requirements an Ed-Fi REST API
  specification and implementation must meet to be aligned with Ed-Fi
  standards. Normative: an implementation that doesn't follow them doesn't
  conform to the standard.
- **[Extension Framework](./extensions-framework/readme.md).** Guidelines for
  adding data to the Data Standard for a specific implementation.
  Non-normative.
- **[Requests for Comment (RFC)](./rfc/readme.md).** How a change to the Data
  Standard becomes official, and where to find and comment on open RFCs.

## Normative and non-normative standards

A normative standard states requirements that a conforming implementation must
meet. Non-normative material explains, models, or guides, but does not by
itself set requirements.

- **Normative:** the Ed-Fi REST API Specifications, the API Design and
  Implementation Guidelines, and the Best Practices pages in the Unifying Data
  Model.
- **Non-normative:** the rest of the Unifying Data Model, and the Extension
  Framework guidelines.

## Ed-Fi API Specifications

The Ed-Fi API Specifications define the API resources and JSON message formats
used to exchange data that conforms to the Ed-Fi Data Standard. An Ed-Fi
compatible API application creates a REST-based interface for data exchange,
where the messages conform to the Ed-Fi Data Standard. The [Ed-Fi
ODS/API](../2-ods-api-platform/readme.mdx) is the Ed-Fi Alliance's core API product, used
by nearly all "Ed-Fi deployments." Any interested party can build an alternate,
compatible, application, by adhering to the Open API specifications and guidance
provided in [Ed-Fi API Guidelines](./api-guidelines/readme.md).

:::tip

For guidance on building an Ed-Fi compatible API application, please see [Ed-Fi
API Guidelines](./api-guidelines/).

:::

## How standards are developed and governed

The Ed-Fi Alliance coordinates standards development with the community: it
sets schedules, arranges field testing, takes draft standards through an [RFC
process](./rfc/readme.md), and publishes the final, authoritative artifacts.
See [Data Standard Governance](./data-standards.md#data-standard-governance)
and [Data Standard Development](./data-standards.md#data-standard-development).

Looking to get involved in the discussion and definition of standards?

1. Visit the [Ed-Fi Community Hub](https://community.ed-fi.org) to participate
   in forums or to create a support case with questions or suggested improvements.
2. Learn about participation in the Ed-Fi Alliance's [governance
   structure](/community/involved/governance).

## Other resources

- What do we mean by "standards?" The [Ed-Fi is a Data
  Standard](https://www.ed-fi.org/ed-fi-data-standard/) article on our main
  website has an overview.
- [How the Ed-Fi Data Standard Fits Into Your Data
  Ecosystem](./ed-fi-in-your-data-ecosystem.md) explains how the Data Standard
  and Ed-Fi API relate to student information systems, data warehouses and data
  lakes, and state longitudinal data systems.
- The [Legacy Educator Preparation Data Model (EPDM)](./epdm.md) page covers the
  educator preparation model. Its community edition is now part of Data
  Standard 6.
- [Technical Articles](./technical-articles/readme.md) cover specific data
  exchange topics.
