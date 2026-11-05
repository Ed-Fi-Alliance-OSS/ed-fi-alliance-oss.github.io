# Data Store Management Configuration

## Overview

Data store management lets an Admin API client create and delete ODS databases
through the API, instead of provisioning them by hand. Admin API writes the
instance record, then a background job provisions the database from a template
and reports progress back through the API.

The feature is enabled by default and spans several `AppSettings` keys. Two of
them — the SQL Server backup file paths — have no usable default, so
provisioning fails until they are set.

The endpoint names differ by `adminApiMode`:

| Mode | Management endpoints | Terminology |
| --- | --- | --- |
| `v2` | `/v2/odsInstances/manage` | ODS Instance |
| `v3` | `/v3/dataStores/manage` | Data Store |

The behavior, the settings, and the status values are identical in both modes.
This article uses the v2 paths in examples; substitute
`/v3/dataStores/manage` when running in v3 mode.

:::info

Data store management provisions ODS databases only. It does not create the
`EdFi_Admin` or `EdFi_Security` databases, which must already exist.

:::

## Enabling and Disabling the Feature

### EnableDataStoreManagement

**Type:** `boolean`
**Default:** `true`
**Purpose:** Master switch for the entire feature.

```json
"AppSettings": {
  "EnableDataStoreManagement": true
}
```

When set to `false`, two things happen:

* The management endpoints — `POST`, `DELETE`, `GET` (list), and `GET` (by id)
  under `/v2/odsInstances/manage` — reject every request with a validation
  error reading "This endpoint has been disabled on application settings." The
  routes still exist and still require authentication; they simply refuse to do
  any work.
* The create and delete dispatcher jobs are not scheduled at startup. Any
  instance records left in a pending state stay there until the feature is
  turned back on.

Turning the feature off does not delete existing instance records, and it does
not drop any database that was already provisioned.

:::warning

Disabling the feature while instances are mid-provision leaves those records
stranded in `PendingCreate` or `CreateInProgress`. Let in-flight work finish
before turning the switch off.

:::

### Docker Equivalent

In the Docker Compose deployments the switch is exposed as the
`ENABLE_DATA_STORE_MANAGEMENT` environment variable, which the compose files
map onto `AppSettings__EnableDataStoreManagement`:

```properties
ENABLE_DATA_STORE_MANAGEMENT=true
```

The variable appears in `env.example` for both the PostgreSQL and SQL Server
compose directories. If it is not set, the compose files default it to `true`,
matching the `appsettings.json` default.

## Database Template Settings

Provisioning copies an existing template database rather than building a schema
from scratch. How that copy is made depends on the database engine, and only
SQL Server needs configuration.

### PostgreSQL

PostgreSQL deployments need no additional settings. The provisioner issues a
`CREATE DATABASE ... TEMPLATE ...` statement against the template database
directly, so the template only has to exist on the server reached by the
`ConnectionStrings:EdFi_Master` connection string.

### SQL Server

SQL Server has no `TEMPLATE` clause, so the provisioner restores a backup file
instead. The path to each backup has to be configured explicitly.

#### SqlServerMinimalBakFile

**Type:** `string`
**Default:** `""` (empty)
**Purpose:** Filesystem path to the backup of the minimal template database,
used when a request specifies `"databaseTemplate": "Minimal"`.

#### SqlServerSampleBakFile

**Type:** `string`
**Default:** `""` (empty)
**Purpose:** Filesystem path to the backup of the populated sample template
database, used when a request specifies `"databaseTemplate": "Sample"`.

```json
"AppSettings": {
  "SqlServerMinimalBakFile": "C:\\EdFi\\Backups\\Ods_Minimal_Template.bak",
  "SqlServerSampleBakFile": "C:\\EdFi\\Backups\\Ods_Populated_Template.bak"
}
```

These two settings are the most common cause of a failed provision. Both ship
empty, and an empty value is not a working default: when the provisioner needs
a backup path that has not been configured, it fails with

> `AppSettings:SqlServerMinimalBakFile` is not configured. A SQL Server backup
> file path is required to copy a sandbox database.

The request itself still returns `202 Accepted`. The failure surfaces later, on
the instance's status, because provisioning is asynchronous.

:::warning

The path is read by SQL Server, not by Admin API, so it must be reachable from
the database server and readable by the SQL Server service account. On a remote
database server, a path that is local to the Admin API host will not resolve.

