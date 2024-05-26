---
sidebar_position: 2
---

# Technology Suite

The Ed-Fi Technology Suite consists of the core Ed-Fi API implementations and
other tools, described below, for maintaining, deploying, managing, and
interacting with the Ed-Fi Data Standard and/or the Ed-FI API applications.

## Ed-Fi API Implementations

The [Ed-Fi ODS/API
Platform](https://edfi.atlassian.net/wiki/spaces/ETKB/pages/20875717/Ed-Fi+Technology+Version+Index#Ed-FiTechnologyVersionIndex-ODS-API)
is the official reference implementation of an Ed-Fi API, used directly or
indirectly by thousands of education agencies across the United States. The
current version is [Ed-Fi ODS/API for Suite 3, version
7.1](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V71/overview).

As of 2024, efforts are now underway to replace the Ed-Fi ODS/API Platform, as
described in [New Cloud-Native Functionality Coming to the Ed-Fi Alliance
Technology Suite](https://www.ed-fi.org/blog/cloud-native-ed-fi-technology/)
(April 18, 2024). The new Ed-Fi Data Management Service will be a fully
compatible Ed-Fi API implementation. The initial implementation of the Data
Management Service and related components is being managed under the "codename"
[Project Tanager](https://github.com/Ed-Fi-Alliance-OSS/Project-Tanager).

## Ed-Fi Tools

### Ed-Fi Data Standard

[MetaEd](https://edfi.atlassian.net/wiki/spaces/EDFITOOLS/pages/24119101/MetaEd+IDE)
is both a language and an IDE that supports development of the core Ed-Fi
Unifying Data Model. It can also be used build extensions on the Ed-Fi
technology.

### Managing the ODS/API Platform

* [Docker
  Deployment](https://edfi.atlassian.net/wiki/spaces/EDFITOOLS/pages/24120025/Docker+Deployment)
  scripts install and configure components of the Ed-Fi Platform on Docker
  containers.
* [Admin API](https://edfi.atlassian.net/wiki/spaces/ADMINAPI) is an API-based
  interface for the management of the Ed-Fi Platform, for use in automated
  configurations.
* [Admin
  App](https://edfi.atlassian.net/wiki/spaces/EDFITOOLS/pages/24117525/Admin+App)
  is a web-based administrative interface for the Ed-Fi Platform.

:::warning[Deprecation Notice]

Admin App is in [maintenance
mode](https://edfi.atlassian.net/wiki/spaces/ETKB/pages/20874993/Admin+App+Transitioning+to+Ed-Fi+Exchange+in+2025)
until June, 2025, after which time the Ed-Fi Alliance will formally end support
for the application.

Watch for future announcements of a replacement for Admin App, which will be called Ed-Fi Admin Console.

:::

### Data Loading

* [API Publisher](https://techdocs.ed-fi.org/display/EDFITOOLS/API+Publisher) is
  a command-line utility used to copy data from one ODS / API instance to
  another of the same version.
* [Data
  Import](https://edfi.atlassian.net/wiki/spaces/EDFITOOLS/pages/24119638/Data+Import)
  is a tool to map and import data from CSV files to an Ed-Fi Platform.

:::warning[Deprecation Notice]

Data Import is in [maintenance
mode](https://edfi.atlassian.net/wiki/spaces/ETKB/pages/20875041/Data+Import+Transitioning+to+Ed-Fi+Exchange+in+2025)
until June, 2025, after which time the Ed-Fi Alliance will formally end support
for the application.

:::

## Other Useful Links

* The [Ed-Fi
  Exchange](https://edfi.atlassian.net/wiki/spaces/CSTD/pages/21432423/Ed-Fi+Exchange)
  contains additional applications and tools for supporting an Ed-Fi API
  deployment.
* Are you a developer or technologist looking for the code? See the [Software
  Development] for developer resources and links to our GitHub repositories.
* The [Ed-Fi Technology Version
  Index](https://edfi.atlassian.net/wiki/spaces/ETKB/pages/20875717/Ed-Fi+Technology+Version+Index)
  has a list of our products by version number. You can find which products are
  current, which are still in support, and the licensing for each.
* The data model and data exchange for Ed-Fi technologies are generally
  compatible within a particular Technology Suite. For example, products in
  Technology Suite 3 share the same data model. The [Ed-Fi Technology Suite
  Version
  Matrix](https://edfi.atlassian.net/wiki/spaces/ETKB/pages/20875825/Ed-Fi+Technical+Suite+Version+Matrix)
  shows which product versions are designed to work well together.
