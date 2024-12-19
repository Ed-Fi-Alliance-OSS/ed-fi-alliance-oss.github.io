# Admin App for Suite 3 v2.2.1

## Before You Install

This section provides general information you should review before installing
the Ed-Fi ODS / API Admin App for Suite 3 v2.2.1.

## Compatibility & Supported ODS / API Versions

This version ODS / API Admin App has been tested and can be installed for use
with the Ed-Fi ODS / API v3.4 through v5.2. See the [Ed-Fi Technology Suite Supported Versions](../../../../0-roadmap/supported-versions.md) for
more details.

## Prerequisites

The following are required to install the Admin App:

* The Admin App provides an interface to administer an Ed-Fi ODS / API.
  Understandably, you must have an instance of the Ed-Fi ODS / API v3.4 through
  v5.2 deployed and operational before you can use the Admin App. Tested
  configurations include on-premises installation via [binary
  installation](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V520/pages/25100419/Getting+Started+-+Binary+Installation)
  or [source code
  installation](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V520/pages/25100348/Getting+Started+-+Source+Code+Installation).
* The [.NET Framework 4.8
  Runtime](https://dotnet.microsoft.com/download/dotnet-framework/thank-you/net48-web-installer) and
  [.NET Core 3.1
  SDK](https://dotnet.microsoft.com/download/dotnet-core/thank-you/sdk-3.1.301-windows-x64-installer)
  is required on the destination server before installation of Admin App.
* A SQL Server 2012 or higher, or Postgres 11 or higher database server as also
  in use with your ODS / API v3.4, v5.0.0, v5.1.0, and v5.2.0 installation.
  .NET Framework 4.8 Runtime is still needed for the PowerShell installations
  scripts.
* [.NET Core Hosting Bundle v3.1.10 or
  higher](https://dotnet.microsoft.com/download/dotnet/thank-you/runtime-aspnetcore-3.1.12-windows-hosting-bundle-installer)
  * After installing the .NET Core SDK and the .NET Core SDK, it is necessary to
    restart the computer for the changes to take effect.
* IIS must be enabled before installing .Net Core Hosting Bundle.
* A modern web browser such as Google Chrome, Mozilla Firefox, or Microsoft
  Edge. Internet Explorer 11 (a pre-installed browser on Windows Server) may
  load, but may not function when using Admin App.

Admin App does not today support in-place upgrades from prior versions.  Please
install a fresh copy of Admin App to upgrade from prior versions.

### Upgrade Admin App from 2.2.0 to 2.2.1

If user wants to upgrade Admin App from 2.2.0 to 2.2.1, please follow the
preparation steps [here](#), before installing 2.2.1.

:::info note:
After installation, please make sure to clear browser cookies before
accessing the latest version of Admin App.
:::

Clear browser cookies (Admin App specific cookies can be searched on the browser
settings with host name).

Example:

![Upgrade Version](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/older-versions-of-admin-app/image2021-9-1_15-51-15.png)

## Required Information

You will need the following information to complete this installation:

* The location of your Ed-Fi ODS / API.
* Administrator access and credentials for either on-premises or Azure
  environment with target Ed-Fi ODS / API.

## Installation Instructions

This section provides step-by-step instructions for installation. The specific
steps are different depending on the deployment model and version of your Ed-Fi
ODS / API.

* Admin App for Suite 3 v2.2.1
* [Before You Install](#before-you-install)
  * [Compatibility \& Supported ODS / API Versions](#compatibility--supported-ods--api-versions)
  * [Prerequisites](#prerequisites)
    * [Upgrade Admin App from 2.2.0 to 2.2.1](#upgrade-admin-app-from-220-to-221)
  * [Required Information](#required-information)
* [Installation Instructions](#installation-instructions)
  * [On-Premises Deployment](#on-premises-deployment)
    * [Step 1. Download and Open Installer Package](#step-1-download-and-open-installer-package)
    * [Step 2. Configure Installation](#step-2configure-installation)
    * [Step 3. Open a PowerShell Prompt in Administrator Mode](#step-3-open-a-powershell-prompt-in-administrator-mode)
    * [Step 4. Run the Installation via PowerShell](#step-4-run-the-installation-via-powershell)
    * [Step 5. Create SQL Server Login (if "useIntegratedSecurity" set to "true")](#step-5-create-sql-server-login-if-useintegratedsecurity-set-to-true)
    * [Step 6. Check Folder Permissions](#step-6check-folder-permissions)
    * [Step 7. Create Initial Administrative User](#step-7-create-initial-administrative-user)
    * [Step 8. Enable Product Improvement Features](#step-8-enable-product-improvement-features)
    * [Step 9. Restart the ODS / API](#step-9-restart-theods--api)
    * [Step 10. Open Admin App to Complete Installation**](#step-10-open-admin-app-to-complete-installation)
    * [Step 11. Using the Admin App](#step-11-using-the-admin-app)

## On-Premises Deployment

Each step is outlined in detail below for the PowerShell deployment. Ensure that
you have permission to execute PowerShell scripts. For more information,
see [about_Execution_Policies](http://go.microsoft.com/fwlink/?LinkID=135170).

### Step 1. Download and Open Installer Package

Download and
unzip [AdminAppInstaller.2.2.1.zip](https://odsassets.blob.core.windows.net/public/adminapp/AdminAppInstaller.2.2.1.zip).

### Step 2. Configure Installation

Open the "install.ps1" file in a text editor. You will need to edit this file
with your configuration details. If a value is not present for any of the
parameters, it will use its default value.

:::info note:
 Editing Item 3b below is mandatory for ODS / API URL and must be done
 for installation to complete.
:::

1. Configure `$dbConnectionInfo`. These values are used to construct the
   connection strings.

    a. `Server`. The name of the database server. For a local server, we can use
       "(local)" for SQL and "localhost" for PostgreSQL.

    b. `Engine.` Admin App supports SQL and PostgreSQL database engines. So
       setting up the `Engine` will decide which database engine to be used.
       Valid values are "SQLServer" and "PostgreSQL".

    c. `UseIntegratedSecurity.` Will either be "$true" or "$false".
        1. If you plan to use Windows authentication, this value will be "$true"
        2. If you plan to use SQL Server/ PostgreSQL server authentication, this
           value will be "$false" and the Username and `Password` must be
           provided.

    d. `Username`. Optional. The username to connect to the database.
       If `UseIntegratedSecurity` is set to $true, this entry is not needed

    e. `Password`. Optional. The password to connect to the
       database. If `UseIntegratedSecurity` is set to $true, this entry is not
       needed

    f. `Port.` Optional. Used to specify the database server port, presuming the
       server is configured to use the specific port.

2. Configure `$adminAppFeatures`. These values are used to set Optional
   overrides for features and settings in the web.config.

    a. `ApiMode.` Possible values: `sharedinstance`, `districtspecific` and
       `yearspecific`. Defaults to `sharedinstance`

    b. `SecurityMetadataCacheTimeoutMinutes`. Optional. Defaults to 10 minute
       security metadata cache timeout.

3. Configure `$p`. This is the variable used to send all the information to the
   installation process.

    a. `ToolsPath`. Path for storing installation tools, e.g., nuget.exe.
       Defaults to "C:/temp/tools"

    b. **`OdsApiUrl`. Base URL for the ODS / API. Mandatory.**

    c. `AdminDatabaseName`. , `OdsDatabaseName`,
       `SecurityDatabaseName`. Optional. Specify _only_ if ODS / API was set
       with a custom database name.

        c1. For example, when configuring the `OdsDatabaseName`, the value here
           will be the name of the ODS database, whereas the `AdminDatabaseName`
           and `SecurityDatabaseName` will be the name of the Admin and Security
           databases, respectively.

    d. `WebApplicationName`, `WebApplicationPath`. Optional. Defaults
       to "AdminApp" and "C:\\inetpub\\Ed-Fi\\AdminApp" respectively.

    e. `WebSitePort`. Optional. Defaults to 443.

    f. `WebsiteName`. Optional. Defaults to "Ed-Fi".

    g. `PackageVersion`. Optional. If not set, will retrieve the latest full
       release package.

Configuration samples for the "install.ps1" file:

:::info note:

 SQL Server Shared Instance

 **install.ps1(SQL Server)**

 ```json
 $dbConnectionInfo = @{
  Server = "(local)"
  Engine = "SqlServer"
  UseIntegratedSecurity = $true
 }

 $p = @{
  DbConnectionInfo = $dbConnectionInfo
  OdsApiUrl = "https://localhost:54746"
 }
 ```

:::

:::info note:

 PostgreSQL District Specific

 **install.ps1(PostgreSQL)**

 ```json
 $dbConnectionInfo = @{
  Server = "localhost"
  Engine = "PostgreSQL"
  Username = "exampleAdmin"
  Password = "examplePassword"
 }

 $adminAppFeatures = @{
  ApiMode = "districtspecific"
 }

 $parameters = @{
  DbConnectionInfo = $dbConnectionInfo
     OdsApiUrl = "https://localhost:54746"
     AdminAppFeatures = $adminAppFeatures
 }

 ```

:::

:::info note:

 SQL Server Year Specific

 **install.ps1(SQL Server)**

 ```json
 $dbConnectionInfo = @{
  Server = "(local)"
  Engine = "SqlServer"
  UseIntegratedSecurity = $true
 }

 $adminAppFeatures = @{
  ApiMode = "yearspecific"
 }

 $p = @{
  DbConnectionInfo = $dbConnectionInfo
  OdsApiUrl = "https://localhost:54746"
     AdminAppFeatures = $adminAppFeatures
 }

 ```

:::

### Step 3. Open a PowerShell Prompt in Administrator Mode

Method 1: Open \[Windows Key\]-R which will open a Run dialog for tasks needing
administrative privileges. Type "PowerShell" to open a PowerShell prompt in
Administrator mode.

![RunAs](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/older-versions-of-admin-app/image2020-4-20_12-37-43.png)

Method 2: Click on the Windows icon in the lower-left corner. Type "PowerShell"
and right-click the "Windows PowerShell" option when provided. Select "Run as
Administrator" to open a PowerShell prompt in Administrator mode.

![Windows menu](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/older-versions-of-admin-app/image2020-4-20_12-37-57.png)

Change the directory to the unzipped directory for the Admin App Installer.

### Step 4. Run the Installation via PowerShell

Run "install.ps1" script.

The PowerShell output will look something like the following:

![Run Powershell](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/older-versions-of-admin-app/Successful-Installation.JPG)

### Step 5. Create SQL Server Login (if "useIntegratedSecurity" set to "true")

This step only needs to be completed if you set `useIntegratedSecurity` to true
on the "install.ps1" script in Step 2, above. If you did not, we can skip ahead
to Step 5.

Now that the installation has finished, follow these steps to create a new SQL
Server login for the AdminApp Application Pool:

* Open SQL Server Management Studio and at the server-level, expand the
  "Security" folder. **Right-click**, select **Logins** > **New Login...**
* For the Login Name, enter "IIS APPPOOL\\AdminApp".
* On the left side of the pop-up window, select the **Server Roles** tab and
  ensure the "sysadmin" checkbox is checked.
* Everything else can be left at the default setting.
* Once you're done, click **OK**.

![SqlLogin](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/older-versions-of-admin-app/SqlLogin.JPG)

![SQLLogin-role](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/older-versions-of-admin-app/SQLLogin-role.JPG)

### Step 6. Check Folder Permissions

Folders to verify:

1. Admin App application "uploads" folder (default folder path:
   C:\\inetpub\\Ed-Fi\\AdminApp\\uploads).
2. Admin App log folder (default folder path:
   C:\\ProgramData\\Ed-Fi-ODS-AdminApp).

For checking permissions:

* **Right-click** the folder, choose **Properties**, view the **Security** tab.
* Verify the "Group or user names" section has AdminApp with Full control.

![Properties](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/older-versions-of-admin-app/Upload-folder-permission.JPG)

If the AdminApp not available on the list, add with Full control.

![Permission groups](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/older-versions-of-admin-app/AddFolderPermission.JPG)

### Step 7. Create Initial Administrative User

Upon first launch of the Admin App, you will have to create the initial
administrative user for the application. This consists of creating a username
and password for the initial user. Additional users can be added at a later
time. Please see [Securing the Admin App
(v2.x)](../../securing-the-admin-app.md) for more
information.

### Step 8. Enable Product Improvement Features

Upon first launch of the Admin App, you will have the option to opt-out of the
**Product Improvement** feature for the application (the user is opted-in by
default). Opting-in to this feature allows the application to collect useful
telemetric data, page views and usage data of the product, as we do with
[Ed-Fi.org](http://Ed-Fi.org) and other Ed-Fi web sites. Admin App also provides
an option to opt-in/out at a later time using the Configuration screen in the
application. Please see [\_Product
Improvement](https://edfi.atlassian.net/wiki/spaces/EDFITOOLS/pages/24118943) for
more information.
![Product Improvement](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/older-versions-of-admin-app/image2021-4-29_9-20-3.png)

### Step 9. Restart the ODS / API

To finish the Admin App on-premises setup, the ODS / API should be restarted,
which Admin App will advise.

Steps for restarting the ODS / API:

* Open IIS Manager (inetmgr).
* In the Connections pane on the left, expand **Sites** and locate the **Ed-Fi**
  website.
* **Right-click** the website and select **Manage Website** > **Restart**.
* Close IIS Manager.

### Step 10. Open Admin App to Complete Installation

The installation will default to `https://<machinename>/AdminApp`.

To verify and launch the Admin App, open "Internet Information Services (IIS)
Manager". Open the server name, open the Sites folder and open the Ed-Fi branch.
Observe three web applications have been installed for the Ed-Fi Tech Suite.
Clicking on "AdminApp", use Manage Application to view the configured URL. Click
on "Browse `<servername>`" to launch Admin App.

![IIS Manager](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/older-versions-of-admin-app/image2020-4-20_13-56-8.png)

### Step 11. Using the Admin App

The Admin App is now configured for use with your Ed-Fi ODS / API instance.
Please visit the following articles to help with next actions in using Admin
App:

* [Securing the Admin App
  (v2.x)](../../securing-the-admin-app.md)
* [Multi-Instance
  Connections](../../../getting-started/multi-instance-connections)
* [Next Steps](../../../getting-started/next-steps)
* [Known Issues](../../../getting-started/known-issues)

:::info

**Admin App v2.2.1 Binaries are included with ODS / API 5.2 (for
manual installations)**: [Binary
Releases](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V520/pages/25100418/Binary+Releases)

:::
