---
sidebar_position: 1
---

# What's New

This section provides an overview of what's new in the latest version of the
Ed-Fi API Publisher.

## Updates in API Publisher v1.4 (Latest Release)

### .NET 10

The API Publisher now runs on .NET 10, the current long-term support release of
.NET. Install the
[.NET 10 runtime](https://dotnet.microsoft.com/en-us/download/dotnet/10.0)
before upgrading a binary deployment. The Docker image is built on .NET 10.

### Ed-Fi API v8 Support

The API Publisher can now publish from and to Ed-Fi API v8, in any combination
with the Ed-Fi ODS/API: from an ODS/API to Ed-Fi API v8, from Ed-Fi API v8 to an
ODS/API, and between two Ed-Fi API v8 instances. Support is validated against
Ed-Fi API v8.0.

The publisher reads each API's Discovery document to find where it serves its
resources and its token endpoint, so a connection needs only the API's base URL,
key and secret. See:

- [Ed-Fi API v8](Considerations-for-API-Hosts.md#ed-fi-api-v8) for the claim
  sets and the API client setup.
- [Known Issues Details](Known-Issues-Details.md) for the prerequisites of an
  Ed-Fi API v8 target and the snapshot behavior of an Ed-Fi API v8.0 source.

### Cursor Paging

When the source is an Ed-Fi ODS/API 7.3 or later, the publisher reads each
resource with partitioned cursor paging instead of offset paging. Each resource
is split into partitions that are read in parallel, and reading a page does not
get slower the deeper it is in the resource, which shortens publishing for large
resources. Other sources, including Ed-Fi API v8.0, are read with offset paging
as before.

Cursor paging is on by default. A run that fails partway can be continued with
`--resumeLastRun=true` instead of starting again. Use
`--disableCursorPaging=true` to return to offset paging. See
[API Publisher Configuration](API-Publisher-Configuration.md#options) for the
related options.
