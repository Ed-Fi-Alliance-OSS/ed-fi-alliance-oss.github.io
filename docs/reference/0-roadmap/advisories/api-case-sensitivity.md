---
sidebar_position: 8
---

# Advisory: API Case Sensitivity Issue

April 27, 2022

Differences in string matching between database server and API source code may
result in failures in API GET operations in some API versions.  This could
potentially hamper synchronization process carried out by SIS systems to ensure
ODS stays current with the SIS system. This document provides guidance and
resolutions to the issue identified.

## Issue

There is inherent differences in string handling between SQL Server and
NHibernate, the open source object-relational mapper (ORM) used in the API for
database queries.

[SQL Server uses case insensitive collation
(SQL_Latin1_General_CP1_CI_AS)](https://docs.microsoft.com/en-us/sql/relational-databases/collations/set-or-change-the-server-collation?view=sql-server-ver15#server-collation-in-sql-server)
by default.

[SQL Server ignores trailing spaces during string
comparison](https://support.microsoft.com/en-us/topic/inf-how-sql-server-compares-strings-with-trailing-spaces-b62b1a2d-27d3-4260-216d-a605719003b0)

NHibernate, on the other hand, performs case sensitive string comparison and
does not ignore the trailing white spaces. These differences in string matching
between database server and ORM can cause issues with string fields that are
part of identities when dealing with references. NHibernate fails to correctly
link the references if there is a difference in case when it hydrates references
into the system.

## Symptoms

Scenario: If a resource is posted with a refence containing string identifier
with a different case than it occurs in the parent resource, GET fails when
result set contains that resource.

e.g.

```json title="POST/PUT grades"
 {
    "gradingPeriodReference": {
      "gradingPeriodDescriptor": "uri://ed-fi.org/GradingPeriodDescriptor#First Six Weeks",
      "periodSequence": 1,
      "schoolId": 255901001,
      "schoolYear": 2022
    },
    "studentSectionAssociationReference": {
      "beginDate": "2021-08-23T00:00:00Z",
      "localCourseCode": "ALG-1",
      "schoolId": 255901001,
      "schoolYear": 2022,
      "sectionIdentifier": "25590100102Trad220ALG112011",
      "sessionName": "2021-2022 Fall Semester",
      "studentUniqueId": "604822"
    },
    "gradeTypeDescriptor": "uri://ed-fi.org/GradeTypeDescriptor#Grading Period",
    "numericGradeEarned": 63,
    "learningStandardGrades": [
      {
        "learningStandardReference": {
          "learningStandardId": "111.32.NA.A.1.D"
        },
        "numericGradeEarned": 63
      }
    ]
  }
```

Here sessionName in studentSectionAssociationReference is POSTed as "2021-2022
Fall Semester" while it appears as "2021-2022 fall semester" in the session
resource.

```json title="POST/PUT session showing parent resource"
 {
    "id": "3a52123e175b4d83bec41d04f13d2ef0",
    "schoolReference": {
      "schoolId": 255901001
    },
    "schoolYearTypeReference": {
      "schoolYear": 2022
    },
    "sessionName": "2021-2022 fall semester",
    "beginDate": "2021-08-23",
    "endDate": "2021-12-17",
    "termDescriptor": "uri://ed-fi.org/TermDescriptor#Fall Semester",
    "totalInstructionalDays": 81
     ...
  }
```

In this scenario, POST/PUT succeeds but subsequently, ODS / API returns a 500
error on GET (both GET all and GET by Id) calls that include a result with
casing mismatch.  API logs contain "NHibernate.LazyInitializationException:"
ERROR.

## Affected Versions

| Version                                                                      | Release Date             | Target School Year | Action                     |
| ---------------------------------------------------------------------------- | ------------------------ | ------------------ | -------------------------- |
| [5.3](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V53/overview)           | 12 Nov 2021              | 2022-2023          | Binary and Source Code fix |
| [5.2](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V520)                   | 29 Apr 2021              | 2021-2022          | Source Code fix            |
| [5.1](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V510/overview)          | 10 Nov 202               | 2021-2022          | Source Code fix            |
| [5.0.0, 5.0.1](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V500/overview) | 31 Jul 2020, 02 Oct 2020 | 2020-2021          | Assess Demand              |
| [3.4.0, 3.4.1](https://edfi.atlassian.net/wiki/spaces/ODSAPI34)              | 20 Apr 202, 02 Oct 2020  | 2020-2021          | Assess Demand              |

\* For versions marched with 'Assess Demand', Ed-Fi will assist individual
implementations and release patches if there is sufficient aggregated demand.
Reasoning behind this is that these releases target noncurrent school years and
many hosts depend on source code deployments which do not rely on release
binaries.

## Cause

While differences in case sensitivity and trailing space handling during string
comparison is not new in the ODS / API, manifestation of 500 error was
introduced in v3.4 due to change in NHibernate session handling. In v3.3 and
prior versions, API made a second database call to fetch the references affected
by the mismatched case. In v3.4 and above the second database call fails due to
closed session.

## Resolution

This issue is fixed in the following source code and binary releases:

* [Ed-Fi-ODS/v5.3-hotfix1](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/tree/v5.3-hotfix1)
* [Ed-Fi-ODS-Implementation/v5.3-hotfix1](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/tree/v5.3-hotfix1)
* [Ed-Fi-ODS-Docker/v2.1.1](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Docker/tree/v2.1.1)
* (Binary) [EdFi.Suite3.Ods.WebApi
  5.3](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging?_a=package&feed=EdFi%40Release&package=EdFi.Suite3.Ods.WebApi&version=5.3.1434&protocolType=NuGet)

Older versions can cherry pick
[changes](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/pull/396/commits/7852658ea41bf1bb8af7375d056e18593d50dfd6):

```powershell
git cherry-pick 7852658ea41bf1bb8af7375d056e18593d50dfd6
```
