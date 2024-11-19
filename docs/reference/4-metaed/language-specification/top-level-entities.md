# Top-Level Entities

## Abstract Entity

An abstract entity specifies a model generalization containing common properties
that can be subclassed into concrete domain entities. Other entities can include
domain entity properties of this type to indicate a reference to any of the
concrete subclasses of this type. The identity for the abstract entity must be
defined.

```metaed

<Abstract Entity> ::=
     Abstract Entity entity_name [ meta_ed_id ]
          [ <deprecated> ]
          documentation
          <property>+

```

:::caution

The Ed-Fi Alliance has only used `abstract` in two places: for
"Education Organizations" and "General Student Programs". The inheritance
model adds complexities that may not be desirable. For example,
because `LocalEducationAgency` and `School` are both `EducationOrganizations`,
and they inherit the `EducationOrganizationid`, an Ed-Fi API cannot have a
`LocalEducationAgency.LocalEducationAgencyId` with the same value as a
`School.SchoolId`. A vendor connecting to an Ed-Fi API may not expect that
behavior. Furthermore, creating a reference to an abstract entity could
accidentally result in odd situations if one is not careful during the
modeling process. For example, if the Ed-Fi `StudentSchoolAssociation` had
accidentally been set to reference `EducationOrganization` instead
of `School`, then any child type of `EducationAgency` would be referenceable
even though the name plainly implies that it should be a `School`.

:::

## Association

Associations link two domain entities together with supporting properties. The
naming convention for associations is to concatenate the two domain entity names
and end with "Association". When there is more than one association between the
same domain entities, a semantic discriminator is added; for example:
StaffEducationOrganizationAssignmentAssociation and
StaffEducationOrganizationEmploymentAssociation. The identity for the
association consists of the identity for each domain entity type plus any
additional properties that have been marked as part of the identity. If the two
associated domain entities are the same, at least one must specify a role name
to use to differentiate the two properties. If the association should allow
changes to the identity and cascade updates to dependent entities, use the key
phrase **`allow identity updates`**.

```metaed

<Association> ::=
     Association entity_name [ meta_ed_id ]
          [ <deprecated> ]
          documentation
          [ allow identity updates ]
          domain entity domain_entity_name
                [ <role_name> ]
          domain entity domain_entity_name
                [ <role_name> ]
          <property>*


```

## Association Extension

An association extension allows implementation-specific properties to be added
to an existing association. The association entity name specified should be an
existing association entity name. When referencing an association outside of the
current extension project, the namespace reference must be included before the
association name. No property in this type can be marked as **`is part of
identity`**.

```metaed

<Association Extension> ::=
     Association [ namespace_reference. ]association_name additions [ meta_ed_id ]
          <property>+

```

## Association Subclass

When an existing association needs additional data to support a specialization
of the model, it should be subclassed. The naming convention should follow the
naming convention for associations with a semantic discriminator indicating what
the specialization of data is for this new type. The base association name is
the original association to build on. When referencing an association outside of
the current extension project, the namespace reference must be included before
the association name. No property in this type can be marked as **`is part of
identity`**. Creating a subclass does not affect the original association.
Instead it creates a new type that uses the original association as a base and
adds new data.

```metaed

<Association Subclass> ::=
     Association [ namespace_reference. ]entity_name based on base_association_name [ meta_ed_id ]
          [ <deprecated> ]
          documentation
          <property>+

```

## Choice

:::warning

Note that `**choice**` is deprecated. Users should expect removal
of this type of entity in a future MetaEd release.

:::

The choice defines a group of properties that allows one and only one of the
properties to be used. No property in this type can be marked as is part of
identity due to the conditional nature of the property collection. This type is
included in other entities' property sets with the `**choice**` keyword. In the
XSD generation, this results in the xsd:choice element being rendered with the
properties listed as the content of the element. In the ODS generation, if the
property is not a collection, the generated database field will always be
nullable regardless of the is required or is optional keyword.

```metaed

<Choice> ::=
     Choice entity_name [ meta_ed_id ]
          [ <deprecated> ]
          documentation
          <property>+

```

## Common

Common types represent a collection of properties in a reusable form. This type
is included in other entities' property sets with the common keyword. Properties
that include common types are generated in the ODS as separate tables that are
dependent upon the entity that defined the property. If the common defines one
or more properties as is part of identity, then the type can be used in
properties marked as being collections.

