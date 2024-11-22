# Expected and Actual Program/Intervention Attendance

## Report a student's expected total time in attendance for a program or intervention

:::warning

Expected, or prescribed attendance is not supported for the generic
StudentProgramAssociation or its sub-classes. Expected attendance is only
available in StudentSpecialEducationProgramAssociation and
StudentLanguageInstructionProgramAssociation. The use cases below are therefore
limited to those two program types.

:::

### For a special education program

```sql

Expected Time in Attendance for a Special Education Program = (
StudentSpecialEducationProgramAssociation.SpecialEducationHoursPerWeek )

    \* COUNT ( ( StudentSpecialEducationProgramAssociation.EndDate - StudentSpecialEducationProgramAssociation.BeginDate ) / 7 )

WHERE StudentSpecialEducationProgramAssociation.Program = { Program for the
attendance calculation }

    AND StudentSpecialEducationProgramAssociation.Student= { Student for the attendance calculation }

```

![Total Expected Attendance for Special Education Program](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Total%20Expected%20Attendance%20for%20Special%20Education%20Program.png)

### For a language instruction program

```sql

Expected Time in Attendance for a Language Instruction Program =
StudentLanguageInstructionProgramAssociation.Dosage

WHERE StudentLanguageInstructionProgramAssociation.Program = { Program for the
attendance calculation }

    AND StudentLanguageInstructionProgramAssociation.Student= { Student for the attendance calculation }

```

![Total Expected Attendance for Language Instruction Program](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Total%20Expected%20Attendance%20for%20Language%20Instruction%20Program.png)

### For an intervention

```sql

Expected Time in Attendance for an Intervention =
StudentInterventionAssociation.Dosage

WHERE StudentInterventionAssociation.Intervention= { Intervention for the
attendance calculation }

    AND StudentInterventionAssociation.Student= { Student for the attendance calculation }

```

![Total Expected Attendance for Intervention](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Total%20Expected%20Attendance%20for%20Intervention.png)

#### Assumptions

* The student is actively participating in the special education program
    between the association BeginDate and EndDate values. If not, the
    ParticipationStatus.StatusBeginDate and ParticipationStatus.StatusEndDate
    values where ParticipationStatus.ParticipationStatusDescriptor is equal to
    an active status should be used for the calculation.
* Expected time in attendance for a special education program is reported in
    hours.
* Expected time in attendance for a language instruction program and an
    intervention are both reported in minutes.

## Report a student's actual attendance for a program

Student attendance for a program requires positive attendance to be recorded.
Unlike with school and section attendance, positive attendance for a program
cannot be otherwise derived from the model. The following use case therefore
assumes positive attendance is taken for a student in a program. Special
education and language instruction programs, as described in the previous use
case, are the exceptions to this rule.

### Option 1: When EventDuration is used to capture portions of a school day in attendance

```sql

Student Program Attendance = SUM (
StudentProgramAttendanceEvent.AttendanceEvent.EventDuration )

    \* COUNT ( StudentProgramAttendanceEvent.AttendanceEvent.EventDate )

WHERE
StudentProgramAttendanceEvent.AttendanceEvent.AttendanceEventCategoryDescriptor
IN { Present categories (e.g., In Attendance) as defined by the implementation }

    AND StudentProgramAttendanceEvent.Student= { Student for the attendance calculation }

    AND StudentProgramAttendanceEvent.Program= { Program for the attendance calculation }

```

![Actual Attendance for a Program via EventDuration](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Actual%20Attendance%20for%20a%20Program%20via%20EventDuration.png)

### Option 2: When ProgramAttendanceDuration (or InterventionDuration, for interventions) is used to capture time in attendance

```sql

Student Program Attendance = SUM (
StudentProgramAttendanceEvent.ProgramAttendanceDuration )

WHERE
StudentProgramAttendanceEvent.AttendanceEvent.AttendanceEventCategoryDescriptor
IN { Present categories (e.g., In Attendance) as defined by the implementation }

    AND StudentProgramAttendanceEvent.Student= { Student for the attendance calculation }

    AND StudentProgramAttendanceEvent.Program= { Program for the attendance calculation }

```

![Actual Attendance for a Program via ProgramAttendanceDuration](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Actual%20Attendance%20for%20a%20Program%20via%20ProgramAttendanceDuration.png)

#### Assumptions

* For a program or intervention, positive attendance is reported.
* Option 1 reports total time in attendance in days.
* Option 2 reports total time in attendance in minutes.
