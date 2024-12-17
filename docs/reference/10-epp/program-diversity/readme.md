# Program Diversity and Persistence Starter Kit

:::tip

Want to know more before you get started? Read more about [Educator Preparation](https://www.ed-fi.org/how-to-use-ed-fi/educator-prep-programs/) and [Program Diversity and Persistence](https://www.ed-fi.org/how-to-use-ed-fi/educator-prep-programs/program-diversity-and-persistence/) on the Ed-Fi website, or read the [Program Diversity and Persistence use case summary](/getting-started/educator-pipeline/program-diversity).

:::

The Program Diversity and Persistence Starter Kit provides step-by-step instructions to technical and non-technical users on how to implement the Ed-Fi Program Diversity and Persistence solution.

![Candidate Summary view](https://edfidocs.blob.core.windows.net/$web/img/getting-started/use-cases/epp/candidate-summary-small.png)

The [Setup Guide](./setup-guide.md) provides details on how to customize the Program Diversity and Persistence solution to fit your unique needs such as setting the solution up on your own infrastructure, configuring the Data Import tool, and loading test data. Completing the Setup Guide will result in a test environment intended to mimic your production environment. It is recommended that you have access to resource(s) that have a basic knowledge of Windows Server, Microsoft SQL Server, and Power BI.

For more help operating this starter kit, see the following pages:

* [Data Requirements](./data-requirements.md)
* [Mapping Guidance](./mapping-guidance.md)
* [Data Import Error Report](./data-import-error-report.md)

## System Requirements

### Server Specifications

These are basic requirements for using the system. Production deployments may require additional resources.

* A machine or virtual machine with internet access.
* 50GB free storage space.
* 4GB+ of available RAM.
* Windows Server 2019 or newer.
* Administrator access to physical machine or virtual machine.

### Software Installed

This starter kit was developed with the following software:

#### Windows Components

* Microsoft IIS v10 (Internet Information Services web server platform, current version 10+ in Windows 2016-2019)
* URL-Rewite module for IIS
* SSL Certificate
* Auto install with self-signed and Let’sEncrypt for DNS
* Microsoft .NET Core 6.0

#### Microsoft SQL Server

* SQL Server 2019
* Optional: MS SQL Server Management Studio

#### Tools

* Chocolatey (Package Manager)
* Git for Windows (Solution Code Manager)
* Modern browser (Microsoft Edge or Google Chrome)

#### Ed-Fi Technology Suite 3

* ODS / API Suite 3, v6
* Analytics Middle Tier v4
* Ed-Fi Admin App v3
* Data Import v2

The latest `minor.patch` release of each should be compatible with this guide (for example, ODS/API v6.2.0).
