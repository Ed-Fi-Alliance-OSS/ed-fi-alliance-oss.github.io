# Multi-Association Handling

<!--
Review (Vinaya): confirm whether this page should remain in the
section or be cut. It documents the deterministic tie-break rules
the shipped SQL views apply when the Ed-Fi Data Standard allows a
many-to-many relationship and the OneRoster v1.2 target is scalar.
Case for keeping: gives implementers a single place to check which
row the service will surface and why their custom ODS data may
produce unexpected primaries. Case for cutting: the rules are
already expressed (and may drift) in the shipped SQL, and some of
the enrollment guidance is known to change in a future release.
-->

The Ed-Fi Data Standard allows many-to-many relationships that the
OneRoster® v1.2 Rostering model represents as a single value. A
student can be associated with several schools in an Ed-Fi ODS, but
a OneRoster `user` carries one primary school. A staff member can
hold several classifications, but a OneRoster `user` carries one
`role`. The shipped SQL views resolve these collisions with
deterministic tie-breaking rules. This page documents the rules so
that consumers know which value they will see and implementers know
what to expect from custom ODS data.

All rules below are drawn from the shipped PostgreSQL views under
`standard/{dataStandardVersion}/artifacts/pgsql/core/`. The Microsoft
SQL Server refresh procedures and the Data Standard 4.0 artifacts
apply the same ordering.

## Student primary school

_OneRoster target:_ `user.primaryOrg`, plus a `roleType` of
`primary` on exactly one entry in `user.roles`.

_Ed-Fi source:_ `edfi.studentSchoolAssociation`. A student can have
rows for multiple schools.

_Resolution (in order):_

1. The school with `primarySchool = true` on the association.
2. Ties broken by the most recent `entryDate`.
3. Final tie broken by the lowest `schoolId`.

All of the student's school associations are emitted in
`user.roles`. Exactly one carries `roleType = 'primary'`; the rest
carry `roleType = 'secondary'`.

## Student grade level

_OneRoster target:_ `user.grades`.

_Ed-Fi source:_ `edfi.studentSchoolAssociation.entryGradeLevelDescriptor`,
potentially multiple per student per school year.

_Resolution (in order):_

1. Most recent `entryDate`.
2. Ties broken by the latest `exitWithdrawDate` (nulls treated as
   latest).
3. Final tie broken by grade level descriptor sort order
   (descending).

One grade value is emitted per (student, school year).

## Student email

_OneRoster target:_ `user.email`.

_Ed-Fi source:_
`edfi.studentEducationOrganizationAssociationElectronicMail`,
potentially multiple per student.

_Resolution:_ preferred type is `Home/Personal`. All other types
fall back to the first available.

## Staff classification (role)

_OneRoster target:_ `user.role` (on a staff user).

_Ed-Fi source:_ `edfi.staffEducationOrganizationAssignmentAssociation`.
A staff member can hold multiple classifications at one or more
education organizations.

_Resolution:_

1. Filter to classifications with a mapping row in
   `edfi.descriptormapping` whose `mappedNamespace` is the OneRoster
   `StaffClassificationDescriptor` namespace.
2. If multiple mapped classifications remain, the one that sorts
   first alphabetically by mapped value wins.
3. If no mapped classification exists, the default is `teacher`
   _when the staff member has at least one section assignment_. A
   staff member with no mapped classification and no section
   assignments is not emitted to `/users`.

