# v5 Education Organization Calendar > Calendar Scenarios

This entity represents a set of dates associated with an organization.

## Prerequisites

- None

## Scenarios

1. Create an IEP calendar for the elementary school.
2. Create an IEP calendar for the high school for ninth grade.
3. Update the calendar for the elementary school to be student specific.
4. Update the calendar for the high school to include tenth grade also.

| Resource                | Property Name          | Is Collection | Data Type              | Required / Optional | Scenario 1 <br/>POST    | Scenario 2 <br/>POST  | Scenario 3 <br/>PUT     | Scenario 4 <br/>PUT             |
| ----------------------- | ---------------------- | ------------- | ---------------------- | ------------------- | ----------------------- | --------------------- | ----------------------- | ------------------------------- |
| Calendars               | calendarCode           | FALSE         | string                 | REQUIRED            | `<br/>107SS111111<br/>` | IEP001                | `<br/>107SS111111<br/>` | IEP001                          |
| Calendars               | schoolReference        | FALSE         | schoolReference        | REQUIRED            |                         |                       |                         |                                 |
| schoolReference         | schoolId               | FALSE         | integer                | REQUIRED            | 255901107               | 255901001             | 255901107               | 255901001                       |
| Calendars               | schooYearTypeReference | FALSE         | schooYearTypeReference | REQUIRED            |                         |                       |                         |                                 |
| schoolYearTypeReference | schoolYear             | FALSE         | int                    | REQUIRED            | [Current School Year]   | [Current School Year] | [Current School Year]   | [Current School Year]           |
| Calendars               | calendarTypeDescriptor | FALSE         | calendarTypeDescriptor | REQUIRED            | IEP                     | IEP                   | **Student Specific**    | IEP                             |
| Calendars               | gradelevels            | TRUE          | gradeLevels[]          | CONDITIONAL         |                         |                       |                         |                                 |
| calendarGradeLevels     | gradeLevelDescriptor   | FALSE         | string                 | CONDITIONAL         |                         | Ninth grade           |                         | Ninth grade<br/>**Tenth grade** |
