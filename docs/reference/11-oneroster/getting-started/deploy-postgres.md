# Deploy on PostgreSQL

This page covers running the Ed-Fi OneRoster® Node service against an
Ed-Fi ODS that runs on PostgreSQL. Two distinct steps are involved:

- **Schema deployment.** A one-time install of the `oneroster12`
  schema (materialized views + descriptor seed data) into each ODS
  database the service will serve. Uses direct ODS credentials.
- **Runtime configuration.** The running service connects to the ODS
  API's `EdFi_Admin` database (not an ODS directly) and resolves the
  correct ODS from JWT claims on each request.

## Prerequisites

- An Ed-Fi ODS PostgreSQL database reachable from where the deployment
  script will run, plus the ODS API's `EdFi_Admin` database reachable
  from where the OneRoster Node service will run
- The ODS API's `ApiSettings:OdsConnectionStringEncryptionKey` value.
  The OneRoster service uses the same key to decrypt the ODS
  connection strings it reads from `EdFi_Admin.OdsInstances`.
- Node.js 18 LTS or later

## Step 1. Deploy the SQL artifacts

Install the `oneroster12` schema (materialized views, descriptors,
descriptor mappings) into your ODS database. The commands and the
`standard/.env.deploy` template live with the schema source:

- [standard/README_pgsql.md](https://github.com/Ed-Fi-Alliance-OSS/edfi-oneroster/blob/main/standard/README_pgsql.md)
  — automated (`node standard/deploy-pgsql.js`) and manual (`psql`)
  paths for Data Standard 4.0 and 5.x.

Run the deployment once per ODS instance you intend to serve.

## Step 2. Configure the Node service

Copy `.env.example` to `.env` at the repository root and set at least:

- `DB_TYPE=postgres`
- `CONNECTION_CONFIG` — JSON with an `adminConnection` value pointing
  at the ODS API's `EdFi_Admin` database. Example:

  ```env
  CONNECTION_CONFIG={"adminConnection":"host=localhost;port=5432;database=EdFi_Admin;username=<your-username>;password=<your-password>"}
  ```

- `ODS_CONNECTION_STRING_ENCRYPTION_KEY` — the base64 AES key that
  matches the ODS API's `ApiSettings:OdsConnectionStringEncryptionKey`
- `DB_SSL`, and `DB_SSL_CA` if `EdFi_Admin` requires TLS with a
  private CA
- `PG_BOSS_CONNECTION_CONFIG` — same JSON shape as
  `CONNECTION_CONFIG`. Points at the PostgreSQL database pg-boss uses
  to store its job metadata. Reusing `EdFi_Admin` is the simplest
  default; a dedicated database is also supported.
- `PGBOSS_CRON`, the cron expression for the refresh job (default
  `*/15 * * * *`)
- `OAUTH2_AUDIENCE` and `OAUTH2_ISSUERBASEURL`. The server fails fast
  on startup if either is missing.
- `OAUTH2_TOKENSIGNINGALG` (typically `RS256`)
- `OAUTH2_PUBLIC_KEY_PEM` if you want PEM-based JWT verification.
  Otherwise leave it blank to use JWKS discovery from
  `OAUTH2_ISSUERBASEURL`.
- `PORT` (defaults to `3000`)

For multi-tenant deployments, set `MULTITENANCY_ENABLED=true` and use
`TENANTS_CONNECTION_CONFIG` (a JSON map of tenant → `adminConnection`)
instead of `CONNECTION_CONFIG`. For school-year or other context
routing, set `ODS_CONTEXT_ROUTE_TEMPLATE`. See [Environment
variables](../configuration/environment-variables.md#connection-and-tenancy)
for the full reference.

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
audience `OAUTH2_AUDIENCE`, contain at least one OneRoster v1.2 scope
(`roster.readonly`, `roster-core.readonly`, or
`roster-demographics.readonly`), and carry the `odsInstanceId` claim
(and `tenantId` in multi-tenant mode). See [JWT claims used for ODS
resolution](../configuration/oauth-and-jwt.md#jwt-claims-used-for-ods-resolution).

## Refresh behavior

Materialized views are refreshed concurrently by a
[pg-boss](https://timgit.github.io/pg-boss/) cron job running inside the
Node service, on the schedule given by `PGBOSS_CRON`. Refreshes run one
at a time to avoid contention. pg-boss job metadata is stored in the
database named by `PG_BOSS_CONNECTION_CONFIG`.

To refresh a view manually:

```sql
REFRESH MATERIALIZED VIEW CONCURRENTLY oneroster12.orgs;
```

## Standing up a local Ed-Fi ODS for testing

For end-to-end local testing that stands up an ODS, `EdFi_Admin`, and
an Ed-Fi ODS / API configured as the OAuth issuer, use the [Docker
Compose demo stack](./docker-compose.md). For a standalone ODS
container (without the API or admin DB), see the Ed-Fi ODS / API
sandbox images in the [Ed-Fi ODS / API
documentation](/reference/ods-api/).
