---
sidebar_position: 1
---

# Overview

This section provides important conceptual material related to the Ed-Fi ODS / API platform. If you're new to the Ed-Fi Data Standard, the [Unifying Data Model - Model Reference](https://edfi.atlassian.net/wiki/spaces/DATASTDDEV/pages/26313312) documentation is useful in exploring the domain models.

## Solution Overview


The Ed-Fi Alliance publishes the [Ed-Fi Data
Standard](/reference/data-exchange/data-standard), which models a broad spectrum
of commonly exchanged and shared K–12 education data. The Ed-Fi ODS / API is a
concrete implementation of a relational database and a companion API harmonized
with the Ed-Fi Data Standard. The Ed-Fi ODS / API is tuned to the security and
performance needs of K–12 organizations and the education technology vendors who
serve them.

The ODS implementation supports Microsoft SQL Server as well as PostgreSQL as a
database platforms. The API implementation is written in C# and ASP.NET Core.
Together, these provide various hosting options to form a data platform to host
student-centric data. The ODS / API platform is vendor neutral, meaning that
client applications may be written in any language.

## Conceptual Overview

Education enterprises like schools, districts, and states often have
student-centric information spanning several systems. Even though there is a
wealth of data, the information is essentially siloed, which makes it difficult
to get a holistic picture of a student or the performance of the enterprise as a
whole.

Having data in silos causes other issues like duplicate and conflicting
information. In the case of standardized test results that arrive on
disconnected media, enterprises struggle with finding a place to store that
information in a way that it can be connected with students.

The ODS / API addresses these problems by centralizing data in a relational
database (in the ODS), and providing secure access back to the siloed systems
and to reporting tools like dashboards or BI analysis platforms (via the API).
Additionally, some implementers have used the ODS / API in different ways, for
example, as the primary data store for a custom student information system or as
the data store solely for a centralized BI report source. The key point is that
the ODS / API have structures that cover a broad swath of educational data and
interface to the data that can be configured for a variety of scenarios.

## What Does the ODS / API Do?

The Ed-Fi ODS / API can be useful in the following common technology tasks:

* Integration of data from siloed source systems.
* Quality checking and cleansing data, and de-duplicating records.
* Operational reporting on data from a single source.
* Providing authoritative information to client applications.

A discussion of the components follows.

## The Operational Data Store Component

What draws implementers to the Ed-Fi ODS / API is that the ODS provides a rich
and detailed data model out of the box, which means that it can handle the
real-world complexities of student attendance, grades, discipline events, and so
forth. The data model is extensible, which means that it also allows for the
inevitable customizations that are necessary to suit a particular enterprise’s
needs.

Specifically, the ODS contains detailed tables, structures, and associations for
the following domains:

* Assessment
* Bell Schedule
* Discipline
* Education Organization
* Enrollment
* Finance
* Graduation
* Intervention
* School Calendar
* Staff
* Student Academic Record
* Student Attendance
* Student Cohort
* Student Identification and Demographics
* Teaching and Learning
* Alternative/Supplemental Services, including:
  * Career and Technical Education
  * Migrant Education
  * Special Education
  * Title I Part A Services
* Survey

If you’re new to the Ed-Fi Data Standard, the [Unifying Data Model - Model
Reference](https://edfi.atlassian.net/wiki/spaces/EFDS5/pages/26707002/Unifying+Data+Model+-+v5+Model+Reference) documentation
is useful in exploring the domain models.

The Ed-Fi ODS / API isn’t magic. It takes analysis and integration efforts to
connect systems that populate the ODS data store. However, the ODS / API source
code comes with code to bulk load the data store, and the RESTful interface
makes it easy for client systems to keep the data up to date in real time.

## The Application Programming Interface Component

Once you have data in the ODS, you’ll want to put it to use and keep it up to
date. That’s where the API comes in. The API that comes with the source code is
a secure, modern, RESTful, interface to your data that can be accessed by any
client application on any platform.

Like the ODS, the API is harmonized with the Ed-Fi Data Standard. The resources
accessible from the API share the same naming conventions, definitions, and
organization as the ODS. This makes it easy to understand where data is coming
from and what it means.

The API is secure. It uses HTTPS for communication, the OAuth 2 specification
for authentication, and comes with a rich and customizable claimset model so
platform hosts have fine-grained control over which applications and users can
see particular pieces of data. See the [API Claim Sets &
Resources](./security/api-claim-sets-resources.md)
section in this documentation for complete details.

## Technology Stack

The core ODS / API technologies are essentially built on a Microsoft stack,
including C# and ASP.NET Core. Being a .NET 6 application, it can be hosted on a
Microsoft stack with API running on Internet Information Services backed by
Microsoft SQL Server ODS or API running as well as on Linux Server backed by
PostgreSQL ODS.

A high-level view looks something like this:

![Technology Stack Diagram](https://edfi.atlassian.net/wiki/download/attachments/25493627/image2020-10-20_11-33-39.png?version=2&modificationDate=1701196189347&cacheVersion=1&api=v2)

A few things to note:

* The Ed-Fi ODS / API platform is cross platform and clients of the platform can
  be written in practically any language for any modern operating system. See
  the [API Client Developers' Guide](../client-developers-guide/readme.md) for
  details.
* The Ed-Fi ODS / API platform can run in a variety of server environments,
  including on-premises hardware, docker or cloud-based platforms like AWS and
  Azure. See the [Deployment](./deployment/readme.md) section in this
  documentation for details.
