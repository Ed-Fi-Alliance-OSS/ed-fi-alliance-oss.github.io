# Using the Changed Record Queries

The Ed-Fi ODS / API platform contains data that gets updated frequently. The
platform tracks inserts, updates, deletes, and key changes, and surfaces those
changes to client systems through a feature called changed record queries, or
"change queries." Change queries allow client systems to narrow requests for
data to only data that has changed since a specified system version number. This
allows client systems to stay in sync with the ODS / API without having to pull
a complete dataset.

Change queries is an optional feature and is turned on by default - but can be
turned off through configuration, so you'll need to check with your target
platform host to see if it's enabled.

## About Change Queries

The Change Queries feature was designed to provide a lightweight mechanism for
tracking relevant API operations for enabling system integration developers to
easily retrieve and apply changed data to downstream systems. It is conceptually
similar to [SQL Server Change
Tracking](https://docs.microsoft.com/en-us/sql/relational-databases/track-changes/work-with-change-tracking-sql-server?view=sql-server-ver15),
and thus the solution has many of the same properties and considerations, such
as:

* The API will return the most recent version of the resource. (This is
    different from a change data capture (CDC) system that provides a log of
    every change.)
* Synchronization processing is greatly simplified when using _[snapshot
    isolation](#use-snapshot-isolation)_ (which isolates the API client's work
    from ongoing changes to the underlying source ODS database). However, this
    approach is only available if the Ed-Fi ODS / API host takes some extra
    steps to create and make snapshots of the ODS available.
* When snapshots are not available, the API client bears the ultimate
    responsibility for ensuring data consistency with downstream systems
    (guidance for implementing this type of processing is provided later in this
    document). A periodic full reinitialization of the target system's data (if
    possible) may be necessary to achieve consistency.
* When snapshots are available and used for processing, this will likely limit
    the frequency with which processing can be performed (due to the technical
    constraints around creating and providing new snapshots).
* The article on the [Changed Record
    Queries](../platform-dev-guide/features/changed-record-queries.md)
    feature has implementation details which may be of interest to some client
    system developers.

## Overview of Change Query Endpoints

The core operations for Change Queries processing are as follows:

### Snapshots

Snapshots are configured as an override to OdsInstances. This is done in the
`EdFi_Admin.dbo.OdsInstanceDerivative` table, where a Snapshot is configured to
override an OdsInstance with an specific Connection String.

The API client should the Use-Snapshot HTTP header to true to each request.

If a 404 Snapshot Not Found response is returned it means that the host has not
set up snapshots for change query processing.

### Available Change Versions Resource

The ODS / API uses a change version (as opposed to a date/time) in the form of a
sequential long integer. The global Available Change Versions API resource
provides information on the current change version. This resource allows clients
to request just the resource items that have been created, updated or deleted
since the last synchronization processing was performed.

```none
GET /changeQueries/v1/availableChangeVersions
```

```json
{
  "oldestChangeVersion": 0,
  "newestChangeVersion": 100
}
```

### Minimum and Maximum Change Version Parameters

The Minimum Change Version and Maximum Change Version parameters allow clients
to request the latest representation of all resources that were modified within
the given change version window. These parameters are available on every data
management resource, both as part of the Ed-Fi Data Standard and in extension
models. The parameters are also compatible with the existing parameters to
support paging using the `offset` and `limit` parameters. Using paging
parameters in conjunction with change version parameters, all records can be
retrieved over multiple calls.

* `GET
    /data/v3/ed-fi/classPeriods?minChangeVersion=234378&maxChangeVersion=234974&offset=100&limit=500`

### Deletes Route

The "Deletes" route allows clients to get the `id` and the **natural key**
values for deleted resources. This route also supports the existing paging
parameters of `offset` and `limit`.

```none
GET /data/v3/ed-fi/studentProgramAssociations/deletes?minChangeVersion=234378&offset=0&limit=25
```

#### Deletes Response for Resource with Composite Key

```json
[
  {
    "id": "cfa3fea8edf44c50b95e1808e616460a",
    "changeVersion": 234550,
    "keyValues": {
      "beginDate": "2021-08-30",
      "educationOrganizationId": 255901,
      "programEducationOrganizationId": 255901,
      "programName": "Bilingual",
      "programTypeDescriptor": "uri://ed-fi.org/ProgramTypeDescriptor#Bilingual",
      "studentUniqueId": "604854"
    }
  }
]
```

### KeyChanges Route

