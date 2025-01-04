# Hardware and Software Recommendations

:::warning
The technical specifications below are older and have not been maintained over time, nor tested against Ed-Fi releases after ODS v3.2. They have been left here in case community members may need some starting point. They should not be considered recommendations.
:::

## Overview

State education agencies often need a plan to secure the resources necessary for deploying new systems. Below, you'll find our recommendations for deployment hardware. Both on-premise and cloud platforms are covered here.

**Pro Tip:** Most states have two publicly-accessible deployment environments (in addition to development and environments). See the full list in [Ed-Fi Installation Environments](../implementation/ed-fi-installation-environments.md). These two deployment environments are:

* **Sandbox Environment**: This environment is used to assist technology providers in preparing to integrate with your agency. For more info, see [Sandbox Deployment](/reference/ods-api/platform-dev-guide/deployment/sandbox-deployment).
* **Production Environment**: This is the live environment used to collect student records from school districts. For more info, see [Production Deployment](/reference/ods-api/platform-dev-guide/deployment/production-deployment)

:::note
These are recommendations, not requirements. They are based on field practice. You should consider the specific needs of your implementation. We also recommend consulting with other Ed-Fi SEAs directly for their input. We will gladly arrange these introductions.
:::

## On-Premise Installation

### Sandbox (Single Server Model) Hardware

* CPU/RAM: 4 Core / 28+ GB
* OS/Apps
  * Disk Configuration: SSD RAID 1 (2 Disks)
  * Disk Size: 2 x 250 GB
* SQL Data
  * Disk Configuration: SSD RAID 5 (3+ Disks)
  * Disk Size: 3+ x 500+ GB

### Sandbox (Two Server Model) Hardware

* OS/Apps
  * CPU/RAM: 4 Core / 16+ GB
  * Disk Configuration: SSD RAID 1 (2 Disks)
  * Disk Size: 2 x 250 GB
* SQL Data
  * CPU/RAM: 4 Core / 16+ GB
  * Disk Configuration: SSD RAID 5 (3+ Disks)
  * Disk Size: 3+ x 500+ GB

### Production Hardware

* 64-bit Operating System
* Minimum 16GB RAM
* Server-quality CPU with several cores
* Solid State Drives over RAID spindle drives. Web servers should use solid state drives for better performance. System drives on the database server should be the first drives to use solid state drives over data drives, the data drives may also be upgraded for a smaller (relative) performance improvement.

### Software

* Microsoft Windows (installation and configuration)
* PowerShell 5.0
* Microsoft Message Queue Server Core
* .NET Framework 3.5
* .NET Framework 4.62 Developer Pack
* Java Runtime Environment 8 or higher
* Microsoft SQL Server 2016
* SQL Server Management Studio (SSMS)
* Visual Studio 2017\* (Community or higher) or Visual Studio 2015 (Professional or higher)\_
  * ASP.NET MVC 4/C#
  * NuGet (Package Manager)

## Cloud Installation

### Database Server

* **Hardware**
  * VM Image: Free SQL Server License: SQL Server 2016/2017 Developer on Windows Server 2016
  * VM Disk Type: SSD
  * Size: DS3\_v2 (Promo, 4 VCPUs, 14 GB RAM, 12800 max IOPS, 28 GB local SSD, $313.97 estimated monthly)
* **Software**
  * Windows Server 2016
  * SQL Server 2016/2017 Developer  (development environment)

### WebAPI Server

* **Hardware**
  * VM Image: Windows Server 2016 Datacenter (The image comes with a 30 GB OS Disk)
  * VM Disk Type: SSD
  * Size: B2ms (Standard, 2 VCPUs, 8 GB ram, 4800 max IOPS, 16GB local SSD, $99.70 estimated monthly). Chosen as comparable CPUs/ram as VendorCertification, but for SSD, and alternatives in the same price range were not compelling over this one.
* **Software**
  * Windows 2016 Data Center
  * PowerShell 5.0
  * Microsoft Message Queue Server Core
  * .NET Framework 3.5
  * .NET Framework 4.62 Developer Pack
  * Java Runtime Environment 8 or higher
  * Microsoft SQL Server 2016
  * SQL Server Management Studio (SSMS)
  * Visual Studio 2017\* (Community or higher) or Visual Studio 2015 (Professional or higher)
  * ASP.NET MVC 4/C#
  * NuGet (Package Manager)
