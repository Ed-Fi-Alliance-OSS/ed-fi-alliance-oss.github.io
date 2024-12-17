# Year-Specific Mode (v1.x)

This section describes how to set up a "Year-Specific" configuration. This information is only necessary for those implementers who need to set up an instance of the Ed-Fi ODS / API that provides separate endpoints for data related to specific years. The as-shipped configuration does not segment information by year, and so no additional Year-Specific configuration is required if that's the desired behavior.

## Overview

ODS / API platform hosts may choose a "Year-Specific" configuration mode within their ODS environments to partition data per-year within a SQL Server instance. Admin App v1.7 and above supports Year-Specific mode. Configuration instructions are below. For more information on enabling year-specific mode for the Ed-Fi ODS / API platform, see [Year-Specific ODS Configuration](https://edfi.atlassian.net/wiki/spaces/ODSAPI34/pages/24281298/Year-Specific+ODS+Configuration).

## Checklist

Use this checklist and the details below to modify your ODS and Admin App to run in Year-Specific mode

* ODS API: configure the ODS API Web.config for `YearSpecific` startup
* ODS SwaggerUI: configure the swagger.webApiMetadataUrl to contain the configured year. For example, `<http://localhost:54746/metadata/{year}/>`
* ODS Database: Rename the EdFi\_Ods database to `EdFi\_Ods\_2019`
* Admin App: update database value in `EdFi\_Ods\_Production` connectionString
* Admin App: enable and configure year specific app settings `yearSpecific:isEnabled` and `yearSpecific:year`

## Year-Specific Configuration

### ODS Web API and SwaggerUI Config

The ODS / API and SwaggerUI each require changes to configure them for Year-Specific mode. If installed through .exe installers, you can locate the Web.config for each using IIS Manager. Right-click "Explore" on the web application and then find the Web.config file.

![ODS/API Web config](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2019-8-2_10-10-0.png)

In the SwaggerUI Web.config, make the following changes:

* Update `swagger.webApiMetadataUrl` to contain a school year.

![Swagger WebAPI Config](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2019-8-2_10-14-51.png)

In the WebApi Web.config, make the following changes:

* Update the `owin:appStartup` app setting to have the value of "YearSpecific".

![Year Specific Key](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2019-8-2_10-16-11.png)

### ODS Database Year-Specific Naming Convention

In Year-Specific mode, the database is identified with a `\_{year}` suffix value in the database name. To enable, install the database as usual, either through the [`initdev` process](https://edfi.atlassian.net/wiki/display/ODSAPI32/Getting+Started+-+Installation+Steps) or through the [Windows Installers for the Ed-Fi ODS / API Suite 3](https://exchange.ed-fi.org/). Once installed, you can manually rename the database through SQL Server Management Studio by right-clicking the database name and selecting "Rename":

![ODS in SQL Server View](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2019-8-2_10-20-41.png)

### Admin App Configuration

Admin App requires three configuration changes in the Web.config file in order to enable connections to a Year Specific ODS.

#### Step 1. Locate the Web.config file

To find the Web.config file, open IIS Manager and navigate to the AdminApp web application. Right-click and select the "Explore" option. This will open the installation directory of Admin App where you will find Web.config.

![Admin App in IIS](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2019-8-2_10-10-19.png)

#### Step 2. Configure for Year-Specific mode

In Web.config, make the following changes:

`Change 1.` Set the "EdFi\_Ods\_Production" connection string to contain the year-specific database name created while setting up the ODS. The example below uses the "EdFi\_Ods\_2019" database and windows authentication:

![ODS PRodcution connection string example](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2019-8-1_10-3-3.png)

`Changes 2 & 3.` To enable year-specific functionality inside Admin App, add the two items shown below into the AppSettings node in Web.config, placing them below any items that already exist.

![Add key confirm screenshot](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2019-8-2_10-22-32.png)

## Reporting Issues

If you encounter issues related to configuration of the Admin App, please create a ticket in the [Ed-Fi Tracker system (in the EDFI project)](https://tracker.ed-fi.org/projects/EDFI).
