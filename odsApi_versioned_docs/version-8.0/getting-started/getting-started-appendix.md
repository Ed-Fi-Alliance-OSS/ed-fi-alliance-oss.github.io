---
sidebar_position: 3
---

# Getting Started - Appendix

## Default Service Ports

| Service | Default Port |
| --- | --- |
| Ed-Fi API | 8080 |
| Configuration Service | 8081 |
| Swagger UI _(optional)_ | 8082 |
| PostgreSQL | 5435 |
| Keycloak _(optional)_ | 8045 |

Ports can be overridden in the `.env` file before starting the services.

## Environment Variable Reference

The `.env` file in `eng/docker-compose/` controls Docker Compose service
configuration. Copy `.env.example` to `.env` and edit as needed before running
`bootstrap-local-dms.ps1`.

### Ed-Fi API

| Variable | Default | Description |
| --- | --- | --- |
| `DMS_DATASTORE` | `postgresql` | Database engine: `postgresql` or `mssql` |
| `DMS_MULTI_TENANCY` | `false` | Enable multi-tenancy |
| `ROUTE_QUALIFIER_SEGMENTS` | _(empty)_ | Route qualifier path segments, e.g. `schoolYear` or `districtId,schoolYear` |
| `MAXIMUM_PAGE_SIZE` | `500` | Maximum number of results per paginated request |
| `MASK_REQUEST_BODY_IN_LOGS` | `true` | Mask request body in DEBUG-level logs |
| `LOG_LEVEL` | `DEBUG` | Log verbosity: `DEBUG`, `INFORMATION`, `WARNING`, `ERROR` |
| `DMS_HTTP_PORTS` | `8080` | Port the Ed-Fi API container listens on |

### PostgreSQL

| Variable | Default | Description |
| --- | --- | --- |
| `POSTGRES_PASSWORD` | _(set in .env.example)_ | PostgreSQL admin password |
| `POSTGRES_DB_NAME` | `edfi_datamanagementservice` | Primary database name |
| `POSTGRES_PORT` | `5435` | Host port mapped to the PostgreSQL container |

### Configuration Service

| Variable | Default | Description |
| --- | --- | --- |
| `DMS_CONFIG_ASPNETCORE_HTTP_PORTS` | `8081` | Port the Configuration Service container listens on |
| `DMS_CONFIG_IDENTITY_PROVIDER` | `self-contained` | Identity provider: `self-contained` or `keycloak` |
| `DMS_CONFIG_MULTI_TENANCY` | `false` | Enable multi-tenancy for the Configuration Service |
| `DMS_CONFIG_DEPLOY_DATABASE` | `true` | Provision Configuration Service database on start |
| `DMS_CONFIG_LOG_LEVEL` | `Information` | Configuration Service log verbosity |
| `CONFIG_SERVICE_URL` | `http://ed-fi-api-config:8081` | URL the Ed-Fi API uses to reach the Configuration Service (internal Docker network name) |

:::info

Advanced settings such as rate limiting, circuit breaker thresholds, and JWT
clock skew are configured in `appsettings.json` inside the container. See
[Configuration Details](../platform-dev-guide/configuration/configuration-details)
for the full reference.

:::

## Identity Provider Options

### Self-Contained (Default)

Uses [OpenIddict](https://openiddict.com/) embedded in the Configuration
Service. No external dependency is required. This is the recommended option for
development and most production deployments.

```ini
DMS_CONFIG_IDENTITY_PROVIDER=self-contained
```

### Keycloak

Uses an external Keycloak instance. Suitable for environments that require
enterprise identity management or single sign-on.

```powershell
./bootstrap-local-dms.ps1 -IdentityProvider keycloak
```

See [Identity Provider Configuration](../platform-dev-guide/configuration/identity-provider)
for Keycloak-specific setup steps.

## Database Overview

Ed-Fi API v8 stores its data in a relational database — PostgreSQL or SQL
Server — organized into separate schemas by concern. By default, the Docker
Compose stack uses PostgreSQL and creates a single database — named by
`POSTGRES_DB_NAME` (default `edfi_datamanagementservice`) — that both services
use, with the Configuration Service's data isolated in the `dmscs` schema.
Alternatively, the Configuration Service can be pointed at its own database (for
example, `edfi_configurationservice`) via the
`DMS_CONFIG_DATABASE_CONNECTION_STRING` environment variable.

The Configuration Service schema is deployed automatically on startup when
`DMS_CONFIG_DEPLOY_DATABASE=true` (the default). The data stores used by the Ed-Fi
API are not deployed by the API container on startup; it is provisioned as a
separate phase by the startup scripts (using the `api-schema-tools` CLI), which
`bootstrap-local-dms.ps1` orchestrates for you.

| Schema | Application | Purpose |
| --- | --- | --- |
| `dms`, `edfi`, `tracked_changes_<project>` (e.g. `tracked_changes_edfi`, `tracked_changes_tpdm`) | Ed-Fi API | Ed-Fi resource and descriptor data |
| `dmscs` | Configuration Service | Vendors, applications, claim sets, data store configuration, and OAuth client credentials (OpenIddict, used with the self-contained identity provider) |

To provision the database manually, see
[Database Provisioning](../platform-dev-guide/utilities/database-provisioning.md).

## SQL Server

To use SQL Server instead of PostgreSQL, pass `-DatabaseEngine mssql` to the
startup script:

```powershell
./bootstrap-local-dms.ps1 -DatabaseEngine mssql
```

`-DatabaseEngine mssql` runs against the bundled SQL Server container
(`dms-mssql`), configured by the `.env.mssql` overlay; the local startup scripts
always register the data store against that container. Pointing the local stack
at an **external** SQL Server is not supported by these scripts. To run against
an external or production SQL Server, provision it with the `api-schema-tools`
CLI and register a data store that targets it through the Configuration Service —
see [Database
Provisioning](../platform-dev-guide/utilities/database-provisioning.md) and [API
Client and Data Store
Configuration](../platform-dev-guide/configuration/api-client-and-data-store-configuration.md).

## Common Startup Issues

### Timeout Waiting for a Service

If `bootstrap-local-dms.ps1` times out waiting for a service to become healthy:

1. Confirm Docker is running: `docker info`
2. Check for port conflicts: `netstat -an | grep -E "8080|8081|5435"`
3. Review container logs: `docker compose logs dms` or
   `docker compose logs config`
4. Try a clean restart:

```powershell
./bootstrap-local-dms.ps1 -d -v
./bootstrap-local-dms.ps1
```

### Schema Fingerprint Mismatch

The Ed-Fi API validates a schema fingerprint on first use. If the deployed
database schema does not match the API schema the service loaded — for example,
after upgrading to a new version — the API responds with **HTTP 503** until the
database is re-provisioned for the current schema. Because the result is cached
for the process lifetime, resolve it locally with a full reset (which
re-provisions a fresh database and restarts the services):

```powershell
./bootstrap-local-dms.ps1 -d -v
./bootstrap-local-dms.ps1
```

For details, see [Database
Provisioning](../platform-dev-guide/utilities/database-provisioning.md#schema-fingerprint-validation).

### PowerShell Execution Policy (Windows)

If Windows blocks the startup script, relax the execution policy for the
current user:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
