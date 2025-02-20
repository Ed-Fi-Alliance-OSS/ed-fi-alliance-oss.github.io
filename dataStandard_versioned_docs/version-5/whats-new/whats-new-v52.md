# What's New - v5.2

## Overview

Data Standard version 5.2 (DS v5.2) is the second release of two releases Ed-Fi Alliance delivered in the year 2024. It is designed to deliver only non-breaking changes to the Ed-Fi Unifying Data Model (UDM) as it was decided earlier in 2024. Even though the release is only for non-breaking changes in the Ed-Fi UDM, it is not shy of introducing some major updates and long anticipated changes to the Ed-Fi UDM just like was the DS v5.1 release. One of these major updates introduced in v5.2 are adding Assessment Registration domain to allow tracking of data for scheduling the assessment administration and assessment and administration participation. Another major change is the addition of Section 504 Program to the Alternative and Supplemental Services. With this update Ed-Fi UDM allows users to record and track data for students that are eligible for services as suggested by the Section 504 of the Rehabilitation Act of 1973 and later in the Individuals with Disabilities Education Act (IDEA) and the Americans with Disabilities Act (ADA). One other main  update introduced by the DS v5.2 is adding the capacity to the model in tracking dual credit related data.

Beside these main updates, DS v5.2 also introduces some minor changes to the Ed-Fi UDM varying from the descriptor definitions to EDFacts alignment related updates, and student discipline related updates to shortened instructional day tracking for IEP students.

## Major Changes

### A new domain is added for Assessment Registration

