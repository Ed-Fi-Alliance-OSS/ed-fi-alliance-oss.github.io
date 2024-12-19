# Admin App v1.8.1 for Ed-Fi ODS / API v3.4

## Before You Install

This section provides general information you should review before installing
the Ed-Fi ODS / API Admin App for the ODS / API v3.4.

:::info
  September 2020:  Admin App v1.8.1 has been released to address an
  issue with the Microsoft URL Rewrite package which link was broken within
  Admin App v1.8.
:::

## Prerequisites

The following are required to install the Admin App:

* The Admin App provides an interface to administer an Ed-Fi ODS / API.
  Understandably, you must have an Ed-Fi ODS / API deployed and operational
  before you can use the Admin App. The ODS / API can be installed [source
  code](https://edfi.atlassian.net/wiki/display/ODSAPI34/Getting+Started).
* Admin App authentication will work via Single Sign-On using either Active
  Directory or Active Directory for Azure depending on deployment. Admin App
  v1.8 contains a preview of non-Active Directory using ASP.NET Identity as an
  alternate authentication method (see: [ASP.NET Identity (Preview in
  v1.8)](../../../technical-articles/aspnet-identity-preview-in-v18)).
* The [.NET Framework 4.8
  Runtime](https://dotnet.microsoft.com/download/dotnet-framework/net48) is
  required on the destination server before installation of Admin App.
* A modern web browser such as Google Chrome, Mozilla Firefox, or Microsoft
  Edge. Internet Explorer 11 (a pre-installed browser on Windows Server) may
  load, but may not function when using Admin App.

## Required Information

You will need the following information to complete this installation:

* The location of your Ed-Fi ODS / API.
* Administrator access and credentials for either on-premises or Azure
  environment with target Ed-Fi ODS / API.

## Installation Instructions

This section provides step-by-step instructions for installation. The specific
steps are different depending on the deployment model and version of your Ed-Fi
ODS / API.

## Compatibility & Supported ODS / API Versions

This version ODS / API Admin App can be installed for use with the Ed-Fi ODS /
API v3.4. See the [Ed-Fi Technology Suite Supported Versions](../../../../0-roadmap/supported-versions.md) for
more details.

### Other Versions

The Admin App downloadable from this page is compatible with the ODS / API v3.4.

## On-Premises Deployment for ODS / API for v3.4

Each step is outlined in detail below for the PowerShell deployment.

### Step 1. Unzip Admin App Installation Files

Unzip the contents of the Installation ZIP into any folder of your choosing. Our
directory is on the following path: "C:\\Ed-Fi\\AdminAppInstallation".

### Step 2. Locate the Installation Script Files

Installation script files can be found under the tools folder.

![Installation Scripts](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/older-versions-of-admin-app/image2020-1-30_10-58-34.png)

### Step 3. Configure Installation

Open the "install-config.json" file. We will need to edit this file with our
configuration details.

1. Set the `installationDirectory` to the directory where the Admin App source
   files should be installed.

    a. Be sure to escape any special characters like slashes (For example, a
       path like "C:\\inetpub\\Ed-Fi\\AdminApp" must be changed to
       "C:\\\\inetpub\\\\Ed-Fi\\\\AdminApp").

2. Configure values for the `odsApi` section.

    a. `apiUrl` is the base URL for the ODS / API.

    b. `apiMode` is either going to be "Shared Instance" or "Year Specific".
        b1. If "Shared Instance" was chosen, the `schoolYear` can be left blank.
        b2. If "Year Specific" was chosen, you must provide the `schoolYear`.

3. Configure the values for the `databases` section. These are used to construct
   the connection strings.

    a. `applicationCredentials.` These credentials will be used with database
       connection strings on application's Web.config file.

    b. `installCredentials.` These credentials will be used while deploying the
       admin app specific database setup.

    c. `useIntegratedSecurity.` Will either be "true" or "false".

        c1. If you plan to use Windows authentication, this value will be "true"
           and `databaseUser` and `databasePassword` can be left blank.

        c2. If you plan to use SQL Server/ PostgreSQL server authentication, this
           value will be "false" and the `databaseUser` and `databasePassword`
           must be provided.

    d. `engine.` Admin App supports SQL and PostgreSQL database engines. So
       setting up the `engine` will decide which database engine to be used.
       Valid values are "SQLServer" and "PostgreSQL".

    e. `databaseServer.` The name of the database server. For a local server, we
       can use "(local)" for SQL and "localhost" for PostgreSQL.

    f. `databasePort.` Used to specify the database server port, presuming the
       server is configured to use the specific port. The default port value for
       PostgreSQL is "5432".

    g. `adminDatabaseName`, `odsDatabaseName`, `securityDatabaseName.` Simply
       the name of the respective databases being referenced.

        g1. For example, when configuring the `odsDatabaseName`, the value here
           will be the name of the ODS database, whereas the `adminDatabaseName`
           and `securityDatabaseName` will be the name of the Admin and Security
           databases, respectively.

    h. Several values can be left at their defaults as they are not directly
       relevant to Admin App installation. These are:

        h1. `useTemplates`. Defaults to false. Okay as-is.

        h2. `odsTemplate.` Defaults to "populated". Okay as-is.

        h3. `noDuration.` Defaults to false. Okay as-is.

        h4. `dropDatabases.` Defaults to false. Okay as-is.

Below is an example of a complete "install-config.json" file for SQL Server:

**install-config.json(SQLServer)** Expand source

```json
{
    "installationDirectory": "C:\\inetpub\\Ed-Fi\\AdminApp",
    "odsApi": {
        "apiUrl": "",
        "apiMode": "Shared Instance",
        "schoolYear": ""
    },
    "databases": {
        "applicationCredentials": {
            "databaseUser" : "",
            "databasePassword" : "",
            "useIntegratedSecurity" : true
        },
        "installCredentials": {
            "databaseUser" : "",
            "databasePassword" : "",
            "useIntegratedSecurity" : true
        },
        "engine" : "SQLServer",
        "databaseServer" : "(local)",
        "databasePort" : "",
        "adminDatabaseName" : "EdFi_Admin",
        "odsDatabaseName" : "EdFi_Ods",
        "securityDatabaseName" : "EdFi_Security",
        "useTemplates" : false,
        "odsTemplate" : "populated",
        "noDuration" : false,
        "dropDatabases" : false
    }
}
```

Below is an example of a complete "install-config.json" file for PostgreSQL:

**install-config.json(PostgreSQL)** Expand source

```json
{
    "installationDirectory": "C:\\inetpub\\Ed-Fi\\AdminApp",
    "odsApi": {
        "apiUrl": "",
        "apiMode": "Shared Instance",
        "schoolYear": ""
    },
    "databases": {
        "applicationCredentials": {
            "databaseUser" : "postgres",
            "databasePassword" : "",
            "useIntegratedSecurity" : false
        },
        "installCredentials": {
            "databaseUser" : "postgres",
            "databasePassword" : "",
            "useIntegratedSecurity" : false
        },
        "engine" : "PostgreSQL",
        "databaseServer" : "localhost",
        "databasePort" : "",
        "adminDatabaseName" : "EdFi_Admin",
        "odsDatabaseName" : "EdFi_Ods",
        "securityDatabaseName" : "EdFi_Security",
        "useTemplates" : false,
        "odsTemplate" : "populated",
        "noDuration" : false,
        "dropDatabases" : false
    }
}
```

### Step 4. Run the Installation via PowerShell

Ensure that you have permission to execute PowerShell scripts. For more
information,
see [about_Execution_Policies](http://go.microsoft.com/fwlink/?LinkID=135170).

Launch PowerShell as an administrator, "cd" to the directory containing the
installation files, and run the "install.ps1" script.

The PowerShell output will look something like the following:

![Pws Installation](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/older-versions-of-admin-app/Successful-Installation.JPG)

### Step 5. Create SQL Server Login (if "useIntegratedSecurity" set to "true")

This step only needs to be completed if you set `useIntegratedSecurity` to true
on the install-config.json in Step 3, above. If you did not, we can skip ahead
to Step 6.

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

### Step 6. Checking Folder Permissions

Folders to verify:

1. Admin App application folder (default folder path:
   C:\\inetpub\\Ed-Fi\\AdminApp).
2. Admin App log folder (default folder path:
   C:\\ProgramData\\Ed-Fi-ODS-AdminApp).

For checking permissions:

* **Right-click** the folder, choose **Properties**, view the **Security** tab.
* Verify the "Group or user names" section has Ed-Fi.AdminApp with Full control.

![Properties](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/older-versions-of-admin-app/Upload-folder-permission.JPG)

If the AdminApp not available on the list, add with Full control.

![Permission groups](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/older-versions-of-admin-app/AddFolderPermission.JPG)

### Step 7. Securing the Admin App

If you're performing a production on-premises installation, now would be a good
time to review the documentation on [Securing the Admin App](../../securing-the-admin-app.md),
particularly the material on IIS configuration and NTLM.

### Step 8. Admin App Licensing & Configuration

This section provides an overview of the initial Admin App configuration. We'll
continue using a local test environment.

Connect to the Admin App URL (`https://localhost/AdminApp`) to complete the
setup.

If you're using Microsoft Edge, you may see an active directory security
authentication window.

![Edge Security](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/older-versions-of-admin-app/image2019-2-26_6-1-34.png)

Go ahead and sign in.

You'll see the following screen. To complete the final steps in the setup
process, press **Continue**.

![Setup Required](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/older-versions-of-admin-app/page0.jpg)

You should land on the **Admin App Home** page.

![AdminApp](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/getting-started/older-versions-of-admin-app/Applicationpage1.JPG)

### Step 9. Restart the ODS / API

To finish the Admin App on-premises setup, the ODS / API must be restarted.

Steps for restarting the ODS / API:

* Open IIS Manager (inetmgr).
* In the Connections pane on the left, expand **Sites** and locate the **Ed-Fi**
  website.
* **Right-click** the website and select **Manage Website** > **Restart**.
* Close IIS Manager.

### Step 10. Using the Admin App

The Admin App is now configured for use with your Ed-Fi ODS / API instance.
Please visit the following articles to help with next actions in using Admin
App:

* [Securing the Admin App (v1.x)](../../securing-the-admin-app.md)
* [ASP.NET Identity (Preview in
  v1.8)](../../../technical-articles/aspnet-identity-preview-in-v18)
* [Year-Specific Mode
  (v1.x)](../../../technical-articles/year-specific-mode-v1x)
* [Next Steps](../../../getting-started/next-steps)
* [Known Issues](../../../getting-started/known-issues)
