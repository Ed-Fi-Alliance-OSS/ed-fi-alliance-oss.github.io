# Deploying the Ed-Fi ODS API 6x on Azure

## Introduction

This document describes the customer success team’s experiences installing the Ed-Fi platform in Azure.  Based on what we have seen community members being most interested in, these instructions detail an implementation that uses the virtualized Microsoft Sql Server databases and virtualized web applications running as App Services on a Microsoft platform.  These are NOT necessarily the recommendations of the Ed-Fi Alliance, this is just the path we have tested.

The basis of this deployment involves having a locally-built version of 6x. Unfortunately, the 6x portable binaries are not compatible with windows-based App Service instances on Azure. Also, we are only doing a build for YearSpecific, OdsSpecific, and SharedInstance mode.  Sandbox mode is not compatible with the completely virtualized SQL databases. Instructions on using a sandbox-compatible SQL Virtual Machine are forthcoming...

This guide does not get into automated implementation strategies or advanced security configuration. Users should expect to work with a qualified cloud architect to figure out what sort of strategies make sense for their organization, their skill set, their budget, and their objectives.

## Prerequisites

The following prerequisites should be addressed before starting the Azure deployment.

* Local or virtual machine development environment with the following:
  * Ed-Fi ODS/API installed from source ([Getting Started - Source Code Installation](/reference/ods-api/6.2/downloads)) . We have found that deploying 6.x versions of the ODS/API requires building the solution from source code so that the web application can be explicitly defined as 64-bit. More on that later…
  * The Ed-Fi ODS Admin App should be installed but NOT run for the first time ([Admin App v3.0 for ODS/API v6.0](/reference/admin-app/getting-started/installation/older-versions-of-admin-app/admin-app-v30-for-odsapi-v60/))
  * [The Azure CLI should be installed](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli-windows?tabs=azure-cli)

Step 1. MSSQL Server Setup

In an on-premises ODS/API installation there will be a virtual or physical machine that will have SQL Server installed and host the various Ed-Fi databases (ODS, Admin, and Security). In Azure there is a concept of a 'SQL Server' that is similar. One of these will be needed to host the Ed-Fi databases.

* Log into the Azure portal and search for the SQL Servers option
* Select **Create**
* Select a previously created **Subscription** and **Resource Group**
* Set the **name** for the Server and its **location**
* Set **Authentication method** to either "Use SQL authentication" or "Use both SQL and Azure AD authentication"
  * **NOTE**: SQL Server Authentication is the only authentication method _needed_, but Azure AD authentication provides a more secure way to externally connecting to the databases.

* Set the SQL Server admin login and Password

![SQL Server creation wizard](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_0-10-14.png)

* Go to **Next: Networking**
* Set **Allow Azure services and resources to access this server** to **Yes**

**![Create SQL Database server](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_0-12-45.png)

**

* Click **Next: Additional settings**
* Set **Enable Microsoft Defender for SQL** to Not now

![Create SQL Server additional details](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_0-13-40.png)

* Click **Next: Tags**
* Set any desired **Tag name** and its **values**

**![Create SQL Server tags](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_0-14-37.png)

**

* Go to **Review + create**

**![Create SQL Server Review and create](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_0-17-19.png)

**

* Review the generated configuration
* Click on **Create**
* You should get a notification regarding your ongoing resource deployment, as well as a redirect to the **Deployment Status page**

**![SQL Server Deployment in progress](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_0-18-55.png)

**

* After the deployment is successful, select "Go to resource" or navigate manually to the created SQL server

![MSSQL Server create complete](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_0-21-21.png)

## Step 2. Deploy local databases to Azure SQL

In this section we will be deploying the local databases up to the Azure SQL Server we just set up.

We have two options for deploying databases, either the databases can be pushed to an Azure storage account from SSMS or they can be published directly from SSMS

