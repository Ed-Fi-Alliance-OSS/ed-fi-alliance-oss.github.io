# How To: Extend the Ed-Fi ODS / API - Student Transportation Example

In this example, we will create a new domain entity called **Student Transportation**. This entity will be exposed in Ed-Fi ODS / API through a new API resource called **studentTransportations**.

**Before you begin:**

* This example uses **MetaEd** to generate extended artifacts and documentation. MetaEd is a free tool developed by the Ed-Fi Alliance, and is the recommended way to add new fields to the Ed-Fi ODS / API. You should [download and install MetaEd](https://techdocs.ed-fi.org/display/METAED20/MetaEd+IDE+-+Installation) before beginning. This example goes step-by-step, so it's okay if you've never used MetaEd before. If you prefer to generate extended artifacts manually instead of using MetaEd, steps are listed in **Appendix A** of this page.
* This example assumes that the Ed-Fi ODS / API has been successfully downloaded and is running in a local development environment per the instructions in the [Getting Started](../getting-started/source-code-installation/readme.md) documentation.
* **Back up any existing code or scripts**, either in source control or on your file system. This is important if you or your team have performed these steps before. The MetaEd deployment feature replaces existing files, some of which may contain hand-crafted customizations (e.g., to define an authorization strategy).

The steps can be summarized as:

1. **Design Your Extension**
2. **Author Your Extension Using MetaEd**
3. **Generate Extended Technical Artifacts Using MetaEd**
4. **Create Extension Project in ODS / API Solution**
5. **Deploy your Extended Artifacts to the ODS / API Solution**
6. **Configure Security**
7. **Run Code Generation and Verify Changes**

Each step is outlined in detail, below.

## Step 1. **Design Your Extension**

In a real project, you would take the preliminary step of designing your extension. We'll propose a design.

This example will create a new **Student Transportation** entity. The ODS / API data model has elements related to transportation (such as a **School** entity and a **Student** entity), but there is no means to store student bus assignments, or the distance from a student's home to school. We'll add those in our new entity, and relate our new entity to existing parts of the data model.

The following is a diagram is a sketch showing the new **Student Transportation** entity (on the left), along with its properties. Our new entity relates to **School** and **Student**, entities which are already present in the ODS / API data model. These existing entities are shown in gray (on the right).

![Student Transportation Entity Diagram](https://edfi.atlassian.net/wiki/download/attachments/25493729/Student-Transportation-Visio-Diagram.png?version=1&modificationDate=1699456118357&cacheVersion=1&api=v2)

This example is simple, but illustrates most of the essential concepts required to extend the Ed-Fi ODS / API. Let's continue with the mechanics.

## Step 2. Author Your Extension Using MetaEd

In this step, we'll create a new project in MetaEd, and author our new entity. It's easy — but you do need to [download and install MetaEd](https://techdocs.ed-fi.org/display/METAED20/MetaEd+IDE+-+Installation) to do this step. Do that now if you haven't already.

### Step 2a. Set or Confirm MetaEd Target Version

MetaEd allows you to target different versions of the Ed-Fi technology stack and data model. Confirm that your MetaEd IDE is targeting v7.1 by following the instructions in the [Version Targeting](https://edfi.atlassian.net/wiki/spaces/METAED20/pages/23709491/MetaEd+IDE+-+Creating+and+Maintaining+Your+Extension#MetaEdIDE-CreatingandMaintainingYourExtension-Step4.AddtheCorrectDataModelProject) documentation for the MetaEd IDE.

The desired model for the latest ODS / API is "ed-fi-model-5.0".

### Step 2b. Create a New Extension Project

Create a new extension by following the steps in [MetaEd IDE - Creating and Maintaining Your Extension](https://edfi.atlassian.net/wiki/spaces/METAED20/pages/23709491/MetaEd+IDE+-+Creating+and+Maintaining+Your+Extension). For this example, place your extension in a folder called "StudentTransportation".

![Create new extension project](https://edfi.atlassian.net/wiki/download/attachments/25493729/image-2023-4-14_10-49-55.png?version=1&modificationDate=1699456117197&cacheVersion=1&api=v2)

### Step 2c. **Update the package.json File**

Open the **package.json** file by double-clicking on the file in the tree view to the left and provide an appropriate name for your project. In this case we will call it **"SampleStudentTransportation"**.

![Update package.json file](https://edfi.atlassian.net/wiki/download/attachments/25493729/image-2023-4-14_10-52-47.png?version=1&modificationDate=1699456117190&cacheVersion=1&api=v2)

Click **File > Save** (**Ctrl + S**) to save your changes.

### Step 2d. **Add a Domain Entity File to Your Project**

We're going to add a **Domain Entity** source file to the project we just created. Note that MetaEd files are required to be organized into subfolders. Folders are generally named after their entity type. When you followed the steps in [MetaEd IDE - Creating and Maintaining Your Extension](https://edfi.atlassian.net/wiki/spaces/METAED20/pages/23709491/MetaEd+IDE+-+Creating+and+Maintaining+Your+Extension) one of the folders you created was called **"DomainEntity"**. We will now add a MetaEd source file to that folder.

**Right-click** on the folder 

![Add Domain Entity file](https://edfi.atlassian.net/wiki/download/attachments/25493729/NewFile.png?version=1&modificationDate=1699456117180&cacheVersion=1&api=v2)

Name the new file **StudentTransportation.metaed** to match the name of the new entity to be created.

Note the new file appears in the tree view to the left. **Double-click** on the file in the tree view to open it.

### Step 2e. **Author and Save Your Extension**

Type or copy and paste the code listing below into your MetaEd file:

![MetaEd source code for StudentTransportation](https://edfi.atlassian.net/wiki/download/attachments/25493729/NewFile-StudentTransportation-Code.png?version=1&modificationDate=1699456117160&cacheVersion=1&api=v2)

<details>
<summary>MetaEd Source for StudentTransportation Entity</summary>

```none
Domain Entity StudentTransportation
    documentation "StudentTransportation"
    domain entity EdFi.School
        documentation "The school to and from which the student is being transported."
        is part of identity
    domain entity EdFi.Student
        documentation "The student being transported."
        is part of identity
    string AMBusNumber
        documentation "The bus that delivers the student to the school in the morning."
        is part of identity
        max length 6
    string PMBusNumber
        documentation "The bus that delivers the student home in the afternoon."
        is part of identity
        max length 6
    decimal EstimatedMilesFromSchool
        documentation "The estimated distance, in miles, the student lives from the school."
        is required
        total digits 5
        decimal places 2
```

</details>


Click **File > Save** (**Ctrl + S**) to save your changes.

## Step 3. **Generate Extended Technical Artifacts Using MetaEd**

In this step, we'll build our new MetaEd project. This is fairly straightforward.

### Step 3a. **Build Your Project**

Click **Build** in the VSCode Editor to generate artifacts.

![Build MetaEd project](https://edfi.atlassian.net/wiki/download/attachments/25493729/Build.png?version=1&modificationDate=1699456117040&cacheVersion=1&api=v2)

Artifacts build successfully. Note that you may have to refresh the Explorer tree to see the **MetaEd Output**.

![Successful build, refresh Explorer](https://edfi.atlassian.net/wiki/download/attachments/25493729/Successful%20Build%20Refresh%20Explorer.png?version=1&modificationDate=1699456117020&cacheVersion=1&api=v2)

### Step 3b. **View MetaEd Output**

You can expand the project in the tree view and click **MetaEdOutput** to explore generated artifacts. The artifacts include technical output such as SQL scripts, API metadata, and XSD used by the code generation, but also updated documentation such as data dictionaries that add your extension definitions to the ODS / API documentation.

![View MetaEd output](https://edfi.atlassian.net/wiki/download/attachments/25493729/MetaEdOutput.png?version=1&modificationDate=1699456117007&cacheVersion=1&api=v2)

We'll look at how to use this MetaEd output in your code below. First, we'll need to set up our extension project in Visual Studio.

## Step 4. **Create Extension Project in ODS / API Solution**

This step will create the C# Extension files necessary to build your extended solution. This step assumes you've successfully downloaded and can run the ODS / API in a local development environment per the instructions in the [Getting Started](../getting-started/source-code-installation/readme.md) documentation. Do that now if you haven't already.

### Step 4a. **Set Up the C# Project Template**

Visual Studio Project Templates can be installed by following steps in [Project Templates Installation](../getting-started/source-code-installation/project-templates-installation.md) section of this documentation.

### Step 4b. **Create new Extension Project**

1. To add a project to your Ed-Fi-Ods Visual Studio Solution, **right-click** on the **Ed-Fi Extensions Folder**. Select **Add > New Project**.

![Add new project in Visual Studio](https://edfi.atlassian.net/wiki/download/attachments/25493729/VisualStudio-AddNewProject.png?version=1&modificationDate=1699456118393&cacheVersion=1&api=v2)

2. Search and select the **Ed-Fi API Extensions Project Template** option and click **Next**.

![Select Ed-Fi API Extensions Project Template](https://edfi.atlassian.net/wiki/download/attachments/25493729/vs-create%20extension%20project.png?version=1&modificationDate=1699456117240&cacheVersion=1&api=v2)

3. In the **Project Name** field enter **EdFi.Ods.Extensions.SampleStudentTransportation** and click **Create**.

![Name the new extension project](https://edfi.atlassian.net/wiki/download/attachments/25493729/vs-create%20extension%20project%202.png?version=1&modificationDate=1699456117250&cacheVersion=1&api=v2)

:::note
To ensure MetaEd outputs are correctly deployed to ODS / API extension project, the last section of the project name should match the namespace you provided in Step 2c.
:::

#### Step 4c. **Rename the "Marker" Interface file**

4c.1. **Right-click** on the **EdFi.Ods.Extensions.ExtensionName.nuspec** file in newly created **EdFi.Ods.Extensions.SampleStudentTransportation** project and **Rename** the file to **EdFi.Ods.Extensions.SampleStudentTransportation.nuspec**.

**Right-click** on the **Marker_EdFi_Ods_Extensions_ExtensionName.cs** file and **Rename** the file to **Marker_EdFi_Ods_Extensions_SampleStudentTransportation.cs**.

![Rename marker interface file](https://edfi.atlassian.net/wiki/download/thumbnails/25493729/image2021-4-7_17-27-38.png?version=1&modificationDate=1699456118873&cacheVersion=1&api=v2&width=593&height=505)

4c.2. When prompted choose to **rename all references** to the code element **Marker_EdFi_Ods_Extensions_ExtensionName**.

![Rename marker confirm dialog](https://edfi.atlassian.net/wiki/download/attachments/25493729/extension-rename-marker-confirm.png?version=1&modificationDate=1699456118253&cacheVersion=1&api=v2)

#### Step 4d. **Integrate Extension into the Solution**

In this step, we'll integrate the extension into the solution.

4d.1. Locate the **EdFi.Ods.WebApi** project, within the **"Entry Points"** folder. **Right-click**, select **Add > Project Reference...**, then select the **EdFi.Ods.Extensions.SampleStudentTransportation** project.

![Add project reference](https://edfi.atlassian.net/wiki/download/attachments/25493729/vs-extension%20add%20reference.png?version=1&modificationDate=1699456117233&cacheVersion=1&api=v2)

4d.2. Locate any **profile projects** in the solution. **Right-click**, select **Add > Project Reference...**, then select the **EdFi.Ods.Extensions.SampleStudentTransportation** project. This step is needed only if any of the **Profile resources** in the **Profiles.xml** document are extended, or extension entities are being constrained by a particular Profile. 

## Step 5. **Deploy your Extended Artifacts to the ODS / API Solution**

In this step, we'll use the MetaEd **"Deploy"** feature and integrate the files you've generated with the ODS / API Solution. The MetaEd IDE can deploy the generated artifacts necessary for an ODS / API build of an extension project. These include the generated SQL, generated XSD, and other material.

You can easily configure the MetaEd IDE to copy the generated files to the correct locations for the ODS / API project.

### Step 5a. **Confirm MetaEd Deployment Settings**

Ensure that your **Ed-Fi ODS / API source directory** is set properly in the MetaEd Extension settings. In VS Code open **Settings** (**Ctrl+,**), and switch to the **Workspace** tab, find the **MetaEd extension** and update the **"Ods Api Deployment Directory"** to point to the folder that contains the **Ed-Fi-ODS** and **Ed-Fi-ODS-Implementation** folders.

![MetaEd extension settings](https://edfi.atlassian.net/wiki/download/attachments/25493729/Settings.png?version=1&modificationDate=1699456116987&cacheVersion=1&api=v2)

### Step 5b. **Deploy Your Extended Artifacts**

:::warning
As noted above, deployment will remove existing SQL scripts — including modifications to establish the authorization strategy as described in the next step. Verify that you have a source control copy or file backup of previous work before running deployment.
:::

Deploy by clicking **Deploy** on the VSCode menu

![Deploy MetaEd artifacts](https://edfi.atlassian.net/wiki/download/attachments/25493729/Deploy.png?version=1&modificationDate=1699456117010&cacheVersion=1&api=v2)

This will run a new build of all artifacts, and the artifacts required for your Extended ODS / API project will be copied over to the correct locations. For instructions on how to perform the steps manually, see **Appendix A**, below.

## Step 6. **Configure Security**

The Ed-Fi ODS / API is secure by default. One implication of this design principle is that new entities and elements may not be accessed until an **authorization strategy** is applied. This prevents accidental release of confidential information, but does require active steps on the part of system developers to enable access to **Extensions**.

Create a security SQL script called **0001-StudentTransportation_ResourceClaims.sql** and place it in the **Ed-Fi-ODS-Implementation/Application/EdFi.Ods.Extensions.SampleStudentTransportation/Versions/1.0.0/Standard/5.0.0/Artifacts/MsSql/Data/Security** folder (**Create 'Security' folder if it does not exist**). Copy the contents of the following SQL DML script into the newly created file and save.

<details>
<summary>0001-StudentTransportation_ResourceClaims.sql</summary>

```sql
-- SQL DML script content goes here (see Confluence source for actual script)
```

</details>

### **Preventing Resource Name Conflicts**

With MetaEd 2.0+, it is possible to create extension resources that use the same name as an Ed-Fi standard resource. The authorization metadata supports this through a change in behavior so it no longer uses just the resource name to identify the resource, but instead uses the **ClaimName**. To prevent possible naming conflicts, the claim name's URI value should include the schema representation, using the following format:

    http://ed-fi.org/ods/identity/claims/{schema}/{resourceName}

The URI representation of the schema name should be derived by splitting the terms in the name of the extension, inserting hyphens and converting to lower case. For example, **"SampleStudentTransportation"** would be separated into **"Sample"**, **"Student"** and **"Transportation"** and then combined with hyphens and converted to lower case as **"sample-student-transportation"**.

The resource name should be the camel-cased (also known as **"medial capitals"**), singularized name of the resource (e.g., **"studentTransportation"** not **"StudentTransportation"** or **"studentTransportations"**).

Note that in **0001-StudentTransportation_ResourceClaims.sql** script above, the resulting **ClaimName** value is **"http://ed-fi.org/ods/identity/claims/sample-student-transportation/studentTransportation"**.

## Step 7. **Run Code Generation and Verify Changes**

Save all modified files, close **Ed-Fi-ODS.sln**, and re-run the code generation steps outlined in the **Getting Started Guide** (i.e., from a PowerShell prompt run **Initialize-PowershellForDevelopment.ps** script, followed by the **initdev** command). Then, run the application and view the Ed-Fi ODS / API in the **Swagger UI**. The following new API resource should be visible:

![New API resource in Swagger UI](https://edfi.atlassian.net/wiki/download/attachments/25493729/extension%20swagger.png?version=1&modificationDate=1699456118837&cacheVersion=1&api=v2)

## **Next Steps & Further Information**

Congratulations, you've successfully extended an instance of the Ed-Fi ODS / API. The Ed-Fi Extension in this example is fairly simple. It's a good place to start, but most enterprise users have more complicated needs. The following links are useful for developing more complex extensions and getting the development work into production.

* [**Student Transcript Extension Example**](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V71/pages/25493733/How+To+Extend+the+Ed-Fi+ODS+API+-+Student+Transcript+Example). Working through this example is a great next step if you want to move on to more complicated extension scenarios.
* [**The MetaEd Cookbook**](https://edfi.atlassian.net/wiki/spaces/METAED20/pages/23709491/MetaEd+IDE+-+Creating+and+Maintaining+Your+Extension). This documentation provides excellent examples of common scenarios, from the simple to very complex.

## Appendix A: **Adding Manually Created Extensions**

### Step 1. **Set Up the C# Project Template**

Visual Studio Project Templates can be installed by following steps in **Project Templates Installation** section of this documentation.

### Step 2. **Create new Extension Project**

2.1. To add a project to your **Ed-Fi-Ods Visual Studio Solution**, **right-click** on the **Ed-Fi Extensions Folder**. Select **Add > New Project**.

![Add new project in Visual Studio](https://edfi.atlassian.net/wiki/download/attachments/25493729/VisualStudio-AddNewProject.png?version=1&modificationDate=1699456118393&cacheVersion=1&api=v2)

2.2. Search and select the **Ed-Fi API Extensions Project Template** option and click **Next**.

![Select Ed-Fi API Extensions Project Template](https://edfi.atlassian.net/wiki/download/attachments/25493729/vs-create%20extension%20project.png?version=1&modificationDate=1699456117240&cacheVersion=1&api=v2)

In the **Project Name** field, enter **EdFi.Ods.Extensions.SampleStudentTransportation** and click **Create**.

![Name the new extension project](https://edfi.atlassian.net/wiki/download/attachments/25493729/vs-create%20extension%20project%202.png?version=1&modificationDate=1699456117250&cacheVersion=1&api=v2)

### Step 3. **Rename the "Marker" Interface File**

3.1.  **Right-click** on the **EdFi.Ods.Extensions.ExtensionName.nuspec** file in newly created **EdFi.Ods.Extensions.SampleStudentTransportation** project and **Rename** the file to **EdFi.Ods.Extensions.SampleStudentTransportation.nuspec**.

**Right-click** on the **Marker_EdFi_Ods_Extensions_ExtensionName.cs** file and **Rename** the file to **Marker_EdFi_Ods_Extensions_SampleStudentTransportation.cs**.

3.2. When prompted choose to **rename all references** to the code element **Marker_EdFi_Ods_Extensions_SampleStudentTransportation**.

![Rename marker confirm dialog](https://edfi.atlassian.net/wiki/download/attachments/25493729/extension-rename-marker-confirm.png?version=1&modificationDate=1699456118253&cacheVersion=1&api=v2)

### Step 4. **Integrate Extension into the Solution**

In this step, we'll integrate the extension into the solution.

4.1. Locate the **EdFi.Ods.WebApi** project, within the **"Entry Points"** folder. **Right-click**, select **Add > Project Reference...**, then select the **EdFi.Ods.Extensions.SampleStudentTransportation** project.

![Add project reference](https://edfi.atlassian.net/wiki/download/thumbnails/25493729/vs-extension%20add%20reference.png?version=1&modificationDate=1699456117233&cacheVersion=1&api=v2&width=900&height=493)

4.2. Locate any **profile projects** in the solution. **Right-click**, select **Add > Project Reference...**, then select the **EdFi.Ods.Extensions.SampleStudentTransportation** project. This step is needed only if any of the **Profile resources** in the **Profiles.xml** document are extended, or extension entities are being constrained by a particular Profile. 

### Step 5. **Add Extension Metadata**

The code listings in this section use the sample extension material from **Ed-Fi-ODS/Samples/Extensions/StudentTransportation**.

5.1. **Map Artifacts**

Copy the metadata files to the implementation project.

```powershell
xcopy /y "Ed-Fi-ODS\Samples\Extensions\StudentTransportation\StudentTransportationMetaEd\MetaEdOutput\samplestudenttransportation\Database\SQLServer\ODS\Structure" "Ed-Fi-ODS-Implementation\Application\EdFi.Ods.Extensions.SampleStudentTransportation\Versions\1.0.0\Standard\5.0.0\Artifacts\MsSql\Structure\Ods\*"
   
xcopy /y "Ed-Fi-ODS\Samples\Extensions\StudentTransportation\StudentTransportationMetaEd\MetaEdOutput\samplestudenttransportation\Database\PostgreSQL\ODS\Structure" "Ed-Fi-ODS-Implementation\Application\EdFi.Ods.Extensions.SampleStudentTransportation\Versions\1.0.0\Standard\5.0.0\Artifacts\PgSql\Structure\Ods\*"
 
xcopy /y "Ed-Fi-ODS\Samples\Extensions\StudentTransportation\StudentTransportationMetaEd\MetaEdOutput\samplestudenttransportation\ApiMetadata" "Ed-Fi-ODS-Implementation\Application\EdFi.Ods.Extensions.SampleStudentTransportation\Versions\1.0.0\Standard\5.0.0\Artifacts\Metadata\*"
   
xcopy /y "Ed-Fi-ODS\Samples\Extensions\StudentTransportation\StudentTransportationMetaEd\MetaEdOutput\samplestudenttransportation\XSD" "Ed-Fi-ODS-Implementation\Application\EdFi.Ods.Extensions.SampleStudentTransportation\Versions\1.0.0\Standard\5.0.0\Artifacts\Schemas\*"
   
xcopy /y "Ed-Fi-ODS\Samples\Extensions\StudentTransportation\StudentTransportationMetaEd\MetaEdOutput\samplestudenttransportation\Interchange" "Ed-Fi-ODS-Implementation\Application\EdFi.Ods.Extensions.SampleStudentTransportation\Versions\1.0.0\Standard\5.0.0\Artifacts\Schemas\*"
```

### Step 6. **Configure Security**

The Ed-Fi ODS / API is secure by default. One implication of this design principle is that new entities and elements may not be accessed until an **authorization strategy** is applied. This prevents accidental release of confidential information, but does require active steps on the part of system developers to enable access to **Extensions**.

Create a security SQL script called **0001-StudentTransportation_ResourceClaims.sql** and place it in the **Ed-Fi-ODS-Implementation/Application/EdFi.Ods.Extensions.SampleStudentTransportation/Versions/1.0.0/Standard/5.0.0/Artifacts/MsSql/Data/Security** folder (**Create 'Security' folder if it does not exist**). Copy the contents of the following SQL DML script into the newly created file and save.

<details>
<summary>0001-StudentTransportation_ResourceClaims.sql</summary>

```sql
-- SQL DML script content goes here (see Confluence source for actual script)
```

</details>

### Step 7. **Run Initdev**

Save all modified files, close **Ed-Fi-ODS.sln**, and re-run the code generation steps outlined in the **Getting Started Guide** (i.e., from a PowerShell prompt run **Initialize-PowershellForDevelopment.ps** script, followed by the **initdev** command). Then, run the application and view the Ed-Fi ODS / API in the **Swagger UI**. The following new API resource should be visible:

![New API resource in Swagger UI](https://edfi.atlassian.net/wiki/download/attachments/25493729/extension%20swagger.png?version=1&modificationDate=1699456118837&cacheVersion=1&api=v2)
