---
sidebar_position: 8
---

# Working with Code Generation

The Code Generation utility is a .NET 8.0 command-line application that has been
integrated into the Ed-Fi ODS / API `initdev` process. Its responsibility is to generate C# classes, ORM mapping files for
the core application, plus all profiles and extensions. It uses logic-less
`{{mustache}}` templates that are embedded within the assembly to generate the files. The
application depends on Castle Windsor for its container.

The code generation tool is located in the ODS repository under the folder
Utilities\CodeGeneration.

## Requirements

The following are required to build the application:

* Visual Studio 2022 / JetBrains Rider 2021.3
* .NET 8.0

## Template Model

Template models generate an anonymous object to drive the mustache template. All
template models implement the interface `ITemplateModel`, and these models are then installed into the container to be run.

To add a new template model:

1. Create a new class in the TemplateModels namespace.
2. Utilize the [Template Method Pattern](https://www.dofactory.com/net/template-method-design-pattern) and inherit from `TemplateModelBase`.
3. Implement the `BuildTemplateModel()` method.
4. Optionally, implement the `Configure()` method, if pre-processing is necessary.
5. Optionally, add a Constructor for any dependencies to be injected.

The code below shows an example template model:

<details>
<summary>Expand source</summary>

```csharp
public class EdOrgIdModel : TemplateModelBase
{
    public EdOrgIdModel(ISchemaReader schemaReader, ITemplateContextProvider templateContextProvider) 
        : base(schemaReader, templateContextProvider) { }

    protected override object BuildTemplateModel()
    {
        return new
        {
            educationOrganizationIds = TemplateContext.EntitiesWithPropertyNamed("EducationOrganizationId")
                .Where(e => e.IsDescriptor() == false && e.IsLookup() == false && e.Entity.IsMappedEntity)
                .Select(e => e.Schema.FullName)
                .OrderBy(n => n)
                .Distinct()
                .ToList()
        };
    }
}
```
</details>

## Assembly Metadata

The utility introduces a new file within each assembly root folder that requires
code generation, the assemblyMetadata.json file:

<details>
<summary>Expand source</summary>

```json
{
  "assemblyModelType": "EdFi.Ods.Standard",
  "assemblyMetadataFormatVersion": "1.0.0"
}
```
</details>

* `assemblyModelType` maps the to the template set to generate.
* `assemblyMetadataFormateVersion` is the semantic version of the file.

:::note
For backward compatibility, profiles and extensions are also picked up using
conventions. This may be removed in the future.
:::

## Template Sets

Template Sets are a grouping of Template Models that are to be rendered. This
grouping is stored in an embedded object named TemplateSets.json which contains an array of **TemplateSet** objects.

<details>
<summary>Expand source</summary>

```json
{
  "name": "Ed-Fi Extensions",
  "driver": "AssemblyModel",
  "outputPath": "",
  "outputName": "no-output",
  "templateSets": [
    {
      "name": "Views",
      "driver": "EntityViews",
      "outputPath": "Entities",
      "outputName": "EntityViews.generated.cs"
    }
  ]
}
```
</details>

* **Name** is the name of the template.
* **Driver** is the C# Template Model.
* **OutputName** is the file name that is created.
* **OutputPath** is the location within the assembly to which the file is written.

The listing below shows the TemplateSets.json contents:

<details>
<summary>Expand source</summary>

```json
[
  {
    "name": "EdFi.Ods.Standard",
    "driver": "AssemblyModel",
    "outputPath": "",
    "outputName": "no-output",
    "templateSets": [
      {
        "name": "Markers",
        "driver": "MarkerInterfaces",
        "outputPath": "Marker",
        "outputName": "Marker.generated.cs"
      },
      {
        "name": "Entities",
        "driver": "EntityModel",
        "outputPath": "Entities",
        "outputName": "Entities.generated.cs"
      },
      {
        "name": "Requests",
        "driver": "RequestModel",
        "outputPath": "Requests",
        "outputName": "Requests.generated.cs"
      },
      {
        "name": "Views",
        "driver": "EntityViews",
        "outputPath": "Entities",
        "outputName": "EntityViews.generated.cs"
      },
      {
        "name": "Database",
        "driver": "DatabaseViews",
        "outputPath": "Entities",
        "outputName": "DatabaseViews.generated.hbm.xml"
      },
      {
        "name": "OrmMappings",
        "driver": "OrmMappings",
        "outputPath": "Entities",
        "outputName": "Entities.generated.hbm.xml"
      },
      {
        "name": "EntitiesForQueries",
        "driver": "EntitiesForQueries",
        "outputPath": "Entities",
        "outputName": "EntitiesForQueries.generated.hbm.xml"
      },
      {
        "name": "EntitiesForQueriesViews",
        "driver": "EntitiesForQueriesViews",
        "outputPath": "Entities",
        "outputName": "EntitiesForQueriesViews.generated.hbm.xml"
      },
      {
        "name": "EdOrgIds",
        "driver": "EdOrgIdModel",
        "outputPath": "Entities",
        "outputName": "EdOrgIds.generated.cs"
      }
    ]
  }
]
```
</details>

## Command Line Parameters

The tool accepts the following command line argument:

* `-r <repository path>`. The repository path to the location of the solution (e.g., C:\EdFi\v3).

## Building Code Generation

The solution can be built using Visual Studio 2022 or Rider 2021.3. Also, it can
be built from the command line using the following command: `dotnet build`.

![Building Code Generation](https://edfi.atlassian.net/wiki/download/attachments/22774883/image2022-3-8_9-19-26.png?version=1&modificationDate=1646752766957&cacheVersion=1&api=v2)

## Running Tests

Tests can be run using Visual Studio Test Explorer, R# Test Runner of Rider
2021.3. Alternatively, the tests can be run using the command `dotnet test`.

![Running Tests](https://edfi.atlassian.net/wiki/download/attachments/22774883/image2022-3-8_9-21-38.png?version=1&modificationDate=1646752899403&cacheVersion=1&api=v2)

## Running Approval Tests

Included in the testing suite are approval tests that validate the code
generated is as expected.

To run the tests, the following steps are required:

**Step 1:** Build the solution with Visual Studio.

**Step 2:** Set EdFi.Ods.Codegen.Console as the startup project. Note that the command argument is not necessary.

**Step 3:** Run the solution within Visual Studio.

![Running solution](https://edfi.atlassian.net/wiki/download/attachments/22774883/image2022-3-8_9-26-45.png?version=1&modificationDate=1646753206530&cacheVersion=1&api=v2)

**Step 4:** Open Test Explorer and look for the Verify_All test and run it to see if there
are any failures

![Test Explorer](https://edfi.atlassian.net/wiki/download/attachments/22774883/image2022-3-8_10-17-36.png?version=1&modificationDate=1646756257447&cacheVersion=1&api=v2)

**Step 5:** Approve any changes, if appropriate.

![Approve Changes](https://edfi.atlassian.net/wiki/download/attachments/22774883/image2022-3-8_10-18-8.png?version=1&modificationDate=1646756289080&cacheVersion=1&api=v2)