See [Descriptor mappings, unmapped behavior](./descriptor-mappings.md#behavior-for-unmapped-values)
for the filtering implications.

## Staff primary org

_OneRoster target:_ `user.primaryOrg` on a staff user.

_Ed-Fi source:_ `edfi.staffSchoolAssociation` plus
`edfi.staffEducationOrganizationAssignmentAssociation`. A staff
member can have assignments at multiple education organizations.

_Resolution (in order):_

1. Most recent assignment (`createDate` descending).
2. Ties broken by the lowest `schoolId`.

All staff school associations are emitted in `user.roles`. The
single resolved primary is marked with `roleType = 'primary'`. The
rest are `roleType = 'secondary'`.

## Staff email

_OneRoster target:_ `user.email` (on a staff user).

_Ed-Fi source:_
`edfi.staffEducationOrganizationAssignmentAssociationElectronicMail`,
potentially multiple per staff member.

_Resolution:_ preferred type is `Work`. All other types fall back
to the first available.

## Parent or contact

_OneRoster target:_ `user.role = 'parent'` with `primaryOrg` set.

_Ed-Fi source:_ `edfi.studentContactAssociation`. A contact can be
associated with multiple students, each at potentially different
schools.

_Resolution (in order):_

1. The association with the most recent `entryDate` on the student's
   school association.
2. Ties broken by the lowest `schoolId`.

A contact is emitted once per associated student-school pair. The
resolved primary carries `roleType = 'primary'`.

## Student section enrollment (`enrollment.primary`)

_OneRoster target:_ `enrollment.primary` on a student enrollment.

_Ed-Fi source:_ `edfi.studentSectionAssociation`. Multiple
enrollments per student per section are allowed.

_Resolution:_ the current `enrollments` view hardcodes
`primary = 'false'` on every student enrollment row. The service
does not pick a primary student enrollment.

## Staff section enrollment (`enrollment.primary`, `enrollment.role`)

_OneRoster target:_ `enrollment.primary` and `enrollment.role` on a
staff enrollment.

_Ed-Fi source:_ `edfi.staffSectionAssociation` plus the
`ClassroomPositionDescriptor` on the association, when the shipped
descriptor mapping is applied.

_Resolution:_

- `enrollment.role` is hardcoded to `'teacher'` for every
  staff-section association. The view does not consult
  `ClassroomPositionDescriptor`.
- `enrollment.primary` is hardcoded to `'false'` for every
  staff-section association.

The shipped `ClassroomPositionDescriptor` mapping in
`02_descriptorMappings.sql` anticipates a future release that
reads the mapping to set `enrollment.primary = 'true'` for staff in
the `Teacher of Record` position. Until that release ships,
extending the mapping has no effect on OneRoster output. See
[Descriptor mappings, ClassroomPositionDescriptor](./descriptor-mappings.md#classroompositiondescriptor-4-shipped-entries).

## Summary

| OneRoster target | Multi-valued Ed-Fi source | Tie-breaker |
| --- | --- | --- |
| `user.primaryOrg` (student) | `studentSchoolAssociation` | `primarySchool` then most recent `entryDate` then lowest `schoolId` |
| `user.grades` | `studentSchoolAssociation.entryGradeLevelDescriptor` | most recent `entryDate` then latest `exitWithdrawDate` then grade level descending |
| `user.email` (student) | `studentEducationOrganizationAssociationElectronicMail` | `Home/Personal` then first available |
| `user.role` (staff) | `staffEducationOrganizationAssignmentAssociation` | mapped classifications alphabetical; `teacher` fallback if sectioned |
| `user.primaryOrg` (staff) | `staffSchoolAssociation` | most recent `createDate` then lowest `schoolId` |
| `user.email` (staff) | `staffEducationOrganizationAssignmentAssociationElectronicMail` | `Work` then first available |
| `user.primaryOrg` (parent) | `studentContactAssociation` plus student school | most recent student school `entryDate` then lowest `schoolId` |
| `enrollment.primary` (student) | `studentSectionAssociation` | hardcoded `'false'` |
| `enrollment.role` (staff) | `staffSectionAssociation.ClassroomPositionDescriptor` | hardcoded `'teacher'` |
| `enrollment.primary` (staff) | `staffSectionAssociation.ClassroomPositionDescriptor` | hardcoded `'false'` |

All tie-breakers above are deterministic. A given ODS state produces
the same OneRoster output on every refresh, so long as the tied
values themselves are stable.

## Verifying on your ODS

To check which row the service will surface for a given student or
staff member, run the tie-breaker query directly against the ODS.
For the student primary-school rule:

```sql
SELECT schoolId, primarySchool, entryDate
FROM edfi.studentSchoolAssociation
WHERE studentUSI = <usi>
ORDER BY
    CASE WHEN primarySchool THEN 1 ELSE 0 END DESC,
    entryDate DESC,
    schoolId;
```

The top row is the `primaryOrg` the service will emit.
