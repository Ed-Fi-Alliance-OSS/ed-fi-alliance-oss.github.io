# ODS API 7.3.2 Requirements

> Extracted from Ed-Fi Alliance documentation. To be merged into a consolidated requirements document.

## Sources

The following documentation files were consulted during extraction (relative paths from repository root):

- `odsApi_versioned_docs/version-7.3/whats-new/whats-new-in-this-release.md`
- `odsApi_versioned_docs/version-7.3/whats-new/release-notes.md`
- `odsApi_versioned_docs/version-7.3/readme.md`
- `odsApi_versioned_docs/version-7.3/downloads.md`
- `odsApi_versioned_docs/version-7.3/client-developers-guide/basics.md`
- `odsApi_versioned_docs/version-7.3/client-developers-guide/authentication.md`
- `odsApi_versioned_docs/version-7.3/client-developers-guide/authorization.md`
- `odsApi_versioned_docs/version-7.3/client-developers-guide/api-routes.md`
- `odsApi_versioned_docs/version-7.3/client-developers-guide/using-the-changed-record-queries.md`
- `odsApi_versioned_docs/version-7.3/platform-dev-guide/features/readme.md`
- `odsApi_versioned_docs/version-7.3/platform-dev-guide/features/oneroster.md`
- `odsApi_versioned_docs/version-7.3/platform-dev-guide/features/changed-record-queries.md`
- `odsApi_versioned_docs/version-7.3/platform-dev-guide/features/serialized-data.md`
- `odsApi_versioned_docs/version-7.3/platform-dev-guide/features/read-replicas.md`
- `odsApi_versioned_docs/version-7.3/platform-dev-guide/security/readme.md`
- `odsApi_versioned_docs/version-7.3/platform-dev-guide/security/api-profiles.md`
- `odsApi_versioned_docs/version-7.3/platform-dev-guide/configuration/single-and-multi-tenant-configuration.md`
- `odsApi_versioned_docs/version-7.3/platform-dev-guide/deployment/production-deployment.md`
- `odsApi_versioned_docs/version-7.3/getting-started/getting-started-docker-deployment.md`
- `odsApi_versioned_docs/version-7.3/getting-started/binary-installation/binary-releases.md`
- `docs/reference/0-roadmap/supported-versions.md`
- `blog/2026-04-27.md`
- `blog/2026-05-11.md`

---

## Functional Requirements

### 1. Data Standard Support

1. The ODS / API v7.3.2 must implement **Ed-Fi Data Standard v6.1** with no breaking changes from Data Standard v6.0.
2. The ODS / API v7.3.2 must continue to support implementations of Ed-Fi Data Standard **v5.2** and **v4.0** in parallel.
3. The system must support a rich, extensible K–12 data model covering the following information domains:
   - Assessment
   - Bell Schedule
   - Discipline
   - Education Organization
   - Enrollment
   - Finance
   - Graduation
   - Intervention
   - School Calendar
   - Staff
   - Student Academic Record
   - Student Attendance
   - Student Cohort
   - Student Identification and Demographics
   - Teaching and Learning
   - Alternative/Supplemental Services (Career and Technical Education, Migrant Education, Special Education, Title I Part A Services)
4. The data model must be extensible so that platform hosts can customize it for their specific needs using Ed-Fi Extensions.

### 2. REST API and HTTP Operations

1. The API must expose a secure, modern, RESTful interface for hosting and exchanging K–12 education data.
2. The API must support JSON as the primary data exchange format.
3. The API must support the following HTTP verbs on resources:
   - **POST** — Create a new resource. If the natural key already exists, perform an upsert (update).
   - **GET** — Retrieve one or more existing resources. Supports retrieval by natural key, internal UUID, or full collection.
   - **PUT** — Perform an idempotent full replacement of an existing resource. Supports natural key updates (cascading changes) for designated resources.
   - **DELETE** — Delete an existing individual resource.
4. The API must support XML data format for batch ingestion scenarios (via Bulk Load Client Utility).
5. The API must expose metadata conforming to the **OpenAPI** specification to support SDK code generation.
6. The Swagger UI metadata endpoint (`openApiMetadata`) must be configurable (enabled/disabled); it must be disabled in production deployments.

