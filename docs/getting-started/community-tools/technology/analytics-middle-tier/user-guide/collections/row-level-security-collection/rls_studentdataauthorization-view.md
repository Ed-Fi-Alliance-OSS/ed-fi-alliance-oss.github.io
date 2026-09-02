# rls_StudentDataAuthorization View

## Purpose

Supports row-level security / authorization by linking a Student with the
Schools and Sections ("classes") in which the student is enrolled. Part of
the [Row-Level Security Collection](./readme.md).

## SQL Object Name

`analytics.rls_StudentDataAuthorization`

## Data Definition and Sources

:::tip

Note that this is returning the uniqueidentifier `[Id]` column from `Section`
instead of using the natural key, because the natural key is too long to be
practical when concatenating into a single column.

:::

| Column | Source Table | Source Column or Value | Data Type |
| --- | --- | --- | --- |
| StudentKey | Student | StudentUniqueId | int |
| SchoolKey | StudentSectionAssociation | SchoolId | int |
| SectionKey | Section | Id  | nvarchar |
| BeginDate | StudentSectionAssociation | BeginDate | date |
| EndDate | StudentSectionAssociation | EndDate | date |
