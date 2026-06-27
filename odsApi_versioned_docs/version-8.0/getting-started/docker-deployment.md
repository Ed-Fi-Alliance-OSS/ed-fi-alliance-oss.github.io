---
sidebar_position: 1
---

# Getting Started - Docker Deployment

Ed-Fi API v8 runs as a set of Docker containers orchestrated by Docker Compose.
This page walks through starting the services for the first time using the
scripts in the DMS repository.

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
| `DMS_IDENTITY_PROVIDER` | `self-contained` | Identity provider: `self-contained` (OpenIddict) or `keycloak` |
| `POSTGRES_PASSWORD` | _(set in .env.example)_ | PostgreSQL admin password |
| `LOG_LEVEL` | `Information` | DMS log verbosity |

See [Getting Started — Appendix](getting-started-appendix) for a full
environment variable reference.

## Step 3 — Start the Services

```powershell
./start-local-dms.ps1
```

This command starts PostgreSQL, the Configuration Service, and the Data
Management Service. The script waits for each service to become healthy before
proceeding. Initial startup typically takes 1–2 minutes.

### Common Startup Options

| Flag | Purpose |
| --- | --- |
| `-EnableSwaggerUI` | Start Swagger UI alongside the API |
| `-IdentityProvider keycloak` | Use Keycloak instead of the self-contained identity provider |
| `-r` | Force rebuild of Docker images without cache |
| `-InfraOnly` | Start infrastructure and Config Service only — for running DMS from an IDE |

### Stopping the Services

| Command | Effect |
| --- | --- |
| `./start-local-dms.ps1 -d` | Stop all services, keep data volumes |
| `./start-local-dms.ps1 -d -v` | Stop all services and delete all data volumes |

:::warning

The `-v` flag permanently deletes all persisted data. Use it only when you
want a clean environment.

:::

## Step 4 — Verify the Services

Once the script completes, confirm DMS is responding:

```powershell
curl http://localhost:8080
```

A successful response returns the Ed-Fi Discovery API payload — a JSON object
describing the available data models and API endpoints.

Health endpoints are also available:

- `http://localhost:8080/health` — Data Management Service
- `http://localhost:8081/health` — Configuration Service

### Swagger UI

If you started with `-EnableSwaggerUI`, an interactive API browser is available
at `http://localhost:8082`. It allows you to explore and test all DMS endpoints
directly from the browser.

## Next Step

With the services running, proceed to
[Configure a Data Store](configure-data-store) to create client credentials
and a data store.
