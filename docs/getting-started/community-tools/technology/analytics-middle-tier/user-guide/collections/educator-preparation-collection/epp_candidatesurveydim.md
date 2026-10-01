# EPP_CandidateSurveyDim

## Purpose

Used to look up survey responses to Self report style surveys (i.e. surveys
taken by a candidate about that candidates experience with an aspect of the
program they are enrolled in)

## SQL Object Name

`analytics.EPP_CandidadteSurveyDim`

## Data Definition and Sources

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| CandidateSurveyKey | nvarchar​ | Survey.SurveyIdentifier<br/><br/>SurveyQuestion.QuestionCode<br/><br/>SurveyResponse.SurveyResponseIdentifier<br/><br/>SurveyResponsePersonTargetAssociation.PersonId | The unique key that describes the survey response(s) provided by the candidate |
| CandidateKey | nvarchar | Candidate | The unique key that describes a candidate |
| SurveyTitle | nvarchar | Survey | The title of the survey taken |
| SurveySectionTitle | nvarchar | SurveyQuestion | The title of the section the question belongs to |
| ResponseDateKey | nvarchar | SurveyResponse | The date the survey was taken by the candidate |
| QuestionCode | varchar | Candidate | The unique identifier for the question being asked |
| QuestionText | nvarchar | Candidate | The text of the question being asked |
|     |     |     |     |
| TextResponse | bit | SurveyQuestionResponseSurveyQuestionMatrixElementResponse | The response of the question being asked. It is generally preferred that this be a response from a set of pre-defined responses (i.e. a Likert Scale). A predefined set of responses is required for the Clinical Experience and Performance Dashboard |
| NumericResponse | bit | Candidate | The numerical representation of the above TextResponse. Allows for ordering of the survey responses in the Clinical Experience and Performance Dashboard.<br/><br/>Example:<br/><br/>1 = Very much like me<br/><br/>2 = Mostly like me<br/><br/>3 = Somewhat like me |
