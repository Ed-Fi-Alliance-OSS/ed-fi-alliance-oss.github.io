---
sidebar_position: 1
---

# Run the Scripts

The quick start is driven by a single wrapper script, `run.ps1`, configured
through a `.env` file. This page walks through cloning the scripts repository,
configuring the environment file, and running the scripts.

## Step 1 — Clone the Repository

```powershell
git clone https://github.com/Ed-Fi-Exchange-OSS/Admin-App-Installation-Scripts.git
cd Admin-App-Installation-Scripts/quick-start
```

## Step 2 — Configure the Environment File

Copy the example environment file and edit it to match your deployment:

```powershell
Copy-Item .env.example .env
```

The defaults work for the local Docker stack. Key settings you may want to
review:

| Variable | Purpose |
| --- | --- |
| `PROVIDER` | Identity provider for the machine client: `keycloak` |
| `KEYCLOAK_ADMIN_PASSWORD` | Keycloak master admin password (required when `PROVIDER=keycloak`) |
| `DB_ENGINE`, `APP_DB_PASSWORD` / `POSTGRES_APP_PASSWORD` | Admin App database engine and credentials, used to seed the machine user. SQL Server uses the dedicated least-privilege `edfiadminapp` login — never `sa` |
| `TOKEN_URL` | Your issuer's token endpoint (the default is the Docker-stack Keycloak) |
| `API_BASE_URL`, `ADMIN_API_URL`, `ODS_API_DISCOVERY_URL` | Where the Admin App API, ODS Admin API, and ODS/API are reachable |
| `ODSS_JSON` | JSON array of ODS instances to attach; ids must match `EdFi_Admin.dbo.OdsInstances` on the target ODS/API |
| `ADMIN_USERNAME` | Username of the human bootstrap admin; when set, the scripts add them to the team so the **Applications** and **Profiles** pages work for that account |

See the [Appendix](quick-start-appendix) for the full environment variable
reference.

## Step 3 — Run the Scripts

```powershell
./run.ps1
```

`run.ps1` runs two scripts in order:

1. **`bootstrap.ps1`** — provisions the machine (service-account) client in the
   identity provider and seeds the matching machine user in the Admin App
   database. See [Machine User Setup](machine-user-setup) for what it does and
   how to do it manually instead.
2. **`quick-start.ps1`** — provisions the team, environment, tenant, ODS
   instances, and ownerships through the Admin App API, and adds the machine
   user — plus the human bootstrap admin when `ADMIN_USERNAME` is set — to the
   team.

Both scripts are idempotent, so re-running `run.ps1` is safe. If the machine
client and machine user are already in place (e.g. the Docker stack), run only
the provisioning half:

```powershell
./run.ps1 -SkipBootstrap
```

## Step 4 — Verify

Sign in to the Admin App UI as the bootstrap user. The `Ed-Fi ODS/API v7.3`
environment should appear, list its ODS instances and education organizations,
and — because this path registers working credentials — the **Applications** and
**Profiles** pages should load without a 403.

:::tip

The Applications and Profiles pages authorize through a **team membership**,
which the bootstrap user only gets when `ADMIN_USERNAME` is set in `.env`. If
those pages return a 403, set it and re-run `./run.ps1 -SkipBootstrap`.

:::

## Cleaning Up

To tear down the environment and everything attached to it (ownership, ODS
instances, Ed-Orgs, tenant), plus the team, its membership, and the machine user
seeded by `bootstrap.ps1` (`quick-start-machine`), run `cleanup.ps1` from the
same folder. The bootstrap human user (`admin@example.org`) is left in place.

```powershell
./cleanup.ps1          # shows what will be deleted and prompts for confirmation
./cleanup.ps1 -Force   # no prompt (automation)
```

:::note

The script runs against the **Admin App application database** (default `sbaa`)
— not `EdFi_Admin` or an ODS database. It reads the database engine and
connection values, plus the names to delete (`ENVIRONMENT_NAME`, `TEAM_NAME`,
`MACHINE_USERNAME`), from the same `.env` file; any parameter passed explicitly
overrides the `.env` value. Both SQL Server and PostgreSQL are supported.

The Keycloak artifacts `bootstrap.ps1` created (the machine client, the
`login:app` client scope, and its mappers) are deliberately left in the realm
so re-runs reuse them; remove them manually in the Keycloak admin console if
they are no longer wanted.

:::
