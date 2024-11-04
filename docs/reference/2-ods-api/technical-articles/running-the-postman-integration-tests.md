# Running the Postman Integration Tests

The Ed-Fi ODS / API includes several collections of Postman tests that can be
executed against a Test Harness included in the ODS / API source code.

The following instructions assume that the Ed-Fi ODS / API has been successfully
set up and is running in a local environment per the instructions in
the [Getting Started](../getting-started) documentation. This
documentation takes you through running two options for running postman test
collections.

## Running Postman Test Collections via PowerShell

1. Install [Node.js 18+](https://nodejs.org)

   :::tip

   Many Windows users choose [nvm for
   Windows](https://github.com/coreybutler/nvm-windows/releases) to manage
   Node.js installations.

    :::

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
2. Run the EdFi.Ods.Api.IntegrationTestHarness project from the ODS solution.
    This will create the Postman Environment file required for the tests to
    run.
    1. Run the EdFi.Ods.Api.IntegrationTestHarness project. Test Harness will
        create test API clients in the EdFi\_Admin\_Test database, create a
        Postman environment file and run a test API instance for the Postman
        tests to interact with.

        :::tip

        In Visual Studio, you can right click on the TestHarness project, then
        choose `Debug > Start New Instance` from the popup menu.

        :::

    2. After the test harness is running, open Postman and import the generated
        environment file located at
        `Ed-Fi-ODS-Implementation\logistics\scripts\modules`
    3. Ensure the environment is selected on the to right corner of Postman
        window.

        :::tip

        See [Navigating
        Postman](https://learning.postman.com/docs/getting-started/basics/navigating-postman)
        for additional help on choosing an environment in Postman

        :::

3. Locate (or download) the Ed-Fi ODS Integration Test Suite collections from
    the [Ed-Fi-ODS GitHub
    repository](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS). Look in
    `Ed-FI-ODS\Postman Test Suite` directory.
4. Import one or more of the collections into Postman using the _Import_
    function located in the upper left corner of the Postman window.
5. Run the tests using the [Collection
   Runner](https://learning.postman.com/docs/collections/running-collections/intro-to-collection-runs/).
6. Monitor test execution and review the test results.
