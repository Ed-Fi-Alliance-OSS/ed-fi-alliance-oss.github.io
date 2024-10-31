# How To: Deploy an Extension Plugin

In this example, you will learn how to install a pre-published extension plugin
in your local development environment as well as in your production deployment
environment. For details on how to create and publish extension plugin see [How
To: Create an Extension Plugin](./how-to-create-an-extension-plugin.md).

## Install Sample extension in Development Environment

Assuming that the Ed-Fi ODS / API has been successfully downloaded and is
running in a local development environment per the instructions in the [Getting
Started](../getting-started/source-code-installation/readme.md) documentation,
pre-published Sample extension is now ready to be installed in your development
environment. Note that ODS / API comes preconfigured with TPDM Core dynamic
extension.

:::info

You may have to enable long path on your development environment to use this
option.

:::

Configure appsettings to load sample plugin along with the default TPDM extension:

```powershell
PS C:\Ed-Fi-ODS-Implementation\Application\EdFi.Ods.WebApi\> dotnet user-secrets set "Plugin:Folder"  "../../Plugin"
Successfully saved Plugin:Folder = ../../Plugin to the secret store.
PS C:\Ed-Fi-ODS-Implementation\Application\EdFi.Ods.WebApi\> dotnet user-secrets set "Plugin:Scripts:0"  "tpdm"
Successfully saved Plugin:Scripts:0 = tpdm to the secret store.
PS C:\Ed-Fi-ODS-Implementation\Application\EdFi.Ods.WebApi\> dotnet user-secrets set "Plugin:Scripts:1"  "sample"
Successfully saved Plugin:Scripts:1 = sample to the secret store.
```

Next, build the source code. To do so, simply open PowerShell and navigate to `<source
directory>\Ed-Fi-ODS-Implementation` folder and run:

```powershell
.\Initialize-PowershellForDevelopment.ps1
Initdev
```

This will execute configured script from _**secret.json**_ to download sample
extension plugin and deploy the plugin artifacts to local database.

```json title="secret.json"
{
  "Plugin:Folder": "../../Plugin",
  "Plugin:Scripts:0": "tpdm",
  "Plugin:Scripts:1": "sample"
}
```

```powershell title="Deployment output"
packages:TPDMCorePopulatedTemplate:PackageVersion                 7.2.202
packages:TPDMCorePostgreSqlMinimalTemplate:PackageName            EdFi.Suite3.Ods.Minimal.Template.TPDM.Core.{ExtensionVersion}.PostgreSQL.Standard.{StandardVersion}
packages:TPDMCorePostgreSqlMinimalTemplate:PackageSource          https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json
packages:TPDMCorePostgreSqlMinimalTemplate:PackageVersion         7.2.189
packages:TPDMCorePostgreSqlPopulatedTemplate:PackageName          EdFi.Suite3.Ods.Populated.Template.TPDM.Core.{ExtensionVersion}.PostgreSQL.Standard.{StandardVersion}
packages:TPDMCorePostgreSqlPopulatedTemplate:PackageSource        https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json
packages:TPDMCorePostgreSqlPopulatedTemplate:PackageVersion       7.2.194
Plugin:Folder                                                     ../../Plugin
Plugin:Scripts:0                                                  tpdm
Plugin:Scripts:1                                                  sample
Urls                                                              http://localhost:54746

WARNING: The following settings are being overridden by the EdFi.Ods.WebApi project's user secrets:

Plugin:Folder   ../../Plugin
Plugin:Scripts:0 tpdm
Plugin:Scripts:1 sample

Invoke-NewDevelopmentAppSettings done in 2s.


-----------------------
    Install-Plugins
-----------------------

& D:\Ed-Fi-ODS-Implementation\Plugin\tpdm.ps1
D:\Ed-Fi-ODS-Implementation\tools/nuget install EdFi.Suite3.Ods.Extensions.TPDM.Core.1.1.0.Standard -source https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json -outputDirectory D:\ed-fi\Ed-Fi-ODS-Implementation\Plugin -ExcludeVersion -version 7.2.159
D:\Ed-Fi-ODS-Implementation\Plugin\EdFi.Suite3.Ods.Extensions.TPDM.Core.1.1.0.7.2.159
& D:\Ed-Fi-ODS-Implementation\Plugin\sample.ps1
D:\Ed-Fi-ODS-Implementation\tools/nuget install EdFi.Suite3.Ods.Extensions.Sample -source https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json -outputDirectory D:\ed-fi\Ed-Fi-ODS-Implementation\Plugin -ExcludeVersion -version 7.2.24
D:\Ed-Fi-ODS-Implementation\Plugin\EdFi.Suite3.Ods.Extensions.Sample.7.2.24
Install-Plugins done in 10s.
```

After the successful execution of initdev, you will find the sample extension in
`<source directory>`\\Ed-Fi-ODS-Implementation\\Plugin folder.

