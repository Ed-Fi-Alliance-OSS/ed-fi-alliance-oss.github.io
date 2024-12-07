# Admin API 2.x - Docker installation

# Before You Install

This section provides general information you should review before installing
the Ed-Fi ODS / API Admin API for v2.2.0.

## Compatibility & Supported ODS / API Versions

This version of the Admin API has been tested and can be installed for use with
Ed-Fi ODS / API v7.1. See the [Ed-Fi Technology Version
Index](https://edfi.atlassian.net/wiki/spaces/ETKB/pages/20875717/Ed-Fi+Technology+Version+Index)
for more details.

## Installation Instructions

### General Prerequisites

The following are required to install the Admin API:

*   The Admin API provides an interface to administer an Ed-Fi ODS / API.
    Understandably, you must have an instance of the Ed-Fi ODS / API v7.1
    deployed and operational before you can use the Admin API. Tested
    configurations include on-premises installation via [binary
    installation](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V520/pages/25100419/Getting+Started+-+Binary+Installation)
    or [source code
    installation](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V520/pages/25100348/Getting+Started+-+Source+Code+Installation). 
*   A SQL Server 2012 or higher, or Postgres 11 or higher database server (i.e.,
    the same platform requirement applicable to your ODS / API).
*   A modern web browser such as Google Chrome, Mozilla Firefox, or Microsoft
    Edge is required to view live Swagger documentation. Internet Explorer 11 (a
    pre-installed browser on Windows Server) may load but may not function when
    using Admin API.

## Installation Instructions

Admin API is not included with the ODS-Docker solution by default, but can be
hosted as part of that ecosystem.

To install Admin API on Docker, first Install the [ODS / API
Docker](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Docker) environment
[following these
instructions](https://edfi.atlassian.net/wiki/display/EDFITOOLS/Docker+Deployment).
Then, apply the below changes to the environment to introduce the Admin API.
Admin API does not support in-place upgrades from prior versions.  Please
install a fresh copy of Admin API to upgrade from prior versions.

### 1\. Include Admin API in the ODS Docker Setup

#### Docker Compose

Add the following to your `docker-compose.yml`  file. This can be done either
instead of or in addition to the `adminapp`  service.

##### Admin API Application

Docker compose

:::info note:

 Single-Tenant

 ```text
 This service depends on the `pb-admin` and subsequently `db-admin` services to run.
 # ... above are other services adminapi:
  image: edfialliance/ods-admin-api:${ADMIN_API_TAG}
  environment: ADMIN_POSTGRES_HOST: pb-admin
  POSTGRES_PORT: "$PGBOUNCER_LISTEN_PORT:-6432}"
  POSTGRES_USER: "${POSTGRES_USER}"
  POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"
  DATABASEENGINE: "PostgreSql"
  AUTHORITY: ${AUTHORITY}
  ISSUER_URL: $ISSUER_URL}
  SIGNING_KEY: ${SIGNING_KEY}
  ADMIN_API_VIRTUAL_NAME: ${ADMIN_API_VIRTUAL_NAME:-adminapi}
  API_INTERNAL_URL: ${API_INTERNAL_URL}
  AppSettings__DefaultPageSizeOffset: ${PAGING_OFFSET:-0}
  AppSettings__DefaultPageSizeLimit: ${PAGING_LIMIT:-25}
  volumes: - ../../Docker/ssl:/ssl/
  depends_on: - pb-admin
  restart: always
  hostname: ${ADMIN_API_VIRTUAL_NAME:-adminapi}
  container_name: adminapi
  healthcheck: test: $$ADMIN_API_HEALTHCHECK_TEST
  start_period: "60s" retries: 3 # ...
  below are network and volume configs
 ```
 ![](https://edfi.atlassian.net/wiki/images/icons/grey_arrow_down.png)
:::

:::info note:

 Multi-Tenant

 ```json
 Note:
 Please consider having appsettings.dockertemplate.json file for defining tenant details.
 File content example:
 {
   "Tenants": {
     "tenant1": {
       "ConnectionStrings": {
         "EdFi_Security": "host=db-admin-tenant1;port=${POSTGRES_PORT};username=${POSTGRES_USER};
 password=${POSTGRES_PASSWORD}; database=EdFi_Security;application name=AdminApi;",
         "EdFi_Admin": "host=db-admin-tenant1;port=${POSTGRES_PORT};username=${POSTGRES_USER};
 password=${POSTGRES_PASSWORD}; database=EdFi_Admin;application name=AdminApi;"
       }
     },
     "tenant2": {
       "ConnectionStrings": {
         "EdFi_Security": "host=db-admin-tenant2;port=${POSTGRES_PORT};username=${POSTGRES_USER};
 password=${POSTGRES_PASSWORD};database=EdFi_Security;application name=AdminApi;",
         "EdFi_Admin": "host=db-admin-tenant2;port=${POSTGRES_PORT};username=${POSTGRES_USER};
 password=${POSTGRES_PASSWORD};database=EdFi_Admin;application name=AdminApi;"
       }
     }
   }
 }

 Compose file section:
 This service depends on db-admin-tenant1, db-admin-tenant2 services to run
 # ... above are other services
 adminapi:
     image: edfialliance/ods-admin-api:${ADMIN_API_TAG}
     environment:
       ADMIN_POSTGRES_HOST: pb-admin
       POSTGRES_PORT: "${PGBOUNCER_LISTEN_PORT:-6432}"
       POSTGRES_USER: "${POSTGRES_USER}"
       POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"
       DATABASEENGINE: "PostgreSql"
       AUTHORITY: ${AUTHORITY}
       ISSUER_URL: ${ISSUER_URL}
       SIGNING_KEY: ${SIGNING_KEY}
       ADMIN_API_VIRTUAL_NAME: ${ADMIN_API_VIRTUAL_NAME:-adminapi}
       API_INTERNAL_URL: ${API_INTERNAL_URL}
       AppSettings__DefaultPageSizeOffset: ${PAGING_OFFSET:-0}
       AppSettings__DefaultPageSizeLimit: ${PAGING_LIMIT:-25}
       AppSettings__MultiTenancy: "${MULTITENANCY_ENABLED:-true}"
       ASPNETCORE_ENVIRONMENT: "multitenantdocker"
     volumes:
       - ./appsettings.dockertemplate.json:/app/appsettings.dockertemplate.json
     entrypoint: ["/bin/sh"]
     command: ["-c","envsubst < /app/appsettings.dockertemplate.json > /app/appsettings.multitenantdocker.json && /app/run.sh"]
     depends_on:
       - db-admin-tenant1
       - db-admin-tenant2
     restart: always
     hostname: ${ADMIN_API_VIRTUAL_NAME:-adminapi}
     container_name: adminapi
     healthcheck:
       test: ${ADMIN_API_HEALTHCHECK_TEST}
       start_period: "60s"
       retries: 3
 # ... below are network and volumes configs
 ```
:::

##### Admin API Database

For the most part, the Admin API shares the same database schema as the Admin
App. However, there are a few tables required for storing API client
authentication which need to be initialized manually. You can see the details in
[First-Time Configuration for Admin API
2.x](first-time-configuration-for-admin-api-2x.md).

Rather than introducing these tables explicitly, for Docker we have provided an
alternative image for use with Admin API:
[`edfialliance/ods-admin-api-db`](https://hub.docker.com/r/edfialliance/ods-admin-api-db), which
is to be used **in place of** the existing `edfialliance/ods-api-db-admin` image
for your DB service.

**If you are introducing Admin API to an existing composition do** NOT **change
the volume mapping configuration in order to preserve your data**. Only
change the image and tag of the existing service. The below block is a sample of
this, based on an example ODS / API Docker environment composition. 

:::info note:

 Single-Tenant

 ```docker
 # ... above are other services
 db-admin:
     image: edfialliance/ods-admin-api-db:${ADMIN_API_DB_TAG}
     environment:
       POSTGRES_USER: "${POSTGRES_USER}"
       POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"
     volumes:
       - vol-db-admin:/var/lib/postgresql/data
     restart: always
     container_name: ed-fi-db-admin
 # ... below are other services
 ```
:::

:::info note:

 Multi-Tenant

 ```docker
 # ... above are other services
 db-admin-tenant1:
     image: edfialliance/ods-admin-api-db:${ADMIN_API_DB_TAG}
     environment:
       POSTGRES_USER: "${POSTGRES_USER}"
       POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"
     ports:
       - "5401:5432"
     volumes:
       - vol-db-admin-adminapi-tenant1:/var/lib/postgresql/data
     restart: always
     container_name: ed-fi-db-admin-adminapi-tenant1
     healthcheck:
       test: ["CMD-SHELL", "pg_isready  -U ${POSTGRES_USER}"]
       start_period: "60s"
       retries: 3

   db-admin-tenant2:
     image: edfialliance/ods-admin-api-db:${ADMIN_API_DB_TAG}
     environment:
       POSTGRES_USER: "${POSTGRES_USER}"
       POSTGRES_PASSWORD: "${POSTGRES_PASSWORD}"
     ports:
       - "5402:5432"
     volumes:
       - vol-db-admin-adminapi-tenant2:/var/lib/postgresql/data
     restart: always
     container_name: ed-fi-db-admin-adminapi-tenant2
     healthcheck:
       test: ["CMD-SHELL", "pg_isready  -U ${POSTGRES_USER}"]
       start_period: "60s"
       retries: 3
 # ... below are other services
 ```
:::

#### .env Settings

Add the following to your environment settings file to support Admin API. Note
that when running both Admin App and Admin API, some of these settings may
overlap. This is expected, and the same values can be used.

**.env for Admin API**

```docker
ADMIN_API_TAG=<version of image to run>
ADMIN_API_DB_TAG=<version of image to run>
ADMIN_API_VIRTUAL_NAME=<virtual name for the Admin API endpoint>

PAGING_OFFSET=0
PAGING_LIMIT=25

# For Authentication
AUTHORITY=<Authentication Authority Appsetting Eg. http://localhost/${ADMIN_API_VIRTUAL_NAME}>
ISSUER_URL=<Authentication IssuerUrl Appsetting Eg. https://localhost/${ADMIN_API_VIRTUAL_NAME}>
SIGNING_KEY=<Authentication Signing Key (Symmetric Security Key) for Auth Tokens>

# For Postgres only
POSTGRES_USER=<default postgres database user>
POSTGRES_PASSWORD=<password for default postgres user>
PGBOUNCER_LISTEN_PORT=<port for pg bouncer to listen to>

# The following needs to be set to specify a health check test for Admin api.
# RECOMMENDED: To use the default internal Admin Api health check endpoint, set the variable as follows:
ADMIN_API_HEALTHCHECK_TEST="curl -f http://${ADMIN_API_VIRTUAL_NAME}/health"
#  To disable the health check, remove the above and instead set the variable as follows:
# ADMIN_API_HEALTHCHECK_TEST=/bin/true
#  To add a custom health check, consult the documentation at https://docs.docker.com/compose/compose-file/compose-file-v3/#healthcheck
```

#### Nginx / Gateway Configuration

Update your nginx server configuration to include the Admin API in the reverse
proxy.

**default.conf.template**

```json
# upstream server config...

server {
    #listen / server config...
    #ssl_certificate config...

    # other locations...

    location /${ADMIN_API_VIRTUAL_NAME} {
        client_max_body_size 20M;
        proxy_pass http://${ADMIN_API_VIRTUAL_NAME};
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port 443;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 2\. Relaunch the Docker Composition

After updating the files, restart the docker composition.

```shell
docker compose -f ./compose/your-compose-file.yml --env-file ./.env up -d
```

### 3\. Execute First-Time Configuration

Continue on to [First-Time Configuration for Admin API
2.x](first-time-configuration-for-admin-api-2x.md).

:::info note:
  The following is the DockerHub repo for **Admin API v2.2.0 Docker Image** for inclusion in Docker compose:
 *   [edfialliance/ods-admin-api:v2.2.0](https://hub.docker.com/layers/edfialliance/ods-admin-api/v2.2.0/images/sha256-0e818c3741e4dea8473af1b52d25a512684f27bf9529fc43a5c9954e00dc5b0d?context=explore)

 *   [edfialliance/ods-admin-api-db:v2.2.0](https://hub.docker.com/layers/edfialliance/ods-admin-api-db/v2.2.0/images/sha256-ad0563347f65d9c44bfab6fffee302d6793be4ea84e6d0369242c6cd15a17d39?context=explore)
:::
