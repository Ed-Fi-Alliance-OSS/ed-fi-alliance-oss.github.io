# What's New

This section provides an overview of what's new in the latest versions of the
Admin API.

## Updates in Admin API v2.4.0 (Latest Release)

Admin API v2.4 improves how administrators manage credentials, education
organizations, and database instances, and adds a new `v3` API mode alongside
the existing v1 and v2 modes.

### Breaking Changes

The `v3` mode is new in this release, so nothing about it can break an existing
integration. The items below affect v1 and v2 deployments and need attention
before you upgrade.

* **Keycloak is no longer supported.** Signing in through an external identity provider has been removed, along with the IdP Docker Compose files, the `env-idp.example` templates, and the matching installer options. A deployment using Keycloak must move to Admin API's built-in sign-in first. There is no in-place upgrade path.
* **.NET 10 is required.** Install the .NET 10 runtime on every application host before upgrading. .NET 8 is no longer supported.
* **The API clients endpoint is now spelled `apiClients`.** The all-lowercase `apiclients` spelling no longer resolves. Update any script or integration that calls it.
* **Instance management endpoints moved** to `/v2/odsInstances/manage`.
* **Some education organization endpoints were removed**, including `/odsInstances/edOrgs` and the older "list by instance" and "list by data store" endpoints. Use the current education organization endpoints instead.
* **Refreshing education organizations is now asynchronous.** The request returns `202 Accepted` to say the work has been queued instead of waiting for it to finish. Use the new job status endpoints to see the result.
* **Some `400 Bad Request` responses are now `409 Conflict`.** A request that refers to a record that doesn't exist, or uses a duplicate API client name, returns `409`. Resetting credentials for an application with no API clients also returns `409`.
* **Database instance names are limited to 46 characters.** Admin API builds the database name from the name you supply, and the finished name has to fit a 63-character limit. This applies when creating an instance; existing instances are unaffected.

### Features

* **A new `v3` API mode.** `v3` implements the Management API v3 specification, the same specification used by the Ed-Fi Configuration Management Service. It is offered alongside v1 and v2, which are unchanged, so you can adopt it when you are ready. An instance serves one mode at a time: set `AppSettings:adminApiMode` to `v1`, `v2` or `v3`, and a request to a path that does not match the configured mode is rejected with `400 Bad Request`. When the setting is absent the mode is `v2`. Within `v3`:
  * _Data stores_ replace _ODS instances_ as the name for a database an application reads from and writes to.
  * Errors follow the RFC 9457 Problem Details format, returning a structured body instead of a plain message.
  * The API clients resource no longer carries `UseSandbox` or `SandboxType`. These recorded whether a credential pointed at a sandbox — a practice environment vendors use with non-production data — which Admin API no longer sets. The `key` field is now named `clientId`.
  * Claim set payloads use a single flat shape.
  * A created resource returns a full URL in its `Location` header.
  * Connection strings are encrypted and are no longer returned in API responses.
* **API clients can be limited to specific education organizations.** A credential can now cover a subset of its application's education organizations rather than all of them.
* **An application can be created without a default set of credentials.** Multiple credentials per application arrived in 2.3; this release removes the requirement that an application start with one, so credentials can be created deliberately per integration.
* **Database instances are created and deleted in the background.** Provisioning from a database template no longer blocks the request.
* **Job status tracking for long-running operations**, such as instance provisioning and education organization refreshes.
* **Audit logging covers more of the application**, spanning authentication events and administrative actions. Entries now record tenant and outcome, and a deletion records which record was removed so the trail stays readable afterwards.
* **A new `/tenancy` endpoint and a fuller `GET /` response.** The Information endpoint reports the active specification version in a new `SpecificationVersion` field and links to tenancy information and the OpenAPI metadata.
* **`GET /v2/tenants` and `GET /v2/tenants/{tenantName}` are available again.**
* **A new `EnableDataStoreManagement` setting** turns instance management off entirely, for deployments that provision databases another way.
* **Duplicate names are rejected** for vendors, applications, and API clients in the `v3` mode.
* **Education organization endpoints report what each instance contains.** You can view the education organizations in each ODS instance, kept up to date automatically or refreshed on demand.
* **Education organization responses include `dbInstanceId`.**

