# Supporting Components

## Association Name (_association\_name_)

The identifier of the association to extend. This must be an entity name of a
previously defined association. When referencing a core association in an
extension project, the namespace "EdFi." must be included before the association
name.

## Association Property

Defines a property referencing an association for the containing entity. The
association name should be the name of an existing entity. When referencing an
association defined outside of the current extension project, the namespace
reference must be included before the association name. If the containing entity
defines more than one property of the same entity type, the `<role_name>` syntax
should be used to differentiate between the properties. This syntax can also be
used to add contextual information about the reference. The property can be
defined as weak to avoid creating foreign keys during ODS generation.

```metaed

<association_property> ::=
       association [ namespace_reference. ]{ association_name } [ meta_ed_id ]
              [ <property_deprecated> ]
              documentation
              <cardinality>
              [ <role_name> ]
              [ <queryable> ]
              [ <potentially_logical> ]
              [ is weak ]
              <merge_part_of_reference>*

```

:::warning

Note that **`is weak`** is deprecated. Users should expect removal of this
modifier in a future MetaEd release.

:::

## Base Association Name (_base\_association\_name_)

The identifier of the association to subclass. This must be an entity name of a
previously defined association.

## Base Domain Entity Name (_base\_domain\_entity\_name_)

The identifier of the domain entity to subclass. This must be an entity name of
a previously defined domain entity.

## Boolean Property

Defines a boolean property for the containing entity. It is recommended to not
use the cardinality of **`is optional`** in order to avoid turning this property
into a tertiary value.

```metaed

<boolean_property> ::=
      bool property_name [ meta_ed_id ]
 [ <property_deprecated> ]
 documentation
 <cardinality>

[ <queryable> ]

```

## Cardinality

Cardinality is applied to properties to indicate the multiplicity of the
property to the containing entity.

| Cardinality |     | XSD Generation | ODS Generation |
| --- | --- | --- | --- |
| **`is part of identity`** | 1..1 | minOccurs = 1  <br/>maxOccurs = 1  <br/>included in entity identity type | not null  <br/>resulting field(s) part of the entity identity |
| **`renames identity property`** | 1..1 | minOccurs = 1  <br/>maxOccurs = 1  <br/>included in entity identity type | not null  <br/>resulting field(s) part of the entity identity |
| **`is required`** | 1..1 | minOccurs = 1  <br/>maxOccurs = 1 | not null\* |
| **`is optional`** | 0..1 | minOccurs = 0  <br/>maxOccurs = 1 | null\* |
| **`is required collection`** | 1..\* | minOccurs = 1  <br/>maxOccurs = unbounded | dependent table |
| **`is optional collection`** | 0..\* | minOccurs = 0  <br/>maxOccurs = unbounded | dependent table |
| **`is queryable only`** | none | in lookup type only | none |

\* If this cardinality is applied to a common type property, the ODS generation
will result in a dependent table.

:::warning Deprecated

Note that **`renames identity`** is deprecated. Users should expect removal of
these cardinalities in a future MetaEd release.

:::

```metaed

<cardinality> ::=
      {
            is part of identity |
            renames identity property |
            is required |
            is optional |
            is required collection |
            is optional collection |
            is queryable only
     }

```

## Choice Property

:::warning Deprecated

Note that **`choice`** is deprecated. Users should expect removal of this
property in a future MetaEd release.

:::

:::warning

Note that **`is required`** is not supported on a choice property.
Choice properties are always treated as optional.

:::

Defines a property referencing a choice entity for the containing entity. Choice
entity name should be the name of an existing choice entity. When referencing a
choice entity defined outside of the current extension project, the namespace
reference must be included before the choice entity name. If the containing
entity defines more than one property of the same choice entity,
the `<role_name>` syntax should be used to differentiate between the properties.

```metaed

<choice_property> ::=
       choice [ namespace_reference. ]choice_entity_name [ meta_ed_id ]
             [ <property_deprecated> ]
             documentation
             <cardinality>
             [ <role_name> ]

             [ <queryable> ]


```

## Common Entity Name (_common\_entity\_name_)

The identifier of the common entity to subclass. This must be an entity name of
a previously defined common.

## Common Property

Defines a property referencing a common entity for the containing entity. Common
entity name should be the name of an existing common entity. When referencing a
common entity defined outside of the current extension project, the namespace
reference must be included before the common entity name. If the containing
entity defines more than one property of the same common type,
the `<role_name>` syntax should be used to differentiate between the properties.