> [!NOTE]
>
> Deploy via Storage accounts
>
> * In your local computer open **SQL Server Management Studio.** You can download it from this site: [https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16)
> * Select Database Engine as **Server Type**
> * Select your local DB server name and choose **Windows Authentication**
> * Click **Connect**
>
> **![SSMS SQL connection](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_0-27-12.png)
>
> **
>
> * Under the server object > "Databases", right-click any of the local databases. Select "Tasks" > "Export Data-Tier Application"
> * Click on "Next" on "Introduction"
> * On "Export Settings", under "Settings", click on "Save to Microsoft Azure"
> * Click on "Connect", and "Sign in..."
> * Sign in to your Azure account
> * Select the appropriate Storage account and Blob Container to store the backup file. Click "OK"
>
> ![Azure connect to a storage container](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_1-13-22.png)
>
> * After returning to the export wizard, corroborate the information provided and click "Next"
>
> ![SSMS Configure export settings](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_1-15-45.png)
>
> * Corroborate the information and click "Finish"
>
> ![Complete export](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_1-17-31.png)
>
> * On your Azure portal page, navigate to the SQL Server created in Step 1
> * On the "Overview" section of the resource page, click on "+ Import Database"
>
> ![Azure select import database](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_0-49-24.png)
>
> * Fill the requirements with the corresponding information
>   * Database name: type the same database name it had from the backup or leave blank
>   * Collation: leave as is
>   * Authentication type: SQL Server
>   * Server admin login: The name of the administrator account of the SQL server
>   * Password: The password of the administrator account of the SQL server
>
> ![Azure import database](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_0-53-37.png)
>
> * For "Storage", click on "Select backup"
> * Navigate to the storage account containing the backup file
> * Navigate to the container containing the backup file
> * Select the corresponding backup file and click "Select"
>
> ![Azure db backup configuration](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_0-57-46.png)
>
> * You should get a notification with the database import request on your Azure portal notifications tab
>
> ![Notifications](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_1-0-18.png)
>
> * You can monitor the process of the import status on the SQL Server resource page, under "Data management" > "Import/Export History"
>
> ![Import Export History](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_1-2-54.png)
>
> * Once the process is finished, status under "Import/Export history" should be "Completed" and the database should appear under "Settings" > "SQL Databases"
>
> Deploy direct from Sql Server Management Studio (SSMS)
>
> * In your local computer open **SQL Server Management Studio.** You can download it from this site: [https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16)
> * Select Database Engine as **Server Type**
> * Write your **Server name**. This is the name of the Azure SQL Server that you just created.
> * Select SQL Server Authentication as **Authentication** method and enter the username and password you created
> * Click **Connect**
> * Now connect to your local SQL Server by clicking on **Connect**
>
> **![SSMS Login Screen](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_0-27-12.png)
>
> **
>
> * Select your local DB server name and choose **Windows Authentication**
> * Click on **Connect**
> * There are three databases that we need to import into Azure. By default, these are called: EdFi \_Admin, EdFi\_ODS, EdFI\_Security. If this is a yearspecific instance, there could be more than one EdFi\_ODS for each year. After successfully connecting, locate the databases by expanding the **Databases** folder
>
> ![SSMS Connect](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_0-29-52.png)
>
> * Choose the database that you wish to import (they can be imported in any desired order)
> * Right click on that database, go to **Tasks** and then to **Deploy Database to Microsoft Azure SQL Database**
>
> **![SSMS Deploy](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_0-35-54.png)
>
> **
>
> * Skip the **Introduction**
> * Click on **Connect**
> * Set the **Server name** with the Azure SQL Server
> * Choose **SQL Server Authentication** and set your Username and **Password** info
> * Click on **Connect**
> * Set the name for the database that will be deployed to the Azure SQL Server
> * Choose the parameters accordingly to the database that will be imported
>     \*This parameters are still undergoing testing and may change over time

|     |     |     |     |
| --- | --- | --- | --- |
|     | **EdFi\_Admin** | **EdFi\_Security** | **EdFi\_Ods\_** |
| **Edition** | Standard | Standard | Standard |
| **Maximum** **database size** | 1 GB | 1 GB | 50 GB |
| **Service Objective** | S1  | S1  | S1  |

* Click on **Next**
* Review the summary and click **Finish** to deploy the Database
* Repeat the previous 11 steps (32 - 42) with the other 2 databases.

## Step 3. Create App Services in the Portal

This section explains how to create the three app services in the Portal for the Web API, the Admin App, and Swagger.  

Click here to expand...

### Create App Service Plan

* From the Azure portal create an **App Service Plan**
* Choose your **Subscription** and **Resource Group**
* **Name** your App Service Plan and select Windows as **Operating system**.
* Choose Standard SI as **Pricing plan**
* Click **Next: Tags**
* Set tags according to your company's best practices. At a minimum we recommend using the **maintained by** tag name and select your name as **value** from the dropdown
* Click on Next: **Review + create**
* Review the plan and click on **Create**

### Create App Services

