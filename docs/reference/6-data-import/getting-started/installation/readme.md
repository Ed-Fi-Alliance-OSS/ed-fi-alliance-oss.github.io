# Installation

# Before You Install

This section provides general information you should review before installing Ed-Fi Data Import.

## Compatibility & Supported ODS / API Versions

Data Import is designed for use with the Ed-Fi ODS / API v5.3+. See the [https://edfi.atlassian.net/wiki/spaces/TT/pages/18645319](https://edfi.atlassian.net/wiki/spaces/TT/pages/18645319) and [Ed-Fi Technology Version Index](https://edfi.atlassian.net/wiki/spaces/ETKB/pages/20875717/Ed-Fi+Technology+Version+Index) sections for more details on the ODS / API and version compatibility.

## Prerequisites

The following are functional requirements to use Data Import:

*   A functioning Ed-Fi ODS / API 5.3+ environment. Data Import can be installed either alongside your Ed-Fi ODS / API server or used as a standalone application. Of course, the Ed-Fi ODS / API instance must be reachable from the network on which the Data Import tool will be running.
    *   Data Import uses metadata from the target ODS/API to determine its mapping interface and to aid with data ingestion.  Given a default configuration, the ODS/API generates metadata of the API interfaces and data types using the [OpenAPI](https://www.openapis.org/) specification (formerly known as Swagger).
    *   To ensure the ODS/API is producing OpenAPI metadata for Data Import, please verify that the *ApiSettings:Features:OpenApiMetadata* option is set to "*true"* in *appSettings.json* on the target ODS/API platform.  Please note, only this setting needs to be enabled for Data Import needs and it is not required to have the related Swagger UI client interface.

*   An API key and secret is needed with access permissions to create data for targeted entities. Please see [How To: View Security Configuration Details](https://edfi.atlassian.net/wiki/display/ODSAPIS3V53/How+To%3A+View+Security+Configuration+Details) and [How To: Configure Claim Sets](https://edfi.atlassian.net/wiki/display/ODSAPIS3V53/How+To%3A+Configure+Claim+Sets) for more information on managing security configuration and access permissions via claim sets.
*   A SQL login for Data Import to use. This login can use either Windows Authentication or SQL Authentication, and will be provided during installation of Data Import. The login must have the "dbcreator" role assigned.

**Hardware and Framework requirements** vary by version of Data Import and deployment method (see below)

# Installation Instructions

Three methods of installation for Data Import are supported: Docker, PowerShell scripts, or manual configuration using a ZIP archive.

## Docker Deployment

Data Import v2.3 supports deployment using Docker.

For general info, see [Docker Deployment for Data Import](./installation/docker-deployment-for-data-import)

For introducing Data Import into more complex deployment configurations, see [Advanced Details for Data Import in Docker](./installation/docker-deployment-for-data-import/advanced-details-for-data-import-in-docker)

## PowerShell Installation

PowerShell installation provides a convenient method for installing Data Import using PowerShell scripts and a simple configuration file.

For installation instructions, see [PowerShell Installation for Data Import using NuGet Packages](./installation/powershell-installation-for-data-import-using-nuget-packages) based on which version you are installing.

## Contents

Read more about getting started with the Data Import tool:
