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

## Prerequisites

| Requirement | Notes |
| --- | --- |
| PowerShell 7.0+ | Cross-platform; required to run the scripts |
| Git | For cloning the scripts repository |
| Ed-Fi ODS/API and ODS Admin API | Installed and reachable at the URLs configured in `.env` (defaults assume the local stack at `https://localhost`) |
| Ed-Fi Admin App | Deployed with its database migrated (migrations seed the built-in roles the scripts reference — `Global admin`, `Tenant admin`, `Full ownership`) |
| Identity provider (OIDC) | Configured for the Admin App, with a bootstrap global-admin user you can sign in as — see [Configuring an Identity Provider for Ed-Fi Admin App](/reference/admin-app/configuration/identity-provider) |

:::info

The ODS instance ids in `ODSS_JSON` must match real rows in
`EdFi_Admin.dbo.OdsInstances` on the target ODS/API — otherwise the sync will
not find them and the ODS lists will be empty.

:::

## Steps Overview

1. [Run the Scripts](run-the-quick-start) — clone the scripts repository,
   configure the `.env` file, and run the scripts
2. [Machine User Setup](machine-user-setup) — _optional_: how the machine
   (service-account) user that calls the Admin App API works, and how to
   configure it manually (Keycloak console steps)

See the [Appendix](quick-start-appendix) for the full `.env` variable
reference, script options, and troubleshooting.
