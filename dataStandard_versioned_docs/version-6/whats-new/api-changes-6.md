# API Changes from 5.0 to 6.0

:::warning

Developer note: see the 5.1 to 5.2 document for a good example

:::

## New Endpoints

### Credential Domain (NEW)

#### certification

* `GET /ed-fi/certification`
    Retrieves specific certifications using property values.
* `POST /ed-fi/certification`
    Creates or updates certifications based on natural key values.
* `GET /certification{id}`
    Retrieves a specific certification by ID.
* `PUT /ed-fi/certification{id}`
    Updates a specific certification by ID.
* `DELETE /ed-fi/certification/{id}`
    Deletes a specific certification by ID.

#### certificationExam

* `GET /ed-fi/certificationExam`
    Retrieves specific certification exam using property values.
* `POST /ed-fi/certificationExam`
    Creates or updates the certification exam based on natural key values.
* `GET /certificationExam{id}`
    Retrieves a specific examination by ID.
* `PUT /ed-fi/certificationExam{id}`
    Updates a specific examination by ID.
* `DELETE /ed-fi/certificationExam/{id}`
    Deletes a specific examination by ID.

#### certificationExamResult

* `GET /ed-fi/certificationExamResult`
    Retrieves specific certification examination results using property values.
* `POST /ed-fi/certificationExamResult`
    Creates or updates certification examination results based on natural key values.
* `GET /certificationExamResult{id}`
    Retrieves a specific certification examination result by ID.
* `PUT /ed-fi/certificationExamResult{id}`
    Updates a specific certification examination result by ID.
* `DELETE /ed-fi/certificationExamResult/{id}`
    Deletes a specific certification examination result by ID.

#### credentialEvent

* `GET /ed-fi/credentialEvent`
    Retrieves specific credential events using property values.
* `POST /ed-fi/credentialEvent`
    Creates or updates a credential events based on natural key values.
* `GET /credentialEvent{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/credentialEvent{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/credentialEvent/{id}`
    Deletes a specific credential event by Id.

### Educator Preparation Program Domain Additions

* `GET /ed-fi/Candidate`
    Retrieves specific credential events using property values.
* `POST /ed-fi/Candidate`
   Creates or updates a credential events based on natural key values.
* `GET /Candidate{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/Candidate{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/Candidate/{id}`
    Deletes a specific credential event by Id.

* `GET /ed-fi/CandidateEducatorPreparationProgramAssociation`
    Retrieves specific credential events using property values.
* `POST /ed-fi/CandidateEducatorPreparationProgramAssociation`
    Creates or updates a credential events based on natural key values.
* `GET /CandidateEducatorPreparationProgramAssociation{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/CandidateEducatorPreparationProgramAssociation{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/CandidateEducatorPreparationProgramAssociation/{id}`
    Deletes a specific credential event by Id.

* `GET /ed-fi/candidateRelationshipToStaffAssociation`
    Retrieves specific credential events using property values.
* `POST /ed-fi/candidateRelationshipToStaffAssociation`
    Creates or updates a credential events based on natural key values.
* `GET /candidateRelationshipToStaffAssociation{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/candidateRelationshipToStaffAssociation{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/candidateRelationshipToStaffAssociation/{id}`
    Deletes a specific credential event by Id.

* `GET /ed-fi/staffEducatorPreparationProgramAssociation`
    Retrieves specific credential events using property values.
* `POST /ed-fi/staffEducatorPreparationProgramAssociation`
    Creates or updates a credential events based on natural key values.
* `GET /staffEducatorPreparationProgramAssociation{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/staffEducatorPreparationProgramAssociation{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/staffEducatorPreparationProgramAssociation/{id}`
    Deletes a specific credential event by Id.

* `GET /ed-fi/educatorPreparationProgram`
    Retrieves specific credential events using property values.
* `POST /ed-fi/educatorPreparationProgram`
    Creates or updates a credential events based on natural key values.
* `GET /educatorPreparationProgram{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/educatorPreparationProgram{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/educatorPreparationProgram/{id}`
    Deletes a specific credential event by Id.

* `GET /ed-fi/fieldworkExperience`
    Retrieves specific credential events using property values.
* `POST /ed-fi/fieldworkExperience`
    Creates or updates a credential events based on natural key values.
