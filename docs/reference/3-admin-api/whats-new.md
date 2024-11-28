# What's New

This section provides an overview of what's new in the latest versions of the
Admin API.

## Updates in Admin API v2.2 (Latest Release)

Please see the [direct source code updates to Admin API v2.2 on GitHub
here](https://github.com/Ed-Fi-Alliance-OSS/AdminAPI-2.x/releases/tag/v2.2.0).

**.NET 8 Upgrade**

* ADMINAPI-983 - Admin API 2.2 includes a technology upgrade from .NET 6 to .NET 8 for long-term
support. 

**An error is thrown in the response instead of a warning message when
registration is disabled**

* ADMINAPI-755 - A better response message is now shown to the application end registration is
disabled.

**Change Docker check to see if PostgreSQL is ready**

* ADMINAPI-982 - A field recommendation was implemented to improve checking if PostgreSQL is
ready or not. 

**Using Authority Setting for JWT Issuer (Admin API 2)**

* ADMINAPI-1006 - An update has been made to change the JWT token Admin API uses.

**Swagger UI - Fix issue with displaying recursive type**

* ADMINAPI-32 - A data type issue has been resolved in the Swagger definition metadata for
testing.

**Dockerfile improvements and documentation**

* ADMINAPI-989 - Updates to Dockerfile for better library reference and new README.md for the
Docker repository.

**Updated GitHub Actions and build steps**

* ADMINAPI-977 - Admin API 2.2 build steps have been updates.

**C# Improvements**

* ADMINAPI-1004 - SonarLint has been integrated for better code quality in Admin API.

## Updates in Admin API v2.1

**ODS/API 7.1 Support**

Admin API 2.1 supports ODS / API 7.1.

**Multi-tenancy Updates**

* ADMINAPI-339 - Admin API 2.1 now has multi-tenancy support for managing ODS / API 7 tenants in
at-scale configurations.

**API Best Practice Updates**

* ADMINAPI-765 - From a review of API best practices and the Admin API product, the following
updates have been made for session expiration, password complexity and rate
limiting to provide additional options to control access and suit local
implementation policy.

**Admin API POST application makes new incorrect rows in dbo.users table**

* ADMINAPI-959 - A field reported issue has been and updated within Admin API 2.1.

**Use GitHub Action from Docker Scout to analyze docker images**

* ADMINAPI-776 - Docker Scout has been enabled for our Docker images for better awareness of
alerts at the image level.

## Updates in Admin API v2.0

**ODS/API 7.0 Single-Line Product Support**

* ADMINAPI-315 -Admin API 2.0 only supports ODS / API 7.0.  In Admin API 1.x, we continue to
support ODS/API 3.4 through 6.1.

**ODS / API 7.x Multi-Instance Support**

* ADMINAPI-101 - ODS / API 7.0 is a major platform upgrade with many features driven from various
field scans reviews and forums.  This led to a major design and platform
upgrade, please see [Multi-Tenancy, Deployment Modes,
Routing](https://edfi.atlassian.net/wiki/spaces/EFTD/pages/24807328/Multi-Tenancy%2C+Deployment+Modes%2C+Routing)
for more details into the ODS / API 7 upgrades.  ODS/API 7 contains new database
tables for ODS instance management, such as the OdsInstances,
OdsInstanceDerivatives and OdsInstanceContexts tables, which Admin API 2.0
provides endpoints to manage metadata for these instances.  Admin API 2.0 does
not create or delete physical instances, only the information for active ODS /
API 7.0 instances within an Ed-Fi environment.

**Claimset Enhancements for API-based Handling**

* ADMINAPI-350 -Admin API 2.0 has new API endpoints to allow for a workflow-based setup of
claimset management for an ODS / API 7 instance.  The JSON large-format
functionality has been moved to new `/import` and `/export` API endpoints to
support backup and migrate operations with claimset metadata.

**Dynamic Profile Support**

* ADMINAPI-340 - ODS / API 7 brings a new feature for management of dynamic profiles, relying on
the database instead of source code required updates in prior ODS / API lines.
Admin API 2.0 allows for the updates via API new `/profile` endpoints.

**Changing Ed Org Id Leaves a Record Behind**

* ADMINAPI-767 - A bug was discovered where changing an education organization identifier leaves
behind additional data affecting ed org hierarches and data access.  The Admin
API 2.0.1 update resolves the issue for this use case.

## Updates in Admin API v1.4

**.NET 8 Upgrade for Admin API 1**

* ADMINAPI-91 - [Admin API
1.4](https://edfi.atlassian.net/wiki/pages/viewpage.action?pageId=21300811) has
been updated to .NET 8 for performance, security and other updates.

**Swagger UI - Fix issue with displaying recursive type**

* ADMINAPI-32 - Swagger UI is not displaying the proper type description (with properties) on
recursive types. On the screen shot below - the children are collection of
"ResourceClaim" type. But it is showing array of string.

**Dockerfile improvements and documentation**

* ADMINAPI-989 - Various updates for better Dockerfile usage and documentation, including
improving security by running the application as a non-root user.

## Updates in Admin API v1.3

**Refactor Admin API for Clean Separation**

* ADMINAPI-91 - Admin API 1.3 has been refactored for more separation from Admin App, which was
originally the development base for Admin API.

** Return Vendor and Profile IDs in /applications Endpoints**

* ADMINAPI-311 - A field report requested that vendor and profile IDs should be returned as part
of the /applications endpoint, which has now been included in Admin API 1.3.

**Update System.Data.SqlClient to Microsoft.Data.SqlClient**

* ADMINAPI-47 - Due to a recommendation from Microsoft, we have updated the data access library
to use Microsoft.Data.SqlClient instead of System.Data.SqlClient.

**Disable Shell Debug Messages in Docker**

* ADMINAPI-86 - A field report requested to repress logging of certain elements in Docker
configurations.

**Changing Ed Org Id Leaves a Record Behind**

* ADMINAPI-767 - A bug was discovered where changing an education organization identifier leaves
behind additional data affecting ed org hierarches and data access.  The Admin
API 1.3.1 update resolves the issue for this use case.

**Other Updates**

Other technical product updates, such as consolidating namespaces and library
renaming, have also been included in this update.  Please see the [Admin API
1.3](https://tracker.ed-fi.org/projects/ADMINAPI/versions/15500#release-report-tab-body)
release report for full details.

**Bug Fixes in Admin API 1.3.2**

*
  * ADMINAPI-705 - Expand EdOrgs to return as an array instead of single value
  * ADMINAPI-743 - Claimset endpoint inconsistencies, fix to enable ODS/API v6 updates
  is created anyway
  * ADMINAPI-747 - When the number of nulls sent in 'authStrategyOverridesForCRUD' is not the
  same as in 'ResourceClaims' the application throws an error but the ClaimSets
  * ADMINAPI-766 - Refactor ODS Security version resolver implementation
  * ADMINAPI-777 - ReadChanges action not returned in AdminAPI 1.3.1 for ODS/API 5.3-cqe
  dbo.users table
  * ADMINAPI-949 - Admin API 1.3.2 - Admin API POST application makes new incorrect rows in
  * ADMINAPI-962 - AdminApi - docker scout vulnerability list
  * ADMINAPI-963 - Using53Cqe=true does not return auth strategy overrides for that action

## Updates in Admin API v1.2

**Multiple Security Model / ODS Version Support**

The ODS/API Platform has two different security models in versions 3.4-5.3 and
6.0-6.1.  This version of Admin API supports both versions of that security
model with the same operation endpoints for management via API (ODS/API v3.4-5.3
and v6.0-v6.1 and future versions may be supported).

## Updates in Admin API v1.1

**Claim Sets**

Admin API v1.1 provides support to importing and exporting claim sets via API.
Admin API is available as both a standalone installation under IIS and as a
Docker deployment.  Admin API v1.1 supports ODS/API v3.4 to v5.3.

## Updates in Admin API v1.0

**Initial Release**

This is the initial release of Admin API v1.0.  It provides functionality to
create vendors, applications, and credentials within an Ed-Fi ODS / API Platform
instance. Admin API is available as both a standalone installation under IIS and
as a Docker deployment.
