# How To: Use the Glendale Populated Template

The Ed-Fi ODS / API ships with a sample dataset containing approximately 1000
students. For a variety of reasons, you may want to install a different sample
database than the one that ships with ODS / API. This article walks through how set
up the Glendale database, which contains approximately 50,000 student records,
as your template for a populated database.

## Step 1. Update the Config File

The "ApiSettings:PopulatedTemplateScript" key in `<source
directory>\Ed-Fi-ODS-Implementation\Application\EdFi.Ods.WebApi\appsettings.json`
file configures the dataset for the populated template.

**appsettings.json Example**
```json
"ApiSettings": {
    ...
    "PopulatedTemplateScript": "Glendale"
},
...
```

This tells Initialize-DevelopmentEnvironment which source selection script to
run. If no script is provided, or the name specified does not exist,
the Initialize-DevelopmentEnvironment will fail when trying to reset the populated template.

In development environment, you can use _secret.json_ to override this setting
to deploy Glendale dataset. In a PowerShell session navigate to `<source
directory>\Ed-Fi-ODS-Implementation\Application\EdFi.Ods.WebApi` and use
user-secret CLI to setup the override. See [Configuration Details -
SecretManager](../platform-dev-guide/configuration/configuration-details.mdx#secret-manager)
for more details.

**Import the Initiallize Development Module**
```powershell
PS C:\Ed-Fi-ODS-Implementation\Application\EdFi.Ods.WebApi\> dotnet user-secrets set "ApiSettings:PopulatedTemplateScript" "Glendale"
Successfully saved ApiSettings:PopulatedTemplateScript = Glendale to the secret store.
```

In non-development environments (usually staging or QA) that also deploys the
populated template, you will need to add the same key to the file: `<source
directory>\Ed-Fi-ODS-Implementation\Scripts\NuGet\EdFi.RestApi.Databases\configuration.json`.

## Step 2. Reset the Populated Template

From a PowerShell session, run the following commands to rebuild the Ed-Fi databases:

**Import the Initiallize Development Module**
```powershell
PS C:\Ed-Fi-ODS-Implementation\> .\Initialize-PowershellForDevelopment.ps1
Importing Module: InitializeDevelopmentEnvironment.psm1
Using repositories from environment variable: Ed-Fi-Ods;Ed-Fi-ODS-Implementation
```
**Execute Reset-PopulatedTemplate.**


```powershell
PS C:\Ed-Fi-ODS-Implementation\> Reset-PopulatedTemplate
---------------------------------------
    Reset-PopulatedTemplateDatabase
---------------------------------------
Using repositories from environment variable: Ed-Fi-Ods;Ed-Fi-ODS-Implementation
Downloading file from https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Glendale_v32-20190610.7z...
Download complete.
Extracting EdFi_Glendale_v32-20190610.7z...
Extracted to: C:\Ed-Fi-ODS-Implementation\PopulatedTemplate\Database\EdFi_Glendale_v32-20190610.7z
...
Task                    TotalMinutes
----                    ------------
Reset-PopulatedTemplate       3.78
```

When the process successfully completes, you should see something similar to above.


