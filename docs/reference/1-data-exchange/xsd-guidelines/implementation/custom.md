---
sidebar_position: 5
---

# XML Schema - Custom Data Exchange Schema

The Ed-Fi Alliance publishes bulk data exchange standards for XML that cover many data exchange scenarios. However, custom data exchange schema can easily be created by anyone familiar with XML Schema.

Ed-Fi data exchange standards leverage the Ed-Fi Core XSD, which contains reusable definitions for hundreds of entities relevant to the K–12 information domain. By using the predefined entities in the Ed-Fi Core XSD, implementers can quickly compose specifications for many different data exchange purposes.

The Ed-Fi Alliance provides a free tool called the [MetaEd IDE](../../../4-metaed/readme.md) that automates the process of extending Ed-Fi technology, including the Ed-Fi data exchange XSDs. The documentation that follows covers the patterns that are created by the MetaEd IDE, and additional considerations when creating a custom exchange.

## Custom Exchange Overview

Ed-Fi data exchange schemas define the structure of the XML that transports the data between systems, as shown below. Data exchange schemas can contain as much or as little data as required. In most cases, different interchange schemas will be used to reflect different use cases or to deal with different periodicities of interchange.

![Figure showing relationship between sending and receiving systems, with XML interchange between them](https://edfidocs.blob.core.windows.net/$web/img/reference/xsd/custom-data-exchange.webp)

The Ed-Fi Core XML Schema provides a library of building blocks from which to compose interchange schemas. However, implementations often have use cases beyond those covered by the Standard Interchange Schemas. This section provides guidance to technical personnel on applying the Standard to create custom interchanges.

## Custom Exchange Considerations

In creating interchanges using the Ed-Fi Data Standard, there are several considerations that may require additional analysis, including:

* **Security and FERPA issues.** Based on the users of the receiving system or data store, data may need to be filtered or redacted prior to interchange. For example, a district should only be able to see student data for students enrolled in their district.
* **Periodicity of interchange.** Since most data interchanges are in response to recurring requirements, the periodicity of the interchange must be considered. For example, attendance data may be interchanged daily, where the scores to standardized tests may only be loaded after administration.
* **Incremental changes vs. bulk updates.** Whether complete data sets will be transferred or just the changes that will impact the data being interchanged. Transferring only the changes will greatly reduce the bulk of data to be processed, but will require additional complexity on both sides of the interchange to detect and appropriately handle the changes. Bulk updates are much simpler, but require much larger transfers.
* **Reliability of identity references.** When extended reference types are used to pass identity information for lookup (e.g., students), the reliability of the data and the algorithms used to match instance identities must be considered. For example, is enough data provided to verify identity when matched by a primary ID? If a primary ID is erroneous, is enough data provided to uniquely match on other attributes?
* **Consistency between multiple information sources.** When data is accepted from multiple sources—for example, between different student information systems from different local education agencies—there may be inconsistencies in the data that may require special attention, such as different enumeration lists values or different naming conventions.

## Building a Custom Exchange Specification

The [MetaEd IDE documentation](../../../4-metaed/readme.md) contains everything you need to know about building a new XSD specification based on the Ed-Fi Core XSD. The documentation includes download and installation instructions, plus how-to articles.
