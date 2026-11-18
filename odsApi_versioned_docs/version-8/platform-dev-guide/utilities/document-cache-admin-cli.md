---
sidebar_position: 5
description: Install and use the DocumentCache administration tool for Ed-Fi API v8.
---

# DocumentCache Administration CLI

The `dms-document-cache` tool inspects and administers one tenant/data-store
pair at a time without starting the API web host. Start with the
[DocumentCache guide](../features/document-cache.md) for
help choosing an activation procedure and checking the result.

## Installation

Install the .NET 10 SDK to use `dotnet tool install`, and keep the .NET 10
runtime available to run the tool.

```bash
feed="https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi%40Release/nuget/v3/index.json"
version="8.1.0"
dotnet tool install --global EdFi.Api.DocumentCacheAdmin --source "$feed" --version "$version"
dms-document-cache --help
```

Ensure the .NET global tools directory is on `PATH`. The package includes the
default Ed-Fi ApiSchema workspace. For extensions or another effective schema,
configure `AppSettings:ApiSchema:UseCustomPath=true` and
`AppSettings:ApiSchema:Path` to the matching workspace containing
`bootstrap-api-schema-manifest.json`.

## Configuration and Target Selection

Run with complete settings matching the deployed API, its Configuration Service,
provider, and effective schema. The operator needs database access appropriate
to the selected workflow. For SQL Server, check the
[database and server settings](../features/document-cache.md#sql-server-prerequisites)
before activation.

| Option | Use |
| --- | --- |
| `--settings <path>` | Load an explicit appsettings JSON file. |
| `--environment <name>` | Select the environment-specific settings file. Without this flag, `DOTNET_ENVIRONMENT`, then `ASPNETCORE_ENVIRONMENT`, supplies the environment name. |
| `--datastore postgresql\|sqlserver` | Override the provider for this invocation. It must match the deployment and selected data store's provider metadata. |
| `--data-store-id <id>` | Positive Configuration Service data store ID. |
| `--tenant-key <value>` | Tenant key; omit for the normalized default tenant (`""`). |
| `--json` | Emit the shared result contract as JSON. |

Settings load from `appsettings.json` in the working directory, then
`appsettings.<environment>.json`, then the explicit `--settings` file.
Environment variables override those files; supported command-line configuration
overrides apply last. Use double underscores in environment keys, for example
`DataManagement__DocumentCache__ReadAcceleration__Enabled`.

Keep connection strings and client credentials in protected settings or
environment variables supplied by your deployment's secret management. The CLI
does not expose secret-bearing command-line arguments. Mixed-provider targets
backed by the Configuration Service are not a supported production topology.

### Inspect Status

With data store `1` registered and selected in
`DataManagement:DocumentCache:Targets` in the complete settings:

```bash
dms-document-cache status --data-store-id 1 --settings ./appsettings.Production.json --environment Production --datastore postgresql --json
```

Add `--tenant-key district-a` for a named tenant. With `--json`, results go to
standard output and logs go to standard error or the configured log destination.
Verify the tenant and data store in `targetKey`. After activation, check that
`lifecycle.state` is `tracking` and `cacheAhead.state` is `clear`.

The CLI reads database state and reports `unknown` with reason
`runtimeNotObserved` for `operationalHealth` and `caughtUp`. Use the
[running API's status endpoint](../features/document-cache.md#check-status)
to verify the worker is healthy and caught up.

### Pass a Request as JSON

A script can supply the request in a file with `--request-json <path>` or
through standard input with `--request-json -`. For example, save the
following status request as `status-target.json`.

```json
{ "targetKey": { "tenantKey": "", "dataStoreId": 1 } }
```

```bash
dms-document-cache status --request-json status-target.json \
  --settings ./appsettings.Production.json --environment Production --json
```

When using `--request-json`, put the target and any required confirmation in
the request. If the command requires `--offline-writer-admission`, include
`"offlineWriterAdmission": "closedAndDrained"` in the JSON. For offline
activation, you can also set `expectedPhysicalSourceFingerprint` to the value
from `status` to verify that you're activating the same database.

Omit `--tenant-key`, `--data-store-id`, `--confirm`,
`--offline-writer-admission`, and `--expected-physical-source-fingerprint`
from the command line. You can still use `--settings`, `--environment`,
`--datastore`, and `--json`.

## Commands

Supply the token shown with `--confirm`. For commands marked _offline_,
stop writers and wait for writes in progress to finish. Then pass
`--offline-writer-admission closedAndDrained` to acknowledge those steps.
Keep writers stopped through retries.

| Command | Required confirmation | When to use it |
| --- | --- | --- |
| `activate-new-empty` | `newEmptyActivation` | Start the cache on a newly provisioned database before its first resource or descriptor write. Stop writers and wait for writes in progress to finish first. |
| `activate-offline` | `offlineActivation` | Offline. Build the first cached copies on an existing `disabled` database with the required publication history. |
| `deactivate-offline` | `offlineDeactivation` | Offline. Clear cached copies and pending updates, then enter `disabled`. Requires the same publication history as offline activation. |
| `rebuild-online` | `onlineCacheRebuild` | Rebuild cached copies while writes continue. Requires `tracking` or `rebuilding` and a clear cache-ahead flag. |
| `scrub` | `integrityScrub` | Check the cache against relational data and repair missing or incorrect queued updates. Requires `tracking` and a clear cache-ahead flag. |
| `recover-cache-ahead` | `internalCacheAheadRecovery` | Offline. Recover when a cached version is newer than its source. Requires the original publication history and the checks in the recovery procedure. |

Follow the activation steps for a [new database](../features/document-cache.md#turn-it-on-for-a-new-database)
or an [existing database](#activate-an-existing-database). If a command stops
in `resetting` or `rebuilding`, resume the same command with the same target
and options. For other symptoms, see [When Something Goes Wrong](../features/document-cache.md#when-something-goes-wrong).

Removing a data store from `Targets` pauses the worker for that database.
The database continues recording pending updates until you deactivate the cache.

### Optional Checks and Time Limits

| Option | Default | Meaning |
| --- | --- | --- |
| `--expected-physical-source-fingerprint <value>` | None | Proceed only if the selected database still matches the identifier from the last status check. |
| `--command-timeout-seconds <seconds>` | `86400` | Total administrative workflow budget. |
| `--status-observation-timeout-seconds <seconds>` | `5` | Time allowed to read each target's status from the database. |
| `--status-timeout-seconds <seconds>` | `30` | Overall status budget. |

Timeout arguments are positive numeric seconds. For configuration equivalents,
see [Configuration Details](../configuration/configuration-details.mdx#documentcache).

## Offline Administration History

For `activate-offline`, `deactivate-offline`, and `recover-cache-ahead`, the
original provisioning records must show that this database has never published
changes to Kafka or another downstream system. The CLI calls this
`internalOnly`. [Managed provisioning](./database-provisioning.md#managed-provisioning-for-documentcache)
records that history at database creation. Stopping or removing a Kafka
connector cannot establish it later.

Find the original `--managed-state-path` and `--deployment-key` in your
provisioning scripts or deployment settings. If the path was relative, resolve
it against the original working directory or mounted volume. If the key was
omitted, its default was `local`. The directory must still hold the original
creation receipt, workflow journal, and source history.

Add the following to the complete CLI settings, substituting the original path
and key. Use the same protected directory as provisioning and CDC
administration. The tools use the same lock in that directory to prevent
overlapping operations. A separate copy has its own lock.

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

Restrict access to the directory to its owner. The CLI holds the lock through
the command. `LockTimeout` sets how long it waits to acquire the lock. The
default is 30 seconds and the allowed range is greater than zero through ten
minutes. Check for environment overrides such as
`Cdc__PublicationHistory__StatePath` and `Cdc__PublicationHistory__DeploymentKey`.

The CLI rejects an offline command if it cannot read matching records or the
history is unknown. If this database was created without managed history, use
the [new database procedure](../features/document-cache.md#turn-it-on-for-a-new-database)
and reload the data after verification. If records are damaged or publication
may have occurred, preserve the records and follow the
[history and recovery guidance](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#history-decisions-for-offline-administration).

## Activate an Existing Database

1. [Prepare the target and settings](../features/document-cache.md#prepare-the-target-and-settings)
   and configure [offline administration history](#offline-administration-history)
   using the original provisioning records. For SQL Server, check the
   [SQL Server prerequisites](../features/document-cache.md#sql-server-prerequisites).
2. Inspect the target. This example uses PostgreSQL, data store `1`, and the
   default tenant. Substitute your registered ID, use `--datastore sqlserver`
   for SQL Server, and add `--tenant-key <your-tenant-key>` for a named tenant.

   ```bash
   dms-document-cache status --data-store-id 1 \
     --settings ./appsettings.Production.json --environment Production --datastore postgresql --json
   ```

   Verify `targetKey.tenantKey` and `targetKey.dataStoreId` and check that
   `lifecycle.state` is `disabled`. Copy `physicalSourceFingerprint`, the
   identifier for the database the CLI actually reached. Supplying this value
   in the next command prevents changes if the target now points elsewhere.
3. Stop all API instances, bulk loaders, scheduled jobs, and other writers
   for this database. Prevent automatic restarts and wait for all writes in
   progress to finish. Keep writers stopped through activation and any retries.
4. Activate the cache using the same target, provider, and settings. Replace
   the example fingerprint with the entire value from status, including
   `sha256:`. The command checks the original history before changing the cache.

   ```bash
   dms-document-cache activate-offline --data-store-id 1 \
     --confirm offlineActivation --offline-writer-admission closedAndDrained \
     --expected-physical-source-fingerprint "sha256:<observed-lowercase-hex>" \
     --settings ./appsettings.Production.json --environment Production --datastore postgresql --json
   ```

5. If the CLI returns exit code `12`, keep writers stopped and retry the same
   command with the same target and fingerprint. After `completed` (exit code
   `0`), [finish activation](../features/document-cache.md#finish-activation).

## Exit Codes

| Code | Meaning |
| --- | --- |
| `0` | The command completed. For `status`, read the result to check the target's state. |
| `1` | The command failed unexpectedly. Check the error details. |
| `10` | A safety check stopped the command before it changed the database. Read the reason in the output. |
| `11` | The command failed before changing the database, or `status` could not return a complete result. |
| `12` | The command stopped before it finished and may have changed the database. Retry it with the same target and options. |
| `64` | Check the command arguments, confirmation token, or request JSON for errors. |
| `78` | The CLI could not load a valid configuration. Check the settings files and environment variables. |

If the command requires downtime, keep writers stopped through every retry.

## Representation Restamp

Run a restamp only when a release's upgrade instructions call for it. A
restamp corrects how resources appear in API responses and Kafka messages
after a change to the code that generates JSON. It advances `ContentVersion`
and updates `ContentLastModifiedAt` so clients can detect the correction.

Keep all access to the database stopped, including readers, writers, workers,
and loaders, while deploying the corrected code and running the procedure.

- `restamp-preview` saves an operation record. It requires `--mode` (`tracking`
  or `disabled`, matching the database's lifecycle), `--reason` with a short
  explanation, and `--offline-writer-admission closedAndDrained`. Choose
  exactly one scope. For a resource type, pass both `--project-name` and
  `--resource-name`. For individual documents, pass `--document-uuid` once
  for each UUID. Confirm `cacheAhead.state` is `clear` before running the preview.
- `restamp-execute` requires `--confirm representationRestamp`, the same
  offline option, and the operation ID from the preview. For an incomplete
  execution, retry with that same target and operation ID.

In `tracking` mode the command queues the corrected resources for the worker
to process. In `disabled` mode it updates versions and timestamps in the
relational tables. Follow the upgrade instructions for your release before
restoring service.
