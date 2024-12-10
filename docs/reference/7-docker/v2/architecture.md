# Docker Compose 2.x Architecture

## Overview

This page provides information on the components used in the out-of-the-box Ed-Fi Docker Compose configuration, as well as brief descriptions and diagrams of each configuration mode supported by the Ed-Fi Docker solution.

## Components

The Ed-Fi Docker solution contains images to support the following components. All images are built on the Alpine Linux distribution. Custom images are distributed via the [edfialliance account on Docker Hub](https://hub.docker.com/r/edfialliance/).

### ods-api-web-gateway

Application: NGiNX​ 1.27.0

Reverse proxy web server that provides:

1. Single point of entry for HTTPS traffic into the Docker network, serving routes for:
   * Web API
   * Admin App
2. SSL termination
3. (Potential) load balancing for multiple Web API instances
4. (Potential) traffic logging

"Potential" means that the container can be reconfigured to support these features.

### ods-api-web-gateway-sandbox

Application: NGiNX​ 1.27.0

Similar to ods-api-web-gateway, except serving routes for:

* Web API
* Sandbox Admin Web
* Swagger UI

### ods-api-web-api

Application: Ed-Fi Web API

Hosts the core Ed-Fi Web API web service, configurable to support various modes in the sections below. Configured for use with PostgreSQL databases.

### ods-api-web-api-mssql

Application: Ed-Fi Web API

Hosts the core Ed-Fi Web API web service, configurable to support various modes in the sections below. Configured for use with Microsoft SQL Server databases.

### ods-api-web-swaggerui

Application: Ed-Fi SwaggerUI

Hosts a web-based user interface for documenting the API and allowing users with client credentials to interact with the API.

### ods-api-web-sandbox-admin

Application: Ed-Fi Sandbox Admin

Hosts the Ed-Fi Sandbox web application, used for configuring new sandboxes used for client testing. Configured for use with PostgreSQL databases.

### ods-api-web-sandbox-admin-mssql

Application: Ed-Fi Sandbox Admin

Hosts the Ed-Fi Sandbox web application, used for configuring new sandboxes used for client testing. Configured for use with Microsoft SQL Server databases.

### ods-api-db-ods

Application: PostgreSQL 13

Pre-configured PostgreSQL database containing the ODS database, with both the Ed-Fi core data model and the Teacher Preparation Data Model (TPDM). Loaded with the "minimal template" that provides a default set of Descriptors and no other data.

### ods-api-db-sandbox

Application: PostgreSQL 13

Like the ods-api-db-ods, but using the "populated template" that contains a small set of sample data representing the fictional Grand Bend school district.

### ods-api-db-admin

Application: PostgreSQL 13

Pre-configured PostgreSQL server with two database: EdFi_Admin and EdFi_Security.

### ods-admin-app

Application: Ed-Fi ODS Admin App

Hosts the Ed-Fi ODS Admin App web application, configured for use with PostgreSQL databases, and configurable for any of the supported modes: Shared Instance, Year Specific, or District Specific.

### ods-admin-app-mssql

Application: Ed-Fi ODS Admin App

Hosts the Ed-Fi ODS Admin App web application, configured for use with Microsoft SQL Server databases.

### PgBouncer

Application: PgBouncer latest (1.15.0 as of Jun 3, 2022)

Lightweight PostgreSQL connection pooler that [improves application scalability](https://www.percona.com/blog/2018/06/27/scaling-postgresql-with-pgbouncer-you-may-need-a-connection-pooler-sooner-than-you-expect/) through connection pooling.

## Additional Images

These Ed-Fi Alliance maintained images are not included in the configurations described below, and therefore must be deployed separately.

### data-import

Application: Ed-Fi Data Import

Hosts the Ed-Fi Data Import web application, configured for use with PostgreSQL as a backing database.

:::tip

See [Docker Deployment for Data Import](https://edfi.atlassian.net/wiki/spaces/EDFITOOLS/pages/24119478) for usage instructions

:::

### analytics-middle-tier

Application:  Ed-Fi Analytics Middle Tier

Distribution of the Analytics Middle Tier command line installation tool.

## Configuration Modes

The following configurations are supported out of the box. In the diagrams below, the dashed line represents the internal Docker network, and all rectangles represent separate containers. Cylinders represent data that should be stored in volumes that are mapped outside of the Docker network for permanency.

### Sandbox Configuration

A Sandbox environment is generally used to support API client developers in developing client applications. It is not intended to be a staging environment for the platform host. Includes the following web applications:

* Ed-Fi Web API
* Ed-Fi Sandbox Admin
* SwaggerUI

### Shared Instance Configuration

The Shared Instance configuration runs a single ODS database that serves all data going through the API, as contrasted with the Year Specific and District Specific configurations described below. In this configuration, a single deployment can support multiple school years and multiple districts. However, the Ed-Fi Alliance recommends that implementations only store a single school year in any ODS database; see [Guidance on Multi-Year Data in ODS](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V60/pages/20054882) for more information.

Includes the following web applications:

* Ed-Fi Web API
* Ed-FI ODS Admin App

### Year Specific Configuration

This mode enables a single API instance to support multiple ODS databases, partitioned by year. See [Year-Specific ODS Configuration](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V60/pages/20054318) for more information on this mode.

Includes the following web applications:

* Ed-Fi Web API
* Ed-FI ODS Admin App

### District Specific Configuration

District Specific mode is like the Year Specific mode, except that the partitioning is by a school district / local education agency name or code instead of by year. See [District-Specific ODS Configuration](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V60/pages/20054322) for more information on this mode.

Includes the following web applications:

* Ed-Fi Web API
* Ed-FI ODS Admin App
