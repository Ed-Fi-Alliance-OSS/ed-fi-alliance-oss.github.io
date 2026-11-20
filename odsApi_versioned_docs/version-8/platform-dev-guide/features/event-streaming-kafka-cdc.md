# Event Streaming with Kafka

Ed-Fi API v8 can stream resource data to Apache Kafka. Change data capture
reads changes from the [DocumentCache](./document-cache.md) tables, and each data
store gets one Kafka topic that holds the latest state of each resource. The
topic isn't a log of every change: a consumer gets each resource's current
version, and a deleted resource appears as a tombstone.

## Setup

If you plan to stream data, choose the Kafka setup workflow before creating
the database. It records the required history and activates DocumentCache
before writes begin. Initial Kafka setup requires a new database created by
that workflow. A database created with `source-history-only` or activated
independently is ineligible.

Setup instructions will be part of the full Kafka documentation expected by
December 15, 2026.
