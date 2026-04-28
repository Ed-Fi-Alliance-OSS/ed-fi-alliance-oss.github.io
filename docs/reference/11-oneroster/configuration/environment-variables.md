# Environment Variables

The OneRoster® Node service reads configuration from environment
variables, typically supplied via a `.env` file at the application
root. The sample `.env.example` in the service repository lists every
variable. The tables below group them by concern and note defaults and
required-or-optional status.

The service connects to the ODS API's `EdFi_Admin` database — not to
an ODS database directly. At request time, it looks up which ODS
instance to query from claims on the inbound JWT and resolves the ODS
connection string from `EdFi_Admin.OdsInstances`. See [OAuth and
JWT](./oauth-and-jwt.md) for the claim shapes the service expects.

## Minimum viable configuration

A minimum `.env` for a native PostgreSQL deployment against a
single-tenant `EdFi_Admin`:

```env
DB_TYPE=postgres
CONNECTION_CONFIG={"adminConnection":"host=localhost;port=5432;database=EdFi_Admin;username=<your-username>;password=<your-password>"}
ODS_CONNECTION_STRING_ENCRYPTION_KEY=<base64 key matching the ODS API's ApiSettings:OdsConnectionStringEncryptionKey>

OAUTH2_ISSUERBASEURL=https://your-issuer/
OAUTH2_AUDIENCE=http://localhost:3000
OAUTH2_TOKENSIGNINGALG=RS256
```

The server fails to start if `OAUTH2_ISSUERBASEURL` or
`OAUTH2_AUDIENCE` is missing, if `CONNECTION_CONFIG` is unset (or,
in multi-tenant mode, if `TENANTS_CONNECTION_CONFIG` is unset), or if
`DB_SSL_CA` is set but unreadable.

## Application

| Variable | Default | Notes |
| --- | --- | --- |
| `PORT` | `3000` | TCP port the Node service listens on. |
| `API_BASE_PATH` | _(empty)_ | Set when the service is hosted under a virtual directory (for example, `/oneroster` behind IIS). Used to generate deterministic discovery URLs. |
| `NODE_ENV` | `dev` | Set to `prod` (or empty) for production. Influences logging verbosity. |

## Connection and tenancy

The service takes its database engine from `DB_TYPE` and one or two
admin-database connection blobs in JSON form. ODS connection strings
themselves are _not_ supplied here — they live encrypted inside
`EdFi_Admin.OdsInstances`, and the service decrypts them at request
time using `ODS_CONNECTION_STRING_ENCRYPTION_KEY`.

### Engine

| Variable | Default | Notes |
| --- | --- | --- |
| `DB_TYPE` | `postgres` | `postgres` or `mssql`. Applies to both the admin-database connection and the ODS connections resolved through it. |

### Admin database (single-tenant, default)

| Variable | Default | Notes |
| --- | --- | --- |
| `CONNECTION_CONFIG` | _(none)_ | Required in single-tenant mode. JSON with an `adminConnection` key whose value is an `EdFi_Admin` connection string for the configured `DB_TYPE`. Ignored when `MULTITENANCY_ENABLED=true`. |
| `ODS_CONNECTION_STRING_ENCRYPTION_KEY` | _(none)_ | Required. Base64-encoded AES key used to decrypt the ODS connection strings stored in `EdFi_Admin.OdsInstances`. **Must match** the ODS API's `ApiSettings:OdsConnectionStringEncryptionKey`. Without this key, the service cannot connect to any ODS. |

PostgreSQL example:

```env
CONNECTION_CONFIG={"adminConnection":"host=localhost;port=5432;database=EdFi_Admin;username=<your-username>;password=<your-password>"}
```

Microsoft SQL Server example:

```env
CONNECTION_CONFIG={"adminConnection":"server=localhost;database=EdFi_Admin;user id=<your-username>;password=<your-password>;encrypt=false;TrustServerCertificate=true"}
```

### Multi-tenant mode

