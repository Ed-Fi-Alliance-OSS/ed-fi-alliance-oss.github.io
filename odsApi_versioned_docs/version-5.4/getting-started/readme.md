---
title: Getting Started
sidebar_position: 2
---

# Getting Started

This documentation outlines the steps necessary to download, configure, and deploy the Ed-Fi ODS (Operational Data Store) and companion API (Application Programming Interface), referred to collectively as the Ed-Fi ODS / API. The Ed-Fi ODS / API enables applications to read and write education data stored in an Ed-Fi ODS through a secure REST interface. The Ed-Fi ODS / API supports both transactional and bulk modes of operation.

## Audience

This documentation is for technical professionals who work with educational data, including business analysts, database administrators, and software developers. The primary audiences are developers and hosts of ODS / API platforms, but developers of client applications may find this information useful.

:::info
**Additional installation options**

For those interested in getting an Ed-Fi ODS / API instance up and running quickly, but do not have developer tools or experience, we recommend you consult the [Docker Deployment 2.x](https://edfi.atlassian.net/wiki/spaces/EDFITOOLS/pages/24119348/Docker+Deployment+2.x) page and the Ed-Fi Exchange, which provides a number of alternatives for installing the Ed-Fi ODS / API. These options include support for deploying into public cloud platforms including Amazon Web Services, Google Cloud, and Microsoft Azure as well as on-premises and virtual machine targets.
:::

## Tested Configurations

The Ed-Fi ODS / API configuration described in this documentation has been tested with the following software configurations:

* Windows Server 2019, Windows 10
* Microsoft SQL Server 2019 (Developer Edition, Standard Edition, or Enterprise Edition)
* PostgreSQL 11.x
* Visual Studio 2022 (Community or higher)
* JetBrains Rider 2021.3

## Contents

Find out more about how to begin using the Ed-Fi ODS / API:

<details>
  <summary>Getting Started - Binary Installation</summary>

  * [Sandbox Installation Steps](./binary-installation/sandbox-installation-steps.mdx)
  * [Shared Instance Installation Steps](./binary-installation/shared-instance-installation-steps.md)
  * [Year-Specific Installation Steps](./binary-installation/year-specific-installation-steps.md)
  * [Binary Releases](./binary-installation/binary-releases.md)
</details>

<details>
  <summary>Getting Started - Source Code Installation</summary>

  * [Project Templates Installation](./source-code-installation/project-templates-installation.md)
  </details>

[Getting Started - Appendix](./getting-started-appendix.md)
