# MetaEd IDE - Creating and Maintaining Your Extension

The MetaEd IDE makes it easy for implementers to create their own Ed-Fi
Extensions. The basic steps to do that are fairly simple, and so are a great
place to get started with the IDE.

Detail on each step follows.

## Step 1. Install MetaEd

1. Open Visual Studio Code
2. If you haven't
    already [installed](https://edfi.atlassian.net/wiki/display/METAED20/Getting+Started+-+Installation) the
    MetaEd extension, please do so now.

:::tip

If you run into errors running MetaEd, then please check to ensure that Visual
Studio Code is running the latest version and that the MetaEd extension is on
the latest version. Visit the [MetaEd IDE - Common Problems and
Troubleshooting](./common-problems-and-troubleshooting.md)
if errors continue to occur.

:::

## Step 2. Add an Extension Project

### Step 2a. Create a New Extension Project

1. In your operating system, create a new directory to store your MetaEd files,
    initialize it with the common set of directories, and create a package.json
    file. There is a sample script below to help automate this.

    <details>
    <summary>Standard directories...</summary>

    ```none
    <Project root>
    ├─ Association/
    ├─ Choice/
    ├─ Common/
    ├─ Descriptor/
    ├─ Domain/
    ├─ DomainEntity/
    ├─ Enumeration/
    ├─ Interchange/
    ├─ Shared/
    ```

    </details>

    ```json title="Sample package.json"
    {
      "metaEdProject": {
        "projectName": "Sample",
        "projectVersion": "1.0.0"
      }
    }
    ```

    :::tip

    The projectName
    * must start with an uppercase alphabetic character
    * must have at least two alphabetic characters
    * should avoid special characters, as they will likely be stripped out for
    downstream artifacts For example, "Project-Two" will be transformed to a
    "projecttwo" database schema by the SQL plugin. The projectVersion should
    follow [SemVer 2.0.0](https://www.semver.org) principles. In short: modify
    the first digit when you have a breaking change to your API model; modify
    the second where there are backward-compatible enhancements; and modify the
    third when there is a bug fix / patch.

    :::

     Expand source

    ```powershell
    # Create the new project directory
    mkdir MyExtension

    # Optionally, initialize it as a Git repository (highly recommended)
    cd MyExtension
    git init

    # Create directories
    mkdir Association
    mkdir Choice
    mkdir Common
    mkdir Descriptor
    mkdir Domain
    mkdir DomainEntity
    mkdir Enumeration
    mkdir Interchange
    mkdir Shared

    # Download a package.json file template. Be sure to edit it and replace with your project name.
    curl https://edfi.atlassian.net/wiki/download/attachments/23709491/package.json?api=v2 -o package.json
    ```

2. Open this folder in Visual Studio Code.

### Step 2b. Alternate: Modify One or More Existing Extensions

As per step 2 above, existing extension folders may be added to the workspace.
Simply add one or more folders with the "Add Folder to Workspace..." command.

## Step 3. Configure MetaEd Preferences

1. Open the settings, either with the `Control+,` shortcut or from the menus:
    `File > Preferences > Settings`.
2. Switch to the Workspace settings tab

    :::warning

    There are some MetaEd settings visible under the User tab. Please ignore
    these and only use the Workspace tab.

    :::

3. Expand `Extensions > MetaEd`  or type "metaed" in the search bar to scroll to
    the available settings.
4. Available settings:
    1. **Accepted License:** Usage of the MetaEd IDE requires acceptance of the
        [Ed-Fi License
        agreement](https://www.ed-fi.org/getting-started/license-ed-fi-technology).
        Check the box to accept the license terms.
    2. **Target Ods Api Version**: The target Ed-Fi ODS/API version.

        :::tip

        For ODS/API version 6.2, select "6.1.0" as the target version. From
        MetaEd's perspective, there is no difference between the two.

        :::

    3. **Ods Api Deployment Directory**: Full path to root folder for the Ed-Fi
        ODS / API source code. The folder this points to should contain
        Ed-Fi-ODS and Ed-Fi-ODS-Implementation folders.
    4. **Suppress Delete on Deploy:** Stop deployment from deleting the
        SupportingArtifacts API folder. For advanced users only.
    5. **Alliance Mode:** For Alliance users only, this makes core files
        editable. Non-Alliance users must leave this setting disabled to avoid
        dangerous and costly mistakes. :warning:

         Alliance mode users: manually update the "Data Standard Project
         Directory" to the correct folder path to the active Ed-Fi-Model
         repository.

## Step 4. Add the Correct Data Model Project

The Ed-Fi Data Standard has multiple versions and your extensions need to be
targeted at the Data Standard and ODS / API versions you are using. Please
consult the ODS / API documentation for information on the version(s) applicable
to your project. This information is generally found in the "What's New" section
of the documentation. Alternately, see [Ed-Fi Technical Suite Supported Versions](../../0-roadmap/supported-versions.md)
for all available versions.

Once you know which data model version to use, you need to add it to the
workspace by right-clicking in the Explorer and choosing "Add Folder to
Workspace...".  However, the folder containing all of the data model files is
difficult to find. The simplest way to determine where to find the files is to
click the Build button after you have opened your extension: this will present
you with an error message that helpfully tells you where to find the data model
files. Copy that location and paste it in when adding a folder to the workspace.

![Error message](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/nothing-to-deploy.png)

## Step 5. Add MetaEd Files to the Project Folder

1. Right-click on any of the folders to add a new file.

    ![Right-click to add a new file](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/new-domain-entity.png)

2. When you save the file, be sure to save with `metaed`  as the file extension.
    For example, if you have a new Domainentity called `ClassDiscussion` then
    you would create the file under the `DomainEntity` folder and name it
    `ClassDiscussion.metaed`.

    ![File extension](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/class-discussion-file.png)

      :::tip

      As a best practice, the name of the file should match the name of the
      resource being created. MetaEd files should always be saved with a .metaed
      extension.

      :::

3. Now open your new file and begin adding detail to it, using the MetaEd
    [Language Specification](../language-specification/readme.md).

    ![Language Specification usage](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/class-discussion-model.png)

## Step 6. Build the Project

When you are ready to test that your project will build properly, click the
`Build` button in the upper right corner of the editor. After clicking this, you
will see a notification "Building MetaEd..." in the bottom right corner.

![Build project](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/class-discussion-build.png)

:::info

Please see [MetaEd IDE - Common Problems and
Troubleshooting](./common-problems-and-troubleshooting.md)
if you run into an error and are unsure of how to correct it.

:::

Artifacts build successfully.

![Artifacts build successfully](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/metaed-build-success.png)

## Step 7. View MetaEd Output

Expand the project in the tree view and click **MetaEdOutput** to explore
generated artifacts. The **MetaEdOutput** folder is created in the last
workspace folder at the time that the project was built. However, the folder
will contain generated artifacts for all of the MetaEd projects in the
workspace.

![MetaEd Output](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/generated-sql-files.png)

## Step 8. Save Workspace File (optional)

Click on `File > Save Workspace As`  to create a workspace file in your
extension folder.

![Save Workspace As](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/save-workspace.png)

This creates a workspace file that contains any settings that you configured in
Workspace Settings, like this:

```json
{
 "folders": [
  {
   "path": "../../Users/XYZ/.vscode/extensions/ed-fialliance.vscode-metaed-ide-0.0.1/node_modules/@edfi/ed-fi-model-4.0"
  },
  {
   "path": "."
  }
 ],
 "settings": {
  "metaed.targetOdsApiVersion": "6.1.0",
  "metaed.acceptedLicense": true,
  "metaed.allianceMode": false,
  "metaed.odsApiDeploymentDirectory": "c:\\source\\ed-fi"
 }
}
```

The next time you open the extension folder, you will be prompted to also open
the Ed-Fi model folder (which is required in order to run the Build and Deploy
actions).

![Open Ed-Fi model folder](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/contains-workspace-file.png)

:::warning

Note that the workspace file has a path that includes the username. This path
will not work on anyone else's computer. Therefore this file should _not_ be
kept in source control. If you are using git, then add `*.code-workspace`  to
your `.gitignore`  file.

:::

**→ Ready to build the ODS/API? Next up:** **[MetaEd IDE - Using the Generated
Artifacts](./using-the-generated-artifacts.md)**
