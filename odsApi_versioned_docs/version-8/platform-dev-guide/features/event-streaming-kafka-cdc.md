# Event Streaming with Kafka

:::note

Full documentation for event streaming with Kafka is expected by December 15,
2026.

:::

Ed-Fi API v8.1 can stream resource data to Apache Kafka. Change data capture
reads changes from the [DocumentCache](./document-cache.md) tables, and each data
store gets one Kafka topic that holds the latest state of each resource. The
topic isn't a log of every change: a consumer gets each resource's current
version, and a deleted resource appears as a tombstone.

Event streaming requires the DocumentCache.
