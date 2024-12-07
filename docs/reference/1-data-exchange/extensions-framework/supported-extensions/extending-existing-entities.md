# Supported Extensions: 2. Extending Existing Entities

This section covers allowable scenarios for extending existing core entities in
the Ed-Fi data model.

## 2.1. Extend Domain Entity

An existing domain entity such as a Student can be extended to add new
elements.\*

* MUST NOT contain any identity properties.
* MUST NOT contain entity-level documentation.
* MUST contain at least one property.
* MUST NOT contain properties included in the parent domain entity unless
    additional context is provided.

\* There are some known exceptions for extending domain entities.
See [Unsupported
Modifications](../unsupported-modifications.md) for
more details.

## 2.2. Extend Association Entity

An existing association entity such as the StudentParentAssociation entity can
be extended to add new elements.\*\*\*

* MUST NOT contain any identity properties.
* MUST NOT contain entity-level documentation.
* MUST contain at least one property.
* MUST NOT contain properties included in the parent association unless
    additional context is provided.
* MUST include any properties as optional single properties or optional
    collections.\*\*\*\*
* MUST NOT include required properties (as single properties or collections).

\*\*\* There are some known exceptions for extending associations.
See [Unsupported
Modifications](../unsupported-modifications.md) for
more details.
\*\*\*\* An exception applies to collections of simple types. Only string and
decimal simple types may be included as collections.
