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
| `ODSS_JSON` | JSON array of ODS instances to attach; ids **and names** must match existing rows in `EdFi_Admin.dbo.OdsInstances` on the target ODS/API (see below) |
| `SECURITY_*` | Where the ODS/API's `EdFi_Security` database lives (engine via `SECURITY_DB_ENGINE` — it may differ from `DB_ENGINE` — plus server, database name, container) and how to sign in, used to copy the built-in claim sets — SQL Server uses the dedicated `SECURITY_DB_USERNAME` / `SECURITY_DB_PASSWORD` login (or Windows integrated auth); PostgreSQL uses `POSTGRES_SECURITY_*`, falling back to `POSTGRES_*` |
| `ADMIN_USERNAME` | Username of the human bootstrap admin; when set, the scripts add them to the team so the **Applications** and **Profiles** pages work for that account |

See the [Appendix](quick-start-appendix) for the full environment variable
reference.

### Set Up the ODS Instances (`ODSS_JSON`)

The scripts do **not** create or register ODS instances in the ODS/API's
**`EdFi_Admin`** database. Every entry in `ODSS_JSON` must match an existing row
in `dbo.OdsInstances` — by `id` **and** by `name` — because when an application
is created, the Admin App looks the instance up in the Admin API **by name**,
and that list comes straight from this table. Set the table up
before running the scripts:

**If the ODS instances already exist** (the usual case — the ODS/API
deployment registers its databases here), query the table and copy the exact
values into `ODSS_JSON` — `OdsInstanceId` as `id` and `Name` as `name`:

```sql
-- against the EdFi_Admin database
SELECT OdsInstanceId, Name, InstanceType FROM dbo.OdsInstances;
```

For example, if the query returns `OdsInstanceId` 1 for `EdFi_Ods_2026` and 2
for `EdFi_Ods_2027`, the matching `ODSS_JSON` is:

```json
[
  { "id": 1, "name": "EdFi_Ods_2026", "dbName": "EdFi_Ods_2026", "allowedEdOrgs": "255901" },
  { "id": 2, "name": "EdFi_Ods_2027", "dbName": "EdFi_Ods_2027", "allowedEdOrgs": "255902" }
]
```

(In the `.env` file the array goes on a single line:
`ODSS_JSON=[{"id":1,"name":"EdFi_Ods_2026",...},{"id":2,...}]`.)