* `GET /fieldworkExperience{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/fieldworkExperience{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/fieldworkExperience/{id}`
    Deletes a specific credential event by Id.

#### candidateIdentificationCode

* `GET /ed-fi/candidateIdentificationCode`
    Retrieves specific credential events using property values.
* `POST /ed-fi/candidateIdentificationCode`
    Creates or updates a credential events based on natural key values.
* `GET /candidateIdentificationCode{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/candidateIdentificationCode{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/candidateIdentificationCode/{id}`
    Deletes a specific credential event by Id.

### Enrollment Domain Additions

* `GET /ed-fi/financialAid`
    Retrieves specific credential events using property values.
* `POST /ed-fi/financialAid`
    Creates or updates a credential events based on natural key values.
* `GET /financialAid{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/financialAid{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/financialAid/{id}`
    Deletes a specific credential event by Id.

### Path Domain Additions

*

### Performance Evaluation Domain Additions

* `GET /ed-fi/evaluation`
    Retrieves specific credential events using property values.
* `POST /ed-fi/evaluation`
    Creates or updates a credential events based on natural key values.
* `GET /evaluation{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/evaluation{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/evaluation/{id}`
    Deletes a specific credential event by Id.

* `GET /ed-fi/evaluationRating`
    Retrieves specific credential events using property values.
* `POST /ed-fi/evaluationRating`
    Creates or updates a credential events based on natural key values.
* `GET /evaluationRating{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/evaluationRating{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/evaluationRating/{id}`
    Deletes a specific credential event by Id.

* `GET /ed-fi/evaluationObjective`
    Retrieves specific credential events using property values.
* `POST /ed-fi/evaluationObjective`
    Creates or updates a credential events based on natural key values.
* `GET /evaluationObjective{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/evaluationObjective{id}`
    Updates a specific credential event by ID.s
* `DELETE /ed-fi/evaluationObjective/{id}`
    Deletes a specific credential event by Id.

* `GET /ed-fi/evaluationObjectiveRating`
    ReRetrieves specific credential events using property values.
* `POST /ed-fi/evaluationObjectiveRating`
    Creates or updates a credential events based on natural key values.
* `GET /evaluationObjectiveRating{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/evaluationObjectiveRating{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/evaluationObjectiveRating/{id}`
    Deletes a specific credential event by Id.

* `GET /ed-fi/performanceEvaluation`
    Retrieves specific credential events using property values.
* `POST /ed-fi/performanceEvaluation`
    Creates or updates a credential events based on natural key values.
* `GET /performanceEvaluation{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/performanceEvaluation{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/performanceEvaluation/{id}`
    Deletes a specific credential event by Id.

* `GET /ed-fi/performanceEvaluationRating`
    Retrieves specific credential events using property values.
* `POST /ed-fi/performanceEvaluationRating`
    Creates or updates a credential events based on natural key values.
* `GET /performanceEvaluationRating{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/performanceEvaluationRating{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/performanceEvaluationRating/{id}`
    Deletes a specific credential event by Id.

### Recruitment And Staffing Domain Additions

* `GET /ed-fi/application`
    Retrieves specific credential events using property values.
* `POST /ed-fi/application`
    Creates or updates a credential events based on natural key values.
* `GET /application{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/application{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/application/{id}`
    Deletes a specific credential event by Id.

* `GET /ed-fi/applicationEvent`
    Retrieves specific credential events using property values.
* `POST /ed-fi/applicationEvent`
    Creates or updates a credential events based on natural key values.
* `GET /applicationEvent{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/applicationEvent{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/applicationEvent/{id}`
    Deletes a specific credential event by Id.

* `GET /ed-fi/applicantProfile`
    Retrieves specific credential events using property values.
* `POST /ed-fi/applicantProfile`
    Creates or updates a credential events based on natural key values.
* `GET /applicantProfile{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/applicantProfile{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/applicantProfile/{id}`
    Deletes a specific credential event by Id.

* `GET /ed-fi/recruitmentEvent`
    Retrieves specific credential events using property values.
* `POST /ed-fi/recruitmentEvent`
    Creates or updates a credential events based on natural key values.
* `GET /recruitmentEvent{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/recruitmentEvent{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/recruitmentEvent/{id}`
    Deletes a specific credential event by Id.

* `GET /ed-fi/recruitmentEventAttendance`
    Retrieves specific credential events using property values.
