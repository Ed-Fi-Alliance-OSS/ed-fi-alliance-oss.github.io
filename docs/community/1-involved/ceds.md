---
description: Collaboration Guidelines
---

# CEDS and Ed-Fi

## Introduction

From the inception of the Common Education Data Standards (CEDS) and the Ed-Fi
Alliance, the two efforts have sought close collaboration and communication.
This has been expressed in many ways including the CEDS development of the
“Extend” functionality within the Domain Entity Schema to enable the
incorporation of emerging Ed-Fi elements not yet in CEDS, the Alliance
maintaining Ed-Fi mappings within the Align tool, and CEDS and Alliance staff
comparing Assessment elements and actively adopting each other’s definitions.

There has been, however, a growing demand by the field to expand the data
dictionary and models that lie at the core of their education data needs. This
expansion in the data dictionary, tools to support, and implementation has made
it more imperative to establish a closer and more integrated coupling of the
CEDS and Ed-Fi data dictionary efforts.

Both initiatives agree to seek more formalized collaboration in the areas of new
element development, existing element alignment, and synchronization of
development and release cycles.

## Background and Context: Organizational Mission and Goals

A precise understanding of each organization’s respective mission and goals,
including identifying where they align and diverge is helpful and necessary both
to provide clarity to our mutual stakeholders, and to guide the development of
approaches and processes for closer collaboration, which are articulated later
in this document.

The core mission of CEDS is to provide common element names and definitions
covering the entire P-20W system, including the data LEAs and SEAs typically
handle. CEDS has also described itself as _establishing and continuing to evolve
as the “Rosetta Stone of education vocabulary._” CEDS, in pursuit of this
mission, is characterized by a “breadth” focus (across P-20W sectors), centered
on developing and maintaining a **standardized vocabulary of data elements**
organized and accessed through a user-friendly, non-technical hierarchy called
the **Domain Entity Schema** (DES), that in turn can be utilized and
operationalized across the target sectors.  CEDS invests in areas beyond the
standardized P-20W vocabulary, including a **Normalized Data Schema** (NDS) as a
reference implementation for operationalizing CEDS elements, and a suite of
**tools** to support working with education data. CEDS also engages deeply with
its **community** of stakeholders across the P-20W sector.

Ed-Fi’s core mission is to _operationalize the standardized exchange of data for
the K12 sector_. In pursuit of this goal, the Ed-Fi Alliance has chosen to
invest in the “full stack” of data standardization, which can be thought of as a
“depth” approach. This starts with defining the **Ed-Fi Data Standard**, which
consists of a logical data model (that references a data dictionary aligned to
CEDS) – known as the **Ed-Fi Unifying Data Model** (UDM) – together with a
**data exchange framework** that defines how the logical data model can be
represented in concrete form (serialization) and the protocols and other
requirements for movement of that data between systems (transport), for
implementing standardized data exchanges. The Alliance also invests **in open
source technology and tools** that provide starter and reference implementations
aligned to the data standard. Finally, the Alliance invests deeply in ongoing
engagement with the Ed-Fi community of adopters and implementers in order to
ensure the technology suite continues to serve administrators, teachers, and
students.

Finally, it is worth noting that the missions of CEDS and Ed-Fi lead to some
important procedural differences in how each develops and governs its respective
standards artifacts. Given CEDS’s goal to coordinate data definitions and naming
broadly across the education sector, its standards artifacts may in some cases
**precede** the technical field implementation (those artifacts seek to help
stakeholders standardize aspects of their technical implementations).  Given
Ed-Fi’s goal of operationalizing standardized data exchange, the standards
produced by Ed-Fi will in most cases **follow** the examples and lessons from
actual field work.

## Opportunities for Collaboration and Differentiation

The obvious area for collaboration between CEDS and Ed-Fi is around the
**definition and alignment of common vocabularies in overlapping sectors**.
Additionally, CEDS and Ed-Fi have overlapping **communities of stakeholders**,
and both organizations are committed to providing precise and informative
information to serve these constituents.

The areas when CEDS and Ed-Fi are distinct and differentiated – and where care
needs to be taken to avoid confusing our mutual stakeholders, or competing
and/or duplication of effort - is how and where the commonly defined
vocabularies are further refined and transformed into concrete implementations.

