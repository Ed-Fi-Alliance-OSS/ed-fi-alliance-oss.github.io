# Custom Student Id File Generation Example

In this example, we are working with a CSV file containing Student Assessment
data. One of the columns is the Student USI which tells us the Student related
to the Student Assessment. However, in order to load this Student Assessment to
the ODS, we need the Student Unique Id, not the Student USI.

Consider a CSV file from a third-party system which contains this Student
Assessment data. In this case, the third-party system produces data with a
StudentUSI and we must perform a lookup so we can get the StudentUniqueId:

**StudentAssessmentsWithStudentUSI.csv**

```cv
adminyear,DistrictNumber,DistrictName,SchoolNumber,SchoolName,StudentUSI,listeningss_adj,speakingss_adj,readingss_adj,writingss_adj,comprehensionss_adj,oralss_adj,literacyss_adj,Overallss_adj
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,134709,333,349,270,246,289,341,258,283
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,134537,303,392,100,100,161,348,100,174
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,230626,363,230,152,202,215,297,177,213
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,62776,294,262,251,263,264,278,257,263
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,9888,209,237,269,277,251,223,273,258
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,8,270,237,296,251,288,254,274,268
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,185634,270,262,289,242,283,266,266,266
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,185565,934,948,932,926,933,941,929,933
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,212298,939,939,928,930,931,939,929,932
2018,255901,Grand Bend ISD,255901107,Grand Bend Elementary School,26811,938,925,929,916,932,932,923,925

```

We also have a table called StudentLookups defined with StudentUSI as the
primary key and StudentUniqueId as the value. Here is a snippet of some of the
records in that table:

![dbo.StudentLookups](https://edfi.atlassian.net/wiki/download/thumbnails/24117519/image2020-1-23_15-39-12.png?version=1&modificationDate=1579816932767&cacheVersion=1&api=v2&width=134&height=114)

A custom script to "look up" the Student Unique Id from the Student USI looks
like this:

**StudentIdLookup.ps1**

```ps1
$connectionString = "--Enter the connection string needed to access your lookup table--"

$inputCsvFile = "C:\Temp\FileGenerationWorkingFolder\ACCESS-ELL-sample-2018-GrandBend-With-StudentUSI.csv"
$outputCsvFile = "C:\Temp\FileGenerationWorkingFolder\ACCESS-ELL-sample-2018-GrandBend-With-StudentUniqueID.csv"

function TransformCsv($inputCsvFile, $outputCsvFile, $alterRow) {
    Import-Csv $inputCsvFile | Select-Object -Property *, @{label = 'StudentUniqueId'; expression = "0"} | ForEach-Object { Invoke-Command $alterRow -ArgumentList $_ } | Export-Csv $outputCsvFile -NoTypeInformation
}

function get-replacement($original) {
    $connection = new-object System.Data.SqlClient.SqlConnection($connectionString)
    try {
        $connection.Open();

        $command = $connection.CreateCommand()
        try {
            $command.CommandText = "SELECT [Value] FROM [dbo].[StudentLookups] WHERE [Key] = @Original"
            $command.Parameters.AddWithValue("@Original", $original) | Out-Null

            $reader = $command.ExecuteReader()
            try {
                $replacements = @()

                while ($reader.Read()) {
                    $replacements += $reader.GetValue(0)
                }

                if ($replacements.Length -ne 1) {
                    throw "Expected exactly one unambiguous match for original id '$($original)' but found $($replacements.Count) matches."
                }

                return $replacements[0]
            }
            finally {
                $reader.Dispose()
            }
        }
        finally {
            $command.Dispose()
        }
    }
    finally {
        $connection.Dispose()
    }
}

TransformCsv $inputCsvFile $outputCsvFile {
    param ($row)

    $row.'StudentUniqueId' = (get-replacement $row.'StudentUSI')

    # Output the modified row.
    return $row
}

return $outputCsvFile
```

This script is run to generate the output file, which will contain the
StudentUniqueIds. When this script is run, the StudentUSI (Key) is used to
retrieve the StudentUniqueId (Value) from the StudentLookups table that we have
defined. To perform this lookup, we need to configure the connection string and
then use the proper query to get the StudentUniqueId. Once this lookup is made,
there is some validation to ensure there is exactly one match and then we add to
the "StudentUniqueId" column with the looked-up value to the output file. The
Transform/Load process then retrieves the output file and performs the mapping
on each row and POSTs to the ODS.

Similar to the [Quick Start](../../../getting-started/quick-start), the user
sets up any necessary _Bootstrap_ items, a _Data Map_ for mapping these CSV
columns to ODS Student Assessements, and a File System/Powershell _Agent_ that
is set up to use the script*.* When setting up the _Data Map_, we added a dummy
column named "StudentUniqueId" to our CSV since Transform/Load will be looking
for the looked-up value in that column.

When we run Transform/Load, we will encounter success. The _Logs \\ Ingestion_
screen shows the looked-up StudentUniqueId value that was POSTed to the ODS:

![Import Logs](https://edfi.atlassian.net/wiki/download/thumbnails/24117519/image2020-1-23_15-53-40.png?version=1&modificationDate=1579816932637&cacheVersion=1&api=v2&width=920&height=345)
