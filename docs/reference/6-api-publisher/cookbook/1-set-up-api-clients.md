---
description: Create the API clients that the API Publisher uses to read from the source API and write to the target API.
---

# Set Up the Source and Target API Clients

## When to Use It

Before the first publish between two Ed-Fi ODS/API deployments, for example a
district and the state. The API Publisher needs one API client on each side: a
client that reads from the source and a client that writes to the target.

## What You Need

- Ed-Fi ODS/API 7.3 on both sides.
- Permission to create API clients on each side, or someone who can create
  them for you, for example with Admin API or Admin App.
- The education organizations whose data is published, for example the
  district's `localEducationAgencyId`.

Tested with Ed-Fi ODS/API 7.3.2 (Data Standard 6.1, Docker, PostgreSQL), with
the API clients created through Admin API 2.3.

## Steps

1. On the source API, create an API client with the
   `Ed-Fi API Publisher - Reader` claim set. It reads the resources and their
   changes.

2. On the target API, create an API client with the
   `Ed-Fi API Publisher - Writer` claim set. It creates, updates and deletes
   the resources in the target.

3. Associate both API clients with the education organizations whose data is
   published, and give their vendors the namespace prefixes of the data, such
   as `uri://ed-fi.org`. The claim sets authorize some resources, such as
   assessments and gradebook entries, by namespace; without the prefix, the
   source answers `403` for them and the run exits with code `2`.

4. Give the key, secret and base URL of each API client to whoever runs the API
   Publisher. The base URL is the address that serves the API's Discovery
   document, such as `https://<server>/api/`.

## Check the Result

Run the first publish with descriptors included, from the folder where the API
Publisher is installed. Keep the single quotes around each secret, so that
PowerShell does not change characters such as `$`:

```powershell
.\EdFiApiPublisher.exe --sourceUrl=<source base URL> `
  --sourceKey=<key> --sourceSecret='<secret>' `
  --targetUrl=<target base URL> `
  --targetKey=<key> --targetSecret='<secret>' `
  --includeDescriptors=true --ignoreIsolation=true
```

`--ignoreIsolation=true` reads the source's live data, because an Ed-Fi ODS/API
7.x source has no snapshot configured by default. Remove it when the source has
a snapshot configured; see
[Sources Without a Configured Snapshot](../Known-Issues-Details.md#sources-without-a-configured-snapshot).
The run should exit with code `0`, and the run summary at the end of the log
should show the same Published and Attempted counts for every resource. A few
warnings with `500` or `504` that succeed when the request is retried are not
failures.
On Ed-Fi ODS/API 7.3.2, the `Ed-Fi API Publisher - Reader` claim set does not
include the survey resources, so the source answers `403` for them. The run
exits with code `0` only when they are left out with `--exclude=surveys`;
otherwise it exits with code `2`, although the rest of the data is published.

## Common Errors

| Error | Cause | Fix |
| --- | --- | --- |
| `403` "No relationships have been established" on the target | An education organization is missing from the target API client, or the records it depends on were not published. | Add the education organization to the target API client, then publish again. |
| `409` "The referenced ... item does not exist" | The source did not return the referenced record, usually because an education organization is missing from the source API client. | The failed document in the log shows the reference, with its `educationOrganizationId`. Add that education organization to the source and target API clients, then publish again. |
| `400` on a descriptor value | Descriptors were not published. | Add `--includeDescriptors=true`. |
| Exit code `3` | The API Publisher could not get a token. | Check the key, secret and base URL of the connection named in the log. |

## Related Topics

- [Considerations for API Hosts](../Considerations-for-API-Hosts.md)
- [First-Time Configuration for Admin API](/reference/admin-api/getting-started/admin-api-2.3-newer/first-time-configuration)
