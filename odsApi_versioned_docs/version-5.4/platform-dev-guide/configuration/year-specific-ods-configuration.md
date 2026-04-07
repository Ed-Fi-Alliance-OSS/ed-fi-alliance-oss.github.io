---
title: Year-Specific ODS Configuration
---

# Year-Specific ODS Configuration

Some implementations find it useful to add a school year in the API root, for example, as part of a partitioning strategy or to distinguish data associated with previous years from data for the current year. In the Ed-Fi ODS / API, the presence of the school year value in the API root is configurable, and off by default.

## Configuration

![Year-Specific deployment diagram](https://edfidocs.blob.core.windows.net/$webhttps://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/YearSpecific%2520deployment.png)

## Routing

When enabled, the base URI follows `/{api_area}/{version}/**{year}** pattern.` See [API Routes](/reference/ods-api/5.4/client-developers-guide/api-routes) for details.

## How to Enable

The ODS / API can be configured for year-specific configuration through the following steps:

* Update ApiSettings:Mode key in the appsettings.json of the EdFi.Ods.WebApi project to: `"Mode": "YearSpecific"`
* Initialize development environment for year-specific configuration using the initdev command as outlined in the [Getting Started Guide](../../getting-started/readme.md).
* As an example: from a PowerShell prompt, navigate to the Ed-Fi-ODS-Implementation folder and run the Initialize-PowershellForDevelopment.ps1 script, followed by the initdev command passing InstallType and OdsTokens parameters. OdsTokens is a semicolon-separated list of school years:

```powershell
initdev -InstallType YearSpecific -OdsTokens '2020;2021'
```

* The same parameters noted above can be used with the deployment script packaged with [EdFi.Suite3.RestApi.Databases](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging?_a=package&feed=EdFi%40Local&package=EdFi.Suite3.RestApi.Databases&protocolType=NuGet&version=5.3.139) NuGet for non-development environments. See [Getting Started - Binary Installation Steps](../../getting-started/binary-installation/readme.md) for details.

See the [Extensibility & Customization](../extensibility-customization/readme.md) section for information on using year-specific configuration as a facet of a partitioning strategy.

