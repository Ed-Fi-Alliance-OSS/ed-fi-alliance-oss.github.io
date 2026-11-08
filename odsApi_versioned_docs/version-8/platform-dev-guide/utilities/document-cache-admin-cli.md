---
sidebar_position: 5
description: Install and use the DocumentCache administration tool for Ed-Fi API v8.1.
---

# DocumentCache Administration CLI

The `dms-document-cache` tool inspects and administers one tenant/data-store
pair at a time without starting the API web host. This reference describes
v8.1.0. Start with the [DocumentCache guide](../features/document-cache.md) for
activation examples and lifecycle interpretation.

## Installation

Install the .NET 10 SDK to use `dotnet tool install`, and keep the .NET 10
runtime available to run the tool.

:::note Package publication

Publication of `EdFi.Api.DocumentCacheAdmin` is tracked separately. The v8.1.0
source defines the package and command, but this guide does not confirm an
available feed version. Obtain the published version corresponding to v8.1.0
before running the installation command below; `<published-version>` is a
placeholder, not a package version.

:::

```bash
feed="https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json"
version="<published-version>"
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
to the selected workflow. SQL Server projection requires RCSI and server-level
`nested triggers`; see the [feature prerequisites](../features/document-cache.md#prerequisites).

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

Add `--tenant-key district-a` for a named tenant. In JSON mode, stdout contains
one shared contract document, with diagnostics and logs on stderr or configured
log sinks. Inspect the target's `resolution`, `eligibility`, `lifecycle`,
`cacheAhead`, `operationalHealth`, `caughtUp`, and `queueSummary` fields. A
successful status command means it returned a complete result, not that the
target is operational.

Standalone CLI status observes durable database state, including lifecycle,
the cache-ahead latch, and queue state, but does not observe the running
projector. Even with healthy durable state, `operationalHealth` and `caughtUp`
report `unknown` with reason `runtimeNotObserved`. Use the live
[`GET /health/document-cache` endpoint](../features/document-cache.md#http-status-endpoint)
after restoring the API/projector runtime to verify operational health and
caught-up status. See [status interpretation](../features/document-cache.md#interpret-status).

Duration fields use numeric `*Seconds` values; administrative results include
`elapsedCommandTimeSeconds`.

For automation, `--request-json <path|->` accepts a request file or stdin. Do not
combine it with target, confirmation, offline writer admission, or fingerprint
options. See the [release CLI README](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/src/dms/clis/EdFi.DataManagementService.DocumentCacheAdmin/README.md#configuration)
for request shapes.

## Commands

Supply the exact token with `--confirm`. Commands marked _offline_ also require
`--offline-writer-admission closedAndDrained`, after the operator has actually
closed write admission and drained in-flight writers. That flag does not fence
writers for you.

| Command | Required confirmation | Prerequisites and purpose |
| --- | --- | --- |
| `activate-new-empty` | `newEmptyActivation` | Newly provisioned store before its first canonical write, with writers closed and drained. Activate and establish the baseline. |
| `activate-offline` | `offlineActivation` | Offline; existing `disabled` store and trusted internal-only history. Activate and establish the baseline. |
| `deactivate-offline` | `offlineDeactivation` | Offline; trusted internal-only history. Clear cache/work through the supported workflow and enter `disabled`. |
| `rebuild-online` | `onlineCacheRebuild` | `tracking` or `rebuilding`, clear cache-ahead latch. Rebuild while canonical writes remain online. |
| `scrub` | `integrityScrub` | `tracking`, clear latch. Check source/cache/work integrity and repair eligible work discrepancies. |
| `recover-cache-ahead` | `internalCacheAheadRecovery` | Offline; trusted internal-only history and the runbook's recovery guards. Recover a cache-ahead incident. |

Use the [activation examples](../features/document-cache.md#configure-and-activate-a-target)
and the [operations runbook](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md)
for the complete procedures. Do not select a different workflow just because a
previous command stopped in `resetting` or `rebuilding`.

Optional guards and timeouts:

| Option | Default | Meaning |
| --- | --- | --- |
| `--expected-physical-source-fingerprint <value>` | None | Reject mutation if the current source differs from the observed `sha256:<lowercase-hex>` fingerprint. |
| `--command-timeout-seconds <seconds>` | `86400` | Total administrative workflow budget. |
| `--status-observation-timeout-seconds <seconds>` | `5` | Per-target durable status observation budget. |
| `--status-timeout-seconds <seconds>` | `30` | Overall status budget. |

Timeout arguments are positive numeric seconds. For configuration equivalents,
see [Configuration Details](../configuration/configuration-details.mdx#documentcache).

## Offline Administration History

`activate-offline`, `deactivate-offline`, and `recover-cache-ahead` require a
trusted history provider to report `internalOnly` for the same target and
physical-source fingerprint. Configure the shipped reader by adding this
fragment to the complete CLI settings:

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

Use the original provisioning `--managed-state-path` and `--deployment-key`.
The protected state must contain the original managed CREATE receipt, workflow,
and source history. Creating an empty directory or choosing a new key does not
establish internal-only history. Managed creation with `source-history-only`
can supply this evidence without enabling Kafka.

`LockTimeout` defaults to 30 seconds and must be positive and no more than ten
minutes. Environment overrides use names such as
`Cdc__PublicationHistory__StatePath`, not SchemaTools' `DMS_CDC__` prefix. Keep
state owner-only; the reader holds the controller lock through administration.

Without this configuration, history is `unknown`. Missing, unreadable, invalid,
or mismatched evidence also fails closed. Stopping a connector, removing a
runtime target, absence of a binding, or retiring a binding does not establish
internal-only eligibility. Follow the
[history decisions](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#history-decisions-for-offline-administration)
and [recovery setup](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/reference/document-cache-documentation/operations-runbook.md#recovery-procedure)
before invoking an offline command.

## Exit Codes

| Code | Meaning |
| --- | --- |
| `0` | Status or administration completed according to the result contract. Inspect the result for target health. |
| `1` | Unexpected or unclassified failure. |
| `10` | A known guard or preflight rule rejected administration before mutation. |
| `11` | Administration failed before mutation, or status failed before a complete result. |
| `12` | Incomplete and retryable after possible mutation. Retry the same command. |
| `64` | Invalid arguments, confirmation token, or JSON request. |
| `78` | Process-wide configuration failed before the target registry or command contract could be built. |

For `12` (`incompleteRetryable`), retain the same target and guard values. The
next invocation reacquires the provider mutex and revalidates durable state
before resuming. Keep required offline fences in place through retries.

## Representation Restamp

Representation restamp (DMS-1569) corrects composed API or stream bytes after a
materializer/composer correction, without changing domain fields, keys, or
deletion history. It advances `ContentVersion` and regenerates
`ContentLastModifiedAt` so corrected representations become observable.

Stop and verify all target access before preview: API readers and writers,
replicas, projectors, direct-fill paths, bulk/seed loaders, administrative peers,
and external writers. Deploy the corrected code while the target remains
offline, and preserve that fence through execution and every retry.

- `restamp-preview` requires `--offline-writer-admission closedAndDrained` but
  no confirmation token. It creates a durable operation manifest; it is not a
  read-only dry run. Choose mode `tracking` or `disabled` to match durable
  lifecycle, with a clear cache-ahead latch.
- `restamp-execute` requires `--confirm representationRestamp`, the same
  offline admission token, and the previewed operation ID. On incomplete
  execution, resume with that same target and operation ID, not a new preview.

A completed tracking-mode operation means projection work was queued, not that
projection or Kafka delivery has finished. Disabled mode completes canonical
restamping only. Follow the release README's full
[representation-restamp procedure](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/src/dms/clis/EdFi.DataManagementService.DocumentCacheAdmin/README.md#representation-restamp)
for preview, execution, verification, and the CDC handoff before restoring
service.
