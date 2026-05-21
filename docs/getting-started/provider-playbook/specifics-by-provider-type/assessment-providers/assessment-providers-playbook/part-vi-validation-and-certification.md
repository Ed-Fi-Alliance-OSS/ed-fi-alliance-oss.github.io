---
title: "Part VI: Validation and Certification"
sidebar_position: 7
---


Testing is the enforcement layer of the playbook. An integration can produce technically valid Ed-Fi payloads and still fail the definition of a native integration if the data are ambiguous, incomplete for local use, or unstable under reprocessing.

The purpose of this validation framework is not to restate modeling rules, but to enforce them. Each validation category confirms that the requirements defined in Parts III–V are implemented correctly and consistently.

validations ensure that the requirement is met before an integration is considered production-ready.

## 14. Validation Framework

Validation requirements are grouped into categories that reflect the core failure modes seen in assessment integrations. Each category defines what must be validated, what common failures look like, and what constitutes a passing result.

### 14.1 Structural Validation

Hierarchy, and Results Placement).

without inference.

Structural validation must verify:

- Hierarchy integrity

  -

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

-

- Multi-subject assessments requiring inference

- Composite results modeled at the wrong level

#### Passing Result (Cross-category integrity)

The hierarchy is complete, faithful to the vendor score report, and directly interpretable without vendorspecific logic.

### 14.2 Referential Integrity

Dependency Order).

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

-

-

#### Common Failure Patterns

- Results submitted before the structure exists

- Broken references to missing objectives

-

- Structure loaded separately from results

#### Passing Result (Detection and semantic integrity)

breaks in the chain.

### 14.3 Descriptor Validation

10 (Descriptor Mapping Infrastructure).

It ensures that meaning is preserved and governed.

Validation must verify:

- Namespace alignment

  - Vendor descriptors remain in vendor namespace

  - Shared descriptors use Ed-Fi namespace

  - Namespace usage is consistent across environments

- Vendor semantics preserved

  - Performance levels are not remapped at ingestion

  -

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

#### Passing Result (Detection and semantic integrity)

Descriptors retain their intended meaning, are consistently applied, and remain governable over time.

### 14.4 Event Completeness

Integrity).

It ensures that every StudentAssessment represents a complete, interpretable event.

Validation must verify:

-

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

-

- Missing grade context

#### Passing Result

longitudinally without guesswork.

### 14.5 Student Identity Validation

Rostering).

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

-

#### Passing Result

All student results resolve to valid Ed-Fi student records, with unmatched cases clearly surfaced and actionable.

### 14.6 Safe Reprocessing Simulation

Duplicate Prevention).

Validation must verify:

- Stable natural keys across all resources

- Deterministic behavior across runs

- No duplicate creation during reruns

- Correct handling of updates vs new events

Required simulation scenarios:

- Repeat-run simulation

- Correction simulation

- Full-year reload simulation

-

#### Common Failure Patterns

- Duplicate StudentAssessment creation

- Missing AdministrationDate causing collisions

- Keys dependent on runtime behavior

- Incorrect update vs insert behavior

#### Passing Result

Reprocessing is safe, deterministic, and does not corrupt data or create duplicates.

### 14.7 Dependency Order Validation

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

The integration enforces sequencing, handles failures predictably, and produces complete datasets. 14.8 Prohibited Pattern Detection

- Multi-subject top-level assessments

- Composite results stored as objectives

-

-

- Pull-only architectures without a load path

- Pseudo-scores used for flags

- Collapsed hierarchy where structure exists

#### Detection Methods

Automated checks may include:

- Missing SchoolYear or AdministrationDate

-

- Score placement inconsistencies

- Descriptor misuse patterns

Manual review must validate:

- Structural correctness

- Semantic integrity

- Alignment with vendor score reports

#### Passing Result (Detection and semantic integrity)

No prohibited patterns are present, and the integration does not rely on downstream reconstruction of meaning.

## 15. Certifiication Checklist

Design Principles across modeling, architecture, runtime behavior, and governance. Certification requires that integration behavior is transparent and explainable without reliance on transformation code inspection.

correctly under real-world conditions.

the requirements defined in Parts III–VI have been implemented and validated.

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

-

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

-

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

-

- AssessmentFamily grouping is correctly implemented

- Version tracking is documented across:

  - Assessment

  - Ed-Fi Data Standard

  - Integration

- Descriptor mappings are:

  -

  - Not hard-coded in transformation logic

  - Transparent and documented

  - Traceable over time

-

- Integration behavior (identity resolution, descriptor mapping, event modeling) is explainable without inspecting transformation code
