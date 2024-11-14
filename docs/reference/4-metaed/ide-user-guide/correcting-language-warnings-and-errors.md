# MetaEd IDE - Correcting Language Warnings and Errors

MetaEd IDE alerts you if any files in the project contain syntax errors, invalid
references, or unexpected text. This document describes problem resolution for
language issues. If you have no Errors listed in the Problems pane, but are
unable to run the Build or Deploy commands, then please see [MetaEd IDE - Common
Problems and
Troubleshooting](./common-problems-and-troubleshooting.md).

## Step 1. View the Problem List

Note that the files with errors and warnings (and folders containing the files
errors) are color red (error) or gold (warning) in the tree view (note: gold is
difficult to see in light themes). All errors in all files of the project are
listed below.

![Problems pane](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/problems-pane.png)

:::tip

If the Problems panel is hidden, then you can re-open it from the `View
Problems`  menu or Control-Shift-M keyboard shortcut.

:::

### Step 1a. Filter the Problem List

Click the funnel icon in the Problems pane to filter the visible problems, or
type into the text box to find specific problems.

![Filter the problem list](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/show-warnings.png)

## Step 2. Navigate to Warning or Error Location

To navigate to the precise location of an error, you may click the problem text
to open the file and jump directly to the problematic line.

![Navigate to the error location](https://edfidocs.blob.core.windows.net/$web/img/reference/metaed/img/warning-detail.png)

## Step 3. Correct the Issue

Resources to review when diagnosing an issue:

* [Cookbook](../cookbook/readme.mdx)
* [Language Specification](../language-specification/readme.md).
* [Ed-Fi Extension
  Framework](/reference/data-exchange/data-standard/extension-framework.md)

Occasionally, there may be known issues preventing the use of otherwise valid
extension scenarios or cases where an extension scenario is not fully supported
in the Ed-Fi Technology. Where possible, the MetaEd IDE provides warnings when
an extension project contains extension definitions that are not fully
supported. In most cases, an extension project with these warnings will still
successfully build in the MetaEd IDE, despite the known downstream issues.

In some cases, the core data standard may contain some elements that would not
be fully supported as extension scenarios. The risks associated with these
activities are carefully mitigated by additional development activities
undertaken by the technical team that publishes the core data standard. These
warnings are displayed for the benefit of the technical team that maintains the
core data standard and may be disregarded by users outside this group. Begin by
reviewing the list of warnings to determine if any of the warnings apply to the
extension project.

Sometimes, an alternate or workaround method for modeling an extension may not
be ideal. In these cases, be sure to provide feedback to Ed-Fi on the Ed-Fi
Tracker ticket listed in the warning message. This ensures that Ed-Fi has an
appropriate sense of the scale of a reported issue. Once you've added a comment
to an Ed-Fi Tracker ticket, you will receive automated updates from Ed-Fi
Tracker as the discussion continues or when progress is made on the ticket.\*

\*Assumes default notification settings in Ed-Fi Tracker
