---
description: What's new in previous v6x releases
---

# What's New In Previous v6.x Releases 

This documentation provides a summary overview of the major improvements, updates, fixes, and changes made in previous releases of the Ed-Fi ODS / API v6.x suite of releases and provides links to additional documentation.

## Improvements & Enhancements - Version v6.1
### Data Model Changes
ODS / API v6.1 implements Ed-Fi [Data Standard v4.0](/reference/data-exchange/data-standard/4/), which brings minor changes that are intended to be non-breaking to most API clients. Even though there are no breaking changes between Ed-Fi Data Standard v4.0 and the previous Ed-Fi Data Standard v4.0-a, Ed-Fi Data Standard v4.0-a introduced some breaking changes to the core data model for domains commonly used by student information systems (e.g., the Grade & Gradebook entities), assessment systems, and finance systems. Implementers are advised to review the changes carefully. Refer to [What's New - v4.0](/reference/data-exchange/data-standard/4/whats-new/whats-new-v40) for details. Platform hosts should also be aware that there are database changes and changes to build and deployment pipelines in the previous ODS / API v6.x release.

### GitHub Action Builds
ODS / API v6.1 release provides continuous integration (CI) directly in the source code repositories via GitHub Actions. Previously, build infrastructure was configured via an on-premises TeamCity server behind a VPN. Apart from moving to infrastructure as code, this change brings cost savings to API hosts who currently maintain infrastructure for running the builds by providing free GitHub hosted virtual machines to run the builds. This change also allows transparency to code contributors by providing details on the builds and build failures. See the builds in action in the following repository links:

- [Ed-Fi-ODS/actions](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/actions)
- [Ed-Fi-ODS-Implementation/actions](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/actions)

### PowerShell 7 Upgrade
The ODS / API source code repositories contain PowerShell scripts that are useful for development, build, and deployment of the ODS / API components. In previous releases, these PowerShell scripts required PowerShell 5.0 and Windows environments for execution. The ODS / API v6.1 release upgrades these PowerShell scripts to PowerShell 7.0, an open-source cross-platform edition of PowerShell while maintaining backward compatibility with PowerShell 5.0. This release also includes modifications for running the scripts on a Unix-like environment. With this change, ODS / API supports cross-platform build environments along with cross-platform runtime environments. 

### MetaEd IDE v3.2
Implementing extensions in ODS / API v6.1 requires implementers to update to MetaEd IDE v3.2 or higher.

## Improvements & Enhancements - Version v6.0
Data Model Changes
ODS / API v6.0 implements Ed-Fi Data Standard v4.0-a, which introduces important updates to the core data model for domains commonly used by student information systems (e.g., the Grade & Gradebook entities), assessment systems, and finance systems. There are breaking changes in these domains, so implementers are advised to review the changes carefully. Other areas of the model have received minor, non-breaking updates. Platform hosts should also be aware that there are database changes and changes to build and deployment pipelines.

### Enhancements to Change Queries Delete Tracking
The ODS / API tracks inserts, updates, and deletes. The ODS/API surfaces those changes to client systems through a feature called "changed record queries." This feature allows client systems to narrow requests for data to only data that has changed since a specified point in time, which enables clients to stay in sync with the ODS / API without having to pull a complete data set. This release provides additive changes to address shortcomings identified by field implementations related to delete tracking and key changes, specially in ODS to ODS sync scenarios. 

### Combining Authorization Strategies
In previous releases of the ODS / API, each resource action could be configured to use a specific authorization strategy. Recently, use cases have emerged where vendors need access both to enrolled student access and special cases of unenrolled student access.  In previous implementations, such support meant code changes and authorization-related view changes.  

Ed-Fi ODS / API v6.0 allows combining authorization strategies for a resource action so that an API client can access the resource when any one of the configured authorization strategies satisfy. Platform hosts should be aware that there are schema changes to EdFi_Security database related to this feature. 

### Ownership Based Authorization
The Ed-Fi ODS / API primarily uses a relationship-based authorization strategy based on education organizations. While relationship-based authorization strategy is sufficient for most of the implementations, use cases have emerged in the field that require more granular access control. 

In this release, the Ed-Fi ODS / API adds ownership-based authorization that can be used in additional scenarios. When enabled, this authorization strategy authorizes access to individual resources based on the concept of “ownership." An API caller has an associated "Ownership Token" that is captured with each resource the caller creates. The API caller's claims information also includes a list of "Ownership Tokens" that can be used to identify which resource items they currently "own," and the authorization process will filter results for matching an "Ownership Token" value stored with the resources. 

### Support For External Cache
The ODS / API uses in-memory caching for descriptors, person-USI-to-Unique-Id mapping and API client details used for authorization, which improves API performance by avoiding additional database calls. However this increases memory requirements, and in large implementations a cache can take up several gigabytes. Implementations running the Ed-Fi ODS / API on containers, scaling up API containers based on resource utilization means a repeated in-memory cache on each instance. In addition, with individual API instances maintaining their own in-memory cache, caches can get out of sync.

The ODS / API v6.0 release provides an optional feature for using external distributed cache service (Redis), so that the resources that are currently cached per Ed-Fi API instance can be shared on a distributed cache server. Refer to [How To: Use an External Cache Provider for the Ed-Fi API](../how-to-guides/how-to-use-an-external-cache-provider-for-the-ed-fi-api.md) for details on how to enable external caching and how to choose external or in-memory caching for specific cache data. 

### .NET 6, SQL Server 2019, PostgreSQL 13 Upgrade 
The ODS / API v6.0 has been upgraded to use .NET 6 and will require Visual Studio 2022 as a development environment. The code has been tested with Microsoft SQL Server 2019 and PostgreSQL 13 databases and the sample databases that ship with ODS / API are compatible with the above mentioned database server versions. 

### MetaEd IDE v3.1
Implementing extensions in ODS / API v6.0 requires implementers to update to MetaEd IDE v3.1 or higher.