These steps will need to be repeated for three web applications, the Web API, the Admin App, and Swagger

* From the portal create a new App Service.
* Select your **Subscription** and **Resource Group**
* **Name** your application The name is something that will have to be unique across all of Azure so include information about the company. You will need separate App services for the Web Api, Swagger, and the Admin App.
* If running 6.1, select .Net 6 (LTS) as **Runtime stack** and Windows as **Operating System.** If running 6.2, select .NET 8 (LTS) as the **Runtime Stack**
* Select the **App Service plan** created on step 53
* Click **Next: Deployment**
* Set **Continuous deployment** to Disable
* Click **Next: Networking**
* Set **Enable public access** to On and Disable **Network injection**
* Click **Next: Monitoring**
* **Enable Application Insights** and leave the default **Application Insights**
* Click **Next: Tags**
* Set the **maintained by** tag name and select your name as **value** from the dropdown
* Set any other desired **Tag name** and its **value**
* Click **Next: Review + create**
* Review the deployment and click **Create.**  Wait a minute until the resource is completed.
* Go to the newly created App Service, select the  ‘Configuration’ menu on the left and ‘general’ menu on the top, and set it to 64 bit platform.
* Repeat for the other web apps.

## Step 4. Configure Key Vault to hold database credentials

A Key Vault will allow you to save the database connection username and passwords in a secure location.

Click here to expand...

### 4.1 Creating Key Vault

* From the Azure portal home page, search “Key Vaults” resource.
* Select **Create**
* Under the **Basic Tab** enter the required information mark with (\*)
* Select **Next + create** (Access Policy, Networking, and Tags can remain with default values, they will be configured later)
* Under **Review + create** review all the selected options.
* Select **Create**

Once the Key Vault is created, you can view it in the Key Vault Section.

![Explore key vault](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-24_11-46-57.png)

### 4.2 Adding Secret to Key Vault

* From the Azure portal home page, search for **Key Vaults** resource.
* Select the **Key vault** that was **previously created**
* Using the Left navigation panel, select **Objects => Secrets**
* Select **Generate/Import**
* Enter the required information mark with (\*)
  * **Upload options** should be **Manual** from the DDL
  * **Secret value** should have the **connection string** to the database
* Select **Create**

Once created, go back to the key vault and select Object => Secret; you will see the secret created

Repeat **Adding Secret to key vault** for all 3 connection strings

* EdFi\_Admin
* EdFi\_Security
* EdFi\_Ods

And you will end up with 3 secrets

![Environment secrets](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-24_12-15-37.png)

### 4.3 Add Access Policy to Key Vault

* From the azure portal home page, search for **App Services**
* Select the **App Service** where the **WebApi** is deployed
* From the Left navigation panel, select **Settings => Identity**
* Turn **Status On** (if not turned on)
* Select **Saved**; this will Generate an Object (principal) ID
* Copy the Object (principal) ID

The above steps should be repeated for the AdminApp

* Go to the Key Vault created in step 3.1
* From the Left navigation panel, select **Access policies**
* Select **Create**
* Under Permissions tab
  * Select **Key Management** from the Configure template DDL
  * Under **Secret Permissions** area, **check Get & List** checkbox
  * leave other options as default
* Select **Next**
* Under the **Principal Tab** paste the Object (principal) ID on the search bar and select the app service to which you want to add the policy
* Select **Next**
* **Application (optional) tab** does not need to be configured.
* Select **Next**
* Under the **Review + create tab,** all options can be reviewed before creating the policy
* Select **Create**

Repeat the above steps for the AdminApp App Service

Once done you will end up with 2 access Policy

1. WebApi
2. AdminApp

![Google Cloud Access policies](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-24_14-23-29.png)

## Step 5. Deploy Web API and Swagger to App Services

This section describes how to deploy these two applications. They will need to be built from Visual Studio.

Click here to expand...