* Ed-Fi is focused on operationalizing standardized data exchanges in the K12
  ecosystem to support student outcomes, **with a specific focus on data
  exchange between agencies and vendors and from vendor to vendor**.
* CEDS is increasingly focusing on leveraging CEDS vocabularies to **simplify
  federal reporting** and **aligning data vocabularies for coherence across
  various technical standards for the entire P-20W education ecosystem**.

From a technical perspective, the distinctions and differentiations are found in
the CEDS _Normalized Data Schema_ and Ed-Fi _Unifying Data Model & data exchange
framework_.

## Common Vocabularies - Collaboration Details

The following statements are meant as a guide to this closer coupling and
collaboration in the development of elements and enumerations that will be
included in future releases by either initiative. The overriding goal is to
continue to ensure strong alignment and parity to existing elements and
enumerations with the least amount of disruption to the education data community
at large.

## New Element Development

As the field identifies new use cases and element standardization needs and
either initiative identifies gaps in their existing models, a collaboration will
exist between the two groups to review what currently exists in the standards
space and work collaboratively to standardize the development and definition of
these new elements.

### New Element Development Process Flow

Has the element already been defined in CEDS or Ed-Fi? (In addition to reviewing
the respective standards themselves, CEDS and Ed-Fi will reach out to the
leadership of the other organization and will provide them with a list of
prospective elements to determine if they already exist in the other model.)

1. If No – Determine interest in joint development.  If the element(s) will
   impact the other model, joint development will take place to ensure
   consistency among the standards. If the elements will not impact the other
   model, confirmation will be provided that the development can proceed without
   any needed collaboration.
2. If Yes – An analysis will be conducted to determine applicability to the
   model.  If any changes to the element name or definition need to take place,
   representatives from the two organizations will discuss the impact of these
   changes and determine the path forward
   1. If the element as it stands is a direct fit – it will be incorporated
   2. If the element as it stands needs to be adjusted to meet the need of the
      other organization and there is agreement to adjust the element, it will
      be adjusted and then incorporated.
   3. If the element as it stands does not fit and cannot be adjusted due to
      potential disruption in the current standards one of two things will
      occur:
      1. The reason for non-alignment will be documented, a difference will
         exist between the two standards around this particular element, and no
         further collaboration to bring them into alignment will be pursued.
      2. The reason for non-alignment will be documented, a difference will
         exist between the two standards around this particular element, and
         efforts will be made in future versions to slowly bring the two
         elements into alignment.

## Existing Element Alignment

Both CEDS and Ed-Fi contain a large number of elements.  In some instances,
those elements are aligned one to one.  In others, there are variations to the
element name and/or definition.  A collaborative effort will be undertaken to
determine the differences between the two standards and document the work
necessary to bring consistency where possible.

_Existing Element Alignment Process:_

1. Each organization will do a comparison of existing elements
2. Unaligned elements will be documented
3. Where unaligned elements can be eventually aligned, a path forward to arrive
   at that alignment will be documented.
4. Where unaligned elements cannot be aligned, due to the nature of specific and
   often diverse implementation needs, including needs derived from maintaining
   continuity with existing adoption of the standards in field work, the reasons
   for continued misalignment will be documented and periodically reviewed.

_Synchronization of Development and Release Cycles:_

As both initiatives are solely driven by the emerging needs of education data
stakeholders, development and release cycles are very often driven by these
demands. As such, there is not currently an established cycle that would enable
institutionalized synchronization. Thus, the initiatives both commit to early
and frequent communication regarding the development and release cycle for the
current N+1 version.

1. As the current cycle is defined, each organization will reach out and
   communicate the development and release plans.
2. Both initiatives will seek to identify key points at which input will be most
   critical.
3. To the extent possible, release cycles will be coordinated in a way to reduce
   the lag time between release and incorporation of mutually desired elements.

:::note

The CEDS and Ed-Fi Collaboration Guidelines can be downloaded in PDF format.
**[CEDS and Ed-Fi Collaboration Guidelines (PDF)](/files/CEDS-and-Ed-Fi-Collaboration-Guidelines.pdf)**

:::
