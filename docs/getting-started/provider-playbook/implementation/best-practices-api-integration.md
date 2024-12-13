# Best Practices - API Integration

## Connections & Security

* Allow for multiple Ed-Fi API connections with different key/secret combinations. Example uses:
  * Different API versions.
  * Multiple year specific APIs
  * Local AND state level APIs
* Connections should be clone-able (except for the key/secret) - specifically the mapping of descriptors should be considered part of the connection meta-data when cloning, as it tends to be the most common between connections, and the most time-consuming to do manually. Note that these clones should be considered a starting point and will need to be modified. This is largely a configuration/UI issue rather than an API issue, but development resources should be aware of this dynamic.
* Consider making connections that can be built using some combination of “ED-FI base” resources and local implementation resources (extensions). As you do business in more Ed-Fi enabled regions, you will find it easier to use existing code if you have a clear line of separation between core resources and new, additional resources introduced in each new region. As an example, an agency might be able to select “Ed-Fi Core” and then also select TX extensions, MI extensions, or potentially build their own profile from available resources.
* When you submit your key and secret combination, you will receive a token that typically expires after 30 minutes (though this can be configured by the agency or Managed Service Provider). A token should only be fetched when a new one is needed. We recommend waiting until it expires before acquiring a new one. When it does expire applications should not make further API calls until a new one is acquired.
* Be aware that the frequency of key rotation will vary in different implementations. Be prepared for regular entry of new key/secret combinations by the data steward.
* Do not share your key/secret with other source data systems, just like you wouldn't share your username and password for personal applications.
* Once the users enter the key/secret/url, you should immediately test that the credentials work. Consider also making a call to the `/oauth/token_info`  endpoint (see [Authorization](/reference/ods-api/client-developers-guide/authorization)), and saving the security setup information from the response so that support staff can review the permissions as needed.

## Performance/Optimization

* Multi-threading/connections. You should have multiple API connections so that you are not locked into sequential submission of data that does not require it. You should test to find the optimum default number of connections but allow it to be configurable since implementation infrastructure may require a change to the optimum number. All endpoints within the same [dependency order](/reference/ods-api/client-developers-guide/resource-dependency-order) can be submitted at the same time. Older implementations may need to be updated to use dependency endpoint.
* While Ed-Fi compliance specifies “near real-time" transactions, in practical applications some batching is acceptable. Batches should be collected and submitted on a regular, quick schedule ( 5-15 minutes). If you use batching, make sure to allow the data steward to force the batch submission outside of its normal schedule.
* If you are an MSP (Managed Service Provider) or otherwise managing the physical API implementation for an agency, standing up multiple API servers can also be an effective way to multi-thread. Source system vendors should approach MSPs with this suggestion if performance appears to be an issue within a specific implementation.
* Avoid excessive resyncing. Most errors will require interaction from data stewards so do not resync them automatically unless you have identified specific cases in your common implementations. Having a scheduled resync is often useful however, and of course the data steward should be able to resync on command. Common resyncing patterns include:
  * Resync just a record
  * Resync an API resource changes over a time period (i.e., attendance records for yesterday)
  * Resync an API resource (see next page regarding ability to drill down to individual data exchanges)

* Make sure to follow standard RESTful practices in your use of PUT/POST. Updates can be performed using POST requests, so long as the natural key has not changed. If you need to modify the natural key, then you will need to have saved the resource URL on the initial POST request (from the response's Location header) and use that URL to perform a PUT request that modifies the natural key. Do not update records by using DELETE and then POST unless the endpoint does not support natural key updates on PUT. ([full list  of supported endpoints](/reference/ods-api/technical-articles/cascading-key-updates-on-ods-api-resources))
* It is advisable to maintain a sync database to keep track of records that have been synced to the Ed-Fi ODS.  As part of this process you should save the ID from the location header after creating a record; This will help you minimize your traffic in multiple ways, and may also protect you from orphaning records.
* API performance can depend on load. Do not expect consistent performance.

## Error Handling

* Especially in year start scenarios, there can be a high volume of errors in certain categories. Consider grouping and or limiting the number of errors visible to the end user. As an example, you may attempt to send records that you are not yet authorized to send, resulting in many thousands of errors during a large batch scenario.
* Make sure errors are logged for data stewards troubleshooting and that they do not get deleted from the logs after the errors are cleared. Allow manual or scheduled log clearing later. Make sure logs do not contain PII as they may be forwarded to an MSP or technical staff for troubleshooting.
* Many errors happen because a relationship between the resource and the education organization has not been formed. As an example, it is common to try and update the student record before the studentSchoolAssociation (or studentEducationOrganizationResponsibilityAssociation) is submitted. Use the dependency order guide (linked above) to determine at what point each CRUD operation is allowed.

## API Consumers

* Do not use the Ed-Fi API as an application backend - i.e., send all data requests that occur during a user's usage of an application to the API. There are 2 main reasons for this.
  * The API is usually a shared resource and if many clients overuse the API, performance can degrade. It helps all clients when each client minimizes API usage.
  * The Ed-Fi API data model is high normalized, so is usually not optimized for application data usage. This means that there are generally more calls to the API than would be required by a de-normalized, application-specific data model.
* Clients should use the API for data transfer to their own application datastore, then use that local database as the product backend, per the diagram below.
![Data Flow Consumer Applications](https://edfi.atlassian.net/wiki/download/attachments/23700360/API%20data%20flow%20-%20Data%20Consumer%20Applications.png?api=v2)
_Recommended pattern for usage of the Ed-Fi API by a data consuming application_

* For clients retrieving data from the ODS/API, use Change Queries when available to optimize the data retrieval process. For more information, see [Using the Changed Record Queries](/reference/ods-api/client-developers-guide/using-the-changed-record-queries) and [Improve Paging Performance on Large API Resources](/reference/ods-api/client-developers-guide/improve-paging-performance-on-large-api-resources/)
