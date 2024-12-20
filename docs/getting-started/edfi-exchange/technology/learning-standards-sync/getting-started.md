---
---
# Getting Started - Learning Standards Sync Utility

This section describes how to get started with the Learning Standards Sync Utility v1.1.

## Steps

* Step 1. Obtain Credentials from Academic Benchmarks
* Step 2. Download and Extract to Location
* Step 3. Install Academic Benchmarks Vendor Claim Set to the Target ODS
* Step 4. Create Ed-Fi Key and Secret
* Step 5. Execute the Learning Standards Sync Utility

### Step 1. Obtain Credentials from Academic Benchmarks

To use the Learning Standards Sync Utility, you will need a AB ID and key from Certica Solutions. Have that AB ID and key available when ready for the learning standards synchronization process. Vendors and education agencies can contact Certica Solutions for a free license to AB Connect here.

Certica Solutions provides support for Academic Benchmarks via [absupport@certicasolutions.com](mailto://absupport@certicasolutions.com). If you have any trouble with the licensing or synchronization, feel free to reach out.

### Step 2. Download and Extract to Location

Download the Learning Standards Sync Utility from the sidebar on the right of this page. Once downloaded, extract the archive file to the desired location, and navigate to the folder. The file named **EdFi.Admin.LearningStandards.CLI.exe** is the utility.

### Step 3. Install Academic Benchmarks Vendor Claim Set to the Target ODS

While in the extracted directory, navigate to the `/scripts` folder which contains SQL install scripts for both SQL Server and Postgres installations.  SQL Server installations should use `/scripts/MsSql`, which contains claim sets for either v2 and v3, depending on your target Ed-Fi ODS / API environment.  Postgres installations should use `/scripts/PgSql`, which contains a claim set for v3.

Install the AB Vendor claim set by running either the `AB Claim Set v2.sql` or `AB Claim Set v3.sql` script against the specific Ed-Fi ODS implementation version being used.  [SQL Server Management Studio](https://docs.microsoft.com/en-us/sql/ssms/sql-server-management-studio-ssms?view=sql-server-2017) (SSMS) for SQL Server or [pgAdmin](https://www.pgadmin.org/) for Postgres are tools that is typically used to execute this script. Execute this script within the EdFi_Security database and create a new claim set called "AB Vendor" that contains the necessary permissions for learning standard synchronization.

### Step 4. Create Ed-Fi Key and Secret

In order for the Learning Standards Sync Utility to populate data within an Ed-Fi ODS / API instance, a vendor record plus an Ed-Fi API key and secret will need to be created.

#### Step 4.1

Create a vendor called "AB Vendor" and set the namespace to one of the following given your Ed-Fi environment:

For a v2.x instance, use: `http://academicbenchmarks.com`
For a v3.x instance, use: `uri://academicbenchmarks.com`

#### Step 4.2

Create an Ed-Fi API key with `AB Vendor` as the vendor and `AB Vendor` as the claimset.

Have the Ed-Fi API key and secret available before proceeding to the next step. At this point, you're ready to execute the learning standards synchronization process.

### Step 5. Execute the Learning Standards Sync Utility

The Learning Standards Sync Utility will connect to AB Connect and synchronize learning standards associated with the ID to the specified Ed-Fi  ODS / API. Specifically, the EdFi.LearningStandards table will be populated using the Ed-Fi API.

Below are sample statements to execute the utility using the **Command Prompt** (`Windows Key` > type `"Command Prompt"` to launch). Similar to setting the namespace in Step 4 above, the exact command will depend on the version of the target Ed-Fi ODS / API instance.

You can cut and paste the commands below as a starting point based on your particular environment:

#### For Ed-Fi ODS / API Version 2.x

```shell
> EdFi.Admin.LearningStandards.CLI.exe sync --ab-connect-id "<AB Connect ID>" --ab-connect-key "<AB Connect Key>" --ed-fi-url "<Ed-Fi URL base>" --ed-fi-key "<Ed-Fi Key>" --ed-fi-secret "<Ed-Fi Secret>" --ed-fi-version 2 --ed-fi-school-year <School Year>
```

#### For Ed-Fi ODS / API Version 3.x

```shell
> EdFi.Admin.LearningStandards.CLI.exe sync --ab-connect-id "<AB Connect ID>" --ab-connect-key "<AB Connect Key>" --ed-fi-url "<Ed-Fi URL base>" --ed-fi-key "<Ed-Fi Key>" --ed-fi-secret "<Ed-Fi Secret>"
```

The commands are largely the same for each version. The command for v2.x simply adds the `--ed-fi-version` and `--ed-fi-school-year` options to the sync command.

The sections that follow provide more information about the Sync Utility, plus troubleshooting and support information in case anything went wrong.

## Usage

### Basic Usage

## Commands

The Ed-Fi Learning Standards Sync Utility is a command-line interface (CLI) application. The application currently contains 3 commands that can be used with the respective options:

* EdFi.Admin.LearningStandards.CLI.exe
* EdFi.Admin.LearningStandards.CLI.exe sync
* EdFi.Admin.LearningStandards.CLI.exe validate
* EdFi.Admin.LearningStandards.CLI.exe changes
* Each command is detailed below.

### EdFi.Admin.LearningStandards.CLI.exe

#### Usage

`> EdFi.Admin.LearningStandards.CLI.exe [options]`

#### Options

`--version`

Displays the application version of the Sync Utility.

`--help`

Displays a list of available commands, and their descriptions.

You can use `EdFi.Admin.LearningStandards.CLI.exe <command> --help` to display help context specific to that command.

#### Examples

List available commands:

`> EdFi.Admin.LearningStandards.CLI.exe --help`

List help for the sync command:

`> EdFi.Admin.LearningStandards.CLI.exe sync --help`

Determine CLI application version:

```shell
> EdFi.Admin.LearningStandards.CLI.exe --version
> Ed-Fi Learning Standards CLI: 1.1.0
```

### EdFi.Admin.LearningStandards.CLI.exe sync

The `EdFi.Admin.LearningStandards.CLI.exe sync` command provides the ability to synchronize learning standards from the AB Connect API to a specified Ed-Fi ODS instance.

#### Usage

`> EdFi.Admin.LearningStandards.CLI.exe sync [options]`

#### Options

`--ab-connect-id Required`

The Academic Benchmarks AB Connect ID to use.

`--ab-connect-key Required`

The Academic Benchmarks AB Connect Key to use.

`--ed-fi-url Required`

The Ed-Fi ODS url to use.

`--ed-fi-key Required`

The Ed-Fi ODS API key to use.

`--ed-fi-secret Required`

The Ed-Fi ODS API secret to use.

`--ab-auth-window`

The buffer window, in seconds to use when refreshing an upcoming token expiration. Defaults to 300.

`--ab-retry-limit`

The number of retry attempts the application will make in case of failure. Defaults to 3.

`--ed-fi-auth-url`

The Ed-Fi ODS authentication url to use. Defaults to the oauth section of the provided base url.

`--ed-fi-version`

The Ed-Fi ODS version to use. Defaults to latest version.

`--ed-fi-school-year`

The school year to use when querying the Ed-Fi ODS API.

`--ed-fi-retry-limit`

The number of retry attempts the application will make in case of failure. Defaults to 2.

`--ed-fi-simultaneous-request-limit`

The number of simultaneous requests allowed during synchronization. Defaults to 4.

`--force-full`

Instructs the CLI to force a full synchronization, ignoring the current change state and replacing it.

`-v, --verbose`

Set output to verbose messages.

`-u, --unattended`

If enabled, the application will close immediately when finished.

`--help`

Display this help screen for the sync method.

#### Examples

**Basic usage:**

```shell
> EdFi.Admin.LearningStandards.CLI.exe sync --ab-connect-id "test_account" --ab-connect-key "ajk84Hjk93h59skaAJ8732" --ed-fi-url "<https://api.ed-fi.org>" --ed-fi-key "RvcohKz9zHI4" --ed-fi-secret "E1iEFusaNf81xzCxwHfbolkC"
```

### EdFi.Admin.LearningStandards.CLI.exe validate

The EdFi.Admin.LearningStandards.CLI.exe validate command provides the ability to validate the specified AB Connect API and Ed-Fi ODS / API instance configuration settings.

#### Usage

`> EdFi.Admin.LearningStandards.CLI.exe validate [options]`

#### Options

`--ab-connect-id Required`

The Academic Benchmarks AB Connect ID to use.

`--ab-connect-key Required`

The Academic Benchmarks AB Connect Key to use.

`--ed-fi-url Required`

The Ed-Fi ODS url to use.

`--ed-fi-key Required`

The Ed-Fi ODS API key to use.

`--ed-fi-secret Required`

The Ed-Fi ODS API secret to use.

`--ab-auth-window`

The buffer window, in seconds to use when refreshing an upcoming token expiration. Defaults to 300.

`--ab-retry-limit`

The number of retry attempts the application will make in case of failure. Defaults to 3.

`--ab-simultaneous-request-limit`

The number of simultaneous requests allowed during synchronization. Defaults to 10.

`--ed-fi-auth-url`

The Ed-Fi ODS authentication url to use. Defaults to the oauth section of the provided base url.

`--ed-fi-version`

The Ed-Fi ODS version to use. Defaults to latest version.

`--ed-fi-school-year`

The school year to use when querying the Ed-Fi ODS API.

`--ed-fi-retry-limit`

The number of retry attempts the application will make in case of failure. Defaults to 2.

`--ed-fi-simultaneous-request-limit`

The number of simultaneous requests allowed during synchronization. Defaults to 4.

`-v, --verbose`

Set output to verbose messages.

`-u, --unattended`

If enabled, the application will close immediately when finished.

`--help`

Display this help screen for the validate method.

#### Examples

**Basic usage:**

```shell
> EdFi.Admin.LearningStandards.CLI.exe validate --ab-connect-id "test_account" --ab-connect-key "ajk84Hjk93h59skaAJ8732" --ed-fi-url "<https://api.ed-fi.org>" --ed-fi-key "RvcohKz9zHI4" --ed-fi-secret "E1iEFusaNf81xzCxwHfbolkC"
```

### EdFi.Admin.LearningStandards.CLI.exe changes

The EdFi.Admin.LearningStandards.CLI.exe changes command provides methods for checking to see if changes exist based on the last persisted sequence id, and to retrieve the current change sequence id from the API.

#### Usage

`> EdFi.Admin.LearningStandards.CLI.exe changes [options]`

Options

`--ab-connect-id` (Required)

The Academic Benchmarks AB Connect ID to use.

`--ab-connect-key` (Required)

The Academic Benchmarks AB Connect Key to use.

`--ed-fi-url` (Required)

The Ed-Fi ODS url to use.

`--ed-fi-key` (Required)

The Ed-Fi ODS API key to use.

`--ed-fi-secret` (Required)

The Ed-Fi ODS API secret to use.

`--ab-auth-window`

The buffer window, in seconds to use when refreshing an upcoming token expiration. Defaults to 300.

`--ab-retry-limit`

The number of retry attempts the application will make in case of failure. Defaults to 3.

`--ab-simultaneous-request-limit`

The number of simultaneous requests allowed during synchronization. Defaults to 10.

`--max-sequence-id-only`

Instructs the CLI to retrieve only the max sequence id from the AB API, instead of the full summary.

`-o, --output`

Set the output format to either the default value of text, or json.

`-v, --verbose`

Set output to verbose messages.

`-u, --unattended`

If enabled, the application will close immediately when finished.

`--help`

Display this help screen for the validate method.

#### Examples

**Basic usage:**

```shell
EdFi.Admin.LearningStandards.CLI.exe changes --ab-connect-id test_account --ab-connect-key ajk84Hjk93h59skaAJ8732 --ed-fi-url <https://api.ed-fi.org> --ed-fi-key RvcohKz9zHI4 --ed-fi-secret E1iEFusaNf81xzCxwHfbolkC
...
Changes available: True Current Sequence Id: 0 Available Sequence Id: 988335
```

## Troubleshooting

This section provides troubleshooting information.S

### General Troubleshooting

The Ed-Fi Learning Standards Sync Utility contains robust logging, capable of displaying both on-screen messaging and file log messaging. These can be used to provide more information on potential issues that may be encountered when using the tool.

#### Certica AB Product Troubleshooting

Certica Solutions provides support for Academic Benchmarks via [absupport@certicasolutions.com](mailto://absupport@certicasolutions.com). If you have any trouble with the licensing or issues with the synchronization that appear to originate with the AB solution, feel free to reach out.

#### Using the [-v | --verbose] Argument

Using the `[-v |--verbose]` argument will instruct the application to output detailed log messages that are not normally written to the command window. These can include HTTP connection logs, authentication success or failure details, detailed synchronization messages, and others.

**Example Command:**

```shell
> EdFi.Admin.LearningStandards.CLI.exe validate --verbose --ab-connect-id "test_account" --ab-connect-key "ajk84Hjk93h59skaAJ8732" --ed-fi-url "https://api.ed-fi.org" --ed-fi-key "RvcohKz9zHI4" --ed-fi-secret "E1iEFusaNf81xzCxwHfbolkC"

Verbose: Arguments parsed successfully
Verbose: Creating logging services
Verbose: Adding learning standard services
Validating configuration
Error: There was a problem retrieving an access token from
     https://api.ed-fi.org/oauth/token.
Finished. Press any key to exit.
```

#### Using the log files

Log files are written to the same directory as the application. These logs contain even more technical information than the --verbose switch does about the operational flow of the application.

**Example Command:**

```shell
> EdFi.Admin.LearningStandards.CLI.exe validate --ab-connect-id "test_account" --ab-connect-key "ajk84Hjk93h59skaAJ8732" --ed-fi-url "<https://api.ed-fi.org>" --ed-fi-key "RvcohKz9zHI4" --ed-fi-secret "E1iEFusaNf81xzCxwHfbolkC"
```

**Example Log Output:**

```shell
09:34:03:561 DEBUG [AcademicBenchmarksAuthTokenManager] Created token for test_account, expiring 1543934043
09:34:03:687 DEBUG [EdFiOdsApiv3AuthTokenManager] An existing access token was not found. Starting refresh
09:34:03:722 DEBUG [EdFiOdsApiv3AuthTokenManager] Sending access token request to https://api.ed-fi.org/oauth/token
09:34:04:012 ERROR [EdFiOdsApiv3AuthTokenManager] The access token request responded with a NotFound status.

```

## Next Steps and Support

You can download a mapping between the AB data model and the Ed-Fi data model in the sidebar on this page.
