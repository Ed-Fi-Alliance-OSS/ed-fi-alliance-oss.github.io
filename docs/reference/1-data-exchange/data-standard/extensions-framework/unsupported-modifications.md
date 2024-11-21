# Unsupported Modifications

Unsupported modifications are modifications or extensions to the Ed-Fi model
that are not supported as part of Ed-Fi core standards and technology. The list
below should not be interpreted as a list of all unsupported extensions (only
those items listed under [Supported
Extensions](./supported-extensions/readme.md) are supported); rather this list is
provided to assist data modelers in their usage.

## X.1. Addition Exceptions

Some entity types are reserved for the core data standard only and should not be
added to extension projects. In these cases, other entity types should
accommodate the majority of extension use cases and causes fewer issues in
implementation.

| Prohibited Type | Use Instead |
| --- | --- |
| Inline Common | Common |
| Enumeration | Descriptor |

## X.2. Extension Exceptions

Only Domain Entities, Associations, and Common Types may be extended. No others
may be extended.

The following exceptions apply to the extension of domain entities,
associations, and common types.

| Exception | Issue |
| --- | --- |
| Including required properties in extended domain entities, associations, or common types | [ODS-2153](https://tracker.ed-fi.org/browse/ODS-2153) |

## X.3. Subclass Extensions

Note that subclassing is limited to creation of subclasses of
EducationOrganization and GeneralStudentProgramAssociation, per [Supported
Extensions: 3. Subclassing Existing
Entities#3.1.SubclassDomainEntitiesandAssociations](./supported-extensions/subclassing-existing-entities.md)

:::info
Please note that the core Ed-Fi model does minimally employs
subclassing, but constrains it usage to abstract entities for the core model.
This restriction exists because this subclassing – while useful – has proven
complex in downstream implementations. As a result subclassing is not
supported more broadly in extensions at this time.
:::

## X.4. Interchange Inclusions

Only Domain Entities and Associations may be included in an Interchange. All
others, such as common types or descriptors, may not be included directly in the
interchange. However, they may be included in a domain entity or association
(core or extended) and thus indirectly included in the interchange.

## X.5. Modifying Core Elements

Modifying core data model element definitions is not allowed. Doing so would
break client systems that rely on the core standard.

## X.6. Removing Core Entities

Removing entities from a core product's data model is not allowed. Doing so
would break client systems that rely on the core standard.

## X.7. Removing Required Elements

Removing elements from a core product's data model is not allowed. Doing so
would break client systems that rely on the core standard.

## X.8. Change Optional Core Element to Required

Optional core elements may not be changed to mandatory. Doing so would break
client systems built on the core standard.

## X.9. Change Optional Core Collection to Required

Optional collections in core may not be changed to mandatory. Doing so would
break client systems built in the core standard.
