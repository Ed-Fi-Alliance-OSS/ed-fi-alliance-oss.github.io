# Ed-Fi API Publisher

## Introduction

The Ed-Fi API Publisher is a utility that can be used to move data and changes
from one Ed-Fi API instance to another instance of the `same` version of Ed-Fi.
The source and the target can each be an Ed-Fi ODS/API or Ed-Fi API v8. It
operates as a standard API client against both API endpoints (source
and target) and thus it does not require any special network configuration,
direct ODS database access or a particular database engine. From a data
security/privacy perspective, it is also subject to all authorization performed
by the Ed-Fi ODS API endpoints with which it communicates.

Operationally, it can be used in a "Pull" model where it is deployed alongside a
target (central) API and gathers data from multiple source APIs.

![Pull Architecture](img/pull-central.png)

Alternatively, it could also be used in a "Push" model where the utility is
deployed alongside the source APIs and pushes data to the central target.

![Push Architecture](img/push-central.png)

However, it can also be used in a "Publishing" model where it is installed
alongside a source API and pushes data to multiple targets (e.g. to both a State
Education Agency and a collaborative).

![Publish Architecture](img/publish.png)

If a source API supports the "Change Queries" feature, the Ed-Fi API Publisher
will perform a full publishing of the source data on the first run, and then
will only publish changed data to the target on subsequent runs. The change
versions that have been published to a particular target are maintained in a
configuration store automatically for each source/target combination.

## What's New

