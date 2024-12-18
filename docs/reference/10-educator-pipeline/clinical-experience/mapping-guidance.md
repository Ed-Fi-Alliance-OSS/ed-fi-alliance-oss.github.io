---
sidebar_position: 2
---

# Mapping Guidance

This developer guide describes the processes for a System Integrator to provide data to the Clinical Experience and Performance Starter Kit. In the [Clinical Experience and Performance Setup Guide](./setup-guide.md) we explain how to setup the Ed-Fi solution including a high-level description of how to use Data Import to read and map a CSV. In this document, we we dive a bit deeper into how to work  with the Educator Preparation Provider (in mapping session with their data expert) to understand the data needs of the starter kit and how that data will map into Ed-Fi to produce a report valuable to the EPP.

The Clinical Experience and Performance Starter Kit requires data from a number of different sources:

* Candidates
* Credentials
* Programs
* Program Enrollment (which candidates are in what program)
* Performance Evaluations
* Surveys

This data may all be stored in the Student Information System (SIS), but may also be in different source systems.

## How to get Data into the Ed-Fi API

### Procure the Data (or Sample Data)

Having the data in hand is generally the best way to get a feel for the type of mapping and manipulation work that needs to be completed to load the data into Ed-Fi. Since sharing agreements can slow this process, having a set of de-identified sample data that matches the structure of the final output works just as well. Knowing what data will be in what files and the names of fields allow for mapping to begin even if real data is not available.

### Map Fields

