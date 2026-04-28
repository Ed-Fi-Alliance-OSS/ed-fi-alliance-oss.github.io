# Code Generation Utility

The Code Generation tool is an external tool used for generating required
classes and ORM mappings that are necessary to build the solution. Code
generation is required when working on the solution to create the core objects,
profiles, and extensions. This article describes how code generation is built
into the initdev command for local development and how it can be [executed from
a CI/CD pipeline](#manual-execution).

## Running initdev

The code generation utility is integrated into the initdev process. When you
run Initialize-PowershellForDevelopment.ps1 followed by initdev (as outlined in
the [Getting Started
Guide](../../getting-started/source-code-installation/readme.md)), the codegen
utility is downloaded from Azure Artifacts into the tools folder under
the Ed-Fi-ODS-Implementation repository and is executed after the
`Invoke-NewDevelopmentAppSettings` task.

```powershell
Caching: Descriptors: AbsoluteExpirationSeconds          1800
Caching: PersonUniqueIdToUsi: AbsoluteExpirationSeconds  0
Caching: PersonUniqueIdToUsi: SlidingExpirationSeconds   14400
ConnectionStrings: EdFi_Admin                            server=(local); trusted_connection=True; database=EdFi_Admin; Application Name=EdFi.Ods.WebApi
ConnectionStrings: EdFi_Master                           server=(local); trusted_connection=True; database=master; Application Name=EdFi.Ods.WebApi
ConnectionStrings: EdFi_Ods                              server=(local); trusted_connection=True; database=EdFi_{0}; Application Name=EdFi.Ods.WebApi
ConnectionStrings: EdFi_Security                         server=(local); trusted_connection=True; database=EdFi_Security; persist security info=True; Application Name=EdFi.Ods.WebApi
DefaultPageSizeLimit                                     500
Logging: LogLevel: Default                               Debug
Logging: LogLevel: Microsoft                             Warning
Plugin: Folder                                           ../../Plugin
Plugin: Scripts:0                                        development
SecurityMetadataCacheTimeoutMinutes                      0
Urls                                                     http://localhost:54746

Invoke-NewDevelopmentAppSettings done in 1s.

------------------------------
    Install-ToolDbDeploy
------------------------------

EdFi.Suite3.Db. Deploy version 2.0.0 is already installed at C:\source\repososs\Ed-Fi-ODS-Implementation\tools
Install-ToolDbDeploy done in 339ms.

------------------------------
    Install-ToolCodeGenUtility
------------------------------

EdFi.Suite3.Ods.CodeGen version 5.1.0-b11157 is already installed at C:\source\repososs\Ed-Fi-ODS-Implementation\tools
Install-ToolCodeGenUtility done in 244ms.

------------------------------
    Invoke-CodeGen
------------------------------

2020-11-03 09:08:43,781 [1] INFO Program Starting code generation.
2020-11-03 09:08:44,012 [1] INFO TemplateProcessor Processing started for assembly: EdFi.Ods.Profiles.Sample in folde
r: C:\source\repososs\Ed-Fi-ODS\Application\EdFi.Ods.Profiles.Sample
2020-11-03 09:08:45,019 [8] INFO TemplateProcessor Processing complete for assembly: EdFi.Ods.Profiles.Sample in 00:0
0:01.0064703.
2020-11-03 09:08:45,019 [8] INFO TemplateProcessor Processing started for assembly : EdFi.Ods.Profiles. Test in folder:
C:\source\repososs\Ed-Fi-ODS\Application\EdFi.Ods.Profiles.Test
2020-11-03 09:08:47,451 [12] INFO TemplateProcessor Processing complete for assembly: EdFi.Ods.Profiles. Test in 00:00
-: 02.4316482.
2020-11-03 09:08:47,451 [12] INFO TemplateProcessor Processing started for assembly: EdFi.Ods.Standard in folder: C:\
```

A successful `initdev` execution will display the tasks executed and their
duration as shown, and you can see that code generation utility is downloaded
and installed during the process.

```powershell
<trimmed output...>
Duration Task
-------- ----
00:01.92 Invoke-NewDevelopmentAppSettings
00:02.69 Install-Plugins
00:01.57 Install-CodeGenUtility
00:08.19 Invoke-CodeGen
00:29.14 Invoke-RebuildSolution
00:01.48 Install-DbDeploy
00:15.78 Reset-TestAdminDatabase
00:26.09 Reset-TestSecurityDatabase
00:20.62 Reset-TestPopulatedTemplateDatabase
00:14.31 Reset-AdminDatabase
00:25.81 Reset-SecurityDatabase
00:00.78 Remove-SandboxDatabases
00:19.23 Reset-MinimalTemplateDatabase
00:20.55 Reset-PopulatedTemplateDatabase
-        -
03:11.35 Initialize-DevelopmentEnvironment
```

## Manual Execution

The code generation utility can be run from the command line.

### Installation

To Install the code generation tool
manually, run `Initialize-PowershellForDevelopment.ps1` script from a PowerShell
prompt as outlined in the [Getting Started
Guide](../../getting-started/source-code-installation/readme.md), followed by
the `Install-CodeGenUtiltity` command. This will pull the current version of the
tool, and install it into the tools folder under the Ed-Fi-ODS-Implementation
repository.

```powershell
C:\Source\ReposOss\Ed-Fi-ODS-Implementation [main =]> Install-CodeGenUtility

------------------------------
  Install-ToolCodeGenUtility
------------------------------

Installing EdFi.Suite3.Ods.CodeGen version 5.1.0-b11157 to C:\source\repososs\Ed-Fi-ODS-Implementation\tools
Install-ToolCodeGenUtility done in 6s.
Duration Task
00:06.35 Install-ToolCodeGenUtility
C:\Source\ReposOss\Ed-Fi-ODS-Implementation [main =]>
```

### Execution

To run code generation independently from the build process, the tool can be
executed by calling the PowerShell command `Run-CodeGen`. This will execute the
generation process for all required classes.

```powershell
C:\Source\ReposOss\Ed-Fi-ODS-Implementation [main =]> Run-CodeGen

------------------------------
  Install-ToolCodeGenUtility
------------------------------

EdFi.Suite3.Ods.CodeGen version 5.1.0-b11157 is already installed at C:\source\repososs\Ed-Fi-ODS-Implementation\tools
Install-ToolCodeGenUtility done in 249ms.

------------------------------
        Invoke-CodeGen
------------------------------

2020-11-03 11:30:23,642 [1] INFO Program Starting code generation.
2020-11-03 11:30:23,832 [1] INFO TemplateProcessor Processing started for assembly: EdFi.Ods.Profiles. Sample in folde
r: C:\source\repososs\Ed-Fi-ODS\Application\EdFi.Ods.Profiles.Sample
2020-11-03 11:30:24,741 [12] INFO TemplateProcessor
00:00.9081311. Processing complete for assembly: EdFi.Ods.Profiles.Sample in 00:
2020-11-03 11:30:24,741 [12] INFO TemplateProcessor Processing started for assembly: EdFi.Ods.Profiles. Test in folder
: C:\source\repososs\Ed-Fi-ODS\Application\EdFi.Ods.Profiles.Test
2020-11-03 11:30:27,246 [18] INFO TemplateProcessor Processing complete for assembly: EdFi.Ods.Profiles.Test in 00:00
:02.5047302.
2020-11-03 11:30:27,246 [18] INFO TemplateProcessor Processing started for assembly: EdFi.Ods.Standard in folder: C:\
source\repososs\Ed-Fi-ODS\Application\EdFi.Ods.Standard
2020-11-03 11:30:37,531 [12] INFO TemplateProcessor Processing complete for assembly: EdFi.Ods.Standard in 00:00:10.2
846803.
2020-11-03 11:30:37,531 [12] INFO TemplateProcessor Processing started for assembly: ODS Database Specific in folder:
C:\source\repososs\Ed-Fi-ODS\Artifacts
2020-11-03 11:30:37,754 [4] INFO TemplateProcessor 0.2235156. Processing complete for assembly: ODS Database Specific in 00:00:0
2020-11-03 11:30:37,755 [4] INFO Program Finished code generation in 00:00:14.1136747.
Invoke-CodeGen done in 14s.
Duration Task
00:00.24 Install-ToolCodeGenUtility
00:14.41 Invoke-CodeGen
```
