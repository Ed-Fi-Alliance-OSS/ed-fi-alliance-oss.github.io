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
3. **Stage the schema.** Place the core and extension `ApiSchema.json` files
   together in the directory specified by `AppSettings:ApiSchemaPath` (requires
   `AppSettings:UseApiSchemaPath` set to `true`; see [Configuration
   Details](../configuration/configuration-details)). In a local environment,
   `prepare-dms-schema.ps1` builds this staged workspace for you.
4. **Provision the database.** Run `api-schema-tools ddl provision` (or, in a
   local environment, restart the stack with `bootstrap-local-dms.ps1`) to add
   the extension's tables to the database. See [Database
   Provisioning](../utilities/database-provisioning.md).
5. **Restart the Ed-Fi API.** The schema is loaded once at startup; there is
   no hot reload. Any later change to an extension schema requires repeating
   steps 3 and 4, then restarting the service again.
6. **Author security metadata.** Once the stack is back up, new resources are
   still not accessible until they are added to the claims hierarchy and
   granted to a claim set through the running Configuration Service. See [How
   To: Create and Manage API Security
   Metadata](../../how-to-guides/how-to-create-and-manage-api-security-metadata.mdx).

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
it.
