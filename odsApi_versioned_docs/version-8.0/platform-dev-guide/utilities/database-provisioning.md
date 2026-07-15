---
sidebar_position: 4
description: How to provision the Ed-Fi API v8.0 database schema with the api-schema-tools CLI.
---

# Database Provisioning

Before the Ed-Fi API can serve requests, its database schema must be
provisioned. The combination of the core Ed-Fi Data Standard and any installed
extensions makes up the **effective API schema**. Provisioning creates the
tables, indexes, triggers, sequences, and authorization structures that back the
Ed-Fi Resources and Descriptors APIs.

Ed-Fi API v8.0 uses two databases, or two schemas within a single database (see
[Getting Started -
Appendix](../../getting-started/getting-started-appendix.md)), and each is
provisioned differently:

| Database | Provisioning |
| --- | --- |
| **Configuration Service** (`dmscs` schema) | Deployed automatically on startup when `DeployDatabaseOnStartup` is `true` (the default; set via the `DMS_CONFIG_DEPLOY_DATABASE` environment variable). No manual step is required. |
| **Ed-Fi API** (resource data) | Provisioned explicitly with the `api-schema-tools` CLI. The API container does **not** deploy or migrate this schema on startup. |

:::info

The Ed-Fi API validates (but does not create) its schema on first use of a
selected resource database, not at startup. Until that database has been
provisioned, data-resource requests against it respond with **HTTP 503** (the
Discovery API and health endpoint remain available); the result is cached per
database until the service restarts. See [Schema Fingerprint
Validation](#schema-fingerprint-validation) below.

:::

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
Releases](../../getting-started/package-releases#ed-fi-api-v800-packages)
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
database. It provides three commands:

| Command | Purpose |
| --- | --- |
| `hash` | Compute the effective schema hash (fingerprint) for a set of schemas |
| `ddl emit` | Generate DDL scripts and manifests to a directory (no database connection) |
| `ddl provision` | Generate DDL **and** execute it against a target database |

The `--schema` inputs are the same `ApiSchema.json` files the Ed-Fi API loads at
runtime: the core Ed-Fi Data Standard schema followed by any extension schemas
produced by MetaEd. The first `--schema` path is the core schema; the rest are
extensions. See [Extending with
MetaEd](../extensibility/extending-with-metaed.md) and the `ApiSchemaPath`
setting in [Configuration Details](../configuration/configuration-details) for
how the runtime locates these files.

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

### Previewing DDL without a database (`ddl emit`)

To review the generated SQL before applying it — for example, to check it into
source control or run it through a separate migration process — use `ddl emit`,
which writes the scripts and manifests to a directory without connecting to a
database:

```powershell
api-schema-tools ddl emit --schema core/ApiSchema.json --output ./ddl-output
```

The `--dialect` option defaults to `both`, producing `pgsql.sql` and
`mssql.sql`. Pass `--dialect pgsql` or `--dialect mssql` to generate only one.
The output also includes a relational-model manifest per dialect and an
`effective-schema.manifest.json` describing the schema fingerprint. For a fixed
set of schema inputs, dialect, and mapping version, the output is byte-for-byte
identical across runs.

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
a new fingerprint. Because there is **no in-place migration path**, an upgrade
is performed by provisioning a **fresh database** for the new schema, re-loading
data through the Ed-Fi API, then pointing the service at the new database and
restarting it. See [No In-Place Database
Migration](../../whats-new/release-notes.md#no-in-place-database-migration) in
the release notes for the rationale.
