# 17 - Extend an Existing Entity

## Problem

The design of a MetaEd model requires extending an entity to include additional
properties. A new entity is not desired.

## Solution

Create an extension. Build MetaEd. All technical artifacts related to the
extended entity will be created.

:::info

Extensions can be created for Domain Entities and Associations.

:::

When an existing domain entity needs additional properties, an extension to the
domain entity should be created. Unlike subclassing, extensions keep the
original entity name and documentation. No property in this type can be marked
as "is part of identity". Creating an extension does not affect the original
domain entity. Instead, it appends the extension properties to the original
domain entity.

When extending core Ed-Fi entities, be sure to include the correct namespace
declaration ("EdFi.") before the name of the domain entity. Extension entities
do not have their own documentation, so remove the documentation and sample
property lines that are not relevant to domain entity extension.

Consider the following declarations:

```metaed
Domain Entity Staff
    documentation "This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion."
    shared string UniqueId
        documentation "A unique alphanumeric code assigned to a staff."
        is part of identity
        role name Staff
        is queryable field
    ...
```

```metaed
Domain Entity EdFi.Staff additions
    bool IsTenured
        documentation "An indicator that the staff member is tenured."
        is optional
```

"EdFi.Staff additions" declares the extension to the Ed-Fi core model domain
entity Staff and will add all defined properties within the extension file. In
this example, this is the "IsTenured" property. When a build is run, technical
artifacts are created for the extended domain entity to add the new properties
to the now extended model. Details on supported and unsupported extensions can
be found in the Ed-Fi Extension Framework in the Ed-Fi Data Standard technical
documentation.
