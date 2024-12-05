# Unsupported Modifications

Unsupported modifications are modifications or extensions to the Ed-Fi model
that are not supported as part of Ed-Fi core standards and technology. The list
below should not be interpreted as a list of all unsupported extensions (only
those items listed under Supported Extensions are supported); rather this list
is provided to assist data modelers in their usage.

## Addition Exceptions

Some entity types are reserved for the core data standard only and should not be
added to extension projects. In these cases, other entity types should
accommodate the majority of extension use cases and causes fewer issues in
implementation.

| Prohibited Type | Use Instead |
| --------------- | ----------- |
| Inline Common   | Common      |
| Enumeration     | Descriptor  |

## Subclass Extensions

Note that subclassing is limited to creation of subclasses of
EducationOrganization and GeneralStudentProgramAssociation, per Supported
Extensions: 3. Subclassing Existing
Entities#3.1.SubclassDomainEntitiesandAssociations

:::note title="Additional Information"

Please note that the core Ed-Fi model does minimally employs subclassing, but
constrains it usage to abstract entities for the core model. This restriction
exists because this subclassing – while useful – has proven complex in
downstream implementations. As a result subclassing is not supported more
broadly in extensions at this time.

:::

## Interchange Inclusions

Only Domain Entities and Associations may be included in an Interchange. All
others, such as common types or descriptors, may not be included directly in the
interchange. However, they may be included in a domain entity or association
(core or extended) and thus indirectly included in the interchange.

## Modifying Core Elements

Modifying core data model element definitions is not allowed. Doing so would
break client systems that rely on the core standard.

## Removing Core Entities

Removing entities from a core product's data model is not allowed. Doing so
would break client systems that rely on the core standard.

## Removing Required Elements

Removing elements from a core product's data model is not allowed. Doing so
would break client systems that rely on the core standard.

## Change Optional Core Element to Required

Optional core elements may not be changed to mandatory. Doing so would break
client systems built on the core standard.

## Change Optional Core Collection to Required

Optional collections in core may not be changed to mandatory. Doing so would
break client systems built in the core standard.
