---
sidebar_position: 3
---

# Data Import Error Report

## Solution Overview

This guide describes how set up and use the Data Import Error Report as a companion report to your dashboard. The Data Import Error Report is a simple Power Bi report meant to display errors from the Ed-Fi Alliance's Data Import. This allows for a read-only view of the errors that happen after an import w/o requiring non-technical people to log into the Data Import administration console.

The error report has several columns, all of which can be configured to show our hide based on your specific needs and preferences, these columns include:

* **Date** - The date that the import took place
* **Source** - The source file where the error occurred
* **Row** - The row number in the source file where the bad data is located
* **Resource** - The API endpoint where the data was sent
* **Status** - The HTTP Status message from the import attempt
* **Message** - The message returned from the import attempt
* **Data** - The JSON payload that was sent to the ODS/API

![Sample error report](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/data-import-error-report.png)

We generally recommend that at least Date, Source, Row, Status and Message be included. Resource might be helpful if your source csv are not named in a way that makes it clear what data you are loading. The Data column will show the JSON representation of the data that was sent to the ODS/API and while that might be useful in some cases, it makes each entry much larger, which means more scrolling, so hiding this column is preferred.

### Limiting the amount of data in the report

As part of it's normal operation, Data Import sends a lot of data to it's database. If we were show all data it would quickly become overwhelming to parse through and find useful information. To combat this issue we took a couple of steps:

* We do not retrieve messages from successful imports
* We limit the data retrieved to the past 90 days.

All of the above can be adjusted to fit your needs by adjusting the queries within the Power Bi report.

## Install and Test the Data Import Error Log Report

### Prerequisites

* At this point, you should have an operational Ed-Fi ODS / API with data loaded through Data Import.
* You will also need a machine that has access to the ODS database and has Power BI Desktop installed.

### Download and Configure the Data Import Error Log Dashboard

The latest version of the Data Import Error Log Power BI Dashboard file is located in a [GitHub repository](https://github.com/Ed-Fi-Exchange-OSS/Educator-Pipeline-Dashboards/raw/main/Starter%20Kit%20Support/Data%20Import%20Error%20Log%20Report/Data%20Import%20Error%20Log.pbix).

Use the machine that has Power BI and create the following folder structure: `C:\Ed-Fi\QuickStarts\Error\Log\`.

Save this file onto that location by clicking this link: [Data Import Error Log](https://github.com/Ed-Fi-Exchange-OSS/Educator-Pipeline-Dashboards/raw/main/Starter%20Kit%20Support/Data%20Import%20Error%20Log%20Report/Data%20Import%20Error%20Log.pbix) .

Once the download completes, navigate to the folder where you downloaded the file and double-click it. This should open Power BI and load the Data Import Error Log as depicted below:

![Sample report with no errors loaded](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/data-import-no-errors.png)

### Connect your Power BI Dashboard to your Ed-Fi Data Import

The data that is pre-populated is a set of data that mimics real world data in a educator preparation program.

To connect to your Ed-Fi Data Import Database:

* Use the top menu and navigate to Home and then Transform Data. Click the dropdown arrow and select "Data source settings".

  ![Data Source button](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/connect-to-ods-1.png)

* When the modal opens click on the "Change Source..." button.

  ![Change Source...](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/connect-to-ods-2.png)

* A second modal will popup with inputs to configure your SQL Server server connection. Use the IP address or the hostname of the server that contains the database. Then input the name of your Ed-Fi Data Import database. Usually the name of your database will be `EdFi_DataImport`.

  Depending on your organization's security configuration, you may use integrated or SQL server security.

  ![Choosing a database](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/connect-to-ods-3.png)

* Once you click ‘OK’, you will see SQL statements. Click ‘OK or ‘Run’

  Additionally, it might show you the following screen:

  ![Changing security](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/connect-to-ods-4.png)

  This is where you can switch from Windows Integrated Security to MsSQL security if you desire.

* Proceed to click on connect and accept the defaults.
* You will see a screen that will load data from your Data Import database like the one below. Note that it might take a minute or two to finish loading. This depends on the amount of data and students you have in the database.

  ![Waiting for data to load](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/loading-data-import-errors-data.png)

* Once it loads, the report will show the Data Import log data.

## Step 5. Publish the Error Report

To publish in PowerBI online, follow the same basic steps applied in the main [Setup Guide](./setup-guide.md#step-5-publish-the-program-diversity-and-persistence-dashboard-and-plan-your-rollout)
