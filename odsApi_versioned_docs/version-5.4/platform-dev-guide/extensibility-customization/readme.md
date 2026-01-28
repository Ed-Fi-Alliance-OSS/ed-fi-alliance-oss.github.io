# Extensibility & Customization

This section describes the basics of how to extend the ODS / API platform to handle your
implementation-specific needs. Since the code is open source, you can customize
pretty much anything — but this section outlines the intended, built-in extension
points.

## Required Customizations

The Ed-Fi ODS / API is provided as a basis for an integrated education data
solution. That's a pretty tall order. As such, it may not satisfy all of your
specific implementation requirements. In fact, we're pretty sure it doesn't. There are
a few areas where customization is almost always required.

### Unique Identity Systems

The Ed-Fi ODS / API contains an interface for working with a Unique Identity
System. There is a naïve implementation provided for the purposes of integration
testing, but it is anticipated that installations will have their own system. To integrate with your Unique Identity System, implement the `IUniqueIdentity` interface, and register your implementation in Castle Windsor. The [Unique ID System Integration](../../technical-articles/unique-id-system-integration.md) technical article has details.

### Database Partitioning Strategy

Large databases may require partitioning. The default ODS database connection
string provider for deployed instances is the "SharedInstance" provider, which provides no database partitioning. This and other providers are pre-packaged into various API modes. Deciding on
a database partitioning strategy is something that should be done prior to
deployment as migration to another approach may be difficult after production data is
loaded and the system is online.

| Mode | Description | Mode Setting | Database Name Format |
|------|-------------|--------------|---------------------|
| Sandbox | One database per application key and secret. | Sandbox | Database=EdFi_Ods_Sandbox_CLIENTKEY (substitute actual API client key) |
| Shared Instance | No partitioning. All applications share one database. Database must be manually "rolled over" before each new school year. | SharedInstance | Database=EdFi_Ods |
| Year Specific | Partitioning by year. Different year data is accessed through changing the URL (e.g., http://website-address/data/v3/2021). | YearSpecific | Database=EdFi_Ods_YYYY (substitute actual current year) |
| District Specific | Partitioning by district. Different district data is accessed through district ID associated with the API client. To use this option, the API client must be configured for exactly one district ID during API key and secret configuration. | DistrictSpecific | Database=EdFi_Ods_DISTRICTID (substitute actual district id) |
| Instance-Year Specific | Partitioning by instance and year. Different instance and year data is accessed through changing the URL (e.g., http://website-address/data/v3/inst-1/2021). Partitioning by-district-by-year is one specific example of this partitioning Strategy. | InstanceYearSpecific | Database=EdFi_Ods_INSTNACEID_YYYY (substitute actual instance id and current year) |

Other custom partitioning strategies are possible and have been used to meet the
needs of specific implementations.

### Security Settings

The ODS / API ships with reasonable default security settings, but every implementer will have specific rules about data access — so developers should always customize the security settings
in the solution. The [Security](../security/readme.md) section of this documentation covers the conceptual and how-to material to
configure security and data access rules.

## Other Customizations

The ODS / API allows for other useful customizations. A few are outlined below.

### Extending the Data Model

One of the features that draws implementers to the Ed-Fi ODS / API is the
support for extending the data model. Typically, in systems of this nature, the data
store, data access code, API surface, documentation, and other components would
all need to be changed to accommodate changes to the data model. The Ed-Fi ODS /
API solution handles most of these tasks through code generation.

The [Extending the ODS / API Data Model](./extending-the-ods-api-data-model.md) section of this documentation has an overview of the process, while detailed
how-to articles provide step-by-step instructions by walking through example
extensions. See, for example the [How To: Extend the ODS / API - Student Transportation Example](../../how-to-guides/how-to-extend-the-ed-fi-ods-api-student-transportation-example.md) and [How To: Extend the Ed-Fi ODS / API - Student Transcript Example](../../how-to-guides/how-to-extend-the-ed-fi-ods-api-student-transcript-example.md) articles for a complete walkthrough.

### Existing Resource Extensions

Extensions to existing entities in the Ed-Fi Data Standard follow a pattern that
creates a companion table in the organization's extension schema. The companion
table is named the same as the resource being extended plus the suffix
"Extension". For example, extensions to the Student entity would be expressed in a table
named StudentExtension.

Since extensions are considered required as part of the core entity, a record
must exist in this table for results to return from the API. This is normally
automatically handled by the API on POST and PUT, but in the scenario where
extensions are being applied to an existing database the recommendation is to add a data
script to set up matching records for any existing data in the core table. This
can easily be done by inserting into the extension table based on a SELECT from
the core table.

### API Composite Resources

Composite resources allow platform hosts to create API endpoints that combine
and re-shape resources — analogous to the way a database view can join information
from multiple tables.

Composite resources have several useful aspects, including the ability to
"alias" element names, flatten out resources, and combine multiple standard API
resources into representations that can be accessed with a single API call. Composites
are simple to set up, and honor the Profile and Claim Set configurations made
for the standard API, and so do not introduce any new security concerns.

The [API Composite Resources](./api-composite-resources.md) section of this documentation has an overview and basic how-to information. The [ODS / API Composite Resources Technical Approach](../../technical-articles/ods-api-composite-resources-technical-approach.md) technical article has information about how API Composite Resources work under
the hood.

### Support for Cascading Updates

The ODS SQL Server data store allows for the configuration of cascading updates
on entities exposed by the API. This means that if an update is made to a key
value in a data row where the key value is a foreign key for existing rows in
other tables, then all of the foreign key values are also updated to the new value.
This is useful because the ODS is a relational database that relies on
referential integrity, but the API surface would be complicated if clients had to
manage key updates.

The Ed-Fi ODS / API ships with a core set of cascading updates already in place,
but platform hosts can expand or modify the cascading updates supported by the
system. However, these changes may have to be reapplied after ODS / API upgrade
or after extensions are redeployed by [MetaEd](https://edfi.atlassian.net/wiki/display/METAED20/MetaEd+v2.x+Home) if cascading updates have been customized for extensions. See the article [How To: Enable Cascading Updates on ODS / API Resources](../../how-to-guides/how-to-enable-cascading-updates-on-ods-api-resources.md) for details.
