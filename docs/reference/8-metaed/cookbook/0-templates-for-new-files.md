---
description: Templates for new files.
---

# 0 - Templates for New Files

Below are templates to help you get started creating new files, for every type
of supported component, at the parent level (i.e. there is no need for distinct
"subclass" templates). For more information on these templates, please see the
relevant articles in the [Cookbook](./readme.mdx).

## Package.json

```json
{
  "metaEdProject": {
    "projectName": "${projectName}",
    "projectVersion": "${projectVersion}"
  }
}
```

## Association

```metaed
Association ExampleName
    documentation "This is documentation."
    domain entity FirstEntityName
        documentation "This is documentation."
    domain entity SecondEntityName
        documentation "This is documentation."
    bool PropertyName
        documentation "This is documentation."
        is part of identity
```

Related content:

* [4 - Create a New Association
    Subclass](./4-create-a-new-association-subclass.md)
* [Language Specification:
    Association](../language-specification/top-level-entities.md)
* [Language Specification: Association
    Extension](../language-specification/top-level-entities.md)
* [Language Specification: Association
    Subclass](../language-specification/top-level-entities.md)

## Choice

```metaed
Choice ExampleName
    documentation "This is documentation."
    bool FirstPropertyName
        documentation "This is documentation."
        is required
    bool SecondPropertyName
        documentation "This is documentation."
        is required
```

Related content:

* [Language Specification:
    Choice](../language-specification/top-level-entities.md)

## Common

```metaed
Common ExampleName
    documentation "This is documentation."
    bool PropertyName
        documentation "This is documentation."
        is part of identity
```

Related content:

* [3 - Create a New Common](./3-create-a-new-common.md)
* [16 - Create a New Common
    Subclass](./16-create-a-new-common-subclass.md)
* [Language Specification:
    Common](../language-specification/top-level-entities.md)
* [Language Specification: Common
    Extension](../language-specification/top-level-entities.md)
* [Language Specification: Common
    Subclass](../language-specification/top-level-entities.md)
* [Language Specification: Inline
    Common](../language-specification/top-level-entities.md)

## Descriptor

```metaed
Descriptor ExampleName
    documentation "This is documentation."
    with map type
        documentation "This is documentation."
        item "ShortDescription"
```

Related content:

* [15 - Create a New Descriptor](./15-create-a-new-descriptor.md)
* [Language Specification:
    Descriptor](../language-specification/top-level-entities.md)

## DomainEntity

```metaed
Domain Entity ExampleName
    documentation "This is documentation."
    bool PropertyName
        documentation "This is documentation."
        is part of identity
```

Related content:

* [Language Specification: Domain
    Entity](../language-specification/top-level-entities.md)
* [Language Specification: Domain Entity
    Extension](../language-specification/top-level-entities.md)
* [Language Specification: Domain Entity
    Subclass](../language-specification/top-level-entities.md)

## Domain

```metaed
Domain ExampleName
    documentation "This is documentation."
    domain entity ItemName
    footer documentation "This is documentation."
```

Related content:

* [8 - Create a New Enumeration](./8-create-a-new-enumeration.md)
* [Language Specification:
    Domain](../language-specification/top-level-entities.md)
* [Language Specification:
    Subdomain](../language-specification/top-level-entities.md)

## Enumeration

```metaed
Enumeration ExampleName
    documentation "This is documentation."
    item "ItemName"
        documentation "This is documentation."
```

Related content:

* [Language Specification:
    Enumeration](../language-specification/top-level-entities.md)

## Interchange

```metaed
Interchange ExampleName
    documentation "This is documentation."
    extended documentation "This is documentation."
    use case documentation "This is documentation."
    domain entity ElementName
```

Related content:

* [11 - Create a New Interchange](./11-create-a-new-interchange.md)
* [Language Specification:
    Interchange](../language-specification/top-level-entities.md)
* [Language Specification: Interchange
    Extension](../language-specification/top-level-entities.md)

## SharedDecimal

```metaed
Shared Decimal ExampleName
    documentation "This is documentation."
    total digits 9
    decimal places 3
    min value 0
    max value 100
```

Related content:

* [12 - Create a New Shared Type](./12-create-a-new-shared-type.md)
* [Language Specification: Shared Simple
    Types](../language-specification/top-level-entities.md)

## SharedInteger

```metaed
Shared Integer ExampleName
    documentation "This is documentation."
    min value 0
    max value 100
```

Related content:

* [12 - Create a New Shared Type](./12-create-a-new-shared-type.md)
* [Language Specification: Shared Simple
    Types](../language-specification/top-level-entities.md)

## SharedString

```metaed
Shared String ExampleName
  documentation "This is documentation."
  min length 1
  max length 20

```

Related content:

* [12 - Create a New Shared Type](./12-create-a-new-shared-type.md)
* [Language Specification: Shared Simple
    Types](../language-specification/top-level-entities.md)
