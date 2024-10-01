# Student Information Systems API v5 Certification - Test Scenarios

## Test Scenarios

* * *

### Local Descriptor Guidance

The Alliance recommendation is to source descriptor values from the list
governed by the project’s reporting context and place them in a namespace that
accurately captures that governing organization. Descriptor values shown in the
certification’s test scenarios use the Ed-Fi namespace for informational
purposes. Descriptor namespace should clearly indicate the organization that
governs the value.

### Transactional Test Cases

The certifying product is required to demonstrate the ability to perform all of
the test cases for API resources listed below under **Required API Resources.**

"Transactionally" means that API resource transactions / synchronization MUST
occur as changes are made during normal product usage. It is acceptable for
product to batch updates, but such batches MUST occur such that changes are
near-real time. See [Requirements - Testing
Requirements](../../../2-certification-requirements-for-data-providers/requirements-testing-requirements.md) for
more information.

### Batch Test Cases

Batch testing is intended to validate the ability of a system to perform an
initial synchronization with the API, rather than perform transactional
management. In field work, it is common for an agency or vendor to implement an
API surface during the school year when a lot of data already exists in the
system, and SIS systems must then synchronize existing data. This test validates
a product's ability to perform such an operation.

The system must demonstrate the ability to synchronize the state of the system
as a batch operation, by using the API resources in the chart below. The batch
test only tests the creation of API resources, and does not include update or
delete operations.

### Error Handling

The API client MUST be able to perform the following actions:

- Capture and log transport errors, including all applicable HTTP errors.

- Demonstrate the capability for re-delivery of API resources updates
    following failed transmissions. This re-delivery does not have to be
    immediate and it can require user intervention (e.g., surface an error to a
    user and ask the user if they want to retry).

- In the event that repeated delivery fails for the same resource update,
    surface error reports to a system user.

Field work within the Ed-Fi community has revealed that this application
behavior is a necessary condition of system interoperability.

Accordingly, the test scenarios may include situations in which an API resource
(or resources) will be made unavailable to the client, or in which the API
reports other errors due to resource availability (e.g., HTTP 500 error). The
client is expected to be able to handle successfully such situations.

### Enumeration Configuration

The API client MUST demonstrate the ability to download descriptors from the API
and allow mapping of local enumeration values (code sets) to those descriptors.
This capability MUST exist in order to allow a API host to customize code
sets/values, and it MUST exist for all descriptors included across all resources
in the API.

# Required API Resources

* * *

For each API resource field, the test cases and the required/optional status of
each field is provided in a tabular form, along with the sample data to be used
in testing. Use of the sample data is RECOMMENDED; other data MAY be used, but
the data MUST NOT be real or even derived from real data.

For each API resource element, the requirement status is marked as follows:

- **REQUIRED**: the element must be supplied. Note that the [Requirements -
    Testing
    Requirements](../../../2-certification-requirements-for-data-providers/requirements-testing-requirements.md)
    lists permitted workarounds for many cases where the element may be missing
    in the source system.

- **CONDITIONAL**: the element is required IF AND ONLY IF a standard
    installation of the product has this element. Providers not providing these
    elements will be required to submit proof that these elements are not
    present by default in their systems.

- **OPTIONAL**: these elements are optional.

Note that for some test cases additional data requirements are listed. This is
the case (for example) in some places where there are multiple common ways that
the same data concept is modeled.

