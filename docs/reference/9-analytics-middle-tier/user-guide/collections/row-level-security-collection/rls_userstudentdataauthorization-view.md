# rls_UserStudentDataAuthorization View

## Purpose

Supports row-level security for a given user by listing all of the students they
are allowed to access. Part of the [Row-Level Security
Collection](./readme.md).

## SQL Object

`analytics.rls_UserStudentDataAuthorization`

## Data Definition and Sources

The view contains three queries — one each for authorization scope District,
School, and Section. Any given user will only have results in one of these
sub-queries, based on the Staff Classifications listed in the [Descriptor
Mapping](../../../deployment-guide/descriptor-mapping.md).

| Column | Source Table | Source Column or Value | Data Type |
| --- | --- | --- | --- |
| ​UserKey | StaffEducationOrganizationAssignmentAssociation​ | StaffUniqueId | int​ |
| StudentKey | If scope is District or School, then StudentSchoolAssociation<br/><br/>When District, then rolls up all Schools associated with a Local Education Agency | StudentUniqueId | int |
|     | If scope is Section, then StudentSectionAssociation | StudentUniqueId | int |
