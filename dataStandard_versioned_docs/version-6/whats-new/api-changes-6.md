---
sidebar_position: 2
hide_table_of_contents: true
---

# API Changes from 5.0 to 6.0

## New Endpoints

### Credential Domain (NEW)

#### certification

* `GET /ed-fi/certifications`
    Retrieves specific certifications using property values.
* `POST /ed-fi/certifications`
    Creates or updates certifications based on natural key values.
* `GET /ed-fi/certifications/{id}`
    Retrieves a specific certification by ID.
* `PUT /ed-fi/certifications/{id}`
    Updates a specific certification by ID.
* `DELETE /ed-fi/certifications/{id}`
    Deletes a specific certification by ID.

#### certificationExam

* `GET /ed-fi/certificationExams`
    Retrieves specific certification exams using property values.
* `POST /ed-fi/certificationExams`
    Creates or updates the certification exams based on natural key values.
* `GET /ed-fi/certificationExams/{id}`
    Retrieves a specific examination by ID.
* `PUT /ed-fi/certificationExams/{id}`
    Updates a specific examination by ID.
* `DELETE /ed-fi/certificationExams/{id}`
    Deletes a specific examination by ID.

#### certificationExamResult

* `GET /ed-fi/certificationExamResults`
    Retrieves specific certification examination results using property values.
* `POST /ed-fi/certificationExamResults`
    Creates or updates certification examination results based on natural key values.
* `GET /ed-fi/certificationExamResults/{id}`
    Retrieves a specific certification examination result by ID.
* `PUT /ed-fi/certificationExamResults/{id}`
    Updates a specific certification examination result by ID.
* `DELETE /ed-fi/certificationExamResults/{id}`
    Deletes a specific certification examination result by ID.

#### credentialEvent

* `GET /ed-fi/credentialEvents`
    Retrieves specific credential events using property values.
* `POST /ed-fi/ed-fi/credentialEvents`
    Creates or updates a credential events based on natural key values.
* `GET /ed-fi/credentialEvents/{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/credentialEvents/{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/credentialEvents/{id}`
    Deletes a specific credential event by ID.

### Educator Preparation Program Domain (NEW)

#### candidate

* `GET /ed-fi/Candidates`
    Retrieves specific candidates using property values.
* `POST /ed-fi/Candidates`
   Creates or updates candidates events based on natural key values.
* `GET /ed-fi/Candidates/{id}`
    Retrieves a specific candidate event by ID.
* `PUT /ed-fi/Candidates/{id}`
    Updates a specific candidate event by ID.
* `DELETE /ed-fi/Candidates/{id}`
    Deletes a specific candidate event by ID.

#### candidateEducatorPreparationProgramAssociation

* `GET /ed-fi/CandidateEducatorPreparationProgramAssociations`
    Retrieves specific candidate educator preparation program associations using property values.
* `POST /ed-fi/CandidateEducatorPreparationProgramAssociations`
    Creates or updates candidate educator preparation program associations based on natural key values.
* `GET /ed-fi/CandidateEducatorPreparationProgramAssociations/{id}`
    Retrieves a specific candidate educator preparation program association event by ID.
* `PUT /ed-fi/CandidateEducatorPreparationProgramAssociations/{id}`
    Updates a specific candidate educator preparation program association event by ID.
* `DELETE /ed-fi/CandidateEducatorPreparationProgramAssociations/{id}`
    Deletes a specific candidate educator preparation program association event by ID.

#### candidateEducatorRelationshipToStaffAssociation

* `GET /ed-fi/candidateRelationshipToStaffAssociations`
    Retrieves specific candidate relationship to staff associations using property values.
* `POST /ed-fi/candidateRelationshipToStaffAssociations`
    Creates or updates specific candidate relationship to staff associations based on natural key values.
* `GET /candidateRelationshipToStaffAssociations/{id}`
    Retrieves a specific specific candidate relationship to staff association by ID.
* `PUT /ed-fi/candidateRelationshipToStaffAssociations/{id}`
    Updates a specific specific candidate relationship to staff association by ID.
* `DELETE /ed-fi/candidateRelationshipToStaffAssociations/{id}`
    Deletes a specific specific candidate relationship to staff association by ID.

#### candidateIdentificationCode

* `GET /ed-fi/candidateIdentificationCodes`
    Retrieves specific candidate identification codes using property values.
* `POST /ed-fi/candidateIdentificationCodes`
    Creates or updates candidate identification codes based on natural key values.
* `GET /ed-fi/candidateIdentificationCodes/{id}`
    Retrieves a specific candidate identification code by ID.
* `PUT /ed-fi/candidateIdentificationCodes/{id}`
    Updates a specific candidate identification code by ID.
* `DELETE /ed-fi/candidateIdentificationCodes/{id}`
    Deletes a specific candidate identification code by ID.

#### educatorPreparationProgram

* `GET /ed-fi/educatorPreparationPrograms`
    Retrieves specific educator preparation programs using property values.
* `POST /ed-fi/educatorPreparationPrograms`
    Creates or updates specific educator preparation programs based on natural key values.
* `GET /ed-fi/educatorPreparationPrograms/{id}`
    Retrieves a specific specific educator preparation program by ID.
* `PUT /ed-fi/educatorPreparationPrograms/{id}`
    Updates a specific specific educator preparation program by ID.
* `DELETE /ed-fi/educatorPreparationPrograms/{id}`
    Deletes a specific specific educator preparation program by ID.

#### fieldworkExperience

* `GET /ed-fi/fieldworkExperiences`
    Retrieves specific fieldwork experiences using property values.
* `POST /ed-fi/fieldworkExperiences`
    Creates or updates fieldwork experiences based on natural key values.
* `GET /ed-fi/fieldworkExperiences/{id}`
    Retrieves a specific fieldwork experience by ID.
* `PUT /ed-fi/fieldworkExperiences/{id}`
    Updates a specific fieldwork experience by ID.
* `DELETE /ed-fi/fieldworkExperiences/{id}`
    Deletes a specific fieldwork experience by ID.

#### fieldworkExperienceSectionAssociation

* `GET fieldworkExperienceSectionAssociations`
    Retrieves specific fieldwork experience section association using property values.
* `POST /ed-fi/fieldworkExperienceSectionAssociations`
    Creates or updates fieldwork experience section association based on natural key values.
* `GET /ed-fi/fieldworkExperienceSectionAssociations/{id}`
    Retrieves a fieldwork experience section association experience by ID.
* `PUT /ed-fi/fieldworkExperienceSectionAssociations/{id}`
    Updates a fieldwork experience section association experience by ID.
* `DELETE /ed-fi/fieldworkExperienceSectionAssociations/{id}`
    Deletes a fieldwork experience section association experience by ID.

#### staffEducatorPreparationProgramAssociation

* `GET /ed-fi/staffEducatorPreparationProgramAssociations`
    Retrieves specific staff educator preparation program associations using property values.
* `POST /ed-fi/staffEducatorPreparationProgramAssociations`
    Creates or updates staff educator preparation program associations based on natural key values.
* `GET /staffEducatorPreparationProgramAssociations/{id}`
    Retrieves a specific staff educator preparation program association by ID.
