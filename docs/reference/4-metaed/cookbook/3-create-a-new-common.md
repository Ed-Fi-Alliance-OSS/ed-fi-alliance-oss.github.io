---
description: The design of a MetaEd model requires a new common.  
---

# 3 - Create a New Common

## Problem

The design of a MetaEd model requires a new common.  

## Solution

Create a new common in the MetaEd source files and reference it where necessary.
Build MetaEd. All technical artifacts related to the new common will be updated.

## Discussion

Commons represent a collection of properties in a reusable form. This type is
included in other entities' property sets with the common keyword. Properties
that include commons are generated in the ODS as separate tables that are
dependent upon the entity that defined the property. If the common defines one
or more properties as is part of primary key, then the type can be used in
properties marked as being collections.

Consider the following declaration:

```metaed
Common InternationalAddress
    documentation "Addresses located outside of the United States."
    enumeration AddressType
        documentation "The type of address listed for an individual or organization."
        is part of identity
    string AddressLine1
        documentation "The first line of the address."
        is required
        max length 100
 
```

InternationalAddress is a new common defined with an existing enumeration
AddressType as a primary key. This allows the use of the common in a collection
on an entity.

Now consider a usage of the new common InternationalAddress:

```metaed
Abstract Entity EducationOrganization
 documentation "This entity represents any public or private institution, organization, or agency
that provides instructional or support services to students or staff at any level."
    ...
    common InternationalAddress
        documentation "The set of elements that describes the international physical location of the education entity."
        is optional collection
    ...
```

Here, a reference to common InternationalAddress has been added to
EducationOrganization. The common keyword is used for that purpose and in this
case, EducationOrganization is modeled to optionally have a collection of
InternationalAddresses.
