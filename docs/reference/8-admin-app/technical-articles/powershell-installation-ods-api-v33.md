# PowerShell Installation (ODS / API v3.3)

# Before You Install

This section provides general information you should review before installing
the Ed-Fi ODS / API Admin App.

## Prerequisites

The following are required to install the Admin App:

* The Admin App provides an interface to administer an Ed-Fi ODS / API.
  Understandably, you must have an Ed-Fi ODS / API deployed and operational
  before you can use the Admin App. The ODS / API must be an On-Premises
  Installation or an Azure Cloud ODS from the Ed-Fi Exchange.
* You must have an Ed-Fi license to use the Admin App. If you have an
  installation of the ODS / API, you already have a license. The Ed-Fi License
  is free and available online. If you haven't done so already, visit
  the [Ed-Fi.org licensing
  section](https://www.ed-fi.org/getting-started/license-ed-fi-technology/) for
  details and a link to request a license.
* Admin App authentication will work via Single Sign-On using either Active
  Directory or Active Directory for Azure depending on deployment.
* Download and install the Microsoft IIS URL Rewrite
  Tool: [https://www.iis.net/downloads/microsoft/url-rewrite](https://www.iis.net/downloads/microsoft/url-rewrite) if
  it is not already available (this may require computer restart).

## Required Information

You will need the following information to complete this installation:

* The location of your Ed-Fi ODS / API.
* Administrator access and credentials for either on-premises or Azure
  environment with target Ed-Fi ODS / API.

# Installation Instructions

This section provides step-by-step instructions for installation. The specific
steps are different depending on the deployment model and version of your Ed-Fi
ODS / API.

## Compatibility & Supported ODS / API Versions

Currently, the ODS / API Admin App can be installed for use with the Ed-Fi ODS /
API v3.3. See the [Ed-Fi Technology Version
Index](../../0-roadmap/supported-versions.md) for
more details.

## On-Premises Deployment for ODS / API for v3.3

Each step is outlined in detail below.

### Step 1. Unzip Admin App Source Files

Unzip the contents of the Source ZIP into any folder of your choosing. Our
directory is on the following path: "C:\\Ed-Fi\\Admin App v1.7".

![Unzip Installer](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2020-1-30_10-59-30.png)

### Step 2. Unzip Admin App Installation Files

Unzip the contents of the Installation ZIP into any folder of your choosing. Our
directory is on the following path: "C:\\Ed-Fi\\Admin App Installation".

![Unzip App](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2020-1-30_10-58-34.png)

### Step 3. Configure Installation

Open the "install-config.json" file. We will need to edit this file with our
configuration details.

1. Set the "installationDirectory" to the path of the directory with the source
   files. Be sure to escape any special characters like slashes (For example, a
   path like "C:\\Ed-Fi\\Admin App v1.7" should be changed to
   "C:\\\\Ed-Fi\\\\Admin App v1.7").
2. Configure values for the ODS / API.
    1. "apiUrl" is the base URL for the ODS / API.
    2. "apiMode" is either going to be "Shared Instance" or "Year Specific".
        1. If "Shared Instance" was chosen, the "schoolYear" can be left blank.
        2. If "Year Specific" was chosen, you must provide the "schoolYear".
3. Configure values for each database. These are used to construct the
   connection strings.
    1. "sqlServer" is the name of the database server. For a local server, we
       can use "(local)".
    2. "name" is simply the name of the database being referenced. For example,
       when configuring for the "ods" database, the value here will be the name
       of the ODS, whereas the "admin" and "security" database names will
       probably be "EdFi\_Admin" and "EdFi\_Security", respectively.
    3. "trustedConnection" will either be "true" or "false".
        1. If you plan to use Windows authentication, this value will be "true"
           and "username" and "password" can be left blank.
        2. If you plan to use SQL Server authentication, this value will be
           "false" and the "username" and "password" must be provided.

This is an example of what a complete "install-config.json" file could look
like:

**install-config.json**

```json
{
    "installationDirectory": "C:\\Ed-Fi\\Admin App v1.7",
    "odsApi": {
        "apiUrl": "http://localhost:54746",
        "apiMode": "SharedInstance",
        "schoolYear": ""
    },
    "database": {
        "ods": {
            "sqlServer": "(local)",
            "name": "EdFi_Ods",
            "trustedConnection": "true",
            "username": "",
            "password": ""
        },
        "admin": {
            "sqlServer": "(local)",
            "name": "EdFi_Admin",
            "trustedConnection": "true",
            "username": "",
            "password": ""
        },
        "security": {
            "sqlServer": "(local)",
            "name": "EdFi_Security",
            "trustedConnection": "true",
            "username": "",
            "password": ""
        }
    }
}
```

### Step 4. Run the Installation via PowerShell

Ensure that you have permission to execute PowerShell scripts. For more
information,
see [http://go.microsoft.com/fwlink/?LinkID=135170](http://go.microsoft.com/fwlink/?LinkID=135170).

Launch PowerShell as an administrator, cd to the directory containing the
installation files, and run the "install.ps1" script.

The PowerShell output should look like the following:

![Pws Certificate](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2020-1-30_11-4-51.png)

### Next Steps. Continue at Step 5 in the Admin App Installation (3.x)

Continue Step 5 and beyond in the general Admin App installation
instructions: [Admin App v1.7 for ODS / API
v3.3](../getting-started/installation/older-versions-of-admin-app/admin-app-v17-for-ods-api-v33).

:::info note:
  The following are ZIP files needed for the successful on-premises
  installation of Admin App v1.7 for Ed-Fi ODS / API v3.3 Source ZIP:
  [Ed-Fi\_ODS\_AdminApp\_1.7\_3.3.zip](https://edfi.atlassian.net/wiki/download/attachments/25235508/EdFi.Ods.AdminApp.3.3.0.389.zip?version=1&modificationDate=1580420953863&cacheVersion=1&api=v2)
  Installation ZIP:
  [Ed-Fi\_ODS\_AdminApp\_Installation\_1.7\_3.3.zip](https://edfi.atlassian.net/wiki/download/attachments/25235508/EdFi.Ods.AdminApp.Installation.3.3.0.389.zip?version=1&modificationDate=1580420906613&cacheVersion=1&api=v2)
:::