* `PUT /ed-fi/staffEducatorPreparationProgramAssociations/{id}`
    Updates a specific staff educator preparation program association by ID.
* `DELETE /ed-fi/staffEducatorPreparationProgramAssociations/{id}`
    Deletes a specific staff educator preparation program association by ID.

### Enrollment Domain Additions

#### financialAid

* `GET /ed-fi/financialAids`
    Retrieves specific financial aid awards using property values.
* `POST /ed-fi/financialAids`
    Creates or updates a financial aid awards based on natural key values.
* `GET /ed-fi/financialAids/{id}`
    Retrieves a specific financial aid award by ID.
* `PUT /ed-fi/financialAids/{id}`
    Updates a specific financial aid award by ID.
* `DELETE /ed-fi/financialAids/{id}`
    Deletes a specific financial aid award by ID.

### Path Domain (NEW)

#### path

* `GET /ed-fi/paths`
    Retrieves specific path using property values.
* `POST /ed-fi/paths`
    Creates or updates a path based on natural key values.
* `GET /ed-fi/paths/{id}`
    Retrieves a specific path by ID.
* `PUT /ed-fi/paths/{id}`
    Updates a specific path by ID.
* `DELETE /ed-fi/paths/{id}`
    Deletes a specific path by ID.

#### pathMilestone

* `GET /ed-fi/pathMilestones`
    Retrieves specific path milestone using property values.
* `POST /ed-fi/pathMilestones`
    Creates or updates a path milestone based on natural key values.
* `GET /ed-fi/pathMilestones/{id}`
    Retrieves a specific path milestone by ID.
* `PUT /ed-fi/pathMilestones/{id}`
    Updates a specific path milestone by ID.
* `DELETE /ed-fi/pathMilestones/{id}`
    Deletes a specific path milestone by ID.

#### pathPhase

* `GET /ed-fi/pathPhases`
    Retrieves specific path phase using property values.
* `POST /ed-fi/pathPhases`
    Creates or updates a path phase based on natural key values.
* `GET /ed-fi/pathPhases/{id}`
    Retrieves a specific path phase by ID.
* `PUT /ed-fi/pathPhases/{id}`
    Updates a specific path phase by ID.
* `DELETE /ed-fi/pathPhases/{id}`
    Deletes a specific path phase by ID.

#### studentPath

* `GET /ed-fi/studentPaths`
    Retrieves specific student path using property values.
* `POST /ed-fi/studentPaths`
    Creates or updates a student path based on natural key values.
* `GET /ed-fi/studentPaths/{id}`
    Retrieves a specific student path award by ID.
* `PUT /ed-fi/studentPaths/{id}`
    Updates a specific student path award by ID.
* `DELETE /ed-fi/studentPaths/{id}`
    Deletes a specific student path award by ID.

#### studentPathMilestoneStatus

* `GET /ed-fi/studentPathMilestoneStatus`
    Retrieves specific student path milestone status using property values.
* `POST /ed-fi/studentPathMilestoneStatus`
    Creates or updates a student path milestone status based on natural key values.
* `GET /ed-fi/studentPathMilestoneStatus/{id}`
    Retrieves a student path milestone status award by ID.
* `PUT /ed-fi/studentPathMilestoneStatus/{id}`
    Updates a student path milestone status award by ID.
* `DELETE /ed-fi/studentPathMilestoneStatus/{id}`
    Deletes a student path milestone status award by ID.

#### studentPathPhaseStatus

* `GET /ed-fi/studentPathPhaseStatus`
    Retrieves specific student path phase status using property values.
* `POST /ed-fi/studentPathPhaseStatus`
    Creates or updates a student path phase status based on natural key values.
* `GET /ed-fi/studentPathPhaseStatus/{id}`
    Retrieves a specific student path phase status by ID.
* `PUT /ed-fi/studentPathPhaseStatus/{id}`
    Updates a specific student path phase status by ID.
* `DELETE /ed-fi/studentPathPhaseStatus/{id}`
    Deletes a specific student path phase status by ID.

### Performance Evaluation Domain Additions

#### evaluation

* `GET /ed-fi/evaluations`
    Retrieves specific evaluations using property values.
* `POST /ed-fi/ed-fi/evaluations`
    Creates or updates evaluations based on natural key values.
* `GET /ed-fi/evaluations/{id}`
    Retrieves a specific evaluation by ID.
* `PUT /ed-fi/evaluations/{id}`
    Updates a specific evaluation by ID.
* `DELETE /ed-fi/evaluations/{id}`
    Deletes a specific evaluation by ID.

#### evaluationElement

* `GET /ed-fi/evaluationElements`
    Retrieves specific evaluation element using property values.
* `POST /ed-fi/ed-fi/evaluationElements`
    Creates or updates evaluation element based on natural key values.
* `GET /ed-fi/evaluationElements/{id}`
    Retrieves a specific evaluation element by ID.
* `PUT /ed-fi/evaluationElements/{id}`
    Updates a specific evaluation element by ID.
* `DELETE /ed-fi/evaluationElements/{id}`
    Deletes a specific evaluation element by ID.

#### evaluationElementRating

* `GET /ed-fi/evaluationElementRatings`
    Retrieves specific evaluation element rating using property values.
* `POST /ed-fi/ed-fi/evaluationElementRatings`
    Creates or updates evaluation element rating based on natural key values.
* `GET /ed-fi/evaluationElementRatings/{id}`
    Retrieves a specific evaluation element rating by ID.
* `PUT /ed-fi/evaluationElementRatings/{id}`
    Updates a specific evaluation element rating by ID.
* `DELETE /ed-fi/evaluationElementRatings/{id}`
    Deletes a specific evaluation element rating by ID.

#### evaluationObjective

* `GET /ed-fi/evaluationObjectives`
    Retrieves specific evaluation objectives using property values.
* `POST /ed-fi/evaluationObjectives`
    Creates or updates evaluation objectives based on natural key values.
* `GET /ed-fi/evaluationObjectives/{id}`
    Retrieves a specific evaluation objective by ID.
* `PUT /ed-fi/evaluationObjectives/{id}`
    Updates a specific evaluation objective by ID.
* `DELETE /ed-fi/evaluationObjectives/{id}`
    Deletes a specific evaluation objective by ID.

#### evaluationObjectiveRating

* `GET /ed-fi/evaluationObjectiveRatings`
    ReRetrieves specific evaluation objective ratings using property values.
* `POST /ed-fi/evaluationObjectiveRatings`
    Creates or updates evaluation objective ratings based on natural key values.
* `GET /ed-fi/evaluationObjectiveRatings/{id}`
    Retrieves a specific evaluation objective rating by ID.
* `PUT /ed-fi/evaluationObjectiveRatings/{id}`
    Updates a specific evaluation objective rating by ID.
* `DELETE /ed-fi/evaluationObjectiveRatings/{id}`
    Deletes a specific evaluation objective rating by ID.

#### evaluationRating

* `GET /ed-fi/evaluationRatings`
    Retrieves specific evaluation ratings events using property values.
* `POST /ed-fi/evaluationRatings`
    Creates or updates evaluation ratings events based on natural key values.
