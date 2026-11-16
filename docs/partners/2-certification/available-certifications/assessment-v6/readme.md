# Ed-Fi Assessment Outcomes API for Data Standard v6 Certification

:::info

The Ed-Fi Assessment Outcomes API for Data Standard v6 Certification is in
community review. It is aligned to the
[Ed-Fi Assessment Vendor Native Integration Playbook](/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-playbook/).

:::

Certification Name: Ed-Fi Assessment Outcomes API for Data Standard v6 \
Standards Referenced: \
   [Ed-Fi Assessment Outcomes API (RFC 22)](https://edfi.atlassian.net/wiki/display/EFDSRFC/ED-FI+RFC+22+-+ASSESSMENT+OUTCOMES+API)
\
   [Ed-Fi API Design & Implementation Guidelines v3.1](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-API-Standards/tree/main/api-guidelines/v3.1)
\
   [Ed-Fi Assessment Vendor Native Integration Playbook](/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-playbook/)
\
Data Standard: v6 \
Obsoletes: – \
Obsoleted By: – \
Status: Community Review

Certifying Organization: Ed-Fi Alliance \
Contact: [certification@ed-fi.org](mailto:certification@ed-fi.org) \
Publication Date: \[DRAFT — date TBD upon Alliance publication\] \
Certification Version: 1.0 \
Last Revision Date: 11/16/2026

## Overview and Purpose

The Ed-Fi Assessment Outcomes API for Data Standard v6 Certification verifies
that a source system (the provider) can manage a core set of assessment data on
a target system (the consumer) using the RESTful APIs defined by
[ED-FI RFC 22 - ASSESSMENT OUTCOMES API](https://edfi.atlassian.net/wiki/spaces/EFDSRFC/pages/25363177/ED-FI+RFC+22+-+ASSESSMENT+OUTCOMES+API).

In this data exchange architecture, the provider implements an API client which
uses HTTP/S requests and RESTful patterns to manage API resources on the
consumer system, which implements the API definition itself (see Figure 1).

![Conceptual data exchange architecture](https://edfidocs.blob.core.windows.net/$web/img/partners/certification/provider-consumer.png)

**Figure 1.** Conceptual data exchange architecture

The certification further aggregates normative requirements found by the Ed-Fi
community to be critical to "real world" data exchange and interoperability —
including requirements around error handling and recovery, roster
configurability, and others. **The certification's requirement set is aligned to
the Ed-Fi Assessment Vendor Native Integration Playbook.** The sections below are organized using the same six validation
categories defined in the Playbook's own Certification Checklist (Playbook §15),
so that a vendor's certification record and the Playbook's checklist trace
requirement-for-requirement. Each requirement cites the specific Playbook section
it comes from.

This conformance specification covers the provider certification _–_ that is,
the responsibilities of the _API client_ implementer and not the _API
consumer_.

## Overview of Requirements

This section provides an overview only; detailed, step-by-step requirements are
available in the
[Assessment Outcomes API Certification for Data Standard v6 - Steps](./certification-steps.md).

### Structural Integrity

(Playbook Part III §4–§5, §7.1, §11.2 · Playbook Checklist §15.1)

Each Assessment MUST resolve to exactly one AcademicSubject (Playbook §4.1).
Cross-subject instruments MUST use the _Composite_ subject at the top level,
with subject-specific results represented through ObjectiveAssessment (Playbook
§4.2). A top-level Assessment record MUST NOT span more than one academic
subject.

The Assessment/ObjectiveAssessment hierarchy MUST faithfully mirror the vendor's
score report structure: every subscore, domain, strand, or skill the vendor
reports MUST be represented as an ObjectiveAssessment, applied recursively for
multi-level structures (Playbook §5.1, §5.3). Overall and composite results
belong at StudentAssessment; subscore results belong in
StudentObjectiveAssessment — the two levels MUST NOT be mixed (Playbook §5.1,
§5.2).

All fields marked "required" in the API specification remain REQUIRED, and in
addition the data submitted MUST offer parity with the score reports the vendor
currently publishes to its users — every element that appears on the vendor's
official score report MUST appear in the Ed-Fi integration unless prohibited by
policy or regulation (Playbook §5.2). Those score reports are published in the
provider certification record.

The dependency chain Assessment → ObjectiveAssessment → StudentAssessment MUST
fully resolve, with no orphaned references and no "ghost definitions" —
structure published without corresponding results, or results submitted without
corresponding structure (Playbook §11.2, §5.1).

**Enumerations.** The Assessment API model contains a number of controlled
vocabularies. For some enumerations, a vendor is allowed to supply their own
additional values if an Ed-Fi value fails to match the semantics needed. These
enumerations are:

- AssessmentPeriodDescriptor
- PerformanceLevelDescriptor
- AccommodationDescriptor
- AssessmentReportingMethodDescriptor

Once accepted, these vendor-supplied values MUST NOT be renamed, normalized, or
remapped at ingestion (Playbook §7.1) — vendor-native score names and
performance level values must be preserved exactly as reported. The
certification captures and publishes vendor-specific enumerations (in the
provider entry in the
[Registry of Ed-Fi Certified Products](../../registry-of-ed-fi-certified-products.mdx)),
and tests that enumerations used during testing are within the allowed
enumeration sets.

### Student Identity and Rostering

(Playbook Part IV §8 · Playbook Checklist §15.2)

If the product uses a rostering standard or a similar de facto industry roster
specification (such as the OneRoster standard or the Clever roster), and that
standard contains multiple possible student IDs, the certifying product MUST
demonstrate the ability to allow a user of the product to configure which
student identifier to use within transactions for an education agency
(configurability can be more granular than education agency-level, but this
level is the minimum required) (Playbook §8.3). Such a capability has proven
important in field work to date; for example, some districts may align on state
identifiers for various reasons (e.g., as they are part of school district
collaboratives) or use "student numbers" on occasion. If the product uses
multiple roster standards, it is only required to demonstrate this capability
with one standard.

Beyond identifier configuration, the provider MUST document its overall
rostering approach and — where vendor identifiers don't directly match
StudentUniqueId — its identity crosswalk methodology (Playbook §8.2, §8.4).
Match rates MUST be measured and reported, not merely assumed (Playbook §8.4).
Identity resolution MUST occur before data load, not after; records with
unresolved identity MUST NOT be submitted (Playbook §8.5).

Unmatched student records MUST be surfaced and reported — never silently dropped
(Playbook §8.6). District users MUST be able to view identity mismatches and
correct them without requiring vendor intervention (Playbook §8.7).

### Event Completeness

(Playbook §6 · Playbook Checklist §15.3)

Every StudentAssessment record MUST populate the following event-context fields
when available. These fields define _when_ and _how_ an assessment occurred;
they are distinct from AssessmentIdentifier, which defines _what_ the assessment
is, and MUST NOT be encoded into it (Playbook §6.1, §6.3):

- **SchoolYear** — groups results into the correct academic year
- **AdministrationDate** — the date, and where relevant the time, of the
  attempt; enables enrollment/instruction alignment. The field accepts an ISO
  8601 date-time, so including a time (e.g., 11:00 vs. 15:00) lets agencies tell
  apart two attempts on the same day.
- **AssessmentPeriod** — when applicable, for consistent interpretation of
  timing within the instructional cycle
- **WhenAssessedGradeLevel** — anchors the result to the student's grade at time
  of assessment
- **RetestIndicator** — where the assessment has a retest concept,
  distinguishes first attempts from subsequent attempts

A StudentAssessment record is uniquely identified by its assessment reference,
its student reference, and the vendor's StudentAssessmentIdentifier.
AdministrationDate is not part of that identity and is optional in the model.
The provider MUST assign each attempt its own stable StudentAssessmentIdentifier
so that multiple attempts by the same student do not collide (Playbook §6.1).

RetestIndicator is required only where the assessment has a retest concept, for
example where a student is limited to one active test per window. Products
without one, such as progress-monitoring assessments that students may take as
often as needed, are not required to populate it, and SHOULD state this in their
data mapping (Step 3).

### Safe Reprocessing

(Playbook §11.3, §13.1 · Playbook Checklist §15.4)

Reprocessing is a routine operational scenario for an assessment integration,
not an edge case. The integration MUST be tested across four scenarios:
incremental reload, vendor correction reload, full-year reload, and historical
backfill (Playbook §11.3, §13.1).

Across all four, the integration MUST use stable natural keys such that the same
input always resolves to the same resource identity (Playbook §11.3). Reruns
MUST upsert existing records rather than create duplicates, and corrections MUST
update the existing record for that event rather than create a new one.
Duplicate prevention MUST be demonstrated during testing, not merely asserted in
documentation.

### Scalability and Runtime

(Playbook §13.1–§13.2 · Playbook Checklist §15.5)

The provider MUST demonstrate the ability to perform create and update
operations on API resources. For update, HTTP POST or PUT are both accepted.

In field work, the ability to capture, display errors, and offer facilities to
re-try after error conditions are found have proven essential to
interoperability. The certification testing ensures a basic level of such
functionality is in place.

Beyond basic retry, the integration MUST demonstrate batch scalability under
peak load conditions — assessment integrations are inherently bursty (BOY/EOY
windows, district-wide retesting) and must handle both peak volume and full
reprocessing, not incremental loads alone (Playbook §13.1). Retry logic itself
MUST be deterministic and bounded, coordinated with safe reprocessing so retries
never create duplicate records, and MUST respect dependency order — pausing
downstream retries if an upstream dependency fails (Playbook §13.1). The
integration MUST implement a controlled backoff strategy that respects API rate
limits and avoids cascading failures during outages (Playbook §13.1).

Parallel execution MUST remain safe across separately-scoped API credentials and
MUST respect dependency order: parallelizing across distinct credential scopes
is safe, while running full reloads and incremental loads concurrently against
the same credential scope is not (Playbook §12.1, §13.1).

Failures MUST be logged in a way that is scoped to the relevant API credential,
resource-specific, time-stamped, and diagnosable without requiring vendor
interpretation (Playbook §13.2). In addition, the integration MUST support
reconciliation reporting: at minimum, counts of records attempted, loaded, and
rejected, broken down by resource type and error category (Playbook §13.2).

### Governance and Namespace

(Playbook §3, §7, §10, §13.3 · Playbook Checklist §15.6)

**Descriptor namespace.** Assessment-specific descriptors that the provider owns
(reporting methods, performance levels, categories, periods) MUST remain in a
vendor-specific namespace and MUST NOT be locally overridden or remapped at
ingestion (Playbook §7.1, §7.3).

Shared, non-assessment descriptors (AcademicSubject, GradeLevel, Language) are
not consistent across implementations, and many state education agencies
require their own values (see
[Non-normative Descriptor Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)).
For these descriptors, certification distinguishes between what is required and
what is recommended:

- **Required for certification:** the provider MUST be able to map these
  descriptors to the values each receiving implementation uses, whether those
  are in the default Ed-Fi namespace, a state namespace, or another governing
  organization's namespace. The mapping MUST be configured per implementation
  environment, as described under _Descriptor mapping infrastructure_ below
  (Playbook §7.2, §10.2). Supporting only the default Ed-Fi namespace does not
  meet this requirement.
- **Recommended practice:** where the receiving implementation does not specify
  its own values, use the default Ed-Fi namespace values. Descriptor namespace
  SHOULD clearly indicate the organization that governs the value.

**Descriptor mapping infrastructure.** The namespace and override rules above
MUST be implemented as externally configurable, per-receiving-implementation
mapping logic — not hard-coded into transformation logic — so mappings can be
adjusted without code changes (Playbook §10.3). No end-user interface is
required: a configuration file or artifact that is swapped in or referenced for
each implementation environment meets this requirement. The requirement is only
that mappings are not hard-coded. Mappings MUST be transparent,
documented, and traceable over time: able to answer what was sent, what the
original vendor value was, and what rule (if any) produced it (Playbook §10.4,
§10.6).

**Identifier and versioning governance.** AssessmentIdentifier MUST remain
stable over time when the structure or meaning of results is unchanged, and MUST
NOT encode administration windows (BOY/MOY/EOY), school year, or other
time-based information (Playbook §3.3). Where an AssessmentFamily groups related
assessments in the same product line, each member MUST retain its own distinct
Namespace and AssessmentIdentifier (Playbook §3.4). The provider MUST document
version tracking across three independent layers — Assessment Version, Ed-Fi
Data Standard Version, and Integration (Bundle) Version — and MUST be able to
explain identity resolution, descriptor mapping, and event modeling behavior
without requiring inspection of transformation code (Playbook §13.3).
