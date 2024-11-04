# Endpoints in Admin API 1.x

Below are the endpoints and their request and response objects for v1.x of the Ed-Fi ODS / API Admin API.

For the most accurate and detailed documentation of active endpoints in a version, configure and launch your application with `SwaggerEnabled : true` *(this is not recommended in production)*.

All functional endpoints require authentication to access. See [Securing Admin API](../technical-information/securing-admin-api.md) for details.

## Endpoint URLs and Schemas

*   [Endpoint URLs and Schemas](#endpoint-urls-and-schemas)
    *   [Response Wrapper Schema](#response-wrapper-schema)
    *   [Vendors](#vendors)
    *   [Claimsets](#claimsets)
    *   [Applications](#applications)
*   [Common Responses](#common-responses)

###   
Response Wrapper Schema

Responses with a body have a common "wrapper" around their result object (which may be empty) or a collection of errors.

These wrappers are **not** reflected in the below documentation. Assume they are the contents of `result` when successful.

![](https://edfi.atlassian.net/wiki/images/icons/grey_arrow_down.png)

Click to view response wrappers

| Response | Codes | Schema |
| --- | --- | --- |
| Success | 200, 201 | ```<br>{  <br>  "status": 0,  <br>  "title": "string",  <br>  "result": object?  <br>}<br>``` |
| Error | 401, 403, 404, 500 | ```<br>{  <br>  "status": 0,  <br>  "title": "string",  <br>  "errors": [ "string" ]  <br>}<br>``` |
| Validation Error | 400 | ```<br>{  <br>  "status": 0,  <br>  "title": "string",  <br>  "errors": [  <br>    { "string": [ "string" ] }  <br>  ]  <br>}<br>``` |

### Vendors

![](https://edfi.atlassian.net/wiki/images/icons/grey_arrow_down.png)

Click to view /vendors endpoints

| Endpoint | HTTP Verb | Description | Request Schema | Response Schema (Success) |
| --- | --- | --- | --- | --- |
| ```<br>v1/vendors/<br>``` | GET | Retrieves all vendors | \-  | ```<br>[  <br>  {  <br>    "vendorId": 0,  <br>    "company": "string",  <br>    "namespacePrefixes": "string",  <br>    "contactName": "string",  <br>    "contactEmailAddress": "string"  <br>  }  <br>]<br>``` |
| ```<br>v1/vendors/{id}<br>``` | GET | Retrieves a specific vendor by `id` | \-  | ```<br>  <br><br>``` |
| ```<br>v1/vendors/<br>``` | POST | Creates a new vendor | ```<br>{  <br>  "company": "string",  <br>  "namespacePrefixes": "string",  <br>  "contactName": "string",  <br>  "contactEmailAddress": "string"  <br>}<br>``` | ```<br>{  <br>  "vendorId": 0,  <br>  "company": "string",  <br>  "namespacePrefixes": "string",  <br>  "contactName": "string",  <br>  "contactEmailAddress": "string"  <br>}<br>``` |
| ```<br>v1/vendors/{id}<br>``` | PUT | Updates a specific vendor by `id` | `{     "company": "string",     "namespacePrefixes": "string",     "contactName": "string",     "contactEmailAddress": "string"   }` | ```<br>{  <br>  "vendorId": 0,  <br>  "company": "string",  <br>  "namespacePrefixes": "string",  <br>  "contactName": "string",  <br>  "contactEmailAddress": "string"  <br>}<br>``` |
| ```<br>v1/vendors/{id}<br>``` | DELETE | Deletes a vendor by `id` | \-  | ```<br>-<br>``` |
| ```<br>v1/vendors/{id}/applications<br>``` | GET | Retrieves all applications associated with vendor of `id` | \-  | ```<br>[  <br>  {  <br>    "applicationId": 0,  <br>    "applicationName": "string",  <br>    "claimSetName": "string",  <br>    "profileName": "string",  <br>    "educationOrganizationId": 0,  <br>    "odsInstanceName": "string"  <br>  }  <br>]<br>``` |

### Claimsets

![](https://edfi.atlassian.net/wiki/images/icons/grey_arrow_down.png)

Click to view /claimsets endpoints

```
  

```

| ```<br>Endpoint<br>``` | ```<br>HTTP Verb<br>``` | ```<br>Description<br>``` | ```<br>Request Schema<br>``` | ```<br>Response Schema (Success)<br>``` |
| --- | --- | --- | --- | --- |
| ```<br>v1/claimsets/<br>``` | ```<br>GET<br>``` | Retrieves all claimsets | ```<br>-<br>``` | ```<br>[<br>  {<br>    "id": 0,<br>    "name": "string",<br>    "isSystemReserved": true,<br>    "applicationsCount": 0<br>  }<br>]<br>``` |
| ```<br>v1/claimsets/{id}<br>``` | ```<br>GET<br>``` | Retrieves a specific claimset by id | ```<br>-<br>``` | ```<br>{<br>  "id": 0,<br>  "name": "string",<br>  "isSystemReserved": true,<br>  "applicationsCount": 0,<br>  "resourceClaims": [<br>    {<br>      "name": "string",<br>      "read": true,<br>      "create": true,<br>      "update": true,<br>      "delete": true,<br>      "defaultAuthStrategiesForCRUD": [<br>        {<br>          "authStrategyName": "string",<br>          "isInheritedFromParent": true<br>        }<br>      ],<br>      "authStrategyOverridesForCRUD": [<br>        {<br>          "authStrategyName": "string",<br>          "isInheritedFromParent": true<br>        }<br>      ],<br>      "children": [<br>        "list of resource claims"<br>      ]<br>    }<br>  ]<br>}<br>``` |
| ```<br>v1/claimsets/<br>``` | ```<br>POST<br>``` | Creates a new claimset | ```<br>{<br>  "name": "string",<br>  "resourceClaims": [<br>    {<br>      "name": "string",<br>      "read": true,<br>      "create": true,<br>      "update": true,<br>      "delete": true,<br>      "defaultAuthStrategiesForCRUD": [<br>        {<br>          "authStrategyName": "string",<br>          "isInheritedFromParent": true<br>        }<br>      ],<br>      "authStrategyOverridesForCRUD": [<br>        {<br>          "authStrategyName": "string",<br>          "isInheritedFromParent": true<br>        }<br>      ],<br>      "children": [<br>        "list of resource claims"<br>      ]<br>    }<br>  ]<br>}<br>``` | ```<br>{<br>  "id": 0,<br>  "name": "string",<br>  "isSystemReserved": true,<br>  "applicationsCount": 0,<br>  "resourceClaims": [<br>    {<br>      "name": "string",<br>      "read": true,<br>      "create": true,<br>      "update": true,<br>      "delete": true,<br>      "defaultAuthStrategiesForCRUD": [<br>        {<br>          "authStrategyName": "string",<br>          "isInheritedFromParent": true<br>        }<br>      ],<br>      "authStrategyOverridesForCRUD": [<br>        {<br>          "authStrategyName": "string",<br>          "isInheritedFromParent": true<br>        }<br>      ],<br>      "children": [<br>        "list of resource claims"<br>      ]<br>    }<br>  ]<br>}<br>``` |
| ```<br>v1/claimsets/{id}<br>``` | ```<br>PUT<br>``` | Updates a specific claimset by id | ```<br>{<br>  "id": 0,<br>  "name": "string",<br>  "resourceClaims": [<br>    {<br>      "name": "string",<br>      "read": true,<br>      "create": true,<br>      "update": true,<br>      "delete": true,<br>      "defaultAuthStrategiesForCRUD": [<br>        {<br>          "authStrategyName": "string",<br>          "isInheritedFromParent": true<br>        }<br>      ],<br>      "authStrategyOverridesForCRUD": [<br>        {<br>          "authStrategyName": "string",<br>          "isInheritedFromParent": true<br>        }<br>      ],<br>      "children": [ <br>         "list of resource claims"  <br>      ]  <br>    }     <br>  ]   <br>}<br>``` | ```<br>{<br>  "id": 0,<br>  "name": "string",<br>  "isSystemReserved": true,<br>  "applicationsCount": 0,<br>  "resourceClaims": [<br>    {<br>      "name": "string",<br>      "read": true,<br>      "create": true,<br>      "update": true,<br>      "delete": true,<br>      "defaultAuthStrategiesForCRUD": [<br>        {<br>          "authStrategyName": "string",<br>          "isInheritedFromParent": true<br>        }<br>      ],<br>      "authStrategyOverridesForCRUD": [<br>        {<br>          "authStrategyName": "string",<br>          "isInheritedFromParent": true<br>        }<br>      ],<br>      "children": [<br>         "list of resource claims"  <br>       ]<br>    }<br>  ]<br>}<br>``` |
| ```<br>v1/claimsets/{id}<br>``` | DELETE | Deletes a claimset by `id` | \-  | \-  |

```
  

```

### Applications

![](https://edfi.atlassian.net/wiki/images/icons/grey_arrow_down.png)

Click to view /applications endpoints

| Endpoint | HTTP Verb | Description | Request Schema | Response Schema (Success) |
| --- | --- | --- | --- | --- |
| ```<br>v1/applications/<br>``` | GET | Retrieves all applications | \-\| | ```<br>[  <br>  {  <br>    "applicationId": 0,  <br>    "applicationName": "string",  <br>    "claimSetName": "string",  <br>    "profileName": "string",  <br>    "educationOrganizationId": 0,  <br>    "odsInstanceName": "string"  <br>  }  <br>]<br>``` |
| ```<br>v1/applications/{id}<br>``` | GET | Retrieves a specific application by `id` | \-  | ```<br>{  <br>  "applicationId": 0,  <br>  "applicationName": "string",  <br>  "claimSetName": "string",  <br>  "profileName": "string",  <br>  "educationOrganizationId": 0,  <br>  "odsInstanceName": "string"  <br>}<br>``` |
| ```<br>v1/applications/<br>``` | POST | Creates a new application | ```<br>{  <br>  "applicationName": "string",  <br>  "vendorId": 0,  <br>  "claimSetName": "string",  <br>  "profileId": 0,  <br>  "educationOrganizationIds": [  <br>    0  <br>  ]  <br>}<br>``` | ```<br>{  <br>  "applicationId": 0,  <br>  "key": "string",  <br>  "secret": "string"  <br>}<br>``` |
| ```<br>v1/applications/{id}<br>``` | PUT | Updates a specific application by `id` | ```<br>{  <br>  "applicationId": 0,  <br>  "applicationName": "string",  <br>  "vendorId": 0,  <br>  "claimSetName": "string",  <br>  "profileId": 0,  <br>  "educationOrganizationIds": [ 0 ]  <br>}<br>``` | ```<br>{  <br>  "applicationId": 0,  <br>  "applicationName": "string",  <br>  "claimSetName": "string",  <br>  "profileName": "string",  <br>  "educationOrganizationId": 0,  <br>  "odsInstanceName": "string"  <br>}<br>``` |
| ```<br>v1/applications/{id}<br>``` | DELETE | Deletes an application by `id` | \-  | ```<br>-<br>``` |
| ```<br>v1/applications/{id}/reset-credential<br>``` | PUT | Resets an application credentials by `id` | \-  | ```<br>{  <br>  "applicationId": 0,  <br>  "key": "string",  <br>  "secret": "string"  <br>}<br>``` |

## Common Responses

| Response Code | Description | Valid for Verbs | Notes |
| --- | --- | --- | --- |
| ```<br>200 SUCCESS<br>``` | Request was successful | ALL |     |
| ```<br>201 CREATED<br>``` | Resource was created successfully | POST | Response will also include a `location`  header which directs to the new resource |
| ```<br>400 BAD REQUEST<br>``` | Invalid request payload - See errors for details | POST, PUT |     |
| ```<br>401 UNAUTHORIZED<br>``` | Missing or invalid authentication token | ALL |     |
| ```<br>403 FORBIDDEN<br>``` | Authentication token is valid but resource is outside of authenticated scope | ALL |     |
| ```<br>404 NOT FOUND<br>``` | Resource with given `id`  not found | ALL |     |
| ```<br>500 INTERNAL SERVER ERROR<br>``` | Unexpected error on the system - See error for details | ALL |     |