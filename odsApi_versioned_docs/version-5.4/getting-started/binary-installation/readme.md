---

title: Getting Started - Binary Installation  
sidebar\_position: 1

---

# Getting Started - Binary Installation

This section describes how to set up the Ed-Fi ODS / API v5.4 using the release binaries listed in [Binary Releases](./binary-releases.md). This is a recommended approach for implementations that have no requirement to extend or customize the source code of the Ed-Fi ODS / API.

Before binary installation, install the prerequisites listed in the following steps:

*   [Step 1. Install and Configure Windows Components](#step-1-install-and-configure-windows-components)
    *   [Database Server](#database-server)
    *   [Web Server](#web-server)
*   [Step 2. Install and Configure Required Software](#step-2-install-and-configure-required-software)
*   [Step 3. Install and Configure ODS / API](#step-3-install-and-configure-ods--api)

Detail on each step follows.

---

## Step 1. Install and Configure Windows Components

### Database Server

Ensure that the following components are installed:

*   **PowerShell 5.0.** PowerShell is used by the database deployment scripts.
*   **.NET 8.0 SDK.** Required by the [Database Deploy Tool](../../platform-dev-guide/utilities/database-deploy-tool.md) used in the database deployment scripts.

View detail...

**PowerShell 5.0**

Verify that PowerShell 5.0 or above is installed:

1.  Press the **Windows key** ![Windows logo](https://lh5.googleusercontent.com/o2iqf0j70YV3B-1NQxBFj1Ne-JeToRq5PiZeMtvF05l3jpyp4kseJn-zEs3BULgpAS_TFr8Qyacu5JZkiyXNllygq2EGhPII-PcxYyxkwCUqC4fPhMJ0QbovAD16R7T2StuDemW_) on your keyboard, type **PowerShell**, select **Windows PowerShell**, and press **Enter**.
2.  Type **$PSVersionTable.PSVersion**, and press **Enter**.

![PowerShell Version Example](https://lh4.googleusercontent.com/r__NXFQbu_V0pxJ32otzjgRyU5OHgUX-XniyRdimDSCH7Q0Wp9q-eKQKEc-8wmi-FdSu69TRrsHjwkuySdytVWIx6MEr7J1MU0NNg-NwWWw4RIjrVOQWW1zGm_YLA1bdjdhc-nqY)

1.  If the required version is not installed, download [Windows Management Framework 5.0](https://www.microsoft.com/en-us/download/details.aspx?id=50395), which includes PowerShell 5.0.

**.NET 8.0 SDK**

Download and install the latest release of the [.NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0).

![PowerShell Version Screenshot 2](https://edfi.atlassian.net/wiki/download/thumbnails/22774182/image2024-10-31_13-58-28.png?version=1&modificationDate=1730401110139&cacheVersion=1&api=v2&width=812&height=491)

### Web Server

Ensure that the following components are installed:

*   **Internet Information Services.** IIS is the web server that will run the ODS / API.
*   **.NET 8.0 Hosting Bundle.** The .NET 8.0 Hosting Bundle is required for running the API on IIS. Must be installed after IIS.

View detail...

**Internet Information Services**

1.  Press the **Windows key** ![Windows logo](https://lh5.googleusercontent.com/o2iqf0j70YV3B-1NQxBFj1Ne-JeToRq5PiZeMtvF05l3jpyp4kseJn-zEs3BULgpAS_TFr8Qyacu5JZkiyXNllygq2EGhPII-PcxYyxkwCUqC4fPhMJ0QbovAD16R7T2StuDemW_) on your keyboard, type "features", select **Turn Windows features on or off**, and press **Enter**.
2.  Check the box next to **Internet Information Services**. The default selections will be good for most cases.
3.  Click **OK**.

![IIS Windows Features Screenshot](https://edfi.atlassian.net/wiki/download/thumbnails/22774182/image2021-10-13_16-25-43.png?version=1&modificationDate=1641861342317&cacheVersion=1&api=v2&width=412&height=364)

**.NET 8.0 Hosting Bundle**

Download and install the latest release of the [.NET Hosting Bundle 8.0](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) after IIS is installed.

![Hosting Bundle Screenshot](https://edfi.atlassian.net/wiki/download/thumbnails/22774182/image2024-10-31_13-58-48.png?version=1&modificationDate=1730401130359&cacheVersion=1&api=v2&width=808&height=510)

---

## Step 2. Install and Configure Required Software

Ensure that the following software is installed and configured on the database server:

*   **Microsoft SQL Server 2019.** Microsoft SQL Server is used to store the data for the Ed-Fi ODS / API. Standard, Developer, or Enterprise Editions are supported.
*   Alternative PostgreSQL datastore: **PostgreSQL 11.x.** PostgreSQL can be used as the datastore for an Ed-Fi ODS / API instance instead of Microsoft SQL Server.
    *   [**Microsoft Visual C++ 2015 Redistributable.**](https://www.microsoft.com/en-us/download/details.aspx?id=52685) Required by some of the PostgreSQL Binary tools.
    *   [**pgpass.conf**](https://www.postgresql.org/docs/11/libpq-pgpass.html) file setup to store passwords. Required by database deployment scripts. [PGPASSFILE](https://www.postgresql.org/docs/11/libpq-envars.html) environment variable could be setup to specify the location of pgpass.conf file.

---

## Step 3. Install and Configure ODS / API

PowerShell installers released with the ODS / API provide varied configuration options. The primary ODS / API install use cases are provided as examples below. Choose the option that suits your need and customize parameters as needed.

*   [Sandbox Installation Steps](./sandbox-installation-steps.mdx)
*   [Shared Instance Installation Steps](./shared-instance-installation-steps.md)
*   [Year-Specific Installation Steps](./year-specifc-installation-steps.md)

---