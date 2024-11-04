# Securing Admin API

The Ed-Fi ODS / API Admin API application is secured using internally managed
clients and following the OAuth 2.0 "client credentials" specification designed
for machine-to-machine communication (in other words, not for authenticating
individual users).

The following documentation outlines how to register and authenticate against
the Admin API using this framework.

> [!INFO] In the documentation below, the word "client" refers to a client of
> the Admin API management system, and _not a client of the Ed-Fi ODS / API
> Platform_, which are managed via the Admin API. For management of the ODS /
> API clients, see instead the Applications section in [Endpoints in Admin API
> 1.x](../technical-information/endpoints-in-admin-api-1x.md).

* [Authenticating Requests](#authenticating-requests)
* [Registering New Clients](#registering-new-clients)
  * [Enable registering clients by updating your application configuration
        to set Authentication:EnableRegistration to true . Restart the
        application.](#enable-registering-clients-by-updating-your-application-configuration-to-set-authenticationenableregistration-to-true-restart-the-application)

## Authenticating Requests

To authenticate your request to the Admin API, first retrieve a token by POSTing
a **URL-Encoded Form** request to the `/connect/token` endpoint.

| Endpoint | Http Verb | Description | Request Schema | Response Schema (Success) | Response Schema (Error) |
| --- | --- | --- | --- | --- | --- |
| ```<br/>/connect/token<br/>``` | POST | Retrieve a bearer token for Admin API | _```<br/>    client_id="string"<br/>```<br/>    <br/>_   ```<br/>    client_secret="string"<br/>```<br/>    <br/>_```<br/>    grant_type="client_credntials"<br/>```<br/>    <br/>_   ```<br/>    scope="`e``dfi_admin_api/full_access`"<br/>``` | ```<br/>{  <br/>  "access_token": "string",  <br/>  "token_type": "Bearer",  <br/>  "expires_in": 0  <br/>}<br/>``` | ```<br/>{  <br/>  "error": "string",  <br/>  "error_description": "string",  <br/>  "error_uri": "string"  <br/>}<br/>``` |

Save the resulting `access_token` from the response and include it as a Bearer
token in the `Authorization`  header on subsequent requests. Note the
`expires_in`  time and request new tokens accordingly.

> [!INFO] The endpoints outlined here do not follow the same patterns as those
> documented in [Endpoints in Admin API
> 1.x](../technical-information/endpoints-in-admin-api-1x.md). They are not
> prefixed with a version and do not wrap their responses in the same format
> consistently. These endpoints are managed separately from API endpoints in
> order to support OAuth 2.0 internally and may change in future releases.

Scope and Authorization

Admin API v1 includes a single _scope_ of authorization
(`e``dfi_admin_api/full_access`) which allows access to all functional endpoints
when granted to a given client.

By default, all registered clients are granted access to this scope, however you
MUST request the scope when requesting a token. See endpoint description above
for detail.

_Future releases may introduce additional scopes or allow configuration or
customization of client authorization in Admin API._

## Registering New Clients

> [!CAUTION] Since the `/connect/register`  endpoint does not require any
> authentication, it is recommended that it remains disabled when not
> registering a new client. If you must register a new client, **temporarily
> enable, then re-disable the endpoint** by updating the configuration. For
> default first-time client registration see [First-Time Configuration for Admin
> API
> 1.x](../../admin-api/installation/admin-api-1x-for-odsapi-34-61/first-time-configuration-for-admin-api-1x.md).

### Enable registering clients by updating your application configuration to set `Authentication:EnableRegistration`  to `true` . Restart the application

Then, register a new client by POSTing a **URL-Encoded Form** request to
`/connect/register` .

| Endpoint | Http Verb | Description | Request Schema | Response Schema (Success) | Response Schema (Validation Error) | Response Schema (Error) |
| --- | --- | --- | --- | --- | --- | --- |
| ```<br/>/connect/register<br/>``` | POST | Registers a new Admin API client | _```<br/>    ClientId="string"<br/>```<br/>    <br/>_   ```<br/>    ClientSecret="string"<br/>```<br/>    <br/>*   ```<br/>    DisplayName="string"<br/>``` | ```<br/>{  <br/> "status": 0  <br/>  "title": "string"  <br/>}<br/>``` | ```<br/>{  <br/>  "status": 0,  <br/>  "title": "string",  <br/>  "errors": [  <br/>    { "string": [ "string" ] }  <br/>  ]  <br/>}<br/>``` | ```<br/>{  <br/>  "status": 0,  <br/>  "title": "string",  <br/>  "errors": [ "string" ]  <br/>}<br/>``` |

You can now retrieve a bearer token using the process above with your newly
registered Client ID and Secret.
