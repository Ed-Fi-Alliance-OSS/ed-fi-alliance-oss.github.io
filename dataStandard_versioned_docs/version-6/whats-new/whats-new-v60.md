# What's New - v6.0

Release Date: Nov. 14, 2025.

## Overview

Data Standard v6.0 delivers significant structural and semantic enhancements designed to improve data clarity, interoperability, and simplify data updates. This release introduces breaking changes and is targeted for deployment beginning in the 2026–27 school year. Following reviews by state agencies, SIS and assessment vendors, and feedback from [RFC 27 - Ed-Fi Data Standard 6.0](https://edfi.atlassian.net/wiki/x/EgC5P), the following updates were implemented to the Data Standard model in 6.0:

Improved handling of multiple identifiers for Contact, EducationOrganization, Staff, and Student in the system resulting in the creation of new entities for:

* CandidateIdentificationCode
* ContactIdentificationCode
* EducationOrganizationIdentificationCode
* StaffIdentificationCode
* StudentIdentificationCode

Streamline access and storage of Demographic and Directory (i.e. contact information such as address, email, telephone) information of various roles resulting in the creation of new entities for:

* StaffDemographic
* StaffDirectory
* StudentDemographic
* StudentDirectory

:::info

Additional details related to the changes for identification and demographics can be found in [Ed-Fi RFC 27b](https://edfi.atlassian.net/wiki/spaces/rc/pages/998375429/Ed-Fi+RFC+27+b+-+Streamlining+Access+to+Identification+Codes+Contact+Information+and+Demographics).

:::

* Enhanced Assessment model to better support data collection and logic for Assessment dashboards.  These changes originated from initiatives in South Carolina, integrating over thirty assessments, and are broadly beneficial for other states.
* Expanded core model coverage for Educator preparator use cases and ongoing updates to related entities.
* Partial handling of Special Education Program events.

## Major Changes

### Breakout of Staff and StudentEducationOrganizationAssociation (SEOA) Entities

Based on community feedback the StudentEducationOrganizationAssociation and Staff entities were simplified. One pain point that was brought forth by the community is the complexity in updating the StudentEducationOrganizationAssociation and difficulty in searching the IdentificationCode commons. By breaking the StudentEducationOrganizationAssociation into smaller more manageable components vendors and admins will be better able to query records more specifically and updates can now be made in a targeted way that they do not overwrite whole records.

**In specific, this release makes a breaking change from DS 5.2 to DS 6.0 by _deleting_ the following fields from the SEOA and _migrating_ them to the corresponding new entities as outline below:**

#### Fields to New StudentIdentification Code Entity

* StudentIdentificationCode

#### Fields to New StudentDemographic Entity

* AncestryEthnicOrigin
* Disability
* GenderIdentity
* HispanicLatinoEthnicity
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

### Deleted StaffEducationOrganizationContactAssociation

As discussed during the DataStandard Work group calls and in alignment with the greater effort to simplify the model. Staff is being split apart into StaffIdentificationCode, StaffDemographic, and StaffDirectory (i.e. contact information such as address, email, telephone) entities. With the creation of targeted individual domain entities, the need to maintain a separate duplicate association for tracking Staff members information has been removed.

Information previously tracked on the Staff domain entity has been split apart in a manner substantially similar to the Student entities above.

#### New Staff Related Entities

* StaffDirectory
* StaffIdentificationCode
* StaffDemographic

### Assessment Model Changes

[DATASTD-2491](https://tracker.ed-fi.org/browse/DATASTD-2491)
[DATASTD-2492](https://tracker.ed-fi.org/browse/DATASTD-2492)
[DATASTD-2493](https://tracker.ed-fi.org/browse/DATASTD-2493)

There were 5 key changes done to assessments:

* Assessment.academicSubject changed from _Required Descriptor_ to **Required Single Attribute**.
* ObjectiveAssessment.ParentObjectiveAssessment changed from _Optional_ to **Optional Collection**.  This allows for an objective assessment to be linked to
    multiple parent objective assessments.
* StudentAssessment.SchoolYear changed from _Optional_ to **Required**
* StudentAssessment.AssessedGradeLevel - **Optional Descriptor** was added to indicate the grade level for which the test form was assessed for the
    student during the administration. Note: StudentAssessment.WhenAssessedGradeLevel (Optional Descriptor) remains to represent the student’s actual grade level at the time of assessment.
* StudentAssessment.StudentAssessmentIndicator - **New Optional Collection** was added to capture vendor-specific context unrelated to scores.  This eliminates
    the need to misuse assessmentReportingMethodDescriptors or scoreResults for non-score flags.

:::info

Additional details for these changes can be found in [Ed-Fi RFC 27c](https://edfi.atlassian.net/wiki/spaces/rc/pages/1229094913/Ed-Fi+RFC+27+c+-+Assessment+Model+Changes).

:::

### Migration from Educator Preparation Data Model to Core Entities

The Educator Preparation Data Model represents a state approved  path or course of study, culminating in a candidate completing all requirements necessary to obtain a certification or licensure to teach within K-12 schools. Individuals under this domain may often be represented in dual roles as students in one context of their continuing education while also being staff at the same time as part of their required training. This domain has largely been held as a community extension until now. Entities and descriptors from Educator Preparation Data Model community have been moved into the Ed-Fi Core data standard in order to promote consistency and broader applicability.

New Domains Created:

* _Credential Domain_ - defines educator credentials, detailing their type, field, status, and associated personal and academic records.
* _Educator Preparation Program Domain_ - is for the details of the program and accreditation. A Candidate under this domain contains the identifiers, educational
    background, fieldwork experience and other information as it relates to their participation in the program or course of study
* _Path Domain_ - consists of information needed for tracking a student progress in achieving an educational goal such as certification or licensure.
* _PerformanceEvaluation Domain_ - defines the model for performance measurement with four hierarchical level of defining performance measures and capturing
    metadata and ratings of persons for each level. These four levels are Evaluation, EvaluationObjective, EvaluationElement and PerformanceEvaluation
* _Recruiting and Staffing Domain_ - defines the model for application and recruitment pursuers, events, and the opportunity they pursue.

More detailed information regarding each domain, their descriptors and related entities can be found in the updated model references pages [here](/dataStandard_versioned_docs/version-6/model-reference/readme.md).

#### Addition of FinancialAid Domain Entity to Enrollment

In addition to the creation of wholly new domains for the Educator Preparation Data Model one new entity has been created and and added into the existing Enrollment Domain. As part of the 6.0 release users will find a domain entity for Financial Aid has been added and has Student as part of its identity keys.

### Updates on Special Education Program Association

Two optional IEP date fields have been renamed (BREAKING) to provide greater clarity on their purposes, and two new optional date field have been added.

| Property | Cardinality | Definition |
| --- | --- | --- |
| IEPLastEvaluationDate | optional | The date of the last special education evaluation. BREAKING rename of "LastEvaluationDate" |
| IEPLastReviewDate | optional | The date of the last IEP review. BREAKING rename of "IEPReviewDate" |
| IEPEvaluationDueDate | optional | The due date for the next special education evaluation. NEW |
| IEPReviewDueDate | optional | The due date for the next IEP review. NEW |

## Minor Changes

### Remove ProgramGateway Descriptor

[DATASTD-2440](https://tracker.ed-fi.org/browse/DATASTD-2440)

This descriptor was determined to never have been used in TPDM/EPDM and as such did not need to be included as part of the standard. Given that it appears to have never been used it was removed as part of the 6.0 release.

### Update Length Of CourseTitle

[DATASTD-2446](https://tracker.ed-fi.org/browse/DATASTD-2446)

Several community members reached out with the request to increase the overall length of this field. The following domain entities appear to benefit from this expanded functionality.

* Course.CourseTitle (as required)
* CourseOffering.CourseTitle (as optional)
* CourseTranscript.CourseTitle (as optional)
* LearningStandard.CourseTitle (as optional)

### Increase ContentStandardTitle from 75 To 100 Characters

[DATASTD-2468](https://tracker.ed-fi.org/browse/DATASTD-2468)

Received information from vendors regarding tools that allow them to import learning standards data into the API but initially had a misalignment regarding field lengths. In order to promote ease of use and increase consistency the following adjustments were made:

* Updated shared string for ContentStandardTitle to allow 100 characters.
* Updated shared string for Author to allow 255 characters
* Updated CourseTitle to allow 120 characters
* Updated IdentificationCode to allow 100 characters.

### Add "EconomicDisadvantage" Optional Descriptor to StudentDemographic

[DATASTD-2473](https://tracker.ed-fi.org/browse/DATASTD-2468)

The Ed-Fi standard originally had a boolean used by several domain entities in the system to provide insight to those who were under financial hardship. However, as pointed out by members of the community the absence of a flag should not automatically imply that the student/candidate/individual in question does not actually possess that characteristic. By shifting the current boolean value to a descriptor this would provide greater flexibility in allowing the system to capture Yes/No/Unknown values and better populate key state reports.

### Replace EconomicDisadvantaged Bool With New EconomicDisadvantaged Descriptor

[DATASTD-2488](https://tracker.ed-fi.org/browse/DATASTD-2488)

Builds on the information and outline above. Originally the EconomicDisadvantage descriptor value was only applied to the newly created StudentDemographic entity created within the 6.0 release. However several other entities such as Candidate were also determined to house the older boolean model. In and effort to standardize and improve functionality the original bool value was removed and replaced on those entities as well.
