# How To: Use an External Cache Provider for the Ed-Fi API

By default, the Ed-Fi ODS / API uses an internal memory cache in order to
increase the performance when mapping URIs for descriptors, and UniqueIds for
staff, students and parents to their ODS-specific surrogate id values.  Ed-Fi
ODS / API also provides an optional feature to use an external cache provider;
currently Redis is the only option available out of the box. Using an external
provider can prevent cached data on multiple servers from getting out of sync
and be more cost effective. For information on getting started with Redis Cache
check out:
[https://redis.io/docs/getting-started/](https://redis.io/docs/getting-started/)

Before configuring the ODS / API for external caching, you should consider the
following:

* The frequency with which the cached data is accessed
* The size of the cached data in memory
* The number of ODS contexts to be served by the API

For example, consider a paged request for 500 items from the
studentSchoolAssociations resource. The response will contain 1 student cache
hit and up to 6 descriptor cache-hits per resource item (not counting the two
child collections each with an additional descriptor cache hit per item in the
collection). To serve this response, the student cache will be accessed 500
times, and the descriptor cache potentially another 3000+ times. Since accessing
memory is orders of magnitude faster than accessing an external cache, use of an
external cache will introduce some level of latency into the response times.
Deployments with a scalable tier of API servers, repeated in-memory caching may
not be cost efficient, especially for larger sets of cached data. Also, if the
API serves many ODS contexts, use of in-memory caching could result in high
memory usage in the API process.

The following guidance is provided to help such a decision and may not be
accurate for all deployment scenarios:

* The descriptor cache (which maps descriptor URIs to ODS-specific descriptor
    Ids) is relatively small and also the most frequently accessed. Thus, this
    is less likely to be a candidate for external caching. However, if the API
    serves many different ODS contexts, this would need to be factored into the
    decision.
* The staff cache (which maps StaffUniqueIds to ODS-specific USIs) represents
    the smallest cache size of the person types (there will be a lot fewer staff
    than students or parents), and the access frequency is also likely to be on
    the lower side. The decision here is more nuanced.
* The student cache (which maps StudentUniqueIds to ODS-specific USIs) is
    probably the next largest in size. Student data is also frequently
    encountered in the payloads. Thus, with a larger data set and higher volume
    of access, the decision here needs to be based on the specific deployment
    scenario, factoring in the total number of non-unique students served across
    all ODS contexts weighed against the relatively higher cache usage.
* The parent cache (which maps ParentUniqueIds to ODS-specific USIs) probably
    represents the largest cache size (considering there are one or more parents
    per student on average), but since parents are rarely included in the
    payloads this could actually be a candidate for disabling the caching
    completely, or at least using the external cache to relieve memory pressure
    on the API processes. Cache Configuration to use External Cache. **"Parent"
    entity was changed to "Contact" in data standard 5, therefore this setting
    only applies to data standard version 4 and below and has no affect on data
    standard version 5 and above.**
* The contact cache (which maps ContactUniqueIds to ODS-specific USIs)
    probably represents the largest cache size (considering there are one or
    more contacts per student on average), but since contacts are rarely
    included in the payloads this could actually be a candidate for disabling
    the caching completely, or at least using the external cache to relieve
    memory pressure on the API processes. Cache Configuration to use External
    Cache. **"Parent" entity was changed to "Contact" in data standard 5,
    therefore this setting only applies to data standard version 5 and above and
    has no affect on data standard version 4 and below.**

Configuration of caching to use external cache can be set for each cacheable
resource.  Any cacheable resource that is configured with **"UseExternalCache":
false** will use the default internal in-memory cache.

In order to use the external cache feature, update the following values in
`appsettings.json` :

* Set external cache - cache provider:
  * Only "Redis" is supported
* Set external cache configuration
  * Redis
    * Configuration - Comma separated list of host and ports
    * Password (optional) AUTH Password
* Configure which cacheable resource to use external cache for:
    1. ApiClientDetails
    2. Descriptors
    3. PersonUniqueIdToUsiCache

## Default Caching configuration

### Default External Cache Settings

```json
"Caching": {
    "ExternalCacheProvider": "",
    "Descriptors": {
        "UseExternalCache": false,
        "AbsoluteExpirationSeconds": 1800
    },
    "PersonUniqueIdToUsi": {
        "UseExternalCache": false,
        "AbsoluteExpirationSeconds": 0,
        "SlidingExpirationSeconds": 14400,
        "UseProgressiveLoading": false,
        "CacheSuppression": {
            "Student": false,
            "Staff": false,
            "Parent": false,
            "Contact": false
        }
    },
    "ApiClientDetails": {
        "UseExternalCache": false,
        "AbsoluteExpirationSeconds": 900
    },
    "Security": {
        "AbsoluteExpirationMinutes": 10
    }
},
"Services": {
    "Redis": {
        "Configuration": ""
    }
},
```

## Example Caching Configuration using Redis

### Redis Cache Settings

```json
"Caching": {
    "ExternalCacheProvider": "Redis",
    "Descriptors": {
        "UseExternalCache": false,
        "AbsoluteExpirationSeconds": 1800
    },
    "PersonUniqueIdToUsi": {
        "UseExternalCache": true,
        "AbsoluteExpirationSeconds": 0,
        "SlidingExpirationSeconds": 14400,
        "UseProgressiveLoading": false,
        "CacheSuppression": {
            "Student": false,
            "Staff": false,
            "Parent": false,
            "Contact": false
        }
    },
    "ApiClientDetails": {
        "UseExternalCache": true,
        "AbsoluteExpirationSeconds": 900
    },
    "Security": {
        "AbsoluteExpirationMinutes": 10
    }
}
"Services": {
    "Redis": {
        "Configuration": "localhost"
    }
},
```

## Setting up Redis distributed cache

See the [Redis Getting
Started](https://redis.io/docs/getting-started/installation/) documentation for
more information on managing Redis.

:::note

The following GitHub link contains docker setup file for testing with
Redis and Redis-Commander.

* [Redis Setup](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/blob/v7.3/RedisCacheTesting/docker-compose.yaml)

:::