* `POST /ed-fi/recruitmentEventAttendance`
    Creates or updates a credential events based on natural key values.
* `GET /recruitmentEventAttendance{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/recruitmentEventAttendance{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/recruitmentEventAttendance/{id}`
    Deletes a specific credential event by Id.

### Student Identification and Demographic Domain Additions

#### studentDemographics

* `GET /ed-fi/studentDemographics`
    Retrieves specific credential events using property values.
* `POST /ed-fi/studentDemographics`
    Creates or updates a credential events based on natural key values.
* `GET /studentDemographics{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/studentDemographics{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/studentDemographics/{id}`
    Deletes a specific credential event by Id.

#### studentDirectory

* `GET /ed-fi/studentDirectory`
    Retrieves specific credential events using property values.
* `POST /ed-fi/studentDirectory`
    Creates or updates a credential events based on natural key values.
* `GET /studentDirectory{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/studentDirectory{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/studentDirectory/{id}`
    Deletes a specific credential event by Id.

#### studentIdentificationCode

* `GET /ed-fi/studentIdentificationCode`
    Retrieves specific credential events using property values.
* `POST /ed-fi/studentIdentificationCode`
    Creates or updates a credential events based on natural key values.
* `GET /studentIdentificationCode{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/studentIdentificationCode{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/studentIdentificationCode/{id}`
    Deletes a specific credential event by Id.

### Staff Domain Additions

#### staffDemographic

* `GET /ed-fi/staffDemographic`
    Retrieves specific credential events using property values.
* `POST /ed-fi/staffDemographic`
    Creates or updates a credential events based on natural key values.
* `GET /staffDemographic{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/staffDemographic{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/staffDemographic/{id}`
    Deletes a specific credential event by Id.

#### staffDirectory

* `GET /ed-fi/staffDirectory`
    Retrieves specific credential events using property values.
* `POST /ed-fi/staffDirectory`
    Creates or updates a credential events based on natural key values.
* `GET /staffDirectory{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/staffDirectory{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/staffDirectory/{id}`
    Deletes a specific credential event by Id.

#### staffIdentificationCode

* `GET /ed-fi/staffIdentificationCode`
    Retrieves specific credential events using property values.
* `POST /ed-fi/staffIdentificationCode`
    Creates or updates a credential events based on natural key values.
* `GET /staffIdentificationCode{id}`
    Retrieves a specific credential event by ID.
* `PUT /ed-fi/staffIdentificationCode{id}`
    Updates a specific credential event by ID.
* `DELETE /ed-fi/staffIdentificationCode/{id}`
    Deletes a specific credential event by Id.

## Modified Endpoints

### Alternative And Supplemental Supplemental Services Domain Modifications

* `/ed-fi/school....`
  * **Parameters**
    * **Added** FederalLocaleCode
    * **Added** ImprovingSchool
    * **Added** AccreditationStatus

### Assessment Domain Modifications

* `/ed-fi/assessment....`
  * **Parameters**
    * **Changed** AcademicSubject

* `/ed-fi/objectiveAssessment....`
  * **Parameters**
    * **Changed**

* `/ed-fi/StudentAssessment....`
* **Changed** AcademicSubject
* **Changed** AssessedGradeLevel
* **Changed** SchoolYear
* **Changed** StudentAssessmentIndicator
* **Changed** ObjectiveAssessment

### AssessmentMetaData Domain Modifications

* `/ed-fi/assessment....`
  * **Parameters**
    * **Changed** AcademicSubject

* `/ed-fi/objectiveAssessment....`
  * **Parameters**
    * **Changed**

### Assessment Registration Domain Modifications

* `/ed-fi/assessment....`
  * **Parameters**
    * **Changed** AcademicSubject

* `/ed-fi/school....`
  * **Parameters**
    * **Added** FederalLocaleCode
    * **Added** ImprovingSchool
    * **Added** AccreditationStatus

### BellSchedule Domain Modifications

* `/ed-fi/school....`
  * **Parameters**
    * **Added** FederalLocaleCode
    * **Added** ImprovingSchool
    * **Added** AccreditationStatus

### CourseCatalog Domain Modifications

* `/ed-fi/school....`
  * **Parameters**
    * **Added** FederalLocaleCode
    * **Added** ImprovingSchool
    * **Added** AccreditationStatus

