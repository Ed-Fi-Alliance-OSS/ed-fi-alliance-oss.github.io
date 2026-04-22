# Deploy on PostgreSQL

This page walks through installing the Ed-Fi OneRoster© service against
an Ed-Fi ODS that runs on PostgreSQL. The service ships SQL artifacts
for Ed-Fi Data Standard 4.0 and 5.0 through 5.2. The deployment script
picks the right set based on the argument you pass.

## Prerequisites

- An Ed-Fi ODS PostgreSQL database reachable from where the OneRoster©
  Node service will run
- A database user that can create schemas, tables, indexes, and
  materialized views in the ODS database
- Node.js 18 LTS or later, for running the service
- Bash, for the deployment script. Windows users can run it under WSL2.

## Step 1. Deploy the SQL artifacts

The SQL artifacts create a separate `oneroster12` schema in the ODS
database, seed the OneRoster©-namespaced descriptors and mappings, and
create the materialized views that back each endpoint.

Clone the OneRoster© service repository, then run the PostgreSQL
deployment script from the repo root:

```bash
git clone https://github.com/Ed-Fi-Alliance-OSS/edfi-oneroster.git
cd edfi-oneroster

# Default (Data Standard 5.0 through 5.2)
./standard/deploy-postgres.sh

# Data Standard 4.0
./standard/deploy-postgres.sh ds4
```

The script reads connection settings from `.env`. See [Environment
variables](../configuration/environment-variables.md) for the exact
keys.

To run the SQL manually instead, concatenate the artifact files and
apply them with `psql`:

```bash
cd standard/5.2.0/artifacts/pgsql/core
cat 00_setup.sql 01_descriptors.sql 02_descriptorMappings.sql \
    academic_sessions.sql orgs.sql courses.sql classes.sql \
    demographics.sql users.sql enrollments.sql > oneroster12.sql

psql -U <username> -d <ods-db-name> -f oneroster12.sql
```

:::tip

For Data Standard 4.0, point at `standard/4.0.0/artifacts/pgsql/core/`
instead.

:::

## Step 2. Configure the Node service

Copy `.env.example` to `.env` and set at least:

- `DB_TYPE=postgres`
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME` for the ODS
- `DB_SSL`, and `DB_SSL_CA` if the server uses a private CA
- `OAUTH2_AUDIENCE` and `OAUTH2_ISSUERBASEURL`. The server fails fast on
  startup if either is missing.
- `OAUTH2_TOKENSIGNINGALG` (typically `RS256`)
- `OAUTH2_PUBLIC_KEY_PEM` if you want PEM-based JWT verification.
  Otherwise leave it blank to use JWKS discovery from
  `OAUTH2_ISSUERBASEURL`.
- `PORT` (defaults to `3000`)
- `PGBOSS_CRON`, the cron expression for the refresh job (default
  `*/15 * * * *`)

See [OAuth and JWT](../configuration/oauth-and-jwt.md) and [CORS, rate
limiting, and proxy](../configuration/cors-rate-limit-proxy.md) for the
remaining configuration groups.

## Step 3. Install and run

```bash
cd edfi-oneroster
npm install
node server.js
```

Verify the service responds:

```bash
curl -i http://localhost:3000/health-check
curl -i http://localhost:3000/ims/oneroster/rostering/v1p2/orgs \
  -H "Authorization: Bearer <token>"
```

The bearer token must be issued by `OAUTH2_ISSUERBASEURL`, have
audience `OAUTH2_AUDIENCE`, and contain at least one OneRoster© v1.2
scope (`roster.readonly`, `roster-core.readonly`, or
`roster-demographics.readonly`).

## Refresh behavior

Materialized views are refreshed concurrently by a
[pg-boss](https://timgit.github.io/pg-boss/) cron job running inside the
Node service, on the schedule given by `PGBOSS_CRON`. Refreshes run one
at a time to avoid contention.

To refresh a view manually:

```sql
REFRESH MATERIALIZED VIEW CONCURRENTLY oneroster12.orgs;
```

## Standing up a local Ed-Fi ODS for testing

The Ed-Fi Alliance publishes sandbox container images with a
pre-populated template database. They are useful for local testing of
OneRoster© queries.

```bash
# Data Standard 5.0
docker run -d -e POSTGRES_PASSWORD=P@ssw0rd -p 5432:5432 \
  edfialliance/ods-api-db-ods-sandbox:7.1

# Data Standard 5.1
docker run -d -e POSTGRES_PASSWORD=P@ssw0rd -p 5432:5432 \
  edfialliance/ods-api-db-ods-sandbox:7.2

# Data Standard 5.2
docker run -d -e POSTGRES_PASSWORD=P@ssw0rd -p 5432:5432 \
  edfialliance/ods-api-db-ods-sandbox:7.3
```

The populated template ships with `datallowconn = false`. Enable
connections before pointing the deployment script at it:

```bash
psql -U postgres -c \
  "ALTER DATABASE \"EdFi_Ods_Populated_Template\" ALLOW_CONNECTIONS true;"
```

### Windows / WSL notes

On Windows, run the deployment script and `psql` under WSL2. This gives
smoother Docker and shell behavior than running them directly in
Windows.

1. Install WSL (Ubuntu recommended):

   ```powershell
   # From an elevated PowerShell prompt
   wsl --install
   ```

2. Install Docker Desktop for Windows and enable the Ubuntu distro
   under _Settings → Resources → WSL Integration_.

3. Start the sandbox container and enable connections, from WSL:

   ```bash
   docker run -d -e POSTGRES_PASSWORD=P@ssw0rd -p 5432:5432 \
     --name edfi-ods-ds5 edfialliance/ods-api-db-ods-sandbox:7.1

   docker exec -it edfi-ods-ds5 psql -U postgres -c \
     "UPDATE pg_database SET datistemplate=false, datallowconn=true \
      WHERE datname='EdFi_Ods_Populated_Template';"
   ```

This step is only needed because the container initialization marks the
populated template as a template database, which blocks connections.
