---
sidebar_position: 3
---

# Appendix

## Environment Variable Reference

The `.env` file in the repository's `quick-start/` folder configures all the
scripts. Copy
[`.env.example`](https://github.com/Ed-Fi-Exchange-OSS/Admin-App-Installation-Scripts/blob/main/quick-start/.env.example)
to `.env` and edit as needed before running `run.ps1`. The defaults match the
local Docker stack.

### Identity provider

| Variable | Default | Description |
| --- | --- | --- |
| `PROVIDER` | `keycloak` | Identity provider for the machine client: `keycloak` |
| `KEYCLOAK_BASE_URL` | `http://localhost:8080` | Keycloak admin API base URL (bootstrap; Keycloak only) |
| `KEYCLOAK_ADMIN_USER` | `admin` | Keycloak master admin user |
| `KEYCLOAK_ADMIN_PASSWORD` | _(empty)_ | Keycloak master admin password — **required** when `PROVIDER=keycloak` |
| `KEYCLOAK_REALM` | `edfi` | Realm holding the machine client |

### Machine (service-account) client

| Variable | Default | Description |
| --- | --- | --- |
| `MACHINE_CLIENT_ID` | `edfiadminapp-machine` | Client id of the service account |
| `MACHINE_CLIENT_SECRET` | `edfi-machine-secret-456` | Client secret used to request tokens |
| `MACHINE_AUDIENCE` | `edfiadminapp-api` | Must equal the Admin App's `AUTH0_CONFIG_SECRET.MACHINE_AUDIENCE` |
| `MACHINE_USERNAME` | `quick-start-machine` | Username of the machine user seeded in the Admin App database |

### Admin App database

Used by `bootstrap.ps1` to seed the machine user and by `cleanup.ps1`.

| Variable | Default | Description |
| --- | --- | --- |
| `DB_ENGINE` | `mssql` | Database engine: `mssql` or `pgsql` |
| `DATABASE_NAME` | `sbaa` | Admin App application database name |
| `SA_PASSWORD` | _(empty)_ | SQL Server `sa` password for `tcp:localhost,1433` — **required** when `DB_ENGINE=mssql` |
| `POSTGRES_APP_PASSWORD` | _(empty)_ | PostgreSQL app-user password — **required** when `DB_ENGINE=pgsql` |
| `POSTGRES_HOST` | `localhost` | PostgreSQL host |
| `POSTGRES_PORT` | `5432` | PostgreSQL port |
| `POSTGRES_APP_USER` | `edfiadminapp` | PostgreSQL user |
| `USE_POSTGRES_DOCKER` | `false` | `true`: run `psql` inside the `edfiadminapp-postgres` Docker container |

### Quick start (Admin App API)

| Variable | Default | Description |
| --- | --- | --- |
| `API_BASE_URL` | `https://localhost/adminapp-api/api` | Admin App API base URL (through the reverse proxy) |
| `TOKEN_URL` | `https://localhost/auth/realms/edfi/protocol/openid-connect/token` | Your issuer's token endpoint (see [Finding your token endpoint](#finding-your-token-endpoint)) |
| `OAUTH_SCOPE` | `login:app` | OAuth scope requested for the machine token (Keycloak / Auth0: `login:app`) |
| `TEAM_NAME` | `Quick Start` | Team to create |
| `ENVIRONMENT_NAME` | `Ed-Fi ODS/API v7.3` | Environment to create |
| `ENVIRONMENT_LABEL` | `QuickStart` | Environment label |
| `ADMIN_API_URL` | `https://localhost/AdminApi` | ODS Admin API URL |
| `ODS_API_DISCOVERY_URL` | `https://localhost/WebApi` | ODS/API discovery URL |
| `TENANT_NAME` | `default` | Ed-Fi tenant to create under the environment |
| `ODSS_JSON` | _(two sample instances)_ | JSON array of ODS instances to attach; ids **and names** must match existing rows in `EdFi_Admin.dbo.OdsInstances` on the target ODS/API — the scripts do not create or correct them (see [Set Up the ODS Instances](run-the-quick-start#set-up-the-ods-instances-odss_json)) |
| `SKIP_CERTIFICATE_CHECK` | `true` | `true`: skip TLS validation (local self-signed certificates) |

### Claim set copies (EdFi_Security)

Used by `copy-claimsets.ps1` to copy the built-in claim sets in the ODS/API's
`EdFi_Security` database. The connection reuses `DB_ENGINE`, `SA_PASSWORD`, and
the `POSTGRES_*` values above; only the settings below are specific to this
step.

| Variable | Default | Description |
| --- | --- | --- |
| `COPY_CLAIMSETS` | `true` | `false`: skip the claim set copy step entirely |
| `CLAIMSET_NAMES` | _(empty = every built-in claim set)_ | Claim sets to copy, semicolon-separated; blank copies all built-ins except internal-use ones (e.g. `Bootstrap Descriptors and EdOrgs`) |
| `CLAIMSET_PREFIX` | `"AA "` | Prefix for the copies; quote it to keep the trailing space |
| `SECURITY_DATABASE_NAME` | `EdFi_Security` | Security database name |
| `SECURITY_SQL_SERVER` | `tcp:localhost,1433` | SQL Server hosting `EdFi_Security` |
| `SECURITY_USE_INTEGRATED_SECURITY` | `false` | `true`: Windows integrated authentication (`SA_PASSWORD` not needed) |
| `SECURITY_POSTGRES_CONTAINER` | `ed-fi-db-admin` | With `USE_POSTGRES_DOCKER=true`: the ODS stack's admin/security db container |

## Finding your token endpoint

The token endpoint is **not** universal. The Docker stack proxies Keycloak at
`https://localhost/auth/realms/edfi/...`; other deployments (e.g. IIS-hosted, or
newer standalone Keycloak that drops the `/auth` prefix) differ. Resolve it from
the issuer the Admin App is configured to trust (`AUTH0_CONFIG_SECRET.ISSUER`) —
the token **must** be minted by that same issuer, because the Admin App fetches
its signing keys from there:

```powershell
$issuer = 'PASTE_AUTH0_CONFIG_SECRET.ISSUER'   # e.g. https://localhost:8443/realms/edfi
$disco  = Invoke-RestMethod -Uri "$issuer/.well-known/openid-configuration" -SkipCertificateCheck
$disco.token_endpoint                          # use this as TOKEN_URL
```

## Script Options

### run.ps1

| Option | Purpose |
| --- | --- |
| `-EnvFile <path>` | Use a different env file (default: `./.env`) |
| `-SkipBootstrap` | Skip `bootstrap.ps1` (IdP client + machine-user seed) |
| `-SkipClaimsets` | Skip `copy-claimsets.ps1` (built-in claim set copies in `EdFi_Security`) |

### cleanup.ps1

Reads the same `.env` for the database connection and the names to delete; any
parameter passed explicitly overrides the `.env` value.

| Option | Purpose |
| --- | --- |
| `-Force` | Skip the confirmation prompt (automation) |
| `-EnvFile <path>` | Use a different env file (default: `./.env`) |
| `-SkipClaimsets` | Leave the claim set copies in `EdFi_Security` (e.g. an application still uses one) |
| `-EnvironmentName` / `-TeamName` / `-MachineUsername` / `-ClaimSetNames` | Override the names to delete |
| `-DbEngine`, `-DatabaseName`, `-SaPassword`, `-PostgresAppPassword`, … | Override the Admin App database connection |
| `-SecuritySqlServer` | Override the SQL Server hosting `EdFi_Security` (everything else reuses the database values above and the `SECURITY_*` `.env` settings) |

### Running the scripts directly

`bootstrap.ps1`, `quick-start.ps1`, and `copy-claimsets.ps1` are plain
parameter-driven scripts — `run.ps1` only maps `.env` values onto their
parameters. To run one directly (for example, to provision a second
environment with different values, or to copy additional claim sets), see its
comment-based help:

```powershell
Get-Help ./bootstrap.ps1 -Full
Get-Help ./quick-start.ps1 -Full
Get-Help ./copy-claimsets.ps1 -Full
```

All the scripts are idempotent: re-runs update, reuse, or skip existing
resources instead of duplicating them.

## Troubleshooting

- **`Create environment failed: ... 400 (Bad Request)`.** The API could not
  reach the ODS/API or Admin API while creating the environment — for example
  `Connection to Ed-Fi API Discovery URL timed out. Please ensure the URL is correct and the server is reachable.`
  Confirm the ODS/API and Admin API are up and reachable at the
  `ODS_API_DISCOVERY_URL` / `ADMIN_API_URL` values (open them in a browser or
  `curl` them), then run the script again.
- **403 Forbidden on Applications / Profiles**
  (`{"message":"Forbidden resource"...}` at
  `…/edfi-tenants/<id>/admin-api/v2/profiles/`). This is the Admin App's own
  authorization, not the live Admin API. It almost always means the team
  membership is role **2 (Global admin)** instead of **6 (Tenant admin)** — role
  2 lacks the team-scoped profile privilege. Re-run the script (it upgrades the
  membership automatically) or `PUT` the membership's `roleId` to 6.
- **Empty ODS instances list.** The ids in `ODSS_JSON` must exist in
  `EdFi_Admin.dbo.OdsInstances` on the target ODS/API; otherwise the sync finds
  nothing to attach. Query the table and use its real `OdsInstanceId` values —
  see
  [Set Up the ODS Instances](run-the-quick-start#set-up-the-ods-instances-odss_json).
- **`ODS instance "<name>" does not exist in Admin API` when creating an
  application.** The Admin App matches the environment's ODS against the Admin
  API's `GET /v2/odsInstances` list **by name**, and that list comes from
  `EdFi_Admin.dbo.OdsInstances`. The named instance is missing from that table,
  or its `Name` differs from the `name` in `ODSS_JSON`. Check with
  `SELECT OdsInstanceId, Name FROM dbo.OdsInstances` against `EdFi_Admin`; if
  the row is missing, create it (see
  [Set Up the ODS Instances](run-the-quick-start#set-up-the-ods-instances-odss_json)),
  restart the ODS/API, and make sure `ODSS_JSON` uses the exact same name.
- **`/auth/me` returns 401 with `"Token claim validation failed"`.** The token's
  `iss` does not equal the Admin App's configured `AUTH0_CONFIG_SECRET.ISSUER`,
  or its `aud` does not include `MACHINE_AUDIENCE`. Mint the token from the
  exact issuer the Admin App trusts, and confirm the **audience** mapper emits
  `edfiadminapp-api`. Decode the token (its middle segment) to confirm the
  exact values.
- **`/auth/me` returns 401 with `"Authentication failed"`.** The token verified,
  but the machine-user step failed. Two common causes:
  - **No matching machine user** — the `bootstrap.ps1` script seeds one
    (`clientId = edfiadminapp-machine`, `userType = machine`, active, Global
    admin role). Confirm that row exists in the Admin App database.
  - **The `aud` claim is an _array_** (e.g. `["edfiadminapp-api","account"]`).
    The Admin App compares the whole `aud` claim by **strict equality** against
    `MACHINE_AUDIENCE`, so it must be the single value `edfiadminapp-api`. The
    extra `account` audience is injected by Keycloak's **Audience Resolve**
    mapper in the default **`roles`** client scope — on the machine client, set
    that `roles` scope from **Default** to **Optional** so `aud` is just
    `edfiadminapp-api`. Decode the token (its middle segment) to confirm.
- **Token request fails with `404 Not Found` (often an IIS/web-server error
  page).** `TOKEN_URL` is not your Keycloak — the `/auth/...` path is the Docker
  stack convention and your host serves something else there. Resolve the real
  endpoint from your issuer's discovery document (see
  [Finding your token endpoint](#finding-your-token-endpoint)).
- **Token request fails with `401 invalid_client` / `400 unauthorized_client`.**
  The service-account client does not exist, the secret is wrong, or it is
  missing the `client_credentials` grant. On Keycloak confirm the client exists
  with **Service accounts** enabled and the audience / `login:app` / `client_id`
  mappers in place (see
  [Setup Keycloak machine account](machine-user-setup#setup-keycloak-machine-account-manually)).