| **Ed-Fi ODS / API Resource** | **Operations** |
| --- | --- |
| [School](./v5-education-organization-school-scenarios.md) | Create, Update |
| [Course](./v5-education-organization-course-scenarios.md) | Create, Update |
| [Program](./v5-education-organization-program-scenarios.md) | Create, Delete |
| [ClassPeriod](./v5-education-organization-class-period-scenarios.md) | Create, Update |
| [Location](./v5-education-organization-location-scenarios.md) | Create, Update |
| [Calendar](./v5-education-organization-calendar-calendar-scenarios.md) | Create, Update |
| [CalendarDate](./v5-education-organization-calendar-calendardate-scenarios.md) | Create, Update |
| [BellSchedule](./v5-masterschedule-bellschedule-scenarios.md) | Create, Update |
| [GradingPeriod](./v5-education-organization-calendar-grading-periods-scenarios.md) | Create, Update |
| [Session](./v5-education-organization-calendar-sessions-scenarios.md) | Create, Update |
| [Course Offering](./v5-masterschedule-courseoffering-scenarios.md) | Create, Update |
| [Section](./v5-masterschedule-section-scenarios.md) | Create, Update |
| [Staff](./v5-staffassociation-staff-scenarios.md) | Create, Update |
| [StaffEducationOrganizationAssignmentAssociation](./v5-staffassociation-staffeducationorganizationassignmentassociation-scenarios.md) | Create, Update |
| [StaffSchoolAssociation](./v5-staffassociation-staffschoolassociation-scenarios.md) | Create, Delete |
| [StaffSectionAssociation](./v5-staffassociation-staffsectionassociation-scenarios.md) | Create, Update, Delete |
| [Student](./v5-student-student-scenarios.md)\*\* | Create, Update |
| [GraduationPlan](./v5-student-enrollment-graduation-plan-scenarios.md) | Create, Update |
| [StudentSchoolAssociation](./v5-student-enrollment-studentschoolassociation-scenarios.md) | Create, Update, Delete |
| [StudentEducationOrganizationAssociation](./v5-student-enrollment-studentedorgassociation-scenarios.md) | Create, Update |
| [StudentSectionAssociation](./v5-student-enrollment-studentsectionassociation-scenarios.md) | Create, Update, Delete |
| [Parent](./v5-contact-contact-scenarios.md) | Create, Update |
| [StudentParentAssociation](./v5-contact-studentcontactassociation-scenarios.md) | Create, Update |
| [Cohort](./v5-studentcohort-cohort-scenarios.md) | Create, Update |
| [StaffCohortAssociation](./v5-studentcohort-staffcohortassociation-scenarios.md) | Create, Update, Delete |
| [StudentCohortAssociation](./v5-studentcohort-studentcohortassociation-scenarios.md) | Create, Update |
| [DisciplineIncident](./v5-student-discipline-disciplineincident-scenarios.md) | Create, Update |
| [StudentDisciplineIncidentAssociation](#) | Create, Delete |
| [DisciplineAction](./v5-student-discipline-disciplineaction-scenarios.md) | Create, Update, Delete |
| [StudentProgramAssociation](./v5-studentprogram-studentprogramassociation-scenarios.md) | Create, Update, Delete |
| [StudentCTEProgramAssociation](./v5-student-program-studentcteprogramassociation-scenarios.md) | Create, Update |
| [StudentHomelessProgramAssociation](./v5-student-program-studenthomelessprogramassociation-scenarios.md) | Create, Update |
| [StudentLanguageInstructionProgramAssociation](./v5-student-program-studentlanguageinstructionprogramassociation-scenarios.md) | Create, Update |
| [StudentMigrantProgramAssociations](./v5-student-program-studentmigrantprogramassociation-scenarios.md) | Create, Update |
| [StudentNeglectedOrDelinquentProgramAssociations](./v5-student-program-studentneglectedordeliquentprogramassociation-scenarios.md) | Create, Update |
| [studentSchoolFoodServiceProgramAssociations](./v5-student-program-studentschoolfoodservicesprogramassociation-scenarios.md) | Create, Update |
| [StudentSpecialEducationProgramAssociation](./v5-studentprogram-studentspecialeducationprogramassociation-scenarios.md) | Create, Update |
| [StudentTitleIPartAProgramAssociation](./v5-student-program-studenttitleipartaprogramassociation-scenarios.md) | Create, Update |
| [StudentSchoolAttendanceEvent](./v5-student-attendance-studentschoolattendanceevent-scenarios.md) | Create, Update, Delete |
| [StudentSectionAttendanceEvent](./v5-student-attendance-studentsectionattendanceevent-scenarios.md) | Create, Update, Delete |
| [Grade](./v5-studentgrade-grade-scenarios.md) | Create, Update, Delete |
| [CourseTranscript](./v5-student-transcript-coursetranscript-scenarios.md) | Create, Update |
| [StudentAcademicRecord](./v5-student-transcript-studentacademicrecord-scenarios.md) | Create, Update |

\*\* A Student must be associated with a School via StudentSchoolAssociation
before a student record may be updated.

![Ed-Fi UDM Dependency Graph.png](../../../img/Ed-Fi-UDM-Dependency-Graph.png)

*Ed-Fi API Dependency Graph*
