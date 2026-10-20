---
description: Release notes for Ed-Fi API v8.x.
sidebar_position: 3
---

# Release Notes

This section provides a comprehensive list of the improvements, updates, and
changes in the Ed-Fi API v8.x releases.

:::tip

The lists below include ticket numbers from Jira. The Jira project can only be
seen by the development team. However, anyone can look for that ticket number in
the Git commit history in
[Ed-Fi-Alliance-OSS/Data-Management-Service](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service)
GitHub repository to find the changes for that specific update.
:::

## Ed-Fi API v8.1 - Release Notes

### Prerequisites

* **PostgreSQL 18 or later, with a UTF-8 database encoding,** for the Ed-Fi API
  databases. The Configuration Service database requires PostgreSQL 15 or
  later. If both use the same database server, it must meet the PostgreSQL 18
  requirement.
* **SQL Server 2025 or later** for SQL Server deployments.
* **Ed-Fi Data Standard v5.2 or v6.1.**
* **MetaEd IDE v4.9 or later** for building extensions.

### Important Epics

* DMS-1348 - Partitioned cursor paging
* DMS-1202 - Change queries: snapshot isolation and read replicas
* DMS-1201 - Authorization: ownership-based and custom view-based
  authorization
* DMS-1308 - DocumentCache: serialized copy of resources
* DMS-1309 - Event streaming with Kafka and Debezium change data capture
* DMS-1504 - Plugin infrastructure
* DMS-1345 - Custom validation
* DMS-1414 - Unique ID validation
* DMS-1412 - Identities API
* DMS-1084 - Security hardening and token management
* DMS-1353 - Expired access token cleanup
* DMS-1125 - SQL Server implementation and parity
* DMS-848 - Performance testing and tuning
* DMS-1350 - SQL Server performance testing and tuning
* DMS-1072 - Configuration Service alignment with ODS Admin API v2.3

### General Improvements & Enhancements

* DMS-853 - Manage the actions on resource claims through the Configuration
  Service
* DMS-1270 - Option to use a separate database for the Configuration Service
* DMS-1335 - Export logs to an OpenTelemetry (OTLP) endpoint
* DMS-1459 - Limit on active access tokens per API client (15 by default, as in
  the ODS/API)
* DMS-1589 - Ignore unknown query string parameters and report them in an
  `X-EdFi-Warning` header
* DMS-1626 - Vendor namespace prefixes can be up to 255 characters, matching
  the ODS Admin API

### Bug Fixes

* DMS-1267 - `availableChangeVersions` endpoint missing from Swagger UI
* DMS-1278 - `GET /management/current-claims` response couldn't be posted to
  `POST /management/upload-claims`
* DMS-1281 - Unsupported HTTP methods, such as `PATCH`, didn't return an Ed-Fi
  problem-details response
* DMS-1282 - Invalid pagination parameters didn't return a
  parameter-validation-failed response
* DMS-1295 - Profiles and other features failed when the Configuration Service
  used a custom base path
* DMS-1298 - Change query paging was slow on large resources when the change version window was wide
* DMS-1299 - Default rate limit caused `429` errors during bulk and seed loads
* DMS-1336 - Configuration Service `PUT` endpoints didn't consistently validate
  the route and body ids
* DMS-1339 - Connection strings could be encrypted twice when saved back
* DMS-1342 - Default or too-short encryption keys were accepted at startup
* DMS-1365 - Keycloak client creation reported success when role assignment
  failed
* DMS-1407 - Docker Compose shipped with `Debug` logging and unlimited
  container logs
* DMS-1409 - Namespace securable elements applied below the resource root
* DMS-1430 - Expired token cleanup depended on the PostgreSQL session time zone
* DMS-1457 - Client-supplied correlation IDs weren't sanitized or limited in
  length
* DMS-1530 - Vendor and profile names were unique across all tenants instead
  of within each tenant
* DMS-1556 - Configuration Service profile requests returned `500` under
  concurrent load
* DMS-1557 - Profile enforcement was skipped after the Configuration Service
  returned an error
* DMS-1573 - Application and profile requests failed under a Configuration
  Service base path
* DMS-1576 - `If-None-Match` on writes behaved differently from the ODS/API
* DMS-1579 - The Ed-Fi API's own Configuration Service client was subject to
  the token limit
* DMS-1588 - OpenAPI published a `pageSize` default that requests rejected
* DMS-1594 - Duplicate-property errors reported the wrong array index
* DMS-1596 - A write that referenced a missing record returned `500` during namespace authorization instead of `403` or `409`
* DMS-1604 - Client credentials couldn't be posted in the form body

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

## Ed-Fi API v8.x - Breaking Changes from Previous Releases {#ed-fi-api-v80---breaking-changes-from-previous-releases}

This section summarizes the changes that may require updates to existing client
applications, platform configurations, or integration workflows when moving from
the Ed-Fi ODS/API and ODS Admin API to Ed-Fi API v8.

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

#### Rate Limiting

The ODS/API has no built-in rate limiting; throttling is left to a gateway or
proxy. Ed-Fi API v8 limits requests by default to 20,000 requests per 10
seconds for each `Host` header value. Over the limit, it returns `429 Too Many
Requests` with a `Retry-After` header. All clients that reach the API through
the same host name share one limit.

Clients, especially bulk loaders, should handle `429` responses and wait for
the time given in `Retry-After` before retrying. Platform operators can raise
the limit with `RateLimit:PermitLimit` (`DMS_RATE_LIMIT_PERMIT_LIMIT` in Docker
Compose).

#### Client-Supplied Correlation IDs

