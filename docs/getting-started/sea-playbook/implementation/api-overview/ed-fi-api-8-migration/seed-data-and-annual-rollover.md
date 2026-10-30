---
sidebar_position: 6
---

# Seed Data and Annual Rollover

Seed data is what you load before districts connect: descriptors, local education agencies, schools, programs, course catalogs and similar state-owned data.

## Before and after

| | ODS/API | Ed-Fi API v8 |
| --- | --- | --- |
| Format | SQL scripts run against the ODS, XML loaded with the Bulk Load Client, or data copied from last year's ODS | XML interchange files |
| How it is loaded | Directly into the database, or through the API | Through the API, with the [Bulk Load Client](/reference/ed-fi-api/8/platform-dev-guide/utilities/bulk-load-client-utility) |
| Ed-Fi's starting data | Minimal or populated template databases | Minimal or populated seed templates (`-LoadSeedData -SeedTemplate Minimal` or `Populated`) |
| Rolling forward to next year | Copy or restore last year's ODS, or run SQL | Load into a new data store through the API, with the Bulk Load Client or [API Publisher](/reference/api-publisher) |

Every row in an Ed-Fi API v8 table is linked to internal records the API maintains, so seed data goes in through the API, not with SQL inserts.

## Example: a descriptor, from SQL to XML

Before, a SQL script against the ODS:

```sql
INSERT INTO edfi.Descriptor (Namespace, CodeValue, ShortDescription, Description)
VALUES ('uri://your-state.gov/GradeLevelDescriptor', 'Transitional Kindergarten',
        'Transitional Kindergarten', 'Transitional Kindergarten');

INSERT INTO edfi.GradeLevelDescriptor (GradeLevelDescriptorId)
VALUES (SCOPE_IDENTITY());
```

Now, an XML interchange file (Data Standard 5.2):

```xml
<?xml version="1.0" encoding="UTF-8"?>
<InterchangeDescriptors xmlns="http://ed-fi.org/5.2.0">
  <GradeLevelDescriptor>
    <CodeValue>Transitional Kindergarten</CodeValue>
    <ShortDescription>Transitional Kindergarten</ShortDescription>
    <Description>Transitional Kindergarten</Description>
    <Namespace>uri://your-state.gov/GradeLevelDescriptor</Namespace>
  </GradeLevelDescriptor>
</InterchangeDescriptors>
```

Use the files in the [Ed-Fi Data Standard Descriptors folder](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Data-Standard/tree/v5.2.0/Descriptors) as templates; they show the format for every descriptor. Validate your files against the Data Standard XSDs before loading. The Bulk Load Client validates against the XSD by default.

Keep Ed-Fi's descriptors and your state's own data in separate folders under your state's folder, for example `eng/<your-state>/seedData/`. That way you can update Ed-Fi's descriptors without touching your own.

## Example: loading seed data

Before, with the Bulk Load Client against the ODS/API, the token URL came from the base URL. Now the token endpoint is on the Configuration Service, so set it explicitly:

```powershell
EdFi.BulkLoadClient.Console `
  --baseurl http://localhost:8080/api `
  --oauthurl http://localhost:8081/connect/token `
  -k <key> -s <secret> `
  -d ./eng/<your-state>/seedData `
  -w ./working
```

Use a client with a claimset that allows creating descriptors and education organizations, such as `BootstrapDescriptorsandEdOrgs`.

## Annual rollover

Rollover is not a one-time migration step. You repeat it every year:

1. Create the new school year's data store.
2. Load Ed-Fi's descriptors and your state's seed data into it with the Bulk Load Client.
3. To carry data forward from last year, use API Publisher to copy from last year's data store into the new one. This only works when both use the same Data Standard version.

:::info[Still being worked out]

- **Converting SQL seed scripts to XML.** Many states keep seed data as SQL scripts. We do not yet have a tool that converts them; for now the conversion is by hand, using the Data Standard files as templates.
- **Rollover on a running production system.** We have not yet published tested steps for adding next year's data store and seed data to an Ed-Fi API v8 environment that is already in production.

:::