* Open up the EdFi.sln file in the Ed-Fi-Ods-Implementation/application/EdFi.sln file in Visual Studio. You should sign into visual studio using the same credentials that have access to the Azure Portal.
* Right-click on the "Entry Points" → Edfi.Ods.WebApi folder and select "deploy"
* On the deployment screen that comes up select the green plus sign to build a new deployment
* > [!NOTE]
    >
    > Deploy Direct to Azure
    >
    > * Option 1- deploy straight to Azure
    > * Select a target of "Azure"
    > * select a specific target of "Azure App Service Windows"
    > * choose the appropriate Resource Group and region
    > * Choose the App Service that you created the WebApi and "save"
    > * Change the target Runtime from Portable to "win-x64"
    >
    > ![Visual Studio Publish target](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/VsPublishHL.png)
    >
    > * Click Publish.
    >
    > Deploy to Azure-ready .zip binary
    >
    > * Option 2 - build a portable zip file
    > * Select a target of "Folder"
    > * Choose a file location
    > * Change the target Runtime from Portable to "win-x64"
    >
    > ![Visual Studio Publish target complete](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/VsPublishHL.png)
    >
    > * Click Publish.
    > * Open up the folder that you deployed to is located and zip up the contents of the deploy directory, not including the directory, with the following PowerShell commands:
    >
    > ```sh
    > $compress = @{
    >   Path = "WebApi\*"
    >   CompressionLevel = "Fastest"
    >   DestinationPath = "WebApi.zip"}
    >
    > Compress-Archive @compress
    > ```
    >
    > * This should make a WebApi.zip file.
    > * In the Portal, Navigate to the Web Api App Service Plan.
    > * On the sidebar search box look for **Advanced Tools**, click on it and then click **Go**
    > * You’ll be redirected to a service named **Kudu**. Locate **Tools** and click **Zip Push Deploy**
    > * Drag and drop the .zip file and wait until it is uploaded, decompressed and deployed

* Repeat for the Swagger application

## Step 6. Deploy Admin App to Azure App Service

The Admin App is not deployed from Visual Studio. Instead, it is installed locally with the installer and then pushed up to the app service as a zip file.

Click here to expand...

* Copy the AdminApp web application folder (usually c:\\inetpub\\ed-fi\\AdminApp) to a working directory.
* Edit the web.config and set stdoutLogEnabled="true". Check what log4netconfig file that appsettings.json is pointing to and in that file make sure that all of the logging files are NOT going to $program\_data or something like that. I use ./logs directory
* Open the working directory in PowerShell.
* Zip up the contents of the admin app folder, but do not include the folder itself. In PowerShell the following commands to this:

```sh
$compress = @{
  Path = "AdminApp\*"
  CompressionLevel = "Fastest"
  DestinationPath = "AdminApp.zip"}

Compress-Archive @compress
```

* This should make an “AdminApp.zip” file.
* Log into Azure from the command line with the command;

```sh
   az login
```