The **extension** keyword modifier may be used in a top level extension entity
(e.g. Domain Entity Extension) to declare an override of a common property in
the base entity. This requires that there be a corresponding extension of the
common entity referenced by the common property in the base entity. The extended
entity will then have the original common entity substituted with the extended
common entity. The base entity remains unchanged.

```metaed

<common_property> ::=
       common [extension] [ namespace_reference. ]common_entity_name [ meta_ed_id ]
             [ <property_deprecated> ]
             documentation
             <cardinality>
             [ <role_name> ]

             [ <queryable> ]

```

## Currency Property

Defines a currency property for the containing entity. The XSD defines this type
as a decimal with no other restrictions. The ODS generation creates a database
field of type `money`.

```metaed

<currency_property> ::=
      currency property_name [ meta_ed_id ]
             [ <property_deprecated> ]
             documentation
             <cardinality>

              [ <queryable> ]

```

## Date Property

Defines a date property for the containing entity.

```metaed

<date_property> ::=
      date property_name [ meta_ed_id ]
         [ <property_deprecated> ]
         documentation
         <cardinality>

         [ <queryable> ]

```

## Datetime Property

Defines a datetime property for the containing entity.

```metaed

<datetime_property> ::=
      datetime property_name [ meta_ed_id ]
             [ <property_deprecated> ]
             documentation
             <cardinality>

             [ <queryable> ]

```

## Decimal Property

Defines a decimal property for the containing entity.

```metaed

<decimal_property> ::=
      decimal property_name [ meta_ed_id ]
            [ <property_deprecated> ]
            documentation
            <cardinality>

            [ <queryable> ]
            total digits integer
            decimal places integer
            [ min value decimal ]
            [ max value decimal ]

```

## Descriptor Property

Defines a property referencing a descriptor entity for the containing entity.
Descriptor name should be the name of an existing descriptor type. When
referencing a descriptor defined outside of the current extension project, the
namespace reference must be included before the descriptor name. If the
containing entity defines more than one descriptor property of the same type,
the `<role_name>` syntax should be used to differentiate between the properties.
This syntax can also be used to add contextual information about the descriptor.

```metaed

<descriptor_property> ::=
       descriptor [ namespace_reference. ]descriptor_name [ meta_ed_id ]
              [ <property_deprecated> ]
              documentation
              <cardinality>
              [ <role_name> ]

[ <queryable> ]

```

## Deprecated (_deprecated and property\_deprecated_)

Indicates that this top level entity or property is planned for removal in a
future model version. **`deprecated`** is followed by a text explanation of the
deprecation reason.

```metaed

<deprecated> ::= deprecated "deprecation_text"

<property_deprecated> ::= deprecated "deprecation_text"

```

## Documentation (_documentation_)

All documentation must begin with the keyword documentation, followed by either
the documentation text enclosed in double quotes or the keyword **`inherited`**.
Whitespace and line breaks are preserved within the double quotes. Because the
double quote character denotes the beginning and ending of the documentation
text, any double quote characters in the text itself are denoted by a
consecutive pairing of double quotes. There is no maximum length for
documentation text. Alternatively, properties that refer to other entities may
use the **`inherited`** keyword to use the documentation of that entity.

```metaed

<documentation> ::= documentation { "documentation_text" | inherited }

```

## Domain Entity Name (_domain\_entity\_name_)

The identifier of the domain entity to include in the association. This must be
an entity name of a previously defined domain entity.

## Domain Entity Property

Defines a property referencing a domain entity for the containing entity. The
domain entity name should be the name of an existing entity. When referencing a
domain entity defined outside of the current extension project, the namespace
reference must be included before the domain entity name. If the containing
entity defines more than one property of the same entity type,
the `<role_name>` syntax should be used to differentiate between the properties.
This syntax can also be used to add contextual information about the reference.
The property can be defined as weak to avoid creating foreign keys during ODS
generation.

```metaed

<domain_entity_property> ::=
       domain entity [ namespace_reference. ]{ domain_entity_name } [ meta_ed_id ]
              [ <property_deprecated> ]
              documentation
              <cardinality>
              [ <role_name> ]
              [ <queryable> ]
              [ <potentially_logical> ]
              [ is weak ]
              <merge_part_of_reference>*

```

