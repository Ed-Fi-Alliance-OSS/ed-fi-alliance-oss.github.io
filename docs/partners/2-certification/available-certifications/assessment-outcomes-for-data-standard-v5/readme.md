# Ed-Fi Assessment Outcomes API for Data Standard v5 Certification

Certification Name: Ed-Fi Assessment Outcomes API for Suite 3 \
Standards Referenced: \
   [Ed-Fi Assessment Outcomes API (RFC    22)](https://edfi.atlassian.net/wiki/display/EFDSRFC/ED-FI+RFC+22+-+ASSESSMENT+OUTCOMES+API)
\
   [Ed-Fi API Design & Implementation Guidelines    v3.1](https://edfi.atlassian.net/wiki/spaces/EFAPIGUIDE/overview)
\
Technical Suite: Suite 3 \
Obsoletes: – \
Obsoleted By: – \
Status: Active

Certifying Organization: Ed-Fi Alliance \
Contact: [certification@ed-fi.org](mailto:certification@ed-fi.org) \
Publication Date: December 4, 2023 \
Certification Version: 1.0 \
Last Revision Date: –

## Overview and Purpose

The Ed-Fi Assessment Outcomes API for Suite 3 Certification verifies that a
source system (the provider) can manage a core set of assessment data on a
target system (the consumer) using the RESTful APIs defined
by [ED-FI RFC 22 - ASSESSMENT OUTCOMES API](https://edfi.atlassian.net/wiki/spaces/EFDSRFC/pages/25363177/ED-FI+RFC+22+-+ASSESSMENT+OUTCOMES+API).

In this data exchange architecture, the provider implements an API client which
uses HTTP/S requests and RESTful patterns to manage API resources on the
consumer system, which implements the API definition itself (see Figure 1).

![Conceptual data exchange architecture](../../img/Figure-1.png)

**Figure 1.** Conceptual data exchange architecture

The certification further aggregates normative requirements that have been found
by the Ed-Fi community to be critical to "real world" data exchange and
interoperability. These include requirements around error handling and recovery,
roster configurability, and others.

This conformance specification covers the provider certification *–* that is,
the responsibilities of the *API* *client* implementer and not the *API*
*consumer*. Given market demand, the Alliance will publish a consumer
conformance specification as well. Both certifications will use the same
technical API specifications provided as part of the
[ED-FI RFC 22 - ASSESSMENT OUTCOMES API](https://edfi.atlassian.net/wiki/spaces/EFDSRFC/pages/25363177/ED-FI+RFC+22+-+ASSESSMENT+OUTCOMES+API).

## Overview of Requirements

This section provides an overview only; detailed, step-by-step requirements are
available in
the [Assessment Outcomes API Certification for Data Standard v5 - Steps](./certification-steps.md).

### Local Descriptor Guidance

The Alliance recommendation is to source descriptor values from the list
governed by the project’s reporting context and place them in a namespace that
accurately captures that governing organization. Descriptor values shown in the
certification’s test scenarios use the Ed-Fi namespace for informational
purposes. Descriptor namespace should clearly indicate the organization that
governs the value.

### Required Fields on API Resources

All fields marked as "required" in the API specification are REQUIRED, and in
addition the data submitted MUST offer parity of data with score reports the
vendor currently publishes to its users. Those score reports are published in
the provider certification record.

This may seem an odd requirement, but it is meant to address the inherent
diversity of assessment data provided as part of score reporting across the K–12
ecosystem. This diversity makes it difficult to define exactly which fields in
the API resources should be required or not. This certification handles this
diversity in part by testing parity with score reports the vendor currently
publishes.

### Student ID Configuration

If the product uses a rostering standard or a similar de facto industry roster
specification (such as the Clever roster), and that standard contains multiple
possible student IDs, the certifying product MUST demonstrate the ability to
allow a user of the product to configure which student identifier to be used
within transactions for an education agency (configurability can be more
granular than education agency-level, but this level is the minimum required).

Such a capability has proven important in field work to date; for example, some
districts may align on state identifiers for various reasons (e.g., as they are
part of school district collaboratives) or use "student numbers" on occasion.

If the product uses multiple roster standards, it is only required to
demonstrate this capability with one standard.

### Operations

The provider MUST demonstrate the ability to perform create, update and delete
operations on API resources. For update, HTTP POST or PUT are both accepted.

### Error Handling

In field work, the ability to capture, display errors, and offer facilities to
re-try after error conditions are found, have proven to be essential to
interoperability. The certification testing ensures a basic level of such
functionality is in place.

### Enumerations

The Assessment API model contains a number of controlled vocabularies.

For some enumerations, a vendor is allowed to supply their own additional values
if an Ed-Fi value fails to match the semantics needed. These enumerations are:

- AssessmentPeriodDescriptor
- PerformanceLevelDescriptor
- AccommodationDescriptor
- AssessmentReportingMethodDescriptor

The certification captures and publishes vendor-specific enumerations (in the
provider entry in the
[Registry of Ed-Fi Certified Products](../../registry-of-ed-fi-certified-products.mdx)),
and tests that enumerations used during testing are within the allowed
enumeration sets.
