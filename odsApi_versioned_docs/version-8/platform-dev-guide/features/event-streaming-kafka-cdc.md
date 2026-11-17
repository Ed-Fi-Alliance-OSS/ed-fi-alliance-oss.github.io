# Event Streaming with Kafka

:::note

Full documentation for event streaming with Kafka is expected by December 15,
2026.

:::

Ed-Fi API v8 can stream resource data to Apache Kafka. Change data capture
reads changes from the [DocumentCache](./document-cache.md) tables, and each data
store gets one Kafka topic that holds the latest state of each resource. The
topic isn't a log of every change: a consumer gets each resource's current
version, and a deleted resource appears as a tombstone.

Event streaming requires the DocumentCache.

## Setup

Follow the Kafka setup workflow before creating the data store database. It
creates a new database, records the required setup history, and activates
DocumentCache before writes begin. A database provisioned with
`source-history-only`, or with DocumentCache activated independently, cannot be
used for initial Kafka setup; use a new database created by the Kafka workflow.

For local deployments, use the release-specific procedures:

- [PostgreSQL local setup](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/cdc-documentation/operations-runbook.md#postgresql-setup)
- [SQL Server local setup](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/cdc-documentation/operations-runbook.md#sql-server-setup)