[DATASTD-2168](https://edfi.atlassian.net/browse/DATASTD-2168)

The Assessment Registration domain outlines the entities and relationships necessary for SEAs and LEAs to register students for assessments and share registration data with the assessment vendor. This domain covers various assessments, ensuring that educational organizations have a protocol to communicate student registrations to the vendor promptly. Key concepts for the domain are assessment, assessment administration, assessment battery part, and assessment accommodations.

The Assessment Registration domain supports the communication between education organizations and assessment vendors relating to the administration of an assessment. By utilizing this domain in the Ed-Fi UDM these Ed-Fi community members will not only be able to prevent a redundant work load because of data interoperability, but also will have previously largely manual process be automated through Ed-Fi APIs.

#### Concept

Assessment encompasses a broad range of tests, methods, and tools that educators utilize to evaluate, measure, and document students' academic readiness, learning progress, skill acquisition, or educational needs. The Assessment domain in Ed-Fi UDM specifies the details for capturing metadata about an assessment, including students' scores and results. The Assessment Registration domain introduced in this version focuses on the administration of assessments and the registration of students for assessments created by vendors.

_Assessment Administration_ is to refer a wide range of activities involved in procuring, organizing, delivering, and scoring assessments for a student population. It includes

* identifying the target student group,
* setting the assessment window dates,
* selecting participating schools for delivery and proctoring,
* ensuring the availability, functionality and security of technologies used for assessment delivery,
* managing student registration logistics and communication with the assessment vendor,
* accommodating special needs of students,
* handling the logistics of scoring and returning assessment results to educational organizations.

Education organizations involved in the assessment administration may have different roles as assigning, participating, testing, and reporting.

An _Assessment Battery Part_ is a module or collection of assessment tests or questions designed for student delivery that can be administered at different times, scored separately or differently, taken by various groups of students, or require distinct logistics or accommodations.

_Assessment Accommodations_ entail altering the design or delivery of assessments to cater to the needs of students with disabilities or English learners (EL) who cannot effectively take standard assessments. These accommodations can differ depending on the assessment part, such as using a translator for ELA or a calculator for Mathematics. Some special education students may need additional modifications to participate in assessments.

Use cases Ed-Fi has discussed with the community members revealed that a typical process of assessment registration in the field has following steps

* Education organizations collaborate with the assessment vendor to determine the time frame and guidelines for administering an assessment.
* The specifics of assessment participation and delivery are outlined.
* Students are registered for the administration of the assessment.
* The assessment vendor receives the registration list of students along with selected student information.

#### Model Details

To allow community members track data in the Ed-Fi UDM, Assessment Registration domain is created with the following entities and associations:

<u>_AssessmentAdministration_:</u> It is to store data for the administration of an assessment. It has references to AssigningEducationOrganization and Assessment entities, and tracks information relating to AdministrationIdentifier, AssessmentAdministrationPeriod and AssessmentBatteryPart.

<u>_AssessmentAdministrationParticipation_:</u> The planned participation of an EducationOrganization in the administration of an assessment.
StudentAssessmentRegistration: Identifies a registration that indicates the student is expected to participate in a particular assessment administration.

<u>_AssessmentBatteryPart_:</u> The parts organized for administering an assessment which together provide a comprehensive assessment of the students.

<u>_StudentAssessmentRegistrationBatteryPartAssociation_:</u> The association to the part(s) of the assessment battery that the student is to be tested for this administration of the assessment.

<u>_StudentEducationOrganizationAssessmentAccommodation_:</u> The accommodation(s) required or expected for administering assessments as determined by the education organization.

The UML diagram below illustrates the model for the Assessment Registration domain with its entities, attributes and associations.

![Assessment Registration Domain](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/v52/UML_AssessmentRegistrationDomain_DSv52.jpg)
[_Click here for a larger view of the diagram_](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/v52/UML_AssessmentRegistrationDomain_DSv52.jpg)

#### Best Practices in using Assessment Registration domain

* An Assessment may have zero or more AssessmentAdministrations within a school year. Typically, different AssessmentAdministrations for the same Assessment do not have overlapping AssessmentAdministration.Periods. However, overlaps may occur in cases where different AssessmentAdministrationParticipation.ParticipatingEducationOrganizations are involved or when targeting different student populations. The AssessmentAdministration.AssigningEducationOrganization should be the entity responsible for the entire scope of the assessment registration, including the management of the assessment vendor. If, at the time of defining an assessment administration with the assessment vendor, the assessment metadata (specifically the Assessment entity) has not been created, it is necessary to create the Assessment for reference by the AssessmentAdministration. Additionally, if the assessment administration involves the selective delivery of assessment battery parts, the AssessmentBatteryParts should be created for reference by the AssessmentAdministration.

* To communicate the participating education organizations and their contacts to the assessment vendor, if required, use the AssessmentRegistrationParticipation entity. Typically, the AssessmentRegistrationParticipation.ParticipatingEducationOrganization is a sub-organization of the AssessmentAdministration.AssigningEducationOrganization. For instance, a LocalEducationAgency may act as a participating sub-organization under the StateEducationAgency.

* A StudentAssessmentRegistration is not required for the results of the Assessment to be reported in StudentAssessment. However, every student reflected in the StudentAssessmentRegistration should have a corresponding StudentAssessment, even if the student was not tested. The StudentAssessmentRegistration.ReportingEducationOrganization is typically the School, or its Local Education Agency (LEA), where the student is enrolled. To communicate the accommodations required for the student for the entire assessment to the assessment vendor, use the StudentAssessmentRegistration.AssessmentAccommodation. Additionally, use the StudentAssessmentRegistration.AssessmentCustomization to provide the assessment vendor with additional data about the student and/or details of the student’s registration that are not available from other entities in the API.

* The AssessmentBatteryPart entity denotes parts that are organized for administering an assessment which, together, provide a comprehensive assessment of the students. Use the AssessmentBatteryPart when students are either selectively delivered different assessment battery parts or may receive different accommodations for different assessment battery parts. An Assessment may have zero or more AssessmentBatteryParts. If AssessmentBatteryParts are defined, reference the ObjectiveAssessments that they are mapped to when aligned.

* The StudentAssessmentRegistrationBatteryPartAssociation specifies the assessment battery parts that a student will be tested on during this administration. Use the StudentAssessmentRegistrationBatteryPartAssociation when the student is selectively delivered certain assessment battery parts or when the student requires different accommodations for different assessment battery parts.

* The StudentEducationOrganizationAssessmentAccommodation entity outlines the accommodations required or expected for administering assessments, as determined by the education organization. This information is typically provided by the Student Information System (SIS) or supporting applications for English Language Learners (ELL) or special education, indicating the general assessment accommodations a student should receive. Use the StudentEducationOrganizationAssessmentAccommodation to document the general accommodations that should be provided to the student for all assessments. The EducationOrganization specified in the StudentEducationOrganizationAssessmentAccommodation is usually the same as the EducationOrganization in the corresponding StudentEducationOrganizationAssociation recorded during enrollment.

### A new association, Student Section 504 Program, is Added to the Alternative and Supplemental Services domain

[DATASTD-2194](https://edfi.atlassian.net/browse/DATASTD-2194)

Federally funded educational organizations are required to report data on students and the accommodations provided to them under the federally mandated Free Appropriate Public Education (FAPE). The Ed-Fi data standard team observed that several states have been working on extending their models to include the capacity to track student data in compliance with this federal mandate. After discussions with other members of the Ed-Fi community at the Data Standard Workgroup, the _StudentSection504ProgramAssociation_ was added to the _AlternativeAndSupplementalServices_ domain as a sub-program of the _GeneralStudentProgramsAssociation_.

#### Concept

Section 504 is a federal statute that prohibits disability discrimination in educational institutions receiving federal financial assistance. It mandates that qualified students with disabilities receive customized education and services equivalent to those provided to non-disabled students, ensuring their right to a FAPE.

Key features of FAPE under Section 504 is as following

* Assessment and placement protocols designed to prevent the misclassification or improper placement of students,
* Regular reevaluation of students receiving special education or related services, especially before any major change in their placement,
* Provision of general or special education, along with related aids and services, designed to ensure that the individual educational needs of students with disabilities are met as effectively as those of non-disabled students,
* Integration of students with disabilities into classrooms with non-disabled students to the greatest extent appropriate for their needs,
* A procedural safeguards system designed to inform parents of a school district’s actions or decisions and provide a process for challenging them. This includes notice, an opportunity for parents to review their child’s records, an impartial due process hearing (with participation by the student’s parents or guardians and representation by counsel), and a review procedure.

Under Section 504, school districts are required to promptly evaluate any student who needs or is suspected to need special education or related services due to a disability. If a school is aware of a student's disability or has reason to suspect one, and the student requires or is believed to require special education or related services, it would be a violation of Section 504 for the school to delay or deny the evaluation.

School districts typically document these accommodations in a Section 504 Plan. Students eligible under the Individuals with Disabilities Education Act (IDEA) who have an Individualized Education Program (IEP) are not required to have a separate Section 504 Plan, although they are still protected under Section 504.

These requirements and suggested procedures guided by federal authorities have federally funded educational organizations including Ed-Fi community members to build a system of information collection and reporting. This use case among the Ed-Fi community encouraged the Alliance to add the capacity in the Ed-Fi UDM. Details of the model is in the following section.

#### Model Details

Based on the discussions during the Ed-Fi Data Standard Workgroup meetings and feedback received from the Ed-Fi community members, _StudentSection504ProgramAssociation_ is added to the _AlternativeAndSupplementalServices_ domain as a part of _GeneralProgram.

The UML diagram for the part of the Ed-fi model relating to this association and its link to other entities is shown below.

![Section 504 Association](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/v52/UML_StudentSection504ProgramAssociation_DSv52.jpg)
[_Click here for a larger view of the diagram_](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/v52/UML_StudentSection504ProgramAssociation_DSv52.jpg)

Followings are the attributes included in the association.

<u>_Section504Eligibility_:</u> This is an indicator to mark if a student is found to be eligible for Section 504 program.

<u>_AccommodationPlan_:</u> Our study has shown that not every Section 504 program eligibility decision requires an accommodation to the services student receives. Therefore, this indicator is added to the association.

<u>_Section504Disability_:</u> It is a descriptor to define the disability that qualifies student for the Section 504 plan.

<u>_Section504MeetingDate_:</u> This date variable is created to record information on the meeting school officer held with the parent or guardian of the student to discuss the Section 504 plan eligibility of the student.

<u>_Section504EligibilityDecisionDate_:</u> This attribute is to store information on the date when a decision for eligibility (or ineligibility) of student for a Section 504 plan.

### Dual Credit is added to the Student Section Association

[DATASTD-2306](https://edfi.atlassian.net/browse/DATASTD-2306)

#### Concept

In the previous version of the Ed-Fi UDM, _Course_, _CourseOffering_ and _Section_ domain entities in data model included _CourseLevelCharacteristics_ descriptor that captures information if they are classified as dual credit, where dual credit is indication of possibility of receiving credit for a secondary study and for a post-secondary study later stages of student's academic progress. Discussion with the Ed-Fi community members have shown that the participation of students in courses where dual credit is offered has become more common in the field, hence a need to extend the capacity of the data model in tracking the information at what setup students are receiving the education and if they are to receive a credit from a post-secondary education organization as well as the high school credit.

#### Model Details

To address the need mentioned above an inline common, _DualCredit_, is created to be added to the _StudentSectionAssociation_. The reason for having it added to the _StudentSectionAssociation_ instead of _Section_ domain entity itself is to consider some use cases Ed-Fi community members shared where a group of students sitting in the same section were not getting credit while other are. The inline common has following attributes.

<u>_DualCreditIndicator_:</u> Is a boolean to indicate if a student assigned to the section is to receive dual credit upon successful completion.

<u>_DualCreditType_:</u> This descriptor is to mark the type of the dual credit program taken by the student in secondary or post-secondary education environment. Ed-Fi defined possible values are Dual Enrollment (post-secondary education level course taught in post-secondary education environment), Advanced Courses Eligible for College Credit (secondary education level course taught in secondary education environment), and Concurrent Enrollment (post-secondary education level course taught in secondary education environment).

<u>_DualHighSchoolCreditIndicator_:</u> This indicator is to define whether a successful completion of the course will result in credits toward high school graduation.

<u>_DualCreditEducationOrganization_:</u> The common have the _DualCreditEducationOrganization_ as a reference to the EducationOrganization already exist in the model.

<u>_DualCreditInstitution_:</u> In addition to the _DualCreditEducationOrganization_ reference this _DualCreditInstitution_ descriptor added to the model to let community members to have their custom descriptor for listing institutions that are unknown to the Ed-Fi system.

The UML diagram of the Ed-Fi UDM will show the _DualCredit_ as an attribute of the _StudentSectionAssociation_ and will not have the details of the _DualCredit_ inline common, but as a reference below is the illustration of the common with its link to the _StudentSectionAssociation_.

![Dual Credit](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/v52/UML_DualCredit_DSv52.jpg)

## Minor Changes

### Tracking Shortened Instructional Days for IEP Students

[DATASTD-2305](https://edfi.atlassian.net/browse/DATASTD-2305)

A need among the Ed-Fi community members was introduced to the Alliance that at some local level students with IEP could be exposed to significantly fewer hours of instructions compared to their peers in the general education. To address this need among the community members two new data elements,_ShortenedSchoolDayIndicator_ and _ReductionInHoursPerWeekComparedToPeers_, are added to the _StudentSpecialEducationProgramAssociation_ as optional attributes.

### Definition updates for some time variables

[DATASTD-2272](https://edfi.atlassian.net/browse/DATASTD-2272)

An analysis of time variables in the Ed-Fi model revealed that there were some duration type variables (_AssessmentItem.ExpectedTimeAssessed, LearningResource.TimeRequired, StudentAssessmentItem.TimeAssessed, StudentInterventionAttendanceEvent.AttendanceEventDuration, StudentProgramEvaluation.Duration, SurveyResponse.ResponseTime, AttendanceEvent.EventDuration_) in the model that don't revealed the unit of intended duration unit type neither by their name nore their definition. Since changing their name would introduce a breaking change to the model, their definition have been updated in this release and further discussion on a need for name changes is being pursued for later releases.

### Student behavior and discipline related updates

[DATASTD-2195](https://edfi.atlassian.net/browse/DATASTD-2195)

There have been two minor updated introduced to the Ed-Fi UDM that relates to the student behavior and discipline. These updates are adding the _DisciplineIncident_ reference is to the _RestrainEvent_ domain entity as an optional data element, and adding the _Weapon_ descriptor to the _StudentDisciplineIncidentBehaviorAssociation_.

### Adding New Code Values and Maintenance of Deprecated Values for Selected Descriptors

[DATASTD-2277](https://edfi.atlassian.net/browse/DATASTD-2277)

There were 19 descriptors with over 110 code values that are marked as deprecated. In Ds v5.2 we moved those code values down to the suggested descriptor values list to be removed in the next data standard version. Also new code values for some existing descriptors (_AttendanceEventCategory_,_CharterApprovalAgencyType_,_CredentialType_, and _DiplomaType_) added to align with those in CEDS data model.

### Code maintenance related updates

[DATASTD-2181](https://edfi.atlassian.net/browse/DATASTD-2181): Removing the _CTEProgram_ from _StudentCTEProgramAssociation_

[DATASTD-2259](https://edfi.atlassian.net/browse/DATASTD-2259): Orphaned Data Elements Are Removed from the MetaEd Model Script

[DATASTD-2274](https://edfi.atlassian.net/browse/DATASTD-2274): Adding role name for _Program_ in _StudentSpecialEducationProgramEligibilityAssociation_

## List of All Changes

* [Assessment Registration](https://edfi.atlassian.net/browse/DATASTD-2268)
* [Student Section 504 Program Association](https://edfi.atlassian.net/browse/DATASTD-2297)
* [Add DualCredit to StudentSectionAssociation](https://edfi.atlassian.net/browse/DATASTD-2306)
* [Shortened School Days for IEP Students](https://edfi.atlassian.net/browse/DATASTD-2305)
* [Time variables definition updates](https://edfi.atlassian.net/browse/DATASTD-2272)
* [Student Behavior and Discipline](https://edfi.atlassian.net/browse/DATASTD-2195)
* [Update definition for Begin and EndDate Data Elements](https://edfi.atlassian.net/browse/DATASTD-2286)
* [Study and Suggest EndDate Definition Updates for Inclusivity](https://edfi.atlassian.net/browse/DATASTD-2280)
* [Revision of Descriptor Values in DS v5.x and DS v4.0 for Improvements](https://edfi.atlassian.net/browse/DATASTD-2277)
* [EDFacts Alignment](https://edfi.atlassian.net/browse/DATASTD-2256)
* [Adding restraintEvent optional reference to somewhere in the discipline collections](https://edfi.atlassian.net/browse/DATASTD-1994)
* [Remove CTEProgram common from the data model](https://edfi.atlassian.net/browse/DATASTD-2181)
* [Updates to some descriptor documentation](https://edfi.atlassian.net/browse/DATASTD-2185)
* [More detailed definition for SSA EntryDate](https://edfi.atlassian.net/browse/DATASTD-2232)
* [Update to definitions for selective Federal Student Program Associations](https://edfi.atlassian.net/browse/DATASTD-2248)
* [ProgramParticipation Common needs to be removed from the model](https://edfi.atlassian.net/browse/DATASTD-2251)
* [Removal of Orphaned Data Model Elements](https://edfi.atlassian.net/browse/DATASTD-2259)
* [Remove ExternalTerm and EdFi Prefix for AccountIdentifier, EdOrg, AccountName](https://edfi.atlassian.net/browse/DATASTD-2269)
* [StudentSpecialEducationEligibilityAssociation should have ProgramEducationOrganizationId](https://edfi.atlassian.net/browse/DATASTD-2274)
