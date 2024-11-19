# Ed-Fi Extension Framework

The Ed-Fi Data Standard and related technologies can be extended to add new
entities and elements. The set of standard extensions are codified in the Ed-Fi
Extension Framework, documented herein.

## Framework Implementation

The Ed-Fi Extension Framework is implemented via the MetaEd IDE, and the Ed-Fi
Extensions Framework Guide in each product that supports data model extensions.

## Extension Framework Categories

The Ed-Fi Extension Framework defines two categories of extension:

* **Supported Extensions**. Extensions to the Ed-Fi data model are only allowed
  if specifically enumerated in the Extension Framework.
  * Extensions in this category generally have implementation and documentation
    support in Ed-Fi technology such as the Ed-Fi ODS / API.
  * Supported extensions are documented [here](./supported-extensions.md).
* **Unsupported Extensions**. Extensions not in the Extension Framework are not
  allowed. The [documentation attempts](./unsupported-modifications.md) to
  enumerate the most common of those.
