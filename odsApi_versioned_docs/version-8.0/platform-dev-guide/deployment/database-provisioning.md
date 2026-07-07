---
sidebar_position: 1
description: How to provision the Ed-Fi API v8.0 database schema with the dms-schema CLI.
---

# Database Provisioning

Before the Ed-Fi API can serve requests, its database schema must be provisioned
for the **effective API schema** — the combination of the core Ed-Fi Data
Standard and any installed extensions. Provisioning creates the tables, indexes,
triggers, sequences, and authorization structures that back the Ed-Fi Resources
and Descriptors APIs.

Ed-Fi API v8.0 uses two databases — or two schemas within one database (see
[Getting Started - Appendix](../../getting-started/getting-started-appendix.md))
— and each is provisioned differently:

| Database | Provisioning |
| --- | --- |
| **Configuration Service** (`dmscs` schema) | Deployed automatically on startup when `DeployDatabaseOnStartup` is `true` (the default; set via the `DMS_CONFIG_DEPLOY_DATABASE` environment variable). No manual step is required. |
| **Ed-Fi API** (resource data) | Provisioned explicitly with the `dms-schema` CLI. The DMS container does **not** deploy or migrate this schema on startup. |

:::info

The Ed-Fi API validates — but does not create — its schema at startup. Until the
resource database has been provisioned, the API responds with **HTTP 503**. See
[Schema Fingerprint Validation](#schema-fingerprint-validation) below.

:::

## Provisioning in a Local (Getting Started) Environment

For local development, provisioning is fully automated. The
`start-local-dms.ps1` script orchestrates the provisioning phase for you, and
`configure-local-data-store.ps1` registers the data store — you do not need to
run the `dms-schema` CLI directly. See [Getting
Started](../../getting-started/readme.md) for the guided walkthrough.

The rest of this page describes the underlying `dms-schema` tooling, which is
what you use for a production or other non-scripted deployment.

## The `dms-schema` CLI

`dms-schema` is a command-line tool that generates deterministic SQL from one or
more `ApiSchema.json` inputs and, optionally, executes it against a database. It
provides three commands:

| Command | Purpose |
| --- | --- |
| `hash` | Compute the effective schema hash (fingerprint) for a set of schemas |
| `ddl emit` | Generate DDL scripts and manifests to a directory (no database connection) |
| `ddl provision` | Generate DDL **and** execute it against a target database |

The `--schema` inputs are the same `ApiSchema.json` files the DMS loads at
runtime: the core Ed-Fi Data Standard schema followed by any extension schemas
produced by MetaEd. The first `--schema` path is the core schema; the rest are
extensions. See [Extending with
MetaEd](../extensibility/extending-with-metaed.md) and the `ApiSchemaPath`
setting in [Configuration Details](../configuration/configuration-details) for
how the runtime locates these files.

### Provisioning a database (`ddl provision`)

`ddl provision` generates the DDL for a single dialect and executes it inside
one transaction against the target database.

```bash
dms-schema ddl provision --schema <paths...> --connection-string <connstr> --dialect <dialect> [--create-database] [--timeout <seconds>]
```

| Option | Short | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `--schema` | `-s` | Yes | — | `ApiSchema.json` path(s). The first is core; the rest are extensions. |
| `--connection-string` | `-c` | Yes | — | ADO.NET connection string for the target database. |
| `--dialect` | `-d` | Yes | — | SQL dialect: `pgsql` or `mssql`. `both` is not accepted — provision one database at a time. |
| `--create-database` | — | No | `false` | Create the target database if it does not already exist. |
| `--timeout` | `-t` | No | `300` | DDL execution timeout, in seconds. |

**PostgreSQL:**

```bash
dms-schema ddl provision \
  --schema core/ApiSchema.json \
  --connection-string "Host=localhost;Port=5432;Database=edfi_datamanagementservice;Username=postgres;Password=<secret>" \
  --dialect pgsql \
  --create-database
```

**SQL Server:**

```bash
dms-schema ddl provision \
  -s core/ApiSchema.json \
  -c "Server=localhost;Initial Catalog=edfi_datamanagementservice;User Id=sa;Password=<secret>;TrustServerCertificate=true" \
  -d mssql \
  --create-database
```

To include extensions, pass additional `--schema` paths in the same order the
DMS loads them:

```bash
dms-schema ddl provision \
  -s core/ApiSchema.json \
  -s extensions/tpdm/ApiSchema.json \
  -c "Host=localhost;Database=edfi_datamanagementservice;Username=postgres;Password=<secret>" \
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

```bash
dms-schema ddl emit --schema core/ApiSchema.json --output ./ddl-output --dialect both
```

This produces `pgsql.sql` and/or `mssql.sql`, a relational-model manifest per
dialect, and an `effective-schema.manifest.json` describing the schema
fingerprint. For a fixed set of schema inputs, dialect, and mapping version, the
output is byte-for-byte identical across runs.

## Schema Fingerprint Validation

At provisioning time, `dms-schema` records a **fingerprint** of the effective
schema in a single row of the `dms.EffectiveSchema` table. The Data Management
Service reads this fingerprint on first use and compares it to the schema it
loaded, guaranteeing that the running service and the database agree on exactly
one effective schema.

The check runs before any request is served:

- If the resource database has **not been provisioned** (no
  `dms.EffectiveSchema` row), requests receive **HTTP 503**. Run `ddl provision`
  to initialize the schema.
- If the stored fingerprint **does not match** the schema the service loaded,
  requests receive **HTTP 503** with a message indicating the database was
  provisioned for a different effective schema.

:::warning

First-use validation results are cached for the lifetime of the DMS process.
Provisioning (or re-provisioning) the database after the service has already
tried to use it does **not** clear a 503 — you must also **restart the DMS
process**.

:::

The generated DDL also protects the database at provisioning time: if you run
`ddl provision` against a database that already holds a _different_ effective
schema, provisioning aborts before making any changes. You cannot accidentally
re-provision an existing database for a different schema.

## Upgrading the Schema

Any change to the effective schema — upgrading the Ed-Fi Data Standard version,
adding or changing an extension, or adopting a new relational mapping version — produces
a new fingerprint. Because there is **no in-place migration path**, an upgrade
is performed by provisioning a **fresh database** for the new schema, re-loading
data through the Ed-Fi API, then pointing the service at the new database and
restarting it. See [No In-Place Database
Migration](../../whats-new/release-notes.md#no-in-place-database-migration) in
the release notes for the rationale.
