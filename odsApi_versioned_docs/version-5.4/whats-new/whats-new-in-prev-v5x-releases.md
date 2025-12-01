---
description: Summary of what changed in prior releases of 5.x
sidebar_position: 2
---

# What's New in Previous v5.x Releases

This documentation provides a summary overview of the major improvements, updates, fixes, and changes made in previous releases of the Ed-Fi ODS / API v5.x suite of releases and provides links to additional documentation.

The changes include:

* Improvements & Enhancements - Version 5.3
  * Data Model Changes
  * Educator Preparation Data Model
  * Authorization Simplification
  * Extension Plugin Build Without Source Code Installation
  * Support For Multiple Database Servers
  * MetaEd IDE v2.6
* Improvements & Enhancements - Version 5.2
  * Data Model Changes
  * XSD Metadata Endpoint in ODS / API
  * Snapshot Isolation for Change Query Processing
  * Package Management and Distribution
  * Teacher Preparation Data Model as a Plugin
  * MetaEd IDE v2.5
* Improvements & Enhancements - Version 5.1
  * Migration to .NET Core
  * Dynamic Extension Plugins
  * Teacher Preparation Data Model as a Plugin
  * MetaEd IDE v2.4.0
  * Additional Support for PostgreSQL-Backed ODS / API
* Improvements & Enhancements - Version 5.0
  * Data Model Changes
  * MetaEd IDE v2.3.0
  * Teacher Preparation Data Model
  * Additional Support for PostgreSQL-Backed ODS / API
  * Authorization Enhancements
  * Bulk Load Client Enhancements and Removal of Server-Side Bulk Load
  * Apache License
  * Semantic Versioning

Detail about each change follows.

## Improvements & Enhancements - Version 5.3

### Data Model Changes