### Discipline Domain Modifications

* `/ed-fi/school....`
  * **Parameters**
    * **Added** FederalLocaleCode
    * **Added** ImprovingSchool
    * **Added** AccreditationStatus

* `/ed-fi/staff....`
  * **Parameters**
    * **Added** FederalLocaleCode
    * **Added** ImprovingSchool

### Education Organization Domain Modifications

* `/ed-fi/localEducationAgency....`
  * **Parameters**
    * **Added** FederalLocaleCode

* `/ed-fi/school....`
  * **Parameters**
    * **Added** FederalLocaleCode
    * **Added** ImprovingSchool
    * **Added** AccreditationStatus

* `/ed-fi/postSecondaryInstitution....`
  * **Parameters**
    * **Added** FederalLocaleCode

* `/ed-fi/stateEducationAgency....`
  * **Parameters**
    * **Added** FederalLocaleCode

### Enrollment Domain Modifications

* `/ed-fi/school....`
  * **Parameters**
    * **Added** FederalLocaleCode
    * **Added** ImprovingSchool
    * **Added** AccreditationStatus

* `/ed-fi/studentEducationOrganizationAssociations`

  * **Parameters**
    * **Removed** StudentIdentificationCode (string)
    * **Removed** Sex
    * **Removed** GenderIdentity
    * **Removed** Address
    * **Removed** InternationalAddress
    * **Removed** Telephone
    * **Removed** ElectronicMail
    * **Removed** HispanicLatinoEthnicity
    * **Removed** Race
    * **Removed** TribalAffiliation
    * **Removed** StudentCharacteristic
    * **Removed** LimitedEnglishProficiency
    * **Removed** Language
    * **Removed** Disability
    * **Removed** AncestryEthnicOrigin
    * **Removed** SupporterMilitaryConnection

    * **Add**
    * **Changed**

  * **Response**
    * **Added** property: [n].dualCreditEducationOrganizationReference (object)

### Finance

* `/ed-fi/staff....`
  * **Parameters**
    * **Added** FederalLocaleCode
    * **Added** ImprovingSchool
    * **Added** AccreditationStatus

### Graduation Domain Modifications

* `/ed-fi/school....`
  * **Parameters**
    * **Added** FederalLocaleCode
    * **Added** ImprovingSchool
    * **Added** AccreditationStatus

### School Calendar Domain Modifications

* `/ed-fi/school....`
  * **Parameters**
    * **Added** FederalLocaleCode
    * **Added** ImprovingSchool
    * **Added** AccreditationStatus

### Section And Programs Domain Modifications

* `/ed-fi/school....`
  * **Parameters**
    * **Added** FederalLocaleCode
    * **Added** ImprovingSchool
    * **Added** AccreditationStatus

### Special Education Domain Modifications

* `/ed-fi/school....`
  * **Parameters**
    * **Added** FederalLocaleCode
    * **Added** ImprovingSchool
    * **Added** AccreditationStatus

### Staff Domain Modifications

* **Removed** `/ed-fi/studentEducationOrganizationAssociations`

* `/ed-fi/school....`
  * **Parameters**
    * **Added** FederalLocaleCode
    * **Added** ImprovingSchool
    * **Added** AccreditationStatus

### Student Academic Record Domain Modifications

* `/ed-fi/school....`
  * **Parameters**
    * **Added** FederalLocaleCode
    * **Added** ImprovingSchool
    * **Added** AccreditationStatus

### Student Assessment Domain Modifications

* `/ed-fi/StudentAssessment....`
* **Changed** AcademicSubject
* **Changed** AssessedGradeLevel
* **Changed** SchoolYear
* **Changed** StudentAssessmentIndicator
* **Changed** ObjectiveAssessment

### Student Attendance Domain Modifications

* `/ed-fi/school....`
  * **Parameters**
    * **Added** FederalLocaleCode
    * **Added** ImprovingSchool
    * **Added** AccreditationStatus

### Student Identification and Demographics Domain Modifications

* `/ed-fi/studentEducationOrganizationAssociations`

### Teaching and Learning Domain Modifications

* `/ed-fi/school....`
  * **Parameters**
    * **Added** FederalLocaleCode
    * **Added** ImprovingSchool
    * **Added** AccreditationStatus