* `GET /ed-fi/evaluationRatings/{id}`
    Retrieves a specific evaluation rating event by ID.
* `PUT /ed-fi/evaluationRatings/{id}`
    Updates a specific evaluation rating event by ID.
* `DELETE /ed-fi/evaluationRatings/{id}`
    Deletes a specific evaluation rating event by ID.

#### goal

* `GET /ed-fi/goals`
    ReRetrieves specific goals using property values.
* `POST /ed-fi/goals`
    Creates or updates goals based on natural key values.
* `GET /ed-fi/goals/{id}`
    Retrieves a specific goal by ID.
* `PUT /ed-fi/goals/{id}`
    Updates a specific goal by ID.
* `DELETE /ed-fi/goals/{id}`
    Deletes a specific goal by ID.

#### performanceEvaluation

* `GET /ed-fi/performanceEvaluations`
    Retrieves performance evaluations using property values.
* `POST /ed-fi/performanceEvaluations`
    Creates or updates performance evaluations based on natural key values.
* `GET /ed-fi/performanceEvaluations/{id}`
    Retrieves a specific performance evaluation by ID.
* `PUT /ed-fi/performanceEvaluations/{id}`
    Updates a specific performance evaluation by ID.
* `DELETE /ed-fi/performanceEvaluations/{id}`
    Deletes a specific performance evaluation by ID.

#### performanceEvaluationRating

* `GET /ed-fi/performanceEvaluationRatings`
    Retrieves specific performance evaluation ratings using property values.
* `POST /ed-fi/performanceEvaluationRatings`
    Creates or updates performance evaluation ratings based on natural key values.
* `GET /ed-fi/performanceEvaluationRatings/{id}`
    Retrieves a specific performance evaluation ratings by ID.
* `PUT /ed-fi/performanceEvaluationRatings/{id}`
    Updates a specific performance evaluation ratings by ID.
* `DELETE /ed-fi/performanceEvaluationRatings/{id}`
    Deletes a specific performance evaluation ratings by ID.

#### quantitativeMeasure

* `GET /ed-fi/quantitativeMeasures`
    Retrieves specific quantitative measures using property values.
* `POST /ed-fi/ed-fi/quantitativeMeasures`
    Creates or updates quantitative measures based on natural key values.
* `GET /ed-fi/quantitativeMeasures/{id}`
    Retrieves a specific quantitative measure by ID.
* `PUT /ed-fi/quantitativeMeasures/{id}`
    Updates a specific quantitative measure by ID.
* `DELETE /ed-fi/quantitativeMeasures/{id}`
    Deletes a specific quantitative measure by ID.

#### quantitativeMeasureScore

* `GET /ed-fi/quantitativeMeasureScores`
    Retrieves specific quantitative measure scores using property values.
* `POST /ed-fi/ed-fi/quantitativeMeasureScores`
    Creates or updates quantitative measure scores based on natural key values.
* `GET /ed-fi/quantitativeMeasureScores/{id}`
    Retrieves a specific quantitative measure score by ID.
* `PUT /ed-fi/quantitativeMeasureScores/{id}`
    Updates a specific quantitative measure score by ID.
* `DELETE /ed-fi/quantitativeMeasureScores/{id}`
    Deletes a specific quantitative measure score by ID.

#### rubricDimension

* `GET /ed-fi/rubricDimensions`
    Retrieves specific rubric dimensions using property values.
* `POST /ed-fi/ed-fi/rubricDimensions`
    Creates or updates rubric dimensions based on natural key values.
* `GET /ed-fi/rubricDimensions/{id}`
    Retrieves a specific rubric dimensions by ID.
* `PUT /ed-fi/rubricDimensions/{id}`
    Updates a specific rubric dimensions by ID.
* `DELETE /ed-fi/rubricDimensions/{id}`
    Deletes a specific rubric dimensions by ID.

#### surveySectionAggregateResponse

* `GET /ed-fi/surveySectionAggregateResponses`
    Retrieves specific survey section aggregate responses using property values.
* `POST /ed-fi/ed-fi/surveySectionAggregateResponses`
    Creates or updates survey section aggregate responses based on natural key values.
* `GET /ed-fi/surveySectionAggregateResponses/{id}`
    Retrieves a specific survey section aggregate response score by ID.
* `PUT /ed-fi/surveySectionAggregateResponses/{id}`
    Updates a specific survey section aggregate response score by ID.
* `DELETE /ed-fi/surveySectionAggregateResponses/{id}`
    Deletes a specific survey section aggregate response score by ID.

### Recruitment And Staffing Domain (New)

#### application

* `GET /ed-fi/applications`
    Retrieves specific applications using property values.
* `POST /ed-fi/applications`
    Creates or updates a applications events based on natural key values.
* `GET /ed-fi/applications/{id}`
    Retrieves a specific application by ID.
* `PUT /ed-fi/applications/{id}`
    Updates a specific application by ID.
* `DELETE /ed-fi/applications/{id}`
    Deletes a specific application by ID.

#### applicationEvent

* `GET /ed-fi/applicationEvents`
    Retrieves specific application events using property values.
* `POST /ed-fi/applicationEvents`
    Creates or updates a application events based on natural key values.
* `GET /ed-fi/applicationEvents/{id}`
    Retrieves a specific application event by ID.
* `PUT /ed-fi/applicationEvents/{id}`
    Updates a specific application event by ID.
* `DELETE /ed-fi/applicationEvents/{id}`
    Deletes a specific application event by ID.

#### applicantProfile

* `GET /ed-fi/applicantProfiles`
    Retrieves specific applicant profiles using property values.
* `POST /ed-fi/ed-fi/applicantProfiles`
    Creates or updates applicant profiles based on natural key values.
* `GET /ed-fi/applicantProfiles/{id}`
    Retrieves a specific applicant profile by ID.
* `PUT /ed-fi/applicantProfiles/{id}`
    Updates a specific applicant profile by ID.
* `DELETE /ed-fi/applicantProfiles/{id}`
    Deletes a specific applicant profile by ID.

#### professionalDevelopmentEvent

* `GET /ed-fi/professionalDevelopmentEvents`
    Retrieves specific professional development events using property values.
* `POST /ed-fi/ed-fi/professionalDevelopmentEvents`
    Creates or updates professional development events based on natural key values.
* `GET /ed-fi/professionalDevelopmentEvents/{id}`
    Retrieves a specific professional development event by ID.
* `PUT /ed-fi/professionalDevelopmentEvents/{id}`
    Updates a specific professional development event by ID.
* `DELETE /ed-fi/professionalDevelopmentEvents/{id}`
    Deletes a specific professional development event by ID.

#### professionalDevelopmentEventAttendance

* `GET /ed-fi/professionalDevelopmentEventAttendance`
    Retrieves specific professional development event attendance using property values.
* `POST /ed-fi/ed-fi/professionalDevelopmentEventAttendance`
    Creates or updates professional development event attendance based on natural key values.
* `GET /ed-fi/professionalDevelopmentEventAttendance/{id}`
    Retrieves a specific professional development event attendance by ID.
* `PUT /ed-fi/professionalDevelopmentEventAttendance/{id}`
    Updates a specific professional development event attendance by ID.