### Enhancements

* Critical and high findings from the security review have been addressed.
* Stored connection strings are encrypted, including ones found unencrypted when read.
* PostgreSQL images are now built on a Docker Hardened Image.
* DbDeploy upgraded to 4.3.2.
* Fixes released in Admin API 2.3.1 are carried forward into this release.
* Dependency versions are locked for reproducible builds, and compiler warnings are treated as errors.
* API specifications now come from the specification repository rather than being maintained alongside the code.

### Bug Fixes

* Fixed an audit log error in multi-tenant configurations.
* Fixed editing an application that has no API clients or more than one.
* Fixed the duplicate-name message returned when updating a data store or ODS instance.
* Fixed an installation error when IIS hosts multiple websites.
* Fixed endpoints that were not returning every instance or data store.
* Fixed the education organization refresh endpoints.
* Restored database initialization script scanning in the `ods-admin-api-db` container.
* Corrected inaccurate Swagger/OpenAPI documentation.

## Updates in Admin API v2.3.2

### Bug Fix

* When creating additional credentials for an application, each credential now honors the enabled or disabled value in the request payload instead of always defaulting to enabled.

### Enhancements

* Replaced AutoMapper with static C# mapper classes.

## Updates in Admin API v2.3

### Features

* Tenant endpoints on V2 `/v2/tenants`: new read-only and management endpoints.
* Support for multiple credentials per application.
* Updated OpenAPI specifications for v2.3.0.
* Docker images now built and published for ARM processors.
* Supports both ODS/API 6.x and 7.x.

### Enhancements

* Improved Dockerfiles and connection string handling.
* Security updates: .NET vulnerabilities remediated, upgraded to .NET 8.0.21.
* Logging improvements: fixed double logging, improved configuration logging.
* Installer workflow improvements.
* Claimset import now includes grandchild ResourceClaims.
* Profile endpoint returns clear 400 error for invalid input.
* Improved log4net initialization for cross-platform compatibility.
* Improved health check endpoint `/health` for Security and Admin databases availableness.

## Updates in Admin API v2.2

