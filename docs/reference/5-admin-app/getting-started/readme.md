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
- **Authentication**: OpenID Connect (OIDC) integration (typically Keycloak)

### Required Components

- **PostgreSQL or SQL Server Database** (Required) — an empty database created
  for the Admin App (the examples use the name `sbaa`)
- **OIDC Provider** (Required) - Keycloak or similar see
  - [Configuring an Identity Provider for Ed-Fi Admin App](../configuration/identity-provider.md)
- **Reverse Proxy** (Recommended) - NGiNX, IIS, or similar
  - Provides SSL/TLS termination and security headers
  - Efficient static file serving and caching
  - Single entry point for frontend and API (eliminates CORS issues)
  - Better performance, security, and scalability for production deployments

:::tip

This application _should_ be capable of running with any Open ID Connect
provider, not just Keycloak. At this time the Ed-Fi Alliance has not yet tested
it with other providers. The product development team intends to test and
document the experience working with other systems, beginning first with
Microsoft Entra ID.

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

| Path | When to use |
| --- | --- |
| [Docker Compose Installation](./docker-installation.md) | The easiest path. Run the Admin App and its dependencies as containers, on-premises or in the Cloud. |
| [Windows IIS Installation](./windows-iis-installation.md) | Host the backend API and frontend on Windows Server using Internet Information Services (IIS). |
| [Unix-like Systems Installation](./unix-installation.md) | Host the backend API with systemd and serve the frontend with NGiNX on a Linux or other Unix-like server. |

:::note
You only need to complete **one** of the paths above. After installing,
configure the application using the
[Configuring Ed-Fi Admin App](../configuration/configuring-admin-app.md) page and review the
[Security Considerations](../configuration/security-considerations.md) before going to
production.
:::

## Next steps

- [Configuring Ed-Fi Admin App](../configuration/configuring-admin-app.md)
- [Configuring an Identity Provider for Ed-Fi Admin App](../configuration/identity-provider.md)
- [Security Considerations](../configuration/security-considerations.md)
- [Global Administration Tasks](../configuration/global-administration-tasks.md)
