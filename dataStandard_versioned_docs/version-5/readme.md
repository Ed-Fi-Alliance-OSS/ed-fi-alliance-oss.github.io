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

Please note that the current version of Data Standard v5 is v5.1 (full version
number 5.1.0), the final stable version for v5 - see the [Ed-Fi Technology Roadmap](/reference/roadmap)
for previous and future Data Standard release versions. Also see the [What's New](./whats-new/readme.md)
page for information on the changes in this release.

:::

### Data Model Documentation

The data model is referred to as the Ed-Fi Unifying Data Model, or UDM. The UDM
is documented via 2 primary artifacts: the **Ed-Fi Data Handbook** and a set of
**Unified Modeling Language (UML)** diagrams.

* [Ed-Fi Data Handbook for DS v5.1](https://edfidocs.blob.core.windows.net/$web/handbook/v5.1/index.html)

  * [Ed-Fi Data Handbook for DS v5.0](https://edfidocs.blob.core.windows.net/$web/handbook/v5.0/index.html)
* [Ed-Fi UDM UML Diagrams](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/tree/main/Models) (Visio format, on GitHub)

Additional documentation is provided in the [Ed-Fi Unifying Data
Model](/reference/data-exchange/udm) documentation. This additional documentation provides narrative overviews of domains and
key entities, as well as normative best practice guidance.

### Version

The most recent version and name for the Ed-Fi Data Standard is **Ed-Fi Data
Standard for Suite 3 v5.1.0.**

It is the minor release of Data Standard v5 following the previous final release
v5.0.0 and the stable final version v4.0 before it.

* For more information on the community development and governance process,
    please visit [Standards Development
    Process](https://edfi.atlassian.net/wiki/spaces/GOV/pages/20325368/Standards+Development+Process) (in Confluence).
* For more information on data standard versioning, please consult: [Ed-Fi Data Standard Versioning and Releases](/reference/data-exchange/versioning-and-releases)

#### REST API Bindings

This release contains only changes classified as "non-breaking", so for API
clients using previous final versions should be fine. However, those who have
been using version v4.0 or earlier may need be aware of the breaking changes
introduced earlier by v5.0 (which the v5.1 is build on) and prepare for those
changes. API bindings have been published with the v5.0 final release.

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

#### Default Descriptors

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

* For REST API design and implementation guidelines, visit the [Ed-Fi API
    Design & Implementation
    Guidelines](/reference/data-exchange/api-guidelines)
    documentation.
* For XSD design and implementation guidelines covering bulk XML, visit the
    [Ed-Fi XSD Design & Implementation
    Guidelines](/reference/data-exchange/xsd-guidelines)
    documentation.
