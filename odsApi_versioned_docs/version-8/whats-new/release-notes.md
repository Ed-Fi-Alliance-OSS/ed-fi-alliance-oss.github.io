---
description: Release notes for Ed-Fi API v8.0.
sidebar_position: 3
---

# Release Notes

This section provides a comprehensive list of the improvements, updates, and
changes in the Ed-Fi API v8.0 release.

:::tip

The lists below include ticket numbers from Jira. The Jira project can only be
seen by the development team. However, anyone can look for that ticket number in
the Git commit history in
[Ed-Fi-Alliance-OSS/Data-Management-Service](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service)
GitHub repository to find the changes for that specific update.
:::

## Ed-Fi API v8.0 - Release Notes

### Important Epics

* DMS-928 - Relational storage model (foundation)
* DMS-935 - DDL emission for PostgreSQL and SQL Server (schema tooling)
* DMS-948 - Provisioning workflow (deployment tooling: `api-schema-tools ddl
  provision`)
* DMS-1027 - Runtime plan compilation and caching (runtime engine)
* DMS-980 - Relational write path (core API: POST/PUT)
* DMS-988 - Relational read path (core API: GET + query)
* DMS-1029 - Authorization (security: relationship-based, namespace-based)
* DMS-343 - Claims and claim set management (security config)
* DMS-1001 - Update tracking (`_etag`, `_lastModifiedDate`) and change queries
  (tracking features)
* DMS-329 - Profiles (data access features)
* DMS-861 - Multi-tenancy support (data segmentation)
* DMS-321 - Extension support (extensibility)

## Ed-Fi API v8.0 - Breaking Changes from Previous Releases

This section summarizes the changes that may require updates to existing client
applications, platform configurations, or integration workflows when moving from
the Ed-Fi ODS/API to Ed-Fi API v8.

### Client Application Changes

#### Case-Sensitive Property Names

**This is the most impactful change for existing client applications.**

The Ed-Fi API v8 enforces case-sensitive property names in `POST` and `PUT`
request bodies. Property names must match the exact casing defined in the
resource's OpenAPI specification — Ed-Fi resource properties use `camelCase`.
The ODS/API did not enforce property-name casing.

How a wrongly cased property is handled depends on whether it is required or
optional:

| Property type | Wrong casing behavior |
| --- | --- |
| Required | Property is dropped, request fails with **HTTP 400** (missing required property) |
| Optional | Property is dropped **silently** — no error, but the value is not stored |

:::warning

A wrongly cased optional property does not return an error. The value is
silently discarded and will not appear in subsequent GET responses. Always send
property names exactly as defined in the resource's OpenAPI specification.

:::

**Example:** sending `GRADELEVELS` instead of `gradeLevels` on a school POST
causes the value to be dropped. Since `gradeLevels` is required, the request
fails with HTTP 400.

**How to audit:** retrieve the OpenAPI specification from the API's metadata
endpoint and compare property names in your request bodies against the spec. The
correct property names for every resource are published in the resources OpenAPI
specification at `/metadata/specifications/resources-spec.json` (the available
specification sections are listed at `/metadata/specifications`).

#### URL Path Changes

The ODS/API included a `v3/` segment in all resource URLs. Ed-Fi API v8 removes
this segment.

| | URL pattern |
| --- | --- |
| ODS/API | `/data/v3/ed-fi/schools` |
| Ed-Fi API v8 | `/{pathBase}/data/ed-fi/schools` |

The `pathBase` prefix is controlled by the `PATH_BASE` environment variable
(default: `api`), giving a default path of `/api/data/ed-fi/schools`. URL path
matching for resource names and query parameter names remains case-insensitive.
Only request-body property names are case-sensitive.

#### Token Endpoint Location

In the ODS/API, the OAuth token endpoint was hosted by the ODS/API itself. In
Ed-Fi API v8, the token endpoint is hosted by the **Configuration Service**.

| | Token endpoint |
| --- | --- |
| ODS/API | `https://{host}/oauth/token` |
| Ed-Fi API v8 | `https://{config-service-host}/connect/token` |

To ease migration, the Ed-Fi API continues to expose an `/oauth/token`
compatibility proxy that forwards token requests to the Configuration Service,
so existing clients that construct the token URL from the API host are **not
required** to change it. New and updated clients are, however, encouraged to
call the Configuration Service `/connect/token` endpoint directly.

### Platform Operator Changes

#### Admin API Replaced by Configuration Service

The Ed-Fi ODS Admin API (system-to-system management interface) is replaced by
the **Configuration Service**, which implements the [Ed-Fi Management API
specification V3](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-API-Specifications/tree/main/api-specifications/management).

The Configuration Service manages:

* Vendors and applications
* API client credentials (key and secret)
* Claim sets
* Data stores (database connection strings, encrypted at rest)
* Route contexts for multi-tenant and school-year routing

Existing scripts or tooling that call the Admin API REST interface will need to
be updated to the Configuration Service API routes.

#### Deployment Model

The ODS/API supported Windows binary installation, Windows Service hosting, and
IIS deployment. Ed-Fi API v8 is distributed as Docker images only. There is no
binary installer or Windows Service.

| | ODS/API | Ed-Fi API v8 |
| --- | --- | --- |
| Deployment | Binary installer, Windows Service, IIS, Docker | Docker Compose |
| Database setup | PowerShell scripts, Visual Studio | `api-schema-tools` CLI (Ed-Fi API resource database); `DeployDatabaseOnStartup` setting (Configuration Service database only) |
| Admin interface | Admin App (UI) or Admin API | Configuration Service API |

#### No In-Place Database Migration

There is no automated migration path from an ODS/API database to an Ed-Fi API v8
database. The schema structures are fundamentally different: ODS/API uses a
deeply normalized, inheritance-based relational schema, while Ed-Fi API v8 uses
a flat tables-per-resource model. Data must be re-loaded via the Ed-Fi API.

#### Direct Database Access Patterns

If your reporting, analytics, or ETL processes query the ODS database directly,
the table structure has changed. Ed-Fi API v8 uses dedicated tables per
resource, schema-qualified per project (e.g., `edfi.School`, `edfi.Student`);
however, there are structural changes. Existing SQL queries against ODS tables
will need to be updated. See
[Relational Data Model](../technical-articles/relational-data-model.md) for the
new schema structure.

### Feature Availability

Some ODS/API features are not yet available in Ed-Fi API v8.0. The following
table shows the current status.

| Feature | ODS/API | Ed-Fi API v8.0 |
| --- | --- | --- |
| Resources and Descriptors API | Yes | Yes |
| Discovery API | Yes | Yes |
| Profiles (readable and writable) | Yes | Yes |
| Authorization | Yes | Yes, except ownership-based and custom view-based authorization |
| Multi-tenancy | Yes | Yes |
| School-year / district routing | Yes | Yes |
| Changed record queries | Yes | Yes, with [minor limitations](../platform-dev-guide/features/changed-record-queries.md#current-limitations) |
| MetaEd extensions | Yes | Yes (different workflow — see [Extending API DataModel](../platform-dev-guide/extensibility-customization/extending-api-datamodel.md)) |
| OneRoster | Yes | Not available in v8.0 |
| Bulk Load Client utility | Yes | Yes (same tool, updated for v8 URLs) |
| Sandbox Administration Portal | Yes | Not available in v8.0 |
| Admin App (UI) | Yes | Not available in v8.0 |
