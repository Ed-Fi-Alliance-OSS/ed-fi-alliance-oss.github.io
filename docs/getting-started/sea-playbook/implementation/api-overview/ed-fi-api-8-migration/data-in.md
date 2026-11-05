---
sidebar_position: 7
---

# Data In

Some states write straight into ODS tables: identity systems that fill the Student or Staff tables, loads from files for districts whose SIS has no Ed-Fi integration, and SQL ETL jobs that sync state-owned data. None of these work on Ed-Fi API v8.

## Before and after

| | ODS/API | Ed-Fi API v8 |
| --- | --- | --- |
| Writing data | Through the API, or with SQL straight into ODS tables | Through the API only |
| File loads | SQL or SSIS from files, or the Bulk Load Client | Through the API (recommended approach still being worked out) |
| Identity system integration | Custom `IUniqueIdentity` implementation built into the ODS/API ([Unique ID System Integration](/reference/ed-fi-api/technical-articles/unique-id-system-integration)) | From 8.1, a custom validator plugin that checks UniqueIds against your identity system ([UniqueId Validation](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/main/docs/UNIQUEID-VALIDATION.md)), and an optional Identity API backed by an identity plugin ([Identity Management](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/main/docs/IDENTITY-MANAGEMENT.md)) |
| Validation on write | Custom code in the ODS/API | From 8.1, custom validator plugins ([Custom Validation](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/main/src/dms/core/EdFi.DataManagementService.CustomValidation/CUSTOM-VALIDATION.md)) |

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

:::info[Still being worked out]

- **Rewriting identity and validation code as plugins.** ODS/API customizations for identity systems and validation have to be rewritten against the Ed-Fi API v8 plugin contracts. Tell us what your state's code does through the [Ed-Fi Community](/community), so we can check that the plugins cover it.
- **Files from districts without an Ed-Fi SIS.** On the ODS/API, some states load these files into ODS tables with SQL or SSIS. We have not settled on a recommended replacement. One option is to store the data as Ed-Fi JSON files and load them through the API with a simple client such as [lightbeam](https://github.com/edanalytics/lightbeam). Tell us how your state handles these files through the [Ed-Fi Community](/community).
- **Recommended patterns for direct writes.** We want to hear how your state writes directly to the ODS today, so we can publish a replacement for each common pattern. Tell us through the [Ed-Fi Community](/community).

:::
