---
sidebar_position: 5
---

# Extensions

## Before and after

| | ODS/API 7.x | Ed-Fi API v8 |
| --- | --- | --- |
| Authoring | MetaEd IDE | MetaEd IDE (unchanged) |
| What MetaEd produces for the API | Generated code, database scripts and metadata files for an extension project in the ODS/API solution | One `ApiSchema-EXTENSION.json` file |
| Building | Add the extension project and rebuild the ODS/API | No code generation or rebuild. The Ed-Fi API reads the ApiSchema file at startup |
| Database | Extension database scripts deployed with the ODS | `api-schema-tools ddl provision` creates the extension tables |
| Security for new resources | SQL scripts that add resource claims to `EdFi_Security` | A claims JSON file loaded by the Configuration Service |
| Changing an extension later | Deploy updated scripts to the existing ODS | Provision a fresh database and reload data through the API |

See [Extending API DataModel](/reference/ed-fi-api/8/platform-dev-guide/extensibility-customization/extending-api-datamodel) for the full workflow, and [Extending the ODS / API Data Model](/reference/ed-fi-api/platform-dev-guide/extensibility-customization/extending-the-ods-api-data-model) for how it worked before.

## Example: from MetaEd to a running API

1. Open your extension project in MetaEd and target the Data Standard your Ed-Fi API v8 uses (for example, `ed-fi-model-5.2`).
2. Build. MetaEd writes `ApiSchema-EXTENSION.json`.
3. Copy it into your state's folder, for example `eng/<your-state>/mySchemas/`, next to the core `ApiSchema.json`.
4. Stage the schema and provision the database. Locally, `prepare-dms-schema.ps1` stages the files and `bootstrap-local-dms.ps1` provisions. Elsewhere, run `api-schema-tools ddl provision` (see [Database Provisioning](/reference/ed-fi-api/8/platform-dev-guide/utilities/database-provisioning)).
5. Restart the Ed-Fi API. The schema is read once at startup.
6. Add security metadata for the new resources (next section). Until you do, no client can reach them.

The [Alternative Education Program example](/reference/ed-fi-api/8/how-to-guides/how-to-extend-the-ed-fi-ods-api-alternative-education-program-example) walks through this end to end.

## Example: claims for a new extension resource

Before, you ran SQL against `EdFi_Security` to add a resource claim and grant it to a claimset. Now you add the resource to the claims hierarchy in JSON, under the domain it belongs to:

```json
[
  {
    "name": "http://ed-fi.org/identity/claims/domains/someDomain",
    "claims": [
      {
        "name": "http://ed-fi.org/identity/claims/myext/myNewResource"
      }
    ]
  }
]
```

The new claim inherits the domain's default authorization unless you set its own. Add `claimSets` entries to grant it to the claimsets that need it.

For production, load claims when the Configuration Service starts (the `Hybrid` or `Filesystem` claims source), rather than uploading them at runtime. Claims uploaded at runtime are lost if the Configuration Service database is recreated. See [How To: Create and Manage API Security Metadata](/reference/ed-fi-api/8/how-to-guides/how-to-create-and-manage-api-security-metadata).

## Plan for extension changes

On the ODS/API, you could deploy an updated extension to the existing database. On Ed-Fi API v8, **any change to your extensions (adding, removing or changing one) needs a fresh database, and the data must be reloaded through the API.** The same applies to a Data Standard upgrade. See [Upgrading the Schema](/reference/ed-fi-api/8/platform-dev-guide/utilities/database-provisioning#upgrading-the-schema).

Plan extension changes for the start of a school year, when you set up a new data store anyway.

:::info[Still being worked out]

- **Extension build errors.** Some extensions that build in MetaEd have failed when the Ed-Fi API starts. We are still collecting examples. If you hit one, tell us through the [Ed-Fi Community](/community).
- **Reviewing extensions before you migrate.** Moving to Ed-Fi API v8 is a good time to retire extensions you no longer need, because each one you keep has to be rebuilt in the new workflow.

:::
