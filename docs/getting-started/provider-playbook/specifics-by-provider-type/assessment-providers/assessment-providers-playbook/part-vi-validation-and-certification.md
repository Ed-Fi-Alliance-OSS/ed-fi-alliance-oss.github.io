---
title: "Part VI: Validation and Certification"
sidebar_position: 6
---


Testing is the enforcement layer of the playbook. An integration can produce technically valid Ed-Fi API payloads and still fail the definition of a native integration if the data are ambiguous, incomplete for local use, or unstable under reprocessing.

The purpose of this validation framework is not to restate modeling rules, but to enforce them. Each validation category confirms that the requirements defined in Parts III–V are implemented correctly and consistently.

A native integration must be analytically usable without vendor-specific downstream logic. These validations ensure that the requirement is met before an integration is considered production-ready.

## 14. Validation Framework

Validation requirements are grouped into categories that reflect the core failure modes seen in assessment integrations. Each category defines what must be validated, what common failures look like, and what constitutes a passing result.

### 14.1 Structural Validation

Structural validation enforces the requirements defined in Part III (Assessment Definition and Identity, Hierarchy, and Results Placement).

It confirms that the dataset reflects the true structure of the assessment and can be interpreted without inference.

Structural validation must verify:

- Hierarchy integrity

  - Assessment exists at the level where overall results are defined

  - ObjectiveAssessment exists when subscores are present

  - ObjectiveAssessment is recursive when the vendor structure is multi-level

  - StudentAssessment and StudentObjectiveAssessment mirror that structure

- Subject resolution

  - Each Assessment resolves to a single AcademicSubject

  - Composite is used only when representing cross-subject outcomes

  - Subject meaning is not derived from score names

- Result grain alignment

  - Overall results are stored at StudentAssessment

  - Subcomponent results are stored in StudentObjectiveAssessment

  - No mixing of grains across levels

#### Common Failure Patterns

- Flat modeling with all scores at StudentAssessment

- Objectives defined, but no student objective results provided

- Multi-subject assessments requiring inference

- Composite results modeled at the wrong level

#### Passing Result (Prohibited Pattern Detection)

The hierarchy is complete, faithful to the vendor score report, and directly interpretable without vendorspecific logic.

### 14.2 Referential Integrity

Referential integrity enforces the dependency chain defined in Part III and Part V (API Interaction and Dependency Order).

It ensures that all relationships between entities are complete and navigable.

#### Validation must verify

- Complete dependency chain:

  - Assessment → ObjectiveAssessment → StudentAssessment

- All references resolve:

  - StudentAssessment references a valid Assessment

  - StudentObjectiveAssessment aligns to a valid ObjectiveAssessment

- No orphaned records:

  - No StudentObjectiveAssessment without a matching structure

  - No hierarchy elements missing parents

- No "ghost definitions":

  - No structure defined without corresponding results when expected

#### Common Failure Patterns

- Results submitted before the structure exists

- Broken references to missing objectives

- Inconsistent identifiers across runs

- Structure loaded separately from results

#### Passing Result

All data is fully connected and navigable from assessment definition to student outcomes with no breaks in the chain.

### 14.3 Descriptor Validation

Descriptor validation enforces the requirements defined in Part II (Descriptor Governance) and Section 10 (Descriptor Mapping Infrastructure).

It ensures that meaning is preserved and governed.

Validation must verify:

- Namespace alignment

  - Vendor descriptors remain in vendor namespace

  - Shared descriptors use the ed-fi.org namespace

  - Namespace usage is consistent across environments

- Vendor semantics preserved

  - Performance levels are not remapped at ingestion

  - Descriptor meaning matches vendor definitions

- No reuse errors

  - Score descriptors used only for quantitative results

  - Performance descriptors used only for categorical interpretation

- No semantic flattening

  - Distinct values are not collapsed

  - Differences remain auditable

#### Common Failure Patterns

