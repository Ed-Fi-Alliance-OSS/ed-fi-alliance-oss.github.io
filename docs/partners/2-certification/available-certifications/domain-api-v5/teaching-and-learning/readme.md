# Domain Certification API v5 - Teaching and Learning

The Teaching and Learning domain represents the course catalog, student
enrollment, and associated staff, organized around the
Course → CourseOffering → Section pattern. Certifying against this domain
requires successfully exercising CRUD operations on `Course`, `CourseOffering`,
`Location`, `Section`, `StaffSectionAssociation`, and
`StudentSectionAssociation`.

The Data Standard's Best Practices document lays out an explicit prerequisite
order for this domain (education organizations, then learning standards,
then sessions, then courses, then course offerings, then locations/class
periods, then sections, then staff/student enrollment, then section
associations). The phases below follow that same order.

:::tip
See the Data Standard's [Teaching and Learning Domain -
Overview](/reference/data-exchange/data-standard/5/model-reference/teaching-and-learning-domain/overview),
[Teaching and Learning Domain - Entities, References, and
Descriptors](/reference/data-exchange/data-standard/5/model-reference/teaching-and-learning-domain/entities-references-and-descriptors),
and [Teaching and Learning Domain - Best
Practices](/reference/data-exchange/data-standard/5/model-reference/teaching-and-learning-domain/best-practices)
for the conceptual model behind these steps.
:::

## Dependency Order

| Phase | Entity / Descriptor | Resource Endpoint | Depends On |
| --- | --- | --- | --- |
| 1 | EducationOrganizationCategoryDescriptor, GradeLevelDescriptor | `/educationOrganizationCategoryDescriptors`, `/gradeLevelDescriptors` | None |
| 1 | CourseIdentificationSystemDescriptor, TermDescriptor | `/courseIdentificationSystemDescriptors`, `/termDescriptors` | None |
| 1 | ClassroomPositionDescriptor, ProgramAssignmentDescriptor | `/classroomPositionDescriptors`, `/programAssignmentDescriptors` | None |
| 2 | School, SchoolYearType | `/schools`, `/schoolYearTypes` | Phase 1 (School) |
| 2 | Session | `/sessions` | Phase 1, 2 |
| 2 | Student, Staff | `/students`, `/staffs` | None |
| 3 | Course | `/courses` | Phase 1, 2 (School) |
| 3 | Location | `/locations` | Phase 2 (School) |
| 4 | CourseOffering | `/courseOfferings` | Phase 2, 3 (Course) |
| 5 | Section | `/sections` | Phase 4; optionally Phase 3 (Location) |
| 6 | StudentSchoolAssociation | `/studentSchoolAssociations` | Phase 1, 2 (Student, School) |
| 6 | StaffSchoolAssociation | `/staffSchoolAssociations` | Phase 1, 2 (Staff, School) |
| 7 | StudentSectionAssociation | `/studentSectionAssociations` | Phase 5, 6 (StudentSchoolAssociation) |
| 7 | StaffSectionAssociation | `/staffSectionAssociations` | Phase 1, 5, 6 (StaffSchoolAssociation) |

## Phase 1: Descriptors

