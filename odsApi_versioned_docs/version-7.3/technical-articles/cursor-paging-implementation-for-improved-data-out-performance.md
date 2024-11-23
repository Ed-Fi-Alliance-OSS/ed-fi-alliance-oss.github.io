
# Cursor Paging for Improved Data Out Performance

## Overview

The Ed-Fi ODS/API now supports "Cursor Paging" for API clients which is implemented using seek-based (or keyset) paging at the database level. This was done to address the known performance issues associated with traditional Limit/Offset Paging when operating on large datasets.

This feature introduces an `AggregateId` column in each aggregate/resource "root" table for efficient sorting and paging and a `partitions` child endpoint for continued support of client-side parallel processing (which Limit/Offset paging inherently supports due to its random access characteristics).

## Key Components

### AggregateId Column

A new `AggregateId` column has been added to each aggregate root table. This column's value is assigned when each record is inserted using a table-specific sequence object that uses the full range of the 32-bit signed integer values, starting from -2147483648.

The introduction and use of this column has simplified the sorting and paging implementation in the API. Previously, all results were sorted using the root table's primary key which, given the use of a composite key structure in the Ed-Fi ODS, often involves multiple columns of varying data types. Additionally, the page-level inclusion of records was determined using the GUID-based "Id" column. The potentially poor performance characteristics of UUID-based indexes (with 128-bit values) are well documented, and the switch to using indexed 32-bit values has serendipitously improved the performance for existing API integrations that will still be using Limit/Offset paging.

### The "Cursor Paging" Abstraction

Clients receive a Base64-encoded page token representing the `AggregateId` in the header of the response for each `GET` request. The page token values are built by Base64-encoding the AggregateId value that represents the following page's first record, and then lightly massaging the encoded value to make it URL-friendly. When the API receives a page token on a request, it reverses the processing back into an AggregateId value and incorporates it into the database queries appropriately.

### Partitions Endpoint

While Limit/Offset Paging provides inherent support for parallel processing due to its "random access" characteristics, seek paging requires that pages be processed sequentially since each page is based on what was retrieved for the previous page.

To address this, a new `/partitions` child endpoint is supported for each resource. A window query is executed to split the entire data set available to the API client into equally sized "partitions", where each partition's starting point is represented by a record's AggregateId.

The construction of page tokens for a partition follows a similar process to the one described above, but the partition's page token includes the minimum and maximum AggregateId values of the partition. When the API client then requests pages using these tokens, the AggregateId values are incorporated into the page-level queries, as shown in the partial query listing below:

```sql
SELECT  r.AggregateId
FROM    edfi.Grade AS r
WHERE   AggregateId BETWEEN @MinAggregateId AND @MaxAggregateId
ORDER BY r.AggregateId
```

The API determines a new "minimum" AggregateId based on the last record returned with the current request and re-encodes it with the same "maximimum" AggregateId (which represents the end of the partition). The result is an opaque page token that allows a single client-side thread to process all the pages of a given partition sequentially in parallel with other threads processing pages from other partitions.

### Performance Observations

While limited in scope, some performance evaluation of the various paging approaches was performed using the Northridge data set. The results below show timings of individual page requests of 5,000 items about 80% into the total scope of the data.

* _/ed-fi/studentGradebookEntries_ - 7M records, authorized using a single view join
* _/ed-fi/grades_ - 800K records, authorized using two view joins

**Seek-based Paging** -- _Legacy Limit/Offset paging (based on "Id") vs. Seek-based paging_

| Resource | Limit/Offset (legacy) | Seek-based |
|----|----:|---:|
| _/grades_ | 11.28 s | 1.10 s |
| _/studentGradebookEntries_ | 26.00 s | 0.86 s |

**Limit/Offset Paging** -- _Serendipitous improvement just from use of 32-bit AggregateId for sorting and paging_

| Resource | Id-based | AggregateId-based |
|----|----:|---:|
| _/grades_ | 11.28 s | 3.13 s |
| _/studentGradebookEntries_ | 26.00 s | 2.95 s |

### Other Notes

Cursor paging was not implemented for the Change Queries child endpoints `/keyChanges` and `/deletes` since the primary benefits for the paging approach will be seen on larger data sets and there should be significantly fewer items to process on these endpoints. Additionally, these endpoints will generally be accessed by API clients performing change processing using `minChangeVersion` and/or `maxChangeVersion` parameters which will apply criteria to the queries using the indexed `ChangeVersion` column. These queries will exhibit similar performance characteristics to those using `AggregateId` range constraints.
