# ews_StudentEarlyWarningFact View

## Purpose

This is the center of the star schema for the Early Warning System, bringing
together all relevant measures for a student with separate rows for each measure
entry.

## SQL Object Name

`analytics.ews_StudentEarlyWarningFact`

## Usage Notes

Which factors are used for calculating attendance depends on the school and on
how attendance is recorded in the source systems. Some systems may record
attendance in the positive sense (student is present), while others might only
record when the student is absent or late.

## Data Definition and Sources

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| ​StudentKey | ​int | StudentSchoolAssociation.StudentUniqueId​ |     |
| SchoolKey | int | StudentSchoolAssociation.SchoolId |     |
| DateKey | varchar | CalendarDateCalendarEvent.Date<br/><br/>_Selects all records for the given school where the Calendar Date is greater than or equal to the StudentSchoolAssociation.EntryDate and less than or equal to the StudentSchoolAssociation.ExitWithdrawDate._ <br/><br/>_StudentSchoolAttendanceEvent.EventDate is also used to collect presence, absence and tardy associated Dates._ | YYYY-MM-DD |
| IsInstructionalDay | bit | CalendarDateCalendarEvent.CalendarDateCalendarEventDescriptorId matches to Descriptor Constant for "InstructionalDay" | Is this date an instructional day |
| IsEnrolled | bit | None | Always 1 - a convenience column for sums and counts |
| IsPresentSchool | bit | StudentSchoolAttendanceEvent.AttendanceEventDescriptorId matching to "attendance" type Descriptor Constants | 1 if there are any attendance event records matching to the Descriptor constant "Present".<br/><br/>Else 0 - the student was not marked as present at school.<br/><br/>> [!TIP]<br/>> In some education agencies, attendance is only calculated in the negative: records showing absence. Thus for a particular organization, a student might be considered to have attended school so long as IsAbsentFromSchoolExcused = 0 and IsAbsentFromSchoolUnexcused = 0 - even though IsPresent =0 as well! |
| IsAbsentFromSchoolExcused | bit | StudentSchoolAttendanceEvent.AttendanceEventDescriptorId matching to "attendance" type Descriptor Constants | 1 if there are any attendance event records matching to the Descriptor Constant "Excused Absence"<br/><br/>Else 0 - the student was marked as absent from school (excused) |
| IsAbsentFromSchoolUnexcused | bit | StudentSchoolAttendanceEvent.AttendanceEventDescriptorId matching to "attendance" type Descriptor Constants | 1 if there are any attendance event records matching to the Descriptor Constant "Unexcused Absence"<br/><br/>Else 0 - the student was marked as absent from school (unexcused). |
| IsTardyToSchool | bit | StudentSchoolAttendanceEvent.AttendanceEventDescriptorId matching to "attendance" type Descriptor Constants | 1 if there are any attendance event records matching to the Descriptor Constant "Tardy"<br/><br/>Else 0 - the student was tardy to school. |
| IsPresentHomeroom | bit | StudentSectionAttendanceEvent.AttendanceEventDescriptorId matching to "attendance" type Descriptor Constants, where StudentSectionAssociation.HomeroomIndicator = 1 | 1 if there are any attendance event records matching to the Descriptor constant "Present".<br/><br/>Else 0 - the student was not marked as present at homeroom. |
| IsAbsentFromHomeroomExcused | bit | StudentSectionAttendanceEvent.AttendanceEventDescriptorId matching to "attendance" type Descriptor Constants, where StudentSectionAssociation.HomeroomIndicator = 1 | 1 if there are any attendance event records matching to the Descriptor Constant "Excused Absence"<br/><br/>Else 0 - the student was marked as absent from homeroom (excused) |
| IsAbsentFromHomeroomUnexcused | bit | StudentSectionAttendanceEvent.AttendanceEventDescriptorId matching to "attendance" type Descriptor Constants, where StudentSectionAssociation.HomeroomIndicator = 1 | 1 if there are any attendance event records matching to the Descriptor Constant "Unexcused Absence"<br/><br/>Else 0 - the student was marked as absent from homeroom (unexcused). |
| IsTardyToHomeroom | bit | StudentSectionAttendanceEvent.AttendanceEventDescriptorId matching to "attendance" type Descriptor Constants, where StudentSectionAssociation.HomeroomIndicator = 1 | 1 if there are any attendance event records matching to the Descriptor Constant "Tardy"<br/><br/>Else 0 - the student was tardy to homeroom. |
| IsPresentAnyClass | bit | StudentSectionAttendanceEvent.AttendanceEventDescriptorId matching to "attendance" type Descriptor Constants | 1 if there are any attendance event records matching to the Descriptor constant "Present".<br/><br/>Else 0 - the student was not marked as present in any class. |
| IsAbsentFromAnyClassExcused | bit | StudentSectionAttendanceEvent.AttendanceEventDescriptorId matching to "attendance" type Descriptor Constants | 1 if there are any attendance event records matching to the Descriptor Constant "Excused Absence"<br/><br/>Else 0 - the student was marked as absent from at least one class (excused) |
| IsAbsentFromAnyClassUnexcused | bit | StudentSectionAttendanceEvent.AttendanceEventDescriptorId matching to "attendance" type Descriptor Constants | 1 if there are any attendance event records matching to the Descriptor Constant "Unexcused Absence"<br/><br/>Else 0 - the student was marked as absent from at least one class (unexcused). |
| IsTardyToAnyClass | bit | StudentSectionAttendanceEvent.AttendanceEventDescriptorId matching to "attendance" type Descriptor Constants | 1 if there are any attendance event records matching to the Descriptor Constant "Tardy"<br/><br/>Else 0 - the student was tardy to at least one class. |
| CountByDayOfStateOffenses | int | StudentDisciplineIncidentAssociation where incident descriptor matches Descriptor Constant "Behavior.StateOffense" | Count of records on the given calendar date |
| CountByDayOfConductOffsenses | int | StudentDisciplineIncidentAssociation where incident descriptor matches Descriptor Constant "Behavior.Behavior.SchoolCodeOfConductOffense" | Count of records on the given calendar date |
