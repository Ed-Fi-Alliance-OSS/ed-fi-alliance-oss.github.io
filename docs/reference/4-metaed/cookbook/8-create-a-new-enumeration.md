# 8 - Create a New Enumeration

:::caution

The following documentation applies to the Ed-Fi Data Standard v2.x. In version
3 and beyond, all enumeration types have been implemented as Ed-Fi Descriptors.

:::

## Problem

The design of a MetaEd model requires a new enumeration.  

## Solution

Create a new enumeration in the MetaEd source files and reference it where
necessary. Build MetaEd. All technical artifacts related to the new enumeration
will be updated.

## Discussion

An enumeration is a set of values, which are called enumeration items.
Enumerations can be used as properties in other entities to constrain the valid
values of the property to items in the set of values. Each item must be distinct
within a given enumeration.

Consider the following declaration:

```metaed
Enumeration CharterApprovalAgencyType
    documentation "The type of agency that approved the establishment or continuation of a charter school."
 item "State board of education"
 item "Public charter school board"
 item "University"
 item "Other"
 
```

CharterApprovalAgencyType is a new enumeration defined with four enumeration
items.

Now consider a usage of the new enumeration:

```metaed
Domain Entity School based on EducationOrganization
    documentation "This entity represents an educational organization that includes..."
    ...
 enumeration CharterApprovalAgencyType
  documentation "The type of agency that approved the establishment or continuation of a charter school."
  is optional
```

Here, a reference to the enumeration CharterApprovalAgencyType has been added to
EducationOrganization. The `enumeration` keyword is used for that purpose. In
this case, School is modeled to have an optional CharterApprovalAgencyType.
