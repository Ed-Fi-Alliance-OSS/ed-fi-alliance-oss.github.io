---
sidebar_position: 4
---

# Data Out

Most states read data from the ODS database directly for validations, warehouse loads, reporting or data freezes. All of these need changes on Ed-Fi API v8.

## Before and after

| | ODS/API | Ed-Fi API v8 |
| --- | --- | --- |
| Direct SQL | Queries against ODS tables (`edfi.Student`, `edfi.StudentSchoolAssociation`, ...) | Still possible, but the tables are structured differently, so **every existing query must be rewritten** |
| Resource API | `GET /data/v3/ed-fi/{resource}` | `GET /api/data/ed-fi/{resource}` (no `v3` segment) |
| Change Queries | `availableChangeVersions`, `minChangeVersion`, `/deletes`, `/keyChanges`, snapshots | Same routes and parameters, with no snapshots and no custom view-based authorization |

We recommend reading through the API wherever you can. Where that isn't practical, rewrite your SQL for the new structure.

## Start with an inventory

List everything that reads from the ODS database before you migrate. For each item, note:

- what it is (validation, warehouse load, report, data freeze, other)
- which tables it reads
- how often it runs
- which route it will use on Ed-Fi API v8: the API, Change Queries or rewritten SQL

## Example: rewrite a SQL query

Active enrollments with school name and school type.

Before, on the ODS:

```sql
SELECT st.StudentUniqueId,
       ssa.SchoolId,
       eo.NameOfInstitution,
       d.CodeValue AS SchoolType,
       ssa.EntryDate
FROM edfi.StudentSchoolAssociation ssa
JOIN edfi.Student st ON st.StudentUSI = ssa.StudentUSI
JOIN edfi.EducationOrganization eo ON eo.EducationOrganizationId = ssa.SchoolId
JOIN edfi.School sch ON sch.SchoolId = ssa.SchoolId
LEFT JOIN edfi.Descriptor d ON d.DescriptorId = sch.SchoolTypeDescriptorId
WHERE ssa.ExitWithdrawDate IS NULL;
```

Now, on Ed-Fi API v8:

```sql
SELECT ssa.Student_StudentUniqueId,
       ssa.School_SchoolId,
       sch.NameOfInstitution,
       d.CodeValue AS SchoolType,
       ssa.EntryDate
FROM edfi.StudentSchoolAssociation ssa
JOIN edfi.School sch ON sch.DocumentId = ssa.School_DocumentId
LEFT JOIN dms.Descriptor d ON d.DescriptorId = sch.SchoolTypeDescriptor_DescriptorId
WHERE ssa.ExitWithdrawDate IS NULL;
```

What changed:

- **No `StudentUSI` join.** Tables store the natural key of what they reference (`Student_StudentUniqueId`) next to an internal `..._DocumentId` key.
- **No inheritance tables.** `NameOfInstitution` is on `edfi.School` itself; there is no `edfi.EducationOrganization` base table to join.
- **Descriptors live in one table, `dms.Descriptor`.** Descriptor columns end in `Descriptor_DescriptorId`.

## Example: incremental extract with Change Queries

Before:

```http
GET /changeQueries/v1/availableChangeVersions
GET /data/v3/ed-fi/studentSchoolAssociations?minChangeVersion=1001&maxChangeVersion=2000
GET /data/v3/ed-fi/studentSchoolAssociations/deletes?minChangeVersion=1001&maxChangeVersion=2000
```

Now:

```http
GET /api/changeQueries/v1/availableChangeVersions
GET /api/data/ed-fi/studentSchoolAssociations?minChangeVersion=1001&maxChangeVersion=2000
GET /api/data/ed-fi/studentSchoolAssociations/deletes?minChangeVersion=1001&maxChangeVersion=2000
```

The parameters work the same way. See [Using the Changed Record Queries](/reference/ed-fi-api/8/client-developers-guide/using-the-changed-record-queries) and [Current Limitations](/reference/ed-fi-api/8/platform-dev-guide/features/changed-record-queries#current-limitations).

:::warning[Start your extracts again from scratch]

Because data is reloaded through the API, every record gets a new resource ID and change tracking starts fresh. Any process that stored ODS resource IDs or a last-processed change version must do a full load from Ed-Fi API v8 before it goes back to incremental extracts.

:::

:::info[Still being worked out]

- **Relational data model documentation.** The [Relational Data Model](/reference/ed-fi-api/8/technical-articles/relational-data-model) reference page is still being written. The SQL example above follows the current design and may change.
- **Snapshots.** Change Query snapshots are planned for a future release. Until then, there is no built-in point-in-time copy for data freezes.

:::
