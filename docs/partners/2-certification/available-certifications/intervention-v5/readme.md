# Ed-Fi Intervention API for Data Standard v5 Certification

:::info

This certification is a draft and is under community review. Requirements may
change before the certification takes effect. Send feedback to
[certification@ed-fi.org](mailto:certification@ed-fi.org).

:::

Certification Name: Ed-Fi Intervention API for Data Standard v5 \
Standards Referenced: \
   [Ed-Fi API Design & Implementation Guidelines v3.1](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-API-Standards/tree/main/api-guidelines/v3.1) \
Technical Suite: Suite 3 \
Obsoletes: – \
Obsoleted By: – \
Status: Draft

Certifying Organization: Ed-Fi Alliance \
Contact: [certification@ed-fi.org](mailto:certification@ed-fi.org) \
Publication Date: – \
Certification Version: 1.0 \
Last Revision Date: –

## Overview and Purpose

The Ed-Fi Intervention API for Data Standard v5 Certification verifies that an
intervention or Multi-Tiered System of Supports (MTSS) product (the provider)
can manage a core set of intervention data on a target system (the consumer)
using the RESTful APIs of the Ed-Fi
[Intervention domain](/reference/data-exchange/data-standard/5/model-reference/intervention-domain).

In this data exchange architecture, the provider implements an API client which
uses HTTP/S requests and RESTful patterns to manage API resources on the
consumer system, which implements the API definition itself (see Figure 1).

