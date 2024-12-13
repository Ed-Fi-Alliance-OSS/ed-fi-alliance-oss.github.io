# Project Templates Installation

:::info
Project templates are updated for each release. Developers using previous
versions should uninstall the previous version and install the latest.
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

## Step 2. Download the Ed-Fi Visual Studio Extension

Download the Ed-Fi Visual Studio Extension from the download panel on the
bottom of the page. **right-click** on the downloaded package and select
"Properties".
Update the file extension (from .nupkg to .zip). Extract the contents and
install EdFi.ProjectTemplates.Installer.vsix.

## Step 3. Close Visual Studio

Close Visual Studio. Ensure you close all instances.

## Step 4. Install the Templates

Double-click the downloaded EdFi.ProjectTemplates.Installer.vsix file and
install the templates.

## Step 5. Verify Install

Verify that the extension installed under **Extensions** \> **Manage
Extensions** \> **Installed** > **Templates**.

Verify that the templates are available under **File** > **New** >
**Project**.

## Next Steps

Now that you've installed the templates, you can find information on how to
use them in the following articles:

* [How To: Add API Composites to the Ed-Fi ODS / API
      Solution](../../how-to-guides/how-to-add-api-composites-to-the-ed-fi-ods-api-solution.md)
* [How To: Add Profiles to the Ed-Fi ODS /
      API](../../how-to-guides/how-to-add-profiles-to-the-ed-fi-ods-api.md)
* [How To: Extend the Ed-Fi ODS / API - Alternative Education Program
      Example](../../how-to-guides/how-to-extend-the-ed-fi-ods-api-alternative-education-program-example.md)

:::note

The Visual Studio Extension can be found
[here](https://dev.azure.com/ed-fi-alliance/Ed-Fi-Alliance-OSS/_artifacts/feed/EdFi@Release/NuGet/EdFi.Suite3.ProjectTemplates.Installer/versions/7.3.57).

:::
