---
description: New features, notable changes, and known limitations in Ed-Fi API v8.0, including Change Queries deferred features.
sidebar_position: 1
---

# What's New In This Release

:::warning Upcoming Release

Ed-Fi API v8 is under active development and is not yet available for production
use. This page is being expanded as the release approaches.

:::

This page describes notable changes and known limitations in Ed-Fi API v8.0, the
next-generation platform previously known as the Ed-Fi Data Management Service
(DMS). Additional release content will be added as the release approaches.

## Change Queries — deferred features in DMS v1.0

Change Queries are available in DMS v1.0 (Ed-Fi API v8.0), including the
`/deletes`, `/keyChanges`, and `/availableChangeVersions` endpoints and the
`minChangeVersion`/`maxChangeVersion` filters on live resource and descriptor
GET-many endpoints. Several ODS capabilities are deferred in this release; do not
assume full ODS parity in the following areas:

- **Snapshot / read-replica isolation is not supported.** The `Use-Snapshot`
  request header is not part of the DMS v1.0 Change Queries contract. DMS v1.0
  silently ignores `Use-Snapshot` on `/deletes`, `/keyChanges`,
  `/availableChangeVersions`, and live resource/descriptor GET-many requests: the
  request is processed against current data without snapshot isolation, no
  `Warning` header is returned, and no snapshot-specific error is emitted.
- **Ed-Fi API Publisher guidance.** The Ed-Fi API Publisher sends
  `Use-Snapshot: true` by default when its source API major version is 7 or
  higher. Because DMS v1.0 silently ignores the header, reads from a DMS v1.0
  source are not snapshot-isolated — concurrent writes against the source may be
  visible mid-publish and can produce inconsistent published data. When publishing
  from a DMS v1.0 source, run the Publisher with `--ignoreIsolation=true` to
  explicitly acknowledge that source isolation is unavailable (or accept the risk
  of inconsistent reads).
- **No option to disable Change Queries.** Change Queries are always on in DMS
  v1.0. DMS v1.0 does not provide the ODS-style `ApiSettings:Features:ChangeQueries`
  disable setting, and the corresponding `Feature Disabled` response is not part of
  the v1.0 contract.
- **Custom view-based `ReadChanges` authorization is not supported.** Custom
  view-based authorization strategies are not supported for the `/deletes` and
  `/keyChanges` Change Query endpoints in DMS v1.0. Other Change Query
  authorization strategies are supported, but Change Query authorization should not
  be assumed to be at full ODS parity.

Snapshot/read-replica support, a runtime option to disable Change Queries, and
custom view-based `ReadChanges` authorization are planned for a later release
(targeted for Ed-Fi API v8.1).
