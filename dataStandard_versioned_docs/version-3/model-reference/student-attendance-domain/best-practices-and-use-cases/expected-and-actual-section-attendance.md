# Expected and Actual Section Attendance

## Report a student's expected total days in attendance for a section

```sql

Expected Days in Attendance for a Section = Section → CourseOffering →
Session.TotalInstructionalDays

WHERE Section = { Section for the attendance calculation }

```

![Total Expected Attendance for Section Year](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Total%20Expected%20Attendance%20for%20Section%20Year.png)

#### Assumption

* The student is enrolled for the entire session associated with the section.

## Report a student's actual attendance for a section

```sql

Student Section Attendance = { Expected Days in Attendance for the Section (see
above) } - COUNT ( StudentSectionAttendanceEvent.AttendanceEvent.EventDate )

WHERE
StudentSectionAttendanceEvent.AttendanceEvent.AttendanceEventCategoryDescriptor
IN { Absent categories (e.g., Excused Absence, Unexcused Absence) as defined by
the implementation }

    AND StudentSectionAttendanceEvent.Student= { Student for the attendance calculation }

    AND StudentSectionAttendanceEvent.Section = { Section for the attendance calculation }

```

![Actual Attendance for a Section](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Actual-Attendance-for-a-Section.png)

#### Assumptions

* The student is enrolled in the section for the entire session.
* Days are reported as whole numbers. If reported as partial days,
    StudentSectionAttendanceEvent → SectionAttendanceDuration or
    StudentSectionAttendanceEvent → AttendanceEvent → EventDuration may be used.
