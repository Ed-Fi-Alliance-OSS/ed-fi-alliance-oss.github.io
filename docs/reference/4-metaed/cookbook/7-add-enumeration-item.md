# 7 - Add Enumeration Item

:::caution

The following documentation applies to the Ed-Fi Data Standard v2.x. In version
3 and beyond, all enumeration types have been implemented as Ed-Fi Descriptors.

:::

## Problem

A MetaEd enumeration requires additional enumeration items.

## Solution

Identify the affected enumeration in the MetaEd source files. Add the
enumeration item and rebuild MetaEd. All technical artifacts related to the
enumeration will be updated.

## Discussion

An enumeration is a set of values, which are called enumeration items.
Enumerations can be used as properties in other entities to constrain the valid
values of the property to items in the set of values. Each item must be distinct
within a given enumeration.

Consider the following code snippet:

```metaed
Enumeration Race
    documentation "The enumeration items defining racial categories."
    item "American Indian - Alaskan Native"
    item "Asian"
    item "Black - African American"
    item "Native Hawaiian - Pacific Islander"
    item "White"
```

In this situation, it has been determined that two additional enumeration items
should be added to Race: "Choose not to respond" and "Other". After adding these
items to the enumeration, the code should look like:

```metaed
Enumeration Race
    documentation "The enumeration items defining racial categories."
    item "American Indian - Alaskan Native"
    item "Asian"
    item "Black - African American"
    item "Choose not to respond"
    item "Native Hawaiian - Pacific Islander"
    item "White"
    item "Other"
```
