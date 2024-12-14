# Enabling Custom File Generators After Upgrade to 1.2

Prior to Data Import 1.2, Custom File Generators were saved on disk and executed from there. From Data Import 1.2 forward, the scripts are stored in the Data Import database and take part in the PowerShell "sandboxing" security feature outlined in [Integrated Custom File Processors](../../preprocessing-csv-files/integrated-custom-file-processors.md). The consequence is that your preexisting scripts are very likely to begin failing due to their need for exceptionally high privileges on the system. File Generators naturally tend to need access to the filesystem and to databases on the network.

Using a File Generator is a strong indicator that you are mixing Data Import's data mapping role with the ETL role of other systems. Consider: does Data Import need to know about your bespoke ETL scripting prior to mapping and importing? If you wish to proceed with executing this before-mapping step within the mapping tool, you'll need to grant it permission. Here we'll witness the experience through the upgrade, initial errors due to the sandbox denying access, and then recovery through granting those rights.

The example files described here are in the attached zip and are based on the Student Assessments example described in the [Quick Start](../../../../data-import/getting-started/quick-start.md):

|     | File | Modified |
| --- | --- | --- |
| Labels*   No labels[Preview] [View](/wiki/download/attachments/24117960/ExampleSqlQueryFileGenerator.zip?version=1) | ZIP Archive [ExampleSqlQueryFileGenerator.zip](/wiki/download/attachments/24117960/ExampleSqlQueryFileGenerator.zip?api=v2) | May 21, 2021 by [Patrick Lioi](/wiki/people/557058:7887342a-0353-489d-a048-e90e2a6afcfc) |

We begin in a Data Import 1.1.1 system, with a File Generator stored on disk like so:

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/0.%20On%20disk%20in%201.1.2.PNG)

The script on disk in Data Import 1.1.1 is associated with this agent, as it is selected under "File Generation":

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/1.%20File%20based%20script%20in%201.1.2.PNG)

The user then upgrades to Data Import 1.2, which moves the script content into the database:

However, Data Import 1.2 runs the script in the PowerShell "sandbox" with deliberately limited privileges. A File Generator likely needs exceptional access to the system, so upon the next usage it fails as expected. Several dangerous commands like Get-Content and New-Object are deliberately denied in the sandbox:

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/3.%20First%20execution%20expected%20failure.PNG)

Here is where you need to make an important decision. Is your bespoke file generation concept truly an aspect of data _mapping,_ or is it in fact an ETL process _prior_ to bringing Data Import's mapping into the picture?

> [!CAUTION]
> If an administrator wants to opt-in to the risks of arbitrary code running in their data maps, performing file access, database connections, and the like, they can enable full access to the PowerShell language and commands: in both the `DataImport.Web/Web.config` file and the `DataImport.Server.TransformLoad/DataImport.Server.TransformLoad.exe.config` file, locate the `<appSettings>` tag and add the following setting to enable full PowerShell access:
>
> ![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/DANGER%20-%20Enable%20Full%20PowerShell.png)

Upon the next attempt to run the Agent, the script runs with full privileges and is able to complete once again:

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/5.%20Success.PNG)
