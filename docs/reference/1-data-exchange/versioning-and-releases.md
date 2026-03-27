---
sidebar_position: 6
title: Versioning and Releases
---

# Ed-Fi Data Standard Versioning and Releases

The Ed-Fi data model uses semantic versioning. It is also organized into
numbered "suites" that reflect generational changes across Ed-Fi standards and
technology as well as generational compatibility.

## Use of Semantic Versioning (semver)

Ed-Fi UDM is versioned using semantic versioning, also referred to as "semver".
For more information, see [Ed-Fi Software
Versioning](/community/sdlc/code-contribution-guidelines/software-versioning).

This version number is the one shown in the format MAJOR.MINOR.PATCH with
optional -LABEL. By convention, Ed-Fi Data Standard LABELs use sequential
alphabetic characters (i.e. 'a', 'b', 'c', etc.) to denote the presence of early
access/pre-release material in the release.

Since the UDM is a conceptual model only, and strict semver versioning requires
the concepts of “incompatibility” and “backward compatible” some additional
guidelines must be present to determine if a conceptual change qualifies in one
of these categories. To determine this, the following guideline is used to
define "incompatible":

> If a change to the UDM would break a currently defined, downstream API (built
> according to an existing pattern of developing API bindings to the UDM), as
> exercised by a API client writing to or reading data from the API (i.e. via a
> POST, PUT or GET).

Likewise, “backwards compatible” uses this guideline:

> If a change to the UDM would introduce changes into but not break a currently
> defined, downstream API (built according to an existing pattern of developing
> API bindings to the UDM), as exercised by a API client writing data to or
> reading data from the API (i.e. via a POST, PUT or GET).

To clarify the classification used by the Ed-Fi Data Standard, the following
changes are considered as non-breaking:

* A change of element length to be larger (e.g., an increase in String length or
  similar)
* A change of datatype from a more general to specific type (e.g., integer to
  float)
* The change of an element from required to optional
* The introduction of an optional element

In a standard REST API bindings, these changes would typically not break an
integration.

Possible downstream database or other schema changes, or changes to other
bindings outside of a published Ed-Fi API are not considered.

## Example of Full Product Name with Version

A sample that one might see is: _**Ed-Fi Data Standard version 4.5.0**_

| Product Name | Semantic Versioning Information |
| -- | -- |
| Ed-Fi Data Standard | version 4.5.0 |

The semver string shows this release to be major version 4, minor version 5,
patch version 0 (i.e. no patches have been released).

## Early Access Material

New data model material may be first published as "early access" when it is not
yet fully verified as stable. This allows early adopters to try out the proposed
changes and provide feedback on their viability.

Early access materials are described as such with keywords "EARLY ACCESS" in the:

* UDM Handbook
* Open API specifications (Swagger)
* reference documentation

When early access material is verified to be stable, we will remove "EARLY
ACCESS" from the description in the next release. The principal for this
promotion is to ask for burden of proof that is commensurate with the risk or
scope of the change:

Trivial changes may need very little verification – it may be enough to promote
them to final based on some time period as early access Aggressive changes will
require active validation from multiple sources that the change is viable

### Recommendations

Organizations are advised to exercise some caution with using early access
material, as it is more subject to change than most other material. Substantial
work has been done to validate that this change is viable, but the change has
likely not been field tested.

:::note

Any subsequent change to material introduced in an early access version is
considered “non-breaking”, so can be incorporated into a minor-point release.

:::

### Avoiding Early Access Material

If an agency wishes to avoid early access material, it can do so by using only
elements defined in the previous release.

### Purpose of Early Access

Early access materials exist because of two factors

* data model changes are not easily verified due to wide variation in ecosystem
  patterns
* once released, a standard is difficult and expensive to change

Early access materials provide an important mechanism – or invitation – for early
adopters to try out proposed changes. The Alliance has also discovered over time
that the burden of proof that a change is viable needs to be actual field usage.
Previous processes that used community review (i.e., soliciting broad feedback
on data model changes via documentation process) were ineffective: participation
was low and these processes did not effectively filter issues and raise
important questions about use cases.

## Where Are Data Standard Releases Located?

Data Standard releases can be [found on
GitHub](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/releases).
