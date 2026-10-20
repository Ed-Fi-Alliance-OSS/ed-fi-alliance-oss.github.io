---
sidebar_position: 3
sidebar_label: Ed-Fi and Other Systems
description: How the Ed-Fi Data Standard and Ed-Fi APIs relate to student information systems, data warehouses and data lakes, and state longitudinal data systems.
---

# The Ed-Fi Data Standard and Other Education Data Systems

The [Ed-Fi Data Standard](./data-standards.md) is a specification for
exchanging education data. Ed-Fi APIs, such as the [Ed-Fi
ODS/API](/reference/ods-api-platform) and [Ed-Fi API v8](/reference/ed-fi-api/8),
implement it. Together they connect the systems that schools and agencies
already run; they do not replace those systems. This page answers common
questions about how they relate to other kinds of education data systems.

## Does the Ed-Fi Data Standard replace a student information system?

No. A student information system (SIS) is the application a school or district
uses to manage enrollment, attendance, schedules, grades, and other student
records. The Ed-Fi Data Standard defines how that data is described and
exchanged, and an Ed-Fi API receives it. Neither one is a SIS.

The two work together:

1. The SIS remains the application where school staff enter and manage student
   data.
2. The SIS vendor builds an API client that creates, updates, and deletes data
   on the agency's Ed-Fi API as it changes in the SIS. For example, when a
   student enrolls, the SIS sends a `StudentSchoolAssociation` record to the
   agency's API.
3. Other products, such as assessment, HR, and learning systems, send their
   data to the same API. Because they all follow the Data Standard, the agency
   can connect the records without a custom mapping for each vendor.
4. Downstream systems, such as data warehouses, reporting tools, and state
   reporting, read the data from the API.

For SIS vendors, this replaces custom extracts for each customer with one
integration that many education agencies can receive. See [Student Information
System
Providers](/getting-started/provider-playbook/specifics-by-provider-type/student-information-system-providers)
and [Ed-Fi API Integration Architecture for Data
Providers](/getting-started/provider-playbook/implementation/ed-fi-api-integration-architecture-for-data-providers).

## Is the Ed-Fi Data Standard a data warehouse or data lake?

No. The Ed-Fi Data Standard is not a database or a reporting tool: it defines
what is exchanged, not how a system stores or reports on that data. An Ed-Fi
API is a transactional system. It is optimized for exchanging operational data
between source systems and a central operational data store (ODS). A data
warehouse, data lake, or lakehouse is analytical infrastructure, built for
queries across large amounts of data.

Ed-Fi data commonly feeds these systems:

- **Analytics run downstream of the API.** Read-heavy analytical queries should
  be served from a dedicated data store, such as a data warehouse or reporting
  pipeline, that is populated by reading from the Ed-Fi API.
- **The API is an upstream source for a lake or lakehouse.** In a data lake,
  the Ed-Fi API serves as a source for the ingest step, so the data that lands
  in the lake is already structured according to the Ed-Fi Data Standard.
- **Incremental loads use changed record queries.** Downstream loads can read
  only the records that changed since the last load. See [Using the Changed
  Record
  Queries](/reference/ed-fi-api/client-developers-guide/using-the-changed-record-queries).
- **Analytical models are built from the data.** The Data Standard's
  [Unifying Data Model](./udm/readme.md) is designed for writing interoperable
  data, not for dashboards and analytics, so analytical stores typically use
  their own models built from Ed-Fi data.

For more detail, see [The Ed-Fi Data Standard in the Age of
AI](/getting-started/provider-playbook/implementation/ed-fi-data-standard-in-the-age-of-ai)
and [Ed-Fi in the Data
Lake](/getting-started/provider-playbook/implementation/ed-fi-in-the-data-lake).
The data lake paper was written in 2022, and some tools it mentions are now
deprecated.

An [Ed-Fi data hub](/getting-started/esa-playbook#what-is-an-ed-fi-data-hub)
is a related idea: a shared data system, usually run by an education service
agency or a state, that collects data through an Ed-Fi API and then supports
analytics and data warehousing for member districts.

## Is the Ed-Fi Data Standard a state longitudinal data system?

No. A state longitudinal data system (SLDS) is the system a state uses to keep
education data over many years for reporting and research. The Ed-Fi Data
Standard and Ed-Fi APIs can standardize and supply the data that goes into an
SLDS, but they are not an SLDS.

In a typical state Ed-Fi architecture:

1. Districts' student information systems and other products send data to the
   state's Ed-Fi API, which validates the data as it arrives instead of relying
   on file-based submissions.
2. The state periodically moves data from the Ed-Fi ODS into a multiyear store.
3. The state populates its SLDS for reporting needs. In some states the SLDS is
   based on the Ed-Fi data model; in others it is a third-party or existing
   agency system.
4. From the SLDS, the state generates datamarts for state and federal
   reporting, such as EDFacts.

See [Elements of an Ed-Fi
Architecture](/getting-started/sea-playbook/implementation/elements-of-an-ed-fi-architecture#state-longitudinal-data-warehouse-system)
and the [SEA Playbook](/getting-started/sea-playbook).

## Related pages

- [About the Ed-Fi Data Standard](./data-standards.md), including what it is
  and is not
- [What is the difference between the Ed-Fi Data Standard and
  OneRoster?](/reference/oneroster/faq#q-what-is-the-difference-between-the-ed-fi-data-standard-and-oneroster)
- [What Is an Ed-Fi Data Hub?](/getting-started/esa-playbook#what-is-an-ed-fi-data-hub)
