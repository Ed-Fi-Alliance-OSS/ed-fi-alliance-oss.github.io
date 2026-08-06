# Domain Certification API v5 - School Calendar

The School Calendar domain represents the instructional days, sessions, and
grading periods defined for a school year. Note that this domain does not
cover section (class period) or other event scheduling during school days —
those needs are covered by the [Bell Schedule domain
walkthrough](../bell-schedule/readme.md).

Certifying against this domain requires successfully exercising CRUD
operations on `AcademicWeek`, `Calendar`, `CalendarDate`, `GradingPeriod`, and
`Session`. The steps below are grouped into phases so that each phase only
depends on data created in an earlier phase — following them in order will
satisfy every dependency these entities require.

:::tip
See the Data Standard's [School Calendar Domain -
Overview](/reference/data-exchange/data-standard/5/model-reference/school-calendar-domain/overview),
[School Calendar Domain - Entities, References, and
Descriptors](/reference/data-exchange/data-standard/5/model-reference/school-calendar-domain/entities-references-and-descriptors),
and [School Calendar Domain - Best
Practices](/reference/data-exchange/data-standard/5/model-reference/school-calendar-domain/best-practices)
for the conceptual model behind these steps.
:::

## Dependency Order

| Phase | Entity / Descriptor | Resource Endpoint | Depends On |
| --- | --- | --- | --- |
| 1 | GradeLevelDescriptor, EducationOrganizationCategoryDescriptor | `/gradeLevelDescriptors`, `/educationOrganizationCategoryDescriptors` | None |
| 1 | CalendarTypeDescriptor, CalendarEventDescriptor, GradingPeriodDescriptor, TermDescriptor | `/calendarTypeDescriptors`, `/calendarEventDescriptors`, `/gradingPeriodDescriptors`, `/termDescriptors` | None |
| 2 | School | `/schools` | Phase 1 |
| 2 | SchoolYearType | `/schoolYearTypes` | None |
| 3 | AcademicWeek | `/academicWeeks` | Phase 2 (School) |
| 3 | GradingPeriod | `/gradingPeriods` | Phase 1 (GradingPeriodDescriptor), Phase 2 |
| 3 | Calendar | `/calendars` | Phase 1 (CalendarTypeDescriptor), Phase 2 |
| 4 | Session | `/sessions` | Phase 1 (TermDescriptor), Phase 2, and optionally Phase 3 (AcademicWeek, GradingPeriod) |
| 4 | CalendarDate | `/calendarDates` | Phase 1 (CalendarEventDescriptor), Phase 3 (Calendar) |

## Phase 1: Descriptors

