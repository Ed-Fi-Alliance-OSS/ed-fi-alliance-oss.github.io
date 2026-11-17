# DocumentCache

DocumentCache is an optional feature in Ed-Fi API v8. It keeps serialized
resource and descriptor JSON in each data store's `dms.DocumentCache` table.
API instances using that database share the cache, and restarting an instance
does not clear it. For read-heavy workloads, cached bodies can avoid rebuilding
resources from relational tables while preserving the same API response.

An asynchronous background worker, the _projector_, refreshes the cached JSON.
While the cache is active, writes to the relational resource and descriptor
tables also save work in a database queue, in the same transaction. The
projector processes that queue. Plan for additional database storage for JSON
bodies, indexes, and queued work alongside the relational data.
DocumentCache is also a prerequisite for
[Event Streaming with Kafka](./event-streaming-kafka-cdc.md); projection alone
does not configure connectors or prove downstream delivery.

If you plan to stream data to Kafka, follow the
[Kafka setup workflow](./event-streaming-kafka-cdc.md#setup) before creating the
database. That workflow creates a new database and activates DocumentCache
before writes begin. Activating DocumentCache independently does not prepare a
database for initial Kafka setup.

:::warning Existing databases require original provisioning history

Activating DocumentCache on an existing database requires the original history
recorded by [managed provisioning](../utilities/database-provisioning.md#managed-provisioning-for-documentcache).
If the database was provisioned without that history, `activate-offline` cannot
activate its cache. Rerunning provisioning with managed options cannot create
the missing evidence retroactively, even if Kafka has never been enabled.

For a store without this history, provision a new database, follow
[Activate a New Empty Store](#activate-a-new-empty-store) before its first
resource or descriptor write, then reload the data after activation and
verification. Choose managed provisioning when creating new databases to retain
the history needed for later offline cache administration.

:::

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
Only cache rows whose content version matches the relational source can be
used, and only when the cache's lifecycle state allows reads.

The API falls back to rebuilding the response from relational data when cache
rows are missing or stale, the lifecycle blocks cached reads, the target is
ineligible, or an expected cache-read availability failure occurs. A projection
backlog alone does not make every cache row unusable: fresh rows can still serve
reads in `tracking` when `cacheAhead.state` is `clear`.

The _cache-ahead flag_ is stored in the database. It records that a cached
content version was observed to be higher than the version in the relational
source, for example after a database restore. Status then reports
`cacheAhead.state` as `recoveryRequired`. Cached reads and cache writes,
including direct fill, are blocked until a supported recovery workflow clears
the flag. See [Maintenance and Recovery](#maintenance-and-recovery).

After successful relational fallback, the API may attempt a best-effort
_direct fill_: populate the cache using the same JSON generation and storage
code as the projector. It does not cache the already shaped response or replace
the response selected by fallback.
`ReadAcceleration:DirectFillTimeout` bounds this attempt (250 milliseconds by
default); a direct-fill failure leaves the relational response intact. Direct
fill is skipped for snapshot and read-replica requests because those database
targets are read-only for this purpose.

## Configure and Activate a Target

If you plan to use Kafka, follow its
[setup workflow](./event-streaming-kafka-cdc.md#setup) before provisioning or
activating a target.

These examples use PostgreSQL, data store `1`, and the default tenant.
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
  server-level `nested triggers` using the [prerequisite commands below](#sql-server-prerequisites).
- [Close and drain writers](#close-and-drain-writers) before either activation
  workflow. For an existing store, also locate the original history described
  in [Activate an Existing Store](#activate-an-existing-store).

#### SQL Server Prerequisites

Connect DBA tooling to the intended data store database and inspect both
settings. Each query must return `1`:

```sql
SELECT is_read_committed_snapshot_on
FROM sys.databases
WHERE database_id = DB_ID();

SELECT value_in_use
FROM sys.configurations
WHERE name = 'nested triggers';
```

If either setting is disabled, have an authorized DBA enable it during
maintenance, before cache activation and with writers closed and drained:

```sql
ALTER DATABASE CURRENT SET READ_COMMITTED_SNAPSHOT ON WITH ROLLBACK IMMEDIATE;
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'nested triggers', 1;
RECONFIGURE;
```

`WITH ROLLBACK IMMEDIATE` disconnects other sessions and rolls back incomplete
transactions in that database. `nested triggers` is a server-wide setting.
Rerun the inspection queries to confirm both values are `1`, then retry
activation with a new CLI invocation. Restart API instances when restoring
the runtime during verification so they observe the updated settings.

Only correct these prerequisites while the cache lifecycle is `disabled`.
An activation preflight failure changes no cache state, so activation can be
retried after correction. If status reports `sqlServerPrerequisiteFailed`
while lifecycle is `tracking`, `resetting`, or `rebuilding`, treat it as an
unsupported prerequisite incident. Changing these settings while the cache is
active has no supported correction-and-restart recovery procedure.

#### Close and Drain Writers

Before activation, close admission for new writes to the target database and
prevent automatic restarts or scheduled jobs from reopening it. Stop every API
replica, including its projector and direct-fill writes, as well as bulk
loaders, administrative writers, and external database writers. Drain their
in-flight transactions and verify they have finished before running an
activation command.

Keep these writers stopped through activation and every retry. Restore the API
runtime and reopen write admission only as directed in
[Verify and Enable Reads](#verify-and-enable-reads). The
`--offline-writer-admission closedAndDrained` flag acknowledges that the
operator has already stopped and drained writers; it does not perform those
actions.

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

Use this path only for a newly provisioned database _before its first resource
or descriptor write_. [Close and drain writers](#close-and-drain-writers), inspect
the target, then activate it:

```bash
dms-document-cache status --data-store-id 1 --settings ./appsettings.Production.json --environment Production --datastore postgresql --json
dms-document-cache activate-new-empty --data-store-id 1 --confirm newEmptyActivation --settings ./appsettings.Production.json --environment Production --datastore postgresql --json
```

Continue with [Verify and Enable Reads](#verify-and-enable-reads) before
allowing writes to the database.

### Activate an Existing Store

The existing store must be `disabled`. Trusted history must prove
`internalOnly` for this target and physical source; missing or unknown history
rejects activation. This requirement applies even if Kafka is not enabled.

If the store was created without
[managed provisioning](../utilities/database-provisioning.md#managed-provisioning-for-documentcache),
this activation path is unavailable. Use a new database, activate it before its
first write, and reload the data as described above.

For a store with the original managed history:

1. Locate the original provisioning `--managed-state-path` and
   `--deployment-key` in retained scripts or deployment configuration. Resolve
   the path against the original working directory or mounted volume. If the
   key was omitted, confirm that the original default, `local`, was used.
   Retain the original creation receipt, workflow journal, and source history;
   an empty directory or a new deployment key cannot replace them.
2. Add this fragment to the complete CLI settings, replacing the path and key
   with those original values:

   ```json
   {
     "Cdc": {
       "PublicationHistory": {
         "StatePath": "/absolute/original/controller-state",
         "DeploymentKey": "original-deployment-key",
         "LockTimeout": "00:00:30"
       }
     }
   }
   ```

   Reference the same protected state directory used by provisioning and any
   CDC administration, with owner-only access. An independent copy does not
   share its controller lock. Check environment overrides, particularly
   `Cdc__PublicationHistory__StatePath` and
   `Cdc__PublicationHistory__DeploymentKey`, so the CLI reads the intended
   records. See [Offline Administration History](../utilities/document-cache-admin-cli.md#offline-administration-history)
   for all history-reader settings.
3. Inspect the selected target with those settings:

   ```bash
   dms-document-cache status --data-store-id 1 --settings ./appsettings.Production.json --environment Production --datastore postgresql --json
   ```

   Confirm that `targetKey.tenantKey` and `targetKey.dataStoreId` identify the
   intended database and that `lifecycle.state` is `disabled`. Retain its
   `physicalSourceFingerprint` for the activation command below. Status
   identifies the current source; it does not establish permission to activate
   it. The activation command checks the original history before mutation.
4. [Close and drain all writers](#close-and-drain-writers). Keep them stopped
   throughout the command and any retries. For SQL Server, confirm the
   [prerequisites](#sql-server-prerequisites) before proceeding.
5. Activate the target. Replace `<observed-lowercase-hex>` with the hash from
   the status result, preserving the `sha256:` prefix. This guard rejects
   activation if the physical source changed after the status check:

   ```bash
   dms-document-cache activate-offline \
     --data-store-id 1 \
     --confirm offlineActivation \
     --offline-writer-admission closedAndDrained \
     --expected-physical-source-fingerprint "sha256:<observed-lowercase-hex>" \
     --settings ./appsettings.Production.json \
     --environment Production \
     --datastore postgresql \
     --json
   ```

   Use the same tenant, data store ID, provider, and settings as the status
   command. The CLI holds the controller lock while checking history and
   throughout administration. Missing, unreadable, mismatched, or unknown
   history rejects activation; do not use this mutating command just to test
   whether the history exists.
6. Check the command result and complete [Verify and Enable Reads](#verify-and-enable-reads)
   before reopening write admission. If the command is incomplete, keep all
   writers stopped and retry as described below.

### Verify and Enable Reads

Accepted activation revalidates prerequisites, clears residual cache/work
through the supported workflow, seeds and drains baseline work, and enters
`tracking`. Check command results before proceeding. Exit code `12` means
incomplete: keep writers stopped and retry the same command with the same
target and guard values. Require a `completed` result (exit code `0`) before
proceeding with verification.

```bash
dms-document-cache status --data-store-id 1 --settings ./appsettings.Production.json --environment Production --datastore postgresql --json
```

In the CLI result, verify `lifecycle.state` is `tracking` and `cacheAhead.state`
is `clear`. Standalone CLI status does not observe the running projector, so
`operationalHealth` and `caughtUp` report `unknown` with reason
`runtimeNotObserved` even when the stored database state is healthy. Do not wait
for those CLI fields to become healthy.

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
is complete. Projection can run with read acceleration turned off.

See [Configuration Details](../configuration/configuration-details.mdx#documentcache)
for all settings and environment variable names, or the
[optional Docker configuration](../../getting-started/getting-started-appendix.md#optional-documentcache)
for the local Compose overlay.

## Interpret Status

The CLI and `GET /health/document-cache` expose the same projection status
contract. Check that the target resolves to the intended database, is eligible
for projection, and has the required database tables, triggers, and provider
settings, as well as checking lifecycle and queue status.

The standalone CLI observes state stored in the database, but does not observe
the running projector. Its `operationalHealth` and `caughtUp` fields therefore
report `unknown` with reason `runtimeNotObserved` when database observation
succeeds. Use the live HTTP endpoint to verify runtime health and caught-up
status.

| `lifecycle.state` | Meaning and action |
| --- | --- |
| `disabled` | Recording new work, writing cached JSON, marking queued work complete, and reading from the cache are disabled. The API continues to use relational data. Activate through the CLI when ready. |
| `resetting` | Administrative clearing is running or was interrupted. New work is still recorded; writing cached JSON and marking queued work complete are blocked. Reissue the known interrupted command; do not infer a recovery command from this state alone. |
| `rebuilding` | Work for existing data is being added to the queue and processed. Cached reads are blocked, and status cannot report caught-up success. Let the active workflow finish or reissue the known interrupted command. |
| `tracking` | Ordinary projection is enabled. Cached reads still require `cacheAhead.state` to be `clear` and cache content versions to match the relational source. |
| `invalid` | Stored lifecycle state is missing or invalid. Inspect the required database tables, triggers, and diagnostics and follow the runbook before claiming health. |
| `unknown` | Lifecycle could not be observed. Resolve target or observation failures before drawing conclusions. |

`operationalHealth` describes whether projection can process ordinary work.
`caughtUp` is a separate observation: one database query saw `tracking`,
`cacheAhead.state` as `clear`, and an empty `dms.DocumentProjectionWork` queue.
It is not proof of Kafka delivery or an integrity scan. New writes can add work
immediately after that observation.

Projection status is distinct from ordinary API health. A processing backlog
or projector failure does not stop an otherwise healthy API instance from
serving requests using relational data. However, if a write to the relational
tables cannot also save its required projection work, the whole transaction
rolls back. Missing or broken queue tables or triggers can therefore cause API
writes to fail, rather than just delay cache updates.

### HTTP Status Endpoint

The status endpoint is unmapped by default. Configure
`DataManagement:DocumentCache:Status:RequiredRole` with a single role reserved
for administrators or operators, such as `cms-client`, and restart the API.
Avoid `dms-client`: it is the default `IdentitySettings:ClientRole` assigned to
ordinary API clients, so using it would grant vendors access to this endpoint.

With the self-contained identity provider, use the role named by
`IdentitySettings:ConfigServiceRole` (`cms-client` by default) and request a
token at `/connect/token` using an administrative client's credentials and
the `client_credentials` grant. See
[administrative client requirements](../configuration/identity-provider.md#clients-that-arent-api-clients).
If you use Keycloak, assign the selected role only to clients authorized to
monitor DocumentCache and include it in their access tokens. Setting
`Status:RequiredRole` does not create the role or grant it to any client.

Callers must present a valid bearer token carrying that exact role under
`JwtAuthentication:RoleClaimType`. Missing or invalid authentication returns
`401`; an authenticated caller without the role gets `403`. An empty or
invalid configured role leaves the endpoint unmapped.
See the [configuration constraints](../configuration/configuration-details.mdx#documentcache).

## Maintenance and Recovery

Start by checking status for the intended tenant and data store. Preserve the
status JSON and sanitized logs before remediation. Use the supported CLI
workflows below; do not edit cache, work, lifecycle, or cache-ahead flag tables
directly.

- [Explicit integrity scrub](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#explicit-integrity-scrub)
  is appropriate when diagnostics suggest missing or mismatched projection
  work. Run `scrub` only when lifecycle is `tracking` and `cacheAhead.state` is
  `clear`. It scans source/cache/work relationships, adds missing work, and
  corrects work to match the current relational version. It can set the
  cache-ahead flag if it finds a cached version ahead of the source; it cannot
  clear that flag. After completion, follow cache-ahead recovery if required;
  otherwise, let projection drain and recheck live status. Scrub alone does not
  prove that the cache is caught up.
- [Cache-ahead recovery](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#cache-ahead-recovery)
  applies when `cacheAhead.state` is `recoveryRequired`: a cached content
  version was observed to be higher than the relational source version. Cached
  reads and cache writes are blocked. Using `recover-cache-ahead` requires
  original trusted `internalOnly` history for the same target and physical
  source, plus incident analysis confirming that downstream systems could not
  have observed the higher value. When those conditions hold,
  [close and drain writers](#close-and-drain-writers) and
  follow the offline recovery procedure, keeping writers stopped through
  completion and retries. If publication is possible or unknown, stop
  publication, preserve cache/work/flag evidence, and follow
  [CDC containment](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/cdc-documentation/operations-runbook.md#projection-handoff)
  instead of attempting internal-only recovery.
- [Persistent failures and poison remediation](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#persistent-projection-failure-and-poison-remediation)
  applies when the queue will not drain or a document repeatedly fails
  projection (often called a _poison_ document). Inspect `documentDiagnostics`,
  `poisonTraversalDiagnostics`, and `targetDiagnostics` to identify the failing
  document or target. Correct the underlying materialization, database, or
  configuration problem, then restart or resume the projector if needed. Do
  not delete queued work or repeatedly rebuild without fixing the cause.
  Recheck live operational health and queue progress; run a scrub if missing
  or mismatched work is suspected.
- [Suspected restore or direct mutation](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#suspected-restore-or-direct-mutation)
  includes database restores, out-of-band data copies, disabled triggers, and
  unsupported direct table edits. An empty queue is insufficient evidence of
  consistency after these events. Run an explicit `scrub` before relying on
  caught-up status. If lifecycle is not `tracking` or the cache-ahead flag is
  already set, resolve that condition through its supported workflow first.
  After scrub, follow cache-ahead recovery if required; otherwise, let repaired
  work drain and verify live status again.
- [Kafka/CDC operations](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/cdc-documentation/operations-runbook.md)
  cover issues involving connectors, offsets, topics, publication
  history, or downstream consumers. Use the CDC procedures for those systems;
  a healthy, caught-up DocumentCache does not prove that Kafka messages were
  delivered or consumed.
