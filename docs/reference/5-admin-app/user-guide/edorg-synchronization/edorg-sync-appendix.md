---
sidebar_position: 2
---

# Appendix

Reference material for the education organization sync scripts: the CSV
format, the supported organization types, what the import writes, the full
`.env` variable list, and troubleshooting. Every script also documents its
parameters in comment-based help (`Get-Help ./export-edorgs.ps1 -Full`).

## The CSV format

`export-edorgs.ps1` writes (and `import-edorgs.ps1` reads) a UTF-8 CSV with a
header row and these columns:

| Column | Notes |
| --- | --- |
| `educationOrganizationId` | The ODS education organization id. Required, unique |
| `nameOfInstitution` | Required |
| `shortNameOfInstitution` | Optional |
| `discriminator` | The organization **type**, exactly as the ODS stores it (for example `edfi.School`) — see the supported types below |
| `parentEducationOrganizationId` | Optional; the parent organization's id |

The file can be reviewed, trimmed, or even hand-authored between the export
and the import — remove rows to exclude organizations, or fix a parent id.
A `parentEducationOrganizationId` that matches no other row imports as a root
(the import notes this), unless the parent already exists in the Admin App
under the same tenant/ODS, in which case the child is linked to it. The
import validates hand-edited files before touching the database: duplicate
ids, a row listing itself as its parent, and parent cycles are all rejected
with the offending ids named.

## Supported organization types

The `discriminator` value must be one of the types the Admin App models;
rows with any other type (for example `edfi.CommunityOrganization`,
`edfi.CommunityProvider`) are skipped with a warning:

| Discriminator | Shown in the Admin App as |
| --- | --- |
| `edfi.StateEducationAgency` | SEA |
| `edfi.EducationServiceCenter` | ESC |
| `edfi.LocalEducationAgency` | LEA |
| `edfi.School` | School |
| `edfi.EducationOrganizationNetwork` | Network |
| `edfi.PostSecondaryInstitution` | Uni |
| `edfi.OrganizationDepartment` | Org-Dept |
| `edfi.Other` | Other |

The export derives each row's parent from the ODS subtype tables:

| Type | Parent |
| --- | --- |
| School | Its local education agency |
| Local education agency | Its parent agency, else its education service center, else its state education agency |
| Education service center | Its state education agency |
| Organization department | Its parent education organization |
| All other types | None (root) |

## What the import writes

The import mimics what the Admin App's own synchronization produces, so the
imported rows are indistinguishable from natively synced ones:

- One `edorg` row per CSV row — id, name, short name, and type — stamped with
  the tenant, environment, and ODS registration it was attached to
- The `parentId` link for each row whose parent exists in the same scope
  (only rows without a parent are ever updated, so links written by the Admin
  App itself are never overwritten)
- The `edorg_closure` ancestor/self pairs that back the Admin App's tree
  queries, computed for the whole scope — which also heals a partially synced
  scope rather than corrupting it

Rows that already exist under the tenant/ODS (same `educationOrganizationId`)
keep their row and their `parentId` link, but their name, short name, and
type are corrected to the CSV values when they differ — the same three
columns the Admin App's own synchronization maintains. This is what fixes the
`Institution #<id>` / `edfi.Other` placeholder rows the Admin App writes when
an ODS is registered with allowed education organization ids. Re-runs are
no-ops, and the whole load is a single transaction.

The import also records the ids it actually **inserted** (never the
pre-existing ones) in an `imported-ids.csv` manifest next to the CSV, keyed
by tenant/ODS scope and merged across runs. `cleanup-edorgs.ps1` deletes only
ids recorded there, and consumes the scope's entries on success — keep the
manifest for as long as you may want to undo the import.

## Environment variable reference

Passwords (`ODS_DB_PASSWORD`, `ODS_POSTGRES_PASSWORD`,
`ADMIN_APP_DB_PASSWORD`, `POSTGRES_APP_PASSWORD`) may be left empty:
`run.ps1` and `cleanup-edorgs.ps1` prompt for the ones they need, with the
input masked. Set them in the file only for unattended runs.

Source ODS (read-only):

