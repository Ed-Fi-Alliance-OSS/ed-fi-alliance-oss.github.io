---
description: Publish only part of the data, with or without the resources it depends on.
---

# Publish Only Selected Resources

## When to Use It

Only part of the data has to reach the target, for example the enrollments of a
district, or everything except a group of resources the target does not take.

## What You Need

- An API client on each API: on the source with the
  `Ed-Fi API Publisher - Reader` claim set, on the target with the
  `Ed-Fi API Publisher - Writer` claim set. See
  [Set Up the Source and Target API Clients](./1-set-up-api-clients.md).
- The names of the resources to publish or to leave out, as they appear in the
  API paths, such as `studentSchoolAssociations`.

Tested with Ed-Fi ODS/API 7.3.2 (Data Standard 6.1, Docker, PostgreSQL).

## Steps

1. Choose the option that matches what to publish. Each takes a comma-separated
   list of resources; for Ed-Fi resources the name is enough, such as
   `students,studentSchoolAssociations`, and other resources take their path,
   such as `/sample/busRoutes`.

   | Option | Publishes |
   | --- | --- |
   | `--include` | The resources and every resource they depend on. |
   | `--includeOnly` | Only the resources named. |
   | `--exclude` | Everything except the resources and every resource that depends on them. |
   | `--excludeOnly` | Everything except the resources named. |

2. Preview the selection by adding `--whatIf=true`. Run the API Publisher in
   PowerShell 7, from the folder where it is installed. It resolves the
   resources and their dependencies, logs them, and stops without publishing
   anything. The examples use `--include=studentSchoolAssociations`; replace it
   with the option and resources you chose:

   ```powershell
   .\EdFiApiPublisher.exe --sourceUrl=<source base URL> `
     --sourceKey=<key> --sourceSecret='<secret>' `
     --targetUrl=<target base URL> `
     --targetKey=<key> --targetSecret='<secret>' `
     --include=studentSchoolAssociations --includeDescriptors=true `
     --ignoreIsolation=true --whatIf=true
   ```

   The log lists each resource with the resources it depends on, indented
   below it:

   ```text
   110 resources to be processed after applying configuration for source API resource inclusions and/or exclusions.
   The following resources are to be published:
   /ed-fi/academicWeeks
       /ed-fi/schools
   /ed-fi/assessments
       /ed-fi/academicSubjectDescriptors
       /ed-fi/assessmentCategoryDescriptors
       ...
   ```

   With `--includeOnly=studentSchoolAssociations` instead, the same preview
   lists a single resource.

3. Run the publish with the same options, without `--whatIf`:

   ```powershell
   .\EdFiApiPublisher.exe --sourceUrl=<source base URL> `
     --sourceKey=<key> --sourceSecret='<secret>' `
     --targetUrl=<target base URL> `
     --targetKey=<key> --targetSecret='<secret>' `
     --include=studentSchoolAssociations --includeDescriptors=true --ignoreIsolation=true
   ```

   `--ignoreIsolation=true` reads the source's live data, because an Ed-Fi ODS/API
   7.x source has no snapshot configured by default. Remove it when the source has
   a snapshot configured; see
   [Sources Without a Configured Snapshot](../Known-Issues-Details.md#sources-without-a-configured-snapshot).

The commands give the connections explicitly, so the run publishes the whole
selection and does not record a change version. If you run these options with
the named connections of a recurring publish, the run stores the last change
version, and the changes to the resources it leaves out are never published by
later runs.

## Check the Result

The run exits with code `0`, and the run summary lists only the resources in the
preview. With `--include=studentSchoolAssociations`, it also lists the
resources they depend on, such as `schools` and `students`.

On Ed-Fi ODS/API 7.3.2, a selection that includes the survey resources ends
with code `2`, because the `Ed-Fi API Publisher - Reader` claim set does not
include them. With `--exclude`, add `surveys` to the list.

## Common Errors

| Error | Cause | Fix |
| --- | --- | --- |
| Every document of a resource is rejected with `409` or `403`, and the run exits with code `1` | `--includeOnly` or `--excludeOnly` left out records that the published resources reference, and the target does not have them. | Use `--include`, or publish the referenced resources first. |
| Far fewer resources were published than expected | `--exclude` also leaves out every resource that depends on the ones named. | Check the selection with `--whatIf=true`, and use `--excludeOnly` to leave out only the resources named. |

## Related Topics

- [API Connections](../API-Publisher-Configuration.md#api-connections) in API Publisher Configuration
- [API Connection Management](../API-Connection-Management.md)
