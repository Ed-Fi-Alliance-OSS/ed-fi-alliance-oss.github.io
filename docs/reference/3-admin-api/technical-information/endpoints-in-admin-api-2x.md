# Endpoints in Admin API 2.x

Below are the endpoints and their request and response objects for v2.0 of the Ed-Fi ODS / API Admin API.

For the most accurate and detailed documentation of active endpoints in a version, configure and launch your application with `SwaggerEnabled : true` *(this is not recommended in production)*.

All functional endpoints require authentication to access. See [Securing Admin API](../technical-information/securing-admin-api.md) for details.

> [!INFO]
> Please note these important details for changes between Admin API v1 and Admin API v2:
> *   Admin API v2.x is only compatible with the ODS/API 7.x line of products.  For ODS/API 3.4-6.1 support with Admin API, please see the [Admin API v1 line](https://edfi.atlassian.net/wiki/display/ADMINAPI/Endpoints+-+Admin+API).
> *   The response wrapper from Admin API v1 has been removed and objects are returned directly from their endpoint.
> *   Property names which start with an underscore ("\_") represents read-only properties.

## Endpoint URLs and Schemas

  

### Actions

![](https://edfi.atlassian.net/wiki/images/icons/grey_arrow_down.png)

Click to view /actions endpoints

| Endpoint | HTTP Verb | Description | Request Schema | Response Schema (Success) |
| --- | --- | --- | --- | --- |
| ```<br>v2/actions<br>``` | GET | Retrieves all actions | \-  | ```<br>[  <br>  {  <br>    "id": 0  <br>    "name": "string"  <br>    "uri": "string"<br>```<br>```<br>  }  <br>]<br>``` |

### Applications

![](https://edfi.atlassian.net/wiki/images/icons/grey_arrow_down.png)

Click to view /applications endpoints

| Endpoint | HTTP Verb | Description | Request Schema | Response Schema (Success) |
| --- | --- | --- | --- | --- |
| ```<br>v2/applications<br>``` | GET | Retrieves all applications | \-  | ```<br>[  <br>  {  <br>    "id": 0,  <br>    "applicationName": "string",  <br>    "vendorId": 0,  <br>    "claimSetName": "string",  <br>    "profileIds": [],  <br>    "educationOrganizationIds": [],  <br>    "odsInstanceId": 0      <br>  }  <br>]<br>``` |
| ```<br>v2/applications<br>``` | POST | Creates a new application | ```<br>{  <br>  "applicationName": "string",  <br>  "vendorId": 0,  <br>  "claimSetName": "string",  <br>  "profileIds": [ 0 ],  <br>  "educationOrganizationIds": [ 0 ],  <br>  "odsInstanceId": 0  <br>}<br>``` | ```<br>{  <br>  "id": 0,  <br>  "key": "string",  <br>  "secret": "string"  <br>}<br>``` |
| ```<br>v2/applications/{id}<br>``` | GET | Retrieves a specific application by `id` | \-  | ```<br>{  <br>  "id": 0,  <br>  "applicationName": "string",  <br>  "vendorId": 0,  <br>  "claimSetName": "string",  <br>  "profileIds": [],  <br>  "educationOrganizationIds": [],  <br>  "odsInstanceId": 0     <br>}<br>``` |
| ```<br>v2/applications/{id}<br>``` | PUT | Updates a specific application by `id` | ```<br>{  <br>```<br>```<br>  "applicationName": "string",  <br>  "vendorId": 0,  <br>  "claimSetName": "string",  <br>  "profileIds": [ 0 ],  <br>  "educationOrganizationIds": [ 0 ],  <br>  "odsInstanceId": 0  <br>}<br>``` | ```<br>HTTP response as documented below<br>``` |
| ```<br>v2/applications/{id}<br>``` | DELETE | Deletes an application by `id` | \-  | ```<br>HTTP response as documented below<br>``` |
| ```<br>v2/applications/{id}/reset-credential<br>``` | PUT | Resets an application credentials by `id` | \-  | ```<br>{  <br>  "id": 0,  <br>  "key": "string",  <br>  "secret": "string"  <br>}<br>``` |

### AuthorizationStrategies

![](https://edfi.atlassian.net/wiki/images/icons/grey_arrow_down.png)

Click to view /authorizationStrategies endpoints

| Endpoint | HTTP Verb | Description | Request Schema | Response Schema (Success) |
| --- | --- | --- | --- | --- |
| ```<br>v2/authorizationStrategies<br>``` | ```<br>GET<br>``` | Retrieves all auth strategies | \-  | ```<br>[  <br>  {  <br>    "id": 0  <br>    "name": "string"  <br>    "displayName": "string"<br>```<br>```<br>  }  <br>]<br>``` |

### ClaimSets

![](https://edfi.atlassian.net/wiki/images/icons/grey_arrow_down.png)

Click to view /claimSets endpoints

```
  

```

| ```<br>Endpoint<br>``` | ```<br>HTTP Verb<br>``` | ```<br>Description<br>``` | ```<br>Request Schema<br>``` | ```<br>Response Schema (Success)<br>``` |
| --- | --- | --- | --- | --- |
| ```<br>v2/claimSets<br>``` | ```<br>GET<br>``` | Retrieves all claimsets | ```<br>-<br>``` | ```<br>[<br>  {<br>    "id": 0,<br>    "name": "string",<br>    "_isSystemReserved": true,<br>    "_applications": []<br>  }<br>]<br>``` |
| ```<br>v2/claimSets<br>``` | ```<br>POST<br>``` | Creates a new claimset. | ```<br>{ "name": "string"}<br>``` | ```<br>HTTP response as documented below<br>```<br>```<br>  <br>  <br><br>``` |
| ```<br>v2/claimSets/{id}<br>``` | ```<br>GET<br>``` | Retrieves a specific claimset by id | ```<br>-<br>``` | ```<br>{<br>  "id": 0,<br>  "name": "string",<br>  "_isSystemReserved": false,<br>  "_applications": [],<br>  "resourceClaims": [<br>    {  <br>      "id": "string",  <br>      "name": "string",      <br>      "actions": [  <br>          {   <br>            "name": "string",  <br>            "enabled": true  <br>          }  <br>      ],<br>      "_defaultAuthorizationStrategies": [<br>        {  <br>          "actionId": 0,  <br>          "actionName": string,<br>          "authorizationStrategies": [  <br>           {  <br>              "authStrategyId: 0,  <br>              "authStrategyName": "string",  <br>              "isInheritedFromParent": true  <br>           }]          <br>        }<br>      ],<br>      "authorizationStrategyOverridesForCRUD": [<br>        {     <br>          "actionId": 0,           <br>          "actionName": string,   <br>          "authorizationStrategies": [  <br>           {  <br>            "authStrategyId: 0,  <br>            "authStrategyName": "string",  <br>            "isInheritedFromParent": true  <br>           }] <br>        }<br>      ],<br>      "children": [<br>        "list of resource claims"<br>      ]<br>    }<br>  ]<br>}<br>``` |
| ```<br>v2/claimSets/{id}<br>``` | ```<br>PUT<br>``` | Update the claim set name. | ```<br>{  <br>"name": "string"  <br>}<br>``` | ```<br>HTTP response as documented below<br>``` |
| ```<br>v2/claimSets/{id}<br>``` | DELETE | Deletes a claimset by `id` | \-  | HTTP response as documented below |
| ```<br>v2/claimSets/{claimSetId}/resourceClaimActions<br>``` | POST | Add resourceclaimaction association to claim set. At least one action should be enabled. Valid actions are read, create, update, delete, readchanges.  <br>resouceclaimId is required fields. | ```<br>{  <br>"resouceclaimId" : 0,  <br>"resourceClaimActions":   <br> [  <br>     {  <br>      "name": "string",  <br>      "enabled": true  <br>      }  <br>  ]     <br>}<br>``` | HTTP response as documented below |
| ```<br>v2/claimSets/{claimSetId}/  <br>resourceClaimActions/{resourceClaimId}  <br>  <br>  <br><br>```<br>```<br>  <br>  <br>  <br><br>``` | ```<br>PUT<br>``` | Updates  the resourceclaimActions to a  specific resource claim on a claimset. At least one action should be enabled. Valid actions are read, create, update, delete, readchanges. | ```<br>{     <br>  "resourceClaimActions": [       <br>    {   <br>      "name": "string",  <br>      "enabled": true  <br>    }  <br>   ]   <br>}<br>``` | ```<br>HTTP response as documented below<br>``` |
| ```<br>v2/claimSets/{claimSetId}/resourceClaimActions/  <br>{resourceClaimId}/overrideAuthorizationStrategy  <br>  <br><br>```<br>```<br>  <br><br>``` | ```<br>POST<br>``` | Override the default authorization strategies on provided resource claim for a specific action.<br><br>ex: actionName = read,  authorizationStrategies\= \[ "Ownershipbased" \] | ```<br>{  <br>"actionName": string,  <br>"authorizationStrategies: []  <br>}<br>``` | HTTP response as documented below |
| ```<br>v2/claimSets/{claimSetId}/resourceClaimActions/  <br>{resourceClaimId}/resetAuthorizationStrategies  <br>  <br><br>``` | ```<br>POST<br>``` | Reset to default authorization strategies on provided resource claim. | ```<br>-<br>``` | HTTP response as documented below |
| ```<br>v2/claimSets/{claimSetId}/  <br>resourceClaimActions/{resourceClaimId}<br>``` | DELETE | Deletes a resource claims association from a claim set | ```<br>-<br>``` | HTTP response as documented below |
| ```<br>v2/claimSets/copy<br>``` | ```<br>POST<br>``` | Copy the existing claimset and create new. | ```<br>{  <br>   "originalId": 0,  <br>   "name": "string"  <br>}<br>``` | ```<br>HTTP response as documented below  <br>  <br>  <br><br>``` |
| ```<br>v2/claimSets/import<br>``` | POST | Import new claimset | ```<br>{<br>  "name": "string",<br>  "resourceClaims": [<br>    {<br>      "name": "string",         <br>      "actions": [  <br>          {   <br>            "name": "read",  <br>            "enabled": true  <br>          },  <br>          {   <br>            "name": "create",  <br>            "enabled": true  <br>          },  <br>          {   <br>            "name": "update",  <br>            "enabled": true  <br>          },  <br>          {   <br>            "name": "delete",  <br>            "enabled": true  <br>          },  <br>          {   <br>            "name": "readChanges",  <br>            "enabled": true  <br>          }  <br>    ],  <br>      "authorizationStrategyOverridesForCRUD": [<br>        {  <br>          "actionName": string,<br>          "authorizationStrategies": []          <br>        }<br>      ],<br>      "children": [<br>        "list of resource claims"<br>      ]<br>    }<br>  ]<br>}<br>``` | HTTP response as documented below |
| ```<br>v2/claimSets/{id}/export<br>``` | GET | Retrieves a specific claimset by id | \-  | ```<br>{  <br>  "id": 0,  <br>  "name": "string",  <br>  "_isSystemReserved": false,  <br>  "_applications": [],  <br>  "resourceClaims": [  <br>    {  <br>      "id": "string",  <br>      "name": "string",  <br>      "actions": [<br>```<br>```<br>          {   <br>            "name": "read",  <br>            "enabled": true  <br>          },  <br>          {   <br>            "name": "create",  <br>            "enabled": true  <br>          },  <br>          {   <br>            "name": "update",  <br>            "enabled": true  <br>          },  <br>          {   <br>            "name": "delete",  <br>            "enabled": true  <br>          },  <br>          {   <br>            "name": "readChanges",  <br>            "enabled": true  <br>          }  <br>      ],<br>```<br>```<br>    "_defaultAuthorizationStrategiesForCRUD": [  <br>        {  <br>          "actionId": 0,  <br>          "actionName": string,  <br>          "authorizationStrategies": [  <br>           {  <br>            "authStrategyId: 0,  <br>            "authStrategyName": "string",  <br>            "isInheritedFromParent": true  <br>           }]            <br>        }  <br>      ],  <br>    "authorizationStrategyOverridesForCRUD": [  <br>        {     <br>          "actionId": 0,           <br>          "actionName": string,   <br>          "authorizationStrategies": [  <br>           {  <br>             "authStrategyId: 0,  <br>             "authStrategyName": "string",  <br>             "isInheritedFromParent": true  <br>           }]   <br>        }  <br>      ],  <br>      "children": [  <br>        "list of resource claims"  <br>      ]  <br>    }  <br>  ]  <br>}<br>``` |

```
  

```

### OdsInstances

![](https://edfi.atlassian.net/wiki/images/icons/grey_arrow_down.png)

Click to view /odsInstances endpoints

| Endpoint | HTTP Verb | Description | Request Schema | Response Schema (Success) |
| --- | --- | --- | --- | --- |
| ```<br>v2/odsInstances<br>``` | ```<br>GET<br>``` | Retrieves all ODS Instances | \-  | ```<br>[  <br>  {  <br>    "id": 0,  <br>    "name": "string",  <br>    "instanceType": "string"<br>```<br>```<br>  }  <br>]<br>``` |
| ```<br>v2/odsInstances<br>``` | POST | Creates a new ODS instance. <br><br>Note: Will validate the connection string to be proper format.<br><br>All the fields are required. | ```<br>{      <br> "name": "string"  <br> "instanceType": "string",  <br> "connectionString": "string"  <br>}<br>``` | HTTP response as documented below |
| ```<br>v2/odsInstances/{id}<br>``` | GET | Retrieves a specific ODS instance by `id` | \-  | ```<br>{  <br>    "id": 0,  <br>    "name": "string",  <br>    "instanceType": "string",  <br>    "odsInstanceContexts": [    <br>```<br>```<br>      {  <br>       "id": 0,  <br>       "odsInstanceId": 0,  <br>       "contextKey": "string",  <br>       "contextValue": "string"  <br>      }],  <br>    "odsInstanceDerivatives": [  <br>       {  <br>        "id": 0,  <br>        "odsInstanceId": 0,  <br>        "derivativeType": "string"  <br>       }]  <br>}<br>``` |
| ```<br>v2/odsInstances/{id}<br>``` | PUT | Updates a specific ODS instance by id.<br><br>Note: Will validate the connection string to be proper format.<br><br>On update the connection string is optional.<br><br>If user is not intending to update the connection string value as part of update, then empty value will be passed. So that the existing connection string will be retained as plain text or encrypted value. | {    <br>  "name": "string"  <br>  "instanceType": "string",  <br>  "connectionString": "string"  <br>} | HTTP response as documented below |
| ```<br>v2/odsInstances/{id}<br>``` | DELETE | Deletes an ODS instance by id | \-  | HTTP response as documented below |
| ```<br>v2/odsInstances/{id}/applications<br>``` | GET | Retrieves list of applications assigned to a specific ODS instance. | \-  | \[  <br>  {  <br>      "id": 0,  <br>      "applicationName": "string",  <br>      "vendorId": 0,  <br>      "claimSetName": "string",  <br>      "profileIds": \[\],  <br>      "educationOrganizationIds": \[\],  <br>      "odsInstanceId": 0  <br>   }  <br>\] |

### OdsInstanceContexts

![](https://edfi.atlassian.net/wiki/images/icons/grey_arrow_down.png)

Click to view /odsInstanceContexts endpoints

| Endpoint | HTTP Verb | Description | Request Schema | Response Schema (Success) |
| --- | --- | --- | --- | --- |
| ```<br>v2/odsInstanceContexts<br>``` | ```<br>GET<br>``` | Retrieves all ODS Instance contexts | \-  | ```<br>[  <br>  {  <br>    "id": 0,  <br>    "odsInstanceId": 0,  <br>    "contextKey": "string",  <br>    "contextValue": "string"<br>```<br>```<br>  }  <br>]<br>``` |
| ```<br>v2/odsInstanceContexts<br>``` | POST | Creates a new ODS instance context<br><br>All the fields are required.<br><br>ex: contextKey = "SchoolYear"<br><br>contextValue = "2023" | ```<br>{      <br> "odsInstanceId": 0  <br> "contextKey": "string",  <br> "contextValue": "string"  <br>}<br>``` | HTTP response as documented below |
| ```<br>v2/odsInstanceContexts/{id}<br>``` | GET | Retrieves a specific ODS instance  context by `id` | \-  | ```<br>{  <br>    "id": 0,  <br>    "odsInstanceId": 0,  <br>    "contextKey": "string",  <br>    "contextValue": "string"    <br>```<br>```<br>}<br>``` |
| ```<br>v2/odsInstanceContexts/{id}<br>``` | PUT | Updates a specific ODS instance context by id. | ```<br>{  <br>"odsInstanceId": 0  <br>"contextKey": "string",  <br>"contextValue": "string"  <br>}<br>``` | HTTP response as documented below |
| ```<br>v2/odsInstanceContexts/{id}<br>``` | DELETE | Deletes an ODS instance context by id | \-  | HTTP response as documented below |

### OdsInstanceDerivatives

![](https://edfi.atlassian.net/wiki/images/icons/grey_arrow_down.png)

Click to view /odsInstanceDerivatives endpoints

| Endpoint | HTTP Verb | Description | Request Schema | Response Schema (Success) |
| --- | --- | --- | --- | --- |
| ```<br>v2/odsInstanceDerivatives<br>``` | ```<br>GET<br>``` | Retrieves all ODS Instance derivatives | \-  | ```<br>[  <br>  {  <br>    "id": 0,  <br>    "odsInstanceId": 0,  <br>    "derivativeType": "string"  <br>  }<br>```<br>```<br>]<br>``` |
| ```<br>v2/odsInstanceDerivatives<br>``` | POST | Creates a new ODS instance derivative<br><br>All the fields are required.<br><br>Note: Will validate the connection string to be proper format.<br><br>Derivative types would be "ReadReplica" or "Snapshot" | ```<br>{      <br> "odsInstanceId": 0  <br> "derivativeType": "string",  <br> "connectionString": "string"  <br>}<br>``` | HTTP response as documented below |
| ```<br>v2/odsInstanceDerivatives  <br>  <br>/{id}<br>``` | GET | Retrieves a specific ODS instance derivative by `id` | \-  | ```<br>{  <br>    "id": 0,  <br>    "odsInstanceId": 0,  <br>    "derivativeType": "string"<br>```<br>```<br>}<br>``` |
| ```<br>v2/odsInstanceDerivatives/{id}<br>``` | PUT | Updates a specific ODS instance derivative by id.<br><br>Note: Will validate the connection string to be proper format.<br><br>On update the connection string is optional.<br><br>If user is not intending to update the connection string value as part of update, then empty value will be passed. So that the existing connection string will be retained as plain text or encrypted value.<br><br>Derivative types would be "ReadReplica" or "Snapshot" | ```<br>{     <br>"odsInstanceId": 0  <br>"derivativeType": "string",  <br>"connectionString": "string"  <br>}<br>``` | HTTP response as documented below |
| ```<br>v2/odsInstanceDerivatives/{id}<br>``` | DELETE | Deletes an ODS instance derivative by id | \-  | HTTP response as documented below |

### Profiles

![](https://edfi.atlassian.net/wiki/images/icons/grey_arrow_down.png)

Click to view /profiles endpoints

| Endpoint | HTTP Verb | Description | Request Schema | Response Schema (Success) |
| --- | --- | --- | --- | --- |
| ```<br>v2/profiles<br>``` | GET | Retrieves all profiles | \-  | ```<br>[  <br>  {  <br>    "id": 0,  <br>    "name":string  <br>  }  <br>]<br>``` |
| ```<br>v2/profiles<br>``` | POST | Creates a new profile | ```<br>{  <br>  "name": "string",  <br>  "definition": "string"    <br>}<br>``` | ```<br>HTTP response as documented below<br>``` |
| ```<br>v2/profiles/{id}<br>``` | GET | Retrieves a specific profile by `id` | \-  | ```<br>{  <br>  "id": 0,  <br>  "name":string,  <br>  "definition":string  <br>}<br>``` |
| ```<br>v2/profiles/{id}<br>``` | PUT | Updates a specific profile by `id` | `{   "name": "string",   "definition": "string"   }` | ```<br>HTTP response as documented below<br>``` |
| ```<br>v2/profiles/{id}<br>``` | DELETE | Deletes a profile by `id` | \-  | ```<br>HTTP response as documented below<br>``` |

### ResourceClaims

![](https://edfi.atlassian.net/wiki/images/icons/grey_arrow_down.png)

Click to view /resourceClaims endpoints

| Endpoint | HTTP Verb | Description | Request Schema | Response Schema (Success) |
| --- | --- | --- | --- | --- |
| ```<br>v2/resourceClaims<br>``` | GET | Retrieves all resourceclaims | \-  | ```<br>[  <br>  {  <br>    "id": 0  <br>    "name": "string",  <br>    "parentId": null,  <br>    "parentName": "",  <br>    "children": [  <br>      {  <br>       "id": 0  <br>       "name": "string",  <br>       "parentId": 0,  <br>       "parentName": "",  <br>       "children": []  <br>      }  <br>    ]  <br>  }  <br>]<br>``` |
| ```<br>v2/resourceClaims/{id}<br>``` | GET | Retrieves a specific resource claim by `id` | \-  | ```<br> {  <br>  "id": 0  <br>  "name": "string",  <br>  "parentId": null,  <br>  "parentName": "",  <br>  "children": [  <br>     {  <br>      "id": 0  <br>      "name": "string",  <br>      "parentId": 0,  <br>      "parentName": "",  <br>      "children": []  <br>     }  <br>  ]  <br>}<br>``` |

### Vendors

![](https://edfi.atlassian.net/wiki/images/icons/grey_arrow_down.png)

Click to view /vendors endpoints

| Endpoint | HTTP Verb | Description | Request Schema | Response Schema (Success) |
| --- | --- | --- | --- | --- |
| ```<br>v2/vendors<br>``` | GET | Retrieves all vendors | \-  | ```<br>[  <br>  {  <br>    "id": 0,  <br>    "company": "string",  <br>    "namespacePrefixes": "string",  <br>    "contactName": "string",  <br>    "contactEmailAddress": "string"  <br>  }  <br>]<br>``` |
| ```<br>v2/vendors<br>``` | POST | Creates a new vendor | ```<br>{  <br>  "company": "string",  <br>  "namespacePrefixes": "string",  <br>  "contactName": "string",  <br>  "contactEmailAddress": "string"  <br>}<br>``` | ```<br>HTTP response as documented below<br>``` |
| ```<br>v2/vendors/{id}<br>``` | GET | Retrieves a specific vendor by `id` | \-  | ```<br>{  <br>  "id": 0,  <br>  "company": "string",  <br>  "namespacePrefixes": "string",  <br>  "contactName": "string",  <br>  "contactEmailAddress": "string"  <br>}<br>``` |
| ```<br>v2/vendors/{id}<br>``` | PUT | Updates a specific vendor by `id` | `{     "company": "string",     "namespacePrefixes": "string",     "contactName": "string",     "contactEmailAddress": "string"   }` | ```<br>HTTP response as documented below<br>``` |
| ```<br>v2/vendors/{id}<br>``` | DELETE | Deletes a vendor by `id` | \-  | ```<br>HTTP response as documented below<br>``` |
| ```<br>v2/vendors/{id}/applications<br>``` | GET | Retrieves all applications associated with vendor of `id` | \-  | ```<br>[  <br> {  <br>  "id": 0,  <br>  "applicationName": "string",  <br>  "vendorId": 0,  <br>  "claimSetName": "string",  <br>  "profileIds": [],  <br>  "educationOrganizationIds": [],  <br>  "odsInstanceId": 0   <br> }  <br>]<br>``` |

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