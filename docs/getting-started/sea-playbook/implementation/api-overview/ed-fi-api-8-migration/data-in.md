---
sidebar_position: 7
---

# Data In

Some states write straight into ODS tables: identity systems that fill the Student or Staff tables, loads from files for districts whose SIS has no Ed-Fi integration, and SQL ETL jobs that sync state-owned data. None of these work on Ed-Fi API v8.

## Before and after

| | ODS/API | Ed-Fi API v8 |
| --- | --- | --- |
| Writing data | Through the API, or with SQL straight into ODS tables | Through the API only |
| File loads | SQL or SSIS from files, or the Bulk Load Client | The Bulk Load Client, through the API |
| Identity system integration | Custom `IUniqueIdentity` implementation built into the ODS/API ([Unique ID System Integration](/reference/ed-fi-api/technical-articles/unique-id-system-integration)) | No equivalent yet (see below) |
| Validation on write | Custom code in the ODS/API | No equivalent yet (see below) |

Every row in an Ed-Fi API v8 table is linked to internal records the API maintains, and the API enforces references, authorization and change tracking. See [Direct Database Access Patterns](/reference/ed-fi-api/8/whats-new/release-notes#direct-database-access-patterns).

## Start with an inventory

List every process that writes to the ODS database without going through the API. For each one, note what it writes, where the data comes from, and how often it runs. Each needs a new route through the API.

## Example: an identity system loading students

Before, an ETL job inserted rows into `edfi.Student`:

```sql
INSERT INTO edfi.Student (StudentUniqueId, FirstName, LastSurname, BirthDate)
SELECT StateStudentId, FirstName, LastName, BirthDate
FROM StateIdentity.dbo.NewStudents;
```

Now the job sends each student to the API. Create an API client for the job with a claimset that allows creating students.

```http
POST /api/data/ed-fi/students
Authorization: Bearer <token>
Content-Type: application/json

{
  "studentUniqueId": "1234567890",
  "firstName": "Maria",
  "lastSurname": "Lopez",
  "birthDate": "2015-09-01"
}
```

Property names are case-sensitive on Ed-Fi API v8. A wrongly cased optional property is dropped without an error. See [Case-Sensitive Property Names](/reference/ed-fi-api/8/whats-new/release-notes#case-sensitive-property-names).

## Example: files from districts without an Ed-Fi SIS

Before, files were loaded into ODS tables with SQL or SSIS. Now, convert the files to Ed-Fi XML interchange format and load them with the Bulk Load Client, as shown on [Seed Data and Annual Rollover](./seed-data-and-annual-rollover.md#example-loading-seed-data). The Bulk Load Client only sends records that changed since the last run.

:::info[Still being worked out]

- **Identity system integration.** The ODS/API let states plug in their own unique identity system. Ed-Fi API v8 has a design for this using plugins, but it is not built yet.
- **Custom validation on write.** Also planned through plugins and not built yet.
- **Recommended patterns for direct writes.** We want to hear how your state writes directly to the ODS today, so we can publish a replacement for each common pattern. Tell us through the [Ed-Fi Community](/community).

:::
