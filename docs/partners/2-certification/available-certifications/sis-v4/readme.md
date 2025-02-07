# Ed-Fi Student Information Systems API for Data Standard v4 Certification

Certification Name: Ed-Fi Student Information Systems API for Data Standard v4\
Standards Referenced:\
   [Ed-Fi Core Student Data API (RFC 16)](https://edfi.atlassian.net/wiki/spaces/EFDSRFC/pages/25362441/ED-FI+RFC+16+-+CORE+STUDENT+DATA+API)\
   [Ed-Fi API Design & Implementation Guidelines    v7.1](https://edfi.atlassian.net/wiki/download/attachments/18645251/Public-REST-API-Design-and-Implementation-Guidelines-Rev2.pdf?version=1&modificationDate=1425039412083&cacheVersion=1&api=v2)\
Technical Suite: Suite 3\
Obsoletes: –\
Obsoleted By: –\
Status: Active

Certifying Organization: Ed-Fi Alliance\
Contact: [certification@ed-fi.org](mailto:certification@ed-fi.org)\
Publication Date: February 2 2013\
Certification Version: 1.0\
Last Revision Date: –

## Overview and Purpose

The Ed-Fi Student Information Systems API for Data Standard v4 verifies that a
Student Information System (the source system, or "provider") can manage a core
set of data on a target system (the "consumer") using a set of RESTful APIs
defined by [ED-FI RFC 16 - CORE STUDENT DATA
API](https://edfi.atlassian.net/wiki/spaces/EFDSRFC/pages/25362441/ED-FI+RFC+16+-+CORE+STUDENT+DATA+API).

In this data exchange architecture, the provider — the Student Information
System (SIS) — implements an API client which uses HTTPS requests and RESTful
patterns to manage API resources on the consumer system, which implements the
API definition itself (see Figure 1).

![Conceptual data exchange
architecture](https://edfidocs.blob.core.windows.net/$web/img/partners/certification/Figure-1.png)

Figure 1. Conceptual data exchange architecture

Please note that this certification DOES NOT validate the API implementation,
but rather validates the API client (it is a provider certification).

Note that this certification covers exchange of current year data only from a
SIS system to the indicated Ed-Fi API. It does not cover the synchronization or
transfer of historical records beyond the current school year.

The test scenarios making up the certification are defined and prioritized by
the community and described within the [SIS API Use Case
document](https://edfi.atlassian.net/wiki/display/SG/SIS+API+V3+Certification+Use+Cases).
The use case document describes the scope of the API and what is required for
API integration.

To receive this certification, a product must be able to use the described APIs
(aligned with Data Standard v3.0) to create and manage a defined set of API
resources. A table below shows the Ed-Fi API resources that the product is
expected to exercise and the operations expected on each resource.

## Certification Requirements

The certification requirements originate out of needs from actual field
implementation work in the Ed-Fi community. As such, they contain requirements
beyond the ability to successfully exercise the API definitions, but go into
areas like error handling, modes of operation (transactional and batch), and
additional configuration options. The certification requirements capture
demonstrated needs of the Ed-Fi community.

See [Student Information Systems API for Data Standard v4 Certification - Steps](./certification-steps/)
for a list of all requirements.

## Re-certification Requirements

Certifications are valid for one year. See [Student Information Systems API v4 Re-certification](./recertification/) for details.
