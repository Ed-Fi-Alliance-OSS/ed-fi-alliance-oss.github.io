# equity_StudentSchoolFoodServiceProgramDim

## Purpose

Used to look up a student's participation in food service programs.

## SQL Object Name

`analytics.equity_StudentSchoolFoodServiceProgramDim`

## Data Definition and Sources

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| StudentSchoolFoodServiceProgramKey | nvarchar​ | StudentSchoolFoodServiceProgramAssociation | The unique key that describes the Student, school, and food service program they are using. |
| StudentSchoolProgramKey | nvarchar | StudentSchoolFoodServiceProgramAssociation | The key describing the food service program in use |
| StudentSchoolKey | nvarchar | StudentSchoolFoodServiceProgramAssociation | The key describing the student school association |
| ProgramName | nvarchar | StudentSchoolFoodServiceProgramAssociation | The name of the food service program the student is participating in |
| SchoolFoodServiceProgramServiceDescriptor | nvarchar | StudentSchoolFoodServiceProgramAssociation | The description of service the food program service |
| LastModifiedDate | datetime | StudentSchoolFoodServiceProgramAssociation | The last date the event was modified |
