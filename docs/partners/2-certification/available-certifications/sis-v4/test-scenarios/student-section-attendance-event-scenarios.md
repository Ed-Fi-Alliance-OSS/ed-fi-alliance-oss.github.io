---
hide_table_of_contents: true
---

# v4 Student Attendance > StudentSectionAttendanceEvent Scenarios

The Student Attendance Interchange describes student attendance and
attendance taken events. It can be used to exchange daily, section,
intervention, or program attendance events. It may be used in cases where only
absences are reported (attendance is assumed if no absence is reported), or
where both attendance and absences are reported.

This event entity represents the recording of whether a student is in attendance
for a section.

## Prerequisites

* Student
* Section

### Scenarios

1. Create a Tardy Section Attendance Event for Austin Jones.
2. Create an Unexcused Absence Section Attendance event for Madison Johnson.
3. Add an attendanceEventReason on the Attendance Event for Austin Jones.
4. Add an attendanceEventReason on the Attendance Event for Madison Johnson.
5. Delete the attendance event for Austin Jones.

| Resource                       | Property Name                     | Is Collection | Data Type                         | Required | Scenario 1: POST                               | Scenario 2: POST                              | Scenario 3: PUT                                | Scenario 4: PUT                               |
| ------------------------------ | --------------------------------- | ------------- | --------------------------------- | -------- | ---------------------------------------------- | --------------------------------------------- | ---------------------------------------------- | --------------------------------------------- |
| StudentSectionAttendanceEvents | sectionReference                  | FALSE         | sectionReference                  | REQUIRED |                                                |                                               |                                                |                                               |
| sectionReference               | localCourseCode                   | FALSE         | string                            | REQUIRED | ["ELA-01" if possible \| system value]         | ["ALG-2" if possible \| system value]         | ["ELA-01" if possible \| system value]         | ["ALG-2" if possible\| system value]          |
| sectionReference               | schoolId                          | FALSE         | integer                           | REQUIRED | 255901107                                      | 255901001                                     | 255901107                                      | 255901001                                     |
| sectionReference               | schoolYear                        | FALSE         | integer                           | REQUIRED | 2017                                           | 2017                                          | 2017                                           | 2017                                          |
| sectionReference               | sectionIdentifier                 | FALSE         | string                            | REQUIRED | ["ELA012017RM555" if possible \| system value] | ["ALG12017RM901" if possible \| system value] | ["ELA012017RM555" if possible \| system value] | ["ALG12017RM901" if possible \| system value] |
| sectionReference               | sessionName                       | FALSE         | string                            | REQUIRED | 2016-2017 Fall Semester                        | 2016-2017 Fall Semester                       | 2016-2017 Fall Semester                        | 2016-2017 Fall Semester                       |
| StudentSectionAttendanceEvents | studentReference                  | FALSE         | studentReference                  | REQUIRED |                                                |                                               |                                                |                                               |
| studentReference               | studentUniqueId                   | FALSE         | string                            | REQUIRED | 111111                                         | 222222                                        | 111111                                         | 222222                                        |
| StudentSectionAttendanceEvents | attendanceEventCategoryDescriptor | FALSE         | attendanceEventCategoryDescriptor | REQUIRED | Tardy                                          | Unexcused Absence                             | Tardy                                          | Unexcused Absence                             |
| StudentSectionAttendanceEvents | eventDate                         | FALSE         | date                              | REQUIRED | 9/16/\[Current School Year]                    | 10/5/\[Current School Year]                   | 9/16/\[Current School Year]                    | 10/5/\[Current School Year]                   |
| StudentSectionAttendanceEvents | attendanceEventReason             | FALSE         | string                            | REQUIRED |                                                |                                               | Late                                           | No Note                                       |
| StudentSectionAttendanceEvents | educationalEnvironmentDescriptor   | FALSE         | educationalEnvironmentDescriptor   | OPTIONAL |                                                |                                               |                                                |                                               |
| StudentSchoolAttendanceEvents   | eventDuration                     | FALSE         | string                            | OPTIONAL |                                                |                                               |                                                |                                               |
| StudentSchoolAttendanceEvents   | arrivalTime                       | FALSE         | time                              | OPTIONAL |                                                |                                               |                                                |                                               |
| StudentSchoolAttendanceEvents   | departureTime                     | FALSE         | time                              | OPTIONAL |                                                |                                               |                                                |                                               |
