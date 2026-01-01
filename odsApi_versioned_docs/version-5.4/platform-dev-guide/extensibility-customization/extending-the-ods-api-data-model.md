# Extending the ODS / API Data Model

The basic pattern for adding extensions to the Ed-Fi ODS / API data model is to
develop and place customizations into the Ed-Fi-ODS-Implementation directory.
The top levels of this directory mirror the standard functionality that is
contained in the Ed-Fi-ODS directories. When you complete the development for an
extension to the ODS / API data model, re-running the initialize development
environment steps (discussed in the [Getting Started](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774233/Getting+Started+-+Source+Code+Installation) documentation) will use code generation to automatically add your data
extensions to the Ed-Fi ODS / API.

The Ed-Fi Alliance provides a free tool called the [MetaEd IDE](https://edfi.atlassian.net/wiki/spaces/METAED20) that allows you to author and build extensions using a simple language. The
MetaEd IDE system can also assist you by "deploying" the extension customizations
to the appropriate locations in your solution. This means that some of the
details covered below are typically handled by the MetaEd IDE build and deployment
processes, but are nevertheless useful for developers to understand.

Implementing an extension involves making changes to the following components:

* XSD Schema
* Database Scripts
* API Metadata

Implementation details for each of these components are described below. In
addition, see the [How To: Extend the ODS / API - Student Transportation Example](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774474/How+To+Extend+the+Ed-Fi+ODS+API+-+Student+Transportation+Example) and [How To: Extend the Ed-Fi ODS / API - Student Transcript Example](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774579/How+To+Extend+the+Ed-Fi+ODS+API+-+Student+Transcript+Example) articles for a complete walkthrough.

## XSD Schema

The Ed-Fi Data Standard provides XSD interchange schema for a number of data
exchange scenarios. ODS / API Implementers can extend these schema to customize the
data transfer for their particular needs. The free [MetaEd IDE](https://edfi.atlassian.net/wiki/spaces/METAED20) makes this process reliable and easy, and so is the recommended approach for
extending XSD for use with the ODS / API v5.4.

## Database Scripts

The ODS database scripts are located in their respective \Artifacts\MsSql\Structure\Ods and \Artifacts\MsSql\Data\Ods directories. The Ed-Fi-ODS repository contains the as-shipped, non-customized data
structures, while the Ed-Fi-ODS-Implementation repository contains customization scripts.

During the initialize development environment (i.e., `initdev`) process, a set of standard scripts are run against the database followed by
the implementation scripts. A set of structure scripts creates the database
objects, and the database tables are populated by data scripts. For example, the current school year is set during this process from scripts in
the Ed-Fi-ODS\Artifacts\MsSql\Data\Ods directory.

Matching the same pattern, extension scripts are located at Ed-Fi-ODS-Implementation\Application\{YourExtensionProject}\Artifacts\MsSql\Structure\Ods
and Ed-Fi-ODS-Implementation\Application\{YourExtensionProject}\Artifacts\MsSql\Data\Ods directories.

Extension schema files must be named in this pattern: 0001-description.sql,
where 0001 is incremented for each additional SQL database script file. Each script
is run in numerical order. Scripts that have been previously run in a given
database are skipped (by number). As described above, MetaEd IDE automatically
handles naming and placement of these scripts. If you need to provide additional
database objects to support your customization, they should be placed here as well.

The [How To: Extend the ODS / API - Student Transportation Example](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774474/How+To+Extend+the+Ed-Fi+ODS+API+-+Student+Transportation+Example) and [How To: Extend the Ed-Fi ODS / API - Student Transcript Example](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774579/How+To+Extend+the+Ed-Fi+ODS+API+-+Student+Transcript+Example) articles explain how to set up security for your extensions using this
technique. You can also populate descriptors and education organizations using this
technique.

### Populated Sample Data

Your database extension scripts are automatically run against the sample database (minimal or populated databases). The populated sample database is retrieved from a NuGet package. However, this
database contains education organizations and descriptors that you may not wish
to use. If you wish to provide your own sample data, the EdFi.Samples.Ods.* NuGet should
not be allowed to populate the "EdFi_Ods_Populated_Template" database during
the initialize development environment process.

## API Metadata

This section describes several metadata files used by the code generation to
generate the Ed-Fi ODS / API, some of which may require modification when extending
the ODS / API.

### DomainMetadata.xml

DomainMetadata.xml is an API metadata file used to group the ODS tables of
Domain Entities, Associations, Descriptors, and Enumerations into API-level
aggregates. These aggregates map directly to resources exposed by the REST API.

The file contains a collection of `<Aggregate>` tags, each one defining a single aggregate. Inside each `<Aggregate>` tag is a list of `<Entity>` tags that specify the ODS tables associated with the aggregate.

### PredefinedContextMetadata.xml

PredefinedContextMetadata.xml is an API metadata file used to override the
standard pattern for naming columns in the ODS. It is also used to specify where key
unification is related to the naming override. It is expected that the need for
an extension to modify PredefinedContextMetadata.xml will be rare.

The file contains a collection of `<ContextMetadata>` tags, where each one defines a single naming override. Inside each `<ContextMetadata>` is a `<ParentElementTag>` that specifies the XSD element representing the parent entity, an `<ElementName>` tag that specifies the XSD element representing the field on the parent entity,
and a `<Context>` tag that specifies the naming override. The `<ContextMetadata>` tag can optionally include a `<UnifiedElementName>` tag that specifies the XSD identity element to which this rename is related for
key unification.

### InterchangeOrderMetadata.xml

InterchangeOrderMetadata.xml is an API metadata file used to indicate data load
order dependencies for Domain Entities, Associations, and Descriptors, grouped
by interchange. InterchangeOrderMetadata.xml is almost always overridden in an
implementation because decisions about security configurations can impact proper
load order. An extension InterchangeOrderMetadata.xml replaces the core version.
It is not additive.

The file contains an ordered list of `<Interchange>` tags that specify the load order for each Ed-Fi interchange. Inside each `<Interchange>` tag is an ordered list of `<Element>` tags that specify the load order for each Domain Entity, Association, and
Descriptor in the interchange. Not all interchange elements need to be declared.
Omitted interchange elements are implicitly specified as being loaded after the
declared elements, but in an undefined order.

### EdOrgReferenceMetadata.xml

EdOrgReferenceMetadata.xml is an API metadata file used to indicate which
primary key on an EducationOrganization subclass table in the ODS maps to
EducationOrganizationId. It is expected that the need for an extension to modify
EdOrgReferenceMetadata.xml will be rare.

The file contains a list of `<EdOrgReference>` tags, each of which refers to an EducationOrganization subclass table. Inside
each `<EdOrgReference>` tag is a `<type>` tag that contains the name of the subclass table, and a `<key>` tag that contains the name of the column that maps to EducationOrganization.

### PredefinedNoForeignKeyMetadata.xml

PredefinedNoForeignKeyMetadata.xml is an API metadata file used to override the
standard pattern for foreign keys in the ODS. The file specifies where foreign
key relationships between tables should be suppressed. It is expected that the
need for an extension to modify PredefinedNoForeignKeyMetadata.xml will be rare.

The file contains a collection of `<NoForeignKeyMetadata>` tags, each of which defines a single foreign key suppression. Inside each `<NoForeignKeyMetadata>` is a `<ParentElementName>` that specifies the XSD element representing the parent entity, and an `<ElementName>` tag that specifies the XSD element representing the field on the parent entity
that is the reference whose foreign key on the ODS should be suppressed.

## Naming Conventions for Extensions

Care should be taken with the use of acronyms in extensions. As general
guidance, it is recommended that implementations use the Pascal or CamelCase naming
convention for acronyms over two characters in length. For more information, see [.NET Framework Design Guidelines](https://github.com/dotnet/corefx/blob/master/Documentation/coding-guidelines/framework-design-guidelines-digest.md).

## Removing Extensions

Instructions on how to add Extensions can be found in the article [How To: Extend the Ed-Fi ODS / API - Student Transportation Example](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774474/How+To+Extend+the+Ed-Fi+ODS+API+-+Student+Transportation+Example). Once added, Extensions can be removed from a development instance by a
generally inverse process:

1. Remove any Extension Projects in Visual Studio. **Right-click** on the Project in the Solution Explorer, select **Remove**.
2. Manually delete the Extension Project files from disk. These will be
   in `{{ Source Code Root }}\Ed-Fi-ODS-Implementation\Application\`.
3. Remove references to the Extension Projects. These references will be in your **OwinStartup** class (e.g., EdFi.Ods.WebApi\Startup\ApiStartup.cs). Remove the using statement
   and the AssemblyLoader call for each project.

After these steps, Extensions will be removed.
