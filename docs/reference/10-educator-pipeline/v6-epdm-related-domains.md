---
sidebar_position: 2
---

# Ed-Fi Data Standard v6.0 EPDM Related Domains

The Educator Preparation Data Model represents a state approved path or course of study,
culminating in a candidate completing all requirements necessary to obtain a certification
or licensure to teach within K-12 schools. Individuals under this domain may often be
represented in dual roles as students in one context of their continuing education, while
also being staff at the same time as part of their required training.

This domain has largely been held as a community extension until now. Entities and
descriptors from the Educator Preparation Data Model (Community Edition) have been moved
into the Ed-Fi Core data standard in order to promote consistency and broader
applicability.

## New Domains Created

- **Credential Domain** - defines educator credentials, detailing their type, field,
  status, and associated personal and academic records.
- **Educator Preparation Program Domain** - is for the details of the program and
  accreditation. A Candidate under this domain contains the identifiers, educational
  background, fieldwork experience and other information as it relates to their
  participation in the program or course of study.
- **Path Domain** - consists of information needed for tracking a student's progress in
  achieving an educational goal such as certification or licensure.
- **PerformanceEvaluation Domain** - defines the model for performance measurement with
  four hierarchical levels of defining performance measures and capturing metadata and
  ratings of persons for each level. These four levels are Evaluation,
  EvaluationObjective, EvaluationElement and PerformanceEvaluation.
- **Recruiting and Staffing Domain** - defines the model for application and recruitment
  pursuers, events, and the opportunity they pursue.

More detailed information regarding each domain, their descriptors and related entities
can be found in the updated
[model references pages](https://docs.ed-fi.org/reference/data-exchange/data-standard/).

## Addition of FinancialAid Domain Entity to Enrollment

In addition to the new domains for the Educator Preparation Data Model, one new entity
has been added to the existing Enrollment Domain. As part of the 6.0 release, users will
find a domain entity for Financial Aid included, which uses Student as part of its
identity keys.

## Minor Changes in the Educator Preparation Domain

### Renamed `Results` Property in Performance Evaluation Domain

Each primary rating entity in the Performance Evaluation domain (`PerformanceEvaluationRating`, `EvaluationRating`, `EvaluationObjectiveRating`, and `EvaluationElementRating`) has a results array. In the EPDM extension, the numerical rating property was called `results`; this has been updated to `numericalResults` in the data standard. This can be seen in the following JSON snippet:

Before:

```json
"results": [{ "rating": 999.999, "ratingResultTitle": "string", "resultDatatypeTypeDescriptor": "string" }]
```

After:

```json
"results": [{ "numericRating": 999.999, "ratingResultTitle": "string", "resultDatatypeTypeDescriptor": "string" }]
```

### Replaced GenderDescriptor with GenderIdentity

Changes were made to the following entities: `ApplicantProfile`, `Staff`, `Candidate`,
`RecruitmentEventAttendance`.

### Updated the Ed-Fi descriptor namespace from "tpdm" to "ed-fi"

Previously, the canonical Ed-Fi descriptor set for EPDM included "tpdm" in their
namespace URI values. This is no longer necessary.

For example:

```text
uri://tpdm.ed-fi.org/CertificationRouteDescriptor
```

becomes:

```text
uri://ed-fi.org/CertificationRouteDescriptor
```

### Removed Previously Marked Deprecated Properties

- `CandidateEducatorPreparationProgramAssociation.MajorSpecialization`
- `CandidateEducatorPreparationProgramAssociation.MinorSpecialization`
- `CandidateIndicator.Period`
- `Candidate.OldEthnicityDescriptor`
- `Candidate.CohortYear`
- `Candidate.Aid`
- `Candidate.ProgramComplete`
- `Candidate.DegreeSpecialization`
- `Candidate.ApplicationReference`
- `EducatorPreparationProgram.EducatorPreparationProgramType`

### Removed ProgramGateway Descriptor

The `ProgramGateway` descriptor was identified as unused in EPDM implementations and
therefore did not need to remain part of the standard. Since it was never adopted, it
has been removed in the 6.0 release to streamline the model.

## Reference

For full details on what's new in v6, see
[What's New in Data Standard v6.0](/reference/data-exchange/data-standard/whats-new/whats-new-v60).
