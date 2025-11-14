# What's New - v6.0

Release Date: Nov. 14, 2025.

## Overview

Data Standard v6.0 delivers significant structural and semantic enhancements aimed at improving data clarity, interoperability, and simplifying data updates.  This release introduces breaking changes and is targeted for deployment beginning in the 2026–27 school year.

The changes introduced in Data Standard v6.0 respond to community needs and deliver the following benefits:

* Streamlined demographic and directory data management.  Demographic and directory information (e.g., address, email, telephone) is now stored in dedicated entities, reducing the complexity for data updates in the StudentEducationOrganizationAssociation (SEOA).
* Improved handling of multiple identifiers for student, staff, educationorganization, contact and candidate.
* Enhanced assessment model for dashboards, with adjustments to support data collection and logic.  These changes originated from initiatives in South Carolina, integrating over thirty assessments, and offer broad benefits to other states.
* Expanded core coverage for Educator Preparator use cases and entity updates.
* Improved handling of Special Education Program events.

Following reviews by state agencies, SIS and assessment vendors, and feedback from [RFC 27 - Ed-Fi Data Standard 6.0](https://edfi.atlassian.net/wiki/x/EgC5P), the following updates were implemented:

* The StudentEducationOrganizationAssociation (SEOA) was significantly reduced by the number of attributes, with demographic and directory attributes migrated to new entities.

* The following new entities were created to host the demographic and contact information:
* StaffDemographic
* StaffDirectory
* StudentDemographic
* StudentDirectory

* New optional entities were created to handle multiple identification codes:
* CandidateIdentificationCode
* ContactIdentificationCode
* EducationOrganizationIdentificationCode
* StaffIdentificationCode
* StudentIdentificationCode
* Consequently, the StudentIdentificationCode (_optional_ common) was removed from the SEOA and became its own entity.

* The Assessment, ObjectiveAssessment and StudentAssessment entities were updated (no key structural changes were introduced).

* Five new domains were created to host the EPDM (Community version) entities and descriptors.  Existing Staff and Enrollment domains were enhanced to incorporate EPDM-related entities. In addition, EPDM properties previously marked as deprecated were removed.  See details below.

* Two IEP date fields from the StudentSpecialEducationProgramAssociation were renamed, and two optional attributes were added to improve flexibility.

:::info

Additional details related to the changes for identification and demographics can be found in [Ed-Fi RFC 27b](https://edfi.atlassian.net/wiki/spaces/rc/pages/998375429/Ed-Fi+RFC+27+b+-+Streamlining+Access+to+Identification+Codes+Contact+Information+and+Demographics).

Attributes decoupled from SEOA were _removed from the SEOA_, rather than deprecated, and _migrated to the new demographic and directory entities_. This approach was reviewed in multiple governance meetings hosted by the Ed-Fi Alliance and endorsed to promote consistency in data standard versioning and to reduce data redundancy.
:::

*

## Major Changes

### Breakout of StudentEducationOrganizationAssociation (SEOA) and Staff entities

Based on community feedback the StudentEducationOrganizationAssociation and Staff entities were simplified. Pain points brought by the community were the complexity in updating the StudentEducationOrganizationAssociation, and difficulty in searching the IdentificationCode commons. By breaking the StudentEducationOrganizationAssociation into smaller more manageable components, vendors and admins will be better able to query records more specifically, and updates can be made in a targeted way that do not overwrite whole records.

**In specific, this release makes a breaking change from DS 5.2 to DS 6.0 by _deleting_ the following fields from the SEOA and _migrating_ them to the corresponding new entities as outlined below:**

#### Fields to New StudentIdentification Code Entity

* StudentIdentificationCode

#### Fields to New StudentDemographic Entity

* AncestryEthnicOrigin
* Disability
* GenderIdentity
* HispanicLatinoEthnicity (deprecated, field to be removed in 2029)
* Language
* LimitedEnglishProficiency
* Race
* Sex
* StudentCharacteristic
* SupporterMilitaryConnection
* TribalAffiliation

#### Fields to New StudentDirectory Entity

* Address
* ElectronicMail
* InternationalAddress
* Telephone

### New Staff Related Entities

* StaffDirectory
* StaffIdentificationCode
* StaffDemographic

### Simplified SEOA in Data Standard 6.0

The streamlined StudentEducationOrganizationAssociation has these components:

| **Property**                                      | **Type**              | **Cardinality**        | **Definition**                                                                                                                                                                                                 |
|----------------------------------------------------|------------------------|-------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Student**                                       | Domain Entity          | Required               | A reference to the student.                                                                                                                                                                                 |
| **EducationOrganization**                         | Domain Entity          | Required               | A reference to the education organization representing the context of the student information.                                                                                                               |
| **ProfileThumbnail**                               | Shared String          | Optional               | Locator reference for the student photo. The specification for that reference is left to local definition.                                                                                                   |
| **CohortYear**                                     | Common                 | Optional collection    | The type and year of a cohort (e.g., 9th grade) the student belongs to as determined by the year that student entered a specific grade.                                                                     |
| **StudentIndicator**                                | Common                 | Optional collection    | An indicator or metric computed for the student (e.g., at risk).                                                                                                                                             |
| **IdentificationCode** named **LoginId**           | Shared String          | Optional               | The login ID for the user; used for security access control interface.                                                                                                                                       |
| **PrimaryLearningDeviceAwayFromSchool**            | Descriptor             | Optional               | The type of device the student uses most often to complete learning activities away from school.                                                                                                             |
| **PrimaryLearningDeviceAccess**                    | Descriptor             | Optional               | An indication of whether the primary learning device is shared or not shared with another individual.                                                                                                        |
| **PrimaryLearningDeviceProvider**                  | Descriptor             | Optional               | The provider of the primary learning device.                                                                                                                                                                 |
| **InternetAccessInResidence**                      | Boolean                | Optional               | An indication of whether the student is able to access the internet in their primary place of residence.                                                                                                     |
| **BarrierToInternetAccessInResidence**             | Descriptor             | Optional               | An indication of the barrier to having internet access in the student’s primary place of residence.                                                                                                          |
| **InternetAccessTypeInResidence**                  | Descriptor             | Optional               | The primary type of internet service used in the student’s primary place of residence.                                                                                                                       |
| **InternetPerformanceInResidence**                 | Descriptor             | Optional               | An indication of whether the student can complete the full range of learning activities, including video streaming and assignment upload, without interruptions caused by poor internet performance.         |
| **DisplacedStudent**                                | Common                 | Optional collection    | Information about a student who was enrolled, or eligible for enrollment, but has temporarily or permanently enrolled in another school or district because of a crisis-related disruption in educational services. |

### Updated StudentAssessmentRegistration reference to StudentDemographic instead of the SEOA

[DATASTD-2459](https://edfi.atlassian.net/browse/DATASTD-2459)

In agreement with state agencies, the removal of demographic data from the StudentEducationOrganizationAssociation implied that the StudentAssessmentRegistration would refer StudentDemographic.

### Deleted StaffEducationOrganizationContactAssociation

As discussed during the DataStandard Work group calls and in alignment with the greater effort to simplify the model.  Staff was split apart into StaffIdentificationCode, StaffDemographic, and StaffDirectory (i.e. contact information such as address, email, telephone) entities.  With the creation of targeted individual domain entities, the need to maintain a separate duplicate association for tracking Staff members information has been removed.

Information previously tracked on the Staff domain entity has been split apart in a manner substantially similar to the Student entities above.

### Assessment Model Changes

[DATASTD-2491](https://tracker.ed-fi.org/browse/DATASTD-2491)
[DATASTD-2492](https://tracker.ed-fi.org/browse/DATASTD-2492)
[DATASTD-2493](https://tracker.ed-fi.org/browse/DATASTD-2493)

There were 5 key changes done to assessments:

* Assessment.academicSubject changed from _Required collection_ to **Required (single value)**.
* ObjectiveAssessment.ParentObjectiveAssessment changed from _Optional_ to **Optional Collection**.  This allows for an objective assessment to be linked to
    multiple parent objective assessments.
* StudentAssessment.SchoolYear changed from _Optional_ to **Required**
* StudentAssessment.AssessedGradeLevel - **Optional Descriptor** was added to indicate the grade level for which the test form was assessed for the
    student during the administration. Note: StudentAssessment.WhenAssessedGradeLevel remains to represent the student’s actual grade level at the time of assessment.
* StudentAssessment.StudentAssessmentIndicator - **New Optional Collection** was added to capture vendor-specific context unrelated to scores.  This eliminates
    the need to misuse assessmentReportingMethodDescriptors or scoreResults for non-score flags.

:::info

Additional details for these changes can be found in [Ed-Fi RFC 27c](https://edfi.atlassian.net/wiki/spaces/rc/pages/1229094913/Ed-Fi+RFC+27+c+-+Assessment+Model+Changes).

:::

### Educator Preparation Data Model (community edition) migrated to Core Entities

The Educator Preparation Data Model represents a state approved  path or course of study, culminating in a candidate completing all requirements necessary to obtain a certification or licensure to teach within K-12 schools.  Individuals under this domain may often be represented in dual roles as students in one context of their continuing education, while also being staff at the same time as part of their required training. This domain has largely been held as a community extension until now. Entities and descriptors from Educator Preparation Data Model (Community Edition) have been moved into the Ed-Fi Core data standard in order to promote consistency and broader applicability.

New Domains Created:

* _Credential Domain_ - defines educator credentials, detailing their type, field, status, and associated personal and academic records.
* _Educator Preparation Program Domain_ - is for the details of the program and accreditation. A Candidate under this domain contains the identifiers, educational
    background, fieldwork experience and other information as it relates to their participation in the program or course of study.
* _Path Domain_ - consists of information needed for tracking a student progress in achieving an educational goal such as certification or licensure.
* _PerformanceEvaluation Domain_ - defines the model for performance measurement with four hierarchical level of defining performance measures and capturing
    metadata and ratings of persons for each level. These four levels are Evaluation, EvaluationObjective, EvaluationElement and PerformanceEvaluation.
* _Recruiting and Staffing Domain_ - defines the model for application and recruitment pursuers, events, and the opportunity they pursue.

More detailed information regarding each domain, their descriptors and related entities can be found in the updated model references pages [here](/dataStandard_versioned_docs/version-6/model-reference/readme.md).

#### Addition of FinancialAid Domain Entity to Enrollment

In addition to the creation of wholly new domains for the Educator Preparation Data Model, one new entity has been created and and added into the existing Enrollment Domain. As part of the 6.0 release users will find a domain entity for Financial Aid has been added and has Student as part of its identity keys.

### Special Education Program Association Updated

Two optional IEP date fields have been renamed (BREAKING) to provide greater clarity on their purposes, and two new optional date field have been added.

| Property | Cardinality | Definition |
| --- | --- | --- |
| IEPLastEvaluationDate | optional | The date of the last special education evaluation. BREAKING rename of "LastEvaluationDate" |
| IEPLastReviewDate | optional | The date of the last IEP review. BREAKING rename of "IEPReviewDate" |
| IEPEvaluationDueDate | optional | The due date for the next special education evaluation. NEW |
| IEPReviewDueDate | optional | The due date for the next IEP review. NEW |

Detailed information about the transfer of EPDM entities into Core and the updates to the SpecialEducationProgramAssociation can be reviewed in [DataStandard 6.0 Preview 1](https://edfi.atlassian.net/wiki/spaces/rc/pages/931069953/Ed-Fi+RFC+27+a+-+Data+Standard+6.0+Preview+1)

## Minor Changes

### Increased IdentificationCode (shared string) length to 120 characters

[DATASTD-2468](https://tracker.ed-fi.org/browse/DATASTD-2468)

[DATASTD-2446](https://tracker.ed-fi.org/browse/DATASTD-2446)

Several community members reached out with the request to increase the overall length of IdentificationCode (especially for assessments).
The updated length applies to all entities and associations that use the shared string, including (but not limited to):  Assessment, EducationOrganization, Course, Contact, CourseTranscript, Credential, Intervention, and others.  For a complete list of impacted entities, refer to the IdentificationCode section in the Data Standard Handbook.

### Increased length of CourseTitle, Author and LearningStandardItemCode

[DATASTD-2468](https://tracker.ed-fi.org/browse/DATASTD-2468)
[DATASTD-2446](https://tracker.ed-fi.org/browse/DATASTD-2446)

Vendor feedback highlighted misalignment in field lengths when importing learning standards data into the API. To improve usability and ensure consistency, the following adjustments were made:

* ContentStandard.CourseTitle updated to allow 120 characters.
* ContentStandard.Author updated to allow 255 characters.
* LearningStandard.LearningStandardItemCode updated to allow 100 characters.

The new length for CourseTitle is also reflected in CourseOffering.CourseTitle, CourseTranscript.CourseTitle, and LearningStandard.CourseTitle.

### Replaced EconomicDisadvantage _Boolean_ with Optional Collection

[DATASTD-2473](https://tracker.ed-fi.org/browse/DATASTD-2468)
[DATASTD-2488](https://tracker.ed-fi.org/browse/DATASTD-2488)

Previous versions of the Ed-Fi standard used EconomicDisadvantaged as a boolean flag for individuals under financial hardship. Community feedback noted that the absence of this flag does not necessarily indicate the characteristic is false.  To improve accuracy and completeness of state reporting, the EconomicDisadvantaged boolean value was removed, and a new optional collection (descriptor) was created enabling Yes/No/Unknown values.

The EconomicDisadvantaged (optional collection) was:

* Added to the newly created StudentDemographic entity.
* Updated in Candidate.

## Minor Changes in the Educator Preparation Domain

### Renamed EvaluationRatings to PerformanceEvaluationRatings

This entity includes an array called results. The objects in this array formerly included a property called rating, which has been renamed as numericRating. This can be seen in the following JSON snippet:

| **Before** | **After** |
|------------|-----------|
| `"results": [ { "rating": 999.999, "ratingResultTitle": "string", "resultDatatypeTypeDescriptor": "string" } ]` | `"results": [ { "numericRating": 999.999, "ratingResultTitle": "string", "resultDatatypeTypeDescriptor": "string" } ]` |

### Replaced GenderDescriptor with GenderIdentity

Changes made to the following entities: ApplicantProfile, Staff, Candidate, RecruitmentEventAttendance.

### Updated the canonical Ed-Fi descriptor from "tpdm" to "ed-fi"

Previously, the canonical Ed-Fi descriptor set for EPDM included “tpdm” in their namespace URI values. This is no longer necessary.

For example: uri://tpdm.ed-fi.org/CertificationRouteDescriptor becomes uri://ed-fi.org/CertificationRouteDescriptor

### Removed previously marked deprecated properties

* CandidateEducatorPreparationProgramAssociation.MajorSpecialization
* CandidateEducatorPreparationProgramAssociation.MinorSpecialization
* CandidateIndicator.Period
* Candidate.OldEthnicityDescriptor
* Candidate.CohortYear
* Candidate.Aid
* Candidate.ProgramComplete
* Candidate.DegreeSpecialization
* Candidate.ApplicationReference
* EducatorPreparationProgram.EducatorPreparationProgramType

### Removed ProgramGateway Descriptor from PerformanceEvaluation

[DATASTD-2440](https://tracker.ed-fi.org/browse/DATASTD-2440)

The ProgramGateway descriptor was identified as unused in EPDM implementations and therefore did not need to remain part of the standard. Since it was never adopted, it has been removed in the 6.0 release to streamline the model.
