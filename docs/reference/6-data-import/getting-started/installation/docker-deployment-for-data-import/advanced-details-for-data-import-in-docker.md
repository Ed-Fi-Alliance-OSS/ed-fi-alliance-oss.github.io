# Advanced Details for Data Import in Docker

Data Import v2.3 is now in Docker configuration to run in containers.  This page
includes details for custom implementations and advanced usage of Data Import
running within Docker.  For information on the ODS / API running in Docker,
please see [Docker Deployment 2.x].

:::info
  These details assume readers are familiar with Docker and Docker
  Compose. If these tools are new to you, please be sure to read [Docker's own
  documentation](https://docs.docker.com/compose/) to familiarize yourself
  before utilizing this documentation.
:::

## Data Import Docker Composition

Below is a minimal Docker Compose file for Data Import and accompanying `.env`
file. It includes images for the Data Import application, backing
[PostgreSQL](https://www.postgresql.org/) database, and
[PgBouncer](https://www.pgbouncer.org/) connection pool.

Some possible adaptations include:

*   running this composition wholesale alongside an ODS/API solution deployed
    using Docker or other methods
*   adding the below services and volumes to an existing ODS/API Docker
    composition and redeploying
*   using the `dataimport`  service as an example for plugging in to a
    composition with an existing datab

    ase, updating the `POSTGRES_HOST`  and other DB settings accordingly

**docker-compose.yml** Expand source

```docker
# SPDX-License-Identifier: Apache-2.0
# Licensed to the Ed-Fi Alliance under one or more agreements.
# The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
# See the LICENSE and NOTICES files in the project root for more information.

version: "3.8"

services:
  dataimport:
    image: edfialliance/data-import:v2.3.1
    ports:
      - "8080:80"
    environment:
      POSTGRES_HOST: pb-dataimport
      POSTGRES_PORT: "${PGBOUNCER_LISTEN_PORT:-6432}"
      POSTGRES_USER: "${POSTGRES_USER}"
      POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"
      DATABASEENGINE: "${DATABASE_ENGINE:-PostgreSql}"
      APPSETTINGS__DATABASEENGINE: "${DATABASE_ENGINE:-PostgreSql}"
      CONNECTIONSTRINGS__DEFAULTCONNECTION: "host=pb-dataimport;port=${PGBOUNCER_LISTEN_PORT:-6433};username=${POSTGRES_USER};password=${POSTGRES_PASSWORD};database=EdFi_DataImport;"
      APPSETTINGS__ENCRYPTIONKEY: "${ENCRYPTION_KEY}"
      APPSETTINGS__USERRECOVERYTOKEN: "${USER_RECOVERY_TOKEN}"
      APPSETTINGS__SHARENAME: "${APPSETTINGS__SHARENAME:-/app/Common/temp}"
      TZ: "${TIME_ZONE:-US/Central}"
    depends_on:
      - pb-dataimport
    restart: always
    hostname: dataimport
    container_name: ed-fi-dataimport

  db-dataimport:
    image: postgres@sha256:67cff2d866a237c54a21f2038e15e61cd257b7dde465436e231bb91e31ac9f79 # postgres:11-alpine
    ports:
      - "5432"
    environment:
      POSTGRES_USER: "${POSTGRES_USER}"
      POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"
      POSTGRES_DB: "EdFi_DataImport"
    volumes:
      - vol-db-dataimport:/var/lib/postgresql/data
    restart: always
    container_name: ed-fi-db-dataimport

  pb-dataimport:
    image: pgbouncer/pgbouncer@sha256:aa8a38b7b33e5fe70c679053f97a8e55c74d52b00c195f0880845e52b50ce516 #pgbouncer:1.15.0
    environment:
      DATABASES: "* = host = db-dataimport port=5432 user=${POSTGRES_USER} password=${POSTGRES_PASSWORD}"
      PGBOUNCER_LISTEN_PORT: "${PGBOUNCER_LISTEN_PORT:-6432}"
    ports:
      - "5403:${PGBOUNCER_LISTEN_PORT:-6432}"
    restart: always
    container_name: ed-fi-pb-dataimport
    depends_on:
      - db-dataimport

volumes:
  vol-db-dataimport:
    driver: local
    name: vol-db-dataimport
```

:::info note:
That the commented out values below are not are included in the above
service configuration for `Data Import` . Make sure configured values are passed
through to the service in the `environment`  section.
:::

**.env** Expand source

```docker
POSTGRES_USER=<default postgres database user>
POSTGRES_PASSWORD=<password for default postgres user>
PGBOUNCER_LISTEN_PORT=<port for pg bouncer to listen to>

ENCRYPTION_KEY=<base64-encoded 256-bit key>
TIME_ZONE=<US/Central>
USER_RECOVERY_TOKEN=<base64-encoded 256-bit key>

# NOTE: PostgreSql is supported by default. If SqlServer is used, then environment section of the dataimport container
# within the docker compose file needs to be customized to have appropriate connection string
DATABASE_ENGINE=<PostgreSql or SqlServer>

## Additional Configurable Settings
# NOTE: These appsettings need to be added to the environment section of the dataimport container within the docker compose file in order to take effect

# Uncomment below to skip certificate validation for FTPS agents
# APPSETTINGS__ALLOWTESTCERTIFICATES: "true"


# Uncomment below allow arbitrary PowerShell code to run in preprocessors
# APPSETTINGS__USEPOWERSHELLWITHNORESTRICTIONS: "true"


# Uncomment and update to change logged in timeout rate
# APPSETTINGS__LOGINTIMEOUTINMINUTES: <amount of time>


### File Settings
# Uncomment the below to override upload / script path
## Must be a valid directory on the container.
## To use a location on the host machine, map a volume to the container and update this to match
# APPSETTINGS__SHARENAME: <path>

# Uncomment below to use Azure for file storage
# APPSETTINGS__FILEMODE: "Azure"
# CONNECTIONSTRINGS__STORAGECONNECTION: <azure storage connection string>


### External Preprocessor Settings
# Uncomment below to enable experimental "External Process" preprocessors
# EXTERNALPREPROCESSORS__ENABLED: "false"
# Uncomment to override process timeout (default 5000)
# EXTERNALPREPROCESSORS__TIMEOUTINMILLISECONDS: <amount>
```

## Using Other Databases

The above configuration is designed with a dedicated  PostgreSQL server and
connection pool as containers. If you wish to connect to a different postgreSQL
instance or otherwise modify that setup, simply change the `POSTGRES_` variables
to match your environment. If you are not using the `postgres`  or `pgbouncer`
services, make sure to remove them from your orchestration.

### Connecting to a MSSQL Database Server

To connect to a Microsoft SQL Server instance you must have a valid SQL username
and password. It possible to leverage a Docker container or an instance
installed on the host or elsewhere, but if using the latter options, consider
the host/container networking relationship.

*   Change "DATABASE\_ENGINE" on .env file to `SqlServer`
*   Remove `POSTGRES_` environment settings
*   Update `CONNECTIONSTRINGS__DEFAULTCONNECTION` to a valid connection string
    *    SQL username/password must be used to connect, as opposed to Integrated
         Security

## Upgrading Data Import

### From A Previous Non-Docker Deployment

:::warning
  Migrating the Data Import database from outside of Docker into a
  Docker container is not supported, as the ODS/API connection information will
  not be functional and schemas may differ between MSSQL Server and PostgreSQL.
  If this is a necessity, you may perform such a migration yourself manually and
  correct any errors that occur. Alternatively, you may export relevant Data
  Maps, Bootstraps, and Preprocessors to files and re-import them on the new
  installation, or re-load from Template Sharing and adjust them as needed. In
  this case, you will need to re-establish ODS/API connections and configure
  Agents to match your previous installation. Consider completing the Docker
  installation and configuration before uninstalling the previous version to
  verify the setups match.
:::

To upgrade from an existing Data Import installation that is outside of Docker,
execute the following steps:

1.  If you are using the same database, **Make a backup of the Data Import
    database, for safety. **The installer is capable of automatically upgrading
    the content of the existing database, so the uninstall/install process can
    use the same database.
2.  **Make a backup of the Data Import configuration files** **for any values
    you may have set here.** Note especially your **`EncryptionKey`**  value
    which appears the same in both files. Copy this especially as it will be
    re-used in the new Data Import installation. The files to check differ for
    versions less than 1.3.0:
    1.  **1.2.0:** The web application **"Web.config"** and the Transform/Load
        application's **"DataImport.Server.TransformLoad.exe.config"**
    2.  **1.3.0+:** The web application **"appsettings.json"** and the
        Transform/Load application's **"appsettings.json"**
3.  Stop the previous Data Import application and website from Internet
    Information Server
4.  Run the Docker Installation
    1.  Update configuration values to match those copied above
    2.  Verify the website is running correctly in Docker
5.  Manually delete the previous Data Import application, website, and app pools
    from Internet Information Server.

### From An Existing Docker Deployment

To upgrade from an existing Docker deployment:

1.  **Make a backup of the Data Import database, for safety.** The installer is
    capable of automatically upgrading the content of the existing database, so
    the uninstall/install process can use the same database.
2.  **Update the image tag** for the Data Import service in your composition to
    the new version
3.  **Note and update** of any new environment variables which may need
    configured and that your current environment variables have not changed
    1.  pay close attention that the `ENCRYPTION_KEY`  setting **does not**
        change
4.  **Redeploy** the docker composition

:::info note:
 The following links contain relevant source code and published images:
 **Images**
 [https://hub.docker.com/r/edfialliance/data-import](https://hub.docker.com/r/edfialliance/data-import)
:::
