# Admin API 1.x - Docker installation

## Before You Install

This section provides general information you should review before installing
the Ed-Fi ODS / API Admin API for v1.4.2.

### Compatibility & Supported ODS / API Versions

This version of the Admin API has been tested and can be installed for use with
the Ed-Fi ODS API 6.1. See the [Ed-Fi Technology Suite Supported Versions](/reference/roadmap/supported-versions) for more details.

### General Prerequisites

The following are required to install the Admin API:

* Docker Desktop or equivalent container runtime
* A SQL Server 2012 or higher, or Postgres 11 or higher database server (i.e.,
  the same platform requirement applicable to your ODS / API).
* A modern web browser such as Google Chrome, Mozilla Firefox, or Microsoft Edge
  is required to view live Swagger documentation. Internet Explorer 11 (a
  pre-installed browser on Windows Server) may load but may not function when
  using Admin API.

## Installation Instructions

The Admin API now provides a complete Docker setup that includes both the application
and database containers. The installation uses Docker Compose files from the
[AdminAPI-1.x repository](https://github.com/Ed-Fi-Alliance-OSS/AdminAPI-1.x/tree/main/Docker).

### 1. Clone the AdminAPI-1.x Repository

Clone or download the AdminAPI-1.x repository to get access to the Docker configuration files:

```shell
git clone https://github.com/Ed-Fi-Alliance-OSS/AdminAPI-1.x.git
cd AdminAPI-1.x/Docker
```

### 2. Choose Your Database Platform

The Admin API supports both PostgreSQL and SQL Server. Navigate to the appropriate
directory based on your database choice:

#### For PostgreSQL

```shell
cd Compose/pgsql
```

#### For SQL Server

```shell
cd Compose/mssql
```

### 3. Configure SSL Certificate (Required)

Generate a self-signed certificate for TLS security. Navigate to the SSL settings directory and run the certificate generation script:

```shell
cd ../../Settings/ssl
bash ./generate-certificate.sh
```

This will create `server.crt` and `server.key` files in the `ssl` directory.

### 4. Configure Environment Variables

Copy and customize the environment configuration file:

```shell
# Navigate back to your chosen database directory
cd ../../Compose/pgsql  # or cd ../../Compose/mssql for SQL Server
cp .env.example .env
```

Edit the `.env` file with your specific configuration. Important settings include:

```ini
# ODS API Configuration
ODS_API_VERSION=6.1

# Database Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<your-secure-password>

# Admin API Configuration
ADMIN_API_TAG=v1.4.0
ENCRYPTION_KEY=<generate-random-32-byte-key>

# Authentication Settings
AUTHORITY=https://localhost/adminapi
ISSUER_URL=https://localhost/adminapi
SIGNING_KEY=<generate-random-signing-key>
```

>TIP:
Generate a secure encryption key using: `openssl rand -base64 32`


### 5. Choose Your Deployment Type

The Admin API provides two deployment options:

#### Option A: Development Environment (with ODS/API)

For local development and testing with a complete Ed-Fi ecosystem:

```shell
docker compose -f compose-build-dev.yml up -d
```

This option includes:
- Admin API application
- Admin database
- ODS/API for testing
- Web gateway (NGiNX)
- PGBouncer (ODS/API Database)

#### Option B: Admin API Only (Pre-built Binaries)

For deploying only the Admin API with pre-built binaries:

```shell
docker compose -f compose-build-binaries.yml up -d
```

This option includes:
- Admin API application
- Admin database
- Web gateway (NGiNX)

### 6. Verify Installation

Check that all containers are running properly:

```shell
docker compose -f <your-compose-file> ps
```

Test the Admin API endpoint:

```shell
curl -k https://localhost/adminapi/health
```

### 7. Access the Admin API

- **Swagger UI**: https://localhost/adminapi/swagger/index.html
- **API Base URL**: https://localhost/adminapi

### 9. Stop the Containers

When you're done, stop the containers:

```shell
docker compose -f <your-compose-file> down
```

## Docker Image Information

The following Docker images are available for Admin API v1.4.0:

* **Admin API Application**: [edfialliance/ods-admin-api:v1.4.0](https://hub.docker.com/layers/edfialliance/ods-admin-api/v1.4/images/sha256-0a52face1b03e94892dc4d82e05f2fae05e635f1c46b2baf081bbcf2e81d76b1?context=explore)
* **Admin Database**: [edfialliance/ods-admin-api-db:v1.4.0](https://hub.docker.com/layers/edfialliance/ods-admin-api-db/v1.4/images/sha256-70375e3564e9d409dfe8c25d27d504f1b3e15f75e454c9da9f5dc40c30c9d4a3?context=explore)
