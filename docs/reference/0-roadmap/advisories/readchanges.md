# Advisory: ReadChanges action grants access to Read and Update actions

July 23, 2023

## Issue

The Ed-Fi ODS/API provides ability to setup claims and claim sets to provide
fine-grained access control over the resources available in the API.  Claims
define whether a client has permissions to perform "create", "read", "update",
or "delete" actions. In recent versions, "readchanges" action has been added to
allow read key changes and read deletes during change processing.  In some
versions of the ODS/API, due to an identified bug in the source code, providing
access to "readchanges" action also provides access to "read" and "update"
actions. This presents the potential risk of an API client being able to update
resources while the system administrator intended to provide only read access
for change processing.

## Affected Ed-Fi ODS/API Release Versions

* 6.0.0
* 6.1.0

Anyone using the 6.0 release should use the 6.1 update, because 6.0 is not
intended for production use.

## Patch Release

NuGet Packages

* 6.1:
  * [EdFi.Suite3.Ods.WebApi](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Suite3.Ods.WebApi/overview/6.1.953)

Source code branches

* 6.1:
  * [Ed-Fi-ODS](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/tree/v6.1-patch2)
  * [Ed-Fi-ODS-Implementation](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/tree/v6.1-patch2)

When using NuGet packages, you can rename the download, changing the extension
".nupkg" to ".zip", then open the zip file. Extract the DLL files and copy them
into the binary directory for your installation. For source code users, please
review the linked branches above and cherry-pick the linked
[commit](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/commit/d01ac751a113654bbae8785c0fd55d3345b37b9a).
