---
sidebar_position: 2
---

# Getting Started - Configure a Data Store

The bootstrap startup script (`bootstrap-local-dms.ps1`) creates a default data
store and provisions the database schema automatically. This page covers the
remaining step: creating API client credentials so you can authenticate and make
requests.

## What the Bootstrap Created

Running `bootstrap-local-dms.ps1` provisioned:

- A **data store** (PostgreSQL or SQL Server database) registered in the
  Configuration Service
- The **Ed-Fi database schema** provisioned via the `api-schema-tools` CLI

API client credentials are not created by the bootstrap. You create them
separately so you control which vendor, claim set, and education organizations
are associated with the client.

## Step 1: Create API Credentials

For local development, use the `Get-SmokeTestCredential` helper from the
repository's smoke test module. It creates a vendor and application in the
Configuration Service and returns a key and secret.

From the `eng/docker-compose` directory:

```powershell
Import-Module ../smoke_test/modules/SmokeTest.psm1 -Force
$cred = Get-SmokeTestCredential -ConfigServiceUrl "http://localhost:8081"
Write-Host "Key:    $($cred.Key)"
Write-Host "Secret: $($cred.Secret)"
```

Record the key and secret. You will need them to request API tokens.

:::info

`Get-SmokeTestCredential` creates a vendor named "Smoke Test Vendor" with an
application using the `EdFiSandbox` claim set, pre-associated with a data
store created by the bootstrap. It is intended for local development and
testing, not production deployments.

:::

:::note Run it once per environment

`Get-SmokeTestCredential` **creates** a new vendor and application on each call —
it does not retrieve existing credentials, and the generated secret cannot be
recovered afterward. Because the vendor company name ("Smoke Test Vendor") must
be unique, running it a second time against the same environment fails with an
HTTP 400. To obtain a fresh credential, either reset the local stack
(`./bootstrap-local-dms.ps1 -d -v`, then re-run it without flags) or pass a different
`-VendorName`.

:::

:::note Multiple data stores

If you created year-specific data stores (for example, with `-SchoolYearRange`),
the default `Get-SmokeTestCredential` call above associates the client with only
the **first** data store, so requests to the other school-year routes return a
403. List the data store IDs and pass them all so the client is authorized for
every route:

```powershell
# List data store IDs (requires an admin token from the Configuration Service)
Invoke-RestMethod -Uri "http://localhost:8081/v3/dataStores" `
  -Headers @{ Authorization = "Bearer <admin_token>" }

$cred = Get-SmokeTestCredential -ConfigServiceUrl "http://localhost:8081" -DataStoreIds @(1, 2, 3)
```

:::

## Step 2: Request an OAuth Token

Use the client credentials to obtain a bearer token from the Configuration
Service:

```powershell
$token = Invoke-RestMethod -Method Post -Uri "http://localhost:8081/connect/token" `
  -ContentType "application/x-www-form-urlencoded" `
  -Body @{
    "grant_type"    = "client_credentials"
    "client_id"     = "<key>"
    "client_secret" = "<secret>"
  }
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
Invoke-RestMethod -Uri "http://localhost:8080/api/data/ed-fi/schools" `
  -Headers @{ Authorization = "Bearer $($token.access_token)" }
```

An empty array `[]` is a valid response. It means the data store is connected
and no schools have been loaded yet.

:::note Troubleshooting

If you receive a 403 `Authorization Denied` response with the message "No
database instances are authorized for this client," the credentials you are
using were not linked to a data store when they were created. Ensure you are
using the key and secret from `Get-SmokeTestCredential`, which associates the
application with the data store created by the bootstrap. If you created a
vendor or application manually through the Configuration Service, you must also
associate it with a data store before API requests will succeed. If you have
multiple data stores (for example, from `-SchoolYearRange`), see [Multiple data
stores](#step-1-create-api-credentials) above — the credential must be
associated with every data store you intend to reach.

If you receive a 503 response with a message about database provisioning, run
`bootstrap-local-dms.ps1` again from a clean state (`./bootstrap-local-dms.ps1 -d -v`) — the data store exists but the schema was not provisioned.

:::