:::

The template databases these backups are taken from are named
`Ods_Minimal_Template` and `Ods_Populated_Template`.

## Background Job Settings

Creating and deleting instances is handled by background dispatcher jobs rather
than inline in the request. Each dispatcher sweeps for records left in a pending
state and retries work that did not complete.

| Setting | Default | Purpose |
| --- | --- | --- |
| `CreateOdsInstanceManagesSweepIntervalInMins` | `120` | How often the create dispatcher looks for instances awaiting provisioning. |
| `CreateOdsInstanceManagesMaxRetryAttempts` | `3` | How many times a create is retried before it is marked as permanently failed. |
| `DeleteOdsInstanceManagesSweepIntervalInMins` | `120` | How often the delete dispatcher looks for instances awaiting deletion. |
| `DeleteOdsInstanceManagesMaxRetryAttempts` | `3` | How many times a delete is retried before it is marked as permanently failed. |

```json
"AppSettings": {
  "CreateOdsInstanceManagesSweepIntervalInMins": 120,
  "CreateOdsInstanceManagesMaxRetryAttempts": 3,
  "DeleteOdsInstanceManagesSweepIntervalInMins": 120,
  "DeleteOdsInstanceManagesMaxRetryAttempts": 3
}
```

The sweep interval is the recovery path, not the normal one. A `POST` or
`DELETE` schedules its own job to start immediately, so a healthy request does
not wait for the next sweep. The dispatcher exists to pick up work that was
interrupted — for example, a create that was still pending when the application
restarted.

:::warning

A sweep interval that is missing or not a number disables that dispatcher
entirely. Admin API parses these two values at startup to decide whether to
schedule the dispatcher at all. If parsing fails, it logs "Invalid value for
CreateOdsInstanceManagesSweepIntervalInMins" and the job is never registered.
Requests still succeed and still schedule their own jobs, but nothing will ever
retry interrupted work. Leave both keys present and numeric.

:::

In v3 mode the dispatchers are named for data stores, but they read these same
`CreateOdsInstanceManages*` and `DeleteOdsInstanceManages*` keys. There is no
separate `DataStoreManages*` setting.

## Education Organization Refresh and Parallelism

### EdOrgsRefreshIntervalInMins

**Type:** `integer`
**Default:** `60`
**Purpose:** How often Admin API refreshes its cached view of the education
organizations in each ODS instance.

Admin API reads education organizations from every connected ODS so they can be
assigned to applications. The refresh job keeps that list current as the ODS
databases change. As with the sweep intervals, a missing or non-numeric value
prevents the refresh job from being scheduled.

### MaxDegreeOfParallelism

**Type:** `integer`
**Default:** `10`
**Purpose:** Caps how many ODS instances the education organization refresh
queries at once.

```json
"AppSettings": {
  "EdOrgsRefreshIntervalInMins": 60,
  "MaxDegreeOfParallelism": 10
}
```

With many instances, the refresh opens a connection per instance up to this cap.
Lower it if the refresh puts more load on the database server than you want;
raise it only if the refresh cannot finish within its interval.

## Asynchronous Creation and Deletion

Provisioning a database takes longer than an HTTP request should, so creation
and deletion are asynchronous. Both return `202 Accepted` with a job
identifier, and the caller reads the outcome afterward.

### Creating an Instance

```http
POST /v2/odsInstances/manage
Authorization: bearer ....
Content-Type: application/json

{
  "name": "District_2026",
  "databaseTemplate": "Minimal"
}
```

The response carries the queued job identifier, and a `Location` header points
at the new instance record:

```json
{
  "jobId": "CreateInstanceJob-1_9b1deb4d3b7d4bad9bdd2b0d7b3dcb6d",
  "message": "The ODS Instance has been queued to be created."
}
```

A `202` means the record was written and the work was queued. It does not mean
the database exists yet.

### Deleting an Instance

```http
DELETE /v2/odsInstances/manage/1
Authorization: bearer ....
```

```json
{
  "jobId": "DeleteInstanceJob-1_9b1deb4d3b7d4bad9bdd2b0d7b3dcb6d",
  "message": "The ODS Instance has been queued to be deleted."
}
```

A delete is rejected while the instance is in a transitional state — while it is
being provisioned, while a previous delete is already queued, or after a
permanent failure that needs manual cleanup. The validation message names the
state, for example "OdsInstanceManage is being provisioned. Wait for creation to
complete."

