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

## Suites - the "Generations" of Ed-Fi Technology

It is important not to confuse the suite information with the semantic version
number.

Each version of the Ed-Fi Unifying Data Model (UDM) is part of a numbered Ed-Fi
suite.  The suite number will generally appear as a suffix on the name; it can
de facto be considered part of the product name.

The suite number communicates the "generation" of Ed-Fi standards and technology
in which the product participates. However, note that strict compatibility will
be defined in technical contexts using semver versions.

Semantic version numbers reset between suites in order to support the fact that
a previous suite releases may diverge from the current suite releases.

## Example of Full Product Name with Version

A sample that one might see is: _**Ed-Fi Data Standard for Suite 3 version
4.5.0-b**_

| Product Name | Suite Information | Semantic Versioning Information |
| -- | -- | -- |
| Ed-Fi Data Standard | for Suite 3 | version 4.5.0-b |

The semver string shows this release to be major version 4, minor version 5,
patch version 0 (i.e. no patches have been released) and that the model contains
pre-release material (denoted by the "-b" an by convention material that is
subsequent to a set of "-a" material).

## Early Access Material

New data model material is first published in "early access" releases. Over
time, early access material is incorporated into a "final" version.

### Releases with Early Access Material

An early access release is signaled by an appended letter, e.g., "-a", "-b" etc.
(this is a standard convention adopted from semver as well - see above section
on "Use of Semantic Versioning"). It is possible for there to be multiple
sequential releases; by convention, these letters are incremented alphabetically
when such a sequence occurs. For example:

* v4.5.0-a
* v4.5.0-b
* v4.5.0-c
* etc.

### Promotion to Final

When early access material is verified to be stable, it is included in a final
release. The principal for this promotion is to ask for burden of proof that is
commensurate with the risk or scope of the change:

Trivial changes may need very little verification – it may be enough to promote
them to final based on some time period as early access Aggressive changes will
require active validation from multiple sources that the change is viable

### Recommendations

Organizations are advised to exercise some caution with using early access
material, as it is more subject to change than most other material. Substantial
work has been done to validate that this change is viable, but the change has
likely not been field tested.

Also, any subsequent change to material introduced in an early access version is
considered “non-breaking”, so can be incorporated into a minor-point release.

### Avoiding Early Access Material

If an agency wishes to avoid early access material, it can do so by using only
elements defined in the previous final release. For example, if the
chronological release sequence was as follows:

* v4.3.0
* v4.4.0-a
* v4.4.0-b
* v4.4.0
* v4.5.0-a
* v4.4.0 would be the latest final release, and using only elements defined
  within that model would avoid use of early access material that is included in
  v4.5.0-a

### Purpose of Early Access Releases

Early access releases exist because of two factors

* data model changes are not easily verified due to wide variation in ecosystem
  patterns
* once released, a standard is difficult and expensive to change

Early access releases provide an important mechanism – or invitation – for early
adopters to try out proposed changes. The Alliance has also discovered over time
that the burden of proof that a change is viable needs to be actual field usage.
Previous processes that used community review (i.e., soliciting broad feedback
on data model changes via documentation process) were ineffective: participation
was low and these processes did not effectively filter issues and raise
important questions about use cases.

## Where Are Data Standard Releases Located?

Data Standard releases can be [found on
GitHub](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Standard/releases).
