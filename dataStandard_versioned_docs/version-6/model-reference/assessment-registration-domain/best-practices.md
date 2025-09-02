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
entered into the Ed-Fi API prior to writing the domain entities and
associations, as follows:

* Yearly API setup. The best practice convention instantiates a separate
  API for each school year. This means that assessment registration entities
  and associations must be written into the appropriate API for the school year.
* EducationOrganizations, minimally Schools, LocalEducationAgency(s) and
  StateEducationAgency(s), need to be created for the scope of the API.
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

## Using the Assessment Registration Domain

### Education Organizations for Assessment Administration

The Assessment Registration domain is designed to provide flexibility for a variety
of assessment use cases where there is a need to communicate the information about
registered students and their characteristics that will be taking the assessment to
the assessment vendor.

The domain can be used for assessments administered by a
StateEducationalAgency, an EducationServiceCenter, a LocalEducationAgency, or a School.

Much of the flexibility is provided by identifying the different roles of
EducationOrganizations as follows:

| Education Organization | Specified in Entity | Definition of Role |
| --- | --- | --- |
| AssigningEducationOrganization | AssessmentAdministration | The organization that contracts and administers the assessment. |
| ParticipatingEducationOrganization | AssessmentAdministration Participation | Lower-level organizations that will be participating in the assessment, For example for with an SEA as the “assigning” organization, the LEAs would be “participating” in this administration of the assessment. |
| TestingEducationOrganization | StudentAssessmentRegistration | The organization where the student will be taking the assessment, often a school. This school may be different from the school the student is enrolled in. |
| ReportingEducationOrganization | StudentAssessmentRegistration | The organization where the results of the assessment will be reported, typically the School (or its LEA) where the student is enrolled. |

### Use of Battery Parts

Assessments are often organized into modules that are separately scored, often
by subject area. The different modules are indicated as ObjectiveAssessments as
part of the Assessment Domain.

The use of the AssessmentBatteryPart entity denotes the organization of parts for
delivery to students, specifically where:

* Different students may take different battery parts of the assessment.
* Students may require different accommodation(s) for different batter parts.
Some things to note on usage:
* An assessment may or may not have AssessmentBatteryParts
* AssessmentBatteryPart may or may not be aligned with the ObjectiveAssessments.
  AssessmentBatteryPart.ObjectiveAssessment is used to map the relationship, if
  it exists.
* AssessmentBatteryParts may or may not be scored separately.

### Specifying and Communicating Student Accommodations

The accommodations actually provided to a student for an assessment is reported
after the fact in the StudentAssessment.Accommodation.  The determination of
what accommodations a student should receive are addressed in the Assessment
Registration domain.

The Assessment Registration use case requires that the education organization
provides information to the assessment vendor as to what accommodation(s) to
provide or organize through the proctor.  To address this flexibly, there are
three (optional) mechanisms defined, as shown in the table below.  Any or all
of these options may be used as needed.

| Attribute | When to Write | Definition |
|---|---|---|
| StudentEducationOrganizationAssessmentAccommodation. GeneralAccommodation | At student school registration or when determined by a program (e.g., special education or language instruction). | Indicates what assessment accommodations the student should generally receive for all assessments |
| StudentAssessmentRegistration.AssessmentAccommodation | Upon student registration for the assessment. | Indicates the accommodations the student should receive for this particular assessment. |
| StudentAssessmentRegistrationBatteryPartAssociation. Accommodation | Upon student registration for the assessment. Used on when the accommodations may differ by battery part. | Indicates the accommodations the student should receive for each battery part. |

## Assessment Registration Best Practices

The following best practices are organized by entity and association in the
Assessment Registration domain.

### AssessmentAdministration

The AssessmentAdministration entity captures the anticipated administration
of an assessment under the purview of an EducationOrganization.  The
following table summarizes the best practice use of the AssessmentAdministration
attributes.

| Required | Must Have | Recommended | As Needed |
|---|---|---|---|
|AssigningEducationOrganization (key) <br/> Assessment (key) <br/>  AdministrationIdentifier (key) | AssessmentAdministration <br/> Period |  | AssessmentBatteryPart |

:::note Keys in reading the table and following ones:

* _Required_ attributes in Ed-Fi are hard constraints, meaning that a record or
    API payload will be rejected if the attribute is not present. These
    necessarily include key values.
* _Must Have_ attributes are those whose intended use of the entity requires
    them to be used, even if, upon creation, they may not be present.
* _Recommended_ attributes are those whose best practices encourage their use.
* _As Needed_ attributes are those that should be used when appropriate, based
    upon policy.
:::

<br/>
Best practices for the use of AssessmentAdministration and its attributes

:::info

* An Assessment may have zero or more AssessmentAdministrations for a
  school year.
* Different AssessmentAdministrations for the same Assessment typically do
  not have overlapping AssessmentAdministration.Periods – but may in
  circumstances where there are different AssessmentAdministrationParticipation.
  ParticipatingEducationOrganizations or where different student populations
  are targeted.
* The AssessmentAdministration.AssigningEducationOrganization should reflect
  that organization that has responsibility for the entire scope of the
  assessment registration including management of the assessment vendor.
