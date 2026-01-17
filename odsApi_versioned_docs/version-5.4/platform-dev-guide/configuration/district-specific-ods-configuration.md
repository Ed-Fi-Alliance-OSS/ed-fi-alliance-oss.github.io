---
title: District-Specific ODS Configuration
---

# District-Specific ODS Configuration

Some implementations find it useful to partition data based on school districts (i.e., to segment data associated with one district from data associated with another district). In the Ed-Fi ODS / API, this partitioning is configurable, and is off by default.

## Configuration

![District-Specific Configuration Diagram](https://edfi.atlassian.net/wiki/plugins/servlet/confluence/placeholder/unknown-macro?name=drawio&locale=en_US&version=2)

## How to Enable

The ODS / API can be configured for district-specific configuration through the following steps:

* Update ApiSettings:Mode key in the appsettings.json of the EdFi.Ods.WebApi project to: `"Mode": "DistrictSpecific"`
* Initialize the development environment for district-specific configuration using the `initdev` command as outlined in the [Getting Started Guide](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774233/Getting+Started+-+Source+Code+Installation).
* As an example: from a PowerShell prompt, navigate to the Ed-Fi-ODS-Implementation folder and run the `Initialize-PowershellForDevelopment.ps` script, followed by the `initdev` command passing InstallType and OdsTokens parameters. OdsTokens is a list of semicolon-separated district IDs.

```powershell
initdev -InstallType DistrictSpecific -OdsTokens '255901;255902'
```

* The same parameters noted above can be used with the deployment script packaged with [EdFi.Suite3.RestApi.Databases](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging?_a=package&feed=EdFi%40Local&package=EdFi.Suite3.RestApi.Databases&protocolType=NuGet&version=5.3.139) NuGet for non-development environments. See [Getting Started - Binary Installation](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774182/Getting+Started+-+Binary+Installation) for details.

* Configure API Clients to be associated with one district. If you are using the [ODS / API Admin App](https://edfi.atlassian.net/wiki/display/ADMIN/Admin+App+for+Suite+3+v2.2) administrative application for setting up client keys and secrets, you can configure the client to be associated with a particular district in the "Add Application Vendor" screen. This will ensure that all transactions from the client will land in the ODS partition specific to the district associated with the API Client.

![Add Application Vendor](https://edfi.atlassian.net/wiki/download/attachments/22774329/image2020-3-22_15-48-50.png?version=1&modificationDate=1641861348647&cacheVersion=1&api=v2)

See the [Extensibility & Customization](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774339/Platform+Dev+Guide+-+Extensibility+Customization) section for information on using district-specific configuration as a facet of a partitioning strategy.
