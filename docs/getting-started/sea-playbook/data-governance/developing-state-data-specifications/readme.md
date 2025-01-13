# Developing State Data Specifications

## Overview

To use the Ed-Fi Data Standard, states must re-express, in Ed-Fi Data Standard language, the data specifications they have provided to their technology providers and school districts.

The data specifications comprise elements that your state needs to collect in order to meet your reporting needs and that vendor systems in LEAs will send to your Ed-Fi API. The elements needed in your specifications depend on the use cases you intend to service, such as state reporting, EDFacts/Federal Reporting, etc.

For a successful Ed-Fi Technology Suite implementation, we recommend states start small and identify one or two priority use cases as a starting point.

Defining a data specification generally means mapping between the state elements and those elements in the Ed-Fi Data Standard. This mapping exercise will identify where the elements are 1:1 aligned, where they are not 1:1 aligned, what elements need to be omitted, and what elements do not exist in Ed-Fi (e.g., need to be added using Ed-Fi Extensions – more on this below).

## Sample State Data Specifications

Below are a few examples of SEAs that are using Ed-Fi, and can be useful models to follow on how to publish your Ed-Fi-based state standards.

Most state data specifications are shared openly online, because states need a broad vendor community to engage with and use them. Some use case examples are below:

| State | Data Specification Link |
| --- | --- |
| AZ  | [AzEDS for Developers \| Arizona Department of Education](https://www.azed.gov/information-technology/azeds/developers) |
| NE  | [ADVISER Resources \| Nebraska Department of Education](https://www.education.ne.gov/dataservices/adviser-resources/#1533221816265-b51e789f-abfc) |
| WI  | [WISEdata Domains and Endpoints \| Wisconsin Department of Public Instruction](https://wisconsindpi.atlassian.net/wiki/spaces/widpiedfi/pages/2294032/Data+Domains+Endpoints+Integrations) |

## State-Specific Data Elements - Ed-Fi Extensions

The gaps you identified during the mapping exercise are the data elements that are not in Ed-Fi Data Standard and need to be added to the Ed-Fi API and Operational Data Store. These are called "Extensions."

Once these are identified as Extensions in the mapping document, a business analyst or a developer must use the MetaEd tool to create these Extensions. Refer to these documents to learn more:

* [How To: Extend the Ed-Fi ODS / API - Student Transportation Example](/reference/ods-api/how-to-guides/how-to-extend-the-ed-fi-ods-api-student-transcript-example)
* [MetaEd IDE User Guide](/reference/metaed/ide-user-guide)

Here are some examples of state-specific extensions to the Ed-Fi Data Standard.

| State | Extension Link |
| --- | --- |
| AZ  | [https://www.azed.gov/information-technology/azeds/developers](https://www.azed.gov/information-technology/azeds/developers) |
| IN  | [https://www.in.gov/doe/it/link-initiative/data-exchange/#Data\_Exchange\_Ed\_Fi\_API\_Suite\_3\_v6\_0\_for\_Developers](https://www.in.gov/doe/it/link-initiative/data-exchange/#Data_Exchange_Ed_Fi_API_Suite_3_v6_0_for_Developers) |
| NE  | [https://www.education.ne.gov/dataservices/adviser-resources/#1533221816265-b51e789f-abfc](https://www.education.ne.gov/dataservices/adviser-resources/#1533221816265-b51e789f-abfc) |
| SC  | [https://ed.sc.gov/data/information-systems/interoperability-resources/ed-fi-in-south-carolina/](https://ed.sc.gov/data/information-systems/interoperability-resources/ed-fi-in-south-carolina/) |
| TX  | [https://www.texasstudentdatasystem.org/tsds/teds/ods-upgrade-data-standards](https://www.texasstudentdatasystem.org/tsds/teds/ods-upgrade-data-standards) |
| WI  | [https://wisconsindpi.atlassian.net/wiki/spaces/widpiedfi/pages/2294032/Data+Domains+Endpoints+Integrations](https://wisconsindpi.atlassian.net/wiki/spaces/widpiedfi/pages/2294032/Data+Domains+Endpoints+Integrations) |

## Other Elements

### State-Specific Code Values

States also need to express code sets in Ed-Fi. Ed-Fi code sets are called "descriptors." These values need to be imported in the Ed-Fi ODS so that technology providers submitting data can reference these values as they submit their data. Note that the API will reject records if descriptors used in those records are not loaded into the ODS; this is an important safeguard to improve data quality.

The Ed-Fi Data Standard ships with a set of default Descriptors. States are advised generally to avoid using those values. Full guidance on descriptor recommendations can be found in the Ed-Fi Data Standard documentation: [Descriptor Guidance](/reference/data-exchange/technical-articles/descriptor-guidance).

### Seed Data

Before states receive the student information data from their technology providers, they load a set of data initially (i.e., "seed data") into the Ed-Fi ODS. This includes Education Organizations (schools, LEAs, SEAs) and Courses. Some states load program information as well.

Always follow the data dependency order when you are loading this data into the Ed-Fi ODS. States have used either SQL scripts or [bulk console](/reference/ods-api/how-to-guides/how-to-load-the-ods-with-sample-xml-data-using-bulk-load-client-utility) process using XML files to load the education organization and course information.
