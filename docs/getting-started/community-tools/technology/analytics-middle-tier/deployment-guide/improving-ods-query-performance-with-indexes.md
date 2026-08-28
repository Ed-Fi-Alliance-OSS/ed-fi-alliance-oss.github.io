# Improving ODS Query Performance With Indexes

## Overview

The Analytics Middle Tier views — especially _fact-type_ views — are complex and
contain many conditions in the JOIN and WHERE clauses. The ODS database is
optimized for high performance on REST API operations, necessarily striking a
balance between write and read performance. Thus there are performance-enhancing
[indexes](https://www.red-gate.com/simple-talk/sql/learn-sql-server/sql-server-index-basics/)
on natural keys, which are used in some GET requests, but not much else. Adding
other indexes can significantly boost performance of ad hoc queries and
permanent views such as those created by the Analytics Middle Tier, but they
come with a cost: higher disk space utilization and slower write performance.

## Optional Indexes

In addition to the [optional AMT
Collections](../user-guide/collections/readme.md), there exists an option to
install extra indexes that significantly improve the performance of some of the
AMT queries. Install is simple: just provide the "indexes" keyword on the
options flag (`-o`  or `--options`):

```powershell
.\EdFi.AnalyticsMiddleTier.Console.exe -c "..." -o indexes
```

This installs the following indexes:

| Table | On Columns | Include Columns |
| --- | --- | --- |
| ​edfi.Grade | StudentUSI, SchoolId, LocalCourseCode, SchoolYear, SectionIdentifier, SessionName | NumericGradeEarned​ |
| edfi.StudentSectionAssociation | SchoolId, LocalCourseCode, SchoolYear, SessionName | EndDate, LastModifiedDate |
| edfi.AcademicSubjectType  <br/>(Data Standard v2.2 only) | CodeValue | (none) |

On the Glendale ,
the `Grade`  table storage allocation grows by approximately 9% with the
addition of this index: 75 MB additional space for sample grade data covering
16,724 students. This is not a significant additional burden, and may not cause
a noticeable performance impact. The impact for a large district or a state,
however, could be problematic for write performance to the Grade table. The
storage allocation for `StudentSectionAssociation`  similarly grows by about 10%
in Glendale, with approximately 30 MB dedicated to the new index. The v2.2-only
`AcademicSubjectType` index has a negligible footprint.

<details>
<summary>Expand source</summary>

```sql title="Query for index size"
SELECT
    tn.[name] AS [Table name],
    ix.[name] AS [Index name],
    SUM(sz.[used_page_count]) * 8 AS [Index size (KB)]
FROM
    sys.dm_db_partition_stats AS sz
INNER JOIN
    sys.indexes AS ix
ON
    sz.[object_id] = ix.[object_id]
AND
    sz.[index_id] = ix.[index_id]
INNER JOIN
    sys.tables tn
ON
    tn.OBJECT_ID = ix.object_id
GROUP BY
    tn.[name],
    ix.[name]
ORDER BY
    3 desc
```

</details>

## Adding New Indexes

If you have a performance problem on one or more views, one of the [patterns for
limiting impact on the
ODS](./limiting-impact-on-the-production-ods.md) is to
copy the data to a reporting server via replication or log shipping. This
reporting database is a better place for adding the optional indexes collection.
Once you have created some representative queries against the Analytics Middle
Tier views, either directly or through a BI/reporting tool, you may find that
the performance warrants another look at additional indexes. [Don't just blindly
create those "missing"
indexes!](https://sqlperformance.com/2013/06/t-sql-queries/missing-index) is a
good reference article on how to detect potential indexes and decide on whether
to implement them.

Alternatively, if the views all return within minutes (where microseconds to
seconds is the objective), then you may benefit from streaming the view contents
out to new tables on another database, where you can then optimize a concrete
table instead of optimizing a view.

## LastModifiedDate

Finally, a special word about LastModifiedDate: this column is used on many
different tables for display only; it is not part of the WHERE clause or other
selection criteria in the Analytics Middle Tier views. However, if you are
regularly querying for changed records based on this column, your query time
will benefit greatly from adding an index on this column to the key tables used
by the [Core View
Collection](../user-guide/collections/core-view-collection/readme.md)
and/or other view collections.
