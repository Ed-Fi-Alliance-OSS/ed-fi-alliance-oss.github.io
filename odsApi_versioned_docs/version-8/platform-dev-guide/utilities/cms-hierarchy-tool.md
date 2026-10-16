---
sidebar_position: 3
description: Reference for the CmsHierarchy tool, which converts ODS/API XML security metadata to the JSON format used by the Ed-Fi API Configuration Service.
---

# CmsHierarchy Tool

The CmsHierarchy tool is a .NET command-line utility in the source code
repository that converts ODS/API XML security metadata to the JSON format used
by the Ed-Fi API Configuration Service. Use it when migrating the security
metadata of a previous Ed-Fi ODS/API deployment.

| Command | Purpose |
| --- | --- |
| `ParseXml` | Convert ODS/API XML security metadata to the JSON array format used by the Configuration Service |

The tool is located at `eng/CmsHierarchy/` in the [source code
repository](https://github.com/Ed-Fi-Alliance-OSS/Data-Management-Service).

:::tip

You don't need this tool to add extension resources or claim sets. The
Configuration Service merges claim set fragments into its base claims itself;
see [Claim Set
Fragments](../../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx#claim-set-fragments).

:::

## Prerequisites

- .NET 10 SDK
- Repository cloned locally

## Command Line Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `--command` | Yes | Command to execute: `ParseXml` |
| `--input` | Yes | Path of the ODS/API XML security metadata file |
| `--output` | Conditional | Output file path. Required when `--outputFormat ToFile` is used |
| `--outputFormat` | Yes | `ToFile` - write JSON to `--output` file. `Json` - print JSON to stdout |

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

```powershell
dotnet run --no-launch-profile `
  --command ParseXml `
  --input security-metadata.xml `
  --output AuthorizationHierarchy.json `
  --outputFormat ToFile
```

Print the converted JSON to stdout:

```powershell
dotnet run --no-launch-profile `
  --command ParseXml `
  --input security-metadata.xml `
  --outputFormat Json
```

The output is a JSON array of domain claim objects. Review it before use: claim
URI patterns in ODS/API include an `/ods/` segment that is absent from Ed-Fi API
v8 URIs. Update any such URIs accordingly before loading the file into the
Configuration Service.

## Delivering the Output to the Configuration Service

`ParseXml` produces only the claims hierarchy array. The Configuration Service
loads complete claims documents, which wrap that array as `claimsHierarchy`
together with a `claimSets` catalog. Add a `claimSets` entry for every claim set
the hierarchy references. Both sections are top-level properties:

```json
{
  "claimSets": [
    { "claimSetName": "MyClaimSet", "isSystemReserved": false }
  ],
  "claimsHierarchy": [ ... ]
}
```

Then deliver the document using the loading mode configured for your deployment:

| Loading Mode | Delivery |
| --- | --- |
| **Filesystem** | Save the document as `Claims.json` in the directory set by `CONFIGURATION_SERVICE_CLAIMS_DIRECTORY` |
| **Management API** | `POST` the document directly to `/management/upload-claims` (non-production only) |

The Configuration Service loads claims from its configured source only when its
database holds no claims yet. See [When Claims Are
Loaded](../../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx#when-claims-are-loaded)
before applying a converted policy to an existing deployment, and [Verifying the
Active
Policy](../../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx#verifying-the-active-policy)
to check the result.

See [Loading Your Security
Policy](../../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx#loading-your-security-policy)
for a description of all loading modes and the full management API upload
workflow.
