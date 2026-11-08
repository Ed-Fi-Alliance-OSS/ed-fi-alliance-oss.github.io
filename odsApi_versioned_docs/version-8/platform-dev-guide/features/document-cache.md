# DocumentCache

DocumentCache is an optional feature in Ed-Fi API v8.1. It keeps serialized
resource and descriptor JSON in each data store's `dms.DocumentCache` table.
API instances using that database share the cache, and restarting an instance
does not clear it. For read-heavy workloads, cached bodies can avoid rebuilding
resources from relational tables while preserving the same API response.

An asynchronous _projector_ processes durable work recorded with canonical
writes and refreshes the cached JSON. Plan for additional database storage for
JSON bodies, indexes, and queued projection work alongside the relational data.
DocumentCache is also a prerequisite for
[Event Streaming with Kafka](./event-streaming-kafka-cdc.md); projection alone
does not configure connectors or prove downstream delivery.

## How It Is Enabled

These are separate steps:

| Step | Effect |
| --- | --- |
| Provision the database | Creates the fixed cache, lifecycle, and work tables even when the feature is unused. |
| Activate the cache | Uses an administration workflow to populate the cache and enable ongoing work recording and processing. |
| Configure `DataManagement:DocumentCache:Targets` | Selects tenant/data-store pairs for the runtime projector. The default empty list leaves it idle. |
| Set `DataManagement:DocumentCache:ReadAcceleration:Enabled` to `true` | Allows eligible reads to use the cache for configured targets. The default is `false`. |

