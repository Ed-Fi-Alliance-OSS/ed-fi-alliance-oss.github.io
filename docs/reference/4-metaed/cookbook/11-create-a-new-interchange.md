# 11 - Create a New Interchange

## Problem

The design of a MetaEd model requires a new interchange.  

## Solution

Create a new interchange in the MetaEd source files, referencing the appropriate
entities. Build MetaEd. All technical artifacts related to the new interchange
will be updated.

## Discussion

Interchanges define the structure of how the XML is submitted to the system.
Interchanges group domain entities and associations by functional area. A new
interchange might be necessary due to the creation of new domain entities or
associations, or due to a reorganization of existing ones.

Consider the following declaration:

```metaed
Interchange Parent
    documentation "This interchange defines parents and the association between students and parents."
    element Parent
    element StudentParentAssociation
```

Parent is a new interchange that groups together the domain entity Parent with
the association StudentParentAssociation.
