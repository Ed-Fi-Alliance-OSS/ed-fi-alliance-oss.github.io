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
- **Database**: PostgreSQL database for application data
- **Authentication**: OpenID Connect (OIDC) integration (typically Keycloak)

### Required Components

- **PostgreSQL Database** (Required)
- **OIDC Provider** (Required) - Keycloak or similar
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
- **PostgreSQL**: Version 16 or higher
- **SSL/TLS Certificates**: For HTTPS endpoints

:::tip

Microsoft SQL Server support will be added in an upcoming release.

:::

## Contents

- [Installing Ed-Fi Admin App](./installing.md)
- [Docker Compose Installation](./docker-installation.md)
- [Windows IIS Installation](./windows-iis-installation.md)
- [Unix-like Systems Installation](./unix-installation.md)
