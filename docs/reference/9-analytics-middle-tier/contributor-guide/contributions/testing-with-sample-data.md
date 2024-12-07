# Testing With Sample Data

## Introduction

The Ed-Fi Alliance development team primarily uses two sample data sets for
testing, named Glendale and Northridge. These data sets are "realistic" but do
not represent real students. Community users will typically use different test
data, sourced from their own systems.

The way that data are stored in these various data sets can diverge
significantly: although the Ed-Fi Data Standard provides prescriptions for how
to store data, there are vendor-specific nuances and local business rules that
can cause the same conceptual data to be stored in slightly different ways. For
example, one system may track attendance by marking a student as present, where
another system tracks by marking them as absent — with absence of an attendance
record on a day when the student is enrolled implying that the student is
present.

In addition to the [unit
testing](./unit-test-framework.md) process
built into the Analytics Middle Tier code, we suggest that anyone developing new
views install the Glendale database for the Data Standard version(s) on which
they're developing. With that data set available, you can perform exploratory
testing of the output from new views. While it is impossible to predict the
query outcome before writing the query, exploratory testing can:

* Confirm that all columns have a value (no nulls).
* Investigate if a view returns zero records, looking carefully to ensure it
    is due to a lack of data in the source database rather than due to improper
    join conditions or where clauses.

In the latter case, you can add a few missing records manually to test the
output. When submitting views to the Alliance for inclusion in an upcoming
Analytics Middle Tier release, save any records added manually in a SQL script
and attach the script to the Tracker ticket for the submission. This allows the
Ed-Fi development team to repeat the same testing.

:::info

The Northridge database only exists for Data Standard 3+. The Ed-Fi development
focuses most of its testing effort on the Glendale data set for comparisons
between Data Standard 2.2 and Data Standard 3+. Northridge is made available for
additional testing on a different sample data set.

:::

## Sample Data Sets

:::tip

