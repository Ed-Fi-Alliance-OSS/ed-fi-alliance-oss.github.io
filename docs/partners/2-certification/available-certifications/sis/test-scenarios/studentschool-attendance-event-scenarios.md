# v5 Student Attendance > StudentSchoolAttendanceEvent Scenarios

The Student Attendance Interchange describes student attendance and
attendance taken events. It can be used to exchange daily, section,
intervention, or program attendance events. It may be used in cases where only
absences are reported (attendance is assumed if no absence is reported), or
where both attendance and absences are reported.

The StudentSchoolAttendanceEvent entity represents the recording of whether a
student is in attendance for a school day.

### Prerequisites

- Student
- Section
- Student Enrollment

### Scenarios

1. Create a Tardy Attendance Event for Austin Jones.
2. Create an Unexcused Absence Attendance event for Madison Johnson.
3. Add an Attendance Event Reason on the Attendance Event for Austin Jones.
4. Add an Attendance Event Reason on the Attendance Event for Madison Johnson.

5. Delete the Attendance Event for Austin Jones.

| Resource                      | Property Name                     | Is Collection | Data Type                         | Required / Optional | Scenario 1 <br/>POST         | Scenario 2 <br/>POST         | Scenario 3 <br/>PUT          | Scenario 4 <br/>PUT          |
| ----------------------------- | --------------------------------- | ------------- | --------------------------------- | ------------------- | ---------------------------- | ---------------------------- | ---------------------------- | ---------------------------- |
| StudentSchoolAttendanceEvents | schoolReference                   | FALSE         | schoolReference                   | REQUIRED            |                              |                              |                              |                              |
| schoolReference               | schoolId                          | FALSE         | integer                           | REQUIRED            | 255901107                    | 255901001                    | 255901107                    | 255901001                    |
| StudentSchoolAttendanceEvents | sessionReference                  | FALSE         | sessionReference                  | REQUIRED            |                              |                              |                              |                              |
| sessionReference              | schoolId                          | FALSE         | integer                           | REQUIRED            | 255901107                    | 255901001                    | 255901107                    | 255901001                    |
| sessionReference              | schoolYear                        | FALSE         | integer                           | REQUIRED            | \[Current School Year\]      | \[Current School Year\]      | \[Current School Year\]      | \[Current School Year\]      |
| sessionReference              | sessionName                       | FALSE         | string                            | REQUIRED            | 2016-2017 Fall Semester      | 2016-2017 Fall Semester      | 2016-2017 Fall Semester      | 2016-2017 Fall Semester      |
| StudentSchoolAttendanceEvents | studentReference                  | FALSE         | studentReference                  | REQUIRED            |                              |                              |                              |                              |
| studentReference              | studentUniqueId                   | FALSE         | string                            | REQUIRED            | 111111                       | 222222                       | 111111                       | 222222                       |
| StudentSchoolAttendanceEvents | attendanceEventCategoryDescriptor | FALSE         | attendanceEventCategoryDescriptor | REQUIRED            | Tardy                        | Unexcused Absence            | Tardy                        | Unexcused Absence            |
| StudentSchoolAttendanceEvents | eventDate                         | FALSE         | date                              | REQUIRED            | 9/16/\[Current School Year\] | 10/5/\[Current School Year\] | 9/16/\[Current School Year\] | 10/5/\[Current School Year\] |
| StudentSchoolAttendanceEvents | attendanceEventReason             | FALSE         | string                            | REQUIRED            |                              |                              | Late                         | No Note                      |
