# How To: Create a Custom Populated Template

The Ed-Fi ODS / API ships with a sample dataset containing approximately 1000
students. This sample is used to automatically populate test and sandbox
environments.

For a variety of reasons, you may want to install a different sample database
than the one that ships with ODS / API. You can create your own dataset, for
example, to populate sample data with values in extended data fields or load
custom data such as education organizations appropriate for your environment,
calendars for your schools, and so forth.

This article describes the process to create a custom populated template
database, which will enable new sandbox and testing database instances to
contain the data you specify.

## Option 1. Build from XML Data Using the Create Populated Script

Before you begin:

* This example uses PowerShell scripts and the EdFi.BulkLoadClient.Console
    found in the Ed-Fi ODS / API. You should follow the [Getting Started -
    Source Code
    Installation](../getting-started/source-code-installation/readme.md) before
    you get started.
* This example uses the XML sample data found in
    the [Ed-Fi-Data-Standard](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Data-Standard)
    repository on GitHub. You will need to clone or download these sample data
    files in order to follow along.

### Step 1: Import the Create Populated Template Module

From a PowerShell session, import `<source directory>`
\\Ed-Fi-ODS-Implementation\\DatabaseTemplate\\Modules\\create-populated-template.psm1.

#### Importing the Populated Template Module

```pwsh
Import-Module C:\Ed-Fi-ODS-Implementation\DatabaseTemplate\Modules\create-populated-template.psm1
```

### Step 2: Use the Initialize-PopulatedTemplate Script

The next command, `Initialize-PopulatedTemplate`, which will run through a
number of predefined tasks that will be described below:

| Task Name | Description |
| --- | --- |
| Invoke-SampleXmlValidation | Validates the xml files against their xsd schema. If there are any xml errors in your sample data they should be surfaced here. This step can be skipped using the -noValidation parameter. |
| New-TempDirectory | Creates a new temporary directory in order to partition the bootstrap samples, that need to be pre-loaded, from the rest of the sample data. |
| Copy-BootstrapInterchangeFiles | Copies files needing to be loaded without authorization using the "Bootstrap Descriptors and EdOrgs" claim set which uses the NoFurtherAuthorization strategy. |
| Copy-SampleInterchangeFiles | Copies the remaining sample files. These will be loaded with the "Ed-Fi Sandbox" claim set. |
| Invoke-SetTestHarnessConfig | Merges the separate descriptors files into one and places them into the same directory as the other sample xml. |
| Add-RandomKeySecret | Adds random key/secret. One ApiClient for the bootstrap samples and one for the remaining sample files. |
| Invoke-RestoreLoadToolsPackages | Restores packages for the Load Tools solution which includes the EdFi.BulkLoadClient.Console |
| Invoke-BuildLoadTools | Uses MSBuild to build the Load Tools Solution which includes the EdFi.BulkLoadClient.Console |
| New-DatabaseTemplate | The new database where the sample data will be loaded into. |
| Invoke-StartTestHarness | Starts the in-memory ODS / API. |
| Invoke-LoadBootstrapData | Loads any sample data needing to be pre-loaded without authorization. |
| Invoke-LoadSampleData | Loads the remaining sample data through normal authorization channels. |
| Stop-TestHarness | Stops the in-memory ODS / API. |
| Backup-DatabaseTemplate | Creates a backup of the new populated template at `<source directory>`\\Ed-Fi-ODS-Implementation\\DatabaseTemplate\\Database\\Populated.Template.bak |
| New-DatabaseTemplateNuspec | Creates a nuspec template file for the populated template at `<source directory>`\\Ed-Fi-ODS-Implementation\\DatabaseTemplate\\Database\\Populated.Template.nuspec |

The `Initialize-PopulatedTemplate` command has a few parameters to be aware of,
summarized in the following table:

| Parameter | Description |
| --- | --- |
| samplePath | An absolute path to the folder to load samples from, for example: C:\\MySampleXmlData\\. |
| noExtensions | Ignores any extension sources when running the sql scripts against the database. |
| noValidation | Disables xml validation steps. Specifically the "Validate-Descriptors" and "Validate-Core" tasks are skipped. |
| engine | The database engine provider, either 'SQLServer' or 'PostgreSQL'. |