The  "keyChanges" route allows clients to get the **natural key** changes for
updated resources. Not all resources support key changes. For those unsupported
resources, the "keyChanges" route will always return an empty array. If there
were multiple key changes in the change window defined on the request, there
will be one entry per resource item affected with the _initial_ and _final_ key
values for that resource. This route also supports the existing paging
parameters of `offset` and `limit`.

```none
GET /data/v3/ed-fi/classPeriods/keyChanges?minChangeVersion=104030&offset=100&limit=500
```

#### Key Changes Response for Resource with Composite Key

```json
[
  {
    "id": "e0f8848b54ad4bddbe81e96737ed7b46",
    "changeVersion": 104036,
    "oldKeyValues": {
      "classPeriodName": "ORIGINAL",
      "schoolId": 255901001
    },
    "newKeyValues": {
      "classPeriodName": "UPDATE 2",
      "schoolId": 255901001
    }
  }
]
```

## Synchronization Using the Change Query Endpoints

The primary purpose of the change queries feature is to support efficient
movement of modified data from an ODS to a downstream source system(s). This
section covers the basics and borrows heavily from Microsoft's documentation
entitled, [Work with change tracking (SQL
Server)](https://docs.microsoft.com/en-us/sql/relational-databases/track-changes/work-with-change-tracking-sql-server?view=sql-server-ver15#obtain-consistent-and-correct-results).

### Overview

The recommended implementation of a data synchronization solution contains the
following elements:

* [Identify which API resources](#identify-resources-to-be-processed) are to be
  processed and the order of processing (informed by Ed-Fi model dependencies).
* [Initial Synchronization](#obtain-initial-data) (a one-time operation).
  * Obtain the system's current change version (a.k.a., the _synchronization
    version_).
  * Obtain and process the initial data for identified resources (with no change
    version filters applied).
  * If successful, save the _synchronization_ version for future change
    processing.
* [Perform Change Processing](#use-the-change-version-to-obtain-changes)
  (repeating, on a schedule).
  * Obtain the saved synchronization version from the previous successful
    processing and add 1 (a.k.a., the _starting change version_)
  * Obtain the system's current change version (a.k.a., the _synchronization
    version_).
  * Confirm [snapshot isolation](#use-snapshot-isolation) is enabled and process
    the following API calls by applying `Use-Snapshot`  HTTP header set to true.
  * Process for key changes on identified resources (as applicable, in
    dependency order).
  * Process for changes on identified resources(in dependency order).
  * Process deletes on identified resources (in *reverse-*dependency order).
  * If successful, save the new synchronization version value (for future Change
    Processing).

### Identify resources to be processed

While some use cases may be very focused on a small subset of Ed-Fi data, for
more expansive processing consider using the [resource dependency metadata
endpoint](../client-developers-guide/resource-dependency-order.md) to
correctly order the processing for the referential integrity defined in the
Ed-Fi model.

### Obtain initial data

Before an application can obtain changes for the first time, the application
must obtain the system's current change version. This can be obtained using the
_availableChangeVersions_ route:

```none
GET /changeQueries/v1/availableChangeVersions
```

#### Available Change Versions Response

```json
{
  "oldestChangeVersion": 0,
  "newestChangeVersion": 114218
}
```

With the current (initial) change version identified, the initial data should be
retrieved from the API using paged queries against the desired data management
API resources, as follows:

1. `GET /data/v3/ed-fi/students?offset=0&limit=500`
2. `GET /data/v3/ed-fi/students?offset=500&limit=500`
3. `GET /data/v3/ed-fi/students?offset=1000&limit=500`
4. `...`

If retrieval of the initial data set succeeds, save the change version value
obtained at the beginning of this initial processing for use in the next stage –
processing for changes.

### Use the change version to obtain changes

The `minChangeVersion` value used for change processing should be the previously
stored (processed) change version value, incremented by 1 to avoid processing
any of the same changes again.

For resources that allow for primary/natural key changes, first use the
_keyChanges_ route with the `minChangeVersion` parameter as follows:

```none
GET /data/v3/ed-fi/sections/keyChanges?minChangeVersion=101
```

:::info

Since the API always returns the current state, for ease of implementation it is
recommended that you apply the key changes to the target system before
continuing on with processing the other changes.

:::

To obtain changes that have been made to a particular resource, use the main
data management API with the `minChangeVersion` parameter, as follows:

```none
GET /data/v3/ed-fi/sections?minChangeVersion=101
```

To obtain resource items that have been deleted, use the _deletes_ route with
the `minChangeVersion` parameter as follows:

```none
GET /data/v3/ed-fi/sections/deletes?minChangeVersion=101
```

### Obtain consistent and correct results

Obtaining the changed data for a resource requires multiple steps. Inconsistent
or incorrect results could be returned if certain issues aren't considered and
handled. For example, to obtain the changes that were made to the _students_ and
_studentSectionAssociations_ resources, an application would perform the
following steps:

* Get the current change version of the system (a.k.a., the _synchronization
    version_).
* Obtain and process all the changes for the _students_ resource.
* Obtain and process all the changes for the _studentSectionAssociations_
    resource.

During this processing, ongoing operations by other API clients could be
occurring in the ODS that could affect the results that are returned by the
previous steps, such as the following operations:

* Changes can be made to the resources after the synchronization change
    version has been obtained. Therefore, more changes can be returned than
    expected.
* Another API client could add new resource items in the time between the
    calls to fetch changes from the _students_ resource and the calls to fetch
    changes from the _studentSectionAssociations_ resource. Therefore, the
    results for the _studentSectionAssociations_ resource could have items with
    foreign key values that don't exist in the data already processed for the
    _students_ resource.

To overcome these challenges, we recommend that you use _**snapshot isolation**_
functionality provided by the _snapshots_ API resource (which must be supported
and maintained by the API host). This will help to ensure consistency of the
change information. If you don't (or can't) use snapshots, developing a
synchronization process that uses change queries could require significantly
more effort.

### Use snapshot isolation

Change queries has been designed to work well with snapshot isolation. Snapshot
isolation must be supported by the API host through the _OdsInstanceDerivative_
table. All the steps that are required to [obtain
changes](#use-the-change-version-to-obtain-changes) must be performed against a
specific ODS snapshot by applying the `Use-Snapshot` header set to true to each
API request. This will ensure that the changes that are made to the ODS data by
other API clients won't be visible to the synchronization processing.

### Alternatives to snapshot isolation

There are alternatives to using snapshot isolation, but they require more work
to make sure all application requirements are met. Changes can occur after the
synchronization version for the next enumeration has been obtained. There are
two ways to handle this situation. The option that is used depends on the
application and how it can handle the side-effects of each approach:

* **Include all changes, even those that have a change version larger than the
  synchronization version** \
  With this approach, all Change Queries API requests will only include the
  `minChangeVersion` parameter (the `maxChangeVersion`  parameter will not be
  supplied).

  The resource items (including keyChanges and deletes) that have a change
  version larger than the synchronization version will be obtained again on
  the next synchronization. This must be expected and handled by the
  processing logic.

* **Ignore changes that have a change version larger than the synchronization
  version** \
  With this approach, all Change Queries API requests will include both the
  `minChangeVersion` and the `maxChangeVersion` parameters, the latter of
  which will be assigned to the synchronization version.

  This has the side effect that a new or updated resource item would be
  skipped if it was created or updated before the synchronization version was
  obtained, but then updated afterward. If there's a new resource item, a
  referential integrity problem might occur if there was a resource item in
  another resource that was created that referenced the skipped resource item.
  If there's an updated existing resource item, the resource item will be
  skipped and not synchronized until the next time.

* **Devise an approach that combines both the previous options** \
  With this approach, you could decide that depending on the operation you
  might want an application for which it is best to ignore changes newer than
  the next synchronization version in which the resource item was deleted, but
  creates/updates aren't ignored.

Adding to the potential list of issues that must be considered with either of
the above options is how certain operations performed by other API clients can
affect API paging requests. For example, if while paging through a resource's
items an item is deleted by another API client, it will impact the items that
are included in the paging offsets calculated by the database engine, causing
them all to shift. If an item that has already been processed is subsequently
deleted during processing, all items will shift up in the page breaks, and the
(formerly) first item on an upcoming page could be missed completely (never
processed) as it shifts into a page that the client has already retrieved for
processing.

The same outcome could result if new changes are ignored and an item is updated
after it has been processed (because the item would no longer match the
`maxChangeVersion` filter criteria and paging would shift as described above,
resulting in the same "missed item" condition).

:::info

Choosing the approach that will work for the application when you are using
change queries (or any custom tracking mechanism), requires significant
analysis. Therefore, it is _much_ simpler to use snapshot isolation.

:::

:::info

For API-to-API change processing, consider using the [API
Publisher](/reference/api-publisher) utility that was developed specifically for
this use case.

:::
