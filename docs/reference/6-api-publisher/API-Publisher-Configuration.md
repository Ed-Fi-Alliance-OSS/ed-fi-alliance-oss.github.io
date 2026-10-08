# Ed-Fi API Publisher Configuration

The Ed-Fi API Publisher provides a hierarchical organization of configuration
information, as documented below.

The first layer of configuration values are provided by the
_publisherSettings.json_ file, which should reside in the same folder as the
Ed-Fi API Publisher's binaries. This file contains the general Options available
for altering the runtime behavior. The Options values can also be supplied
(overridden) using environment variables or command-line arguments, as needed.

Command-line arguments take precedence over environment variables, which in turn
take precedence over the values defined in the _publisherSettings.json_
configuration file. To use environment variables to provide configuration
values, use the "Configuration Path" from the tables below, and add an
`EdFi:ApiPublisher:` prefix to the name of each variable. For example, to
specify a named connection for the source API using an environment variable, use
an environment variable name of `EdFi:ApiPublisher:Connections:Source:Name`.

## Options

Defines general behavior of the Ed-Fi API Publisher.

| Configuration Path / Command-Line Argument | Description |
| --- | --- |
| Options:BearerTokenRefreshMinutes<br/>`--bearerTokenRefreshMinutes` | Indicates how frequently the Ed-Fi API Publisher will obtain a new bearer token from the source and target API endpoints.<br/>(_Default value: 28_) |
| Options:RetryStartingDelayMilliseconds<br/>`--retryStartingDelayMilliseconds` | Indicates the initial delay in milliseconds used when performing an exponential "back off" delay for retries (doubling the delay between retries after each attempt).<br/>(_Default value: 100_) |
| Options:MaxRetryAttempts<br/>`--maxRetryAttempts` | Indicates the number of times the Ed-Fi API Publisher will attempt to _resend_ a request against the source or target APIs before determining that the failure is permanent.<br/>(_Default value: 5_) |
| Options:MaxDegreeOfParallelismForResourceProcessing<br/>`--maxDegreeOfParallelismForResourceProcessing` | Indicates the total number of resources that can be processed simultaneously.<br/>(_Default value: 10_) |
| Options:MaxDegreeOfParallelismForPostResourceItem<br/>`--maxDegreeOfParallelismForPostResourceItem` | Indicates the total number of threads that could be simultaneously issuing POST requests against the target API for each resource being processed.<br/>(_Default value: 20_) |
| Options:MaxDegreeOfParallelismForStreamResourcePages<br/>`--maxDegreeOfParallelismForStreamResourcePages` | Indicates the total number of threads that could be simultaneously issuing paged GET requests against the source API for each resource being processed.<br/>(_Default value: 5_) |
| Options:MaxConcurrentSourceRequests<br/>`--maxConcurrentSourceRequests` | Caps the number of requests the publisher will have in flight against the source API at any one time, counted across every resource being processed rather than per resource. Use it where the source API can only serve so much at once and the parallelism settings alone leave it with more than it can handle. Use `0` to leave the source API uncapped, in which case the parallelism settings alone govern how much it is asked to serve.<br/>(_Default value: 0_) |
| Options:TooManyRequestsRetryAttempts<br/>`--tooManyRequestsRetryAttempts` | The number of times a source read the API rejected with `429 Too Many Requests` is retried. Use `-1` to follow `MaxRetryAttempts`, `0` to report the rejection on the first response, or any positive number. This is separate from `MaxRetryAttempts`, which governs every other retry in the publisher, so that the `429` handling can be turned off on its own.<br/>(_Default value: -1_) |
| Options:StreamingPagesWaitDurationSeconds<br/>`--streamingPagesWaitDurationSeconds` | Indicates the number of seconds to wait for the streaming of any of the currently streaming resources to complete before providing an update on progress using the logger.<br/>(_Default value: 10_) |
| Options:StreamingPageSize<br/>`--streamingPageSize` | Indicates the number of items to include in each page when streaming resources from the source API.<br/>(_Default value: 75_) |
| Options:ProcessingBlockBoundedCapacity<br/>`--processingBlockBoundedCapacity` | Caps the number of items each resource-processing block will buffer, so that a slow target exerts backpressure on source page streaming instead of buffering source items in memory without limit. Use `0` for an automatic capacity, `-1` to disable the bounds entirely, or any positive number for an explicit capacity; any other value fails options validation.<br/>(_Default value: 0_) |
| Options:IncludeDescriptors<br/>`--includeDescriptors` | Indicates whether or not to attempt to publish descriptors.<br/>(_Default value: false_) |
| Options:ErrorPublishingBatchSize<br/>`--errorPublishingBatchSize` | Indicates the number of items to batch in each call to the error writer. This could be used to optimize the size of a batch write depending on the operating environment (e.g. Amazon DynamoDB allows for 25 items to be written in a BatchWriteItem operation).<br/>(_Default value: 25_) |
| Options:ToleratedItemErrorCount<br/>`--toleratedItemErrorCount` | The number of documents **rejected by the target** that may fail to publish before the run itself is reported as a failure. Use `0` to fail a run that lost any document at all, a positive number to allow that many rejected documents, or `-1` for best-effort publishing, which reports success no matter how many documents the target rejected; any other value fails options validation. It never tolerates a failure to read the source: a page or an item count that could not be retrieved always fails the run, because the number of documents behind it is unknown. A tolerated run still does not advance the last change version processed. See [Run outcome and exit codes](#run-outcome-and-exit-codes) below.<br/>(_Default value: 0_) |
| Options:RemediationsScriptFile<br/>`--remediationsScriptFile` | Indicates the file system path to a JavaScript file containing [remediations](Remediations.md) for failed POST requests against the target API. |
| Options:UseChangeVersionPaging<br/>`--useChangeVersionPaging` | Indicates whether or not to use change version paging.<br/>(_Default value: false_) |
| Options:ChangeVersionPagingWindowSize<br/>`--changeVersionPagingWindowSize` | Indicates the change version paging window size.<br/>(_Default value: 25000_) |
| Options:EnableRateLimit<br/>`--enableRateLimit` | Indicates whether or not to use rate limiting.<br/>(_Default value: false_) |
| Options:RateLimitNumberExecutions<br/>`--rateLimitNumberExecutions` | Indicates the maximum number of executions allowed within the defined time window.<br/>(_Default value: 30_) |
| Options:RateLimitTimeSeconds<br/>`--rateLimitTimeSeconds` | Indicates the the time span for the rate limit in seconds.<br/>(_Default value: 1_) |
| Options:RateLimitMaxRetries<br/>`--rateLimitMaxRetries` | Indicates the number of times the Ed-Fi API publisher will attempt to _resend_ a request, rejected by rate limiting, to the source or destination APIs before determining that the failure is permanent.<br/>(_Default value: 10_) |
| Options:useReversePaging<br/>`--useReversePaging` | Indicates whether or not to use reverse paging mode. For more information about this feature read [here](Reverse-Paging.md).<br/>(_Default value: false_) |
| Options:DisableCursorPaging<br/>`--disableCursorPaging` | When `false`, main resources are read from an ODS/API 7.3+ source with partitioned cursor paging (`/partitions` + `pageToken`/`pageSize`) whenever the source supports it, falling back to `offset`/`limit` otherwise. `true` forces `offset`/`limit` paging for every resource. Deletes and key changes always use `offset`/`limit`. Change version paging and reverse paging also imply `offset`/`limit`. The decision is logged once per resource (`using Cursor paging` / `using Offset paging`).<br/>(_Default value: false_) |
| Options:CursorPagingPartitionCount<br/>`--cursorPagingPartitionCount` | Number of partitions requested per resource under cursor paging (1 to 200, the API maximum). When not set, `MaxDegreeOfParallelismForStreamResourcePages` is used (capped at 200), so each page-fetch worker walks one partition. The source may return fewer partitions than requested for small resources.<br/>(_Default value: unset_) |
| Options:ResumeLastRun<br/>`--resumeLastRun` | When `true`, the run continues where the last one left off: each cursor-paged partition resumes at the last page whose documents all reached the target, and the change window the previous run recorded is replayed rather than recomputed. Both connections must be named (`--sourceName`, `--targetName`) for a run to be resumable. State written for a different source connection, target connection, change version namespace or publisher version, by a run whose connections were unnamed, or edited into something a run cannot act on, is refused with a warning and the run starts from the beginning. Offset-paged reads, including all `/deletes` and `/keyChanges`, are read in full, and only a run publishing to an Ed-Fi API records page progress.<br/>(_Default value: false_) |
| Options:RunStatePath<br/>`--runStatePath` | Where the run state a resume needs is kept. A directory takes the default file name inside it (`api-publisher-run-state-{source}-to-{target}.json`), so publications sharing a directory do not overwrite each other. When not set, the file sits in the working directory. **This has to be storage that outlives the run**: a containerized run must point this at a mounted volume, or the file is lost with the container. The file is created readable only by the user running the publisher where the platform supports file modes. Every run records this state, and it is removed by a run that finishes without losing a document.<br/>(_Default value: unset_) |
| Options:ProcessDeletesAndKeyChangesOnFullPublish<br/>`--processDeletesAndKeyChangesOnFullPublish` | When `true`, performs delete and key change processing even when the change window starts at version 1 or below (full publish). By default, these operations are skipped in full publish scenarios because it is assumed the target is empty.<br/>(_Default value: false_) |

### Run outcome and exit codes

A run reports its outcome through its exit code, so that an unattended or
scheduled publish does not need the log to tell a complete run from one that
lost documents:

| Exit code | Meaning | Expected response |
| --- | --- | --- |
| `0` | Everything the run set out to publish was published, or the documents that failed were within `ToleratedItemErrorCount`. | None. |
| `1` | Every resource ran to completion, but documents were rejected by the target beyond the configured tolerance. | Read the run summary and the published errors, correct the data or the target, and re-publish. |
| `2` | The run did not complete, or part of the source could not be read: a resource faulted or was cancelled, a page or an item count could not be retrieved, the errors themselves could not be published, or a finalization activity failed. What was published is unknown. | Re-run. |
| `3` | The publisher could not obtain a bearer token from the source or target API. | Check the credentials and the token endpoint the run reported for that connection. A `404` there means the address is wrong rather than the key. |
| `4` | The configuration or the supplied options are invalid, so no publishing was attempted. | Correct the configuration. |

## API Connections

Metadata for source and targets API connections can be supplied to the publisher
using values stored in a persistent configuration or through environment
variables and/or command-line arguments, as documented below. It is **strongly
recommended** that you use named connections with persistent configuration for
repeated publishing operations (e.g. `--sourceName=abcd --targetName=wxyz`). You
should not mix named connections with overrides supplied through environment
variables or command-line arguments.

:::info note:

If the Ed-Fi API Publisher is executed using explicit connection information
(rather than a pre-configured `named` connection), the
LastChangeVersionProcessed value cannot be updated automatically upon successful
publishing (as there is no API connection name associated with the information).
It will be the responsibility of the caller to update the value appropriately
after extracting the new change version from the log output (or through some
other enterprising manner). As such, for implementing a process that is intended
to only publish `changes` from a source to a target, it is impractical to use an
approach where the API connection details are provided explicitly at execution
time.

:::

To select or supply source and target connection information, the following
configuration values apply:

| Configuration Path | Description |
| --- | --- |
| Connections:Source:Name<br/>`--sourceName` | The name of the preconfigured connection for the source Ed-Fi ODS API. |
| Connections:Source:Url<br/>`--sourceUrl` | The base URL of the source API, the address that serves its Discovery document. _Only required if named connections are not in use._ |
| Connections:Source:Key<br/>`--sourceKey` | The API key for authenticating with the source Ed-Fi ODS API. _Only required if named connections are not in use._ |
| Connections:Source:Secret<br/>`--sourceSecret` | The API secret for authenticating with the source Ed-Fi ODS API. _Only required if named connections are not in use._ |
| Connections:Source:AuthUrl<br/>`--sourceAuthUrl` | (_Optional_) The URL of the token endpoint for the source API. Normally this is not needed: the endpoint is taken from the `oauth` URL in the API's Discovery document. Set it when the API declares an endpoint its callers cannot use, or to send this connection's credentials to a host other than the API's own over plain HTTP. A value set here is used exactly as given. |
| Connections:Source:Scope<br/>`--sourceScope` | (_Optional_) The EducationOrganizationId scope requested for the resulting access token. The value must be an EducationOrganizationId that is explicitly associated with the API client by the source Ed-Fi ODS API.<br/><br/>Intended for use to allow a single API connection configuration to be used to read changes from the controlling organization's Ed-Fi ODS API, but with the operations of the Ed-Fi API Publisher authorized for a particular Education Organization. |
| Connections:Source:SchoolYear<br/>`--sourceSchoolYear` | (_Optional_) The SchoolYear to use with the source connection (corresponding to a year-specific ODS API deployment). |
| Connections:Source:Include<br/>`--include` | (_Optional_) For _source_ API connections, the resources to publish to the target with their dependencies. The value is defined using a CSV format (comma-separated values), and should contain the partial paths to the resources (e.g. _/ed-fi/students_,_/custom/busRoutes_). For convenience when working with Ed-Fi Data Standard resources, only the name is required (e.g. _students,studentSchoolAssociations_). The Ed-Fi API Publisher will also evaluate and automatically include all dependencies of the requested resources (using the dependency metadata exposed by the target API). This will ensure (barring misconfigured authorization metadata or data policies) that data can be successfully published to the target API. |
| Connections:Source:IncludeOnly<br/>`--includeOnly` | (_Optional_) For _source_ API connections, the resources to publish to the target without their dependencies. The value is defined using the same format as with `--include` (see above). <br/><br/> NOTE: Use caution when publishing without automatically including all dependencies. |
| Connections:Source:Exclude<br/>`--exclude` | (_Optional_) For _source_ API connections, the resources (and their dependents) to NOT publish to the target. The value is defined using the same format as with `--include` (see above). The Ed-Fi API Publisher will also evaluate and automatically exclude all dependent resources of the excluded resources (using the dependency metadata exposed by the target API). This will ensure (barring misconfigured authorization metadata or data policies) that data can be successfully published to the target API. |
| Connections:Source:ExcludeOnly<br/>`--excludeOnly` | (_Optional_) For _source_ API connections, the specific resources to skip publishing to the target (dependent resources will still be published). The value is defined using the same format as with `--include` (see above).<br/><br/> NOTE: Use caution when publishing without automatically including all dependencies. |
| Connections:Source:IgnoreIsolation<br/>`--ignoreIsolation` | (_Optional_) A boolean value (`true`/`false`) indicating whether the source Ed-Fi ODS API data should be published without using snapshot isolation. This argument must also be provided and set to `true` if the source API does not support an isolated context through the use of the snapshots resource (i.e. before Ed-Fi ODS v5.2). (NOTE: This is not a flag -- the value `true` or `false` must be provided (i.e. `--ignoreIsolation=true`).) |
| Connections:Source:ProfileName<br/>`--sourceProfileName` | (_Optional_) For _source_ API connections, the name of the API Profile to read and write data from the API. You should use similar profiles between target and source to avoid data loss. |
| Connections:Source:LastChangeVersionProcessed<br/>`--lastChangeVersionProcessed` | (_Optional_) Indicates the last change version successfully published from the _source_ API, and thus the change version _after_ which the current publishing operation should start. _This value explicitly overrides any change version value obtained from a named connection._ |
| Connections:Target:Name<br/>`--targetName` | The name of the pre-configured connection for the target Ed-Fi ODS API. |
| Connections:Target:Url<br/>`--targetUrl` | The base URL of the target API, the address that serves its Discovery document. _Only required if named connections are not in use._ |
| Connections:Target:Key<br/>`--targetKey` | The API key for authenticating with the target Ed-Fi ODS API. _Only required if named connections are not in use._ |
| Connections:Target:Secret<br/>`--targetSecret` | The API secret for authenticating with the target Ed-Fi ODS API. _Only required if named connections are not in use._ |
| Connections:Target:AuthUrl<br/>`--targetAuthUrl` | (_Optional_) The URL of the token endpoint for the target API. The same rules as `Connections:Source:AuthUrl` apply. |
| Connections:Target:Scope<br/>`--targetScope` | (_Optional_) The EducationOrganizationId scope requested for the resulting access token. The value must be an EducationOrganizationId that is explicitly associated with the API client by the target Ed-Fi ODS API.<br/><br/>Intended for use to allow a single API connection configuration to be used to publish changes to the controlling organization's Ed-Fi ODS API, but with the operations of the Ed-Fi API Publisher authorized for a particular Education Organization. |
| Connections:Target:SchoolYear<br/>`--targetSchoolYear` | (_Optional_) The SchoolYear to use with the target connection (corresponding to a year-specific ODS API deployment). |
| Connections:Target:ProfileName<br/>`--targetProfileName` | (_Optional_) For _target_ API connections, the name of the API Profile to read and write data from the API. You should use similar profiles between target and source to avoid data loss. |
| Connections:Target:TreatForbiddenPostAsWarning<br/>`--treatForbiddenPostAsWarning` | (_Optional_) A boolean value (true/false) indicating whether `403 Forbidden` responses from `POST` requests against the connection (as a target) should be treated as a warning, rather than a failure.<br/><br/>NOTE: This option can be used in scenarios where the target API may not grant the Ed-Fi API Publisher full CRUD permissions to all the dependencies of the specified resources to be written. In such a scenario, the dependent data must already exist in the target ODS or the resulting `409 Conflict` responses will cause publishing failure. |

## Considerations in relation to key changes and deletes

Ed-Fi API Publisher will only process key changes and deletions if specific
Change Window is defined. To do so use the `--lastChangeVersionProcessed` value
and set the `--useChangeVersionPaging` flag to true. Another option, if you want
to keep the `--useChangeVersionPaging` false is defining a name for the source
and target, using the `--sourceName` and `--targetName` values. More information
about all these values [below](API-Publisher-Configuration.md#api-connections).

## Authorization Failure Handling

Defines metadata (as an array of JSON objects) about which resources could
experience `403 Forbidden` responses caused by data dependencies needed for
successful authorization, and which other resources should be processed before
retrying the original request. For example, while an API client may be able to
create a Student, they won't be able to `update` the Student until that Student
is enrolled in a School through the StudentSchoolAssociation. By defining the
authorization-related dependency of the `update` operation on the
StudentSchoolAssociation, the Ed-Fi API Publisher can know to retry the failed
POST request after the association has been established.

:::info note:

This part of the configuration can only be defined in the
`publisherSettings.json` file.

:::

| JSON Path | Description |
| --- | --- |
| /authorizationFailureHandling[*] | Defines metadata for a single resource which could experience 403 Forbidden responses. |
| /authorizationFailureHandling[*]/path | The partial path for the resource (e.g. `/ed-fi/students`) for which additional 403 Forbidden processing should be performed. |
| /authorizationFailureHandling[*]/updatePrerequisitePaths | An array of partial paths for the resource(s) (e.g. `/ed-fi/studentSchoolAssociations`) that should be processed before attempting to retry the original request which resulted in an authorization failure. |

The default configuration targets Data Standard 5.x and later, where the parent
resource is `/ed-fi/contacts`. An entry whose path or prerequisites do not exist
in the source is skipped with a warning in the log and does not fail the run.

```json
{
  "options":
  {
    ...
  },
  "authorizationFailureHandling": [
    {
      "path": "/ed-fi/students",
      "updatePrerequisitePaths": ["/ed-fi/studentSchoolAssociations"]
    },
    {
      "path": "/ed-fi/staffs",
      "updatePrerequisitePaths": [
        "/ed-fi/staffEducationOrganizationEmploymentAssociations",
        "/ed-fi/staffEducationOrganizationAssignmentAssociations"
      ]
    },
    {
      "path": "/ed-fi/contacts",
      "updatePrerequisitePaths": ["/ed-fi/studentContactAssociations"]
    }
  ]
}
```
