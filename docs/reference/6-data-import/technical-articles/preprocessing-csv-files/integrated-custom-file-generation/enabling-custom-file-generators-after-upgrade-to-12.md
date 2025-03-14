# Enabling Custom File Generators After Upgrade to 1.2

Prior to Data Import 1.2, Custom File Generators were saved on disk and executed
from there. From Data Import 1.2 forward, the scripts are stored in the Data
Import database and take part in the PowerShell "sandboxing" security feature
outlined in [Integrated Custom File Processors]. The consequence is that your
preexisting scripts are very likely to begin failing due to their need for
exceptionally high privileges on the system. File Generators naturally tend to
need access to the filesystem and to databases on the network.

Using a File Generator is a strong indicator that you are mixing Data Import's
data mapping role with the ETL role of other systems. Consider: does Data Import
need to know about your bespoke ETL scripting prior to mapping and importing? If
you wish to proceed with executing this before-mapping step within the mapping
tool, you'll need to grant it permission. Here we'll witness the experience
through the upgrade, initial errors due to the sandbox denying access, and then
recovery through granting those rights.

The example files described here are in the attached zip and are based on the
Student Assessments example described in the [Quick Start]:

:::info

[ExampleSqlQueryFileGenerator.zip](https://edfi.atlassian.net/wiki/download/attachments/24117960/ExampleSqlQueryFileGenerator.zip?api=v2)

:::

We begin in a Data Import 1.1.1 system, with a File Generator stored on disk
like so:

![Sql Script](https://edfi.atlassian.net/wiki/download/attachments/24117960/0.%20On%20disk%20in%201.1.2.PNG?version=1&modificationDate=1621556421333&cacheVersion=1&api=v2)

The script on disk in Data Import 1.1.1 is associated with this agent, as it is
selected under "File Generation":

![Agent Schedule](https://edfi.atlassian.net/wiki/download/attachments/24117960/1.%20File%20based%20script%20in%201.1.2.PNG?version=1&modificationDate=1621556426973&cacheVersion=1&api=v2)

The user then upgrades to Data Import 1.2, which moves the script content into
the database:

However, Data Import 1.2 runs the script in the PowerShell "sandbox" with
deliberately limited privileges. A File Generator likely needs exceptional
access to the system, so upon the next usage it fails as expected. Several
dangerous commands like Get-Content and New-Object are deliberately denied in
the sandbox:

![Query](https://edfi.atlassian.net/wiki/download/thumbnails/24117960/3.%20First%20execution%20expected%20failure.PNG?version=1&modificationDate=1621556461800&cacheVersion=1&api=v2&width=1159&height=189)

Here is where you need to make an important decision. Is your bespoke file
generation concept truly an aspect of data _mapping,_ or is it in fact an ETL
process _prior_ to bringing Data Import's mapping into the picture?

:::warning

If an administrator wants to opt-in to the risks of arbitrary code
running in their data maps, performing file access, database connections, and
the like, they can enable full access to the PowerShell language and commands:
in both the `DataImport.Web/Web.config` file and
the `DataImport.Server.TransformLoad/DataImport.Server.TransformLoad.exe.config` file,
locate the `<appSettings>` tag and add the following setting to enable full
PowerShell access:

```xml
<add key="UsePowerShellWithNoRestrictions" value="True" />
```

:::

Upon the next attempt to run the Agent, the script runs with full privileges and
is able to complete once again:

![Results](https://edfi.atlassian.net/wiki/download/thumbnails/24117960/5.%20Success.PNG?version=1&modificationDate=1621556519373&cacheVersion=1&api=v2&width=1160&height=294)
