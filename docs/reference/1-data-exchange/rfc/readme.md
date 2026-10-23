---
sidebar_position: 5
description: How a change to the Ed-Fi Data Standard becomes official, from idea through Request for Comment (RFC), review, approval, and release.
---

# Requests for Comment (RFC)

A change to the Ed-Fi Data Standard becomes official by moving through the Ed-Fi
Alliance governance process: someone proposes it, the Ed-Fi Alliance turns it
into a Request for Comment (RFC) that the community reviews, the Technical
Advisory Group (TAG) and Governance Advisory Team (GAT) review it as needed, and
the Ed-Fi Alliance Management Committee gives final approval. Approved changes
are then published in a versioned release of the Ed-Fi Data Standard.

## From idea to final approval

Every change moves through the same stages, whether it starts with a work group
or with Ed-Fi Alliance staff:

1. **Idea initiation**: someone raises a change or a gap in the standard (see
   [How to propose a change and follow it](#how-to-propose-a-change-and-follow-it)).
2. **RFC process and engagement**: the idea becomes a request. The Ed-Fi
   Alliance team manages proposed changes and works with community members to
   design and validate them.
3. **Incorporation of feedback**: comments are folded back into the proposal.
4. **TAG and GAT review**: the Technical Advisory Group and Governance Advisory
   Team review changes as needed.
5. **Final approval**: the Ed-Fi Alliance Management Committee signs off, and
   the change is implemented on the roadmap.

The [Governance](/community/involved/governance) page describes the groups
involved at each stage and how to take part.

## How to propose a change and follow it

1. Sign in to the [Ed-Fi Community Hub](https://community.ed-fi.org) and submit
   a case describing the change you would like to see. If you would like the
   team to be able to contact you on GitHub, include your GitHub handle in the
   case.
2. Requests that are shared publicly are tracked on the [Data Standard ·
   Product Roadmap](https://github.com/orgs/Ed-Fi-Alliance-OSS/projects/2/views/3)
   in GitHub, where you can follow an item's status to see whether it has been
   accepted or declined. Anyone is welcome to comment on ongoing work there.

For more ways to take part, such as the Data Standard Work Group, see
[Reporting Issues and Making
Suggestions](../udm/reporting-issues-and-making-suggestions.md).

## Where to find and comment on RFCs

- Data Standard RFCs are published as [GitHub Discussions with the RFC
  label](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Technology-Roadmap/discussions?discussions_q=label%3ARFC).
- Proposals for the Ed-Fi Technology Suite are tracked in the [Technology Suite
  Proposals](https://github.com/orgs/Ed-Fi-Alliance-OSS/projects/2/views/1)
  project.
- When an RFC is finalized, it is published to the [API
  Specifications](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-API-Specifications/tree/main/RFC)
  repository and is no longer open for comment. A finalized RFC is either
  already implemented in the Unifying Data Model or being implemented for an
  upcoming release.

## What RFC status means

A _draft RFC_ is a design proposal that has not been incorporated into the Ed-Fi
Data Standard's Unifying Data Model. A _published RFC_ represents a design that
has been finalized for a versioned release of the Ed-Fi Data Standard: it is
either already included in a release or being implemented for an upcoming one.

The Ed-Fi Community may choose to implement a draft RFC as an extension to the
Ed-Fi Data Standard so that the model can be put into limited operational use.
Doing so helps the Community provide practical feedback on the RFC model's
utility in addressing the problem it was designed to solve. In such a case,
those implementing the draft RFC should stay in close contact with the Ed-Fi
Alliance and other Community members so that any incremental updates do not
lead to version fragmentation.

Draft RFCs are not included in the Ed-Fi Certification program, which only relies
on the official, published, Ed-Fi Data Standard releases.

## After approval: release and early access

Approved changes are published in a versioned release of the Ed-Fi Data
Standard, which uses semantic versioning. New material may first be published
as _early access_ when it is not yet fully verified as stable. The "EARLY
ACCESS" label is removed in a later release once the material matures. See
[Ed-Fi Data Standard Versioning and Releases](../versioning-and-releases.md).
