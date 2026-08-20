---
sidebar_position: 1
---

# Run the Scripts

The sync is driven by a single wrapper script, `run.ps1`, configured through a
`.env` file: it exports the education organizations from the ODS to a CSV,
then loads the CSV into the Admin App database. This page walks through
cloning the scripts repository, configuring the environment file, and running
(and verifying) the sync.

## Step 1 — Clone the Repository

```powershell
git clone https://github.com/Ed-Fi-Exchange-OSS/Admin-App-Installation-Scripts.git
cd Admin-App-Installation-Scripts/edorg-sync
```

## Step 2 — Configure the Environment File

Copy the example environment file and edit it to match your deployment:

```powershell
Copy-Item .env.example .env
```

The source ODS (`ODS_*` variables) and the target Admin App database (the
unprefixed variables) are configured independently — they can live on
different servers and even different engines — for example an ODS on SQL Server
feeding an Admin App on PostgreSQL. Either may be a managed Azure SQL Database:
set `ODS_SQL_SERVER` and/or `SQL_SERVER` to the server's FQDN and use SQL
authentication (see
[Managed Azure SQL Database](./edorg-sync-appendix.md#managed-azure-sql-database)).

Every variable is described in the
[environment variable reference](edorg-sync-appendix#environment-variable-reference)
in the Appendix.

:::info

The organizations land under one tenant + registered ODS. A deployment with
several registered ODS databases (for example one per school year) needs one run per
ODS: point `ODS_DATABASE_NAME` / `ODS_DB_NAME` at each in turn and re-run.

:::

## Step 3 — Run the Scripts

```powershell
./run.ps1
```

Passwords left blank in `.env` are prompted for here, with the input masked.
When both databases use SQL logins there are two prompts in a row: the first
(`ODS_DB_PASSWORD`) wants the **source ODS** login's password, the second
(`ADMIN_APP_DB_PASSWORD`) the **Admin App database** login's — each prompt
names the variable it is filling.

`run.ps1` runs two scripts in order:

1. **`export-edorgs.ps1`** — reads every education organization out of the
   ODS (read-only) and writes the CSV: id, name, short name, type
   (discriminator), and parent organization. The parent is derived per type —
   school → local education agency; local education agency → parent agency,
   education service center, or state education agency; organization
   department → parent organization. It ends with a per-type summary,
   flagging types the Admin App does not support.
2. **`import-edorgs.ps1`** — loads the CSV into the Admin App database: looks
   up the tenant and registered ODS, inserts the missing organization rows
   (type included), corrects the name, short name, and type of rows that
   already exist when they differ from the CSV (for example the `Institution #<id>`
   placeholders the Admin App writes at ODS registration), wires the
   hierarchy, and fills in the tree rows the Admin App's views expect.
   Unsupported types are skipped with a warning, hierarchy links on existing
   rows are never overwritten, and the whole load runs in a single
   transaction — on any error nothing is imported. The ids it actually
   inserts are recorded in an `imported-ids.csv` manifest next to the CSV,
   which is what `cleanup-edorgs.ps1` later deletes from.

Both scripts are idempotent, so re-running `run.ps1` is safe. To review — or
trim — the CSV before anything is written to the Admin App, split the run:

```powershell
./run.ps1 -SkipImport    # export only: writes the CSV
# review/edit the CSV ...
./run.ps1 -SkipExport    # import only: loads the reviewed CSV
```

:::warning

On SQL Server the Admin App schema stores the education organization id as a
32-bit integer: ids above `2147483647` stop the import with a list of the
offending rows. Remove those rows from the CSV, or use a PostgreSQL Admin App
database (which stores 64-bit ids).

:::

## Step 4 — Verify

Sign in to the Admin App UI as a global administrator and create (or edit) an
**Application**: after selecting the ODS instance the import attached to, the
imported education organizations appear in the Education Organization
dropdown, and the hierarchy pages show them under their parents.

:::note

Non-admin teams see the imported organizations only once they are granted
ownership of the tenant, environment, ODS, or the individual organizations
(team access management in the Admin App).

:::

## Cleaning Up

To remove exactly what was imported, run `cleanup-edorgs.ps1` from the same
folder. It deletes, from the same tenant/ODS scope, only the rows the import
actually inserted — taken from the `imported-ids.csv` manifest the import
writes — so organizations the Admin App created itself (including the
placeholders written at ODS registration) are never deleted. Children of a
deleted row that are not themselves being deleted are kept and become roots.
On success the scope's manifest entries are consumed, so re-runs are no-ops.

```powershell
./cleanup-edorgs.ps1            # asks for confirmation before deleting
./cleanup-edorgs.ps1 -WhatIf    # preview only: shows what would be deleted
./cleanup-edorgs.ps1 -Confirm:$false   # unattended: skips the prompt
```

It reads the same `.env` for the connection and scope; any parameter passed
explicitly overrides the `.env` value. Re-import at any time with
`./run.ps1 -SkipExport`.

:::note

If a team was granted ownership of an imported organization, the cleanup
removes that team-access grant in the same transaction (the database would
otherwise block the delete) and reports each team/organization pair it
removed. Grant the access again after re-importing.

:::

Passing `-CsvPath` explicitly overrides the manifest and deletes **every** id
listed in that file from the scope — including rows the Admin App created
itself. Use it only when the manifest is gone and the file is known to contain
nothing but imported organizations.
