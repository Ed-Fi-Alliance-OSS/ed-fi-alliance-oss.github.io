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

- **Web Application**: React-based single-page application (SPA)
- **Backend API**: Node.js/NestJS application
- **Database**: PostgreSQL or SQL Server database for application data
- **Authentication**: OpenID Connect (OIDC) integration (typically Keycloak)

### Required Components

- **PostgreSQL or SQL Server Database** (Required) — an empty database created
  for the Admin App (the examples use the name `sbaa`)
- **OIDC Provider** (Required) - Keycloak or similar see
  - [Configuring an Identity Provider for Ed-Fi Admin App](../../configuration/identity-provider.md)
- **Reverse Proxy** (Recommended for production) - Nginx, IIS, or similar
  - Provides a single public entry point for the Web Application and API (this avoids cross-origin/CORS between the two sites), plus caching, load balancing, and a place to enforce edge security (for example, a web application firewall).
  - Not required to obtain HTTPS: each installation path terminates TLS itself. The Windows install scripts deploy the API and Web Application as two IIS sites directly (no front-facing proxy) with TLS and enforcing security headers, and the app is architecturally optional behind a proxy by design, honoring `X-Forwarded-*` headers when used.

:::tip

This application runs with any Open ID Connect provider. Keycloak, Microsoft
Entra ID, and Google Workspace are supported. Sign-out uses the provider's
published sign-out endpoint, and the **Account** link in the Admin App is shown
only when `VITE_IDP_ACCOUNT_URL` is set.

:::

### Audit log

The Admin App keeps an audit trail of changes and sign-in activity in the
`audit_log` table of the Admin App database:

- Every create, update, and delete request is recorded, including requests that
  were rejected, along with sign-in successes, sign-in failures, and sign-outs.
  Read-only requests, request bodies, and tokens are not recorded.
- Audit logging is on by default. Set `AUDIT_LOGGING_ENABLED=false` to turn it
  off; the API reads the setting at startup, so a change requires a restart.
- There is no screen for the audit log. Query the `audit_log` table with SQL.
- The Admin App never purges the table. Plan your own retention, for example a
  scheduled job that deletes rows by `timestamp`.
- Entries contain user names, which are often email addresses. Treat the table
  as personal data under your data-protection policies.

### Health check

`GET /api/healthcheck` returns HTTP 200 when the API is healthy and HTTP 503
when it is not. Configure load balancers and monitors to treat 503 as
unhealthy.

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

- **Node.js**: Version 24
- **SSL/TLS Certificates**: For HTTPS endpoints

### Ed-Fi Services

- **Ed-Fi ODS/API and ODS Admin API 2.4 or later**: Installed and reachable —
  the Admin App performs all credential and configuration management by calling
  the Admin API. Environments built on Admin API v3 (the Ed-Fi Data Management
  Service) are also supported; the Admin App shows their ODS instances as
  **Data Stores**.
- **Admin API first-time configuration completed**: When an environment is
  connected, the Admin App registers its own client credentials at the Admin
  API's `POST /connect/register` endpoint, which requires
  `Authentication:AllowRegistration=true` in the Admin API's
  `appsettings.json` (`false` by default). Complete
  [Create the First API Client](../../../4-admin-api/getting-started/admin-api-2.3-newer/first-time-configuration.md#2-create-the-first-api-client)
  and keep registration enabled while connecting environments (it can be
  disabled again afterwards).

## Choose an installation path

The Ed-Fi Admin App can be installed in one of three **alternative** ways. These
are independent paths, not sequential steps — pick the one that matches your
target environment and follow that page from start to finish.

| Path | What it does |
| --- | --- |
| [Docker Compose Installation](./docker-installation.md) | Runs the Admin App and its dependencies as containers, on-premises or in the Cloud. |
| [Windows IIS Installation](./windows-iis-installation/readme.md) | Hosts the backend API and Web Application on Windows Server using Internet Information Services (IIS). |
| [Unix-like Systems Installation](./unix-installation.md) | Hosts the backend API with systemd and serves the Web Application with Nginx on a Linux or other Unix-like server. |

:::note
You only need to complete **one** of the paths above — each one installs and
configures the Admin App. The [Configuring Ed-Fi Admin App](../../configuration/configuring-admin-app.md)
page is a reference for the available configuration options, and it is worth
reviewing [Security Considerations](../../configuration/security-considerations.md)
before going to production.
:::

## Next steps

- [Roadmap to Success](./roadmap-to-success.md)
- [Configuring Ed-Fi Admin App](../../configuration/configuring-admin-app.md)
- [Configuring an Identity Provider for Ed-Fi Admin App](../../configuration/identity-provider.md)
- [Security Considerations](../../configuration/security-considerations.md)
- [Global Administration Tasks](../../configuration/global-administration-tasks.md)
