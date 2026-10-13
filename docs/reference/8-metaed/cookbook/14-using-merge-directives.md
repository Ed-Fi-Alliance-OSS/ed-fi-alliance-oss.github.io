---
description: A complex model results in duplicate references flowing through the model.
---

# 14 - Using Merge Directives

## Problem

A complex model results in duplicate references flowing through the model. The
model requires that they always be the same reference, rather that references to
the same entity with different roles.

## Solution

If a modeler is certain that the references cannot be modeled as differing
roles, use the `merge...with` directive to designate which references are to be
unified.

:::info
While the MetaEd language supports a solution to the problem of colliding
duplicate references, large amounts of duplicate references is a sign of a
still-maturing data model that should be reviewed for possible change. Consider
modifications to the data model before investigating unification using
`merge...with` as a solution. Consider, for example, using the MetaEd `role
name` directive to supply additional context for references that would otherwise
collide. See the [Add Reference with Role
Name](./13-add-reference-with-role-name.md) Cookbook entry for
details.
:::

## Discussion

Sometimes, multiple references can occur on a single entity to the same target
entity. This can occur due to explicitly declaring multiple references to the
same entity, or (more commonly) due to references flowing through a model due to
natural key usage. If these multiple references are allowed to target unique
instances of the entities from a conceptual model perspective, consider using
'role name' instead for differentiating references.

However, if the goal is to unify these references and force them to be the same,
consider using `merge...with`.

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

For example, the domain entity fragment below shows how multiple School entities
references can be introduced, one through ClassPeriod, one through Location, and
one directly. In this scenario, the School references are unified into the
Location's school reference.

### Example Domain Entity

```metaed
Domain Entity Section
 documentation "This is an example of the use of the ""merge with"" keywords."
    domain entity School
        documentation "The school where the Section is taught."
        is required
        is queryable field
        merge School with Location.School
    domain entity Location
        documentation "The location, typically a classroom, where the Section meets."
        is part of identity
        is queryable field
    domain entity ClassPeriod
        documentation "The class period during which the Section meets."
        is part of identity
        is queryable field
        merge ClassPeriod.School with Location.School
 ...
```

Merge directives do not change the generated artifacts for the XSD, as the XSD
does not have a mechanism for key unification. The SQL artifact will change to
merge the appropriate columns and foreign keys. For example, as shown below for
the Section merge, there is only one SchoolId column generated which all three
references use:

### Sample Build Artifact

```sql
CREATE TABLE [edfi].[Section](
    [ClassPeriodName] [NVARCHAR](20) NOT NULL,
    [ClassroomIdentificationCode] [NVARCHAR](20) NOT NULL,
    [SchoolId] [INT] NOT NULL,
 ...


ALTER TABLE [edfi].[Section] WITH CHECK ADD CONSTRAINT [FK_Section_ClassPeriod] FOREIGN KEY ([ClassPeriodName], [SchoolId])
REFERENCES [edfi].[ClassPeriod] ([ClassPeriodName], [SchoolId])


ALTER TABLE [edfi].[Section] WITH CHECK ADD CONSTRAINT [FK_Section_Location] FOREIGN KEY ([ClassroomIdentificationCode], [SchoolId])
REFERENCES [edfi].[Location] ([ClassroomIdentificationCode], [SchoolId])


ALTER TABLE [edfi].[Section] WITH CHECK ADD CONSTRAINT [FK_Section_School] FOREIGN KEY ([SchoolId])
REFERENCES [edfi].[School] ([SchoolId])
```

By unifying these references, the SQL model is enforcing the rule that
references must always be identical. The School of the Section must be the same
as the School of the Location and the School of the Class Period.
