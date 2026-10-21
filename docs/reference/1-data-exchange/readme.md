# Data Exchange Standards

The Ed-Fi Alliance coordinates and publishes community-led standards for
education data and the exchange of that data. This page is a map of those
standards: what each one defines, which ones are normative, and where to find
the conceptual overview and the version-specific technical reference for each.

## What standards does the Ed-Fi Alliance publish?

- **[Ed-Fi Data Standard](./data-standards.md).** The community-developed
  standard for K–12 education data. It is versioned, and each major version
  supports specific school years.
- **[Ed-Fi Unifying Data Model (UDM)](./udm/readme.md).** The logical model
  behind the Data Standard. It keeps the Data Standard's specifications
  consistent with each other. Non-normative.
- **[Ed-Fi API Specifications](#ed-fi-api-specifications).** The API endpoints
  and JSON messages used to exchange data that conforms to the Data Standard.
  Normative.
- **[Ed-Fi API Design and Implementation
  Guidelines](./api-guidelines/readme.md).** The requirements an Ed-Fi REST API
  specification and implementation must meet to be aligned with Ed-Fi
  standards. Contains both normative and non-normative documentation.
- **[Ed-Fi XSD Design and Implementation
  Guidelines](./xsd-guidelines/readme.md).** Guidelines for Ed-Fi XML schema
  definitions (XSD) and XML data exchange.
- **[Extension Framework](./extensions-framework/readme.md).** Guidelines for
  adding data to the Data Standard for a specific implementation.
  Non-normative.
- **[RFC Specifications](./rfc/readme.md).** Data elements and models proposed
  for use by the community but not yet part of the core standard.

## Normative and non-normative standards

A normative standard states requirements that a conforming implementation must
meet. Non-normative material explains, models, or guides, but does not by
itself set requirements.

- **Normative:** the Ed-Fi API Specifications (API endpoint descriptions and
  JSON messages), and parts of the API Design and Implementation Guidelines.
- **Non-normative:** the Unifying Data Model, which is a logical model only;
  the Extension Framework guidelines; and the rest of the API Design and
  Implementation Guidelines.

See [What standards do the Ed-Fi Alliance
publish?](./data-standards.md#what-standards-do-the-ed-fi-alliance-publish) on
About the Ed-Fi Data Standard.

## Conceptual overviews and version-specific reference

Pages in this section fall into two groups:

- **Conceptual overviews apply across versions.** Start with [About the Ed-Fi
  Data Standard](./data-standards.md), the [Unifying Data
  Model](./udm/readme.md), [Versioning and
  Releases](./versioning-and-releases.md), and the [Extension
  Framework](./extensions-framework/readme.md).
- **Technical reference is specific to a Data Standard version.** It lists the
  domains, entities, and descriptors in that version. Use the version links
  below.

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

## Ed-Fi API Specifications

The Ed-Fi API Specifications define the API resources and JSON message formats
used to exchange data that conforms to the Ed-Fi Data Standard. An Ed-Fi
compatible API application creates a REST-based interface for data exchange,
where the messages conform to the Ed-Fi Data Standard. The [Ed-Fi
ODS/API](/reference/ods-api-platform) is the Ed-Fi Alliance's core API product, used
by nearly all "Ed-Fi deployments." Any interested party can build an alternate,
compatible, application, by adhering to the Open API specifications and guidance
provided in [Ed-Fi API Guidelines](./api-guidelines/readme.md).

:::tip

For guidance on building an Ed-Fi compatible API application, please see [Ed-Fi
API Guidelines](./api-guidelines/).

:::

## How standards are developed and governed

The Ed-Fi Alliance coordinates standards development with the community: it
sets schedules, arranges field testing, takes draft standards through an RFC
process, and publishes the final, authoritative artifacts. See [Data Standard
Governance](./data-standards.md#data-standard-governance) and [Data Standard
Development](./data-standards.md#data-standard-development).

Looking to get involved in the discussion and definition of standards?

1. Visit the [Ed-Fi Community Hub](https://community.ed-fi.org) to participate
   in forums or to create a support case with questions or suggested improvements.
2. Learn about participation in the Ed-Fi Alliance's [governance
   structure](/community/involved/governance).

## Other resources

- What do we mean by "standards?" The [Ed-Fi is a Data
  Standard](https://www.ed-fi.org/ed-fi-data-standard/) article on our main
  website has an overview.
- The [Legacy Educator Preparation Data Model (EPDM)](./epdm.md) page covers the
  educator preparation model. Its community edition is now part of Data
  Standard 6.
- [Technical Articles](./technical-articles/readme.md) cover specific data
  exchange topics.
