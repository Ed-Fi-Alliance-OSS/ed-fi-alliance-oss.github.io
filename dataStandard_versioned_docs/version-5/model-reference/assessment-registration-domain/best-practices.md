---
sidebar_position: 4
---

# Assessment Registration Domain - Best Practices

## Definitions and Key Concepts

Assessment encompasses a broad range of tests, methods, and tools that educators
utilize to evaluate, measure, and document students' academic readiness,
learning progress, skill acquisition, or educational needs. The Assessment
domain in Ed-Fi UDM specifies the details for capturing metadata about an
assessment, including students' scores and results. The Assessment Registration
domain introduced in this version focuses on the administration of assessments
and the registration of students for assessments created by vendors.

_Assessment Administration_ is to refer a wide range of activities involved in
procuring, organizing, delivering, and scoring assessments for a student
population. It includes

* identifying the target student group,
* setting the assessment window dates,
* selecting participating schools for delivery and proctoring,
* ensuring the availability, functionality and security of technologies used
  for assessment delivery,
* managing student registration logistics and communication with the assessment vendor,
* accommodating special needs of students,
* handling the logistics of scoring and returning assessment results to educational
  organizations.

Education organizations involved in the assessment administration may have different
roles as assigning, participating, testing, and reporting.

An _Assessment Battery Part_ is a module or collection of assessment tests or
questions designed for student delivery that can be administered at different times,
scored separately or differently, taken by various groups of students, or require
distinct logistics or accommodations.

_Assessment Accommodations_ entail altering the design or delivery of assessments
to cater to the needs of students with disabilities or English learners (EL) who
cannot effectively take standard assessments. These accommodations can differ
depending on the assessment part, such as using a translator for ELA or a calculator
for Mathematics. Some special education students may need additional modifications
to participate in assessments.

Use cases Ed-Fi has discussed with the community members revealed that a typical
process of assessment registration in the field has following steps

* Education organizations collaborate with the assessment vendor to determine the
  time frame and guidelines for administering an assessment.
* The specifics of assessment participation and delivery are outlined.
* Students are registered for the administration of the assessment.
* The assessment vendor receives the registration list of students along with
  selected student information.

## Assessment Registration Use Case

The Assessment Registration domain facilitates the use case of supporting the
communication between education organizations and assessment vendors associated
with the administration of an assessment. While the details of the use case
may vary, the general flow of the use case is depicted below. By providing a
real-time API, Ed-Fi enables the automation of, what was previously, a
largely-manual and time-consuming process. The image below depicts a
high-level use case of assessment registration.

![Assessment Registration Use Case](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/v52/ModelReference_AssessmentRegistration_DSv52.jpg)

The following table depicts a typical assessment registration protocol
associated with the administration of a state assessment with the details the
entities and associations that will be used in the process.

| Process Step # | Acting Agent | Reads<br/> or<br/> Writes | Entity or Association Used |
| --- | --- | --- | --- |
| **0.** (Previously) Students are enrolled in a school | LEA's SIS | Writes |  Student<br/>  StudentSchoolAssociation<br/> StudentEducationOrganizationAssociation<br/> StudentEducationOrganizationAssessmentAccommodation<br/>|
| **1.** SEA works with assessment vendor to establish a test window for the assessment and the participating schools | SEA | Writes | Assessment<br/> AssessmentBatteryPart (if needed)<br/> AssessmentAdministration<br/> AssessmentAdministrationParticipation<br/> |
| **2.** (Optionally) If students will be registered by the LEA SIS, the SIS reads the assessment administration data | LEA's SIS | Reads | Assessment<br/> AssessmentBatteryPart (if needed)<br/> AssessmentAdministration<br/> AssessmentAdministrationParticipation<br/> |
| **3.** Students are registered for the assessment administration either by the SEA or the individual LEAs; updates will be made until just before the assessment window. | SEA<br/> or<br/> LEA’s SIS | Writes | StudentAssessmentRegistration<br/> StudentAssessmentRegistrationBattery<br/> PartAssociation (if needed)<br/> |
| **4.** As the test window approaches, the assessment vendor retrieves the information about the students registered for the assessment; updates will be retrieved until just before the test window | Assessment Vendor | Reads | Assessment<br/> AssessmentBatteryPart<br/> AssessmentAdministration<br/> AssessmentAdministrationParticipation<br/> StudentAssessmentRegistration<br/> StudentAssessmentRegistrationBattery PartAssociation<br/> Student<br/> StudentSchoolAssociation<br/> StudentEducationOrganizationAssociation<br/> StudentEducationOrganizationAssessment Accommodation<br/> |
| **5.** After the students take the assessment, the assessment vendor writes the assessment metadata and assessment results. | Assessment Vendor | Writes | Assessment<br/> ObjectiveAssessment<br/> AssessmentItem<br/> StudentAssessment<br/> |

