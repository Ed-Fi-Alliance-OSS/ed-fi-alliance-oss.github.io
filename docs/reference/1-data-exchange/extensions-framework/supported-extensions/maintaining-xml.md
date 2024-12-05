# Supported Extensions: 4. Maintaining XML

This section covers allowable scenarios for composing and revising XML
interchanges based on the Ed-Fi Unifying Data Model.

## 4.1 Compose New XML Interchange Schema

An Ed-Fi interchange schema is an XSD file that groups entities together for
bulk data exchange.

* MUST contain at least one domain entity or association.
* MAY contain multiple domain entities and/or associations.
* MUST NOT contain any cardinality statements.
* MUST contain basic documentation.
* SHOULD NOT contain "Interchange" in the name.
* MAY contain extended documentation and use case documentation.

## 4.2. Extend XML Interchange Schema

The core set of Ed-Fi Standard Interchange Schema can be modified to include new
or extended entities.

* MUST contain at least one domain entity or association.
* MAY contain multiple domain entities and/or associations.
* MUST NOT contain entities included in the parent interchange.
* MUST NOT contain any cardinality statements.
* MUST NOT contain entity-level documentation (including extended and use-case
    documentation).