* `DELETE /ed-fi/professionalDevelopmentEventAttendance/{id}`
    Deletes a specific professional development event attendance by ID.

#### recruitmentEvent

* `GET /ed-fi/recruitmentEvents`
    Retrieves specific recruitment events using property values.
* `POST /ed-fi/recruitmentEvents`
    Creates or updates a recruitment events based on natural key values.
* `GET /ed-fi/recruitmentEvents/{id}`
    Retrieves a specific recruitment event by ID.
* `PUT /ed-fi/recruitmentEvents/{id}`
    Updates a specific recruitment event by ID.
* `DELETE /ed-fi/recruitmentEvents/{id}`
    Deletes a specific recruitment event by ID.

#### recruitmentEventAttendance

* `GET /ed-fi/recruitmentEventAttendances`
    Retrieves specific recruitment event attendance using property values.
* `POST /ed-fi/recruitmentEventAttendances`
    Creates or updates recruitment event attendance based on natural key values.
* `GET /ed-fi/recruitmentEventAttendances/{id}`
    Retrieves a specific recruitment event attendance by ID.
* `PUT /ed-fi/recruitmentEventAttendances/{id}`
    Updates a specific recruitment event attendance by ID.
* `DELETE /ed-fi/recruitmentEventAttendances/{id}`
    Deletes a specific recruitment event attendance by ID.

### Staff Domain Additions

#### openStaffPositionEvent

* `GET /ed-fi/openStaffPositionEvents`
    Retrieves specific open staff position events using property values.
* `POST /ed-fi/openStaffPositionEvents`
    Creates or updates open staff position events based on natural key values.
* `GET /ed-fi/openStaffPositionEvents/{id}`
    Retrieves a specific open staff position event by ID.
* `PUT /ed-fi/openStaffPositionEvents/{id}`
    Updates a specific open staff position event by ID.
* `DELETE /ed-fi/openStaffPositionEvents/{id}`
    Deletes a specific open staff position event by ID.

#### staffDemographic

* `GET /ed-fi/staffDemographics`
    Retrieves specific staff demographics using property values.
* `POST /ed-fi/staffDemographics`
    Creates or updates staff demographics based on natural key values.
* `GET /ed-fi/staffDemographics/{id}`
    Retrieves a specific staff demographic by ID.
* `PUT /ed-fi/staffDemographics/{id}`
    Updates a specific staff demographic by ID.
* `DELETE /ed-fi/staffDemographics/{id}`
    Deletes a specific staff demographic by ID.

#### staffDirectory

* `GET /ed-fi/staffDirectories`
    Retrieves specific staff directory records using property values.
* `POST /ed-fi/staffDirectories`
    Creates or updates staff directory records based on natural key values.
* `GET /ed-fi/staffDirectories/{id}`
    Retrieves a specific directory record by ID.
* `PUT /ed-fi/staffDirectories/{id}`
    Updates a specific directory record by ID.
* `DELETE /ed-fi/staffDirectories/{id}`
    Deletes a specific directory record by ID.

#### staffIdentificationCode

* `GET /ed-fi/staffIdentificationCodes`
    Retrieves specific staff identification codes using property values.
* `POST /ed-fi/staffIdentificationCodes`
    Creates or updates staff identification codes based on natural key values.
* `GET /ed-fi/staffIdentificationCodes/{id}`
    Retrieves a specific staff identification code by ID.
* `PUT /ed-fi/staffIdentificationCodes/{id}`
    Updates a specific staff identification code by ID.
* `DELETE /ed-fi/staffIdentificationCodes/{id}`
    Deletes a specific staff identification code by ID.

### Student Identification and Demographic Domain Additions

#### contactIdentificationCode

* `GET /ed-fi/contactIdentificationCodes`
    Retrieves specific contact identification codes using property values.
* `POST /ed-fi/contactIdentificationCodes`
    Creates or updates contact identification codes based on natural key values.
* `GET /ed-fi/contactIdentificationCodes/{id}`
    Retrieves a specific contact identification code by ID.
* `PUT /ed-fi/contactIdentificationCodes/{id}`
    Updates a specific contact identification code by ID.
* `DELETE /ed-fi/contactIdentificationCodes/{id}`
    Deletes a specific contact identification code by ID.

#### studentDemographic

* `GET /ed-fi/studentDemographics`
    Retrieves specific student demographics using property values.
* `POST /ed-fi/studentDemographics`
    Creates or updates student demographics based on natural key values.
* `GET /ed-fi/studentDemographics/{id}`
    Retrieves a specific student demographic by ID.
* `PUT /ed-fi/studentDemographics/{id}`
    Updates a specific student demographic by ID.
* `DELETE /ed-fi/studentDemographics/{id}`
    Deletes a specific student demographic by ID.

#### studentDirectory

* `GET /ed-fi/studentDirectories`
    Retrieves specific student directory records using property values.
* `POST /ed-fi/studentDirectories`
    Creates or updates student directory records based on natural key values.
* `GET /ed-fi/studentDirectories/{id}`
    Retrieves a specific student directory entry by ID.
* `PUT /ed-fi/studentDirectories/{id}`
    Updates a specific student directory entry by ID.
* `DELETE /ed-fi/studentDirectories/{id}`
    Deletes a specific student directory entry by ID.

#### studentIdentificationCode

* `GET /ed-fi/studentIdentificationCodes`
    Retrieves specific student identification codes using property values.
* `POST /ed-fi/studentIdentificationCodes`
    Creates or updates a student identification codes based on natural key values.
* `GET /ed-fi/studentIdentificationCodes/{id}`
    Retrieves a specific student identification code by ID.
* `PUT /ed-fi/studentIdentificationCodes/{id}`
    Updates a specific student identification code by ID.
* `DELETE /ed-fi/studentIdentificationCodes/{id}`
    Deletes a specific student identification code by ID.

### Survey Response Person Target Association Additions

#### surveyResponsePersonTargetAssociation

* `GET /ed-fi/studentDemographics`
    Retrieves specific survey response person target association using property values.
* `POST /ed-fi/studentDemographics`
    Creates or updates survey response person target association based on natural key values.
* `GET /ed-fi/studentDemographics/{id}`
    Retrieves a specific survey response person target association by ID.
* `PUT /ed-fi/studentDemographics/{id}`
    Updates a specific survey response person target association by ID.
* `DELETE /ed-fi/studentDemographics/{id}`
    Deletes a specific survey response person target association by ID.

#### surveySectionResponsePersonTargetAssociation

* `GET /ed-fi/surveySectionResponsePersonTargetAssociations`
    Retrieves specific survey section response person target association using property values.
* `POST /ed-fi/surveySectionResponsePersonTargetAssociations`
    Creates or updates survey section response person target association based on natural key values.
* `GET /ed-fi/surveySectionResponsePersonTargetAssociations/{id}`
    Retrieves a specific survey section response person target association by ID.
* `PUT /ed-fi/surveySectionResponsePersonTargetAssociations/{id}`
    Updates a specific survey section response person target association by ID.
* `DELETE /ed-fi/surveySectionResponsePersonTargetAssociations/{id}`
    Deletes a specific survey section response person target association by ID.

## Modified Endpoints

