# asmt_StudentAssessmentFact

## Purpose

Used for looking at each student's results for the Assessments within the ODS.
This view supports the overall assessment as well as the objective assessment
granular detail.

## SQL Object Name

`analytics.asmt_StudentAssessmentFact`

## Data Definition and Sources

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| StudentAssessmentFactKey | nvarchar​ |     | The unique key that describes the Student Assessment Fact record |
| ​StudentAssessmentKey | nvarchar​ | StudentAssessment | The unique key that describes the student assessment |
| StudentObjectiveAssessmentKey | nvarchar | StudentAssessmentStudentObjectiveAssessment | The unique key that describes the student objective assessment |
| ObjectiveAssessmentKey | nvarchar | ObjectiveAssessment | The unique key that describes the objective assessment |
| AssessmentKey | nvarchar | Assessment | The unique key that describes the assessment |
| AssessmentIdentifier | nvarchar | Assessment | The unique identifier that describes the assessment |
| Namespace | nvarchar | Assessment | The namespace is part of the uniqueness defining the assessment View. |
| StudentAssessmentIdentifier | nvarchar | StudentAssessment | The unique identifier that is associated with the student assessment record |
| StudentUSI | int | Student | The global unique identifier associated with the student |
| StudentSchoolKey | nvarchar | StudentSchoolAssociation | For linking to the [StudentSchoolDim View](https://edfi.atlassian.net/wiki/display/EDFITOOLS/StudentSchoolDim+View)​. |
| SchoolKey | int | School | For linking to [SchoolDim View](https://edfi.atlassian.net/wiki/display/EDFITOOLS/SchoolDim+View). |
| AdministrationDate | nvarchar | StudentAssessment | The date in which the assessment was conducted |
| AssessedGradeLevel | nvarchar | StudentAssessment | The grade level that the assessment was intended for |
| StudentScore | nvarchar | StudentAssessmentStudentObjectiveAssessmentScoreResult | The documented score for the overview student for the corresponding assessment or objective assessment |
| ResultDataType | nvarchar | StudentAssessmentStudentObjectiveAssessmentScoreResult | Describes what format the top results for the assessment are reported. |
| ReportingMethod | nvarchar | StudentAssessmentStudentObjectiveAssessmentScoreResult | Describes how the summary objective assessment results of the assessment are reported.  This will create multiple records if there are multiple reporting methods associated with the assessment. |
| PerformanceResult | nvarchar | StudentAssessmentStudentObjectiveAssessmentPerformanceLevel | This is the categorical summary result of the students assessment |
| StudentAssessmentScore | nvarchar | StudentAssessmentStudentObjectiveAssessmentScoreResult | The documented score for the student for the corresponding assessment or objective assessment |
| StudentAssessmentResultDataType | nvarchar | StudentAssessmentStudentObjectiveAssessmentScoreResult | Describes what format the results for the assessment are reported. |
| StudentAssessmentReportingMethod | nvarchar | StudentAssessmentStudentObjectiveAssessmentScoreResult | Describes how the results of the assessment are reported.  This will create multiple records if there are multiple reporting methods associated with the assessment. |
| StudentAssessmnetPerformanceReult | nvarchar | StudentAssessmentStudentObjectiveAssessmentPerformanceLevel | This is the categorical result of the students assessment |
