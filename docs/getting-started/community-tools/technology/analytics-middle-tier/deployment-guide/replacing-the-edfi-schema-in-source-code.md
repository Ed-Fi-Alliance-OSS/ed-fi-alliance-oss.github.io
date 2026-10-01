# Replacing the edfi Schema in Source Code

## Overview

Some implementers of Ed-Fi Technology Suite may have changed the default database
schema from `edfi`  to a custom value. In keeping with the majority of
implementations, the Analytics Middle Tier assumes that all Ed-Fi ODS database
tables are in the `edfi`  schema. There is no built-in or configuration option
to change to a different schema. However, anyone interested in installing the
Analytics Middle Tier over a customized database can do so.

## Instructions

### Prerequisite

* This procedure requires installation of [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download) on the developer
    workstation in order to recompile the source code.

### Steps

1. Fork the source code repository in GitHub
    ([https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Analytics-Middle-Tier](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Analytics-Middle-Tier)).
2. Clone the fork onto a developer computer.
3. Place the following script in the root repository
    directory: 
    
    ```powershell title="amt-change-source-schema.ps1"
        <#
        This script will change all AMT SQL scripts to use a different schema in place
        of "edfi", for those implementations which have customized their ODS database
        by using some other schema name.
        
        Place this script in the root of the Analytics Middle Tier source code project.
        #>        
        param(
            [string]
            [Parameter(Mandatory=$true)]
            $NewSchema
        )

        $filesToProcess = @{
            Path = $PSScriptRoot
            Recurse = $true
            Filter = "*.sql"
        }

        Get-ChildItem @filesToProcess | ForEach-Object {        
            $filePath = $_.FullName
            $content = Get-Content -Path $filePath -Raw
            $content = $content.Replace("edfi.", "$($NewSchema).")
            $content = $content.Replace("[edfi].", "$($NewSchema).")
            $content | Out-File -FilePath $filePath -Encoding UTF8
        }
   ```
4. Execute the script against the desired release tag (for example, "2.0.0" for
    the AMT 2.0.0 release), commit all changes in a new branch, and push back to
    GitHub.\*

    **Execute in PowerShell**

    ```powershell
    git checkout 2.0.0
    git checkout -b master-mystate
    .\amt-change-source-schema.ps1 "mystateschemaname"
    git commit -am "Replace edfi schema"
    git push master-mystate
    ```

    \* Strictly speaking you do not need to commit changes and push to GitHub.
    These instructions follow our recommended practice to always back up your
    work.

5. Now you can compile the application and [run it pointing to your custom
    database](./readme.mdx):

    ```powershell
    cd src/

    # Compile an executable for use on a Windows 10 or Windows Server 2016+ machine:
    dotnet publish -c Release -r win10-x64

    # Output is in src\EdFi.AnalyticsMiddleTier.Tests\bin\Release\netcoreapp3.1\win10-x64\publish\
    ```