Once you understand the parameters above, you're ready to run the
`Initialize-PopulatedTemplate` command. In this example we are using the
[Ed-Fi-Standard](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard)
repository as our sample folder. Since this is a common use case the script is
set up to handle its particular folder structure. A simpler folder setup with
all XML files in a single folder is also supported by the script.

#### Executing the Initialize-PopulatedTemplate Script

```powershell
PS C:\> Initialize-PopulatedTemplate -samplePath "C:\Ed-Fi-Standard\"

apiClientNameBootstrap         BulkLoadClientBootstrap
apiClientNameSandbox           BulkLoadClientSandbox
apiUrlBase                     http://localhost:8765
apiUrlData                     http://localhost:8765/data/v3
apiUrlDependencies             http://localhost:8765/metadata/data/v3/dependencies
apiUrlMetadata                 http://localhost:8765/metadata
apiUrlOAuth                    http://localhost:8765/oauth
apiYear                        2020
ArtifactSources                {Homograph, Sample, TPDM}
buildConfiguration             Debug
bulkLoadBootstrapInterchanges  {InterchangeDescriptors, InterchangeStandards, InterchangeEducationOrganization}

<trimmed output...>
```

The script will run through the tasks noted above. The process will take a few
minutes to complete.

#### Initialize-PopulatedTemplate Script Results

```powershell
<trimmed output...>

Duration  Task
--------  ----
00:00.04  New-TempDirectory
00:12.60  Invoke-SampleXmlValidation
00:34.71  New-DatabaseTemplate
00:00.09  Invoke-SetTestHarnessConfig
00:04.43  Invoke-RestoreLoadToolsPackages
00:07.79  Invoke-BuildLoadTools
00:00.58  Copy-BootstrapInterchangeFiles
00:00.66  Copy-SampleInterchangeFiles
00:00.40  Add-RandomKeySecret
00:12.43  Invoke-StartTestHarness
01:33.46  Invoke-LoadBootstrapData
08:48.07  Invoke-LoadSampleData
00:00.04  Stop-TestHarness
00:05.65  Backup-DatabaseTemplate
00:00.11  New-DatabaseTemplateNuspec
-         -
11:41.25  Initialize-PopulatedTemplate


PS C:\>
```

You should see the above task output when the script has finished successfully.

## Option 2. Creating a NuGet Package

Before you begin:

* This example assumes you have SQL Server Management Studio (SSMS). You can
  find instructions for installing SSMS in the Step 3. Install and Configure
  Required Software step of the [Getting
  Started](../getting-started/source-code-installation/readme.md)
  guide for the Ed-Fi ODS / API.
