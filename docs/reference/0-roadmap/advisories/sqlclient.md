---
sidebar_position: 4
---

# Advisory: Microsoft SqlClient Vulnerability

February 9, 2024

## Issue

In January 2024, Microsoft released a [Security
Advisory](https://github.com/dotnet/announcements/issues/292) concerning the
versions of the Microsoft.Data.SqlClient and System.Data.SqlClient packages
utilized in certain Ed-Fi software releases. The advisory strongly recommends
upgrading these packages to address potential security vulnerabilities.

## Affected Versions

 Affected ODS/API versions:

* 5.3
* 6.0
* 6.1
* 7.0
* 7.1

Affected Admin API versions:

* 1.3.2
* 2.1.0

## Patch Releases

In response to the Microsoft advisory, Ed-Fi released patches for its affected
software to address identified vulnerabilities by upgrading the
Microsoft.Data.SqlClient and System.Data.SqlClient packages to the recommended
versions.

## ODS / API Updates

NuGet Packages

* 5.3: [Binary Releases](https://edfi.atlassian.net/wiki/display/ODSAPIS3V53/Binary+Releases)
* 6.1: [Binary Releases](https://edfi.atlassian.net/wiki/display/ODSAPIS3V61/Binary+Releases)
* 7.1: [Binary Releases](https://edfi.atlassian.net/wiki/display/ODSAPIS3V71/Binary+Releases)

The updated packages are marked with patch update date `01/2024`.

Source code branches

* 5.3
  * [Ed-Fi-ODS](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/tree/v5.3-patch5)
  * [Ed-Fi-ODS-Implementation](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/tree/v5.3-patch5)
* 6.1:
  * [Ed-Fi-ODS](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/tree/v6.1-patch3)
  * [Ed-Fi-ODS-Implementation](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/tree/v6.1-patch3)
* 7.1:
  * [Ed-Fi-ODS](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/tree/v7.1-patch1)
  * [Ed-Fi-ODS-Implementation](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/tree/v7.1-patch1)

When using NuGet packages, you can rename the download, changing the extension
".nupkg" to ".zip", then open the zip file. Extract the DLL files and copy them
into the binary directory for your installation. For source code users, please
review the linked tags above and cherry-pick the newest commit you see there.

## Admin API Updates

Please upgrade to the latest version of Admin API based on version:

* [Admin API 1.3.3](https://edfi.atlassian.net/wiki/spaces/ADMINAPI/pages/21300811/Admin+API+1.x+for+ODS+API+5.4-6.2)
* [Admin API 2.1.1](https://edfi.atlassian.net/wiki/spaces/ADMINAPI/pages/21301219/Admin+API+2.x+for+ODS+API+7)
