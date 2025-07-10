# How To: Add API Composites to the Ed-Fi ODS / API Solution

This section outlines the steps necessary to integrate and activate the Ed-Fi
Composite definitions for use in an Ed-Fi ODS / API. It is assumed that the Ed-Fi
ODS / API has been successfully downloaded and is running in a local environment
per the instructions in the [Getting Started](../getting-started/readme.md) documentation.

The steps in Visual Studio can be summarized as:

* Step 1. Create the Composites Project
* Step 2. Integrate Composites into the Solution
* Step 3. Verify Changes

Each step is outlined in detail, below.

## Step 1. Create the Composites Project

### Step 1.1. Add a Composite Project Using the Visual Studio Project Template.

Visual Studio Project Template can be installed by following the steps in the [Project Templates Installation](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774290/Project+Templates+Installation) section of this documentation.

* To add a project to your Ed-Fi-Ods Visual Studio Solution, right-click on the "Composites" folder. Select Add > New Project.
* In the "Add New Project" dialog, find and select the "Ed-Fi API Composites Project Template" entry as shown below. Click Next.

![Image](https://edfi.atlassian.net/wiki/download/thumbnails/22774820/composite-project-template.png?version=1&modificationDate=1641861363040&cacheVersion=1&api=v2&width=1024&height=680)

* Enter the project name for the new project and click Create. The suggested naming convention for this type of project is something like EdFi.Ods.Composites.MyComposites.

![Image](https://edfi.atlassian.net/wiki/download/thumbnails/22774820/composite-project-template2.png?version=1&modificationDate=1641861363023&cacheVersion=1&api=v2&width=1024&height=680)

### Step 1.2. Update the Marker Interface file.

To integrate the Composite with the API, start by ensuring you have a marker
interface in the root of your Composites project.

This interface is an idiom used in the Ed-Fi Visual Studio Solution to enable a
strongly typed mechanism for obtaining a reference to the .NET assembly. If you
used the Visual Studio Project template to create your composite, a file will
already exist — but you'll need to rename the interface and the file to match the
convention (e.g., Marker_EdFi_Ods_Composites_MyComposites.cs). The marker interface file should have the following code:

```csharp
namespace EdFi.Ods.Composites.MyComposites
{
    public interface Marker_EdFi_Ods_Composites_MyComposites { }
}
```

### Step 1.3. Update the Composites.xml file to add the appropriate composite definition.

The Visual Studio Project Template creates an empty sample Composites.xml file, replace its contents with the following:

```xml
<?xml version="1.0" encoding="utf-8"?>
<CompositeMetadata organizationCode="ed-fi">
  <Category displayName="My Sample Composites" name="MyComposite">
    <Routes>
      <Route relativeRouteTemplate="/sections/{Section.Id}/{compositeName}" />
    </Routes>
    <Composites>
      <Composite name="Student">
        <Specification>
          <Parameter name="Section.Id" filterPath="StudentSectionAssociation->Section.Id" />
        </Specification>
        <BaseResource name="Student">
          <Property name="StudentUniqueId" />
          <Property name="Name" />
        </BaseResource>
        <LinkedCollection name="StudentSectionAssociations">
          <Resource name="StudentSectionAssociation">
            <Property name="BeginDate" />
            <Property name="EndDate" />
            <Property name="HomeroomIndicator" />
            <Property name="RepeatIdentifierIndicator" />
            <Property name="TeacherStudentDataLinkExclusion" />
          </Resource>
          <LinkedResource name="Section">
            <Property name="Id" />
            <Property name="SectionIdentifier" />
          </LinkedResource>
        </LinkedCollection>
      </Composite>
    </Composites>
  </Category>
</CompositeMetadata>
```

Consult [API Composite Resources](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774341/API+Composite+Resources) for guidance.

:::warning
Composites cannot include resource model members added via Ed-Fi Extensions. ODS
/ API composite definitions currently support only the resource models from the
Ed-Fi Core.
:::

The `CompositeMetadata` attribute organizationCode is a required attribute and indicates the
Organization to which the composite belongs. This value is carried from the XML definition
all the way into the API route definitions. The `organizationCode` in combination with the `Category` name are used to identify the composite being requested from the API.

### Step 1.4. Save the Project.

## Step 2. Integrate Composites into the Solution

To integrate the Composite Resources into the solution, add a reference to new
Composites project you constructed in the previous step in the EdFi.Ods.WebApi project (located in the "Entry Points" folder).

## Step 3. Verify Changes 

Save all modified files, then run the application and view the Ed-Fi ODS / API
using Swagger. The following new API Composite resource should be available:

:::note
You may have to clear your browser cache in order for Swagger UI to display the
new resource.
:::

![Image](https://edfi.atlassian.net/wiki/download/attachments/22774820/composites3.png?version=1&modificationDate=1641861363083&cacheVersion=1&api=v2)

The `organizationCode` mentioned in Step 1.3 ("ed-fi" in this example) can be seen in the Composite
URLs above (e.g., `/ed-fi/composites/MyComposite/Students`). To successfully retrieve a composite, this value (defined in the XML
definition) must be present as the first segment of a composite URL.

## Downloads
The following GitHub link contains source files for the Composite described in
this article:

[Composite Source Files](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/tree/v5.4/Samples/Composites)
