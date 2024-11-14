# MetaEd IDE - Common Problems and Troubleshooting

Experiencing issues? This section provides troubleshooting guidance for the
following issues:

## Installation and Update Issues

### I think I need to update the MetaEd IDE

If you're having trouble with the MetaEd IDE, a good place to start is ensuring
you have the latest version. If you're having issues, you may want to skim the
[What's
New](https://edfi.atlassian.net/wiki/spaces/METAED20/pages/23707618) section of
this documentation to see if the problem you're experiencing is mentioned.

Typically, VS Code will auto-update the MetaEd IDE from time to time, as new
versions are available. To check on the status, you can open the Extensions
panel and search for MetaEd. There, you can see the currently installed version
number.

![MetaEd IDE version](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/find-version.png)

If you suspect there is a newer version, but are having trouble getting Visual
Studio Code to install the update, then you can [view all available
versions](https://marketplace.visualstudio.com/items?itemName=Ed-FiAlliance.vscode-metaed-ide)
on the Visual Studio Marketplace and manually download a newer version. Install
the manually downloaded version with the Install from VSIX command, as shown
below.

![Install from VSIX](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/install-from-vsix.png)

### I want to fully uninstall MetaEd IDE

Open the extensions panel in VS Code, search for MetaEd, and click the Uninstall
button. Optionally, uninstall VS Code.

### I still see MetaEd controls in a non-MetaEd project

This is normal and should be harmless.

![MetaEd controls in a non-MetaEd project](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/metaed-has-started.png)

If you do not wish to see MetaEd on other folders, then please disable the
extension until it is needed again. Open the list of extensions, find MetaEd,
and disable it.

## Error and Warning Issues

### There is no syntax highlighting or error detection in my newly created file

Common causes:

1. Files must have the extension ".metaed" in the file name in order for
   MetaEd-IDE to provide syntax highlighting or error detection.
2. The project's `package.json`  must be properly formatted, with exact casing
   for "metaEdProject", 'projectName", and "projectVersion"

     **Good** :white_check_mark:

    ```json
    {
      "metaEdProject": {
        "projectName": "Sample",
        "projectVersion": "1.0.0"
      }
    }
    ```

     **Bad - lower case 'n' in "projectname"** :x:

    ```json
    {
      "metaEdProject": {
        "projectname": "Sample",
        "projectVersion": "1.0.0"
      }
    }
    ```

3. MetaEd extension is disabled or not installed. Please open the Extension
   panel in VS Code, search for MetaEd, and check the status of the extension.

### I receive an error message on a domain that suggests I can include a descriptor

The error pictured below seems to indicate that descriptors may be included in
domain files, which is incorrect.

![Descriptors cannot be included in domain files](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/mismatched-input.png)

Descriptors cannot be included in domain files. The error message above may be
corrected in a future release. The error message below provides the correct set
of items that may be included in a domain file.

![Descriptors cannot be included in domain files](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/entity-does-not-exist.png)

:::info

Note in the image above that no error is detected for the inclusion of the
descriptor "Behavior". This is because "Behavior" is the name of both a
descriptor and a common type in the core model. The linter ignores the keyword
and validates based on the name of a valid common type.

:::

### I receive a warning: MetaEdId '3116' on Descriptor Property Term already exists on another entity

Detailed message:

```text
warn: MetaEdId '3116' on Descriptor Property Term already exists on another entity. All MetaEdIds must be globally unique. C:\....\ed-fi-model-3.3b\Common\CohortYear.metaed (9:21)
warn: MetaEdId '3116' on Shared Decimal Property EarnedCredits already exists on another entity. All MetaEdIds must be globally unique. C:\....\ed-fi-model-3.3b\Common\PartialCourseTranscriptAwards.metaed (6:53)
```

The
[MetaEdIde](../language-specification/supporting-components.md) is
an optional feature, primarily used only by the Alliance. This warning indicates
that a value was accidentally re-used in model 3.3b. This will not have any
detrimental impact on an extension build and **should be ignored**.

## File and Folder Issues

### I moved a .metaed file to a new folder, but it keeps showing up in the old location

If a metaed file is open in the editor when a file is moved, the open tab will
continue to point to the former location. If you save the open tab after the
move, the editor will save a copy of the file in the former location. You may
avoid this by closing the editor tab before moving the file or by closing the
file without saving the changes after the file has been moved.

### I renamed a .metaed file, but a duplicate keeps appearing with the old file name

If a metaed file is open in the editor when a file is moved, the open tab keeps
the former path. If you save the open tab after renaming the file, the editor
will save a copy of the file with the former name. You may avoid this by closing
the editor tab before changing the file name or by closing the file without
saving the changes after the file has been renamed.

## Data Modeling Issues

### I have a complex data model that requires multiple references to resolve to a single entity

A complex model can result in duplicate references flowing through the model.
Sometimes, your model may require that the references always be a merged
reference to a single entity, rather than multiple references to the same type
of entity with different roles. MetaEd can handle these complex modeling
scenarios by using the `merge...with` directive.

See the MetaEd Cookbook entry [Using Merge
Directives](../cookbook/14-using-merge-directives.md) for details.

## Build and Deploy Issues

### My version of the ODS/API is not available in the preferences

As of March 22, 2024, the following versions are shown in the preferences for
MetaEd. Older versions not displayed here are no longer supported. ODS/API 6.2
(released 3/21/24) can be accessed by choosing "6.1.0". This dropdown list is
expected to be more generic by the time ODS/API 7.2 comes out, at which time it
will likely simply "6" or "7" without the full version number.

![ODS/API versions](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/choose-target-version.png)

### I clicked the button, and nothing happened

Open the Output panel and switch to the MetaEd view. Review the log to find a
detailed error message. If this troubleshooting page does not describe the
issue, please submit a support ticket in [Ed-Fi
Tracker](https://tracker.ed-fi.org) with a copy of the error message and as much
detail as you can provide about the conditions under which the error occurred.

![Output panel](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/metaed-tasks-output.png)

### I tried to build or deploy and received an error message about needing a Data Standard project

Extension developers need to add both the desired model project and their
extension in the Explorer pane, preferably in that order (if you add them in
reverse order, then the MetaEd build output will be in the data molder folder
instead of in your extension folder). If you forget to open the data standard
project then you will get an error message like the one below when attempting to
run either Build or Deploy. Note that the message gives you the local filesystem
location of all of the data model versions that are bundled with the MetaEd IDE.
You can highlight the folder name, copy it, and paste into the window when
adding adding a folder to a workspace.

![Data model versions](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/ds-project-copy-text.png)

![Data model versions](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/add-folder-to-workspace.png)

![Data model versions](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/selecting-folder.png)

![Data model versions](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/selecting-model-version.png)

### I added a Data Standard project and get an error message with the wrong ODS/API version

![Data Standard project](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/requires-data-standard-project.png)

This occurs when MetaEd expects you to use one model version and you have loaded
a different one in the explorer panel. And sometimes, you may think that you
have loaded the correct matching version. You will need to check on the MetaEd
settings - and make sure that you check both the _user settings_ and the
_workspace settings_. There is the possibility of having set an older (or newer)
version in one location, and then changed it in the other location. In theory
the user settings should override anything in workspace, but we have seen some
inconsistency there, with workspace settings sometimes "winning". In general, we
recommend only using the workspace settings.

![Workspace settings](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/use-workspace-settings.png)

### I tried to deploy, but received a message about checking the ODS/API path

![ODS/API path error](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/deploy-failure-note.png)

There are two possible explanations:

* The configured ODS/API directory root does not exist (setting: **Ods Api
  Deployment Directory**) or does not contain the `Ed-Fi-ODS-Implementation`
  repository.
* You have an extension data model, but do not have a C# extension project in
    `Ed-Fi-ODS-Implementation/Application`. The output panel will show a message
    like this in such a case: ![Output](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/project-not-found.png)

  * Reference: [How To: Extend the Ed-Fi ODS / API - Student Transportation
    Example - Step 4. Create Extension Project in ODS/API
    Solution](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V61/pages/18811954#HowTo:ExtendtheEd-FiODS/API-StudentTransportationExample-Step4.CreateExtensionProjectinODS/APISolution).

### I ran a successful build, but re-running the build now results in an "Unable to delete output directory..." error

```text title=Build Error
Unable to delete output directory at path "C:\...\MetaEdOutput\".
Please close any files or folders that may be open in other applications.
```

First, double-check that you do not have any of the MetaEd output files open in
any other application. Antivirus protection software may place a file-lock on
MetaEd output files preventing the MetaEd IDE from deleting the output from the
previous build to replace with output from the new build. If all output files
are closed and you still receive this error, you may need to update the settings
on your antivirus protection to prevent the file-lock from occurring. Restarting
your computer will also remove the file-lock and allow the IDE to delete and
replace the output files.

### I ran a build and received an error, but I can't tell if MetaEd IDE has completed the attempt

If an error is encountered during a build attempt, MetaEd IDE will not provide
any other indication that the build attempt has completed other than a
description of the error that caused the build to fail. The error message itself
is an indication that the attempt has finished.

![Build error](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/entity-does-not-exist-1.png)

### I sometimes receive the unhelpful error message "no viable alternative at input `<EOF>`" when working on the end of a file

This indicates there is a syntax error in the file but at that moment MetaEd
cannot provide specific information on the error. This is because MetaEd doesn't
have enough information to recover from the error, so the best it can do is
indicate that one exists. Continue working on the file and MetaEd will be able
to recover once there is more of the file for it to inspect.

![No viable alternative at input `<EOF>`](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/no.viable.alternative.png)

### The Interchange XSD files generated by the build are invalid when opened in an XML editor

![Schema location error](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/altova-xml-error.png)

In order to assist with file organization, build artifacts are sorted into
folders according to the type of artifact. However, the schema location
specified in the generated interchange files expects the schema file to be in
the same folder as the interchange files. Simply move either the schema file or
the interchange files (or both) into the same folder.

![Schema location error](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/drag-into-interchange.png)

Your interchange files should now validate properly in an XML editor.

![Validated interchange files](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/altova-xml-fix.png)

If you make additional changes and run the build again, all MetaEdOutput folders
are deleted and replaced in their original locations. Therefore, to validate the
interchange files in an XML editor after a new build, they will need to be
manually moved again.

### I received a message saying there are non-MetaEd projects in the workspace, and my extension did not build

![Non-MetaEd projects in the workspace](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/ignore-non-metaed-files.png)

In the original example of this error, the build process completed and there is
an output folder, but it did not contain any extension information. The problem
was traced back to the extension project's `package.json` , which was
accidentally saved as a [UTF-16 file instead of
UTF-8](https://stackoverflow.com/questions/2241348/what-are-unicode-utf-8-and-utf-16).

Look at the bottom edge of the VS Code window to find the file format; in this
screenshot you can see it as "UTF-16 LE".

![File format](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/package-json-utf-16.png)

Click on that text to initiate saving in the correct format (UTF-8), as shown in
these screenshots.

![Save with encoding](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/save_with_encoding.jpg)

![Save with encoding](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/convert-to-utf-8.png)

## Additional Resources

### I'd like to get in touch with a human about MetaEd

MetaEd questions, bugs, issues, and feature recommendations are tracked via
[http://success.ed-fi.org/](http://success.ed-fi.org/). You can submit a ticket,
and a human will get back with you.