Many of these files are in bacpac format instead of SQL backup files. The format
provides a much smaller file size, which comes at the expense of a slower
restoration process. Instructions from Microsoft: [Import a BACPAC File to
Create a New User
Database](https://docs.microsoft.com/en-us/sql/relational-databases/data-tier-applications/import-a-bacpac-file-to-create-a-new-user-database?view=sql-server-ver15).
PostgreSQL files should be restored using `psql.exe --file <file path>`,
not `pg_restore.exe` .

:::

### Grand Bend

Available for all data standards and ODS/API technology versions. This is the
"populated template" that comes with the application by default. It contains
about 2,000 students.

### Glendale

This data set contains about 48,000 students, and was created by anonymizing
real data from a Local Education Agency (LEA) in the early days of Ed-Fi.

| Data Standard | ODS / API | Download Link |
| --- | --- | --- |
| ​2.2 | 2.4.0, 2.5.1, 2.6​.0 | [EdFi\_Ods\_Glendale\_v22.bacpac](https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Ods_Glendale_v22.bacpac) |
| 3.1 | 3.1.1, 3.2.0 | [EdFi\_Ods\_Glendale\_v32\_20200224\_Azure.bacpac](https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Ods_Glendale_v32_20200224_Azure.bacpac) |
| 3.2a | 3.3.0 | [EdFi\_Ods\_Glendale\_v33\_20200224\_Azure.bacpac](https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Ods_Glendale_v33_20200224_Azure.bacpac) |
| 3.2b | 3.4.0 | SQL Server: [EdFi\_Ods\_Glendale\_v34\_20200506\_Azure.bacpac](https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Ods_Glendale_v34_20200506_Azure.bacpac)<br/><br/>PostgreSQL 11: [EdFi\_Ods\_Glendale\_v34\_20200506\_PG11.7z](https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Ods_Glendale_v34_20200506_PG11.7z) |
| 3.2c | 5.0.0 | SQL Server: [EdFi\_Ods\_Glendale\_v500\_20200909\_Azure.bacpac](https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Ods_Glendale_v500_20200909_Azure.bacpac) <br/><br/>PostgreSQL 11: [EdFi\_Ods\_Glendale\_v50\_20210106\_PG11.7z](https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Ods_Glendale_v50_20210106_PG11.7z) |
| 3.2c | 5.1.0 | SQL Server: [EdFi\_Ods\_Glendale\_v51\_20210114.7z](https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Ods_Glendale_v51_20210114.7z) or   <br/>                     [EdFi\_Ods\_Glendale\_v51\_20210224\_Azure.bacpac](https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Ods_Glendale_v51_20210224_Azure.bacpac)<br/><br/>PostgreSQL 11: [EdFi\_Ods\_Glendale\_v51\_20210112\_PG11.7z](https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Ods_Glendale_v51_20210112_PG11.7z) |
| 3.3a | 5.2 | SQL Server: [EdFi\_Ods\_Glendale\_v52\_20220120.7z](https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Ods_Glendale_v52_20220120.7z) <br/><br/>PostgreSQL 11: [EdFi\_Ods\_Glendale\_v52\_20220120\_PG11.7z](https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Ods_Glendale_v52_20220120_PG11.7z) |
| 3.3b | 5.3 | SQL Server: [EdFi\_Ods\_Glendale\_v53\_20220120.7z](https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Ods_Glendale_v53_20220120.7z)<br/><br/>PostgreSQL 11: [EdFi\_Ods\_Glendale\_v53\_20220120\_PG11.7z](https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Ods_Glendale_v53_20220120_PG11.7z) |
| 4.0a | 6.0 | SQL Server: [EdFi\_Ods\_Glendale\_v60\_20220930.7z](https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Ods_Glendale_v60_20220930.7z)<br/><br/>PostgreSQL 13: [EdFi\_Ods\_Glendale\_v60\_20221011\_PG13.7z](https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Ods_Glendale_v60_20221011_PG13.7z) |
| 4.0 | 6.1, 6.2 | SQL Server: [EdFi\_Ods\_Glendale\_v61\_20230106.7z](https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Ods_Glendale_v61_20230106.7z)<br/><br/>PostgreSQL 13: [EdFi\_Ods\_Glendale\_v61\_20230111\_PG13.7z](https://odsassets.blob.core.windows.net/public/Glendale/EdFi_Ods_Glendale_v61_20230111_PG13.7z) |

### Northridge

This data set contains about 21,000 students, and was created synthetically
using the [Ed-Fi Sample Data
Generator](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22495849/Ed-Fi+Sample+Data+Generator).

| Data Standard | ODS / API | Download Link |
| --- | --- | --- |
| ​3.1 | ​3.1.1 | [EdFi\_Ods\_Northridge-3.1.0.bacpac](https://odsassets.blob.core.windows.net/public/Northridge/EdFi_Ods_Northridge-3.1.0.bacpac) |
| 3.1 | 3.2.0 | [EdFi\_Ods\_3.2.0\_Northridge.bacpac](https://odsassets.blob.core.windows.net/public/Northridge/EdFi_Ods_3.2.0_Northridge.bacpac) |
| 3.2b | 3.4.0 | SQL Server: [EdFi\_Ods\_Northridge\_v34\_20200506.7z](https://odsassets.blob.core.windows.net/public/Northridge/EdFi_Ods_Northridge_v34_20200506.7z)<br/><br/>PostgreSQL 11: [EdFi\_Ods\_Northridge\_v34\_20200506\_PG11.7z](https://odsassets.blob.core.windows.net/public/Northridge/EdFi_Ods_Northridge_v34_20200506_PG11.7z) |
| 3.2c | 5.0.0 | SQL Server: [EdFi\_Ods\_Northridge\_v500\_20200909.7z](https://odsassets.blob.core.windows.net/public/Northridge/EdFi_Ods_Northridge_v500_20200909.7z) |
| 3.2c | 5.1.0 | SQL Server: [EdFi\_Ods\_Northridge\_v51\_20210224.7z](https://odsassets.blob.core.windows.net/public/Northridge/EdFi_Ods_Northridge_v51_20210224.7z) |
| 3.3a | 5.2 | SQL Server: [EdFi\_Ods\_Northridge\_v52\_20220120.7z](https://odsassets.blob.core.windows.net/public/Northridge/EdFi_Ods_Northridge_v52_20220120.7z)<br/><br/>PostgreSQL 11: [EdFi\_Ods\_Northridge\_v52\_20220120\_PG11.7z](https://odsassets.blob.core.windows.net/public/Northridge/EdFi_Ods_Northridge_v52_20220120_PG11.7z) |
| 3.3b | 5.3 | SQL Server:  [EdFi\_Ods\_Northridge\_v53\_20220120.7z](https://odsassets.blob.core.windows.net/public/Northridge/EdFi_Ods_Northridge_v53_20220120.7z)<br/><br/>PostgreSQL 11: [EdFi\_Ods\_Northridge\_v53\_20220120\_PG11.7z](https://odsassets.blob.core.windows.net/public/Northridge/EdFi_Ods_Northridge_v53_20220120_PG11.7z) |
| 4.0a | 6.0 | SQL Server:  [EdFi\_Ods\_Northridge\_v60\_20220930.7z](https://odsassets.blob.core.windows.net/public/Northridge/EdFi_Ods_Northridge_v60_20220930.7z)<br/><br/>PostgreSQL 13: [EdFi\_Ods\_Northridge\_v60\_20221011\_PG13.7z](https://odsassets.blob.core.windows.net/public/Northridge/EdFi_Ods_Northridge_v60_20221011_PG13.7z) |
| 4.0 | 6.1, 6.2 | SQL Server:  [EdFi\_Ods\_Northridge\_v61\_20230106.7z](https://odsassets.blob.core.windows.net/public/Northridge/EdFi_Ods_Northridge_v61_20230106.7z)<br/><br/>PostgreSQL 13: [EdFi\_Ods\_Northridge\_v61\_20230111\_PG13.7z](https://odsassets.blob.core.windows.net/public/Northridge/EdFi_Ods_Northridge_v61_20230111_PG13.7z) |
