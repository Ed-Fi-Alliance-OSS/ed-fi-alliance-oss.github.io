# Rostering Development Guide

The Rostering Development Guide provides a step-by-step process that can be used
to integrate rostering via the Ed-Fi ODS / API into a technology provider
platform.

## Summary

* [Step 1. Analyze and Map Data](#step-1-analyze-and-map-data)
* [Step 2. Develop the Solution](#step-2-develop-the-solution)
* [Step 3. Partner with a Client](#step-3-partner-with-a-client)
* [Step 4. Apply for an Ed-Fi Badge](#step-4-apply-for-an-ed-fi-badge)

## Step 1. Analyze and Map Data

In this step, you will determine the data needs for the intended target platform
and find resources on mapping that data to Ed-Fi.

### Analyze

At this initial stage, you will need to determine the specific roster data
elements required to properly provision the target platform. If the platform is
usually provided roster data via CSV files, remember that data from Ed-Fi in
JSON format is much different. CSV files tend to repeat data and add elements
that can otherwise be referenced in the Ed-Fi ODS / API. It may prove useful to
start from the target platform's database schema in addition to, or instead of
trying to use the CSV files to identify the set of data elements needed by the
target platform.

#### Ed-Fi Enrollment API

The Enrollment API provides a service useful in a Web-based solution that
requires a read-only, "pull" model of data exchange. In the pull model, a client
system uses HTTP GETs as the mechanism to pull information from the data source
hosting the API surface.

Using the Ed-Fi Enrollment API there is no way to determine transactional
changes that may occur in the data. Meaning that every time data needs to be
refreshed, all the data needs to be pulled and changes will need to be
determined on the target platform.

Begin by looking through the [Ed-Fi Enrollment API for Suite
3](https://edfi.atlassian.net/wiki/spaces/EFDSRFC/pages/25363105/ED-FI+RFC+19+-+ENROLLMENT+API+FOR+SUITE+3).
This specification offers a synopsis of the Enrollment API as well as use cases,
discussion, model diagrams, and additional considerations when pulling roster
from the Ed-Fi ODS / API. There is also a public deployment of the [Ed-Fi
Enrollment
API](https://api.ed-fi.org/v5.2/docs/index.html?urls.primaryName=Composites:%20Enrollment)
(as part of the Ed-Fi ODS / API Suite 3 v5.2.0). This deployment provides you
with a way to interact with the Ed-Fi ODS / API via the Swagger UI and see
sample data in the Ed-Fi JSON format.

#### Using Change Queries

Change Queries is a feature of the Ed-Fi API. When the Change Queries feature is
enabled on the host Ed-Fi API, clients are able to query for changes between
specific "version" of the data. The [Using the Changed Record
Queries](/reference/ods-api/client-developers-guide/using-the-changed-record-queries) page
of the [API Client Developers'
Guide](/reference/ods-api/client-developers-guide/) walks through using the
functionality to pull the data that has changed since the last pull.

The Change Queries functionality is not available on the Ed-Fi Enrollment API,
so in order to use this functionality data will need to be consumed from the
individual resources. Begin by reviewing the definition and elements available
in the list of resources below. Each resource listed can be reviewed in detail
in the [Ed-Fi API Suite 3 v5.2 Online
Documentation](https://api.ed-fi.org/v5.2/docs/swagger/index.html?urls.primaryName=Resources)
(SwaggerUI). The [Ed-Fi Data Handbook
v3.2.0](https://schema.ed-fi.org/datahandbook-v320/index.html#/) also defines
the data in a format that is not JSON or API specific.

| resource |     |
| --- | --- |
| /localEducationAgencies | This entity represents an administrative unit at the local level which exists primarily to operate schools or to contract for educational services. It includes school districts, charter schools, charter management organizations, or other local administrative organizations. |
| /schools | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| /students | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency, or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| /staffs | This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion. For example, this includes:<br/><br/>_An "employee" who performs services under the direction of the employing institution or agency is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings.<br/>_   A "contractor" or "consultant" who performs services for an agreed upon fee or an employee of a management service contracted to work on site.<br/>_A "volunteer" who performs services on a voluntary and uncompensated basis.<br/>_   An in-kind service provider.<br/>*   An independent contractor or businessperson working at a school site. |
| /sections | This entity represents a setting in which organized instruction of course content is provided, in-person or otherwise, to one or more students for a given period of time. A course offering may be offered to more than one section. |
| /staffSectionAssociations | This association indicates the class sections to which a staff member is assigned. |
| /studentSchoolAssociations | This association represents the School in which a student is enrolled. The semantics of enrollment may differ slightly by state. Non-enrollment relationships between a student and an education organization may be described using the StudentEducationOrganizationAssociation. |
| /studentSectionAssociations | This association indicates the course sections to which a student is assigned. |

### Map

Once the specific data elements needed by the target platform have been
determined, you will begin the process of identifying the Ed-Fi source for each
of those elements.

:::info

Want to know more before you get started? The Ed-Fi website has detail on the
challenge of Rostering and how the Ed-Fi solution can address the need. Link:
read more about [Education Technology
Vendors](https://www.ed-fi.org/how-to-use-ed-fi/education-technology-vendors/)
and how to [Easily Pull Roster
Data](https://www.ed-fi.org/how-to-use-ed-fi/education-technology-vendors/easily-pull-roster-data/)
on [Ed-Fi.org](http://Ed-Fi.org)

:::

## Step 2. Develop the Solution

In this step, you'll take the outputs from the previous step and use them during
the development to transform the data retrieved from the Ed-Fi ODS / API into
the form used by the persistence layer in the target platform. Also, additional
functionality will be developed to ensure better usability by the end user.

### API Client SDK

Using the OpenAPI specification files for the Ed-Fi Enrollment API, you can
kick-start your development effort by generating an SDK using one of many tools
available to generate API SDKs from an OpenAPI specification file. A thorough
list of SDK generators is available in the [SDK
Generators](https://openapi.tools/#sdk) section of the
OpenAPI [Tools](https://openapi.tools/) page. Included in this solution guide is
a page [Generating an SDK - Ed-Fi
Roster](../rostering-solution-guide/generating-an-sdk.mdx) that will
walk you through the process. You can also refer to the [Ed-Fi ODS / API SDK
Guide](/reference/ods-api/client-developers-guide/using-code-generation-to-create-an-sdk) to
walk through generating a SDK in C#. Once you have the foundational SDK
generated, the data mapping information compiled in the previous step can be
used to transform the data retrieved from the Ed-Fi API into the format needed
by the target platform.

### API Client Best Practices

Take the time to read through all the pages available in the [Ed-Fi API Client
Developers' Guide](/reference/ods-api/client-developers-guide/). It contains
information that is helpful to round out the backend of the API client code that
is being developed. The guide includes information from the initial OAuth2
client credentials flow
[authentication](/reference/ods-api/client-developers-guide/authentication) to
obtain a bearer token to [Error Handling and Best
Practices](/reference/ods-api/client-developers-guide/error-handling-best-practices).
These best practices are drawn from experience gathered from implementation in
the Ed-Fi community.

### Platform User Experience

Although some user experience is covered in the API Client Developers'
Guide, platform-specific user experience features can be added after generating
the SDK, and adding the translation layer to persist the data in the target
platform. The user experience pieces are a crucial part of the development as
this will determine the usability and functionality available to the users of
the system. Usability best practices include having API configuration, API log,
and error resolution screens, as well as auto or manual resend capabilities. All
of these product features ensure the client can maximize their usage of the API
integration. Through community feedback, Ed-Fi has learned that the more
information about the integration that is made available to the clients, the
more issues they are able to resolve on their own. In the end, the data standard
defines the shape of the data, but user experience can determine the overall
usefulness and value to the customer of that data integration in the platform.

### Testing

Initial testing can be done using the [public
deployment](https://api.ed-fi.org/) of the [Ed-Fi ODS / API
v5.2](https://api.ed-fi.org/v5.2/docs/).

* [Enrollment
  API](https://api.ed-fi.org/v5.2/docs/index.html?urls.primaryName=Composites%3A%20Enrollment)

* [Root URL](https://api.ed-fi.org/v5.2.0/api/)

Additionally, if deeper testing and more control of the Ed-Fi ODS / API
environment is needed, there are a number of ways to quickly set up an
environment for internal testing purposes.

*  [Ed-Fi ODS / API for Suite 3 v5.2.0 - Getting
   Started](/reference/ods-api/getting-started/) walks developers through
   setting up the Ed-Fi ODS / API codebase on a development machine.
* [A Quick Deploy of the Ed-Fi ODS / API Development
  Server](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22490024) has
  PowerShell scripts to initialize a server and install a development
  environment Ed-Fi ODS / API.
* A [Docker Deployment 2.x](/reference/docker/v2/) of the Ed-Fi ODS /
  API has also been released.

:::note **Need help?**

If you need assistance with a Solution Guide, engage an Ed-Fi representative via
one of the support channels. Links:

* Ed-Fi Slack channel
  [#starter-kits](https://ed-fi-alliance.slack.com/archives/C01DV8ANYG2)
* Open a ticket in [Ed-Fi Tracker](https://tracker.ed-fi.org/projects/EDFI)

:::

:::note **More information**

An Ed-Fi Roster Sample Application was developed as a minimal example of some
best practices, Ed-Fi ODS / API roster capabilities, and a few different views
of the data retrieved. Link: [Ed-Fi Roster Sample Application - Enrollment
API](./sample-application/enrollment-api.md)

:::

## Step 3. Partner with a Client

In this step, you'll find a client partner and iterate the solution based on
actual client usage feedback.

### Find a Client Partner

The Ed-Fi Alliance has observed that the most successful Ed-Fi-based native
platform integrations have come out of working with a client partner on the
final stages of development. When partnering with a client, you can better
determine the needs of the customer based on their feedback, and iterate the
platform to make it more useable, relevant, and valuable to the customer.

### Conduct a Beta Phase

Once the client partner has been selected, begin by using a staging environment
and the pre-release version of the Ed-Fi integration developed in the target
platform. Next, utilize feedback and customer use cases to iteratively refine
the Ed-Fi integration. Though this work, finalize a solid, robust Ed-Fi
component in the target platform that will benefit the customer's actual needs.

### Move to Production

When both parties feel comfortable with the state of the Ed-Fi features in the
target platform, move the system into production with the client. Maintain
contact with the client during the early stages of the production deployment in
the case other issues or needs are identified in that environment. Once all
issues are identified and resolved in the production system, then support can be
transitioned to the usual support channels of the target platform.

:::note **Reminder**

Once production status has been achieved and the development of the Ed-Fi ODS /
API integration has been completed, be sure to have a plan in place to document
the functionality for your users and have a plan to train normal support
channels to handle and questions or issues that may arise.

:::

## Step 4. Apply for an Ed-Fi Badge

### Apply for an Ed-Fi Badge

At this stage, development has been rounded out and vetted through actual
customer usage, and the integration with a client partner has been promoted to
the production environment. When this is achieved, the developed functionality
of the target platform is eligible for an [Ed-Fi API Consumer
Badge](/partners/badging/available-badges/ed-fi-api-consumer-badge). Review the
requirements in [Applying for a Badge](/partners/badging/applying-for-a-badge)
in the [Ed-Fi Badge Program](/partners/badging/) space on the Ed-Fi Technical
Documentation site and submit an application.

:::note **More information**

You can explore which vendors have been awarded Ed-Fi Badges. Link: [Ed-Fi
Badges Registry](/partners/badging/registry-of-ed-fi-badges)

:::
