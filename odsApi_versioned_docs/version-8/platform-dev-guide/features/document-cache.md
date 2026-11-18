# DocumentCache

DocumentCache stores a JSON copy of each resource and descriptor in the
database, where API instances share it. Activate the cache to keep the copies
up to date. For read-heavy workloads, also enable accelerated reads so the API
can serve GET requests from the cache. Kafka event streaming requires an active
cache. Allow extra database space for the copies, their indexes, and pending updates.

Clients get the same response from the cache or the relational tables. If a
copy is missing or out of date, the API reads the relational tables and may
refresh the cached copy ([_direct fill_](../configuration/configuration-details.mdx#documentcache)).
Snapshot and read-replica requests always read the relational tables and skip direct fill.

## Before You Start

| Your deployment | Where to start |
| --- | --- |
| You plan to stream to Kafka | Review the [Kafka requirements](./event-streaming-kafka-cdc.md#setup) **before creating the database**. The Kafka workflow creates it and activates its cache. |
| Before the first resource or descriptor write | [Activate the new database](#turn-it-on-for-a-new-database). Choose [managed provisioning](../utilities/database-provisioning.md#managed-provisioning-for-documentcache) at creation if you may need to deactivate or recover the cache offline later. |
| After the first write, with managed provisioning | [Activate offline](#turn-it-on-for-an-existing-database) if the original records show the database has never published changes to Kafka or another downstream system. |
| After the first write, without managed provisioning | [Activate a new database](#turn-it-on-for-a-new-database), verify its cache, then reload the data. Provisioning cannot recreate the original database's history. |

## Turn It On for a New Database

When creating a database without Kafka, [register the data store](../configuration/api-client-and-data-store-configuration.md#data-stores)
in the Configuration Service before [provisioning it](../utilities/database-provisioning.md#provisioning-a-database-ddl-provision).
Use the assigned ID in `Targets` and CLI commands, and for managed provisioning if you choose it.
Activate the cache before the first resource or descriptor write.

### Prepare the Target and Settings

Install the [DocumentCache Administration CLI](../utilities/document-cache-admin-cli.md#installation).
Use an operator account with access to administer the database. The CLI needs
the deployment's API settings, including the same provider, Configuration
Service access, and API schema. Supply credentials through protected settings
or your deployment's secret provider.

Provisioning creates the cache tables for every database. After activation, a
background worker, the _projector_, updates the copies as data changes.

The default `Targets` list is empty, so the worker is idle. For first-time
setup, merge the example below into the `appsettings.Production.json` used by
the API and CLI. Leave accelerated reads at their default (`false`) and choose
an administrator-only role for the [HTTP status endpoint](#check-status).
If you already use DocumentCache, append the new entry to `Targets` and keep
your current read-acceleration setting.

```json
{
  "DataManagement": {
    "DocumentCache": {
      "Targets": [
        { "TenantKey": "", "DataStoreId": 1 }
      ],
      "ReadAcceleration": { "Enabled": false },
      "Status": { "RequiredRole": "cms-client" }
    }
  }
}
```

The commands below use PostgreSQL, data store `1`, and the default tenant.
For a named tenant, set `TenantKey` and add `--tenant-key <your-tenant-key>` to every command. For
SQL Server, use `--datastore sqlserver` and check the settings below. See
[Configuration Details](../configuration/configuration-details.mdx#documentcache)
for all settings, or the [Docker appendix](../../getting-started/getting-started-appendix.md#optional-documentcache)
for local Compose deployments.

### SQL Server Prerequisites

<details>
<summary>Check read committed snapshot isolation and nested triggers</summary>

Connect to the target database. Both queries must return `1`.

```sql
SELECT is_read_committed_snapshot_on
FROM sys.databases
WHERE database_id = DB_ID();

SELECT value_in_use
FROM sys.configurations
WHERE name = 'nested triggers';
```

If either setting is off, have a DBA enable it during maintenance while the
cache is `disabled`, after stopping writers and waiting for transactions to
finish. `WITH ROLLBACK IMMEDIATE` disconnects other sessions and rolls back
incomplete transactions. The `nested triggers` setting affects the whole server.

```sql
ALTER DATABASE CURRENT SET READ_COMMITTED_SNAPSHOT ON WITH ROLLBACK IMMEDIATE;
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'nested triggers', 1;
RECONFIGURE;
```

Rerun the queries before activation. If a prerequisite fails while the cache is
active, preserve status and logs and escalate the incident.

</details>

### Activate the Empty Database

1. Stop all API instances, bulk loaders, scheduled jobs, and other writers for
   this database. Prevent automatic restarts and wait for writes in progress to finish.
2. Check that the CLI reports the intended tenant and data store with
   `lifecycle.state` set to `disabled`.

   ```bash
   dms-document-cache status --data-store-id 1 \
     --settings ./appsettings.Production.json --environment Production --datastore postgresql --json
   ```

3. Activate the cache while writers are still stopped.

   ```bash
   dms-document-cache activate-new-empty --data-store-id 1 --confirm newEmptyActivation \
     --settings ./appsettings.Production.json --environment Production --datastore postgresql --json
   ```

4. If the CLI returns exit code `12`, keep writers stopped and repeat the same
   command. Continue when it returns `completed` (exit code `0`).

### Finish Activation

1. Rerun the CLI `status` command for the same tenant and data store. Verify
   `lifecycle.state` is `tracking` and `cacheAhead.state` is `clear`.
2. Start the API instances with the target settings while keeping external
   writes paused. [Check status](#check-status) and wait for the worker to
   catch up.
3. If you want to enable accelerated reads, set
   `DataManagement:DocumentCache:ReadAcceleration:Enabled` to `true`, restart
   the API instances, and recheck status. This enables cached resource and
   descriptor GET requests on all configured targets.

Resume writes or load data once the checks pass.

## Turn It On for an Existing Database

If the cache is `disabled` and the original managed provisioning records show
the database has never published changes downstream, use
[`activate-offline`](../utilities/document-cache-admin-cli.md#activate-an-existing-database)
to build the cached copies. Schedule downtime so writers stay stopped through
activation and any retries.

## Check Status

Set `DataManagement:DocumentCache:Status:RequiredRole` to a single role reserved
for administrators or operators. Restart the API after changing it. An empty
or invalid role leaves the endpoint unavailable.

1. Get a bearer token with that role. With the self-contained provider, use
   `IdentitySettings:ConfigServiceRole` (`cms-client` by default). Request the
   token from the Configuration Service at `/connect/token` using the
   [administrative client's credentials](../configuration/identity-provider.md#clients-that-arent-api-clients)
   and the `client_credentials` grant. With Keycloak, assign the chosen role
   to the monitoring client.
2. Call `GET /health/document-cache` on the Ed-Fi API with the token. Find
   your tenant and data store. A healthy worker reports
   `operationalHealth.status` as `operational`. A `caughtUp.status` of
   `caughtUp` means the queue was empty at the time of the check.

A `401` means the token is missing or invalid. For a `403`, check the token's
role under `JwtAuthentication:RoleClaimType`.

Both the CLI `status` command and `GET /health/document-cache` return an entry
for each tenant and data store. The CLI reads only the database, so it can't
check the worker and reports `unknown` for the two checks in step 2. Use the
HTTP endpoint for those. In both outputs, `lifecycle.state` shows whether the
cache is turned on and receiving updates:

| `lifecycle.state` | What it means for the host |
| --- | --- |
| `disabled` | The API uses relational data and the cache receives no updates. |
| `resetting` | An administration command is clearing the cache. Let it finish. If it was interrupted, resume the same command. |
| `rebuilding` | The cache is building copies of existing data. Reads use the relational tables until the operation finishes. |
| `tracking` | The worker can update cached copies. With accelerated reads enabled and the cache-ahead flag clear, the API can use current copies. |
| `invalid` | The stored cache state is missing or invalid. Inspect the database tables and status diagnostics. |
| `unknown` | The tool could not read the state. Check the selected tenant, data store, and database access. |

## When Something Goes Wrong

Save the status JSON for the affected tenant and data store, along with logs
that have any credentials removed.

- **The CLI returns exit code `12`.** The command stopped before it finished.
  Retry it with the same target and options. For activation or another command
  that requires downtime, keep writers stopped through every retry.
- **The worker stays behind after writes stop.** On the affected API instance,
  check `GET /health/document-cache` for `documentDiagnostics` and
  `targetDiagnostics`. If one document repeatedly fails to build its cached
  JSON, `poisonTraversalDiagnostics` can help identify it. Correct the cause,
  resume the worker, and check progress. For the full procedure, see [Repeated document failures](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#persistent-projection-failure-and-poison-remediation)
- **Status shows `cacheAhead.state` is `recoveryRequired`.** A cached copy is
  newer than its source. Cache updates stop and reads use the relational tables.
  If a downstream system might have seen that version, stop publication and
  follow [CDC containment](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/cdc-documentation/operations-runbook.md#projection-handoff).
  Otherwise, follow the [offline recovery checks](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#cache-ahead-recovery).
  They require original provisioning records showing the database has never published changes downstream.
- **The database was restored or changed outside the API.** Run `scrub` to
  check for missing or inconsistent cache updates, even if the queue is empty.
  Scrub requires `tracking` and a clear cache-ahead flag. Resolve any other
  state first. If scrub sets the flag, follow cache-ahead recovery. Otherwise,
  let repaired work finish and verify live status. For the full procedure, see [Restore and repair procedure](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#suspected-restore-or-direct-mutation)
- **API creates or updates start failing.** When the cache is active, the
  database rolls back a create or a content-changing update if it cannot queue
  the cache update. On the API instance that handled the failed request, check
  `enqueueFailures` at `GET /health/document-cache` or inspect that instance's
  logs for errors involving the work table or triggers. For the full procedure, see
  [Diagnose write failures](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#enqueue-vs-processing-availability)
