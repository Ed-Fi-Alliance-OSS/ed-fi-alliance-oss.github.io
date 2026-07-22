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
different servers and even different engines, e.g. an ODS on SQL Server
feeding an Admin App on PostgreSQL.

Every variable is described in the
[environment variable reference](edorg-sync-appendix#environment-variable-reference)
in the Appendix.

:::info

The organizations land under one tenant + registered ODS. A deployment with
several registered ODS databases (e.g. one per school year) needs one run per
ODS: point `ODS_DATABASE_NAME` / `ODS_DB_NAME` at each in turn and re-run.

:::

## Step 3 — Run the Scripts

```powershell
./run.ps1
```

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
   (type included), wires the hierarchy, and fills in the tree rows the Admin
   App's views expect. Unsupported types are skipped with a warning, existing
   rows are never modified, and the whole load runs in a single transaction —
   on any error nothing is imported.

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
folder — it deletes, from the same tenant/ODS scope, every organization whose
id appears in the CSV, so keep the CSV you imported with. Organizations not
in the CSV (including any the Admin App synced itself) are never deleted;
children of a deleted row that are not themselves in the CSV are kept and
become roots.

```powershell
./cleanup-edorgs.ps1
```

It reads the same `.env` for the connection and scope; any parameter passed
explicitly overrides the `.env` value. Re-import at any time with
`./run.ps1 -SkipExport`.
