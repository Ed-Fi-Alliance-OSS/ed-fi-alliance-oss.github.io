# How To: Create an Extension Plugin

In this example, we will create an extension plugin and publish it to NuGet
feed, which can then be placed in the plugin folder of a pre-deployed ODS / API
to extend it.

Before you begin:

* This walkthrough assumes you have a working extension project.
* This article uses the [alternative education program
    extension](./how-to-extend-the-ed-fi-ods-api-alternative-education-program-example.md)
    as an example.
* This example assumes you have the NuGet CLI tool. You can follow the
    instructions for [Installing NuGet Client
    Tools](https://docs.microsoft.com/en-us/nuget/install-nuget-client-tools#nugetexe-cli).
* This example assumes you have access to a MyGet feed.
  * If you don't have a MyGet feed, you can follow MyGet's instructions
        for [Getting Started with
        NuGet](https://docs.myget.org/docs/walkthrough/getting-started-with-nuget).
  * Alternatively, you can also work with other cost-effective options for
        distributing software packages such as [Azure
        Artifacts](https://azure.microsoft.com/en-us/pricing/details/devops/azure-devops-services/)​,
        [GitHub Packages](https://github.com/features/packages#pricing), and so
        forth.

The steps can be summarized as:

- [How To: Create an Extension Plugin](#how-to-create-an-extension-plugin)
  - [Creating Extension Plugins](#creating-extension-plugins)
    - [Step 1. Run CodeGen](#step-1run-codegen)
    - [Step 2. Build Your Extension Project](#step-2build-your-extension-project)
    - [Step 3. Create a NuGet Package](#step-3-create-a-nuget-package)
    - [Step 4. Publish NuGet Package](#step-4-publish-nugetpackage)
  - [Consuming Extension Plugins](#consumingextension-plugins)

Each step is outlined in detail, below.

## Creating Extension Plugins

### Step 1. Run CodeGen

:::info

This step is optional. If you have followed through [How To: Extend the Ed-Fi
ODS / API - Alternative Education Program
Example](./how-to-extend-the-ed-fi-ods-api-alternative-education-program-example.md) and
have run initdev, code generation is already completed.

:::

After creating your extension project by following the example on [How To:
Extend the Ed-Fi ODS / API - Alternative Education Program
Example](./how-to-extend-the-ed-fi-ods-api-alternative-education-program-example.md),

Open a PowerShell session and navigate to Ed-Fi-ODS-Implementation folder
and execute the following command to run code generation.

`cd` `<source directory>\Ed``-Fi``-ODS``-Implementation`
`.\Initialize``-PowershellForDevelopment``.ps1`
`Invoke``-CodeGen` `-Engine` `SQLServer -StandardVersion 5.1.0 -ExtensionVersion
1.0.0`

![PowerShell](../../../../static/img/reference/ods-api/image2024-5-30_22-5-42.png)

### Step 2. Build Your Extension Project

From a PowerShell session, run the following command to build your extension
project. If you followed the example on [How To: Extend the Ed-Fi ODS / API -
Alternative Education Program
Example](./how-to-extend-the-ed-fi-ods-api-alternative-education-program-example.md) to
create the EdFi.Ods.Extensions.SampleAlternativeEducationProgram project,
your extension will be in Ed-Fi-ODS-Implementation\\Application folder.

`dotnet build <source
directory>\Ed``-Fi``-ODS``-Implementation``\Application\EdFi.Ods.Extensions.SampleAlternativeEducationProgram
-``-configuration` `release`

![Building Extension](../../../../static/img/reference/ods-api/image2024-5-30_22-8-5.png)

### Step 3. Create a NuGet Package

Go to the location of NuGet.exe in your system and execute the following command
in a command prompt. Make sure to update the contents of the nuspec file with
your information. It is recommended that you version your extension package with
the same version as the ODS / API for which it was built.

```powershell
cd tools
.\NuGet.exe pack <source directory>\Ed-Fi-ODS-Implementation\Application\EdFi.Ods.Extensions.SampleAlternativeEducationProgram\EdFi.Ods.Extensions.SampleAlternativeEducationProgram.nuspec -OutputDirectory <output directory> -Properties configuration=release -Properties StandardVersion=5.1.0 -Properties ExtensionVersion=1.0.0 -NoPackageAnalysis -NoDefaultExcludes
```

![PowerShell](../../../../static/img/reference/ods-api/image2024-5-30_22-11-32.png)

![NuGet](../../../../static/img/reference/ods-api/image2024-5-30_22-13-45.png)

### Step 4. Publish NuGet Package

In this step, execute the following command to publish NuGet package.

```powershell
.\NuGet.exe push -source https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json -apikey <PAT> <nuget directory>\EdFi.Ods.Extensions.SampleAlternativeEducationProgram.1.0.0.Standard.5.1.0.1.0.0.nupkg
```

![NuGet](../../../../static/img/reference/ods-api/image2024-5-30_22-18-44.png)

## Consuming Extension Plugins

Follow the approach described in [How To: Deploy an Extension
Plugin](./how-to-deploy-an-extension-plugin.md) to consume the
published extension package.
