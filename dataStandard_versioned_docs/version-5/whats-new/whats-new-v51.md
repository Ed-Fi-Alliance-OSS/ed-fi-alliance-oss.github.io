# What's New - v5.1

## Overview

Data Standard version v5.1 is the first release of two releases Ed-Fi has planned to deliver in the year 2024. It is designed to deliver only non-breaking changes to the Ed-Fi Unifying Data Model (UDM) since it was decided earlier that 2024 would be the year for minor updates in the model. Even though the release introduces non-breaking changes to the model, it is not shy of introducing some major updates in the model. These major updates are adding Crisis Event that allows tracking data on displaced students within the Ed-Fi system due to an event that causes catastrophic impact and interruption on educational activities, adding Student Health to allow educational organizations to track students' immunization records as a part of their enrollment process, and adding Transportation to collect and track information on students' transfer between their residence to school building. The release also introduces some minor updates to the Ed-Fi UDM. Please proceed to the following sections for more details.

## Major Changes

### Crisis Event and Student

[DATASTD-2161](https://edfi.atlassian.net/browse/DATASTD-2161)

The Crisis Event model is designed to monitor students who have been displaced
due to crises like natural disasters or emergencies. The model collects accurate
data on these students post-crisis, which is essential for the distribution of
necessary funding, resources, and support to students and educational
organizations.

A publication by the National Center for Education Statistics (NCES)
(see: [_Forum Guide To Planning For, Collecting, And Managing Data About_](https://nces.ed.gov/pubs2019/NFES2019163.pdf)
[_Students Displaced By A Crisis_](https://nces.ed.gov/pubs2019/NFES2019163.pdf))
defines crisis and displaced student as following:

_Crisis:_ A natural or man-made event that causes the disruption of school-level
activities and the temporary or permanent displacement of students. This
definition does not distinguish between natural disasters and other types of
crises, such as acts of terrorism, as long as they temporarily or permanently
disrupt educational activities. This definition does not include events that
involve a single student or situations where a student is experiencing
difficulties such as mental, emotional, or psychological distress.

_Displaced Student:_ A student who was enrolled, or eligible for enrollment, but
has temporarily or permanently enrolled in another school or district because of
a crisis-related disruption in educational services.

Based on the parallels we have observed between these definitions of NCES and
use cases among the Ed-Fi community members, we have used them in our model
design. Our further observations about crisis event and displaced student is
that when a crisis event impacts students, the education agency, typically the
State Education Agency (SEA), determines the requirement to track students who
are displaced as a result and displaced students may be

(i) from another state and newly enrolled in a school,

(ii) within the state but enrolling in a new school,

(iii) or personally displaced but remaining in the same school.

#### Crisis Event Model Details

The CrisisEvent is a new entity created to store data for each identified crisis
that results in student displacement. The key for this entity is the
CrisisEventName, and it has a required descriptor called CrisisType. Optional
attributes of this entity include CrisisDescription, CrisisStartDate, and
CrisisEndDate. A record in the CrisisEvent is created once for every recognized
crisis. This CrisisEvent is associated with the record of DisplacedStudent.

Displaced Student is designed as a common and embedded in the
StudentEducationOrganizationAssociation in the Ed-Fi Unifying Data Model (UDM) as
an optional collection. The DisplacedStudent common captures essential
information about student displacement linked to the CrisisEvent through a key
reference. The common also includes the DisplacedStudentStatus descriptor as
required field while DisplacedStudentStartDate, DisplacedStudentEndDate, and
CrisisHomelessnessIndicator are designed as optional fields. A record in the
DisplacedStudent entity is created when a displaced student is enrolled,
typically when the StudentEducationOrganizationAssociation is written.

The UML diagram illustrates this model, showing the CrisisEvent entity and the
DisplacedStudent common.

![Crisis Event](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/v51/Crisis_Event_202405_NoCommon-large.webp)

#### Best Practices in Using Crisis Event

SEAs should formulate policies to determine which crisis events need tracking of
displaced students. These policies could be activated by various triggers such
as a FEMA disaster declaration, a governor’s disaster declaration, tribal
declarations, or other criteria. Once a crisis is identified, a record should be
created in the CrisisEvent entity, with a unique key of CrisisEventName. It’s
critical to establish a naming convention to ensure the uniqueness of this
name. If there is no generally accepted name for this crisis event, a suggested
convention by Ed-Fi Alliance is “\_Location+Crisis\_Type+Year\_”.

Quick access to the educational records of students displaced due to crises is
vital for ensuring their educational continuity and the fidelity of their
educational data. If these students are displaced within the same state, their
enrollment records in the statewide Ed-Fi implementation can be used to provide
their data to the new schools. This facilitates a smoother transition for the
students during such challenging times.

Students displaced from other states present further complications. Initially,
these students will have a unique student ID from their original state, which
may not be recognized in the new state they’ve moved to. Therefore, a student
displaced from another state will need to be assigned a new unique student ID in
their new state. The student’s identifier from their original state should be
documented in the common
StudentEducationOrganizationAssociation.StudentIdentificationCode. Special
measures will be required to retrieve the student’s records from their previous
school in the other state for inclusion in the Student Information System (SIS)
and the Ed-Fi.

It’s essential for SEAs to implement consistent data policies that ensure the
continuity and accuracy of the data that relates to displaced students if they
transition between schools. With the consistent application of the Crisis Event
model, the Ed-Fi can offer a robust platform for accurate
tracking. Additionally, policies need to be established to define when a
student’s status changes from being temporarily “displaced” to permanently
“relocated”. While they are optional, using the DisplacedStudentBeginDate and
DisplacedStudentEndDate can significantly improve the accuracy of tracking.

Crisis Event is part of the [Enrollment Domain](../model-reference/enrollment-domain/readme.md).

### Student Health

[DATASTD-2157](https://edfi.atlassian.net/browse/DATASTD-2157)

The purpose of the Ed-Fi Student Health domain is to have local educational
agencies have a secure place to keep the record of student health related data
such as immunization that has been used by educational organizations in their
enrollment process. Therefore, this initial Student Health data model has been
primarily designed for handling student immunization records based on the
request we received from the community members.

#### Immunization Concepts

Out of concerns for public health, all U.S states, the District of Columbia, and
U.S. territories have requirements for the immunization of children as a
condition for attending public school and childcare. These vaccination
requirements are not only important tools for maintaining high vaccination
coverage and low rates of vaccine-preventable diseases, but also part of
enrollment process. It is our observation that medical or non-medical exemptions
from vaccination requirements may be allowed. These requirements and permitted
exemptions vary by state.

Student immunization records can be created and modified by state immunization
registry, local health department, doctor office of students or nurses at
school. These records may then be stored in Electronic Health Records (EHR)
systems, Environment, Health, and Safety (EHS) management applications, Student
Information Systems (SIS), or other application systems securely.

#### Student Health Model Details

A new entity StudentHealth is defined to enable separate access control in the
Ed-Fi API claimsets suitable for health data according to policy. The entity has
the Student and EducationOrganization as part of the key. he
EducationOrganization that is referenced should correspond to the level of the
organization (such as SEA, LEA, School) that holds the responsibility for
maintaining the student health data securely.

Because the content of the StudentHealth entity is cumulatively historical, the
required AsOfDate is not a key, but is used to reflect the date the record was
last updated.

The data model UML diagram is shown below.

![Student Health](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/v51/StudentHealth-UML.webp)

The StudentHealth entity organizes immunization records with the following
attributes:

* RequiredImmunization common – optional collection consisting of attributes:
  * ImmunizationType descriptor
  * ImmunizationDate optional collection
  * MedicalExemption string optional
  * MedicalExemptionDate optional
* AdditionalImmunization common – optional collection consisting of
    attributes:
  * ImmunizationName string
  * ImmunizationDate optional collection
* NonMedicalImmunizationExemption descriptor optional
* NonMedicalImmunizationExemptionDate optional

The RequiredImmunization set are meant to be those that are specifically tracked
against a controlled list (i.e., the ImmunizationType descriptor set). The
semantics are not meant to infer that the student has all the required
immunizations (which often vary by age) – but to provide the raw data to allow
that determination during reporting if desired. The education organization may
include immunizations in the ImmunizationType that may not be explicitly
required but are desired to be tracked with the controlled vocabulary of the
descriptor.

The AdditionalImmunization set are not controlled by a descriptor set (just an
ImmunizationName string) and are meant to capture any others not part of the
controlled list ImmunizationType.

For both the RequiredImmunization and AdditionalImmunization, the attribute
ImmunizationDate is a collection to support multiple doses of the immunization
that were received.

The data model supports recording of both a MedicalExemption and a
NonMedicalImmunizationExemption.

The MedicalExemption is part of the RequiredImmunization common since medical
exemptions are typically offered against specific immunizations. The
MedicalExemptionDate is used to reflect that date it was granted by a doctor.

The NonMedicalImmunizationExemption is an attribute of StudentHealth to support
“blanket” exemptions for all immunizations. The
NonMedicalImmunizationExemptionDate is used to reflect the date the exemption
was claimed by the parent or guardian. If the nonmedical exemption only applies
to some immunizations, data for those immunizations received (and thus without
exemption) should be provided in the RequiredImmunization set. The semantics in
this case would be that the nonmedical exemption applies to those not received.

#### Best Practices in Using Student Health for Immunization Data Recording

When obtaining immunization data, it is important to factor in correlating the
student with the StudentUniqueId. Depending on the source, this may be
accomplished in a number of ways:

* Synchronizing rosters with source systems to store the StudentUniqueId.
* Use of matching algorithm to correlate incoming data with personally
    identifiable information to the StudentUniqueId.
* Use of manual methods (the least attractive option) to looking student
    identities.

The SEAs should adjust the descriptor sets, ImmunizationType and
NonMedicalImmunizationExemption, if necessary, according to the immunization
policies and laws in their state.

Interfaces may need to be built to new systems that contain student immunization
data to bring data into the Ed-Fi. Depending on the use of the immunization
data, the frequency of update needs to be determined.

The access control for the StudentHealth entity should be carefully considered
with respect to what system will write the data, what systems may access the
data, and what user roles may read the data. SEA and LEA policies may have
special provisions for accessing student health data.

As SEAs or LEAs wish to bring additional student health data into the Ed-Fi
model, the recommendation is to work with the Ed-Fi Alliance to extend the
StudentHealth entity.

For more information, see the [Student Health Domain](../model-reference/student-health-domain/readme.md).

### Student Transportation

[DATASTD-2168](https://edfi.atlassian.net/browse/DATASTD-2168)

Public school districts provide transportation to students based upon distance
of the home from school, as well as students with disabilities, and when such
transportation is necessary to provide appropriate educational opportunities
that would otherwise not be available. The purpose of the Ed-Fi Student
Transportation data model is to support the collection of:

* Eligibility for transportation to and from school at public expense,
* Student assignment to buses and bus routes,
* Distance transported.

The model does not cover information for fleet inventory and management, service
level management, real-time tracking, or tracking of daily ridership.

#### Student Transportation Concept

There are no Federal requirements for school districts to transport students to
and from school. As a result, student transportation services are specific to
the state, and may be specific to the specific district. The eligibility for a
student to receive transportation services according to the criteria of the
state and the district are typically determined at enrollment time (or
pre-enrollments of they are used). Depending on the location(s) for pickup and
drop-off, the student is assigned to a bus and bus route. The eligibility and
bus route information for a student is typically captured in an automated
system, such as:

* Bus routing and planning software,
* Student information system with a transportation module,
* Other application or web site

From these systems, the student transportation data will flow into the Ed-Fi.
Depending on the source system, new API or batch interfaces may need to be
developed.

#### Student Transportation Model Details

The Student Transportation data model provides for recording the eligibility of
students for transportation at public expense and details about the student’s
bus and bus route assignments.
A new StudentTransportation entity is defined to enable separate access control
in the Ed-Fi API claim sets from the source system of record. The
StudentTransportation entity has the following key:

* Student reference
* TransporationEducationOrganization reference

The latter reference is to the EducationOrganization responsible for managing
the student’s transportation arrangements.

The StudentTransportation entity has the following optional attributes:

* TransportationPublicExpenseEligibilityType descriptor,
* TransportationType descriptor,
* SpecialAccomodationRequirements string,
* StudentBusDetails multi-valued common with attributes:
  * BusNumber string,
  * BusRoute descriptor,
  * TravelDayofWeek descriptor,
  * TravelDirection descriptor,
  * Mileage decimal

The design of the StudentBusDetails common is meant to accommodate complex
transportation arrangements that may vary depending on whether the student is
going to or from school, and may differ by the day of the week.
The data model UML diagram is shown below, shown with its multi-valued common.

![Student Transportation](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/v51/Student%20_Transportation_202405_NoCommon.webp)

#### Best Practices in Using Student Transportation

When collecting student transportation data, it is critical to link the student
with their StudentUniqueId if the data is not sourced from the Student
Information System (SIS).

The SEAs should adjust the descriptor sets for
TransportationPublicExpenseEligibilityType according to the policies of the
state and local education agencies. The descriptors TransportationType,
TravelDayofWeek, and TravelDirection descriptors should be adjusted, as
necessary. Values for the BusRoute descriptor will need to be loaded.

Interfaces may need to be built to new systems that contain student
transportation data to bring data into the Ed-Fi. Depending on the use of the i
student transportation data, the frequency of update needs to be determined.
Access control to the StudentTransportation entity should support the use of
these interfaces.

Student Transportation is included in the [Enrollment Domain](../model-reference/enrollment-domain/readme.md).

## Minor Changes

### Race and Ethnicity Updates

  [DATASTD-2189](https://edfi.atlassian.net/browse/DATASTD-2189) - Getting issue
  details... STATUS

In late March 2024, the Office of Management and Budget
([OMB](https://www.whitehouse.gov/omb/)) released [updates to the Statistical](https://www.federalregister.gov/documents/2024/03/29/2024-06469/revisions-to-ombs-statistical-policy-directive-no-15-standards-for-maintaining-collecting-and)
[Policy Directive No.](https://www.federalregister.gov/documents/2024/03/29/2024-06469/revisions-to-ombs-statistical-policy-directive-no-15-standards-for-maintaining-collecting-and)
[15](https://www.federalregister.gov/documents/2024/03/29/2024-06469/revisions-to-ombs-statistical-policy-directive-no-15-standards-for-maintaining-collecting-and),
which sets the standards for collecting, maintaining, and presenting federal
data on race and ethnicity. This is the first revision since 1997.

The revision concluded with two main recommendations that concern Ed-Fi
community members' data collection.

* Using one combined question for race and ethnicity, and encouraging
    respondents to select as many options as apply.
* Considering Middle Eastern or North African as a new race and ethnicity
    group.

OMB requests compliance with these definition in applications by March 2029.

With these guidance Ed-Fi marked the _HispanicLatinoEthnicity_ boolean as
deprecated to be removed in 2029. The recommended descriptor values for the
_Race_ in the sample data have also been updated to include "Hispanic or Latino"
and "Middle Eastern or North African" as two new options for the descriptor.

### Removing Unnecessary min Length Requirements

[DATASTD-2177](https://edfi.atlassian.net/browse/DATASTD-2177)

Ed-Fi ODS/API has not enforced minimum requirements for string data type for
versions released before the Ed-Fi ODS/API v7. Now it is enforced with new
releases. Moreover, Data Standard releases and ODS/API releases have been
decoupled since 2023 stable releases. This means that this specific case of
optional string validation had a potential to cause disruption in vendor
implementations. To prevent such disruption, Data Standard team decided to
remove unnecessary minimum length requirements (more specifically min length =
1).

### MetaEd and UML Alignment for UDM Representation

[DATASTD-2170](https://edfi.atlassian.net/browse/DATASTD-2170)

## List of All Changes

* [Change Namespace from 5.0.0 to 5.1 in TPDM](https://edfi.atlassian.net/browse/DATASTD-2229)
* [MetaEd QA Process for version 4.4](https://edfi.atlassian.net/browse/DATASTD-2214)
* [Create Best Practices Document for Transportation in Enrollment Domain](https://edfi.atlassian.net/browse/DATASTD-2211)
* [Create Best Practices Document for Student Health Domain](https://edfi.atlassian.net/browse/DATASTD-2210)
* [Create Best Practices Document for Crisis Event in Enrollment Domain](https://edfi.atlassian.net/browse/DATASTD-2209)
* [Data Standard v5.1 Release Punchlist](https://edfi.atlassian.net/browse/DATASTD-2198)
* [Switch XSD and Sample Data namespaces to 5.1.0](https://edfi.atlassian.net/browse/DATASTD-2196)
* [Create Sample Data for Student Health](https://edfi.atlassian.net/browse/DATASTD-2190)
* [Create the UML Diagram for CrisisEvent](https://edfi.atlassian.net/browse/DATASTD-2186)
* [Create Transportation Domain and Student Transportation Entity](https://edfi.atlassian.net/browse/DATASTD-2182)
* [2024 Federal updates to race and ethnicity](https://edfi.atlassian.net/browse/DATASTD-2180)
* [Removing the "Min Length 1" Requirements](https://edfi.atlassian.net/browse/DATASTD-2177)
* [Verify that MetaEd domains for the Ed-Fi-Model match domain expectations](https://edfi.atlassian.net/browse/DATASTD-2170)
* [Review of Current Usages of Transportation by Community Members](https://edfi.atlassian.net/browse/DATASTD-2169)
* [Create Crisis Event Entity](https://edfi.atlassian.net/browse/DATASTD-2165)
* [Ed-Fi Extension of Model to support Immunizations](https://edfi.atlassian.net/browse/DATASTD-2064)
