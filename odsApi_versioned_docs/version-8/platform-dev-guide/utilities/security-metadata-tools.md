---
sidebar_position: 3
description: Prepare Ed-Fi API security policy offline, inspect effective permissions, and compare the policy with a running Configuration Service.
---

# Ed-Fi API Security Metadata Tools

Ed-Fi API Security Metadata Tools prepares security policy offline and compares
it with the authorization metadata stored by the Ed-Fi API Configuration Service.
Use it to combine claims fragments with the bundled base claims, inspect the
permissions they grant, or migrate an ODS/API security metadata XML export.

The `merge`, `resolve`, and `verify` commands prepare and check security policy;
`convert-ods-xml` migrates an ODS/API export.
Preparing a policy and deploying it are separate steps: the tool doesn't upload
claims or change a running service.

## Install

Install the .NET 10 SDK and ensure the .NET global tools directory is on your
`PATH`. Install the tool from the Ed-Fi NuGet feed, choosing the major/minor
release line you deploy:

```shell
dotnet tool install --global EdFi.Api.SecurityMetadataTools --version <major>.<minor>.* --add-source https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json
```

Replace `<major>.<minor>.*` with `8.1.*` for the latest stable patch on the 8.1
line. Use the tool from the matching Configuration Service release; compatibility
across releases isn't guaranteed. The tool package has its own patch version,
which needn't equal the Configuration Service patch number. For a reproducible
installation, find the tool version in the `EdFi.Api.SecurityMetadataTools`
entry in `EdFi.Api.SecurityMetadataTools-SBOM.zip` attached to the corresponding
[GitHub release](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/releases),
and install that exact version.

Check the installed command:

```shell
security-metadata-tools --version
security-metadata-tools --help
security-metadata-tools merge --help
security-metadata-tools resolve --help
security-metadata-tools verify --help
security-metadata-tools convert-ods-xml --help
```

## Commands

| Command | Purpose | Required options | Optional options |
| --- | --- | --- | --- |
| `merge` | Combine the bundled base claims and a directory of fragments into a complete claims document | `--fragments <directory>`, `--output <json>` | `--data-standard-version <version>`, `--force` |
| `resolve` | Show a complete document's effective permissions, including inheritance, defaults, and overrides | `--input <json>`, `--output <json>` | `--force` |
| `verify` | Compare a complete document with a running Configuration Service's authorization metadata | `--input <json>`, `--cms-url <base-url>`, `--access-token-env <variable-name>` | `--tenant <tenant-name>` |
| `convert-ods-xml` | Convert an ODS/API security metadata XML export to a complete claims document | `--input <xml>`, `--output <json>` | `--force` |

A _complete claims document_ contains both a `claimSets` catalog and a nested
`claimsHierarchy`. `merge` and `convert-ods-xml` produce this format; `resolve`,
`verify`, and the Configuration Service's `upload-claims` endpoint accept it.

_Resolved metadata_ is a JSON array describing each claim set's accessible
resource claims, effective actions, and authorization strategies. It has the
same shape as the Configuration Service's `GET /v3/authorizationMetadata`
response. Use it for inspection only: it can't be uploaded as a claims document
or passed as input to `resolve` or `verify`.

### Output Files and Exit Codes

For commands that write a file, the destination's parent directory must already
exist. An existing destination requires `--force`. The tool finishes processing
and validation before writing the result. A failure leaves an existing file
unchanged and doesn't leave a partial new file. `--force` permits replacement;
it doesn't bypass validation.

Successful file-producing commands write JSON to the destination file, with no
success message on standard output. `verify` writes its match or difference
report to standard output. Failures write diagnostics to standard error.

| Exit code | Meaning |
| --- | --- |
| `0` | Conversion, merge, or resolution succeeded; for `verify`, all metadata matched |
| `1` | The command failed, for example because of invalid input, incomplete fragment composition, authentication failure, an HTTP error, or an invalid response |
| `2` | `verify` received valid metadata that differs from the expected policy |

### Merge Checks

`merge` uses the bundled base claims for the selected data standard. Match
`--data-standard-version` to the Configuration Service's
`ClaimsOptions:DataStandardVersion` setting (the Compose variable
`CONFIGURATION_SERVICE_DATA_STANDARD_VERSION`). Both default to `5.2`; use
`6.1` for a deployment configured for that version. An unsupported version
fails instead of falling back to a different base.

