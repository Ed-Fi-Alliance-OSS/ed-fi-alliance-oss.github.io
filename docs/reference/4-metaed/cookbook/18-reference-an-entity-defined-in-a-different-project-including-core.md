---
description: Need to reference an entity that is defined in a different project.
---

# 18 - Reference an Entity Defined in a Different Project (Including Core)

## Problem

Need to reference an entity that is defined in a different project. Note, the
following example is for referencing a domain entity but the same approach is
required when referencing domain entities, associations, or properties.

## Solution

Include the project namespace followed by a period when referencing the entity.
If the entity is defined in the core Ed-Fi model, the namespace is "EdFi". If
the entity is defined in a different project, the namespace matches the
projectName as it is defined in the project's package.json file.

## Discussion

Sometimes, a project may require a reference to an entity that is defined in a
different project. This is most common when referencing an entity or property
defined in the core Ed-Fi model while working in an extension project.

For example, the new domain entity below in an extension project
StudentTransportation references both School and Student, domain entities
defined in the core Ed-Fi model.

### Example Domain Entity

```metaed
Domain Entity StudentTransportation
    documentation "Student Transportation entity."
    domain entity EdFi.School
        documentation "The school to and from which the student is being transported."
        is part of identity
    domain entity EdFi.Student
        documentation "The student being transported."
        is part of identity
    string AMBusNumber
        documentation "The bus that delivers the student to the school in the morning."
        is part of identity
        max length 6
    string PMBusNumber
        documentation "The bus that delivers the student home in the afternoon."
        is part of identity
        max length 6
    decimal EstimatedMilesFromSchool
        documentation "The estimated distance, in miles, the student lives from the school."
        is required
        total digits 5
        decimal places 2
```

The Student and School entities that are defined in the core Ed-Fi model (i.e.
outside of the StudentTransportation extension project), include the namespace
reference "EdFi" followed by a period before the name of the entity. Those
properties that are newly defined in the StudentTransportation extension project
do not require a namespace reference.
