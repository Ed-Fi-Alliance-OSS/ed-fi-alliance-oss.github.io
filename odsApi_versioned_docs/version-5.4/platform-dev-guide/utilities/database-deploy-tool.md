# Database Deploy Tool

The Database Deploy Tool is a utility for the Ed-Fi Technical Suite 3 databases.
The utility supports the deployment of ODS databases in both the SQL Server 2019
and PostgreSQL 11 platforms, and is designed to work with Ed-Fi ODS / API v3.3
and later.

While the Deploy Tool supports deployment of fresh ODS instances and deployment
of extensions and features on an existing ODS, it does not support upgrade of
existing ODS instances from one ODS / API version to another. The [Migration Utility](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22492292/Migration+Utility) can be used for an in-place update.

:::info

In most cases, you do not need to directly download this tool to use it.
The Initialize the Development Environment (initdev) script described
in [Getting Started - Source Code Installation](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774233/Getting+Started+-+Source+Code+Installation) and the
EdFi.Suite3.RestApi.Databases PowerShell deployment package listed in [Binary Releases](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774232/Binary+Releases) uses the Database Deploy Tool to deploy the ODS and related databases used by the API.

:::

## Installing the Application

As a [.NET Global
Tool](https://docs.microsoft.com/en-us/dotnet/core/tools/global-tools), the
application runs on a machine with [.NET 8.0 SDK (Compatible with Visual Studio
2022)](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) and is installed
from Azure Artifacts with one of the following commands:

```powershell
# Globally install the most recent version
dotnet tool install -g EdFi.Suite3.Db.Deploy `
  --add-source https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json

# Install most recent version into a local directory
dotnet tool install EdFi.Suite3.Db.Deploy --tool-path <directory> `
  --add-source https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json

# Install a specific version
dotnet tool install EdFi.Suite3.Db.Deploy --tool-path <directory> `
  --version <version> `
  --add-source https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json

# Install the most recent patch-release of 3.2 by adding -* wildcard to the version
dotnet tool install EdFi.Suite3.Db.Deploy --tool-path <directory> `
  --version 3.2.* `
  --add-source https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json
```

Note that this process will create a single locally executable binary, bundling together all assembly references.

## Running the Application

When providing the connection string as shown below, you must specify the desired database name. If your connection string has `database=EdFi_Ods` and you provide the `-d Security` argument, then you would end up installing the security tables into the `EdFi_ODS` database instead of the standard `EdFi_Security` database. The application does not perform any verification on the database name, so please take care to provide the right name for the command you are issuing.

You do not need to create an empty database before running the tool. In both SQL Server and PostgreSQL, if the user you connect as has the proper permission, the tool will create the database specified in the connection string on your behalf. Alternatively, if you wish to take more control over how the database is created, you can create it in advance before running this application.

### As a Dotnet Tool

```bash
# If installed globally
EdFi.Db.Deploy <verb> <args>

# If installed in local directory
install-dir\EdFi.Db.Deploy <verb> <args>
```

### Using Dotnet Run on the Project

When using `dotnet run` on the project, the parameters need to be provided in the "long form." If you provide the "short form" then these parameters will be interpreted as arguments to the `dotnet` command rather than as arguments to the Deploy Tool.

```bash
# Switch to local src/EdFi.Db.Deploy directory
# Correct
dotnet run <verb> --connectionString "<connection string>" --provider <provider>

# Invalid
dotnet run <verb> -c "<connection string>" -p <provider>
```

### Verbs

Verbs describe the action that the tool needs to take.

| Verb | Purpose |
| --- | --- |
| deploy | Executes all migration scripts using the provided arguments |
| whatif | Tests to see if any migration scripts need to be deployed, returning exit code 1 if so and 0 if no migration scripts needed |

### Arguments

| Short Form | Long Form | Required | Description |
| --- | --- | --- | --- |
| -d | --database | no (default=Ods) | Database to install (ODS, Admin, or Security) |
| -e | --engine | yes | Database engine type (SqlServer or PostgreSql) |
| -c | --connectionString | yes | Full SQL Server or PostgreSQL connection string. This will install the scripts into the specified database. |
| -t | --timeOut | no (default=60) | Connection time out in seconds |
| -p | --filePaths | no | Comma-separated list of base paths containing files to install |

The application will install all files directly in `<basePath>\Artifacts\<engine>\Structure\<database>\` and `<basePath>\Artifacts\<engine>\Data\<database>`. Files in sub-directories are treated as features, to be installed with `--features`.

| Short Form | Long Form | Required | Description |
| --- | --- | --- | --- |
| -f | --features | no | Optional features to install, as comma-separated list |

### Examples

#### Ex: SQL Server with Minimal Arguments

```bash
EdFi.Db.Deploy.exe deploy
    --engine SqlServer
    --connectionString "Server=localhost; Database=EdFi_Ods_Empty_Template; Integrated Security=True;"
    --filePaths
        "Ed-Fi-Ods\"
        "Ed-Fi-ODS\Application\EdFi.Ods.Standard"
```

#### Ex: Test If Deployment Needed

```bash
EdFi.Db.Deploy.exe whatif
    --engine SqlServer
    --connectionString "Server=localhost; Database=EdFi_Ods_Empty_Template; Integrated Security=True;"
    --filePaths
        "Ed-Fi-Ods\"
        "Ed-Fi-ODS\Application\EdFi.Ods.Standard"
```

#### Ex: SQL Server Install with Extensions

```bash
EdFi.Db.Deploy.exe deploy
    --engine SqlServer
    --connectionString "Server=localhost; Database=EdFi_Ods_Empty_Template; Integrated Security=True;"
    --filePaths
        "Ed-Fi-Ods\"
        "Ed-Fi-ODS\Application\EdFi.Ods.Standard"
        "Ed-Fi-Ods-Implementation\Application\EdFi.Ods.Extensions.TPDM"
        "Ed-Fi-Ods-Implementation\Application\EdFi.Ods.Extensions.Sample"
```

#### Ex: SQL Server with Minimal Arguments, Admin database

```bash
EdFi.Db.Deploy.exe deploy
    --database Admin
    --engine SqlServer
    --connectionString "Server=localhost; Database=EdFi_Admin; Integrated Security=True;"
    --filePaths
        "Ed-Fi-Ods\"
        "Ed-Fi-ODS-Implementation\"
        "Ed-Fi-ODS\Application\EdFi.Ods.Standard"
```

#### Ex: SQL Server with Optional Arguments

```bash
EdFi.Db.Deploy.exe deploy
    --engine SqlServer
    --connectionString "Server=localhost; Database=EdFi_Ods_Empty_Template; Integrated Security=True;"
    --filePaths
        "Ed-Fi-Ods\"
        "Ed-Fi-ODS\Application\EdFi.Ods.Standard"
    --features "Changes", "RecordOwnership"
```

#### Ex: PostgreSQL with Minimal Arguments

```bash
EdFi.Db.Deploy.exe deploy
    --engine PostgreSql
    --connectionString "Host=localhost; Port=5432; Database=EdFi_Ods_Empty_Template; username=postgres; password=docker;"
    --filePaths
        "Ed-Fi-Ods\"
        "Ed-Fi-ODS\Application\EdFi.Ods.Standard"
```

#### Ex: PostgreSQL on Alternate Port with Optional Arguments

```bash
EdFi.Db.Deploy.exe deploy
    --engine PostgreSql
    --connectionString "Host=localhost; Port=1234; Database=EdFi_Ods_Empty_Template; username=postgres; password=docker;"
    --timeOut 360
    --filePaths
        "Ed-Fi-Ods\"
        "Ed-Fi-ODS\Application\EdFi.Ods.Standard"
```

### Npgsql Connection String Encryption

For info on securing and encrypting connection strings please see the npgsql docs: [https://www.npgsql.org/doc/security.html](https://www.npgsql.org/doc/security.html).



## Troubleshooting

PostgreSQL passwords containing special characters are problematic — some users find that they work and others find that they do not work, even with third-party tools such as PG Admin 4. This problem might be restricted to Windows Containers. No workaround other than changing the password has been found.

