# Running the Postman Integration Tests

The Ed-Fi ODS / API includes several collections of Postman tests that can be executed against a Test Harness included in the ODS / API source code.

The following instructions assume that the Ed-Fi ODS / API has been successfully set up and is running in a local environment per the instructions in the [Getting Started](../getting-started) documentation. This documentation takes you through two options for running Postman test collections.

## Running Postman Test Collections via PowerShell

1. Install NVM, for windows systems you could use [nvm for Windows](https://github.com/coreybutler/nvm-windows/releases)


2. As outlined in the [Getting Started Guide](../getting-started/source-code-installation/readme.md), from a PowerShell prompt run `Initialize-PowershellForDevelopment.ps1`, then `initdev -usePlugins`, and finally `Invoke-PostmanIntegrationTests`:

    ![image](https://edfi.atlassian.net/wiki/download/thumbnails/25493791/image-2023-10-3_9-7-30.png?version=1&modificationDate=1699456138357&cacheVersion=1&api=v2&width=666&height=146)

3. Test results are presented as the tests run:

    ![Postman test results summary table](https://edfi.atlassian.net/wiki/download/attachments/25493791/image-2023-10-3_9-17-12.png?version=1&modificationDate=1699456138347&cacheVersion=1&api=v2)

    

:::info
To capture the execution output of the Postman tests into a log file for full review (since the console window buffer may not be large enough to review the entire results of the test), you can do the following:

1. Create a script (e.g. _run-postman-tests-core.ps1_) in the _Ed-Fi-ODS-Implementation_ folder with the following content:

    ```powershell
    .\Initialize-PowershellForDevelopment.ps1
    Invoke-PostmanIntegrationTests
    ```

2. Create a second script (e.g. _run-postman-tests.ps1_) in the _Ed-Fi-ODS-Implementation_ folder with the following content:

    ```powershell
    Start-Process powershell.exe .\run-postman-tests-core.ps1 -RedirectStandardOutput .\tests.log
    ```

This will capture the _stdout_ from the process and write it to the specified log file instead. The shell window that is opened won't show any activity during the test run, so you'll just need to wait until it finishes.
:::

## Running Postman Test Collections via Postman

1. Install and launch [Postman](https://www.getpostman.com/downloads/).
2. Run the EdFi.Ods.Api.IntegrationTestHarness project from the ODS solution. This will create the Postman Environment file required for the tests to run.
    - a. Run the EdFi.Ods.Api.IntegrationTestHarness project. Test Harness will create test API clients in the `EdFi_Admin_Test` database, create a Postman environment file, and run a test API instance for the Postman tests to interact with.

        ![image](https://edfi.atlassian.net/wiki/download/attachments/25493791/image2021-10-5_16-59-40.png?version=1&modificationDate=1699456138440&cacheVersion=1&api=v2)

    - b. After the test harness is running, open Postman and import the generated environment file located at `Ed-Fi-ODS-Implementation\logistics\scripts\modules`.
    ![image](https://edfi.atlassian.net/wiki/download/attachments/25493791/image2021-10-5_17-4-17.png?version=1&modificationDate=1699456138423&cacheVersion=1&api=v2)
    ![image](https://edfi.atlassian.net/wiki/download/attachments/25493791/image2021-10-5_17-2-59.png?version=1&modificationDate=1699456138430&cacheVersion=1&api=v2)
    - c. Ensure the environment is selected on the top right corner of the Postman window.
    ![image](https://edfi.atlassian.net/wiki/download/attachments/25493791/image2021-10-6_9-5-10.png?version=1&modificationDate=1699456138367&cacheVersion=1&api=v2)

3. Locate (or download) the Ed-Fi ODS Integration Test Suite collections from the [Ed-Fi-ODS GitHub repository](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS). Look in the `Ed-FI-ODS\Postman Test Suite` directory.

    ![Integration Test Suite directory screenshot](https://edfi.atlassian.net/wiki/download/attachments/25493791/image2021-10-5_17-13-4.png?version=1&modificationDate=1699456138407&cacheVersion=1&api=v2)

4. Import one or more of the collections into Postman using the _Import_ function located in the upper left corner of the Postman window.

    ![Postman Import function screenshot](https://edfi.atlassian.net/wiki/download/attachments/25493791/image2021-10-5_17-14-18.png?version=1&modificationDate=1699456138400&cacheVersion=1&api=v2)

5. Run the tests using the [Collection Runner](https://learning.postman.com/docs/collections/running-collections/intro-to-collection-runs/).

    ![Collection Runner screenshot](https://edfi.atlassian.net/wiki/download/attachments/25493791/image2021-10-6_8-54-29.png?version=1&modificationDate=1699456138393&cacheVersion=1&api=v2)
    ![Collection Runner results screenshot](https://edfi.atlassian.net/wiki/download/attachments/25493791/image2021-10-6_8-55-15.png?version=1&modificationDate=1699456138383&cacheVersion=1&api=v2)

6. Monitor test execution and review the test results.

    ![Test execution results screenshot](https://edfi.atlassian.net/wiki/download/attachments/25493791/image2021-10-6_9-0-0.png?version=1&modificationDate=1699456138373&cacheVersion=1&api=v2)
