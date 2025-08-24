# Code Generation Utility

The Code Generation tool is an external tool used for generating required
classes and ORM mappings that are necessary to build the solution. Code generation is
required when working on the solution to create the core objects, profiles, and
extensions. This article describes how code generation is built into
the initdev command for local development and how it can be executed from a CICD pipeline. 

## Running initdev   

The code generation utility is integrated into the initdev process. When you
run Initialize-PowershellForDevelopment.ps followed by initdev (as outlined in the [Getting Started Guide](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774233/Getting+Started+-+Source+Code+Installation)), the codegen utility is downloaded from MyGet into the tools folder under
the Ed-Fi-ODS-Implementation repository and is executed after the
Invoke-NewDevelopmentAppSettings task.

![Image](https://edfi.atlassian.net/wiki/download/thumbnails/22774387/image2020-11-3_11-23-42.png?version=1&modificationDate=1641861351010&cacheVersion=1&api=v2&width=841&height=701)

![Image](https://edfi.atlassian.net/wiki/download/thumbnails/22774387/image2020-11-3_11-26-46.png?version=1&modificationDate=1641861351000&cacheVersion=1&api=v2&width=848&height=511)

A successful `initdev` execution will display the tasks executed and their duration as shown, and you
can see that code generation utility is downloaded and installed during the
process.

![Image](https://edfi.atlassian.net/wiki/download/thumbnails/22774387/image2020-11-3_11-21-9.png?version=1&modificationDate=1641861351030&cacheVersion=1&api=v2&width=839&height=263)

##   Manual Execution

The code generation utility can be run from the command line.

### Installation

To Install the code generation tool
manually, run Initialize-PowershellForDevelopment.ps script from a PowerShell prompt as outlined in the [Getting Started Guide](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774233/Getting+Started+-+Source+Code+Installation), followed by the Install-CodeGen-Utiltity command. This will pull the current
version of the tool, and install it into the tools folder under
the Ed-Fi-ODS-Implementation repository.

![Image](https://edfi.atlassian.net/wiki/download/thumbnails/22774387/image2020-11-3_11-29-58.png?version=1&modificationDate=1641861350990&cacheVersion=1&api=v2&width=839&height=228)

### Execution

To run code generation independently from the build process, the tool can be
executed by calling the PowerShell command Run-CodeGen. This will execute the
generation process for all required classes.

![Image](https://edfi.atlassian.net/wiki/download/thumbnails/22774387/image2020-11-3_11-31-4.png?version=1&modificationDate=1641861350977&cacheVersion=1&api=v2&width=841&height=529)
