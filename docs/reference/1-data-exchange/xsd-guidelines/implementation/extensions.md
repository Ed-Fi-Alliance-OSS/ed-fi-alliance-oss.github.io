---
sidebar_position: 4
---

# XML Schema - Extensions Framework

Customizations to the Ed-Fi data model – and concrete specifications such as the Ed-Fi data exchange XSD – are explicitly supported for implementation-specific or other purposes using the set of conformant extensions described in this section, known as the Ed-Fi Extension Framework. The [Extension Framework documentation](../../extension-framework.md) provides detail on extension patterns that are supported throughout Ed-Fi technology.

The Ed-Fi Alliance provides a free tool called the [MetaEd IDE](../../../4-metaed/readme.md) that automates the process of extending Ed-Fi technology, including the Ed-Fi data exchange XSDs. The documentation that follows covers the patterns that are created by the MetaEd IDE.

## General Extension Pattern

Extensions are made in an extended core. This allows extensions to be defined once and reused across multiple interchange schemas, as well as supports automated code generation.

![Diagram showing extension of core schemas](https://edfidocs.blob.core.windows.net/$web/img/reference/xsd/Figure-Extended-Core-Schema-Diagram.png)

The Extension Framework contains the authoritative list of the types of extensions you can do, and the [MetaEd IDE documentation](../../../4-metaed/readme.md) contains everything you need to know about how to extend Ed-Fi XSD definitions. The documentation includes download and installation instructions, plus how-to articles covering the most common extension scenarios.