**If an ODS instance is missing** (or the table is empty), create the row —
and, for year-specific routing, its `schoolYearFromRoute` context — with the
SQL in
[Creating Applications (Admin API v2 Mode)](/reference/admin-app/configuration/global-administration-tasks#creating-applications-admin-api-v2-mode),
then re-run the query above to get the generated `OdsInstanceId` for
`ODSS_JSON` (`OdsInstanceId` is an identity column, so ids cannot be chosen up
front).

:::warning

The ODS/API reads `dbo.OdsInstances` at startup — after creating a row,
**restart the ODS/API** before calling it with the new instance.

:::

If an entry's `name` has no matching `Name` in the table, creating an
application later fails with
`ODS instance "<name>" does not exist in Admin API`.

## Step 3 — Run the Scripts

```powershell
./run.ps1
```

`run.ps1` runs three scripts in order:

1. **`bootstrap.ps1`** — provisions the machine (service-account) client in the
   identity provider and seeds the matching machine user in the Admin App
   database. See [Machine User Setup](machine-user-setup) for what it does and
   how to do it manually instead.
2. **`quick-start.ps1`** — provisions the team, environment, tenant, ODS
   instances, and ownerships through the Admin App API, and adds the machine
   user — plus the human bootstrap admin when `ADMIN_USERNAME` is set — to the
   team. `ODSS_JSON` must already exist in `EdFi_Admin.dbo.OdsInstances` — see
   [Set Up the ODS Instances](#set-up-the-ods-instances-odss_json).
3. **`copy-claimsets.ps1`** — copies every built-in claim set under an `AA`
   prefix — `SIS Vendor` becomes `AA SIS Vendor` — directly in the ODS/API's
   `EdFi_Security` database (internal-use claim sets — those flagged
   `ForApplicationUseOnly` in `EdFi_Security`, such as
   `Bootstrap Descriptors and EdOrgs` — are excluded; set `CLAIMSET_NAMES` to
   copy a specific list instead). The Admin App hides built-in (Ed-Fi preset)
   claim sets from the application claim set dropdown, so credentials cannot
   be created against them; the copies are selectable. The connection comes
   entirely from the `SECURITY_*` variables, and `EdFi_Security` can even run
   on a different engine than the Admin App database (`SECURITY_DB_ENGINE`,
   defaulting to `DB_ENGINE`) — on SQL Server the `SECURITY_DB_USERNAME` /
   `SECURITY_DB_PASSWORD` login (or Windows integrated auth via
   `SECURITY_USE_INTEGRATED_SECURITY=true`); on PostgreSQL the
   `POSTGRES_SECURITY_*` values, each falling back to the app-side
   `POSTGRES_*` value when empty.

All the scripts are idempotent, so re-running `run.ps1` is safe. If the
machine client and machine user are already in place (e.g. the Docker stack),
run only the provisioning half:

```powershell
./run.ps1 -SkipBootstrap
```

If the ODS/API's `EdFi_Security` database is not reachable from this machine,
skip the claim set copies with `-SkipClaimsets` (or `COPY_CLAIMSETS=false`).

:::info

The claim set copies are snapshots: an ODS/API upgrade that changes a built-in
claim set does not propagate to the `AA` copies. Delete and re-create them to
pick up the new definition.

:::

## Step 4 — Verify

Sign in to the Admin App UI as the bootstrap user. The `Ed-Fi ODS/API v7.3`
environment should appear, list its ODS instances and education organizations,
and — because this path registers working credentials — the **Applications** and
**Profiles** pages should load without a 403. When creating an application, the
`AA`-prefixed claim set copies (e.g. `AA SIS Vendor`) appear in the claim set
dropdown.

:::tip

The Applications and Profiles pages authorize through a **team membership**,
which the bootstrap user only gets when `ADMIN_USERNAME` is set in `.env`. If
those pages return a 403, set it and re-run `./run.ps1 -SkipBootstrap`.

:::

## Cleaning Up

To tear down the environment and everything attached to it (ownership, ODS
instances, Ed-Orgs, tenant), plus the team, its membership, the machine user
seeded by `bootstrap.ps1` (`quick-start-machine`), and the claim set copies
made by `copy-claimsets.ps1`, run `cleanup.ps1` from the same folder. The
bootstrap human user (`admin@example.com`) is left in place.

```powershell
./cleanup.ps1                  # shows what will be deleted and prompts for confirmation
./cleanup.ps1 -Force           # no prompt (automation)
./cleanup.ps1 -SkipClaimsets   # leave the claim set copies in EdFi_Security
```

:::note

The script runs against the **Admin App application database** (default `sbaa`)
— not `EdFi_Admin` or an ODS database — plus, for the claim set copies, the
ODS/API's `EdFi_Security` database (via the `SECURITY_*` values). It reads the
database engine and connection values, plus the names to delete
(`ENVIRONMENT_NAME`, `TEAM_NAME`, `MACHINE_USERNAME`, `CLAIMSET_NAMES`), from
the same `.env` file; any parameter passed explicitly overrides the `.env`
value. Both SQL Server and PostgreSQL are supported.

:::

:::warning

Deleting a claim set that an application still uses leaves that application's
credentials without resource access. Delete the application first, or pass
`-SkipClaimsets`. Only the copies are ever removed — the built-in claim sets
are never touched.

The Keycloak artifacts `bootstrap.ps1` created (the machine client, the
`login:app` client scope, and its mappers) are deliberately left in the realm
so re-runs reuse them; remove them manually in the Keycloak admin console if
they are no longer wanted.

:::
