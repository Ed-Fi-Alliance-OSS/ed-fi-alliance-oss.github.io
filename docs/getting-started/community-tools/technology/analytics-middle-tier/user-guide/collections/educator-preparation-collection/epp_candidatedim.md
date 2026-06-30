# EPP_CandidateDim

## Purpose

Used to look up candidates enrolled in an Educator Preparation Program,
determine their completion status within the program and their certification
status (i.e. not complete and not certified, completed but not certified,
completed and certified)

## SQL Object Name

`analytics.EPP_CandidadteDim`

## Data Definition and Sources

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| CandidateKey | nvarchar​ | Candidate | The unique key that describes the candidate |
| FirstName | nvarchar | Candidate | The first name of the candidate |
| LastName | nvarchar | Candidate | The last name of the candidate |
| SexDescriptorKey | varchar | Candidate | The unique key that describes the sex of the candidate |
| SexDescriptor | nvarchar | Candidate | The text description of the sex of the candidate |
| RaceDescriptorKey | varchar | Candidate | The unique key that describes the race of the candidate |
| RaceDescriptor | nvarchar | Candidate | The text description of the race of the candidate |
| HispanicLatinoEthnicity | bit | Candidate | Flag for identifying a candidate as Hispanic or Latino (note: this is not currently used in the EPP Dashboards. The Dashboards expect a Hispanic/Latino race descriptor) |
| EconomicallyDisadvantaged | bit | Candidate | Flag for identifying a candidate as economically disadvantaged (note: this is not currently used in the EPP Dashboards) |
| Cohort | varchar | CandidateEducatorPreparationProgramAssociation | The cohort year the candidate belongs to. This is generally the year of entry into the program, but can vary based on EPP business rules |
| ProgramComplete | bit | CandidateEducatorPreparationProgramAssociation | Flag for identifying whether the candidate has completed the program. A candidate is considered program complete when the ReasonExitedDescriptor is set to a value of 'Completed' |
| StudentUSI | varchar | Student | The student record associated with the candidate, this is used to link financial aid |
| ProgramName | nvarchar | CandidateEducatorPreparationProgramAssociation | The program the candidate is (or was) enrolled in |
| BeginDate | date | CandidateEducatorPreparationProgramAssociation | The date the candidate entered or enrolled in the program |
| EducationOrganizationId | int | CandidateEducatorPreparationProgramAssociation | The EducationOrganization that the candidate is enrolled in and the program belongs to. This is generally a school and represents the college of education at a university |
| PersonId | varchar | Candidate | The person record associated with the candiate, used for linking surveys, credentials and evaluations |
| IssuanceDate | date | Credential | The a credential was issued by the state. If a date exists, the candidate is considered credentialed, if null the candidate is not credentialed |
| CohortYearTermDescriptor | nvarchar | CandidateEducatorPreparationProgramAssociation | The term the candidate belongs to, generally a term of entry into the program |
