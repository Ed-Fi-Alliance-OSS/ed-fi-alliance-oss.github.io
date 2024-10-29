# Code Generation Utility

The Code Generation tool is an external tool used for generating required
classes and ORM mappings that are necessary to build the solution. Code
generation is required when working on the solution to create the core objects,
profiles, and extensions. This article describes how code generation is built
into the initdev command for local development and how it can be [executed from
a CICD
pipeline](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V72/pages/23299247/Code+Generation+Utility#CodeGenerationUtility-ManualExecution).

## Running initdev

The code generation utility is integrated into the initdev process. When you
run Initialize-PowershellForDevelopment.ps1 followed by initdev (as outlined in
the [Getting Started
Guide](../../getting-started/source-code-installation/readme.md)), the codegen
utility is downloaded from Azure Artifacts into the tools folder under
the Ed-Fi-ODS-Implementation repository and is executed after the
`Invoke-NewDevelopmentAppSettings` task.

```pwsh
<trimmed output...>

2024-10-28 20:11:28,067 [.NET TP Worker] INFO  TemplateProcessor - Processing started for assembly: ODS Database Specific in folder: D:\ed-fi\Ed-Fi-ODS\Application\EdFi.Ods.Standard\Standard\5.1.0\Artifacts
2024-10-28 20:11:28,477 [.NET TP Worker] INFO  TemplateProcessor - Processing complete for assembly: ODS Database Specific in 00:00:00.4101082.
2024-10-28 20:11:28,478 [.NET TP Worker] INFO  Program - Finished code generation in 00:00:07.8224338.
Invoke-CodeGen done in 8s.
Invoke-RebuildSolution NoRestore is  False

------------------------------
    Invoke-RebuildSolution
------------------------------

<trimmed output...>
```

A successful `initdev` execution will display the tasks executed and their
duration as shown, and you can see that code generation utility is downloaded
and installed during the process.

```pwsh
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

```pwsh
PS D:\ed-fi\Ed-Fi-ODS-Implementation> Install-CodeGenUtility

------------------------------
    Install-CodeGenUtility
------------------------------

EdFi.Suite3.Ods.CodeGen version 7.2.1119 is already installed at D:\ed-fi\Ed-Fi-ODS-Implementation\tools
Install-CodeGenUtility done in 1s.

Duration Task
-------- ----
00:01.75 Install-CodeGenUtility
```

### Execution

To run code generation independently from the build process, the tool can be
executed by calling the PowerShell command `Run-CodeGen`. This will execute the
generation process for all required classes.

```pwsh
PS D:\ed-fi\Ed-Fi-ODS-Implementation> Run-CodeGen -StandardVersion 4.0.0 -ExtensionVersion 1.0.0

------------------------------
    Install-CodeGenUtility
------------------------------

EdFi.Suite3.Ods.CodeGen version 7.2.1119 is already installed at D:\ed-fi\Ed-Fi-ODS-Implementation\tools
Install-CodeGenUtility done in 1s.


----------------------
    Invoke-CodeGen
----------------------

& D:\ed-fi\Ed-Fi-ODS-Implementation\tools\EdFi.Ods.CodeGen -r D:\ed-fi\ -e SQLServer --standardVersion 4.0.0 --extensionVersion 1.0.0
2024-10-28 20:18:29,468 [1] INFO  Program - Starting code generation.
2024-10-28 20:18:29,601 [1] INFO  TemplateProcessor - Processing started for assembly: EdFi.Ods.Standard in folder: D:\ed-fi\Ed-Fi-ODS\Application\EdFi.Ods.Standard\Standard\4.0.0
2024-10-28 20:18:35,957 [.NET TP Worker] INFO  TemplateProcessor - Processing complete for assembly: EdFi.Ods.Standard in 00:00:06.3560937.
2024-10-28 20:18:35,958 [.NET TP Worker] INFO  TemplateProcessor - Processing started for assembly: ODS Database Specific in folder: D:\ed-fi\Ed-Fi-ODS\Application\EdFi.Ods.Standard\Standard\4.0.0\Artifacts
2024-10-28 20:18:36,319 [.NET TP Worker] INFO  TemplateProcessor - Processing complete for assembly: ODS Database Specific in 00:00:00.3606704.
2024-10-28 20:18:36,319 [.NET TP Worker] INFO  Program - Finished code generation in 00:00:06.8515808.
Invoke-CodeGen done in 7s.
Duration Task
-------- ----
00:01.59 Install-CodeGenUtility
00:07.97 Invoke-CodeGen
```