| Variable | Default | Notes |
| --- | --- | --- |
| `MULTITENANCY_ENABLED` | `false` | Set to `true` to enable multi-tenant routing. Must match the ODS API's multi-tenancy setting. |
| `TENANTS_CONNECTION_CONFIG` | _(none)_ | Required when `MULTITENANCY_ENABLED=true`. JSON object mapping tenant identifier to an `{adminConnection: "..."}` entry. Tenant identifiers are matched case-insensitively against the `:tenantId` route segment and the JWT's `tenantId` claim. |

PostgreSQL example:

```env
MULTITENANCY_ENABLED=true
TENANTS_CONNECTION_CONFIG={"Tenant1":{"adminConnection":"host=localhost;port=5432;database=EdFi_Admin_Tenant1;username=<your-username>;password=<your-password>"},"Tenant2":{"adminConnection":"host=localhost;port=5432;database=EdFi_Admin_Tenant2;username=<your-username>;password=<your-password>"}}
```

When multi-tenancy is enabled, every OneRoster route is prefixed with
the tenant identifier (for example,
`/Tenant1/ims/oneroster/rostering/v1p2/orgs`), and the route's tenant
must match the JWT's `tenantId` claim. A mismatch returns HTTP 401;
an unknown tenant returns HTTP 404.

### ODS context routing (optional)

| Variable | Default | Notes |
| --- | --- | --- |
| `ODS_CONTEXT_ROUTE_TEMPLATE` | _(empty)_ | When set, adds a named route segment (for example, school year) that the service uses to pick between multiple ODS instances authorized on the same JWT. |

Template grammar: `{parameterName:constraintType(args)}`. Supported
constraint types are `range(min,max)`, `int`, `regex(pattern)`, and
`values(a,b,c)`.

```env
ODS_CONTEXT_ROUTE_TEMPLATE={schoolYearFromRoute:range(2026,2027)}
```

With the template above, routes become
`/{schoolYearFromRoute}/ims/oneroster/rostering/v1p2/...` (or
`/{tenantId}/{schoolYearFromRoute}/...` under multi-tenancy), and the
service selects the `OdsInstances[*]` entry from the JWT whose
`OdsInstanceContext.ContextKey` equals `schoolYearFromRoute` and whose
`ContextValue` matches the route segment. Leave empty to disable.

