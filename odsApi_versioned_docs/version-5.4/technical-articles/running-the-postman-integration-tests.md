---
sidebar_position: 9
---

# Running the Postman Integration Tests

The Ed-Fi ODS / API includes several collections of Postman tests that can be
executed against a Test Harness included in the ODS / API source code.

The following instructions assume that the Ed-Fi ODS / API has been successfully
set up and is running in a local environment per the instructions in the [Getting Started](../getting-started/readme.md) documentation. This documentation takes you through running two options for
running postman test collections:

* Running Postman Test Collections via PowerShell
* Running Postman Test Collections via Postman

## Running Postman Test Collections via PowerShell

1. Install NVM, for windows systems you could use [nvm for Windows](https://github.com/coreybutler/nvm-windows/releases)
2. As outlined in the [Getting Started Guide](../getting-started/readme.md) from a PowerShell prompt run Initialize-PowershellForDevelopment.ps script
followed by Invoke-PostmanIntegrationTests 

   ![PowerShell command](https://edfidocs.blob.core.windows.net/$webhttps://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2021-10-5_16-41-25.png)

3. Test results are presented as the tests run  

   ![PowerShell results](https://edfidocs.blob.core.windows.net/$webhttps://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2021-10-5_16-43-41.png)

## Running Postman Test Collections via Postman

1. Install and launch [Postman](https://www.getpostman.com/downloads/).
2. Run the EdFi.Ods.Api.IntegrationTestHarness project from the ODS solution. This
will create the Postman Environment file required for the tests to run.

    a. Update the launch settings to appropriate configuration for your local repository.
    
       ![Launch settings](https://edfidocs.blob.core.windows.net/$webhttps://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2021-10-5_16-56-1.png)

    b. Run the EdFi.Ods.Api.IntegrationTestHarness project. Test Harness will create test API clients in the EdFi_Admin_Test database, create a Postman environment file and run a test API instance for the Postman tests to interact with.
    
       ![Test harness running](https://edfidocs.blob.core.windows.net/$webhttps://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2021-10-5_16-59-40.png)

    c. After the test harness is running, import the generated environment file located at ~Ed-Fi-ODS-Implementation\logistics\scripts\modules
    
       ![Environment file](https://edfidocs.blob.core.windows.net/$webhttps://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2021-10-5_17-4-17.png)
    
       ![Import environment](https://edfidocs.blob.core.windows.net/$webhttps://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2021-10-5_17-2-59.png)

    d. Ensure the environment is selected on the top right corner of Postman window.
    
       ![Select environment](https://edfidocs.blob.core.windows.net/$webhttps://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2021-10-6_9-5-10.png)

3. Locate (or download) the Ed-Fi ODS Integration Test Suite collections from the Ed-Fi-ODS GitHub repository. See the reference section on the right for GitHub link.  

   ![Postman collections](https://edfidocs.blob.core.windows.net/$webhttps://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2021-10-5_17-13-4.png)

4. Import one or more of the collections into Postman using the Import function located in the upper left corner of the Postman window. 

   ![Import collections](https://edfidocs.blob.core.windows.net/$webhttps://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2021-10-5_17-14-18.png)

5. Run the tests using the Collection Runner. 

   ![Collection runner](https://edfidocs.blob.core.windows.net/$webhttps://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2021-10-6_8-54-29.png)

   ![Run configuration](https://edfidocs.blob.core.windows.net/$webhttps://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2021-10-6_8-55-15.png)

6. Monitor test execution and review the test results. 

   ![Test results](https://edfidocs.blob.core.windows.net/$webhttps://edfidocs.blob.core.windows.net/$web/img/reference/ods-api/image2021-10-6_9-0-0.png)

