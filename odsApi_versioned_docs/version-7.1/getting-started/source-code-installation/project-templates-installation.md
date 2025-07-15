# Project Templates Installation

:::info
Note that the project templates have been updated for the v7.1 release. Developers using previous versions should uninstall the previous version and install the latest. 
:::

The Ed-Fi Alliance provides a Visual Studio extension that contains project
templates for creating Composites, Ed-Fi Extensions, and Profiles. The
Visual Studio extension is supported by Visual Studio 2022. Installing the
VS extension is useful for many customization needs.

This section describes how to install the Project Templates. It assumes you
have Visual Studio installed, and have successfully installed the ODS / API
on a development machine per the instructions in the [Getting Started -
Source Code Installation](../readme.md)
section of this documentation.

## Step 1. Uninstall Any Previous Versions

Verify that there are no previous versions of the templates installed under
**Extensions** \> **Manage Extensions** \> **Installed** > **Templates**.
"Uninstall" previous versions of "Ed-Fi Alliance Project Templates"
![Extensions Manager](https://edfi.atlassian.net/wiki/download/thumbnails/25493621/image2020-10-18_16-6-25.png?version=1&modificationDate=1699456102423&cacheVersion=1&api=v2&width=850&height=238)

## Step 2. Download the Ed-Fi Visual Studio Extension

Download the Ed-Fi Visual Studio Extension from the download panel on the right.


## Step 3. Close Visual Studio

Close Visual Studio. Ensure you close all instances.

## Step 4. Install the Templates

Double-click the downloaded EdFi.ProjectTemplates.Installer.vsix file and
install the templates.

![Installation Dialog](https://edfi.atlassian.net/wiki/download/attachments/25493621/image2022-2-7_14-42-7.png?version=1&modificationDate=1699456102527&cacheVersion=1&api=v2)

![Installation Confirmation](https://edfi.atlassian.net/wiki/download/attachments/25493621/image2022-2-7_14-43-35.png?version=1&modificationDate=1699456102537&cacheVersion=1&api=v2)

## Step 5. Verify Install

Verify that the extension installed under **Extensions** \> **Manage
Extensions** \> **Installed** > **Templates**.

![Extensions Manager Verification](https://edfi.atlassian.net/wiki/download/thumbnails/25493621/image-2023-12-3_16-31-17.png?version=1&modificationDate=1701642677327&cacheVersion=1&api=v2&width=650&height=131)

Verify that the templates are available under **File** > **New** >
**Project**.

![Templates in New Project Dialog](https://edfi.atlassian.net/wiki/download/thumbnails/25493621/image2020-10-18_16-21-35.png?version=1&modificationDate=1699456102393&cacheVersion=1&api=v2&width=650&height=412)

## Next Steps

Now that you've installed the templates, you can find information on how to
use them in the following articles:

* [How To: Add API Composites to the Ed-Fi ODS / API
      Solution](../../how-to-guides/how-to-add-api-composites-to-the-ed-fi-ods-api-solution.md)
* [How To: Add Profiles to the Ed-Fi ODS /
      API](../../how-to-guides/how-to-add-profiles-to-the-ed-fi-ods-api.md)
* [How To: Extend the Ed-Fi ODS / API - Alternative Education Program
      Example](../../how-to-guides/how-to-extend-the-ed-fi-ods-api-alternative-education-program-example.md)


