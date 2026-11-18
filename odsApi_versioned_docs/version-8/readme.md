---
sidebar_position: 0
---

# Ed-Fi API v8

**Ed-Fi API v8** is the next-generation platform for data integration and
management. It is designed to replace the current ODS/API Platform, on a
modern architecture. It implements existing versions of the Ed-Fi Data
Standard; it is not a new Data Standard version. See [Supported
Versions](/reference/roadmap/supported-versions) for which versions each
release supports. For how an Ed-Fi API relates to the Data Standard and the
Ed-Fi API Specifications, see [Ed-Fi Data Standard vs. UDM vs. API
Specifications vs. Ed-Fi API](/reference/data-exchange/data-standard-vs-udm-vs-api).

For the current release and its support status, see [Supported
Versions](/reference/roadmap/supported-versions). For what Ed-Fi API v8.1
adds, see [What's New](./whats-new/readme.mdx).

The Ed-Fi Alliance plans to fully replace the ODS/API Platform with Ed-Fi API v8
by the 2029–2030 school year. The ODS/API Platform will continue to receive
support through the 2028–2029 school year. For details, see the [Ed-Fi ODS/API
and Ed-Fi API v8 FAQ](/reference/roadmap/api-faq).

:::note[Earlier names]

During development, Ed-Fi API v8 was called the Data Management Service (DMS)
and the Configuration Service the DMS Configuration Service (CMS). These names
still appear in source code and older materials. See [What are DMS, CMS, and
Project Tanager?](/reference/roadmap/api-faq#q-what-are-dms-cms-and-project-tanager).

:::

## Key Highlights

- **API-compatible** — Ed-Fi API v8 is a fully conformant implementation of the
  [Ed-Fi API Design and Implementation Guidelines
  4.0](/reference/data-exchange/api-guidelines/). Most client applications built
  for the ODS/API REST interface are compatible, but there are breaking changes
  — see the [release
  notes](./whats-new/release-notes.md#client-application-changes) for the
  migration checklist.
- **Modern architecture** — Adopts a service-oriented architecture with a
  Configuration Service for API management and deployment configuration.
- **Relational data model** — The backend remains relational (PostgreSQL or SQL
  Server), so you can still report on the data with SQL. The tables differ from
  the ODS/API's, so existing reporting queries need updating; see [Relational
  Data Model](./technical-articles/relational-data-model).
- **New admin surface** — Replaces the Admin API with a Configuration Service
  that implements the Ed-Fi Management API Specification (v3).

## Source Code

Ed-Fi API v8 is developed as an open source project:
[Ed-Fi-Alliance-OSS/Data-Management-Service](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service)
