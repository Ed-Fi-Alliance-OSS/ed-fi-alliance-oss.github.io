# Improve Paging Performance on Large API Resources

:::warning

This article describes an older technique for paging using change versions. For
new implementations, see [Improve Paging Performance with Partitioned Cursor
Paging](./improve-paging-performance-cursor-paging.md).

:::

## Introduction

The Ed-Fi API supports Offset Paging (through the `offset` and `limit` query
string parameters on API requests) and [cursor
paging](./improve-paging-performance-cursor-paging.md) (through the `pageToken`
and `pageSize` parameters). Offset Paging is known to suffer from increasingly
poor database performance as the underlying data set gets larger. This article
describes a mechanism you can use through the API to engage a technique known as
"Keyset Paging" to improve the execution plan used by the database during
paging. While this may not be the most optimal solution for all implementations,
it may provide improved API paging performance on large datasets by utilizing
artifacts from the existing change query feature.

## Standard API Paging (Offset Paging)

When retrieving all the data from an API resource, API clients will issue a
series of paged requests (using Offset Paging via the `offset` and `limit`
parameters) that look something like the following:

```text
GET /api/data/ed-fi/studentSectionAttendanceEvents?offset=0&limit=500

GET /api/data/ed-fi/studentSectionAttendanceEvents?offset=500&limit=500

GET /api/data/ed-fi/studentSectionAttendanceEvents?offset=1000&limit=500
```

On large data sets, you may notice increasing levels of performance degradation
as the page requests get deeper due to the growing number of reads being
performed by the database engine with each successive request.

## Keyset Paging using Change Queries

While you're most likely not using Change Queries for processing changes when
you start to see the paging-related performance degradation, you can actually
use the features of the Change Queries API to engage Keyset Paging in the
underlying database queries.

:::info

Keyset Paging works by applying range-based criteria for column(s) with unique
values that are also backed by an index. This enables the query optimizer to
limit the amount of data being processed with the request using an index seek,
and therefore limit the number of rows that are read. Fortunately, to support
Change Queries the API maintains an indexed change version for each resource,
which happens to fit the requirements for using Keyset Paging. However, while
the change version is suitable for Keyset paging, it is not the best candidate.
The Change Version values are determined by a global shared sequence, and thus
the value increases with every change made in the database. Also the
distribution of records in a given resource across an arbitrarily chosen range
of Change Version values is not likely to be uniform.

:::

The following steps illustrate how to use Change Queries to engage Keyset
Paging. Since this example uses a sample dataset that is bulk loaded in
resource dependency order, the records in each resource are clustered closely
together (in terms of their Change Version values against the whole range of
possible values). Due to the pattern of data load utilized, this example is not
depicting the most optimal Keyset paging but can be used to understand the
mechanism involved.

### Step 1 - Obtain the maximum available change version

To identify the possible range values for your partitions, you must first obtain
the newest change version value from your source API by sending a GET request to
the _availableChangeVersions_ resource:

```none
GET /api/changeQueries/v1/availableChangeVersions
accept: application/json
authorization: Bearer fghjklrftyuiofghjk

--> Response body:

{
  "oldestChangeVersion": 0,
  "newestChangeVersion": 112317
}
```

### Step 2 - Obtain the total count of items in the resource

Send a request to the resource with the `totalCount=true` query string
parameter and get the total item count from the `Total-Count` response header.

```none
GET /api/data/ed-fi/studentSectionAttendanceEvents?totalCount=true&limit=0
accept: application/json
authorization: Bearer fghjklrftyuiofghjk

--> Reply headers:

Total-Count: 4332
```

### Step 3 - Define the partitions as ranges of Change Version values

Decide what your ideal partition size is for your needs. The API will be
performing Offset Paging within each partition, so they shouldn't be too big or
too small. For example, if you are processing a resource with 2 million items,
you might target a partition size of 50,000 items. That way, instead of
attempting to process all the data at once, you're processing about 40 smaller
partitions of data and the paging performance within each of the smaller
partitions will be greatly improved.

Use the following formula to determine the number of partitions:

`# of partitions =  item count / partition size`

Next, use the following formula to determine the size of the ranges (expressed
in the Change Version values):

`range size = max change version / # of partitions`

For the purpose of this example, we'll target a partition size of 1,000 against
4,332 total items.

`4332 / 1000 = 4.332 partitions`

Rounding up to 5 partitions, we'll now need to divide the available Change
Version values accordingly to get the approximate range size:

`112317 / 5 = 22463.4`

Thus, our partitions will be defined based on Change Versions roughly as
follows:

| Partition | minChangeVersion | maxChangeVersion |
| --------- | ---------------- | ---------------- |
| 1         | 0                | 22463            |
| 2         | 22464            | 44926            |
| 3         | 44927            | 67390            |
| 4         | 67391            | 89853            |
| 5         | 89854            | 112317           |

