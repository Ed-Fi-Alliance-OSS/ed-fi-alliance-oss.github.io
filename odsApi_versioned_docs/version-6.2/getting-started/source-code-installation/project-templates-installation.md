# Project Templates Installation

:::info
Note that the project templates have been updated for the v6.2 release. Developers using previous versions should uninstall the previous version and install the latest.
:::

The Ed-Fi Alliance provides a Visual Studio extension that contains project templates for creating Composites, Ed-Fi Extensions, and Profiles. The Visual Studio extension is supported by Visual Studio 2022. Installing the VS extension is useful for many customization needs.

This section describes how to install the Project Templates. It assumes you have Visual Studio installed, and have successfully installed the ODS / API on a development machine per the instructions in the [Getting Started - Source Code Installation](../../getting-started/source-code-installation/readme.md) section of this documentation. 

The installation steps can be summarized as:

*   [Step 1. Uninstall Any Previous Versions](#step-1-uninstall-any-previous-versions)
*   [Step 2. Download the Ed-Fi Visual Studio Extension](#step-2-download-the-ed-fi-visual-studio-extension)
*   [Step 3. Close Visual Studio](#step-3-close-visual-studio)
*   [Step 4. Install the Templates](#step-4-install-the-templates)
*   [Step 5. Verify Install](#step-5-verify-install)

Detail on each step follows.

## Step 1. Uninstall Any Previous Versions

Verify that there are no previous versions of the templates installed under **Extensions** \> **Manage Extensions** \> **Installed** > **Templates**. "Uninstall" previous versions of "Ed-Fi Alliance Project Templates"

![Uninstall Templates](https://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2020-10-18_16-6-25.png)

## Step 2. Download the Ed-Fi Visual Studio Extension

Download the Ed-Fi Visual Studio Extension from the download panel on the right.

## Step 3. Close Visual Studio

Close Visual Studio. Ensure you close all instances.

## Step 4. Install the Templates

Double-click the downloaded EdFi.ProjectTemplates.Installer.vsix file and install the templates.

  

![Install Templates 1](https://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2022-2-7_14-42-7.png)


  

![Install Templates 2](https://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2022-2-7_14-43-35.png)


## Step 5. Verify Install

Verify that the extension installed under **Extensions** \> **Manage Extensions** \> **Installed** > **Templates**.

![Verify Templates 1](https://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2020-10-18_16-16-34.png)


Verify that the templates are available under **File** > **New** > **Project**.

![Verify Templates 2](https://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2020-10-18_16-21-35.png)


## Next Steps

Now that you've installed the templates, you can find information on how to use them in the following articles:

*   [How To: Add API Composites to the Ed-Fi ODS / API Solution](../../how-to-guides/how-to-add-api-composites-to-the-ed-fi-ods-api-solution.md)
*   [How To: Add Profiles to the Ed-Fi ODS / API Solution](../../how-to-guides/how-to-add-profiles-to-the-ed-fi-ods-api.md)
*   [How To: Extend the Ed-Fi ODS / API - Student Transportation Example](../../how-to-guides/how-to-extend-the-ed-fi-ods-api-student-transportation-example.md)

## Contents

Find out more about how to begin using the Ed-Fi ODS / API:

            

 

:::note
 The following link contains the Visual Studio Extension:
 [EdFi.ProjectTemplates.Installer.vsix](https://edfi.atlassian.net/wiki/download/attachments/18219164/EdFi.ProjectTemplates.Installer.vsix?version=4&modificationDate=1711578642477&cacheVersion=1&api=v2)
:::