
# How To: Use an External Cache Provider for the Ed-Fi API
By default, the Ed-Fi API uses an internal memory cache in order to increase the performance of the API. However, an optional feature is to use an External or Distributed Cache option such as Redis, a distributed memory cache which, in a multi-server environment, can prevent cached data on multiple servers from getting out of sync and be more cost effective.

For information on getting started with Redis Cache check out: [https://redis.io/docs/getting-started/](https://redis.io/docs/getting-started/)

## API External Cache Feature Settings

Configuration of the External Cache feature works in conjunction with the Caching configuration settings. Each caching entry can be enabled to use external cache, but will still follow the Caching Configuration settings. For instance, if the SuppressStaffCache setting is set to true, Staff cache will be disabled for either internal or external cache. 

In order to use the external cache feature:

* Enable External Cache Feature

```json
"Features": [
   {
     "Name": "ExternalCache",
     "IsEnabled": true
   }
 ]
```

* Set external cache - cache provider:
  * Redis, SQLServer currently supported
* Set external cache configuration
  * Configuration (required)
    * Redis - Comma separated list of host and ports 
    * SQL Server - Connection String
  * Password (optional)
    * Redis - AUTH Password
    * SQL Server - Inapplicable since the password, if used, is in the connection string
* Enable/Disable which cache options to enable the feature for:
  1. ApiClientDetails
  2. AvailableChangeVersionCache
  3. Descriptors
  4. PersonUniqueIdToUsiCache
### Default External Cache Feature configuration

```json
"Features": [
   {
     "Name": "ExternalCache",
     "IsEnabled": false
   }
 ]
```

```json
"ExternalCache":{
    "CacheProvider": "None",
    "Configuration": "",
    "Password": "",
    "SchemaName": "",
    "TableName": "",
    "DefaultExpirationSeconds": 0,
    "EnableForApiClientDetailsCache": false,
    "EnableForAvailableChangeVersionCache": false,
    "EnableForDescriptorsCache" : false,
    "EnablePersonUniqueIdToUsiCache" : false
}  
```
### Example Redis External Cache feature

```json
"Features": [
   {
     "Name": "ExternalCache",
     "IsEnabled": true
   }
 ]
```

```json
"ExternalCache":{
    "CacheProvider": "Redis",
    "Configuration": "localhost",
    "Password": "REDIS_AUTH_PASSWORD",
    "SchemaName": "",
    "TableName": "",
    "DefaultExpirationSeconds": 1800,
    "EnableForApiClientDetailsCache": true,
    "EnableForAvailableChangeVersionCache": true,
    "EnableForDescriptorsCache" : true,
    "EnablePersonUniqueIdToUsiCache" : true
}  
```
### Example SQL Server External Cache feature

```json
"Features": [
   {
     "Name": "ExternalCache",
     "IsEnabled": true
   }
 ]
```

```json
"ExternalCache":{
    "CacheProvider": "SqlServer",
    "Configuration": "Data Source=.;Initial Catalog=DistCache;Integrated Security=True;",
    "Password": "",   
    "SchemaName": "dbo",
    "TableName": "DistributedCache",
    "DefaultExpirationSeconds": 1800,
    "EnableForApiClientDetailsCache": true,
    "EnableForAvailableChangeVersionCache": true,
    "EnableForDescriptorsCache" : true,
    "EnablePersonUniqueIdToUsiCache" : true
}  
```
### Setting up Redis distributed cache

[https://redis.io/docs/getting-started/installation/](https://redis.io/docs/getting-started/installation/)

### Setting up SQL Server distributed cache

[https://docs.microsoft.com/en-us/aspnet/core/performance/caching/distributed?view=aspnetcore-6.0#distributed-sql-server-cache](https://docs.microsoft.com/en-us/aspnet/core/performance/caching/distributed?view=aspnetcore-6.0#distributed-sql-server-cache)