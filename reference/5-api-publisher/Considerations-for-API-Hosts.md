# Considerations for API Hosts

## Source API

### Provide Snapshot Isolation for Client Publishing/Synchronization

In order to provide a reliable environment for any API clients (including the Ed-Fi API Publisher) performing publishing/synchronization operations, it is _highly recommended_ that source APIs provide a mechanism for API clients to perform their processing against a static copy of the ODS data that is isolated from ongoing changes in the underlying ODS database as this can lead to inconsistencies and the failure to complete the publishing process successfully. Even worse, it could even result in undetected lost data (or changed data) in the target API.

In order to provide an isolated context for client change processing, the host must perform the steps below.

#### Implement DevOps Processes for Maintaining Static Copy of the ODS

The host must implement the processes to maintain a periodically refreshed static copy of the API's main ODS database, and the corresponding records in the `changes.Snapshot` table.

If you are using a full installation of SQL Server you should use SQL Server's lighter-weight "Database Snapshots" feature (this feature is not supported by AWS RDS or SQL Azure). Otherwise, this would generally be implemented as a basic scheduled database backup and restore operation.

This process must perform the following steps:

* Backup up the current EdFi_Ods database (or equivalent).
* Generate a "snapshot identifier" as a string-based value that can be incorporated into a database name.
* Restore the ODS database using following naming convention: `_{Ed-Fi ODS database name}_SS{snapshotIdentifier}_`.
* Insert a new record into the `changes.Snapshot` table with the new snapshot identifier and the current date/time.

The host's process _should_ also perform the following steps:

* Drop old snapshot databases. (Note: Hosts may choose to maintain the last 2 snapshot databases to avoid dropping a database that could be currently in use by an API client. If that were to happen, the client would begin receiving `410 Gone` responses from the API indicating they need to start over with their processing and synchronize using a newer snapshot).
* Remove corresponding records from `changes.Snapshot` table for the dropped snapshots.

### Define Authorization and Security Metadata

* Create an "Ed-Fi API Publisher - Reader" claim set that provides _read_ permissions to the API resources needed for the use case. The claim set must be created by modifying data directly in the _EdFi_Security_ database.
* Create an Application in the Admin app/database for the Ed-Fi API Publisher, naming it meaningfully for the use case.
* Associate the Application with the "Ed-Fi API Publisher - Reader" claim set.
* Create an API client (key and secret) in the Admin app/database for use by the Ed-Fi API Publisher.
* Provide the key, secret and your API's base URL to the party responsible for configuring the Ed-Fi API Publisher's connections. The API's base URL includes everything up to, but not including, the _/data/v3_ portion.

## Target API

### Define Authorization and Security Metadata

* Create an "Ed-Fi API Publisher - Writer" claim set that provides appropriate _read_ and _write_ permissions to the API resources needed for the use case.  The claim set must be created by modifying data directly in the _EdFi_Security_ database.
  * Read permissions will be used to perform deletions (not yet supported due to current Ed-Fi ODS API functionality).
  * Consider granting write permissions to all descriptors (i.e. the _systemDescriptors_ and _managedDescriptors_ resource claims), overriding the authorization strategy to use "No Further Authorization". This will allow the Ed-Fi API Publisher to ensure that all of a source API's supporting descriptors values will be present in the target ODS.
* Create an Application in the Admin app/database for the Ed-Fi API Publisher, naming it meaningfully for the use case.
* Create an API client (key and secret) in the Admin app/database to be used by the Ed-Fi API Publisher to write data _on behalf of_ a particular source API.
* Associate the Application with the "Ed-Fi API Publisher - Writer" claim set.
* Provide the key, secret and your API's base URL to the party responsible for configuring the Ed-Fi API Publisher's connections. The API's base URL includes everything up to, but not including, the _/data/v3_ portion.

# Profiles

For APIs that have the API Profiles option enabled, the API Publisher includes parameters to indicate the profile with both the source and the Target.

Keep in mind that the data to be requested and published between the source and the target will depend on the definition of the profiles and the corresponding read and write access permissions.

Therefore, it is recommended to review the documentation corresponding to API Profiles to adequately define each profile for source and target and avoid data loss in the process. It's highly recommended to setup the exact same profile definition on both ends.

Use [API configuration values](API-Publisher-Configuration.md#api-connections) like `--include` `--includeOnly` `--exclude` or `--excludeOnly` to indicate the data to be published.

Take into account that Ed-Fi-API-Publisher won't allow you to provide a profile just on one end (source or target).
