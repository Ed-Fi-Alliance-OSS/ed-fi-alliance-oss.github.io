---
sidebar_position: 1
---

# Getting Started - Binary Installation

This section describes how to set up the Ed-Fi ODS / API v7.2 using the release
binaries listed in [Binary
Releases](./readme.md). This is a
recommend approach for implementations that have no requirement to extend or
customize the source code of the Ed-Fi ODS / API.

Before binary installation, install the prerequisites listed in the following
steps:

## Step 1. Install and Configure Windows Components

### Database Server

Ensure that the following components are installed:

* **PowerShell 5.0,7.2,7.3.** PowerShell is used by the database deployment
  scripts.
* **.NET 8.0 SDK.** Required by the [Database Deploy
  Tool](../../platform-dev-guide/utilities/database-deploy-tool)
  used in the database deployment scripts.

    <details>
      <summary>View detail...</summary>

      **PowerShell 5.0**

      Verify that PowerShell 5.0 or above is installed:

      1. Press the **Windows key** 🪟 on your keyboard, type **PowerShell**,
           select **Windows PowerShell**, and press **Enter**.
      2. Type **$PSVersionTable.PSVersion**, and press **Enter**.

          ```powershell
          PS D:\> $PSVersionTable.PSVersion

          Major  Minor  Patch  PreReleaseLabel BuildLabel
          -----  -----  -----  --------------- ----------
          5      1      22621  4111
          ```

      3. If the required version is not installed, download [Windows Management
          Framework
          5.0](https://www.microsoft.com/en-us/download/details.aspx?id=50395), which
          includes PowerShell 5.0.

      **.NET 8.0 SDK**

      Download and install the latest release of the [.NET 8.0
      SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
    </details>

### Web Server

:::tip

These notes are for installation in Windows Server. Installation notes for Linux
and MacOSX are outside the scope of this document. Users on Unix-like systems
will likely want to run a reverse-proxy web server such as NGiNX or Apache HTTP
Server, and will need to run the proper application DLLs as a service at
startup. See the [Ed-Fi ODS
Docker](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Docker) code repository
for an example.

:::

Ensure that the following components are installed:

* **Internet Information Services.** IIS is the web server that will run the
  ODS / API.
* **.NET 8.0 Hosting Bundle.** The .NET 8.0 Hosting Bundle is required for
  running the API on IIS. Must be installed after IIS.

  <details>
    <summary>View detail...</summary>

    **Internet Information Services**

    1. Press the **Windows key** 🪟 on your keyboard, type "features",
       select **Turn Windows features on or off**, press **Enter**.
    2. Check the box next to Internet Information Services. The default
        selections will be good for most cases.
    3. Click **OK**.

    **.NET 8.0 Hosting Bundle**

    Download and install [.NET Hosting Bundle
    8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0).

  </details>

## Step 2. Install and Configure Required Software

Ensure that the following software is installed and configured on the database
server:

* **Microsoft SQL Server 2019.** Microsoft SQL Server is used to store the data
  for the Ed-Fi ODS / API. Standard, Developer, or Enterprise Editions are
  supported.
* Alternative PostgreSQL datastore: **PostgreSQL 13.x.** can be used as the
  datastore for Ed-Fi ODS / API instance instead of Microsoft SQL Server.
  * **[Microsoft Visual C++ 2015
    Redistributable](https://www.microsoft.com/en-us/download/details.aspx?id=52685).**
    Required by some of the PostgreSQL Binary tools.
  * See [PostgreSQL Installation Notes](./postgresql-installation-notes.md) for
    additional information.

:::tip

Newer versions of Microsoft SQL Server and PostgreSQL typically work without any
modifications to the instructions or source code. The versions listed above are
known _minimum_ versions that are supported by the Alliance.

:::

## Step 3. Install and Configure ODS / API

PowerShell installers released with the ODS / API provide varied configuration
options. The primary ODS / API install use cases are provided as examples below.
Choose the option that suits your need and customize parameters as needed.

* [Sandbox Installation Steps](./sandbox-installation-steps)
* [Single/Multi Tenant Installation Steps](./singlemulti-tenant-installation-steps)

:::note

The following link contains sample docker setup files for PostgreSQL
[PGDockerSetup.zip](https://edfi.atlassian.net/wiki/download/attachments/23298153/PGDockerSetup.zip?version=1&modificationDate=1708470911443&cacheVersion=1&api=v2)

:::
