---
sidebar_position: 2
---

# Getting Started - Configure a Data Store

After the services are running, this step creates the initial data store and
client credentials via the Configuration Service. A _data store_ is a database
connection that the Ed-Fi API uses to persist and serve Ed-Fi resource data.

## What This Step Creates

Running the configuration script provisions:

- A **vendor** and **application** in the Configuration Service
- A default **claim set** granting the application access to Ed-Fi resources
- A **data store** (PostgreSQL or SQL Server database) linked to the application
- A **client key and secret** for authenticating API requests

## Step 1: Run the Configuration Script

From the `eng/docker-compose` directory:

```powershell
./configure-local-data-store.ps1
```

The script connects to the Configuration Service, creates the data store, and
outputs the client credentials. Record the key and secret from the output. You
will need them to request API tokens.

## Step 2: Request an OAuth Token

Use the client credentials to obtain a bearer token from the Configuration
Service:

```powershell
curl -X POST http://localhost:8081/connect/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=<key>&client_secret=<secret>"
```

A successful response returns a JSON object containing `access_token`,
`expires_in`, and `token_type`.

:::info

If you are using Keycloak as your identity provider, the token endpoint is
`http://localhost:8045/realms/edfi/protocol/openid-connect/token`. Keycloak also
requires the realm and client to be configured before tokens will be accepted by
the Ed-Fi API. See [Identity Provider
Configuration](../platform-dev-guide/configuration/identity-provider.md) for the
Keycloak token endpoint and setup instructions.

:::

## Step 3: Make an API Request

Use the token to call the Ed-Fi API:

```powershell
curl http://localhost:8080/api/data/ed-fi/schools \
  -H "Authorization: Bearer <access_token>"
```

An empty array `[]` is a valid response. It means the data store is connected
and no schools have been loaded yet.

:::note Troubleshooting

If you receive a 403 `Authorization Denied` response with the message "No
database instances are authorized for this client," the credentials you are
using were not linked to a data store when they were created. Ensure you are
using the key and secret output by `configure-local-data-store.ps1`. If you
created a vendor or application manually through the Configuration Service, you
must also associate it with a data store before API requests will succeed. Refer
to the Configuration Service API reference for the relevant endpoints.

:::

## Optional: Context-Based Routing

To create separate data stores for multiple school years, use the
`-SchoolYearRange` flag:

```powershell
./configure-local-data-store.ps1 -SchoolYearRange "2024-2025"
```

This creates route-qualified data stores accessible at:

```text
http://localhost:8080/api/2024/data/ed-fi/schools
http://localhost:8080/api/2025/data/ed-fi/schools
```

See [Context-Based Routing for Year-Specific Data
Store](../platform-dev-guide/configuration/context-based-routing-for-year-specific-datastore.md)
for details on multi-year deployments.

## Optional: Add Smoke Test Credentials

To generate credentials pre-configured for use with the Smoke Test utility:

```powershell
./configure-local-data-store.ps1 -AddSmokeTestCredentials
```

See [Smoke Test Utility](../platform-dev-guide/utilities/smoke-test-utility.md)
for how to run smoke tests against a running instance.
