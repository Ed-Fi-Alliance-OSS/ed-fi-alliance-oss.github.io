---
description: The design of a MetaEd model requires a new Ed-Fi Descriptor.
---

# 15 - Create a New Descriptor

## Problem

The design of a MetaEd model requires a new Ed-Fi Descriptor.

## Solution

Create a new Descriptor in the MetaEd source files. Reference your new
Descriptor everywhere necessary. Build MetaEd.

After building MetaEd, almost all technical artifacts related to the new
Descriptor will be generated, with one exception. Each new Descriptor requires
that the individual Descriptor _values_ be defined manually in XML. After
completing the necessary steps to create a new Descriptor in MetaEd, details on
how to define the Descriptor values can be found here: [XML Schema - Ed-Fi
Descriptors](https://edfi.atlassian.net/wiki/spaces/EFXSDGUIDE/pages/19070990/XML+Schema+-+Ed-Fi+Descriptors).

## Discussion

An Ed-Fi Descriptor is a customizable list of values mapped for each
implementation.

A naming convention for Descriptor entities is to not include the "Descriptor"
suffix. This term will be added by MetaEd to the generated entities as needed.
When creating a new Descriptor that is not a part of the core Ed-Fi model and is
not based on the Ed-Fi Data Standard v2.x, the "with map type" section in the
Descriptor template (including the "documentation" and "item" code underneath
it) must be deleted.

Consider the following declaration:

```metaed
Descriptor Discipline
    documentation "This descriptor defines the type of action or removal from the classroom used to discipline the student involved as a perpetrator in a discipline incident."
 
```

Now consider a usage of the new Descriptor:

```metaed
Domain Entity DisciplineAction
    documentation "This event entity represents actions taken by an education organization..."
    ...
 descriptor Discipline
        documentation "Type of action, such as removal from the classroom, used to discipline the student involved as a perpetrator in a discipline incident."
        is required collection
```

Here, a reference to the Descriptor named Discipline has been added to
DisciplineAction. The "descriptor" keyword is used for that purpose. In this
case, DisciplineAction is modeled to have Discipline as a required collection.

:::warning

Map Types are not supported in the Ed-Fi Data Standard v3.x. The
following documentation applies to the Ed-Fi Data Standard v2.x.

:::

Descriptors that are part of the core Ed-Fi model and are based on the Ed-Fi
Data Standard v2.x declare a map type in the MetaEd file and list items in that
map type. Map type items must be previously defined within the core Ed-Fi model.

Consider the following declaration:

```metaed
Descriptor GradeLevel
 documentation "This descriptor defines the set of grade levels. The map to known Ed-Fi enumeration values is required."
    with map type
        documentation "The enumeration items for the set of grade levels."
        item "Adult Education"
        item "Early Education"
        item "Eighth grade"
        item "Eleventh grade"
        item "Fifth grade"
        item "First grade"
        item "Fourth grade"
        item "Grade 13"
        item "Infant/toddler"
        item "Kindergarten"
        item "Ninth grade"
        item "Other"
        item "Postsecondary"
        item "Preschool/Prekindergarten"
        item "Second grade"
        item "Seventh grade"
        item "Sixth grade"
        item "Tenth grade"
        item "Third grade"
        item "Twelfth grade"
        item "Ungraded"
```

Now consider a usage of the new Descriptor:

```metaed
Domain Entity School based on EducationOrganization
    documentation "This entity represents an educational organization that includes..."
    ...
 descriptor GradeLevel
        documentation "The grade levels served at the school."
        is required collection
```

Here, a reference to the Descriptor GradeLevel has been added to School. As with
the previous example, the `descriptor` keyword is used for that purpose and in
this case, School is modeled to have GradeLevel as a required collection.
