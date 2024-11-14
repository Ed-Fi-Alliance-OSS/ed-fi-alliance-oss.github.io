# 1 - Updating an Element's Documentation

## Problem

The Documentation of an existing element needs to be updated or corrected.

## Solution

Identify the affected element in the MetaEd source files. If you have trouble
locating the offending element, try searching for the Documentation string.
Correct the Documentation and build MetaEd. All technical artifacts containing
the element will be updated.

## Discussion

The MetaEd Documentation is output to annotations in XSD, comments in C#,
metadata in SQL, and other technical artifacts, so an error or outdated
Description appears in many places.

Consider the following code snippet (from Student.metaed):

```metaed
string LoginId
 documentation "The login ID for the user; used for security access control interflop."
 is optional
 min length 1
 max length 60
```

The Documentation is on line 2 of the listing above, and ends with the typo
`interflop`. To correct the Documentation, simply change the listing to read:

```metaed
string LoginId
 documentation "The login ID for the user; used for security access control interface"
 is optional
 min length 1
 max length 60
```

This simple example is a good introduction to the usefulness of MetaEd:
rebuilding the MetaEd project will correct the description in all technical
artifacts.

All documentation must begin with the keyword documentation, followed by either
the documentation text enclosed in double quotes or the keyword **`inherited`**.
Whitespace and line breaks are preserved within the double quotes. Because the
double quote character denotes the beginning and ending of the documentation
text, any double quote characters in the text itself are denoted by a
consecutive pairing of double quotes. There is no maximum length for
documentation text. Alternatively, properties that refer to other entities may
use the **`inherited`** keyword to use the documentation of that entity. See the
[MetaEd Language Specification](../language-specification/readme.md) for more
detail.
