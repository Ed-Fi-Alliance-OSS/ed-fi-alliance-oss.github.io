# Endpoints in Admin API 1.x

Below are the endpoints and their request and response objects for v1.x of the Ed-Fi ODS / API Admin API.

For the most accurate and detailed documentation of active endpoints in a version, configure and launch your application with SwaggerEnabled : true (this is not recommended in production).

All functional endpoints require authentication to access. See Securing Admin API for details.

## Endpoint URLs and Schemas

### Response Wrapper Schema

Responses with a body have a common "wrapper" around their result object (which may be empty) or a collection of errors.

These wrappers are not reflected in the below documentation. Assume they are the contents of result when successful.

| Response	| Codes	| Schema |
| --- | --- | --- |
| Success | 200, 201 | ```{ "status": 0, "title": "string", "result": object? }```|
| Error | 401, 403, 404, 500 | ```{ "status": 0, "title": "string", "errors": [ "string" ]}```|
| Validation Error	| 400 | ``` { "status": 0, "title": "string", "errors": [{ "string": [ "string" ] }]}```|

### Vendors

| Endpoint| HTTP Verb	| Description |	Request Schema| Response Schema (Success) |
| --- | --- | --- | --- | --- |
| ```v1/vendors/``` |	GET | Retrieves all vendors | - | ```[ { "vendorId": 0, "company": "string", "namespacePrefixes": "string", "contactName": "string", "contactEmailAddress": "string" }] ```|
| ```v1/vendors/```<br/>```{id}``` |	GET | Retrieves a specific vendor by id | - |  |
| ```v1/vendors/``` | POST | Creates a new vendor | ``` { "company": "string", "namespacePrefixes": "string", "contactName": "string", "contactEmailAddress": "string" }``` | ```{ "vendorId": 0, "company": "string", "namespacePrefixes": "string", "contactName": "string", "contactEmailAddress": "string" }``` |
| ```v1/vendors/```<br/>```{id}``` | PUT | Updates a specific vendor by id | ```{ "company": "string", "namespacePrefixes": "string", "contactName": "string", "contactEmailAddress": "string" } ```| ``` { "vendorId": 0, "company": "string", "namespacePrefixes": "string", "contactName": "string", "contactEmailAddress": "string" } ``` |
| ```v1/vendors/```<br/>```{id}``` | DELETE | Deletes a vendor by id |	- |  - |
| ```v1/vendors/```<br/>```{id}```<br/>```/applications ```| GET | Retrieves all applications associated with vendor of id | - | ``` [ { "applicationId": 0, "applicationName": "string",  "claimSetName": "string", "profileName": "string", "educationOrganizationId": 0, "odsInstanceName": "string" } ] ``` |

### Claimsets

