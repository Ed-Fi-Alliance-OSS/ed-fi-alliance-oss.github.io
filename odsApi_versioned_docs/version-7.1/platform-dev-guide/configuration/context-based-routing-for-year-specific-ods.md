# Context-Based Routing for Year-Specific ODS

The Ed-Fi ODS API routing has been redesigned to provide a simple, predictable
base path for all API requests by default. The out-of-the-box configuration
allows for the implementation of any implicit data segmentation strategy through the configuration of ODS instances, API
clients, and their associations with each API client configured with access to a
single ODS instance. In this configuration, API clients all use the same base path
with their requests and are not aware how the data is segmented by the host.

However, some implementations may find it useful to add an explicit school year
(or some other contextual value such as a district and/or instance identifier)
to the API requests base path as part of an explicit data segmentation strategy or to distinguish data associated with previous
years from data for the current year, or both. The primary reason for pursuing an
explicit data segmentation strategy is to allow the same API clients to be used to
access several different ODS instances.

To enable context-based routing for the Ed-Fi ODS / API, provide an ASP.NET
route template in the "OdsContextRouteTemplate" setting of the "ApiSettings"
section of the configuration. This route template can contain multiple segments
(e.g. `{instanceId}/{schoolYearFromRoute}`) if multiple context values are
required and can include ASP.NET [route
constraints](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/routing?view=aspnetcore-7.0#route-constraints).

```json
{
  "ApiSettings": {
    ...
    "OdsContextRouteTemplate": "{schoolYearFromRoute:range(2000,2099)}",
    ...
  }
}
```

:::info
The term "schoolYearFromRoute" has been used historically for school
year in the route template to avoid any potential naming conflicts in the
ASP.NET model binding context caused by the presence of a query string filter
parameter named "schoolYear" because of a corresponding resource property.
:::

Once the OdsContextRouteTemplate is defined, all API requests must include the segment in the base path (in multi-tenant mode
this context segment will be added after the tenant identifier segment). Also, all
ODS instance definitions managed in the EdFi_Admin database must have
corresponding contextual name/value pairs defined in the OdsInstanceContext table. The
API will use the context from the request path with the contextual values defined
for the ODS instance to identify which database should be used to service the
request. A failure to match all the context values defined will result in a 404
Not Found response.

![Context Route Template](https://edfi.atlassian.net/wiki/download/thumbnails/25493643/image-2023-7-26_20-38-28.png?version=1&modificationDate=1699456104537&cacheVersion=1&api=v2&width=548&height=162)
