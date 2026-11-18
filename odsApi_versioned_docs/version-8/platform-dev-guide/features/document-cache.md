# DocumentCache

:::note

Full documentation for the DocumentCache is expected by December 15, 2026.

:::

The DocumentCache is an optional feature in Ed-Fi API v8.1. For each data store
it's turned on for, it keeps a ready-made JSON copy of every resource in the
`dms.DocumentCache` table, so the Ed-Fi API can answer `GET` requests without
rebuilding each resource from the relational tables. The response is the same
either way.

[Event Streaming with Kafka](./event-streaming-kafka-cdc.md) depends on the
DocumentCache.
