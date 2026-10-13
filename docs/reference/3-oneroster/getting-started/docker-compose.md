# Docker Compose (Demo)

:::warning

**The bundled Docker Compose stack is for demo and evaluation only.** It
runs a small, self-contained environment for development, testing against
a known data set, or trying OneRoster® end-to-end with a bundled Ed-Fi
ODS / API and OAuth token issuer. Do not use it for production.

For production-supported deployments, use one of the native paths:
[PostgreSQL](./deploy-postgres.md), [Microsoft SQL
Server](./deploy-mssql.md), or [IIS](./deploy-iis.md).

:::

The stack lives in the service repository under `stack/` and brings
up:

- The Ed-Fi ODS / API v7 (used as both the OAuth issuer and the Ed-Fi
  resource API) plus its `EdFi_Admin` database
- An NGINX TLS reverse proxy fronting the APIs
- The OneRoster Node service, built from the repository root
- Swagger UI and pgAdmin for inspection

## Prerequisites

- Docker Desktop or Docker Engine with Compose v2
- PowerShell 7 or later (`pwsh`). The helper scripts are PowerShell and
  run on macOS, Linux, and Windows.
- Git

## Quick start

From a clone of `Ed-Fi-Alliance-OSS/edfi-oneroster`:

```bash
cd stack
cp .env.5.2.0.example .env.5.2.0    # or .env.4.0.0.example for DS 4.0
# edit .env.5.2.0 with credentials, image tags, JWT keys, and
# ODS_CONNECTION_STRING_ENCRYPTION_KEY

pwsh ./start-services.ps1 -EnvFile ./.env.5.2.0 -GenerateSigningKeys -InitializeAdminClients
```

`-GenerateSigningKeys` creates an ephemeral RSA key pair for a
zero-config trial; `-InitializeAdminClients` seeds test vendors and
API clients. For the full set of helper-script flags (`-Rebuild`,
`-Purge`, custom env file paths, teardown), see
[stack/README.md](https://github.com/Ed-Fi-Alliance-OSS/edfi-oneroster/blob/main/stack/README.md).

## Accessing the stack

Once containers are healthy:

| Service | URL |
| --- | --- |
| Ed-Fi API | `https://localhost/<ODS_API_VIRTUAL_NAME>` |
| OneRoster API | `https://localhost/<ONEROSTER_API_VIRTUAL_NAME>` |
| Swagger UI | `https://localhost/<DOCS_VIRTUAL_NAME>` |
| pgAdmin | `http://localhost:5050` |

Virtual-name values come from the env file. See [Environment
variables](../configuration/environment-variables.md) for the configuration
keys the OneRoster service itself uses.