The ODS/API reads a client-supplied correlation ID from the `correlation-id`
header, or the `correlationId` query string parameter, by default. Ed-Fi API v8
ignores client-supplied correlation IDs unless the platform operator sets a
header name in `AppSettings:CorrelationIdHeader` (`CORRELATION_ID_HEADER` in
Docker Compose), and it doesn't read one from the query string. When enabled,
the value is cleaned and truncated to `AppSettings:CorrelationIdMaxLength`
characters (default `255`). The sample Docker Compose environment files set the
header name to `correlationid`, which differs from the ODS/API's
`correlation-id`.

To keep the ODS/API behavior, set the header name to `correlation-id`. Clients
that send the correlation ID in the query string should send it in the header
instead. See [Correlation
IDs](../platform-dev-guide/configuration/logging-configuration.md#correlation-ids).

### Platform Operator Changes

#### ODS Admin API Replaced by Configuration Service

The Ed-Fi ODS Admin API (system-to-system management interface) is replaced by
the **Configuration Service**, which implements the [Ed-Fi Management API
specification V3](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-API-Specifications/tree/main/api-specifications/management).

The Configuration Service manages:

* Vendors and applications
* API client credentials (key and secret)
* Claim sets
* Data stores (database connection strings, encrypted at rest)
* Route contexts for multi-tenant and school-year routing

Existing scripts or tooling that call the ODS Admin API REST interface will need
to be updated to the Configuration Service API routes. ODS Admin API 2.3
implements version 2 of the Management API, and version 3 has breaking changes:
paths move from `/v2` to `/v3`, `POST` only creates and rejects a resource that
already exists (use `PUT` to update), ODS instances are renamed to data stores
(`odsInstanceIds` becomes `dataStoreIds`), the API client `key` becomes
`clientId`, the claim set `name` becomes `claimSetName`, and `PUT` and `DELETE`
return `204 No Content` instead of `200 OK`. See the [Summary of Changes for
Management API
3.0.0](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-API-Specifications/blob/main/api-specifications/management/SUMMARY-MANAGEMENT-API-3.0.0.md)
for the full list.

#### Configuration Service Differences from the ODS Admin API

Besides the Management API v3 changes, the Configuration Service applies some
rules differently from ODS Admin API 2.3. Review them before moving existing
data or provisioning scripts:

* **Claim set names are unique across all tenants.** In the ODS/API, each
  tenant has its own `EdFi_Security` database, so tenants could reuse a claim
  set name. In Ed-Fi API v8, a claim set name already used by another tenant is
  rejected with `400 Bad Request`. Rename custom claim sets that share a name
  across tenants, for example by adding a tenant prefix.
* **Importing a claim set with an existing name replaces it.** ODS Admin API
  2.3 rejected the import. The Configuration Service replaces the existing claim
  set's permissions and returns `201 Created`. This applies only to a claim set
  in the same tenant that isn't system-reserved. An import whose name belongs to
  another tenant's claim set, or to a system-reserved claim set such as
  `SISVendor`, is rejected with `400 Bad Request`.
* **Existing duplicate names can't be migrated.** ODS Admin API 2.3 allowed
  duplicate vendor company names, and duplicate API client names within an
  application. The Configuration Service rejects them, so rename or merge such
  vendors and API clients before migrating.

#### Deployment Model

The ODS/API supported Windows binary installation, Windows Service hosting, and
IIS deployment. Ed-Fi API v8 is distributed as Docker images only. There is no
binary installer or Windows Service.

| | ODS/API | Ed-Fi API v8 |
| --- | --- | --- |
| Deployment | Binary installer, Windows Service, IIS, Docker | Docker Compose |
| Database setup | PowerShell scripts, Visual Studio | `api-schema-tools` CLI (Ed-Fi API resource database); `DeployDatabaseOnStartup` setting (Configuration Service database only) |
| Admin interface | Admin App (UI) or ODS Admin API | Configuration Service API |

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

Some ODS/API features are not yet available in Ed-Fi API v8. The following
table shows the current status.

| Feature | ODS/API | Ed-Fi API v8.0 | Ed-Fi API v8.1 |
| --- | --- | --- | --- |
| Resources and Descriptors API | Yes | Yes | Yes |
| Discovery API | Yes | Yes | Yes |
| Profiles (readable and writable) | Yes | Yes | Yes |
| Authorization | Yes | Yes, except ownership-based and custom view-based authorization | Yes |
| Multi-tenancy | Yes | Yes | Yes |
| School-year / district routing | Yes | Yes | Yes |
| Changed record queries | Yes | Yes, without snapshot isolation or custom view-based authorization | Yes |
| Cursor paging | Yes | No | Yes |
| Read replicas | Yes | No | Yes |
| Serialized data (DocumentCache in v8) | Yes | No | Yes |
| Event streaming with Kafka | No | No | Yes |
| Identities API | Yes | No | Yes (the host supplies the identity integration as a plugin) |
| Unique ID validation | Yes | No | Yes, built as a custom validator plugin |
| External configuration of connection strings | Yes | No | Partly: values within data store connection strings can come from a secret store, and a secrets plugin can also supply the Configuration Service's own database connection string, and both services' keys and client secrets (see [Secrets in Connection Strings](../platform-dev-guide/configuration/secrets-in-connection-strings.md)) |
| MetaEd extensions | Yes | Yes (different workflow — see [Extending API DataModel](../platform-dev-guide/extensibility-customization/extending-api-datamodel.md)) | Yes |
| OneRoster | Yes | No | No (planned for v8.2) |
| Bulk Load Client utility | Yes | Yes (same tool, updated for v8 URLs) | Yes |
| Sandbox Administration Portal | Yes | No | No |
| Admin App (UI) | Yes | No | No |