### Assessments and Objective Assessment Endpoints and Associated Domains

* Assessment Domain
* AssessmentMetadata Domain

#### Changes to assessments

* `GET /ed-fi/assessments`

  * **Response**
    * **Changed** property: AcademicSubjectDescriptor (string)

* `POST /ed-fi/assessments`

  * **Request**
    * **Changed** property: AcademicSubjectDescriptor (string)

* `GET /ed-fi/assessments{id}`

  * **Response**
    * **Changed** property: AcademicSubjectDescriptor (string)

* `PUT /ed-fi/assessments{id}`

  * **Request**
    * **Changed** property: AcademicSubjectDescriptor (string)

#### Changes to objectiveAssessments

* `GET /ed-fi/objectiveAssessments`
  * **Parameters**
    * **Changed** parentObjectiveAssessmentId - The **collection** of unique numbers or alphanumeric codes assigned to an objective assessment by a school, school system, a state, or other agency or entity.

  * **Response**
    * **Changed** property: parentObjectiveAssessmentIdReference (array)

* `POST /ed-fi/objectiveAssessments`

  * **Request**
    * **Changed** property: parentObjectiveAssessmentIdReference (array)

* `GET /ed-fi/objectiveAssessments{id}`

  * **Response**
    * **Changed** property: parentObjectiveAssessmentIdReference (array)

* `PUT /ed-fi/objectiveAssessments{id}`

  * **Request**
    * **Changed** property: parentObjectiveAssessmentIdReference (array)

### Credential Endpoint and Associated Domains

#### Domains Using the Credentials Endpoints

* Credential Domain
* Staff Domain

#### Changes to credentials

* `GET /ed-fi/credentials`

  * **Parameters**
    * **Added** certificationTitle - The title of the certification obtained.
    * **Added** certificationId - Identifier or serial number assigned to the certification .
    * **Added** certificationRouteDescriptor - The process, program, or pathway used to obtain the certification.
    * **Added** boardCertificationIndicator - Indicator that the credential was granted under the authority of a national board certification.
    * **Added** credentialStatusDescriptor - The current status of the credential.
    * **Added** personId - A unique alphanumeric code assigned to a person
    * **Added** studentAcademicRecordId - Reference to the person's student academic records for the school(s) with which the credential is associated.
    * **Added** educatorRoleDescriptor - The specific roles or positions within an organization that the credential is intended to authorize, typically associated with service and administrative certifications.

  * **Response**
    * **Added** property: certificationTitle (string)
    * **Added** property: certificationId (string)
    * **Added** property: certificationRouteDescriptor (string)
    * **Added** property: boardCertificationIndicator (boolean)
    * **Added** property: credentialStatusDescriptor  (string)
    * **Added** property: personId (string)
    * **Added** property: studentAcademicRecordId (string)
    * **Added** property: educatorRoleDescriptor (string)

* `POST /ed-fi/credentials`

  * **Request**
    * **Added** property: certificationTitle (string)
    * **Added** property: certificationId (string)
    * **Added** property: certificationRouteDescriptor (string)
    * **Added** property: boardCertificationIndicator (boolean)
    * **Added** property: credentialStatusDescriptor  (string)
    * **Added** property: personId (string)
    * **Added** property: studentAcademicRecordId (string)
    * **Added** property: educatorRoleDescriptor (string)

* `GET /ed-fi/credentials/{id}`

  * **Response**
    * **Added** property: certificationTitle (string)
    * **Added** property: certificationId (string)
    * **Added** property: certificationRouteDescriptor (string)
    * **Added** property: boardCertificationIndicator (boolean)
    * **Added** property: credentialStatusDescriptor  (string)
    * **Added** property: personId (string)
    * **Added** property: studentAcademicRecordId (string)
    * **Added** property: educatorRoleDescriptor (string)

* `PUT /ed-fi/credentials`

  * **Request**
    * **Added** property: certificationTitle (string)
    * **Added** property: certificationId (string)
    * **Added** property: certificationRouteDescriptor (string)
    * **Added** property: boardCertificationIndicator (boolean)
    * **Added** property: credentialStatusDescriptor  (string)
    * **Added** property: personId (string)
    * **Added** property: studentAcademicRecordId (string)
    * **Added** property: educatorRoleDescriptor (string)

### Discipline Action Endpoint and Associated Domains

* Discipline Domain

#### Changes to disciplineActions

* `GET /ed-fi/disciplineActions`

  * **Response**
    * **Changed** studentDisciplineIncidentBehaviorAssociation (required)

* `POST /ed-fi/disciplineActions`

  * **Request**
    * **Changed** studentDisciplineIncidentBehaviorAssociation (required)

* `PUT /ed-fi/disciplineActions/{id}`

  * **Request**
    * **Changed** studentDisciplineIncidentBehaviorAssociation (required)

### Graduation Plan Endpoints and Associated Domains

* Enrollment Domain
* Graduation Domain

#### Changes to graduationPlans

* `GET /ed-fi/graduationPlans`

  * **Response**
    * **Added** requiredCertificationReference (array)

* `POST /ed-fi/graduationPlans`

  * **Request**
    * **Added** requiredCertificationReference (array)

* `GET /ed-fi/graduationPlans/{id}`

  * **Response**
    * **Added** requiredCertificationReference (array)

* `PUT /ed-fi/graduationPlans/{id}`

  * **Request**
    * **Added** requiredCertificationReference (array)

### Local Education Agency Endpoints and Associated Domains

* EducationOrganization Domain
* Enrollment Domain
* Staff Domain

#### Changes to localEducationAgencies

* `GET /ed-fi/localEducationAgencies`

  * **Parameters**
    * **Added** federalLocaleCodeDescriptor - The federal locale code given to an education organization.

  * **Response**
    * **Added** federalLocaleCodeDescriptor (string)

* `POST /ed-fi/localEducationAgencies`

  * **Request**
    * **Added** federalLocaleCodeDescriptor (string)

* `GET /ed-fi/localEducationAgencies/{id}`

  * **Response**
    * **Added** federalLocaleCodeDescriptor (string)

* `PUT /ed-fi/localEducationAgencies/{id}`

  * **Request**
    * **Added** federalLocaleCodeDescriptor (string)

### Post Secondary Institution Endpoints and Associated Domains

* EducationOrganization Domain
* Graduation Domain

#### Changes to PostSecondaryInstitution

* `GET /ed-fi/postSecondaryInstitutions`
  * **Parameters**
    * **Added** FederalLocaleCode - The federal locale code given to an education organization.

  * **Response**
    * **Added** property: FederalLocaleCode (string)

* `POST /ed-fi/postSecondaryInstitutions`

  * **Request**
    * **Added** property: FederalLocaleCode (string)

* `GET /ed-fi/postSecondaryInstitutions{id}`

  * **Response**
    * **Added** property: FederalLocaleCode (string)

* `PUT /ed-fi/postSecondaryInstitutions{id}`

  * **Request**
    * **Added** property: FederalLocaleCode (string)

### Schools Endpoint and Associated Domains

