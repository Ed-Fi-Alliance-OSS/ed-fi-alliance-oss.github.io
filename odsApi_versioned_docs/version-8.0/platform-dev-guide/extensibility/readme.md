---
sidebar_position: 5
---

# Extensibility & Customization

This section describes the basics of how to extend the Ed-Fi API platform to
handle your implementation-specific needs. Since the code is open source, you
can customize pretty much anything — but this section outlines the intended,
built-in extension points.

## Required Customizations

The Ed-Fi API is provided as a basis for an integrated education data solution.
There are a few areas where customization is almost always required.

### Database Segmentation Strategy

Large data sets may benefit from segmentation into smaller data stores. Deciding
on a database segmentation strategy is something that should be done prior to
deployment, as migration to another approach may be challenging after production
data is loaded and the system is online.

In addition to deciding on a segmentation approach, a decision must also be made
as to whether to make the segmentation _implicit_ or _explicit_ for API clients.
With an implicit approach, each API client is configured to access exactly one
data store, and all API clients experience a simple, consistent routing. With an
explicit approach, each API client can be associated with multiple data stores,
but each request must include additional path-based context to identify which
data store should service the request.

Segmentation approaches are implemented through the management of data stores,
API clients, and their associations in the Configuration Service. Explicit
approaches also require contextual name/value pairs to be defined on the data
stores, and a corresponding
[`RouteQualifierSegments`](../configuration/context-based-routing-for-year-specific-datastore.md)
setting to define the context route.

| Segmentation Approach | API Client Experience | Description |
| --- | --- | --- |
| **Shared Instance** | Implicit | No segmentation. Multiple API clients may share one data store. With this approach, the data store must be replaced before each new school year. |
| **Year-Specific** | Implicit | Segmentation by school year. Multiple API clients share one year-specific data store, but the school year is not part of the route. For each school year, a new data store and new API clients are created. Each API client is associated with only one year-specific data store. |
| **Year-Specific** | Explicit | Segmentation by school year. Multiple API clients may share multiple year-specific data stores. Data for different school years is explicitly accessed by changing the base path of the URL (e.g., `http://<host>/2023/data/ed-fi/schools`). (Note: API configuration changes for [`RouteQualifierSegments`](../configuration/context-based-routing-for-year-specific-datastore.md) are required.) |
| **District-Specific** | Implicit | Segmentation by district. Multiple API clients may share a district-specific data store, but the district id is not part of the route. Each API client is associated with only one district-specific data store. |
| **District-Specific** | Explicit | Segmentation by district. Multiple API clients may share multiple district-specific data stores. Data for different districts is explicitly accessed by changing the base path of the URL (e.g., `http://<host>/northridge/data/ed-fi/schools`). (Note: API configuration changes for [`RouteQualifierSegments`](../configuration/context-based-routing-for-year-specific-datastore.md) are required.) |
| **Instance-Year Specific** | Implicit | Segmentation by instance and year. Multiple API clients may share an instance/year-specific data store. Each API client is associated with only one instance/year-specific data store. |
| **Instance-Year Specific** | Explicit | Segmentation by instance and year. Different instance and year data is accessed by changing the base path of the URL (e.g., `http://<host>/inst-1/2021/data/ed-fi`). Two contextual name/value pairs must be defined for each data store and the API must be configured with a multiple-segment `RouteQualifierSegments` setting (e.g., `districtId,schoolYear`). |

Other segmentation strategies are possible as the design is flexible enough to
satisfy custom requirements.

### Security Settings

The Ed-Fi API ships with reasonable default security settings, but every
implementer will have specific rules about data access — so developers should
always customize the security settings in the solution. The
[Security](../security/readme.md) section of this documentation covers the
conceptual and how-to material to configure security and data access rules.

## Other Customizations

The Ed-Fi API allows for other useful customizations. A few are outlined below.

### Extending the Data Model

One of the features that draws implementers to the Ed-Fi API is the support for
extending the data model. In v8, extensions are driven by the MetaEd toolchain,
which generates an `ApiSchema.json` file describing the additional resources,
properties, or associations. Placing this file in the configured `ApiSchemaPath`
directory and running `dms-schema ddl provision` extends both the API surface
and the database schema without manual code changes.

The [Extending with MetaEd](./extending-with-metaed.md) page has an overview of
the process with step-by-step instructions.
