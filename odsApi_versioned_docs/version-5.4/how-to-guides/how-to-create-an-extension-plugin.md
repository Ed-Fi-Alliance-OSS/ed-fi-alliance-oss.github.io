# How To: Create an Extension Plugin

In this example, we will create an extension plugin and publish it to NuGet
feed, which can then be placed in the plugin folder of a pre-deployed ODS / API to
extend it.

Before you begin:

* This walkthrough assumes you have a working extension project.
* This article uses the [student transportation extension](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774474/How+To+Extend+the+Ed-Fi+ODS+API+-+Student+Transportation+Example) as an example.
* This example assumes you have the NuGet CLI tool. You can follow the
instructions for [Installing NuGet Client Tools](https://docs.microsoft.com/en-us/nuget/install-nuget-client-tools#nugetexe-cli).
* This example assumes you have access to a MyGet feed.
  * If you don't have a MyGet feed, you can follow MyGet's instructions for [Getting Started with NuGet](https://docs.myget.org/docs/walkthrough/getting-started-with-nuget).
  * Alternatively, you can also work with other cost-effective options for distributing software packages such as [Azure Artifacts](https://azure.microsoft.com/en-us/pricing/details/devops/azure-devops-services/), [GitHub Packages](https://github.com/features/packages#pricing), and so forth.

The steps can be summarized as:

* Creating Extension Plugins
  * Step 1. Run CodeGen
  * Step 2. Build Your Extension Project
  * Step 3. Create a NuGet Package
  * Step 4. Publish NuGet Package
* Consuming Extension Plugins

Each step is outlined in detail, below.

## Creating Extension Plugins

### Step 1. Run CodeGen

:::note
This step is optional. If you have followed through [How To: Extend the Ed-Fi ODS / API - Student Transportation Example](./how-to-extend-the-ed-fi-ods-api-student-transportation-example.md) and have run initdev, code generation is already completed.
:::

After creating your extension project by following the example on [How To: Extend the Ed-Fi ODS / API - Student Transportation Example](./how-to-extend-the-ed-fi-ods-api-student-transportation-example.md),

Open a PowerShell session and navigate to Ed-Fi-ODS-Implementation folder
and execute the following command to run code generation.

```powershell
cd <source directory>\Ed-Fi-ODS-Implementation
.\Initialize-PowershellForDevelopment.ps1
Invoke-CodeGen -Engine SQLServer -ExtensionPaths <source directory>\Ed-Fi-ODS-Implementation\Application\EdFi.Ods.Extensions.SampleStudentTransportation\
```

![Image](https://edfi.atlassian.net/wiki/download/thumbnails/22774761/image2021-3-29_14-14-50.png?version=1&modificationDate=1641861361260&cacheVersion=1&api=v2&width=1280&height=443)

### Step 2. Build Your Extension Project 

From a PowerShell session, run the following command to build your extension
project. If you followed the example on [How To: Extend the Ed-Fi ODS / API - Student Transportation Example](./how-to-extend-the-ed-fi-ods-api-student-transportation-example.md) to create the EdFi.Ods.Extensions.SampleStudentTransportation project,
your extension will be in Ed-Fi-ODS-Implementation\Application folder.

```powershell
C:\Program Files\dotnet\dotnet.exe build <source directory>\Ed-Fi-ODS-Implementation\Application\EdFi.Ods.Extensions.SampleStudentTransportation --configuration release
```

![Image](https://edfi.atlassian.net/wiki/download/thumbnails/22774761/image2020-11-4_13-44-34.png?version=1&modificationDate=1641861360863&cacheVersion=1&api=v2&width=1280&height=398)

### Step 3. Create a NuGet Package 

Go to the location of NuGet.exe in your system and execute the following command
in a command prompt. Make sure to update the contents of the nuspec file with
your information. It is recommended that you version your extension package with
the same version as the ODS / API for which it was built.

```powershell
NuGet.exe pack <source directory>\Ed-Fi-ODS-Implementation\Application\EdFi.Ods.Extensions.SampleStudentTransportation\EdFi.Ods.Extensions.SampleStudentTransportation.nuspec -OutputDirectory <output directory> -Properties configuration=release -NoPackageAnalysis -NoDefaultExcludes
```

![Image](https://edfi.atlassian.net/wiki/download/thumbnails/22774761/image2021-4-7_18-22-23.png?version=1&modificationDate=1641861361270&cacheVersion=1&api=v2&width=840&height=102)

![Image](https://edfi.atlassian.net/wiki/download/thumbnails/22774761/image2021-3-29_14-18-15.png?version=1&modificationDate=1641861361277&cacheVersion=1&api=v2&width=938&height=687)

### Step 4. Publish NuGet Package

In this step, execute the following command to publish NuGet package.

```powershell
NuGet.exe push -source https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json -apikey <PAT> <nuget directory>\EdFi.Ods.Extensions.SampleStudentTransportation.1.0.0.nupkg
```

![Image](https://edfi.atlassian.net/wiki/download/thumbnails/22774761/image2021-4-7_19-8-54.png?version=1&modificationDate=1641861361283&cacheVersion=1&api=v2&width=838&height=96)

## Consuming Extension Plugins

Follow the approach described in [How To: Deploy an Extension Plugin](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774717/How+To+Deploy+an+Extension+Plugin) to consume the published extension package.