![Conceptual data exchange architecture](https://edfidocs.blob.core.windows.net/$web/img/partners/certification/provider-consumer.png)

**Figure 1.** Conceptual data exchange architecture

Ed-Fi certification verifies that a vendor's product conforms to the Ed-Fi Data
Standard's data model, semantics, and REST API specifications. By standardizing
how intervention data is published through Ed-Fi APIs, this certification helps
reduce custom integrations and supports:

- Faster, more repeatable district onboarding, by replacing one-off data exports
  and point integrations with a shared contract
- Cross-vendor reporting and MTSS dashboards that can aggregate intervention
  activity consistently
- Portability of intervention history across systems and vendors for
  longitudinal analysis
- Cleaner handoffs into state and regional data hubs for compliance, evaluation,
  and analytics

The certification further aggregates normative requirements that have been found
by the Ed-Fi community to be critical to "real world" data exchange and
interoperability. These include requirements around error handling and recovery,
roster configurability, and others.

This conformance specification covers the provider certification _–_ that is,
the responsibilities of the _API_ _client_ implementer and not the _API_
_consumer_. Please note that this certification **DOES NOT** validate the API
implementation, but rather validates the API client.

## Scope

Version 1 of this certification is intentionally focused on establishing a
baseline level of interoperability for intervention systems, using the existing
Ed-Fi Intervention domain in Data Standard v5. It validates a vendor's ability
to:

- Publish intervention definitions (identifiers, classification, and delivery
  parameters)
- Assign students to interventions, with an assigned dosage expressed as total
  assigned minutes
- Record session-level attendance, with the delivered duration of each session
- Compare assigned and delivered dosage, to evaluate fidelity of delivery
- Associate staff with intervention delivery

During certification discovery with intervention vendors, SIS providers, state
reporting stakeholders, and Ed-Fi subject matter experts, several capabilities
were identified as valuable but not sufficiently standardized, consistently
implemented, or supported by the current data model to be pass/fail
requirements in version 1. They are listed below as optional or as future
considerations.

### Required Resources

| Ed-Fi API Resource                 | Purpose in certification                                                                                                          |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Intervention                       | Defines available interventions and delivery parameters. The provider is the system of record and MUST supply stable identifiers. |
| StudentInterventionAssociation     | Assigns students to interventions; the core of student-level MTSS tracking.                                                       |
| StudentInterventionAttendanceEvent | Records session-level participation; required for fidelity and delivered dosage.                                                  |
| Student                            | Identifies participating students. Read-only references from an existing Ed-Fi ODS are acceptable.                                |
| Staff                              | Identifies the staff delivering interventions. Read-only references from an existing Ed-Fi ODS are acceptable.                    |
| EducationOrganization              | Identifies the organization that owns the intervention. Read-only references from an existing Ed-Fi ODS are acceptable.           |

Staff can be associated with an intervention through either of two paths; see
[Associating Staff with Intervention Delivery](#associating-staff-with-intervention-delivery).

### Optional Resources and Features

The following are not pass/fail in version 1:

- Assignment rationale (`diagnosticStatement` on StudentInterventionAssociation)
- Cohort, StudentCohortAssociation, and StaffCohortAssociation workflows. These
  are optional on their own, but StaffCohortAssociation (with Cohort) is one of
  the two accepted paths for meeting the staff requirement.
- InterventionPrescription, InterventionStudy, and EducationContent
- InterventionEffectiveness. Certification does not require or validate it.

### Future Considerations

The following are proposed for future Data Standard and certification work, and
are **not** part of version 1:

- Progress monitoring and assessment linkage
- Student goals, targeted skills, and intervention objectives
- MTSS tiers and tier progression
- Exit reasons and intervention lifecycle status
- Requiring or validating standardized outcome and effectiveness data
- Engagement and fidelity indicators beyond attendance and duration
- Scheduled versus held sessions, including sessions not held for reasons
  outside the student's control
- Student-level delivery planning: begin date, end date, delivery method, staff,
  frequency-based dosage, and scheduling
- EducationOrganizationInterventionPrescriptionAssociation and standardized
  district intervention catalogs

## Use Cases Covered

### Use Case 1: Publish and maintain an intervention

> As a district or intervention platform, I want to define and publish the
> interventions available for use, so that schools and staff can consistently
> assign approved interventions to students.

This demonstrates stable intervention identifiers, the core metadata needed for
interpretation across systems, and clear ownership of intervention definitions.
Ed-Fi concepts exercised: Intervention, EducationOrganization, and descriptors
such as InterventionClass, DeliveryMethod, and Diagnosis.

### Use Case 2: Assign a student to an intervention

> As an educator or intervention coordinator, I want to assign a student to an
> intervention with an assigned dosage, and a rationale where the product
> supports it, so that intervention participation is formally documented.

This demonstrates student-level assignment tracking, the context for why a
student is receiving an intervention, and assigned dosage expectations. Ed-Fi
concepts exercised: StudentInterventionAssociation, Student, Intervention, and
Dosage.

### Use Case 3: Define intervention delivery parameters

> As an intervention provider, I want to define when and how an intervention is
> delivered, so that expected service delivery can be understood across systems.

This demonstrates the temporal boundaries of interventions, the delivery method,
and organizational responsibility. Ed-Fi concepts exercised: Intervention,
BeginDate, EndDate, MeetingTime, and EducationOrganization.

### Use Case 4: Record intervention attendance events

> As an educator or intervention provider, I want to record whether a student
> attended a specific intervention session, so that actual participation can be
> tracked and verified.

This demonstrates session-level participation tracking, the distinction between
planned and delivered services, and support for partial attendance tracked in
minutes. Ed-Fi concepts exercised: StudentInterventionAttendanceEvent,
AttendanceEventCategory, EventDate, and InterventionDuration.

### Use Case 5: Track assigned versus delivered intervention dosage

> As a school or district, I want to compare assigned intervention dosage with
> delivered dosage over time, so that fidelity of service delivery can be
> evaluated.

This demonstrates full-fidelity MTSS tracking, alignment between planning and
execution, and readiness for reporting and analytics. Ed-Fi concepts exercised:
StudentInterventionAssociation (assigned dosage) and
StudentInterventionAttendanceEvent (delivered duration).

### Use Case 6: Associate staff with intervention delivery

> As a district, I want to associate staff members with the interventions they
> deliver, so that service responsibility and staffing patterns are visible.

This demonstrates accountability for intervention delivery and alignment with
operational MTSS workflows. Ed-Fi concepts exercised: Staff, the staff
references within Intervention, and StaffCohortAssociation for
cohort-delivered interventions.

## Overview of Requirements

This section provides an overview only; detailed, step-by-step requirements are
available in
[Intervention API Certification for Data Standard v5 - Steps](./certification-steps.md).
The test scenarios, required fields, and reference payloads are in
[Intervention API for Data Standard v5 Certification - Test Scenarios](./test-scenarios/readme.md).

Certification tests only cover the resources and elements that are specific
expectations of the vendor to fulfill. Certification tests do not reflect the
entire surface of Ed-Fi's data standard. Full visibility to the data standard
can be found using the following resources:

- [https://api.ed-fi.org/](https://api.ed-fi.org/)
- [Ed-Fi Unifying Data Model (UDM) Handbook (v5.1)](https://edfidocs.blob.core.windows.net/$web/handbook/v5.1/index.html)
- [Ed-Fi Unifying Data Model (UDM) Handbook (v5.0)](https://edfidocs.blob.core.windows.net/$web/handbook/v5.0/index.html)

### Required Fields on API Resources

All fields marked as "required" in the API specification are REQUIRED. In
addition, this certification requires the elements below, some of which are
optional in the API specification itself. Elements marked "Yes" under _Required
by certification_ but "No" under _Required by API_ are requirements added by
this certification.

#### Intervention

| Element                        | Required by API | Required by certification     | Notes                                                                                                                                                                                         |
| ------------------------------ | --------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| InterventionIdentificationCode | Yes             | Yes                           | Unique, stable identifier of the intervention.                                                                                                                                                |
| EducationOrganization          | Yes             | Yes                           | Organization responsible for the intervention.                                                                                                                                                |
| InterventionClass              | Yes             | Yes                           | Descriptor.                                                                                                                                                                                   |
| DeliveryMethod                 | Yes             | Yes                           | Descriptor, such as Individual, Small Group, or Whole Class. Certification checks presence only; a catalog-level default is acceptable where the product records delivery method per student. |
| BeginDate                      | Yes             | Yes                           | Certification checks presence only; a catalog-level default is acceptable where the product records start dates per student.                                                                  |
| Diagnosis                      | No              | Yes                           | Collection of descriptors; the targeted purpose of the intervention.                                                                                                                          |
| Namespace                      | No              | Yes                           | Identifies the source system when an ODS holds intervention data from more than one source.                                                                                                   |
| Staffs                         | No              | Yes, through Path 1 or Path 2 | Staff associated with the intervention. See [Associating Staff with Intervention Delivery](#associating-staff-with-intervention-delivery).                                                    |
| EndDate                        | No              | No                            | Some products record this per student (a future consideration).                                                                                                                               |
| MeetingTimes                   | No              | No                            | Each meeting time requires both a start time and an end time. Some products record this per student.                                                                                          |
| MinDosage / MaxDosage          | No              | No                            | Minimum and maximum minutes that may be assigned for the intervention.                                                                                                                        |

#### StudentInterventionAssociation

| Element             | Required by API | Required by certification | Notes                                                                                                  |
| ------------------- | --------------- | ------------------------- | ------------------------------------------------------------------------------------------------------ |
| Student             | Yes             | Yes                       | The student receiving the intervention.                                                                |
| Intervention        | Yes             | Yes                       | The associated intervention.                                                                           |
| Dosage              | No              | Yes                       | Total minutes assigned to the student for the intervention, not minutes per session.                   |
| CohortReference     | No              | Only for Path 2           | Required when the provider uses the StaffCohortAssociation path.                                       |
| DiagnosticStatement | No              | No                        | A statement provided by the assigner explaining why the student was assigned. Publish where supported. |

#### StudentInterventionAttendanceEvent

| Element                 | Required by API | Required by certification         | Notes                                                                                                                                                                                          |
| ----------------------- | --------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Student                 | Yes             | Yes                               | The participating student.                                                                                                                                                                     |
| Intervention            | Yes             | Yes                               | The associated intervention.                                                                                                                                                                   |
| EventDate               | Yes             | Yes                               | The session date.                                                                                                                                                                              |
| AttendanceEventCategory | Yes             | Yes                               | For example In Attendance, Excused Absence, or Unexcused Absence. Where default values do not fit (for example, a session that was not held), use descriptors in the provider's own namespace. |
| InterventionDuration    | No              | Yes, for Present and Tardy events | The duration, in minutes, of the intervention received at the session. This is the delivered dosage for the session. Omit it for absences.                                                     |
| AttendanceEventReason   | No              | No                                | Publish if supported.                                                                                                                                                                          |

#### StaffCohortAssociation (Path 2 only)

| Element   | Required by API | Required by certification | Notes                                                        |
| --------- | --------------- | ------------------------- | ------------------------------------------------------------ |
| Staff     | Yes             | Yes, when Path 2 is used  | The staff member delivering the intervention to the cohort.  |
| Cohort    | Yes             | Yes, when Path 2 is used  | The cohort referenced by the StudentInterventionAssociation. |
| BeginDate | Yes             | Yes, when Path 2 is used  |                                                              |

### Associating Staff with Intervention Delivery

Certification accepts either of two paths for identifying the staff responsible
for delivering an intervention. A provider needs to support at least one path,
not both.

- **Path 1: Intervention.Staffs.** List the staff on the Staffs collection of
  the Intervention record. This suits products where the same staff deliver the
  intervention to all participating students.
- **Path 2: StaffCohortAssociation.** Associate staff with a Cohort, and
  reference that Cohort from each StudentInterventionAssociation through its
  CohortReference. This suits products that deliver an intervention to groups,
  where staff differ by group.

Certification checks that each published intervention can be linked to at least
one valid staff member through the path the provider uses. Updates and removals
are tested on that same path.

Cohort and StaffCohortAssociation are required only when a provider uses Path 2.
StudentCohortAssociation remains optional on either path. Assigning staff to an
individual student's plan is not supported in Data Standard v5. It is a future
consideration for Data Standard v7.

### Assigned and Delivered Dosage

Dosage is expressed in minutes, and the two values are compared to evaluate
fidelity of delivery:

- _Assigned dosage_ is the `dosage` on a StudentInterventionAssociation: the
  total minutes for which the student was assigned to the intervention, not
  minutes per session.
- _Delivered dosage_ is the sum of the `interventionDuration` values on the
  StudentInterventionAttendanceEvent records for that student and intervention.
  `interventionDuration` reflects the minutes received for a Present or Tardy
  event. It is omitted for absences, which are recorded with the appropriate
  AttendanceEventCategory (for example, Excused Absence or Unexcused Absence).

### Local Descriptor Guidance

The Alliance recommendation is to source descriptor values from the list
governed by the project's reporting context and place them in a namespace that
accurately captures that governing organization. Descriptor values shown in the
certification's test scenarios use the Ed-Fi namespace for informational
purposes. Descriptor namespace should clearly indicate the organization that
governs the value.

### Student ID Configuration

If the product uses a rostering standard or a similar de facto industry roster
specification (such as the Clever roster), and that standard contains multiple
possible student IDs, the certifying product MUST demonstrate the ability to
allow a user of the product to configure which student identifier to be used
within transactions for an education agency (configurability can be more
granular than education agency-level, but this level is the minimum required).

Such a capability has proven important in field work to date; for example, some
districts may align on state identifiers for various reasons (e.g., as they are
part of school district collaboratives) or use "student numbers" on occasion.

If the product uses multiple roster standards, it is only required to
demonstrate this capability with one standard.

### Operations

The provider MUST demonstrate the ability to perform create, update and delete
operations on API resources. For update, HTTP POST or PUT are both accepted.

### Error Handling

In field work, the ability to capture, display errors, and offer facilities to
re-try after error conditions are found, have proven to be essential to
interoperability. The certification testing ensures a basic level of such
functionality is in place.

### Enumerations

The Intervention domain contains a number of controlled vocabularies.

For some enumerations, a vendor is allowed to supply their own additional values
if an Ed-Fi value fails to match the semantics needed. These enumerations are:

- AttendanceEventCategoryDescriptor
- DiagnosisDescriptor
- InterventionClassDescriptor

The certification captures and publishes vendor-specific enumerations (in the
provider entry in the
[Registry of Ed-Fi Certified Products](../../registry-of-ed-fi-certified-products.mdx)),
and tests that enumerations used during testing are within the allowed
enumeration sets.

## Certification Requirements

The certification requirements originate out of needs from actual field
implementation work in the Ed-Fi community. As such, they contain requirements
beyond the ability to successfully exercise the API definitions, but go into
areas like error handling, modes of operation (transactional and batch), and
additional configuration options.

See
[Intervention API for Data Standard v5 Certification - Steps](./certification-steps.md)
for a list of all requirements.

Certification holders may also choose to link to their security and data privacy
validations in the registry. See
[Optional Registry Entry to Link Security and Data Privacy Validations](../../certification-for-data-providers/security-validations.md).

## Re-certification Requirements

Certifications are valid for one year. See
[Requirements for Recertification](../../certification-for-data-providers/recertification.md)
for details.