Please see the [direct source code updates to Admin API v2.2 on GitHub
here](https://github.com/Ed-Fi-Alliance-OSS/AdminAPI-2.x/releases/tag/v2.2.0).

### .NET 8 Upgrade

* ADMINAPI-983 - Admin API 2.2 includes a technology upgrade from .NET 6 to .NET 8 for long-term
support.

### An error is thrown in the response instead of a warning message when registration is disabled

* ADMINAPI-755 - A better response message is now shown to the application end registration is
disabled.

### Change Docker check to see if PostgreSQL is ready

* ADMINAPI-982 - A field recommendation was implemented to improve checking if PostgreSQL is
ready or not.

### Using Authority Setting for JWT Issuer (Admin API 2)

* ADMINAPI-1006 - An update has been made to change the JWT token Admin API uses.

### Swagger UI - Fix issue with displaying recursive type

* ADMINAPI-32 - A data type issue has been resolved in the Swagger definition metadata for
testing.

### Dockerfile improvements and documentation

* ADMINAPI-989 - Updates to Dockerfile for better library reference and new README.md for the
Docker repository.

### Updated GitHub Actions and build steps

* ADMINAPI-977 - Admin API 2.2 build steps have been updates.

### C# Improvements

* ADMINAPI-1004 - SonarLint has been integrated for better code quality in Admin API.

## Updates in Admin API v2.1

### ODS/API 7.1 Support

Admin API 2.1 supports ODS / API 7.1.

### Multi-tenancy Updates

* ADMINAPI-339 - Admin API 2.1 now has multi-tenancy support for managing ODS / API 7 tenants in
at-scale configurations.

### API Best Practice Updates

* ADMINAPI-765 - From a review of API best practices and the Admin API product, the following
updates have been made for session expiration, password complexity and rate
limiting to provide additional options to control access and suit local
implementation policy.

### Admin API POST application makes new incorrect rows in dbo.users table

* ADMINAPI-959 - A field reported issue has been and updated within Admin API 2.1.

### Use GitHub Action from Docker Scout to analyze docker images

* ADMINAPI-776 - Docker Scout has been enabled for our Docker images for better awareness of
alerts at the image level.

## Updates in Admin API v2.0

### ODS/API 7.0 Single-Line Product Support

* ADMINAPI-315 -Admin API 2.0 only supports ODS / API 7.0.  In Admin API 1.x, we continue to
support ODS/API 3.4 through 6.1.

### ODS / API 7.x Multi-Instance Support

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

### Claimset Enhancements for API-based Handling

* ADMINAPI-350 -Admin API 2.0 has new API endpoints to allow for a workflow-based setup of
claimset management for an ODS / API 7 instance.  The JSON large-format
functionality has been moved to new `/import` and `/export` API endpoints to
support backup and migrate operations with claimset metadata.

### Dynamic Profile Support

* ADMINAPI-340 - ODS / API 7 brings a new feature for management of dynamic profiles, relying on
the database instead of source code required updates in prior ODS / API lines.
Admin API 2.0 allows for the updates via API new `/profile` endpoints.

### Changing Ed Org Id Leaves a Record Behind

* ADMINAPI-767 - A bug was discovered where changing an education organization identifier leaves
behind additional data affecting ed org hierarches and data access.  The Admin
API 2.0.1 update resolves the issue for this use case.

## Updates in Admin API v1.4

### .NET 8 Upgrade for Admin API 1

* ADMINAPI-91 - [Admin API
1.4](https://edfi.atlassian.net/wiki/pages/viewpage.action?pageId=21300811) has
been updated to .NET 8 for performance, security and other updates.

### Swagger UI - Fix issue with displaying recursive type v1.4

* ADMINAPI-32 - Swagger UI is not displaying the proper type description (with properties) on
recursive types. On the screen shot below - the children are collection of
"ResourceClaim" type. But it is showing array of string.

### Dockerfile improvements and documentation v1.4

* ADMINAPI-989 - Various updates for better Dockerfile usage and documentation, including
improving security by running the application as a non-root user.

## Updates in Admin API v1.3

### Refactor Admin API for Clean Separation

* ADMINAPI-91 - Admin API 1.3 has been refactored for more separation from Admin App, which was
originally the development base for Admin API.

### Return Vendor and Profile IDs in /applications Endpoints

* ADMINAPI-311 - A field report requested that vendor and profile IDs should be returned as part
of the /applications endpoint, which has now been included in Admin API 1.3.

### Update System.Data.SqlClient to Microsoft.Data.SqlClient

* ADMINAPI-47 - Due to a recommendation from Microsoft, we have updated the data access library
to use Microsoft.Data.SqlClient instead of System.Data.SqlClient.

### Disable Shell Debug Messages in Docker

* ADMINAPI-86 - A field report requested to repress logging of certain elements in Docker
configurations.

### Changing Ed Org Id Leaves a Record Behind v1.3

* ADMINAPI-767 - A bug was discovered where changing an education organization identifier leaves
behind additional data affecting ed org hierarches and data access.  The Admin
API 1.3.1 update resolves the issue for this use case.

### Other Updates

Other technical product updates, such as consolidating namespaces and library
renaming, have also been included in this update.  Please see the [Admin API
1.3](https://tracker.ed-fi.org/projects/ADMINAPI/versions/15500#release-report-tab-body)
release report for full details.

### Bug Fixes in Admin API 1.3.2

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

### Multiple Security Model / ODS Version Support

The ODS/API Platform has two different security models in versions 3.4-5.3 and
6.0-6.1.  This version of Admin API supports both versions of that security
model with the same operation endpoints for management via API (ODS/API v3.4-5.3
and v6.0-v6.1 and future versions may be supported).

## Updates in Admin API v1.1

### Claim Sets

Admin API v1.1 provides support to importing and exporting claim sets via API.
Admin API is available as both a standalone installation under IIS and as a
Docker deployment.  Admin API v1.1 supports ODS/API v3.4 to v5.3.

## Updates in Admin API v1.0

### Initial Release

This is the initial release of Admin API v1.0.  It provides functionality to
create vendors, applications, and credentials within an Ed-Fi ODS / API Platform
instance. Admin API is available as both a standalone installation under IIS and
as a Docker deployment.