* AlternativeAndSupplementalSupplementalServices Domain
* AssessmentRegistration Domain
* BellSchedule Domain
* CourseCatalog Domain
* Discipline Domain
* Enrollment Domain
* Graduation Domain
* SchoolCalendar Domain
* SectionAndProgram Domain
* SpecialEducation Domain
* StaffDomain
* StudentAcademic Record Domain
* StudentAttendance Domain
* TeachingAndLearning Domain

#### Changes to schools

* `GET /ed-fi/schools`

  * **Parameters**
    * **Added** federalLocaleCodeDescriptor - The federal locale code given to an education organization.
    * **Added** improvingSchoolIndicator - Indicates if the school has been identified as "improving".
    * **Added** accreditationStatusDescriptor - The accreditation status for the education provider.

  * **Response**
    * **Added** property: federalLocaleCode (string)
    * **Added** property: improvingSchool (boolean)
    * **Added** property: accreditationStatus (string)

* `POST /ed-fi/schools`

  * **Request**
    * **Added** property: federalLocaleCode (string)
    * **Added** property: improvingSchool (boolean)
    * **Added** property: accreditationStatus (string)

* `GET /ed-fi/schools{id}`

  * **Response**
    * **Added** property: federalLocaleCode (string)
    * **Added** property: improvingSchool (boolean)
    * **Added** property: accreditationStatus (string)

* `PUT /ed-fi/schools{id}`

  * **Request**
    * **Added** property: federalLocaleCode (string)
    * **Added** property: improvingSchool (boolean)
    * **Added** property: accreditationStatus (string)

### Staff Endpoints and Associated Domains

* AlternativeAndSupplementalServices Domain
* Discipline Domain
* Finance Domain
* Intervention Domain
* SectionsAndPrograms Domain
* SpecialEducation Domain
* Staff Domain
* StudentAttendance Domain
* StudentCohort Domain
* Survey Domain
* TeachingAndLearning Domain

#### Changes to Staffs

* `GET /ed-fi/staffs`

  * **Parameters**
    * **Added** highlyQualifiedAcademicSubjectDescriptor - The academic subject(s) in which the staff is deemed to be "highly qualified".
    * **Removed** assigningOrganizationIdentificationCode - The organization code or name assigning the staff Identification Code.
    * **Removed** CitizenshipStatusDescriptor - An indicator of whether or not the person is a U.S. citizen.
    * **Removed** IdentificationCode - A unique number or alphanumeric code assigned to a staff member by a school, school system, a state, or other agency or entity.
    * **Removed** genderIdentity - The gender the staff member identifies themselves as.
    * **Removed** hispanicLatinoEthnicity - An indication that the individual traces his or her origin or descent to Mexico, Puerto Rico, Cuba, Central, and South America, and other Spanish cultures, regardless of race. The term, "Spanish origin," can be used in addition to "Hispanic or Latino."
    * **Removed** sexDescriptor - The birth sex of the staff member.
    * **Removed** staffIdentificationSystemDescriptor - A coding scheme that is used for identification and record-keeping purposes by schools, social services, or other agencies to refer to a staff member.

  * **Response**
    * **Added** property: highlyQualifiedAcademicSubjectDescriptor (string)
    * **Added** property: educatorResearch (array)
    * **Added** property: educatorPreparationProgramIdentifier (string)
    * **Added** property: openStaffPositionIdentifier (string)
    * **Removed** property: assigningOrganizationIdentificationCode (string)
    * **Removed** property: CitizenshipStatusDescriptor (string)
    * **Removed** property: IdentificationCode (string)
    * **Removed** property: genderIdentityDescriptor (string)
    * **Removed** property: hispanicLatinoEthnicity (boolean)
    * **Removed** property: sexDescriptor (string)
    * **Removed** property: staffIdentificationSystemDescriptor (string)
    * **Removed** property: address (array)
    * **Removed** property: electronicMails (array)
    * **Removed** property: internationalAddresses (array)
    * **Removed** property: languages (array)
    * **Removed** property: telephones (array)

* `POST /ed-fi/staffs`

  * **Request**
    * **Added** property: highlyQualifiedAcademicSubjectDescriptor (string)
    * **Added** property: educatorResearch (array)
    * **Added** property: educatorPreparationProgramIdentifier (string)
    * **Added** property: openStaffPositionIdentifier (string)
    * **Removed** property: assigningOrganizationIdentificationCode (string)
    * **Removed** property: CitizenshipStatusDescriptor (string)
    * **Removed** property: IdentificationCode (string)
    * **Removed** property: genderIdentityDescriptor (string)
    * **Removed** property: hispanicLatinoEthnicity (boolean)
    * **Removed** sexDescriptor (string)
    * **Removed** property: staffIdentificationSystemDescriptor (string)
    * **Removed** property: address (array)
    * **Removed** property: electronicMails (array)
    * **Removed** property: internationalAddresses (array)
    * **Removed** property: languages (array)
    * **Removed** property: telephones (array)

* `GET /ed-fi/staffs{id}`

  * **Response**
    * **Added** property: highlyQualifiedAcademicSubjectDescriptor (string)
    * **Added** property: educatorResearch (array)
    * **Added** property: educatorPreparationProgramIdentifier (string)
    * **Added** property: openStaffPositionIdentifier (string)
    * **Removed** property: assigningOrganizationIdentificationCode (string)
    * **Removed** property: CitizenshipStatusDescriptor (string)
    * **Removed** property: IdentificationCode (string)
    * **Removed** property: genderIdentityDescriptor (string)
    * **Removed** property: hispanicLatinoEthnicity (boolean)
    * **Removed** sexDescriptor (string)
    * **Removed** property: staffIdentificationSystemDescriptor (string)
    * **Removed** property: address (array)
    * **Removed** property: electronicMails (array)
    * **Removed** property: internationalAddresses (array)
    * **Removed** property: languages (array)
    * **Removed** property: telephones (array)

* `PUT /ed-fi/staffs{id}`

  * **Request**
    * **Added** property: highlyQualifiedAcademicSubjectDescriptor (string)
    * **Added** property: educatorResearch (array)
    * **Added** property: educatorPreparationProgramIdentifier (string)
    * **Added** property: openStaffPositionIdentifier (string)
    * **Removed** property: assigningOrganizationIdentificationCode (string)
    * **Removed** property: CitizenshipStatusDescriptor (string)
    * **Removed** property: IdentificationCode (string)
    * **Removed** property: genderIdentityDescriptor (string)
    * **Removed** property: hispanicLatinoEthnicity (boolean)
    * **Removed** sexDescriptor (string)
    * **Removed** property: staffIdentificationSystemDescriptor (string)
    * **Removed** property: address (array)
    * **Removed** property: electronicMails (array)
    * **Removed** property: internationalAddresses (array)
    * **Removed** property: languages (array)
    * **Removed** property: telephones (array)

### Staff Education Organization Assignment Association Endpoints and Associated Domains

* Staff Domain

#### Changed StaffEducationOrganizationAssignmentAssociation Endpoints

* `GET /ed-fi/StaffEducationOrganizationAssignmentAssociations`
  * **Parameters**
    * **Added** YearsOfExperienceAtCurrentEducationOrganization - The total number of years that an individual has previously held a teaching position in an education institutions.

  * **Response**
    * **Added** property: YearsOfExperienceAtCurrentEducationOrganization (string)