Version 1.4 runs on .NET 10, adds support for Ed-Fi API v8, and reads Ed-Fi
ODS/API 7.3 and later sources with cursor paging. See
[What's New](whats-new.md) for details.

## Quick Start

To demonstrate how the API Publisher works, this exercise copies all the data
from [the sample hosted Ed-Fi ODS API](https://api.ed-fi.org) to a local sandbox
Ed-Fi ODS API using the API client for the "minimal" template. (The database
scripts are written for SQL Server.)

### Configure Local Sandbox Environment

Before using the API Publisher on a target ODS, you must create and configure an
API client with the appropriate permissions for publishing. The source and
destination ODS/API must be of the same version.

For Ed-Fi ODS / API 5.1 through 5.3 only: create and assign a claim set for the
API Publisher by running the following database scripts:

* [Create-API-Publisher-Writer-Security-Metadata.sql](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-API-Publisher/blob/main/eng/Create-API-Publisher-Writer-Security-Metadata.sql)
* [Configure-Minimal-Sandbox-Client-as-API-Publisher-Writer.sql](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-API-Publisher/blob/main/eng/Configure-Minimal-Sandbox-Client-as-API-Publisher-Writer.sql)

### Use the API Publisher

The API Publisher has three options to use the product. The API Publisher
requires [.NET 10.0](https://dotnet.microsoft.com/en-us/download/dotnet/10.0)
to run:

#### Option 1 - From binaries

1. Download the latest published API Publisher package here:
   [Ed-Fi API Publisher v1.4.0](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi/NuGet/EdFi.ApiPublisher/overview/1.4.0).
   Visit the page and click download.
2. This will download a NuGet package to your computer. Rename this file,
   `EdFi.ApiPublisher.1.4.0.nupkg`, to include .zip extension:
   `EdFi.ApiPublisher.1.4.0.zip`.
3. The binary mentioned below is in the `EdFi.ApiPublisher.Win64` folder, as
   `EdFiApiPublisher.exe`.

#### Option 2 - From Docker img

The Docker image for the Ed-Fi API Publisher is available here:
[Ed-Fi API Publisher tag v1.4.0 on Docker Hub](https://hub.docker.com/r/edfialliance/ods-api-publisher/tags).
Use this to include in your Docker environment and alongside other components of
the Ed-Fi stack.

#### Option 3 - Build the API Publisher from source code

If you would like to build the API Publisher from source, build the solution by
running the following command from the repository's `src` directory:

```powershell
 dotnet build
```

The API Publisher executable (`EdFiApiPublisher.exe`) will be located in the
`.\EdFi.Tools.ApiPublisher.Cli\bin\Debug\net10.0` subfolder.

### Publish Data to Local Sandbox

:::info note:

After changing security metadata for the API, YOU MUST RESTART the local sandbox
Ed-Fi ODS API if it is already running.

:::

Next, locate the key/secret for the API client for the minimal template sandbox.
If using the Sandbox Admin tool, instead direct the end-user to find the default
key and secret in the appsettings file.

The following table shows the command-line arguments that will be used for
publishing.

:::info note:

Due to the nature of the Quick Start configuration (assuming SQL Server and the
Ed-Fi-ODS API are running on a local development machine), we'll limit the
parallelism for POST requests to `5`. Architectures with dedicated API and
database resources should be able to accommodate much higher numbers.

:::

| Parameter                                        |     | Value                             |
| ------------------------------------------------ | --- | --------------------------------- |
| `--sourceUrl`                                    | `=` | `https://api.ed-fi.org/v5.2/api/` |
| `--sourceKey`                                    | `=` | `RvcohKz9zHI4`                    |
| `--sourceSecret`                                 | `=` | `E1iEFusaNf81xzCxwHfbolkC`        |
| `--targetUrl`                                    | `=` | `http://localhost:54746/`         |
| `--targetKey`                                    | `=` | (Minimal Sandbox API _key_)       |
| `--targetSecret`                                 | `=` | (Minimal Sandbox API _secret_)    |
| `--ignoreIsolation`                              | `=` | `true`                            |
| `--maxDegreeOfParallelismForPostResourceItem`    | `=` | `5`                               |
| `--maxDegreeOfParallelismForStreamResourcePages` | `=` | `3`                               |
| `--includeDescriptors`                           | `=` | `true`                            |
| `--exclude`                                      | `=` | `surveys`                         |

Run the Ed-Fi API Publisher from the folder containing all the binaries by
executing the following command, substituting your own API client's key and
secrets. (Below development keys as shown in other Ed-Fi examples):

```powershell
.\EdFiApiPublisher.exe --sourceUrl=https://api.ed-fi.org/v5.2/api/ `
  --sourceKey=RvcohKz9zHI4 `
  --sourceSecret=E1iEFusaNf81xzCxwHfbolkC `
  --targetUrl=http://localhost:54746/ `
  --targetKey=minimal_sandbox_API_key `
  --targetSecret=minimal_sandbox_API_secret `
  --ignoreIsolation=true `
  --maxDegreeOfParallelismForPostResourceItem=5 `
  --maxDegreeOfParallelismForStreamResourcePages=3 `
  --includeDescriptors=true `
  --exclude=surveys
```

:::info note for Ed-Fi ODS API v5.2 only:

The `--exclude` flag is used to prevent trying to move any survey data due to an
issue with the security metadata (described in
[ODS-4974](https://tracker.ed-fi.org/browse/ODS-4974)) in the Ed-Fi ODS API v5.2
release. If you remove this argument, the publishing operation will fail due to
unsatisfied dependencies in the data. This has been fixed in future versions of
the ODS/API platform.

:::

For more documentation on API Publisher's parameters, please see the
[API Publisher Configuration](API-Publisher-Configuration.md) markdown file for
other runtime options.

For more information in relation to key changes and deletes, please see
[Considerations in relation to key changes and
deletes](API-Publisher-Configuration.md#considerations-in-relation-to-key-changes-and-deletes)

## Known Issues

Usage notes and known issues for version 1.4 are described in
[Known Issues Details](Known-Issues-Details.md).

## Next Steps

When you're ready to look further, review these other topics:

* [API Connection Management](API-Connection-Management.md)
* [API Publisher Configuration](API-Publisher-Configuration.md)
* [Considerations for API Hosts](Considerations-for-API-Hosts.md)
* [Considerations for Docker Configuration and Execution](Running-in-docker-desktop.md)
* [How to use the TextFormatter class](Use-TextFormatter-Serilog.md).

## Support

For support with the API Publisher, please use
[Ed-Fi Support](https://support.ed-fi.org/) to open a support case and/or
feature request.