| Variable | Default | Purpose |
| --- | --- | --- |
| `ODS_DB_ENGINE` | `mssql` | `mssql` or `pgsql` |
| `ODS_DATABASE_NAME` | — | The ODS to export from. Required |
| `ODS_SQL_SERVER` | `tcp:localhost,1433` | SQL Server hosting the ODS. May be a remote server, including a managed Azure SQL Database (see [Managed Azure SQL Database](#managed-azure-sql-database)) |
| `ODS_DB_USERNAME` / `ODS_DB_PASSWORD` | `sa` / — | SQL Server login; the password is prompted when empty |
| `ODS_USE_INTEGRATED_SECURITY` | `false` | `true` = Windows authentication (no password needed). Not usable against a remote `ODS_SQL_SERVER` |
| `ODS_POSTGRES_HOST` / `ODS_POSTGRES_PORT` | `localhost` / `5432` | PostgreSQL host/port |
| `ODS_POSTGRES_USER` / `ODS_POSTGRES_PASSWORD` | `postgres` / — | PostgreSQL login; the password is prompted when empty |
| `ODS_USE_POSTGRES_DOCKER` | `false` | `true` = run `psql` inside the ODS stack's database container |
| `ODS_POSTGRES_CONTAINER` | `ed-fi-db-ods` | That container's name |

Target Admin App database:

| Variable | Default | Purpose |
| --- | --- | --- |
| `DB_ENGINE` | `mssql` | `mssql` or `pgsql` |
| `DATABASE_NAME` | `sbaa` | The Admin App application database |
| `SQL_SERVER` | `tcp:localhost,1433` | SQL Server hosting it. May be a remote server, including a managed Azure SQL Database, independently of `ODS_SQL_SERVER` |
| `ADMIN_APP_DB_USER` / `ADMIN_APP_DB_PASSWORD` | `edfi_adminapp` / — | SQL Server login; the password is prompted when empty |
| `USE_INTEGRATED_SECURITY` | `false` | `true` = Windows authentication. Not usable against a remote `SQL_SERVER` |
| `SQL_TRUST_SERVER_CERTIFICATE` | `false` | `true` = accept a SQL Server certificate without validating it. Applies to `ODS_SQL_SERVER` and `SQL_SERVER`; a local instance is trusted automatically, so set it only for a remote server presenting a self-signed certificate |
| `POSTGRES_HOST` / `POSTGRES_PORT` | `localhost` / `5432` | PostgreSQL host/port |
| `POSTGRES_APP_USER` / `POSTGRES_APP_PASSWORD` | `edfiadminapp` / — | PostgreSQL login; the password is prompted when empty |
| `USE_POSTGRES_DOCKER` | `false` | `true` = run `psql` inside the Admin App stack's database container |
| `POSTGRES_CONTAINER` | `edfiadminapp-postgres` | That container's name |

Scope and files:

| Variable | Default | Purpose |
| --- | --- | --- |
| `TENANT_NAME` | `default` | The Admin App tenant to import into |
| `ENVIRONMENT_NAME` | — | Only needed when the same tenant name exists in more than one environment |
| `ODS_DB_NAME` | `ODS_DATABASE_NAME` | Which registered ODS (the Admin App registration's database name) to attach to; only needed when the registration's name differs or the tenant has several |
| `CSV_PATH` | `./edorgs.csv` | Where the export writes and the import reads. The import records the ids it inserts in `imported-ids.csv` next to this file, and the cleanup deletes from that manifest |

## Managed Azure SQL Database

Either SQL Server database may be a managed Azure SQL Database, and
independently of the other: the source ODS (`ODS_SQL_SERVER`) and the target
Admin App application database (`SQL_SERVER`).

```ini
ODS_SQL_SERVER=tcp:myserver.database.windows.net,1433
SQL_SERVER=tcp:myserver.database.windows.net,1433
ODS_USE_INTEGRATED_SECURITY=false
USE_INTEGRATED_SECURITY=false
```

Three things differ from a local instance:

- **SQL authentication is required.** Azure SQL does not accept Windows
  integrated authentication, so the two `*_USE_INTEGRATED_SECURITY` variables
  must be `false` and the logins must be set. The scripts refuse the
  combination up front rather than failing later with a driver error.
- **The login is a contained user** in the database itself. See
  [Database](/reference/admin-app/getting-started/windows-iis-installation/manual#database)
  for the `CREATE USER` statement, and for the server, firewall rule, and
  database to provision in Azure.
- **The connection is validated.** A remote server is connected to with
  encryption and certificate validation; Azure SQL presents a CA-issued
  certificate, so leave `SQL_TRUST_SERVER_CERTIFICATE=false`.

The export is read-only and the import only writes rows in tables that already
exist, so nothing here creates or alters a database.

## Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| `No registered ODS found for tenant ...` | The Admin App database has no tenant or no registered ODS to attach to. Register them first through the Admin App UI, then re-run. If the registration's database name differs from the real ODS name, set `ODS_DB_NAME` to the registered name |
| `Tenant ... matches more than one scope` | The tenant has several registered ODS databases (or exists in several environments). Set `ODS_DB_NAME` (and `ENVIRONMENT_NAME` if needed) to pick one |
| `educationOrganizationId value(s) exceed the SQL Server ... int range` | The Admin App's SQL Server schema stores 32-bit ids. Remove the offending rows from the CSV, or use a PostgreSQL Admin App database |
| `skipping N row(s) of type ...` | Those ODS organization types are not modeled by the Admin App and cannot be imported |
| `Row ... lists itself as its parent` / `Parent cycle in the CSV ...` | The (hand-edited) CSV contains a self-parent or a parent loop; fix the `parentEducationOrganizationId` values named in the message. Nothing was written |
| An organization shows as `Institution #<id>` with type Other | That is the placeholder the Admin App writes when an ODS is registered with allowed organization ids. Running the import corrects its name, short name, and type |
| Imported organizations missing from a team's dropdown | Global admins see everything; other teams need ownership of the tenant, environment, ODS, or the individual organizations |
| Cleanup says `Nothing to do: no import manifest at ...` | The import inserted nothing (or the scope was already cleaned up), so there is nothing recorded to delete. To delete ids from an arbitrary CSV instead, pass `-CsvPath` explicitly — that mode deletes every listed id, including rows the Admin App created itself |
| Cleanup warns `team access was removed for N grant(s)` | A team had been granted ownership of an imported organization; the grant must be removed for the delete to succeed, and the cleanup does so in the same transaction, naming each team/organization pair. Grant the access again after re-importing |
| Organizations imported before the ODS registration was fixed | Run `cleanup-edorgs.ps1` (it deletes what the import recorded in `imported-ids.csv`), correct `.env`, and re-import |