* If, at the time of defining an assessment administration with the assessment
  vendor, the assessment meta data (specifically the Assessment entity) has not
  been written, create the Assessment for reference by the AssessmentAdministration.
* If the assessment administration will involve the selective delivery of
  assessment battery parts, create the AssessmentBatteryParts for reference by
  the AssessmentAdministration.

::::

### AssessmentAdministrationParticipation

The AssessmentAdministrationParticipation entity indicates the planned
participation of an EducationOrganization in the administration of an assessment.
The following table summarizes the best practice use of the
AssessmentAdministrationParticipation attributes.

| Required | Must Have | Recommended | As Needed |
|---|---|---|---|
| AssessmentAdministration (key) <br/> ParticipatingEducationOrganization (key) |  | AdministrationContact |  |

<br/>

Best practices for the use of AssessmentAdministrationParticipation and its attributes
:::info

* Use the AssessmentRegistrationParticipation entity to communicate the participating
  education organizations and their contacts to the assessment vendor, if required.
* The AssessmentRegistrationParticipation.ParticipatingEducationOrganization is
  typically a sub-organization of the AssessmentAdministration.AssigningEducationOrganization,
  for example a LocalEducationAgency as a participating sub-organization of the
  StateEducationAgency.

:::

### StudentAssessmentRegistration

The StudentAssessmentRegistration entity reflects the registration that indicates the
student is expected to participate in a particular assessment administration. The
following table summarizes the best practice use of the StudentAssessmentRegistration
attributes.

| Required | Must Have | Recommended | As Needed |
|---|---|---|---|
| AssessmentAdministration (key) <br/> StudentEducationOrganization Association (key) <br/> StudentSchoolAssociation | TestingEducationOrganization <br/> ReportingEducationOrganization | AssessmentAccommodation <br/> PlatformType <br/> AssessmentGradeLevel | StudentEducationOrganizationAssessmentAccommodation <br/> AssessmentCustomization |

<br/>

Best practices for the use of StudentAssessmentRegistration and its attributes
:::info

* A StudentAssessmentRegistration is not required for the results of the Assessment to
  be reported in StudentAssessment.
* Every student reflected in the StudentAssessmentRegistration should have a corresponding
  StudentAssessment, even if the student was not tested.
* The StudentAssessmentRegistration.ReportingEducationOrganization is typically the School,
  or its LEA, where the student is enrolled.
* Use the StudentAssessmentRegistration.AssessmentAccommodation to communicate to the
  assessment vendor the accommodations required for the student for the entire assessment.
* Use the StudentAssessmentRegistration.AssessmentCustomization to communicate to the
  assessment vendor additional data about the student and/or details of the student’s
  registration that is not available from other entities in the API.

:::

### AssessmentBatteryPart

The AssessmentBatteryPart entity denotes parts that are organized for administering an
assessment which, together, provide a comprehensive assessment of the students. The
following table summarizes the best practice use of the AssessmentBatteryPart attributes.

| Required | Must Have | Recommended | As Needed |
|---|---|---|---|
| Assessment (key) <br/> AssessmentBatteryPart (key) |  | ObjectiveAssessment |  |

<br/>

Best practices for the use of AssessmentBatteryPart and its attributes
:::info

* Use the AssessmentBatteryPart when
  1) students are selectively delivered different assessment battery parts, or
  2) students may receive different accommodations for different assessment battery parts.
* An Assessment may have zero or more AssessmentBatteryParts.
* If AssessmentBatteryParts are defined, reference the ObjectiveAssessments that
  they are mapped to when aligned.

:::

### StudentAssessmentRegistrationBatteryPartAssociation

The StudentAssessmentRegistrationBatteryPartAssociation indicates the battery part(s) of
the assessment that the student is to be tested for this administration of the assessment.
The following table summarizes the best practice use of the
StudentAssessmentRegistrationBatteryPartAssociation attributes.

 Required | Must Have | Recommended | As Needed |
|---|---|---|---|
| StudentAssessmentRegistration (key) <br/> AssessmentBatteryPart (key) |  | Accommodation |  |

<br/>

:::info

* Use the StudentAssessmentRegistrationBatteryPartAssociation when
  1) the student is selectively delivered certain assessment battery parts;
  2) the student should receive different accommodations for different assessment battery parts.

:::

### StudentEducationOrganizationAssessmentAccommodation

The StudentEducationOrganizationAssessmentAccommodation entity specifies the
accommodation(s) required or expected for administering assessments as determined by the
education organization.  This is typically written by the SIS (or alternatively supporting
applications for ELL or special education) to indicate what assessment accommodations the
student should generally receive for assessments.  The following table summarizes the best
practice use of the StudentEducationOrganizationAssessmentAccommodation attributes.

 Required | Must Have | Recommended | As Needed |
|---|---|---|---|
| EducationOrganization (key) <br/> Student (key) | GeneralAccommodation |  |  |

<br/>

:::info

* Use the StudentEducationOrganizationAssessmentAccommodation to record the general
  accommodations that the student should be afforded for all assessments.
* The StudentEducationOrganizationAssessmentAccommodation.EducationOrganization is
  typically the same as the corresponding StudentEducationOrganizationAssociation.EducationOrganization
  that is written during enrollment

:::
