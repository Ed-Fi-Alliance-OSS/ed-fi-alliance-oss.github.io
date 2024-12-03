# asmt_AssessmentFact

## Purpose

Used for looking at Assessments within the ODS and how those assessment are
organized in relation to scoring, subdivided into objective assessments, and
related to learning standards.

## SQL Object Name

`analytics.asmt_AssessmentFact`

## Data Definition and Sources

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| ​AssessmentKey | nvarchar​ | Assessment | The unique key that describes the assessment |
| AssessmentIdentifier | nvarchar | Assessment | The unique identifier that describes the assessment |
| Namespace | nvarchar | Assessment | The namespace is part of the uniqueness defining the assessment View. |
| Title | nvarchar | Assessment | The title description of the assessment. |
| Version | int | Assessment | Describes what version the assessment or objective assessment focuses on. |
| Category | nvarchar | Assessment | Describes what category the assessment or objective assessment focuses on. |
| AssessedGradeLevel | nvarchar | Assessment | The grade level is the assessment focused on |
| AcademicSubject | nvarchar | Assessment | Describes what core subject the assessment or objective assessment focuses on. |
| ResultDataType | nvarchar | AssessmentScore | Describes what format the results for the assessment are reported. |
| ReportingMethod | nvarchar | AssessmentScore | Describes how the results of the assessment are reported.  This will create multiple records if there are multiple reporting methods associated with the assessment. |
| ObjectiveAssessmentKey | nvarchar | ObjectiveAssessment | The key that defines the objective assessment associated with the record |
| IdentificationCode | nvarchar | ObjectiveAssessment | The identification code is part of the uniqueness defining the objective assessment View. |
| ParentObjectiveAssessmentKey | nvarchar | ObjectiveAssessment | Objective Assessments can be recursively associated to each other to clarify drill down relationships which are represented here. |
| ObjectiveAssessmentDescription | nvarchar | ObjectiveAssessment | A description of the objective assessment associated with the assessment |
| PercentofAssessment | decimal | ObjectiveAssessment | Documents the size of the assessment identified in the objective assessment |
| MinScore | nvarchar | AssessmentScore, ObjectiveAssessmentScore | This is the minimum score that can be achieved for this assessment or objective assessment |
| MaxScore | nvarchar | AssessmentScore, ObjectiveAssessmentScore | This is the maximum score that can be achieved for this assessment or objective assessment |
| LearningStandard | varchar | ObjectiveAssessmentLearningStandard | The learning standard description associated with the objective assessment associated with the record.  This will create multiple records if there are multiple learning standards associated with the objective assessment. |
