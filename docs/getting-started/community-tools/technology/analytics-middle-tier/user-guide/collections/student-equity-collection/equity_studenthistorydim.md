# equity_StudentHistoryDim

## Purpose

Used to look up a historical summary of the student which includes grade
summaries, discipline summaries, attendance rates, and enrollment histories.

## SQL Object Name

`analytics.equity_StudentHistoryDim`

## Data Definition and Sources

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| StudentKey | nvarchar​ | Chronic Absenteeism Collection | The unique key that describes the Student |
| StudentSchoolKey | nvarchar | Chronic Absenteeism Collection | The student school key associated with the student's history |
| GradeSummary | varchar | Chronic Absenteeism Collection | The summary of a students grade for the last semester |
| CurrentSchoolKey | varchar | Chronic Absenteeism Collection | The current school the student is attending |
| AttendanceRate | decimal | Chronic Absenteeism Collection | The attendance rate for the student in the current school year |
| ReferralsAndSuspensions | int | Student Discipline Action View | The number of referrals and suspensions in the current school year |
| EnrollmentHistory | varchar | Chronic Absenteeism Collection | All the previous schools that the student attended |
| LastModifiedDate | datetime | Chronic Absenteeism Collection | The last date the event was modified |
