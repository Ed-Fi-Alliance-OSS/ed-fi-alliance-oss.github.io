# 6 - Add Reference Property

## Problem

The design of a MetaEd model requires the addition of a reference property to an
entity.

## Solution

Identify the affected entity in the MetaEd source files. Add the reference
property and rebuild MetaEd. All technical artifacts related to the property
will be updated.

## Discussion

A reference property defines a reference to a domain entity or association for
the containing entity. The domain entity name or association name should be the
name of an existing entity. If the containing entity defines more than one
property of the same entity type, the `role name` can be used to differentiate
between the properties (see the [Add Reference with Role
Name](../cookbook/13-add-reference-with-role-name.md) Cookbook entry).

Consider the following code snippets:

```metaed
Abstract Entity EducationOrganization 
    ...
```

```metaed
Domain Entity Program
 documentation "This entity represents any program designed to work in conjunction with..."
    string ProgramId
        documentation "A unique number or alphanumeric code assigned to a program."
        ...
```

Program does not currently have a reference to an EducationOrganization, but it
turns out that it should be part of Program's identity. After adding a reference
property, the code for Program should look like:

```metaed
Domain Entity Program
 documentation "This entity represents any program designed to work in conjunction with..."
    string ProgramId
        documentation "A unique number or alphanumeric code assigned to a program."
        ...
    domain entity EducationOrganization
        documentation "Relates the program to an EducationOrganization."
        is part of identity
    ...
```

:::warning

In a complex model it is possible that fields from one reference entity – that
is, the identity fields – will overlap with identity fields from another
reference, or overlap with fields that are on the base class. In such
situations, the modeler may need to provide additional information on if these
fields are to be seen as identical. For this reason, we strongly suggest that
developers of complex values review these sections:

* [13 - Add Reference with Role
  Name](./13-add-reference-with-role-name.md)
* [14 - Using Merge Directives](./14-using-merge-directives.md)
*

:::