:::warning Deprecated

Note that **`is weak`** is deprecated. Users should expect removal of this
modifier in a future MetaEd release.

:::

## Domain Item (domain\_item)

Domain items define the items that are part of a given domain or subdomain. The
domain entity name or association name should be the name of the existing domain
entity or association type. When referencing a domain entity or association
defined outside of the current extension project, the namespace reference must
be included before the domain entity or association name.

```metaed

<domain_item> ::=
       domain item [ namespace_reference. ]{ domain_entity_name | association_name } [ meta_ed_id ]

```

## Duration Property

Defines a property for the containing entity representing a time duration value.
When referencing a property defined outside of the current extension project,
the namespace reference must be included before the property name. The XSD
generation uses the xsd:duration type while the ODS generation represents this
data as an nvarchar(30).

```metaed

<duration_property> ::=
      duration property_name [ meta_ed_id ]
            [ <property_deprecated> ]
            documentation
            <cardinality>

            [ <queryable> ]

```

## Entity Name (_entity\_name_)

The identifier for the entity. Entity names must begin with a capital letter and
then contain numbers, upper case letters, and/or lower case letters.

## Enumeration Property

Defines a property referencing an enumeration entity for the containing entity.
Enumeration name should be the name of an existing enumeration type. When
referencing an enumeration defined outside of the current extension project, the
namespace reference must be included before the enumeration name. If the
containing entity defines more than one enumeration property of the same type,
the `<role_name>` syntax should be used to differentiate between the properties.
This syntax can also be used to add contextual information about the
enumeration.

```metaed

<enumeration_property> ::=
       enumeration [ namespace_reference. ]enumeration_name [ meta_ed_id ]
              [ <property_deprecated> ]
              documentation
              <cardinality>
              [ <role_name> ]

[ <queryable> ]

```

## Inline Common Property

Defines a property referencing an inline common entity for the containing
entity. Inline common entity name should be the name of an existing inline
common entity.

Inline commons may not be used in extension projects, but remain a feature of
the core Ed-Fi namespace.

When referencing an inline common entity defined outside of the current
namespace, the namespace reference must be included before the inline common
entity name. If the containing entity defines more than one property of the same
inline common type, the `<role_name>` syntax should be used to differentiate
between the properties.

```metaed

<inline_common_property> ::=
       inline common [ namespace_reference. ]inline_common_entity_name [ meta_ed_id ]
             [ <property_deprecated> ]
             documentation
             <cardinality>
              [ <role_name> ]

[ <queryable> ]

```

## Integer Property

Defines an integer property for the containing entity. To set the max value
equivalent to SQL `bigint` , use keyword "big".

```metaed

<integer_property> ::=
       integer property_name [ meta_ed_id ]
         [ <property_deprecated> ]
         documentation
         <cardinality>

[ <queryable> ]
       [ min value integer ]
       [ max value <integer value | "big" keyword> ]

```

## Interchange Element

Interchange elements define the type of data that can be submitted in a given
interchange. The domain entity name or association name should be the name of
the existing domain entity or association type. When referencing a domain entity
or association defined outside of the current extension project, the namespace
reference must be included before the domain entity or association name.

```metaed

<interchange_element> ::=
       element [ namespace_reference. ]{ domain_entity_name | association_name } [ meta_ed_id ]

```

## Interchange Identity Template

Interchange identity templates define a way to reference external domain
entities or associations from an interchange. The domain entity name or
association name should be the name of the existing domain entity or association
type. When referencing a domain entity or association defined outside of the
current extension project, the namespace reference must be included before the
domain entity or association name. An identity template is not persisted to the
ODS when submitted in an interchange. It only provides an XML shortcut for the
interchange to reduce the amount of XML that must be transmitted.

```metaed

<interchange_identity_template> ::=
       identity template [ namespace_reference. ]{ domain_entity_name | association_name } [ meta_ed_id ]

```

## Interchange Name (_interchange\_name_)

The identifier of the interchange to subclass. This must be an entity name of a
previously defined interchange.

## Item

Items must specify a short description which is parsed as the remaining text on
the line beginning with the **`item`** keyword. An item can optionally contain
documentation.

```metaed

<item> ::= item short_description [ meta_ed_id ] [ documentation ]

```

## Line Comment

