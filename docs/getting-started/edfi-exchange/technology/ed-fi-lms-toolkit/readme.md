# Ed-Fi LMS Toolkit

## Description

The LMS Toolkit helps school districts unlock, simplify, and use instructional system data. The Toolkit's initial use cases focus on student assignment completion and measurement, and on general student activity and "presence" in instructional systems.

## Use Cases

The LMS Toolkit is use-case driven, and the primary use cases are:

1. Allow school districts to assess the level of student engagement in course work and combine this data with data from other key systems (such as SIS and assessment data) in order to support teachers and administrators in making the best possible decisions about the needs of and intervention options for individual students.
2. Providing the ability of school districts to mark attendance, especially in remote instructional contexts.

## Download

* **Code :** [https://github.com/Ed-Fi-Exchange-OSS/LMS-Toolkit](https://github.com/Ed-Fi-Exchange-OSS/LMS-Toolkit)
* **Documentation:**  [Ed-Fi LMS Toolkit](./lms-toolkit-user-guide/readme.md)

## Component Description

The Toolkit consists of several components.

| Components | Role | Input | Output |
| --- | --- | --- | --- |
| Extractors | Utilities that extracts data from important K12 instructional systems and merges that data into a common format (LMS Unifying Data Model).Note that these can be used independent of the Ed-Fi technology infrastructure and platform if desired. | Pull from Canvas, Google Classroom, or Schoology | CSV files |
| Loaders | Utilities that push the data into a SQL Server database store. | CSV files created by the extractors | `lms.*`  tables in SQL Server |
| Harmonizers | Utilities that help make the LMS data queryable alongside SIS data, by addressing problems such as entity identity mismatch, filtering of irrelevant MLS data, etc. | `edfi.*`  tables in SQL Server and `lms.*`  tables in SQL Server | `lms**x**.*`  tables in SQL Server |
| [Ed-Fi ODS/API Extension](./lmsx-extension-to-the-ed-fi-odsapi.md) | Builds support for the LMSX extension directly into the Ed-Fi ODS/API, allowing LMS vendors to push data directly into the API, and thus making the tools above unnecessary | Push from an LMS vendor | `lms**x**.*`  tables in SQL Server |

### Option 1: Pull Data from the Source System

![LMS Toolkit Diagram](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/image2023-1-24_21-48-41.png)

:::tip
See [LMS Toolkit Userguide](./lms-toolkit-user-guide/readme.md) for more detailed technical information / architecture of these components. See [LMS Toolkit User Guide](./lms-toolkit-user-guide/readme.md) for installation instructions.
:::

### Option 2: Direct Integration with ODS/API

![Integration Diagram](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/image2022-1-25_14-39-17.png)

:::tip
See [LMSX Extension to the Ed-Fi ODS/API](./lmsx-extension-to-the-ed-fi-odsapi.md) for more information on the API definition. See [LMS Toolkit User Guide](./lms-toolkit-user-guide/readme.md) for installation instructions.
:::

## Supported LMS Systems

Tools are available for the following systems:

| Instructional System |     | User / Developer Info |
| --- | --- | --- |
| ![Google Classroom logo](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/Google_Classroom_Logo.png) | Tools for Google Classroom | See GitHub links and other info in the [What's New in the LMS Toolkit](./whats-new-in-the-lms-toolkit.md) page. |
| ![Canvas Logo](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/canvas-logo.png) | Tools for Canvas LMS |
| ![Schoology](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/schoology-logo.png) | Tools for Schoology |

A [LMS Unifying Data Model](./lms-unifying-data-model/readme.md) designed to aggregate data across systems is also available.

If you would like to help us build tools for your platform, please contact us!

## Origins of the Toolkit

The LMS Toolkit came out of Project Fizz - the Ed-Fi community project to unlock data from instructional systems.

Unlocking this data is especially important the changes brought on by the COVID-19 pandemic. There has been a huge increases in the use of virtual and blended models of education, and giant increases in the use of online instructional systems in general. Instructional systems data is now more critical than ever to understanding student progress.

But as with all instructional and other school district tools, no one system tells the whole story of an individual student, so getting data out so it can be combined with other data is critical.

## Information for Contributors

We could use the help and would love to have community members contribute code or other assistance!

* **Developers**: The LMS Toolkit is ideal for community contribution and we would be happy to work with any members of the Ed-Fi community. The base repo is hosted on GitHub here: [https://github.com/Ed-Fi-Exchange-OSS/LMS-Toolkit](https://github.com/Ed-Fi-Exchange-OSS/LMS-Toolkit) Let us know if you would like to help!
* **Testers / feedback:** We also need school districts to help us try out the Toolkit and refine it. Please reach out if you would like to help in this fashion via the Ed-Fi #general Slack channel.

:::info
 _Notice: LMS provider_ _application logos used per these guidelines:_

* _Google Classroom Branding Guidelines - [https://developers.google.com/classroom/brand](https://developers.google.com/classroom/brand)_
* _Canvas LMS - license and copyright per [https://github.com/instructure/canvas-lms](https://github.com/instructure/canvas-lms)_
* _Schoology - [https://www.powerschool.com/brand-guidelines/](https://www.powerschool.com/brand-guidelines/)_

:::

## Details

* **By:** Members of Ed-Fi Community
* **License Terms:** Apache 2.0 License
* **Released:** January 2023
