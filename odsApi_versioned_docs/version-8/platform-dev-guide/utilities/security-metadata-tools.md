---
sidebar_position: 3
slug: /platform-dev-guide/utilities/security-metadata-tools/
description: Install Ed-Fi API Security Metadata Tools and convert an ODS security metadata XML export into a complete Configuration Service claims document.
---

# Ed-Fi API Security Metadata Tools

Ed-Fi API Security Metadata Tools converts an ODS/API security metadata XML
export into a complete `Claims.json` document for the Ed-Fi API Configuration
Service. Use it when migrating security metadata from an ODS/API deployment.

The `convert-ods-xml` command preserves the exported authorization policy and
validates the result against the Configuration Service claims schema before
writing it. The result contains both the `claimSets` catalog and the nested
`claimsHierarchy`; it can be uploaded unchanged.

:::tip

To add extension resources or claim sets, the Configuration Service can merge
claims fragments into its base claims. See [Claims
Fragments](../../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx#claims-fragments).

:::

## Install

Install the .NET 10 SDK and ensure the .NET global tools directory is on your
`PATH`. Install the tool from the Ed-Fi NuGet feed, choosing the major/minor
release line you deploy:

```shell
dotnet tool install --global EdFi.Api.SecurityMetadataTools --version <major>.<minor>.* --add-source https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json
```

Replace `<major>.<minor>.*` with `8.1.*` for the latest stable patch on the 8.1
line. For a reproducible installation, use an exact published version such as
`8.1.0`. The tool package has its own patch version within the app's major/minor
release line.

Check the installed command:

```shell
security-metadata-tools --version
security-metadata-tools --help
security-metadata-tools convert-ods-xml --help
```

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
against the Ed-Fi API deployment that will enforce them. The tool converts
exports; it does not merge policies, resolve effective permissions, or verify
runtime authorization.

## Load the Generated Document

The output has two top-level properties: `claimSets` and `claimsHierarchy`.
Upload the generated `Claims.json` unchanged to
`POST /management/upload-claims`; no wrapper, catalog edits, URI edits, or
strategy substitutions are needed.

Runtime upload requires a non-production Configuration Service configured with:

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
the emitted `isSystemReserved: false` values. That provider document alone is
not proof of the persisted catalog: existing reserved sets keep their stored
flags. Follow [Verifying the Active
Policy](../../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx#verifying-the-active-policy)
to inspect the policy used by the Ed-Fi API.

For deployment-time loading, use the unchanged file as `Claims.json` with
`CONFIGURATION_SERVICE_CLAIMS_SOURCE=Filesystem` and
`CONFIGURATION_SERVICE_CLAIMS_DIRECTORY` pointing to its directory. Startup
loads claims only when the database holds no claims yet. See [Loading Your
Security Policy](../../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx#loading-your-security-policy)
for source configuration, fragment composition, and production guidance.