* This example assumes you have NuGet CLI tool. You can follow the
  instructions for [Installing Nuget Client
  Tools](https://docs.microsoft.com/en-us/nuget/install-nuget-client-tools#nugetexe-cli).
* This example assumes you have access to a MyGet feed. You can follow MyGet's
  instructions for [Getting Started with
  NuGet](https://docs.myget.org/docs/walkthrough/getting-started-with-nuget).

### Step 1: Create a Database Backup File from SQL Server Management Studio (SSMS)

:::info

If you have already created a backup using the
`Initialize-PopulatedTemplate` script, you can skip this step.

:::

1. Within SSMS, select the database you would like to back up, select **Tasks**
   \> **Back Up...**
2. In the **Back Up Database** dialog, select the **default backup
   destination,** click **Remove**, then click **Add** to create the backup.
3. In the Select Backup Destination Dialog, select **...**

The database must be placed in `<source directory>\\Ed\-Fi\-ODS\-Implementation\\DatabaseTemplate\\Database` and the
file name **must end in .bak** in order for the initialize development and
deploy scripts to pick it up.

### Step 2: Create a Nuspec File

If you used the `Initialize-PopulatedTemplate` script, the nuspec file has
already been created. You can also create a new one by running the
`New-PopulatedTemplateNuspec` command from the create populated template module
or by running `nuget spec`.

The nuspec file created by the `New-PopulatedTemplateNuspec` script will be
created at `<source directory>\\Ed-Fi-ODS-Implementation\\DatabaseTemplate\\Database\\Populated.Template.nuspec`.

#### Populated.Template.nuspec

```xml
<?xml version="1.0"?>
<package>
  <metadata>
    <id>$id$</id>
    <version>$version$</version>
    <title>$title$</title>
    <authors>$authors$</authors>
    <owners>$owners$</owners>
    <requireLicenseAcceptance>false</requireLicenseAcceptance>
    <description>$description$</description>
    <releaseNotes>
    </releaseNotes>
    <copyright>$copyright$</copyright>
    <tags>
    </tags>
  </metadata>
  <files>
    <file src="<source directory>\Ed-Fi-ODS-Implementation\DatabaseTemplate\Database\Populated.Template.bak" target="." />
  </files>
</package>
```

The contents of the Populated.Template.nuspec file needs to be modified with
your information. The default information is shown below as an example of the
structure:

```xml title="Populated.Template.nuspec"
<?xml version="1.0"?>
<package>
  <metadata>
    <id>Populated.Template</id>
    <version>1.0.0</version>
 <title>Populated.Template</title>
    <authors>Ed-Fi Alliance</authors>
    <owners>Ed-Fi Alliance</owners>
    <requireLicenseAcceptance>false</requireLicenseAcceptance>
    <description>EdFi Populated Database Template</description>
    <releaseNotes>
 </releaseNotes>
    <copyright>Copyright ©Ed-Fi Alliance, LLC. 2019</copyright>
  </metadata>
  <files>
    <file src="<source directory>\Ed-Fi-ODS-Implementation\DatabaseTemplate\Database\Populated.Template.bak" target="." />
  </files>
</package>
```

Once you have your information in your nuspec file, you can navigate to
the `<source directory>`\\Ed-Fi-ODS-Implementation\\DatabaseTemplate\\Database\\
folder and execute `nuget pack`.

#### NuGet CLI Pack Command

```powershell
PS C:\Ed-Fi-ODS-Implementation\DatabaseTemplate\Database> nuget pack
Attempting to build package from 'Populated.Template.nuspec'.
Successfully created package 'C:\Ed-Fi-ODS-Implementation\DatabaseTemplate\Database\Populated.Template.1.0.0.nupkg'.
```

When successful, you should see something similar to above. Additional detail:

* For more information about `push`, take a look at [NuGet CLI Pack
    Command](https://docs.microsoft.com/en-us/nuget/tools/cli-ref-pack)[.](https://docs.microsoft.com/en-us/nuget/tools/cli-ref-pack)
* For more information about creating a NuGet packet, see [How to create a
    NuGet
    package](https://docs.microsoft.com/en-us/nuget/create-packages/creating-a-package).

### Step 3: Upload a Package to MyGet

Now we can nuget push to add the package to the MyGet feed. For this we will
need the API Key and the feed URL. You can find these under "Feed Details" when
looking at your feed on MyGet.org.

The command should look as follows: `nuget push Populated.Template.1.0.0.nupkg
<apikey> -source <MyGet Feed URL>`

#### Nuget CLI Push Command

```powershell
PS C:\Ed-Fi-ODS-Implementation\DatabaseTemplate\Database> nuget push `
    .\Populated.Template.1.0.0.nupkg <APIKEY> `
    -source https://www.myget.org/F/<FeedName>/api/v2/index.json

Pushing Populated.Template.1.0.0.nupkg to 'https://www.myget.org/F/<FeedName>/api/v2/package'...
  PUT https://www.myget.org/F/<FeedName>/api/v2/package/
  Created https://www.myget.org/F/<FeedName>/api/v2/package/ 19188ms
Your package was pushed.
```

In your MyGet feed you should see your new package. Additional detail:

* For more information about `push`, take a look at [NuGet CLI Push
    Command](https://docs.microsoft.com/en-us/nuget/tools/cli-ref-push).
* For more information about using NuGet with MyGet, see [Getting Started with
    NuGet](https://docs.myget.org/docs/walkthrough/getting-started-with-nuget).

## Option 3. Creating a Custom Populated Template Source Script

### Step 1: Create a Script

In this example we will create a new script called NewPopulatedTemplate.ps1 with
the contents:

#### NewPopulatedTemplate.ps1

```powershell
$params = @{
    packageName    = "Populated.Template"
    packageVersion = "1.0.0"
    packageSource  = "https://www.myget.org/F/<FeedName>/"
}
& "$PSScriptRoot\..\Modules\get-populated-from-nuget.ps1" @params
```

This script must be placed in the folder: `<source
directory>\\Ed-Fi-ODS-Implementation\\DatabaseTemplate\\Scripts\\`.

In our example, we are reusing the `<source
directory>\\Ed-Fi-ODS-Implementation\\DatabaseTemplate\\Modules\\get-populated-from-nuget.ps1`
script. This script will download the specified NuGet package name and version
from the specified source and place it in the Database folder. Alternatively, we
could have written a custom script that would get a .bak file from the web or
from a shared drive. The source selection script's only requirement is that it
places a .bak file in the folder: `<source
directory>\\Ed-Fi-ODS-Implementation\\DatabaseTemplate\\Database\\`. How it
accomplishes this is left up to the developer. You can have multiple scripts
saved here but only the ones specified in the config files in the next step will
be run.

:::caution

The Initialize-DevelopmentEnvironment and Sandbox Deploy scripts
will use the first .bak file it finds in the Database folder. Having anything
else in the Database folder is not recommended.

:::

### Step 2: Update the Config File

Add the "ApiSettings:PopulatedTemplateScript" key to the appSettings section of
the file: `<source
directory>\\Ed-Fi-ODS-Implementation\\Application\\EdFi.Ods.WebApi\\appsettings.json`.

#### appsettings.json Example

```json
"ApiSettings": {
      ...
      "PopulatedTemplateScript": "NewPopulatedTemplate"
  },
...
```

This tells Initialize-DevelopmentEnvironment which source selection script to
run. If no script is provided or the name specified does not exist
the Initialize-DevelopmentEnvironment will fail when trying to reset the
populated template.

If you have an environment (usually staging or QA) that also deploys the
populated template you will need to add the same key to the file:`<source
directory>\\Ed-Fi-ODS-Implementation\\Scripts\\NuGet\\EdFi.RestApi.Databases\\configuration.json`.

### Step 3: Run Reset-PopulatedTemplate

In a PowerShell session navigate to `<source directory>\\Ed-Fi-ODS-Implementation\\`.

Execute `.\Initialize-PowershellForDevelopment.ps1`.

#### Import the Initiallize Development Module

```powershell
PS C:\Ed-Fi-ODS-Implementation\> .\Initialize-PowershellForDevelopment.ps1
Importing Module: InitializeDevelopmentEnvironment.psm1
Using repositories from environment variable: Ed-Fi-Ods;Ed-Fi-ODS-Implementation
```

Execute `Reset-PopulatedTemplate`.

#### Execute Reset-PopulatedTemplate

```powershell
PS C:\Ed-Fi-ODS-Implementation\> Reset-PopulatedTemplate
Invoking Task: Reset-PopulatedTemplate
Found populated template nuget package: Populated.Template v1.0.0
Successfully added Populated.Template.1.0.0.bak to populated template source folder
...
Dropping the EdFi_Ods_Populated_Template Database.
Using backup C:\Ed-Fi-ODS-Implementation\DatabaseTemplate\Database\Populated.Template.1.0.0.bak
...
Task                    TotalMinutes
----                    ------------
Reset-PopulatedTemplate       3.78
```

When the process successfully completes, you should see something similar to
above.

:::note

Sample XML files can be found in the Ed-Fi-Data-Standard repository:

* [Data Standard 5.1](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Data-Standard/tree/v5.1.0)
* [Data Standard 5.0](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Data-Standard/tree/v5.0.0)
* [Data Standard 4.0](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Data-Standard/tree/v4.0.0)

:::
