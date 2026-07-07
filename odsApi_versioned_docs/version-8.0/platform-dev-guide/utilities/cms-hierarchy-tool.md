---
sidebar_position: 3
description: Reference for the CmsHierarchy tool, which converts ODS/API XML security metadata to JSON and composes extension claim set fragments into the claims hierarchy.
---

# CmsHierarchy Tool

The CmsHierarchy tool is a .NET command-line utility in the DMS repository that
helps prepare and transform the JSON security metadata used by the Ed-Fi API
Configuration Service. It provides two commands:

| Command | Purpose |
| --- | --- |
| `ParseXml` | Convert ODS/API XML security metadata to the JSON array format used by the Configuration Service |
| `Transform` | Merge extension claim set fragment files into the base authorization hierarchy |

The tool is located at `eng/CmsHierarchy/` in the [source code
repository](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service).

## Prerequisites

- .NET 8 SDK
- Repository cloned locally

## Command Line Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `--command` | Yes | Command to execute: `ParseXml` or `Transform` |
| `--input` | Yes | Input file path(s). For `Transform`, separate multiple files with semicolons (`;`) |
| `--output` | Conditional | Output file path. Required when `--outputFormat ToFile` is used |
| `--outputFormat` | Yes | `ToFile` - write JSON to `--output` file. `Json` - print JSON to stdout |
| `--skipAuths` | No | Authorization strategy names to omit from the output, separated by semicolons |

Run all commands from the `eng/CmsHierarchy/` directory (or provide the full
project path to `dotnet run`).

## ParseXml

The `ParseXml` command converts an ODS/API XML security metadata export to the
JSON array format accepted by the Configuration Service. This is the starting
point for implementations migrating from a previous Ed-Fi ODS/API deployment.

### Exporting from ODS/API

Use the [Security Metadata XML export
script](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/blob/main/SecurityMetadata/Export/MsSql/Security-Metadata-to-XML.sql)
against your ODS/API database to produce the input XML file.

### Running ParseXml

Write the converted JSON to a file:

```bash
dotnet run --no-launch-profile \
  --command ParseXml \
  --input security-metadata.xml \
  --output AuthorizationHierarchy.json \
  --outputFormat ToFile
```

Print the converted JSON to stdout:

```bash
dotnet run --no-launch-profile \
  --command ParseXml \
  --input security-metadata.xml \
  --outputFormat Json
```

The output is a JSON array of domain claim objects. Review it before use: claim
URI patterns in ODS/API include an `/ods/` segment that is absent from Ed-Fi API
v8 URIs. Update any such URIs accordingly before loading the file into the
Configuration Service.

## Transform

The `Transform` command applies one or more claim set fragment files on top of
the built-in `AuthorizationHierarchy.json` and outputs the merged hierarchy. Use
this command to add extension resources or additional claim sets to the
hierarchy without editing the base file directly.

### Fragment File Format

Each fragment file describes a named claim set and the resource claims it adds
to the hierarchy. See
[`SampleExtensionResourceClaims.json`](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service/blob/main/eng/CmsHierarchy/ClaimSetFiles/SampleExtensionResourceClaims.json)
for a complete example. A minimal fragment looks like this:

```json
{
  "name": "MyExtensionClaimSet",
  "resourceClaims": [
    {
      "isParent": true,
      "name": "http://ed-fi.org/identity/claims/domains/myextension",
      "_defaultAuthorizationStrategiesForCrud": [
        {
          "actionName": "Create",
          "authorizationStrategies": [{ "name": "NoFurtherAuthorizationRequired" }]
        },
        {
          "actionName": "Read",
          "authorizationStrategies": [{ "name": "NoFurtherAuthorizationRequired" }]
        },
        {
          "actionName": "Update",
          "authorizationStrategies": [{ "name": "NoFurtherAuthorizationRequired" }]
        },
        {
          "actionName": "Delete",
          "authorizationStrategies": [{ "name": "NoFurtherAuthorizationRequired" }]
        }
      ],
      "children": [
        { "name": "http://ed-fi.org/identity/claims/myext/myNewResource" }
      ],
      "claimSets": [
        {
          "name": "MyExtensionClaimSet",
          "actions": [
            { "name": "Create" },
            { "name": "Read" },
            { "name": "Update" },
            { "name": "Delete" }
          ]
        }
      ]
    }
  ]
}
```

### Running Transform

Apply a single extension fragment:

```bash
dotnet run --no-launch-profile \
  --command Transform \
  --input my-extension-claims.json \
  --output Claims.json \
  --outputFormat ToFile
```

Apply multiple fragments in order (fragments are applied sequentially):

```bash
dotnet run --no-launch-profile \
  --command Transform \
  --input 001-my-extension.json;002-another-extension.json \
  --output Claims.json \
  --outputFormat ToFile
```

Print to stdout (useful for inspection before writing to a file):

```bash
dotnet run --no-launch-profile \
  --command Transform \
  --input my-extension-claims.json \
  --outputFormat Json
```

Strip authorization strategies that are not implemented in your environment:

```bash
dotnet run --no-launch-profile \
  --command Transform \
  --input my-extension-claims.json \
  --outputFormat Json \
  --skipAuths NotImplementedAuth;AnotherStrategy
```

## Delivering the Output to the Configuration Service

After generating the hierarchy JSON, deliver it to the Configuration Service
using the loading mode configured for your deployment.

| Loading Mode | Delivery |
| --- | --- |
| **Filesystem** | Copy the output file to the directory set by `DMS_CONFIG_CLAIMS_DIRECTORY` before the service starts |
| **Hybrid** | Place the fragment file in the directory set by `DMS_CONFIG_CLAIMS_DIRECTORY`; the embedded base loads automatically |
| **Embedded** | Rebuild and redeploy the Configuration Service binary with the updated embedded `Claims.json` |
| **Management API** | Wrap the hierarchy array in the two-section upload format and `POST` to `/management/upload-claims` |

For the management API upload, the hierarchy array produced by `Transform` must
be wrapped in the container document format:

```json
{
  "claimSets": [
    { "claimSetName": "MyExtensionClaimSet", "isSystemReserved": false }
  ],
  "claimsHierarchy": [ ... ]
}
```

See [Loading Your Security
Policy](../../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx#loading-your-security-policy)
for a description of all loading modes and the full management API upload
workflow.