```metaed

<Common> ::=
     Common entity_name [ meta_ed_id ]
          [ <deprecated> ]
          documentation
          <property>+

```

## Common Extension

Common extension allows an implementation to define additional properties to a
previously defined common. The common entity name should be the name of the
existing common. When referencing a common outside of the current extension
project, the namespace reference must be included before the common name. No
properties can be marked as is part of identity.  Unlike extensions of Domain
Entities and Associations the extension of a Common is referenced via
the **extension** keyword modifier on a Common Property, the usage of which is
restricted. See the entry on Common Property for details.

```metaed

<Common Extension> ::=
     Common [ namespace_reference. ]common_entity_name additions [ meta_ed_id ]
          <property>+

```

## Common Subclass

When an existing common needs additional data to support a specialization of the
model, it should be subclassed. The naming convention should follow the naming
convention for commons with a semantic discriminator indicating what the
specialization of data is for this new type. The base common name is the
original common to build on. When referencing a common outside of the current
extension project, the namespace reference must be included before the common
name. No property in this type can be marked as is part of identity. Creating a
subclass does not affect the original common. Instead it creates a new type that
uses the original common as a base and adds new data.

```metaed

<Common Subclass> ::=
     Common [ namespace_reference. ]common_entity_name [ meta_ed_id ]
          [ <deprecated> ]
          documentation
          <property>+

```

## Descriptor

Descriptors represent "option sets" - standardized sets of values, often
categorizations, for data model entities. Descriptor values are customizable,
but those who customize should consult relevant Ed-Fi standards to understand if
particular values are mandated for compliance to certain standards. The
descriptor values (the "code sets" and their definitions) provided by the Ed-Fi
Alliance are provided in the Ed-Fi Standard GitHub repo.

The naming convention for descriptor entities is to not include the "Descriptor"
suffix. This term will be added to generated entities as needed. Both the XSD
and ODS generation will automatically include the standard set of descriptor
properties (code value, short description, description, . . .). Additional
properties can be added to a descriptor. No properties can be marked as is part
of identity. Only descriptors that are a part of a core Ed-Fi v2.x
implementation should declare a map type and the items in that map type. The
descriptor type MetaEd markup is only for defining the descriptor, not for
listing the descriptor values.

```metaed

<Descriptor> ::=
     Descriptor entity_name [ meta_ed_id ]
          [ <deprecated> ]
          documentation
          <property>*
          [
               { with map type | with optional map type }
               documentation
               <item>+
          ]

```

## Domain

Domains define the groupings of top level entities.  They are primarily used for
managing documentation.

```metaed

<Domain> ::=
     Domain entity_name [ meta_ed_id ]
          [ <deprecated> ]
          documentation
          <domain_item>+

```

## Domain Entity

Domain entities represent major data models. The properties that uniquely
identify each instance of the domain entity must be marked as `**is part of
identity**`. If the domain entity should allow changes to the identity and
cascade updates to dependent entities, use the key phrase `**allow identity
updates**`.

```metaed

<Domain Entity> ::=
     Domain Entity entity_name [ meta_ed_id ]
          [ <deprecated> ]
          documentation
          [ allow identity updates ]
          <property>+

```

## Domain Entity Extension

Domain entity extension allows an implementation to define additional properties
to a previously defined domain entity. The domain entity entity name should be
the name of the existing domain entity type. When referencing a domain entity
outside of the current extension project, the namespace reference must be
included before the domain entity name. No properties can be marked as `**is
part of identity**`.

```metaed

<Domain Entity> ::=
     Domain Entity [ namespace_reference. ]domain_entity_name additions [ meta_ed_id ]
          <property>+

```

## Domain Entity Subclass

When an existing domain entity needs additional data to support a specialization
of the model, it should be subclassed. The base domain entity name is the
original domain entity to build on. When referencing a domain entity outside of
the current extension project, the namespace reference must be included before
the domain entity name. No property in this type can be marked as `**is part of
identity**`. However, if the identity of the base entity consists of one
property, a new property can be marked as `**renames identity property**` to
give the identity property a new name. Creating a subclass does not affect the
original domain entity. Instead it creates a new type that uses the original
domain entity as a base and adds new data. This syntax can also be used to
create concrete types of an abstract entity.

