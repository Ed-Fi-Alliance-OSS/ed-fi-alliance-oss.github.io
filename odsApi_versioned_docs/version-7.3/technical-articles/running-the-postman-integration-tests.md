# Running the Postman Integration Tests

The Ed-Fi ODS / API includes several collections of Postman tests that can be
executed against a Test Harness included in the ODS / API source code.

The following instructions assume that the Ed-Fi ODS / API has been successfully
set up and is running in a local environment per the instructions in
the [Getting Started](../getting-started) documentation. This
documentation takes you through running two options for running postman test
collections:

## Running Postman Test Collections via PowerShell

1. Install NVM, for windows systems you could use [nvm for Windows](https://github.com/coreybutler/nvm-windows/releases)

2. As outlined in the [Getting Started
    Guide](../getting-started/source-code-installation/readme.md)
    from a PowerShell prompt run `Initialize-PowershellForDevelopment.ps1`
    script followed by `initdev -usePlugins`  and finally
    `Invoke-PostmanIntegrationTests`

    ```powershell
    PS D:\ed-fi\Ed-Fi-ODS-Implementation> .\Initialize-PowershellForDevelopment.ps1

    Using repositories: Ed-Fi-ODS, Ed-Fi-ODS-Implementation
    Importing Module: D:\ed-fi\Ed-Fi-ODS-Implementation\Application\SolutionScripts\InitializeDevelopmentEnvironment.psm1
    PS D:\ed-fi\Ed-Fi-ODS-Implementation> initdev -usePlugins

    ----------------------------------------
        Invoke-NewDevelopmentAppSettings
    ----------------------------------------

    <trimmed output...>

    PS D:\ed-fi\Ed-Fi-ODS-Implementation> Invoke-PostmanIntegrationTests

    --------------------------------------
        Invoke-PostmanIntegrationTests
    --------------------------------------

    Using repositories: Ed-Fi-ODS, Ed-Fi-ODS-Implementation
    Importing Module: D:\ed-fi\Ed-Fi-ODS-Implementation\Application\SolutionScripts\InitializeDevelopmentEnvironment.psm1

    <trimmed output...>
    ```

3. Test results are presented as the tests run

   ```powershell
   <trimmed output...>
   ------------------------------------------------------------------
   |                         |          executed |           failed |
   --------------------------+-------------------+-------------------
   |              iterations |                 1 |                0 |
   --------------------------+-------------------+-------------------
   |                requests |                89 |                0 |
   --------------------------+-------------------+-------------------
   |            test-scripts |               281 |                0 |
   --------------------------+-------------------+-------------------
   |      prerequest-scripts |               282 |                0 |
   --------------------------+-------------------+-------------------
   |              assertions |               109 |                0 |
   ------------------------------------------------------------------
   | total run duration: 13.7s                                      |
   ------------------------------------------------------------------
   | total data received: 254.88kB (approx)                         |
   ------------------------------------------------------------------
   | average response time: 41ms [min: 3ms, max: 410ms, s.d.: 52ms] |
   ------------------------------------------------------------------
   Invoke-Newman done in 9m22s.

   ------------------------
       Stop-TestHarness
   ------------------------


   NPM(K)    PM(M)    WS(M) CPU(s)    Id SI ProcessName
   ------    -----    ----- ------    -- -- -----------
     391 1,591.07 1,620.68   9.25 36520  1 EdFi.Ods.Api.IntegrationTestHarness

   Stop-TestHarness done in 45ms.
   Invoke-PostmanIntegrationTests done in 9m39s.

   Duration Task
   -------- ----
   09:39.58 Invoke-PostmanIntegrationTests
   ```

:::info

To capture the execution output of the Postman tests into a log file for full
review (since the console window buffer may not be large enough to review the
entire results of the test), you can do the following:

1. Create a script (e.g. _run-postman-tests-core.ps1_) in the
   _Ed-Fi-ODS-Implementation_ folder with the following content:

  ```powershell
  .\Initialize-PowershellForDevelopment.ps1
  Invoke-PostmanIntegrationTests
  ```

1. Create a second script (e.g. _run-postman-tests.ps1_) in
   the _Ed-Fi-ODS-Implementation_ folder with the following content:

  ```powershell
  Start-Process powershell.exe .\run-postman-tests-core.ps1 -RedirectStandardOutput .\tests.log
  ```

This will capture the _stdout_ from the process and write it to the specified
log file instead. The shell window that is opened won't show any activity during
the test run, so you'll just need to wait until it finishes.

:::

## Running Postman Test Collections via Postman

1. Install and launch [Postman](https://www.getpostman.com/downloads/).
2. Import the Postman collections to test from the "Postman Test Suite" folder
   in the Ed-Fi-ODS repository.
   1. In the Postman UI, click "Import".
      ![Postman Import Button](/img/reference/ods-api/postman1.webp)
   2. Click the "files" link to launch the "Open File" dialog.
      ![Postman Files Link](/img/reference/ods-api/postman2.webp)
3. Create a Postman environment for running the collections.
    ![Postman Environments](/img/reference/ods-api/postman3.webp)
   1. Click on "Environments" section (in the left column).
   2. Click the "+" symbol to create a new environment.
   3. Provide a name for the environment (e.g. "Ed-Fi ODS API (Integration Testing)").
   4. Add 4 Postman environment variables:
       1. **ApiBaseUrl** = **http&#58;//localhost&#58;8765**
       2. **ParentOrContactProperName** = **Parent** (_Ed-Fi Standard v4.x or
         earlier_) or **Contact** (_Ed-Fi Standard v5.x+_)
       3. **CompositesFeatureIsEnabled** = **true**
       4. **ProfilesFeatureIsEnabled** = **true**
4. Load and run the EdFi.Ods.Api.IntegrationTestHarness project from
   Tests/Integration solution folder in the Ed-Fi-Ods solution.
5. Run a Postman test collection.
    1. Select the collection to run (Step 1 below).
    2. Select the Postman environment just created (Step 2 below).
    3. Select "Run collection" from the context menu (Steps 3 and 4 below).
       ![Postman Run Collection](/img/reference/ods-api/postman4.webp)
    4. Click the "Run" button to execute and monitor the progress of all the
      tests in the collection.
       ![Postman Run Button](/img/reference/ods-api/postman5.webp)

:::info
You can easily reset the test databases at any point by performing the following
steps in PowerShell:

1. In a PowerShell console, go to the root folder of the
   Ed-Fi-ODS-Implementation repository (previously cloned from GitHub).
2. Run the following command to initialize the PowerShell environment:

    ```powershell
    .\Initialize-PowershellForDevelopment.ps1
    ```

3. Reset the test databases by executing the following command (repeat as necessary):

    ```powershell
    Reset-TestAdminDatabase; Reset-TestSecurityDatabase; Reset-TestPopulatedTemplateDatabase
    ```

:::
