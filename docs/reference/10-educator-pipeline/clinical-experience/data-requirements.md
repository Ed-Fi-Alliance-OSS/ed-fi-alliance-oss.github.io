---
sidebar_position: 1
hide_table_of_contents: true
---

# Data Requirements

The following shows the tables and fields from the Ed-Fi ODS v5.3, which comes with EPDM-Core that were used to build the visualizations above to answers questions related to Educator Preparation Program Performance.

We have created a Google Sheet workbook for mapping data specifically for the Clinical Experience and Performance Dashboard, which can be found [here](https://docs.google.com/spreadsheets/d/1brM7nGKKSXb3DSo1OK8GkHVB2bgjuftZ55WMOBvMgKE/edit#gid=112655094)

| Fields | EPDM Description | EPDM Data Type | Other Comment |
| --- | --- | --- | --- |
| **Candidate - Required fields** |     |     |     |
| CandidateIdentifier (PK) | A unique identifier for each candidate record. | String (60) |     |
| FirstName | Candidate first name. | String (75) |     |
| LastName | Candidate last name. | String (75) |     |
| Sex | A person's gender. | DescriptorDataType (enumeration) | Female, Male, Non-Binary, Not Selected |
| BirthDate | The month, day, and year on which an individual was born. | Date |     |
| Person | Relates the candidate to a generic person. | Person reference | If institution uses a person ID system, will use that info, otherwise created by SI and this will the Candidate Identifier |
| Race | The general racial category which most clearly reflects the individual's recognition of his or her community or with which the individual most identifies. The data model allows for multiple entries so that each individual can specify all appropriate races. | DescriptorDataType (enumeration) | American Indian - Alaska Native, Asian, Black - African American, Choose Not to Respond, Hispanic/Latino, Native Hawaiian - Pacific Islander, Other, White |
| **Credential - Required fields** |     |     |     |
| CredentialIdentifier | A unique identifier assigned to each record in the Credential Extension table. | String (60) |     |
| CredentialField | The field of certification for the certificate (e.g., Mathematics, Music). | DescriptorDataType (enumeration) | See DescriptorValues tab for possible values |
| IssuanceDate | The month, day, and year on which an active credential was issued to an individual. | Date |     |
| CredentialType | An indication of the category of credential an individual holds. | **DescriptorDataType** (enumeration) | See DescriptorValues tab for possible values |
| GradeLevel | The grade level(s) certified for teaching. | DescriptorDataType (enumeration) | See DescriptorValues tab for possible values |
| StateAbbreviation | The abbreviation for the name of the state (within the United States) or extra-state jurisdiction in which a license/credential was issued. | DescriptorDataType (enumeration) | Standard two-character abbreviation for State of issuance - See DescriptorValues tab for possible values |
| TeachingCredential | An indication of the category of a legal document giving authorization to perform teaching assignment services. | DescriptorDataType (enumeration) |     |
| Namespace | Namespace for the Credential. | String (255) | string of the form `uri:://www.your_instiution.edu` will be determined by SI |
| Person | The generic person who obtained and is holding the credential. | Person reference | created by SI |
| **EducatorPreparationProgram - Required fields** |     |     |     |
| EducationOrganization | Relates the program to an EducationOrganization. | EducationOrganization reference | education organizations will be created by SI |
| ProgramName | The name of the Educator Preparation Program. | String (255) |     |
| ProgramType | The type of program. | DescriptorDataType (enumeration) | See DescriptorValues tab for possible values |
| **CandidateEducatorPreparationProgramAssociation (enrollment record) - Required fields** |     |     |     |
| Candidate | Candidate for the association. | Candidate reference |     |
| EducatorPreparationProgram | The Program associated with the Candidate. | EducatorPreparationProgram reference |     |
| BeginDate | The begin date for the association. | Date |     |
| ReasonExited | The reason the candidate exited the program. |     | For determining program completion for the Dashboard, the descriptor value must be set to  'Completed' |
| CohortYear.SchoolYear | The value for the school year for the cohort | enumeration | four-digit year |
| CohortYear.CohortYearType | The type of the cohort year | DescriptorDataType (enumeration) |     |
| CohortYear.Term | The term for the cohort | DescriptorDataType (enumeration) |     |
| **PerformanceEvaluation - Required fields** |     |     |     |
| PerformanceEvaluationTitle | An assigned unique identifier for the performance evaluation. | String (50) |     |
| Term | The term for the session during the school year. | DescriptorDataType (enumeration) |     |
| PerformanceEvaluationType | The type (e.g., walkthrough, summative) of performance evaluation conducted. | DescriptorDataType (enumeration) | See DescriptorValues tab for possible values |
| SchoolYear | The identifier for the school year. | enumeration |     |
| EvaluationPeriod | The period for the evaluation (e.g., BOY, MOY, EOY, Summer). | DescriptorDataType (enumeration) | See DescriptorValues tab for possible values |
| EducationOrganization | Relates the evaluation to an education organization. | EducationOrganization reference |     |
| **Evaluation - Required fields** |     |     |     |
| PerformanceEvaluation | Reference to the person's performance evaluation. | PerformanceEvaluation reference |     |
| EvaluationTitle | The name or title of the evaluation. | String (50) |     |
| **EvaluationObjective - Required fields** |     |     |     |
| Evaluation | The Evaluation applied for the person. | Evaluation reference |     |
| EvaluationObjectiveTitle | The name or title of the evaluation Objective. | String (50) |     |
| **EvaluationElement - Required fields** |     |     |     |
| EvaluationObjective | The Evaluation Objective applied for the person. | EvaluationObjective reference |     |
| EvaluationElementTitle | The name or title of the evaluation element. | String (255) |     |
| PerformanceEvaluationRating - Required fields |     |     |     |
| Person | The generic person who obtained and is holding the credential. | Person reference |     |
| PerformanceEvaluation | The performance evaluation definition being applied. | PerformanceEvaluation reference |     |
| ActualDate | The month, day, and year on which the performance evaluation was conducted. | Date |     |
| EvaluationRating |     |     |     |
| PerformanceEvaluationRating | Reference to the person's Performance Evaluation Rating. | PerformanceEvaluation reference |     |
| Evaluation | The Evaluation applied for the person. | Evaluation reference |     |
| **EvaluationObjectiveRating - Required Fields** |     |     |     |
| EvaluationRating | Reference to the person's Evaluation Rating. | Evaluation reference |     |
| EvaluationObjective | The Evaluation Domain applied for the person. | EvaluationObjective reference |     |
| **EvaluationElementRating - Required fields** |     |     |     |
| EvaluationObjectiveRating | Reference to the person's Evaluation Objective Rating. | EvaluationObjective reference |     |
| EvaluationElement | The Evaluation Element applied for the person. | EvaluationElement reference |     |
| Rating | The numerical summary rating or score for the evaluation. | decimal (6,3) |     |
| RatingResultTitle | The title of Rating Result. | string (50) |     |
| ResultDataType | The datatype of the result. The results can be expressed as a number, percentile, range, level, etc. | DescriptorDataType (enumeration) | See DescriptorValues tab for possible values |
| **Survey - Required fields** |     |     |     |
| SurveyIdentifier | The unique survey identifier from the survey tool. | String (60) |     |
| Namespace | Namespace for the Survey. | String (255) | string of the form `uri:://your_instiution.edu` will be determined by SI |
| SurveyTitle | The title of the survey. | String (255) |     |
| SchoolYear | The school year associated with the survey. | enumeration |     |
| **SurveySection - Required fields** |     |     |     |
| Survey | Reference to the survey. | Survey Reference |     |
| SurveySectionTitle | The title or label for the survey section. | String (255) |     |
| **SurveyQuestion - Required fields** |     |     |     |
| QuestionCode | The identifying code for the question, unique to the survey. | String (60) |     |
| Survey | Reference to the survey. | Survey Reference |     |
| QuestionForm | The form or type of question. | DescriptorDataType (enumeration) | See DescriptorValues tab for possible values |
| QuestionText | The text of the question. | String (1024) |     |
| SurveySection | Reference to the survey section. | SurveySection reference |     |
| **SurveyResponse - Required fields** |     |     |     |
| SurveyResponseIdentifier | The identifier of the survey typically from the survey application. | String (60) |     |
| Survey | The survey associated with the response. | Survey Reference |     |
| ResponseDate | Date of the survey response. | Date |     |
| **SurveyQuestionResponse - Required fields** |     |     |     |
| SurveyQuestion | The identifying code for the question, unique for the survey. | Survey Question reference |     |
| SurveyResponse | Reference to the survey response. | Survey Response reference |     |
| MatrixElement | For matrix questions, the text identifying each row of the matrix. | String (255) |     |
| TextResponse | The text response(s) for the question. | String (2048) |     |
| **SurveyResponsePersonTargetAssociation - Required Fields** |     |     |     |
| SurveyResponse | Reference to the survey response. | Survey Response reference |     |
| Person | The generic person whom the survey is about | Person reference |     |
