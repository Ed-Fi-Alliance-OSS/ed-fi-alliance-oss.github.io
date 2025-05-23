# Governance

This section describes the principles that guide the governance choices made for
the Ed-Fi Unifying Data Model (UDM).

## Influences

Changes to the data model are influenced by a number of sources:

* Field Implementation Reports and Artifacts.
* The Ed-Fi Community and [governance groups and processes](https://edfi.atlassian.net/wiki/spaces/GOV/overview).
* Ed-Fi Governance Groups.
* Data Standard RFC comments
* Bug Reports submitted via the [Ed-Fi Community Hub](https://community.ed-fi.org).
* Common Education Data Standards (CEDS) and other standards related to K–12
  education.
* Industry and International Standards, where established and appropriate for
  use in K–12 education.

These influences combine to define each subsequent version of the Ed-Fi UDM.

## Making Changes

All changes to the Ed-Fi UDM have some impact and certain kinds of changes are
easier than others. This section defines key points on how the Alliance thinks
about changes to the Ed-Fi UDM.

### Principles

There are a few major factors that influence if a change should be made to the
UDM.

1. **There is clear evidence of need across many education organizations within
    the Ed-Fi community.** The Ed-Fi data standard exists to serve common and
    shared  use cases, and non individualized use cases. To ensure that changes
    serve the community, there must be evidence that the exchange of the
    elements is valuable to a reasonable segment of the community. There is no
    magic way to determine how much evidence is needed; for a minor addition it
    might be enough to have 2 or 3 examples of field need, and for larger ones,
    we must be confident that the need is greater.
2. **There must be sufficient evidence from which to design a data model**.
    Even if we have established the need, we must still as a community have
    access to sufficiently detailed use cases and other artifacts (such as
    source system data models) to understand the right data model. Aligning on a
    sub-optimal data model can be very painful, as, once operationalized, a
    standard is very hard to change. For this reason, considerable effort goes
    into this task.
3. **We must consider if the source systems from which the data is flowing are
    part of the Ed-Fi community and/or conversation.** Since the purpose of the
    Data Standard is to standardize data exchange and to do so in a
    community-centric fashion, it is important to engage providers and others
    who manage systems from which the data originates. Efforts to grow the
    standards should be actively seeking to incorporate those voices.

### Additions

* Adding entire domains or major entities to the Ed-Fi UDM generally require a
    strong pull from the Ed-Fi Community or a significant technology change in
    the education data field.
* Adding domains or major entities also generally happens in conjunction with
    field work such as proof-of-concept implementations, or deconstruction of
    technology submitted to the [Ed-Fi
    Exchange](/getting-started/edfi-exchange).
* Adding elements to an existing entity requires a lower burden of proof, but
    still requires documentation of specific use cases from field work.
* The Alliance periodically reviews how field work is extending concrete
    implementations. In cases where field work has extended the standard in the
    same way, the Alliance will work with the community to propose and add Ed-Fi
    UDM with elements to support those extensions natively. This practice helps
    reduce ecosystem fragmentation and evolve the scope of K–12
    interoperability.
* Adding required additional elements is often a breaking change — so the
    Alliance generally waits until a major release to do so. Optional fields may
    be introduced in a minor release if it appears it can be done without
    introducing major difficulty for current exchanges.
* With every major release and periodically as CEDS make major releases, the
    Alliance reviews the then-current version of CEDS for alignment
    opportunities (primarily the entities and elements in the K–12 domain, but
    the entire model is scanned).
* Relatively minor changes (e.g., slight changes in definitions) or easily
    handled (and likely non-breaking) migrations (e.g., changes from an integer
    to a decimal), are generally easier and quicker to handle. Changes with a
    greater systemic impact (e.g., making a formerly required element optional)
    go through a more intensive review process.

### Corrections

Corrections made to fix obvious flaws are (relatively) straightforward.

* Corrections to annotations, definitions, or other non-technical artifacts
    with no impact to implementations are usually approved and implemented. For
    example, a spelling error in a entity annotation or general documentation
    will be made at the earliest opportunity.
* Corrections and naming inconsistencies in field names are also usually
    approved. Since these are often breaking changes to implementations, we
    typically wait for a major release or for a point when other breaking
    changes are also being released.
* Modeling errors are occasionally found, or weaknesses become apparent over
    time. If the error or weakness is in a domain not widely in use
    (operationalized), the change is usually made in a subsequent minor release.
    If the error would cause substantial ecosystem impacts, it may be held for a
    major release.

### Deletions

Deletions can be problematic for implementers, so caution is important. However,
judiciously applied, deletions can keep the standard simple and bloat-free.

* The model is periodically scanned for elements that appear to be unused in
    field work and they are flagged for removal.
* Where possible, elements are deprecated before removal. This provides the
    community a transition period and also allows for implementers to alert the
    Alliance about the need met by the entity.
* Where applicable, mappings or options for handling deleted or deprecated
    elements are provided.

## Transparency

As noted, the Alliance takes input from all sources at every opportunity. Most
Ed-Fi Community members have full-time jobs, so we generally reach out only when
we have major changes — but those who follow the Alliance's work have many
opportunities to provide feedback. Here's our general approach to ensure that we
telegraph all changes before they happen:

* To the extent practical, all Data Standard discussion is documented in the
    [Ed-Fi Tracker DATASTD project](https://edfi.atlassian.net/jira/software/c/projects/DATASTD/issues/).
    Anyone is invited to participate in that discussion (see the [Ed-Fi
    Code of Conduct](/community/involved/code-of-conduct)).
* If scheduling permits, major changes are presented and discussed at the
    annual Ed-Fi Summit and/or the Ed-Fi Technical Congress, as is applicable in
    that release cycle.
* The Alliance convenes an expert panel to reviews all domain additions, major
    entity additions, and major changes.
* Community [Governance
    structures](https://edfi.atlassian.net/wiki/spaces/GOV/overview) also
    provide input mechanisms for specific domains or areas of the model.

So, if you care about the model, get involved. Comment and share ideas and
feedback early and often.

## More Information

To find out more, or to get involved, see [About - Ed-Fi Data Standard](../data-standards.md)
