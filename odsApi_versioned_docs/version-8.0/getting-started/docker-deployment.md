---
sidebar_position: 1
---

# Getting Started - Docker Deployment

Ed-Fi API v8 runs as a set of Docker containers orchestrated by Docker Compose.
This page walks through starting the services for the first time using the
scripts in the Ed-Fi API repository.

## Step 1 — Clone the Repository

```powershell
git clone https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service.git
cd Data-Management-Service/eng/docker-compose
```

## Step 2 — Configure the Environment File

Copy the example environment file:

```powershell
Copy-Item .env.example .env
```

The defaults work for local development. Key settings you may want to review:

| Variable | Default | Purpose |
| --- | --- | --- |
| `DMS_CONFIG_IDENTITY_PROVIDER` | `self-contained` | Identity provider: `self-contained` (OpenIddict) or `keycloak` |
| `POSTGRES_PASSWORD` | _(set in .env.example)_ | PostgreSQL admin password |
| `LOG_LEVEL` | `DEBUG` | Ed-Fi API log verbosity |

See [Getting Started — Appendix](getting-started-appendix) for a full
environment variable reference.

## Step 3 — Start the Services

```powershell
./bootstrap-local-dms.ps1
```

This command handles the full startup lifecycle: it stages the API schema and
claims metadata, starts PostgreSQL and the Configuration Service, creates the
default data store, provisions the database schema, and starts the Ed-Fi API.
Initial startup typically takes 3–5 minutes.

### Common Startup Options

| Flag | Purpose |
| --- | --- |
| `-EnableSwaggerUI` | Start Swagger UI alongside the API |
| `-IdentityProvider keycloak` | Use Keycloak instead of the self-contained identity provider |
| `-InfraOnly` | Run infrastructure setup and provisioning only — for launching the Ed-Fi API from an IDE |
| `-LoadSeedData -SeedTemplate Minimal` | Load a minimal Ed-Fi descriptor dataset after startup |
| `-LoadSeedData -SeedTemplate Populated` | Load the full Ed-Fi sample dataset after startup |
| `-SchoolYearRange "2024-2025"` | Create year-specific data stores (see [Context-Based Routing](../platform-dev-guide/configuration/context-based-routing-for-year-specific-datastore.md)) |
| `-DatabaseEngine mssql` | Use SQL Server instead of PostgreSQL |

### Optional: Year-Specific Data Stores

To create separate data stores for multiple school years, pass `-SchoolYearRange`:

```powershell
./bootstrap-local-dms.ps1 -SchoolYearRange "2024-2025"
```

This creates route-qualified data stores accessible at:

```text
http://localhost:8080/api/2024/data/ed-fi/schools
http://localhost:8080/api/2025/data/ed-fi/schools
```

See [Context-Based Routing for Year-Specific Data
Store](../platform-dev-guide/configuration/context-based-routing-for-year-specific-datastore.md)
for details.

### Stopping the Services

Teardown is done via `start-local-dms.ps1`:

| Command | Effect |
| --- | --- |
| `./start-local-dms.ps1 -d` | Stop all services, keep data volumes |
| `./start-local-dms.ps1 -d -v` | Stop all services and delete all data volumes |

:::warning

The `-v` flag permanently deletes all persisted data. Use it only when you want
a clean environment.

:::

## Step 4 — Verify the Services

Once startup completes, confirm the Ed-Fi API is responding:

```powershell
curl http://localhost:8080/api
```

A successful response returns the Ed-Fi Discovery API payload — a JSON object
describing the available data models and API endpoints.

:::note

The Discovery endpoint returns HTTP 200 even before the database is fully
provisioned. Use the health endpoints and an authenticated data request (see
[Configure a Data Store](configure-data-store)) to confirm end-to-end
operation.

:::

Health endpoints are also available:

- `http://localhost:8080/api/health` — Ed-Fi API
- `http://localhost:8081/config/health` — Configuration Service

### Swagger UI

If you started with `-EnableSwaggerUI`, an interactive API browser is available
at `http://localhost:8082`. It allows you to explore and test all Ed-Fi API
endpoints directly from the browser.

## Next Step

With the services running and the data store provisioned, proceed to [Configure a
Data Store](configure-data-store) to get API credentials and make your first
authenticated request.