The tool applies `*-claims.json` fragments in file-path order, including files
in subdirectories. It rejects incomplete composition, including malformed
fragments, grants that match no claim, and retired `*-claimset.json` files.
It also rejects policy that the Configuration Service would silently ignore,
such as `claimSets` or `_defaultAuthorizationStrategiesForCrud` on a parent
entry that matches an existing claim. This makes it useful for checking
fragments before deployment, even when you plan to let the service compose them
in Hybrid mode.

These checks don't change how the Configuration Service loads claims. For
fragment examples, see [Claims
Fragments](../../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx#claims-fragments).
For the full input restrictions, see the [tool
README](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/main/src/config/clis/EdFi.DmsConfigurationService.SecurityMetadataTools/README.md#complete-document-and-merge-restrictions).

## Prepare, Inspect, Deploy, and Verify

This PowerShell example creates a claim set named `Offline` with Read access
to students. A new claim set defined by a fragment is system-reserved, so the
claim set endpoints can't change or delete it. Start in a working directory
with the matching tool installed.

### Prepare the Complete Document

Create the fragment and output directories, then save the fragment:

```powershell
New-Item -ItemType Directory -Force ./fragments, ./policy-output | Out-Null
@'
{
  "name": "Offline",
  "resourceClaims": [
    {
      "name": "ed-fi/student",
      "authorizationStrategyOverridesForCRUD": [
        {
          "actionName": "Read",
          "authorizationStrategies": [{ "name": "NoFurtherAuthorizationRequired" }]
        }
      ]
    }
  ]
}
'@ | Set-Content ./fragments/001-offline-claims.json -Encoding utf8
security-metadata-tools merge --fragments ./fragments `
  --data-standard-version 5.2 --output ./policy-output/Claims.json
```

Use `--data-standard-version 6.1` instead if that is the version configured for
your Configuration Service. This command includes all bundled claim sets as
well as `Offline`; review the complete result before deployment.

### Inspect Effective Permissions

```powershell
security-metadata-tools resolve --input ./policy-output/Claims.json `
  --output ./policy-output/authorization-metadata.json
Get-Content ./policy-output/authorization-metadata.json -Raw
```

Check that `Offline` has Read access to the student resource with
`NoFurtherAuthorizationRequired`. Also review the other claim sets, including
inherited permissions. Defaults choose strategies for actions that have been
granted; defaults alone don't grant access.

### Deploy the Complete Document

Deploy `policy-output/Claims.json`, keeping the resolved metadata file for
inspection. Choose one of the existing deployment paths:

- For Filesystem loading, copy the generated file unchanged as `Claims.json`
  into an otherwise empty claims directory. Configure the directory and start
  the Configuration Service against a new database. Don't put fragments already
  merged into the document in that directory. Startup loads only an empty
  database; restarting with a changed file doesn't replace stored policy.
- For a non-production runtime upload, post the unchanged file to
  `POST /management/upload-claims` with an authorized administrative token and
  unrestricted claims loading enabled.

For example, stage the file for Filesystem loading:

```powershell
New-Item -ItemType Directory -Force ./deployment-claims | Out-Null
Copy-Item ./policy-output/Claims.json ./deployment-claims/Claims.json
```

Set these variables in your Compose environment file, replacing the mount source
with the absolute path to `deployment-claims`, then start the service against a
new database:

```ini
CONFIGURATION_SERVICE_CLAIMS_SOURCE=Filesystem
CONFIGURATION_SERVICE_CLAIMS_MOUNT_SOURCE=/absolute/path/to/deployment-claims
CONFIGURATION_SERVICE_CLAIMS_DIRECTORY=/app/additional-claims
CONFIGURATION_SERVICE_DATA_STANDARD_VERSION=5.2
```

See [Loading Your Security
Policy](../../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx#loading-your-security-policy)
for configuration and upload examples. Review the effects on existing claim
sets and applications before replacing policy. An upload keeps existing
system-reserved claim sets, which can appear as unexpected sets in verification
if the document doesn't include them.

### Verify Stored Permissions

Obtain a Configuration Service bearer token using your deployment's identity
provider. The token must satisfy the existing role and scope requirements for
`GET /v3/authorizationMetadata`; verification doesn't require unrestricted
claims loading. For example, with the `$token` obtained in [Runtime Upload via
Configuration Service](../../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx#runtime-upload-via-configuration-service):

```powershell
$env:CMS_ACCESS_TOKEN = $token.access_token
security-metadata-tools verify --input ./policy-output/Claims.json `
  --cms-url http://localhost:8081 --access-token-env CMS_ACCESS_TOKEN
Remove-Item Env:CMS_ACCESS_TOKEN
```

`--access-token-env` takes the environment variable's _name_, not the token
value. Missing or empty credentials fail before the tool makes an HTTP request.
Use the Configuration Service's HTTP(S) base URL for `--cms-url`, including a
deployment prefix if needed. Don't include an endpoint path, credentials,
query string, or fragment. For tenant routing, add `--tenant <tenant-name>`;
this sends the `Tenant` header and doesn't grant authorization.

#### What a Verification Result Means

`verify` compares every expected and actual claim set, including empty sets.
There is no claim set filter. Missing or extra sets, resource claims, actions,
or different authorization strategies are mismatches. Strategy order and
repetitions matter: changing only their order can return exit code `2`.

Claim set names are compared without regard to case. Resource URIs, action
names, and strategy names are case-sensitive. The comparison ignores generated
IDs, catalog flags such as `isSystemReserved`, and the ordering of claim sets,
claims, authorization records, and actions. Different hierarchies that resolve
to the same permissions match. Resolution can combine equivalent authorization
records; verification can't recover strategy ordering already lost in that step.

A match describes the Configuration Service metadata returned by that request.
It doesn't prove that the Ed-Fi API's authorization cache is current or that
live API requests enforce the policy as intended. Test those requests
separately. `verify` doesn't upload, reload, or invalidate caches.

## Export from ODS/API

Run the [SQL Server Security Metadata XML export
script](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/blob/5bca6615e1ce06b84a87e8512cfbe69a1249dd9a/SecurityMetadata/Export/MsSql/Security-Metadata-to-XML.sql)
at revision `5bca6615e1ce06b84a87e8512cfbe69a1249dd9a` against the
`EdFi_Security` database. Save the complete XML result as `export.xml`, excluding
SQL client messages and avoiding truncation. The supported format has a
`SecurityMetadata` root containing `Claims`, with nested `Claim` elements,
local `DefaultAuthorization`, and `ClaimSets` declarations.

Conversion is verified against an export from the standard ODS/API **7.3.2**,
Data Standard **5.2.0** security seed, without extensions or optional feature
scripts. See the [acceptance fixture and reproduction
instructions](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/tree/main/src/config/clis/EdFi.DmsConfigurationService.SecurityMetadataTools.Tests.Unit/Fixtures/OdsSecurityMetadata)
for source revisions, database and deployment-tool versions, export commands,
hashes, and expected JSON. This verification covers that specific export format;
it does not establish support for other ODS/API versions.

## Convert the Export

```shell
security-metadata-tools convert-ods-xml --input export.xml --output Claims.json
```

| Option | Required | Meaning |
| --- | --- | --- |
| `--input <xml>` | Yes | Path to the exported XML file |
| `--output <json>` | Yes | Destination for the complete claims document; its parent directory must exist |
| `--force` | No | Replace an existing output file after conversion and validation succeed |

A successful conversion writes UTF-8 JSON to the file and exits with code zero.
It does not write JSON to standard output. Existing output is refused unless
`--force` is supplied:

```shell
security-metadata-tools convert-ods-xml --input export.xml --output Claims.json --force
```

Conversion and Configuration Service schema validation finish before any output
is created or replaced. If either fails, a new destination remains absent and an
existing file remains byte-for-byte unchanged, even with `--force`. Failures
return a nonzero exit code and diagnostics on standard error.

### Claim Set Names and Editable Imports

Every claim set referenced anywhere in the export receives one catalog entry.
The same mapped name is used in the catalog and hierarchy references:

- Remove only literal spaces (`U+0020`) and hyphens (`U+002D`). For example,
  `Ed-Fi Sandbox` becomes `EdFiSandbox`.
- Reject all remaining whitespace, including nonbreaking spaces (`U+00A0`);
  these are not removed or accepted. Preserve the remaining spelling, case, and
  valid non-ASCII characters.
- Require a nonempty mapped name of at most 256 UTF-16 code units, with no
  control characters. Exactly 256 is accepted.
- Reject distinct source names that map to the same name under an ordinal,
  case-insensitive comparison. The diagnostic identifies both source names.
  Repeated references to the exact same source name share one catalog entry.

All emitted catalog entries have `isSystemReserved: false`, including familiar
system-like names. Newly inserted sets are therefore editable through the
Configuration Service claim set endpoints. An already-present reserved set
with the same name retains its stored identity and reserved status during
upload; conversion does not demote existing reserved sets.

### Claim URIs

Only the exact, case-sensitive leading prefix
`http://ed-fi.org/ods/identity/claims/` is migrated to
`http://ed-fi.org/identity/claims/`. A nonempty suffix containing no `/` also
receives the core project segment `ed-fi/`. For example:

```text
http://ed-fi.org/ods/identity/claims/academicWeek
→ http://ed-fi.org/identity/claims/ed-fi/academicWeek
```

Domain, service, and already-namespaced suffixes retain their paths: `domains/student`,
`services/educationOrganizations`, and `ed-fi/academicWeek` are not prefixed again.
An empty suffix remains empty. Already-current URIs, external and extension URIs
without the legacy prefix, near matches, and `/ods/` elsewhere remain unchanged.
Prefix-only migration of legacy single-segment resources is not supported: the
`ed-fi/` segment is required for the Ed-Fi API's full resource-claim URI matching.

Conversion fails if distinct source claim URIs collapse to the same URI after
migration, including a legacy URI colliding with an already-current URI
elsewhere in the hierarchy.

### Authorization and Validation

Conversion preserves nested claims, locally declared default actions, strategy
names, claim-set actions, and strategy override lists. It does not discard or
substitute strategies, or copy inherited permissions onto child claims. A
hierarchy node without local defaults remains valid. Empty
`DefaultAuthorization` containers become an absent `defaultAuthorization`
property; permitted empty strategy and override lists remain empty lists.
Non-policy `claimId` metadata is not emitted into JSON.

Populated `validationRuleSet` attributes on default actions and
`validationRuleSetOverride` attributes on claim-set actions cannot be
represented by the Configuration Service claims document and cause conversion
to fail. Absent or empty values are accepted. The diagnostic names the attribute
and affected claim/action. Do not remove policy-bearing values merely to make
an export convert; resolve their intended behavior before migration.

Malformed XML, unexpected roots or structure, unknown policy elements or
attributes, missing names, and malformed actions fail with location or
claim/action diagnostics. Documents with no claims, no referenced claim sets,
or no claim-set actions also fail. Every successful result passes the existing
Configuration Service claims validator; schema failures report useful JSON
paths and messages.

Conversion and loading validate the document's structure. They do not establish
runtime support for every imported authorization strategy. Review the strategies
against the Ed-Fi API deployment that will enforce them. Use `resolve` to
inspect the converted document and `verify` to compare it with stored
Configuration Service metadata after deployment.

## Load the Generated Document

The output has two top-level properties: `claimSets` and `claimsHierarchy`.
Upload the generated `Claims.json` unchanged to
`POST /management/upload-claims`; no wrapper, catalog edits, URI edits, or
strategy substitutions are needed.

Runtime upload requires a Configuration Service configured with the following
setting. Enable it only in non-production environments.

```ini
CONFIGURATION_SERVICE_DANGEROUSLY_ENABLE_UNRESTRICTED_CLAIMS_LOADING=true
```

This is the variable used by the supplied Docker Compose files. Without those
files, set `ClaimsOptions__DangerouslyEnableUnrestrictedClaimsLoading=true`
directly. The endpoint returns 404 while the setting is disabled.

Obtain an authorized administrative Configuration Service bearer token with the
`edfi_admin_api/full_access` scope, following [Runtime Upload via Configuration
Service](../../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx#runtime-upload-via-configuration-service).
With that procedure's `$token`, send the file bytes directly in PowerShell:

```powershell
Invoke-RestMethod -Method Post `
  -Uri "http://localhost:8081/management/upload-claims" `
  -Headers @{ Authorization = "Bearer $($token.access_token)" } `
  -ContentType "application/json" `
  -InFile ./Claims.json
```

A successful upload returns HTTP 200. Upload replaces the hierarchy and updates
the catalog under the existing reserved-set protections. Before changing an
existing deployment, review [When Claims Are
Loaded](../../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx#when-claims-are-loaded),
including the effects on other claim sets and applications.

`GET /management/current-claims` returns the loaded complete document, including
the emitted `isSystemReserved: false` values. Like `upload-claims`, it returns
404 unless unrestricted claims loading is enabled. That provider document alone
is not proof of the persisted catalog: existing reserved sets keep their stored
flags. Follow [Verifying the Active
Policy](../../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx#verifying-the-active-policy)
to inspect the policy used by the Ed-Fi API.

For deployment-time loading, use the unchanged file as `Claims.json` with
`CONFIGURATION_SERVICE_CLAIMS_SOURCE=Filesystem` and
`CONFIGURATION_SERVICE_CLAIMS_DIRECTORY` pointing to its directory. Startup
loads claims only when the database holds no claims yet. See [Loading Your
Security Policy](../../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx#loading-your-security-policy)
for source configuration, fragment composition, and production guidance.
