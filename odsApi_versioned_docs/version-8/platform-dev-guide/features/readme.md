---
---

# Features

This section contains reference documentation for the built-in features of the
Ed-Fi API.

| Feature | Description | How it's enabled |
| --- | --- | --- |
| Changed record queries | The [Changed Record Queries](./changed-record-queries.md) feature tracks inserts, updates, and deletes on resources. See also [Using the Changed Record Queries](../../client-developers-guide/using-the-changed-record-queries.md). | Always available. |
| Change query snapshots | Serves change query reads from a point-in-time copy of the data store, so a client sees a stable view while it syncs. See [Changed Record Queries with Snapshot Isolation](./changed-record-queries.md#changed-record-queries-with-snapshot-isolation). | Register a `Snapshot` data store derivative in the Configuration Service. Clients send the `Use-Snapshot: true` header. |
| Read replicas | Sends read requests to a read-only replica of the data store's database. See [Read Replicas](./read-replicas.md). | Register a `ReadReplica` data store derivative in the Configuration Service. |
| OpenAPI metadata | The OpenAPI metadata endpoints used by the Swagger UI. | Always available. Exclude specific domains with the `AppSettings:DomainsExcludedFromOpenApi` setting. |
| Profiles | The [Profiles](../security/api-profiles.md) feature constrains API client access to specific resource properties for read and/or write operations. | Always available. Create profiles and assign them to applications in the Configuration Service. |
| Extensions | API endpoints for [Extensions](../extensibility-customization/extending-api-datamodel.md) loaded from the schema directory. | Stage the extension schema and a [schema workspace manifest](../extensibility-customization/extending-api-datamodel.md#the-schema-workspace-manifest) in the `AppSettings:ApiSchema:Path` directory, set `AppSettings:ApiSchema:UseCustomPath` to `true`, and provision the database. |
| Token info | The OAuth [token\_info](https://tools.ietf.org/html/rfc7662#section-2) introspection endpoint, which provides security configuration information for a token. See [Token Info](./../../client-developers-guide/authorization.md#token-info) for details. | Always available. |
| Resource links | Adds a `link` object to each resolved reference in a response. | On by default. Set `DataManagement:ResourceLinks:Enabled` to `false` to turn it off. |
| DocumentCache | Stores ready-to-serve copies of resources to speed up reads. See [DocumentCache](./document-cache.md). | List the data stores to cache in `DataManagement:DocumentCache:Targets`. Set `DataManagement:DocumentCache:ReadAcceleration:Enabled` to `true` to serve reads from the cache. |
| Event streaming | Publishes data changes to Kafka through change data capture (CDC). See [Event Streaming with Kafka](./event-streaming-kafka-cdc.md). | Configure a DocumentCache target for the data store, then enable change data capture with the `api-schema-tools cdc` commands. |
| Identity management | The `/identity/v2/identities` API, backed by an identity plugin. See [Plugins](../extensibility-customization/plugins.md). | Set `DataManagement:IdentityManagement:Enabled` to `true` and install an identity plugin. |
| Plugins | Code extensions, such as [Unique ID validation](../../technical-articles/unique-id-system-integration.md) against an external identity system, loaded at startup. See [Plugins](../extensibility-customization/plugins.md). | List each plugin's directory name in `Plugins:Allowed`. |

## Contents

- [Changed Record Queries](./changed-record-queries.md)
- [Read Replicas](./read-replicas.md)
- [DocumentCache](./document-cache.md)
- [Event Streaming with Kafka](./event-streaming-kafka-cdc.md)
