# DocumentCache

DocumentCache stores a JSON copy of each resource and descriptor in the
database, where API instances share it. On read-heavy deployments, the Ed-Fi
API can use those copies to answer GET requests without rebuilding each
response from the relational tables. Clients get the same response either way.
The cache is optional for
reads and required for event streaming with Kafka. Allow extra database space
for the copies, their indexes, and pending updates.

If a copy is missing or out of date, the API reads the relational tables.
It can then fill in the cached copy, an operation called _direct fill_.
`ReadAcceleration:DirectFillTimeout` limits that attempt to 250 milliseconds by
default. Snapshot and read-replica requests always read relational data and
skip direct fill.

## Before You Start

| Your deployment | Where to start |
| --- | --- |
| You plan to stream to Kafka | Start with [Kafka setup](./event-streaming-kafka-cdc.md#setup) **before creating the database**. That workflow creates the database and activates its cache before the first write. |
| You want the cache on a new database | [Turn it on before the first resource or descriptor write](#turn-it-on-for-a-new-database). Choose [managed provisioning](../utilities/database-provisioning.md#managed-provisioning-for-documentcache) at creation if you want the option to deactivate the cache or recover it offline later. |
| You want the cache on an existing database | Check the original managed provisioning records. If they show this database has no history of downstream publication, such as through Kafka, you can [activate it offline](#turn-it-on-for-an-existing-database). |
| The existing database was created without those records | [Provision a new database and activate its cache](#turn-it-on-for-a-new-database), verify it, then reload the data. Rerunning provisioning on the existing database cannot recreate its history. |

### Prepare the Target and Settings

Register the database in the Configuration Service and install the
[DocumentCache Administration CLI](../utilities/document-cache-admin-cli.md#installation).
Use an operator account with access to administer the database. The CLI needs
the deployment's API settings, including the same provider, Configuration
Service access, and API schema. Supply credentials through protected settings
or your deployment's secret provider.

Provisioning creates the cache tables for every database. Activation starts
maintaining the cached copies. A background worker, the _projector_, keeps
them up to date as data changes. This process is called _projection_.

Select the tenant and data store the worker should update. The default
`Targets` list is empty, so the worker is idle. Merge the following into the
deployment's complete `appsettings.Production.json` for the API and CLI.
Accelerated reads are off by default. Leave them off during setup.
Choose an administrator-only role for the [HTTP status endpoint](#http-status-endpoint).

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
Use your registered data store ID throughout. For a named tenant, set
`TenantKey` and add `--tenant-key <your-tenant-key>` to every command. For
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

## Turn It On for a New Database

1. Provision the database and [prepare its settings](#prepare-the-target-and-settings)
   before its first resource or descriptor write. Stop all API instances, bulk
   loaders, scheduled jobs, and other writers for this database. Prevent
   automatic restarts and wait for all writes in progress to finish.
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

4. Wait for `completed` (exit code `0`). If the CLI returns exit code `12`,
   keep writers stopped and repeat the same command. After completion,
   [check status and enable accelerated reads](#check-status) before allowing
   writes or loading data.

## Turn It On for an Existing Database

For a database that already has data, `activate-offline` builds the initial
cached copies. The cache must be `disabled`, and the CLI must be able to check
the database's original managed provisioning records. Schedule downtime so all
writers can stay stopped through activation and any retries. Follow
[Activate an Existing Database](../utilities/document-cache-admin-cli.md#activate-an-existing-database)
for the settings, commands, and verification steps.

## Check Status

1. After activation, run the CLI status command for the same target.

   ```bash
   dms-document-cache status --data-store-id 1 \
     --settings ./appsettings.Production.json --environment Production --datastore postgresql --json
   ```

   Verify `lifecycle.state` is `tracking` and `cacheAhead.state` is `clear`.
   The CLI reads the database. Only the running API can check the worker, so
   `operationalHealth` and `caughtUp` show `unknown` with reason
   `runtimeNotObserved` in the CLI.
2. Start the API instances with the target settings while keeping external
   writes paused. Call [GET /health/document-cache](#http-status-endpoint) and
   find the matching tenant and data store. Verify `operationalHealth.status`
   is `operational`. Once pending updates finish, `caughtUp.status` should be
   `caughtUp`. This means the queue was empty when checked.
3. If you want the API to serve reads from the cache, set
   `DataManagement:DocumentCache:ReadAcceleration:Enabled` to `true`, restart
   the API instances, and recheck the endpoint. This setting applies to
   resource and descriptor GET requests for configured targets. You can leave
   it off and still maintain the cache. Resume writes after verification.

| `lifecycle.state` | What it means for the host |
| --- | --- |
| `disabled` | The API uses relational data and the cache receives no updates. |
| `resetting` | An administration command is clearing the cache. Let it finish. If it was interrupted, resume the same command. |
| `rebuilding` | The cache is building copies of existing data. Reads use the relational tables until the operation finishes. |
| `tracking` | The worker can update cached copies. With accelerated reads enabled and the cache-ahead flag clear, the API can use current copies. |
| `invalid` | The stored cache state is missing or invalid. Inspect the database tables and status diagnostics. |
| `unknown` | The tool could not read the state. Check the selected tenant, data store, and database access. |

### HTTP Status Endpoint

Set `DataManagement:DocumentCache:Status:RequiredRole` to a single role
reserved for administrators or operators and restart the API. An empty or
invalid role leaves the endpoint unavailable. With the self-contained identity
provider, use `IdentitySettings:ConfigServiceRole` (`cms-client` by default).
Request a token at `/connect/token` with the administrative client's credentials
and the `client_credentials` grant. With Keycloak, assign the chosen role to
the clients that monitor the cache. See [administrative client requirements](../configuration/identity-provider.md#clients-that-arent-api-clients).

Call `GET /health/document-cache` with that bearer token. A `401` means the
token is missing or invalid. For a `403`, check that the token carries the
configured role under `JwtAuthentication:RoleClaimType`.

## When Something Goes Wrong

Save the status JSON for the affected tenant and data store, along with logs
that have any credentials removed.

- **The CLI returns exit code `12`.** The command stopped before it finished.
  Retry it with the same target and options. For activation or another command
  that requires downtime, keep writers stopped through every retry.
- **The queue stops shrinking.** Check `documentDiagnostics` and
  `targetDiagnostics`. If one document repeatedly fails to build its cached
  JSON, `poisonTraversalDiagnostics` can help identify it. Correct the cause,
  resume the worker, and check progress. [Repeated document failures](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#persistent-projection-failure-and-poison-remediation)
- **Status shows `cacheAhead.state` is `recoveryRequired`.** A cached version
  is newer than its relational source. Cached reads and updates are blocked.
  Use offline recovery only if the original records show no downstream
  publication and you confirm downstream systems could not have seen that
  version. If exposure is possible or unknown, stop publication and preserve
  the evidence. [Cache-ahead recovery](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#cache-ahead-recovery)
  and [CDC containment](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/cdc-documentation/operations-runbook.md#projection-handoff)
- **The database was restored or changed outside the API.** Run `scrub` to
  check for missing or inconsistent cache updates, even if the queue is empty.
  Scrub requires `tracking` and a clear cache-ahead flag. Resolve any other
  state first. If scrub sets the flag, follow cache-ahead recovery. Otherwise,
  let repaired work finish and verify live status. [Restore and repair procedure](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#suspected-restore-or-direct-mutation)
- **API creates or updates start failing.** When the cache is active, the
  database rolls back a create or a content-changing update if it cannot queue
  the cache update. On the API instance that handled the failed request, check
  `enqueueFailures` at `GET /health/document-cache` or inspect that instance's
  logs for errors involving the work table or triggers.
  [Diagnose write failures](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#enqueue-vs-processing-availability)
