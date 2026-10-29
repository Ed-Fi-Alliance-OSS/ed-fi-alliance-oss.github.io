---
sidebar_position: 2
---

# Getting Started

This documentation covers how to deploy and configure Ed-Fi API v8, which
comprises two services:

- **Ed-Fi API** — the Ed-Fi REST API for reading and writing education data
- **Configuration Service** — the management API for administering
  vendors, applications, claim sets, and data stores

Ed-Fi API v8 is deployed using Docker. Docker Compose is the supported
deployment method for both local development and production environments.

## Audience

This documentation is for technical professionals who deploy and operate
Ed-Fi API platforms, including system administrators, DevOps engineers, and
developers evaluating or implementing Ed-Fi API v8.

## Prerequisites

| Requirement | Minimum Version | Notes |
| --- | --- | --- |
| Docker Desktop or Podman Desktop | Latest stable | Docker Compose v2 required |
| PowerShell | 7.4 | Cross-platform; required to run the provided startup scripts |
| .NET SDK | 10.0 | Required on first run (the scripts build the `api-schema-tools` CLI) |
| Git | Any | For cloning the source repository |
| PostgreSQL _or_ SQL Server | PostgreSQL 18 (Ed-Fi API) and 15 (Configuration Service); SQL Server 2025 | Choose one database engine. Only needed if you use your own database server; the Docker Compose files include both. A PostgreSQL Ed-Fi API database must be UTF-8. See [Database Requirements](../platform-dev-guide/utilities/database-provisioning.md#database-requirements) |

:::info

These instructions use the startup scripts provided in the Ed-Fi API source
repository. The scripts orchestrate Docker Compose, database provisioning,
and initial configuration in the correct order. Running `docker compose up`
directly is not recommended for first-time setup.

The first run downloads Docker images and NuGet packages, so it needs internet
access. On a restricted network, allow access to Docker Hub, the Microsoft
Container Registry (`mcr.microsoft.com`), nuget.org, and the Ed-Fi Azure
Artifacts feed (`pkgs.dev.azure.com`), plus `quay.io` if you use Keycloak.

:::

## Tested Configurations

Ed-Fi API v8 has been tested with the following configurations:

- Ubuntu 22.04 / macOS 14 / Windows 11
- Docker Desktop 4.x with Docker Compose v2
- PostgreSQL 18 or SQL Server 2025, both bundled in the provided Docker Compose
  files. PostgreSQL is the default; to use SQL Server instead, see [Getting
  Started — Appendix](getting-started-appendix#sql-server).

## Steps Overview

1. [Docker Deployment](docker-deployment) — start the Ed-Fi API and
   Configuration Service using Docker Compose
2. [Configure a Data Store](configure-data-store) — create the initial client
   credentials and data store via the Configuration Service
