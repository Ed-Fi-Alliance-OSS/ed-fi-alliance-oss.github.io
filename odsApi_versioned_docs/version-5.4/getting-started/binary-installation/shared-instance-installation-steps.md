---

title: Shared Instance Installation Steps  
sidebar\_position: 3

---

# Shared Instance Installation Steps

This section describes how to set up the Ed-Fi ODS / API v5.4 in shared instance mode. Before you proceed, make sure you have installed the prerequisites listed in [Getting Started - Binary Installation](./readme.md).

*   [Step 1. Download the Ed-Fi ODS / API Installer Packages](#step-1-download-the-ed-fi-ods--api-installer-packages)
    *   [Package Links](#package-links)
*   [Step 2. Install the Ed-Fi Databases](#step-2-install-the-ed-fi-databases)
    *   [Edit the configuration.json File](#edit-the-configurationjson-file)
    *   [Run Installation Script](#run-installation-script)
*   [Step 3. Install WebApi](#step-3-install-webapi)
    *   [Prepare Installation script](#prepare-installation-script)
    *   [Run the Installation Script](#run-the-installation-script)
*   [Step 4. Install Swagger](#step-4-install-swagger)
    *   [Prepare Installation Script](#prepare-installation-script-1)
    *   [Run the Installation Script](#run-the-installation-script-1)
*   [Step 5. Install Admin App](#step-5-install-admin-app)
*   [Step 6. Restart your Website](#step-6-restart-your-website)

> **Warning**  
> There are considerable limitations to storing multiple years of data in a single ODS. If you are using "Shared Instance" deployment, plan on starting with a fresh ODS each school year. Please refer to [Guidance on Multi-Year Data in ODS](https://edfi.atlassian.net/wiki/display/ODSAPIS3V54/Guidance+on+Multi-Year+Data+in+ODS?src=contextnavpagetreemode) for details.

---

## Step 1. Download the Ed-Fi ODS / API Installer Packages

The Ed-Fi ODS / API installation packages can be downloaded from the following links:

### Package Links

The required release packages to install the Ed-Fi ODS / API can be found at the links below. We recommend you stay current with the latest patch update that has been promoted to [release](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging?_a=feed&feed=EdFi@Release).

*   [EdFi.Suite3.Installer.WebApi](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Installer.WebApi/versions/5.4.57)
*   [EdFi.Suite3.Installer.SwaggerUI](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.Installer.SwaggerUI/overview/5.4.57) (Optional, not for production)
*   [EdFi.Suite3.RestApi.Databases](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.RestApi.Databases/overview/5.4.2272)

For each of the downloads, **right-click** and select "Properties." Update the file extension (from .nupkg to .zip). Remove the version number (optional). Check the box next to **Unblock** (this will prevent PowerShell from asking for permission to load every module in the installer) and click **OK**.

![Sample.nupkg](https://edfi.atlassian.net/wiki/download/thumbnails/22774218/image2024-7-25_6-30-30.png?version=1&modificationDate=1721907033718&cacheVersion=1&api=v2&width=725&height=977)

:::info  
You may need to configure TLS while running the installation scripts described in steps below.

```
[Net.ServicePointManager]::SecurityProtocol += [Net.SecurityProtocolType]::Tls12
```

:::

---

## Step 2. Install the Ed-Fi Databases

Extract the contents of the EdFi.Suite3.RestApi.Databases package. The paths in these instructions assume that the package was extracted to a folder with the name of the package (e.g., C:\\temp\\EdFi.Suite3.RestApi.Databases).

### Edit the configuration.json File

There are several settings in the configuration file that are left empty as they depend on whether you are opting for SQL Server or PostgreSQL backend. Update the settings by consulting the samples provided below.

SQL Server

```
{
  "ConnectionStrings": {
    "EdFi_Ods": "server=(local);trusted_connection=True;database=EdFi_{0};Application Name=EdFi.Ods.WebApi",
    "EdFi_Security": "server=(local);trusted_connection=True;database=EdFi_Security;persist security info=True;Application Name=EdFi.Ods.WebApi",
    "EdFi_Admin": "server=(local);trusted_connection=True;database=EdFi_Admin;Application Name=EdFi.Ods.WebApi",
    "EdFi_Master": "server=(local);trusted_connection=True;database=master;Application Name=EdFi.Ods.WebApi"
  },
  "ApiSettings": {
    "Mode": "SharedInstance",
    "Engine": "SQLServer",
    ...
    "MinimalTemplateScript": "TPDMCoreMinimalTemplate",
    "PopulatedTemplateScript": "TPDMCorePopulatedTemplate"
  }
}
```

PostgreSQL

```
{
  "ConnectionStrings": {
    "EdFi_Ods": "host=localhost;port=5432;username=postgres;database=EdFi_{0};Application Name=EdFi.Ods.WebApi",
    "EdFi_Security": "host=localhost;port=5432;username=postgres;database=EdFi_Security;Application Name=EdFi.Ods.WebApi",
    "EdFi_Admin": "host=localhost;port=5432;username=postgres;database=EdFi_Admin;Application Name=EdFi.Ods.WebApi",
    "EdFi_Master": "host=localhost;port=5432;username=postgres;database=postgres;Application Name=EdFi.Ods.WebApi"
  },
  "ApiSettings": {
    "Mode": "SharedInstance",
    "Engine": "PostgreSQL",
    ...
    "MinimalTemplateScript": "TPDMCorePostgreSqlMinimalTemplate",
    "PopulatedTemplateScript": "TPDMCorePostgreSqlPopulatedTemplate"
  }
}
```

### Run Installation Script

Open a PowerShell window in Administrator mode and navigate to the EdFi.Suite3.RestApi.Databases package folder.

Run the following PowerShell command to load modules for installation:

```
Import-Module .\Deployment.psm1
```

Next, execute the following command in PowerShell:

```
Initialize-DeploymentEnvironment
```

---

## Step 3. Install WebApi

Extract the contents of the EdFi.Suite3.Installer.WebApi package. The paths in these instructions assume that the package was extracted to a folder with the name of the package (e.g., C:\\temp\\EdFi.Suite3.Installer.WebApi).

### Prepare Installation script

Open a PowerShell window in Administrator mode and navigate to the EdFi.Suite3.Installer.WebApi package folder. Run the following PowerShell command to load modules for installation:

```
Import-Module .\Install-EdFiOdsWebApi.psm1
```

The WebApi installer can take a number of parameters to tailor the installation experience (more examples can be found in the Install-EdFiOdsWebApi.psm1 file). At a minimum, database connection info is required.

Copy and modify the following parameter code to fit your connection information:

SQL Server

```
$parameters = @{
    PackageVersion = "5.4.2285"
    DbConnectionInfo = @{
       Engine="SqlServer"
       Server="localhost"
       UseIntegratedSecurity=$true
    }
    InstallType = "SharedInstance"   
}
```

PostgreSQL

```
$parameters = @{
    PackageVersion = "5.4.2285"
    DbConnectionInfo = @{
       Engine="PostgreSQL"
       Server="localhost"
       Username="postgres"
    }
    InstallType = "SharedInstance"   
}
```

Paste the modified parameter code into your PowerShell window and hit Enter.

### Run the Installation Script

Run the following command in the PowerShell window:

```
Install-EdFiOdsWebApi @parameters
```

---

## Step 4. Install Swagger

Extract the contents of the "EdFi.Suite3.Installer.SwaggerUI" package. The paths in these instructions assume that the package was extracted to a folder with the name of the package (e.g., C:\\temp\\EdFi.Suite3.Installer.SwaggerUI).

### Prepare Installation Script

Open a PowerShell window in Administrator mode and navigate to the "EdFi.Suite3.Installer.SwaggerUI" folder. Run the following PowerShell command to load modules for installation:

```
Import-Module .\Install-EdFiOdsSwaggerUI.psm1
```

The Swagger UI installer can take a number of parameters to tailor the install experience (more examples can be found in the Install-EdFiOdsWebApi.psm1 file). At a minimum, WebAPI connection information is required.

Copy and modify the following parameter code to add your site name:

```
$parameters = @{
    PackageVersion = "5.4.2272"
    WebApiVersionUrl = "https://YOUR_SITE_OR_SERVER_NAME_HERE/WebApi"
}
```

Paste the modified parameter into your PowerShell window and execute the code.

### Run the Installation Script

Run the following command in the PowerShell window:

```
Install-EdFiOdsSwaggerUI @parameters
```

---

## Step 5. Install Admin App

The Admin App provides a graphical interface for platform hosts to administer and manage non-sandbox instances of the Ed-Fi ODS / API. Follow the installation steps [here](https://edfi.atlassian.net/wiki/display/ADMIN/Admin+App+for+Suite+3+v2.3). Alternatively, API keys and secrets can be administered by database administrators via SQL queries as outlined in the article [How To: Configure Key / Secret](../../how-to-guides/how-to-configure-key-secret.md).

---

## Step 6. Restart your Website

Just a few more tasks to complete your installation:

Open IIS (Press the **Windows key** ![Windows logo](https://lh5.googleusercontent.com/o2iqf0j70YV3B-1NQxBFj1Ne-JeToRq5PiZeMtvF05l3jpyp4kseJn-zEs3BULgpAS_TFr8Qyacu5JZkiyXNllygq2EGhPII-PcxYyxkwCUqC4fPhMJ0QbovAD16R7T2StuDemW_) on your keyboard, type **IIS**, select **Internet Information Services (IIS)**, and press **Enter**.

**Right-click** on the server (alternatively, you can right-click the EdFi web site), and select **Stop**.

![Sample SandboxAdmin $parameters for SQL Server](https://edfi.atlassian.net/wiki/download/attachments/22774218/image2021-2-12_17-5-39.png?version=1&modificationDate=1641861344017&cacheVersion=1&api=v2)

**Right-click** the server (or EdFi website) again and select **Start**.

![Sample SandboxAdmin $parameters for PostgreSQL](https://edfi.atlassian.net/wiki/download/thumbnails/22774218/image2021-2-12_17-7-5.png?version=1&modificationDate=1641861344027&cacheVersion=1&api=v2&width=466&height=555)

You are now ready to use the Ed-Fi ODS / API. The following URLs are available:

| Website | URL |
| --- | --- |
| Ed-Fi ODS / API | `https://YOUR_SERVER_NAME_HERE/WebApi` |
| Ed-Fi Admin App | `https://YOUR_SERVER_NAME_HERE/AdminApp/` |
| Ed-Fi ODS / API Documentation (Optional, not for production) | `https://YOUR_SERVER_NAME_HERE/SwaggerUI` |