| Endpoint| HTTP Verb	| Description |	Request Schema| Response Schema (Success) |
| --- | --- | --- | --- | --- |
| ```v1/claimsets/``` | GET | Retrieves all claimsets | - | ``` [{ "id": 0, "name": "string", "isSystemReserved": true, "applicationsCount": 0 } ] ``` |
| ```v1/claimsets/```<br/>```{id}``` | GET | Retrieves a specific claimset by id | - | ```{ "id": 0, "name": "string", "isSystemReserved": true, "applicationsCount": 0, "resourceClaims": [ { "name": "string", "read": true, "create": true, "update": true, "delete": true, "defaultAuthStrategiesForCRUD": [ { "authStrategyName": "string", "isInheritedFromParent": true } ], "authStrategyOverridesForCRUD": [ { "authStrategyName": "string", "isInheritedFromParent": true } ], "children": [ "list of resource claims" ] } ] } ```|
| ```v1/claimsets/``` | POST | Creates a new claimset | ``` { "name": "string", "resourceClaims": [ { "name": "string", "read": true, "create": true, "update": true, "delete": true, "defaultAuthStrategiesForCRUD": [ { "authStrategyName": "string", "isInheritedFromParent": true } ], "authStrategyOverridesForCRUD": [ {      "authStrategyName": "string", "isInheritedFromParent": true } ], "children": [ "list of resource claims"  ] } ] } ```| ```{ "id": 0, "name": "string",  "isSystemReserved": true, "applicationsCount": 0, "resourceClaims": [ { "name": "string", "read": true, "create": true, "update": true, "delete": true, "defaultAuthStrategiesForCRUD": [ { "authStrategyName": "string", "isInheritedFromParent": true } ], "authStrategyOverridesForCRUD": [ { "authStrategyName":  "string", "isInheritedFromParent": true } ], "children": [ "list of resource claims" ] } ] } ```|
| ```v1/claimsets/```<br/>```{id}``` | PUT | Updates a specific claimset by id | ```{ "id": 0, "name": "string", "resourceClaims": [ { "name": "string", "read": true, "create": true,  "update": true, "delete": true,  "defaultAuthStrategiesForCRUD": [ { "authStrategyName": "string", "isInheritedFromParent": true } ], "authStrategyOverridesForCRUD": [ { "authStrategyName": "string", "isInheritedFromParent": true } ], "children": [ "list of resource claims" ] } ] }```| ``` {  "id": 0, "name": "string", "isSystemReserved": true, "applicationsCount": 0, "resourceClaims": [ { "name": "string", "read": true, "create": true, "update": true, "delete": true, "defaultAuthStrategiesForCRUD": [ { "authStrategyName": "string", "isInheritedFromParent": true } ], "authStrategyOverridesForCRUD": [ {  "authStrategyName": "string", "isInheritedFromParent": true } ], "children": [ "list of resource claims" ] }  ]  }``` |
| ```v1/claimsets/```<br/>```{id}``` | DELETE | Deletes a claimset by id |	- | - |

### Applications

| Endpoint| HTTP Verb	| Description |	Request Schema| Response Schema (Success) |
| --- | --- | --- | --- | --- |
| ```v1/applications/``` | GET | Retrieves all applications | - | ```[ { "applicationId": 0, "applicationName": "string", "claimSetName": "string", "profileName": "string", "educationOrganizationId": 0, "odsInstanceName": "string" } ] ```|\
| ```v1/applications/```<br/>```{id}``` | GET | Retrieves a specific application by id | - | ``` { "applicationId": 0, "applicationName": "string", "claimSetName": "string", "profileName": "string", "educationOrganizationId": 0, "odsInstanceName": "string" } ```|
| ```v1/applications/``` | POST | Creates a new application | ``` { "applicationName": "string", "vendorId": 0, "claimSetName": "string", "profileId": 0, "educationOrganizationIds": [ 0 ] } ```| ``` { "applicationId": 0, "key": "string", "secret": "string" } ```|
| ```v1/applications/```<br/>```{id}``` | PUT | Updates a specific application by id | ``` { "applicationId": 0, " applicationName": "string", "vendorId": 0, "claimSetName":  "string", "profileId": 0, "educationOrganizationIds": [ 0 ] } ```| ```{ "applicationId": 0, "applicationName": "string", "claimSetName": "string", "profileName": "string", "educationOrganizationId": 0, "odsInstanceName": "string" } ``` |
| ```v1/applications/```<br/>```{id}``` | DELETE | Deletes an application by id  | - | - |
| ```v1/applications/```<br/>```{id}/reset-credential``` | PUT |	Resets an application credentials by id |	- | ``` { "applicationId": 0, "key": "string", "secret": "string" } ``` |

## Common Responses

| Response | Code |	Description	| Valid for Verbs |	Notes |
| --- | --- | --- | --- | --- |
| 200 SUCCESS | Request was successful| ALL | |
| 201 CREATED |	Resource was created successfully | POST | 	Response will also include a location  header which directs to the new resource |
| 400 BAD REQUEST | Invalid request payload - See errors for details | POST, PUT | |
| 401 UNAUTHORIZED | Missing or invalid authentication token | ALL | |
| 403 FORBIDDEN | Authentication token is valid but resource is outside of authenticated scope | ALL | |
| 404 NOT FOUND | Resource with given id  not found	| ALL | |
| 500 INTERNAL SERVER ERROR | Unexpected error on the system - See error for details | ALL | |
