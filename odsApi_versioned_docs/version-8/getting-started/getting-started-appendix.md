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
| PostgreSQL _(default database engine)_ | 5435 |
| SQL Server _(with `-DatabaseEngine mssql`)_ | 1435 |
| Keycloak _(optional)_ | 8045 |
| Kafka broker _(streaming)_ | 9092 |
| Kafka Connect REST API _(streaming)_ | 8083 |
| Kafka UI _(with `-EnableKafkaUI`)_ | 8088 |
| Kafka Connect worker metrics _(streaming)_ | 9404 |

Ports can be overridden in the `.env` file before starting the services.

## Environment Variable Reference

The `.env` file in `eng/docker-compose/` controls Docker Compose service
configuration. Copy `.env.example` to `.env` and edit as needed before running
`bootstrap-local-dms.ps1`. For a Kafka evaluation, the
[private configuration step](../how-to-guides/how-to-set-up-kafka-cdc-streaming.mdx#prepare-private-configuration)
creates this file for you.

### Ed-Fi API

| Variable | Default | Description |
| --- | --- | --- |
| `DMS_DATASTORE` | `postgresql` | Database engine: `postgresql` or `mssql` |
| `DMS_MULTI_TENANCY` | `false` | Enable multi-tenancy |
| `ROUTE_QUALIFIER_SEGMENTS` | _(empty)_ | Route qualifier path segments, e.g. `schoolYear` or `districtId,schoolYear` |
| `MAXIMUM_PAGE_SIZE` | `500` | Maximum number of results per paginated request |
| `MASK_REQUEST_BODY_IN_LOGS` | `true` | Mask request body in DEBUG-level logs |
| `LOG_LEVEL` | `Information` | Log verbosity: `Debug`, `Information`, `Warning`, `Error` |
| `DMS_HTTP_PORTS` | `8080` | Port the Ed-Fi API container listens on |

### Optional DocumentCache

Use the `eng/docker-compose/local-dms-document-cache.yml` overlay to select the
registered data store whose cache the API container will update. Add these
settings to the local `.env` file.

```ini
DMS_DOCUMENTCACHE_COMPOSE_FILE=local-dms-document-cache.yml
DMS_DOCUMENTCACHE_TARGET_TENANT_KEY=
DMS_DOCUMENTCACHE_TARGET_DATA_STORE_ID=1
```

Replace `1` with the Configuration Service ID of the intended data store. Use
the matching tenant key for a multi-tenant deployment; an empty key selects the
default tenant.

If you need seed data, run bootstrap without `-LoadSeedData`, activate and
verify the cache, then run `load-dms-seed-data.ps1` with the seed options you
would have passed to bootstrap, such as `-SeedTemplate`.

| Variable | Default | Effect |
| --- | --- | --- |
| `DMS_DOCUMENTCACHE_COMPOSE_FILE` | Empty; no overlay | `start-local-dms.ps1` adds this Compose file when starting API services. Relative paths resolve from `eng/docker-compose/`; the file must exist. |
| `DMS_DOCUMENTCACHE_TARGET_TENANT_KEY` | Empty | Maps to `DataManagement__DocumentCache__Targets__0__TenantKey`. |
| `DMS_DOCUMENTCACHE_TARGET_DATA_STORE_ID` | Required when using the overlay | Maps to `DataManagement__DocumentCache__Targets__0__DataStoreId`; must be a positive registered data store ID. |

The base `local-dms.compose.yml` file maps the following `.env` variables
to settings in the API container.

| Variable | Default | Effect |
| --- | --- | --- |
| `DMS_DOCUMENTCACHE_READ_ACCELERATION_ENABLED` | `false` | Enables cached resource and descriptor GETs on the configured targets. |
| `DMS_DOCUMENTCACHE_READ_ACCELERATION_DIRECT_FILL_TIMEOUT` | `00:00:00.250` | Time allowed to refresh a cached copy after a read from the relational tables. |
| `DMS_DOCUMENTCACHE_PROJECTOR_POLL_INTERVAL` | `00:00:05` | Time between worker polls. |
| `DMS_DOCUMENTCACHE_PROJECTOR_PAGE_SIZE` | `100` | Number of items the worker reads per page. |
| `DMS_DOCUMENTCACHE_PROJECTOR_MAX_CONCURRENT_TARGETS` | `2` | Maximum number of data stores one API instance updates at once. |
| `DMS_DOCUMENTCACHE_PROJECTOR_FAILURE_BACKOFF` | `00:00:30` | Time the worker waits before retrying after a database failure. |
| `DMS_DOCUMENTCACHE_PROJECTOR_BASELINE_HIGH_WATER_MARK` | `1000` | Activation or rebuild pauses adding existing documents at this queue size and resumes when the queue falls below it. |
| `DMS_DOCUMENTCACHE_ADMINISTRATION_WORKFLOW_TIMEOUT` | `1.00:00:00` | Time allowed for an administration command. |
| `DMS_DOCUMENTCACHE_STATUS_OBSERVATION_TIMEOUT` | `00:00:05` | Time allowed to read one target's status from the database. |
| `DMS_DOCUMENTCACHE_STATUS_ENDPOINT_TIMEOUT` | `00:00:30` | Time allowed for the entire HTTP status request. |
| `DMS_DOCUMENTCACHE_STATUS_REQUIRED_ROLE` | Empty | Role required to call `GET /health/document-cache`. An empty value disables the endpoint. |

Set `DMS_DOCUMENTCACHE_STATUS_REQUIRED_ROLE` to an administrator-only role
and follow the [DocumentCache activation guide](../platform-dev-guide/features/document-cache.md#before-you-start)
to activate the database and verify worker status. To enable accelerated reads
after activation, set `DMS_DOCUMENTCACHE_READ_ACCELERATION_ENABLED=true` in
`.env` and recreate the API container.

### Optional Kafka Streaming

The `kafka-cdc.compose.yml` file extends the broker in `kafka-broker.compose.yml`
and defines the Kafka Connect worker. Bootstrap starts the worker after its
setup checks. With `-EnableKafkaUI`, it also loads `kafka-ui.compose.yml`.
All four published ports bind to loopback.

| Variable | Evaluation value and source | Purpose |
| --- | --- | --- |
| `KAFKA_PORT` | `9092` from `.env.example` | Broker port for host-side administration. |
| `CONNECT_SOURCE_PORT` | `8083` from `kafka-cdc.compose.yml` | Kafka Connect REST API on the host. |
| `KAFKA_UI_PORT` | `8088` from `.env.example` | Kafka UI in the host browser. |
| `CDC_METRICS_PORT` | `9404` from `kafka-cdc.compose.yml` | Worker metrics endpoint used by the status command. |
| `CDC_DATABASE_PASSWORD` | Generated in the walkthrough | Password for the restricted `cdc_reader` database login. The worker resolves it when connecting. |
| `CDC_WORKER_HEAP_MIB` | `1024` set by the walkthrough | Worker heap in MiB. The matching CDC setting, `Worker.HeapBytes`, is `1073741824` bytes. |

Use [Prepare Private Configuration](../how-to-guides/how-to-set-up-kafka-cdc-streaming.mdx#prepare-private-configuration)
to generate the credentials, select the engine, and assign unique local
image names for the API and Configuration Service. Keep the published ports
and heap size consistent with the [CDC settings](../platform-dev-guide/configuration/configuration-details.mdx#event-streaming-with-kafka).

### PostgreSQL

| Variable | Default | Description |
| --- | --- | --- |
| `POSTGRES_PASSWORD` | _(set in .env.example)_ | PostgreSQL admin password |
| `POSTGRES_DB_NAME` | `edfi_datamanagementservice` | Primary database name |
| `POSTGRES_PORT` | `5435` | Host port mapped to the PostgreSQL container |

### Configuration Service

| Variable | Default | Description |
| --- | --- | --- |
| `CONFIGURATION_SERVICE_ASPNETCORE_HTTP_PORTS` | `8081` | Port the Configuration Service container listens on |
| `CONFIGURATION_SERVICE_IDENTITY_PROVIDER` | `self-contained` | Identity provider: `self-contained` or `keycloak` |
| `CONFIGURATION_SERVICE_MULTI_TENANCY` | `false` | Enable multi-tenancy for the Configuration Service |
| `CONFIGURATION_SERVICE_DEPLOY_DATABASE` | `true` | Provision Configuration Service database on start |
| `CONFIGURATION_SERVICE_LOG_LEVEL` | `Information` | Configuration Service log verbosity |
| `DMS_CONFIGURATION_SERVICE_URL` | `http://ed-fi-api-config:8081` | URL the Ed-Fi API uses to reach the Configuration Service (internal Docker network name) |

:::info

The Docker Compose files support more settings than the ones listed here, such as
rate limits, circuit breaker thresholds, and JWT clock skew. See
[Configuration Details](../platform-dev-guide/configuration/configuration-details)
for the full reference.

:::

## Identity Provider Options

### Self-Contained (Default)

Uses [OpenIddict](https://openiddict.com/) embedded in the Configuration
Service. No external dependency is required. This is the recommended option for
development and most production deployments.

```ini
CONFIGURATION_SERVICE_IDENTITY_PROVIDER=self-contained
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
Alternatively, the Configuration Service can use its own database. Pass
`-SeparateConfigDatabase` to `bootstrap-local-dms.ps1` to create a separate
`edfi_configurationservice` database, or point the Configuration Service at
another database with the `CONFIGURATION_SERVICE_DATABASE_CONNECTION_STRING`
environment variable.

The Configuration Service schema is deployed automatically on startup when
`CONFIGURATION_SERVICE_DEPLOY_DATABASE=true` (the default). The data stores used by the Ed-Fi
API are not deployed by the API container on startup; it is provisioned as a
separate phase by the startup scripts (using the `api-schema-tools` CLI), which
`bootstrap-local-dms.ps1` orchestrates for you.

| Schema | Application | Purpose |
| --- | --- | --- |
| `dms`, `edfi`, `tracked_changes_<project>` (e.g. `tracked_changes_edfi`, `tracked_changes_tpdm`) | Ed-Fi API | Ed-Fi resource and descriptor data |
| `auth` | Ed-Fi API | Database views that platform hosts create for custom view-based authorization |
| `dmscs` | Configuration Service | Vendors, applications, claim sets, data store configuration, and OAuth client credentials (OpenIddict, used with the self-contained identity provider) |

To provision the database manually, see
[Database Provisioning](../platform-dev-guide/utilities/database-provisioning.md).

## SQL Server

To use SQL Server instead of PostgreSQL, pass `-DatabaseEngine mssql` to the
startup script:

```powershell
./bootstrap-local-dms.ps1 -DatabaseEngine mssql
```

`-DatabaseEngine mssql` runs against the bundled SQL Server 2025 container
(`dms-mssql`, on host port `1435`), configured by the `.env.mssql` overlay; the local startup scripts
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
4. Try a clean restart, passing the same flags you used at startup
   (e.g. `-DatabaseEngine mssql`, `-IdentityProvider keycloak`):

```powershell
./bootstrap-local-dms.ps1 -d -v   # add your original flags here
./bootstrap-local-dms.ps1         # add your original flags here
```

### Schema Fingerprint Mismatch

The Ed-Fi API validates a schema fingerprint on first use. If the deployed
database schema does not match the API schema the service loaded — for example,
after upgrading to a new version — the API responds with **HTTP 503** until the
database is re-provisioned for the current schema. Because the result is cached
for the process lifetime, resolve it locally with a full reset (which
re-provisions a fresh database and restarts the services. Pass the same flags
you used at startup (e.g. `-DatabaseEngine mssql`, `-IdentityProvider keycloak`):

```powershell
./bootstrap-local-dms.ps1 -d -v   # add your original flags here
./bootstrap-local-dms.ps1          # add your original flags here
```

For details, see [Database
Provisioning](../platform-dev-guide/utilities/database-provisioning.md#schema-fingerprint-validation).

### PowerShell Execution Policy (Windows)

If Windows blocks the startup script, relax the execution policy for the
current user:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
