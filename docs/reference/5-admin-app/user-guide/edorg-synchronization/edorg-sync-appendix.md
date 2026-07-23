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
| `discriminator` | The organization **type**, exactly as the ODS stores it (e.g. `edfi.School`) — see the supported types below |
| `parentEducationOrganizationId` | Optional; the parent organization's id |

The file can be reviewed, trimmed, or even hand-authored between the export
and the import — remove rows to exclude organizations, or fix a parent id.
A `parentEducationOrganizationId` that matches no other row imports as a root
(the import notes this), unless the parent already exists in the Admin App
under the same tenant/ODS, in which case the child is linked to it.

## Supported organization types

The `discriminator` value must be one of the types the Admin App models;
rows with any other type (e.g. `edfi.CommunityOrganization`,
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
are left untouched, which is what makes re-runs safe. The whole load is a
single transaction.

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
| `ODS_SQL_SERVER` | `tcp:localhost,1433` | SQL Server hosting the ODS |
| `ODS_DB_USERNAME` / `ODS_DB_PASSWORD` | `sa` / — | SQL Server login; the password is prompted when empty |
| `ODS_USE_INTEGRATED_SECURITY` | `false` | `true` = Windows authentication (no password needed) |
| `ODS_POSTGRES_HOST` / `ODS_POSTGRES_PORT` | `localhost` / `5432` | PostgreSQL host/port |
| `ODS_POSTGRES_USER` / `ODS_POSTGRES_PASSWORD` | `postgres` / — | PostgreSQL login; the password is prompted when empty |
| `ODS_USE_POSTGRES_DOCKER` | `false` | `true` = run `psql` inside the ODS stack's database container |
| `ODS_POSTGRES_CONTAINER` | `ed-fi-db-ods` | That container's name |

Target Admin App database:

| Variable | Default | Purpose |
| --- | --- | --- |
| `DB_ENGINE` | `mssql` | `mssql` or `pgsql` |
| `DATABASE_NAME` | `sbaa` | The Admin App application database |
| `SQL_SERVER` | `tcp:localhost,1433` | SQL Server hosting it |
| `ADMIN_APP_DB_USER` / `ADMIN_APP_DB_PASSWORD` | `sa` / — | SQL Server login; the password is prompted when empty |
| `USE_INTEGRATED_SECURITY` | `false` | `true` = Windows authentication |
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
| `CSV_PATH` | `./edorgs.csv` | Where the export writes and the import/cleanup read |

## Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| `No registered ODS found for tenant ...` | The Admin App database has no tenant or no registered ODS to attach to. Register them first through the Admin App UI, then re-run. If the registration's database name differs from the real ODS name, set `ODS_DB_NAME` to the registered name |
| `Tenant ... matches more than one scope` | The tenant has several registered ODS databases (or exists in several environments). Set `ODS_DB_NAME` (and `ENVIRONMENT_NAME` if needed) to pick one |
| `educationOrganizationId value(s) exceed the SQL Server ... int range` | The Admin App's SQL Server schema stores 32-bit ids. Remove the offending rows from the CSV, or use a PostgreSQL Admin App database |
| `skipping N row(s) of type ...` | Those ODS organization types are not modeled by the Admin App and cannot be imported |
| Imported organizations missing from a team's dropdown | Global admins see everything; other teams need ownership of the tenant, environment, ODS, or the individual organizations |
| Organizations imported before the ODS registration was fixed | Run `cleanup-edorgs.ps1` with the same CSV, correct `.env`, and re-import |
