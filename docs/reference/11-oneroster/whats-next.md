---
sidebar_position: 7
---

# What's Next

This page lists the OneRoster® service work areas that are under
active discussion or exploration beyond the current release. The
items below are informed by community input gathered at Ed-Fi Tech
Congress 2026 and ongoing joint Ed-Fi Alliance and 1EdTech® work.
They are not commitments. Scope, ordering, and inclusion are set by
the joint Steering Committee in consultation with the pilot
community.

For the contextual background on the joint effort, see the section
landing's [Why this exists](./readme.mdx#why-this-exists) beat.

:::note

This page describes exploratory work. Treat it as a statement of
direction, not a release plan. Specifics, including delivery timing,
will land in the affected pages when a decision is made.

:::

## In active exploration

### Assessment Registration alignment

The Ed-Fi Data Standard carries a mature Assessment Registration
domain (which students are registered for which assessments, with
accommodations and administration details). OneRoster v1.2 touches
assessment-adjacent workflows through line items and results. The
overlap and gaps between the two models have not been fully mapped.

The question under discussion is whether assessment registration
should be exposed through the Ed-Fi OneRoster service, continue to
be served by the Ed-Fi ODS / API natively, or some combination.
Input from agencies that operate the Assessment Registration model
today is feeding into the analysis.

_Current FAQ position:_ the OneRoster service does not replace
Ed-Fi Assessment Registration. See the [FAQ](./faq.md#relationship-to-assessment-registration)
for the current recommendation.

### Grade and outcome passback

Two distinct workflows sit under this umbrella:

- Traditional gradebook passback, covering assignment scores, grading
  categories, category weighting, and score scales. OneRoster v1.2
  models these through the Gradebook service (Categories, Line Items,
  Results).
- Assessment results, which Ed-Fi models directly and which OneRoster
  addresses through the Assessment Results Profile.

The question under discussion is whether routing grade passback
through Ed-Fi adds genuine value for SIS, LMS, and agency use cases,
or whether the existing SIS-to-LMS workflow is the right place for
that traffic to continue to live. Early indications from state
partners using an LMS-to-ODS-to-reporting pattern are informing the
analysis.

### Extension guidance and governance

OneRoster v1.2 allows vendors and agencies to attach additional
fields to standard objects through `metadata.*`. In the wild, roughly
forty common extension fields are in circulation across OneRoster
deployments. The Ed-Fi OneRoster service currently echoes Ed-Fi
natural keys through `metadata.edfi` and supports the
specification-level extension mechanism, but it does not ship shared
guidance for which fields belong in `metadata.*`, which should be
carried by Ed-Fi extensions and surfaced through the Ed-Fi API, or
how extension fields should be governed across deployments.

The joint working group is evaluating:

- A shared catalog of common extension fields and their recommended
  carrier (OneRoster `metadata.*`, Ed-Fi extension, or neither).
- Governance and review for new extensions proposed by vendors or
  agencies.
- Validation tooling that can check a deployment's extension usage
  against the agreed catalog.

Until that work lands, vendors should expect extension handling to be
per-deployment. See the [Data Model](./data-model/readme.mdx) section
for what the service emits today.

## Longer-term direction

### OneRoster Profile for Ed-Fi

1EdTech maintains a formal mechanism, the _Profile_, for tailoring a
OneRoster specification to the needs of a specific market segment
without fragmenting the core standard. Existing Profiles include the
Norwegian K12 Profile, the Japan OneRoster CSV Profile, and the
Assessment Results Profile.

The longer-term direction of the Ed-Fi Alliance and 1EdTech
collaboration is a OneRoster Profile for Ed-Fi. A Profile allows
agreed adjustments (required versus optional fields, controlled
vocabularies, regionally-scoped extensions) to be codified and
certified against, rather than handled through per-deployment
customization. It is the formal mechanism through which the
extension-governance work above would be ratified.

### Other exploratory items

Items surfaced at Ed-Fi Tech Congress 2026 without committed scope or
timing include:

- Async event bindings on the Ed-Fi ODS / API that would let the
  OneRoster service react to ODS changes without polling.
- Integration with CASE for standards-based grading support.
- Digital credentials and universal-ID patterns that span the Ed-Fi
  and 1EdTech ecosystems.

## How to engage

The joint Ed-Fi Alliance and 1EdTech effort is community-driven.
Pilot agencies, vendors, and MSPs are actively shaping the above.

- Community contact: `RosteringProject@1edtech.org`
- Joint collaboration overview:
  [1edtech.org/about/partners/ed-fi](https://www.1edtech.org/about/partners/ed-fi)
- Ed-Fi OneRoster service repository issues:
  [Ed-Fi-Alliance-OSS/edfi-oneroster](https://github.com/Ed-Fi-Alliance-OSS/edfi-oneroster/issues)

Feedback from real deployments, including which of the above items
would unblock or accelerate your work, is the primary input into
what ships next.
