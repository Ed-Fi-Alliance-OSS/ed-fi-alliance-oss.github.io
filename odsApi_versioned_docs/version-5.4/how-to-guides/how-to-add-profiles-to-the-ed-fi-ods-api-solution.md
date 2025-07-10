# How To: Add Profiles to the Ed-Fi ODS / API Solution

This example outlines the steps necessary to integrate and activate Ed-Fi
Profile definitions for use in an Ed-Fi ODS / API. It is assumed that the Ed-Fi ODS /
API has been successfully set up and is running in a local environment per the
instructions in the [Getting Started](../getting-started/readme.md) documentation.

The steps in Visual Studio can be summarized as:

* Step 1. Create the Profiles Project
* Step 2. Integrate Profiles into the Solution
* Step 3. Run Code Generation and Verify Changes

Detail on each step follows.

## Step 1. Create the Profiles Project

### Create the Visual Studio Project

1. Add a Profiles Project Using the Visual Studio Project Template. Visual Studio Project Template can be installed by following steps in [Project Templates Installation](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774290/Project+Templates+Installation) section of this documentation.

   a. Add the Profiles project, right-click on the "Profiles" folder and select File > Add > New Project...
   
   b. In the "Add New Project" dialog, find and select the "Ed-Fi API Profiles Project Template" entry as shown below. Click Next.
   
   ![Image](https://edfi.atlassian.net/wiki/download/thumbnails/22774786/profiles1.PNG?version=1&modificationDate=1641861361677&cacheVersion=1&api=v2&width=1024&height=680)
   
   c. Enter the project name for the new project and click Create. The suggested naming convention for this type of project is something like EdFi.Ods.Profiles.MyProfiles.
   
   ![Image](https://edfi.atlassian.net/wiki/download/thumbnails/22774786/profiles2.PNG?version=1&modificationDate=1641861361537&cacheVersion=1&api=v2&width=1024&height=680)
   
2. Update the Marker Interface File. To integrate the Profiles with the API, start by ensuring you have a marker interface in the root of your Profiles project.

   This interface is an idiom used in the Ed-Fi Visual Studio Solution to enable a
   strongly typed mechanism for obtaining a reference to the .NET assembly. If you
   used the Visual Studio Project template to create your profile, a file will
   already exist — but you'll need to rename the interface and the file to match the
   convention (e.g., Marker_EdFi_Ods_Profiles_MyProfiles.cs). The marker interface file should have the following code:

   ```csharp
   namespace EdFi.Ods.Profiles.MyProfiles
   {
       public interface Marker_EdFi_Ods_Profiles_MyProfiles { }
   }
   ```

3. Add references to extension entities. If any of the Profile resources in the Profiles.xml document are extended, or
   extension entities are being constrained by a particular Profile, then project
   references are needed for the assemblies containing the extensions. As an
   example, in the Profile.xml file created by the Visual Studio template,
   School-and-Student-Sample has the resource School, which is extended in the EdFi.Ods.Extensions.Sample and EdFi.Ods.Extensions.TPDM sample extensions. A hard project reference to this Ed-Fi Extension assembly
   must be added to the newly created Profile project.
   
4. Review and modify Profiles.xml file. The Visual Studio Project Template creates a sample Profiles.xml file. You should open it and modify it to meet the needs of your Profile.
   Consult [API Profiles](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774352/API+Profiles) for guidance.
   
5. Save the Project.

## Step 2. Integrate Profiles into the Solution

To integrate the Profiles into the solution, add a reference to the Profiles
project you constructed in the previous step in the EdFi.Ods.WebApi project (located in the "Entry Points" folder).

## Step 3. Run Code Generation and Verify Changes 

Save all modified files, close the Ed-Fi-ODS Visual Studio Solution, then re-run
the code generation steps outlined in the [Getting Started Guide](../getting-started/readme.md) (i.e., from a PowerShell prompt run `Initialize-PowershellForDevelopment.ps1` script followed by the `initdev` command). Then run the application and view the Ed-Fi ODS / API using Swagger.

The new Profile should be visible:

:::note
You may have to clear your browser cache in order for Swagger UI to display the
new resource.
:::

![Image](https://edfi.atlassian.net/wiki/download/thumbnails/22774786/image2017-12-18_16-23-55.png?version=1&modificationDate=1641861361583&cacheVersion=1&api=v2&width=1280&height=505)

## Profiles in Use

This section covers additional information and settings useful after development
is complete.

### Confirming Profile Settings

Profile settings are flexible. With this flexibility comes some complexity — so
platform hosts will want to confirm that the deployed API Profiles behave as
expected, exposing exactly the right resources. This can be done manually or using
an SDK created by code generation techniques.

### Adding Profiles to the API Administration Database

The EdFi_Admin database stores the data required to manage API keys and secrets,
as well as Education Organization and Profile assignments. When the API is
initialized, the names of the Profiles that have been configured into the API will
be published to the Profiles table. This process performs a one-way publishing
and will not remove existing Profile names that are no longer contained within the
API configuration.

The EdFi_Admin tables related to this process are shown below.

![Image](https://edfi.atlassian.net/wiki/download/attachments/22774786/image2015-9-3%2019-33-12.png?version=1&modificationDate=1641861361643&cacheVersion=1&api=v2)

## Downloads
The following GitHub link contains source files for this Profile sample:

[Profile Source Files](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/tree/v5.4/Samples/Project-Profiles-Template)
