# MappingEDU - Service EOL and Open Source Notice

28 March 2022

:::warning

The Alliance will discontinue the MappingEDU service on July 31st, 2022 and
publish the code behind the MappingEDU under the standard Ed-Fi Open Source
license (Apache license, version 2.0).

:::

What is MappingEDU? MappingEDU is an optional online mapping tool published for
use by the Ed-Fi community. It is used by community members to produce mappings
from one data standard to another, a common process in planning data exchange.
The service has always been an optional component of the Ed-Fi product
portfolio.

## What is changing specifically?

There are two changes.

1. The MappingEDU service will be taken offline on the end-of-life (EOL) date
   and no further community access to the service will be possible.
2. The MappingEDU code will be made available under the standard Ed-Fi open
   source license, Apache2. This is intended to allow any users who would like
   to continue to use the service to install and run it locally. The code will
   be published on the Ed-Fi Exchange on or prior to February 15, 2022 to allow
   organizations wishing to continue use of the service time to set it up
   locally before the service EOL date.

## If I use the MappingEDU service, what do I need to do before the service EOL date?

We advise any users who will need access to mapping data after the service EOL
date to export it. MappingEDU data exports into an easy-to-understand Excel
format files.

<details>
<summary>Export instructions</summary>
MappingEDU allows both data standards and mapping projects to be exported.

* To export a mapping, please use the instructions here: 1.12 - Export into
  Excel
* To export a data standard
  * Go to the home page of the data standard
  * Click on "Actions"
  * Click on "Export Data Standard" - the data standard will be exported in the
     format documented here: 1.1 - Format a Source Standard for Upload

</details>

## Why is this change being made?

The time and resources spent on MappingEDU can be better used to support growth
and evolution of other Ed-Fi Technology Suite and programs. Specifically:

* Usage of MappingEDU as a tool to perform mappings remains very low.
* There are existing alternatives to the service that are widely available. As
  such, there is no clear strategic benefit to the community from this service.
* The tool is older and technical debt due to use of older libraries and code is
  increasing the expense of code and service maintenance.

## What are other alternatives?

Many organizations simply use spreadsheets, generally either Excel or Google
Sheets.

There are also a lot of specialized tools. Any online research will quickly turn
up many alternatives. Community members are invited to use the [Slack for the
Ed-Fi Community](/community/involved/slack) "General" channel to ask for
recommendations from community colleagues.

## Where can I find information on running the service using the open source code?

The code will be published on the [Ed-Fi
Exchange](https://edfi.atlassian.net/wiki/display/EXCHANGE/MappingEDU)

Follow the README file in the repository for information on installation.

Note that the product has some aging libraries. The Alliance has been managing
and updating the code to address important security notices for components
included in the solution. That work will no longer be performed following the
discontinuation of the service.

## I have a question that is not answered above

Please contact the Alliance via the [Ed-Fi Community
Hub](https://community.ed-fi.org)
