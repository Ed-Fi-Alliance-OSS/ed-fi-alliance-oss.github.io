---
description: Copy data from an Ed-Fi ODS/API to Ed-Fi API v8.
---

# Publish from an Ed-Fi ODS/API to Ed-Fi API v8

## When to Use It

Data that lives in an Ed-Fi ODS/API has to be copied to Ed-Fi API v8, for
example while moving to Ed-Fi API v8.

## What You Need

- An API client on the source Ed-Fi ODS/API with the
  `Ed-Fi API Publisher - Reader` claim set. See
  [Set Up the Source and Target API Clients](./1-set-up-api-clients.md).
- An Ed-Fi API v8 data store on the same Data Standard as the source.
- An administrator client for the Ed-Fi API v8 Configuration Service, from
  whoever manages it.
- For a data store on PostgreSQL, administrator access to its PostgreSQL
  server.

Tested with Ed-Fi ODS/API 7.3.2 and Ed-Fi API v8.0.0 (Data Standard 6.1, Docker,
PostgreSQL).

## Steps

1. Load the data store's seed data before the first publish: the descriptors
   and the school years. The API Publisher does not publish `schoolYearTypes`,
   because an Ed-Fi ODS/API database includes them, and without them most
   student records are rejected. With the Ed-Fi API v8 Docker bootstrap, use
   its `-LoadSeedData -SeedTemplate Minimal` options.

2. On a PostgreSQL data store, give the server enough connections. Ed-Fi API v8
   keeps a connection pool per data store, and the API Publisher's default
   concurrency can exhaust the PostgreSQL default of 100. Raise it, then restart
   PostgreSQL and Ed-Fi API v8:

   ```sql
   ALTER SYSTEM SET max_connections = 300;
   ```

3. Get a Configuration Service token. Run steps 3 to 7 in a single PowerShell 7
   session, because each step uses the variables set by the steps before it.
   `<Configuration Service URL>` is its base URL:

   ```powershell
   $configService = "<Configuration Service URL>"
   $token = (Invoke-RestMethod -Method Post -Uri "$configService/connect/token" -Body @{
       client_id     = "<admin client id>"
       client_secret = "<admin client secret>"
       grant_type    = "client_credentials"
       scope         = "edfi_admin_api/full_access"
   }).access_token
   $headers = @{ Authorization = "Bearer $token" }
   ```

4. Create a vendor for the API Publisher. The `Location` header of the response
   ends with the new vendor's id:

   ```powershell
   $vendor = @{
       company             = "Ed-Fi API Publisher"
       contactName         = "<contact name>"
       contactEmailAddress = "<contact email>"
       namespacePrefixes   = "uri://ed-fi.org"
   } | ConvertTo-Json
   Invoke-RestMethod -Method Post -Uri "$configService/v3/vendors" -Headers $headers `
       -ContentType "application/json" -Body $vendor -ResponseHeadersVariable response
   $vendorId = [int](($response.Location[0] -split "/")[-1])
   ```

5. Find the id of the data store:

   ```powershell
   Invoke-RestMethod -Uri "$configService/v3/dataStores" -Headers $headers
   $dataStoreId = <data store id>
   ```

6. Create the application with the `EdFiAPIPublisherWriter` claim set,
   associated with the data store and with the education organizations whose
   data is published:

   ```powershell
   $application = @{
       applicationName          = "Ed-Fi API Publisher"
       vendorId                 = $vendorId
       claimSetName             = "EdFiAPIPublisherWriter"
       educationOrganizationIds = @(<education organization ids>)
       dataStoreIds             = @($dataStoreId)
   }
   Invoke-RestMethod -Method Post -Uri "$configService/v3/applications" -Headers $headers `
       -ContentType "application/json" -Body ($application | ConvertTo-Json)
   ```

   The response contains the `key` and `secret` of the new API client.

7. Run the publish with the API Publisher's rate limiting turned on, so that it
   stays under the default Ed-Fi API v8.0 limit of 5000 requests per 10 seconds.
   Run it from the folder where the API Publisher is installed, and keep the
   single quotes around each secret:

   ```powershell
   .\EdFiApiPublisher.exe --sourceUrl=<source base URL> `
     --sourceKey=<key> --sourceSecret='<secret>' `
     --targetUrl=<Ed-Fi API v8 base URL> `
     --targetKey=<key> --targetSecret='<secret>' `
     --includeDescriptors=true --ignoreIsolation=true --exclude=surveys `
     --enableRateLimit=true --rateLimitNumberExecutions=200 --rateLimitTimeSeconds=1
   ```

   `--exclude=surveys` leaves out the survey resources. On Ed-Fi ODS/API 7.3, the
   `Ed-Fi API Publisher - Reader` claim set cannot read them: without the option
   the source answers `403` and the run exits with code `2`, although the rest
   of the data is published. Remove it once the source's Reader claim set can
   read the surveys.

   `--ignoreIsolation=true` reads the source's live data, because an Ed-Fi ODS/API
   7.x source has no snapshot configured by default. Remove it when the source has
   a snapshot configured; see
   [Sources Without a Configured Snapshot](../Known-Issues-Details.md#sources-without-a-configured-snapshot).

## Check the Result

The run exits with code `0`, and the run summary shows the same Published and
Attempted counts for every resource. A few `409` warnings for a record whose
parent was not yet in the target are normal when the retry then succeeds.

## Common Errors

| Error | Cause | Fix |
| --- | --- | --- |
| `400` "53300: sorry, too many clients already" | The data store ran out of PostgreSQL connections. | Raise `max_connections` (step 2). |
| `429 Too Many Requests` | The API Publisher went over the Ed-Fi API v8.0 rate limit. The API Publisher does not retry a write rejected with `429`. | Lower `--rateLimitNumberExecutions`. |
| `403` and `409` on records that depend on others, such as grades and course transcripts | The records they depend on were lost to one of the errors above. | Fix the error above, then publish again. |
| Most student records rejected | The data store's school years are missing. | Load the seed data (step 1). |

## Related Topics

- [Ed-Fi API v8](../Considerations-for-API-Hosts.md#ed-fi-api-v8) in Considerations for API Hosts
- [Rate Limit on an Ed-Fi API v8.0 Target](../Known-Issues-Details.md#rate-limit-on-an-ed-fi-api-v80-target)
- [API Client and Data Store Configuration](/reference/ed-fi-api/8/platform-dev-guide/configuration/api-client-and-data-store-configuration)
