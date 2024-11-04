# Admin API 1.x Docker & Microsoft SQL Server Support

**Pre-requisites:**

* SQL Server exposed or locally

* SQL User different from sa

* Clone [Admin Api 1.x](https://github.com/Ed-Fi-Alliance-OSS/AdminAPI-1.x)
    repository

* Generate the certificate for nginx by running the
    [Docker/Settings/ssl/generate-certificate.sh](https://github.com/Ed-Fi-Alliance-OSS/AdminAPI-1.x/tree/main/Docker/Settings/ssl)
    script

**File configuration.**

1. Set the version of AdminApi to use in
    [Docker/Dockerfile](https://github.com/Ed-Fi-Alliance-OSS/AdminAPI-1.x/blob/main/Docker/Dockerfile)
    Update the parameters:
    **DB**: mssql
    **VERSION**: 1.4.1

    ```
    FROM mcr.microsoft.com/dotnet/aspnet:8.0.3-alpine3.19-amd64@sha256:a531d9d123928514405b9da9ff28a3aa81bd6f7d7d8cfb6207b66c007e7b3075 as base
    ARG DB=mssql

    RUN apk --no-cache add curl=~8 unzip=~6 dos2unix=~7 bash=~5 gettext=~0 icu=~74 jq=~1 && \
        if [ "$DB" = "pgsql" ]; then apk --no-cache add postgresql13-client=~13; fi && \
        addgroup -S edfi && adduser -S edfi -G edfi

    FROM base as build

    LABEL maintainer="Ed-Fi Alliance, LLC and Contributors <techsupport@ed-fi.org>"

    ARG VERSION="1.4.1"
    ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false
    ENV ASPNETCORE_HTTP_PORTS=80

    WORKDIR /app

    COPY --chmod=600 Settings/"${DB}"/appsettings.template.json /app/appsettings.template.json
    COPY --chmod=500 Settings/"${DB}"/run.sh /app/run.sh
    COPY Settings/"${DB}"/log4net.config /app/log4net.txt

    ```

2. Update the
    [Docker/Settings/mssql/appsettings.template.json](https://github.com/Ed-Fi-Alliance-OSS/AdminAPI-1.x/blob/main/Docker/Settings/mssql/appsettings.template.json)
    template with the connection string for SQL

    ```
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

    ```
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

    ```
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

![Screenshot](https://odsassets.blob.core.windows.net/public/docs.ed-fi.org/reference/3-admin-api/img/technical-information/Screenshot%202024-06-28%20at%206.59.40%E2%80%AFPM.png)

After having everything configured we can now create the images and upload them.
Command:

```
docker-compose -f Docker/Compose/mssql/compose-build-binaries.yml --env-file Docker/Settings/mssql/.env up -d
```

![Screenshot](https://odsassets.blob.core.windows.net/public/docs.ed-fi.org/reference/3-admin-api/img/technical-information/Screenshot%202024-06-28%20at%206.45.15%E2%80%AFPM.png)

then enter the url:

```
https://localhost/adminapi/swagger
```

![Screenshot](https://odsassets.blob.core.windows.net/public/docs.ed-fi.org/reference/3-admin-api/img/technical-information/Screenshot%202024-06-28%20at%206.53.19%E2%80%AFPM.png)
