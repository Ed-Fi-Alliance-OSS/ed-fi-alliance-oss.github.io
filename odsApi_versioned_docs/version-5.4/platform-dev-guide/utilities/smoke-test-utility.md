# Smoke Test Utility

The ODS / API Smoke Test Utility is a console application that will run each
dynamically generated endpoint of the ODS / API. Its purpose is to verify an
installation and operation of an ODS / API, and is useful as part of a
continuous build or continuous deployment environment. Although it does not
perform complex scenario tests, the Smoke Test tool does methodically perform
operations in scenario-like orders.

The Smoke Test Utility source code can be found in the Ed-Fi-ODS repository in
the Utilities\\DataLoading\\EdFi.SmokeTest.Console directory. It is part of the
LoadTools solution (\\Utilities\\DataLoading). The LoadTools solution can be
compiled using Visual Studio. Because the Smoke Test Utility uses Swagger
metadata and an externally built SDK, it does not need to be recompiled when the
ODS changes.

The Smoke Test tool has three modes of operation:

* **Non-Destructive API Tests.** Use Swagger metadata to identify and invoke
    the non-destructive API methods of the ODS / API.
* **Non-Destructive SDK Tests.** Use a pre-built SDK library to invoke the
    non-destructive API methods of the ODS / API.
* **Destructive SDK Tests.** Use a pre-built SDK library to invoke all the API
    methods of the ODS / API.

:::warning

Destructive SDK Tests alter the target database and may not
completely clean up after themselves. These tests are best used against a QA
or test installation of the ODS, not production data.

:::

The two non-destructive tests are identical in functionality in that they both
test for general connectivity, retrieve a session token, and invoke variations
of GET scenarios on each API endpoint. However, they differ in that the
Non-Destructive SDK tests use a customer-supplied SDK to access the API while
the Non-Destructive API tests use a native HTTP Client to invoke dynamically the
API endpoints advertised via the Swagger endpoint.

The Destructive SDK tests extend upon the functionality of the non-destructive
tests by testing POST, PUT, and DELETE endpoints. Extensions as well as core
entities and attributes are tested.

Profiles and composites are not tested by the Smoke Test Utility at this time.

| Test | Non-Destructive API | Non-Destructive SDK | Destructive SDK |
| --- | --- | --- | --- |
| HTTP Library | HTTP Client | Rest Sharp | Rest Sharp |
| Get Static Page | Yes | Yes | Yes |
| Get Swagger Metadata | Yes | No | No |
| Get Session Token | Yes | Yes | Yes |
| Get All | Yes | Yes | Yes |
| Get All (skip and limit) | Yes | Yes | No |
| Get by Id | Yes | Yes | No |
| Get by Key | Yes | Yes | No |
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

## Test Execution Order

For destructive tests, the Smoke Test Tool generates an execution order using
the dependencies exposed in the SDK library. This order, while correct and
comprehensive, may be somewhat non-deterministic when moving between SDK libraries.
Where the results of smoke tests are to be compared, it is recommended that the
results be sorted.

## Logging

The Smoke Test Tool uses log4net to capture all relevant test information. Out
of the box, the tool logs to the console and to a rolling log file that is
created in the same directory as the console application. These settings may be
changed as necessary by altering the application .config file. Consult the
[log4net
documentation](https://logging.apache.org/log4net/release/manual/configuration.html)
for detailed configuration settings and documentation.

## Command-Line Parameters

Built-in help documentation is available for the Smoke Test tool by running the
tool with `--help` parameter.

| Parameter | Description | Non-Destructive API | Non-Destructive SDK | Destructive SDK |
| --- | --- | --- | --- | --- |
| `b, baseurl` | The base url used to derive api, metadata, oauth, and dependency urls (e.g., `http://server`). If provided, `apiurl, metadataurl and oauthurl` parameters can be skipped. | Required | Required | Required |
| `k, key` | The web API OAuth key | Required | Required | Required |
| `l, library` | The complete path to a compiled Ed-Fi SDK library | N/A | Required | Required |
| `n, namespace` | Override the URI to use when generating namespace values (e.g., `uri://edfi.org`) | Optional | Optional | Optional |
| `s, secret` | The web API OAuth secret | Required | Required | Required |
| `t, testset` | The test set to run | NonDestructiveApi | NonDestructiveSdk | DestructiveSdk |
| `help` | Show command line help | Optional | Optional | Optional |

## Build and Run the Smoke Test Utility

This section provides an overview on how to use the Smoke Test Utility.

* Start Visual Studio, open \\Ed-Fi-ODS\\Utilities\\DataLoading\\LoadTools.sln
    and build.
* Open a Console window and navigate to
    \\Ed-Fi-ODS\\Utilities\\DataLoading\\EdFi.SmokeTest.Console\\bin\\Debug\\net8.0
* Execute the tool to run the smoke tests.

The following examples show common testing scenarios. The examples below assume
that you have followed the Ed-Fi ODS / API [Getting
Started](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774233/Getting+Started+-+Source+Code+Installation) steps
successfully.

### API tests

```powershell
EdFi.SmokeTest.Console.exe -k {yourSandboxKey} -s {yourSandboxSecret} -b "http://localhost:54746" -t NonDestructiveApi
```

### Non-destructive SDK tests

```powershell
EdFi.SmokeTest.Console.exe -k {yourSandboxKey} -s {yourSandboxSecret} -b "http://localhost:54746" -t NonDestructiveSdk -l "..\\..\\..\\..\\EdFi.LoadTools.Test\\bin\\Debug\\net8.0\\EdFi.OdsApi.Sdk.dll"
```

### Destructive SDK tests

```powershell
EdFi.SmokeTest.Console.exe -k {yourSandboxKey} -s {yourSandboxSecret} -b "http://localhost:54746" -t DestructiveSdk -l "..\\..\\..\\..\\EdFi.LoadTools.Test\\bin\\Debug\\net8.0\\EdFi.OdsApi.Sdk.dll"
```

## A Word About Security

Because the Smoke Test Utility operates under the security constraints of the
provided key/secret, some operations may be invalid depending upon the security
configuration and the state of other entities in the database. These
characteristics are not available for the utility to examine and determine.
Intermittent warnings and errors may possibly be logged due to the
inaccessibility of resources for security reasons.

Security may be disabled for all keys/secrets by running the following query
against the `EdFi_Security` database:

```sql
update [EdFi_Security].[dbo].[ResourceClaimActionAuthorizationStrategies] set AuthorizationStrategyId = 1
```

This statement replaces the authorization strategy for all resource types to be
"no further authorization required".

Deleting the `EdFi_Security` database will cause it to be rebuilt with the
default claims the next time the websites are run.
