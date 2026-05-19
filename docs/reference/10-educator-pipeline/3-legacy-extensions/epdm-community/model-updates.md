---
sidebar_position: 3
---

# EPDM-Community Model Updates

:::warning Legacy Content

This changelog covers the **EPDM-Community extension** versions prior to Ed-Fi Data
Standard v6. Starting with **Data Standard v6 (November 2025)**, EPDM is integrated into
the Ed-Fi core standard. For changes in v6, see
[V6 Ed-Fi Data Standard EPDM Related Domains](../../v6-epdm-related-domains.md).

:::

This page documents new features and changes made for each EPDM-Community release
(previously TPDM-Community). It is intended for technical professionals including
business analysts, database administrators, and software developers.

## v1.2 (Latest Extension Release)

### Model Documentation

- [EPDM UML Diagram](https://github.com/Ed-Fi-Exchange-OSS/Ed-Fi-TPDM-Community-Artifacts)
  — UML Entity-Relationship Diagram for EPDM entities.
- [Ed-Fi Data Model with EPDM Data Handbook](https://edfidocs.blob.core.windows.net/$web/handbook/tpdm-community-v1.2/Index.html)
  — Searchable, filterable EPDM-enhanced version of the Ed-Fi Data Handbook.

### Model Improvements & Enhancements

#### Path Domain (DATASTD-2173)

Working with members of the community, the original PlanMilestone design from v1.2-pre.1
was revised to produce the Path domain. The Path domain allows institutions to track
status towards a goal — primarily a candidate receiving a teaching certificate or a
student graduating. With Paths you can:

- Set milestones to be met
- Group milestones into phases
- Build path templates for an entire cohort of students or candidates
- Customize a path to a specific student or candidate
- Track status of student milestones or entire phases
- Transfer statuses of milestones completed in one plan to another plan

#### Evaluation Domain Updates (DATASTD-2139)

- Added optional field `ActualDuration` to `EvaluationRating`
- Added optional field `Comments` to `EvaluationRating`

Previously, `ActualDuration` and `Comments` were on `PerformanceEvaluationRating`,
meaning they acted as rollup values across all `EvaluationRatings`. Adding these fields
to `EvaluationRating` allows both granular collection and rollup to
`PerformanceEvaluationRatings`.

#### Other Additions

- Added a `StudentAssessment` reference to `CertificationExamResult`, enabling
  hierarchical exam scores through the use of assessments.

---

## v1.2-pre.1 (Pre-release)

:::note

This was a pre-release version intended for review and testing only. It should not be
used in a production deployment.

:::

### Model Improvements & Enhancements

#### PlanMilestone (TPDMX-258)

New `PlanMilestone` entity for tracking progress toward a plan — a certification plan for
candidates working toward certification, or students working toward graduation.

---

## v1.1

This version introduced the EPDM-Core / EPDM-Community split:

- **EPDM-Core** — A new extension based on RFC-26 containing the entities required to
  power the Program Diversity and Persistence Starter Kit and the Clinical Experience and
  Performance Starter Kit. Installed by default with ODS/API v5.3.
- **EPDM-Community** — The new name for the existing full EPDM model, made fully
  open-source including the MetaEd model.

### Model Improvements & Enhancements

#### Candidate Updates (TPDMX-189, TPDMX-162, TPDMX-215, TPDMX-210, TPDMX-243, TPDMX-194)

- **CandidateIndicator** — Added `BeginDate` (required) and `EndDate` (optional) to
  support longitudinal indicators. `Period` deprecated.
- **DegreeSpecialization** — Deprecated on `Candidate`; moved to
  `CandidateEducatorPreparationProgramAssociation`.
- **CohortYear** — Deprecated on `Candidate`; moved to
  `CandidateEducatorPreparationProgramAssociation`.
- **Aid** — Deprecated as a common object on Candidate; replaced with a top-level API
  resource `/tpdm/financialAids`.
- **EPPProgramDegree** — Changed to optional.
- **ProgramComplete** — Deprecated; program completion is now determined by
  `ReasonExited` on `CandidateEducatorPreparationProgramAssociation`.
- **TuitionCost** — Replaced currency data types with `decimal(19,4)`.

#### EducatorPreparationProgram Updates (TPDMX-232)

- Deprecated `EducatorPreparationProgramType` (duplicate of the required `ProgramType`
  descriptor already on the entity).

#### CandidateEducatorPreparationProgramAssociation Updates (TPDMX-233, TPDMX-162)

- `CandidateIndicator` — Updated from optional to optional collection.
- `DegreeSpecialization` — Added here (deprecated on `Candidate`); increased length from
  75 to 255 characters.
- `MajorSpecialization` / `MinorSpecialization` — Deprecated shared strings (replaced
  with `DegreeSpecialization` common type).
- `CohortYear` — Added here (deprecated on `Candidate`).
- `ApplicationReference` — Added optional reference.

#### Credential Extension Updates (TPDMX-209, TPDMX-248)

- `Person` reference and `CertificationTitle` made optional.
- Added optional `EducatorRole` descriptor.

#### Performance Evaluation Domain Updates (TPDMX-224, TPDMX-196, TPDMX-206)

- `PerformanceEvaluation` — Added optional `PerformanceEvaluationDescription` (255
  characters).
- `Evaluation` — Added optional `EvaluationDescription` (255 characters).
- `EvaluationObjective` — Added optional `EvaluationObjectiveDescription` (255
  characters).
- `EvaluationElementRating` — Increased `Feedback` field length from 1024 to 2048
  characters.
- `EvaluationRating` — Updated `EvaluationDate` from date to datetime; added optional
  `EvaluationRatingStatus` descriptor.

#### Goals Updates (TPDMX-248)

- Added optional `ParentGoal` reference to `Goal`, enabling hierarchical action steps.

#### New FinancialAid Entity (TPDMX-210)

Created a new top-level API resource for financial aid data, allowing it to be loaded
independently from candidate data. This resolves integration issues when financial aid is
stored outside the SIS.

#### StaffEducationOrganizationEmploymentAssociation Updates (TPDMX-214)

- `SalaryAmount` — Replaced currency data types with `decimal(19,4)`.

### Non-Model Improvements

- XML sample data for v1.1 added to the
  [Ed-Fi-EPDM-Community-Artifacts](https://github.com/Ed-Fi-Exchange-OSS/Ed-Fi-TPDM-Community-Artifacts)
  repository.

---

## v1.0.0

### Model Improvements & Enhancements

#### Education Organization Updates (TPDMX-175)

`University` and `TeacherPreparationProvider` removed; use `PostSecondaryInstitution` and
`School` instead.

- `PostSecondaryInstitution` — Added `FederalLocaleCode` descriptor.
- `School` — Removed `SchoolStatus` descriptor; added `PostSecondaryInstitution`
  reference and `AccreditationStatus`.

#### Survey Domain (TPDMX-178)

Survey extended to use the Person model:

- `SurveyResponse` now has a `Person` reference; `TeacherCandidate` and `Applicant`
  references removed.
- `SurveyResponseTeacherCandidateTargetAssociation` renamed to
  `SurveyResponsePersonTargetAssociation`.
- `SurveySectionResponseTeacherCandidateTargetAssociation` renamed to
  `SurveySectionResponsePersonTargetAssociation`.

#### TeacherPreparationProviderProgram (TPDMX-181)

Renamed to `EducatorPreparationProgram` to be more inclusive. Related sub-elements also
renamed (e.g., `TeacherPreparationProgramType` → `EducatorPreparationProgramType`).

#### Fieldwork Experience (TPDMX-182)

- School reference changed from required collection to single optional reference.
- Added optional `EducatorPreparationProgram` reference.

#### TeacherCandidate (TPDMX-183)

Renamed to `Candidate`. Notable changes:

- Required `Student` reference removed (use `Person` reference instead).
- `TeacherCandidateAcademicRecord` and `TeacherCandidateCourseTranscript` removed; use
  `StudentAcademicRecord` and `CourseTranscript`.
- Candidate characteristics added.

#### Application Pipeline (TPDMX-180)

- `Applicant` renamed to `ApplicantProfile`; `Person` reference removed.
- `Prospect` renamed to `RecruitmentEventAttendance`; `Person` reference removed.
- `RecruitmentEventAttendance` now requires a `RecruitmentEvent`.
- Fields moved from `Application` to `ApplicationProfile`.
- `EmploymentEvent` and `EmploymentSeparationEvent` removed.

#### Staff Extension Updates (TPDMX-179)

Added `StaffEducationOrganizationEmploymentAssociation`.

#### Removed: Anonymized Students (TPDMX-138)

Removed: `AnonymizedStudent`, `AnonymizedStudentAcademicRecord`,
`AnonymizedStudentCourseTranscript`, `AnonymizedStudentAssessment`.

#### Removed: GrowthMeasures (TPDMX-187)

Growth measures removed as unused in EPDM implementations.

### Non-Model Improvements

- XML sample data for v1.0 added to the Ed-Fi-EPDM-Extension repository.

---

## v0.8

### Person Model

A `Person` entity was added to EPDM, introduced alongside Ed-Fi Data Standard v3.2.0-c.
This unified multiple person-roles (student, staff, teacher candidate, applicant) under a
common identifier, enabling institutions with person ID systems to link roles.

### New Performance Evaluation Domain

The existing Performance Measures and Staff Evaluation domains were combined into a
single `PerformanceEvaluation` domain. A new `Goal` entity replaced `TalentManagementGoal`.
Performance Evaluation uses `Person` references rather than role-specific references.

:::note

Use of the Performance Evaluation domain requires implementation of the Person model.

:::

### Updated Credentials and Certification Domains

- Added ability to track the lifecycle of a credential.
- Added `CertificationLicense` entity for pre-built credential catalogs.
- Credentials now reference the `Person` model.

:::note

Use of Credentials and Certification requires implementation of the Person model.

:::

### Removal of Survey Domain

With RFC 25 approval, the Survey domain moved into the Ed-Fi Data Standard core and was
removed from EPDM. Teacher Candidates and Applicants can still take or be targeted by
surveys via the core Survey domain.

### Alignment to Ed-Fi Core

- `FieldworkExperience` reworked to use the `Student` role.
- Facts-style tables removed (`EducationOrganizationFacts`,
  `EducationOrganizationStudentFacts`).
- `GradebookEntry` extension functionality moved into core.
- Absence event entities removed as unused.
- Community/network education organization extension entities removed as unused.

### Recruitment and Staffing

Fields moved from `Applicant` to `Application`; Education Organization requirement on
`Applicant` removed to support multiple applications.

### Non-Model Improvements

- New GitHub repository
  [Ed-Fi-TPDM-Extension](https://github.com/Ed-Fi-Exchange-OSS/Ed-Fi-TPDM-Community-Artifacts)
  created to hold XML sample data, XML descriptor values, and UML diagrams.
- "Real world" sample data added representing actual Teacher Preparation Provider usage.
- Descriptor files split per descriptor type for easier reference.
- Descriptor spreadsheet created listing all values with Code, Short Description,
  Description, and Namespace.

---

## v0.7

### Highlights

- **Online TPDM sandbox** available at `https://api.ed-fi.org/v0.7.0-tpdm/docs/`.
- **Decoupled versioning** — TPDM version number decoupled from ODS/API product version.
- **Ed-Fi + TPDM Data Handbook** introduced.
- **Upgraded ODS/API base** to v3.2; TPDM updated to MetaEd v2.0-compliant.
- **Simplified installation** via source branches with TPDM pre-integrated; standardized
  descriptor namespace to `tpdm.ed-fi.org`.

### Survey Domain Enhancements

Added Teacher Candidates, Staff, and Educational Organizations as survey targets.
Key tickets: TPDMX-25, TPDMX-45, TPDMX-54, TPDMX-67, TPDMX-78, TPDMX-79, TPDMX-80,
TPDMX-95, TPDMX-96, TPDMX-97, TPDMX-100.

### Talent Management Enhancements

TPDMX-10, TPDMX-34, TPDMX-40, TPDMX-68, TPDMX-85.

---

## v3.0.6

Refinement release adding new entities/elements and correcting field-work issues:

- TPDMX-75 — Allow multiple GPAs on `TeacherCandidateAcademicRecord`
- TPDMX-88 — Change `TeacherCandidateFieldworkExperience` school reference to collection
- TPDMX-94 — Add optional School reference to `TeacherPreparationProvider` and
  `University`

---

## August 5, 2019 (v3.0.5)

- TPDMX-64 — Add Survey Teacher Candidate Association
- TPDMX-65 — Add Survey Staff Association

---

## May 15, 2019 (v3.0.4)

Changes to Survey/SurveyResponse entities and addition of TNTP domains to Recruitment
and Staffing interchange schema. Key tickets: TPDMX-35, TPDMX-36, TPDMX-37, TPDMX-38,
TPDMX-53.

---

## March 19, 2019 (v3.0.3)

- TPDMX-41 — Add `SurveyLevel` to `Survey`
- TPDMX-42 — Add enumerations to Application Status descriptor
- TPDMX-44 — Extend field lengths in several areas
- TPDMX-46 — Add Staff Evaluation domains to `StaffSectionAssociation` interchange
- TPDMX-47 — Change Elements in `ProgramDegree` to Unbounded

---

## February 5, 2019 (v3.0.2)

Initial tracked release. Key additions:

- TPDMX-32 — Change `PerformanceMeasure.RubricReference` to unbounded
- TPDMX-1 — Add Major and Minor to Teacher Candidate
- TPDMX-5 — Add Application Event
- TPDMX-8 — Change GPA to Collection
- TPDMX-16 — Add `CertificationExamDate` and `CertificationExamPassFail`

Full ticket list: TPDMX-1 through TPDMX-19.
