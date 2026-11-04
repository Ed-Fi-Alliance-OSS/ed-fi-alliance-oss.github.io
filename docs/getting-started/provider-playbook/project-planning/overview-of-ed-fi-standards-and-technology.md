# Overview of Ed-Fi Standards and Technology

This page introduces the Ed-Fi standards and technology for technology
providers. For the full list of what makes up the Ed-Fi Technology Suite today,
see [Ed-Fi Technology Suite Overview](/reference/technology-suite).

## What is the Ed-Fi Alliance?

The Ed-Fi Alliance publishes data exchange standards for K-12 education data
and leads an open-source software community that builds technology to implement
them.

## What are the Ed-Fi standards?

The [Ed-Fi Data Standard](/reference/data-exchange/data-standard) is focused on
classroom-level decision making. It lets data move across many domains,
including assessment, enrollment, attendance, grades, and demographics, which in
turn helps educators improve student outcomes.

For technology providers, the standard takes shape mainly as the [Ed-Fi REST API
Specifications](/reference/data-exchange#ed-fi-api-specifications). Education
agencies deploy APIs that implement these specifications, which gives your
product one common API surface to integrate with instead of a custom extract for
each agency. See [Data Exchange Standards](/reference/data-exchange) for all the
standards the Ed-Fi Alliance publishes.

## The standard and the technology are separate

The Data Standard and the technology that implements it are two separate
things. The Ed-Fi Alliance builds two API platforms, the Ed-Fi ODS/API and
Ed-Fi API v8; see [Ed-Fi API Platforms](/reference/ods-api-platform). These
platforms implement the API specifications; they are not the specifications
themselves. Any system may implement the API specifications using different
technology. See [Ed-Fi Data Standard vs. UDM vs. API Specifications vs. Ed-Fi
API](/reference/data-exchange/data-standard-vs-udm-vs-api) for how the
standards and the software that implements them relate.

Build your integration to the specifications, and test it against the platforms
your customers run. See [Should a new Ed-Fi implementation use ODS/API 7.x or
Ed-Fi API
v8?](/reference/roadmap/api-faq#q-should-a-new-ed-fi-implementation-use-odsapi-7x-or-ed-fi-api-v8)
for what client application developers should test.
