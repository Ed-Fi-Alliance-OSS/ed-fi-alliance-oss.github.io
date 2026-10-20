---
description: Detailed description of new features in Ed-Fi API v8.1.
sidebar_position: 1
---

# What's New In This Release

This section provides an overview of the new features in Ed-Fi API v8.1. Many
of them restore capabilities that platform hosts relied on in the Ed-Fi ODS/API
and that were not available in Ed-Fi API v8.0. A comprehensive list of all
changes, including the breaking changes to review when moving from the Ed-Fi
ODS/API, is available in the [Release Notes](./release-notes.md) section.

## Improvements & Enhancements

This section highlights the new features and improvements introduced in Ed-Fi
API v8.1 and provides links to additional documentation.

### Data Standard Support

Ed-Fi API v8.1 supports [Ed-Fi Data Standard v5.2 and
v6.1](/reference/data-exchange/data-standard/) on both PostgreSQL and SQL
Server. Minimal and populated database templates are now published for SQL
Server as well as PostgreSQL. See [Package
Releases](../getting-started/package-releases.md) for the available packages.

### Performance and Scale

#### Partitioned Cursor Paging

Clients can now page through large resource collections with an opaque page
token instead of `offset` and `limit`. Each response returns a
`Next-Page-Token` header that the client sends back as the `pageToken`
parameter, and performance doesn't degrade as the client pages deeper into the
collection. To read a collection in parallel, a client can first ask the
`partitions` endpoint to split it into ranges and then page through each range
independently. See [Improve Paging Performance with Cursor
Paging](../client-developers-guide/improve-paging-performance-cursor-paging.md)
for details.

#### Read Replicas

Platform hosts can register a read-only replica of a data store, kept current
by their database platform's own replication, to take read traffic off the
primary database. The Ed-Fi API routes eligible read requests to the replica
automatically. API clients don't need to change anything. See [Read
Replicas](../platform-dev-guide/features/read-replicas.md) for details.

#### DocumentCache

Platform hosts can turn on the DocumentCache, which stores a serialized copy of
each resource so the Ed-Fi API can serve reads without reassembling them from
the relational tables. If a cached copy is missing or out of date, the Ed-Fi
API falls back to the relational tables, so responses are unchanged. The
DocumentCache is off by default, is enabled per data store, and includes a
command-line tool for administration. See
[DocumentCache](../platform-dev-guide/features/document-cache.md) for details.

### Data Integration

#### Changed Record Queries with Snapshot Isolation

Platform hosts can now register a point-in-time snapshot of a data store, and
API clients can read from it by sending the `Use-Snapshot: true` header. A
snapshot gives a client a stable view of the data for a whole synchronization
run, unaffected by writes made while it runs. If the host hasn't configured a
snapshot, the request fails with a `404` response rather than silently reading
live data. Hosts create and refresh snapshots themselves. See [Changed Record
Queries](../platform-dev-guide/features/changed-record-queries.md) for details.

#### Event Streaming with Kafka

Ed-Fi API v8.1 can publish every change to resource data as an event on Apache
Kafka, so downstream systems can react to changes without polling the API.
Changes are captured from the database with Debezium, on both PostgreSQL and
SQL Server. Each event carries the complete resource as plain JSON, and a
deleted resource appears as a tombstone event. Streaming is off by default and
requires the DocumentCache. See [Event Streaming with
Kafka](../platform-dev-guide/features/event-streaming-kafka-cdc.md) for
details.

### Security and Access Control

#### Ownership-Based Authorization

Ownership-based authorization lets platform hosts limit a client's access to
the records it created. The Ed-Fi API now stores, with each record, the
ownership token of the client that created it. Hosts create ownership tokens,
assign them to API clients, and select the `OwnershipBased` authorization
strategy on the claim sets where it should apply. A client can hold more than
one token, so records can move to a replacement vendor without changing the
data. Unlike the Ed-Fi ODS/API, there is no feature flag to turn on. See
[Ownership-Based
Authorization](../platform-dev-guide/security/ownership-based-authorization.md)
for details.

#### Custom View-Based Authorization

Platform hosts can define their own authorization rules, such as "only students
enrolled in CTE courses," by creating a database view and naming it as an
authorization strategy on a claim set. When more than one custom rule applies
to a request, all of them must pass. Custom rules also apply to the `/deletes`
and `/keyChanges` change query endpoints. See [How To: Use Custom View-Based
Authorization](../how-to-guides/how-to-use-custom-view-based-authorization.md)
for details.

#### Access Token Management

The self-contained identity provider now limits each API client to 15 active
access tokens by default, so clients should reuse a token until it expires.
Expired tokens are cleaned up automatically. See [Identity Provider
Configuration](../platform-dev-guide/configuration/identity-provider.md) for
details.

### Extensibility

#### Plugins

Ed-Fi API v8.1 introduces a supported plugin model for adding host-specific code
without changing the platform's source code. A plugin is a .NET assembly built
against a published contract package and loaded at startup. Plugins are off by
default: a host must place the assembly in the plugins directory and allow it
by name. The contract packages are `EdFi.Api.Plugins`,
`EdFi.Api.CustomValidation`, `EdFi.Api.Identity`, and `EdFi.Api.Secrets`. See
[Plugins](../platform-dev-guide/extensibility-customization/plugins.md) for
details.

#### Custom Validation

Platform hosts and vendors can enforce their own business rules on create and
update requests by writing a custom validator plugin. A failed custom
validation returns a `400` response in the same format as the platform's
built-in validation errors. Without any custom validators, requests behave
exactly as before. See [Custom
Validation](../platform-dev-guide/extensibility-customization/custom-validation.md)
for details.

#### Unique ID Validation

Platform hosts that use an external unique ID system can check that a supplied
unique ID exists before a person record is created. Ed-Fi API v8.1 doesn't ship
this check as a built-in feature; instead, the documentation shows how to build
it as a custom validator plugin, with a sample to start from. See [Unique ID
System Integration](../technical-articles/unique-id-system-integration.md) for
details.

#### Identities API

The Identities API lets clients create, look up, and search for person
identities through `/identity/v2/identities`. It is off by default. The Ed-Fi
API provides the endpoints, and the host supplies the identity system
integration as a plugin. See [Identities API](../technical-articles/identities-api.md)
for details.

#### Secrets in Connection Strings

Values in a data store connection string, such as the password, user name, or
host, can now refer to secrets in an external secret manager, for example
`Password=${secret:prod/dms/ds-2026}`. The connection string itself is still
stored in the Configuration Service, which resolves each reference through a
secrets plugin supplied by the host. Unlike the Ed-Fi ODS/API, the whole data
store connection string can't be supplied from an external configuration
source. A configuration source plugin can supply the Configuration Service's
own database connection string and keys. See [Secrets in Connection
Strings](../platform-dev-guide/configuration/secrets-in-connection-strings.md)
for details.

### MetaEd IDE v4.9

Implementing extensions in Ed-Fi API v8.1 requires implementers to update to
[MetaEd IDE v4.9](/reference/metaed) or higher. Refer to [MetaEd 4.9 What's
New](/reference/metaed/releases/) for details on latest updates and
improvements.
