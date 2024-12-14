# PowerShell Installation for Data Import using NuGet Packages

Below are instructions to install Data Import 2.3 in a Windows environment using Internet Information Server (IIS) using NuGet Packages and PowerShell for the installation.

* [Download and Install NuGet CLI](#download-and-install-nuget-cli)
* [Using Data Import NuGet package](#using-data-import-nuget-package)
* [Launch the Application](#launch-the-application)
* [Installation Errors](#installation-errors)

## Prerequisites

The following are required to install the Data Import:

* Ed-Fi ODS / API instance (Tech Suite 3 is supported) with a valid key and secret.
* The IIS Server Role or Windows Feature must be enabled.
* The [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) and [.NET 8 Hosting Bundle](https://dotnet.microsoft.com/en-us/download/dotnet/thank-you/runtime-aspnetcore-8.0.6-windows-hosting-bundle-installer) is required on the destination server before installation of Data Import
  * After installing .NET, it is necessary to restart the computer for the changes to take effect.
* An instance of SQL Server 2012 or higher, or Postgres 11 or higher database server is required for Data Import.
  * This can be the same or a different server from your Ed-Fi ODS / API database server.
* A modern web browser such as Google Chrome, Mozilla Firefox, or Microsoft Edge. Internet Explorer 11 (a pre-installed browser on Windows Server) may load, but may not function correctly when using Data Import.

# Download and Install NuGet CLI

Consider downloading and installing NuGet CLI to simplify the process of downloading and installing packages with the PowerShell scripts mentioned in the proceeding document. The instructions to download NuGet CLI are available [here](https://docs.microsoft.com/en-us/nuget/reference/nuget-exe-cli-reference#installing-nugetexe).

# Using Data Import NuGet package

## Step 1. Download Data Import Package

The Data Import package can be downloaded from the following link:

*  [Installer and binaries for Data Import:](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging?_a=package&feed=EdFi%40Release&package=DataImport.Web&version=2.1.1&protocolType=NuGet) [DataImport.Web.2.3.2.nupkg](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/DataImport.Web/overview/2.3.2)

We recommend you stay current with the latest patch update that has been promoted to [release](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging?_a=feed&feed=EdFi@Release).

For the download, **right-click** and select "Properties." Update the file extension (from .nupkg to .zip). Remove the version number (optional). Check the box next to **Unblock** (this will prevent PowerShell from asking for permission to load every module in the installer) and click **OK**.

**Or**

Use the following PowerShell script to download and extract the DataImport.Web package (if you already have NuGet CLI)

**download-data-import-installer.ps1**

```
$pathToNuget = "Path\To\NuGet.exe"
$pathToOutputDirectory = "Path\To\Output\Directory"
$releaseVersion = "2.3.2"
$parameters = @(
    "install", "DataImport.Web",
    "-source", "https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json",
    "-outputDirectory", $pathToOutputDirectory
    "-version", $releaseVersion
 )
& $pathToNuget $parameters
Rename-Item -Path "$pathToOutputDirectory\DataImport.Web.$releaseVersion" -NewName "DataImport.Web"
```

Substitute the "Path\\To\\Nuget.exe" in $pathToNuget and "Path\\To\\Output\\Directory" in $pathToOutputDirectory with the path to nuget.exe and the preferred output directory. Ensure that the package version is the current release version and continue with the next steps.

> [!INFO]
> You may need to configure TLS while running the installation scripts described in steps below.
> `[Net.ServicePointManager]::SecurityProtocol += [Net.SecurityProtocolType]::Tls12`

## Step 2. **Configure Installation**

Extract the contents of the DataImport.Web package. The paths in these instructions assume that the package was extracted to a folder with the name of the package (e.g., C:\\temp\\DataImport.Web).

Open the "installer\\insinstall.ps1" file in a text editor. You will need to edit this file with your configuration details. If a value is not present for any of the parameters, it will use its default value.

1. Configure `$dbConnectionInfo`. These values are used to construct the connection strings.
    1. `Server`. The name of the database server. For a local server, we can use "(local)" for SQL and "localhost" for PostgreSQL.

    2. `Engine.` Data Import supports SQL and PostgreSQL database engines. So setting up the `Engine` will decide which database engine to be used. Valid values are "SQLServer" and "PostgreSQL".
    3. `UseIntegratedSecurity.` Will either be "$true" or "$false".
        1. If you plan to use Windows authentication, this value will be "$true"
        2. If you plan to use SQL Server/ PostgreSQL server authentication, this value will be "$false" and a valid `Username`  and `Password` must be provided.
    4. `Username`. Optional. The username to connect to the database. If `UseIntegratedSecurity` is set to $true, this entry is not needed
    5. `Password`. Optional. The password to connect to the database. If `UseIntegratedSecurity` is set to $true, this entry is not needed
    6. `Port.` Optional. Used to specify the database server port, presuming the server is configured to use the specific port.
2. Configure `$p`. This is the variable used to send all the information to the installation process.

1. 1. `ToolsPath`. Path for storing installation tools, e.g., nuget.exe. Defaults to "C:/temp/tools"
   2. `DbConnectionInfo` does not need to be edited, as it was configured above
   3. `DataImportDatabaseName`  name of Data Import database. Defaults to "EdFi\_DataImport"
   4. `WebSitePath.`  Optional. Path for installing Web and TransformLoad files. Defaults to "c:\\inetpub\\Ed-Fi",
   5. `WebApplicationName.` Optional. Defaults to "DataImport".
   6. `TransformLoadApplicationName` Optional. Defaults to "DataImportTransformLoad"
   7. `WebSitePort`. Optional. Defaults to 444.
   8. `WebsiteName`. Optional. Defaults to "Ed-Fi".
   9. `PackageVersion`. Optional. **Preconfigured with correct Data Import version downloaded**. Note: Version will be checked against DataImport.Web\\ DataImport.Web.dll. Any version mismatch will throw warning and terminate the installation process.

Minimal configuration samples for the "install.ps1" file:

> [!NOTE]
> ![](https://edfi.atlassian.net/wiki/images/icons/grey_arrow_down.png)
>
> SQL Server
>
> **install.ps1(SQL Server)**
>
> ```
> $dbConnectionInfo = @{
>  Server = "(local)"
>  Engine = "SqlServer"
>  UseIntegratedSecurity = $true
> }
>
> $p = @{
>  DbConnectionInfo = $dbConnectionInfo
> }
> ```
>
> ![](https://edfi.atlassian.net/wiki/images/icons/grey_arrow_down.png)
>
> PostgreSQL
>
> **install.ps1(PostgreSQL)**
>
> ```
> $dbConnectionInfo = @{
>  Server = "localhost"
>  Engine = "PostgreSQL"
>  Username = "exampleAdmin"
>  Password = "examplePassword"
> }
>
> $parameters = @{
>  DbConnectionInfo = $dbConnectionInfo
> }
>
> ```

## **Step 3. Run the Installation via PowerShell**

Ensure that you have permission to execute PowerShell scripts. For more information, see [http://go.microsoft.com/fwlink/?LinkID=135170](http://go.microsoft.com/fwlink/?LinkID=135170). Launch PowerShell as an administrator, cd to the directory containing the installation files, and run the "install.ps1" script.

### Database login setup on integrated security mode

During the installation process, you will be prompted to choose database login details. Entering "Y" will continue with default option( Installation process will create IIS APPPOOL\\DataImport database login on the server). Choosing 'n' will prompt you to enter windows username. The installation process will validate and create database login using entered username, if the login does not exist on the database server already.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/getting-started/image2022-8-29_14-22-0.png)

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/getting-started/image2022-8-29_14-52-50.png)

Please refer Steps 5 and 6 for more details on verifying the database login and setting up the application pool identity.

The PowerShell output should look like the following:

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/getting-started/Data%20Import%20PowerShell%20Installer%20Output.JPG)

## **Step 4. Confirm Installation in IIS Manager**

Open IIS Manager, and confirm a Data Import app exists under the Ed-Fi site. You should also see the location of the Transform Load executable registered.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/getting-started/Data%20Import%20in%20IIS.JPG)

## **Step 5. Ensure SQL Server Login Exists**

The installation process sets up an appropriate SQL Login for use with the dedicated Data Import Application Pool in IIS. You can verify this in SQL Server Management Studio:

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/getting-started/DataImportSqlUser.png)

If you wish to set up your login differently, some basic guidance on how to set this up is explained in this [blog post](https://blogs.msdn.microsoft.com/ericparvin/2015/04/14/how-to-add-the-applicationpoolidentity-to-a-sql-server-login/). You can choose either Windows authentication or SQL Server authentication here. If you choose SQL Server authentication, make sure that if you have "User must change password at next login" checked, you must connect to SSMS with those credentials to reset the password. Otherwise, the app pools won't be able to connect. Also on the Server Roles page, make sure that at least the "dbcreator" checkbox is checked, since Entity Framework will create the database when the application is launched. Once you have confirmed a proper SQL Server login exists, continue to the next step.

## **Step 6. Update Application Pool Identity (Optional)**

As mentioned on Step 5, installation process sets up an appropriate SQL Login for use with the dedicated Data Import Application Pool in IIS. If you would like to use the default "ApplicationPoolIdentity", then you can skip this bit.

Else in the same Advanced Settings window, click on the browse icon under Process Model > Identity. We'll choose the custom account option and click "Set...". When setting the credentials, you can just use the username and password that you use to log in to Windows. If you need to include the app pool domain in the username, then the username can look something like this: "localhost\\username", where "localhost" is the app pool domain. Once we have entered the correct credentials, we'll click OK on all screens until we're back to the main Application Pools page.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/getting-started/image2019-7-17_16-8-37.png)

# **Launch the Application**

In IIS Manager, click on the DataImport app and select Browse application to launch in the browser. The initial installation will take a minute since the database is being created.

Proceed to instructions in the [Configuration](https://edfi.atlassian.net/wiki/display/EDFITOOLS/First-Time+Configuration) section.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/getting-started/image2019-7-16_12-58-41.png)

**Once you see the log in screen above, proceed with [Configuration](https://edfi.atlassian.net/wiki/display/EDFITOOLS/First-Time+Configuration).**

# **Installation Errors**

If an error is encountered during installation, use the output from the PowerShell install command for information on the cause of the error. If you require support, please open a ticket on [https://tracker.ed-fi.org/projects/EDFI](https://tracker.ed-fi.org/projects/EDFI) and include this output.

## Upgrading From a Prior Data Import Release

To upgrade from a prior Data Import release, please execute the following steps:

1. **Make a backup of the Data Import database, for safety.** The installer is capable of automatically upgrading the content of the existing database, so the uninstall/install process can use the same database.
2. **Make a backup of the Data Import configuration files** **for any values you may have set here.** Note especially your **`EncryptionKey`**  value which appears the same in both files( Web application **"appsettings.json"** and the Transform/Load application's **"appsettings.json" )** . Copy this especially as it will be re-used in the new Data Import installation.
3. At the bottom of this page, run "Uninstall Instructions". This will remove configuration and source files for Data Import, however will not delete the existing database which can continue to be used with the new Data Import installation.
4. Rename the "C:\\Ed-Fi\\Data Import" directory to "C:\\Ed-Fi\\Data Import-prior" and the "C:\\Ed-Fi\\DataImportInstallation" directory to "C:\\Ed-Fi\\DataImportInstallation-prior".
5. Run through the installation instructions/ steps as seen above in the "Using Data Import Installer NuGet package" section. While configuring, please ensure the existing database connection string and encryption key are used in this Data Import configuration.
6. After installation is complete, verify any custom settings from your original backups of the config files are reapplied in your new config files, **especially your EncryptionKey.**
7. Restart Internet Information Server and reload Data Import at `https://<servername>:444/DataImport`

## Uninstall Instructions

### **Uninstall Step 1. Run the Uninstall Script via PowerShell**

Launch PowerShell as an administrator, cd to the directory containing the installation files, and run the "uninstall.ps1" script. The PowerShell output should look like the following:

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/getting-started/installation/image2019-7-16_13-29-7.png)

### **Uninstall Step 2. Clear Out Source File Directory**

In the directory with the Data Import source files, delete all folders and files to be at a clean state. In our case, the directory was "C:\\Ed-Fi\\Data Import". This will make future installations easier.