### 3. API Routes and Versioning

1. The API must use the following route structure to support multiple extensions and API versioning:

   ```text
   {tenantIdentifier}/{context}/{api_area}/{version}/{schema}/{resource}
   ```

2. The API must support simplified uniform routes where the `SchoolYear` segment may be absent or placed at the beginning of all routes, configurable by the platform host.
3. The API must support the following route prefixes:
   - Data Management Resources: `/data/v3/{schema}/{resource}`
   - API Composites: `/composites/v1/{org}/{category}/{resource}`
   - Identity: `/identity/v2/identities`
4. Multi-tenant routes must include a `tenantIdentifier` segment when multi-tenancy is configured.
5. Context-based routing for year-specific ODS must include a `{context}` segment.
6. Resource routes must apply name shortening to remove redundancy in property names from embedded objects and collections.

### 4. Authentication

1. The API must use **OAuth 2.0 Client Credentials Grant Flow** (two-legged OAuth) for authentication.
2. Clients must obtain an access token by POSTing to `/oauth/token` with a Base64-encoded `key:secret` in the `Authorization` header and `grant_type=client_credentials` in the request body.
3. The access token response must include `access_token`, `expires_in` (seconds), and `token_type`.
4. Access tokens must expire after a configurable period (default: 1800 seconds / 30 minutes).
5. After expiry, clients must obtain a new access token.
6. All subsequent API requests must include the access token in an `Authorization: ****** HTTP header.
7. Token limits per API client must be enforceable (ODS-6418).
8. It must be possible to disable a key/secret without deleting it (ODS-6448).
9. The API must support an `/oauth/token_info` introspection endpoint (RFC 7662) that returns:
   - Active status of the token
   - Client ID
   - Namespace prefixes
   - Associated education organizations
   - Assigned profiles
   - Claim set name
   - Accessible resources and permitted operations
   - Accessible services and permitted operations

### 5. Authorization

1. Authorization must be enforced via **claims and profiles** after authentication.
2. The system must support a **relationship-based** authorization strategy, restricting client access to data related to their associated education organization(s) (e.g., school, LEA).
3. The system must support an **ownership-based** authorization strategy for assessment metadata, enabling multiple callers to manage their own metadata.
4. Claim sets must provide fine-grained, configurable access control at the resource level, covering CRUD operations (Create, Read, Update, Delete, ReadChanges).
5. Claims must be organized in a hierarchical taxonomy to allow administrators to set permissions at conceptual groupings of resources.
6. **API Profiles** must allow platform hosts to constrain the data exposed from specific resources for individual use cases.
7. Profile media types must follow the format: `application/vnd.{schema}.{resource}.{profile-name}.{readable|writable}+json`.
8. Clients assigned a single profile must have it auto-applied without needing to specify media-type headers; clients with multiple assigned profiles must specify the profile in the `Accept` (GET) or `Content-Type` (PUT/POST) header.
9. Profile definitions must support both static (compiled into assembly) and dynamic (database-driven, refreshed without redeployment) configurations.
10. Profile cache refresh period must be configurable.
11. Security configuration must be manageable via the **Admin API**.
12. The system must support extensible authorization filtering (ODS-5815), including custom view-based authorization.
13. Permissions API must be available as a configurable feature (ODS-6362).
14. The ability to query organizations by an identification code must be supported (ODS-5665).

### 6. Data Change Tracking (Change Queries)

1. The API must support a **Changed Record Queries** feature that tracks inserts, updates, deletes, and key changes in the ODS.
2. Change queries must be enabled by default and configurable (on/off) via the `FeatureManagement:ChangeQueries` application setting.
3. The API must expose a `GET /changeQueries/v1/availableChangeVersions` endpoint returning `oldestChangeVersion` and `newestChangeVersion`.
4. API clients must be able to filter resource requests by `minChangeVersion` and `maxChangeVersion` query parameters to retrieve only changed records.
5. The API must support tracking of **delete events** using tombstone tables (delete tracking triggers and tables).
6. The change version must be a sequential long integer maintained via a global Sequence object and stored in a `ChangeVersion` column on aggregate root tables.
7. Cascade key changes must update the `ChangeVersion` of all references (ODS-6326).
8. An unnecessary database round-trip for `ChangeVersion` after upserts must be eliminated (ODS-6482).
9. The API must support **snapshot isolation** for change queries processing:
   - Platform hosts must be able to create and register ODS snapshots in the `EdFi_Admin.dbo.OdsInstanceDerivative` table.
   - API clients must indicate the intent to use a snapshot via the `Use-Snapshot` HTTP header (replacing the old `Snapshot-Identifier` header).
   - The dedicated snapshots endpoint (`ChangeQueries/v1/snapshots`) is removed; snapshot configuration is now a single-snapshot model.

### 7. Ed-Fi OneRoster Service Integration

1. ODS / API v7.3.2 must introduce an optional **Ed-Fi OneRoster service** feature (`oneRoster`, disabled by default) implementing the **1EdTech OneRoster® 1.2** specification.
2. The OneRoster service must be deployed as a **separate, independently operated API service** from the core ODS / API.
3. The OneRoster service must read data from **database views on the Ed-Fi ODS**, ensuring data consistency without duplication or synchronization overhead.
4. The OneRoster service must support the following resource endpoints (non-exhaustive):
   - Organizations and schools
   - Academic sessions, terms, and grading periods
   - Courses and classes
   - Users (students and teachers)
   - Enrollments and demographics
5. OAuth 2.0 client credentials must be shared between the ODS / API and the OneRoster service — clients must use the same key and secret to access both APIs.
6. OneRoster authorization must integrate into the existing Ed-Fi claims-based security model, with OAuth scopes aligned to OneRoster resources.
7. The OneRoster service must support both SQL Server and PostgreSQL backends.
8. Platform hosts must configure the OneRoster feature in the ODS / API using JWT-based security settings.

### 8. Serialized Data (Performance Optimization Feature)

1. The API must support an optional **Serialized Data** feature (`serializedData`, enabled by default) that stores a binary representation of each resource in an `AggregateData` column on the root table.
2. The serialized representation must serve as the primary data source for both read and write API requests, eliminating multi-join SQL batches.
3. The serialization format must use **MessagePack** with compression to minimize storage and network overhead.
4. Platform hosts performing direct ODS modifications (not through the API) must update the `LastModifiedDate` column and/or clear the `AggregateData` column on affected root tables to maintain data consistency.

### 9. Resource Links Feature

1. The API must support a configurable **resource links** feature (`resourceLinks`, enabled by default) that controls whether `link` objects are included in references in Data Management resource endpoint responses.
2. Disabling resource links must be a server-side optimization option for reducing database load.

### 10. Extensibility and Customization

1. The API must support extensions to the data model through source code modification or **dynamic extension plugins**.
2. Extensions must be deployable without recompiling the core ODS / API via a plugin folder mechanism.
3. The `extensions` feature flag must be configurable (enabled by default) to enable or disable extension endpoints.
4. The API must support **API Composite Resources** — configurable composite endpoints (e.g., Enrollments composite) that can be enabled or disabled via the `composites` feature flag.
5. The system must support **external connection configuration via plugin** (ODS-6120).
6. MetaEd IDE v4.7 must be used for implementing extensions in ODS / API v7.3.2.
7. The API must support a Discriminator field on `edfi.Descriptor` (ODS-5419).
8. Inheritance (derived resources) must correctly support criteria on inherited properties (ODS-6508).

### 11. Identities API

1. The API must expose an optional **Identity Management** feature (`identityManagement`, disabled by default) at the `/identity/v2/identities` endpoint.
2. The Identity API must support Create, Read, and Update operations.
3. The API must support optional **Unique ID Validation** (`uniqueIdValidation`, disabled by default) via a custom `IUniqueIdToIdValueMapper` implementation.
4. UniqueID validation must function correctly (ODS-6808 fix).

### 12. Administration and Configuration

1. The system must support both **single-tenant** and **multi-tenant** configurations.
2. In multi-tenant mode, each tenant must have its own `EdFi_Admin` and `EdFi_Security` databases; API clients must include the tenant identifier in route prefixes.
3. Multi-tenancy must be configurable via `FeatureManagement:MultiTenancy` in `appsettings.json`.
4. ODS connection strings must be configurable through an external secure parameter store as an alternative to `appsettings.json`.
5. The API must support **context-based routing** for year-specific ODS databases.
6. The API must support **read replica** ODS databases for high-availability deployments; GET requests must be routable to a replica via the `OdsInstanceDerivative` table with `DerivativeType = "ReadReplica"`.
7. The Sandbox Administration Portal must provide the ability to assign multiple education organizations and namespaces to vendor applications (ODS-6639).
8. API client key/secret pairs must be managed via the Admin API or directly in the Admin database.
9. An **Application Name** must be surfaced in the Discovery API (ODS-6696).
10. A configuration option must be available to exclude specific Domains from the OpenAPI specification (ODS-6662).
11. Domain information must be displayed in Swagger UI tag descriptions (ODS-6699).
12. The `.NET Feature Management` library must be used for API feature flags (ODS-4459).
13. `ODSStartup` and `SwaggerStartup` must be independently configurable (ODS-5622, ODS-5623).

### 13. Deployment and Distribution

1. The system must be deployable via:
   - **Binary packages** (NuGet/ZIP archives of compiled .NET assemblies and databases).
   - **Docker images** published to Docker Hub (supporting multi-platform images including ARM architecture).
   - **Source code** installation using Visual Studio project templates (VSIX).
2. Docker images for v7.3.2 must include the following tags:
   - `7` — latest 7.x patch with Data Standard 6.1
   - `7.3` — latest 7.3.x patch with Data Standard 6.1
   - `7.3.2` — specific release with Data Standard 6.1
   - `7.3.2-mssql` — specific release with SQL Server backend
   - `7-5.2.0`, `7-4.0.0` — latest 7.x with older Data Standards
3. The database deployment must use the **Database Deploy Tool** and support both SQL Server and PostgreSQL.
4. The system must support **integrated security** (Windows Authentication) for SQL Server connections (ODS-4936).
5. Non-production components (Swagger UI, Sandbox Administration Portal, `EdFi_ODS_*` template databases) must not be deployed to production.
6. **Central Package Management** must be adopted (ODS-6789).

### 14. Error Handling and Validation

1. Starting with v7.3, error responses must implement **Problem Details RFC 9457**, providing both machine-readable and user-friendly responses.
2. Token response codes and token matching in the token_info controller must be improved (ODS-6824 fix).
3. Required fields must be explicitly supplied; the API must not silently assign default values to nullable required fields.
4. The API must apply min/max validations when specified in the model.
5. Required embedded objects in resources must be enforced.
6. The API must return an error response (not silently ignore) when primary key value changes are submitted for a resource that does not allow key updates.
7. POST to a Descriptor must reject empty/whitespace-only values in required fields (ODS-6380 fix); a fallback option for whitespace validation must be configurable (ODS-6697).
8. The API must return appropriate error response for Student Delete abstract base entity scenarios (ODS-6723 fix).
9. Link fields must be updated correctly after reference updates (ODS-6725 fix).

### 15. Utilities and Tooling

1. The **Bulk Load Client Utility** must be available to load XML data in batch mode via the API.
2. The **Database Deploy Tool** must support packaging database scripts as NuGet packages (ODS-6552).
3. The **Smoke Test Utility** must be available for post-deployment validation.
4. The **Security Visualization Tool** must be available for visualizing security configuration.
5. The **Code Generation Utility** must be available to generate extension code and SDK artifacts.
6. **Postman integration tests** must be provided for API validation.

### 16. SDK and Code Generation

1. The API must expose OpenAPI metadata for client SDK code generation.
2. The API must support SDK generation via **Open API Generator**.
3. Multi-platform Docker images (including ARM architecture) must be published (ODS-6661).

---

## Non-Functional Requirements

### 1. Performance

1. The ODS / API must support a **Serialized Data** storage optimization that significantly reduces SQL query volume and join complexity for resource read/write operations by using a binary-serialized representation of each resource in the `AggregateData` column.
2. The API must support **cursor-based paging** (`improve-paging-performance-cursor-paging`) for improved data-out performance on large result sets (ODS-6513).
3. Batched page queries in NHibernate must use `AggregateId` instead of `Id` for page-level inclusion criteria (ODS-6512).
4. The API must eliminate unnecessary database round-trips for `ChangeVersion` after all upserts (ODS-6482).
5. Authorization view joins must be performed on base tables (not derived tables) to take advantage of database indexes (ODS-6546).
6. Clustered indexes must be removed from authorization views in SQL Server (ODS-6548).
7. Security metadata for `StudentContactAssociation` must eliminate unnecessary joins (ODS-6502, ODS-6543).
8. The system must support **read replicas** for ODS databases to distribute read load during high traffic.
9. The API must support **external cache providers** (e.g., Redis) for distributed caching in load-balanced deployments.
10. Redis cache initialization must handle more than 512k USI/UniqueID entries without failure (ODS-6612 fix).
11. In a load-balanced deployment, an external distributed cache must be used to prevent cache desynchronization across web server instances.
12. CPU-intensive operations (bulk loads) are expected to benefit from multi-core 64-bit server hardware with at least 16 GB RAM.
13. SSD storage is recommended for web and database servers for optimal I/O performance.

### 2. Security

1. All client-to-API communication must occur over **HTTPS** only.
2. OAuth secrets must be stored **hashed** in the database; the hashing algorithm must be configurable (ODS-6605 — updated hash algorithm in 7.3.1).
3. The API must enforce **token limits** per API client to prevent denial of service (ODS-6418).
4. The system must support **IP address verification** of incoming requests.
5. Client applications must have **least-privileged** database access.
6. Connection strings in configuration files must support encryption.
7. The `Persist Security Info` setting must be set to `false` in database connection strings.
8. The ODS database must not accept external connections directly.
9. **SQL Server Windows Authentication** (domain service accounts) must be preferred over SQL authentication.
10. The API must support rate throttling to prevent denial-of-service attacks.
11. The system must include a process for client application owners to refresh their key/secret pairs.
12. OAuth credential security must be addressed according to the guidance in the _Securing OAuth Secrets_ technical article.
13. A security fix for ASP.NET Core Runtime (CVE-2025-55315) must be applied (ODS-6741 — addressed in 7.3.1).

### 3. Scalability

1. The API must support **horizontal scaling** via load-balanced deployments with multiple identical web server instances.
2. The API must be stateless so that multiple ODS / API physical servers can be deployed behind a load balancer without session affinity.
3. ODS data must be segmentable into multiple databases (by year, district, API client, etc.) using implicit or explicit segmentation strategies.
4. The system must support **load balancers** as a first-class architectural component.
5. The system must support **Always On Availability Groups** (SQL Server) and read replicas (PostgreSQL) for database redundancy and scaling.
6. The architecture must support geographic redundancy (though specific configuration is beyond the scope of the default documentation).

### 4. Availability and Reliability

1. The API must support high-availability configurations including mirrored/replicated database servers.
2. The system must support **snapshot isolation** for change query processing to guarantee data consistency for downstream integrations.
3. The system must support **database snapshots** or backup-restore processes for refreshing change query snapshots.
4. The system must support an external distributed cache (e.g., Redis) to maintain cache consistency in clustered web server deployments.

### 5. Compatibility

1. ODS / API v7.3.2 must run on **.NET 10** (upgraded from .NET 8, which reaches end-of-support in November 2026) — ODS-6781.
2. The system must support both **SQL Server** and **PostgreSQL 16** (minimum) as database backends — ODS-6299.
3. The API must support multi-platform Docker images including **ARM architecture** (ODS-6661).
4. The API must be compatible with **Ed-Fi Data Standards 4.0, 5.2, and 6.1** simultaneously.
5. The system must remain compatible with existing Ed-Fi API client integrations; any breaking changes must be documented.
6. ODS / API v7.3.2 is the version required for use with the **Ed-Fi OneRoster Service**.

### 6. Maintainability

1. The system must adopt **Central Package Management** for .NET dependencies to simplify version management across projects (ODS-6789).
2. The system must replace `nuget.exe` usage with the `dotnet` CLI for NuGet operations (ODS-6623).
3. GitHub Actions workflow action dependencies must be kept up to date (ODS-6610).
4. The `TreatErrorsAsWarning` configuration key typo must be corrected (ODS-6540).
5. The system architecture must support **automated build and continuous integration** environments, as the codebase uses code generation that makes components an atomic package.
6. The extensive unit and integration test suite must be maintained and runnable (total run time: up to one hour).
7. The system must support **PowerShell-based deployment scripts** and configurable deployment via `configuration.json`.
8. Extension projects must generate full change query support (ChangeVersion column, triggers, delete tracking tables) automatically via MetaEd tooling.

### 7. Extensibility / Customizability

1. The ODS / API must be **open source** and support extension of built-in security models.
2. Feature flags must be configurable via `appsettings.json` without code changes for supported features.
3. The API must support custom features via a service registration mechanism using Autofac modules (ConditionalModule).
4. The API must support customization of processing pipelines, caching mechanisms, and data repositories through Autofac modules.
5. The system must support external connection configuration for ODS connection strings via a plugin (ODS-6120).

### 8. Observability and Logging

1. The API must support configurable logging settings.
2. Exception logging must be suppressed for expected token authentication failures (e.g., token expiration) — ODS-6700.
3. Error messaging in `GetPackedHash` must be improved when input is not Base64-encoded (ODS-6685).
4. Deserialization failures for the Serialized Data feature must be handled gracefully (ODS-6632 — patch1).

### 9. Deployment Flexibility

1. The system must support **on-premises** deployments (single server, two-server, load-balanced).
2. The system must support **cloud-based** deployments (IaaS, managed services).
3. The system must support **Docker container** deployments via published Docker Hub images.
4. The system must support the **non-default PostgreSQL user** in PostgreSQL Docker images (ODS-6465).
5. Production deployments must not include sandbox-only components (Swagger UI, Sandbox Administration Portal, template ODS databases).
6. The system must support **Windows domain service accounts** for inter-service authentication to avoid storing credentials in configuration files.

---

## Notes

- **Version scope**: This document covers requirements specifically for **ODS / API v7.3.2**, the current (as of the repository snapshot) release. Some requirements originate from the broader v7.3.x baseline (v7.3.0 and v7.3.1) and remain applicable, as v7.3.2 is the cumulative patch release.
- **Jira ticket references**: Ticket numbers (e.g., ODS-6781) are from the internal Jira project, visible only to the Ed-Fi development team. The corresponding code changes can be located in the Git commit history using the ticket number.
- **Breaking changes from v7.x**: Several breaking changes affect API clients upgrading from earlier major versions:
  - The `ChangeQueries/v1/snapshots` endpoint has been removed; snapshot intent is now communicated via the `Use-Snapshot` HTTP header.
  - Error responses have been updated to Problem Details RFC 9457 format — API clients parsing legacy error response structures may require updates.
  - Required fields must now be explicitly supplied (no silent default value assignment).
  - Primary key change attempts on non-key-updatable resources now result in an error response rather than being silently ignored.
  - Route patterns may differ depending on whether `SchoolYear` segments or tenant/context prefixes are present.
- **OneRoster deployment**: The OneRoster service is a separate deployment and is not bundled with the core ODS / API package. Its source code and Docker image are published separately at [edfi-oneroster](https://github.com/Ed-Fi-Alliance-OSS/edfi-oneroster).
- **Serialized Data direct ODS modifications**: If ODS data is modified directly (not via the API), platform hosts must update `LastModifiedDate` and optionally clear `AggregateData` on the affected root table to prevent stale data from being served by the API. This is a critical operational consideration for implementers who perform ETL or bulk data loads directly to the ODS database.
- **Supported version window**: ODS / API v7.3.x is active through the **2028–2029 school year**. ODS / API v7.2.x is inactive and users are advised to upgrade.
- **MetaEd dependency**: Implementing extensions for ODS / API v7.3.2 requires **MetaEd IDE v4.7**.
- **Admin API**: Security configuration management (claim sets, profiles, vendor/application keys) is performed via the **Admin API**, released separately. References to "ODS Admin App" in older documentation refer to a legacy component; Ed-Fi Admin App v4.0+ is its replacement.
- **Ambiguity — token expiry default**: The authentication documentation states a default token expiry of 1800 seconds (30 minutes); it is unclear whether this is configurable per-client or globally. Clarification may be needed.
- **Ambiguity — snapshot refresh frequency**: Documentation recommends periodic snapshot refresh but does not specify a minimum or recommended refresh interval. Implementers must define this based on their operational requirements.