```none title="Ed-Fi-ODS-Implementation/Plugin Directory Listing"
> EdFi.Suite3.Ods.Extensions.Sample.7.2.24
> EdFi.Suite3.Ods.Extensions.TPDM.Core.1.1.0.7.2.159
- homograph.ps1
- profiles.sample.ps1
- sample.ps1
- tpdm.ps1
```

Run the "Ed-Fi-Ods.sln" solution from Visual Studio and verify that the sample
data models are listed in your API landing page ("Discovery API" endpoint).

```json
{
    "version": "7.2",
    "informationalVersion": "7.2",
    "suite": "3",
    "build": "7.2.1201.0",
    "dataModels": [
        {
            "name": "Ed-Fi",
            "version": "5.1.0",
            "informationalVersion": "The Ed-Fi Data Model 5.1"
        },
        {
            "name": "Sample",           <-- THIS IS NEW
            "version": "1.0.0"
        },
        {
            "name": "TPDM",
            "version": "1.1.0",
            "informationalVersion": "TPDM-Core"
        }
    ],
    "urls": {
        "dependencies": "https://api.ed-fi.org/v7.2/api/metadata/data/v3/dependencies",
        "openApiMetadata": "https://api.ed-fi.org/v7.2/api/metadata/",
        "oauth": "https://api.ed-fi.org/v7.2/api/oauth/token",
        "dataManagementApi": "https://api.ed-fi.org/v7.2/api/data/v3/",
        "xsdMetadata": "https://api.ed-fi.org/v7.2/api/metadata/xsd",
        "changeQueries": "https://api.ed-fi.org/v7.2/api/changeQueries/v1/",
        "composites": "https://api.ed-fi.org/v7.2/api/composites/v1/",
        "identity": "https://api.ed-fi.org/v7.2/api/identity/v2/"
    }
}
```

You can also verify the Sample API endpoints in the Swagger UI documentation:

![Sample Plugin Swagger UI](/img/reference/ods-api/image2021-10-26_16-58-21.png)

## Install Sample Extension in an Existing Production Environment

### Deploy Sample Extension Database Artifacts

#### Step 1. Download EdFi.Suite3.RestApi.Databases

* Download the EdFi.Suite3.RestApi.Databases from [Binary
  Installation](../getting-started/binary-installation/).
* Change package extension from `nupkg` to `zip`.
* Right-click the zip file, click **unblock** and unzip the package.

#### Step 2. Update configuration.json

* Update configuration.json, for plugin settings as shown below:

    ```json
     "Plugin": {
            "Folder": "../../Plugin",
            "Scripts": [ "tpdm", "sample" ]
        }
    ```

#### Step 3. Run Deployment.psm1 with Dynamic Plugins

* From PowerShell, navigate to the download directory and run the following
    command to install sample extension on your existing ODS database:

    ```powershell
    Import-Module .\Deployment.psm1
    Initialize-DeploymentEnvironment

    <trimmed output...>

    Duration Task
    -------- ----
    00:00.95 Install-Plugins
    00:01.49 Reset-AdminDatabase
    00:01.49 Reset-SecurityDatabase
    00:13.08 Reset-OdsDatabase
    -        -
    00:17:55 InitializeDeploymentEnvironment
    ```

* After the successful execution, you will find sample schema tables in the
  deployed ODS database, under the `sample` schema.

### Deploy Sample Extension Binaries to Web Server

#### Step 4. Download EdFi.Suite3.Ods.Extensions.Sample

* Download the EdFi.Suite3.Ods.Extensions.Sample package from [Binary
    Releases](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging?_a=package&feed=EdFi%40Release&view=overview&package=EdFi.Suite3.Ods.Extensions.Sample&protocolType=NuGet).
* Change extension from `nupkg` to `zip`.
* Right-click the zip, click unblock, and unzip the package.
* Copy the extracted folder and paste it in C:\\inetpub\\Ed-Fi\\WebApi\\Plugin
    in your WebAPI directory.

    ```none title="c:\inetpub\Ed-Fi\WebApi\Plugin File Listing"
    > EdFi.Suite3.Ods.Extensions.Sample.7.2.24
    > EdFi.Suite3.Ods.Extensions.TPDM.Core.1.1.0.7.2.159
    ```

* Update appsettings.json, for plugin settings as shown below:

    ```json
     "Plugin": {
            "Folder": "./Plugin",
            "Scripts": [ "tpdm", "sample" ]
        }
    ```

* Restart your IIS instance.

#### Step 5. Verify API Landing Page in Browser

* Browse to the Discovery API endpoint and verify that sample data models are
  listed, as described above.

* You can also verify the Sample extension API endpoints in the Swagger UI
    documentation.

![Sample Plugin Swagger UI](/img/reference/ods-api/image2021-10-26_16-58-21.png)
