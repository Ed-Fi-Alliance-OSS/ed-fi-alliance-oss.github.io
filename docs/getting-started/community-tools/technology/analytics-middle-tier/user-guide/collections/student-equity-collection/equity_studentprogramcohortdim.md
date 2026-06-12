# equity_StudentProgramCohortDim

## Purpose

Used to look up the cohorts and programs associated with a student.

## SQL Object Name

`analytics.equity_StudentProgramCohortDim`

## Data Definition and Sources

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| StudentProgramCohortKey | nvarchar​ | Cohort | The unique key that describes the Student, cohort, and program relationship |
| StudentSchoolProgramKey | nvarchar | Cohort | The student school program key associated with the student's program and school |
| StudentSchoolKey | nvarchar | Cohort | The student school key associated with the student's cohorts and programs |
| CohortDescription | nvarchar | Cohort | The description of the student's cohort |
| ProgramName | nvarchar | CohortProgram | The name of the student's program |
| LastModifiedDate | datetime | CohortProgram | The last date the event was modified |
