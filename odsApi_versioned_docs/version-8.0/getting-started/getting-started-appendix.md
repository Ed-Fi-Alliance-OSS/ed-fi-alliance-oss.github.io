---
sidebar_position: 3
---

# Getting Started — Appendix

## Default Service Ports

| Service | Default Port |
| --- | --- |
| Data Management Service | 8080 |
| Configuration Service | 8081 |
| Swagger UI _(optional)_ | 8082 |
| PostgreSQL | 5435 |
| Keycloak _(optional)_ | 8045 |

Ports can be overridden in the `.env` file before starting the services.

## Environment Variable Reference

The `.env` file in `eng/docker-compose/` controls Docker Compose service
configuration. Copy `.env.example` to `.env` and edit as needed before running
`start-local-dms.ps1`.

### Data Management Service

| Variable | Default | Description |
| --- | --- | --- |
| `DMS_DATASTORE` | `postgresql` | Database engine: `postgresql` or `mssql` |
| `DMS_DEPLOY_DATABASE_ON_STARTUP` | `false` | Provision database schema automatically on container start |
| `DMS_MULTI_TENANCY` | `false` | Enable multi-tenancy |
| `ROUTE_QUALIFIER_SEGMENTS` | _(empty)_ | Route qualifier path segments, e.g. `schoolYear` or `districtId,schoolYear` |
| `MAXIMUM_PAGE_SIZE` | `500` | Maximum number of results per paginated request |
| `MASK_REQUEST_BODY_IN_LOGS` | `true` | Mask request body in DEBUG-level logs |
| `LOG_LEVEL` | `DEBUG` | Log verbosity: `DEBUG`, `INFORMATION`, `WARNING`, `ERROR` |
| `DMS_HTTP_PORTS` | `8080` | Port the DMS container listens on |

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
| `CONFIG_SERVICE_URL` | `http://ed-fi-api-config:8081` | URL DMS uses to reach the Configuration Service (internal Docker network name) |

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
./start-local-dms.ps1 -IdentityProvider keycloak
```

See [Identity Provider Configuration](../platform-dev-guide/configuration/identity-provider)
for Keycloak-specific setup steps.

## Database Overview

Ed-Fi API v8 uses the following databases, all created automatically on first
startup when `DMS_DEPLOY_DATABASE_ON_STARTUP=true`:

| Database | Purpose |
| --- | --- |
| `edfi_datamanagementservice` | Ed-Fi resource and descriptor data (managed by DMS) |
| `edfi_configurationservice` | Vendors, applications, claim sets, and data store configuration |
| `edfi_identity` | OAuth client credentials (OpenIddict; used with self-contained identity provider) |

To provision databases manually, see
[Database Provisioning](../platform-dev-guide/deployment/database-provisioning.md).

## SQL Server

To use SQL Server instead of PostgreSQL:

1. Set `DMS_DATASTORE=mssql` in `.env`
2. Provide a `DATABASE_CONNECTION_STRING` pointing to your SQL Server instance
3. Ensure SQL Server is reachable from the Docker network

:::info

The bundled Docker Compose files use PostgreSQL. SQL Server must be provided
externally (e.g., a local instance or Azure SQL).

:::

## Common Startup Issues

### Timeout Waiting for a Service

If `start-local-dms.ps1` times out waiting for a service to become healthy:

1. Confirm Docker is running: `docker info`
2. Check for port conflicts: `netstat -an | grep -E "8080|8081|5435"`
3. Review container logs: `docker compose logs dms` or
   `docker compose logs config-service`
4. Try a clean restart:

```powershell
./start-local-dms.ps1 -d -v
./start-local-dms.ps1
```

### Schema Fingerprint Mismatch

DMS validates a schema fingerprint on startup. If the deployed database schema
does not match the bundled API schema — for example, after upgrading DMS to a
new version — DMS will refuse to start. Resolve with a full reset:

```powershell
./start-local-dms.ps1 -d -v
./start-local-dms.ps1
```

### PowerShell Execution Policy (Windows)

If Windows blocks the startup script, relax the execution policy for the
current user:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
