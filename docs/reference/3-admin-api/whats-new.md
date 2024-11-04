# What's New

This section provides an overview of what's new in the latest versions of the Admin API.

**Contents**

*   [Updates in Admin API v2.2 (Latest Release)](#updates-in-admin-api-v22-latest-release)
*   [Updates in Admin API v2.1](#updates-in-admin-api-v21)
*   [Updates in Admin API v2.0](#updates-in-admin-api-v20)
*   [Updates in Admin API v1.4](#updates-in-admin-api-v14)
*   [Updates in Admin API v1.3](#updates-in-admin-api-v13)
*   [Updates in Admin API v1.2](#updates-in-admin-api-v12)
*   [Updates in Admin API v1.1](#updates-in-admin-api-v11)
*   [Updates in Admin API v1.0](#updates-in-admin-api-v10)

# Updates in Admin API v2.2 (Latest Release)

Please see the [direct source code updates to Admin API v2.2 on GitHub here](https://github.com/Ed-Fi-Alliance-OSS/AdminAPI-2.x/releases/tag/v2.2.0).

**.NET 8 Upgrade**

Admin API 2.2 includes a technology upgrade from .NET 6 to .NET 8 for long-term support.    [ADMINAPI-983](https://tracker.ed-fi.org/browse/ADMINAPI-983) - Getting issue details... STATUS

**An error is thrown in the response instead of a warning message when registration is disabled**

A better response message is now shown to the application end registration is disabled.    [ADMINAPI-755](https://tracker.ed-fi.org/browse/ADMINAPI-755) - Getting issue details... STATUS

**Change Docker check to see if PostgreSQL is ready**

A field recommendation was implemented to improve checking if PostgreSQL is ready or not.    [ADMINAPI-982](https://tracker.ed-fi.org/browse/ADMINAPI-982) - Getting issue details... STATUS

**Using Authority Setting for JWT Issuer (Admin API 2)**

An update has been made to change the JWT token Admin API uses.    [ADMINAPI-1006](https://tracker.ed-fi.org/browse/ADMINAPI-1006) - Getting issue details... STATUS

**Swagger UI - Fix issue with displaying recursive type**

A data type issue has been resolved in the Swagger definition metadata for testing.   [ADMINAPI-32](https://tracker.ed-fi.org/browse/ADMINAPI-32) - Getting issue details... STATUS

**Dockerfile improvements and documentation**

Updates to Dockerfile for better library reference and new README.md for the Docker repository.   [ADMINAPI-989](https://tracker.ed-fi.org/browse/ADMINAPI-989) - Getting issue details... STATUS

**Updated GitHub Actions and build steps**

Admin API 2.2 build steps have been updates.    [ADMINAPI-977](https://tracker.ed-fi.org/browse/ADMINAPI-977) - Getting issue details... STATUS

**C# Improvements**

SonarLint has been integrated for better code quality in Admin API.    [ADMINAPI-1004](https://tracker.ed-fi.org/browse/ADMINAPI-1004) - Getting issue details... STATUS

# Updates in Admin API v2.1

**ODS/API 7.1 Support**

Admin API 2.1 supports ODS / API 7.1.

**Multi-tenancy Updates**

Admin API 2.1 now has multi-tenancy support for managing ODS / API 7 tenants in at-scale configurations.    [ADMINAPI-339](https://tracker.ed-fi.org/browse/ADMINAPI-339) - Getting issue details... STATUS

**API Best Practice Updates**

From a review of API best practices and the Admin API product, the following updates have been made for session expiration, password complexity and rate limiting to provide additional options to control access and suit local implementation policy.    [ADMINAPI-765](https://tracker.ed-fi.org/browse/ADMINAPI-765) - Getting issue details... STATUS

**Admin API POST application makes new incorrect rows in dbo.users table**

A field reported issue has been and updated within Admin API 2.1.    [ADMINAPI-959](https://tracker.ed-fi.org/browse/ADMINAPI-959) - Getting issue details... STATUS

**Use GitHub Action from Docker Scout to analyze docker images**

Docker Scout has been enabled for our Docker images for better awareness of alerts at the image level.  [ADMINAPI-776](https://tracker.ed-fi.org/browse/ADMINAPI-776) - Getting issue details... STATUS

# Updates in Admin API v2.0

**ODS/API 7.0 Single-Line Product Support**

Admin API 2.0 only supports ODS / API 7.0.  In Admin API 1.x, we continue to support ODS/API 3.4 through 6.1.  [ADMINAPI-315](https://tracker.ed-fi.org/browse/ADMINAPI-315) - Getting issue details... STATUS

### ODS / API 7.x Multi-Instance Support

ODS / API 7.0 is a major platform upgrade with many features driven from various field scans reviews and forums.  This led to a major design and platform upgrade, please see [Multi-Tenancy, Deployment Modes, Routing](https://edfi.atlassian.net/wiki/spaces/EFTD/pages/24807328/Multi-Tenancy%2C+Deployment+Modes%2C+Routing) for more details into the ODS / API 7 upgrades.  ODS/API 7 contains new database tables for ODS instance management, such as the OdsInstances, OdsInstanceDerivatives and OdsInstanceContexts tables, which Admin API 2.0 provides endpoints to manage metadata for these instances.  Admin API 2.0 does not create or delete physical instances, only the information for active ODS / API 7.0 instances within an Ed-Fi environment.   [ADMINAPI-101](https://tracker.ed-fi.org/browse/ADMINAPI-101) - Getting issue details... STATUS

### Claimset Enhancements for API-based Handling

Admin API 2.0 has new API endpoints to allow for a workflow-based setup of claimset management for an ODS / API 7 instance.  The JSON large-format functionality has been moved to new `/import` and `/export` API endpoints to support backup and migrate operations with claimset metadata.   [ADMINAPI-350](https://tracker.ed-fi.org/browse/ADMINAPI-350) - Getting issue details... STATUS

### Dynamic Profile Support

ODS / API 7 brings a new feature for management of dynamic profiles, relying on the database instead of source code required updates in prior ODS / API lines. Admin API 2.0 allows for the updates via API new `/profile` endpoints.  [ADMINAPI-340](https://tracker.ed-fi.org/browse/ADMINAPI-340) - Getting issue details... STATUS

### Changing Ed Org Id Leaves a Record Behind

A bug was discovered where changing an education organization identifier leaves behind additional data affecting ed org hierarches and data access.  The Admin API 2.0.1 update resolves the issue for this use case.    [ADMINAPI-767](https://tracker.ed-fi.org/browse/ADMINAPI-767) - Getting issue details... STATUS

# Updates in Admin API v1.4 

### .NET 8 Upgrade for Admin API 1

[Admin API 1.4](https://edfi.atlassian.net/wiki/pages/viewpage.action?pageId=21300811) has been updated to .NET 8 for performance, security and other updates.    [ADMINAPI-91](https://tracker.ed-fi.org/browse/ADMINAPI-91) - Getting issue details... STATUS  

### Swagger UI - Fix issue with displaying recursive type

Swagger UI is not displaying the proper type description (with properties) on recursive types. On the screen shot below - the children are collection of "ResourceClaim" type. But it is showing array of string.    [ADMINAPI-32](https://tracker.ed-fi.org/browse/ADMINAPI-32) - Getting issue details... STATUS

### Dockerfile improvements and documentation

Various updates for better Dockerfile usage and documentation, including improving security by running the application as a non-root user.    [ADMINAPI-989](https://tracker.ed-fi.org/browse/ADMINAPI-989) - Getting issue details... STATUS

# Updates in Admin API v1.3 

### Refactor Admin API for Clean Separation

Admin API 1.3 has been refactored for more separation from Admin App, which was originally the development base for Admin API.    [ADMINAPI-91](https://tracker.ed-fi.org/browse/ADMINAPI-91) - Getting issue details... STATUS

**  
Return Vendor and Profile IDs in /applications Endpoints**

A field report requested that vendor and profile IDs should be returned as part of the /applications endpoint, which has now been included in Admin API 1.3.

 [ADMINAPI-311](https://tracker.ed-fi.org/browse/ADMINAPI-311) - Getting issue details... STATUS

  

**Update System.Data.SqlClient to Microsoft.Data.SqlClient**

Due to a recommendation from Microsoft, we have updated the data access library to use Microsoft.Data.SqlClient instead of System.Data.SqlClient.  [ADMINAPI-47](https://tracker.ed-fi.org/browse/ADMINAPI-47) - Getting issue details... STATUS

**Disable Shell Debug Messages in Docker**

A field report requested to repress logging of certain elements in Docker configurations.  [ADMINAPI-86](https://tracker.ed-fi.org/browse/ADMINAPI-86) - Getting issue details... STATUS

### Changing Ed Org Id Leaves a Record Behind

A bug was discovered where changing an education organization identifier leaves behind additional data affecting ed org hierarches and data access.  The Admin API 1.3.1 update resolves the issue for this use case.    [ADMINAPI-767](https://tracker.ed-fi.org/browse/ADMINAPI-767) - Getting issue details... STATUS

**Other Updates**

Other technical product updates, such as consolidating namespaces and library renaming, have also been included in this update.  Please see the [Admin API 1.3](https://tracker.ed-fi.org/projects/ADMINAPI/versions/15500#release-report-tab-body) release report for full details.

**Bug Fixes in Admin API 1.3.2**

*   Expand EdOrgs to return as an array instead of single value  [ADMINAPI-705](https://tracker.ed-fi.org/browse/ADMINAPI-705) - Getting issue details... STATUS
*   Claimset endpoint inconsistencies, fix to enable ODS/API v6 updates  [ADMINAPI-743](https://tracker.ed-fi.org/browse/ADMINAPI-743) - Getting issue details... STATUS
*   When the number of nulls sent in 'authStrategyOverridesForCRUD' is not the same as in 'ResourceClaims' the application throws an error but the ClaimSets is created anyway  [ADMINAPI-747](https://tracker.ed-fi.org/browse/ADMINAPI-747) - Getting issue details... STATUS
*   Refactor ODS Security version resolver implementation  [ADMINAPI-766](https://tracker.ed-fi.org/browse/ADMINAPI-766) - Getting issue details... STATUS
*   ReadChanges action not returned in AdminAPI 1.3.1 for ODS/API 5.3-cqe  [ADMINAPI-777](https://tracker.ed-fi.org/browse/ADMINAPI-777) - Getting issue details... STATUS
*   Admin API 1.3.2 - Admin API POST application makes new incorrect rows in dbo.users table  [ADMINAPI-949](https://tracker.ed-fi.org/browse/ADMINAPI-949) - Getting issue details... STATUS
*   AdminApi - docker scout vulnerability list  [ADMINAPI-962](https://tracker.ed-fi.org/browse/ADMINAPI-962) - Getting issue details... STATUS
*   Using53Cqe=true does not return auth strategy overrides for that action  [ADMINAPI-963](https://tracker.ed-fi.org/browse/ADMINAPI-963) - Getting issue details... STATUS

# Updates in Admin API v1.2

### Multiple Security Model / ODS Version Support

The ODS/API Platform has two different security models in versions 3.4-5.3 and 6.0-6.1.  This version of Admin API supports both versions of that security model with the same operation endpoints for management via API (ODS/API v3.4-5.3 and v6.0-v6.1 and future versions may be supported).

# Updates in Admin API v1.1

### Claim Sets

Admin API v1.1 provides support to importing and exporting claim sets via API. Admin API is available as both a standalone installation under IIS and as a Docker deployment.  Admin API v1.1 supports ODS/API v3.4 to v5.3.

# Updates in Admin API v1.0

### Initial Release

This is the initial release of Admin API v1.0.  It provides functionality to create vendors, applications, and credentials within an Ed-Fi ODS / API Platform instance. Admin API is available as both a standalone installation under IIS and as a Docker deployment.