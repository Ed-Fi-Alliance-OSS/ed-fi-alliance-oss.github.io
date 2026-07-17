# Getting Started

This documentation outlines the steps necessary to deploy and set up the Ed-Fi
Admin App. The Ed-Fi Admin App is a web-based administrative platform designed
to manage Ed-Fi API deployments across multiple environments and tenants.

## Audience

This documentation is for administrators and DevOps personnel who will be
installing the Admin App.

## Overview

The Ed-Fi Admin App is a user interface for managing Ed-Fi Technology Suite
deployments. It consists of:

- **Frontend**: React-based single-page application (SPA)
- **Backend API**: Node.js/NestJS application
- **Database**: PostgreSQL or SQL Server database for application data
- **Authentication**: OpenID Connect (OIDC) integration (any OIDC provider; Keycloak is the bundled example)

### Required Components

- **PostgreSQL or SQL Server Database** (Required) — an empty database created
  for the Admin App (the examples use the name `sbaa`)
- **OIDC Provider** (Required) — Keycloak, Microsoft Entra ID, or Google Workspace; see
  - [Configuring an Identity Provider for Ed-Fi Admin App](../configuration/identity-provider/readme.md)
- **Reverse Proxy** (Recommended for production) - NGiNX, IIS, or similar
  - Provides a single public entry point for the frontend and API — this avoids cross-origin/CORS between the two sites — plus caching, load balancing, and a place to enforce edge security (e.g. a WAF).
  - Not required to obtain HTTPS: each installation path terminates TLS itself. The Windows install scripts deploy the API and frontend as two IIS sites directly (no front-facing proxy) with TLS and enforcing security headers, and the app is architecturally optional behind a proxy (v4.0 PRD), honoring `X-Forwarded-*` headers when used.

:::tip

This application runs with any Open ID Connect provider. The Ed-Fi Alliance has
validated three end-to-end on the Windows/IIS deployment: Keycloak (the bundled
example), Microsoft Entra ID, and Google Workspace. See
[Configuring an Identity Provider for Ed-Fi Admin App](../configuration/identity-provider/readme.md).

:::

### Optional Components

- **Yopass** (Optional) - For sharing encrypted secrets
- **Memcached** (Optional) - Required only if using Yopass

## Prerequisites

### System Requirements

- **Operating System**: Windows Server 2019+, Linux (Ubuntu 20.04+, RHEL 8+), or
  similar
- **Memory**: Minimum 4GB RAM, Recommended 8GB+
- **Storage**: Minimum 10GB free space
- **Network**: HTTPS capability (SSL/TLS certificates)

### Software Dependencies

- **Node.js**: Version 22.0.0 or higher
- **SSL/TLS Certificates**: For HTTPS endpoints

## Choose an installation path

The Ed-Fi Admin App can be installed in one of three **alternative** ways. These
are independent paths, not sequential steps — pick the one that matches your
target environment and follow that page from start to finish.

| Path | What it does |
| --- | --- |
| [Docker Compose Installation](./docker-installation.md) | Runs the Admin App and its dependencies as containers, on-premises or in the Cloud. |
| [Windows IIS Installation](./windows-iis-installation/readme.md) | Hosts the backend API and frontend on Windows Server using Internet Information Services (IIS). |
| [Unix-like Systems Installation](./unix-installation.md) | Hosts the backend API with systemd and serves the frontend with NGiNX on a Linux or other Unix-like server. |

:::note
You only need to complete **one** of the paths above — each one installs and
configures the Admin App. The [Configuring Ed-Fi Admin App](../configuration/configuring-admin-app.md)
page is a reference for the available configuration options, and it is worth
reviewing [Security Considerations](../configuration/security-considerations.md)
before going to production.
:::

## Next steps

- [Configuring Ed-Fi Admin App](../configuration/configuring-admin-app.md)
- [Configuring an Identity Provider for Ed-Fi Admin App](../configuration/identity-provider/readme.md)
- [Security Considerations](../configuration/security-considerations.md)
- [Global Administration Tasks](../configuration/global-administration-tasks.md)