* `POST /ed-fi/StaffEducationOrganizationAssignmentAssociations`

  * **Request**
    * **Added** property: YearsOfExperienceAtCurrentEducationOrganization (string)

* `GET /ed-fi/StaffEducationOrganizationAssignmentAssociations/{id}`

  * **Response**
    * **Added** property: YearsOfExperienceAtCurrentEducationOrganization (string)

* `PUT /ed-fi/StaffEducationOrganizationAssignmentAssociations/{id}`

  * **Request**
    * **Added** property: YearsOfExperienceAtCurrentEducationOrganization (string)

### Staff Education Organization Contact Association Endpoints and Associated Domains

* Staff Domain

#### Removed StaffEducationOrganizationContactAssociation Endpoints

* **Removed** `GET /ed-fi/staffEducationOrganizationContactAssociations`
* **Removed** `POST /ed-fi/staffEducationOrganizationContactAssociations`
* **Removed** `GET /ed-fi/staffEducationOrganizationContactAssociations/{id}`
* **Removed** `PUT /ed-fi/staffEducationOrganizationContactAssociations/{id}`
* **Removed** `DELETE /ed-fi/staffEducationOrganizationContactAssociations/{id}`
* **Removed** `GET /ed-fi/staffEducationOrganizationContactAssociations/deletes`
* **Removed** `GET /ed-fi/staffEducationOrganizationContactAssociations/keyChanges`
* **Removed** `GET /ed-fi/staffEducationOrganizationContactAssociations/partitions`

### State Education Agency Endpoints and Associated Domains

* EducationOrganization Domain
* Staff Domain

#### Changes to StateEducationAgency

* `GET /ed-fi/stateEducationAgencies`
  * **Parameters**
    * **Added** FederalLocaleCode - The federal locale code given to an education organization.

  * **Response**
    * **Added** property: FederalLocaleCode (string)

* `POST /ed-fi/stateEducationAgencies`

  * **Request**
    * **Added** property: FederalLocaleCode (string)

* `GET /ed-fi/stateEducationAgencies/{id}`

  * **Response**
    * **Added** property: FederalLocaleCode (string)

* `PUT /ed-fi/stateEducationAgencies/{id}`

  * **Request**
    * **Added** property: FederalLocaleCode (string)

### Student Endpoints and Associated Domains

* AlternativeAndSupplementalServices Domain
* Assessment Domain
* Discipline Domain
* Enrollment Domain
* Gradebook Domain
* Graduation Domain
* Intervention Domain
* ReportCard Domain
* SchoolCalendar Domain
* SectionsAndPrograms Domain
* SpecialEducation Domain
* StudentAcademic Record Domain
* StudentAssessment Domain
* StudentCohort Domain
* StudentHealth Domain
* StudentIdentificationAndDemographics Domain
* StudentTranscript Domain
* Survey Domain
* TeachingAndLearning

#### Changes to Student

* `GET /ed-fi/students`

  * **Parameters**
    * **Removed** CitizenshipStatusDescriptor - An indicator of whether or not the person is a U.S. citizen.

  * **Response**
    * **Removed** property: CitizenshipStatusDescriptor (string)

* `POST /ed-fi/students`

  * **Request**
    * **Removed** property: CitizenshipStatusDescriptor (string)
  
* `GET /ed-fi/students/{id}`

  * **Response**
    * **Removed** property: CitizenshipStatusDescriptor (string)

* `PUT /ed-fi/students{id}`

  * **Request**
    * **Removed** property: CitizenshipStatusDescriptor (string)

### StudentAssessments Endpoints and Associated Domains

* Assessment Domain
* StudentAssessment Domain

#### Changes to StudentAssessments

* `GET /ed-fi/studentAssessments`

  * **Parameters**
    * **Added** assessedGradeLevelDescriptor - The grade level for which the assessment form was evaluated for the student on this administration.
    * **Changed** schoolYear (required) - The school year for which the assessment was administered to a student. Among other uses, handles cases in which a student takes a prior-year exam in a subsequent school year during an exam re-test.
  
  * **Response**
    * **Added** property: studentAssessmentIndicator.indicator (string)
    * **Added** property: studentAssessmentIndicator.indicatorName (string)
    * **Added** property: studentAssessmentIndicator.indicatorGroup (string)

* `POST /ed-fi/studentAssessments`

  * **Request**
    * **Added** property: assessedGradeLevelDescriptor - The grade level for which the assessment form was evaluated for the student on this administration.
    * **Added** property: studentAssessmentIndicator.indicator (string)
    * **Added** property: studentAssessmentIndicator.indicatorName (string)
    * **Added** property: studentAssessmentIndicator.indicatorGroup (string)
    * **Changed** property: schoolYear (required)

* `GET /ed-fi/studentAssessments{id}`

  * **Response**
    * **Added** property: assessedGradeLevelDescriptor - The grade level for which the assessment form was evaluated for the student on this administration.
    * **Added** property: studentAssessmentIndicator.indicator (string)
    * **Added** property: studentAssessmentIndicator.indicatorName (string)
    * **Added** property: studentAssessmentIndicator.indicatorGroup (string)

* `PUT /ed-fi/studentAssessments{id}`

  * **Request**
    * **Added** property: assessedGradeLevelDescriptor - The grade level for which the assessment form was evaluated for the student on this administration.
    * **Added** property: studentAssessmentIndicator.indicator (string)
    * **Added** property: studentAssessmentIndicator.indicatorName (string)
    * **Added** property: studentAssessmentIndicator.indicatorGroup (string)
    * **Changed** property: schoolYear (required)

### Student Assessment Registration Endpoints and Associated Domains

* AssessmentRegistration Domain

#### Changes to studentAssessmentRegistration

* `GET /ed-fi/studentAssessmentRegistrations`

  * **Parameters**
    * **Removed** educationOrganizationId -The identifier assigned to an education organization.
    * **Added** StudentDemographicId - The identifier assigned to a student demographic.

  * **Response**
    * **Removed** property: educationOrganizationId (string)
    * **Added** property: StudentDemographicId (string)

* `POST /ed-fi/studentAssessmentRegistrations`

  * **Request**
    * **Removed** property: educationOrganizationId (string)
    * **Added** property: StudentDemographicId (string)

* `GET /ed-fi/studentAssessmentRegistrations/{id}`

  * **Response**
    * **Removed** property: educationOrganizationId (string)
    * **Added** property: StudentDemographicId (string)

* `PUT /ed-fi/studentAssessmentRegistrations/{id}`

  * **Request**
    * **Removed** property: educationOrganizationId (string)
    * **Added** property: StudentDemographicId (string)

### Student Education Organization Association Endpoints and Associated Domains

* Enrollment Domain
* StudentIdentificationAndDemographics Domain

#### Changes to studentEducationOrganizationAssociation

