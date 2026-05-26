# equity_StudentDisciplineActionDim

## Purpose

Used to look up discipline actions associated with each student.

## SQL Object Name

`analytics.equity_StudentDisciplineActionDim`

## Data Definition and Sources

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| StudentDisciplineActionKey | nvarchar​ | DisciplineAction | The unique key that describes the Student Discipline Action relationship |
| StudentSchoolKey | nvarchar | DisciplineAction | The student school that the discipline action took place in |
| DisciplineDateKey | nvarchar | DisciplineAction | The date the discipline action occurred |
| StudentKey | nvarchar | DisciplineAction | The student key that the discipline action occurred with |
| SchoolKey | int | DisciplineAction | The school key that the discipline action occurred in |
| DisciplineActionDescription | nvarchar | DisciplineAction | The description of the discipline action |
| UserKey | nvarchar | DisciplineAction | The staff that was associated with the discipline action |
| LastModifiedDate | datetime | DisciplineAction | The last date the event was modified |
