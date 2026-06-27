---
sidebar_position: 0
---

# Ed-Fi API v8 (Upcoming)

:::warning Upcoming Release

Ed-Fi API v8 is under active development and is not yet available for production
use. Documentation will be expanded as the release approaches.

:::

The Ed-Fi Alliance is developing **Ed-Fi API v8** as the next-generation
platform for data integration and management. It is designed to be a fully
compatible replacement for the current ODS/API Platform, built on a modern
architecture.

The Ed-Fi Alliance plans to fully replace the ODS/API Platform with Ed-Fi API v8
by the 2029–2030 school year. The ODS/API Platform will continue to receive
support through the 2028–2029 school year. For details, see the [Ed-Fi ODS/API
and Ed-Fi API v8 FAQ](/reference/roadmap/api-faq).

## Key Highlights

- **API-compatible** — Client applications built for the ODS/API REST interface
  will continue to work without changes. Ed-Fi API v8 is a fully conformant
  implementation of the [Ed-Fi API Design and Implementation Guidelines
  4.0](/reference/data-exchange/api-guidelines/).
- **Modern architecture** — Adopts a service-oriented architecture with a
  Configuration Service and optional Kafka-based streaming for real-time data
  flows.
- **Relational data model** — The backend remains relational (PostgreSQL or SQL
  Server), preserving existing SQL-based reporting and analytics patterns.
- **New admin surface** — Replaces the Admin API with a Configuration Service
  that implements the Ed-Fi Management API Specification (v3).

## Source Code

Ed-Fi API v8 is developed as an open source project:
[Ed-Fi-Alliance-OSS/Data-Management-Service](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service)
