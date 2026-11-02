---
sidebar_position: 4
description: How to provision the Ed-Fi API database schema with the api-schema-tools CLI.
---

# Database Provisioning

Before the Ed-Fi API can serve requests, its database schema must be
provisioned. The combination of the core Ed-Fi Data Standard and any installed
extensions makes up the **effective API schema**. Provisioning creates the
tables, indexes, triggers, sequences, and authorization structures that back the
Ed-Fi Resources and Descriptors APIs.

Ed-Fi API v8 uses two databases, or two schemas within a single database (see
[Getting Started -
Appendix](../../getting-started/getting-started-appendix.md)), and each is
provisioned differently:

| Database | Provisioning |
| --- | --- |
| **Configuration Service** (`dmscs` schema) | Deployed automatically on startup when `DeployDatabaseOnStartup` is `true` (the default; set via the `CONFIGURATION_SERVICE_DEPLOY_DATABASE` environment variable). No manual step is required. |
| **Ed-Fi API** (resource data) | Provisioned explicitly with the `api-schema-tools` CLI. The API container does **not** deploy or migrate this schema on startup. |

:::info

The Ed-Fi API validates (but does not create) its schema on first use of a
selected resource database, not at startup. Until that database has been
provisioned, data-resource requests against it respond with **HTTP 503** (the
Discovery API and health endpoint remain available); the result is cached per
database until the service restarts. See [Schema Fingerprint
Validation](#schema-fingerprint-validation) below.

:::

## Database Requirements

The Ed-Fi API and the Configuration Service run on either PostgreSQL or SQL
Server. For SQL Server, use SQL Server 2025 or later.

On PostgreSQL, the two services have different minimum versions:

| Service | Minimum PostgreSQL version |
| --- | --- |
| **Ed-Fi API** | PostgreSQL 18, with a UTF-8 database encoding |
| **Configuration Service** | PostgreSQL 15 |

If both services use the same database server, it must meet the Ed-Fi API
requirement. The provided Docker Compose files use PostgreSQL 18.

The Ed-Fi API needs a UTF-8 database because descriptor identity depends on
PostgreSQL's built-in `pg_c_utf8` collation, which exists only in UTF-8
databases. PostgreSQL can't change the encoding of an existing database; a
database that isn't UTF-8 has to be re-created as UTF-8.

`api-schema-tools ddl provision` checks the server version and the target
database's encoding before it runs any DDL. With `--create-database`, it also
checks the encoding of the server's `template1` database when the target
database doesn't exist yet, and creates the database as UTF-8. If a check fails,
provisioning stops before anything is created, and the error message names the
value that failed.

On PostgreSQL 14 or earlier, the Configuration Service's database deployment
fails, because it uses constraints those versions don't support. With
`DeployDatabaseOnStartup` enabled (the default), the service logs the failure
and doesn't start.

## Provisioning in a Local (Getting Started) Environment

For local development, provisioning is fully automated. The
`bootstrap-local-dms.ps1` script orchestrates the full provisioning phase for
you — you do not need to run `api-schema-tools` directly. See [Getting
Started](../../getting-started/readme.md) for the guided walkthrough.

The rest of this page describes the `api-schema-tools` CLI, which is what you
use for production or other non-scripted deployments.

## Installation

`api-schema-tools` is published as a .NET global tool on the Ed-Fi Azure
Artifacts feed. See [Package
Releases](../../getting-started/package-releases.md#ed-fi-api-v810-packages)
for the current published version.

```powershell
$feed = "https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json"
$version = "<published-version>"
dotnet tool install --global EdFi.Api.SchemaTools --source $feed --version $version
```

Omit `--version $version` to install the latest stable release. The installed
command is `api-schema-tools`.

To build from source instead, run:

```powershell
dotnet build src/dms/clis/EdFi.DataManagementService.SchemaTools
```

## The `api-schema-tools` CLI

`api-schema-tools` is a command-line tool that generates deterministic SQL from
one or more `ApiSchema.json` inputs and, optionally, executes it against a
database. It provides these commands:

| Command | Purpose |
| --- | --- |
| `hash` | Compute the effective schema hash (the fingerprint; see [Schema Fingerprint Validation](#schema-fingerprint-validation)) for a set of schemas |
| `ddl emit` | Generate DDL scripts and manifests to a directory (no database connection) |
| `ddl provision` | Generate DDL **and** execute it against a target database |
| `ddl re-stamp` | Update the stored schema fingerprint after a validated physical migration |
| `cdc` | Manage change data capture (CDC) event streaming for a provisioned database |

Add `--verbose` (`-v`) to `hash`, `ddl emit`, or `ddl provision` for
debug-level logging. It also writes a daily `logs/api-schema-tools*.log` file
under the current directory.

The `--schema` inputs are the same `ApiSchema.json` files the Ed-Fi API loads at
runtime: the core Ed-Fi Data Standard schema followed by any extension schemas
produced by MetaEd. The first `--schema` path is the core schema; the rest are
extensions. See [Extending API
DataModel](../extensibility-customization/extending-api-datamodel.md) and the
`AppSettings:ApiSchema:Path` setting in [Configuration
Details](../configuration/configuration-details) for how the runtime locates
these files.

### Computing the schema fingerprint (`hash`)

`hash` loads one or more `ApiSchema.json` files, normalizes them, and prints
the effective schema hash (SHA-256, lowercase hex).

```powershell
api-schema-tools hash <coreSchemaPath> [extensionSchemaPath...]
```

| Argument | Required | Description |
| --- | --- | --- |
| `coreSchemaPath` | Yes | Path to the core `ApiSchema.json` file |
| `extensionSchemaPath` | No | Path(s) to extension `ApiSchema.json` file(s) |

```powershell
# Core schema only
api-schema-tools hash core/ApiSchema.json

# Core + extension
api-schema-tools hash core/ApiSchema.json extensions/tpdm/ApiSchema.json
```

The hash printed here is the same fingerprint stored in `dms.EffectiveSchema`
after provisioning, and the value the Ed-Fi API checks on first use of the
database.

### Provisioning a database (`ddl provision`)

`ddl provision` generates the DDL for a single dialect and executes it inside
one transaction against the target database.

```powershell
api-schema-tools ddl provision --schema <paths...> --connection-string <connstr> --dialect <dialect> [--create-database] [--timeout <seconds>]
```

| Option | Short | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `--schema` | `-s` | Yes | — | `ApiSchema.json` path(s). The first is core; the rest are extensions. |
| `--connection-string` | `-c` | Yes | — | ADO.NET connection string for the target database. |
| `--dialect` | `-d` | Yes | — | SQL dialect: `pgsql` or `mssql`. `both` is not accepted — provision one database at a time. |
| `--create-database` | — | No | `false` | Create the target database if it does not already exist. |
| `--timeout` | `-t` | No | `300` | DDL execution timeout, in seconds. |

`ddl provision` also has options for the managed change data capture (CDC)
workflow, which streams data changes to Kafka. If you don't use event
streaming, leave them out. See [Event Streaming with
Kafka](../features/event-streaming-kafka-cdc.md).

:::warning

On PostgreSQL, provisioning uses a locked-down `NOLOGIN` role,
`edfi_dms_enqueue_owner`; it's not a login the Ed-Fi API uses at runtime. If
the role doesn't exist yet, provisioning creates it, so the login in the
connection string must be `SUPERUSER` or have `CREATEROLE`. If the role
already exists, a login that isn't `SUPERUSER` needs a direct membership in
it instead:

```sql
GRANT edfi_dms_enqueue_owner TO <login> WITH SET TRUE, INHERIT FALSE, ADMIN FALSE;
```

Otherwise provisioning stops before it creates any schema objects, and the
error names the missing capability.

:::

**PostgreSQL:**

```powershell
api-schema-tools ddl provision `
  --schema core/ApiSchema.json `
  --connection-string "Host=localhost;Port=5432;Database=edfi_datamanagementservice;Username=postgres;Password=<secret>" `
  --dialect pgsql `
  --create-database
```

**SQL Server:**

```powershell
api-schema-tools ddl provision `
  -s core/ApiSchema.json `
  -c "Server=localhost;Initial Catalog=edfi_datamanagementservice;User Id=sa;Password=<secret>;TrustServerCertificate=true" `
  -d mssql `
  --create-database
```

To include extensions, pass additional `--schema` paths in the same order the
Ed-Fi API loads them:

```powershell
api-schema-tools ddl provision `
  -s core/ApiSchema.json `
  -s extensions/tpdm/ApiSchema.json `
  -c "Host=localhost;Database=edfi_datamanagementservice;Username=postgres;Password=<secret>" `
  -d pgsql --create-database
```

:::info

On SQL Server, `ddl provision` enables Read Committed Snapshot Isolation (RCSI)
on databases it creates, and warns if RCSI is disabled on an existing database.
RCSI is recommended for the Ed-Fi API workload.

:::

Provisioning also creates the document cache tables, even if you don't enable
the [document cache](../features/document-cache.md).

### Previewing DDL without a database (`ddl emit`)

To review the generated SQL before applying it — for example, to check it into
source control or run it through a separate migration process — use `ddl emit`,
which writes the scripts and manifests to a directory without connecting to a
database:

```powershell
api-schema-tools ddl emit --schema core/ApiSchema.json --output ./ddl-output
```

| Option | Short | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `--schema` | `-s` | Yes | — | `ApiSchema.json` path(s). The first is core; the rest are extensions. |
| `--output` | `-o` | Yes | — | Output directory. It must be new or empty; `ddl emit` fails rather than mix new files with old ones. |
| `--dialect` | `-d` | No | `both` | SQL dialect: `pgsql`, `mssql`, or `both`. |
| `--ddl-manifest` | — | No | `false` | Also write `ddl.manifest.json`, a diagnostic summary with the SHA-256 hash and statement count of the SQL for each dialect. |

With the default `--dialect both`, the output contains `pgsql.sql` and
`mssql.sql`. The output also includes a relational-model manifest per dialect
(`relational-model.<dialect>.manifest.json`) and an
`effective-schema.manifest.json` describing the schema fingerprint. The SQL
scripts don't include a transaction wrapper; if you apply them yourself, add
one. For a fixed set of schema inputs, dialect, and mapping version, the output
is byte-for-byte identical across runs.

### Recording a validated migration (`ddl re-stamp`)

You rarely need `ddl re-stamp`. Use it only when a release's upgrade
instructions tell you to migrate an existing database in place; otherwise
provision a fresh database (see [Upgrading the Schema](#upgrading-the-schema)).

`ddl re-stamp` updates the fingerprint stored in `dms.EffectiveSchema` after you
have migrated an existing database's physical schema yourself and validated the
result. It doesn't run any migration DDL.

:::danger

`ddl re-stamp` tells the Ed-Fi API that the database matches the new schema,
but it doesn't check that the tables actually match. If the migration is
incomplete, the Ed-Fi API can fail or return wrong data.

:::

```powershell
api-schema-tools ddl re-stamp --schema <paths...> --connection-string <connstr> --dialect <dialect> [--migration-completed] [--timeout <seconds>]
```

`--schema`, `--connection-string`, `--dialect`, and `--timeout` work as they do
for `ddl provision`. Use the `api-schema-tools` build from the same release as
the target Ed-Fi API, with that deployment's exact core and extension schemas.
The login needs:

- `SELECT` on `dms.EffectiveSchema`, `dms.SchemaComponent`, and
  `dms.ResourceKey`
- `UPDATE` on `dms.EffectiveSchema`
- `DELETE` and `INSERT` on `dms.SchemaComponent`
- On PostgreSQL, permission to lock `dms.ResourceKey` as well (for example,
  `MAINTAIN` on that table), because the command locks all three tables

How the command behaves:

- If the stored fingerprint already matches, the command changes nothing and
  prints the hash.
- If it differs, the command updates it only when you pass
  `--migration-completed` to confirm the migration is done.
- It only accepts changes that keep the same resources, projects, and versions.
  Adding or removing resources or projects, or changing their versions, is
  rejected.

To migrate a database in place:

1. Note the hash the new Ed-Fi API version expects. When it handles a data
   request against the unmigrated database, it returns `503` and logs
   `EffectiveSchemaHash mismatch for data store … database has <hash>, process
   expects <hash>`. The second hash is the expected one.
2. Stop the Ed-Fi API and any CDC workers. Keep them stopped until the last
   step.
3. Apply the migration from the release's upgrade instructions.
4. Validate the migrated schema yourself. Neither `ddl re-stamp` nor
   `ddl provision` checks every table.
5. Run `ddl re-stamp` with `--migration-completed`.
6. Compare the hash the command prints with the expected hash from step 1. If
   they differ, keep the services stopped and check that the tool comes from
   the same release as the Ed-Fi API and that you passed the same schema files.
7. If the release's upgrade instructions say API response formats changed,
   run the DocumentCache representation restamp (see the [DocumentCacheAdmin
   README](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/main/src/dms/clis/EdFi.DataManagementService.DocumentCacheAdmin/README.md#representation-restamp)).
   Re-stamp keeps cached documents, and restarting doesn't clear them.
8. Run `ddl provision` against the database, restart the services, and test the
   affected API operations before you reopen traffic.

If provisioning fails, the new fingerprint stays recorded; keep the services
stopped until the migration is fixed.

### Change data capture (`cdc`)

The `cdc` commands set up and operate the background workers that stream data
changes to Kafka, for a database provisioned through the managed CDC workflow.
If you don't use event streaming, you don't need them. See [Event Streaming with
Kafka](../features/event-streaming-kafka-cdc.md).

### Exit codes

| Code | Meaning |
| --- | --- |
| `0` | Success |
| `1` | Failure: invalid arguments, missing files, schema validation errors, or a failed database operation |
| `2` | Invalid arguments (`cdc` commands only) |
| `130` | Cancelled (`cdc` commands and managed CDC provisioning only) |

Errors are written to standard error. The `cdc` commands write one JSON result
to standard output, including on failure, and all diagnostics to standard
error.

## Schema Fingerprint Validation

At provisioning time, `api-schema-tools` records a **fingerprint** of the
effective schema in a single row of the `dms.EffectiveSchema` table. The
Ed-Fi API reads this fingerprint on first use and compares it to the schema it
loaded, guaranteeing that the running service and the database agree on exactly
one effective schema.

The check runs before any data-resource request is served:

- If the resource database has **not been provisioned** (no
  `dms.EffectiveSchema` row), requests receive **HTTP 503**. Run `ddl provision`
  to initialize the schema.
- If the stored fingerprint **does not match** the schema the service loaded,
  requests receive **HTTP 503** with a message indicating the database was
  provisioned for a different effective schema.

:::warning

First-use validation results are cached for the lifetime of the Ed-Fi API
process. Provisioning (or re-provisioning) the database after the service has
already tried to use it does **not** clear a 503 — you must also **restart the
Ed-Fi API process**.

:::

The generated DDL also protects the database at provisioning time: if you run
`ddl provision` against a database that already holds a _different_ effective
schema, provisioning aborts before making any changes. You cannot accidentally
re-provision an existing database for a different schema.

## Upgrading the Schema

Any change to the effective schema — upgrading the Ed-Fi Data Standard version,
adding or changing an extension, or a new relational mapping version — produces
a new fingerprint. `api-schema-tools` doesn't migrate an existing database, so
the standard upgrade is to provision a **fresh database** for the new schema,
re-load data through the Ed-Fi API, then point the service at the new database
and restart it. See [No In-Place Database
Migration](../../whats-new/release-notes.md#no-in-place-database-migration) in
the release notes for the rationale.

Only when a release's upgrade instructions call for an in-place migration (a
change that keeps the same resources and versions), use [`ddl
re-stamp`](#recording-a-validated-migration-ddl-re-stamp) to record the new
fingerprint once the migration is validated.
