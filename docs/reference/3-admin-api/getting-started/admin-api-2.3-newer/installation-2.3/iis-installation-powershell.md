# IIS Installation (PowerShell)

## Before You Install

This section provides general information to review before installing the Ed-Fi
ODS / API Admin API for v2.3

## Compatibility & Supported ODS / API Versions

This version of the Admin API has been tested and can be installed for use with
both the Ed-Fi ODS/API v7.x as well as ODS/API v6.x lines. See the [Ed-Fi Technology Version
Index](https://edfi.atlassian.net/wiki/display/ETKB/Ed-Fi+Technology+Version+Index) for
more details.

## Installation Instructions

### Prerequisites

A running instance of the ODS / API (v7.x or v6.x) platform must be configured and running
before installing Admin API.

Admin API only supports running one instance of the application at a time in an
ODS / API ecosystem. Future versions may allow for scaling and load balancing.

Admin API does not support in-place upgrades from prior versions.  Please
install a fresh copy of Admin API to upgrade from prior versions.

The following are required to install the Admin API with IIS:

* Enable IIS (before installing .NET Hosting Bundle).
* Install [.NET 8 Hosting Bundle v8.0.21 or
    higher](https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/runtime-aspnetcore-8.0.21-windows-hosting-bundle-installer). After
    installing the .NET Hosting Bundle, it may be necessary to restart the
    computer for the changes to take effect.

### Installation Steps

Each step is outlined in detail below for the PowerShell deployment. Ensure that
you have permission to execute PowerShell scripts. For more information,
see [about_Execution_Policies](http://go.microsoft.com/fwlink/?LinkID=135170).

### Installation files

:::note
  The following is a Nuget package containing the **Admin API v2.3**
  binaries and installer scripts for deployment to IIS.

* [EdFi.Suite3.ODS.AdminApi
     v2.3](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Suite3.ODS.AdminApi/overview/2.3.0)

:::

#### **Step 1. Rename and Unzip Admin API Source Files**

Download and rename the linked Nuget Package (.npkg) to .zip

![Zip Folder](https://odsassets.blob.core.windows.net/public/docs.ed-fi.org/reference/3-admin-api/img/installation-v2/Populated%20Installation%20Folder.png)

Unzip the contents.

![Installation Folder](https://odsassets.blob.core.windows.net/public/docs.ed-fi.org/reference/3-admin-api/img/installation-v2/image2024-5-7_13-10-5.png)

There will be two folders. AdminApi folder will have binaries. Installer folder
contains PowerShell scripts required for installation.

#### Step 2. Configure Installation

Open the "install.ps1" file in a text editor. You will need to edit this file
with your configuration details. If a value is not present for any of the
parameters, it will use its default value.

:::info note:
Editing Items 2(a, b) below are mandatory for installation to
complete.
:::

1. Configure `$dbConnectionInfo`. These values are used to construct the
    connection strings.
    1. `Server`. The name of the database server. For a local server, we can use
        "(local)" for SQL and "localhost" for PostgreSQL.

    2. `Engine.` Admin API supports SQL and PostgreSQL database engines. So
        setting up the `Engine` will decide which database engine to be used.
        Valid values are "SQLServer" and "PostgreSQL".
    3. `UseIntegratedSecurity.` Will either be "$true" or "$false".
        1. If you plan to use Windows authentication, this value will be "$true"
        2. If you plan to use SQL Server/ PostgreSQL server authentication, this
            value will be "$false" and the Username and `Password` must be
            provided.
    4. `Username`. Optional. The username to connect to the database.
        If `UseIntegratedSecurity` is set to $true, this entry is not needed
    5. `Password`. Optional. The password to connect to the
        database. If `UseIntegratedSecurity` is set to $true, this entry is not
        needed
    6. `Port.` Optional. Used to specify the database server port, presuming the
        server is configured to use the specific port.
2. Configure `$authenticationSettings`. These values are mandatory for
    authentication process.

               a. `SigningKey:` must be a Base64-encoded string
               b. `Authority and IssuerUrl:` should be the same URL as your application
               c. `AllowRegistration:` to true allows unrestricted registration of new Admin API clients.

     3. Configure `$p`. This is the variable used to send all the information to
     the installation process.

1. 1. `ToolsPath`. Path for storing installation tools, e.g., nuget.exe.
        Defaults to "C:/temp/tools"
   2. `PackageVersion`. Optional. If not set, will retrieve the latest full
        release package.

Database engine specific connection information ($dbConnectionInfo):

:::info note:

 SQL Server

 ```json
 $dbConnectionInfo = @{
         Server = "(local)"
         Engine = "SqlServer"
         UseIntegratedSecurity = $false
         Username = "exampleAdmin"
         Password = "examplePassword"
 }
 ```

:::

:::info note:

 PostgreSQL Server

 ```json
 $dbConnectionInfo = @{
         Server = "localhost"
         Engine = "PostgreSQL"
         UseIntegratedSecurity = $false
         Username = "postgres"
         Password = "examplePassword"
 }
 ```

:::

:::info note:

 Single-Tenant

 ```json
 $authenticationSettings = @{
     Authority = "[https://localhost/adminapi](https://localhost/adminapi)"
     IssuerUrl = ""[https://localhost/adminapi](https://localhost/adminapi)"
     SigningKey = "Base64-encoded string"
     AllowRegistration = $false
 }

 $packageSource = Split-Path $PSScriptRoot -Parent
 $adminApiSource = "$packageSource/AdminApi"

 $p = @{
     ToolsPath = "C:/temp/tools"
     DbConnectionInfo = $dbConnectionInfo
     PackageVersion = '2.2.2.0'
     PackageSource = $adminApiSource
     AuthenticationSettings = $authenticationSettings
 }
 ```

:::

:::info note:

 Multi-Tenant

 ```json
 $authenticationSettings = @{
     Authority = "[https://localhost/adminapi](https://localhost/adminapi)"
     IssuerUrl = ""[https://localhost/adminapi](https://localhost/adminapi)"
     SigningKey = "Base64-encoded string"
     AllowRegistration = $false
 }

 $packageSource = Split-Path $PSScriptRoot -Parent
 $adminApiSource = "$packageSource/AdminApi"

 $p = @{
     IsMultiTenant = $true
     ToolsPath = "C:/temp/tools"
     DbConnectionInfo = $dbConnectionInfo
     PackageVersion = '2.2.2.0'
     PackageSource = $adminApiSource
     AuthenticationSettings = $authenticationSettings
     Tenants = @{
             Tenant1 = @{
                 AdminDatabaseName = "EdFi_Admin_Tenant1"
                 SecurityDatabaseName = "EdFi_Security_Tenant1"
             }
             Tenant2 = @{
                 AdminDatabaseName = "EdFi_Admin_Tenant2"
                 SecurityDatabaseName = "EdFi_Security_Tenant2"
             }
     }
 }
 ```

:::

#### **Step 3. Open a PowerShell Prompt in Administrator Mode**

Method 1: Open \[Windows Key\]-R which will open a Run dialog for tasks needing
administrative privileges. Type "PowerShell" to open a PowerShell prompt in
Administrator mode.

![Open Terminal](https://odsassets.blob.core.windows.net/public/docs.ed-fi.org/reference/3-admin-api/img/installation-v2/image2020-4-20_12-37-43.png)

Method 2: Click on the Windows icon in the lower-left corner. Type "PowerShell"
and right-click the "Windows PowerShell" option when provided. Select "Run as
Administrator" to open a PowerShell prompt in Administrator mode.

![Run As Administrator](https://odsassets.blob.core.windows.net/public/docs.ed-fi.org/reference/3-admin-api/img/installation-v2/image2020-4-20_12-37-57.png)

Change the directory to the unzipped directory for the Admin Api Installer.

#### **Step 4 .** **Run the Installation via PowerShell**

Run "install.ps1" script.

#### Database login setup on integrated security mode

During the installation process, you will be prompted to choose database login
details. Entering "Y" will continue with default option (Installation process
will create IIS APPPOOL\\AdminApi database login on the server).

Choosing 'n' will prompt you to enter windows username. The installation process
will validate and create database login using entered username, if the login
does not exist on the database server already.

![Set Logins](https://odsassets.blob.core.windows.net/public/docs.ed-fi.org/reference/3-admin-api/img/installation-v2/image2023-1-19_13-38-10.png)

### Installation Completed

Installation process will install Admin Api application and create required
database tables.

![Installation Complete](https://odsassets.blob.core.windows.net/public/docs.ed-fi.org/reference/3-admin-api/img/installation-v2/Screenshot%202023-09-18%20at%2013.31.52.png)

#### **Step 5. Verify SQL Server Login**

The installation process sets up an appropriate SQL Login for use with the
dedicated AdminApi Application Pool in IIS. You can verify this in SQL Server
Management Studio:

![Sql Login](https://odsassets.blob.core.windows.net/public/docs.ed-fi.org/reference/3-admin-api/img/installation-v2/image2023-1-19_13-45-17.png)

On the Server Roles page, make sure that  "public" and "sysadmin" checkboxes are
checked. Once you have confirmed a proper SQL Server login exists, continue to
the next step.

#### **Step 6. Update Application Pool Identity (Optional)**

As mentioned on Step 5, installation process sets up an appropriate SQL Login
for use with the dedicated AdminApi Application Pool in IIS. If you would like
to use the default "ApplicationPoolIdentity", then you can skip this bit.

Else in the Advanced Settings window, click on the browse icon under Process
Model > Identity. We'll choose the custom account option and click "Set...".
When setting the credentials, you can just use the username and password that
you use to log in to Windows. If you need to include the app pool domain in the
username, then the username can look something like this: "localhost\\username",
where "localhost" is the app pool domain. Once we have entered the correct
credentials, we'll click OK on all screens until we're back to the main
Application Pools page.

![Application Pool Identity](https://odsassets.blob.core.windows.net/public/docs.ed-fi.org/reference/3-admin-api/img/installation-v2/image2022-9-20_12-24-43.png)

#### Step 7. Confirming appSettings.json

Change `EnableSwagger`  to `true` to enable generation of the Swagger UI
documentation.

* This is **not** recommended for production.

#### **Step 9. Execute First-Time Configuration**

Continue on to [First-Time Configuration for Admin API
2.3](../first-time-configuration).

:::info note:
  The following is a Nuget package containing the **Admin API v2.3**
  binaries and installer scripts for deployment to IIS.

* [EdFi.Suite3.ODS.AdminApi
     v2.3](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Suite3.ODS.AdminApi/overview/2.3.0)
:::
