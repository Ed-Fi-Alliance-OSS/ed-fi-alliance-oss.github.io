# PowerShell Installation using ZIP Archive (Data Import 1.2)

## ZIP Installation

Download and save both ZIP files on the right. EdFi.DataImport.1.2.0.zip is a
pre-compiled package for Data Import 1.2 installation,
and EdFi.DataImport.Installation.1.2.0.zip contains the automated PowerShell
installation scripts and its configuration.

# Details follow.

## Prerequisites

* Windows 10 or Windows Server 2016 or higher with administrative privileges.
* PowerShell 5.1 or higher.
* [Microsoft .NET 4.7.2
  Runtime](https://dotnet.microsoft.com/download/dotnet-framework/net472).
* Internet Information Server 10.
  * Check/enable IIS features on Windows 10:
    * Use Run to open appwiz.cpl.
    * Select "Turn Windows features on or off".
    * Select "Internet Information Services" and ensure that the following
      features are enabled:
      * World Wide Web Services > Application Development Features: ASP.NET 4.7.
      * Web Management Tools > IIS Management Console & IIS Management Scripts
        and Tools.
  * Check/enable IIS features on Windows Server:
    * Run "Server Manager" and select "Manage > Add Roles and Features".
    * Navigate to "Server Roles", select "Web Server (IIS) and ensure that the
      following features are enabled:
      * Web Server (default options).
      * Management Tools: IIS Management Console & IIS Management Scripts and
        Tools.
    * Navigate to "Features", select ".NET Framework 4.7 Features" and ensure
      that the following features are installed:
      * .Net Framework 4.7.
      * ASP.NET 4.7.
* Access to SQL Server 2012+ with permissions to create a new database for Data
  Import.

## Upgrading From a Prior Data Import Release

To upgrade from a prior Data Import release, please execute the following steps:

1. **Make a backup of the Data Import database, for safety.** The installer is
   capable of automatically upgrading the content of the existing database, so
   the uninstall/install process can use the same database.
2. **Make a backup of the Data Import web application "Web.config" and the
   Transform/Load application's "DataImport.Server.TransformLoad.exe.config" for
   any values you may have set here.** Note especially your EncryptionKey value
   which will have the same values in both files.
3. At the bottom of this page, run "Uninstall Instructions". This will remove
   configuration and source files for Data Import, however will not delete the
   existing database which can continue to be used with the new Data Import
   installation.
4. Rename the "C:\\Ed-Fi\\Data Import" directory to "C:\\Ed-Fi\\Data
   Import-prior" and the "C:\\Ed-Fi\\DataImportInstallation" directory to
   "C:\\Ed-Fi\\DataImportInstallation-prior".
5. Run through the installation instructions as seen below in the "New
   Installation of Data Import" section. While configuring, please ensure the
   existing database connection string and encryption key are used in this Data
   Import configuration.
6. Verify any custom settings from your original backups of the config files are
   reapplied in your new config files, **especially your EncryptionKey.**
7. Restart Internet Information Server and reload Data Import at
   `https://<servername>:444/DataImport`

## New Installation of Data Import

### Step 1. Create Data Import Directory**

Create a directory to hold all of the Data Import source files. Our directory is
on the following path: "C:\\Ed-Fi\\Data Import".

![Data Import](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/Snag_852fe2.png)

### Step 2. Unzip Data Import Source Files

Unzip the contents of the Source ZIP into the folder created in Step 1.

![Content Data Import](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/Snag_87a075.png)

### Step 3. Unzip Data Import Installation Files

Unzip the contents of the Installation ZIP into any folder of your choice. We
will unzip to this path: "C:\\Ed-Fi\\DataImportInstallation".

![Data Import Installation](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/image2019-7-16_11-40-7.png)


### Step 4. Configure Installation

Open the "install-config.json" file. We will need to edit this file with our
configuration details.

1. Provide a random alphanumeric string for "encryptionKey".
2. Set the "installationDirectory" to the path of the directory with the source
   files. Be sure to escape any special characters like slashes (For example, a
   path like "C:\\Ed-Fi\\Data Import" should be changed to "C:\\\\Ed-Fi\\\\Data
   Import").
3. Configure database values. These are used to construct the connection string.
   _We recommend going with the defaults already present in the file._
    1. "sqlServer" is the name of the database server.
    2. "name" is simply the name of the database that will be created on that
       server. We use "EdFi\_DataImport" to follow the Ed-Fi database naming
       convention. When upgrading, specify the existing database name. For a
       fresh install, specify a new unique name, and the application will create
       it on first run.
    3. "trustedConnection" will either be "true" or "false".
        1. If you plan to use Windows authentication, this value will be "true"
           and you can leave "username" and "password" blank.
        2. If you plan to use SQL Server authentication, this value will be
           "false" and you must provide the "username" and "password".
4. If you desire, you may customize the the IIS Application Pool context by
   providing Active Directory credentials. Otherwise, leave username and
   password empty for the default application pool identity. _We recommend going
   with the defaults already present in the file._

This is an example of what a complete "install-config.json" file could look
like:

**install-config.json**

```json
{
    "application": {
        "encryptionKey": "xyly38j92"
    },
    "web": {
        "installationDirectory": "C:\\Ed-Fi\\Data Import",
        "database": {
            "sqlServer": "(local)",
            "name": "EdFi_DataImport",
            "trustedConnection": "true",
            "username": "",
            "password": ""
        },
        "iis": {
            "appPoolUserDomain": "",
            "appPoolUser": "",
            "appPoolPassword": "",
            "webApplicationName": "DataImport",
            "websitePort": 444
        }
    }
}
```

### Step 5. Run the Installation via PowerShell

At this point your setup should look like this:

![Install Data Import](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/1.%20Ready%20to%20Install.PNG)

Ensure that you have permission to execute PowerShell scripts. For more
information,
see [http://go.microsoft.com/fwlink/?LinkID=135170](http://go.microsoft.com/fwlink/?LinkID=135170).

Launch PowerShell as an administrator, cd to the directory containing the
installation files, and run the "install.ps1" script.

The PowerShell output should look like the following:

![https Install](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/Installation%20Complete.PNG)

### Step 6. Confirm Installation in IIS Manager

Open IIS Manager, and confirm a Data Import app exists under the Ed-Fi site.

![IIS Manager](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/image2019-7-16_12-49-19.png)

### Step 7. Ensure SQL Server Login Exists

Beginning with Data Import 1.1.2, the installation process sets up an
appropriate SQL Login for use with the dedicated Data Import Application Pool in
IIS. You can verify this in SQL Server Management Studio:

![Sql Permissions](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/DataImportSqlUser.png)

If you are installing an older verison, or if you wish to set up your login
differently, some basic guidance on how to set this up is explained in
this [blog
post](https://blogs.msdn.microsoft.com/ericparvin/2015/04/14/how-to-add-the-applicationpoolidentity-to-a-sql-server-login/).
You can choose either Windows authentication or SQL Server authentication here.
If you choose SQL Server authentication, make sure that if you have "User must
change password at next login" checked, you must connect to SSMS with those
credentials to reset the password. Otherwise, the app pools won't be able to
connect. Also on the Server Roles page, make sure that at least the "dbcreator"
checkbox is checked, since Entity Framework will create the database when the
application is launched. Once you have confirmed a proper SQL Server login
exists, continue to the next step.

### Step 8. Launch the Application

In IIS Manager, click on the DataImport app and select Browse application to
launch in the browser. The initial installation will take a minute since the
database is being created.

Proceed to instructions in
the [Configuration](https://edfi.atlassian.net/wiki/display/EDFITOOLS/Configuration) section.

![LogIn](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/image2019-7-16_12-58-41.png)

**Once you see the log in screen above, proceed
with [Configuration](https://edfi.atlassian.net/wiki/display/EDFITOOLS/Configuration).**

## Installation Errors

If an error is encountered during installation, use the output from the
PowerShell install command for information on the cause of the error. If you
require support, please open a ticket
on [https://tracker.ed-fi.org/projects/EDFI](https://tracker.ed-fi.org/projects/EDFI) and
include this output.

## Uninstall Instructions

### Uninstall Step 1. Run the Uninstall Script via PowerShell

Launch PowerShell as an administrator, cd to the directory containing the
installation files, and run the "uninstall.ps1" script. The PowerShell output
should look like the following:

![UnInstall](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/image2019-7-16_13-29-7.png)

### Uninstall Step 2. Clear Out Source File Directory

In the directory with the Data Import source files, delete all folders and files
to be at a clean state. In our case, the directory was "C:\\Ed-Fi\\Data Import".
This will make future installations easier.

:::info note:
  The Data Import Download section contains the PowerShell installation
  files for Data Import 1.2: [Data Import Download](#)
:::
