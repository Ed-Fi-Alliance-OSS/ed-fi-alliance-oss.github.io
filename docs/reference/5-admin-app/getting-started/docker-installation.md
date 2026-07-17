---
sidebar_position: 2
---

# Docker Compose Installation

Docker provides the easiest deployment method with consistent environments across platforms. OCI-compliant containers provide a consistent deployment experience across many platforms, including Docker Desktop, Kubernetes, and other services. The following quick start instructions demonstrate application startup in Docker. They illustrate how to configure the applications, including environment variables, persistent storage, and networking. These notes can also serve as a template for building your own deployment in the container runtime engine of your choice, whether on-premises or in the Cloud.

:::note
This is one of three alternative installation paths. If you instead want to host the Admin App on Windows IIS or on a Unix-like server, see [Windows IIS Installation](./windows-iis-installation/readme.md) or [Unix-like Systems Installation](./unix-installation.md).
:::

## Docker Installation Guide for Ed-Fi Admin App

This guide explains how to install and run the Ed-Fi Admin App using Docker
Compose and the provided `start-services.ps1` script. It covers both building
images locally and pulling pre-built images from Docker Hub, as well as
environment variable configuration.

## Docker Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [PowerShell](https://docs.microsoft.com/en-us/powershell/) (Windows)

## Database engine

The Docker Compose stack supports **both** PostgreSQL and SQL Server — you need only one. **PostgreSQL is the default.** To use SQL Server instead, set `DB_ENGINE=mssql` in `.env`, uncomment the `MSSQL_*` variables there (`MSSQL_SA_PASSWORD`, `MSSQL_ACCEPT_EULA=Y`), and start the stack with the `-MSSQL` switch:

```powershell
compose/start-services.ps1 -MSSQL
```

## Quick Start

1. **Clone the Admin App repository:**

   Reference `compose` folder from [Admin App](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-AdminApp)

   :::tip
   If you have not cloned the Admin App repository, do so and ensure you are in the correct directory.
   :::

   :::note
     Always install from a **stable release tag**, not the default `main` branch (which reflects active development).
     Visit the [Releases page](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-AdminApp/releases) to find the latest stable release tag, then use it in the command below.
   :::
  
   ```powershell
   # Replace the TAG value with the latest release from the Releases page
   $TAG = "v4.0.1"

   git clone --branch $TAG --depth 1 https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-AdminApp.git
   ```

2. **Create environment configuration**:

   ```bash
   cp .env.example .env
   # Edit .env file with your specific settings
   ```

   The `.env.example` file is located in the `compose` directory.

3. **Generate SSL certificates**:

   ```bash
   # On Linux/WSL/Git Bash:
   cd ssl && ./generate-certificate.sh && cd ..
   ```

   :::note
   Only needed if you don't already have a certificate pair to use.
   :::

4. **Start core and Admin App services**:

- **Using Pre-Built Images**:
      The recommended way to run the Admin App is to use the official images from Docker Hub.

  - **Frontend:** `edfialliance/admin-app-fe:v4.0.1`
  - **API:** `edfialliance/admin-app-api:v4.0.1`

  - Open PowerShell in the `compose` directory:

      ```powershell
      cd ./compose
      ```

      :::tip
      If you encounter permission issues, run PowerShell as Administrator.
      :::

  - Run the following command to start all services:

    ```powershell
    ./start-services.ps1
    ```

      This script will pull the required images and start the containers defined in `adminapp-services.yml` and `edfi-services.yml`.

- **Building Images Locally (Advanced)**:

    If you want to build the images from source (for development or
    customization), Ensure you have cloned the repository and installed all
    dependencies.
    In the `compose` directory, run:

    ```powershell
    ./start-services.ps1 -Rebuild
    ```

    This will build the `admin-app-fe` and `admin-app-api` images locally
    before starting the containers.

## Environment Variables

Deployment settings can be customized using environment variables. Define these variables in a `.env` file within the `compose` directory, or provide them directly to Docker Compose as needed.

For a complete list of available variables and their descriptions, see the [Environment variables example file](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-AdminApp/blob/main/compose/.env.example).

### Example `.env` for Production

```bash
# Use strong, unique passwords
POSTGRES_PASSWORD=your-secure-password
KEYCLOAK_ADMIN_PASSWORD=your-keycloak-password

# Set production URLs
VITE_API_URL=https://yourdomain.com/adminapp-api
FE_URL=https://yourdomain.com/adminapp
MY_URL=https://yourdomain.com/adminapp-api

# Only needed when the app must trust a self-signed/private-CA certificate.
NODE_EXTRA_CA_CERTS=/app/ssl/your-cert.crt

# Administrator credentials
KEYCLOAK_ADMIN=admin

# Frontend UI Configuration
VITE_STARTING_GUIDE=https://docs.ed-fi.org/reference/admin-app/configuration/global-administration-tasks
VITE_CONTACT=https://community.ed-fi.org/
VITE_APPLICATION_NAME="Ed-Fi Admin App"
VITE_IDP_ACCOUNT_URL=https://yourdomain.com/auth/realms/edfi/account/
```

:::note
**Important:** `VITE_IDP_ACCOUNT_URL` should point to your identity provider's **end-user account-management page**, not its admin console. It is provider-specific: Keycloak `https://<host>/auth/realms/{realm}/account/`, Microsoft Entra ID `https://myaccount.microsoft.com/`, Google Workspace `https://myaccount.google.com/`.
:::

- **SSL Certificates:** Replace self-signed certificates with production certificates in a live environment.
- **Database:** For reliability, consider using an external PostgreSQL instance in production.

## Next steps

- [Configuring Ed-Fi Admin App](../configuration/configuring-admin-app.md)
- [Configuring an Identity Provider for Ed-Fi Admin App](../configuration/identity-provider/readme.md)
- [Security Considerations](../configuration/security-considerations.md)
- [Global Administration Tasks](../configuration/global-administration-tasks.md)
