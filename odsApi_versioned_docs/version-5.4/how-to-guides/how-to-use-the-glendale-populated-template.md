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

```powershell
PS C:\Ed-Fi-ODS-Implementation\Application\EdFi.Ods.WebApi\> dotnet user-secrets set "ApiSettings:PopulatedTemplateScript" "Glendale"
Successfully saved ApiSettings:PopulatedTemplateScript = Glendale to the secret store.
```

In non-development environments (usually staging or QA) that also deploys the
populated template, you will need to add the same key to the file: `<source
directory>\Ed-Fi-ODS-Implementation\Scripts\NuGet\EdFi.RestApi.Databases\configuration.json`.

## Step 2. Reset the Populated Template

From a PowerShell session, run the following commands to rebuild the Ed-Fi databases:

```powershell
PS> Initialize-DestructiveMinimalTemplate
PS> Initialize-DestructivePopulatedTemplate
```

Once the templates are rebuilt, the Glendale data will be available from the
sandbox API. For example, when a new sandbox is created, the sandbox API will
load with this data instead of the standard 1000 student set.

The PowerShell script for Glendale source selection can be found in the [Ed-Fi-ODS-Implementation repository](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/blob/v5.3/DatabaseTemplate/Scripts/Glendale.ps1).

## About the Populated Database Templates

There are three test databases available to use with Ed-Fi ODS / API.

| Name       | # Student Records | Data Shape                                 |
| ---------- | ----------------- | ------------------------------------------ |
| Default    | 1,000             | Limited breadth. 1 district, 1 high school |
| Northridge | 25,000            | Greater breadth. 1 district, 4 schools     |
| Glendale   | 50,000            | Full breadth. 2 districts, 36 schools      |


