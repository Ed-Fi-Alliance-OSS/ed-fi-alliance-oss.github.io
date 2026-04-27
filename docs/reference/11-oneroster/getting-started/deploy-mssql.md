# Deploy on Microsoft SQL Server

This page covers running the Ed-Fi OneRoster® Node service against an
Ed-Fi ODS that runs on Microsoft SQL Server. The SQL Server variant
uses tables and stored procedures in the `oneroster12` schema (rather
than materialized views) and relies on SQL Server Agent to drive
scheduled refreshes.

Two distinct steps are involved:

- **Schema deployment.** A one-time install of the `oneroster12`
  schema, refresh stored procedures, and SQL Server Agent job into
  each ODS database the service will serve. Uses direct ODS
  credentials.
- **Runtime configuration.** The running service connects to the ODS
  API's `EdFi_Admin` database (not an ODS directly) and resolves the
  correct ODS from JWT claims on each request.

## Prerequisites

- SQL Server 2016 or later. This is required for the JSON functions used
  by the refresh procedures.
- An Ed-Fi ODS database on SQL Server reachable from where the
  deployment script will run, plus the ODS API's `EdFi_Admin` database
  reachable from where the OneRoster Node service will run.
- SQL Server Agent must be running. For SQL Server in Docker, add
  `MSSQL_AGENT_ENABLED=True` to the SQL Server container environment.
- The ODS API's `ApiSettings:OdsConnectionStringEncryptionKey` value.
  The OneRoster service uses the same key to decrypt the ODS
  connection strings it reads from `EdFi_Admin.OdsInstances`.
- Node.js 18 LTS or later

## Step 1. Deploy the SQL artifacts and seed data

Install the `oneroster12` schema, refresh stored procedures, and the
SQL Server Agent job into your ODS database, then run the initial
population of the OneRoster tables. The commands and the
`standard/.env.deploy` template live with the schema source:

- [standard/README_mssql.md](https://github.com/Ed-Fi-Alliance-OSS/edfi-oneroster/blob/main/standard/README_mssql.md)
  — automated (`node standard/deploy-mssql.js`) and manual paths for
  Data Standard 4.0 and 5.x, plus the initial `sp_refresh_*` calls to
  seed data.

Run the deployment once per ODS instance you intend to serve. After
the initial population, the Agent job takes over and refreshes every
15 minutes.

## Step 2. Configure the Node service

Copy `.env.example` to `.env` at the repository root and set at least:

- `DB_TYPE=mssql`
- `CONNECTION_CONFIG` — JSON with an `adminConnection` value pointing
  at the ODS API's `EdFi_Admin` database. Example:

  ```env
  CONNECTION_CONFIG={"adminConnection":"server=localhost;database=EdFi_Admin;user id=<your-username>;password=<your-password>;encrypt=false;TrustServerCertificate=true"}
  ```

- `ODS_CONNECTION_STRING_ENCRYPTION_KEY` — the base64 AES key that
  matches the ODS API's `ApiSettings:OdsConnectionStringEncryptionKey`
- `OAUTH2_AUDIENCE`, `OAUTH2_ISSUERBASEURL`, `OAUTH2_TOKENSIGNINGALG`.
  The server fails fast on startup if the first two are missing.
- `OAUTH2_PUBLIC_KEY_PEM` if you want PEM-based JWT verification.
  Otherwise leave it blank to use JWKS discovery.
- `PORT`, `CORS_ORIGINS`, and `TRUST_PROXY` as appropriate for your
  environment

For multi-tenant deployments, set `MULTITENANCY_ENABLED=true` and use
`TENANTS_CONNECTION_CONFIG` (a JSON map of tenant → `adminConnection`)
instead of `CONNECTION_CONFIG`. For school-year or other context
routing, set `ODS_CONTEXT_ROUTE_TEMPLATE`. See [Environment
variables](../configuration/environment-variables.md#connection-and-tenancy)
for the full reference.

See [OAuth and JWT](../configuration/oauth-and-jwt.md) and [Environment
variables](../configuration/environment-variables.md) for the full
list.

## Step 3. Install and run

```bash
cd edfi-oneroster
npm install
node server.js
```

Verify:

```bash
curl -i http://localhost:3000/health-check
curl -i http://localhost:3000/ims/oneroster/rostering/v1p2/orgs \
  -H "Authorization: Bearer <token>"
```

The bearer token must carry the `odsInstanceId` claim (and `tenantId`
in multi-tenant mode). See [JWT claims used for ODS
resolution](../configuration/oauth-and-jwt.md#jwt-claims-used-for-ods-resolution).

## Refresh behavior

A SQL Server Agent job named `OneRoster Data Refresh` runs the master
refresh procedure every 15 minutes. Refresh status and errors are
tracked in the `oneroster12.refresh_history` and
`oneroster12.refresh_errors` tables. For the full set of operational
commands — manually triggering a refresh, enabling or disabling the
job, changing cadence, and querying refresh history — see
[standard/README_mssql.md](https://github.com/Ed-Fi-Alliance-OSS/edfi-oneroster/blob/main/standard/README_mssql.md).

## Troubleshooting

| Symptom | First thing to check |
| --- | --- |
| Data not refreshing on schedule | SQL Server Agent is running. Confirm `enabled = 1` on the `OneRoster Data Refresh` job. |
| `CREATE SCHEMA` or `CREATE PROCEDURE` fails during deployment | The deployment user has `db_owner` (or equivalent) on the target database. |
| JSON-related errors during refresh | SQL Server is 2016 or later. Run `SELECT @@VERSION`. |
| HTTP 403 "ODS Instance identifier is required" | The JWT is missing the `odsInstanceId` claim. Check the issuer is populating it. |
| HTTP 401 on every request with a valid-looking token | `ODS_CONNECTION_STRING_ENCRYPTION_KEY` does not match the ODS API's `ApiSettings:OdsConnectionStringEncryptionKey`, so the resolved ODS connection string cannot be decrypted. |

The SQL Server variant matches the PostgreSQL variant's output
record-for-record (verified by `tests/compare-api.js` and
`tests/compare-database.js` in the service repository). Differences in
OneRoster response content between engines usually point to an
environmental issue rather than a mapping difference.
