# Improve Paging Performance with Partitioned Cursor Paging

## Overview

Cursor paging is a high-performance paging strategy for reading large
collections. Traditional `limit` and `offset` paging counts rows from the start
of the result set on every request, so later pages get slower the deeper you go.
Cursor paging instead asks for the next page after the last item already read,
so a request near the end of a collection costs about the same as one near the
start.

Key benefits:

- Improved performance: the cost of a request doesn't grow with how far into
  the collection it is.
- Scalability: partitions let several workers read a collection in parallel.

Cursor paging is part of the API and is always available. It applies to
`GET` requests on resource and descriptor collections, such as
`/api/data/ed-fi/students` and `/api/data/ed-fi/gradeLevelDescriptors`. It
doesn't apply to the change query `/deletes` and `/keyChanges` endpoints.

## Default Paging Behavior

By default, the API supports traditional `limit` and `offset` paging. Clients
specify the number of items to retrieve with the `limit` parameter and move to
later pages with `offset`.

```http
GET /api/data/ed-fi/students?limit=500&offset=1500
```

Use traditional paging to browse the first few pages, or when you need
`totalCount`. Use cursor paging to read a whole collection, especially a large
one.

## Cursor Paging: The `pageToken` and `pageSize` Parameters

After returning a page of data, the API includes a `Next-Page-Token` header in
the response when there is more to read. Send that value back as the `pageToken`
query parameter to get the next page, without calculating offsets.

### Usage

  1. Retrieve the first page with an ordinary request, including any filtering
     criteria.
  1. Send the `Next-Page-Token` header value of the response as the `pageToken`
     query parameter on the next request. Repeat the same filtering criteria.
  1. Optionally control the page size with the `pageSize` parameter. If it's
     omitted, the default page size is used.
  1. Repeat until a response has no `Next-Page-Token` header. That is the end of
     the walk.

```http
GET /api/data/ed-fi/students?pageToken=<token>&pageSize=500
```

:::warning

Stop when the `Next-Page-Token` header is missing, not when a page is empty. A
page can be empty while there is still more to read, for example after a
concurrent delete. The walk usually ends with one last request that returns an
empty array and no header.

:::

:::info

The `pageToken` and `pageSize` parameters are a different paging strategy from
`offset` and `limit`. Don't combine them in one request.

:::

:::info

The `totalCount` query string parameter isn't supported with cursor paging (that
is, together with `pageToken`). If you need a total count before processing,
get it with a separate request, for example:

```http
GET /api/data/ed-fi/students?totalCount=true&limit=0
```

:::

### Page Tokens

A page token is an opaque string. Don't decode, edit, or construct one, because
its format can change without notice. Pass it through unchanged, and URL-encode
it when you put it in a query string.

A page token doesn't carry your filters or your permissions. Every request is
filtered and authorized on its own, so send the same filters on every request of
a walk.

### Data Consistency

Cursor paging doesn't hold a consistent view of the data for the length of a
walk. Records created, changed, or deleted during a walk can appear, disappear,
or be missed.

## Parallel Data Processing with `/partitions`

The `/partitions` child endpoint of each collection divides it into partitions
that can be read in parallel. Each partition is read with cursor paging,
independently of the others, which lets API clients process data in parallel and
reduces overall processing time.

### Endpoint Behavior

#### Partition Creation

- The endpoint accepts an optional `number` parameter, from 1 to 200, for the
  desired number of partitions. If it's omitted, the host's default is used (10
  unless the host changes it).
- You may get fewer partitions than you asked for, including only one, if there
  isn't enough data to be worth dividing. Use the number of tokens returned, not
  the number requested.
- Each entry in the `pageTokens` array of the response is the `pageToken` that
  starts cursor paging within that partition.

:::note

The API first calculates the partition size as follows:

- _computed partition size_ = CEILING(_number of items available_ / _number of
  partitions requested_)
- _minimum partition size_ = _maximum page size_ × 5
- _partition size_ = MAX(_computed partition size_, _minimum partition size_)

The _number of items available_ counts only the items that match the request's
filters and that the API client is authorized to read. The _maximum page size_
is the host's `AppSettings:MaximumPageSize` setting (500 by default). With the
partition size determined, the number of partitions is then calculated from the
number of items available.

:::

```http
GET /api/data/ed-fi/students/partitions?number=5
```

```json
{
  "pageTokens": [
    "<token 1>",
    "<token 2>",
    "<token 3>",
    "<token 4>",
    "<token 5>"
  ]
}
```

#### Paging Within Partitions

Use each `pageToken` value to read one partition, in parallel with the others.
Within a partition, follow the `Next-Page-Token` header until a response doesn't
have one, as described above. Paging that starts from a partition's token stays
within that partition.

#### Filtering and Criteria

The `/partitions` endpoint supports the same filtering criteria as the
collection, including resource property values and change version ranges (using
the `minChangeVersion` and `maxChangeVersion` query string parameters).

:::info

Send the same filtering criteria to the partitions endpoint as to the page
requests that read the partitions, including the same `minChangeVersion` and
`maxChangeVersion` parameters and the same `Use-Snapshot` header. Changing
either can change the order the API reads items in, and a page token used with
a different order is rejected as invalid. Other differences aren't rejected, but
they produce partitions that don't match the data being read, for example one
very large partition and several small ones.

:::

## Related Settings

Platform hosts can adjust two settings that affect cursor paging:

| Setting | Effect | Default |
| --- | --- | --- |
| `AppSettings:MaximumPageSize` | The largest allowed `pageSize` and `limit`, and the page size used when neither is given | `500` |
| `AppSettings:DefaultPartitionCount` | The number of partitions returned when `number` is omitted | `10` |
