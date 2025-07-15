---
sidebar_position: 4
---

# Key Structure in the Ed-Fi ODS / API

## Introduction

This article provides technical details on the key structure in the Ed-Fi ODS /
API.

## Resource IDs

The ODS / API assigns and exposes resource IDs to align with REST conventions.
These IDs do not act as a surrogate key in the ODS data store, although
uniqueness is enforced.

The following diagram shows Id in CourseOffering table, which stores the
resource ID for an offering:

![CourseOffering table](https://edfi.atlassian.net/wiki/download/attachments/22774867/image2020-6-29_9-13-52.png?version=1&modificationDate=1641861367127&cacheVersion=1&api=v2)

In the API surface, a CourseOffering can be looked up/queried by doing a HTTP
GET on a path like: `/courseOfferings/d0fd729db6ee4a7bbc989720e4f833f5`.

In the returned JSON, the resource ID appears as the `id` element:

![JSON resource ID](https://edfi.atlassian.net/wiki/download/attachments/22774867/json-resourceid.png?version=1&modificationDate=1641921865048&cacheVersion=1&api=v2)

When an element is POSTed (i.e., created in the ODS / API), the resource ID is
provided via a HTTP Header. It will look something like:

![API new resource header](https://edfi.atlassian.net/wiki/download/attachments/22774867/api-newresourceheader.png?version=1&modificationDate=1641921864972&cacheVersion=1&api=v2)

## USIs (Unique Surrogate Identifiers)

While most of the primary keys in ODS / API are natural keys (i.e., not
surrogate keys or identity columns), the Student, Parent, and Staff entities have the
integer-based surrogate key columns StudentUSI, PersonUSI, and StaffUSI. These columns contain a primary key, while the text-based StudentUniqueId, ParentUniqueId,
and StaffUniqueId natural key columns form unique indexes.

USI surrogates were introduced due to performance considerations with
primary indexes on non-numeric columns, and for the advantage they provide when the
natural key needs to be updated in these pivotal entities. With the USI surrogate in
place, the respective UniqueId field can be updated without having to cascade
updates through all related entities. See When Key Values Change: Cascading Updates for more details on cascading updates.

A key point with USIs is that integration with the ODS / API is done via the
text-based UniqueId. The integer-based USI is not visible to the API client and is used only as internal identifier.

The following diagram shows the StaffUSI primary key field and the StaffUniqueId
field in the Staff table:

![Staff table](https://edfi.atlassian.net/wiki/download/attachments/22774867/image2020-6-29_9-6-38.png?version=1&modificationDate=1641861367163&cacheVersion=1&api=v2)

## Natural Keys

The Ed-Fi ODS / API uses natural keys as its primary means of enforcing
uniqueness in records and maintaining relationships between records.

The data in the Ed-Fi ODS / API represents a rich domain with deep
relationships. The ODS data store data model is organized into aggregates based on the
principles of [Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design), and those aggregates are exposed as API resources. Since the ODS is not the
system of record (i.e., it is not the system that creates, manages, and is the
authoritative source for the data), primary keys are formed from the well-known,
natural keys in the domain.

### A Natural Key Example Using Bell Schedule Meeting Time

This section provides an example of how natural keys in the ODS / API work in
practice. Consider the following diagram, noting the composite key structure of
BellScheduleClassPeriod:

![Composite Key Model](https://edfi.atlassian.net/wiki/download/attachments/22774867/composite-key-model.png?version=1&modificationDate=1641921865000&cacheVersion=1&api=v2)

While SchoolId is present as a key in both BellSchedule and ClassPeriod, there
is only one SchoolId on the BellScheduleClassPeriod. This process of "merging"
the SchoolId column from the two keys is known as key unification. In turn, key unification is fundamentally what gives the composite key design
approach its power to enforce referential integrity deeply throughout the entire
data store — even when data is supplied from many different client systems of
record that do not communicate with each other.

### When Key Values Change: Cascading Updates

Natural keys are a good solution for the ODS / API because they solve the
problem of maintaining referential integrity throughout a deep data structure
maintained by client systems that are disconnected from each other. However, natural
keys come with an inherent challenge in that a change in a primary key value has
the potential to cascade through the primary keys of many child tables. Wherever
possible, the ODS / API uses natural keys that are stable and unlikely to change
— but change does occur in the real world.

An approach to deal with this challenge is to turn on the CASCADE UPDATE option
on all tables and let the database server handle it. Currently, the
as-shipped Ed-Fi ODS enables this behavior on selected entities such as Class Period, Grade,
Section, and so forth.

The article [How To: Enable Cascading Updates on Ed-Fi ODS / API Resources](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774844/How+To+Enable+Cascading+Updates+on+ODS+API+Resources) has the full list of entities covered in the as-shipped configuration as well
as steps for enabling CASCADE UPDATE on additional entities.

### Key Unification Report

Developers and database administrators may find the query in this section of
interest.

The query below identifies all locations within the Ed-Fi ODS data store where
key unification is occurring. The FOREIGN_TABLE_NAME and FOREIGN_COLUMN_NAME
columns represent the tables and columns where key unification is occurring (and
consequently, the FOREIGN_COLUMN_NAME values will always appear as identical values
in adjacent pairs of records).

```sql
WITH ForeignKeys AS (
-- Key column usage Primary/Foreign tables
SELECT KCU_FK.CONSTRAINT_NAME,
               KCU.TABLE_SCHEMA PRIMARY_TABLE_SCHEMA,
               KCU.TABLE_NAME PRIMARY_TABLE_NAME,
               KCU.ORDINAL_POSITION,
               KCU.COLUMN_NAME PRIMARY_COLUMN_NAME,
               KCU_FK.TABLE_SCHEMA FOREIGN_TABLE_SCHEMA,
               KCU_FK.TABLE_NAME FOREIGN_TABLE_NAME,
               KCU_FK.COLUMN_NAME FOREIGN_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE KCU
        JOIN INFORMATION_SCHEMA.TABLE_CONSTRAINTS TC
               ON KCU.CONSTRAINT_CATALOG=TC.CONSTRAINT_CATALOG
                       AND KCU.CONSTRAINT_SCHEMA=TC.CONSTRAINT_SCHEMA
                       AND KCU.CONSTRAINT_NAME=TC.CONSTRAINT_NAME
                       AND TC.CONSTRAINT_TYPE='PRIMARY KEY'
        JOIN INFORMATION_SCHEMA.REFERENTIAL_CONSTRAINTS RC
               ON RC.REFERENCED_CONSTRAINT_CATALOG=TC.CONSTRAINT_CATALOG
                       AND RC.REFERENCED_CONSTRAINT_SCHEMA=TC.CONSTRAINT_SCHEMA
                       AND RC.REFERENCED_CONSTRAINT_NAME=TC.CONSTRAINT_NAME
        JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE KCU_FK
               ON KCU_FK.CONSTRAINT_CATALOG=RC.CONSTRAINT_CATALOG
                       AND KCU_FK.CONSTRAINT_SCHEMA=RC.CONSTRAINT_SCHEMA
                       AND KCU_FK.CONSTRAINT_NAME=RC.CONSTRAINT_NAME
                       AND KCU_FK.ORDINAL_POSITION=KCU.ORDINAL_POSITION),
-- Find columns that are unified
UnifiedKeyColumns AS
(
       SELECT FOREIGN_TABLE_SCHEMA,
               FOREIGN_TABLE_NAME,
               FOREIGN_COLUMN_NAME
       FROM ForeignKeys
       GROUP BY FOREIGN_TABLE_SCHEMA, FOREIGN_TABLE_NAME, FOREIGN_COLUMN_NAME
       HAVING COUNT(DISTINCT PRIMARY_TABLE_NAME) > 1
)
-- Show results
SELECT fks.FOREIGN_TABLE_NAME, fks.FOREIGN_COLUMN_NAME, fks.PRIMARY_TABLE_NAME, fks.CONSTRAINT_NAME
FROM   ForeignKeys fks
               INNER JOIN UnifiedKeyColumns ukc
                       ON fks.FOREIGN_TABLE_NAME = ukc.FOREIGN_TABLE_NAME
                              AND fks.FOREIGN_COLUMN_NAME = ukc.FOREIGN_COLUMN_NAME
-- Criteria for Section related key unification
ORDER BY FOREIGN_TABLE_NAME, FOREIGN_COLUMN_NAME
```

### Unified Keys in the As-Shipped Ed-Fi ODS

Running the SQL Query above on the as-shipped ODS data store results in the
following report:

| FOREIGN_TABLE_NAME | FOREIGN_COLUMN_NAME | PRIMARY_TABLE_NAME | CONSTRAINT_NAME |
|--------------------|---------------------|-------------------|------------------|
| AccountAccountCode | EducationOrganizationId | Account | FK_AccountAccountCode_Account |
| AccountAccountCode | EducationOrganizationId | AccountCode | FK_AccountAccountCode_AccountCode |
| AccountAccountCode | FiscalYear | Account | FK_AccountAccountCode_Account |
| AccountAccountCode | FiscalYear | AccountCode | FK_AccountAccountCode_AccountCode |
| BellScheduleClassPeriod | SchoolId | BellSchedule | FK_BellScheduleClassPeriod_BellSchedule |
| BellScheduleClassPeriod | SchoolId | ClassPeriod | FK_BellScheduleClassPeriod_ClassPeriod |
| CourseOffering | SchoolId | School | FK_CourseOffering_School |
| CourseOffering | SchoolId | Session | FK_CourseOffering_Session |
| DisciplineActionStudentDisciplineIncidentAssociation | StudentUSI | DisciplineAction | FK_DisciplineActionStudentDisciplineIncidentAssociation_DisciplineAction |
| DisciplineActionStudentDisciplineIncidentAssociation | StudentUSI | StudentDisciplineIncidentAssociation | FK_DisciplineActionStudentDisciplineIncidentAssociation_StudentDisciplineIncidentAssociation |
| Grade | SchoolId | GradingPeriod | FK_Grade_GradingPeriod |
| Grade | SchoolId | StudentSectionAssociation | FK_Grade_StudentSectionAssociation |
| GradebookEntry | SchoolId | GradingPeriod | FK_GradebookEntry_GradingPeriod |
| GradebookEntry | SchoolId | Section | FK_GradebookEntry_Section |
| GradebookEntry | SchoolYear | GradingPeriod | FK_GradebookEntry_GradingPeriod |
| GradebookEntry | SchoolYear | Section | FK_GradebookEntry_Section |
