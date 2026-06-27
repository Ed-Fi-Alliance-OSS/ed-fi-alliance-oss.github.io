---
description: Detailed description of new features in Ed-Fi API v8.0.
sidebar_position: 2
---

# What's New In This Release

This section provides an overview of the new features in Ed-Fi API v8.0,
targeted for deployment beginning with the 2027–2028 school year. A
comprehensive list of all changes is available in the [Release
Notes](./release-notes.md) section.

Ed-Fi API v8.0 is a new platform, not an incremental update to the ODS/API. It
replaces the Ed-Fi ODS/API and Ed-Fi Admin API with two new services:

- **Data Management Service (DMS)** — implements the Ed-Fi Resources,
  Descriptors, and Discovery API specifications
- **Configuration Service** — implements the Ed-Fi Management API specification
  v3, replacing the Admin API

Ed-Fi API v8.0 is **API-compatible with the ODS/API**: client applications built
against the ODS/API REST interface continue to work without changes, with one
important exception — property names in request bodies are now
**case-sensitive**. See the [Breaking
Changes](./release-notes.md#ed-fi-api-v80---breaking-changes-from-odsapi)
section of the Release Notes for a full migration checklist.

## Improvements & Enhancements

### Relational Storage Model

Ed-Fi API v8.0 introduces a new relational tables-per-resource storage model.
Each Ed-Fi resource is stored in its own set of dedicated relational tables
(e.g., `edfi_School`, `edfi_Student`) in PostgreSQL or SQL Server. Unlike the
ODS/API's deeply normalized, inheritance-based schema, v8 uses a flat
tables-per-resource model with a different schema structure.

The new storage model enables direct SQL access to resource data with
predictable, normalized table structures. Existing SQL-based reporting and
analytics queries written against ODS/API database tables will require rewriting
to accommodate the new schema structure. See [Relational Data
Model](../technical-articles/relational-data-model.md) for the new schema.

The `dms-schema` CLI tool manages database provisioning — creating tables,
indexes, triggers, and authorization structures for a given API schema version.
See [Database
Provisioning](../platform-dev-guide/deployment/database-provisioning.md) for
details.

### Built-In Multi-Tenancy

Multi-tenancy is a first-class feature in Ed-Fi API v8.0. The Configuration
Service manages data stores (tenant database connections, encrypted at rest),
and tenant context is extracted directly from the URL route. Multiple tenants
can share a single deployment, with complete data isolation enforced at the
database level.

Context-based routing — by school year, district ID, or any combination of route
qualifier segments — is also built in and configured through the Configuration
Service. See [Multi-Tenancy](../platform-dev-guide/multi-tenancy/readme.md) for
configuration details.

### Configuration Service Replaces Admin API

The Ed-Fi Admin API is replaced by the **Configuration Service**, which
implements the [Ed-Fi Management API specification
v3](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-API-Specifications/tree/main/api-specifications/management).
All platform administration — managing vendors, applications, API client
credentials, claim sets, and data stores — is performed through the
Configuration Service API.

The Configuration Service uses the same database engine (PostgreSQL or SQL
Server) as the DMS and runs as a separate containerized service.

### Self-Contained Identity Provider

Ed-Fi API v8.0 includes a built-in [OpenIddict](https://openiddict.com/)-based
identity provider hosted inside the Configuration Service. No external identity
server is required for a standard deployment. The token endpoint is served at
`/connect/token` on the Configuration Service.

For environments that require enterprise identity management or single sign-on,
Keycloak remains supported as an alternative identity provider. See [Identity
Provider
Configuration](../platform-dev-guide/configuration/identity-provider.md) for
details.

### Docker-Based Deployment

Ed-Fi API v8.0 is distributed as Docker images and deployed using Docker
Compose. The DMS repository includes startup scripts and a reference
`docker-compose.yml` that bring up DMS, Configuration Service, and a PostgreSQL
database with a single command.

There is no binary installer or Windows Service at this time. See [Getting
Started](../getting-started/readme.md) for deployment instructions.

### Profile Support

Profiles (both readable and writable) are supported in Ed-Fi API v8.0. Profiles
allow implementers to define data policies that restrict the resources and
properties visible to a specific API client type. Profiles are authored in the
Configuration Service and applied to applications via claim sets.

### Changed Record Query Support

The changed record query endpoints (`/availableChangeVersions`, `/deletes`,
`/keyChanges`) are supported in Ed-Fi API v8.0. These endpoints allow API
clients to efficiently retrieve only records that have changed since their last
synchronization.
