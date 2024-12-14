# Custom Student Id Record Processing Example

In this example, we are working with a CSV file containing Student Assessment data. One of the columns is the Student USI which tells us the Student related to the Student Assessment. However, in order to load this Student Assessment to the ODS, we need the Student Unique Id, not the Student USI.

Consider a CSV file from a third-party system which contains this Student Assessment data. In this case, the third-party system produces data with a StudentUSI and we must perform a lookup so we can get the StudentUniqueId:

**StudentAssessmentsWithStudentUSI.csv**

```
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

We also have a table called StudentLookups defined with StudentUSI as the primary key and StudentUniqueId as the value. Here is a snippet of some of the records in that table:

![dbo.StudentLookups](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/image2020-1-23_15-39-12.png)

A custom script to "look up" the Student Unique Id from the Student USI looks like this:

**StudentIdLookup.ps1**

```
param ($row)

# This example takes a CSV with StudentUSIs and performs a lookup on a database table to retrieve the corresponding StudentUniqueId

# Assumed variables for this snippet
# Assumed table structure with two string columns [Key] and [Value] with a primary key on [Key] so that the table is dictionary-like.
$connectionString = "--Enter the connection string needed to access your lookup table--"

# Function to perform a single lookup.
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

# Your row-by-row processor script will call the get-replacement function in order to add a new column, StudentUniqueId, based on the original column StudentUSI
$row.'StudentUniqueId' = (get-replacement $row.'StudentUSI')
```

This script is run for each row. When this script is run, the StudentUSI (Key) is used to retrieve the StudentUniqueId (Value) from the StudentLookups table that we have defined. To perform this lookup, we need to configure the connection string and then use the proper query to get the StudentUniqueId. Once this lookup is made, there is some validation to ensure there is exactly one match and then we later add the "StudentUniqueId" column with the looked-up value. The Transform/Load process then performs the mapping and POSTs to the ODS. After this, we move on to the next row, where we repeat the same steps.

Similar to the [Quick Start](../../../../data-import/getting-started/quick-start), the user sets up any necessary _Bootstrap_ items, a _Data Map_ for mapping these CSV columns to ODS Student Assessements, and an _Agent_ that is set up to use the script*.* When setting up the _Data Map_, we added a dummy column named "StudentUniqueId" to our CSV since Transform/Load will be looking for the looked-up value in that column.

When we run Transform/Load, we will encounter success. The _Logs \\ Ingestion_ screen shows the looked-up StudentUniqueId value that was POSTed to the ODS:

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/data-import-article-archive/image2020-1-23_15-53-40.png)