Each descriptor resource shares the same required-field shape: `codeValue`,
`namespace`, and `shortDescription`. See the [Bell Schedule domain
walkthrough](../bell-schedule/readme.md#step-1-gradeleveldescriptor) for an
example descriptor payload.

| Descriptor | Resource Endpoint | Used By |
| --- | --- | --- |
| EducationOrganizationCategoryDescriptor | `/educationOrganizationCategoryDescriptors` | `School.educationOrganizationCategories` |
| GradeLevelDescriptor | `/gradeLevelDescriptors` | `School.gradeLevels`, `StudentSchoolAssociation.entryGradeLevelDescriptor` |
| CourseIdentificationSystemDescriptor | `/courseIdentificationSystemDescriptors` | `Course.identificationCodes[].courseIdentificationSystemDescriptor` |
| TermDescriptor | `/termDescriptors` | `Session.termDescriptor` |
| ClassroomPositionDescriptor | `/classroomPositionDescriptors` | `StaffSectionAssociation.classroomPositionDescriptor` |
| ProgramAssignmentDescriptor | `/programAssignmentDescriptors` | `StaffSchoolAssociation.programAssignmentDescriptor` |

## Phase 2: Core Reference Entities

`School` and `SchoolYearType` are required by `Session`, `Course`, `Location`,
and later by the school and section associations. `Student` and `Staff` are
independent and only needed starting in Phase 6.

### School

Resource: `schools` — see the [Bell Schedule domain
walkthrough](../bell-schedule/readme.md#step-3-school) for full field detail
and an example payload.

### SchoolYearType

Resource: `schoolYearTypes` — see the [School Calendar domain
walkthrough](../school-calendar/readme.md#schoolyeartype) for full field
detail and an example payload.

### Session

Per the Best Practices guidance, sessions (school calendar) must exist before
`CourseOffering`s can be defined. See the [School Calendar domain
walkthrough](../school-calendar/readme.md#session) for full field detail and
an example payload; the `termDescriptor` reference comes from Phase 1 above.

### Student

Resource: `students`

- `POST /students`
- `GET /students`
- `GET /students/{id}`
- `PUT /students/{id}`
- `DELETE /students/{id}`
- `GET /students/deletes`
- `GET /students/keyChanges`
- `GET /students/partitions`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `studentUniqueId` | string | A unique alphanumeric code assigned to a student. |
| `firstName` | string | The student's first name. |
| `lastSurname` | string | The student's last name. |
| `birthDate` | string (date) | The student's date of birth. |

#### Example

```json
{
  "studentUniqueId": "604821",
  "firstName": "Sam",
  "lastSurname": "Grant",
  "birthDate": "2005-03-15"
}
```

### Staff

Resource: `staffs` — see the [Finance domain
walkthrough](../finance/readme.md#staff) for full field detail and an
example payload.

## Phase 3: Course and Location

### Course

`Course` requires an `educationOrganizationReference` (any concrete
education organization — a `School`, `LocalEducationAgency`, or
`StateEducationAgency`) and at least one `CourseIdentificationCode`.

Resource: `courses`

- `POST /courses`
- `GET /courses`
- `GET /courses/{id}`
- `PUT /courses/{id}`
- `DELETE /courses/{id}`
- `GET /courses/deletes`
- `GET /courses/keyChanges`
- `GET /courses/partitions`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `courseCode` | string | A unique alphanumeric code assigned to a course. |
| `courseTitle` | string | The descriptive name given to a course of study. |
| `numberOfParts` | integer | The number of parts the course is divided into (e.g., for block scheduling). |
| `identificationCodes[].courseIdentificationSystemDescriptor` | string | Reference to a `CourseIdentificationSystemDescriptor` created in Phase 1. |
| `identificationCodes[].identificationCode` | string | A unique number or alphanumeric code assigned to the course. |
| `educationOrganizationReference.educationOrganizationId` | integer | Reference to the `School` (or other education organization) created in Phase 2. |

#### Example

```json
{
  "courseCode": "MATH-101",
  "courseTitle": "Algebra I",
  "numberOfParts": 1,
  "educationOrganizationReference": { "educationOrganizationId": 255901001 },
  "identificationCodes": [
    {
      "courseIdentificationSystemDescriptor": "uri://ed-fi.org/CourseIdentificationSystemDescriptor#SCED",
      "identificationCode": "02101"
    }
  ]
}
```

### Location

`Location` is optional for `Section`, but must be created first if a section
references a physical or virtual room.

Resource: `locations` — see the [Finance domain
walkthrough](../finance/readme.md) dimension pattern for CRUD verb
conventions; field detail below.

- `POST /locations`
- `GET /locations`
- `GET /locations/{id}`
- `PUT /locations/{id}`
- `DELETE /locations/{id}`
- `GET /locations/deletes`
- `GET /locations/keyChanges`
- `GET /locations/partitions`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `classroomIdentificationCode` | string | A unique code assigned to a room by a school (e.g., building and room number, or a URL for a virtual section). |
| `schoolReference.schoolId` | integer | Reference to the `School` created in Phase 2. |

#### Example

```json
{
  "classroomIdentificationCode": "Building A - Room 101",
  "schoolReference": { "schoolId": 255901001 }
}
```

## Phase 4: CourseOffering

`CourseOffering` represents a course's availability at a school for a given
session — the local course catalog entry. It requires the `Course`, `School`,
and `Session` from prior phases.

Resource: `courseOfferings`

- `POST /courseOfferings`
- `GET /courseOfferings`
- `GET /courseOfferings/{id}`
- `PUT /courseOfferings/{id}`
- `DELETE /courseOfferings/{id}`
- `GET /courseOfferings/deletes`
- `GET /courseOfferings/keyChanges`
- `GET /courseOfferings/partitions`

### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `localCourseCode` | string | The local code assigned by the school that identifies the course offering. |
| `courseReference` | object | Reference to the `Course` created in Phase 3 (`courseCode` + `educationOrganizationId`). |
| `schoolReference.schoolId` | integer | Reference to the `School` created in Phase 2. |
| `sessionReference` | object | Reference to the `Session` created in Phase 2 (`sessionName` + `schoolId` + `schoolYear`). |

### Example

```json
{
  "localCourseCode": "ALG1-A",
  "courseReference": {
    "courseCode": "MATH-101",
    "educationOrganizationId": 255901001
  },
  "schoolReference": { "schoolId": 255901001 },
  "sessionReference": {
    "sessionName": "2019-2020 Fall Semester",
    "schoolId": 255901001,
    "schoolYear": 2020
  }
}
```

## Phase 5: Section

`Section` requires the `CourseOffering` created in Phase 4, and may
optionally reference the `Location` from Phase 3 and one or more
`ClassPeriod`s (see the [Bell Schedule domain
walkthrough](../bell-schedule/readme.md#step-4-classperiod)).

Resource: `sections`

- `POST /sections`
- `GET /sections`
- `GET /sections/{id}`
- `PUT /sections/{id}`
- `DELETE /sections/{id}`
- `GET /sections/deletes`
- `GET /sections/keyChanges`
- `GET /sections/partitions`

### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `sectionIdentifier` | string | The local identifier assigned to a section. |
| `courseOfferingReference` | object | Reference to the `CourseOffering` created in Phase 4 (`localCourseCode` + `schoolId` + `schoolYear` + `sessionName`). |

### Commonly Used Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `locationReference` | object | Reference to the `Location` created in Phase 3 (`classroomIdentificationCode` + `schoolId`). |
| `classPeriods[].classPeriodReference` | object | Reference(s) to `ClassPeriod`(s) created per the Bell Schedule walkthrough. |

### Example

```json
{
  "sectionIdentifier": "ALG1-A-P1",
  "courseOfferingReference": {
    "localCourseCode": "ALG1-A",
    "schoolId": 255901001,
    "schoolYear": 2020,
    "sessionName": "2019-2020 Fall Semester"
  },
  "locationReference": {
    "classroomIdentificationCode": "Building A - Room 101",
    "schoolId": 255901001
  },
  "classPeriods": [
    {
      "classPeriodReference": {
        "classPeriodName": "First Period",
        "schoolId": 255901001
      }
    }
  ]
}
```

## Phase 6: School Enrollment Associations

Per the Best Practices guidance, a `Student` must have a
`StudentSchoolAssociation` — and a `Staff` member a `StaffSchoolAssociation`
— for the school offering a section before either can be assigned to that
section via a section association in Phase 7.

### StudentSchoolAssociation

Resource: `studentSchoolAssociations`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `entryDate` | string (date) | The date the student enters and begins receiving instructional services at the school. |
| `entryGradeLevelDescriptor` | string | Reference to a `GradeLevelDescriptor` created in Phase 1. |
| `schoolReference.schoolId` | integer | Reference to the `School` created in Phase 2. |
| `studentReference.studentUniqueId` | string | Reference to the `Student` created in Phase 2. |

#### Example

```json
{
  "entryDate": "2020-08-24",
  "entryGradeLevelDescriptor": "uri://ed-fi.org/GradeLevelDescriptor#Ninth grade",
  "schoolReference": { "schoolId": 255901001 },
  "studentReference": { "studentUniqueId": "604821" }
}
```

### StaffSchoolAssociation

Resource: `staffSchoolAssociations`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `programAssignmentDescriptor` | string | Reference to a `ProgramAssignmentDescriptor` created in Phase 1; the program for which the staff member is assigned at the school. |
| `schoolReference.schoolId` | integer | Reference to the `School` created in Phase 2. |
| `staffReference.staffUniqueId` | string | Reference to the `Staff` created in Phase 2. |

#### Example

```json
{
  "programAssignmentDescriptor": "uri://ed-fi.org/ProgramAssignmentDescriptor#Regular Education",
  "schoolReference": { "schoolId": 255901001 },
  "staffReference": { "staffUniqueId": "603201" }
}
```

Both resources above support the full CRUD surface:
`GET`/`POST`/`PUT`/`DELETE` plus `deletes`, `keyChanges`, and `partitions`.

## Phase 7: Section Associations

With a `Section` (Phase 5) and the appropriate school-level association
(Phase 6) in place, students and staff can be assigned to the section.

### StudentSectionAssociation

Resource: `studentSectionAssociations`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `beginDate` | string (date) | The date the student enters or is assigned to the section. |
| `sectionReference` | object | Reference to the `Section` created in Phase 5. |
| `studentReference.studentUniqueId` | string | Reference to the `Student` created in Phase 2 — must have a `StudentSchoolAssociation` for the same school (Phase 6). |

#### Example

```json
{
  "beginDate": "2020-08-24",
  "sectionReference": {
    "sectionIdentifier": "ALG1-A-P1",
    "localCourseCode": "ALG1-A",
    "schoolId": 255901001,
    "schoolYear": 2020,
    "sessionName": "2019-2020 Fall Semester"
  },
  "studentReference": { "studentUniqueId": "604821" }
}
```

### StaffSectionAssociation

Resource: `staffSectionAssociations`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `beginDate` | string (date) | The date of the staff member's assignment to the section. |
| `classroomPositionDescriptor` | string | Reference to a `ClassroomPositionDescriptor` created in Phase 1. |
| `sectionReference` | object | Reference to the `Section` created in Phase 5. |
| `staffReference.staffUniqueId` | string | Reference to the `Staff` created in Phase 2 — must have a `StaffSchoolAssociation` for the same school (Phase 6). |

#### Example

```json
{
  "beginDate": "2020-08-24",
  "classroomPositionDescriptor": "uri://ed-fi.org/ClassroomPositionDescriptor#Teacher of Record",
  "sectionReference": {
    "sectionIdentifier": "ALG1-A-P1",
    "localCourseCode": "ALG1-A",
    "schoolId": 255901001,
    "schoolYear": 2020,
    "sessionName": "2019-2020 Fall Semester"
  },
  "staffReference": { "staffUniqueId": "603201" }
}
```

Both resources above support the full CRUD surface:
`GET`/`POST`/`PUT`/`DELETE` plus `deletes`, `keyChanges`, and `partitions`.

## Related Entities (Not Required for Teaching and Learning CRUD)

The Data Standard's [Teaching and Learning Domain - Entities, References, and
Descriptors](/reference/data-exchange/data-standard/5/model-reference/teaching-and-learning-domain/entities-references-and-descriptors)
page lists `ClassPeriod`, `EducationOrganization`, `LearningStandard`,
`Program`, `School`, `Session`, `Staff`, `StaffProgramAssociation`,
`StaffSchoolAssociation`, `Student`, `StudentProgramAssociation`, and
`StudentSchoolAssociation` as extended references. `EducationOrganization`
and `School` are satisfied above via Phase 2, `Session` via Phase 2,
`ClassPeriod` via the optional `Section.classPeriods` reference to the Bell
Schedule walkthrough, and `Staff`/`Student`/`StaffSchoolAssociation`/
`StudentSchoolAssociation` are included as full steps above (Phases 2 and 6)
because they are genuine best-practice prerequisites for the section
associations. `LearningStandard`, `Program`, `StaffProgramAssociation`, and
`StudentProgramAssociation` are not required by any resource's schema in this
domain — they belong to the Assessment and Alternative and Supplemental
Services domains, respectively, and are only relevant if a certifying
product also maps courses to learning standards or associates sections with
programs.
