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

* **Non-Destructive API Tests.** Use Swagger metadata to identify and invoke
    the non-destructive API methods of the ODS / API.
* **Non-Destructive SDK Tests.** Use a pre-built SDK library to invoke the
    non-destructive API methods of the ODS / API.
* **Destructive SDK Tests.** Use a pre-built SDK library to invoke all the API
    methods of the ODS / API.

:::caution

Destructive SDK Tests alter the target database and may not
completely clean up after themselves. These tests are best used against a QA
or test installation of the ODS, not production data.

:::

The two non-destructive tests are identical in functionality in that they both
test for general connectivity, retrieve a session token, and invoke variations
of GET scenarios on each API endpoint. However, they differ in that the
Non-Destructive SDK tests use a customer-supplied SDK to access the API while
the Non-Destructive API tests use a native HTTP Client to invoke dynamically the
API endpoints advertised via the Swagger endpoint.

The Destructive SDK tests extend upon the functionality of the non-destructive
tests by testing POST, PUT, and DELETE endpoints. Extensions as well as core
entities and attributes are tested.

Profiles and composites are not tested by the Smoke Test Utility at this time.

| Test | Non-Destructive API | Non-Destructive SDK | Destructive SDK |
| --- | --- | --- | --- |
| HTTP Library | HTTP Client | Rest Sharp | Rest Sharp |
| Get Static Page | Yes | Yes | Yes |
| Get Swagger Metadata | Yes | No  | No  |
| Get Session Token | Yes | Yes | Yes |
| Get All | Yes | Yes | Yes |
| Get All (skip and limit) | Yes | Yes | No  |
| Get by Id | Yes | Yes | No  |
| Get by Key | Yes | Yes | No  |
| Get by Example | Yes | Yes | No  |
| Post | No  | No  | Yes |
| Put | No  | No  | Yes |
| Delete | No  | No  | Yes |

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
changed as necessary by altering the application .config file. Consult the
[log4net
documentation](https://logging.apache.org/log4net/release/manual/configuration.html)
for detailed configuration settings and documentation.

## Command-Line Parameters

Built-in help documentation is available for the Smoke Test tool by running the
tool with `--help` parameter.

| Parameter | Description | Non-Destructive API | Non-Destructive SDK | Destructive SDK |
| --- | --- | --- | --- | --- |
| `b, baseurl` | The base url used to derive api, metadata, oauth, and dependency urls (e.g., [http://server](http://server)). If provided, `apiurl, metadataurl and oauthurl` parameters can be skipped. | Required | Required | Required |
| `k, key` | The web API OAuth key | Required | Required | Required |
| `l, library` | The complete path to a compiled Ed-Fi SDK library | N/A | Required | Required |
| `n, namespace` | Override the URI to use when generating namespace values (e.g., `uri://edfi.org`) | Optional | Optional | Optional |
| `s, secret` | The web API OAuth secret | Required | Required | Required |
| `t, testset` | The test set to run | NonDestructiveApi | NonDestructiveSdk | DestructiveSdk |
| `help` | Show command line help | Optional | Optional | Optional |

## Build and Run the Smoke Test Utility

This section provides an overview on how to use the Smoke Test Utility.

* Start Visual Studio, open \\Ed-Fi-ODS\\Utilities\\DataLoading\\LoadTools.sln
    and build.
* Open a Console window and navigate to
    \\Ed-Fi-ODS\\Utilities\\DataLoading\\EdFi.SmokeTest.Console\\bin\\Debug\\net6.0
* Execute the tool to run the smoke tests.

The following examples show common testing scenarios. The examples below assume
that you have followed the Ed-Fi ODS / API [Getting
Started](../../getting-started/source-code-installation/readme.md) steps
successfully.

### API tests

```shell
EdFi.SmokeTest.Console.exe -k {yourSandboxKey} -s {yourSandboxSecret} -b "http://localhost:54746" -t NonDestructiveApi

```

### Non-destructive SDK tests

```shell
EdFi.SmokeTest.Console.exe -k {yourSandboxKey} -s {yourSandboxSecret} -b "http://localhost:54746" -t NonDestructiveSdk -l "..\\..\\..\\..\\EdFi.LoadTools.Test\\bin\\Debug\\net6.0\\EdFi.OdsApi.Sdk.dll"
```

### Destructive SDK tests

```shell
EdFi.SmokeTest.Console.exe -k {yourSandboxKey} -s {yourSandboxSecret} -b "http://localhost:54746" -t DestructiveSdk -l "..\\..\\..\\..\\EdFi.LoadTools.Test\\bin\\Debug\\net6.0\\EdFi.OdsApi.Sdk.dll"
```

:::caution

To perform Destructive SDK tests, you will need the additional security setup
described in the following section. It is also recommended that the underlying
ODS DB is empty; if you use a DB with existing resources, their IDs might
collide with the IDs of the resources that the tests attempt to create. The
collisions might also happen if a previous Destructive SDK test execution was
interrupted, leaving resources in the DB.

:::

## Authorizing Destructive SDK tests

This step is not necessary if you choose to disable authorization altogether; to
do so, refer to the last section in this document.

Destructive SDK tests will create and delete Education Organizations and also
assign resources to them. The _EducationOrganizationIdOverrides_ section in
EdFi.SmokeTest.Console's
[appsettings.json](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/blob/main/Utilities/DataLoading/EdFi.SmokeTest.Console/appsettings.json)
configures SDK tests to use specific Education Organization Ids. For tests to
run successfully, the key/secret used by the Destructive SDK tests must have
access to configured Education Organizations. Execute the following script in
the Admin DB to set up a Destructive SDK test client:

```sql
DECLARE @ApiClientId INT = <Your ApiClientId>
DECLARE @ApplicationId INT

SELECT @ApplicationId = Application_ApplicationId FROM ApiClients WHERE ApiClientId = @ApiClientId

INSERT INTO ApplicationEducationOrganizations VALUES (100000, @ApplicationId)
INSERT INTO ApiClientApplicationEducationOrganizations VALUES (@ApiClientId, SCOPE_IDENTITY())

INSERT INTO ApplicationEducationOrganizations VALUES (200000, @ApplicationId)
INSERT INTO ApiClientApplicationEducationOrganizations VALUES (@ApiClientId, SCOPE_IDENTITY())
```

<details>
<summary>Why additional authorization is needed</summary>

Let's consider the _CommunityProvider_ EdOrg as an example and assume that you
haven't executed the previous script. The Destructive SDK tests would create a
new _CommunityProvider_, and since its authorization strategy
is _NoFurtherAuth,_ it will succeed. Then, the tests will create a new
_CommunityProviderLicense_ referencing the previous _CommunityProvider._ This
step will fail since the authorization strategy for the
_CommunityProviderLicense_ is _RelationshipsWithEdOrgsAndPeople,_ and the client
would not be associated with the newly created _CommunityProvider._

To fix this, the Destructive Smoke tests create the _CommunityProvider_ with
the _Id_ previously configured in EdFi.SmokeTest.Console's
[appsettings.json](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/blob/main/Utilities/DataLoading/EdFi.SmokeTest.Console/appsettings.json) (by
default, `200000`) and assume that you have already associated the client with
the _Id_.

</details>

:::info

If you're using Test Harness to execute the Destructive SDK tests, you can
specify the required Education Organization Ids in its configuration.json, and
it will grant access to them; you can see an example
[here](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/blob/main/logistics/scripts/smokeTestHarnessConfiguration.json#L13).

:::

## A Word About Security

Because the Smoke Test Utility operates under the security constraints of the
provided key/secret, some operations may be invalid depending upon the security
configuration and the state of other entities in the database. These
characteristics are not available for the utility to examine and determine.
Intermittent warnings and errors may possibly be logged due to the
inaccessibility of resources for security reasons.

Security may be disabled for all keys/secrets by running the following query
against the EdFi\_Security database:

```sql
update [EdFi_Security].[dbo].[ResourceClaimActionAuthorizationStrategies] set AuthorizationStrategyId = 1
```

This statement replaces the authorization strategy for all resource types to be
"no further authorization required".

Deleting the EdFi\_Security database will cause it to be rebuilt with the
default claims the next time the websites are run.
