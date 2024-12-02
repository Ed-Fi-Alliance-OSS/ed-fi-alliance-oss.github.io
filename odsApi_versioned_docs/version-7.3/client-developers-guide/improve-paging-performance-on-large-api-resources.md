# Improve Paging Performance on Large API Resources

:::warning
This article describes an older technique for paging using ChangeVersion. For
new implementations, see [Partitioned Cursor Paging](improve-paging-performance-cursor-paging.md).
:::

## Introduction

The Ed-Fi ODS API uses Offset Paging (through the `offset` and `limit` query
string parameters on API requests). However, this approach is known to suffer
from increasingly poor database performance as the underlying data set gets
larger. This article describes a mechanism you can use through the API to engage
a technique known as "Keyset Paging" to improve the execution plan used by the
database during paging. While this may not be the most optimal solution for all
implementations, it may provide improved API paging performance on large
datasets by utilizing artifacts from existing change query feature.

## Standard API Paging (Offset Paging)

When retrieving all the data from an API resource, API clients will issue a
series of paged requests (using Offset Paging via the `offset`  and `limit`
parameters) that look something like the following:

```text
GET /ed-fi/studentSectionAttendanceEvents?offset=0&limit=500

GET /ed-fi/studentSectionAttendanceEvents?offset=500&limit=500

GET /ed-fi/studentSectionAttendanceEvents?offset=1000&limit=500
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
and therefore limit the number of rows that are read. Fortunately, the Change
Queries API feature adds the ChangeVersion column along with an index to every
resource's underlying ODS table, which happens to fit the requirements for using
Keyset Paging. However, while ChangeVersion column is suitable for Keyset
paging, it is not the best candidate. The Change Version values are determined
by a global shared sequence, and thus the value increases with every change made
in the ODS. Also the distribution of records in a given table across an
arbitrarily chosen range of Change Version values is not likely to be uniform.

:::

The following steps illustrate how to use Change Queries API to engage Keyset
Paging. Since this example uses sample dataset that is bulk loaded loaded in
resource dependency order, the records in each table are clustered closely
together (in terms of their Change Version values against the whole range of
possible values). Due to the pattern of data load utilized, this example is not
depicting most optimal Keyset paging but can be used to understand the mechanism
involved.

### Step 1 - Obtain the maximum available change version

To identify the possible range values for your partitions, you must first obtain
the newest change version value from your source API by sending a GET request to
the _availableChangeVersions_ resource:

```none
GET <host>/ChangeQueries/v1/availableChangeVersions
accept: application/json
authorization: Bearer fghjklrftyuiofghjk

--> Response body:

{
  "oldestChangeVersion": 0,
  "newestChangeVersion": 112317
}
```

### Step 2 - Obtain the total count of items in the resource

Send a request to the resource with the `totalCount=true`  query string
parameter and get the total item count from the `Total-Count` response header.

```none
GET <host>/data/v3/ed-fi/studentSectionAttendanceEvents?totalCount=true
accept: application/json
authorization: Bearer fghjklrftyuiofghjk

--> Reply headers:

total-count: 4332
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

`# of partitions =  item count / partition size`

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
| 1         | 0                | 22464            |
| 2         | 22465            | 49929            |
| 3         | 49930            | 67393            |
| 4         | 67394            | 89857            |
| 5         | 89858            |                  |

The range criteria for each partition can be added to the queries using the
`minChangeVersion`  and/or `maxChangeVersion`  query string parameters.

### Step 4 - Issue paged requests to retrieve all data from each partition

For each partition, send requests with the appropriate `minChangeVersion`
and/or `maxChangeVerion`  parameters, along with the Offset Paging parameters of
`limit`  and `offset` until all data in each partition has been retrieved.

On the populated sample ODS, the Change Version value ranges defined above for
partitions 1, 3, 4 and 5 actually return no items.

