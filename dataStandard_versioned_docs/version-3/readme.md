---
sidebar_position: 0
---

# Ed-Fi Data Standards

## Documentation Home

The Ed-Fi Unifying Data Model (UDM) is the widely adopted, CEDS-aligned,
open-source data standard developed by the Ed-Fi community for the improvement
of the community, and for the broader purpose of helping the K–12 education
community in using data as a strategic asset to improve educational outcomes of
students. The UDM captures the meaning and inherent structure of the most
important information in the K–12 education enterprise.

The Ed-Fi UDM, along with the normative and non-normative guidance in the Ed-Fi
Standards, serve as the foundation for enabling interoperability among secure
data systems.

:::warning
Please note that the current version of Data Standard v3.3 is
v3.3.1-b, which contains early access content. Data Standard v3.3. is built on
top on v3.2, so its elements are mostly consistent with v3.2. See the [What's
New](/reference/data-exchange/data-standard/3/whats-new) page for information on the early
access content.
:::

### Data Model Documentation

The data model is referred to as the Ed-Fi Unifying Data Model, or UDM. The UDM
is documented via 2 primary artifacts: the **Ed-Fi Data Handbook** and a set of
**Unified Modeling Language (UML)** diagrams.

* <a href="https://edfidocs.blob.core.windows.net/$web/handbook/v3.3/index.html"
  target="_blank">Ed-Fi Data Handbook for DS v3.3.1-b</a>
* [Ed-Fi UDM UML
  Diagrams](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/tree/v3.3.1-b/Models)
  (Visio format, on GitHub)

Additional documentation is provided in the [Ed-Fi Unifying Data
Model](/reference/data-exchange/udm) documentation. This additional
documentation provides narrative overviews of domains and key entities, as well
as normative best practice guidance.

### Version

The most recent version and name for the Ed-Fi Data Standard is Ed-Fi Data
Standard for Suite 3 v3.3.1-b.

This is an "early access" release, meaning it contains newer data model changes
that have yet to be proven in field work. Organizations wishing to avoid such
early material – which is naturally subject to change – are advised to stick to
elements defined in the current release – see [Ed-Fi Data Standard
v3.2](https://edfi.atlassian.net/wiki/spaces/EFDS32/overview) for information on
those elements.

* For more information on the community development and governance process,
    please visit [Standards Development
    Process](https://edfi.atlassian.net/wiki/spaces/GOV/pages/20325368/Standards+Development+Process)
    (in Confluence).
* For more information on data standard versioning, please consult: [Ed-Fi Data
  Standard Versioning and
  Releases](/reference/data-exchange/versioning-and-releases)

#### REST API Bindings

Current REST API bindings are based on previous Data Standard releases. However,
since this release is non-breaking, the current 3.3.0-a release is
backwards-compatible with those bindings. The relevant RFC bindings can be found
here:

* [Ed-Fi Assessment Outcomes API for Suite
  3](https://edfi.atlassian.net/wiki/spaces/EFDS/pages/17727736/Ed-Fi+Assessment+Outcomes+API+for+Suite+3)
  v1.0.0
* [ED-FI RFC 24 - CORE STUDENT
  API](https://edfi.atlassian.net/wiki/spaces/EFTD/pages/25363210/ED-FI+RFC+24+-+CORE+STUDENT+API)
* [ED-FI RFC 25 - SURVEY
  API](https://edfi.atlassian.net/wiki/spaces/EFTD/pages/25363230/ED-FI+RFC+25+-+SURVEY+API)

#### Bulk / XML Bindings

In addition, a [set of Bulk / XML
standards](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/tree/main/Schemas/Bulk)
(core entity XML definitions and interchange specifications) based on this
release are available on GitHub.

#### Sample Data

The Data Standard includes [sample data in the bulk XML
format](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/tree/main/Samples/Sample%20XML).
The sample data is based on an entirely fictitious district called "Grand Bend
ISD." Note that the sample data does not cover all model elements, and that
while some effort is made to provide realistic data, the data is managed more to
provide coverage of elements rather than realism.

#### Standard Descriptors

The Standard includes default "code sets" or "enumeration values" and their
definitions. Descriptor values are [published on GitHub in XML
format](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/tree/main/Descriptors).

Only descriptor values in the "ed-fi.org" namespace are part of the standard. In
some contexts, the Alliance publishes values in the Grand Bend "gbisd.edu"
namespace (Grand Bend the fictitious district for the sample data). This is done
for descriptors whose actual values are nearly always locally defined, and
therefore non-standardizable.

## Data Exchange Standards

For a list of standards built on the Ed-Fi Unifying Data Model, visit the [Ed-Fi
Data Exchange Standards Home](/reference/data-exchange).

## Guidelines

The Ed-Fi Alliance publishes technical guidelines for building solutions based
on the Ed-Fi Data Standard:

* For REST API design and implementation guidelines, visit the [Ed-Fi API Design
    & Implementation Guidelines](/reference/data-exchange/api-guidelines)
    documentation.
* For XSD design and implementation guidelines covering bulk XML, visit the
    [Ed-Fi XSD Design & Implementation
    Guidelines](/reference/data-exchange/xsd-guidelines) documentation.
