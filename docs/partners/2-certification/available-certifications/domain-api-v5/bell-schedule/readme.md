# Domain Certification API v5 - Bell Schedule

The Bell Schedule domain represents the start time and duration of one or more
class periods in a day or over a course of days. Certifying against this
domain requires successfully exercising the full set of CRUD operations on the
`bellSchedules` resource.

Before a `BellSchedule` can be created, the API data store must already
contain the descriptor values and reference entities that `BellSchedule`
depends on. The steps below are ordered so that each one only depends on data
created in a previous step — following them in order will satisfy every
dependency `POST /bellSchedules` requires.

:::tip
See the Data Standard's [Bell Schedule Domain -
Overview](/reference/data-exchange/data-standard/5/model-reference/bell-schedule-domain/overview)
and [Bell Schedule Domain - Entities, References, and
Descriptors](/reference/data-exchange/data-standard/5/model-reference/bell-schedule-domain/entities-references-and-descriptors)
for the conceptual model behind these steps.
:::

## Dependency Order

| Step | Entity / Descriptor | Resource Endpoint | Depends On |
| --- | --- | --- | --- |
| 1 | GradeLevelDescriptor | `/gradeLevelDescriptors` | None |
| 2 | EducationOrganizationCategoryDescriptor | `/educationOrganizationCategoryDescriptors` | None |
| 3 | School | `/schools` | Steps 1-2 |
| 4 | ClassPeriod | `/classPeriods` | Step 3 |
| 5 | BellSchedule | `/bellSchedules` | Steps 1, 3, 4 |

## Step 1: GradeLevelDescriptor

`School.gradeLevels` and `BellSchedule.gradeLevels` both reference
`gradeLevelDescriptor` values, so at least one grade level descriptor must
exist before a School or a BellSchedule with grade levels can be created.

Resource: `gradeLevelDescriptors`

- `POST /gradeLevelDescriptors`
- `GET /gradeLevelDescriptors`
- `GET /gradeLevelDescriptors/{id}`
- `PUT /gradeLevelDescriptors/{id}`
- `DELETE /gradeLevelDescriptors/{id}`

### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `codeValue` | string | A code or abbreviation that is used to refer to the descriptor (e.g., `Ninth grade`). |
| `namespace` | string | A globally unique namespace that identifies this descriptor set (e.g., `uri://ed-fi.org/GradeLevelDescriptor`). |
| `shortDescription` | string | A shortened description for the descriptor. |

### Example

```json
{
  "codeValue": "Ninth grade",
  "namespace": "uri://ed-fi.org/GradeLevelDescriptor",
  "shortDescription": "Ninth grade"
}
```

## Step 2: EducationOrganizationCategoryDescriptor

`School.educationOrganizationCategories` requires at least one
`educationOrganizationCategoryDescriptor` value (e.g., `School`) to classify
the education organization.

Resource: `educationOrganizationCategoryDescriptors`

- `POST /educationOrganizationCategoryDescriptors`
- `GET /educationOrganizationCategoryDescriptors`
- `GET /educationOrganizationCategoryDescriptors/{id}`
- `PUT /educationOrganizationCategoryDescriptors/{id}`
- `DELETE /educationOrganizationCategoryDescriptors/{id}`

### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `codeValue` | string | A code or abbreviation that is used to refer to the descriptor (e.g., `School`). |
| `namespace` | string | A globally unique namespace that identifies this descriptor set (e.g., `uri://ed-fi.org/EducationOrganizationCategoryDescriptor`). |
| `shortDescription` | string | A shortened description for the descriptor. |

### Example

```json
{
  "codeValue": "School",
  "namespace": "uri://ed-fi.org/EducationOrganizationCategoryDescriptor",
  "shortDescription": "School"
}
```

## Step 3: School

`BellSchedule.schoolReference` and `ClassPeriod.schoolReference` both require
an existing `School`. A School in turn requires the grade level and education
organization category descriptors created in Steps 1-2.

Resource: `schools`

- `POST /schools`
- `GET /schools`
- `GET /schools/{id}`
- `PUT /schools/{id}`
- `DELETE /schools/{id}`
- `GET /schools/deletes`
- `GET /schools/keyChanges`
- `GET /schools/partitions`

### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `schoolId` | integer | The identifier assigned to a school. Must be distinct from any other education organization identifier. |
| `nameOfInstitution` | string | The full, legally accepted name of the institution. |
| `gradeLevels[].gradeLevelDescriptor` | string | Reference to a `GradeLevelDescriptor` created in Step 1. |
| `educationOrganizationCategories[].educationOrganizationCategoryDescriptor` | string | Reference to an `EducationOrganizationCategoryDescriptor` created in Step 2. |

### Commonly Used Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `schoolCategories[].schoolCategoryDescriptor` | string | The one or more categories of school (e.g., High School). |
| `localEducationAgencyReference` | object | Reference to the LEA that operates the school, if one is being certified alongside this domain. |
| `addresses[]` | array | Physical or mailing addresses for the school. |

### Example

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

## Step 4: ClassPeriod

`BellSchedule.classPeriods` requires at least one `ClassPeriod`, and each
`ClassPeriod` must reference the `School` created in Step 3.

Resource: `classPeriods`

- `POST /classPeriods`
- `GET /classPeriods`
- `GET /classPeriods/{id}`
- `PUT /classPeriods/{id}`
- `DELETE /classPeriods/{id}`
- `GET /classPeriods/deletes`
- `GET /classPeriods/keyChanges`
- `GET /classPeriods/partitions`

### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `classPeriodName` | string | An indication of the portion of a typical daily session in which students receive instruction (e.g., `First Period`). |
| `schoolReference.schoolId` | integer | Reference to the `School` created in Step 3. |

### Commonly Used Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `meetingTimes[]` | array | The meeting time(s) for the class period (`startTime` / `endTime`). |
| `officialAttendancePeriod` | boolean | Indicator of whether this class period is used for official daily attendance. |

### Example

```json
{
  "classPeriodName": "First Period",
  "schoolReference": {
    "schoolId": 255901001
  }
}
```

## Step 5: BellSchedule

With the descriptors, School, and ClassPeriod(s) in place, the `BellSchedule`
resource can now be created.

Resource: `bellSchedules`

- `POST /bellSchedules`
- `GET /bellSchedules`
- `GET /bellSchedules/{id}`
- `PUT /bellSchedules/{id}`
- `DELETE /bellSchedules/{id}`
- `GET /bellSchedules/deletes`
- `GET /bellSchedules/keyChanges`
- `GET /bellSchedules/partitions`

### Required Fields

| Field | Type | Description |
| --- | --- | --- |
| `bellScheduleName` | string | Name or title of the bell schedule. |
| `classPeriods[].classPeriodReference` | object | Reference(s) to the `ClassPeriod`(s) created in Step 4 (`classPeriodName` + `schoolId`). |
| `schoolReference.schoolId` | integer | Reference to the `School` created in Step 3. |

### Commonly Used Optional Fields

| Field | Type | Description |
| --- | --- | --- |
| `gradeLevels[].gradeLevelDescriptor` | string | Reference to a `GradeLevelDescriptor` created in Step 1; the grade levels this bell schedule applies to. |
| `dates[].date` | string (date) | The dates for which the bell schedule applies. |
| `startTime` / `endTime` | string | The time of day the bell schedule begins/ends. |
| `totalInstructionalTime` | integer | The total instructional time in minutes per day for the bell schedule. |
| `alternateDayName` | string | An alternate name for the day (e.g., Red, Blue). |

### Example

```json
{
  "bellScheduleName": "Standard Day",
  "schoolReference": {
    "schoolId": 255901001
  },
  "classPeriods": [
    {
      "classPeriodReference": {
        "classPeriodName": "First Period",
        "schoolId": 255901001
      }
    }
  ],
  "gradeLevels": [
    { "gradeLevelDescriptor": "uri://ed-fi.org/GradeLevelDescriptor#Ninth grade" }
  ],
  "startTime": "08:00:00",
  "endTime": "08:50:00",
  "totalInstructionalTime": 50
}
```

## Related Entities (Not Required for BellSchedule CRUD)

The Data Standard's [Bell Schedule Domain - Entities, References, and
Descriptors](/reference/data-exchange/data-standard/5/model-reference/bell-schedule-domain/entities-references-and-descriptors)
page lists `Section`, `Session`, and `EducationOrganization` as extended
references for the domain. These entities are related conceptually — for
example, a `Section` references a `ClassPeriod` to determine when it meets —
but none of them are required in order to successfully run CRUD operations
against `/bellSchedules`. They are not included as steps above because the
`edFi_bellSchedule` schema does not require them.
