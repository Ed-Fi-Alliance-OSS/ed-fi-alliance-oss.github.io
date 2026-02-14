# ODS Migration Utility

::: note

**March 31st, 2022:** Ed-Fi Alliance announced [End of Life](/reference/roadmap/notifications/migration) for ODS Migration utility. While the utility could be used for upgrade to [Ed-Fi ODS / API v5.4](/reference/ods-api/5.4/) version for both SQL Server and PostgreSQL, there will be no new migration support or enhancements to this product.

:::

## Overview

The ODS Migration Utility is a command-line tool built to upgrade the schema of an ODS instance up to the latest version, along with data migration.

It currently supports data migration from [Ed-Fi Data Standard v2.0](https://edfi.atlassian.net/wiki/display/EFDS20/) and [Ed-Fi Data Standard v2.2](https://edfi.atlassian.net/wiki/display/EFDS22/) to [Ed-Fi Data Standard v3.3](/reference/data-exchange/data-standard/3/). The utility has out-of-the-box support for migrating an as-shipped ODS to the latest version. With additional customized scripting, the Migration Utility can be easily adapted and used to migrate extended ODS instances. ODS shared instances may take advantage of this utility. For year-specific instances, migration may not be a concern as a new ODS is created at the beginning of every school year.

## Usage Scenarios

The following table summarizes the supported scenarios for the migration utility:

| Database Type       | Databases                                      | Upgrade/Migration Strategy                                                                 |
|---------------------|-----------------------------------------------|------------------------------------------------------------------------------------------|
| **Core Databases**  | EdFi_Ods, EdFi_Ods_YYYY, EdFi_Ods_Sandbox     | In-place upgrade for SQL Server: 2.4 -> 5.3, 2.5 -> 5.3, 3.0 -> 5.3. PostgreSQL: 3.4 -> 5.3. Supports migrating extensions with custom scripts. |
| **Support Databases** | EdFi_Admin, EdFi_Security, EdFi_Bulk         | Can either be recreated or migrated using a database deployment tool.                    |
| **Transient Databases** | EdFi_ODS_Empty, EdFi_Ods_Minimal_Template, EdFi_Ods_Populated_Template | No upgrade supported.                                                                    |

## Developer Quick Start

The basic steps are simple:

1. Restore a backup copy of the target ODS to your local SQL Server instance. We recommend:
   * Start with the basic suite 2 ODS: Sample ODS Download: [EdFi.Samples.Ods/2.0.0.21](https://www.myget.org/feed/ed-fi/package/nuget/EdFi.Samples.Ods/2.0.0.21). This is a small sample ODS, ideal for initial development and testing.
   * Move on to the larger suite 2 ODS: [Glendale 2.0 ODS Backup (created 2018-06-13)](https://s3-us-west-2.amazonaws.com/edfidata/ETL+Development/EdFi_Glendale_v20-20180613.7z). This is a much larger ODS containing sample data, useful for validation and QA.
2. Make sure [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download/dotnet-core/3.1) is installed.
3. Choose one of the two options below to launch the migration utility:

### Option 1: Test Directly From the Console

**Step 1.** Install the Ed-Fi ODS Migration tool:

```powershell
mkdir {YourInstallFolder}
dotnet tool install EdFi.Suite3.Ods.Utilities.Migration --tool-path {YourInstallFolder} --version 2.2.*
```

> **Note:** As a one-time setup, you may need to add the Ed-Fi package source by running the following command in PowerShell:

```powershell
if (-not [Net.ServicePointManager]::SecurityProtocol.HasFlag([Net.SecurityProtocolType]::Tls12)) {
    [Net.ServicePointManager]::SecurityProtocol += [Net.SecurityProtocolType]::Tls12
}
Register-PackageSource -Name Ed-FiAzureArtifacts -Location https://pkgs.dev.azure.com/ed-fi-alliance-oss/_packaging/EdFi/nuget/v3/index.json -ProviderName NuGet
```

**Step 2.** Open a console window and change to the directory containing the executable:

```powershell
CD {YourInstallFolder}
```

**Step 3.** Launch the upgrade tool from the command line:

```powershell
.\EdFi.Ods.Utilities.Migration --DATABASE "YOUR_DATABASE_CONNECTION_STRING_HERE" --DescriptorNamespace "uri://grandbend.org" --CredentialNamespace "uri://grandbend.org" --Engine "YOUR_DATABASE_ENGINE_TYPE"
```

### Option 2: Launch from Visual Studio for Debugging

1. Clone the git repository: [https://github.com/Ed-Fi-Exchange-OSS/Ed-Fi-MigrationUtility](https://github.com/Ed-Fi-Exchange-OSS/Ed-Fi-MigrationUtility).
2. Open the Visual Studio solution file, `Migration.sln`.
3. Set up command line input for debugging in Visual Studio 2019:
   * Right-click the `EdFi.Ods.Utilities.Migration` project.
   * Select **Properties**.
   * Select **Debug**.
   * Add command line arguments:

```plaintext
--DATABASE "YOUR_DATABASE_CONNECTION_STRING_HERE" --DescriptorNamespace "uri://grandbend.org" --CredentialNamespace "uri://grandbend.org" --Engine "YOUR_DATABASE_ENGINE_TYPE"
```

4. Set the `EdFi.Ods.Utilities.Migration` project as your startup project.
5. Launch in debug mode (**F5**).

<!-- this is missing some big tables that don't convert well from https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22492292/Migration+Utility#MigrationUtility-UsageWalkthrough . Consider replacing with PDF? -->
