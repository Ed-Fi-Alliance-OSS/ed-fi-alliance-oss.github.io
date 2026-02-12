---
description: Summary of what changed in prior releases of 7.x
sidebar_position: 2
---

# What's New in Previous v7.x Releases

This documentation provides a summary overview of the major improvements,
updates, fixes, and changes made in previous releases of the Ed-Fi ODS / API
v7.x suite of releases and provides links to additional documentation.

Detail about each change follows.


## Improvements & Enhancements - Version v7.0

This section briefly describes the new features and enhancements built into the
Ed-Fi ODS / API Platform v7.0 and provides links to additional documentation.

### Data Model Changes in v7.0

Ed-Fi ODS / API v7.0 add support for implementing Ed-Fi Data Standard v5-pre2,
which introduces important updates that impact multiple domains of the Ed-Fi
data model. There are breaking changes to the model so implementers are advised
to review the changes carefully.

### Flexible Data Standard Version Support in the Ed-Fi ODS / API

In the past, each release of the Ed-Fi ODS / API implemented a specific version
of the Data Standard. Ed-Fi ODS / API v7.0 introduces the capability to build
and deploy APIs that adhere to either the [Ed-Fi Data Standard
v4](https://docs.ed-fi.org/reference/data-exchange/data-standard/4/) or [Ed-Fi Data Standard
v5](https://docs.ed-fi.org/reference/data-exchange/data-standard/5/). This
enhancement involves updates to the source code structure, build process,
packaging, and deployment components of the technology stack to process either
one of the data standard versions. This flexibility empowers implementations to
leverage bug fixes and advancements within the technology suite, while
incorporating supported data standard upgrades at a pace suitable for their
institution's needs.

It is important for implementers to note that Ed-Fi ODS / API v7.0 introduces
breaking changes listed in the [release
notes](./../whats-new/release-notes.md#ed-fi-ods--api-v7x---breaking-changes).
These changes will impact the behavior of the API in both [Ed-Fi Data Standard
v4](https://docs.ed-fi.org/reference/data-exchange/data-standard/4/) and [Ed-Fi Data Standard
v5](https://docs.ed-fi.org/reference/data-exchange/data-standard/5/) implementations.
Additionally, Ed-Fi ODS / API v7.0 brings non-breaking changes to the ODS
database schema, aimed at enhancing performance. Implementers are advised to
upgrade their existing ODS to incorporate these schema changes, particularly
when upgrading from an existing [Ed-Fi Data Standard
v4](https://docs.ed-fi.org/reference/data-exchange/data-standard/4/) (ODS / API v6.1)
implementation. Beyond the ODS, it's essential to update the Admin and Security
database schemas to the latest versions when upgrading to Ed-Fi ODS / API v7.0
for implementing [Ed-Fi Data Standard
v4](https://docs.ed-fi.org/reference/data-exchange/data-standard/4/).

### Dynamic Profile Configuration

Ed-Fi ODS / API profiles facilitate the creation of data policies for specific
sets of API resources, thereby limiting the data (including properties,
collections, and collection items) available for reading and writing. In the
past releases, configuring profiles required code modifications, rebuilding and
redeployment. Ed-Fi ODS / API v7.0 introduces the capability for runtime profile
configuration and updates without the requirement for recompilation or
redeployment.  Additionally, profiles now integrate seamlessly with extension
plugins. This enhancement empowers administrators to modify data policies even
after the deployment of ODS / API throughout the school year, accommodating
evolving consumer needs. For general overview of profiles feature refer to [API
Profiles](./../platform-dev-guide/security/api-profiles.md) and for
for technical implementation details consult [How To: Add Profiles to the Ed-Fi
ODS / API](./../how-to-guides/how-to-add-profiles-to-the-ed-fi-ods-api.md).

In addition to profile configuration, Ed-Fi ODS / API v7.0 simplifies profile
usage. The ODS / API now evaluates incoming API requests to determine whether
the requested resource is linked to a single profile for the API client. If this
is the case, API will automatically handles the request using that specific
profile and API client is not obligated to to apply profile specific HTTP header
to the request (i.e. `Accept` for GET requests, and `Content-Type` for PUT/POST
requests).

### Multi-Tenancy, Deployment Modes, Routing

Ed-Fi ODS / API v7.0 introduces architectural changes that enhance scalability,
performance, and deployment flexibility beyond what was achievable in previous
versions. ODS instances are now configured and linked to API clients within the
Admin database, allowing configuration of complete connection strings. This
setup enables ODS instances to reside on separate database servers, ensuring
improved performance and security. Refer to [API Client and ODS Instance
Configuration](./../platform-dev-guide/configuration/api-client-and-ods-instance-configuration.md)
for details. API administrators retain the ability to implement previously
supported [database segmentation
strategies](./../platform-dev-guide/extensibility-customization/readme.md#database-segmentation-strategy).
API administrators can opt for implicit routes (segmentation information not
visible in the routes). Additionally, administrators have the option to
configure database segmentation for explicit routes with [Context-Based
Routing](./../platform-dev-guide/configuration/context-based-routing-for-year-specific-ods.md).
Streamlined routes in ODS / API v7.0 offer simplified route configurations
within client applications. Details on route patterns can be found in the [API
Routes](./../client-developers-guide/api-routes.md) section.

Further enhancing capabilities, snapshot for change processing can now be
configured on separate database server from the primary ODS. Additionally, newly
introduced [Read-Replicas](./../platform-dev-guide/features/read-replicas.md)
can offload GET requests, contributing to optimized performance.

To ensure security and efficient management of tenants, ODS / API
v7.0 introduces support for [Multi Tenant
Configuration](./../platform-dev-guide/configuration/single-and-multi-tenant-configuration.md#multi-tenant-configuration).
This setup configures separate Admin and Security databases for each tenant.

### MetaEd IDE v4.2

Implementing extensions in Ed-Fi ODS / API v7.0 requires implementers to update
to MetaEd IDE v4.2 or higher.
