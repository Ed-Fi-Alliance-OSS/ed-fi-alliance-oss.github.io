---
sidebar_position: 2
---

# Getting Started - Configure a Data Store

After the services are running, this step creates the initial data store and
client credentials via the Configuration Service. A _data store_ is a
database connection that the Data Management Service uses to persist and serve
Ed-Fi resource data.

## What This Step Creates

Running the configuration script provisions:

- A **vendor** and **application** in the Configuration Service
- A default **claim set** granting the application access to Ed-Fi resources
- A **data store** (PostgreSQL database) linked to the application
- A **client key and secret** for authenticating API requests

## Step 1 — Run the Configuration Script

From the `eng/docker-compose` directory:

```powershell
./configure-local-data-store.ps1
```

The script connects to the Configuration Service, creates the data store, and
outputs the client credentials. Record the key and secret from the output — you
will need them to request API tokens.

## Step 2 — Request an OAuth Token

Use the client credentials to obtain a bearer token from the Configuration
Service:

```powershell
curl -X POST http://localhost:8081/connect/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=<key>&client_secret=<secret>"
```

A successful response returns a JSON object containing `access_token`,
`expires_in`, and `token_type`.

## Step 3 — Make an API Request

Use the token to call the DMS API:

```powershell
curl http://localhost:8080/api/data/ed-fi/schools \
  -H "Authorization: Bearer <access_token>"
```

An empty array `[]` is a valid response. It means the data store is connected
and no schools have been loaded yet.

## Optional: School Year Routing

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

See [School Year Routing](../platform-dev-guide/multi-tenancy/school-year-routing.md)
for details on multi-year deployments.

## Optional: Add Smoke Test Credentials

To generate credentials pre-configured for use with the Smoke Test utility:

```powershell
./configure-local-data-store.ps1 -AddSmokeTestCredentials
```

See [Smoke Test Utility](../platform-dev-guide/utilities/smoke-test-utility.md)
for how to run smoke tests against a running instance.
