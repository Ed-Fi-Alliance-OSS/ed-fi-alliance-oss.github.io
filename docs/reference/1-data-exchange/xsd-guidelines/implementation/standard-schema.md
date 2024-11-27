---
sidebar_position: 1
---

# XML Schema - Standard Data Exchange Schema

Different use cases and different periodicities of data exchange require different interchange schema.

For example, the [Ed-Fi Bulk Data Exchange for XML v3.1](https://edfi.atlassian.net/wiki/spaces/EFDS/pages/17727595) contains a set of 21 Standard Interchange Schemas to handle common data exchange use cases, including basic student profile information, attendance records, assessment results, program participation, and many other information-transfer scenarios.

## Standard Definitions and the Core XSD

The Ed-Fi data exchange specifications are XSD files, all of which primarily align with the domain entities and other types defined in the [Ed-Fi Unifying Data Model](https://edfi.atlassian.net/wiki/spaces/EFDS31/pages/23855205). Some specialized exchanges may contain metadata or may convey data not present in the Ed-Fi UDM, but, generally speaking, most substantive information in any given data exchange will be defined by the UDM.

In keeping with that alignment to the Ed-Fi UDM, most Standard data exchange schema reference the  Ed-Fi Core XML Schema — which is essentially an expression of the Ed-Fi UDM made concrete as an XSD.

## Data Exchange Schema Construction

Through field-testing, the Ed-Fi data exchange schema standards provide a rigorous structure for data, but allow a reasonable degree of flexibility to account for different levels of source data availability. For example, source systems at the start of the year may have a less complete set of data than the same systems at the end of the year. Source assessment systems may have different ways of providing a means of identifying a student. The flexibility in the Ed-Fi Standard Interchange Schemas supports these realities in the field.

The Ed-Fi Standard Interchange Schemas are composed of elements from the domain and association types available in the Ed-Fi Core XML Schema, as depicted below.

![Diagram depicting interchange files, which include references to the core XML schema](https://edfidocs.blob.core.windows.net/$web/img/reference/xsd/Figure-High-Level-Construction-of-Ed-Fi-Interchange-Schemas.png)

The Ed-Fi Core XML Schema provides a library of building blocks from which to compose interchange schemas, as depicted in the figure below.

![Diagram depicting portions of the Ed-Fi-Core.xsd schema](https://edfidocs.blob.core.windows.net/$web/img/reference/xsd/Figure-Detailed-Construction-of-Ed-Fi-Interchange-Schemas.png)
