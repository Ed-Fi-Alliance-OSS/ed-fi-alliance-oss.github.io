---
sidebar_position: 1
description: How Ed-Fi API extensions built with MetaEd are structured, staged, secured, and provisioned in v8.
---

# Extending API DataModel

The Ed-Fi Alliance provides a tool called [MetaEd IDE](/reference/metaed) that
allows you to author and build extensions using a simple language. Building
your extension generates an `ApiSchema-EXTENSION.json` file describing the new
or extended resources, and the Ed-Fi API reads it directly, with no code
generation or recompilation of the API itself required.

For a complete, hands-on walkthrough, see [How To: Extend the Ed-Fi API -
Alternative Education Program
Example](../../how-to-guides/how-to-extend-the-ed-fi-ods-api-alternative-education-program-example.md).
For a more advanced scenario, see [How To: Extend the Ed-Fi API - Student
Transcript
Example](../../how-to-guides/how-to-extend-the-ed-fi-ods-api-student-transcript-example.md).

The details below provide additional implementation information for developers.

## The ApiSchema Extension Model

The Ed-Fi API loads its data model from a core `ApiSchema.json` file (the
Ed-Fi Data Standard, with `isExtensionProject: false`) plus, optionally, one or
more **extension** `ApiSchema-EXTENSION.json` files produced by MetaEd (with
`isExtensionProject: true`). Together these make up the _effective API
schema_ (see [Database Provisioning](../utilities/database-provisioning.md)).

An extension schema can:

- Add wholly new resources and descriptors (as in the [Alternative Education
  Program
  example](../../how-to-guides/how-to-extend-the-ed-fi-ods-api-alternative-education-program-example.md)).
- Extend an existing core resource with additional properties. MetaEd marks
  these as `isResourceExtension` in the schema, and the added properties are
  nested under an `_ext` node on the core resource's JSON representation
  rather than replacing it.

## Workflow

1. **Author the extension in MetaEd**, targeting the data model version used
   by the Ed-Fi API (e.g. `ed-fi-model-5.2`). See [MetaEd IDE - Creating and
   Maintaining Your
   Extension](/reference/metaed/ide-user-guide/creating-and-maintaining-your-extension)
   for how to set up the extension project and author entities.