### Checking Progress

There are two ways to follow the work, and they answer different questions.

Read the **instance record** to find out where provisioning stands:

```http
GET /v2/odsInstances/manage/1
Authorization: bearer ....
```

Its `status` property moves through `PendingCreate`, `CreateInProgress`, and
then either `Created` or `CreateFailed`. The record also carries the generated
`databaseName`, which is worth checking the first time you use the feature.

Read the **job** to find out what the background worker did, including the error
text when something went wrong:

```http
GET /v2/jobs/CreateInstanceJob-1_9b1deb4d3b7d4bad9bdd2b0d7b3dcb6d
Authorization: bearer ....
```

```json
{
  "jobId": "CreateInstanceJob-1_9b1deb4d3b7d4bad9bdd2b0d7b3dcb6d",
  "status": "Completed",
  "createdAt": "2025-01-15T10:30:00Z",
  "finishedAt": "2025-01-15T10:32:14Z",
  "errorMessage": null
}
```

In v3 mode the job endpoint is `GET /v3/jobs/{jobId}`.

### Status Values

| Status | Meaning |
| --- | --- |
| `PendingCreate` | Record written; provisioning has not started. |
| `CreateInProgress` | The database is being provisioned. |
| `Created` | The database exists and is ready to use. |
| `CreateFailed` | Provisioning failed and will be retried automatically. |
| `CreateError` | Provisioning failed permanently. Manual database cleanup is required. |
| `PendingDelete` | Deletion is queued. |
| `DeleteInProgress` | The database is being dropped. |
| `Deleted` | The database has been dropped. |
| `DeleteFailed` | Deletion failed and will be retried automatically. |
| `DeleteError` | Deletion failed permanently. Manual database cleanup is required. |

The distinction between `*Failed` and `*Error` is retry exhaustion.
`CreateFailed` means the dispatcher will try again on its next sweep;
`CreateError` means it has used all `CreateOdsInstanceManagesMaxRetryAttempts`
and stopped. An instance in `CreateError` or `DeleteError` needs an
administrator to inspect the database server before the record can be cleared.

## Instance Naming Rules

The `name` on a create request is not the database name. Admin API derives the
database name from it:

```text
EdFi_Ods_{name}_{databaseTemplate}
```

Spaces in the name become underscores, and a leading `EdFi_Ods` is stripped if
the caller already included one. So `District_2026` with the `Minimal` template
produces `EdFi_Ods_District_2026_Minimal`.

Two rules apply to the name:

* **46 characters or fewer.** PostgreSQL caps identifiers at 63 characters, and
  Admin API applies that ceiling on every engine so the stored `databaseName`
  always matches the database that actually gets created. The fixed parts of the
  generated name — the `EdFi_Ods_` prefix, the separator, and the longest
  template suffix `Minimal` — take 17 characters, which leaves 46. A longer name
  is rejected with a validation error rather than silently truncated.
* **Letters, numbers, spaces, and underscores only.** Anything else is rejected.

The name must also be unique. Admin API rejects a name already used by another
managed instance that has not been deleted, or by any existing ODS instance.

`databaseTemplate` accepts `Minimal` or `Sample`. Any other value is rejected,
and the error message lists the allowed values.

:::tip

Keep names well under the limit. The 46-character cap is the point at which a
request is refused, not a target — short names keep the generated database names
readable on the database server.

:::

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Every management request returns "This endpoint has been disabled on application settings." | `EnableDataStoreManagement` is `false`. |
| `202 Accepted`, then the instance sits in `CreateFailed` on SQL Server | `SqlServerMinimalBakFile` or `SqlServerSampleBakFile` is empty, or the path is not reachable from the database server. |
| Instances stuck in `PendingCreate` and never picked up | The create sweep interval is missing or non-numeric, so the dispatcher was never scheduled. Check the startup log for "Invalid value for CreateOdsInstanceManagesSweepIntervalInMins". |
| Create rejected before any job is queued | A validation failure: name too long, invalid characters, a duplicate name, or an unrecognized `databaseTemplate`. |
| Delete rejected with a message about provisioning | The instance is in a transitional state. Wait for the current operation to finish. |
| Education organizations missing from application assignment | The refresh job is not running, or has not run since the ODS changed. Check `EdOrgsRefreshIntervalInMins`. |
