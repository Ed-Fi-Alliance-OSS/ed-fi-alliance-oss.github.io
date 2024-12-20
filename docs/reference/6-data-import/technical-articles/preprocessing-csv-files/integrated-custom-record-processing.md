# Integrated Custom Record Processing

:::info
   This feature is available in Data Import as of version 1.0.1.
:::

As described in [Preprocessing CSV Files](../preprocessing-csv-files), Data
Import is not a general purpose programming language. Some complex file
preparation may require the power of a general purpose programming language
prior to bringing data into Data Import, leaving Data Import to focus on the
task of transforming rows of data into ODS Resources. Thankfully, though, _most_
custom row-by-row record cleanup _can_ be integrated into Data Imports
Transform/Load process, beginning in version 1.0.1, without the need for a
separate wholesale preprocessing of CSV files.

This page documents the feature and walks through a representative example.

## Applying Custom Record Processing

When custom Powershell row-processing scripts are properly developed, reviewed,
and placed by a trusted system administrator, they will become available for
selection within the Data Import _Agent_ definition screen. When defining your
data-processing _Agent_, you can select which custom script you'd like to apply
to each CSV file row. Later, when the _Agent_ works to read your CSV file for
loading into the ODS, each individual row will first be processed by the
specified custom script, and only then will it be transformed by your _Data Map_
to be POSTed to the ODS.

### Instructions for System Administrators

The Data Import web application and Transform/Load process each rely on a
"ShareName" config setting. This indicates the location where files are stored
when uploaded for processing. For instance, if the config setting is set to
"C:\\Temp", then an uploaded CSV file would appear in the subfolders of
C:\\Temp\\DataImport\\... File processing then looks here for files to process.
Similarly, Data Import looks within this folder structure for custom processing
scripts. An administrator can choose to place custom Powershell scripts within
this folder structure. For instance, if the ShareName config setting is set to
"C:\\Temp" and the administrator has a custom script named ExampleScript.ps1,
they should save it to "C:\\Temp\\DataImport\\RowProcessors\\ExampleScript.ps1".
Once present, it will become selectable on the _Add/Edit Agent_ screen:

### Writing Custom Row Processing Scripts

Scripts need to be written in the Powershell programming language. The first
line must be _exactly_ the following:

```powershell title="Required First Line"
param ($row)

```

This means that the script will receive each original CSV row into this script's
$row variable. The rest of the script can be any valid Powershell code. The goal
of the script is to inspect and possibly-modify that $row variable. Naturally
there are 2 fundamental things you may need to do:

* Inspect the original value of a named column within that row.
* Alter the original value of a named column within that row.

In either case, we refer to the column by name:

```powershell title="Inspect and Modify Columns Within a Row"
$row.'Column 1' = 'New Value'  # This line completely replaces the value of the column named 'Column 1' with the brand new value 'New Value'.
$row.'Column 2' = $row.'Column 2' + '!'  # This line modifies the value of the column named 'Column 2' by adding an exclamation point to the end of the original value.
```

## Representative Example: Cleaning Up Excess Blank Spaces

In this example, we'll experience a realistic obstacle involving a CSV file in
need of row-by-row cleanup. We'll first attempt to use Data Import to bring in
the file as-is, experiencing failures due to invalid raw data from the CSV.
We'll account for those problems by introducing a custom script that cleans up
each row during processing, ultimately resulting in the successful loading of
the ODS.

Consider a CSV file from a third-party system which contains Student Assessment
data. In this case, the third-party system produces data with excessive white
space in two of the columns we are interested in (sasid and Overallss\_adj):

```text title="StudentAssessmentsWithExcessSpaces.csv"
adminyear,DistrictNumber,DistrictName,SchoolNumber,SchoolName,sasid,listeningss_adj,speakingss_adj,readingss_adj,writingss_adj,comprehensionss_adj,oralss_adj,literacyss_adj,Overallss_adj
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School, 604825 ,333,349,270,246,289,341,258, 283
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,  604826  ,303,392,100,100,161,348,100,  174
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,   604835   ,363,230,152,202,215,297,177,   213
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,    604864    ,294,262,251,263,264,278,257,    263
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,     604870     ,209,237,269,277,251,223,273,     258
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,      604888      ,270,237,296,251,288,254,274,      268
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,       604890       ,270,262,289,242,283,266,266,       266
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,        604904        ,934,948,932,926,933,941,929,        933
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,         604902         ,939,939,928,930,931,939,929,         932
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,          604876          ,938,925,929,916,932,932,923,          925

```

Similar to the [Quick Start](../../../data-import/getting-started/quick-start),
the user sets up any necessary _Bootstrap_ items, a _Data Map_ for mapping these
CSV columns to ODS Student Assessements, and an _Agent._ Because of the invalid
excess spaces in the sasid column, though, the first attempt to load the ODS
rightly fails. In the _Logs \\ Ingestion_ screen, we see a detailed description
of the failures like so:

Here, we see that the ODS rejects this first attempt, because the excess spaces
resulted in invalid studentUniqueId values. Surely the extra spaces in the score
values would also become problematic after correcting the studentUniqueId
values. We'll need to intervene with both of these problematic columns before we
could expect the ODS to accept them.

A custom script to "trim" these excess spaces is fairly straightforward:

```powershell title="CleanStudentAssessments.ps1"
param ($row)

$row.'sasid' = $row.'sasid'.Trim()
$row.'Overallss_adj' = $row.'Overallss_adj'.Trim()
```

After placing this file within the Share as described above, and updating
our _Agent_ to use this script, we retry the file and encounter success.
The _Logs \\ Ingestion_ screen shows that cleaned-up values were POSTed to the
ODS:
