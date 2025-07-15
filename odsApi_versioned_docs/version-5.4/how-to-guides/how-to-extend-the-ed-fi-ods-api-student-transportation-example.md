# How To: Extend the Ed-Fi ODS / API - Student Transportation Example

In this example, we will create a new domain entity called Student
Transportation. This entity will be exposed in Ed-Fi ODS / API through a new API resource
called studentTransportations. 

Before you begin:

* This example uses MetaEd to generate extended artifacts and documentation.
  MetaEd is a free tool developed by the Ed-Fi Alliance, and is the recommended way to
  add new fields to the Ed-Fi ODS / API. You should [download and install MetaEd](https://edfi.atlassian.net/wiki/spaces/METAED20/pages/23710221/Getting+Started+with+the+MetaEd+IDE) before beginning. This example goes step-by-step, so it's okay if you've never
  used MetaEd before. If you prefer to generate extended artifacts manually
  instead of using MetaEd, steps are listed in Appendix A of this page.
* This example assumes that the Ed-Fi ODS / API has been successfully downloaded
  and is running in a local development environment per the instructions in the [Getting Started](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774233/Getting+Started+-+Source+Code+Installation) documentation.
* Back up any existing code or scripts, either in source control or on your file
  system. This is important if you or your team have performed these steps before.
  The MetaEd deployment feature replaces existing files, some of which may contain
  hand-crafted customizations (e.g., to define an authorization strategy).

The steps can be summarized as:
 
* Step 1. Design Your Extension
* Step 2. Author Your Extension Using MetaEd
* Step 3. Generate Extended Technical Artifacts Using MetaEd
* Step 4. Create Extension Project in ODS / API Solution
* Step 5. Deploy your Extended Artifacts to the ODS / API Solution
* Step 6. Configure Security
* Step 7. Run Code Generation and Verify Changes

Each step is outlined in detail, below.

## Step 1. Design Your Extension

In a real project, you would take the preliminary step of designing your
extension. We'll propose a design.

This example will create a new Student Transportation entity. The ODS / API data
model has elements related to transportation (such as a School entity and a
Student entity), but there is no means to store student bus assignments, or the
distance from a student's home to school. We'll add those in our new entity, and
relate our new entity to existing parts of the data model.

The following is a diagram is a sketch showing the new Student Transportation
entity (on the left), along with its properties. Our new entity relates to School
and Student, entities which are already present in the ODS / API data model.
These existing entities are shown in gray (on the right).This example is simple,
but illustrates most of the essential concepts required to extend the Ed-Fi ODS /
API. Let's continue with the mechanics.

![Student Transportation Diagram](https://edfi.atlassian.net/wiki/download/attachments/22774474/Student-Transportation-Visio-Diagram.png?version=1&modificationDate=1641861355467&cacheVersion=1&api=v2)

## Step 2. Author Your Extension Using MetaEd

In this step, we'll create a new project in MetaEd, and author our new entity.
It's easy — but you do need to [download and install MetaEd](https://edfi.atlassian.net/wiki/spaces/METAED20/pages/23710221/Getting+Started+with+the+MetaEd+IDE) to do this step. Do that now if you haven't already.

### Step 2a. Set or Confirm MetaEd Target Version

MetaEd allows you to target different versions of the Ed-Fi data model.

The desired model for the latest ODS / API is "ed-fi-model-3.3b".

### Step 2b. Create a New Extension Project

Create a new extension by following the steps in [MetaEd IDE - Creating and Maintaining Your Extension](https://edfi.atlassian.net/wiki/spaces/METAED20/pages/23709491/MetaEd+IDE+-+Creating+and+Maintaining+Your+Extension). For this example, place your extension in a folder called
"StudentTransportation".

![Create New Extension Project](https://edfi.atlassian.net/wiki/download/attachments/22774474/image-2023-4-14_10-49-55.png?version=1&modificationDate=1721395154124&cacheVersion=1&api=v2)

### Step 2c. Update the package.json File

Open the package.json file by double-clicking on the file in the tree view to
the left and provide an appropriate name for your project. In this case we will
call it "SampleStudentTransportation".

![Update package.json](https://edfi.atlassian.net/wiki/download/attachments/22774474/image-2023-4-14_10-52-47.png?version=1&modificationDate=1721395154524&cacheVersion=1&api=v2)

Click File > Save (Ctrl + S) to save your changes.

### Step 2d. Add a Domain Entity File to Your Project

We're going to add a Domain Entity source file to the project we just created.
Note that MetaEd files are required to be organized into subfolders. Folders are
generally named after their entity type. When you followed the steps in [MetaEd IDE - Creating and Maintaining Your Extension](https://edfi.atlassian.net/wiki/spaces/METAED20/pages/23709491/MetaEd+IDE+-+Creating+and+Maintaining+Your+Extension) one of the folders you created was called "DomainEntity". We will now add a
MetaEd source file to that folder. 

Right-click on the folder DomainEntity, and select New File.

![New File](https://edfi.atlassian.net/wiki/download/attachments/22774474/NewFile.png?version=1&modificationDate=1721395154965&cacheVersion=1&api=v2)

Name the new file StudentTransportation.metaed to match the name of the new entity to be created.

![New StudentTransportation File](https://edfi.atlassian.net/wiki/download/attachments/22774474/NewFile-StudentTransportation.png?version=1&modificationDate=1721395155342&cacheVersion=1&api=v2)

Note the new file appears in the tree view to the left. Double-click on the file in the tree view to open it.

### Step 2e. Author and Save Your Extension

Type or copy and paste the code listing below into your MetaEd file:

![StudentTransportation Code](https://edfi.atlassian.net/wiki/download/attachments/22774474/NewFile-StudentTransportation-Code.png?version=1&modificationDate=1721395155721&cacheVersion=1&api=v2)

<details>
<summary>MetaEd Source for StudentTransportation Entity</summary>

```
Domain Entity StudentTransportation
    documentation "Information about a student's transportation status."
    shared string AMBusNumber
        documentation "The bus that delivers the student to the school in the morning."
        is optional
    shared string PMBusNumber
        documentation "The bus that delivers the student to his or her home in the afternoon."
        is optional
    shared int EstimatedMilesFromSchool
        documentation "The estimated distance, in miles, the student lives from the school."
        is required
    descriptor TransportationStatus
        documentation "Whether the student's transportation status is (a) Not a rider, (b) Yes, rides a bus, or (c) Yes, but waivered from riding a bus."
        is required
    
    domain entity EdFi.Student
        documentation "The student associated with the Student Transportation data."
        is part of identity
    domain entity EdFi.School
        documentation "The school the student attends."
        is part of identity
```
</details>

If you want to bulk load this extension, you need to create an interchange file.
Right-click on the Interchange folder, select New File. Name your file StudentTransportation.metaed. Replace the template text in your new Interchange source file with the
following code:

![StudentTransportation Interchange](https://edfi.atlassian.net/wiki/download/attachments/22774474/NewFile-Interchange-StudentTransportation-Code.png?version=1&modificationDate=1721395156200&cacheVersion=1&api=v2)

<details>
<summary>MetaEd Source for StudentTransportation Interchange</summary>

```
Interchange StudentTransportation
    documentation "The Student Transportation interchange describes a student's transportation status."
    domain entity StudentTransportation
```
</details>

Click File > Save (Ctrl + S) to save your changes.

## Step 3. Generate Extended Technical Artifacts Using MetaEd

In this step, we'll build our new MetaEd project. This is fairly
straightforward.

### Step 3a. Build Your Project

Click Build in the VSCode Editor to generate artifacts.

![Build](https://edfi.atlassian.net/wiki/download/attachments/22774474/Build.png?version=1&modificationDate=1721395156631&cacheVersion=1&api=v2)

Artifacts build successfully. Note that you may have to refresh the Explorer
tree to see the MetaEd Output

![Successful Build](https://edfi.atlassian.net/wiki/download/attachments/22774474/Successful%20Build%20Refresh%20Explorer.png?version=1&modificationDate=1721395156985&cacheVersion=1&api=v2)

### Step 3b. View MetaEd Output

You can expand the project in the tree view and click "MetaEdOutput" to explore
generated artifacts. The artifacts include technical output such as SQL scripts,
API metadata, and XSD used by the code generation, but also updated
documentation such as data dictionaries that add your extension definitions to the ODS /
API documentation.

![MetaEd Output](https://edfi.atlassian.net/wiki/download/attachments/22774474/MetaEdOutput.png?version=1&modificationDate=1721395157357&cacheVersion=1&api=v2)

We'll look at how to use this MetaEd output in your code below. First, we'll
need to set up our extension project in Visual Studio.

## Step 4. Create Extension Project in ODS / API Solution

This step will create the C# Extension files necessary to build your extended
solution. This step assumes you've successfully downloaded and can run the ODS /
API in a local development environment per the instructions in the [Getting Started](../getting-started/readme.md) documentation. Do that now if you haven't already.

### Step 4a. Set Up the C# Project Template

Visual Studio Project Templates can be installed by following steps in [Project Templates Installation](../getting-started/source-code-installation/project-templates-installation.md) section of this documentation.

### Step 4b. Create new Extension Project

1. To add a project to your Ed-Fi-Ods Visual Studio Solution, right-click on the Ed-Fi Extensions Folder. Select Add > New Project.

   ![Add New Project](https://edfi.atlassian.net/wiki/download/attachments/22774474/VisualStudio-AddNewProject.png?version=1&modificationDate=1641861355517&cacheVersion=1&api=v2)

2. Search and select the Ed-Fi API Extensions Project Template option and click Next. 

   ![Create Extension Project](https://edfi.atlassian.net/wiki/download/attachments/22774474/vs-create%20extension%20project.png?version=1&modificationDate=1641861354793&cacheVersion=1&api=v2)

   In the Project Name field enter EdFi.Ods.Extensions.SampleStudentTransportation and click Create.

   ![Name Extension Project](https://edfi.atlassian.net/wiki/download/attachments/22774474/vs-create%20extension%20project%202.png?version=1&modificationDate=1641861354803&cacheVersion=1&api=v2)

:::note
To ensure MetaEd outputs are correctly deployed to ODS / API extension project,
the last section of the project name should match the namespace you provided in
Step 2.c.
:::

### Step 4c. Rename the "Marker" Interface file

1. Right-click on the EdFi.Ods.Extensions.ExtensionName.nuspec file in newly created EdFi.Ods.Extensions.SampleStudentTransportation project and Rename the file to EdFi.Ods.Extensions.SampleStudentTransportation.nuspec.

   Right-click on the Marker_EdFi_Ods_Extensions_ExtensionName.cs file and Rename the file to Marker_EdFi_Ods_Extensions_SampleStudentTransportation.cs.

   ![Rename Marker File](https://edfi.atlassian.net/wiki/download/attachments/22774474/image2021-4-7_17-27-38.png?version=1&modificationDate=1641861356487&cacheVersion=1&api=v2)

2. When prompted choose to rename all references to the code element Marker_EdFi_Ods_Extensions_ExtensionName.

   ![Confirm Rename](https://edfi.atlassian.net/wiki/download/attachments/22774474/extension-rename-marker-confirm.png?version=1&modificationDate=1641861355343&cacheVersion=1&api=v2)

### Step 4d. Integrate Extension into the Solution

In this step, we'll integrate the extension into the solution.

1. Locate the EdFi.Ods.WebApi project, within the "Entry Points" folder. Right-click, select Add > Project Reference..., then select the EdFi.Ods.Extensions.SampleStudentTransportation project.

   ![Add Reference](https://edfi.atlassian.net/wiki/download/attachments/22774474/vs-extension%20add%20reference.png?version=1&modificationDate=1641861354787&cacheVersion=1&api=v2)

2. Locate any profile projects in the solution. Right-click, select Add > Project Reference..., then select the EdFi.Ods.Extensions.SampleStudentTransportation project. This step is needed only if any of the Profile resources in the
Profiles.xml document are extended, or extension entities are being constrained by a
particular Profile.

## Step 5. Deploy your Extended Artifacts to the ODS / API Solution

In this step, we'll use the MetaEd "Deploy" feature and integrate the files
you've generated with the ODS / API Solution. The MetaEd IDE can deploy the
generated artifacts necessary for an ODS / API build of an extension project. These
include the generated SQL, generated XSD, and other material.

You can easily configure the MetaEd IDE to copy the generated files to the
correct locations for the ODS / API project.

### Step 5a. Confirm MetaEd Deployment Settings

Ensure that your Ed-Fi ODS / API source directory is set properly in the MetaEd
Extension settings. In VS Code open Settings Ctrl+, and switch to the Workspace tab, find the MetaEd extension and update the "Ods
Api Deployment Directory" to point to the folder that contains the Ed-Fi-ODS and
Ed-Fi-ODS-Implementation folders.

![Settings](https://edfi.atlassian.net/wiki/download/attachments/22774474/Settings.png?version=1&modificationDate=1721395157849&cacheVersion=1&api=v2)

### Step 5b. Deploy Your Extended Artifacts

:::warning
As noted above, deployment will remove existing SQL scripts — including
modifications to establish the authorization strategy as described in the next step.
Verify that you have a source control copy or file backup of previous work before
running deployment.
:::

Deploy by clicking Deploy on the VSCode menu

![Deploy](https://edfi.atlassian.net/wiki/download/attachments/22774474/Deploy.png?version=1&modificationDate=1721395158307&cacheVersion=1&api=v2)

This will run a new build of all artifacts, and the artifacts required for your
Extended ODS / API project will be copied over to the correct locations. For
instructions on how to perform the steps manually, see Appendix A, below.

## Step 6. Configure Security

The Ed-Fi ODS / API is secure by default. One implication of this design
principle is that new entities and elements may not be accessed until an authorization
strategy is applied. This prevents accidental release of confidential
information, but does require active steps on the part of system developers to enable
access to Extensions.

Create a security SQL script called 0001-StudentTransportation_ResourceClaims.sql and place it in the Ed-Fi-ODS-Implementation/Application/
EdFi.Ods.Extensions.SampleStudentTransportation/Artifacts/MsSql/Data/Security folder (Create
'Security' folder if it does not exist). Copy the contents of the following SQL DML
script into the newly created file and save.

<details>
<summary>0001-StudentTransportation_ResourceClaims.sql</summary>

```sql
-- SPDX-License-Identifier: Apache-2.0
-- Licensed to the Ed-Fi Alliance under one or more agreements.
-- The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
-- See the LICENSE and NOTICES files in the project root for more information.

DO $$
DECLARE
    application_name varchar(30) := 'Ed-Fi ODS API';
    claim_namespace varchar(255) :=
        'http://ed-fi.org/ods/identity/claims/sample-student-transportation/studentTransportation';
    claim_name varchar(225) := 'http://ed-fi.org/ods/identity/claims/sample-student-transportation/studentTransportation';
    resource_claim_action_id INT;
    parent_resource_claim_id INT;
    parent_resource_claim_action_id INT;
    claim_set_id INT;
    claim_set_resourceclaim_action_id INT;
    claim_id bigint;
BEGIN
    SELECT rc.ResourceClaimId
    INTO parent_resource_claim_id
    FROM dbo.ResourceClaims rc
    WHERE rc.ClaimName = 'http://ed-fi.org/ods/identity/claims/domains/educationOrganizations';

    SELECT rcaa.ResourceClaimActionId INTO parent_resource_claim_action_id
    FROM dbo.ResourceClaimActionAuthorizations rcaa
    INNER JOIN dbo.ResourceClaims rc ON rcaa.ResourceClaimId = rc.ResourceClaimId
    INNER JOIN dbo.ResourceClaimActions rca ON rcaa.ResourceClaimActionId = rca.ResourceClaimActionId
    INNER JOIN dbo.Actions a ON rca.ActionId = a.ActionId
    INNER JOIN dbo.AuthorizationStrategies strat ON rcaa.AuthorizationStrategyId = strat.AuthorizationStrategyId
    WHERE a.ActionName = 'Create'
    AND rc.ClaimName = 'http://ed-fi.org/ods/identity/claims/domains/educationOrganizations'
    AND strat.AuthorizationStrategyName = 'RelationshipsWithEdOrgsAndPeople';

    INSERT INTO dbo.ResourceClaims (ResourceName, ClaimName, ParentResourceClaimId)
    VALUES ('studentTransportation', claim_name, parent_resource_claim_id)
    RETURNING ResourceClaimId
    INTO claim_id;

    SELECT a.ActionId INTO resource_claim_action_id
    FROM dbo.ResourceClaimActions rca
    INNER JOIN dbo.Actions a ON rca.ActionId = a.ActionId
    INNER JOIN dbo.ResourceClaims rc ON rca.ResourceClaimId = rc.ResourceClaimId
    WHERE rc.ResourceClaimId = claim_id AND a.ActionName = 'Create';

    INSERT INTO dbo.ResourceClaimActionAuthorizations
            (ResourceClaimActionId, AuthorizationStrategyId)
    VALUES (resource_claim_action_id, parent_resource_claim_action_id);

    -- Add to SIS Vendor claim set
    SELECT rcs.ClaimSetId INTO claim_set_id
    FROM dbo.ClaimSets rcs
    WHERE rcs.ClaimSetName = 'SIS Vendor';

    SELECT rcsaa.ResourceClaimActionAuthorizationId INTO claim_set_resourceclaim_action_id
    FROM dbo.ResourceClaimActionAuthorizations rcsaa
    INNER JOIN dbo.ResourceClaimActions rca ON rcsaa.ResourceClaimActionId = rca.ResourceClaimActionId
    INNER JOIN dbo.ResourceClaims rc ON rca.ResourceClaimId = rc.ResourceClaimId
    INNER JOIN dbo.Actions a ON rca.ActionId = a.ActionId
    WHERE rc.ResourceName = 'studentTransportation' AND a.ActionName = 'Create';

    INSERT INTO dbo.ClaimSetResourceClaimActionAuthorizations
            (ClaimSetId, ResourceClaimActionAuthorizationId)
    VALUES (claim_set_id, claim_set_resourceclaim_action_id);

    -- Add to Ed-Fi Sandbox claim set
    SELECT rcs.ClaimSetId INTO claim_set_id
    FROM dbo.ClaimSets rcs
    WHERE rcs.ClaimSetName = 'Ed-Fi Sandbox';

    INSERT INTO dbo.ClaimSetResourceClaimActionAuthorizations
            (ClaimSetId, ResourceClaimActionAuthorizationId)
    VALUES (claim_set_id, claim_set_resourceclaim_action_id);
END $$;
```
</details>

### Preventing Resource Name Conflicts

With MetaEd 2+, it is possible to create extension resources that use the same
name as an Ed-Fi standard resource. The authorization metadata supports this
through a change in behavior so it no longer uses just the resource name to identify
the resource, but instead uses the ClaimName. To prevent possible naming
conflicts, the claim name's URI value should include the schema representation, using
the following format:

http://ed-fi.org/ods/identity/claims/{schema}/{resourceName}

The URI representation of the schema name should be derived by splitting the
terms in the name of the extension, inserting hyphens and converting to lower case.
For example, "SampleStudentTransportation" would be separated into "Sample",
"Student" and "Transportation" and then combined with hyphens and converted to
lower case as "sample-student-transportation".

The resource name should be the camel-cased (also known as "medial capitals"),
singularized name of the resource (e.g., "studentTransportation" not
"StudentTransportation" or "studentTransportations").

Note that in 0001-StudentTransportation_ResourceClaims.sql script above, the resulting ClaimName value is "http://ed-fi.org/ods/identity/claims/sample-student-transportation/studentTransportation".

## Step 7. Run Code Generation and Verify Changes 

Save all modified files, close Ed-Fi-ODS.sln, and re-run the code generation
steps outlined in the [Getting Started Guide](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V61/pages/18812000/Getting+Started+-+Source+Code+Installation) (i.e., from a PowerShell prompt run `Initialize-PowershellForDevelopment.ps` script, followed by the `initdev` command). Then, run the application and view the Ed-Fi ODS / API in the Swagger
UI. The following new API resource should be visible:

![Swagger UI](https://edfi.atlassian.net/wiki/download/attachments/22774474/extension%20swagger.png?version=1&modificationDate=1641861356440&cacheVersion=1&api=v2)

## Next Steps & Further Information

Congratulations, you've successfully extended an instance of the Ed-Fi ODS /
API. The Ed-Fi Extension in this example is fairly simple. It's a good place to
start, but most enterprise users have more complicated needs. The following links
are useful for developing more complex extensions and getting the development
work into production.

* [Student Transcript Extension Example](how-to-extend-the-ed-fi-ods-api-student-transcript-example.md). Working through this example is a great next step if you want to move on to
more complicated extension scenarios.
* [The MetaEd Cookbook](https://edfi.atlassian.net/wiki/spaces/METAED20/pages/23709867/Cookbook+-+Introduction). This documentation provides excellent examples of common scenarios, from the
simple to very complex.

## Appendix A: Adding Manually Created Extensions

### Step 1. Set Up the C# Project Template

Visual Studio Project Templates can be installed by following steps in [Project Templates Installation](../getting-started/source-code-installation/project-templates-installation.md) section of this documentation.

### Step 2. Create new Extension Project

1. To add a project to your Ed-Fi-Ods Visual Studio Solution, right-click on the Ed-Fi Extensions Folder. Select Add > New Project.

   ![Add New Project](https://edfi.atlassian.net/wiki/download/attachments/22774474/VisualStudio-AddNewProject.png?version=1&modificationDate=1641861355517&cacheVersion=1&api=v2)

2. Search and select the Ed-Fi API Extensions Project Template option and click Next. 

   ![Create Extension Project](https://edfi.atlassian.net/wiki/download/attachments/22774474/vs-create%20extension%20project.png?version=1&modificationDate=1641861354793&cacheVersion=1&api=v2)
   
   In the Project Name field, enter EdFi.Ods.Extensions.SampleStudentTransportation and click Create.

   ![Name Extension Project](https://edfi.atlassian.net/wiki/download/attachments/22774474/vs-create%20extension%20project%202.png?version=1&modificationDate=1641861354803&cacheVersion=1&api=v2)

### Step 3. Rename the "Marker" Interface File

1. Right-click on the EdFi.Ods.Extensions.ExtensionName.nuspec file in newly created EdFi.Ods.Extensions.SampleStudentTransportation project and Rename the file to EdFi.Ods.Extensions.SampleStudentTransportation.nuspec.

   Right-click on the Marker_EdFi_Ods_Extensions_ExtensionName.cs file and Rename the file to Marker_EdFi_Ods_Extensions_SampleStudentTransportation.cs.

   ![Rename Marker File](https://edfi.atlassian.net/wiki/download/attachments/22774474/image2021-4-7_17-31-14.png?version=1&modificationDate=1641861356493&cacheVersion=1&api=v2)

2. When prompted choose to rename all references to the code element Marker_EdFi_Ods_Extensions_SampleStudentTransportation.

   ![Confirm Rename](https://edfi.atlassian.net/wiki/download/attachments/22774474/extension-rename-marker-confirm.png?version=1&modificationDate=1641861355343&cacheVersion=1&api=v2)

### Step 4. Integrate Extension into the Solution

In this step, we'll integrate the extension into the solution.

1. Locate the EdFi.Ods.WebApi project, within the "Entry Points" folder. Right-click, select Add > Project Reference..., then select the EdFi.Ods.Extensions.SampleStudentTransportation project.

   ![Add Reference](https://edfi.atlassian.net/wiki/download/attachments/22774474/vs-extension%20add%20reference.png?version=1&modificationDate=1641861354787&cacheVersion=1&api=v2)

2. Locate any profile projects in the solution. Right-click, select Add > Project Reference..., then select the EdFi.Ods.Extensions.SampleStudentTransportation project. This step is needed only if any of the Profile resources in the
Profiles.xml document are extended, or extension entities are being constrained by a
particular Profile.

### Step 5. Add Extension Metadata

The code listings in this section use the sample extension material from
Ed-Fi-ODS/Samples/Extensions/StudentTransportation.

1. Map Artifacts

   * Copy the metadata files to the implementation project.

     ```
     xcopy /y 
     "Ed-Fi-ODS\Samples\Extensions\StudentTransportation\StudentTransportationMetaEd\MetaEdOutput\samplestudenttransportation\Database\SQLServer\ODS\Structure" 
     "Ed-Fi-ODS-Implementation\Application\EdFi.Ods.Extensions.SampleStudentTransportation\Artifacts\MsSql\Structure\Ods\*"
     
     xcopy /y 
     "Ed-Fi-ODS\Samples\Extensions\StudentTransportation\StudentTransportationMetaEd\MetaEdOutput\samplestudenttransportation\Database\PostgreSQL\ODS\Structure" 
     "Ed-Fi-ODS-Implementation\Application\EdFi.Ods.Extensions.SampleStudentTransportation\Artifacts\PgSql\Structure\Ods\*"
     
     xcopy /y 
     "Ed-Fi-ODS\Samples\Extensions\StudentTransportation\StudentTransportationMetaEd\MetaEdOutput\samplestudenttransportation\ApiMetadata" 
     "Ed-Fi-ODS-Implementation\Application\EdFi.Ods.Extensions.SampleStudentTransportation\Artifacts\Metadata\*"
     
     xcopy /y 
     "Ed-Fi-ODS\Samples\Extensions\StudentTransportation\StudentTransportationMetaEd\MetaEdOutput\samplestudenttransportation\XSD" 
     "Ed-Fi-ODS-Implementation\Application\EdFi.Ods.Extensions.SampleStudentTransportation\Artifacts\Schemas\*"
     
     xcopy /y 
     "Ed-Fi-ODS\Samples\Extensions\StudentTransportation\StudentTransportationMetaEd\MetaEdOutput\samplestudenttransportation\Interchange" 
     "Ed-Fi-ODS-Implementation\Application\EdFi.Ods.Extensions.SampleStudentTransportation\Artifacts\Schemas\*"
     ```

### Step 6. Configure Security

The Ed-Fi ODS / API is secure by default. One implication of this design
principle is that new entities and elements may not be accessed until an authorization
strategy is applied. This prevents accidental release of confidential
information, but does require active steps on the part of system developers to enable
access to Extensions.

Create a security SQL script called 0001-StudentTransportation_ResourceClaims.sql and place it in the Ed-Fi-ODS-Implementation/Application/
EdFi.Ods.Extensions.SampleStudentTransportation/Artifacts/MsSql/Data/Security folder (Create
'Security' folder if it does not exist). Copy the contents of the following SQL DML
script into the newly created file and save.

<details>
<summary>0001-StudentTransportation_ResourceClaims.sql</summary>

```sql
-- SPDX-License-Identifier: Apache-2.0
-- Licensed to the Ed-Fi Alliance under one or more agreements.
-- The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
-- See the LICENSE and NOTICES files in the project root for more information.

DO $$
DECLARE
    application_name varchar(30) := 'Ed-Fi ODS API';
    claim_namespace varchar(255) :=
        'http://ed-fi.org/ods/identity/claims/sample-student-transportation/studentTransportation';
    claim_name varchar(225) := 'http://ed-fi.org/ods/identity/claims/sample-student-transportation/studentTransportation';
    resource_claim_action_id INT;
    parent_resource_claim_id INT;
    parent_resource_claim_action_id INT;
    claim_set_id INT;
    claim_set_resourceclaim_action_id INT;
    claim_id bigint;
BEGIN
    SELECT rc.ResourceClaimId
    INTO parent_resource_claim_id
    FROM dbo.ResourceClaims rc
    WHERE rc.ClaimName = 'http://ed-fi.org/ods/identity/claims/domains/educationOrganizations';

    SELECT rcaa.ResourceClaimActionId INTO parent_resource_claim_action_id
    FROM dbo.ResourceClaimActionAuthorizations rcaa
    INNER JOIN dbo.ResourceClaims rc ON rcaa.ResourceClaimId = rc.ResourceClaimId
    INNER JOIN dbo.ResourceClaimActions rca ON rcaa.ResourceClaimActionId = rca.ResourceClaimActionId
    INNER JOIN dbo.Actions a ON rca.ActionId = a.ActionId
    INNER JOIN dbo.AuthorizationStrategies strat ON rcaa.AuthorizationStrategyId = strat.AuthorizationStrategyId
    WHERE a.ActionName = 'Create'
    AND rc.ClaimName = 'http://ed-fi.org/ods/identity/claims/domains/educationOrganizations'
    AND strat.AuthorizationStrategyName = 'RelationshipsWithEdOrgsAndPeople';

    INSERT INTO dbo.ResourceClaims (ResourceName, ClaimName, ParentResourceClaimId)
    VALUES ('studentTransportation', claim_name, parent_resource_claim_id)
    RETURNING ResourceClaimId
    INTO claim_id;

    SELECT a.ActionId INTO resource_claim_action_id
    FROM dbo.ResourceClaimActions rca
    INNER JOIN dbo.Actions a ON rca.ActionId = a.ActionId
    INNER JOIN dbo.ResourceClaims rc ON rca.ResourceClaimId = rc.ResourceClaimId
    WHERE rc.ResourceClaimId = claim_id AND a.ActionName = 'Create';

    INSERT INTO dbo.ResourceClaimActionAuthorizations
            (ResourceClaimActionId, AuthorizationStrategyId)
    VALUES (resource_claim_action_id, parent_resource_claim_action_id);

    -- Add to SIS Vendor claim set
    SELECT rcs.ClaimSetId INTO claim_set_id
    FROM dbo.ClaimSets rcs
    WHERE rcs.ClaimSetName = 'SIS Vendor';

    SELECT rcsaa.ResourceClaimActionAuthorizationId INTO claim_set_resourceclaim_action_id
    FROM dbo.ResourceClaimActionAuthorizations rcsaa
    INNER JOIN dbo.ResourceClaimActions rca ON rcsaa.ResourceClaimActionId = rca.ResourceClaimActionId
    INNER JOIN dbo.ResourceClaims rc ON rca.ResourceClaimId = rc.ResourceClaimId
    INNER JOIN dbo.Actions a ON rca.ActionId = a.ActionId
    WHERE rc.ResourceName = 'studentTransportation' AND a.ActionName = 'Create';

    INSERT INTO dbo.ClaimSetResourceClaimActionAuthorizations
            (ClaimSetId, ResourceClaimActionAuthorizationId)
    VALUES (claim_set_id, claim_set_resourceclaim_action_id);

    -- Add to Ed-Fi Sandbox claim set
    SELECT rcs.ClaimSetId INTO claim_set_id
    FROM dbo.ClaimSets rcs
    WHERE rcs.ClaimSetName = 'Ed-Fi Sandbox';

    INSERT INTO dbo.ClaimSetResourceClaimActionAuthorizations
            (ClaimSetId, ResourceClaimActionAuthorizationId)
    VALUES (claim_set_id, claim_set_resourceclaim_action_id);
END $$;
```
</details>

### Step 7. Run Initdev

Save all modified files, close Ed-Fi-ODS.sln, and re-run the code generation
steps outlined in the [Getting Started Guide](../getting-started/readme.md) (i.e., from a PowerShell prompt run `Initialize-PowershellForDevelopment.ps` script, followed by the `initdev` command). Then, run the application and view the Ed-Fi ODS / API in the Swagger
UI. The following new API resource should be visible:

![Swagger UI](https://edfi.atlassian.net/wiki/download/attachments/22774474/extension%20swagger.png?version=1&modificationDate=1641861356440&cacheVersion=1&api=v2)

## Downloads
The following GitHub links contain source files for this extensibility sample.

* [Student Transportation MetaEd Source](https://github.com/Ed-Fi-Alliance-oss/Ed-Fi-ODS/tree/v5.4/Samples/Extensions/StudentTransportation/StudentTransportationMetaEd)
* [Student Transportation Generated Artifacts](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/tree/v5.4/Samples/Extensions/StudentTransportation/StudentTransportationMetaEd/MetaEdOutput/SampleStudentTransportation)