See [OAuth and JWT](./oauth-and-jwt.md#jwt-claims-used-for-ods-resolution)
for the exact JWT claim shapes.

## PostgreSQL

These settings apply when `DB_TYPE=postgres`.

| Variable | Default | Notes |
| --- | --- | --- |
| `DB_SSL` | `false` | When `true`, enables TLS with certificate validation (`rejectUnauthorized: true`). |
| `DB_SSL_CA` | _(empty)_ | Optional path to a CA PEM file. Only used when `DB_SSL=true`. Startup fails fast if set but unreadable. |
| `PG_BOSS_CONNECTION_CONFIG` | _(empty)_ | PostgreSQL connection used by [pg-boss](https://timgit.github.io/pg-boss/) as its job-metadata store. Same JSON shape as `CONNECTION_CONFIG`. Point at one tenant's admin DB (multi-tenant), the same DB as `CONNECTION_CONFIG` (single-tenant), or a dedicated database reserved for pg-boss. |
| `PGBOSS_CRON` | `*/15 * * * *` | Cron expression for the pg-boss job that refreshes materialized views. Accepts standard 5-field cron syntax. |

## Microsoft SQL Server

The SQL Server variant does not use pg-boss. Scheduling is driven by
the SQL Server Agent job `OneRoster Data Refresh` installed by the
deployment script. No additional runtime variables are needed beyond
the `mssql` connection string embedded in `CONNECTION_CONFIG` (or
`TENANTS_CONNECTION_CONFIG`). See [Deploy on Microsoft SQL
Server](../getting-started/deploy-mssql.md) for commands to change the
cadence.

## OAuth 2.0 and JWT

See [OAuth and JWT](./oauth-and-jwt.md) for the detailed behavior,
including the JWT claims used to pick the authorized ODS instance.

| Variable | Default | Notes |
| --- | --- | --- |
| `OAUTH2_ISSUERBASEURL` | _(none)_ | Required. Base URL of the OAuth 2.0 issuer (typically your Ed-Fi ODS / API's `/oauth/` endpoint). The `/.well-known/jwks.json` path is resolved against this when PEM verification is not configured. |
| `OAUTH2_AUDIENCE` | _(none)_ | Required. Expected `aud` claim on inbound JWTs. |
| `OAUTH2_TOKENSIGNINGALG` | `RS256` | JWT signing algorithm. |
| `OAUTH2_PUBLIC_KEY_PEM` | _(empty)_ | If set, the service verifies JWTs with this PEM public key instead of fetching JWKS. Use `\n` for line breaks when storing in `.env`. Must match the ODS API's `Security:Jwt:SigningKey:PublicKey`. |

## CORS, rate limiting, and proxy

See [CORS, rate limiting, and proxy](./cors-rate-limit-proxy.md) for
the behavior details.

| Variable | Default | Notes |
| --- | --- | --- |
| `CORS_ORIGINS` | `http://localhost:3000` | Comma-separated allowed origins. Leave empty to allow all (not recommended in production). |
| `RATE_LIMIT_WINDOW_MS` | `60000` | Rate-limit window in milliseconds (`express-rate-limit`). |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Maximum requests per window per IP. |
| `TRUST_PROXY` | `false` | When `true`, the service trusts `X-Forwarded-*` headers. Required when running behind IIS, NGINX, or ARR. |

## Deployment-script variables

The schema-deployment scripts under `standard/` (`deploy-pgsql.js`,
`deploy-mssql.js`) read a separate file, `standard/.env.deploy`, that
contains direct ODS connection credentials used only to install the
`oneroster12` schema into an ODS database. These are not read by the
running service. See [Deploy on PostgreSQL](../getting-started/deploy-postgres.md)
or [Deploy on Microsoft SQL Server](../getting-started/deploy-mssql.md)
for the exact variables.

## Docker Compose specific

The Docker Compose stack under `stack/` introduces additional
variables used by the sample end-to-end environment. These are
present in the `.env.{dataStandardVersion}.example` files and
documented in the [stack README](https://github.com/Ed-Fi-Alliance-OSS/edfi-oneroster/blob/main/stack/README.md).
Common ones:

| Variable | Purpose |
| --- | --- |
| `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_PORT` | Credentials shared between the ODS, admin, and OneRoster containers. |
| `ODS_DB_IMAGE_7X`, `ODS_DB_TAG_7X`, `ODS_API_TAG_7X`, `SWAGGER_TAG_7X`, `ADMIN_DB_TAG_7X` | Pin Ed-Fi image versions. |
| `BASE_URL`, `ODS_API_VIRTUAL_NAME`, `ONEROSTER_API_VIRTUAL_NAME`, `DOCS_VIRTUAL_NAME` | Hostnames used by NGINX routing and TLS. |
| `SECURITY__JWT__PRIVATEKEY`, `SECURITY__JWT__PUBLICKEY` | JWT signing keys used by the Ed-Fi v7 API. Required before start, or generated via `-GenerateSigningKeys`. |
| `NODE_EXTRA_CA_CERTS` | Path to the self-signed CA bundled under `stack/ssl`. |
| `LOGS_FOLDER` | Bind-mounted into the v7 API container. |

These variables govern the Compose stack only. A production OneRoster
deployment reads an externally-operated `EdFi_Admin` and OAuth
issuer and does not need them.

## Quick sanity check

After populating `.env`, confirm the service can start:

```bash
node server.js
# The process exits immediately with an error if OAUTH2_AUDIENCE or
# OAUTH2_ISSUERBASEURL is missing, if CONNECTION_CONFIG / TENANTS_CONNECTION_CONFIG
# cannot be parsed, or if DB_SSL_CA is set but unreadable.

curl -i http://localhost:3000/health-check
```
