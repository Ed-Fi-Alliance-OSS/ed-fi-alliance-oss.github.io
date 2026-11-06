---
sidebar_position: 4
description: How to provision the Ed-Fi API database schema with the api-schema-tools CLI or restore it from a database template.
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
| **Ed-Fi API** (resource data) | Provisioned explicitly with the `api-schema-tools` CLI, or restored from a [database template](#restoring-a-database-template). The API container does **not** deploy or migrate this schema on startup. |

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
$feed = "https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi%40Release/nuget/v3/index.json"
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
   README](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/v8.1.0/src/dms/clis/EdFi.DataManagementService.DocumentCacheAdmin/README.md#representation-restamp)).
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

## Restoring a Database Template

Instead of provisioning an empty database, you can restore a database template.
A template is a NuGet package that holds an Ed-Fi API database that is already
provisioned and loaded with data:

- _Minimal_ templates contain the Ed-Fi descriptors.
- _Populated_ templates also contain the Ed-Fi Data Standard sample data.

Templates are published for PostgreSQL and SQL Server and for each supported
Data Standard; see [Package
Releases](../../getting-started/package-releases.md#ed-fi-api-v810-packages).
You restore a template with your database engine's own tools, into a new, empty
database. Don't run `ddl provision` against that database first, because the
template already contains the schema.

### Choosing a template

A template works only with the Ed-Fi API it was built for:

- The template's package version must equal the Ed-Fi API version. For example,
  use the `8.1.0` templates with the `8.1.0` Docker images.
- The Ed-Fi API must load the schema packages the template was built with, at
  the versions listed in [Package
  Releases](../../getting-started/package-releases.md#ed-fi-api-v810-schema-packages).
  In a Docker deployment, `SCHEMA_PACKAGES` sets them (see [Loading Schemas from
  Packages](../extensibility-customization/extending-api-datamodel.md#loading-schemas-from-packages)).

| Templates | Schema packages |
| --- | --- |
| Data Standard 5.2 (`*.5.2.0`) | `EdFi.DataStandard52.ApiSchema` and `EdFi.DataStandard52.TPDM.ApiSchema` |
| Data Standard 6.1 (`*.6.1.0`) | `EdFi.DataStandard61.ApiSchema` |

If either doesn't hold, the schema fingerprint stored in the template doesn't
match the Ed-Fi API, and data requests return HTTP 503 (see [Schema Fingerprint
Validation](#schema-fingerprint-validation)).

### Downloading a template

Download the package from the Ed-Fi Azure Artifacts feed and extract it. A
`.nupkg` file is a zip archive. In PowerShell:

```powershell
$package = "EdFi.Api.Populated.Template.PostgreSql.5.2.0"
$version = "8.1.0"
$id = $package.ToLowerInvariant()
$feed = "https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi%40Release/nuget/v3/flat2"
Invoke-WebRequest "$feed/$id/$version/$id.$version.nupkg" -OutFile "$package.zip"
Expand-Archive "$package.zip" -DestinationPath $package
```

The extracted folder holds the database file, `<package>.sql` for PostgreSQL or
`<package>.bak` for SQL Server, and a `restore-manifest.json` file that
describes it.

### Restoring on PostgreSQL

The PostgreSQL templates are plain-text dumps from PostgreSQL 18. Restore them
with `psql` from PostgreSQL 18. The dumps contain `psql` meta-commands and
`COPY` data, so tools that run the file as ordinary SQL can't restore them.

1. Create the `edfi_dms_enqueue_owner` role. Two trigger functions in the
   template, which queue work for the [document
   cache](../features/document-cache.md), are owned by this role and run with
   its rights. A role belongs to the whole PostgreSQL server rather than to one
   database, so the dump doesn't include it, and the restore fails with
   `role "edfi_dms_enqueue_owner" does not exist` until you create it. You need
   the role even if you don't use the document cache or change data capture.

   Run the following once per server, as a superuser or a login with
   `CREATEROLE`, for example with `psql -d postgres`. It's safe to run more than
   once: it creates the role if it's missing, and stops with an error if an
   existing role of that name has more rights than it should.

   ```sql
   DO $$
   DECLARE
       _owner_role oid := pg_catalog.to_regrole('edfi_dms_enqueue_owner');
   BEGIN
       IF _owner_role IS NULL THEN
           CREATE ROLE "edfi_dms_enqueue_owner" WITH NOLOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS;
       ELSIF EXISTS (
           SELECT 1
           FROM pg_catalog.pg_roles roles
           WHERE roles.oid = _owner_role
             AND (roles.rolcanlogin OR roles.rolinherit OR roles.rolsuper OR roles.rolcreatedb OR roles.rolcreaterole OR roles.rolreplication OR roles.rolbypassrls)
       ) THEN
           RAISE EXCEPTION 'PostgreSQL role edfi_dms_enqueue_owner exists but is not locked down as NOLOGIN NOINHERIT NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS. Drop or repair the role before restoring template packages.';
       ELSIF EXISTS (
           SELECT 1
           FROM pg_catalog.pg_auth_members memberships
           WHERE memberships.member = _owner_role
             AND (memberships.admin_option OR memberships.inherit_option OR memberships.set_option)
       ) THEN
           RAISE EXCEPTION 'PostgreSQL role edfi_dms_enqueue_owner must not hold outgoing privilege-bearing memberships before restoring template packages.';
       END IF;
   END
   $$;
   ```

   :::warning

   `edfi_dms_enqueue_owner` must stay a `NOLOGIN` role. Never give it a login or
   a password, and never use it as an Ed-Fi API connection credential.

   :::

2. Create an empty database for the restore. It must use the UTF-8 encoding (see
   [Database Requirements](#database-requirements)).

   ```sql
   CREATE DATABASE edfi_datamanagementservice;
   ```

3. Restore the dump into the new database:

   ```powershell
   psql -h <host> -U <superuser> -d edfi_datamanagementservice `
     -v ON_ERROR_STOP=1 --single-transaction `
     -f EdFi.Api.Populated.Template.PostgreSql.5.2.0.sql
   ```

   Run the restore as a superuser. The dump ends by making
   `edfi_dms_enqueue_owner` the owner of the two trigger functions. That role
   can't create objects in the `dms` schema, and in that case PostgreSQL lets
   only a superuser change a function's owner. A login that isn't a superuser
   fails there, even with a membership in the role. If you can't use a
   superuser, provision the database with
   [`ddl provision`](#provisioning-a-database-ddl-provision) instead.

   With `--single-transaction`, a failed restore leaves the database empty, so
   you can fix the cause and run the command again. If a restore without
   `--single-transaction` fails partway, drop the database and start again from
   step 2.

   :::danger

   Don't remove the `OWNER TO "edfi_dms_enqueue_owner"` statements from the dump
   to get past a missing role. The two trigger functions are `SECURITY DEFINER`
   functions: without those statements, they're owned by whoever ran the
   restore, often a superuser, and run with that login's rights.

   :::

4. Give the restored database its own source identity by running this in the
   restored database:

   ```sql
   UPDATE dms."DataStoreIdentity"
   SET "SourceIdentity" = gen_random_uuid()
   WHERE "DataStoreIdentitySingletonId" = 1;
   ```

   The statement must report `UPDATE 1`. Every database restored from a template
   starts with the identity stored in the template, but each one is a separate
   data store, and change data capture uses this value to tell data stores
   apart.

5. If the Ed-Fi API connects with a login other than the superuser that ran the
   restore, grant that login access to the restored objects. That superuser owns
   the restored schemas, tables, and sequences, so other logins can't use them
   until you grant access. Without these grants, the Ed-Fi API can't see the
   restored tables, and data requests return HTTP 503 as if the database weren't
   provisioned. Run the following in the restored database, replacing `edfi_api`
   with the Ed-Fi API's login:

   ```sql
   GRANT USAGE
     ON SCHEMA auth, dms, edfi, tpdm, tracked_changes_edfi, tracked_changes_tpdm
     TO edfi_api;
   GRANT SELECT, INSERT, UPDATE, DELETE
     ON ALL TABLES
     IN SCHEMA auth, dms, edfi, tpdm, tracked_changes_edfi, tracked_changes_tpdm
     TO edfi_api;
   GRANT USAGE, SELECT
     ON ALL SEQUENCES
     IN SCHEMA auth, dms, edfi, tpdm, tracked_changes_edfi, tracked_changes_tpdm
     TO edfi_api;
   ```

   For a Data Standard 6.1 template, leave out `tpdm` and
   `tracked_changes_tpdm`, which only the 5.2 templates have. The login also
   needs the `CONNECT` and `TEMPORARY` rights on the database, which PostgreSQL
   gives every login by default.

### Restoring on SQL Server

The SQL Server templates are native backups from SQL Server 2025, so they
restore only on SQL Server 2025 or later. They don't need the
`edfi_dms_enqueue_owner` role.

1. Copy the `.bak` file to a folder the SQL Server service can read, such as its
   default backup folder (`/var/opt/mssql/data` on Linux).

2. List the logical file names in the backup. The paths in this and the next
   example are for SQL Server on Linux.

   ```sql
   RESTORE FILELISTONLY
   FROM DISK =
     N'/var/opt/mssql/data/EdFi.Api.Populated.Template.MsSql.5.2.0.bak';
   ```

   The `LogicalName` column holds the names of the data file and the log file.
   They differ by Data Standard: the 5.2 templates use
   `edfi_datamanagementservice_template` and
   `edfi_datamanagementservice_template_log`, and the 6.1 templates use
   `edfi_datamanagementservice_template_61` and
   `edfi_datamanagementservice_template_61_log`.

3. Restore the backup into a new database, moving its two files into your
   server's data folder. This example restores a Data Standard 5.2 template; for
   a 6.1 template, use the 6.1 logical file names.

   ```sql
   RESTORE DATABASE [edfi_datamanagementservice]
   FROM DISK =
     N'/var/opt/mssql/data/EdFi.Api.Populated.Template.MsSql.5.2.0.bak'
   WITH
     MOVE N'edfi_datamanagementservice_template'
       TO N'/var/opt/mssql/data/edfi_datamanagementservice.mdf',
     MOVE N'edfi_datamanagementservice_template_log'
       TO N'/var/opt/mssql/data/edfi_datamanagementservice_log.ldf';
   ```

4. Give the restored database its own source identity, for the same reason as on
   PostgreSQL:

   ```sql
   UPDATE [edfi_datamanagementservice].[dms].[DataStoreIdentity]
   SET [SourceIdentity] = NEWID()
   WHERE [DataStoreIdentitySingletonId] = 1;
   ```

   The statement must report `(1 row affected)`.

5. If the Ed-Fi API connects with a login other than the one that ran the
   restore, give that login a user in the restored database. The restore makes
   the login that ran it the database's owner, and the template holds no other
   users. Run the following, replacing `edfi_api` with the Ed-Fi API's login:

   ```sql
   USE [edfi_datamanagementservice];
   CREATE USER [edfi_api] FOR LOGIN [edfi_api];
   ALTER ROLE [db_datareader] ADD MEMBER [edfi_api];
   ALTER ROLE [db_datawriter] ADD MEMBER [edfi_api];
   GRANT EXECUTE TO [edfi_api];
   ```

### After the restore

1. Register the database as a data store in the Configuration Service, with a
   connection string for the Ed-Fi API's login (see [Data
   Stores](../configuration/api-client-and-data-store-configuration.md#data-stores)).
2. Start the Ed-Fi API. If it tried to use the database before you finished the
   steps above, restart it (see [Schema Fingerprint
   Validation](#schema-fingerprint-validation)).

If data requests still return HTTP 503 after a restart, either the Ed-Fi API's
login is missing the access from step 5, or the template doesn't match the Ed-Fi
API's version or schema packages (see [Choosing a
template](#choosing-a-template)).

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