- Mixing score and performance descriptors

- Overwriting vendor semantics

- Reusing descriptors across categories

- Flattening multiple values into one

#### Passing Result

Descriptors retain their intended meaning, are consistently applied, and remain governable over time.

### 14.4 Event Completeness

Event completeness enforces the requirements defined in Section 6 (Event Identity and Longitudinal Integrity).

It ensures that every StudentAssessment represents a complete, interpretable event.

Validation must verify:

- Required fields:

  - SchoolYear

  - AdministrationDate

  - AssessmentPeriod (when applicable)

  - WhenAssessedGradeLevel

  - RetestIndicator (when applicable)

- Attempt distinguishability:

  - Multiple attempts do not collide

  - AdministrationDate differentiates events

- Enrollment alignment:

  - Results can be aligned to enrollment context

  - Off-cycle testing is handled correctly

- Longitudinal stability:

  - SchoolYear is consistent

  - Multi-year comparisons are valid

#### Common Failure Patterns

- Missing AdministrationDate

- Missing SchoolYear

- Period embedded in identifiers

- Missing grade context

#### Passing Result

Every StudentAssessment represents a clearly defined event that can be interpreted and used longitudinally without guesswork.

### 14.5 Student Identity Validation

Student identity validation enforces the requirements defined in Part IV (Student Identity and Rostering).

It ensures that results resolve to the correct student records.

Validation must verify:

- Match rates are measured and reported

- Unmatched records are surfaced and not silently dropped

- Identity resolution occurs before data load

- Referential integrity is maintained for all student records

#### Common Failure Patterns

- Unmatched records dropped silently

- Identity resolution deferred until after load

- Low match rates without visibility

- Inconsistent identifier usage

#### Passing Result

All student results resolve to valid Ed-Fi ODS/API student records, with unmatched cases clearly surfaced and actionable.

### 14.6 Safe Reprocessing Simulation

Safe reprocessing validation enforces the requirements defined in Section 11 (Safe Reprocessing and Duplicate Prevention).

It confirms that the integration behaves deterministically under repeated execution.

Validation must verify:

- Stable natural keys across all resources

- Deterministic behavior across runs

- No duplicate creation during reruns

- Correct handling of updates vs new events

Required simulation scenarios:

- Repeat-run simulation

- Correction simulation

- Full-year reload simulation

- Backfill simulation

#### Common Failure Patterns

- Duplicate StudentAssessment creation

- Missing AdministrationDate causing collisions

- Keys dependent on runtime behavior

- Incorrect update vs insert behavior

#### Passing Result

Reprocessing is safe, deterministic, and does not corrupt data or create duplicates.

### 14.7 Dependency Order Validation

Dependency validation enforces the requirements defined in Section 11.2 (Dependency Order).

It ensures that sequencing and recovery behavior are correct.

Validation must verify:

- Correct load order:

  - Assessment

  - ObjectiveAssessment

  - StudentAssessment

- Runtime behavior:

  - API rejects out-of-order submissions

  - Errors are clearly logged

- Retry and recovery:

  - Dependencies retried correctly

  - No skipping forward

  - No duplicate creation

- Completeness:

  - No partial loads treated as success

#### Common Failure Patterns

- Loading results before metadata

- Silent failures in dependency chains

- Retry loops creating duplicates

- Partial loads considered complete

#### Passing Result

The integration enforces sequencing, handles failures predictably, and produces complete datasets.

### 14.8 Prohibited Pattern Detection

This validation enforces all prohibited patterns defined across Parts III–V. Rather than restating them, this section defines how they are detected.

Validation must confirm the absence of:

- Multi-subject top-level assessments

- Composite results stored as objectives

- Time elements embedded in identifiers

- Missing event identity fields

- Pull-only architectures without a load path

- Pseudo-scores used for flags

- Collapsed hierarchy where structure exists

#### Detection Methods

Automated checks may include:

- Missing SchoolYear or AdministrationDate