* If you get an SSL error in your browser, put this command in the address bar  “[chrome://net-internals/#hsts]” and delete the localhost security policy.
* Send it up. The “--src” tag should have the name of the zip file, “-g” is the name of the resource group, and “-n” is the name of the App Service that was created on the portal :

    ```sh
     az functionapp deployment source config-zip -g customer-success -n AdminAppYsGeorgiaCstEdfi--src AdminApp.zip
    ```

## Step 7. Configure App services

Now that the Web Apps have been deployed then you will need to set up the connection strings and other variables that are found in the 'appsettings.json' file.

Click here to expand...

### General instructions for setting App settings and connection strings

* Open the App Service that you want to set values for
* On the left menu find the "Configuration" option
* There will be an option towards the top of the screen to create new AppSettings and one at the bottom to bulk-edit connection strings
* After adding or changing values make sure to save the app service.

### WebApi application settings

* The webApi should have an Application Setting of “ApiSettings:Mode” and a Value of “YearSpecific”
* The webApi should have an Application Setting of "ApplicationInsights:InstrumentationKey" and the value should come from the Instrumentation key from your App Insight

Ex

![Web API App settings](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-27_13-2-59.png)

### Admin App application settings

* The Admin App should have an Application Setting of “AppSettings:ProductionApiUrl” and a Value of the URL for the Web API

### Swagger application settings

* Swagger App should have an Application Setting of ““WebApiVersionUrl”” and a Value of the URL for the Web API

:::note
Make sure when you finish adding the settings you save the changes**
:::

### Configure Database Connection

There are two methods of database configuring database connection strings we are describing. The first one has the database credentials hardcoded in the settings for that App Service. This is a violation of some organization's security policy. The second method uses the key vault set up in step 4 to hold the credentials.

> [!NOTE]
>
> Credentials hard coded in the connection string
>
> In this section, we will configure AdminApp and WebApi connection strings directly.
>
> ### WebApi
>
> * From the azure portal home page, search for **App Services**
> * Select the WebApi App Service
> * Go to select **Settings => Configuration**
> * Under the Connection string section, select **Advance Edit**
> * Paste the following code into the text area that is prompted, replacing the Server, User Id, and Passwords with the details for the Azure Sql Server.
>
> ```json
> [
>   {
>     "name": "EdFi_Admin",
>     "value": "Server=<Your SQL server name here>; Database=EdFi_Admin; User Id=<Your SQL username here>; Password= <your SQL Password here>; Application Name=EdFi.Ods.WebApi;",
>     "type": "SQLAzure",
>     "slotSetting": false
>   },
>   {
>     "name": "EdFi_Ods",
>     "value": "Server=<Your SQL server name here>; Database=EdFi_{0}; User Id=<Your SQL username here>; Password= <your SQL Password here>; Application Name=EdFi.Ods.WebApi;",
>     "type": "SQLAzure",
>     "slotSetting": false
>   },
>   {
>     "name": "EdFi_Security",
>     "value": "Server=<Your SQL server name here>; Database=EdFi_Security; User Id=<Your SQL username here>; Password= <your SQL Password here>; Application Name=EdFi.Ods.WebApi;",
>     "type": "SQLAzure",
>     "slotSetting": false
>   }
> ]
> ```
>
> ### Admin App
>
> * From the azure portal home page, search for **App Services**
> * Select the Admin App app service
> * Go to select **Settings => Configuration**
> * Under the Connection string section, select **Advance Edit**
> * Paste the following code into the text area that is prompted, replacing the Server, User Id, and Passwords with the details for the Azure Sql Server.
>
> ```json
> [
>   {
>     "name": "Admin",
>     "value": "Server=<Your SQL server name here>; Database=EdFi_Admin; User Id=<Your SQL username here>; Password= <your SQL Password here>; Application Name=EdFi.Ods.WebApi;",
>     "type": "SQLAzure",
>     "slotSetting": false
>   },
>   {
>     "name": "ProductionOds",
>     "value": "Server=<Your SQL server name here>; Database=EdFi_{0}; User Id=<Your SQL username here>; Password= <your SQL Password here>; Application Name=EdFi.Ods.WebApi;",
>     "type": "SQLAzure",
>     "slotSetting": false
>   },
>   {
>     "name": "Security",
>     "value": "Server=<Your SQL server name here>; Database=EdFi_Security; User Id=<Your SQL username here>; Password= <your SQL Password here>; Application Name=EdFi.Ods.WebApi;",
>     "type": "SQLAzure",
>     "slotSetting": false
>   }
> ]
>
>
> ```
>
>
> Using Key vault
>
> In this section, we will configure AdminApp and WebApi to pull the database connection string from the key vault
>
> **Prerequisite:** you must have followed the instruction in step 4 on how to set up the azure key vault
>
> * From the azure portal home page, search for **App Services**
> * Select the App service on which you have the WebApi configured
> * Inside WebApi Service, select **Settings => Configuration**
> * Under the Connection string section, select **Advance Edit**
> * Paste the following code into the text area that is prompted
>
> ```json
> [
>  {
>    "name": "EdFi_Admin",
>    "value": "@Microsoft.KeyVault(SecretUri={Secret Identifier})",
>    "type": "SQLAzure",
>    "slotSetting": false
>  },
>  {
>    "name": "EdFi_Ods",
>    "value": "@Microsoft.KeyVault(SecretUri={Secret Identifier})",
>    "type": "SQLAzure",
>    "slotSetting": false
>  },
>  {
>    "name": "EdFi_Security",
>    "value": "@Microsoft.KeyVault(SecretUri={Secret Identifier})",
>    "type": "SQLAzure",
>    "slotSetting": false
>  }
> ]
> ```
>
> Configure the following properties inside the above JSON
>
> **value:**`{Secret Identifier}`  must be replaced with the secret identifier value that is auto-generated from the secret (Step 4.2)
>
> ![Key secret value screen](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-26_22-45-43.png)
>
> * **name:** must match the name of the database that you have in your `appsettings.json`
>
> ![Ed-Fi connection strings](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-26_22-51-56.png)
>
> Once done, you will end up with something similar to this
>
> ![Collection of connection strings](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-26_22-57-35.png)
>
> ![Connection string per db](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/guides/image-2023-3-26_23-0-51.png)
>
>
>
> * Once done and verified that everything is correct, **save the changes**
>
> **Important: Repeat** all the above **steps** for **AdminApp**