Ed-Fi ODS / API v5.3 implements [Ed-Fi Data Standard v3.3.1-b](https://edfi.atlassian.net/wiki/spaces/EFDS33/overview), which brings a subset of TPDM elements into the core data model and introduces changes around the domains commonly captured in student information systems and assessment systems. Refer to [What's New - v3.3-b](https://edfi.atlassian.net/wiki/spaces/EFDS33/pages/26968259/What+s+New+-+v3.3-b) for details. These changes are intended to be non-breaking to most API clients. However, platform hosts should be aware that there are database changes and changes to build and deployment pipelines.

Data Standard v3.3.1-b can also be reviewed in the context of API specifications:

* [Ed-Fi Assessment Outcomes API for Suite 3 v1.0.1](https://edfi.atlassian.net/wiki/spaces/EFDS/pages/17727736/Ed-Fi+Assessment+Outcomes+API+for+Suite+3)
* [ED-FI RFC 24 - CORE STUDENT API](https://edfi.atlassian.net/wiki/display/EFDSRFC/ED-FI+RFC+24+-+CORE+STUDENT+API)
* [ED-FI RFC 25 - SURVEY API](https://edfi.atlassian.net/wiki/display/EFDSRFC/ED-FI+RFC+25+-+SURVEY+API)
* [/wiki/spaces/EFTD/pages/25363200](https://edfi.atlassian.net/wiki/spaces/EFTD/pages/25363200)

### Educator Preparation Data Model

Ed-Fi ODS / API v5.3 brings in EPDM core v1.1.0 (previously TPDM) as a dynamic extension plugin. Educator Preparation Providers can use this extension to evaluate program improvements based on how their graduates perform in the classroom rather than on general or anecdotal evidence. See the [Educator Preparation Data Model](https://edfi.atlassian.net/wiki/display/EPP/Educator+Preparation+Programs) documentation for more details. Out of the box, the Ed-Fi ODS / API installs the EPDM core plugin. If you are interested in the EPDM community edition, see the article [Installing Ed-Fi ODS / API 5.3 with EPDM-Community v1.1](https://edfi.atlassian.net/wiki/spaces/EPP/pages/23169945/Installing+Ed-Fi+ODS+API+5.3+with+EPDM-Community+v1.1).

### Authorization Simplification

In previous releases, when authorization to API resources was to be granted based on a new education organization subtype (originally only LEA and school were supported), the API source code and database had to be modified. Recently, many use cases for authorization based on different education organization subtypes have emerged (e.g., CommunityProvider, PostSecondaryInstitution, Education Service Center, OrganizationDepartment). ODS / API v5.3 includes a simplification to education organization-based authorization to support these use cases.

### Extension Plugin Build Without Source Code Installation

[Extending the Data Model](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V53/pages/24546166/Extending+the+ODS+API+Data+Model) is one of the key features that draws implementers to the Ed-Fi ODS / API. Typically, this involves a development activity that modifies the ODS, data access code, API surface, Open API metadata, and more. Hence, extending the model requires CI/CD setup for build and deployment of extended API.

Many LEA implementations depend on the as-shipped Ed-Fi-published packages and do not have the resources to develop extensions. So we introduced dynamic extension feature in an earlier Suite 3 release. This feature allowed extension plugins to be created and then consumed at runtime by the ODS / API without source code changes. This opened up the door for LEA implementations to consume domain extensions and data exchange standards that are emerging as extensions without source code changes.

State-specific extensions still required full source download and CI/CD setup. ODS / API v5.3 enables building dynamic extension packages without setting up full CI/CD for entire ODS/API source code build. The [SEA Modernization Starter Kit](https://edfi.atlassian.net/wiki/spaces/SK/pages/22004823/SEA+Modernization+Starter+Kit) introduces a [GitHub Action](https://github.com/Ed-Fi-Alliance-OSS/Starter-Kit-SEA-Modernization/actions) build that works with published API binaries to build and test extension plugins with the Ed-Fi-published ODS / API binaries. ODS / API and the extension can then be deployed via [Binary Installation](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V53/pages/24546797/Year-Specific+Installation+Steps) path.

### Support For Multiple Database Servers

Ed-Fi ODS / API traditionally supported different database partitioning strategies, for example, the default Shared Instance, [Year Specific](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V53/pages/24546164/Year-Specific+ODS+Configuration), [District Specific](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V53/pages/24543845/District-Specific+ODS+Configuration) and more recent [Instance Year Specific](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V53/pages/24546903/Instance-Year-Specific+ODS+Configuration) deployment. While these allowed partitioning data into different databases, all databases were deployed on a single database server. For clear isolation of data for different districts or different school years, the ODS / API now allows similar template patterns on databases as well as database servers.

| **Database Provider** | **Partitioning Strategy** | **appsettings.json ApiSettings:Mode value** | **appsettings.json EdFi_ODS Connection String** |
|----------------------|--------------------------|---------------------------------------------|-------------------------------------------------|
| **District Specific** | Partitioning by district. Different district data is accessed through district ID associated with the API client. To use this option, the API client must be configured for exactly one district ID during API key and secret configuration. | DistrictSpecific | Database=EdFi_Ods_DISTRICTID<br>Server=Ods_DISTRICTID<br>(substitute actual district ID) |
| **Instance-Year Specific** | Partitioning by instance and year. Different instance and year data is accessed through changing the URL (e.g., http://website-address/data/v3/inst-1/2021). Partitioning by-district-by-year is one specific example of this strategy. | InstanceYearSpecific | Database=EdFi_Ods_INSTANCEID_YYYY<br>Server=Ods_INSTANCEID_YYYY<br>(substitute actual instance ID and current year) |
| **Year Specific** | Partitioning by year. Different year data is accessed through changing the URL (e.g., http://website-address/data/v3/2021). | YearSpecific | Database=EdFi_Ods_YYYY<br>Server=Ods_YYYY<br>(substitute actual current year) |

### MetaEd IDE v2.6

Implementing extensions in ODS / API v5.3 requires implementers to update to MetaEd IDE v2.6.

## Improvements & Enhancements - Version 5.2

### Data Model Changes

Ed-Fi ODS / API v5.2 implements Ed-Fi Data Standard v3.3.0-a, which introduces changes to the core data model around the domains commonly captured in student information systems and assessment systems. These changes are intended to be non-breaking to most API clients. However, platform hosts should be aware that there are changes to the database as well as the build and deployment pipelines.

Data Standard v3.3.0-a can also be reviewed in the context of API specifications:

* [Ed-Fi Assessment Outcomes API for Suite 3 v1.0.1](https://edfi.atlassian.net/wiki/spaces/EFDS/pages/17727736/Ed-Fi+Assessment+Outcomes+API+for+Suite+3)
* [ED-FI RFC 24 - CORE STUDENT API](https://edfi.atlassian.net/wiki/display/EFDSRFC/ED-FI+RFC+24+-+CORE+STUDENT+API)
* [ED-FI RFC 25 - SURVEY API](https://edfi.atlassian.net/wiki/display/EFDSRFC/ED-FI+RFC+25+-+SURVEY+API)

### XSD Metadata Endpoint in ODS / API

Ed-Fi ODS / API exposes [OpenAPI Specification](http://swagger.io/) metadata that describes all the API resources as well as the inputs, HTTP verbs, and JSON schema of the exposed resources.

Ed-Fi ODS / API also exposes another metadata endpoint that indicates the dependency order for the API operations enforced through entity relationships in the ODS database or by authorization.

In this release, Ed-Fi ODS / API adds another metadata endpoint that exposes the [Bulk / XML standards](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/tree/v3.3.0-a/Schemas/Bulk) (core entity XML definitions and interchange specifications) specified by the Data Standard the ODS / API implements.

These metadata endpoints are listed in the API root for easy access:

![Ed-Fi ODS / API Bulk XML Metadata Endpoint Example](https://edfi.atlassian.net/wiki/download/thumbnails/22774172/image2021-3-26_17-30-50.png?version=1&modificationDate=1641861341980&cacheVersion=1&api=v2&width=500&height=311)

The Bulk Load Client Utility has been enhanced to read these metadata endpoints from the API root, and validate and load the source XML in the correct dependency order.

#### Snapshot Isolation for Change Query Processing

The goal of the changed record queries (or "change queries") feature is to surface information about the changes made to database tables to clients of Ed-Fi APIs. These changes include inserts, updates, and deletes. In previous versions of the ODS / API, due to transactional nature of live ODS, even careful change processing could not guarantee absolute downstream referential integrity unless API host operationally ensures that no other clients or processes are modifying ODS data while change processing is underway.

In this release, API hosts can implement a regularly scheduled activity that either creates a database snapshot (a SQL Server feature that creates a lightweight static "copy" of the database), or backs up and restores the ODS as a new database. The ODS / API then can expose the snapshot database for change processing.

#### Package Management and Distribution

In previous versions of ODS / API, the .NET binaries were released on MyGet. This release moves binaries to Azure Artifacts. This move supports more storage space and package workflow improvements. The Azure Artifacts [best practices](https://docs.microsoft.com/en-us/azure/devops/artifacts/concepts/best-practices?view=azure-devops) package promotion workflow is followed. Development packages are now published to [@Local](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging?_a=feed&feed=EdFi%40Local) feed and release packages are promoted to the [@Release](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging?_a=feed&feed=EdFi%40Release) feed. While technical artifacts of ODS / API follow [semantic versioning](https://semver.org/) as [announced](https://www.ed-fi.org/blog/2020/05/open-source-and-new-versioning/) in May 2020, the new package promotion workflow results in a high patch number. This high patch number is due to daily builds during development rather than actual production patches. When there are production patches, they will be updated and highlighted in the Binary Releases page.

### Teacher Preparation Data Model as a Plugin

Ed-Fi ODS / API v5.2 supports TPDM v1.0 as optional dynamic extension plugin. Teacher preparation providers can use this extension to evaluate program improvements based on how their graduates perform in the classroom rather than on general or anecdotal evidence. See the [Teacher Preparation Data Model](https://edfi.atlassian.net/wiki/display/TPDMX/Teacher+Preparation+Data+Model)) documentation for more details on this extension. For instructions on how to deploy the extension see the article [Getting Started with TPDM v1.0](https://edfi.atlassian.net/wiki/pages/viewpage.action?pageId=23039729).

### MetaEd IDE v2.5

Implementing extensions in ODS / API v5.2 requires implementers to update to MetaEd IDE v2.5.

## Improvements & Enhancements - Version 5.1

### Migration to .NET Core

In previous Ed-Fi ODS / API releases, though the platform could be run in a variety of server environments including on-premises hardware or cloud-based platforms like Google Cloud, AWS, and Azure, the API servers had to be run on the Windows operating system. As announced in a recent [blog post](https://www.ed-fi.org/blog/2020/08/google-cloud-teams-up-with-ed-fi-just-in-time-for-back-to-school-preparations), this release migrates the source code to .NET core allowing full cross-platform support, supporting Windows and Linux operating systems. The upcoming ODS / API release will provide Docker deployments for a PostgreSQL-backed ODS on Linux servers.

### Dynamic Extension Plugins
Extending the Data Model is one of the key features that draws implementers to the Ed-Fi ODS / API. Typically, this involves a development activity that modifies the ODS, data access code, API surface, Open API metadata, and more. Hence, extending the model requires CICD setup for build and deployment of extended API.

Many LEA implementations depend on the as-shipped Ed-Fi-published packages and do not have the resources to develop extensions. This release brings a dynamic extension feature which allows extension plugins to be created and then consumed at runtime by the ODS / API without source code changes. This opens up the door for LEA implementations to consume domain extensions (e.g., TPDM) and data exchange standards that are emerging as extensions (e.g., Finance, Assessment, and more in the future) without source code changes. The traditional extensions that require build and deployment are still supported.

### Teacher Preparation Data Model as a Plugin
Ed-Fi ODS / API v5.1.0 supports TPDM 1.0 as optional dynamic extension plugin. Teacher preparation providers can use this extension to base program improvements on how their graduates perform in the classroom rather than on general or anecdotal evidence. See [Teacher Preparation Data Model](https://edfi.atlassian.net/wiki/spaces/TPDMX/overview) for more details on this domain extension. For instructions on how to deploy the extension see the article [Getting Started with TPDM v1.0](https://edfi.atlassian.net/wiki/spaces/TPDMX/pages/19203750/Getting+Started+with+TPDM+v1.0).

### MetaEd IDE v2.4.0
Implementing extensions in OS / API v5.1.0 requires implementers to update to MetaEd IDE v2.4.0 or higher.

### Additional Support for PostgreSQL-Backed ODS / API
The previous Ed-Fi ODS / API v3.x releases brought ODS / API PostgreSQL support to parity with Ed-Fi ODS / API cloud offering and added TPDM domain extension support. This release adds full Sandbox Admin Application support.

## Improvements & Enhancements - Version 5.0
### Data Model Changes
ODS / API v5.0.0 implements Ed-Fi Data Standard v3.2.0-c. Noteworthy additions to the data model in v3.2.0-c include the Survey domain and Person model. There are no breaking API or JSON model changes accompanying this release. However, platform hosts should be aware that there are some breaking database changes. Refer to [How To: View API and Database changes in the latest ODS / API Release](https://edfi.atlassian.net/wiki/spaces/EFTD/pages/24805773/How+To+View+API+and+Database+changes+in+the+latest+ODS+API+Release) to see the full set of API and database changes in this implementation.

The data model changes introduced in Data Standard v3.2.0-c can also be reviewed in the context of API specification updates:

* SIS API. This release implements the latest [Ed-Fi RFC 24 - Core Student API](https://edfi.atlassian.net/wiki/display/EFDSRFC/ED-FI+RFC+24+-+CORE+STUDENT+API). The changes were designed to be non-breaking for most existing API client systems.
* Survey API. This release implements [Ed-Fi RFC 25 - Survey API](https://edfi.atlassian.net/wiki/spaces/EFTD/pages/25363230/ED-FI+RFC+25+-+SURVEY+API), which is newly added in this release.

This release also implements [Ed-Fi RFC 22 - Assessment Outcomes API](https://edfi.atlassian.net/wiki/spaces/EFTD/pages/25363177/ED-FI+RFC+22+-+ASSESSMENT+OUTCOMES+API), which is the same as previous Ed-Fi ODS / API v3.x releases. This means there are no new Assessment API changes accompanying this release.

### MetaEd IDE v2.3.0
Implementing extensions in ODS / API v5.0.0 requires implementers to update to MetaEd IDE v2.3.0 or higher.

### Teacher Preparation Data Model
The Ed-Fi ODS / API v5.0.0 implements TPDM v0.8 as an optional domain extension. Teacher preparation providers can use this extension to base program improvements on how their graduates perform in the classroom rather than on general or anecdotal evidence. Note that TPDM expands the fields required to implement credentials. With TPDM enabled, credential additionally requires a certification title and the use of the person model. More details on person model can be found at [/wiki/spaces/TPDMDEV/pages/23038581](https://edfi.atlassian.net/wiki/spaces/TPDMDEV/pages/23038581). This extension is deployed by default in Ed-Fi ODS / API v5.0.0.

### Additional Support for PostgreSQL-Backed ODS / API
The previous ODS / API v3.4 release brought ODS / API PostgreSQL support to parity with Ed-Fi ODS / API cloud offering with the following scope of features:

* Core API
* Swagger UI
* Enrollment Composite
* Change Query

This release brings a few more significant additions:

* Sandboxing
* TPDM domain Extension
* Full code generation support

### Authorization Enhancements
ODS / API v5.0.0 brings several enhancements to API authorization. Significant changes include:

* **API clients can be associated with different education organization types.** In previous versions, it was required for client system developers to use different key/secret pairs to load data related to different ed-org types. This can now can be accomplished with one key/secret pair.
* **API clients can be associated with multiple namespace prefixes.** The namespace prefix assigned to a solution provider is used to authorize access to create, update, and delete descriptors, as well as to create, read, update, and delete Assessment-related data, Learning Standards, Learning Objectives, and Education Content. In previous versions, vendors had less flexibility in working with learning standard namespaces and managed descriptor namespaces due to lack of authorization support for multiple namespace prefixes. See [Descriptor Guidance](https://edfi.atlassian.net/wiki/spaces/EFDS32/pages/20187680/Descriptor+Guidance) for information on how to access data by associating key/secret pairs with appropriate namespace prefixes.
* **API Clients can use an OAuth token introspection endpoint to view security configuration information for the token.** The endpoint aligns with the IETF [RFC 7662](https://tools.ietf.org/html/rfc7662#section-2) specification.

### Bulk Load Client Enhancements and Removal of Server-Side Bulk Load
With the ODS / API v3.3 release, the Alliance announced deprecation of server-side bulk loading of XML files. This release fully removes the server-side bulk load. Implementers who need to bulk load XML data can use the [Bulk Load Client](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V500/pages/18350241/Bulk+Load+Client+Utility) Utility which has been enhanced with modifications to use the Dependency endpoint instead of the less-reliable InterchangeOrderMetadata. The latest utility also contains performance improvements, detailed error logging, XML validation configurations, and more.

### Apache License
In April 2020, the Ed-Fi Alliance [announced](https://www.ed-fi.org/blog/2020/04/ed-fi-opens-the-door-to-move-from-hundreds-to-hundreds-of-millions) a move to the [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0) to lower the barrier to entry for EdTech vendors, universities, school districts, and states, and to encourage continued community contribution to the technology. This release delivers on that promise and moves the source code to https://github.com/Ed-Fi-Alliance-OSS/ under the Apache license. The [Ed-Fi License](https://license.ed-fi.org/license-form/) is no longer required to access ODS / API source code.

### Semantic Versioning
In May 2020, Ed-Fi [announced](https://www.ed-fi.org/blog/2020/05/open-source-and-new-versioning/) adapting [semantic versioning](https://semver.org/) for Data Standard and ODS / API. This release is identified as ODS / API for Suite 3 v5.0.0. Releases packages for this release reflect this change by adding the Ed-Fi Suite number to the package name, along with the semantic version number for the release.