- Identifier pattern detection (BOY/MOY/EOY)

- Score placement inconsistencies

- Descriptor misuse patterns

Manual review must validate:

- Structural correctness

- Semantic integrity

- Alignment with vendor score reports

#### Passing Result (14.8 Prohibited Pattern Detection)

No prohibited patterns are present, and the integration does not rely on downstream reconstruction of meaning.

## 15. Certification Checklist

Certification is the formal confirmation that an integration meets the Native Integration Foundational Design Principles across modeling, architecture, runtime behavior, and governance. Certification requires that integration behavior is transparent and explainable without reliance on transformation code inspection.

Certification is not a single test. It is a lifecycle validation that confirms the integration behaves correctly under real-world conditions.

This checklist is a verification instrument. No requirements are introduced here. Each item confirms that the requirements defined in Parts III–VI have been implemented and validated.

An integration must pass all applicable checks to be considered native, production-ready, and certifiable.

### 15.1 Structural Integrity

(Validates: Part III, Section 5, Section 10, Validation 14.1 & 14.3)

- Overall assessment-level results are stored at StudentAssessment

- Objective-level results (strands, domains, skills) are stored at StudentObjectiveAssessment

- Subscores are not stored at StudentAssessment

- Exactly one AcademicSubject exists at the Assessment level

- Hierarchy structure matches the vendor score report

- ObjectiveAssessment recursion is implemented where required

- Descriptor categories are not structurally misused

- Vendor-native score names are preserved

- Vendor-native performance level values are preserved at ingestion

- Composite subject is used correctly when representing cross-subject outcomes

- No multi-subject top-level assessments exist

### 15.2 Student Identity and Rostering

(Validates: Part IV, Validation 14.5)

- Student identifier source is explicitly configured and documented

- Identity mapping or crosswalk process is implemented

- Match rates are measured and reported

- All StudentAssessment records resolve to a valid StudentUniqueId prior to load

- Unmatched student records are surfaced and reported

- Unmatched records are not silently dropped

- District users can view identity mismatches

- District users can correct identity mismatches without vendor intervention

### 15.3 Event Completeness

(Validates: Section 6, Validation 14.4)

- SchoolYear is populated

- AdministrationDate is populated

- AssessmentPeriod is populated when applicable

- WhenAssessedGradeLevel is populated

- RetestIndicator logic is implemented and tested

- Event identity supports multiple attempts without collision

### 15.4 Safe Reprocessing

(Validates: Section 11.3, Validation 14.6)

Safe reprocessing must be tested across all required scenarios:

- Incremental reload

- Vendor correction reload

- Full-year reload

- Historical backfill

And must confirm:

- Duplicate prevention is enforced

- Stable natural keys are implemented

- Reloads do not generate duplicate StudentAssessment records

- Corrections update existing records rather than creating new ones

### 15.5 Scalability and Runtime

(Validates: Section 13.1 & 13.2, Validation 14.7)

- Batch scalability is validated under peak load conditions

- Retry logic is implemented and tested

- Backoff strategy is implemented and respected

- Parallelization is tested and safe across tenants

- Failure scenarios are tested

- Failures are logged clearly and are diagnosable

### 15.6 Governance and Namespace

(Validates: Sections 3, 10, 13.3, Validation 14.3 & 14.8)

- Vendor namespace usage is correctly implemented

- Default descriptor usage is validated

- Descriptor governance rules are followed

- AssessmentIdentifier stability is confirmed

- AssessmentFamily grouping is correctly implemented

- Version tracking is documented across:

  - Assessment

  - Ed-Fi Data Standard

  - Integration

- Descriptor mappings are:

  - Configurable per environment

  - Not hard-coded in transformation logic

  - Transparent and documented

  - Traceable over time

- Descriptor override capability exists and is externally configurable

- Integration behavior (identity resolution, descriptor mapping, event modeling) is explainable without inspecting transformation code
