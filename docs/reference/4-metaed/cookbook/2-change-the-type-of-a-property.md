---
description: A property of an entity is not of the correct type.
---

# 2 - Change the Type of a Property

## Problem

A property of an entity is not of the correct type.

## Solution

Identify the affected property in the MetaEd source files. Correct the property
type and rebuild MetaEd. All technical artifacts related to the property will be
updated.

## Discussion

MetaEd properties declarations are composed of two parts. The first is the
MetaEd keyword which defines the kind of MetaEd entity that the property refers
to. "string", "descriptor", and "domain entity" are all examples of property
keywords.

The second part can refer to either an explicitly defined entity or an
implicitly defined simple type. Explicit entities are those defined elsewhere
using the MetaEd language. An example would be "School" defined elsewhere
starting with "Domain Entity School". Implicitly defined simple types are a
convenience for declaring a simple type in the only place it will be used. An
example would be a property "string XYZOnlyHere" where there is no other mention
of that simple type in any other entity.

Consider the following code snippets:

```metaed
Domain Entity BellSchedule
    documentation "This entity represents the schedule of class period meeting times."
    domain entity EducationOrganization
        documentation "The education organization for which the BellSchedule is defined."
        is part of identity
    ...
```

```metaed
Abstract Entity EducationOrganization 
    ...
```

```metaed
Domain Entity School based on EducationOrganization
    ...
```

BellSchedule has a primary key reference to the more general entity
EducationOrganization. To change the reference to the more specific entity
School, change the BellSchedule listing to read:

```metaed
Domain Entity BellSchedule
    documentation "This entity represents the schedule of class period meeting times."
    domain entity School
        documentation "The school for which the BellSchedule is defined."
        is part of identity
    ...
```

Note that this kind of change often impacts the property documentation.
