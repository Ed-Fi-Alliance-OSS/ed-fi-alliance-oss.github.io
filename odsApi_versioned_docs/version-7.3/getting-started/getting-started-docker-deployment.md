---
sidebar_position: 3
---

# Getting Started - Docker Deployment

The Ed-Fi Alliance publishes a set of Docker images with each ODS/API release.
These images can be used to deploy a non-extended version of the Ed-Fi ODS/API
that includes the default database model. Custom extensions can be added using
the `plugin` folder. See [Docker Deployment](/reference/docker) for details on
deploying Ed-Fi ODS/API in Docker containers.

The following table lists the images published to [Docker
Hub](https://hub.docker.com/u/edfialliance). This list does not
include all available tags but provides enough information to understand the
patterns and identify the images that suit your use case. Release tags are
updated to the latest patch version whenever a patch release becomes available.

## ODS API v7.3.1 Images

| Image Tag          | Purpose                                                          | Example                                                                                                                             |
|--------------------|------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| 7                  | Latest patch release of ODS / API 7.x and Data Standard 6.0      | [edfialliance/ods-api-web-api:7](https://hub.docker.com/layers/edfialliance/ods-api-web-api/7/)                                     |
| 7.3                | Latest patch release of ODS / API 7.3.x and Data Standard 6.0    | [edfialliance/ods-api-web-api:7.3](https://hub.docker.com/layers/edfialliance/ods-api-web-api/7.3/)                                 |
| 7.3.1              | Latest patch release of ODS / API 7.3.1 and Data Standard 6.0    | [edfialliance/ods-api-web-api:7.3.1](https://hub.docker.com/layers/edfialliance/ods-api-web-api/7.3.1/)                             |
| 7-5.2.0            | Latest patch release of ODS / API 7.x and Data Standard 5.2      | [edfialliance/ods-api-web-api:7-5.2.0](https://hub.docker.com/layers/edfialliance/ods-api-web-api/7-5.2.0/)                         |
| 7-4.0.0            | Latest patch release of ODS / API 7.x and Data Standard 4.0      | [edfialliance/ods-api-web-api:7-4.0.0](https://hub.docker.com/layers/edfialliance/ods-api-web-api/7-4.0.0/)                         |
| 7.3.1_6399-6.0.0   | Specific release build of ODS / API 7.3 and Data Standard 6.0    | [edfialliance/ods-api-web-api:7.3.1_6399-6.0.0](https://hub.docker.com/layers/edfialliance/ods-api-web-api/7.3.1_6399-6.0.0/)       |
| 7.3.1-mssql        | Latest patch release of ODS / API 7.3.1 and Data Standard 6.0 with SQL Server backend  | [edfialliance/ods-api-web-api:7.3.1-mssql](https://hub.docker.com/layers/edfialliance/ods-api-web-api/7.3.1-mssql/)       |

## ODS API v7.3.0 Images

| Image Tag         | Purpose                                                          | Example                                                                                                                              |
|--------------------|------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| 7.3.6340-5.2.0    | ODS / API 7.3.0 and Data Standard 5.2                            | [edfialliance/ods-api-web-api:7.3.6340-5.2.0](https://hub.docker.com/layers/edfialliance/ods-api-web-api/7.3.6340-5.2.0/)            |
| 7.3.6340-4.0.0    | ODS / API 7.3.0 and Data Standard 4.0                            | [edfialliance/ods-api-web-api:7.3.6340-4.0.0](https://hub.docker.com/layers/edfialliance/ods-api-web-api/7.3.6340-4.0.0/)            |
