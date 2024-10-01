# How Agencies Should Use Certification

## Identify the Certifications Applicable to Your Architecture

Agencies are encouraged to ask for their data provider products to be Ed-Fi
certified; however, agencies should first understand their needs sufficiently to
request specific vendors be certified on specific Ed-Fi Alliance certifications.
Note that there are many areas with no applicable Ed-Fi certification. Hence,
specific knowledgeable requests are much more likely to be successful and
serviceable than blanket ambiguous ones.

## Procurement Language

The Ed-Fi Alliance has published a "Ed-Fi Model RFP" in the [Ed-Fi
Exchange](https://exchange.ed-fi.org/) that may assist agencies with procurement
language:

## What is Covered in Certification?

Ed-Fi Certification is a technical verification that a vendor system conforms to
an Ed-Fi API standard. By "conform" we mean that the vendor system:

- Demonstrates it has implemented an API standard or can communicate with (as
    a client) an implementation of the API across all API resources and fields
    marked as "required" in the API specification

- Meets all of the "must" requirements listed in the API specification

- Meets all of the "must" requirements of the certification

The test scenarios making up the certification are defined and prioritized by
the community and described within the [SIS API Use Case
document](https://edfi.atlassian.net/wiki/spaces/SG/pages/20612545/SIS+API+V3+Certification+Use+Cases).
The use case document describes the scope of the API and what is required for
API integration.  

## What is Not Covered?

Ed-Fi certification does not cover these elements of a vendor implementation:

- Under what conditions the certified functionality is made available to the
    vendor's customers. For example, this would include if the certified
    functionality:

  - Requires additional installations or product maintenance

  - Comes with license fees or other costs

  - Is available only in certain geographies

    The vendor of a certified product must assert, however, that the certified
    functionality is available in the K–12 market in some place – i.e., a vendor
    may not certify unreleased or unavailable functionality.

- If the product has multiple editions, what editions of the product the
    certified functionality is available in. The [Registry of Ed-Fi Certified
    Products](../ed-fi-certification/registry-of-ed-fi-certified-products.md), however,
    does record which product edition and version the vendor used to meet the
    certification testing. Those wanting to procure this functionality are
    advised to reference that version if necessary.

## Certification's Approach to Data Semantics

Ed-Fi data exchange standards cover not only serialization and transport of
data, but also the meaning of the data. This is critical to the Ed-Fi community
mission of enabling seamless exchange of complex and diverse data in K–12 to
improve student performance.

Accordingly, Ed-Fi certification validates that elements in the certified system
sent via API conform to data definitions in Ed-Fi API specifications. Those
specifications in turn draw their vocabularies from the applicable the Ed-Fi
Data Handbook (see [Unifying Data Model - v2.0
Handbook](https://edfi.atlassian.net/wiki/spaces/EFDS20/pages/24413770/Unifying+Data+Model+-+v2.0+Handbook)
or [Unifying Data Model - v3.0
Handbook](https://edfi.atlassian.net/wiki/spaces/EFDS30/pages/22911130/Unifying+Data+Model+-+v3.0+Handbook)).

Mapping data elements and measuring semantic conformance of mappings are by
their very nature acts of interpretation, so certification is unable to
guarantee 100% consistency in the translation of semantics from a source to
target system across an API interface. Those who are concerned about this
element of certification are invited to consult the [Requirements - Testing
Requirements](./2-certification-requirements-for-data-providers/requirements-testing-requirements.md),
which cover semantic translations that are permitted and those which are
not-permitted.

## Does Certification Guarantee "Plug-and-play" Interoperability?

Without faithful implementation of standardized data exchange patterns *—* which
certification tests *—* interoperability at scale will never be achieved.
However, while such conformance may be *required*, it is not in itself
*sufficient* to guarantee interoperability.

Many environmental factors can interfere with system interoperability.
Certification does not and cannot validate all the various ancillary elements
necessary to seamless flow of data between systems. It cannot, for example,
validate that solutions have the required infrastructure resources, or that
vendors develop and maintain APIs using best practice so as to minimize bugs
that can be very real issues in system-to-system communications.

Certification also cannot account for the vast amount of customization and
localized business logic often inserted into product implementations, often as
local customizations. In many cases even the meaning or value of an element may
depend on local and configurable business logic. Attendance is a good example:
is a student who misses the first period of the school day counted as being in
attendance? For some schools, yes, and for others, no; others may say the
student was "tardy." Ed-Fi certification can only test that the vendor system
can transmit attendance values, but can't validate the business logic used to
make semantic determinations, and whether those determinations (i.e., the
default logic in the student information system) are accurate for a particular
local context.
