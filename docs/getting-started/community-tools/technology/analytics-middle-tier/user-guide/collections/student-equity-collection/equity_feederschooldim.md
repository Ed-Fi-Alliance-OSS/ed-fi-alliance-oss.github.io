# equity_FeederSchoolDim

## Purpose

Used to look up the feeder schools that send students into the current school.

## SQL Object Name

`analytics.equity_FeederSchoolDim`

## Data Definition and Sources

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| FeederSchoolUniqueKey | varchar​ | FeederSchoolAssociation | The unique key that describes the feeder school relationship |
| SchoolKey | int | FeederSchoolAssociation | The school key for the school where the feeder school students are going to. |
| FeederSchoolKey | int | FeederSchoolAssociation | The school key for the school where students came from |
| FeederSchoolName | nvarchar | School | The name of the feeder school |
| LastModifiedDate | datetime | FeederSchoolAssociation | The date the feeder school was last modified and used to track changes over time |
