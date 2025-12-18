---
description: Summary of what changed in prior releases of 7.x
sidebar_position: 2
---

# What's New in Previous v7.x Releases

This documentation provides a summary overview of the major improvements,
updates, fixes, and changes made in previous releases of the Ed-Fi ODS / API
v7.x suite of releases and provides links to additional documentation.

Detail about each change follows.

## Improvements & Enhancements - Version v7.3.0

### Data Model Changes

Ed-Fi ODS / API v7.3.0 adds support for Ed-Fi Data Standard v5.2 implementation
without introducing breaking changes from the previous Data Standard v5.x.
Additionally, Ed-Fi ODS/API v7.3.0 continues to support Data Standard v4.0
implementation.

### Partitioned Cursor-Based Paging

Ed-Fi ODS / API v7.3.0 introduces partitioned cursor-based paging to significantly
reduce query overhead when paging through large datasets. This approach provides
an alternative to traditional offset-based pagination. It uses lightweight,
sequential page tokens while retaining parallel processing capabilities through
the partitions endpoint. For instructions on using this feature, refer to
[Improve Paging Performance with Partitioned Cursor
Paging](./../client-developers-guide/improve-paging-performance-cursor-paging.md).
To learn more about the design and the performance improvements it offers, refer
to [Cursor Paging for Improved Data Out
Performance](./../technical-articles/cursor-paging-implementation-for-improved-data-out-performance.md)

### Serialized Data Storage for Optimized API Request Processing

Ed-Fi ODS / API v7.3.0 offers an optional feature that enhances performance by
storing resource data in a serialized binary format on the "root" record of the
resource's underlying table in the ODS. This serialized representation is then
used as the primary data source for servicing future API requests, significantly
reducing the SQL executed by the API to retrieve data while processing API
requests. Refer to [Serialized
Data](./../platform-dev-guide/features/serialized-data.md) for details.

### Search by Identification Code

Ed-Fi ODS / API v7.3.0 introduces the ability to query resources by identification
codes, enabling just-in-time lookups instead of requiring maintenance of a local
mappings of identification codes used within the ecosystem. This enhancement
simplifies API integration for clients rostered with identification codes that
differ from identifiers used by the API host.

### Token Info and Permissions

