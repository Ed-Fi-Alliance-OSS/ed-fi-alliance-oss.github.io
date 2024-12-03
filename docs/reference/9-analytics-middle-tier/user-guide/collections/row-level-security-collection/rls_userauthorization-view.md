# rls_UserAuthorization View

## Purpose

Used for row-level security. Links a particular user to the students, sections,
and/or schools that they can access. It only includes education staff at this
time (no parents/guardians or students). Part of the [Row-Level Security
Collection](./readme.md).

## SQL Object

`analytics.rls_UserAuthorization`

## Data Definition and Sources

:::warning

The current design does not support statewide use of row-level security. If a
state education agency chooses to implement the Analytics Middle Tier, then they
may want to create a different data security model.

:::

The `StaffSectionOrganizationAssignmentAssociation`  table is joined to
the `StaffClassificationDescriptorScope`  to determine if a staff member should
have "teacher", "principal", or "superintendent" type access.

| Column Name | Source Table | Source Column | Data Type |
| --- | --- | --- | --- |
| UserKey | Staff | StaffUniqueId | int |
| UserScope | analytics.AuthorizationScope via<br/><br/>[StaffClassificationDescriptorRole](https://edfi.atlassian.net/wiki/display/EDFIODS/Staff+Classification+to+Scope+Mapping+Table) | ScopeName | nvarchar(50) |
| StudentPermission | n/a | static string "ALL" | nvarchar(3) |
| SectionPermission | Teacher: Section via StaffSectionAssociation | Id  | nvarchar(50) |
|     | Principal: n/a | static string "ALL" |
|     | Superintendent: n/a | static string "ALL" |
| SchoolPermission | Teacher: StaffEducationOrganizationAssignmentAssociation | EducationOrganizationId | nvarchar(50) |
|     | Principal: StaffEducationOrganizationAssignmentAssociation | EducationOrganizationId |
|     | Superintendent: n/a | static string "ALL" |

## Notes

Students and Parents could be incorporated in the future but are not necessary
for the Early Warning System use cases.
