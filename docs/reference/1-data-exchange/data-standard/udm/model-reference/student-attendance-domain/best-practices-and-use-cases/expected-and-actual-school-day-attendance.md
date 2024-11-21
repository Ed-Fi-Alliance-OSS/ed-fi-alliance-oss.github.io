<!-- # Expected and Actual School Day Attendance

## Report a Student's Expected Total Days in Attendance for the School Year

### Option 1: Using Session.TotalInstructionalDays

Expected Days in Attendance for the School Year = SUM (
Session.TotalInstructionalDays )

WHERE Session.School.SchoolId = { School Id for the attendance calculation }

    AND Session.SchoolYear = { Current School Year }

![Total Expected Attendance for School Year via Session](../../../../img/Total%20Expected%20Attendance%20for%20School%20Year%20via%20Session.png)

### Option 2: Using Calendar and CalendarDate

Expected Days in Attendance for the School Year = COUNT ( CalendarDate.Date )

WHERE CalendarDate.CalendarEventDescriptor IN { Instructional Day Calendar
Events }

    AND CalendarDate.Calendar = { School Calendar for the attendance calculation }

    AND Calendar.School = { School for the attendance calculation }

    AND Calendar.SchoolYear = { Current School Year }

![Total Expected Attendance for School Year via Calendar](../../../../img/Total%20Expected%20Attendance%20for%20School%20Year%20via%20Calendar.png)

#### Assumptions

* The school's sessions do not overlap.
* The school has a single calendar. If a school has multiple calendars, the
    calendar which applies to the student should be used.
* The student does not have an individual calendar. If a student has an
    individual calendar, the calendar as defined by StudentSchoolAssociation →
    Calendar reference should be used.
* The student is enrolled in the school for the entire session and school
    year.

## Report a Student's Actual Attendance for the School Year

Student School Attendance for the School Year = { Expected Days in Attendance
for the School Year (see above) } - COUNT (
StudentSchoolAttendanceEvent.AttendanceEvent.EventDate )

WHERE
StudentSchoolAttendanceEvent.AttendanceEvent.AttendanceEventCategoryDescriptor
IN { Absent categories (e.g., Excused Absence, Unexcused Absence) as defined by
the implementation }

    AND StudentSchoolAttendanceEvent.Student= { Student for the attendance calculation }

    AND StudentSchoolAttendanceEvent.School = { School for the attendance calculation }

    AND StudentSchoolAttendanceEvent.Session = { All sessions within the school year }

![Actual Attendance for School Year](../../../../img/Actual%20Attendance%20for%20School%20Year.png)

#### Assumptions

* The school's sessions do not overlap.
* The student is enrolled in the school for the entire session and school
    year.
* Days are reported as whole numbers. If reported as partial days,
    StudentSchoolAttendanceEvent → SchoolAttendanceDuration or
    StudentSchoolAttendanceEvent → AttendanceEvent → EventDuration may be used. -->
