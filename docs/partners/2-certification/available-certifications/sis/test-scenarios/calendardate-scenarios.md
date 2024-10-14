# v5 Education Organization Calendar > CalendarDate Scenarios

This entity represents the type of scheduled or unscheduled event for the day.

## Prerequisites

* Calendar

## Scenarios

1. Create a holiday calendar date for the calendar at Grand Bend Elementary
   School
2. Create an Instructional day calendar date for the calendar at Grand Bend High
   School
3. Update the calendarEventDescriptor on the calendar date for Grand Bend
   Elementary School. Change from Holiday to half Instructional day and half
   Early dismissal.
4. Update the calendarEventDescriptor on the calendar date for Grand Bend High
   School to Holiday

| Resource                   | Property Name           | Is Collection | Data Type               | Required / Optional | Scenario 1: POST         | Scenario 2: POST         | Scenario 3: PUT                                               | Scenario 4: PUT          |
| -------------------------- | ----------------------- | ------------- | ----------------------- | ------------------- | ---------------------------- | ---------------------------- | ----------------------------------------------------------------- | ---------------------------- |
| CalendarDates              | date                    | FALSE         | date                    | REQUIRED            | 9/16/\[Current School Year\] | 9/16/\[Current School Year\] | 9/16/\[Current School Year\]                                      | 9/16/\[Current School Year\] |
| CalendarDates              | calendarReference       | FALSE         | calendarReference       | REQUIRED            |                              |                              |                                                                   |                              |
| calendarReference          | calendarCode            | FALSE         | int                     | REQUIRED            | 107SS111111                  | IEP001                       | 107SS111111                                                       | IEP001                       |
| calendarReference          | schoolId                | FALSE         | integer                 | REQUIRED            | 255901107                    | 255901001                    | 255901107                                                         | 255901001                    |
| calendarReference          | schoolYear              | FALSE         | int                     | REQUIRED            | \[Current School Year\]      | \[Current School Year\]      | \[Current School Year\]                                           | \[Current School Year\]      |
| CalendarDates              | calendarEvents          | TRUE          | CalendarEvent\[\]       | REQUIRED            |                              |                              |                                                                   |                              |
| calendarDateCalendarEvents | calendarEventDescriptor | FALSE         | calendarEventDescriptor | REQUIRED            | Holiday                      | Instructional Day            | Instructional day &<br/>Student late arrival<br/>/early dismissal | Holiday                      |