```none
GET <host>/data/v3/ed-fi/studentSectionAttendanceEvents?offset=0&limit=500&minChangeVersion=0&maxChangeVersion=22463
accept: application/json
authorization: Bearer fghjklrftyuiofghjk

--> Response body:

[]
```

This is because the effectiveness of the technique is greatly influenced by the
pattern of loading and/or usage by API clients on the underlying ODS. In this
case, the populated sample database is loaded en-masse in resource dependency
order, and thus the records in the StudentSectionAttendanceEvent table are not
well distributed across the partition ranges we've calculated (they're clustered
together with Change Version values that place them all in partition 2, as we've
defined them).

The following image shows that data is returned for the first page of the second
partition:

```none
GET <host>/data/v3/ed-fi/studentSectionAttendanceEvents?offset=0&limit=500&minChangeVersion=22464&maxChangeVersion=49929
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

| Partition 1 (0 items)                                                                 |
| ------------------------------------------------------------------------------------- |
| `GET /ed-fi/studentSectionAttendanceEvents?offset=0&limit=500&maxChangeVersion=22464` |
|                                                                                       |

| Partition 2 (4,332 items)                                                                                       |
| --------------------------------------------------------------------------------------------------------------- |
| `GET /ed-fi/studentSectionAttendanceEvents?offset=0&limit=500&minChangeVersion=22465&maxChangeVersion=49929`    |
| `GET /ed-fi/studentSectionAttendanceEvents?offset=500&limit=500&minChangeVersion=22465&maxChangeVersion=49929`  |
| `GET /ed-fi/studentSectionAttendanceEvents?offset=1000&limit=500&minChangeVersion=22465&maxChangeVersion=49929` |
| `GET /ed-fi/studentSectionAttendanceEvents?offset=1500&limit=500&minChangeVersion=22465&maxChangeVersion=49929` |
| `GET /ed-fi/studentSectionAttendanceEvents?offset=2000&limit=500&minChangeVersion=22465&maxChangeVersion=49929` |
| `GET /ed-fi/studentSectionAttendanceEvents?offset=2500&limit=500&minChangeVersion=22465&maxChangeVersion=49929` |
| `GET /ed-fi/studentSectionAttendanceEvents?offset=3000&limit=500&minChangeVersion=22465&maxChangeVersion=49929` |
| `GET /ed-fi/studentSectionAttendanceEvents?offset=3500&limit=500&minChangeVersion=22465&maxChangeVersion=49929` |
| `GET /ed-fi/studentSectionAttendanceEvents?offset=4000&limit=500&minChangeVersion=22465&maxChangeVersion=49929` |
|                                                                                                                 |

| Partition 3 (0 items)                                                                                        |
| ------------------------------------------------------------------------------------------------------------ |
| `GET /ed-fi/studentSectionAttendanceEvents?offset=0&limit=500&minChangeVersion=49930&maxChangeVersion=67393` |
|                                                                                                              |

| Partition 4 (0 items)                                                                                        |
| ------------------------------------------------------------------------------------------------------------ |
| `GET /ed-fi/studentSectionAttendanceEvents?offset=0&limit=500&minChangeVersion=67394&maxChangeVersion=89857` |
|                                                                                                              |

| Partition 5 (0 items)                                                                 |
| ------------------------------------------------------------------------------------- |
| `GET /ed-fi/studentSectionAttendanceEvents?offset=0&limit=500&minChangeVersion=89858` |
|                                                                                       |

## Conclusion

The use of Change Queries features to engage Keyset Paging approach at the
database-level may provide an improvement in paging performance on large data
sets, but the effectiveness of this approach can be influenced by the usage
patterns of the Ed-Fi ODS API by API clients.

## Acknowledgments

 This article was created based on the work done by the Data Engineering team at
 Education Analytics, who have implemented this approach in their
 [Stadium/EDU](https://edfi.atlassian.net/wiki/spaces/EDFIBADGE/pages/20611183/Registry+of+Ed-Fi+Badged+Products+and+Services)
 code base.
