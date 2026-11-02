---
sidebar_position: 1
---

# Smoke Test Utility

The Smoke Test Utility is a console application that will run each dynamically
generated endpoint of the Ed-Fi API. Its purpose is to verify an installation
and operation of an Ed-Fi API, and is useful as part of a continuous build or
continuous deployment environment. Although it does not perform complex scenario
tests, the Smoke Test tool does methodically perform operations in scenario-like
orders.

The Smoke Test Utility is published as the `EdFi.Suite3.SmokeTest.Console`
NuGet package (see [Install the Smoke Test
Utility](#install-the-smoke-test-utility)). Its source code is in the Ed-Fi-ODS
repository, in the `Utilities/DataLoading/EdFi.SmokeTest.Console` directory.
Because the Smoke Test Utility uses Swagger metadata and an externally built
SDK, it does not need to be recompiled when the API changes.

The Smoke Test tool has three modes of operation:

- **Non-Destructive API Tests.** Use Swagger metadata to identify and invoke the
  non-destructive API methods of the Ed-Fi API.
- **Non-Destructive SDK Tests.** Use a pre-built SDK library to invoke the
  non-destructive API methods of the Ed-Fi API.
- **Destructive SDK Tests.** Use a pre-built SDK library to invoke all the API
  methods of the Ed-Fi API.

:::caution

Destructive SDK Tests alter the target database and may not completely clean up
after themselves. These tests are best used against a QA or test installation,
not production data.

:::

The two non-destructive tests are identical in functionality in that they both
test for general connectivity, retrieve a session token, and invoke variations
of GET scenarios on each API endpoint. However, they differ in that the
Non-Destructive SDK tests use a pre-built SDK to access the API while the
Non-Destructive API tests use a native HTTP Client to invoke dynamically the API
endpoints advertised via the Swagger endpoint.

The Destructive SDK tests extend upon the functionality of the non-destructive
tests by testing POST, PUT, and DELETE endpoints. Extensions as well as core
entities and attributes are tested.

Composites are not tested by the Smoke Test Utility at this time.

| Test | Non-Destructive API | Non-Destructive SDK | Destructive SDK |
| --- | --- | --- | --- |
| HTTP Library | HTTP Client | Rest Sharp | Rest Sharp |
| Get Static Page | Yes | Yes | Yes |
| Get Swagger Metadata | Yes | No | No |
| Get Session Token | Yes | Yes | Yes |
| Get All | Yes | Yes | Yes |
| Get All (skip and limit) | Yes | Yes | No |
| Get by Id | Yes | Yes | No |
| Get by Example | Yes | Yes | No |
| Post | No | No | Yes |
| Put | No | No | Yes |
| Delete | No | No | Yes |

A failure condition for earlier tests will prevent subsequent tests from being
run. For example, if Get All fails or returns no results, then Get by Id cannot
run because there are no resources retrieved that may be used to retrieve a
valid ID. Likewise, if Post fails, then there is no entity for Put to update or
Delete to remove. This situation will log a "skipped" comment for the remaining
operations in an API.

## Logging

The Smoke Test Tool uses log4net to capture all relevant test information. Out
of the box, the tool logs to the console and to a rolling log file that is
created in the same directory as the console application. These settings may be
changed as necessary by editing the `log4net.config` file next to the
application. Consult the
[log4net
documentation](https://logging.apache.org/log4net/release/manual/configuration.html)
for detailed configuration settings and documentation.

## Command-Line Parameters

Built-in help documentation is available for the Smoke Test tool by running the
tool with `--help` parameter.

With `-b`, the tool reads the discovery document served at the base URL to find
the other URLs it needs. For a local deployment the base URL is
`http://localhost:8080/api` (no `v3/` segment). If the advertised token URL
isn't reachable from the machine running the tool, for example a
Docker-internal host name, pass `-o http://localhost:8080/api/oauth/token`.
The examples below pass `-o` so they work whatever the discovery document
advertises.

| Parameter | Description | Non-Destructive API | Non-Destructive SDK | Destructive SDK |
| --- | --- | --- | --- | --- |
| `b, baseurl` | The Ed-Fi API base URL (e.g., `http://localhost:8080/api`). The tool derives the metadata, data, and OAuth token URLs from its discovery document. | Required | Required | Required |
| `k, key` | The web API OAuth key | Required | Required | Required |
| `s, secret` | The web API OAuth secret | Required | Required | Required |
| `t, testset` | The test set to run | NonDestructiveApi | NonDestructiveSdk | DestructiveSdk |
| `o, oauthurl` | The OAuth token URL (e.g., `http://localhost:8080/api/oauth/token`). Overrides the URL from the discovery document. | Optional | Optional | Optional |
| `l, library` | The complete path to a compiled Ed-Fi SDK library | N/A | Required | Required |
| `c, sdknamespaceprefix` | The root namespace of the SDK library passed with `-l`. Defaults to `EdFi.OdsApi.Sdk`, which matches the published test SDK. | N/A | Optional | Optional |
| `n, namespace` | Override the URI to use when generating namespace values (e.g., `uri://ed-fi.org`) | Optional | Optional | Optional |
| `help` | Show command line help | Optional | Optional | Optional |

## Install the Smoke Test Utility

The Smoke Test Utility is published as the `EdFi.Suite3.SmokeTest.Console`
package on the Ed-Fi release feed
(`https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi%40Release/nuget/v3/index.json`).
The package contains a .NET 10 console application, so you need the .NET 10
runtime.

To download and extract the package with PowerShell:

```powershell
$feed = "https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi%40Release/nuget/v3/index.json"
$packageBase = ((Invoke-RestMethod $feed).resources |
  Where-Object { $_.'@type' -like 'PackageBaseAddress*' }).'@id'
$id = "edfi.suite3.smoketest.console"
$version = "7.3.20185"
Invoke-RestMethod "$packageBase$id/$version/$id.$version.nupkg" -OutFile "$id.zip"
Expand-Archive "$id.zip" -DestinationPath $id -Force
$smokeTest = Resolve-Path "$id/tools/net*/any/EdFi.SmokeTest.Console.dll"
```

Run the tool with `dotnet $smokeTest`, followed by the parameters.

## Run the Smoke Test Utility

### Prerequisites

The Smoke Test Utility requests a new OAuth token for each resource it tests.
With the Configuration Service's self-contained identity provider, a smoke test
run exceeds two default limits:

- The number of active tokens per client (`15` by default). Set
  `CONFIGURATION_SERVICE_IDENTITY_BEARER_TOKEN_PER_CLIENT_LIMIT=-1` to remove
  the limit.
- The rate limits on the `/connect` endpoints (`120` requests per source and
  `30` per client in 60 seconds). Raise
  `CONFIGURATION_SERVICE_CONNECT_RATE_LIMIT_SOURCE_PERMIT_LIMIT` and
  `CONFIGURATION_SERVICE_CONNECT_RATE_LIMIT_CLIENT_PERMIT_LIMIT`, or set
  `CONFIGURATION_SERVICE_CONNECT_RATE_LIMIT_ENABLED=false`.

Set these in the Docker Compose `.env` file (or the equivalent
`IdentitySettings:BearerTokenPerClientLimit` and `ConnectRateLimit:*` settings)
before you start or recreate the services, and restore the original values
after the smoke test run. Don't relax these limits on a production
Configuration Service; run smoke tests against a test deployment. See
[Identity Provider](../configuration/identity-provider.md) for these settings.

You also need an API client key and secret. For a local environment, the
`Get-SmokeTestCredential` helper or the `-AddSmokeTestCredentials` bootstrap
option creates them; see [Configure a Data
Store](../../getting-started/configure-data-store.md).

The following examples show common testing scenarios. The examples below assume
that you have followed the Ed-Fi API [Getting
Started](../../getting-started/docker-deployment.md) steps successfully, and
that `$smokeTest` holds the path to `EdFi.SmokeTest.Console.dll` from the
installation step. The SDK examples also assume `$sdk` holds the SDK library
described next.

The SDK tests also need a compiled SDK library. Use
`EdFi.OdsApi.Sdk.dll` from the `EdFi.Suite3.OdsApi.TestSdk.Standard.5.2.0`
package (version `7.3.20160`); an `EdFi.Suite3.OdsApi.TestSdk.Standard.6.1.0`
package is also published for Data Standard 6.1. Both are on the Ed-Fi
pre-release feed
(`https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json`).
To download one, run the installation script with these changes:

- Set `$feed` to the pre-release feed URL above.
- Set `$id = "edfi.suite3.odsapi.testsdk.standard.5.2.0"` and
  `$version = "7.3.20160"`. For a Data Standard 6.1 deployment, use
  `$id = "edfi.suite3.odsapi.testsdk.standard.6.1.0"` instead.
- Replace the last line with
  `$sdk = Get-ChildItem $id -Recurse -Filter EdFi.OdsApi.Sdk.dll | Select-Object -First 1`;
  the DLL isn't under `tools/`.

### API tests

```powershell
dotnet $smokeTest -k {yourKey} -s {yourSecret} `
  -b "http://localhost:8080/api" -o "http://localhost:8080/api/oauth/token" `
  -t NonDestructiveApi
```

### Non-destructive SDK tests

```powershell
dotnet $smokeTest -k {yourKey} -s {yourSecret} `
  -b "http://localhost:8080/api" -o "http://localhost:8080/api/oauth/token" `
  -t NonDestructiveSdk -l $sdk.FullName
```

### Destructive SDK tests

```powershell
dotnet $smokeTest -k {yourKey} -s {yourSecret} `
  -b "http://localhost:8080/api" -o "http://localhost:8080/api/oauth/token" `
  -t DestructiveSdk -l $sdk.FullName
```

:::caution

To perform Destructive SDK tests, you will need the additional security setup
described in the following section. It is also recommended that the underlying
database is empty; if you use a database with existing resources, their IDs
might collide with the IDs of the resources that the tests attempt to create.
The collisions might also happen if a previous Destructive SDK test execution
was interrupted, leaving resources in the database.

:::

## Authorizing Destructive SDK tests

Destructive SDK tests will create and delete Education Organizations and also
assign resources to them. The _EducationOrganizationIdOverrides_ section in
EdFi.SmokeTest.Console's
[appsettings.json](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/blob/main/Utilities/DataLoading/EdFi.SmokeTest.Console/appsettings.json)
configures SDK tests to use specific Education Organization Ids. For tests to
run successfully, the key/secret used by the Destructive SDK tests must have
access to the configured Education Organizations.

:::info

In Ed-Fi API v8, authorization configuration is managed through the
Configuration Service rather than direct database SQL. Use the Configuration
Service API to associate the API client with the required Education Organization
Ids (`100000`, `200000`, and `300000` by default). The `Get-SmokeTestCredential`
helper includes these Ids by default.

:::

<details>
<summary>Why additional authorization is needed</summary>

Let's consider the _CommunityProvider_ EdOrg as an example and assume that the
client has not been granted access to it. The Destructive SDK tests would create
a new _CommunityProvider_, and since its authorization strategy is
_NoFurtherAuth,_ it will succeed. Then, the tests will create a new
_CommunityProviderLicense_ referencing the previous _CommunityProvider._ This
step will fail since the authorization strategy for the
_CommunityProviderLicense_ is _RelationshipsWithEdOrgsAndPeople,_ and the client
would not be associated with the newly created _CommunityProvider._

To fix this, the Destructive Smoke tests create the _CommunityProvider_ with the
_Id_ previously configured in EdFi.SmokeTest.Console's
[appsettings.json](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/blob/main/Utilities/DataLoading/EdFi.SmokeTest.Console/appsettings.json)
(by default, `200000`) and assume that you have already associated the client
with the _Id_.

</details>

## A Word About Security

Because the Smoke Test Utility operates under the security constraints of the
provided key/secret, some operations may be invalid depending upon the security
configuration and the state of other entities in the database. These
characteristics are not available for the utility to examine and determine.
Intermittent warnings and errors may possibly be logged due to the
inaccessibility of resources for security reasons.

:::info

In Ed-Fi API v8, security configuration is stored in the Configuration Service
database (the `dmscs` schema). Authorization strategies can be updated through
the Configuration Service API rather than direct SQL against `EdFi_Security`.

:::