Removing a target pauses its runtime projection; it does not deactivate the
cache or stop the database from recording work. Use the supported
[administration commands](../utilities/document-cache-admin-cli.md#commands)
for lifecycle changes.

## Read Behavior

Read acceleration applies to external resource and descriptor GET-by-id and
GET-many requests on the primary database whose tenant/data-store pair matches
a configured target. Snapshot and read-replica requests bypass cached reads
and direct fill, using their selected database's relational data.
Authorization, filtering, ordering, paging, and response shaping still apply.
Only fresh, version-equal cache rows in an eligible lifecycle can be used.

The relational path remains the correctness path. Missing or stale rows,
lifecycle fences, ineligible targets, and expected cache-read availability
failures fall back to relational reconstruction. A projection backlog alone
does not make every cache row unusable: fresh rows can still serve reads in
`tracking` with a clear cache-ahead latch.

After successful relational fallback, the API may attempt a best-effort
_direct fill_ using the shared materializer and cache writer. It does not cache
the already shaped response or replace the response selected by fallback.
`ReadAcceleration:DirectFillTimeout` bounds this attempt (250 milliseconds by
default); a direct-fill failure leaves the relational response intact. Direct
fill is skipped for snapshot and read-replica requests because those database
targets are read-only for this purpose.

## Configure and Activate a Target

These examples use v8.1.0, PostgreSQL, data store `1`, and the default tenant.
Replace the ID with the Configuration Service data store ID. For a named tenant,
set `TenantKey` and add `--tenant-key district-a` to every command. For SQL Server,
use `--datastore sqlserver` and satisfy its additional prerequisites below.

### Prerequisites

- Provision and register the target database, and install the
  [DocumentCache Administration CLI](../utilities/document-cache-admin-cli.md#installation).
- Prepare complete API settings in `appsettings.Production.json`, including
  Configuration Service access, the matching database provider, and the same
  effective API schema as the deployment. The snippets below are additions to
  those settings, not standalone configurations. Supply credentials through
  protected configuration or environment variables.
- Use an operator identity with database access for status and the selected
  administrative workflow. The CLI provider must match the deployed API,
  Configuration Service database platform, and data store's provider metadata.
- On SQL Server, enable database Read Committed Snapshot Isolation (RCSI) and
  server-level `nested triggers` before activation. See the
  [SQL Server prerequisite procedure](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#sql-server-prerequisite-failure-correction).
  Changing these settings while the cache is active is outside the supported
  recovery contract.
- Close write admission and drain in-flight writers before either activation
  example. For an existing store, also establish the trusted history described
  below. A confirmation flag acknowledges an operator-established fence; it
  does not stop writers.

### Select the Target

Merge this fragment into the complete settings used by the API and CLI. Keep
read acceleration off during setup, then restart API instances to apply their
configuration.

```json
{
  "DataManagement": {
    "DocumentCache": {
      "Targets": [
        { "TenantKey": "", "DataStoreId": 1 }
      ],
      "ReadAcceleration": { "Enabled": false }
    }
  }
}
```

### Activate a New Empty Store

Use this path only for a newly provisioned database _before its first canonical
write_, with writers closed and drained. Inspect the target, then activate it:

```bash
dms-document-cache status --data-store-id 1 --settings ./appsettings.Production.json --environment Production --datastore postgresql --json
dms-document-cache activate-new-empty --data-store-id 1 --confirm newEmptyActivation --settings ./appsettings.Production.json --environment Production --datastore postgresql --json
```

### Activate an Existing Store

The existing store must be `disabled`. Before running the command, configure
[`Cdc:PublicationHistory`](../utilities/document-cache-admin-cli.md#offline-administration-history)
with the original managed provisioning state and deployment key. Trusted
history must prove `internalOnly` for this target and physical source; missing
or unknown history rejects activation. This requirement applies even if Kafka
is not enabled. An empty state directory is not sufficient.

Follow the runbook's
[activation procedure](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#activation)
and keep writers closed and drained, then run:

```bash
dms-document-cache activate-offline --data-store-id 1 --confirm offlineActivation --offline-writer-admission closedAndDrained --settings ./appsettings.Production.json --environment Production --datastore postgresql --json
```

### Verify and Enable Reads

Accepted activation revalidates prerequisites, clears residual cache/work
through the supported workflow, seeds and drains baseline work, and enters
`tracking`. Check command results before proceeding. Exit code `12` means
incomplete: retry the same command with the same target and guard values.

```bash
dms-document-cache status --data-store-id 1 --settings ./appsettings.Production.json --environment Production --datastore postgresql --json
```

In the CLI result, verify `lifecycle.state` is `tracking` and `cacheAhead.state`
is `clear`. Standalone CLI status does not observe the running projector, so
`operationalHealth` and `caughtUp` report `unknown` with reason
`runtimeNotObserved` even when the durable state is healthy. Do not wait for
those CLI fields to become healthy.

Configure the [HTTP status endpoint](#http-status-endpoint), then restore the
API/projector runtime while keeping external write admission closed. Call
`GET /health/document-cache` with an authorized bearer token and select the
target matching the tenant key and data store ID. Verify
`operationalHealth.status` is `operational` and, once the queue has drained,
`caughtUp.status` is `caughtUp`.

To enable accelerated reads, set
`DataManagement:DocumentCache:ReadAcceleration:Enabled` to `true` in the API
settings and restart the API instances to apply it. Recheck runtime health
after the restart, and reopen write admission after the activation procedure
is complete. Projection can also run with read acceleration left off, for
example to support CDC.

See [Configuration Details](../configuration/configuration-details.mdx#documentcache)
for all settings and environment variable names, or the
[optional Docker configuration](../../getting-started/getting-started-appendix.md#optional-documentcache)
for the local Compose overlay.

## Interpret Status

The CLI and `GET /health/document-cache` expose the same projection status
contract. Check target resolution, eligibility, inventory, and provider
prerequisites as well as lifecycle and queue status.

The standalone CLI observes durable database state, but does not observe the
running projector. Its `operationalHealth` and `caughtUp` fields therefore
report `unknown` with reason `runtimeNotObserved` when durable observation
succeeds. Use the live HTTP endpoint to verify runtime health and caught-up
status.

| `lifecycle.state` | Meaning and action |
| --- | --- |
| `disabled` | Enqueue, projection writes, acknowledgements, and cached reads are disabled. The canonical API remains available. Activate through the CLI when ready. |
| `resetting` | Administrative clearing is running or was interrupted. Enqueue remains enabled; cache writes and acknowledgements are fenced. Reissue the known interrupted command; do not infer a recovery command from this state alone. |
| `rebuilding` | Baseline seeding/draining is in progress. Cached reads and caught-up success are fenced. Let the active workflow finish or reissue the known interrupted command. |
| `tracking` | Ordinary projection is enabled. Cached reads still need a clear cache-ahead latch and version-equal rows. |
| `invalid` | Durable lifecycle state is missing or invalid. Inspect inventory and diagnostics and follow the runbook before claiming health. |
| `unknown` | Lifecycle could not be observed. Resolve target or observation failures before drawing conclusions. |

`operationalHealth` describes whether projection can process ordinary work.
`caughtUp` is a separate observation: one provider statement saw `tracking`, a
clear latch, and an empty `dms.DocumentProjectionWork` queue. It is not proof of
Kafka delivery or an integrity scan. New writes can enqueue work immediately
after that observation.

Projection status is distinct from ordinary API health. A processing backlog
or projector failure does not remove an otherwise healthy API instance from
canonical routing. However, failure to persist projection work during a
canonical write rolls back the whole write; broken enqueue inventory is an API
availability incident, not just lag.

### HTTP Status Endpoint

The status endpoint is unmapped by default. Configure
`DataManagement:DocumentCache:Status:RequiredRole` with a valid single role
(such as `dms-client`) and restart the API. Callers must present a valid bearer
token carrying that role under `JwtAuthentication:RoleClaimType`. Missing or
invalid authentication returns `401`; an authenticated caller without the role
gets `403`. An empty or invalid configured role leaves the endpoint unmapped.
See the [configuration constraints](../configuration/configuration-details.mdx#documentcache).

## Maintenance and Recovery

Use the v8.1.0 operational procedures rather than editing cache, work, lifecycle,
or latch tables directly:

- [Explicit integrity scrub](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#explicit-integrity-scrub)
  checks source/cache/work relationships.
- [Cache-ahead recovery](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#cache-ahead-recovery)
  requires trusted internal-only history; possible or unknown publication
  requires the CDC containment procedure.
- [Persistent failures and poison remediation](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#persistent-projection-failure-and-poison-remediation)
  covers work that will not drain.
- [Suspected restore or direct mutation](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#suspected-restore-or-direct-mutation)
  requires an admitted scrub before relying on caught-up status.
- [Kafka/CDC operations](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/cdc-documentation/operations-runbook.md)
  owns connector setup and downstream publication handling.
