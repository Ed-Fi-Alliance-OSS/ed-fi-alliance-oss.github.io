---
---
# What's New - Learning Standards Sync Utility

This section provides an overview of what's new for Learning Standards Sync Utility releases.

## Learning Standards Sync Utility v 1.1 (Latest Release)

The following improvements. and fixes were made in the Learning Standards Sync Utility 1.1 release.

### Updates

* The sync CLI command now supports retrieving only the Academic Benchmark standards that have changed during synchronization. This new behavior is enabled by default after an initial sync.
* Server-side proxy updates were made to resolve learning standard sequencing issues between parent and child standards, which were causing download issues.
  * The fix is documented in [EDFI-235](https://tracker.ed-fi.org/browse/EDFI-235?src=confmacro)
* A `changes` CLI command has been added that provides information regarding the availability of Academic Benchmark standards changes.
  * The output from the `changes` command is optionally available in a JSON format for scripting integration.

```shell
$output = .\EdFi.Admin.LearningStandards.CLI.exe changes --ab-connect-id demo --ab-connect-key "12345678910" --ed-fi-url "https://api.ed-fi.org/v2.6.0/api/" --ed-fi-key "RvcohKz9zHI4" --ed-fi-secret "E1iEFusaNf81xzCxwHfbolkC" --ed-fi-version 2 --ed-fi-school-year 2020 --output json --unattended

if($LASTEXITCODE -le 0) {
    # Skip validation outputs, then convert the payload.
    $json = $output[2..500] | ConvertFrom-Json

    if ($json.changesAvailableInformation.available -eq $true) {
       # Notify someone that changes are present and then run sync?
        Write-Output "Changes Available."
    }
} else {
    throw $output
}
```

* `AB Vendor` Claimset for Ed-Fi ODS/API implementations using a Postgres database.

## Learning Standards Sync Utility v 1.0

The following release notes were issued with the initial release of Learning Standards Sync Utility v1.0.

* The Ed-Fi Learning Standards Sync Utility is a tool for system administrators for synchronizing learning standards between the AB Connect API and a specified Ed-Fi ODS / API instance. Using the tool requires active credentials for both the target Ed-Fi ODS / API instance and the AB Connect API. The Sync Utility application provides a command-line interface (CLI) to set parameters and define options.
* [Getting Started](./getting-started.md) provides instructions and a how-to overview for using Learning Standards Sync Utility v1.0.