## Prerequisites for Writing Assessment Registration Domain Entities

The Assessment Registration domain has dependencies on other data that should be
entered into the Ed-Fi API/ODS prior to writing the domain entities and
associations, as follows:

* Yearly API/ODS setup. The best practice convention instantiates a separate
  API/ODS for each school year. This means that assessment registration entities
  and associations must be written into the appropriate API/ODS for the school year.
* EducationOrganizations, minimally Schools, LocalEducationAgency(s) and
  StateEducationAgency(s), need to be created for the scope of the ODS.
* The assessment registration domain is dependent on certain attributes of entities
  and associations in the Student Identification and Demographics domain and the
  Enrollment domain, as follows:
  * _Student_
    * StudentUniqueId (key)
    * Name.FirstName
    * Name.LastNameSurname
    * BirthData.BirthDate
  * _StudentSchoolAssociation_
    * Student reference (key)
    * School reference (key)
    * EntryDate
    * EntryGradeLevel
    * ExitWithdrawDate
    * PrimarySchool
  * _StudentEducationOrganization_
    * Student reference (key)
    * EducationOrganization reference (key)
    * Address
    * ElectronicMail
    * Race
    * Sex
    * StudentIdentificationCode
* The Assessment Registration domain is dependent on certain attributes of
  entities and associations in the Assessment domain as follows
  * _Assessment_
    * AssessmentIdentifier (key)
    * Namespace (key)
    * AssessmentTitle
    * AcademicSubject
    * AssessedGradeLevel
  * ObjectiveAssessment
    * IdentificationCode (key)
    * Assessment reference (key)
* Descriptor values need to be loaded. The Assessment Registration domain
  has dependency on several sets of descriptors, as follows
  * GradeLevel descriptor referenced in
    StudentAssessmentRegistration.AssessmentGradeLevel
  * Accommodation descriptor, referenced in the following:
    * StudentEducationOrganizationAssessmentAccommodation.GeneralAccommodation
    * StudentAssessmentRegistration.AssessmentAccommodation
    * StudentAssessmentRegistrationBatteryPartAssociation.Accommodation
  * PlatformType descriptor referenced in StudentAssessmentRegistration.PlatformType
* Since the AssessmentRegistration is designed to support an interoperability
  protocol between education organizations and the assessment vendor, it is
  important that the assessment vendor is provided the necessary access as follows:
  * Namespace based access (using Assessment.Namespace) is used to assign
    create/read/write/delete access via the assessment vendor’s claim set to
    manage the various endpoints for assessment metadata and the students’ results.
  * The Assessment Registration requires assessment vendors to read student
    data from the entities Student, StudentSchoolAssociation,
    StudentEducationOrganizationAssociation, and
    StudentEducationOrganizationAssessmentAccommodation. The necessary access is
    accomplished by providing read access to these endpoints via
    relationship-based authorization by assigning the EducationOrganization spanning
    the scope of the students to the assessment vendor's claim.  This is typically
    the AssessmentAdministration.AssigningEducationOrganization
