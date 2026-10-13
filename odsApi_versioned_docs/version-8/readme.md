---
sidebar_position: 0
---

# Ed-Fi API v8

**Ed-Fi API v8** is the next-generation platform for data integration and
management. It is designed to be a fully compatible replacement for the current
ODS/API Platform, built on a modern architecture.

The Ed-Fi Alliance plans to fully replace the ODS/API Platform with Ed-Fi API v8
by the 2029–2030 school year. The ODS/API Platform will continue to receive
support through the 2028–2029 school year. For details, see the [Ed-Fi ODS/API
and Ed-Fi API v8 FAQ](/reference/roadmap/api-faq).

## What Ed-Fi API v8 Is and Is Not

Ed-Fi API v8 **is**:

- The successor to the Ed-Fi ODS/API: a single service that serves Ed-Fi Data
  Standard resources over HTTP (REST).
- Part of the Ed-Fi API Platform, which replaces the Ed-Fi ODS/API Platform.
  Alongside Ed-Fi API v8, the platform includes the Configuration Service, which
  replaces the ODS Admin API and manages client credentials, claim sets, and
  deployment configuration, and optional Kafka connectors for streaming data.
- An implementation of existing Ed-Fi Data Standard versions. See [Supported
  Versions](/reference/roadmap/supported-versions) for which versions each
  release supports.

Ed-Fi API v8 **is not**:

- A new version of the Ed-Fi Data Standard. The Data Standard is versioned and
  released separately from the software that implements it.
- An incremental upgrade to ODS/API 7.x. It is a new codebase.
- Compatible with the ODS database schema. The backend is relational, but its
  tables differ from the ODS, `EdFi_Admin`, and `EdFi_Security` databases, so
  integrations that read or write those databases directly need to change.
  Client applications that use the REST API are largely compatible.
- The ODS Admin API. The Configuration Service takes over that role and
  implements the Ed-Fi Management API Specification (v3), not the ODS Admin API
  v2 software.

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
  Server), preserving existing SQL-based reporting and analytics patterns.
- **New admin surface** — Replaces the Admin API with a Configuration Service
  that implements the Ed-Fi Management API Specification (v3).

## Naming

Ed-Fi API v8 was developed under earlier and internal names that still appear
in community discussions, source code, and older materials:

| Earlier or internal name            | Current name                    | Replaces            |
| ----------------------------------- | ------------------------------- | ------------------- |
| Ed-Fi Data Management Service (DMS) | Ed-Fi API                       | Ed-Fi ODS/API       |
| DMS Configuration Service           | Ed-Fi API Configuration Service | Ed-Fi ODS Admin API |

Project Tanager is the Ed-Fi Alliance's name for the project that built Ed-Fi
API v8 and the Configuration Service. It is a project name, not a product name.

The DMS name remains in the source repository, in script names such as
`bootstrap-local-dms.ps1`, and in database names such as
`edfi_datamanagementservice`.

## Source Code

Ed-Fi API v8 is developed as an open source project:
[Ed-Fi-Alliance-OSS/Data-Management-Service](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service)
