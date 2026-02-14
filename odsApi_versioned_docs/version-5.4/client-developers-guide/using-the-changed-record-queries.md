---
title: Using the Changed Record Queries
---

# Using the Changed Record Queries

The Ed-Fi ODS / API platform contains data that gets updated frequently. The platform tracks inserts, updates, and deletes, and surfaces those changes to client systems through a feature called changed record queries, or "change queries." Change queries allow client systems to narrow requests for data to only data that has changed since a specified system version number. This allows client systems to stay in sync with the ODS / API without having to pull a complete dataset.

Change queries is an optional feature and is turned on by default - but can be turned off through configuration, so you'll need to check with your target platform host to see if it's enabled.

## About Change Queries

The change queries feature was designed to have a simple architecture, and to integrate with the core API client authorization, and to be simple to use. This ensures that the system is performant, secure, and easy to maintain. This approach results in the following properties:

* The API will return the most recent version of the resource. This is different from, say, a change data capture system that provides a log of every change.
* The solution offers guaranteed consistency only if the host provides facilities for snapshot isolation for the API client to perform change processing. In the absence of snapshots provided by the host, periodic re-synchronization as described in this documentation may help in achieving eventual consistency. To learn more about some additional considerations refer to the [SQL Server Change Tracking](https://docs.microsoft.com/en-us/sql/relational-databases/track-changes/work-with-change-tracking-sql-server?view=sql-server-ver15) with a particular emphasis on: [Obtain consistent and correct results](https://docs.microsoft.com/en-us/sql/relational-databases/track-changes/work-with-change-tracking-sql-server?view=sql-server-ver15#obtain-consistent-and-correct-results) and [Alternatives to Snapshot Isolation](https://docs.microsoft.com/en-us/sql/relational-databases/track-changes/work-with-change-tracking-sql-server?view=sql-server-ver15#alternatives-to-snapshot-isolation).
* The solution will work for most use cases, but snapshot isolation requirement could limit the frequency of data synchronization. 
* The [Changed Record Queries](../platform-dev-guide/features/changed-record-queries.md) article has implementation details which may be of interest to some client system developers.



## Overview of Change Query Endpoints

The simple design means that the core operations are basic. This section provides an overview.

### Snapshots

A global Available snapshots API resource provides information on the available snapshots that host has provided for change processing.

* GET /changeQueries/v1/snapshots


A successful request will contain a response body that looks like the following:

```json
{
  "id": "d19c86ced5ff49c19d56e6b5c8f1ec68",
  "snapshotIdentifier": "abcd",
  "snapshotDateTime": "2021-02-15T17:19:57.7866667Z"
}
```

If multiple snapshots are returned, the API Client should use the most recent snapshot based on the `snapshotDateTime` property. Once the most recent snapshot is identified, the API client should add the `Snapshot-Identifier` HTTP header to each request, with the value of the `snapshotIdentifier` property.

If no snapshots are returned, it means that the host has not set up snapshots for change query processing. API clients can use the change query feature without the `Snapshot-Identifier` HTTP header, but using snapshots is recommended for data consistency and accuracy where available.

### Available Change Versions Resource

The ODS / API uses a change version (as opposed to, say, a date) in the form of a sequential long integer. A global Available Change Versions API resource provides information on the current change version. This resource allows clients to request a reference to changed records they have not already requested or processed.

* GET /changeQueries/v1/availableChangeVersions


### Minimum and Maximum Change Version Parameters

The Minimum Change Version and Maximum Change Version parameters allow clients to request the latest representation of all resources that were modified within the given change version window. These parameters are available on every data resource, both as part of the Ed-Fi Data Standard and in extension models. The parameters are also compatible with the existing parameters to support paging using the `offset` and `limit` parameters. Using paging parameters plus change version parameters, all records can be retrieved over multiple calls.

* GET /data/v3/ed-fi/classPeriods?minChangeVersion=234378&maxChangeVersion=234974&offset=100&limit=100

### Deletes Route

The "Deletes" route allows clients to get the `Id` for deleted resources. This route also supports the existing paging parameters of `offset` and `limit`.

* GET /data/v3/ed-fi/studentProgramAssociations/deletes?minChangeVersion=234378&offset=0&limit=25

**Multiple Logical Key Deletes Response**

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

The "keyChanges" route allows clients to get the **natural key** changes for updated resources. Not all resources support key changes. For those unsupported resources, the "keyChanges" route will always return an empty array. If there were multiple key changes in the change window defined on the request, there will be one entry per resource item affected with the initial and final key values for that resource. This route also supports the existing paging parameters of `offset` and `limit`.


* GET /data/v3/ed-fi/classPeriods/keyChanges?minChangeVersion=104030&offset=100&limit=100


**Composite Logical Key Changes Response**

```json
[{
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
}]
```

## Synchronization Using the Change Query Endpoints

The primary purpose of the change queries feature is to support periodic synchronization of data. This section covers the basics.

### Simple Daily Synchronization Example

The following example shows the logical flow for a daily synchronization process that only looks at Student records.

:::info
For more expansive processing, consider using the [resource dependency metadata endpoint](./resource-dependency-order.md).
:::

**Initial processing to get all data**

* `GET /changeQueries/v1/snapshots` to get the current snapshot identifier and add that value to all subsequent request headers. If a snapshot is not available, you can still use the change query feature, but be aware of the caveats mentioned below.
* `GET /changeQueries/v1/availableChangeVersions.` As an example, assume we get 100 as a response. Store this value in a variable to be saved as the starting point for the first increment of processing if the full export is successful.
* `GET /data/v3/ed-fi/classPeriods.` If you are not using a snapshot, add the `maxChangeVersion=100` parameter to return only Student records up through change version 100. Note that the `minChangeVersion` is not required for the initial export, but you may need to perform multiple paged requests (using `offset` and `limit` parameters) to retrieve all the available data.
  
:::info
When using a snapshot, the `maxChangeVersion` on these requests is unnecessary since the source data is read-only and isolated from any changes. Using a snapshot greatly simplifies client processing.
:::

* The results will not include deleted Student records, so for the initial full export you won't need any special delete handling.
* As with any large data retrieval process, it is recommended to perform the initial export process during a period of low activity on the API, to reduce contention for resources.

:::info
If a snapshot is not available, it is strongly recommended to run an incremental processing of changes immediately after the initial synchronization due to the time required to transfer all the data. While this may help reduce the chances of downstream referential integrity problems, it cannot prevent all data consistency error scenarios.
:::

**Incremental processing of changes (e.g., 1 day later)**

* `GET /changeQueries/v1/snapshots` to get the current snapshot identifier and add that value to all subsequent requests. If snapshots are not available, you can still use the change query feature but be aware of some caveats mentioned below.
* `GET /changeQueries/v1/availableChangeVersions.` Assume we get 250 as a response.
* `GET /data/v3/ed-fi/classPeriods/keyChanges?minChangeVersion=101.` This request returns any student records that have had natural key changes. Not all endpoints support key changes, if provided process them first before processing updates and deletes. The `minChangeVersion` is the previously processed maximum incremented by 1.
  
  :::note
  If not using a snapshot, you'll also need to add the `maxChangeVersion=250` parameter to the requests to prevent changes after that point from being returned in the responses. Be aware that this mode of processing has an associated set of data consistency failure scenarios, and the only way to ensure data consistency is to process with the snapshot isolation.
  :::
* `GET /data/v3/ed-fi/classPeriods?minChangeVersion=101.` This request returns any created or updated Student records. The `minChangeVersion` is the previously processed maximum incremented by 1.
  
  :::note
  If not using a snapshot, you'll also need to add the `maxChangeVersion=250` parameter to the requests to prevent changes after that point from being returned in the responses. Be aware that this mode of processing has an associated set of data consistency failure scenarios, and the only way to ensure data consistency is to process with the snapshot isolation.
  :::
* `GET /data/v3/ed-fi/classPeriods/deletes?minChangeVersion=101.` This API call is, of course, optional if your system does not need to be aware of deleted records.
  
  :::note
  If not using a snapshot, you'll also need to add the `maxChangeVersion=250` to prevent deletions that occur after the start of processing from being applied to the downstream system.
  :::

### Usage Notes

A few things to keep in mind when developing API client processing:

* **If enabled by the platform host, using an ODS snapshot simplifies client processing significantly and ensures data consistency on the downstream system.** There are failure scenarios that can cause data loss or referential integrity violations when the source data is allowed to change during processing.
* **Keep dependency order in mind when pulling updates and deletes.** For example, if you have a system that enforces referential integrity, you'll need to create and update data in dependency order, and delete data in reverse dependency order to ensure that valid relationships are maintained.
* **If you are not using an ODS snapshot, try spanning your change version window across two (or more) change windows if the data is being modified during your processing.** Updates during the time the client is processing can cause errors in loading some resources, including missed data. You can try to prevent or recover from these scenarios by spanning over multiple change windows.

As an example of processing using multiple change windows in lieu of snapshots, and assuming a daily synchronization schedule:

| Synchronization | When Performed | AvailableChangeVersions Result | MinChangeVersion Used | MaxChangeVersion Used |
|-----------------|----------------|-------------------------------|----------------------|----------------------|
| Initial | Start | 100 |  | 100 |
| Incremental #1 | Immediately after completion of start | 200 | 100 | 200 |
| Incremental #2 | 1 day after start | 300 | 100 | 300 |
| Incremental #3 | 2 days after start | 400 | 200 | 400 |