Ed-Fi ODS / API v7.3.0 enhances the `/oauth/token_info` endpoint to include
resource-level permissions in addition to namespace prefixes, associated
education organizations, and profiles assigned to a token. Refer to [Token
Info](./../client-developers-guide/authorization.md#token-info) for details.

### Extensible Authorization Filtering

Ed-Fi ODS / API v7.3.0 introduces powerful and flexible mechanism for defining
authorization strategies without requiring code changes. Implementers can create
custom database views tailored to specific authorization needs, such as
restricting access by student program enrollment or grade level. Granular
security setup can be achieved simply by creating a custom database view and
configuring the necessary metadata without requiring recompilation or API
process restart. This enhancement simplifies implementation of nuanced security
strategies, offering greater control and adaptability for diverse use cases.
Refer to articles on [Authorizing Requests Using Custom Database
Views](./../technical-articles/authorizing-requests-using-custom-database-views.md)
and [How To: Use Custom View-Based
Authorization](./../how-to-guides/how-to-use-custom-view-based-authorization.md)
for additional details.

### MetaEd IDE v4.5

Implementing extensions in Ed-Fi ODS / API v7.3.0 requires implementers to update
to MetaEd IDE v4.5 or higher.

## Improvements & Enhancements - Version v7.2

### Data Model Changes in v7.2

Ed-Fi ODS / API v7.2 adds support for Ed-Fi Data Standard
v5.1 implementation, with no breaking changes from the previous Data Standard
v5.0. Additionally, Ed-Fi ODS/API v7.2 continues to support Data Standard v4.0
implementation.

### Enhanced API Error Handling

The Ed-Fi ODS/API adheres to REST principles when responding to HTTP requests,
including the use of standard status codes in HTTP responses. Starting from
version 7.2, the ODS/API implements the [Problem Details RFC
9457](https://www.rfc-editor.org/rfc/rfc9457.html). This improvement ensures
that error messages are both machine-readable and user-friendly, providing clear
and actionable information to developers and users. Key benefits include:

* Standardization: Aligns with RFC 9457 for consistent machine-readable error
  responses across the API.
* Improved User Experience: User-friendly messages help quickly understand and
  address data submission issues.
* Enhanced Traceability: Comprehensive error details and correlation IDs
  facilitate easier troubleshooting.
* Efficient Data Submission: Reporting all validation errors in a single
  response reduces the number of submission attempts.

Overall, this feature significantly enhances the clarity, usability, and
traceability of API error responses, benefiting both developers and users.

### MetaEd IDE v4.4

Implementing extensions in Ed-Fi ODS / API v7.2 requires implementers to update
to MetaEd IDE v4.4 or higher.

## Improvements & Enhancements - Version v7.1

### Data Model Changes in v7.1

Ed-Fi ODS / API v7.1 adds support for implementing Ed-Fi Data Standard v5.0,
which introduces important updates that impact multiple domains of the Ed-Fi
data model. There are breaking changes to the model so implementers are advised
to review the changes carefully.

### External Cache Performance Optimization

The ODS / API utilizes caching for descriptors, person-USI-to-Unique-Id mapping
and API client details used for authorization, which improves API performance by
eliminating the need for additional database calls. However, when this cache is
store in memory, it increases memory requirements, repetitions on large scale
implementation with multiple API servers and potentially leads to cache sync
issues.

In ODS / API  v6.1, an optional feature was introduced, enabling API hosts to
leverage a shared external distributed cache service, specifically Redis. During
the development of this feature, the existing cache access logic that was
written optimized for local cache access and speed was adapted for use with the
distributed cache. While this adaptor successfully avoided multiple copies and
reduced cache sync issues, it did not address optimization of cache access over
the network.

A notable enhancement in ODS / API v7.1 focuses on optimizing the network usage
of person-USI-to-Unique-Id mapping in external cache storage. In previous
versions, the entire serialized mappings were transferred to and deserialized
from an external cache provider like Redis every time a translation was needed.
With the latest release, this process has been refined to minimize network
overhead. Refer to [How To: Use an External Cache Provider for the Ed-Fi
API](../how-to-guides/how-to-use-an-external-cache-provider-for-the-ed-fi-api.md)
for details on how to enable external caching and how to choose external or
in-memory caching for specific cache data.

### Support for OpenAPI 3

The Ed-Fi ODS/API exposes metadata based on the open-source OpenAPI
Specification (OAS), which is a widely adopted, standardized format for
describing REST APIs. This metadata comprehensively outlines all API resources,
including inputs, HTTP verbs, and the schema of the exposed resources. The
OpenAPI specification is utilized in generating [Online
Documentation](../client-developers-guide/using-the-online-documentation.md),
and by the code generation tools to [Generate
SDKs](../client-developers-guide/using-code-generation-to-create-an-sdk.md). In
earlier versions, the ODS/API exposed OAS version 2. However, in ODS/API 7.1,
metadata is exposed in OAS v3 by default, while still allowing access to OAS v2
through a version parameter for backward compatibility. This ensures a smooth
transition for users while providing compatibility with previous specification.

### MetaEd IDE v4.3

Implementing extensions in Ed-Fi ODS / API v7.1 requires implementers to update
to MetaEd IDE v4.3 or higher.

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
and deploy APIs that adhere to either the Ed-Fi Data Standard v4 or Ed-Fi Data
Standard v5. This enhancement involves updates to the source code structure,
build process, packaging, and deployment components of the technology stack to
process either one of the data standard versions. This flexibility empowers
implementations to leverage bug fixes and advancements within the technology
suite, while incorporating supported data standard upgrades at a pace suitable
for their institution's needs.

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
Profiles](platform-dev-guide\security\api-profiles.md) and for for technical
implementation details consult [How To: Add Profiles to the Ed-Fi ODS /
API](../how-to-guides\how-to-add-profiles-to-the-ed-fi-ods-api.md).

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
Configuration](../platform-dev-guide/configuration/api-client-and-ods-instance-configuration.md)
for details. API administrators retain the ability to implement previously
supported [database segmentation
strategies](../platform-dev-guide/extensibility-customization/readme.md#database-segmentation-strategy).
API administrators can opt for implicit routes (segmentation information not
visible in the routes). Additionally, administrators have the option to
configure database segmentation for explicit routes with [Context-Based
Routing](../platform-dev-guide/configuration/context-based-routing-for-year-specific-ods.md).
Streamlined routes in ODS / API v7.0 offer simplified route configurations
within client applications. Details on route patterns can be found in the [API
Routes](../client-developers-guide/api-routes.md) section.

Further enhancing capabilities, snapshot for change processing can now be
configured on separate database server from the primary ODS. Additionally, newly
introduced [Read-Replicas](../platform-dev-guide/features/read-replicas.md) can
offload GET requests, contributing to optimized performance.

To ensure security and efficient management of tenants, ODS / API
v7.0 introduces support for [Multi Tenant
Configuration](../platform-dev-guide/configuration/single-and-multi-tenant-configuration.md#multi-tenant-configuration)
This setup configures separate Admin and Security databases for each tenant.

### MetaEd IDE v4.2

Implementing extensions in Ed-Fi ODS / API v7.0 requires implementers to update
to MetaEd IDE v4.2 or higher.