Comments can be added to MetaEd code on a per-line basis. The comment indicator
must be the first non-whitespace characters on the line. This causes the line to
be ignored by the compiler.

```metaed

<line_comment> ::= // comment_text

```

## Local Name (_local\_name_)

The identifier for the shared property on the enclosing entity, which may be
different from the name of the common simple type. Like regular property names,
local names must begin with a capital letter and then contain numbers, upper
case letters, and/or lower case letters.

:::warning Only common Simple Types may have a local name

Shared Types are not true entities, but rather shared fields with
predefined field properties. For this reason, they can be assigned a local
name that is different than the property name.

Unlike shared types, true
entities, such as domain entities, associations, and common types, may not be
completely renamed. The keyword "named" does not apply to them. Context may be
added using "role name" in order to make a reference to an existing entity
more specific. If a reference requires a completely different name, consider
defining a new entity with the desired name instead.

:::

## Merge Directive (merge\_part\_of\_reference)

Indicates that part of the reference should be merged with some portion of
another reference on the same entity. Used for defining references to a common
parent, primarily to support ODS generation. Can be used to merge part of a
reference with an entire other reference property. User must build the path to
map between the two.

```metaed

<merge_part_of_reference> ::=
       merge <property_name>(.<property_name>)* with <property_name>(.<property_name>)*

```

A merge is defined by declaring a source and target property path for the merge.
The first property path is the source, the second is the target. The following
rules apply when defining merges:

1. All references must be a dot delimited path to the targeted reference.
2. All portions of the reference path must use the property name with the role
   name. For example, "ObjectiveGradeLevel", not just "GradeLevel".
3. All portions of the reference path should use the MetaEd name, not the
   derived artifact names. For example, "AcademicSubject", not
   "AcademicSubjectDescriptor".
4. The first part of the source path must be the parent property name.
5. The source reference path may resolve to any non collection property on the
   current entity, or any non collection identity property on a reference path.
6. The target reference path may resolve to any non collection identity
   property.
7. If the source is through a collection or common property, the target must be
   an identity property for the current entity.

## MetaEdId (meta\_ed\_id)

Globally unique identifier for some element of the MetaEd language. Used by the
Ed-Fi Alliance to identify elements, particularly for managing change tracking
between versions. Should be an unsigned integer, surround by square brackets ([
]).

MetaEdIds are used by the Alliance. They're not required for Extension projects
but can be used. Note, however, that the Alliance currently has no formal
assignment of IDs or ID ranges for licensees, so implementers using IDs for
Extensions should be aware that the IDs may need to change in the future.

```metaed

<meta_ed_id> ::= [ idValue ]

```

## Percent Property

Defines a percent property for the containing entity. The expected percent value
is defined as a part per one hundred. The XSD restricts this value to a decimal
between 0 and 1 with 4 decimal places. The ODS generation defines a field of
type `decimal(5,4)`.

```metaed

<percent_property> ::=
       percent property_name [ meta_ed_id ]
              [ <property_deprecated> ]
              documentation
              <cardinality>

[ <queryable> ]

```

## Potentially Logical (_potentially\_logical_)

Indicates that this reference may have a logical rather that literal
interpretation in a target technology. For example, applications may have an
identifier for the target of a reference, but there is no way for the
application to convert this to a literal reference that directly references an
actual entity. This keyword indicates that only a logical relationship may
exist. The implementation of this may be technology dependent, or may be defined
by downstream specifications.

## Property Name (_property\_name_)

The identifier for the property. Property names must begin with a capital letter
and then contain numbers, upper case letters, and/or lower case letters.

## Property

There are many different types of properties that can be defined. Each syntax
label specifies the expected syntax for the given property type.

```metaed

<property> ::=
       {
              <boolean_property> |
              <choice_property> |
              <common_property> |
              <currency_property> |
              <date_property> |

              <datetime_property> |
              <decimal_property> |
              <descriptor_property> |
              <duration_property> |
              <enumeration_property> |
              <inline_common_property> |
              <integer_property> |
              <percent_property> |
              <reference_property> |
              <shared_property> |
              <short_property> |
      <long_property> |
              <string_property> |
              <time_property> |
              <year_property>

   }

```

## Queryable

:::warning Deprecated

Note that **`queryable`** is deprecated. Users should expect removal of this
modifier in a future MetaEd release.

:::

