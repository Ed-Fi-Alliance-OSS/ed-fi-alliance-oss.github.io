# 9 - Add Enumeration Property

:::caution

The following documentation applies to the Ed-Fi Data Standard v2.x. In version
3 and beyond, all enumeration types have been implemented as Ed-Fi Descriptors.

:::

## Problem

The design of a MetaEd model requires the addition of an enumeration property to
an entity.

## Solution

Identify the affected entity in the MetaEd source files. Add the enumeration
property and rebuild MetaEd. All technical artifacts related to the property
will be updated.

## Discussion

An enumeration property defines a reference to an enumeration for the containing
entity. Enumeration name should be the name of an existing enumeration type. If
the containing entity defines more than one enumeration property of the same
type, the `role name` should be used to differentiate between the properties
(see the [Add Reference with Role
Name](../cookbook/13-add-reference-with-role-name.md) Cookbook entry). This
syntax can also be used to add contextual information about the enumeration.

Consider the following code snippets:

```metaed
Enumeration SchoolYear
    documentation "Identifier for a school year."
    item "1990-1991"
    ...
```

```metaed
Domain Entity School based on EducationOrganization
    documentation "This entity represents an educational organization that includes..."
    ...
```

Imagine that School needs to change to add information on the school year that a
charter school was approved. The SchoolYear enumeration is already available.
This is a very specific usage of SchoolYear, so this will be modeled as a
CharterApproval role name for SchoolYear. The code for School with this
enumeration added should then look like:

```metaed
Domain Entity School based on EducationOrganization
    documentation "This entity represents an educational organization that includes..."
    ...
 enumeration SchoolYear
  documentation "The school year in which a charter school was initially approved."
  is optional
  role name CharterApproval
```