* `GET /ed-fi/studentEducationOrganizationAssociations`

  * **Parameters**
    * **Removed** assigningOrganizationIdentificationCode - The organization code or name assigning the StudentIdentificationCode.
    * **Removed** identificationCode - A unique number or alphanumeric code assigned to a student by a school, school system, a state, or other agency or entity.
    * **Removed** sexDescriptor -The student's birth sex as reported to the education organization.
    * **Removed** genderIdentity -The student's gender as last reported to the education organization.
    * **Removed** hispanicLatinoEthnicity -An indication that the individual traces his or her origin or descent to Mexico, Puerto Rico, Cuba, Central, and South America, and other Spanish cultures, regardless of race, as last reported to the education organization. The term, "Spanish origin," can be used in addition to "Hispanic or Latino."
    * **Removed** limitedEnglishProficiencyDescriptor - An indication that the student has been identified as limited English proficient by the Language Proficiency Assessment Committee (LPAC), or English proficient.
    * **Removed** studentIdentificationSystemDescriptor - A coding scheme that is used for identification and record-keeping purposes by schools, social services, or other agencies to refer to a student.

  * **Response**
    * **Removed** property: assigningOrganizationIdentificationCode (string)
    * **Removed** property: identificationCode (string)
    * **Removed** property: sexDescriptor (string)
    * **Removed** property: genderIdentity (string)
    * **Removed** property: hispanicLatinoEthnicity (boolean)
    * **Removed** property: raceDescriptor (string)
    * **Removed** property: tribalAffiliation (string)
    * **Removed** property: studentCharacteristics (array)
    * **Removed** property: limitedEnglishProficiencyDescriptor (string)
    * **Removed** property: disability (array)
    * **Removed** property: ancestryEthnicOriginDescriptor (string)
    * **Removed** property: supporterMilitaryConnectionDescriptor (string)
    * **Removed** property: studentIdentificationSystemDescriptor (string)
    * **Removed** property: address (array)
    * **Removed** property: electronicMails (array)
    * **Removed** property: internationalAddresses (array)
    * **Removed** property: languages (array)
    * **Removed** property: telephones (array)

* `POST /ed-fi/studentEducationOrganizationAssociations`

  * **Request**
    * **Removed** property: assigningOrganizationIdentificationCode (string)
    * **Removed** property: identificationCode (string)
    * **Removed** property: sexDescriptor (string)
    * **Removed** property: genderIdentity (string)
    * **Removed** property: hispanicLatinoEthnicity (boolean)
    * **Removed** property: raceDescriptor (string)
    * **Removed** property: tribalAffiliation (string)
    * **Removed** property: studentCharacteristics (array)
    * **Removed** property: limitedEnglishProficiencyDescriptor (string)
    * **Removed** property: disability (array)
    * **Removed** property: ancestryEthnicOriginDescriptor (string)
    * **Removed** property: supporterMilitaryConnectionDescriptor (string)
    * **Removed** property: studentIdentificationSystemDescriptor (string)
    * **Removed** property: address (array)
    * **Removed** property: electronicMails (array)
    * **Removed** property: internationalAddresses (array)
    * **Removed** property: languages (array)
    * **Removed** property: telephones (array)

* `GET /ed-fi/studentEducationOrganizationAssociations/{id}`

  * **Response**
    * **Removed** property: assigningOrganizationIdentificationCode (string)
    * **Removed** property: identificationCode (string)
    * **Removed** property: sexDescriptor (string)
    * **Removed** property: genderIdentity (string)
    * **Removed** property: hispanicLatinoEthnicity (boolean)
    * **Removed** property: raceDescriptor (string)
    * **Removed** property: tribalAffiliation (string)
    * **Removed** property: studentCharacteristics (array)
    * **Removed** property: limitedEnglishProficiencyDescriptor (string)
    * **Removed** property: disability (array)
    * **Removed** property: ancestryEthnicOriginDescriptor (string)
    * **Removed** property: supporterMilitaryConnectionDescriptor (string)
    * **Removed** property: studentIdentificationSystemDescriptor (string)
    * **Removed** property: address (array)
    * **Removed** property: electronicMails (array)
    * **Removed** property: internationalAddresses (array)
    * **Removed** property: languages (array)
    * **Removed** property: telephones (array)

* `PUT /ed-fi/studentEducationOrganizationAssociations/{id}`

  * **Request**
    * **Removed** property: assigningOrganizationIdentificationCode (string)
    * **Removed** property: identificationCode (string)
    * **Removed** property: sexDescriptor (string)
    * **Removed** property: genderIdentity (string)
    * **Removed** property: hispanicLatinoEthnicity (boolean)
    * **Removed** property: raceDescriptor (string)
    * **Removed** property: tribalAffiliation (string)
    * **Removed** property: studentCharacteristics (array)
    * **Removed** property: limitedEnglishProficiencyDescriptor (string)
    * **Removed** property: disability (array)
    * **Removed** property: ancestryEthnicOriginDescriptor (string)
    * **Removed** property: supporterMilitaryConnectionDescriptor (string)
    * **Removed** property: studentIdentificationSystemDescriptor (string)
    * **Removed** property: address (array)
    * **Removed** property: electronicMails (array)
    * **Removed** property: internationalAddresses (array)
    * **Removed** property: languages (array)
    * **Removed** property: telephones (array)

### Student Grade Book Entry Endpoints and Associated Domains

* Gradebook Domain
* StudentAcademicRecord Domain

#### Changes to studentGradeBookEntry

* `GET /ed-fi/studentGradeBookEntry`
  
  * **Parameters**
    * **Added** DateCompleted - The date that the assignment was completed
    * **Added** AssignmentPassedIndicator - Indication of whether the assignment was passed or not.

  * **Response**
    * **Added** DateCompleted (string)
    * **Added** AssignmentPassedIndicator (boolean)

* `POST /ed-fi/studentGradeBookEntry`

  * **Request**
    * **Added** DateCompleted (string)
    * **Added** AssignmentPassedIndicator (boolean)

* `GET /ed-fi/studentGradeBookEntry/{id}`

  * **Response**
    * **Added** DateCompleted (string)
    * **Added** AssignmentPassedIndicator (boolean)

* `PUT /ed-fi/studentGradeBookEntry/{id}`

  * **Request**
    * **Added** DateCompleted (string)
    * **Added** AssignmentPassedIndicator (boolean)

### Student Special Education Program Association Endpoints and Associated Domains

* AlternativeAndSupplementalServices Domain
* SpecialEducation

#### Changes to studentSpecialEducationProgramAssociation

* `GET /ed-fi/studentSpecialEducationProgramAssociation`
  
  * **Parameters**
    * **Added** IEPEvaluationDueDate - The due date for the next special education evaluation.
    * **Added** IEPReviewDueDate - The due date for the next IEP review.

  * **Response**
    * **Added** IEPEvaluationDueDate (string)
    * **Added** IEPReviewDueDate (string)

* `POST /ed-fi/studentSpecialEducationProgramAssociation`

  * **Response**
    * **Added** IEPEvaluationDueDate (string)
    * **Added** IEPReviewDueDate (string)

* `GET /ed-fi/studentSpecialEducationProgramAssociation/{id}`

  * **Response**
    * **Added** IEPEvaluationDueDate (string)
    * **Added** IEPReviewDueDate (string)

* `PUT /ed-fi/studentSpecialEducationProgramAssociation/{id}`

  * **Added** IEPEvaluationDueDate (string)
  * **Added** IEPReviewDueDate (string)
