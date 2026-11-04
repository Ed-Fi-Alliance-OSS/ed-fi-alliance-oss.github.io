# Intervention API for Data Standard v5 Certification - Test Scenarios

:::info

This certification is a draft and is under community review. Requirements may
change before the certification takes effect. Send feedback to
[certification@ed-fi.org](mailto:certification@ed-fi.org).

:::

## Test Scenarios

The certifying product is required to demonstrate the ability to perform all of
the test scenarios below, for the API resources listed under
[Required API Resources](#required-api-resources). The scenarios correspond to
the use cases described in
[Ed-Fi Intervention API for Data Standard v5 Certification](../readme.md#use-cases-covered).

### Local Descriptor Guidance

The Alliance recommendation is to source descriptor values from the list
governed by the project's reporting context and place them in a namespace that
accurately captures that governing organization. Descriptor values shown in the
certification's test scenarios use the Ed-Fi namespace for informational
purposes. Descriptor namespace should clearly indicate the organization that
governs the value.

### Sandbox Data

The Student, Staff, and EducationOrganization records referenced by these
scenarios must exist in the Ed-Fi API sandbox. The vendor may use the
prepopulated sandbox, or push these records into the sandbox as part of the
test; see [Sandbox Data](../certification-steps.md#sandbox-data). The
identifiers shown in the reference payloads are illustrative and MUST be
replaced with identifiers of records that exist in the sandbox.

### Order of Operations and Deletes

Scenarios 1 through 5 are run in order, and Scenario 6 is run last. Records
depend on each other: a StudentInterventionAssociation or a
StudentInterventionAttendanceEvent references an Intervention, and a Path 2
association references a Cohort. The API rejects the deletion of a record that
is still referenced by another record (HTTP 409 Conflict).

Delete test activities are therefore run in reverse dependency order, after the
create and update activities of Scenarios 1 through 5 are complete:

1. StudentInterventionAttendanceEvent
2. StudentInterventionAssociation
3. StaffCohortAssociation and Cohort (Path 2 only)
4. Intervention

### Required API Resources

For each API resource element, the requirement status is marked as follows:

- **REQUIRED**: the element must be supplied. Note that
  [Requirements - Testing Requirements](../../../certification-for-data-providers/testing-requirements.md)
  lists permitted workarounds for many cases where the element may be missing in
  the source system.
- **OPTIONAL**: the element is optional.

Use of the sample data is RECOMMENDED; other data MAY be used, but the data MUST
NOT be real or even derived from real data.

| Ed-Fi API Resource                 | Operations                           |
| ---------------------------------- | ------------------------------------ |
| Intervention                       | Create, Update, Delete               |
| StudentInterventionAssociation     | Create, Update, Delete               |
| StudentInterventionAttendanceEvent | Create, Update, Delete               |
| Student                            | Read-only reference                  |
| Staff                              | Read-only reference                  |
| EducationOrganization              | Read-only reference                  |
| StaffCohortAssociation, Cohort     | Create, Update, Delete (Path 2 only) |

## Reference Payloads

The following payloads illustrate the structure of the required resources. They
show one intervention, assigned to one student for a total of 120 minutes, and
one of the sessions delivered under that assignment.

### Intervention

```json
{
  "interventionIdentificationCode": "READ-T2-001",
  "educationOrganizationReference": {
    "educationOrganizationId": 255901
  },
  "beginDate": "2026-08-24",
  "interventionClassDescriptor": "uri://ed-fi.org/InterventionClassDescriptor#Practice",
  "deliveryMethodDescriptor": "uri://ed-fi.org/DeliveryMethodDescriptor#Small Group",
  "diagnoses": [
    {
      "diagnosisDescriptor": "uri://gbisd.edu/DiagnosisDescriptor#Dropout Risk"
    }
  ],
  "minDosage": 60,
  "maxDosage": 180,
  "namespace": "uri://www.intervention-provider.com",
  "staffs": [
    {
      "staffReference": {
        "staffUniqueId": "207288"
      }
    }
  ]
}
```

### StudentInterventionAssociation

`dosage` is the total minutes assigned to the student for the intervention, not
minutes per session.

```json
{
  "interventionReference": {
    "educationOrganizationId": 255901,
    "interventionIdentificationCode": "READ-T2-001"
  },
  "studentReference": {
    "studentUniqueId": "604863"
  },
  "diagnosticStatement": "Student demonstrates reading fluency needs.",
  "dosage": 120
}
```

### StudentInterventionAttendanceEvent

`interventionDuration` is the minutes received in this session. It is provided for
Present and Tardy events and omitted for absences.

```json
{
  "attendanceEventCategoryDescriptor": "uri://ed-fi.org/AttendanceEventCategoryDescriptor#In Attendance",
  "eventDate": "2026-10-13",
  "interventionReference": {
    "educationOrganizationId": 255901,
    "interventionIdentificationCode": "READ-T2-001"
  },
  "studentReference": {
    "studentUniqueId": "604863"
  },
  "interventionDuration": 30
}
```

### Path 2: StaffCohortAssociation and CohortReference

These payloads are illustrative and apply only when the provider uses Path 2 to
associate staff with the intervention (see Scenario 5). The Cohort must exist
before either record is created.

```json
{
  "beginDate": "2026-08-24",
  "cohortReference": {
    "educationOrganizationId": 255901,
    "cohortIdentifier": "READ-T2-001-GROUP-A"
  },
  "staffReference": {
    "staffUniqueId": "207288"
  }
}
```

The StudentInterventionAssociation then carries the Cohort:

```json
{
  "interventionReference": {
    "educationOrganizationId": 255901,
    "interventionIdentificationCode": "READ-T2-001"
  },
  "studentReference": {
    "studentUniqueId": "604863"
  },
  "cohortReference": {
    "educationOrganizationId": 255901,
    "cohortIdentifier": "READ-T2-001-GROUP-A"
  },
  "dosage": 120
}
```

## Scenario 1: Publish and Maintain Intervention Definitions

### Objective

Demonstrate the ability to publish intervention definitions and supporting
metadata to an Ed-Fi ODS/API.

### Required Resources

- Intervention
- EducationOrganization
- Staff

### Test Activities

The provider must:

1. Publish one or more intervention records.
2. Include all required certification elements.
3. Associate interventions to the appropriate education organization.
4. Demonstrate the ability to update and delete an intervention record. The
   delete is run in the order described in
   [Order of Operations and Deletes](#order-of-operations-and-deletes).

| Resource     | Element                        | Required for certification         | Notes                                                                                                                    |
| ------------ | ------------------------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Intervention | InterventionIdentificationCode | REQUIRED                           | Unique identifier for the intervention.                                                                                  |
| Intervention | EducationOrganization          | REQUIRED                           | Organization responsible for the intervention.                                                                           |
| Intervention | InterventionClass              | REQUIRED                           | Intervention classification.                                                                                             |
| Intervention | DeliveryMethod                 | REQUIRED                           | Individual, Small Group, Whole Class. Presence only; a catalog default is acceptable.                                    |
| Intervention | Diagnosis                      | REQUIRED                           | Intended purpose of the intervention.                                                                                    |
| Intervention | Staffs (collection)            | REQUIRED, through Path 1 or Path 2 | Staff associated with intervention delivery. See Scenario 5.                                                             |
| Intervention | Namespace                      | REQUIRED                           | Identifies the source system.                                                                                            |
| Intervention | BeginDate                      | REQUIRED                           | The start date for the intervention implementation.                                                                      |
| Intervention | EndDate                        | OPTIONAL                           | The end date for the intervention implementation. Some products record this per student.                                 |
| Intervention | MinDosage / MaxDosage          | OPTIONAL                           | Minimum and maximum minutes that may be assigned.                                                                        |
| Intervention | MeetingTimes (collection)      | OPTIONAL                           | The start and end times defining a meeting time. Each meeting time requires both. Some products record this per student. |

## Scenario 2: Assign a Student to an Intervention

### Objective

Demonstrate the ability to associate students to interventions and publish the
student-specific intervention plan.

### Required Resources

- StudentInterventionAssociation
- Student
- Intervention

### Test Activities

The provider must:

1. Assign one or more students to an intervention.
2. Publish dosage expectations.
3. Publish the rationale or diagnostic statement associated with the
   assignment, where supported.
4. Publish multiple students assigned to the same intervention.
5. Demonstrate the ability to update and delete a StudentInterventionAssociation.
   The delete is run in the order described in
   [Order of Operations and Deletes](#order-of-operations-and-deletes).

| Resource                       | Element             | Required for certification | Notes                                                       |
| ------------------------------ | ------------------- | -------------------------- | ----------------------------------------------------------- |
| StudentInterventionAssociation | Student             | REQUIRED                   | Student receiving the intervention.                         |
| StudentInterventionAssociation | Intervention        | REQUIRED                   | Associated intervention.                                    |
| StudentInterventionAssociation | Dosage              | REQUIRED                   | Total minutes assigned to the student for the intervention. |
| StudentInterventionAssociation | DiagnosticStatement | OPTIONAL                   | Why the student was assigned.                               |

## Scenario 3: Record Intervention Participation Events

### Objective

Demonstrate the ability to publish actual intervention delivery and
participation data.

### Required Resources

- StudentInterventionAttendanceEvent
- StudentInterventionAssociation

### Test Activities

The provider must:

1. Publish attendance events for intervention sessions. Use provider-namespaced
   descriptors where the defaults do not fit.
2. Publish the delivered duration (`interventionDuration`) for each session in
   which the student received the intervention (a Present or Tardy event).
3. Publish multiple attendance events for the same intervention assignment.
4. Include examples of both attendance and non-attendance events, if supported
   by the product. Record an absence with the appropriate
   AttendanceEventCategory (for example, Excused Absence or Unexcused Absence)
   and omit `interventionDuration`, unless the product has a specific
   requirement to include it.
5. Demonstrate the ability to update and delete an intervention attendance event
   record. The delete is run in the order described in
   [Order of Operations and Deletes](#order-of-operations-and-deletes).

| Resource                           | Element                 | Required for certification            | Notes                                                                                                                            |
| ---------------------------------- | ----------------------- | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| StudentInterventionAttendanceEvent | Student                 | REQUIRED                              | Participating student.                                                                                                           |
| StudentInterventionAttendanceEvent | Intervention            | REQUIRED                              | Associated intervention.                                                                                                         |
| StudentInterventionAttendanceEvent | EventDate               | REQUIRED                              | Session date.                                                                                                                    |
| StudentInterventionAttendanceEvent | AttendanceEventCategory | REQUIRED                              | Attendance status. Use provider-namespaced descriptors where the defaults do not fit (for example, a session that was not held). |
| StudentInterventionAttendanceEvent | InterventionDuration    | REQUIRED for Present and Tardy events | Delivered minutes. Omit for absences.                                                                                            |
| StudentInterventionAttendanceEvent | AttendanceEventReason   | OPTIONAL                              | If supported.                                                                                                                    |

## Scenario 4: Track Assigned versus Delivered Dosage

### Objective

Demonstrate the ability to support fidelity tracking through assigned and
delivered intervention time.

### Required Resources

- StudentInterventionAssociation
- StudentInterventionAttendanceEvent

### Test Activities

The provider must:

1. Publish a student intervention assignment containing assigned dosage.
2. Publish multiple attendance events containing delivered duration.
3. Demonstrate a scenario where delivered duration can be compared against
   assigned dosage.

For example, a student assigned 120 minutes who attended three sessions of 30
minutes each has been delivered 90 of the 120 assigned minutes.

| Resource                           | Element              | Required for certification            | Notes                                                |
| ---------------------------------- | -------------------- | ------------------------------------- | ---------------------------------------------------- |
| StudentInterventionAssociation     | Dosage               | REQUIRED                              | Assigned dosage: total assigned minutes.             |
| StudentInterventionAttendanceEvent | InterventionDuration | REQUIRED for Present and Tardy events | Delivered dosage for the session. Omit for absences. |
| StudentInterventionAttendanceEvent | EventDate            | REQUIRED                              | Enables aggregate calculation.                       |

## Scenario 5: Associate Staff with Intervention Delivery

### Objective

Demonstrate the ability to identify the staff responsible for intervention
delivery.

### Required Resources

- Option 1 (Path 1): Intervention and Staff
- Option 2 (Path 2): Cohort and StaffCohortAssociation, for cohort-delivered
  interventions

### Test Activities

The provider must:

1. Publish staff associated with intervention delivery, using
   Intervention.Staffs (Path 1) or StaffCohortAssociation (Path 2).
2. Demonstrate intervention records linked to one or more staff members through
   either path.
3. Demonstrate the ability to update and remove a staff intervention association
   on the path used.

| Resource                       | Element                                  | Required for certification | Notes                                                              |
| ------------------------------ | ---------------------------------------- | -------------------------- | ------------------------------------------------------------------ |
| Intervention                   | Staffs (collection)                      | REQUIRED (Path 1)          | Staff responsible for delivery.                                    |
| Intervention                   | StaffUniqueId (in each Staffs reference) | REQUIRED (Path 1)          | Valid staff reference.                                             |
| StaffCohortAssociation         | Staff                                    | REQUIRED (Path 2)          | Staff responsible for delivery through the Cohort.                 |
| StaffCohortAssociation         | Cohort                                   | REQUIRED (Path 2)          | Cohort of students receiving the intervention.                     |
| StaffCohortAssociation         | BeginDate                                | REQUIRED (Path 2)          | Required by the API.                                               |
| StudentInterventionAssociation | CohortReference                          | REQUIRED (Path 2)          | Links the student's assignment to the Cohort, and so to the staff. |

:::note

Certification accepts either of two paths for identifying the staff responsible
for delivering an intervention. A provider needs to support at least one path,
not both.

- **Path 1: Intervention.Staffs.** List the staff on the Intervention record's
  Staffs collection. This suits products where the same staff deliver the
  intervention to all participating students.
- **Path 2: StaffCohortAssociation.** Associate staff with a Cohort, and
  reference that Cohort from each StudentInterventionAssociation through its
  CohortReference. This suits products that deliver an intervention to groups,
  where staff differ by group.

What certification checks: each published intervention can be linked to at least
one valid staff member through the path the provider uses. Updates and removals
are tested on that same path.

What this does not change: Cohort and StudentCohortAssociation remain optional
in version 1. They are needed only if a provider uses Path 2. Assigning staff to
an individual student's plan is not supported in Data Standard v5; it is a
future consideration for Data Standard v7.

:::

## Scenario 6: Recovery and Resubmission

### Objective

Demonstrate the ability to recover from synchronization failures or missing
records.

### Required Resources

- Intervention
- StudentInterventionAssociation
- StudentInterventionAttendanceEvent

### Test Activities

Ed-Fi removes a subset of the previously published records from the
certification sandbox.

The provider must:

1. Re-submit the data.
2. Restore the deleted records.
3. Maintain consistent identifiers.

### Validation

Ed-Fi verifies that:

- Missing records are recreated.
- Relationships remain intact.
- Data remains consistent after recovery.

### Pass Criteria

The provider successfully restores the missing intervention data through normal
synchronization processes.
