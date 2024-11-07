# Extensibility & Customization

This section describes the basics of how to extend the ODS / API platform to
handle your implementation-specific needs. Since the code is open source, you
can customize pretty much anything — but this section outlines the intended,
built-in extension points.

## Required Customizations

The Ed-Fi ODS / API is provided as a basis for an integrated education data
solution. That's a pretty tall order. As such, it may not satisfy all of your
specific implementation requirements. In fact, we're pretty sure it doesn't.
There are a few areas where customization is almost always required.

### Unique Identity Systems

The Ed-Fi ODS / API contains an interface for working with a Unique Identity
System. There is a naïve implementation provided for the purposes of integration
testing, but it is anticipated that installations will have their own system. To
integrate with your Unique Identity System, implement the `IUniqueIdentity`
interface, and register your implementation with the container (Autofac). The
[Unique ID System
Integration](../../technical-articles/unique-id-system-integration.md)
technical article has details.

### Database Segmentation Strategy

Large data sets may benefit from segmentation into smaller databases. Deciding
on a database segmentation strategy is something that should be done prior to
deployment as migration to another approach may be challenging after production
data is loaded and the system is online.

In addition to deciding on a segmentation approach, a decision must also be made
as to whether to make the segmentation _implicit_ or _explicit_ for API clients.
With an implicit approach, each API client will be configured to access exactly
only one ODS and thus all API clients will experience a simple, consistent
routing experience. With an explicit approach, each API client can be associated
with multiple ODS databases, but each request to the API must include the
additional path-based context necessary to identify which of their associated
ODS databases should be used to service the request.

Segmentation approaches are implemented through the management of ODS instances,
API clients and their associations. Explicit approaches also require unique
contextual name/value pairs to be defined on the ODS instances, and a
corresponding API configuration setting (OdsContextRouteTemplate) to define the
[ODS context route template](../configuration/context-based-routing-for-year-specific-ods.md).

| Segmentation Approach | API Client Experience | Description |
| --- | --- | --- |
| **Sandbox** | Implicit | An API client has exclusive access to a single ODS database for sandbox purposes. |
| **Shared Instance** | Implicit | No segmentation. Multiple API clients may share one ODS database. With this approach, the database must be manually "rolled over" or replaced before each new school year. |
| **Year-Specific** | Implicit | Segmentation by school year. Multiple API clients share one year-specific ODS database, but the school year is not part of the route. For each school year, a new ODS and new API clients are created. Each API client is associated with only one year-specific ODS instance. |
| **Year-Specific** | Explicit | Segmentation by school year. Multiple API clients may share multiple year-specific ODS databases. Data for different school years is explicitly accessed by changing the base path of URL (e.g., `http://<host>/2023/data/v3/schools`). (Note: API configuration changes for the [ODS context route template](../configuration/context-based-routing-for-year-specific-ods.md) is required.) |
| **District-Specific** | Implicit | Segmentation by district. Multiple API clients may share a district-specific ODS database, but the district id is not part of the route. Each API client is associated with only one district-specific ODS instance. |
| **District-Specific** | Explicit | Segmentation by district. Multiple API clients may share multiple district-specific ODS database. Data for different districts is explicitly accessed by changing the base path of the URL (e.g., `http://<host>/northridge/data/v3/schools`.) (Note: API configuration changes for ODS context route template is required.) |
| **Instance-Year Specific** | Implicit | Segmentation by instance and year. Multiple API clients may share an instance/year-specific ODS database. Each API client is only associated with a single instance/year-specific ODS instance. |
| **Instance-Year Specific** | Explicit | Segmentation by instance and year. Different instance and year data is accessed by changing the base path of the URL (e.g., `http://<host>/inst-1/2021/data/v3`). Two contextual name/value pairs must be defined for each ODS instance and the API must be configured with a multiple segment ODS context route template (e.g. `{instanceId}/{schoolYearFromRoute}`). |

Other segmentation strategies are possible as the design is flexible enough to
satisfy custom requirements.

### Security Settings

The ODS / API ships with reasonable default security settings, but every
implementer will have specific rules about data access — so developers should
always customize the security settings in the solution. The
[Security](../security/readme.md) section
of this documentation covers the conceptual and how-to material to configure
security and data access rules.

## Other Customizations

The ODS / API allows for other useful customizations. A few are outlined below.

### Extending the Data Model

One of the features that draws implementers to the Ed-Fi ODS / API is the
support for extending the data model. Typically, in systems of this nature, the
data store, data access code, API surface, documentation, and other components
would all need to be changed to accommodate changes to the data model. The Ed-Fi
ODS / API solution handles most of these tasks through code generation.

The [Extending the ODS / API Data
Model](./extending-the-ods-api-data-model.md) section of this documentation has
an overview of the process, while detailed how-to articles provide step-by-step
instructions by walking through example extensions. See, for example the [How
To: Extend the ODS / API - Alternative Education Program
Example](../../how-to-guides/how-to-extend-the-ed-fi-ods-api-alternative-education-program-example.md)
and [How To: Extend the Ed-Fi ODS / API - Student Transcript
Example](../../how-to-guides/how-to-extend-the-ed-fi-ods-api-student-transcript-example.md)
articles for a complete walkthrough.

### Existing Resource Extensions

Extensions to existing entities in the Ed-Fi Data Standard follow a pattern that
creates a companion table in the organization's extension schema. The companion
table is named the same as the resource being extended plus the suffix
"Extension". For example, extensions to the Student entity would be expressed in
a table named StudentExtension.

Since extensions are considered required as part of the core entity, a record
must exist in this table for results to return from the API. This is normally
automatically handled by the API on POST and PUT, but in the scenario where
extensions are being applied to an existing database the recommendation is to
add a data script to set up matching records for any existing data in the core
table. This can easily be done by inserting into the extension table based on a
SELECT from the core table.

### API Composite Resources

Composite resources allow platform hosts to create API endpoints that combine
and re-shape resources — analogous to the way a database view can join
information from multiple tables.

Composite resources have several useful aspects, including the ability to
"alias" element names, flatten out resources, and combine multiple standard API
resources into representations that can be accessed with a single API call.
Composites are simple to set up, and honor the Profile and Claim Set
configurations made for the standard API, and so do not introduce any new
security concerns.

The [API Composite
Resources](./api-composite-resources.md)
section of this documentation has an overview and basic how-to information.
The [ODS / API Composite Resources Technical
Approach](../../technical-articles/ods-api-composite-resources-technical-approach.md)
technical article has information about how API Composite Resources work under
the hood.

### Support for Cascading Updates

The ODS SQL Server data store allows for the configuration of cascading updates
on entities exposed by the API. This means that if an update is made to a key
value in a data row where the key value is a foreign key for existing rows in
other tables, then all of the foreign key values are also updated to the new
value. This is useful because the ODS is a relational database that relies on
referential integrity, but the API surface would be complicated if clients had
to manage key updates.

The Ed-Fi ODS / API ships with a core set of cascading updates already in place,
but platform hosts can expand or modify the cascading updates supported by the
system. However, these changes may have to be reapplied after ODS / API upgrade
or after extensions are redeployed by [MetaEd](/reference/meated if cascading
updates have been customized for extensions. See the article [Cascading Key
Updates on ODS / API
Resources](../../technical-articles/cascading-key-updates-on-ods-api-resources.md)
for details.
