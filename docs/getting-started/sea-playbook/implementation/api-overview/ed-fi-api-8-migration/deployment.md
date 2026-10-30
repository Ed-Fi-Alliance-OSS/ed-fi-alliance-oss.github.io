---
sidebar_position: 2
---

# Deployment

## Before and after

| | ODS/API 7.x | Ed-Fi API v8 |
| --- | --- | --- |
| How you install | [Binary installation](/reference/ed-fi-api/getting-started/binary-installation) onto IIS, [source code installation](/reference/ed-fi-api/getting-started/source-code-installation), or [Docker](/reference/ed-fi-api/getting-started/getting-started-docker-deployment) | Docker Compose, using the startup scripts in the Ed-Fi API repository. PowerShell-based install scripts are planned |
| What runs | ODS/API web application, plus Admin API or Admin App | Two services: the **Ed-Fi API** and the **Configuration Service** |
| Databases | `EdFi_ODS` (one or more), `EdFi_Admin`, `EdFi_Security` | One or more Ed-Fi API data stores, plus one Configuration Service database that replaces `EdFi_Admin` and `EdFi_Security` |
| Database setup | Installer or PowerShell deployment scripts | `api-schema-tools` CLI provisions the data store schema |
| OAuth tokens | Issued by the ODS/API | Issued by the Configuration Service, using the self-contained identity provider by default, or Keycloak if you choose it |
| School-year instances | ODS instances with context-based routing | Year-specific data stores with route qualifiers |

Ed-Fi API v8 is distributed as Docker images only today. There is no binary installer, Windows Service or IIS option. See [Deployment Model](/reference/ed-fi-api/8/whats-new/release-notes#deployment-model).

Ed-Fi API v8 runs on PostgreSQL or SQL Server. On PostgreSQL, the Ed-Fi API requires version 18 or later with a UTF-8 database encoding, and the Configuration Service requires version 15 or later. The startup scripts choose the engine with `-DatabaseEngine postgresql` (the default) or `-DatabaseEngine mssql`. See [Database versions](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/main/docs/OPERATIONS.md#database-versions).

PowerShell-based install scripts are planned for Ed-Fi API v8, for states that prefer not to run containers. They will not be available before next year, so plan your first deployment on Docker.

## What you need

- Docker Desktop or Podman Desktop, with Docker Compose v2
- PowerShell 7
- Git
- .NET 10 SDK (to build the schema tool)

If your team has run the ODS/API only on Windows servers with IIS, this is the largest change. Check early that your state IT allows container hosting.

## Example: first start

Before, a binary installation meant running the installer packages and configuring IIS. Now:

```powershell
git clone https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service.git
cd Data-Management-Service
dotnet build src/dms/clis/EdFi.DataManagementService.SchemaTools

cd eng/docker-compose
Copy-Item .env.example .env
./bootstrap-local-dms.ps1
```

The startup script stages the API schema and claims, starts the database and the Configuration Service, creates a default data store, provisions the schema and starts the Ed-Fi API. Full steps: [Docker Deployment](/reference/ed-fi-api/8/getting-started/docker-deployment).

To use Keycloak instead of the default self-contained identity provider, add `-IdentityProvider keycloak`. See [Identity Provider](/reference/ed-fi-api/8/platform-dev-guide/configuration/identity-provider).

## Example: one data store per school year

Before, you set up an ODS instance per school year and used context-based routing. Now you create year-specific data stores:

```powershell
./bootstrap-local-dms.ps1 -SchoolYearRange "2024-2025"
```

Each year gets its own route, for example `/api/2025/data/ed-fi/schools`. `-SchoolYearRange "2024-2025"` creates one data store for each year from 2024 through 2025. It is a convenience for local setup and is not idempotent: running it again for a year that already exists fails. See [Context-Based Routing for Year-Specific Data Store](/reference/ed-fi-api/8/platform-dev-guide/configuration/context-based-routing-for-year-specific-datastore).

:::warning

`./bootstrap-local-dms.ps1 -d -v` stops the services **and deletes all data volumes**. Use `-d` alone to stop without deleting data.

:::

## Keeping your state's files

Clone the Ed-Fi API repository and keep your state's extensions, claims, schemas and seed data in a folder of their own under `eng/` (for example, `eng/<your-state>`). The extension, claims and seed data pages explain what goes in each subfolder.

:::info[Still being worked out]

- **PowerShell deployment without Docker.** The Ed-Fi Alliance plans a PowerShell deployment script for states that cannot run containers. It will not be available before next year.
- **Taking new releases.** We have not yet published guidance on how a state pulls a new Ed-Fi API release into its clone, or whether to limit local changes to the state's own `eng/` folder.
- **File formats across releases.** It is not yet settled whether a new release could change the format of the files a state keeps in its folder (claims JSON, ApiSchema output).

:::
