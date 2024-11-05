# What's New in Previous v7.x Releases

This documentation provides a summary overview of the major improvements,
updates, fixes, and changes made in previous releases of the Ed-Fi ODS / API
v7.x suite of releases and provides links to additional documentation.

Detail about each change follows.

## Improvements & Enhancements - Version v7.1

### Data Model Changes

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
API](https://edfi.atlassian.net/wiki/display/ODSAPIS3V61/How+To%3A+Use+an+External+Cache+Provider+for+the+Ed-Fi+API)
for details on how to enable external caching and how to choose external or
in-memory caching for specific cache data.

### Support for OpenAPI 3

The Ed-Fi ODS/API exposes metadata based on the open-source OpenAPI
Specification (OAS), which is a widely adopted, standardized format for
describing REST APIs. This metadata comprehensively outlines all API resources,
including inputs, HTTP verbs, and the schema of the exposed resources. The
OpenAPI specification is utilized in generating [Online
Documentation](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V72/pages/23299558/Using+the+Online+Documentation),
and by the code generation tools to [Generate
SDKs](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V72/pages/23299451/Using+Code+Generation+to+Create+an+SDK).
In earlier versions, the ODS/API exposed OAS version 2. However, in ODS/API 7.1,
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
and deploy APIs that adhere to either the [Ed-Fi Data Standard
v4](https://edfi.atlassian.net/wiki/display/EFDS4X/) or [Ed-Fi Data Standard
v5](https://edfi.atlassian.net/wiki/display/EFDS5/Ed-Fi+Data+Standard+v5). This
enhancement involves updates to the source code structure, build process,
packaging, and deployment components of the technology stack to process either
one of the data standard versions. This flexibility empowers implementations to
leverage bug fixes and advancements within the technology suite, while
incorporating supported data standard upgrades at a pace suitable for their
institution's needs.

It is important for implementers to note that Ed-Fi ODS / API v7.0 introduces
breaking changes listed in the [release
notes](https://edfi.atlassian.net/wiki/display/ODSAPIS3V70/What%27s+New+-+Release+Notes#What%27sNewReleaseNotes-breakingchanges).
These changes will impact the behavior of the API in both [Ed-Fi Data Standard
v4](https://edfi.atlassian.net/wiki/display/EFDS4X/) and [Ed-Fi Data Standard
v5](https://edfi.atlassian.net/wiki/display/EFDS5/Ed-Fi+Data+Standard+v5) implementations.
Additionally, Ed-Fi ODS / API v7.0 brings non-breaking changes to the ODS
database schema, aimed at enhancing performance. Implementers are advised to
upgrade their existing ODS to incorporate these schema changes, particularly
when upgrading from an existing [Ed-Fi Data Standard
v4](https://edfi.atlassian.net/wiki/display/EFDS4X/) (ODS / API v6.1)
implementation. Beyond the ODS, it's essential to update the Admin and Security
database schemas to the latest versions when upgrading to Ed-Fi ODS / API v7.0
for implementing [Ed-Fi Data Standard
v4](https://edfi.atlassian.net/wiki/display/EFDS4X/).

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
Profiles](https://edfi.atlassian.net/wiki/display/ODSAPIS3V71/API+Profiles) and
for for technical implementation details consult [How To: Add Profiles to the
Ed-Fi ODS /
API](https://edfi.atlassian.net/wiki/pages/viewpage.action?pageId=25493741).

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
Configuration](https://edfi.atlassian.net/wiki/display/ODSAPIS3V71/API+Client+and+ODS+Instance+Configuration)
for details. API administrators retain the ability to implement previously
supported [database segmentation
strategies](https://edfi.atlassian.net/wiki/pages/viewpage.action?pageId=25493647#PlatformDevGuideExtensibility&Customization-DbPartition).
API administrators can opt for implicit routes (segmentation information not
visible in the routes). Additionally, administrators have the option to configure
database segmentation for explicit routes with [Context-Based
Routing](https://edfi.atlassian.net/wiki/display/ODSAPIS3V71/Context-Based+Routing+for+Year-Specific+ODS).
Streamlined routes in ODS / API v7.0 offer simplified route configurations
within client applications. Details on route patterns can be found in the [API
Routes](https://edfi.atlassian.net/wiki/display/ODSAPIS3V71/API+Routes) section.

Further enhancing capabilities, snapshot for change processing can now be
configured on separate database server from the primary ODS. Additionally, newly
introduced [Read-Replicas](https://edfi.atlassian.net/wiki/display/ODSAPIS3V71/Read-Replicas)
can offload GET requests, contributing to optimized performance.

To ensure security and efficient management of tenants, ODS / API
v7.0 introduces support for [Multi Tenant
Configuration](https://edfi.atlassian.net/wiki/display/ODSAPIS3V71/Single+and+Multi-Tenant+Configuration#SingleandMultiTenantConfiguration-multiTenantSetting).
This setup configures separate Admin and Security databases for each tenant.

### MetaEd IDE v4.2

Implementing extensions in Ed-Fi ODS / API v7.0 requires implementers to update
to MetaEd IDE v4.2 or higher.
