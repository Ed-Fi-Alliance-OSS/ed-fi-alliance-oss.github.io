# Considerations for API Hosts

The [Source API](#source-api) and [Target API](#target-api) sections describe
the Ed-Fi ODS/API. For Ed-Fi API v8, see [Ed-Fi API v8](#ed-fi-api-v8).

## Source API

### Provide Snapshot Isolation for Client Publishing/Synchronization

In order to provide a reliable environment for any API clients (including the
Ed-Fi API Publisher) performing publishing/synchronization operations, it is
_highly recommended_ that source APIs provide a mechanism for API clients to
perform their processing against a static copy of the ODS data that is isolated
from ongoing changes in the underlying ODS database as this can lead to
inconsistencies and the failure to complete the publishing process successfully.
Even worse, it could even result in undetected lost data (or changed data) in
the target API.

To provide an isolated context, the host maintains a periodically refreshed
static copy of the ODS database and registers it as a snapshot of the ODS
instance. See
[Creating and Managing Snapshots](/reference/ed-fi-api/platform-dev-guide/features/changed-record-queries#creating-and-managing-snapshots)
in the Ed-Fi ODS/API documentation. For a source without a configured snapshot,
see
[Sources Without a Configured Snapshot](Known-Issues-Details.md#sources-without-a-configured-snapshot).

### SDefine Authorization and Security Metadata for the Source

* Use the "Ed-Fi API Publisher - Reader" claim set included in the Ed-Fi
  ODS/API, which provides _read_ permissions to the API resources the publisher
  needs.
* Create an Application in the Admin app/database for the Ed-Fi API Publisher,
  naming it meaningfully for the use case.
* Associate the Application with the "Ed-Fi API Publisher - Reader" claim set.
* Create an API client (key and secret) in the Admin app/database for use by the
  Ed-Fi API Publisher.
* Provide the key, secret and your API's base URL to the party responsible for
  configuring the Ed-Fi API Publisher's connections. The API's base URL is the
  address the API is reached at, the one that serves its Discovery document.

## Target API

### Define Authorization and Security Metadata for the Target

* Use the "Ed-Fi API Publisher - Writer" claim set included in the Ed-Fi
  ODS/API, which provides _read_ and _write_ permissions to the API resources the
  publisher needs.
  * Read permissions are used to locate the target records of deletes and key
    changes.
  * Consider granting write permissions to all descriptors (i.e. the
    _systemDescriptors_ and _managedDescriptors_ resource claims), overriding
    the authorization strategy to use "No Further Authorization". This will
    allow the Ed-Fi API Publisher to ensure that all of a source API's
    supporting descriptors values will be present in the target ODS.
* Create an Application in the Admin app/database for the Ed-Fi API Publisher,
  naming it meaningfully for the use case.
* Create an API client (key and secret) in the Admin app/database to be used by
  the Ed-Fi API Publisher to write data _on behalf of_ a particular source API.
* Associate the Application with the "Ed-Fi API Publisher - Writer" claim set.
* Provide the key, secret and your API's base URL to the party responsible for
  configuring the Ed-Fi API Publisher's connections. The API's base URL is the
  address the API is reached at, the one that serves its Discovery document.

## Ed-Fi API v8

Ed-Fi API v8 can be the source or the target of a publish, with an Ed-Fi ODS/API
or another Ed-Fi API v8 instance at the other end. The publisher takes the paths
and the token endpoint from the API's Discovery document, so no other
connection settings are needed.

Ed-Fi API v8 includes two claim sets for the publisher:

| Claim set | Use |
| --- | --- |
| `EdFiAPIPublisherReader` | API client that reads from a source API. |
| `EdFiAPIPublisherWriter` | API client that writes to a target API. |

For each role, create a vendor and an application with the matching claim set
through the Configuration Service, and associate the application with the data
store and the education organizations whose data is published. See
[API Client and Data Store Configuration](/reference/ed-fi-api/8/platform-dev-guide/configuration/api-client-and-data-store-configuration).

Provide the key, secret and the API's base URL to the party responsible for
configuring the Ed-Fi API Publisher's connections.

As a source, Ed-Fi API v8.0 does not provide snapshot isolation. See
[Snapshots on an Ed-Fi API v8.0 Source](Known-Issues-Details.md#snapshots-on-an-ed-fi-api-v80-source).

As a target:

* **Load the data store's seed data before the first publish.** The publisher
  does not publish `schoolYearTypes`, because an Ed-Fi ODS/API database includes
  them. An Ed-Fi API v8 data store gets them only when its seed data is loaded.
  Without them, most student-related records fail, many reported as `Forbidden`
  rather than as a missing reference.
* **When the data store is on PostgreSQL, make sure it has enough connections.**
  Ed-Fi API v8 keeps a connection pool per data store. Under the publisher's
  default concurrency it can exhaust PostgreSQL's `max_connections`; the
  affected requests fail with `500` and those documents are not published.
  Raise `max_connections` (300 was enough for an instance serving two data
  stores in testing) or reduce the API's connection pool size.
* **Stay under the Ed-Fi API v8.0 rate limit.** See
  [Rate Limit on an Ed-Fi API v8.0 Target](Known-Issues-Details.md#rate-limit-on-an-ed-fi-api-v80-target).

## Profiles

For APIs that have the API Profiles option enabled, the API Publisher includes
parameters to indicate the profile with both the source and the Target.

Keep in mind that the data to be requested and published between the source and
the target will depend on the definition of the profiles and the corresponding
read and write access permissions.

Therefore, it is recommended to review the documentation corresponding to API
Profiles to adequately define each profile for source and target and avoid data
loss in the process. It's highly recommended to setup the exact same profile
definition on both ends.

Use [API configuration values](API-Publisher-Configuration.md#api-connections)
like `--include` `--includeOnly` `--exclude` or `--excludeOnly` to indicate the
data to be published.

Take into account that Ed-Fi-API-Publisher won't allow you to provide a profile
just on one end (source or target).
