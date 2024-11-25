# Cursor Paging and Parallel Data Processing

## Overview

Cursor paging is a high-performance paging strategy optimized for large
datasets, offering a significant advantage over traditional `limit/offset`
pagination by reducing the impact of page depth on request performance.
Internally implemented using seek-based paging, API cursor paging ensures
efficient retrieval of resources by avoiding redundant offset computations for
each request and leveraging indexed keys for navigation.

Key benefits:

* Improved Performance - Minimizes database load when processing resources with
  a large number of items.
* Scalability - Enables parallel processing through partitioning, significantly
  speeding up data ingestion.

## Default Paging Behavior

By default, the API supports traditional `limit/offset` pagination. Clients
specify the number of items to retrieve using the `limit` parameter and navigate
to subsequent pages using `offset`.

```http
GET /ed-fi/students?limit=500&offset=1500
```

## Cursor Paging: The `pageToken` and `pageSize` Parameters

For improved performance, the API now supports cursor paging. After retrieving a
page of data, the API includes a `Next-Page-Token` header in the response. This
token allows clients to request the next page of items without needing to
calculate offsets.

### Usage

  1. Retrieve the first page using any applicable filtering criteria.
  1. Use the `Next-Page-Token` HTTP header value of the response as the
     `pageToken` query parameter in subsequent requests.
  1. Optionally control page size using the `pageSize` parameter (if omitted, a
     default page size is used).

```http
GET /ed-fi/students?pageToken=LTIxNDc0NzU1ODQsLTIxNDc0Njc1MjE&pageSize=500
```

:::info The `pageToken` and `pageSize` parameters cannot be used in conjunction
with `offset` and `limit` as these represent mutually exclusive paging
strategies. :::

:::info The `totalCount` query string parameter is not supported with cursor
paging (using `pageToken`). If you need to get a total count before processing,
perform this using an initial request as follows:

```http
GET /ed-fi/students?totalCount=true&limit=0
```

:::

## Parallel Data Processing with `/partitions`

The `/partitions` child endpoint of each resource is designed for client-side
parallelizing data processing by dividing the resource items into smaller,
_equally distributed_ partitions of data. This approach allows API clients to
process data in parallel threads, improving efficiency and reducing overall
processing time.

### Endpoint Behavior

#### Partition Creation

* The endpoint accepts an optional `number` parameter to specify the desired
  number of partitions.
* You may get fewer than the number of requested partitions if there isn't
  sufficient data available to warrant the level of parallel processing
  requested.
* Each entry of response `pageTokens` array property contains the `pageToken`
  that represents the starting point for cursor pagination within that
  partition.
* If no `number` is provided, the API will provide a sensible number of
  partitions (up to a maximum of 10).

:::note The API first calculates the partition size as follows:

* _computed partition size_ = CEILING(_number of items available_) / (_number of
  partitions_)
* _minimum partition size_ = (_maximum page size_ X 5)
* _partition size_ = MAX( _computed partition size_, _minimum partition size_)

With the partition size determined, number of partitions then is calculated
based on the total number of items available.

:::

```http
GET /ed-fi/students/partitions?number=5
```

```json
{
  "pageTokens": [
    "LTIxNDc0ODM2NDgsLTIxNDc0NzU1ODU",
    "LTIxNDc0NzU1ODQsLTIxNDc0Njc1MjE",
    "LTIxNDc0Njc1MjAsLTIxNDc0NTk0NTc",
    "LTIxNDc0NTk0NTYsLTIxNDc0NTEzOTM",
    "LTIxNDc0NTEzOTIsMjE0NzQ4MzY0Nw"
  ]
}
```

#### Pagination on Partitions

Clients use the `pageToken` values to request data from each partition in
parallel. Pagination within a partition proceeds until no data is returned,
indicating all items in that partition have been retrieved.

#### Filtering and Criteria

The `/partitions` endpoint supports filtering criteria such as resource property
values and the Change Version ranges (using the `minChangeVersion` and
`maxChangeVersion` query string parameters).

:::info If filtering criteria is to be applied to the processing, the same
criteria should be provided when retrieving partitions as with the page requests
on the resource endpoint to ensure optimal and balanced results. For example,
providing criteria to the partitions endpoint but not the requests may result in
an exceedingly large number of items produced by the first partition in relation
to the other partitions. :::
