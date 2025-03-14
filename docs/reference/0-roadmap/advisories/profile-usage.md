---
sidebar_position: 6
---

# Advisory: Non-Enforcement of Profile Usage

March 28, 2023

## Issue

Some Ed-Fi ODS/API software releases do not enforce use of a Profile when an API
client is assigned to a Profile. If you use the Profiles feature, we recommend
that you install this update.

## Affected Versions

The following ODS/API versions are affected:

* 5.1
* 5.2
* 5.3
* 6.0
* 6.1

Anyone using the 6.0 release should use the 6.1 update, because 6.0 was never
intended for production use.

## Patch Releases

NuGet Packages

* 5.1:
  * [EdFi.Suite3.Ods.WebApi](https://www.myget.org/feed/ed-fi/package/nuget/EdFi.Suite3.Ods.WebApi/5.1.1)
* 5.2:
  * [EdFi.Suite3.Ods.WebApi](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Suite3.Ods.WebApi/overview/5.2.14416)
* 5.3:
  * [EdFi.Suite3.Ods.WebApi](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Suite3.Ods.WebApi/overview/5.3.1483)
* 6.1:
  * [EdFi.Suite3.Ods.WebApi](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Suite3.Ods.WebApi/overview/6.1.929)

Source code branches

* 5.1:
  * [Ed-Fi-ODS](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/tree/v5.1-patch2),
  * [Ed-Fi-ODS-Implementation](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/tree/v5.1-patch2)
* 5.2:
  * [Ed-Fi-ODS](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/tree/v5.2-patch2),
  * [Ed-Fi-ODS-Implementation](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/tree/v5.2-patch2)
* 5.3:
  * [Ed-Fi-ODS](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/tree/v5.3-patch4),
  * [Ed-Fi-ODS-Implementation](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/tree/v5.3-patch4)
* 5.3 with change queries enhancement:
  * [Ed-Fi-ODS](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/tree/f-Change-Queries-Enhancements-v5.3),
  * [Ed-Fi-ODS-Implementation](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/tree/f-Change-Queries-Enhancements-v5.3)
* 6.1:
  * [Ed-Fi-ODS](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/tree/v6.1-patch1),
  * [Ed-Fi-ODS-Implementation](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/tree/v6.1-patch1)

When using NuGet packages, you can rename the download, changing the extension
".nupkg" to ".zip", then open the zip file. Extract the DLL files and copy them
into the binary directory for your installation. For source code users, please
review the linked branches above and cherry-pick the newest commit you see
there.
