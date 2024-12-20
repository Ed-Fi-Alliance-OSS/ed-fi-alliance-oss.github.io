---
sidebar_position: 1
---

# Assessment Registration Domain - Overview

## Key Entities

The key entities in the Assessment Registration domain are:

* An _AssessmentAdministration_ entity that is to store data for the administration
  of an assessment. It has references to AssigningEducationOrganization and
  Assessment entities, and tracks information relating to AdministrationIdentifier,
  AssessmentAdministrationPeriod and AssessmentBatteryPart entities in the domain.
* An _AssessmentAdministrationParticipation_ entity that is to identify the point
  of contact within the Educational Organization who takes role in the
  administration of the assessment. The entity has references to the
  AssessmentAdministration and ParticipatingEducationOrganization entities.
* A _StudentAssessmentRegistration_ entity that identifies a assessment registration
  where student is expected to participate in a particular assessment administration.
  The entity is to store information on the type of the platform the assessment will
  be delivered at, for what grade-level content student will be assessed, accommodation(s)
  a student will be provided at the assessment delivery and key-value pairs used for the
  customization of an assessment. The entity has references to AssessmentAdministration,
  TestingEducationOrganization, ReportingEducationOrganization and
  StudentEducationOrganizationAssessmentAccommodation entities, and
  StudentEducationOrganizationAssociation as well as StudentSchoolAssociation.
* An _AssessmentBatteryPart_ entity that defines the parts organized for administering
  the assessment for a comprehensive assessment of the student. It has reference to Assessment
  and the ObjectiveAssessment.
* A _StudentEducationOrganizationAssessmentAccommodation_ entity that is to store information
  on the accommodation(s) student is expected to receive during the delivery of the
  assessment as determined by the education organization. The entity has reference to
  EducationOrganization and Student.
* And a _StudentAssessmentRegistrationBatteryPartAssociation_ that is to store one to one
  relation between AssessmentBattery and StudentAssessmentRegistration.

## Key Concepts

The Assessment Registration domain defines the entities and associations to support
SEAs and LEAs register students to take an assessment and share student registration
data with the assessment vendor.  The domain addresses a variety of assessments where
there needs to be a protocol for education organization to communicate administration
and student registrations to the assessment vendor in a timely manner.

Key concepts of the domain are as follows.

**Assessment** refers to the wide variety of tests, methods or tools that educators use to
evaluate, measure, and document the academic readiness, learning progress, skill acquisition,
or educational needs of students.

The Ed-Fi Assessment domain defines the details for capturing the metadata about an
assessment and the students’ scores and results.  The Assessment Registration domain
addresses the administration of an assessment and the registration of students for
assessments developed by assessment vendors and administered to large populations of students.

**Assessment Administration** refers to the broad range of activities to procure, organize,
deliver, and score an assessment for a population of students.  Assessment administration
determines the population of target students; the assessment window dates when the assessment
will be delivered; the schools that will participate in delivering and proctoring the
assessment; computer availability and setup with the appropriate network connectivity and
security for online assessments; the logistics of registering students and communicating
registrations to the assessment vendor; range of assessment accommodations required for
special needs students; and the logistics of scoring and providing assessment results back to
the education organizations.

The **Education Organizations** involved in administering an assessment may vary with the
following roles defined:

* _Assigning Education Organization_ which is primarily responsible for administering an
  assessment.
* _Participating Education Organization_ which is secondarily involved in administering
  the assessment. For example, the SEA may be the assigning organization, and the LEAs may
  be the participating organizations.
* _Testing Education Organization_ delivers or proctors the assessment to students.
* _Reporting Education Organization_ identifies which education organization should receive
  the results of the assessment.

**Assessment Battery Part** is a module or grouping of assessment tests or questions for delivery
to students.  Assessment battery parts may be taken at different times, may be scored
separately or differently, may be taken by different sets of students, or may require
different assessment logistics or accommodations.

Assessment battery parts may be organized by subject, may be associated with the
ObjectiveAssessment metadata, or organized by other criteria.

**Assessment Accommodations** are changes in the way assessments are designed or delivered to
respond to the special needs of students with disabilities or English learners (EL) that
cannot effectively take regular assessments.  Assessment accommodations may vary depending
on the assessment battery part, for example, needing the use of a translator for ELA, or
use of a calculator for Mathematics.  Some special education students may need modifications
to the assessment to take an assessment.
