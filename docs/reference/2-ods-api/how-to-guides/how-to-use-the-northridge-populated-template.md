# How To: Use the Northridge Populated Template

The Ed-Fi ODS / API ships with a sample dataset containing approximately 1000
students. For a variety of reasons, you may want to install a different sample
database than the one that ships with ODS / API. The Ed-Fi alliance provides two
separate data sets that can be used for testing and development purposes. The
Glendale database contains approximately 50,000 students, while the Northridge
database is about half of that size. Both contain realistic but fictional
student information.

This article walks through how set up the Northridge database as your template
for a populated database. If you prefer to manually update the sandbox with
Northridge dataset instead of integrating it as a populated template, steps are
[listed in below](#appendix-manually-update-sandbox-with-an-alternative-sample-database).

## Step 1. Update the Config File

The "ApiSettings:PopulatedTemplateScript" key in `<source
directory>\Ed-Fi-ODS-Implementation\Application\EdFi.Ods.WebApi\appsettings.json`
file configures the dataset for the populated template.

```json
   "ApiSettings": {
        ...
        "PopulatedTemplateScript": "Northridge"
    },
  ...
```

This tells Initialize-DevelopmentEnvironment which source selection script to
run. If no script is provided, or the name specified does not exist,
the Initialize-DevelopmentEnvironment will fail when trying to reset the
populated template.

In development environment, you can use _secret.json_ to override this setting
to deploy Northridge dataset. In a PowerShell session navigate to `<source
directory>\Ed-Fi-ODS-Implementation\Application\EdFi.Ods.WebApi` and use
user-secret CLI to setup the override. See [Configuration Details -
SecretManager](../platform-dev-guide/configuration/configuration-details.md#secret-manager)
for more details.

```powershell
PS C:\Ed-Fi-ODS-Implementation\Application\EdFi.Ods.WebApi\> dotnet user-secrets set "ApiSettings:PopulatedTemplateScript" "Northridge"
Successfully saved ApiSettings:PopulatedTemplateScript = Northridge to the secret store.
```

In non-development environments (usually staging or QA) that also deploys the
populated template, you will need to add the same key to the file: `<source
directory>\Ed-Fi-ODS-Implementation\Scripts\NuGet\EdFi.RestApi.Databases\configuration.json`.

## Step 2. Run Reset-PopulatedTemplate

In a PowerShell session navigate to `<source directory>Ed-Fi-ODS-Implementation`.

Execute `.\Initialize-PowershellForDevelopment.ps1`.

```powershell
PS C:\Ed-Fi-ODS-Implementation\> .\Initialize-PowershellForDevelopment.ps1
Importing Module: InitializeDevelopmentEnvironment.psm1
Using repositories from environment variable: Ed-Fi-Ods;Ed-Fi-ODS-Implementation
```

Execute `Reset-PopulatedTemplate`.

### Execute Reset-PopulatedTemplate

```powershell
PS C:\Ed-Fi-ODS-Implementation\> Reset-PopulatedTemplate
---------------------------------------
    Reset-PopulatedTemplateDatabase
---------------------------------------
Using repositories from environment variable: Ed-Fi-Ods;Ed-Fi-ODS-Implementation
Downloading file from https://odsassets.blob.core.windows.net/public/Northridge/EdFi_Ods_Northridge_v71_20240416.7z...
Download complete.
Extracting EdFi_Ods_Northridge_v71_20240416.7z...
Extracted to: C:\Ed-Fi-ODS-Implementation\PopulatedTemplate\Database\EdFi_Ods_Northridge_v71_20240416.7z
...
Task                    TotalMinutes
----                    ------------
Reset-PopulatedTemplate       3.78
```

When the process successfully completes, you should see something similar to
above.

## Appendix: Manually Update Sandbox with an Alternative Sample Database

While integrating the alternative dataset as a populated template as described
above is required for building alternative sample dataset into CI/CD and
enabling full feature set of the ODS / API.

## Limitations Of This Approach

* Steps provided here only describe how to use the demo databases with an API
  deployment configured for sandbox support.
* Ed-Fi provided sample databases do not contain extensions and change query
  related artifacts. Since demo databases are manually replaced after
  initialize development (i.e., `initdev`) process:
  * Extensions feature should be disabled, which means this approach
        wouldn't work with TPDM .
  * Change queries feature should be disabled

## Prerequisites

* 7zip, or a similar compression / decompression tool that supports the 7zip
  format, should be installed. This can be installed on the database server.
  Download 7zip for free from [https://www.7-zip.org](https://www.7-zip.org)
* The database server should have sufficient space to download and install the
  sample database. For the larger data set, Northridge, this will require 730
  megabytes of space to download the compressed version of the backup, 15
  gigabytes for the uncompressed backup, and 17 gigabytes in SQL Server space.

## Installation Steps

### Ed-Fi ODS installation

* Build the Ed-Fi solution [from the source
  code](../getting-started/source-code-installation/). Before running `initdev`,
  open the `appsettings.json` file in the WebApi and change the "IsEnabled"
  setting to "false" for the **ChangeQueries** and **Extensions** features.

:::note

### SQLServer Steps

* Download the compressed version of your backup database from
  [EdFi\_Ods\_Northridge\_v71\_20240416.7z](https://odsassets.blob.core.windows.net/public/Northridge/EdFi_Ods_Northridge_v71_20240416.7z)
* Uncompress the download using the [7zip utility](https://www.7-zip.org/).
* If you downloaded and uncompressed the file someplace other than the
  database server, copy the uncompressed ".bak" file to a folder on the
  database server.
* Log into SQL Server Management Server with credentials that have database
  administrator access.
* Right-click on the "Databases" folder in the object explorer and choose
  "Restore".
* Choose "Device" as the source and click the "..." button next to it.
* In the next screen, choose "Add". Browse to the uncompressed .bak file and
  select it. Click the "Replace" button in the options panel.
* Click "Ok" in the remaining messages.
* Wait for the notification that your database restored successfully. The
  data is now ready for use.

:::

## Configuring a Sample Database for API access

At this point, there will be a new database that contains the fictional
Northridge ISD sample data. You can learn the Ed-Fi data model, write queries,
and work on data-out and extraction use cases that interact directly with the
database. If you would like to access this data using the Ed-Fi API, these
additional steps are needed.

* Create a sandbox instance using the Sandbox Administration tool. Note and
  remember the key and secret values. Choose the option to have sample data.
* Go back to SQL Server Management Studio. Find the sandbox database that was
  just created (you might need to right-click on the databases folder and do a
  "Refresh"). The database will have the word "Sandbox" in it and contain the
  key that was provided when the sandbox was created.
* Record (or copy) the name of the sandbox database.
* Rename the sandbox database. For example, add "-backup" to the end of the
  existing name.
* Rename the sample (i.e., EdFi\_Ods\_Northridge\_v71) to what the sandbox
  database was named.
* You should be good for internal access.

If you receive "internal errors" from the API, you can check the Ed-Fi logs for
clues as to the cause.

:::note

The following GitHub link is the PowerShell script for [Northridge
Source
Selection](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/blob/main/DatabaseTemplate/Scripts/Northridge.ps1)

:::