```metaed

<Domain Entity> ::=
     Domain Entity [ namespace_reference. ]entity_name based on base_domain_entity_name [ meta_ed_id ]
          [ <deprecated> ]
          documentation
          <property>+

```

:::warning Deprecated

Note that `**renames identity property**` is deprecated. Users should expect
removal of this modifier in a future MetaEd release.

:::

## Enumeration

Enumerations are a set of values. The naming convention is to exclude the suffix
"Type" unless the natural name of the enumeration ends in "Type". For example,
the enumeration "AcademicHonorCategory" does not end in "Type" while
"AddressType" does. These types can be used as properties in other entities to
constrain the valid values of the property to items in the set of values. Each
item value must be distinct within a given enumeration.

```metaed

<Enumeration> ::=
     Enumeration entity_name [ meta_ed_id ]
          [ <deprecated> ]
          documentation
          <item>+


```

:::warning

Please note that `**Enumeration'**s` were removed in Data Standard
3 and later and only apply to Data Standard 2 versions. For discussion of the
reasons, please see
[DATASTD-1088](https://tracker.ed-fi.org/browse/DATASTD-1088) - Getting issue
details... STATUS

:::

## Inline Common

Inline commons represent a collection of properties in a reusable form. This
type is included in other entities' property sets with the `**inline common**`
keyword. The XSD generation defines a child element in the containing complex
type for entities that use this type as a property. The ODS generation includes
the inline common type properties as if they had been defined in the including
type.

```metaed

<Inline Common> ::=
     Inline Common entity_name [ meta_ed_id ]
          [ <deprecated> ]
          documentation
          <property>+


```

## Interchange

Interchanges define the structure of how the XML is submitted to the system.
Interchanges group domain entity types and association types by functional area.
Occasionally the entity types included in an interchange contain references to
other entities that are not included in the interchange. In this scenario,
identity templates can be declared to allow the submitted XML to use `ID` and
`IDREF` attributes to the external entities without resubmitting the external
entity data.

```metaed

<Interchange> ::=
     Interchange entity_name [ meta_ed_id ]
          [ <deprecated> ]
          documentation
          [ extendedDocumentation ]
          [ useCaseDocumentation ]
          <interchange_identity>*
          <interchange_element>+

```

## Interchange Extension

Interchange extension allows an implementation to define additional elements to
a previously defined interchange. The interchange name should be the name of the
existing interchange type. When referencing an interchange outside of the
current extension project, the namespace reference must be included before the
interchange name.

```metaed

<Interchange Extension> ::=
     Interchange [ namespace_reference. ]interchange_name additions [ meta_ed_id ]
          <interchange_identity>*
          <interchange_element>+

```

## Shared Simple Types

Shared simple types represent a simple type in a reusable form. This type can be
included in other entities' property sets by using the `**shared**` keyword. In
the XSD they are generated as a simple type. Properties that include shared
simple types reference those simple types, as opposed to triggering generation
of a new simple type in the XSD. To avoid naming collisions, once a shared
simple type is declared no top level entity may declare a property with the same
name.

```metaed

<Shared Simple Type> ::= { <Shared Decimal> | <Shared Integer> | <Shared Short> | <Shared String> }

<Shared Decimal> ::=
     Shared Decimal entity_name [ meta_ed_id ]

            [ <deprecated> ]
            documentation
            total digits integer
            decimal places integer
            [ min value decimal ]
            [ max value decimal ]


<Shared Integer> ::=
     Shared Integer entity_name [ meta_ed_id ]

            [ <deprecated> ]
            documentation
            [ min value integer ]
            [ max value integer ]


<Shared Short> ::=
     Shared Short entity_name [ meta_ed_id ]

            [ <deprecated> ]
            documentation
            [ min value integer ]
            [ max value integer ]


<Shared String> ::=
     Shared String entity_name [ meta_ed_id ]

            [ <deprecated> ]
            documentation
            [ min length integer ]
            [ max length integer ]

```

## Subdomain

Subdomains define the groupings of top level entities within a given domain. Top
level entities can be part of multiple subdomains.

```metaed

<Subdomain> ::=
     Subdomain entity_name of domain_name [ meta_ed_id ]
          <domain_item>+
          [ position subdomain_position ]

```
