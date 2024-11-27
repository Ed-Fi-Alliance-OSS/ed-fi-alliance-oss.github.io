# Admin API 1.x Docker & Microsoft SQL Server Support

## Pre-requisites:

* SQL Server exposed or locally

* SQL User different from sa

* Clone [Admin Api 1.x](https://github.com/Ed-Fi-Alliance-OSS/AdminAPI-1.x)
    repository

* Generate the certificate for nginx by running the
    [Docker/Settings/ssl/generate-certificate.sh](https://github.com/Ed-Fi-Alliance-OSS/AdminAPI-1.x/tree/main/Docker/Settings/ssl)
    script

## File configuration.

1. Set the version of AdminApi to use in
    [Docker/Dockerfile](https://github.com/Ed-Fi-Alliance-OSS/AdminAPI-1.x/blob/main/Docker/api.mssql.Dockerfile)
    Update the parameters: **DB**: mssql **VERSION**: 1.4.1

2. Update the
    [Docker/Settings/mssql/appsettings.template.json](https://github.com/Ed-Fi-Alliance-OSS/AdminAPI-1.x/blob/main/Docker/Settings/mssql/appsettings.template.json)
    template with the connection string for SQL

    ```json
    {
      "AppSettings": {
          "DatabaseEngine": "SqlServer",
          "ApiStartupType": "$API_MODE",
          "PathBase": "$ADMIN_API_VIRTUAL_NAME",
          "OdsApiVersion": "$ODS_API_VERSION"
      },
      "Authentication": {
          "Authority": "$AUTHORITY",
          "IssuerUrl": "$ISSUER_URL",
          "SigningKey": "$SIGNING_KEY",
          "AllowRegistration": true
      },
      "EnableSwagger": true,
      "EnableDockerEnvironment": true,
      "ConnectionStrings": {
        "Admin": "server=$SQLSERVER_ADMIN_DATASOURCE;database=EdFi_Admin;User Id=$SQLSERVER_USER;Password=$SQLSERVER_PASSWORD;Integrated Security=false;Application Name=Ed-Fi ODS/API AdminApi;Encrypt=false",
        "Security": "server=$SQLSERVER_ADMIN_DATASOURCE;database=EdFi_Security;User Id=$SQLSERVER_USER;Password=$SQLSERVER_PASSWORD;Integrated Security=false;Application Name=Ed-Fi ODS/API AdminApi;Encrypt=false"
      },
      "Log4NetCore": {
          "Log4NetConfigFileName": "./log4net.config"
      },
      "Logging": {
          "LogLevel": {
              "Default": "Information",
              "Microsoft": "Warning",
              "Microsoft.Hosting.Lifetime": "Information"
          }
      },
      "AllowedHosts": "*"
    }

    ```

3. Update the docker compose file
    [Docker/Compose/mssql/compose-build-binaries.yml](https://github.com/Ed-Fi-Alliance-OSS/AdminAPI-1.x/blob/main/Docker/Compose/mssql/compose-build-binaries.yml)
    with SQL parameters

    ```docker
      adminapi:
        build:
          context: ../../
          dockerfile: Dockerfile
        environment:
          PATH_BASE: "${ODS_VIRTUAL_NAME:-api}"
          TPDM_ENABLED: "${TPDM_ENABLED:-true}"
          SQLSERVER_ODS_DATASOURCE: ${SQLSERVER_ODS_DATASOURCE}
          SQLSERVER_ADMIN_DATASOURCE: ${SQLSERVER_ADMIN_DATASOURCE}
          SQLSERVER_USER: ${SQLSERVER_USER}
          SQLSERVER_PASSWORD: ${SQLSERVER_PASSWORD}
          DATABASEENGINE: "SqlServer"
          API_MODE: ${API_MODE}
          AUTHORITY: ${AUTHORITY}
          ISSUER_URL: ${ISSUER_URL}
          SIGNING_KEY: ${SIGNING_KEY}
          ADMIN_API_VIRTUAL_NAME: ${ADMIN_API_VIRTUAL_NAME:-adminapi}
          ODS_API_VERSION: ${ODS_API_VERSION}
          ODS_CONNECTION_STRING_ENCRYPTION_KEY: "${ODS_CONNECTION_STRING_ENCRYPTION_KEY}"
          ENCRYPT_CONNECTION: "${ENCRYPT_CONNECTION:-false}"
        restart: always
        hostname: ${ADMIN_API_VIRTUAL_NAME:-adminapi}
        container_name: adminapi-packaged
        volumes:
          - ${LOGS_FOLDER}:/app/logs
        healthcheck:
          test: ${ADMIN_API_HEALTHCHECK_TEST}
          start_period: "60s"
          retries: 3
    ```

4. Create a copy of the
    [Docker/Settings/mssql/env.example](https://github.com/Ed-Fi-Alliance-OSS/AdminAPI-1.x/blob/main/Docker/Settings/mssql/env.example)
    file to set SQL parameters and credentials

    * Update the **SIGNING\_KEY** with the one already created in the AdminApi
        of appsettings.

    * Update the **SQLSERVER** parameters with the respective values.

    ```docker
    API_MODE=SharedInstance
    ADMIN_API_VIRTUAL_NAME=adminapi
    ODS_API_VERSION=5.3

    # For Authentication
    AUTHORITY=http://localhost/${ADMIN_API_VIRTUAL_NAME}
    ISSUER_URL=https://localhost/${ADMIN_API_VIRTUAL_NAME}
    SIGNING_KEY="AzoAn4wrhnyJPGV/vsL4Zvj6AB2zEbmTMHuf37tpdxQ="


    # For SQL Server only
    SQLSERVER_ODS_DATASOURCE=tools-apipub02.southcentralus.cloudapp.azure.com
    SQLSERVER_ADMIN_DATASOURCE=tools-apipub02.southcentralus.cloudapp.azure.com
    SQLSERVER_USER=sqlUser
    SQLSERVER_PASSWORD=Data00Access!!!

    # The following needs to be set to specify a health check test for Admin api.
    # RECOMMENDED: To use the default internal Admin Api health check endpoint, set the variable as follows:
    ADMIN_API_HEALTHCHECK_TEST="curl -f http://${ADMIN_API_VIRTUAL_NAME}/health"

    #  To disable the health check, remove the above and instead set the variable as follows:
    # ADMIN_API_HEALTHCHECK_TEST=/bin/true
    #  To add a custom health check, consult the documentation at https://docs.docker.com/compose/compose-file/compose-file-v3/#healthcheck

    ```

![Signing Key](https://odsassets.blob.core.windows.net/public/docs.ed-fi.org/reference/3-admin-api/img/technical-information/Screenshot%202024-06-28%20at%206.59.40%E2%80%AFPM.png)

After having everything configured we can now create the images and upload them.
Command:

```shell
docker-compose -f Docker/Compose/mssql/compose-build-binaries.yml --env-file Docker/Settings/mssql/.env up -d
```

![Container Started](https://odsassets.blob.core.windows.net/public/docs.ed-fi.org/reference/3-admin-api/img/technical-information/Screenshot%202024-06-28%20at%206.45.15%E2%80%AFPM.png)

then enter the url:

```shell
https://localhost/adminapi/swagger
```

![Swagger](https://odsassets.blob.core.windows.net/public/docs.ed-fi.org/reference/3-admin-api/img/technical-information/Screenshot%202024-06-28%20at%206.53.19%E2%80%AFPM.png)
