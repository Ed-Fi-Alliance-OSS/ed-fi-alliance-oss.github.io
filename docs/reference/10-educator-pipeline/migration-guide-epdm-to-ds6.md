---
sidebar_position: 3
---

# Migration Guide: EPDM to DS 6.0

This guide provides a structured transition for existing Educator Preparation Data Model
(EPDM) users moving to the integrated Ed-Fi Data Standard v6 (DS 6.0). Starting with
this version, EPDM is no longer a separate extension but is fully incorporated into the
core standard.

## Phase 1: Strategic Alignment & Roadmap

Before technical migration, align your team with the new unified structure.

- **Adopt the New Nomenclature**: Transition from "Teacher Preparation Data Model
  (TPDM)" to "Educator Preparation Data Model (EPDM)".
- **Understand Core Integration**: Recognize that EPDM Community entities are now part
  of the core standard, promoting consistency across implementations.
- **Identify Your Pathway**:
  - _Programmatic Users_: Focus on the
    [Educator Pipeline Use Cases](/getting-started/educator-pipeline/use-cases/) (e.g.,
    Workforce, Clinical Experience) for high-level outcomes and dashboards.
  - _Technical Users_: Use the
    [Technical Reference](/reference/educator-pipeline/) section for deep-dives into the
    unified Data Standard v6 domains.

## Phase 2: Technical Schema Updates

Existing implementations must update their data mappings to align with the new core
namespace and consolidated entities.

### 1. Update Namespaces and Descriptors

- **Namespace URI Change**: Update the canonical descriptor set by removing "tpdm" from
  the URI values.
  - Example: `uri://tpdm.ed-fi.org/CertificationRouteDescriptor` becomes
    `uri://ed-fi.org/CertificationRouteDescriptor`
- **Descriptor Removal**: Delete the `ProgramGateway` descriptor, as it has been removed
  to streamline the model.

### 2. Entity Renaming and Property Updates

- **Gender Identity**: Replace `GenderDescriptor` with `GenderIdentity` (this is a
  string) across entities like `ApplicantProfile`, `Staff`, `Candidate`, and
  `RecruitmentEventAttendance`.
- **Rating Property**: Rename the `rating` property to `numericRating` within the
  `results` array on `PerformanceEvaluationRatings` (formerly `EvaluationRatings`).

### 3. Remove Deprecated Properties

Ensure your data scripts exclude properties removed in v6 to maintain standard compliance. Use the following table to understand how to handle data previously stored in deprecated fields.

| Deprecated Property | Migration Strategy / Mapping in DS 6.0+ |
| --------- | ----------------------------------------- |
| `Candidate.OldEthnicityDescriptor` | Use `Candidate.Race` |
| `Candidate.ProgramComplete` | Map to Path Domain: Use the `Path` domain entities, which are designed to track progress toward a specific educational goal or licensure status. |
| `Candidate.DegreeSpecialization` | Use `CandidateEducatorPreparationProgramAssociation.DegreeSpecialization` |
| `CandidateEducatorPreparationProgramAssociation .MajorSpecialization` & `MinorSpecialization` | Use `CandidateEducatorPreparationProgramAssociation.DegreeSpecialization` |
| `Candidate.CohortYear` | Map to Student Associations: Utilize the `StudentCohortAssociation` or specific program identifiers to track groups of candidates entering at the same time. |
| `Candidate.Aid` | Use `FinancialAid` Domain: This property is replaced by the new, dedicated FinancialAid entity within the Enrollment Domain. |
| `Candidate.ApplicationReference` | Use Recruiting & Staffing Domain: Reference the new Recruiting and Staffing domain, which provides a comprehensive model for applications and recruitment events. |
| `EducatorPreparationProgram.EducatorPreparationProgramType` | Consolidate Descriptors: This is now handled through refined Program and Organization descriptors within the EPP Domain |
| `CandidateIndicator.Period` | Use `CandidateIndicator.BeginDate` & `CandidateIndicator.EndDate` |

## Phase 3: Domain Implementation

Implement the new specific domains created to host former community extension content.

- **Credential Domain**: Define educator credentials, including type, field, and status.
- **Educator Preparation Program Domain**: Manage program details, accreditation, and
  candidate identifiers.
- **Path Domain**: Track student progress toward goals like certification or licensure.
- **PerformanceEvaluation Domain**: Utilize the four-level hierarchy
  (PerformanceEvaluation, Evaluation, Objective, and Element) for ratings.
- **FinancialAid Domain**: Note the addition of this entity within the Enrollment Domain.

See [V6 Ed-Fi Data Standard EPDM Related Domains](./v6-epdm-related-domains.md) for
detailed domain descriptions.

## Phase 4: Validation & Use Case Deployment

Finalize the transition by validating your reporting tools and links.

- **Verify Dashboards**: Ensure your dashboards are mapping to the new v6 core entities.
- **Prominent Positioning**: Display dashboard information front and center on use case
  pages to assist programmatic users.
- **Standardize Phrasing**: Include a consistent note on every reference to legacy EPDM
  content stating that updated versions are now available in Version 6 of the Data
  Standard.
