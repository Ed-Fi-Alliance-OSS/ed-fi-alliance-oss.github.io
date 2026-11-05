---
sidebar_position: 2
---

# Deployment

## Before and after

| | ODS/API 7.x | Ed-Fi API v8 |
| --- | --- | --- |
| How you install | [Binary installation](/reference/ed-fi-api/getting-started/binary-installation) onto IIS, [source code installation](/reference/ed-fi-api/getting-started/source-code-installation), or [Docker](/reference/ed-fi-api/getting-started/getting-started-docker-deployment) | Docker Compose, using the startup scripts in the [Data-Management-Service](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service) repository. PowerShell-based install scripts are planned |
| What runs | ODS/API web application, plus Admin API or Admin App | Two services: the **Ed-Fi API** and the **Configuration Service** |
| Databases | `EdFi_ODS` (one or more), `EdFi_Admin`, `EdFi_Security` | One or more Ed-Fi API data stores, plus one Configuration Service database that replaces `EdFi_Admin` and `EdFi_Security` |
| Database setup | Installer or PowerShell deployment scripts | `api-schema-tools` CLI provisions the data store schema |
| OAuth tokens | Issued by the ODS/API | Issued by the Configuration Service, using the self-contained identity provider by default, or Keycloak if you choose it |
| School-year instances | ODS instances with context-based routing | Year-specific data stores with route qualifiers |

Ed-Fi API v8 is distributed as Docker images only today. There is no binary installer, Windows Service or IIS option. See [Deployment Model](/reference/ed-fi-api/8/whats-new/release-notes#deployment-model). The Ed-Fi API source documentation describes the Docker Compose files as provided for basic testing and demonstration. If you use them in production, review them carefully, particularly for security (see [Operational Concerns](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/main/docs/OPERATIONS.md#deployment)).

Ed-Fi API v8 runs on PostgreSQL or SQL Server. On PostgreSQL, the Ed-Fi API requires version 18 or later with a UTF-8 database encoding, and the Configuration Service requires version 15 or later. The startup scripts choose the engine with `-DatabaseEngine postgresql` (the default) or `-DatabaseEngine mssql`. See [Database versions](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/main/docs/OPERATIONS.md#database-versions).

In the default Docker setup, secrets such as database connection strings, client secrets and encryption keys are set in the `.env` file. From Ed-Fi API 8.1, a secrets plugin can read them from a vault such as Azure Key Vault or AWS Systems Manager Parameter Store instead. With the shipped Docker Compose files, removing a value from `.env` does not hand it over to the vault, so read [Secrets](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/main/docs/SECRETS.md) before you switch.

Docker is the only supported deployment method today. Ed-Fi API v8 is expected to run without Docker, on a server or virtual machine, but that has not been tested. PowerShell scripts that install it that way are planned for 2027. Until they are available, plan your first deployment on Docker.

## What you need

The Ed-Fi API v8 source code, startup scripts and Docker Compose files are in the [Data-Management-Service](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service) repository on GitHub. The repository keeps the project's development name.

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

If you have used `initdev` on the ODS/API, `bootstrap-local-dms.ps1` is its current equivalent. The difference is that `initdev` sets up the code locally, while `bootstrap-local-dms.ps1` runs everything in Docker.

To run the published Docker images instead of images built from your clone, use `bootstrap-published-dms.ps1` in the same folder. With `-RestoreTemplate Minimal` or `-RestoreTemplate Populated`, it restores a database template instead of provisioning an empty schema.

To use Keycloak instead of the default self-contained identity provider, add `-IdentityProvider keycloak`. See [Identity Provider](/reference/ed-fi-api/8/platform-dev-guide/configuration/identity-provider).

## Example: one data store per school year

Before, you set up an ODS instance per school year and used context-based routing. Now you create year-specific data stores:

```powershell
./bootstrap-local-dms.ps1 -SchoolYearRange "2027-2028"
```

Each year gets its own route, for example `/api/2028/data/ed-fi/schools`. `-SchoolYearRange "2027-2028"` creates one data store for each year, 2027 and 2028. Years follow the Ed-Fi convention of naming a school year by the year it ends, so 2027 is the 2026–2027 school year. It is a convenience for local setup and is not idempotent: running it again for a year that already exists fails. See [Context-Based Routing for Year-Specific Data Store](/reference/ed-fi-api/8/platform-dev-guide/configuration/context-based-routing-for-year-specific-datastore).

:::warning

`./bootstrap-local-dms.ps1 -d -v` stops the services **and deletes all data volumes**. Use `-d` alone to stop without deleting data.

:::

## Keeping your state's files

Clone the `Data-Management-Service` repository and keep your state's extensions, claims, schemas and seed data in a folder of their own under `eng/` (for example, `eng/<your-state>`). The extension, claims and seed data pages explain what goes in each subfolder.

:::info[Still being worked out]

- **PowerShell deployment without Docker.** The Ed-Fi Alliance plans a PowerShell deployment script for 2027, for states that cannot run containers.
- **Taking new releases.** We have not yet published guidance on how a state pulls a new Ed-Fi API release into its clone, or whether to limit local changes to the state's own `eng/` folder.
- **File formats across releases.** It is not yet settled whether a new release could change the format of the files a state keeps in its folder (claims JSON, ApiSchema output).

:::
