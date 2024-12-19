# LMS Toolkit User Guide

## Overview

The following components are available.

* Canvas Extractor
* Google Classroom Extractor
* Schoology Extractor
* LMS Data Store Loader
* LMS Extension for the ODS/API Suite 3, version 5.2 and version 5.3
* LMS Harmonizer

Please see LMS Toolkit for more information about the purpose of these tools. The following chart explains which tools you need based on your circumstances.

![LMS Toolkit Flowchart](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-lms-toolkit/image2024-5-15_15-44-42.png)

## Pre-Requisites

* [Python 3.9 or higher](https://www.python.org/downloads/)

:::warning
In practice, these tools have only been tested on Windows 10; however, these tools should work from any operating system that supports Python 3.9.

## Installation

The LMS Toolkit components can be installed into other Python scripts as dependencies, or they can run as stand-alone command line scripts from the source code.

> [!NOTE]
>
> From Packages
>
> The following commands install all fours tools into the active virtual environment; however, each tool is independent and you may install only the tools you need.
>
> ```sh
> pip install edfi-canvas-extractor
> pip install edfi-google-classroom-extractor
> pip install edfi-schoology-extractor
> pip install edfi-lms-ds-loader
> pip install edfi-lms-harmonizer
> ```
>
> > [!TIP]
> > To install the most current **pre-release** version, add the `--pre`  flag on each command.
>
> We have developed sample Jupyter notebooks that demonstrate execution of each extractor paired with execution of the LMS Data Store Loader:
>
> * [Canvas](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/blob/main/docs/demonstration/canvas-e2e.ipynb)
> * [Google Classroom](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/blob/main/docs/demonstration/google-e2e.ipynb) ![(warning)](https://edfi.atlassian.net/wiki/s/695013191/6452/be943731e17d7f4a2b01aa3e67b9f29c0529a211/_/images/icons/emoticons/warning.png)
>
>      note the requirement for a `service-account.json`  file.
> * [Schoology](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/blob/main/docs/demonstration/schoology-e2e.ipynb)
>
> From Source Code
>
> The source code repository has detailed information on each tool. To get started, clone or download **[the repository](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit)** and review the main readme file for instructions on how to configure and execute the extractors from the command line.
>
> * [Canvas](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/tree/main/src/canvas-extractor)
> * [Google Classroom](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/tree/main/src/google-classroom-extractor)
> * [Schoology](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/tree/main/src/schoology-extractor)
> * [LMS Data Store Loader](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/tree/main/src/lms-ds-loader)
> * [LMS Harmonizer](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/tree/main/src/lms-harmonizer)
>
:::
If you intend to push your LMS data into the Ed-Fi ODS, you will also need to install the LMS DataStore Loader and the ODS LMS extension tables.

### Installing the LMS Data Store Loader Database Objects

The LMS Data Stored Loader creates and manages its own database objects. Therefore, on at least the first execution of the program, the database connection credentials must be for an account with membership in the `db_ddladmin`, in addition to membership in the `db_datareader` and `db_datawriter` roles in the destination database.

### Installing the ODS LMS Extension for the ODS/API

In addition to the tables created by the LMS Data Store Loader, in the `lms`  schema, the LMS Harmonizer requires access to the Ed-Fi ODS database tables and to the `lmsx`  extension tables. Currently the toolkit supports ODS/API Suite 3, version 5.2 and version 5.3.

1. Install the `lmsx`  schema tables through one of two options:

    > [!NOTE]
    > Fresh Database Using Dynamic Plugin
    >
    > 1. Create a new file called `lmsx.ps1` in the `Ed-Fi-ODS-Implementation/Plugin` directory, using the contents shown below (![(warning)](https://edfi.atlassian.net/wiki/s/695013191/6452/be943731e17d7f4a2b01aa3e67b9f29c0529a211/_/images/icons/emoticons/warning.png)
    >
    >      make sure this file is "lms**x**.ps1" not "lms.ps1"). Please read the comments in the file to see how to change from ODS/API version 5.3 to version 5.2.
    >
    >      Expand source
    >
    >     ```powershell
    >     # SPDX-License-Identifier: Apache-2.0
    >     # Licensed to the Ed-Fi Alliance under one or more agreements.
    >     # The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
    >     # See the LICENSE and NOTICES files in the project root for more information.
    >
    >     #requires -modules "path-resolver"
    >
    >     Import-Module (Get-RepositoryResolvedPath 'logistics\scripts\modules\packaging\nuget-helper.psm1')
    >     Import-Module (Get-RepositoryResolvedPath "logistics\scripts\modules\tools\ToolsHelper.psm1")
    >
    >     $configuration = @{
    >         PackageName = "EdFi.Ods.Extensions.LMSX.1.0.0"
    >         ## Uncomment the appropriate line below
    >         # For ODS/API Suite 3, version 5.2:
    >         #PackageVersion = "5.2.3"
    >         # For ODS/API Suite 3, version 5.3:
    >         PackageVersion = "5.3.3"
    >         PackageSource = "https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json"
    >     }
    >
    >     $pluginPaths = @()
    >
    >     $parameters = @{
    >         packageName     = $configuration.packageName
    >         packageVersion  = $configuration.packageVersion
    >         packageSource   = $configuration.packageSource
    >         outputDirectory = "$PSScriptRoot"
    >         toolsPath       = (Get-ToolsPath)
    >     }
    >     $pluginPaths += Get-NuGetPackage @parameters
    >
    >     return $pluginPaths
    >     ```
    >
    > 2. In your `Ed-Fi-ODS-Implementation/Application/EdFi.Ods.WebApi` directory, run the following commands (![(warning)](https://edfi.atlassian.net/wiki/s/695013191/6452/be943731e17d7f4a2b01aa3e67b9f29c0529a211/_/images/icons/emoticons/warning.png)
    >
    >      if you already have any dynamic extensions, then increment the script number in the second command accordingly):
    >
    >     ```sh
    >     cd Ed-Fi-ODS-Implementation/Application/EdFi.Ods.WebApi
    >     dotnet user-secrets set "Plugin:Folder" "../../Plugin"
    >     dotnet user-secrets set "Plugin:Scripts:0" "lmsx"
    >     cd ../../
    >     ```
    >
    > 3. Run `initdev` from the root of the Ed-Fi-ODS-Implementation directory.
    >
    >     ```
    >     ./Initialize-PowershellForDevelopment.ps1
    >      Initdev
    >     ```
>
    >
    > Upgrade Existing Database Using Plugin
    >
    > 1. Download the correct version of the `EdFi.Suite3.RestApi.Databases` NuGet package from [Ed-Fi on Azure Artifacts](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.Suite3.RestApi.Databases/5.4.203/versions). If you are targeting ODS/API version 5.2, then download version 5.2.14406. If targeting version 5.3, then download 5.3.1146.
    >
    >     * If you have `nuget.exe` you can download and extract files with the following command. This will create directory `EdFi.Suite3.RestApi.Databases.5.2.14406` in the current working directory. See link above for other available versions, matching the ODS/API releases:
    >
    >         ```
    >         $url = "https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi%40Release/nuget/v3/index.json"
    >         nuget.exe install EdFi.Suite3.RestApi.Databases -version 5.2.14406 -source $url
    >         ```
    >
    >     * If you don't have `nuget.exe`, just download from the link above and treat it as a zip file. Unzip to an appropriate location.
    > 2. Locate the directory for your WebAPI website. Does it have a `Plugin` sub-directory? If not, create it. Copy the full exact path for use in the next step.
    >
    > 3. Create a new file called `lmsx.ps1` in the `Ed-Fi-ODS-Implementation/Plugin` directory, using the contents shown below (![(warning)](https://edfi.atlassian.net/wiki/s/695013191/6452/be943731e17d7f4a2b01aa3e67b9f29c0529a211/_/images/icons/emoticons/warning.png)
    >
    >      make sure this file is "lms**x**.ps1" not "lms.ps1"). Please read the comments in the file to see how to change from ODS/API version 5.3 to version 5.2.
    >
    >      Expand source
    >
    >     ```powershell
    >     # SPDX-License-Identifier: Apache-2.0
    >     # Licensed to the Ed-Fi Alliance under one or more agreements.
    >     # The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
    >     # See the LICENSE and NOTICES files in the project root for more information.
    >
    >     #requires -modules "path-resolver"
    >
    >     Import-Module (Get-RepositoryResolvedPath 'logistics\scripts\modules\packaging\nuget-helper.psm1')
    >     Import-Module (Get-RepositoryResolvedPath "logistics\scripts\modules\tools\ToolsHelper.psm1")
    >
    >     $configuration = @{
    >         PackageName = "EdFi.Ods.Extensions.LMSX.1.0.0"
    >         ## Uncomment the appropriate line below
    >         # For ODS/API Suite 3, version 5.2:
    >         #PackageVersion = "5.2.3"
    >         # For ODS/API Suite 3, version 5.3:
    >         PackageVersion = "5.3.3"
    >         PackageSource = "https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json"
    >     }
    >
    >     $pluginPaths = @()
    >
    >     $parameters = @{
    >         packageName     = $configuration.packageName
    >         packageVersion  = $configuration.packageVersion
    >         packageSource   = $configuration.packageSource
    >         outputDirectory = "$PSScriptRoot"
    >         toolsPath       = (Get-ToolsPath)
    >     }
    >     $pluginPaths += Get-NuGetPackage @parameters
    >
    >     return $pluginPaths
    >     ```
    >
    > 4. In the new `EdFi.Suite3.RestApi.Databases` directory, edit `configuration.json` and add "lmsx" to the `Plugin.Scripts` array, as shown below. Paste the `Plugin` directory path into the `Folder` entry below:
    >
    >     ```json
    >     "Plugin": {
    >         "Folder": "d:/Ed-Fi/5.2/WebApi/Plugin",
    >         "Scripts": [ "lmsx" ]
    >     }
    >     ```
    >
    >      ![(warning)](https://edfi.atlassian.net/wiki/s/695013191/6452/be943731e17d7f4a2b01aa3e67b9f29c0529a211/_/images/icons/emoticons/warning.png)If you use any directory other than the WebAPI project's Plugin directory at this step , then the plugin will not load when you run the application at the final step below.
    >
    > 5. In that same file, adjust the database connection strings and database engine as appropriate for your installation. If you are not sure what they are, then look in the `appsettings.json` file in your WebAPI directory.
    >
    > 6. Run the database deployment process in PowerShell while in the `EdFi.Suite3.RestApi.Databases` directory:
    >
    >     ```powershell
    >     Import-Module ./Deployment.psm1
    >     Initialize-DeploymentEnvironment
    >     ```
    >
    > 7. Open the `appsettings.json` file in your WebAPI directory, and add an `lmsx` entry under `Scripts`, just as done in step 3 above.
    >
    > 8. Restart the web site in IIS.

1. The LMS Harmonizer has several stored procedures and views, which are managed by the application. On first execution of the program, the database connection credentials must be for an account with membership in the `db_ddladmin`, in addition to membership in the `db_datareader` and `db_datawriter` roles in the destination database.

## Using the Toolkit Components

### Prepare Your LMS

To extract and integrate data from your LMS, you first need to configure it for access.

_See - [LMS Toolkit User Guide - Preparing your LMS for Data Integration](./lms-toolkit-user-guide-preparing-your-lms-for-data-integration.md)_

### Extract Data from the LMS

Extraction of data from the LMD is the next step in the pipeline.

_See [LMS Toolkit User Guide - Extract Data From the LMS](./lms-toolkit-user-guide-extract-data-from-the-lms.md)_

### Load Data into the ODS

Once the data is extracted, you can load the data into a relational database, and from there into your Ed-Fi ODS.

_See - [LMS Toolkit User Guide - Load Data into the ODS](./lms-toolkit-user-guide-load-data-into-the-ods.md)_

### Directly Pushing Data to the ODS/API

With the LMSX extension installed, vendors can directly integrate with the ODS/API via new Assignment and AssignmentSubmission resources.

_See -_ _[LMSX Extension to the Ed-Fi ODS/API](../lmsx-extension-to-the-ed-fi-odsapi.md)_

## Analyzing Student Data Using Juypter Notebooks

The LMS Data Store Loader pushes the extractor-created CSV files into a SQL Server database, where the data are available for use via standard SQL Server interfaces and tools. However, the CSV files can also be consumed directly to perform many interesting analyses. We have a developed a [set of Jupyter notebooks](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/tree/main/src/notebooks) that demonstrate analytics tasks that can be performed in Python using the Pandas framework, reading raw CSV files. Sample output from these notebooks is visible directly in GitHub, without needing to run the code locally:

* [Filesystem Tutorial / In Danger of Failing / Missing Assignment Submissions](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/blob/main/src/notebooks/filesystem-tutorial.ipynb): how to use the LMS Toolkit scripts to understand and access output files created by the extractors. Also includes two analysis scenarios - looking for students who are in danger of failing, and looking for missing assignment submissions.
* [Record Counts](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/blob/main/src/notebooks/record_counts.ipynb): simply accesses all of the extracted files and provides summary count of records downloaded.
* [Student Logins](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/blob/main/src/notebooks/student_logins.ipynb): simple visualization showing frequency of student logins to the LMS.
* [Student Submissions](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/blob/main/src/notebooks/student_submissions.ipynb): shows the count of assignments submitted per student, by status.

## Operational Concerns

### Logging

> [!NOTE]
>
> From Packages
>
> When you incorporate the LMS Toolkit components as package dependencies in other Python scripts, then you need to pass the log-level to the main facade class and you need to define the logging format. For example:
>
> ```py
> import logging
> import sys
> from edfi_schoology_extractor.helpers.arg_parser import MainArguments as s_args
> from edfi_schoology_extractor import extract_facade
>
> # Setup global logging
> logging.basicConfig(stream=sys.stdout, level=logging.INFO)
>
> # Prepare parameters
> arguments = s_args(
>     client_key=KEY,
>     client_secret=SECRET,
>     output_directory=OUTPUT_DIRECTORY,
>  # ----------- Here is the log level setting -----------
>     log_level=LOG_LEVEL,
>  # -----------------------------------------------------
>     page_size=200,
>     input_directory=None,
>     sync_database_directory=SYNC_DATABASE_DIRECTORY
> )
>
> # Run the Schoology extractor
> extract_facade.run(arguments)
> ```

> From Source Code
>
> ### LMS Extractors, DS Loader, and Harmonizer Errors
>
> The components of the LMS Starter Kit take a unified approach to error reporting. The LMS Extractors, DS Loader, and Harmonizer are all command line utilities that send log information to standard output. To capture the logs for later review, redirect the output to a file using the standard ">" redirect operator. For example, using the Canvas LMS extractor:
>
> ```sh
> poetry run python edfi_canvas_extractor > output.log
> ```
>
> All of the command line components take an optional "log level" parameter to adjust log output.  For example, this can be set from the command-line as follows:
>
> ```sh
> poetry run python edfi_canvas_extractor --log-level WARNING > output.log
> ```
>
> If any errors occurred during the script run, then there will be a final print message to the standard error handler as an additional mechanism for calling attention to the error: "A fatal error occurred, please review the log output for more information." Additionally, the application will exit with status code 1 if there were any log messages at the ERROR or CRITICAL level, otherwise it will exit with status code 0.The valid log level values are DEBUG, INFO (default), WARNING, ERROR, CRITICAL. The log level may also be set via the LOG\_LEVEL environment variable.
>
> ### Harmonizer Data Exception Reporting
>
> In addition to logging, the Harmonizer can be configured to provide reporting on LMS data that could not be matched with ODS data. To enable this, set the optional "exceptions report directory" parameter to a location for the Harmonizer to write files to. For example, this can be set from the command-line as follows:
>
> ```sh
> poetry run python edfi_lms_harmonizer --exceptions-report-directory C:\my-directory
> ```
>
> The exceptions report directory may also be set via the EXCEPTIONS\_REPORT\_DIRECTORY environment variable.

### Security

#### Upstream APIs

Each API has its own process for securing access. Please see the respective readme files for more information:

* [Canvas](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/tree/main/src/canvas-extractor#getting-started)
* [Google Classroom](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/tree/main/src/google-classroom-extractor#getting-started)
* [Schoology](https://github.com/Ed-Fi-Alliance-OSS/LMS-Toolkit/tree/main/src/schoology-extractor#getting-started)

#### Data Storage

Given the LMS Toolkit deals with student data, both the filesystem and database (if uploading to SQL Server) are subject to all of the same access restrictions as the Ed-Fi ODS database.

#### Database Permissions

As noted in the LMS Data Store Loader section above, in addition to read and write permissions (`db_datareader` and `db_datawriter` roles), the database user running that tool must have permission to alter SQL schema, which is typically granted through membership in the `db_ddladmin` role.

The LMS Harmonizer can be run under an account that only has read and write permissions.

### Scheduling

The API's provided by these three learning management systems are well defined at a granular level. From a performance perspective, this means that the process of getting a complete set of data is very chatty and may take a long time to process. It is difficult to predict the exact impact, although generally the time will scale proportional to the number of course sections. Some of the API's also do not have any mechanism for restricting the date range or looking for changed data, resulting in each execution of the extractor re-pulling the entire data set.

If running on a daily basis, then we recommend running after normal school hours to minimize contention with network traffic to the source system. If running weekly, then it may be best to run over the weekend.

It should be trivial to call these programs from Windows Task Scheduler, Linux chron, or a workflow engine such as Apache Airflow.