Each descriptor resource shares the same required-field shape: `codeValue`,
`namespace`, and `shortDescription`. See the [Bell Schedule domain
walkthrough](../bell-schedule/readme.md#step-1-gradeleveldescriptor) for an
example descriptor payload.

| Descriptor | Resource Endpoint | Used By |
| --- | --- | --- |
| GradeLevelDescriptor | `/gradeLevelDescriptors` | `School.gradeLevels` |
| EducationOrganizationCategoryDescriptor | `/educationOrganizationCategoryDescriptors` | `School.educationOrganizationCategories` |
| CalendarTypeDescriptor | `/calendarTypeDescriptors` | `Calendar.calendarTypeDescriptor` |
| CalendarEventDescriptor | `/calendarEventDescriptors` | `CalendarDate.calendarEvents[].calendarEventDescriptor` |
| GradingPeriodDescriptor | `/gradingPeriodDescriptors` | `GradingPeriod.gradingPeriodDescriptor` |
| TermDescriptor | `/termDescriptors` | `Session.termDescriptor` |

## Phase 2: School and SchoolYearType

`AcademicWeek`, `Calendar`, `GradingPeriod`, and `Session` all require a
`School`. `Calendar`, `GradingPeriod`, and `Session` additionally require a
`SchoolYearType`, which has no dependencies of its own.

### School

Resource: `schools`

- `POST /schools`
- `GET /schools`
- `GET /schools/{id}`
- `PUT /schools/{id}`
- `DELETE /schools/{id}`
- `GET /schools/deletes`
- `GET /schools/keyChanges`
- `GET /schools/partitions`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `schoolId` | integer | The identifier assigned to a school. |
| `nameOfInstitution` | string | The full, legally accepted name of the institution. |
| `gradeLevels[].gradeLevelDescriptor` | string | Reference to a `GradeLevelDescriptor` created in Phase 1. |
| `educationOrganizationCategories[].educationOrganizationCategoryDescriptor` | string | Reference to an `EducationOrganizationCategoryDescriptor` created in Phase 1. |

#### Example

```json
{
  "schoolId": 255901001,
  "nameOfInstitution": "Grand Bend High School",
  "gradeLevels": [
    { "gradeLevelDescriptor": "uri://ed-fi.org/GradeLevelDescriptor#Ninth grade" }
  ],
  "educationOrganizationCategories": [
    { "educationOrganizationCategoryDescriptor": "uri://ed-fi.org/EducationOrganizationCategoryDescriptor#School" }
  ]
}
```

### SchoolYearType

Resource: `schoolYearTypes`

- `POST /schoolYearTypes`
- `GET /schoolYearTypes`
- `GET /schoolYearTypes/{id}`
- `PUT /schoolYearTypes/{id}`
- `DELETE /schoolYearTypes/{id}`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `schoolYear` | integer | Key for the school year. |
| `currentSchoolYear` | boolean | Indicates whether this is the current school year. |
| `schoolYearDescription` | string | The description for the school year type. |

#### Example

```json
{
  "schoolYear": 2020,
  "currentSchoolYear": true,
  "schoolYearDescription": "2019-2020"
}
```

## Phase 3: AcademicWeek, GradingPeriod, and Calendar

These three entities each depend only on the School (and, for `GradingPeriod`
and `Calendar`, the SchoolYearType) created in Phase 2.

### AcademicWeek

Resource: `academicWeeks`

- `POST /academicWeeks`
- `GET /academicWeeks`
- `GET /academicWeeks/{id}`
- `PUT /academicWeeks/{id}`
- `DELETE /academicWeeks/{id}`
- `GET /academicWeeks/deletes`
- `GET /academicWeeks/keyChanges`
- `GET /academicWeeks/partitions`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `weekIdentifier` | string | The school label for the week. |
| `beginDate` | string (date) | The start date for the academic week. |
| `endDate` | string (date) | The end date for the academic week. |
| `totalInstructionalDays` | integer | The total instructional days during the academic week. |
| `schoolReference.schoolId` | integer | Reference to the `School` created in Phase 2. |

#### Example

```json
{
  "weekIdentifier": "Week 1",
  "schoolReference": { "schoolId": 255901001 },
  "beginDate": "2020-08-24",
  "endDate": "2020-08-28",
  "totalInstructionalDays": 5
}
```

### GradingPeriod

Resource: `gradingPeriods`

- `POST /gradingPeriods`
- `GET /gradingPeriods`
- `GET /gradingPeriods/{id}`
- `PUT /gradingPeriods/{id}`
- `DELETE /gradingPeriods/{id}`
- `GET /gradingPeriods/deletes`
- `GET /gradingPeriods/keyChanges`
- `GET /gradingPeriods/partitions`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `gradingPeriodDescriptor` | string | Reference to a `GradingPeriodDescriptor` created in Phase 1. |
| `gradingPeriodName` | string | The school's descriptive name of the grading period. |
| `beginDate` | string (date) | The first day of the grading period. |
| `endDate` | string (date) | The last day of the grading period. |
| `totalInstructionalDays` | integer | Total days available for educational instruction during the grading period. |
| `schoolReference.schoolId` | integer | Reference to the `School` created in Phase 2. |
| `schoolYearTypeReference.schoolYear` | integer | Reference to the `SchoolYearType` created in Phase 2. |

#### Commonly Used Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `periodSequence` | integer | The sequential order of this period relative to other periods. |

#### Example

```json
{
  "gradingPeriodDescriptor": "uri://ed-fi.org/GradingPeriodDescriptor#First Six Weeks",
  "gradingPeriodName": "First Six Weeks",
  "schoolReference": { "schoolId": 255901001 },
  "schoolYearTypeReference": { "schoolYear": 2020 },
  "beginDate": "2020-08-24",
  "endDate": "2020-10-02",
  "totalInstructionalDays": 30
}
```

### Calendar

Resource: `calendars`

- `POST /calendars`
- `GET /calendars`
- `GET /calendars/{id}`
- `PUT /calendars/{id}`
- `DELETE /calendars/{id}`
- `GET /calendars/deletes`
- `GET /calendars/keyChanges`
- `GET /calendars/partitions`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `calendarCode` | string | The identifier for the calendar. |
| `calendarTypeDescriptor` | string | Reference to a `CalendarTypeDescriptor` created in Phase 1. |
| `schoolReference.schoolId` | integer | Reference to the `School` created in Phase 2. |
| `schoolYearTypeReference.schoolYear` | integer | Reference to the `SchoolYearType` created in Phase 2. |

#### Commonly Used Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `gradeLevels[].gradeLevelDescriptor` | string | Reference to a `GradeLevelDescriptor` created in Phase 1; per Best Practices, populate this when a school maintains separate calendars by grade level. |

#### Example

```json
{
  "calendarCode": "2019-2020 Calendar",
  "schoolReference": { "schoolId": 255901001 },
  "schoolYearTypeReference": { "schoolYear": 2020 },
  "calendarTypeDescriptor": "uri://ed-fi.org/CalendarTypeDescriptor#Student Specific"
}
```

## Phase 4: Session and CalendarDate

### Session

`Session` requires the School and SchoolYearType from Phase 2, and may
optionally reference the `AcademicWeek`(s) and `GradingPeriod`(s) created in
Phase 3. Per the Data Standard's best practices, sessions capture terms for
which credits are awarded and are independent of the `Calendar` entity.

Resource: `sessions`

- `POST /sessions`
- `GET /sessions`
- `GET /sessions/{id}`
- `PUT /sessions/{id}`
- `DELETE /sessions/{id}`
- `GET /sessions/deletes`
- `GET /sessions/keyChanges`
- `GET /sessions/partitions`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `sessionName` | string | The identifier for the academic session. |
| `termDescriptor` | string | Reference to a `TermDescriptor` created in Phase 1. |
| `beginDate` | string (date) | The first day of the session. |
| `endDate` | string (date) | The last day of the session. |
| `totalInstructionalDays` | integer | Total instructional days in the session. |
| `schoolReference.schoolId` | integer | Reference to the `School` created in Phase 2. |
| `schoolYearTypeReference.schoolYear` | integer | Reference to the `SchoolYearType` created in Phase 2. |

#### Commonly Used Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `academicWeeks[].academicWeekReference` | object | Reference(s) to `AcademicWeek`(s) created in Phase 3. |
| `gradingPeriods[].gradingPeriodReference` | object | Reference(s) to `GradingPeriod`(s) created in Phase 3. |

#### Example

```json
{
  "sessionName": "2019-2020 Fall Semester",
  "schoolReference": { "schoolId": 255901001 },
  "schoolYearTypeReference": { "schoolYear": 2020 },
  "termDescriptor": "uri://ed-fi.org/TermDescriptor#Semester",
  "beginDate": "2020-08-24",
  "endDate": "2020-12-18",
  "totalInstructionalDays": 80,
  "gradingPeriods": [
    {
      "gradingPeriodReference": {
        "gradingPeriodDescriptor": "uri://ed-fi.org/GradingPeriodDescriptor#First Six Weeks",
        "schoolId": 255901001,
        "schoolYear": 2020
      }
    }
  ]
}
```

### CalendarDate

`CalendarDate` requires the `Calendar` created in Phase 3 and at least one
`CalendarEventDescriptor` from Phase 1.

Resource: `calendarDates`

- `POST /calendarDates`
- `GET /calendarDates`
- `GET /calendarDates/{id}`
- `PUT /calendarDates/{id}`
- `DELETE /calendarDates/{id}`
- `GET /calendarDates/deletes`
- `GET /calendarDates/keyChanges`
- `GET /calendarDates/partitions`

#### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `date` | string (date) | The date of the calendar event. |
| `calendarEvents[].calendarEventDescriptor` | string | Reference to a `CalendarEventDescriptor` created in Phase 1. |
| `calendarReference` | object | Reference to the `Calendar` created in Phase 3 (`calendarCode` + `schoolId` + `schoolYear`). |

#### Example

```json
{
  "date": "2020-08-24",
  "calendarReference": {
    "calendarCode": "2019-2020 Calendar",
    "schoolId": 255901001,
    "schoolYear": 2020
  },
  "calendarEvents": [
    { "calendarEventDescriptor": "uri://ed-fi.org/CalendarEventDescriptor#Instructional day" }
  ]
}
```

## Related Entities (Not Required for School Calendar CRUD)

The Data Standard's [School Calendar Domain - Entities, References, and
Descriptors](/reference/data-exchange/data-standard/5/model-reference/school-calendar-domain/entities-references-and-descriptors)
page lists `EducationOrganization`, `Student`, and `StudentSchoolAssociation`
as extended references. `EducationOrganization` is satisfied above via the
concrete `School` type (Phase 2). `Student` and `StudentSchoolAssociation`
are not required by any resource in this domain's schema — the Best
Practices guidance notes that `StudentSchoolAssociation.calendarReference`
SHOULD be populated during enrollment, but that association belongs to the
Student Information domain, not to CRUD operations on the School Calendar
resources themselves.