Add each partition's range to the queries with the `minChangeVersion` and
`maxChangeVersion` query string parameters. Give every partition a
`maxChangeVersion`, including the last one, which uses the
`newestChangeVersion` from Step 1.

Against live data, a request with no `maxChangeVersion` is paged in record
order instead of change version order. It can't use the change version index
efficiently, and records that change during the walk move into the last
partition and shift its offsets.

Even with an upper bound, a record updated during the walk gets a new change
version and leaves its partition. That shifts the partition's offsets and can
cause another, unchanged record to be skipped, which the next synchronization
won't return. To avoid this, read from a snapshot (`Use-Snapshot: true`), where
records don't change during the walk, or use [cursor
paging](./improve-paging-performance-cursor-paging.md).

### Step 4 - Issue paged requests to retrieve all data from each partition

For each partition, send requests with the appropriate `minChangeVersion`
and `maxChangeVersion` parameters, along with the Offset Paging parameters
of `limit` and `offset` until all data in each partition has been retrieved.

With a sample data set loaded, the Change Version value ranges defined above
for partitions 1, 3, 4 and 5 actually return no items.

```none
GET /api/data/ed-fi/studentSectionAttendanceEvents?offset=0&limit=500&minChangeVersion=0&maxChangeVersion=22463
accept: application/json
authorization: Bearer fghjklrftyuiofghjk

--> Response body:

[]
```

This is because the effectiveness of the technique is greatly influenced by the
pattern of loading and/or usage by API clients on the underlying database. In
this case, the sample data set is loaded en-masse in resource dependency order,
and thus the StudentSectionAttendanceEvent records are not well distributed
across the partition ranges we've calculated (they're clustered together with
Change Version values that place them all in partition 2, as we've defined
them).

The following request shows that data is returned for the first page of the
second partition:

```none
GET /api/data/ed-fi/studentSectionAttendanceEvents?offset=0&limit=500&minChangeVersion=22464&maxChangeVersion=44926
accept: application/json
authorization: Bearer fghjklrftyuiofghjk

--> Response body:

[
  {
    "id": "....",
    "sectionReference": {
      ...
    }
    ...
  }
]
```

So for this example, the following requests would be sent to the API:

#### Partition 1 (0 items)

```text
GET /api/data/ed-fi/studentSectionAttendanceEvents?offset=0&limit=500&minChangeVersion=0&maxChangeVersion=22463
```

#### Partition 2 (4,332 items)

```text
GET /api/data/ed-fi/studentSectionAttendanceEvents?offset=0&limit=500&minChangeVersion=22464&maxChangeVersion=44926
GET /api/data/ed-fi/studentSectionAttendanceEvents?offset=500&limit=500&minChangeVersion=22464&maxChangeVersion=44926
GET /api/data/ed-fi/studentSectionAttendanceEvents?offset=1000&limit=500&minChangeVersion=22464&maxChangeVersion=44926
GET /api/data/ed-fi/studentSectionAttendanceEvents?offset=1500&limit=500&minChangeVersion=22464&maxChangeVersion=44926
GET /api/data/ed-fi/studentSectionAttendanceEvents?offset=2000&limit=500&minChangeVersion=22464&maxChangeVersion=44926
GET /api/data/ed-fi/studentSectionAttendanceEvents?offset=2500&limit=500&minChangeVersion=22464&maxChangeVersion=44926
GET /api/data/ed-fi/studentSectionAttendanceEvents?offset=3000&limit=500&minChangeVersion=22464&maxChangeVersion=44926
GET /api/data/ed-fi/studentSectionAttendanceEvents?offset=3500&limit=500&minChangeVersion=22464&maxChangeVersion=44926
GET /api/data/ed-fi/studentSectionAttendanceEvents?offset=4000&limit=500&minChangeVersion=22464&maxChangeVersion=44926
```

#### Partition 3 (0 items)

```text
GET /api/data/ed-fi/studentSectionAttendanceEvents?offset=0&limit=500&minChangeVersion=44927&maxChangeVersion=67390
```

#### Partition 4 (0 items)

```text
GET /api/data/ed-fi/studentSectionAttendanceEvents?offset=0&limit=500&minChangeVersion=67391&maxChangeVersion=89853
```

#### Partition 5 (0 items)

```text
GET /api/data/ed-fi/studentSectionAttendanceEvents?offset=0&limit=500&minChangeVersion=89854&maxChangeVersion=112317
```

## Conclusion

The use of Change Queries features to engage Keyset Paging at the
database-level may provide an improvement in paging performance on large data
sets, but the effectiveness of this approach can be influenced by the usage
patterns of the Ed-Fi API by API clients.

## Acknowledgments

This article was created based on the work done by the Data Engineering team at
Education Analytics, who have implemented this approach in their Stadium/EDU
code base.
