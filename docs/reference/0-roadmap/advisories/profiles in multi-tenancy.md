---
sidebar_position: 1
---

# Advisory: Profiles Security Vulnerability in Multi-Tenant Deployment

Feb 15, 2025

## Issue

Incorrect usage of the
[profiles](https://docs.ed-fi.org/reference/ods-api/platform-dev-guide/security/api-profiles)
feature has been identified in [multi-tenant
deployments](https://docs.ed-fi.org/reference/ods-api/platform-dev-guide/configuration/single-and-multi-tenant-configuration#multi-tenant-configuration)
of ODS / API 7.x line. In ODS / API 7.x, profile configurations are stored in
the database and cached at the application level to reduce repetitive database
queries. However, the profile cache does not distinguish between tenant
contexts, meaning it can only store profiles for one tenant at a time. As a
result, when an API client attempts to access a resource with an applied profile
and its tenant-specific configuration is missing from the cache, the API
returns an error response. If you use the Profiles feature in a multi-tenant
deployment, we recommend that you install this update.

All deployments using profiles feature should review [Additional
Recommendations](#additional-recommendations) section.

## Affected Versions

The following ODS/API versions are affected:

* 7.0
* 7.1
* 7.2
* 7.3

Anyone using the 7.0 release should use the 7.1 update, because 7.0 was never
intended for production use.

## Patch Releases

NuGet Packages

* 7.1:
  * [EdFi.Suite3.Ods.WebApi for DS
    4](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.WebApi.Standard.4.0.0/versions/7.1.3646)
  * [EdFi.Suite3.Ods.WebApi for DS
    5](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.WebApi.Standard.5.0.0/overview/7.1.3646)
* 7.2:
  * [EdFi.Suite3.Ods.WebApi for DS
    4](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.WebApi.Standard.4.0.0/overview/7.2.2682)
  * [EdFi.Suite3.Ods.WebApi for DS
    5](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.WebApi.Standard.5.1.0/overview/7.2.2682)
* 7.3:
  * [EdFi.Suite3.Ods.WebApi for DS
    4](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.WebApi.Standard.4.0.0/overview/7.3.1574)
  * [EdFi.Suite3.Ods.WebApi for DS
    5](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Ods.WebApi.Standard.5.2.0/overview/7.3.1574)

Source code branches

* 7.1:
  * [Ed-Fi-ODS](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/tree/v7.1-patch4),
  * [Ed-Fi-ODS-Implementation](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/tree/v7.1-patch4)
* 7.2:
  * [Ed-Fi-ODS](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/tree/v7.2-patch2),
  * [Ed-Fi-ODS-Implementation](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/tree/v7.2-patch2)
* 7.3:
  * [Ed-Fi-ODS](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/tree/v7.3-patch1),
  * [Ed-Fi-ODS-Implementation](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/tree/v7.3-patch1)

When using NuGet packages, you can rename the download, changing the extension
".nupkg" to ".zip", then open the zip file. Extract the DLL files and copy them
into the binary directory for your installation. For source code users, please
review the linked releases above and cherry-pick the latest changes.

## Additional Recommendations

In addition to applying this update, we recommend:

* Reviewing current profiles to ensure profile names are unique across tenants.
* Enforcing uniqueness by adding a unique constraint on the ProfileName column.
  Refer to this
  [commit](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/commit/40d1bf5cf8a3d0e748ebbbd1bf826ee8417150f9)
  for the necessary script.
