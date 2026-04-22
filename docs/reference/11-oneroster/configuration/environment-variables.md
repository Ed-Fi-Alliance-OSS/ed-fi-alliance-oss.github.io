# Environment Variables

The OneRoster® Node service reads configuration from environment
variables, typically supplied via a `.env` file at the application
root. The sample `.env.example` in the service repository lists every
variable. The tables below group them by concern and note defaults and
required or optional status.

## Minimum viable configuration

A minimum `.env` for a native PostgreSQL deployment is:

```env
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=P@ssw0rd
DB_NAME=EdFi_Ods_Populated_Template

OAUTH2_ISSUERBASEURL=https://your-issuer/
OAUTH2_AUDIENCE=http://localhost:3000
OAUTH2_TOKENSIGNINGALG=RS256
```

The server fails to start if `OAUTH2_ISSUERBASEURL` or
`OAUTH2_AUDIENCE` is missing.

## Application

| Variable | Default | Notes |
| --- | --- | --- |
| `PORT` | `3000` | TCP port the Node service listens on. |
| `API_BASE_PATH` | _(empty)_ | Set when the service is hosted under a virtual directory (for example, `/oneroster` behind IIS). Used to generate deterministic discovery URLs. |
| `NODE_ENV` | `dev` | Set to `prod` (or empty) for production. Influences logging verbosity. |
| `API_SERVER_URL` | _(empty)_ | Override for the self-reported server URL in Swagger discovery. Rarely needed. Prefer `API_BASE_PATH` with forwarded-proto headers. |

## Database

Select the engine with `DB_TYPE`. Variables for the other engine are
ignored.

### Common

| Variable | Default | Notes |
| --- | --- | --- |
| `DB_TYPE` | `postgres` | `postgres` or `mssql` |

### PostgreSQL (`DB_TYPE=postgres`)

| Variable | Default | Notes |
| --- | --- | --- |
| `DB_HOST` | `localhost` | PostgreSQL server hostname. |
| `DB_PORT` | `5432` | |
| `DB_USER` | `postgres` | |
| `DB_PASS` | _(none)_ | Required. |
| `DB_NAME` | `EdFi_Ods_Populated_Template` | ODS database name. |
| `DB_SSL` | `false` | When `true`, enables TLS with certificate validation (`rejectUnauthorized: true`). |
| `DB_SSL_CA` | _(empty)_ | Optional path to a CA PEM file. Only used when `DB_SSL=true`. Startup fails fast if the path is set but unreadable or empty. |

### Microsoft SQL Server (`DB_TYPE=mssql`)

| Variable | Default | Notes |
| --- | --- | --- |
| `MSSQL_SERVER` | `localhost` | |
| `MSSQL_DATABASE` | `EdFi_Ods` | ODS database name. |
| `MSSQL_USER` | `sa` | |
| `MSSQL_PASSWORD` | _(none)_ | Required. |
| `MSSQL_PORT` | `1433` | |
| `MSSQL_ENCRYPT` | `false` | When `true`, enables TLS. |
| `MSSQL_TRUST_SERVER_CERTIFICATE` | `true` | Set to `false` in production. |

## OAuth 2.0 and JWT

See [OAuth and JWT](./oauth-and-jwt.md) for the detailed behavior and
for the trade-offs between JWKS and PEM-based verification.

| Variable | Default | Notes |
| --- | --- | --- |
| `OAUTH2_ISSUERBASEURL` | _(none)_ | Required. Base URL of the OAuth 2.0 issuer (typically your Ed-Fi ODS / API's `/oauth/` endpoint). The `/.well-known/jwks.json` path is resolved against this when PEM verification is not configured. |
| `OAUTH2_AUDIENCE` | _(none)_ | Required. Expected `aud` claim on inbound JWTs. |
| `OAUTH2_TOKENSIGNINGALG` | `RS256` | JWT signing algorithm. |
| `OAUTH2_PUBLIC_KEY_PEM` | _(empty)_ | If set, the service verifies JWTs with this PEM public key instead of fetching JWKS. Use `\n` for line breaks when storing in `.env`. |

## Refresh schedule

### PostgreSQL

| Variable | Default | Notes |
| --- | --- | --- |
| `PGBOSS_CRON` | `*/15 * * * *` | Cron expression for the pg-boss job that refreshes materialized views. Accepts standard 5-field cron syntax. |

### Microsoft SQL Server

The SQL Server variant does not use `PGBOSS_CRON`. Scheduling is
controlled by the SQL Server Agent job `OneRoster Data Refresh`. See
[Deploy on Microsoft SQL Server](../getting-started/deploy-mssql.md)
for commands to change the cadence.

## CORS, rate limiting, and proxy

See [CORS, rate limiting, and proxy](./cors-rate-limit-proxy.md) for
the behavior details.

| Variable | Default | Notes |
| --- | --- | --- |
| `CORS_ORIGINS` | `http://localhost:3000` | Comma-separated allowed origins. Leave empty to allow all (not recommended in production). |
| `RATE_LIMIT_WINDOW_MS` | `60000` | Rate-limit window in milliseconds (`express-rate-limit`). |
| `RATE_LIMIT_MAX_REQUESTS` | `60` | Maximum requests per window per IP. The bundled `.env.example` sets this to `100`. The service code uses `60` as the fallback when the variable is unset. |
| `TRUST_PROXY` | `false` | When `true`, the service trusts `X-Forwarded-*` headers. Required when running behind IIS, NGINX, or ARR. |

## Docker Compose specific

The Docker Compose stack under `compose/` introduces additional
variables that are not used by the standalone Node service. These are
present in the `.env.{dataStandardVersion}.example` files and
documented there. Common ones:

| Variable | Purpose |
| --- | --- |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_PORT` | Credentials shared between the ODS, admin, and OneRoster containers. |
| `ODS_DB_IMAGE_7X`, `ODS_DB_TAG_7X`, `ODS_API_TAG_7X`, `SWAGGER_TAG_7X`, `ADMIN_DB_TAG_7X` | Pin Ed-Fi image versions. |
| `BASE_URL`, `V7_SINGLE_API_VIRTUAL_NAME`, `ONEROSTER_API_VIRTUAL_NAME`, `DOCS_VIRTUAL_NAME` | Hostnames used by NGINX routing and TLS. |
| `SECURITY__JWT__PRIVATEKEY`, `SECURITY__JWT__PUBLICKEY` | JWT signing keys used by the Ed-Fi v7 API. Required before start, or generated via `-GenerateSigningKeys`. |
| `NODE_EXTRA_CA_CERTS` | Path to the self-signed CA bundled under `compose/ssl`. |
| `LOGS_FOLDER` | Bind-mounted into the v7 API container. |

These variables govern the Compose stack only. A production OneRoster
deployment reads an externally-operated Ed-Fi ODS and OAuth issuer and
does not need them.

## Quick sanity check

After populating `.env`, confirm the service can start:

```bash
node server.js
# The process exits immediately with an error if OAUTH2_AUDIENCE
# or OAUTH2_ISSUERBASEURL is missing, or if DB_SSL_CA is set but
# unreadable.

curl -i http://localhost:3000/health-check
```
