---
sidebar_position: 1
---

# Quick Start

After installing the Ed-Fi Admin App, a global administrator normally has to
click through the UI to create a user, a team, an environment, and the ownership
that ties them together before reaching the screens that matter — environment
and instance management. The PowerShell scripts in the
[Admin-App-Installation-Scripts](https://github.com/Ed-Fi-Exchange-OSS/Admin-App-Installation-Scripts)
repository stand up that whole starter configuration so an administrator can
sign in and go straight to managing ODS instances.

## What it creates

The scripts configure, in the **Admin App application database** (through the
Admin App API, running as the authenticated service-account (machine) user):

- An administrative **user** with the global **Global admin** role
- A single **team** (default `Quick Start`), with the machine user — and the
  human bootstrap admin, when `ADMIN_USERNAME` is set — as **members** using
  the **Tenant admin** role (id 6) — the role that carries the team-scoped
  privileges (so the Applications and Profiles pages are authorized)
- A single **environment** (default `Ed-Fi ODS/API v7.3`, label `QuickStart`),
  created through the API so `configPublic` / `configPrivate` are generated and
  encrypted
- A **default** Ed-Fi tenant
- One **ODS instance** per entry in the `ODSS_JSON` list (`EdFi_Ods_2026`,
  `EdFi_Ods_2027`), each with its allowed education organization, synced from
  the Admin API
- **Ownership** of both the environment and the tenant by the team (**Full
  ownership**, role id 5)

In addition, in the ODS/API's **EdFi_Security** database (by direct SQL):

- A copy of every built-in **claim set** (`SIS Vendor`, `Ed-Fi Sandbox`,
  `Assessment Vendor`, … — excluding internal-use ones) under an `AA` prefix —
  the Admin App hides built-in claim sets from the application claim set
  dropdown, so only the copies can be assigned when creating client credentials

## Prerequisites

| Requirement | Notes |
| --- | --- |
| Windows PowerShell 5.1 or PowerShell 7.0+ | |
| Git | For cloning the scripts repository |
| Ed-Fi ODS/API and ODS Admin API | Installed and reachable at the URLs configured in `.env` (defaults assume the local stack at `https://localhost`) |
| Admin API client registration enabled | `Authentication:AllowRegistration=true` in the Admin API's `appsettings.json` while the scripts run — the Admin App registers its **own** client credentials at `POST /connect/register` when creating the environment, so this is required even if a client was already registered manually (previously created clients are not reused). Re-enable it if it was turned off after first-time setup; it can be disabled again afterwards |
| Ed-Fi Admin App | Deployed with its database migrated (migrations seed the built-in roles the scripts reference — `Global admin`, `Tenant admin`, `Full ownership`) |
| Identity provider (OIDC) | Configured for the Admin App, with a bootstrap global-admin user you can sign in as — see [Configuring an Identity Provider for Ed-Fi Admin App](/reference/admin-app/configuration/identity-provider) |
| ODS instances registered in `EdFi_Admin` | Every instance listed in `ODSS_JSON` must exist in `EdFi_Admin.dbo.OdsInstances` on the target ODS/API — the scripts do not create them; see [Set Up the ODS Instances](run-the-quick-start#set-up-the-ods-instances-odss_json) |

:::info

The ODS instance ids **and names** in `ODSS_JSON` must match real rows in
`EdFi_Admin.dbo.OdsInstances` on the target ODS/API — otherwise the sync will
not find them and the ODS lists will be empty.
[Set Up the ODS Instances](run-the-quick-start#set-up-the-ods-instances-odss_json)
covers how to check the table and create missing rows before running the
scripts.

:::

:::tip Verify Admin API registration first

Before running the scripts, manually register a first client against the Admin
API to confirm registration works end to end (the secret must be 32–128
characters and contain an uppercase letter, a lowercase letter, a digit, and a
special character):

```powershell
curl.exe -k -X POST https://localhost/AdminApi/connect/register `
  -d "ClientId=bootstrap-client" `
  -d "ClientSecret=<32-128 chars, upper+lower+digit+special>" `
  -d "DisplayName=Bootstrap"
```

A `200` response (`Registered client bootstrap-client successfully.`) confirms
the Admin API is ready. A `403` means registration is disabled
(`Authentication:AllowRegistration`, see the prerequisites table); a `500`
means the Admin API itself failed server-side — check its log file and confirm
its database tables were installed (the `adminapi` schema in `EdFi_Admin`).

This bootstrap client is only a connectivity check — the quick start does not
use it. The Admin App registers its own client during environment creation,
which is why registration must remain enabled while the scripts run.

:::

## Steps Overview

1. [Run the Scripts](run-the-quick-start) — clone the scripts repository,
   configure the `.env` file, and run the scripts
2. [Machine User Setup](machine-user-setup) — _optional_: how the machine
   (service-account) user that calls the Admin App API works, and how to
   configure it manually (Keycloak console steps)

See the [Appendix](quick-start-appendix) for the full `.env` variable
reference, script options, and troubleshooting.