2. **Build the project** to generate `ApiSchema-EXTENSION.json`.
3. **Stage the schema workspace.** Put the core and extension schemas in one
   directory, together with a `bootstrap-api-schema-manifest.json` file that
   lists them. Then set `AppSettings:ApiSchema:UseCustomPath` to `true` and
   `AppSettings:ApiSchema:Path` to that directory (see [Configuration
   Details](../configuration/configuration-details)). Choose one way to build
   the directory:
   - In a local environment, put the core `ApiSchema.json` and your
     `ApiSchema-EXTENSION.json` in one folder and run
     `prepare-dms-schema.ps1 -ApiSchemaPath <folder>`. Without
     `-ApiSchemaPath`, the script stages only the Ed-Fi packages listed in
     `SCHEMA_PACKAGES`, not your extension.
   - In the Ed-Fi API container, if you load only Ed-Fi-published packages (such
     as the Data Standard and TPDM), list them in `SCHEMA_PACKAGES`. The
     container downloads them and writes the manifest at startup; see [Loading
     Schemas from Packages](#loading-schemas-from-packages).
   - To load your own extension anywhere else, write the manifest yourself;
     see [The Schema Workspace Manifest](#the-schema-workspace-manifest).
4. **Provision a new database.** Run `api-schema-tools ddl provision` with the
   core and extension schemas (in a local environment, `bootstrap-local-dms.ps1`
   does this). Use exactly the schema files the Ed-Fi API will load (with
   `SCHEMA_PACKAGES`, the same package names and versions). The Ed-Fi API won't
   use a database that was provisioned for a different set of schemas. See
   [Database Provisioning](../utilities/database-provisioning.md).
5. **Restart the Ed-Fi API.** The schema is loaded once at startup; there is
   no hot reload. Any later change to an extension schema requires repeating
   steps 3 and 4, then restarting the service again.
6. **Author security metadata.** Once the stack is back up, new resources are
   still not accessible until they are added to the claims hierarchy and
   granted to a claim set through the running Configuration Service. See [How
   To: Create and Manage API Security
   Metadata](../../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx).

## The Schema Workspace Manifest

You need this section only if you stage the schema files yourself;
`prepare-dms-schema.ps1` and the container's `SCHEMA_PACKAGES` option write the
manifest for you.

When `AppSettings:ApiSchema:UseCustomPath` is `true`, the Ed-Fi API reads
`bootstrap-api-schema-manifest.json` from the root of
`AppSettings:ApiSchema:Path` and loads only the schema files it lists. Other
files in the directory are ignored. If the directory, the manifest, or a listed
schema file is missing or invalid, the Ed-Fi API logs the problem and doesn't
start.

This example manifest stages the core Ed-Fi Data Standard schema and the
[Alternative Education Program
example](../../how-to-guides/how-to-extend-the-ed-fi-ods-api-alternative-education-program-example.md)
extension:

```json title="bootstrap-api-schema-manifest.json"
{
  "version": 1,
  "projects": [
    {
      "projectName": "Ed-Fi",
      "projectEndpointName": "ed-fi",
      "isExtensionProject": false,
      "schemaPath": "schemas/Ed-Fi/ApiSchema.json",
      "discoverySpecPath": "schemas/Ed-Fi/discovery-spec.json"
    },
    {
      "projectName": "SampleAlternativeEducationProgram",
      "projectEndpointName": "sample-alternative-education-program",
      "isExtensionProject": true,
      "schemaPath": "schemas/SampleAlternativeEducationProgram/ApiSchema.json"
    }
  ]
}
```

The Ed-Fi API checks the manifest at startup:

- `version` must be `1`.
- `projects` must list exactly one core project (`isExtensionProject: false`)
  and any number of extension projects.
- Each project needs `projectName`, `projectEndpointName`,
  `isExtensionProject`, and `schemaPath`. The first three must match the
  `projectSchema` values in the schema file exactly.
- `schemaPath` is relative to the manifest's directory. Absolute paths and
  paths that leave the directory (`..`) are rejected. The schema file can have
  any name.

Two more fields use the same path rules:

- `discoverySpecPath` (core project): the discovery specification file that
  the Ed-Fi API serves at `/metadata/specifications/discovery-spec.json`. The
  manifest is valid without it, but that endpoint then returns an error, so
  include it. The Ed-Fi Data Standard ApiSchema package ships this file as
  `discovery-spec.json`.
- `xsdDirectory` (any project, optional): a directory of XSD files that the
  Ed-Fi API serves from `/metadata/xsd`. The Bulk Load Client needs these to
  load extension XML.

## Loading Schemas from Packages

The Ed-Fi API container can download the schema files from NuGet packages
instead of reading files you stage. Set `SCHEMA_PACKAGES` to a JSON array with
one entry per package. Each entry has three fields:

- `name`: the package ID.
- `version`: the package version.
- `feedUrl`: the NuGet v3 feed that hosts the package.

List the core Data Standard package along with any extension packages. This
example loads the Data Standard 5.2 core schema and the TPDM extension from the
Ed-Fi package feed:

```shell title=".env"
USE_API_SCHEMA_PATH=true
API_SCHEMA_PATH=/app/ApiSchema
SCHEMA_PACKAGES='[{"name":"EdFi.DataStandard52.ApiSchema","version":"1.0.335","feedUrl":"https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json"},{"name":"EdFi.DataStandard52.TPDM.ApiSchema","version":"1.0.335","feedUrl":"https://pkgs.dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_packaging/EdFi/nuget/v3/index.json"}]'
```

Keep the `SCHEMA_PACKAGES` value on a single line, as in the example.

The container reads `SCHEMA_PACKAGES` only when the
`AppSettings__ApiSchema__UseCustomPath` environment variable is `true`
(lowercase), and it doesn't start unless `AppSettings__ApiSchema__Path` is also
set. Setting these values in `appsettings.json` instead isn't enough: the
download is skipped, and the Ed-Fi API then finds no manifest and doesn't
start. In Docker Compose, set `USE_API_SCHEMA_PATH` and `API_SCHEMA_PATH`, as
in the example. At startup, the container:

1. Deletes the `Packages` and `DownloadedPackages` directories under
   `AppSettings:ApiSchema:Path`.
2. Downloads each listed package into that directory.
3. Writes `bootstrap-api-schema-manifest.json` from the packages' own
   manifests, replacing any manifest already there.

Each package must contain a `package-manifest.json` file with `version` set to
`1` and the same project fields as a [schema workspace
manifest](#the-schema-workspace-manifest) entry. If a package doesn't have one,
the container doesn't start. The Ed-Fi ApiSchema packages include this file.
MetaEd's build output for your own extension is an `ApiSchema-EXTENSION.json`
file, not a package. To load it, stage it with `prepare-dms-schema.ps1` or write
the manifest yourself.

## Naming Conventions for Extensions

MetaEd generates `ApiSchema-EXTENSION.json` from what you configure in
your extension project (the `projectName` in `package.json`) and what you author
in your `.metaed` source files (entity names, `Descriptor` declarations, and so
on). The excerpt below shows what that generated file looks like for the
[Alternative Education Program
example](../../how-to-guides/how-to-extend-the-ed-fi-ods-api-alternative-education-program-example.md):

```json title="ApiSchema-EXTENSION.json (illustrative excerpt)"
{
  "apiSchemaVersion": "1.0.0",
  "projectSchema": {
    "projectName": "SampleAlternativeEducationProgram",
    "projectEndpointName": "sample-alternative-education-program",
    "projectVersion": "1.0.0",
    "isExtensionProject": true,
    "resourceSchemas": {
      "studentAlternativeEducationProgramAssociations": {
        "resourceName": "StudentAlternativeEducationProgramAssociation",
        "isDescriptor": false,
        "isResourceExtension": false
      },
      "alternativeEducationEligibilityReasonDescriptors": {
        "resourceName": "AlternativeEducationEligibilityReasonDescriptor",
        "isDescriptor": true,
        "isResourceExtension": false
      }
    }
  }
}
```

| Field | Where it comes from |
| --- | --- |
| `isExtensionProject` | Always `true` for an extension project. MetaEd sets this automatically to distinguish your project from the core Ed-Fi Data Standard project (`false`); you don't configure it directly. |
| `projectEndpointName` | Derived by MetaEd from the `projectName` you set in your extension's `package.json` (step 1 above), hyphenated and lower-cased. |
| `resourceName` | Taken from the entity name you author in your `.metaed` source file (e.g. `Association StudentAlternativeEducationProgramAssociation ...`). For a `Descriptor` declaration, MetaEd appends `Descriptor` to the name (`AlternativeEducationEligibilityReason` becomes `AlternativeEducationEligibilityReasonDescriptor`). |
| `isDescriptor` | `true` for any entity you declare with the `Descriptor` keyword in MetaEd. |
| `isResourceExtension` | `true` only when extending an existing core resource rather than defining a wholly new one (see [The ApiSchema Extension Model](#the-apischema-extension-model) above). |

`projectEndpointName` and `resourceName` together form the URL routing segment
and the claim URI segment for each resource:

```text
http://ed-fi.org/identity/claims/{projectEndpointName}/{resourceName}
```

Matching a request's resource against your claims hierarchy is
case-insensitive, so the exact casing you use when authoring `claimSets`
entries (see [How To: Create and Manage API Security
Metadata](../../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx))
doesn't affect authorization, but matching the schema's `resourceName` casing
keeps your claims file self-documenting.

## Removing or Changing an Extension

There is no in-place uninstall for an extension. Because the Ed-Fi API
validates a single fingerprint (the _effective schema hash_) against the
database, any change to the set of installed extensions (adding, removing, or
updating one) produces a new effective schema and requires a fresh database.
See [Upgrading the
Schema](../utilities/database-provisioning.md#upgrading-the-schema) for the
full procedure: provision a new database for the new schema, re-load data
through the Ed-Fi API, then point the service at the new database and restart
it. See [Schema Fingerprint
Validation](../utilities/database-provisioning.md#schema-fingerprint-validation)
for what happens when the schema and the database don't match.

In a local environment:

1. Tear down the stack:

   ```powershell
   ./bootstrap-local-dms.ps1 -d -v
   ```

2. Stage the new schema set with `prepare-dms-schema.ps1`.
3. Start the stack again with `bootstrap-local-dms.ps1`.

:::warning

`-d -v` deletes the local data volumes, including all data loaded into the
local databases, and removes the staged schema workspace. You can't skip it:
`prepare-dms-schema.ps1` refuses to stage a different schema set over an
existing workspace.

:::