Indicates that the property is part of an XSD lookup type for that entity. The
**`is queryable field`** modifier is optional after the cardinality indicator.
Alternatively, a queryable property may be declared for an entity where that
property is not on the entity itself but instead accessible through an
Association. In this case, the **`is queryable only`** modifier replaces the
cardinality indicator.

```metaed

<queryable> ::= is queryable field

```

## Role Name and Shorten To

The **`role name`** keywords are used to add additional terms to the generated
name of a specified property. The role name is appended to the beginning of the
descriptor, domain entity or enumeration name when the XSD and ODS generation is
run to build the name of the XSD element or database field. This syntax can be
used to give different names to properties of the same type within the same
entity. It can also be used to provide more contextual information about the
data being collected in the given property. Artifacts may generate differently
when a role name is the same as the property name. For example, XSD generation
ignores the role name in this case.

The optional modifier `shorten to`  can be used to fully rename the property.
Again, artifact generation naming may behave differently. For example, XSD
generation will ignore the rename and use only the role name.

```metaed

<role_name> ::= role name role_name [ **shorten to** shorten_to_name ]

```

:::warning

Though the property may be renamed to include this role name for the reference,
the true purpose of the "role name" keywords is to provide additional context.

If a reference requires a completely different name, consider defining a new
entity with the desired name instead.

:::

## Short Description (_short\_description_)

The text of the enumeration value. This can be a single word or phrase. It is
limited to a single line of text.

## Shared Property

Defines a property referencing a shared simple type for the containing entity.
The shared simple type name should be the name of an existing entity. When
referencing a shared simple type defined outside of the current extension
project, the namespace reference must be included before the shared simple type
name. The local name specified after the **`named`** keyword is optional, and
provides a different property name to be used on the containing entity.

```metaed

<shared_property> ::= { <shared_decimal_property> | <shared_integer_property> | <shared_short_property> | <shared_string_property> }



 <shared_decimal_property> ::=
       shared decimal [ namespace_reference. ]shared_simple_type_name [ named local_name ] [ meta_ed_id ]
              [ <property_deprecated> ]
              documentation
              <cardinality>

[ <queryable> ]

 <shared_integer_property> ::=
       shared integer [ namespace_reference. ]shared_simple_type_name [ named local_name ] [ meta_ed_id ]
              [ <property_deprecated> ]
              documentation
              <cardinality>

[ <queryable> ]

 <shared_short_property> ::=
       shared short [ namespace_reference. ]shared_simple_type_name [ named local_name ] [ meta_ed_id ]
              [ <property_deprecated> ]
              documentation
              <cardinality>

[ <queryable> ]

 <shared_string_property> ::=
       shared string [ namespace_reference. ]shared_simple_type_name [ named local_name ] [ meta_ed_id ]
              [ <property_deprecated> ]
              documentation
              <cardinality>

[ <queryable> ]

```

## Shared Simple Type Name (_shared\_simple\_type\_name_)

The identifier of the shared simple type to include in the enclosing entity.
This must be an entity name of a previously defined shared simple type.

## Short Property

Defines a short property for the containing entity. The output property will
automatically have a maximum value that is smaller than an `int`  property,
equivalent to SQL's `smallint`  data type.

```metaed

<short_property> ::=
       short property_name [ meta_ed_id ]
              [ <property_deprecated> ]
              documentation
              <cardinality>

[ <queryable> ]
              [ min value integer ]
              [ max value integer ]

```

## String Property

Defines a string property for the containing entity.

```metaed

<string_property> ::=
       string property_name [ meta_ed_id ]
              [ <property_deprecated> ]
              documentation
              <cardinality>

[ <queryable> ]
              [ min length integer ]
              [ max length integer ]

```

## Subdomain Position (_subdomain\_position_)

The position of the subdomain relative to other subdomains in the domain. Used
to order the subdomains when showing them together. Must be an unsigned integer.

## Time Property

Defines a time property for the containing entity.

```metaed

<time_property> ::=
       time property_name [ meta_ed_id ]
              [ <property_deprecated> ]
              documentation
              <cardinality>

[ <queryable> ]

```

## Year Property

Defines a year property for the containing entity. The XSD generation defines
this as a `xsd:gYear` type while the ODS generation creates a field of type
`smallint`.

```metaed

<year_property> ::=
       year property_name [ meta_ed_id ]
              [ <property_deprecated> ]
              documentation
              <cardinality>

[ <queryable> ]

```
