# What's New - v6.0

Release Date: Nov. 14, 2025.

## Overview

Data Standard v6.0 delivers significant structural and semantic enhancements designed to improve data clarity, interoperability, and reduce update burden across implementations. This release introduces breaking changes and is targeted for deployment beginning in the 2026–27 school year.

Community benefits:

* Simplifies the data update process for student identification codes, demographics, and directory information.
* Improved handling of multiple or alternative identifiers.
* Enhanced Assessment model to better support data collection and logic for Assessment dashboards.  These changes originated from initiatives in South Carolina, integrating over thirty assessments, and are broadly beneficial for other states.
* Expanded core model coverage for Educator preparator use cases and ongoing updates to related entities.
* Partial handling of Special Education Program events.

Following reviews by state agencies, SIS and assessment vendors, and feedback from [RFC 27 - Ed-Fi Data Standard 6.0](https://edfi.atlassian.net/wiki/x/EgC5P), the following updates were implemented to the Data Standard model in 6.0:

* Demographic and contact information were decoupled from the SEOA.
* New demographic and directory entities were created for students and staff.  The directory entities contain properties that provide contact information about a student or staff.  This is different than the contact entity which contains parent or representative information.
* The demographic and directory attributes were DELETED from the SEOA and added to the NEW DOMAIN ENTITIES. Note: these specific attributes were not deprecated from the SEOA to avoid redundancy.
* New Optional Identity entities were introduced to better manage multiple identifiers for the same individual. New identity entities were created for students, staff, contact, candidate, and educationorganization.
* The use of IdentificationCode commons in EducationOrganization, SEOA, and Staff was updated.
* The Assessment, ObjectiveAssessment and StudentAssessment entities were revised (no changes to Identities).
* The EPDM community extensions were moved into Core.  To these effects, new domains were created to support the EPDM related domain entities and descriptors.  Other domains such as Candidate, Survey were updated with EPDM-related entities and descriptors.

Domains impacted:

* Assessment
* Student Identification and Demographics Domain
* Credential Domain (new)
* Educator Preparator Domain (new)
* Path Domain (new)
* Performance Evaluation Domain (new)
* Recruiting and Staffing Domain (new)
* Staff Domain
* Enrollment Domain
* Survey Domain
* Teaching and Learning Domain
* Candidate

## Major Changes

### Split of StudentEducationOrganizationAssociation (SEOA) and new Identity entities

The following tables show changes in the SEOA from DS 5.2 to DS 6.0, and the new related entities in 6.0:

* Changes to the SEOA:

|Property | In DS 5.x | In DS 6.0 |
| --- | --- | --- | --- |
| StudentIdentificationCode | part of SEOA |indicate change to IdentificationCode  |
|StudentIndicator |part of the SEOA | Part of the SEOA |
|Sex | part of the SEOA | Not in the SEOA|
|GenderIdentity | part of the SEOA | Not in the SEOA|
|Address |part of the SEOA | Not in the SEOA |
|InternationalAddress |part of the SEOA | Not in the SEOA |
| | |  |

* New entities created:
Student Demographic
Staff Demographic
StudentDirectory
StaffDirectory
StudentIdentificationCode
StaffIdentificationCode
CandidateIdentificationCode
ContactIdentificationCode
EducationOrganizationIdentificationCode

Details for these changes are found in [Ed-Fi RFC 27b](https://edfi.atlassian.net/wiki/spaces/rc/pages/998375429/Ed-Fi+RFC+27+b+-+Streamlining+Access+to+Identification+Codes+Contact+Information+and+Demographics)

### Assessment Model Changes

There were 5 key changes done to assessments:

* Assessment.academicSubject changed from Required Descriptor to Required Single Attribute.
* StudentAssessment.SchoolYear changed from Optional to Required
* StudentAssessment.AssessedGradeLevel (Optional Descriptor -not a collection) was added to indicate the grade level for which the test form was assessed for the student during the administration. Note: StudentAssessment.WhenAssessedGradeLevel (Optional Descriptor) remains to represent the student’s actual grade level at the time of assessment.
* StudentAssessment.StudentAssessmentIndicator - new optional collection was added to capture vendor-specific context unrelated to scores.  This eliminates the need to misuse assessmentReportingMethodDescriptors or scoreResults for non-score flags.
* ObjectiveAssessment.ParentObjectiveAssessment changed from Optional to Optional Collection.  This allows for an objective assessment to be linked to multiple parent objective assessments.

Details for these changes are found in [Ed-Fi RFC 27c](https://edfi.atlassian.net/wiki/spaces/rc/pages/1229094913/Ed-Fi+RFC+27+c+-+Assessment+Model+Changes)

### Migration from EPDM to Core Entities

Entities and descriptors from EPDM community have been moved into the Core Ed-Fi data standard, promoting consistency and broader applicability.

#### Updates on Special Education Program Association

[DATASTD-](link)

Two optional IEP date fields have been renamed (BREAKING) to provide greater clarity on their purposes, and two new optional date field have been added.

| Property | Cardinality | Definition |
| --- | --- | --- |
| SpecialEducationExitDate | optional | The month, day and year on which a person stops receiving special education services. |
| SpecialEducationExitReason | optional | The reason why a person stops receiving special education services. |
| SpecialEducationExitExplained | optional | Explanation on why a person stops receiving special education services. |

### Adding Student Program Evaluation

## Minor Changes

### Updates on XXX Field

Description

### Updates on XXX

[DATASTD-XXX](https://tracker.ed-fi.org/browse/DATASTD-XXXX)

Short description.

### Updating XXX

[DATASTD-XXX](https://tracker.ed-fi.org/browse/DATASTD-XXXX)

Short description.

### Update on XXX

[DATASTD-XXXX](https://tracker.ed-fi.org/browse/DATASTD-XXX)

Short Description.

## List of All Changes

* [Epic name](https://tracker.ed-fi.org/browse/XXXX)
* [Ticket name](https://tracker.ed-fi.org/browse/DATASTD-XXXX)
