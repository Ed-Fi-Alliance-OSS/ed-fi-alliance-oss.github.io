# Data Import

August 2024: On behalf of the Ed-Fi community, we are pleased to announce the release of Data Import v2.3. For more details see What's New in Data Import.

## Overview

Data Import is a tool that simplifies the loading of CSV data to the Operational Data Store (ODS) of the Ed-Fi ODS / API. The import tool handles domains where vendor integration to the Ed-Fi APIs is not possible from legacy data sources such as state assessment systems. The system works by providing methods to extract information out of spreadsheet-based CSV data files, and transform and load to the Ed-Fi ODS / API.

The Data Import tool is a multi-project C# .NET solution. It has a web administration panel in ASP.NET to view data and job status, and .NET command-line server components to process data. Data Import is compatible with Ed-Fi ODS / API v5.3 and higher.

Primary features of Data Import include:

* Obtain CSVs via SFTP, FTPS, web site, or manual upload

* Map CSVs to Ed-Fi API endpoints and map CSV columns to Ed-Fi attributes

* Populate CSV row data into an Ed-Fi ODS / API based on mappings

* View import job status and other details

## Licensing

The Data Import tool is licensed through the Apache 2.0 license.
