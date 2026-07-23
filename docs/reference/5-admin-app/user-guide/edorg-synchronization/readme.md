---
sidebar_position: 0
---

# Education Organization Sync

When the Ed-Fi Admin App is installed against an ODS/API whose ODS databases
already contain education organizations, those organizations do not appear in
the Admin App on their own — the Education Organization dropdown shown when
creating a new Application stays empty until the Admin App's own tables know
about them. The PowerShell scripts in the
[Admin-App-Installation-Scripts](https://github.com/Ed-Fi-Exchange-OSS/Admin-App-Installation-Scripts)
repository perform that one-time copy: an **export** script reads the
education organizations (with their type and hierarchy) out of the ODS into a
CSV, and an **import** script transforms and loads the CSV into the Admin App
database.

:::warning

This is a **temporary bridge**. Admin App v4.1 is slated to synchronize
education organizations natively, after which these scripts are unnecessary.
Use them only for the one-time import of organizations that pre-date the
Admin App installation.

:::

## What it creates

In the **Admin App application database** (default `sbaa`, by direct SQL):

- One **education organization** row per CSV row, carrying the
  `educationOrganizationId`, name, short name, and **type** (the ODS
  discriminator, e.g. `edfi.School`, `edfi.LocalEducationAgency`), attached to
  an existing tenant and registered ODS instance
- The **hierarchy** between them — schools under their local education agency,
  local education agencies under their education service center or state
  education agency, organization departments under their parent — including
  the tree (closure) rows the Admin App's hierarchy views rely on

Nothing is written to the ODS: the export is read-only, and the import touches
only the Admin App database. Organizations the Admin App already knows about
are never modified.

## Prerequisites

| Requirement | Notes |
| --- | --- |
| Windows PowerShell 5.1 or PowerShell 7.0+ | Windows PowerShell 5.1 ships with Windows Server 2016+; PowerShell 7 is cross-platform. `sqlcmd` (SQL Server) and/or `psql` (PostgreSQL) must be available for the engines in play |
| Git | For cloning the scripts repository |
| Read access to the source ODS | The `EdFi_ODS` database whose education organizations are being exported |
| Ed-Fi Admin App | Deployed with its database migrated and reachable from this machine |
| Tenant and ODS registered in the Admin App | The import attaches the organizations to an **existing** tenant + ODS registration — create them first through the Admin App UI |

:::info

The environments and ODS instances themselves are **not** created by these
scripts. If the Admin App database has no tenant or no registered ODS yet,
register them through the Admin App UI first — the import will tell you when
it cannot find the scope to attach to.

:::

## Steps Overview

1. [Run the Scripts](run-the-edorg-sync) — clone the scripts repository,
   configure the `.env` file, and run the export + import

See the [Appendix](edorg-sync-appendix) for the CSV format, the environment
variable reference, exactly what the import writes, and troubleshooting.
