---
hide_table_of_contents: true
---

# v5 Education Organization > Class Period Scenarios

This entity represents the designation of a regularly scheduled series of class
meetings at designated times and days of the week.

## Prerequisites

* None

## Scenarios

1. Create a Class Period for Grand Bend Elementary School
2. Create a Class Period for Grand Bend High School
3. Update the Class Period Name on the newly added Grand Bend Elementary School
   Class Period
4. Update the Official Attendance Period on the newly added Grand Bend High
   School Class Period

| Resource                | Property Name   | Is Collection | Data Type       | Required | Scenario 1: POST                               | Scenario 2: POST                               | Scenario 3: PUT                                      | Scenario 4: PUT                                |
| ----------------------- | --------------- | ------------- | --------------- | -------- | ---------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------- |
| ClassPeriods            | classPeriodName | FALSE         | string          | REQUIRED | ["Class Period 1" if possible \| system value] | ["Class Period 1" if possible \| system value] | ["Class Period **01**" if possible  \| system value] | ["Class Period 1" if possible \| system value] |
| ClassPeriods            | schoolReference | FALSE         | schoolReference | REQUIRED |                                                |                                                |                                                      |                                                |
| schoolReference         | schoolId        | FALSE         | integer         | REQUIRED | 255901107                                      | 255901001                                      | 255901107                                            | 255901001                                      |
| ClassPeriods            | meetingTimes    | TRUE          | Collection      | REQUIRED |                                                |                                                |                                                      |                                                |
| classPeriodMeetingTimes | startTime       | FALSE         | string          | REQUIRED |                                                | 8:15:00                                        |                                                      | **8:35:00**                                    |
| classPeriodMeetingTimes | endTime         | FALSE         | string          | REQUIRED |                                                | 9:25:00                                        |                                                      | 9:25:00                                        |