Now that the data (or sample data) has been provided, you can start the mapping process. There are a number of tools for mapping data, including a [Google Sheets workbook](https://docs.google.com/spreadsheets/d/1brM7nGKKSXb3DSo1OK8GkHVB2bgjuftZ55WMOBvMgKE/edit#gid=112655094) specifically tailored to work with the Starter Kits. We will be using the workbook for examples and descriptions below.

### Map Descriptor Values

Many Ed-Fi entities use enumeration values called descriptors. These descriptors are used to categorize data and help provide useful reporting. Descriptor values will need to be mapped from the source data into values in Ed-Fi. In most cases new descriptor values can be added if the default ones provided by Ed-Fi are not sufficient. In cases where the EPP doesn't have data for a descriptor value, it can be statically set on import of the data. The mapping workbook offers descriptor values for any given entity. General guidance for descriptors can be found [here](/reference/data-exchange/technical-articles/descriptor-guidance).

### Determine Mapping Logic

There may be cases where a direct field mapping from source data into Ed-Fi is not possible. A single field might require the concatenation of two fields, or maybe reading data from a second file.

### Set up the ODS/API and Admin App

Installation Instructions can be found in the  [Clinical Experience and Performance Setup Guide](./setup-guide.md)

### Create Education Organizations

Instructions for adding education organizations in Admin App can be found in the starter kit setup guide [here](./setup-guide.md#add-your-education-organizations-in-the-admin-app).

### Set up Data Import

Installation Instructions for Data Import can be found [here](../../6-data-import/readme.md).

Once you've installed Data Import, initial setup and post installation steps are [here](./setup-guide.md#configure-data-import-for-first-time-use).

### Create Import Maps and Agents

Data Import requires a map for each piece of CSV data that will loaded into the ODS. Basic information on creating maps and agents for the Clinical Experience and Performance Starter Kit can be found [here](./setup-guide.md#create-or-import-a-mapping-template).

More in-depth documentation on Import Maps and Agents can be found in the Data Import [documentation](../../6-data-import/readme.md).

### Upload File to Agent

The final step before loading data with Data Import is to upload a file for the agent to process.

Instructions for uploading files to agents can be found in the [Clinical Experience and Performance Setup Guide](./setup-guide.md#upload-a-file).

### Load Data

Execute Data Import Agents.  Details can be found in the [Clinical Experience and Performance Setup Guide](./setup-guide.md#execute-data-import).

## How the Provided Mapping Workbook Works

Ed-Fi provides a [workbook](https://docs.google.com/spreadsheets/d/1brM7nGKKSXb3DSo1OK8GkHVB2bgjuftZ55WMOBvMgKE/edit#gid=414767566) that has been used successfully in past projects to help System Integrators (SI's) and EPP's provide the appropriate data and also map that data into the ODS. The examples in this page will use that workbook, but any mapping tool can be used and the concepts should remain the same.

To use the workbook for your Starter Kit mapping:

1. Click on the workbook link above
2. If you are logged into your Google account, you can either:
    1. Download - click the "File" menu then hover your mouse over the download option and choose your preferred format (e.g., Excel, Open Office, etc).
    2. Copy to your Google Drive - click the "File" menu and select "Make a Copy". This will present a dialog that will allow you to choose a name and the Google Drive where you'd like to save your workbook.

Here is an example of a simple mapping from the workbook, EducatorPreparationProgram. Within the workbook, the rows for each entity can be broken down into two distinct sections:

* Field information - Provides contextual information to help understand the data and types required to load the data.
* Mapping (or EPP provided) information - This area is meant to be provided by the EPP, or determined by the SI.

Each section is designated by a different color for better visual representation what data needs to be filled out when mapping.

![Mapping workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/mapping-workbook.png)

### Field Information

* **API Resource / Entity Name** - The entity within the model that will be mapped.
* **Ed-Fi Field Name** - The name of the field within the entity. Only required fields are shown, for a list all fields within an entity, see the [Data Handbook - Ed-Fi + EPDM](https://edfidocs.blob.core.windows.net/$web/handbook/tpdm-v1.0/Index.html).
* **Ed-Fi Description** - What this field represents.
* **Ed-Fi  Data Type** - The type of data expected for that field, including the length of the field if appropriate. Reference types refer to other Ed-Fi entities that would need to be created prior to loading this data. Descriptor data types are similar to enumerations and the default values provided by Ed-Fi are listed below the data mapping rows.
* **Other comment** - A space for more description of the field. This is also used to signal the key of a reference type if not clear.

### Mapping Information

* **CSV File.** The name of the file provided from the EPP that will contain this data.
* **CSV File / Field Mapping.** The field with the CSV that will map to this field.
* **Sample.** A sample output from the field.
* **Mapping Logic.** Any logic needed to get the data from source to destination (e.g., if two fields need to be concatenated).
* **Actual Static Values.** In some cases, the EPP might not have the data to represent the field. In these cases, the field can be defaulted to a static value.
* **Descriptor Mapping.** How to map EPP values into provided descriptors. If the default descriptor values are not sufficient, descriptors within Ed-Fi can be added.

## EducatorPreparationPrograms

![Mapping workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/mapping-workbook.png)

Educator Preparation Program represents a state-approved course of study, completion of which signifies a candidate will have met all requirements necessary to obtain a certification or licensure to teach within K-12 schools. Most educator preparation providers will offer multiple programs, each aligned with a certification offered by the state. Program data needs to be loaded after Education Organizations (completed through Admin App, see [Clinical Experience and Performance Setup Guide](./setup-guide.md)) but should be loaded before any other data. To load Programs you need the following data:

* The id of the school created with Admin App,
* The name of the program, this generally correlates to the degree being offered by the program such as 'All Level EC-12+Art' or 'High School 7 - 12+Science',
* The program type. In many cases this will be a traditional program, but Post-Baccalaureate is also quite common.

Programs are also provided as a filter value on the left hand side of the report, allowing the user to see values for either a single program or multiple programs using multi-select.

## Candidates and Persons

![Candidates and Persons workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/mapping-candidates-persons.png)

Candidate is a student accepted to an EPP and working their way toward licensure or certification. The values needed for the Clinical Experience and Performance Starter Kit are basic identification and demographic information, including:

* **CandidateIdentifier.**  The key field for Candidate. It is a string field and is generally mapped to the student or person ID supplied by the EPP, university, or state.
* **FirstName.** The first name of the candidate
* **LastName.** The last name of the candidate
* **Sex.** The sex of the candidate
* **BirthDate.** The birthdate of the candidate
* **Race.** The race of the candidate

Person is an entity meant to represent the actual person within Ed-Fi. A person can have many roles (e.g., Candidate is a role a person can have). Many entities within Ed-Fi use person (rather than the specific role that the person is playing) to associate other entities. In the Clinical Experience and Performance Starter Kit, credentials are associated via the person reference.

Person has two fields, the PersonId, a string similar to CandidateIdentifier. The second field is a descriptor for the source system. Unless the university or EPP is using a Person Identification System, it is recommended that the PersonId be the same as the CandidateIdentifier, and the SourceSystemDescriptor be defaulted to 'school' for simplicity.

## CandidateEducatorPreparationProgramAssociations

![Candidate Education Prep Program Associations workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/candidate-epp-associations.png)

This association table will link candidates with their appropriate program. This also counts as candidate 'enrollment' into the program.

* **Candidate.** a reference to a candidate enrolled in a program.
* **EducatorPreparationProgram.** The program the candidate is or was enrolled in.
* **BeginDate.** When the enrollment first occurred, generally at the start of the term the candidate commences activities for the program.
* **ReasonExitedDescriptor.** This value is set to 'Received certificate of completion or equivalent' when a candidate has completed all work and has been recommended for licensure. It should be left empty for candidates still enrolled in the program.

CandidateCohortYear is the year that the candidate belongs to. CandidateCohortYear has three fields:

* **SchoolYear.** A 4-digit year.
* **Term.** The term associated with the candidate and program. Generally this is the term the candidate entered the program.
* **CohortYearType.** A descriptor that represents the type of cohort. CohortYearType is usually determined by the EPP, with the most common being 'Entry' into the program.

## Credentials

![Credentials workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/credentials-workbook.png)

Credential represents the attainment of a certification or license that authorizes or enables teaching assignment services. This data is generally provided two ways:

* From the State of Issuance - EPP's can generally request from the state a list of their candidates who have been credentialed.
* From post-completion surveys - When an EPP cannot receive the data from the state, they will send out surveys and determine licensed candidates from the responses.

For the Clinical Experience and Performance Starter Kit to function properly, a credential record must exist for any given candidate. The data of the credential is irrelevant. Credential, however, does require a number of fields to be loaded into the ODS:

* **CredentialIdentifier.** A unique identifier for the credential, generally the credential id from the state.
* **CredentialField.** What the credential allows the recipient to teach (e.g., Art, Computer Science, English)
* **IssuanceDate.** The date the credential was issued.
* **CredentialType.** What is the type of credential. The most common would be Certification or Licensure depending on the terminology of the state or EPP.
* **GradeLevel.** What grade level(s) the credential allows the recipient to teach. This field is a collection and allows for multiple values.
* **StateAbbreviation.** The state of issuance for the credential.
* **TeachingCredential.** An indication of the category of a legal document giving authorization to perform teaching assignment services. Most common value is 'Regular/Standard'.
* **Namespace.** A value representing the source of the data. This will generally take the form of 'uri://www.INSTITUTION\_WEBSITE.edu' and will be the same for all credential data.
* **Person.** A reference to the person attached to this credential.
* **CertificationTitle.** The title of the certification received.

## Performance Evaluations

The Performance Evaluation Domain allows EPPs to capture observational data from student teaching or other clinical tasks. The domain is very flexible and allows for different types of evaluations. For detailed information on the capabilities and use for the Performance Evaluation Domain, see [Performance Evaluation Domain](https://edfi.atlassian.net/wiki/spaces/TPDMX/pages/19203742/Performance+Evaluation+Domain). For the Clinical Experience and Performance Starter Kit, we decided to focus on rubric-based evaluations.

The Performance Evaluation Domain has two distinct sides:

* **Metadata.** This defines the structure of the evaluation and the rubric that is used for completing the evaluation. This is like a template, it is how the evaluation looks but isn't the evaluation of any specific person. Metadata entitles include PerformanceEvaluation, Evaluation, EvaluationObjective, and EvaluationElement.
* **Ratings.** These are the above metadata as it applies to a specific person.

Performance Evaluation is a hierarchical structure meaning that each level requires a reference to the level above it (e.g., Evaluation has a required reference to PerformanceEvaluation) and each rating requires a reference to its parent rating and the equivalent metadata entity.

| Individuals' ratings from evaluation | Metadata about the evaluation |
| -- | -- |
| PerformanceEvaluationRating | PerformancEvaluation |
| EvaluationRating | Evaluation |
| EvaluationObjectiveRating | EvaluationObjective |
| EvaluationElementRating | EvaluationElement |

### PerformanceEvaluation

![Performance Evaluation workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/performance-evaluation-workbook.webp)

PerformanceEvaluation is an umbrella entity that allows for multiple evaluations to be grouped together. For the Clinical Experience and Performance Starter Kit, we're focused on a single evaluation. So while you can use multiple evaluations, only one will display in the report and thus we will only discuss a single report in this document.

PerformanceEvaluation has a few required fields:

* **PerformanceEvaluationTitle.** A unique identifier for this performance evaluation. For the Clinical Experience and Performance Starter Kit, our sample PerformanceEvaluationTitle is 'Clinical Teacher - TWS' to represent the Teacher Work Sample.
* **Term.** The term where this evaluation applies. Common values include:
  * 'Fall Semester', 'Spring Semester'
  * 'First Term', 'Second Term', etc.
  * 'Year Round'
* **SchoolYear.** the 4-digit school year where the evaluation applies.
* **PerformanceEvaluationType.** The type of evaluation. This can be a formal evaluation, informal observation, self-observation, etc.
* **EvaluationPeriod.** When the evaluation occurs - BOY, EOY, Fall, Spring.
* **EducationOrganization.** the organization that this evaluation belongs to. For the Starter Kit, this will almost always be the school created during [setup](https://edfi.atlassian.net/wiki/display/SK/Clinical+Experience+and+Performance+Setup+Guide#ClinicalExperienceandPerformanceSetupGuide-Step2-TPDM-Performance).

### Evaluation

![Evaluation workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/evaluation-workbook.webp)

Evaluation is the entity right under the PerformanceEvaluation entity and represents the actual evaluation definition.

The required fields for Evaluations are:

* **PerformanceEvaluation.** A reference to the PerformanceEvaluation that holds this evaluation, the required fields to link the reference are required fields for PerformanceEvaluation (PerformanceEvaluationTitle, term, SchoolYear, type, period, and ed-org).
* **EvaluationTitle.** The title for this evaluation. For the Starter Kit, we suggest the EvaluationTitle and the PerformanceEvaluationTitle be the same.

### EvaluationObjective

![Evaluation objective workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/evaluation-objective-workbook.webp)

EvaluationObjective represents the larger criteria that any given candidate will be measured on during an evaluation. For our Teacher Work Sample example, these would represent areas like 'Analysis of Student Learning' or 'Instructional Decision Making'. There will generally be multiple objectives per evaluation.

The required fields for EvaluationObjectives are:

* **Evaluation.** The overall evaluation this objective belongs to, created in the last step.
* **EvaluationObjectiveTitle.** The title of this objective. This title is what will show in the Clinical Experience and Performance Starter Kit as Objectives.

### EvaluationElement

![Evaluation Element Workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/evaluation-element-workbook.webp)

EvaluationElement represents the specific concept or task that the candidate will be measured on. There will generally be multiple elements per objective.

The required fields for EvaluationElement are:

* **EvaluationElementTitle.** A description of what the candidate is being evaluated on. In the Teacher Work Sample in our demo, 'Clarity and Accuracy of Presentation' and 'Knowledge of Student Characteristics' are some of our elements. This title is what will display in the report as the name of the element.

### PerformanceEvaluationRating

![Performance Evaluation Rating workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/performance-evaluation-rating-workbook.webp)

PerformanceEvaluationRating is a PerformanceEvaluation as applied to a specific candidate during a review or evaluation. There are fields to identify the person performing the review, the duration of the review, and comments for the review.

The required fields for PerformanceEvaluationRating are:

* **Person.** A reference to the person being reviewed.
* **PerformanceEvaluation.** The metadata that describes the review.
* **ActualDate.** The date the review was performed.

### EvaluationRating

![Evaluation Rating workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/evaluation-rating.webp)

EvaluationRating is a specific evaluation that has been completed for a person. EvaluationRating can be scored, but for the Clinical Experience and Performance Starter Kit, evaluations are scored at the element level.

The required fields for EvaluationRating are:

* **PerformanceEvaluationRating.** Reference to the person's PerformanceEvaluationRating, created in the previous step.
* **Evaluation.** The Evaluation applied to the person.
* **EvaluationDate.** The date of the evaluation.

### EvaluationObjectiveRating

![Evaluation Objective Rating workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/evaluation-objective-rating-workbook.webp)

EvaluationObjectiveRating is a specific evaluation that has been completed for a person. EvaluationObjectiveRating can be scored, but for the Clinical Experience and Performance Starter Kit, evaluations are scored at the element level.

The required fields for EvaluationObjectiveRating are:

* **EvaluationRating.** A reference to the person's EvaluationRating, created in the previous step
* **EvaluationObjective.** The evaluation domain applied for the person.

### EvaluationElementRating

![Evaluation Element Rating workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/evaluation-element-rating.webp)

EvaluationElementRating is a specific evaluation that has been completed for a person. EvaluationElementRating is where the evaluation is scored for the Clinical Experience and Performance Starter Kit.

The required fields for EvaluationElementRating are:

* **EvaluationObjectiveRating.** Reference to the person's EvaluationObjectiveRating, created in the previous step.

* **EvaluationElement.** The EvaluationElement applied for the person.
* **RatingResultTitle.** The title of the rating result.
* **Rating.** The numerical summary or score for the evaluation.
* **ResultDataTypeDescriptor.** The datatype of the result, which can be expressed as a number, percentile, range, level, etc.

## Surveys

Surveys in the Clinical Experience and Performance Starter Kit allow Educator Preparation Providers to see summary responses from candidate self-report surveys. These surveys are generally about the candidate's experience, either in classes or more commonly while out in the field during clinical work. These surveys generally work best with matrix-style Likert scale questions. Similar to PerformanceEvaluation above, the survey domain has two distinct sides:

* **Metadata.** This defines the structure of the survey, including any sections as well as the questions asked in the survey.
* **Responses.** These are the above metadata as given by a specific person.

### Survey

![Survey workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/survey-workbook.webp)

Survey acts as a vessel to tie a set of questions together. With the natural [Key Structure in the Ed-Fi ODS / API](/reference/ods-api/technical-articles/key-structure-in-the-ed-fi-ods-api) the questions that belong to a survey reference the survey rather than the survey having a list of questions. Because of this, the survey model is fairly simple.

The required fields for Survey are:

* **SurveyIdentifier.** The unique survey identifier from the survey tool.
* **Namespace.** A value representing the source of the data, this will generally take the form of `uri://www.INSTITUTION_WEBSITE.edu` and will be the same for all credential data.
* **SurveyTitle.** The title of the survey.
* **SchoolYear.** The school year associated with the survey.

### SurveySection

![Survey Section workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/survey-section-workbook.webp)

Survey sections allow you to group questions of a similar nature. The Clinical Experience and Performance Starter Kit expects at least one section.

The required fields for SurveySection are:

* **SurveyIdentifier.** The unique survey identifier from the survey tool.
* **SurveySectionTitle.** The title of the section.

### SurveyQuestion

![Survey Question workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/survey-question-workbook.webp)

SurveyQuestion is a specific question asked on a survey.

The required fields for SurveyQuestion are:

* **QuestionCode.** The identifying code for the question, unique for the survey.
* **Survey.** The previously created survey to which this question will belong.
* **SurveySection.** The section that this question will belong to. The survey question model doesn't require a section to function but the Clinical Experience and Performance Starter Kit does expect at least 1 section.
* **QuestionForm.** How the questions are laid out. For the Clinical Experience and Performance Starter Kit, we work with matrix-style questions, so this will most likely be 'Matrix of textboxes' or 'Matrix of dropdowns'
* **QuestionText.** The text of the question.

### SurveyResponse

![Survey Response workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/survey-response-workbook.webp)

A response to the survey as given by a specific person.

The required fields for SurveyResponse are:

* **SurveyResponseIdentifier.** The identifier of the survey typically from the survey application.
* **ResponseDate.** The date of the response.
* **Survey.** A reference to the survey to which this response belongs.

### SurveyQuestionResponse

![Survey Question Response Workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/survey-question-response-workbook.webp)

A response to a specific question on a survey.

The required fields for SurveyQuestionResponse are:

* **SurveyResponse.** A reference to the SurveyResponse created above.
* **SurveyQuestion.** A reference to the SurveyQuestion to which this question is a response.
* **MatrixElementResponse.MatrixElement.** The text identifying each row of the matrix. For simplicity, this can be the same as the question code.
* **MatrixElementResponse.TextResponse.** The text response for the matrix question. This will generally take the form of a Likert response (e.g., 'Strongly Agree', 'Disagree', 'Not much like me', 'Somewhat like me').
* **MatrixElementResponse.NumericResponse.** A corresponding numeric value to the text value. This controls the sorting of the text responses, so each question will show the same order of responses in the PowerBI visual.

### SurveyResponsePersonTargetAssociation

![Survey Response Person Target Association Workbook](https://edfidocs.blob.core.windows.net/$web/img/reference/epp-sk/survey-response-person-target-association-workbook.webp)

The person the SurveyResponse is about. This is what makes the survey in the Clinical Experience and Performance Starter Kit a self-referential survey. The person taking the survey is evaluating their experiences in a given program, school, and so forth.

The required fields for SurveyResponsePersonTargetAssociation are:

* **SurveyResponse.** A reference to the SurveyResponse created above.
* **Person.** A reference to the person who the survey is about (this is the same person that took the survey).
