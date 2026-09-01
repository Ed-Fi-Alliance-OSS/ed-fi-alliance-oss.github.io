# Assessment Outcomes API Certification for Data Standard v5 - Steps

:::info

The Ed-Fi Assessment Outcomes API for Data Standard v5 Certification is currently under revision to align to the requirements of
the [Ed-Fi Assessment Native Integration Playbook](https://docs.ed-fi.org/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-playbook/part-vi-validation-and-certification). 

:::
 

# Assessment Outcomes API Certification for Data Standard v5 - Steps

There are 16 steps to completing certification: 10 documentation steps (completed
prior to certification) and 7 tests that MUST be completed.

Note that not all steps are required for all products, as some tests are
optional or only apply to products with certain features. Please consult the
details below each step for details.

Steps marked "New in Version 2.0" or "extends" below implement requirements from
the [Ed-Fi Assessment Vendor Native Integration Playbook](https://docs.ed-fi.org/getting-started/provider-playbook/specifics-by-provider-type/assessment-providers/assessment-providers-playbook/).
Section references such as "Playbook §5.2" refer to that document; see its Part
III–V for full context on any requirement summarized briefly here.

## Quick Reference: Certification Checklist

The tables below give the full picture in one place — what you need to
deliver or demonstrate, whether it applies to your product, and whether it's
new in this version. Full detail for each step is in the numbered sections
that follow; use this page to plan, and the numbered sections to execute.

**Conventions:** "Always" means every certifying product must satisfy this.
Anything else states the specific condition that makes it apply to you. A
step's detailed section always tells you what to do if a condition doesn't
apply to you (usually: state that plainly, rather than skip the step).

### Part I — Documentation (submit before your live session is scheduled)

| # | What you must deliver | Applies to you if... | Status |
|---|---|---|---|
| 1 | Product availability & pricing information | Always | Unchanged |
| 2 | Implementation verification info + documented tracking across 3 version layers (Assessment / Data Standard / Integration) | Always | Extended |
| 3 | Data mapping + AssessmentIdentifier stability policy + subject-assignment confirmation + AssessmentFamily grouping criteria | Always — AssessmentFamily bullet only if you group related assessments under one product line | Extended |
| 4 | Usage narrative (<1000 words) + brief description of how you handle peak load and the 4 load types | Always | Extended |
| 5 | Score report template(s), as PDFs | Always | Unchanged |
| 6 | Sample data for 100–500 students + 1 intentionally-unmatched record + 1 multi-attempt record | Always — multi-attempt record only if your product supports retests | Extended |
| 7 | Learning standards reference spreadsheet | Only if your data mapping references learning standards | Unchanged |
| 8 | Vendor-specific enumeration values, in Ed-Fi JSON/XML format | Only if you use vendor-specific enumeration values | Unchanged |
| 9 | Descriptor mapping documentation: configurability, override capability, transparency artifact, change control | Always — if your pipeline is pass-through with no transformation, state that explicitly and move on | **New** |
| 10 | Identity crosswalk methodology: matching approach, match-rate reporting, unmatched-record handling, district correction workflow | Only if your identifiers don't directly match StudentUniqueId | **New** |

### Part II — Live Tests (conducted via screen-share with Ed-Fi Alliance staff)

| # | What "passing" looks like | Applies to you if... | Status |
|---|---|---|---|
| 11 | You show how data exchanges are triggered | Always | Unchanged |
| 12 | You demonstrate identifier configuration (or Enrollment API rostering), a measured match rate, and unmatched-record handling | Always — identifier-configuration demo only if multiple student IDs are possible for you | Renamed / Extended |
| 13 | You transmit the full sample data set; it lands completely and correctly; its structure and hierarchy hold up under analysis; and your submission respects dependency order | Always | Extended — consolidates 3 prior tests into one |
| 14 | You demonstrate 4 reprocessing scenarios (incremental, correction, full reload, backfill) without creating duplicates | Always | **New** — absorbs v1.0 Steps 12 & 13 |
| 15 | You demonstrate error capture, retry, backoff, and diagnosable logging | Always — parallel-execution demo only if your integration supports parallelized submission | Extended |
| 16 | You demonstrate namespace alignment and, where relevant, descriptor override configurability | Always — override demo only if your pipeline applies any transformation | **New** |

**How the live tests connect:** Step 13 now covers data transmission, structural
and hierarchy validation, and submission sequencing together — all three
examine the one data set you submit once, so you won't be asked to resubmit
for each. Step 14 (reprocessing) and Step 16 (governance/namespace) also build
on that same Step 13 submission. Steps 15 and 17 are independent,
self-contained demonstrations that don't depend on Step 13's data.

<--! *[STAFF TO CONFIRM before publishing: whether Steps 13–17 run as one scheduled
session or are split across multiple sessions, and what turnaround time
vendors should expect for the asynchronous structural/hierarchy analysis
referenced in Step 13. This page doesn't yet answer that, and vendors
planning certification will need to know it.]* -->

## I. Pre-Certification Documentation

The following documentation must be received by the Ed-Fi Alliance prior to
certification. Ed-Fi may ask for clarifications or changes in order to ensure
clarity and uniformity.

### 1. Product Availability & Pricing Information

See Requirements - Product Availability Information
See Requirements - Pricing Statement
See Optional - Security Validations


### 2. Initial Implementation Verification Information

See Requirements - Implementation Verification

In addition, the provider MUST document version tracking across three
independent layers: **Assessment Version** (structural/scoring/performance-level
changes to the instrument itself), **Ed-Fi Data Standard Version** (the target
DS version and migration plan), and **Integration (Bundle) Version** (mapping
logic, descriptor handling, and hierarchy-modeling changes to the integration
itself). Each layer changes independently and must be traceable on its own
(Playbook §13.3).



### 3. Data Mapping

See Requirements - Data Mapping

In addition, the data mapping submission MUST document:

- **AssessmentIdentifier stability policy** — how the provider decides when an
  identifier may be reused across school years/administrations versus when a
  new identifier is required, and confirmation that identifiers do not encode
  administration windows (BOY/MOY/EOY), school year, or other time-based
  information (Playbook §3.3).
- **AssessmentFamily grouping**, where applicable — the criteria used to group
  related assessments in the same product line, with confirmation that each
  member of a family retains its own distinct Namespace and AssessmentIdentifier
  (Playbook §3.4).
- **Subject assignment** — confirmation that each Assessment resolves to exactly
  one AcademicSubject, and, for any cross-subject instrument, that the top-level
  subject is *Composite* with subject-specific results modeled through
  ObjectiveAssessment (Playbook §4.1, §4.2).



### 4. Usage Narrative

**View detail...**

The usage narrative is a short narrative text account of how the data
exchange functionality is made available to product users. This information will
be part of the certification registry entry. This SHOULD be fewer than 1000
words and can be provided in any common text format (MS Word, .txt file, etc.).

The narrative SHOULD also briefly describe how the integration is designed to
handle bursty/peak load conditions typical of assessment cycles (e.g.,
beginning/end-of-year windows, district-wide retesting), and how it distinguishes
initial loads, incremental loads, correction loads, and full reprocessing events
(Playbook §13.1). This is a documentation-level attestation; it does not require
a dedicated peak-load test — see the note under Step 14, Safe Reprocessing
Simulation Test.



### 5. Score Report Template(s)

**View detail...**

One or more score report templates that are currently used by the vendor to
provide student results to end users of the certifying system.

The score report template(s):

- MUST cover all of the elements listed in step 2 above
- MUST be in wide use by the vendor currently — the vendor MAY choose which to
  use if there are different options or variations
- MUST be clearly marked to show elements that are not included in the Ed-Fi
  based API integration (e.g., elements not included in a visual picture could
  be surrounded by a red box and marked "not included")
- Per certification processes generally, these report templates MUST NOT contain
  any real student data
- MUST be provided as PDF files

The score report templates are used to validate that data semantics are
preserved and report elements are mapped to the proper Ed-Fi assessment domain
counterparts.


### 6. Fictitious Test Data for 100 to 500 Students

**View detail...**

Test data is a spreadsheet of the exact sample data that will be used in the
certification process. The spreadsheet:

- MUST include all data fields from the score report template(s) submitted as
  part of item 5, above
- MUST include all data fields from the data mapping submitted as part of item
  3, above
- MUST include records for a minimum of 100 students and a maximum of 500
  students
- MUST be 100% fictitious and MUST NOT be obfuscated data or derived from actual
  school data in any way


### 7. Sample Learning Standards Reference Identifiers

**View detail...**

If the certifying system data mapping includes elements that index assessment
metadata to learning standards, the provider:

- MUST provide a spreadsheet of those learning standards that will be used. The
  spreadsheet MUST include the GUIDs and titles of those standards; no other
  fields are required
- SHOULD only include the learning standards referenced in the sample data; it
  SHOULD NOT be a full catalog of all learning standards from a provider


### 8. Custom Enumerations Used by the Vendor in Integrations

**View detail...**

If present, vendor-specific enumerations MUST be provided in Ed-Fi JSON or XML
format and will be published as part of the certification record. Note that only
certain enumerations are permitted to be vendor-specific: see the certification
overview page.

Once accepted, these vendor-supplied values MUST NOT be renamed, normalized, or
remapped at ingestion (Playbook §7.1) — this documentation establishes the
baseline against which Step 16 (Governance and Namespace Validation Test) later
confirms preservation.

The JSON MUST follow this format, which can be used to import the values into an
Ed-Fi API:

#### Descriptors JSON

```json
{
  "namespace": "[a namespace for your product, generally in URL or URI format]",
  "codeValue": "[your code value]",
  "description": "[description]",
  "shortDescription": "[short description; e.g for inclusion in a dropdown list]"
}
```

#### Types JSON

```json
{
  "codeValue": "[your code value]",
  "description": "[description]",
  "shortDescription": "[short description; e.g for inclusion in a dropdown list]"
}
```


### 9. Descriptor Mapping Configuration Documentation

**View detail...**

*(New in Version 2.0 — Playbook §10.2–§10.6)*

The provider MUST submit documentation of its descriptor mapping infrastructure,
covering the ability to override shared descriptors as well as to review those overrides with their customer:

- **Configurability** — confirmation that descriptor mappings (reporting
  methods, performance levels, assessment periods, result data types) are
  externally configurable per implementation environment, not hard-coded into
  transformation logic (Playbook §10.2, §10.3).
- **Override capability** — how a descriptor override is applied without a code
  change or redeployment, and who is authorized to apply one (Playbook §10.2).
- **Review process or artifact** — confirmation that a process to review configuration with
 a customer exists. Could take the form of an artifact like a mapping table or configuration export showing,
  for each mapped value: the original vendor value, the value submitted to
  Ed-Fi, and any rule that produced a change between the two (Playbook §10.4).

This documentation is the basis for Step 16, Governance and Namespace Validation
Test.

**Note:** if the integration performs no descriptor transformation at all —
vendor-reported values pass through to Ed-Fi unmodified — state this explicitly.
A no-transformation pipeline trivially satisfies the configurability and
override-capability requirements above; there is no mapping logic to
externalize.


### 10. Student Identity Crosswalk and Match Rate Methodology

**View detail...**

*(New in Version 2.0 — Playbook §8.2, §8.4)*

Where the provider's student identifiers do not directly match Ed-Fi
StudentUniqueId, the provider MUST document its identity crosswalk methodology:

- The matching approach used (deterministic matching logic, source identifiers
  considered, and fallback behavior when a match is not found) 
- How unmatched records are staged, surfaced, and made available for correction
  rather than silently dropped (Playbook §8.6)
- How a district user can view and correct an identity mismatch (Playbook §8.7)

This documentation is exercised live in Step 12, Student Identity and Rostering
Test.


## II. Certification Tests

Certification tests test conformance of the product to API specifications and
other normative requirements of the API standard. It also validates the
submitted documentation.

### 11. User Interaction and Availability Test

**View detail...**

The certifying product will show via screen sharing the methods by which
exchanges are triggered (and those MUST follow the requirements under
Certification Requirements for Data Providers and be consistent with the Usage
Narrative submitted in step 4, above).


### 12. Student Identity and Rostering Test

**View detail...**

*(Renamed and substantially extended from v1.0 Step 10 — Playbook Part IV §8)*

**Identifier configuration.** If the product's rostering approach — whether
through a formal, shared rostering specification (e.g., Clever, OneRoster, Ed-Fi
Enrollment API) or a proprietary integration — exposes more than one possible
student identifier, the provider MUST **either**:

(a) Demonstrate that the product allows configuration of which student ID is
used when communicating with the Assessment API implementation. This is
REQUIRED even if the student identifiers are optional in the roster
specification. The student ID configuration is limited to the district/SIS
student ID and the state student ID — other IDs are exempt (e.g., a student
lunchroom code, a student Google ID).

(b) Demonstrate the ability to roster students via the Ed-Fi Enrollment API or
the Ed-Fi Core Student Data API.

The vendor will show via screen sharing or screenshots evidence that this is
configurable. If the product uses multiple roster standards, it is only
required to demonstrate this capability with one standard.

**Unmatched record handling.** Using the intentionally-unresolvable student
record included in the Step 6 sample data:

1. The vendor will attempt to process the full sample set, including the
   unresolvable record.
2. Ed-Fi will confirm the unresolved record is surfaced as a distinct,
   reportable exception — not silently omitted from a "successful" load count.
3. The vendor will show, via screen sharing, the district-facing view of the
   identity mismatch and the correction workflow, and confirm that correction
   does not require vendor intervention.

**Alternative for fully upstream-resolved architectures:** if the product's
design makes it impossible for an unresolved record to ever reach the point of
Ed-Fi submission (e.g., identity is resolved and validated against Ed-Fi
StudentUniqueId before assessment data is generated at all, per Playbook §8.2's
bidirectional rostering pattern), the vendor may instead demonstrate that
upstream resolution gate directly and describe how a resolution failure is
surfaced and corrected there.


### 13. Batch Transmission and Structural Validation Test

**View detail...**

*(Consolidates three tests from an earlier draft of this document — Batch
Transmission, Structural and Hierarchy Validation, and the sequencing portion
of Dependency Order — into one test against one data submission. See the
trailing comment for the full merge history; no criterion from any of the
three was dropped.)*

**Data transmission.** Using the sample data from step 6, the certifying
system will transmit an entire set of assessment metadata and student
assessment results, along with learning standards or learning objective
metadata if those are included.

1. The vendor will transmit the entire set of assessment metadata and student
   assessment results to the sandbox.
2. The submitted score report(s) will be used to check for completeness and
   for valid semantics.
   1. All fields from 1.1 that are map-able to the Ed-Fi model must be
      included.
   2. Field meanings must be accurately represented according to the Ed-Fi
      definitions.
   3. **Full result delivery:** every scale score, performance level,
      percentile/ranking, growth measure, and subscore shown on the vendor's
      score report MUST appear in the submitted data — not a subset chosen by
      perceived importance (Playbook §5.2).
   4. **Grain placement:** overall/composite results MUST appear on
      StudentAssessment; subcomponent results MUST appear in
      StudentObjectiveAssessment; the two MUST NOT be mixed (Playbook §5.1,
      §5.2).
3. Ed-Fi will confirm the data landed and matched expectations from the Sample
   Data Spreadsheet provided by the vendor.

**Structural and hierarchy validation.** Following the live session, Ed-Fi
will conduct a full, detailed analysis of the transmitted data (Playbook Part
III §4–§5, §11.2):

1. Ed-Fi will confirm each Assessment submitted above resolves to exactly one
   AcademicSubject, and that the *Composite* subject is used only where the
   vendor's score report reflects genuinely cross-subject results (Playbook
   §4.1, §4.2).
2. Ed-Fi will confirm the ObjectiveAssessment hierarchy submitted matches the
   vendor's score report structure level-for-level, including recursive,
   multi-level structures where present, with no flattening or collapsing
   (Playbook §5.1, §5.3).
3. Ed-Fi will confirm no "ghost definitions" exist: no ObjectiveAssessment
   without a corresponding StudentObjectiveAssessment result, and no result
   submitted without a corresponding structural definition (Playbook §5.1,
   §11.2).

**Submission sequencing.** Ed-Fi will additionally confirm the vendor's
submission mechanics respect resource dependencies (Playbook §11.2):

1. Ed-Fi will withhold or temporarily remove a required parent resource
   (e.g., an ObjectiveAssessment referenced by a submitted
   StudentObjectiveAssessment) and confirm that the vendor's submission of the
   dependent resource is rejected with a clear referential-integrity error,
   not silently accepted or queued.
2. The vendor will demonstrate that its retry logic, upon encountering this
   rejection, does not skip forward past the failed dependency and does not
   create a duplicate record once the dependency is restored and the retry
   succeeds.

Any deviations identified in any of the three checks above will be
documented. Ed-Fi will notify the vendor of these deviations and request
either updates to or additional clarification of the submitted documentation
and/or resubmission of the affected data.



### 14. Safe Reprocessing Simulation Test

**View detail...**

*(New in Version 2.0, absorbing v1.0 Steps 12 and 13 — Playbook §11.3, §13.1)*

Reprocessing is a routine operational scenario for an assessment integration,
not an edge case. The certifying product must demonstrate safe, deterministic
behavior across four scenarios, using the sample data from Step 6:

1. **Incremental reload.** The vendor will resubmit a subset of previously
   loaded records unchanged. Ed-Fi will confirm no duplicate records are
   created.
2. **Correction reload.** *(absorbs v1.0 Step 13)* A change will be made to a
   set of records on the certifying product side, and the vendor will re-send
   the data to update the corresponding API resources. Ed-Fi will confirm the
   existing record is updated in place — not duplicated — in the sandbox.
   Updates may be demonstrated at the StudentAssessmentItem,
   StudentObjectiveAssessment, or StudentAssessment level.
3. **Full-year reload.** The vendor will resubmit the entire sample data set.
   Ed-Fi will confirm the total record count in the sandbox is unchanged after
   the resubmission — i.e., no duplicates were created for records that were
   not otherwise modified.
4. **Historical backfill.** *(absorbs v1.0 Step 12)* Ed-Fi Alliance will delete
   several student assessment result records at random from the previously
   transmitted results. The certifying product will re-submit the same
   assessment metadata and student assessment results to the sandbox. Ed-Fi
   Alliance will confirm the deleted records have reappeared, and that no
   duplicate resource identities were created for records that were not
   deleted.

Across all four scenarios, Ed-Fi will confirm the product uses stable natural
keys — the same input consistently resolves to the same resource identity — and
that AdministrationDate and SchoolYear are never substituted with a processing
timestamp.



### 15. Error Handling Verification Test

**View detail...**

The provider / API client MUST be able to perform the following actions:

- Capture and log transport errors, including all HTTP errors.
- Re-attempt delivery of API resources updates following failed transmissions.
- In the event that repeated delivery fails for the same resource update,
  surface the error to a system user.
- Apply a controlled backoff strategy for repeated transient failures that
  respects API rate limits and avoids overwhelming the API during an outage
  (Playbook §13.1).

Field work within the Ed-Fi community has revealed that this application
behavior is a necessary condition of system interoperability. Accordingly, the
test scenarios may include situations in which an API resource (or resources)
will be made unavailable to the client, or in which the API reports other errors
due to resource availability (e.g., HTTP 500 error). The client is expected to
be able to successfully handle such situations.

1. Create an error in the Assessment data.
2. Attempt to POST or PUT the updated value to the sandbox.
3. Provide evidence that the error is logged in a tenant-scoped,
   resource-specific, time-stamped format sufficient for a district user to
   diagnose the failure without vendor interpretation — including
   dependency-order failures as a distinct, diagnosable category — and show
   how the error is surfaced to the user.
4. Describe (and, where feasible, demonstrate) the backoff behavior applied
   before the next retry attempt.
5. Correct the error and re-submit.
6. Data submission is confirmed by the Ed-Fi Alliance.

**Parallelization safety.** If the vendor's integration supports parallelized
submission (e.g., across multiple schools, tenants, or resource types), the
vendor will additionally demonstrate that parallel execution respects
dependency order and tenant boundaries (Playbook §13.1); Ed-Fi will confirm no
race-condition duplicate writes occur.



### 16. Descriptor Governance and Namespace Validation Test

**View detail...**

*(New in Version 2.0 — Playbook §7, §10; Step 9 and Step 8 documentation exercised here)*

1. Ed-Fi will review the assessment metadata submitted in Step 13 to confirm
   that vendor-owned descriptors (reporting methods, performance levels,
   categories, periods) are namespaced under the vendor's own namespace, and
   that shared descriptors (AcademicSubject, GradeLevel, Language) remain in the
   default Ed-Fi namespace (Playbook §7.1–§7.3).
2. Ed-Fi will confirm the vendor-native score names and performance level values
   in the submitted data match the score report templates from Step 5 exactly —
   no renaming, normalization, or remapping.
3. The vendor will demonstrate, via screen sharing, that a descriptor override
   can be applied through its Step 9 configuration mechanism without a code
   change or redeployment. If Step 9 documented a no-transformation pipeline,
   the vendor instead confirms no override mechanism is needed and shows that
   submitted values match vendor-reported values exactly.
4. The vendor will show how a reviewer could trace a submitted descriptor value
   back to its original vendor-reported value and any mapping rule applied,
   using the transparency artifact submitted in Step 9.


## III. Certification Completion

Upon completion, the Alliance records the certification in the Registry of
Ed-Fi Certified Products, containing all documentation submitted (items
1.1–1.6). Certifications are valid for one year; see Requirements for
Recertification.


