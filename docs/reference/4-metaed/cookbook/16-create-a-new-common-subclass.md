---
description: The design of a MetaEd model requires the subclassing of a common.  
---

# 16 - Create a New Common Subclass

## Problem

The design of a MetaEd model requires the subclassing of a common.  

## Solution

Create a new common subclass in the MetaEd source files and reference it where
necessary. Build MetaEd. All technical artifacts related to the new common
subclass will be updated.

Supported Common Subclasses:

Any **Common** subclass is supported by the Ed-Fi ODS / API.

**Inline Commons** cannot, at this time, be subclassed.

When an existing common needs additional data to support a specialization of the
model, it should be subclassed. The naming convention should follow the naming
convention for commons with a semantic discriminator indicating what the
specialization of data is for this new type. The base common name is the
original common to build on. No property in this type can be marked as is part
of primary key. Creating a subclass does not affect the original common. Instead
it creates a new type that uses the original common as a base and adds new data.
In this way, Common subclasses are different from other subclasses (e.g.,
Associations) in that the original Common properties are "mirrored" in the new
subclass, rather than inherited.

Consider the following declarations:

```metaed
Common Telephone
    documentation "The 10-digit telephone number, including the area code, for the person."
    shared string TelephoneNumber [949]
        documentation "The telephone number including the area code, and extension, if applicable."
        is part of identity
    descriptor TelephoneNumberType [950]
        documentation "The type of communication number listed for an individual or organization."
        is part of identity
    ...
```

```metaed
Common TelephoneWithCountryCode based on EdFi.Telephone
    documentation "The 10-digit telephone number, including the area code, for the person with an optional country code."
    string CountryCode
        documentation "The country code for the telephone number."
        is optional
        max length 10
```

TelephoneWithCountryCode is a new common subclass which is based on Telephone.
Like the original, the subclass includes the properties TelephoneNumber,
TelephoneNumberType, OrderOfPriority, TextMessageCapabilityIndicator, and
DoNotPublishIndicator. TelephoneWithExtension also includes the new property,
CountryCode.
