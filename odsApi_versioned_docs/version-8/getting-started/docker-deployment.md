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
cd Data-Management-Service
```

## Step 2 — Review the Environment File

The startup scripts read their settings from the `.env` file in the
`eng/docker-compose` directory. On the first run, they create it as a copy of
`.env.example`, so you don't need to create it yourself.

The defaults work for local development. To change a setting before the first
run, copy the example file yourself and edit the copy:

```powershell
cd eng/docker-compose
Copy-Item .env.example .env
```

Key settings you may want to review:

| Variable | Default | Purpose |
| --- | --- | --- |
| `CONFIGURATION_SERVICE_IDENTITY_PROVIDER` | `self-contained` | Identity provider: `self-contained` (OpenIddict) or `keycloak` |
| `POSTGRES_PASSWORD` | _(set in .env.example)_ | PostgreSQL admin password |
| `LOG_LEVEL` | `Information` | Ed-Fi API log verbosity |

See [Getting Started — Appendix](getting-started-appendix) for a full
environment variable reference.

## Step 3 — Start the Services

From the `eng/docker-compose` directory, run:

```powershell
./bootstrap-local-dms.ps1
```

This command handles the full startup lifecycle: it stages the API schema and
claims metadata, starts PostgreSQL and the Configuration Service, creates the
default data store, provisions the database schema, and starts the Ed-Fi API.
Startup typically takes 3–5 minutes. The first run takes longer because it
builds the Ed-Fi API and Configuration Service images and the `api-schema-tools`
CLI.

:::info Prerequisite

The script provisions the database with the `api-schema-tools` CLI, which it
builds from source on the first run. This requires the [.NET 10
SDK](https://dotnet.microsoft.com/download/dotnet/10.0).

:::

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
| `-DataStandardVersion 6.1` | Use Data Standard 6.1 instead of the default, 5.2 |
| `-AddSmokeTestCredentials` | Create API client credentials for local testing and print the key and secret at the end of startup (see [Configure a Data Store](configure-data-store)) |
| `-SeparateConfigDatabase` | Store the Configuration Service data in its own database instead of sharing the Ed-Fi API database |
| `-Rebuild` | Rebuild the local Docker images before starting, for example after updating the repository |

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

Use `bootstrap-local-dms.ps1` to stop the stack started by the same wrapper:

| Command | Effect |
| --- | --- |
| `./bootstrap-local-dms.ps1 -d` | Stop all services; keep data volumes and the `.bootstrap` workspace |
| `./bootstrap-local-dms.ps1 -d -v` | Stop all services, delete data volumes, and remove the `.bootstrap` workspace |

:::warning

`-d -v` permanently deletes all persisted data. Use it only when you want a
fully clean environment.

:::

:::info

Pass the same flags you used at startup so teardown targets the same containers
and volumes. Two common cases:

- **SQL Server**: `./bootstrap-local-dms.ps1 -d -v -DatabaseEngine mssql` —
  omitting `-DatabaseEngine` defaults to PostgreSQL and leaves the SQL Server
  data volume behind.
- **Keycloak**: `./bootstrap-local-dms.ps1 -d -v -IdentityProvider keycloak` —
  omitting `-IdentityProvider` leaves the Keycloak data volume behind.

:::

## Step 4 — Verify the Services

Once startup completes, confirm the Ed-Fi API is responding:

```powershell
Invoke-RestMethod http://localhost:8080/api
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
