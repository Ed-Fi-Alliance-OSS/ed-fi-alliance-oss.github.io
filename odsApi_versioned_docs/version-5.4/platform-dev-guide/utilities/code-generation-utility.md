# Code Generation Utility

The Code Generation tool is an external tool used for generating required
classes and ORM mappings that are necessary to build the solution. Code generation is
required when working on the solution to create the core objects, profiles, and
extensions. This article describes how code generation is built into
the initdev command for local development and how it can be executed from a CICD pipeline. 

## Running initdev   

The code generation utility is integrated into the initdev process. When you
run Initialize-PowershellForDevelopment.ps followed by initdev (as outlined in the [Getting Started Guide](../../getting-started/readme.md)), the codegen utility is downloaded from MyGet into the tools folder under
the Ed-Fi-ODS-Implementation repository and is executed after the
Invoke-NewDevelopmentAppSettings task.

![Image](https://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2020-11-3_11-23-42.png)

![Image](https://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2020-11-3_11-26-46.png)

A successful `initdev` execution will display the tasks executed and their duration as shown, and you
can see that code generation utility is downloaded and installed during the
process.

![Image](https://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2020-11-3_11-21-9.png)

##   Manual Execution

The code generation utility can be run from the command line.

### Installation

To Install the code generation tool
manually, run Initialize-PowershellForDevelopment.ps script from a PowerShell prompt as outlined in the [Getting Started Guide](../../getting-started/readme.md), followed by the Install-CodeGen-Utiltity command. This will pull the current
version of the tool, and install it into the tools folder under
the Ed-Fi-ODS-Implementation repository.

![Image](https://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2020-11-3_11-29-58.png)

### Execution

To run code generation independently from the build process, the tool can be
executed by calling the PowerShell command Run-CodeGen. This will execute the
generation process for all required classes.

![Image](https://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2020-11-3_11-31-4.png)
