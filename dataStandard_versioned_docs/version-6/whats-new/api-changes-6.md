# API Changes from 5.0 to 6.0

:::warning

Pluralize the new endpoint names

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
    Retrieves specific certification exams using property values.
* `POST /ed-fi/certificationExam`
    Creates or updates the certification exams based on natural key values.
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
    Deletes a specific credential event by ID.

### Educator Preparation Program Domain Additions

* `GET /ed-fi/Candidate`
    Retrieves specific candidates using property values.
* `POST /ed-fi/Candidate`
   Creates or updates candidates events based on natural key values.
* `GET /Candidate{id}`
    Retrieves a specific candidate event by ID.
* `PUT /ed-fi/Candidate{id}`
    Updates a specific candidate event by ID.
* `DELETE /ed-fi/Candidate/{id}`
    Deletes a specific candidate event by ID.

* `GET /ed-fi/CandidateEducatorPreparationProgramAssociation`
    Retrieves specific candidate educator preparation program associations using property values.
* `POST /ed-fi/CandidateEducatorPreparationProgramAssociation`
    Creates or updates candidate educator preparation program associations based on natural key values.
* `GET /CandidateEducatorPreparationProgramAssociation{id}`
    Retrieves a specific candidate educator preparation program association event by ID.
* `PUT /ed-fi/CandidateEducatorPreparationProgramAssociation{id}`
    Updates a specific candidate educator preparation program association event by ID.
* `DELETE /ed-fi/CandidateEducatorPreparationProgramAssociation/{id}`
    Deletes a specific candidate educator preparation program association event by ID.

* `GET /ed-fi/candidateRelationshipToStaffAssociation`
    Retrieves specific candidate relationship to staff associations using property values.
* `POST /ed-fi/candidateRelationshipToStaffAssociation`
    Creates or updates specific candidate relationship to staff associations based on natural key values.
* `GET /candidateRelationshipToStaffAssociation{id}`
    Retrieves a specific specific candidate relationship to staff association by ID.
* `PUT /ed-fi/candidateRelationshipToStaffAssociation{id}`
    Updates a specific specific candidate relationship to staff association by ID.
* `DELETE /ed-fi/candidateRelationshipToStaffAssociation/{id}`
    Deletes a specific specific candidate relationship to staff association by ID.

* `GET /ed-fi/staffEducatorPreparationProgramAssociation`
    Retrieves specific staff educator preparation program associations using property values.
* `POST /ed-fi/staffEducatorPreparationProgramAssociation`
    Creates or updates staff educator preparation program associations based on natural key values.
* `GET /staffEducatorPreparationProgramAssociation{id}`
    Retrieves a specific staff educator preparation program association by ID.
* `PUT /ed-fi/staffEducatorPreparationProgramAssociation{id}`
    Updates a specific staff educator preparation program association by ID.
* `DELETE /ed-fi/staffEducatorPreparationProgramAssociation/{id}`
    Deletes a specific staff educator preparation program association by ID.

* `GET /ed-fi/educatorPreparationProgram`
    Retrieves specific educator preparation programs using property values.
* `POST /ed-fi/educatorPreparationProgram`
    Creates or updates specific educator preparation programs based on natural key values.
* `GET /educatorPreparationProgram{id}`
    Retrieves a specific specific educator preparation program by ID.
* `PUT /ed-fi/educatorPreparationProgram{id}`
    Updates a specific specific educator preparation program by ID.
* `DELETE /ed-fi/educatorPreparationProgram/{id}`
    Deletes a specific specific educator preparation program by ID.

* `GET /ed-fi/fieldworkExperience`
    Retrieves specific fieldwork experiences using property values.
* `POST /ed-fi/fieldworkExperience`
    Creates or updates fieldwork experiences based on natural key values.
* `GET /fieldworkExperience{id}`
    Retrieves a specific fieldwork experience by ID.
* `PUT /ed-fi/fieldworkExperience{id}`
    Updates a specific fieldwork experience by ID.
* `DELETE /ed-fi/fieldworkExperience/{id}`
    Deletes a specific fieldwork experience by ID.

#### candidateIdentificationCode

* `GET /ed-fi/candidateIdentificationCode`
    Retrieves specific candidate identification codes using property values.
* `POST /ed-fi/candidateIdentificationCode`
    Creates or updates candidate identification codes based on natural key values.
* `GET /candidateIdentificationCode{id}`
    Retrieves a specific candidate identification code by ID.
* `PUT /ed-fi/candidateIdentificationCode{id}`
    Updates a specific candidate identification code by ID.
* `DELETE /ed-fi/candidateIdentificationCode/{id}`
    Deletes a specific candidate identification code by ID.

### Enrollment Domain Additions

* `GET /ed-fi/financialAid`
    Retrieves specific financial aid awards using property values.
* `POST /ed-fi/financialAid`
    Creates or updates a financial aid awards based on natural key values.
* `GET /financialAid{id}`
    Retrieves a specific financial aid award by ID.
* `PUT /ed-fi/financialAid{id}`
    Updates a specific financial aid award by ID.
* `DELETE /ed-fi/financialAid/{id}`
    Deletes a specific financial aid award by ID.

### Path Domain Additions

*

### Performance Evaluation Domain Additions

* `GET /ed-fi/evaluation`
    Retrieves specific evaluations using property values.
* `POST /ed-fi/evaluation`
    Creates or updates evaluations based on natural key values.
* `GET /evaluation{id}`
    Retrieves a specific evaluation by ID.
* `PUT /ed-fi/evaluation{id}`
    Updates a specific evaluation by ID.
* `DELETE /ed-fi/evaluation/{id}`
    Deletes a specific evaluation by ID.

* `GET /ed-fi/evaluationRating`
    Retrieves specific evaluation ratings events using property values.
* `POST /ed-fi/evaluationRating`
    Creates or updates evaluation ratings events based on natural key values.
* `GET /evaluationRating{id}`
    Retrieves a specific evaluation rating event by ID.
* `PUT /ed-fi/evaluationRating{id}`
    Updates a specific evaluation rating event by ID.
* `DELETE /ed-fi/evaluationRating/{id}`
    Deletes a specific evaluation rating event by ID.

* `GET /ed-fi/evaluationObjective`
    Retrieves specific evaluation objectives using property values.
* `POST /ed-fi/evaluationObjective`
    Creates or updates evaluation objectives based on natural key values.
* `GET /evaluationObjective{id}`
    Retrieves a specific evaluation objective by ID.
* `PUT /ed-fi/evaluationObjective{id}`
    Updates a specific evaluation objective by ID.
* `DELETE /ed-fi/evaluationObjective/{id}`
    Deletes a specific evaluation objective by ID.

* `GET /ed-fi/evaluationObjectiveRating`
    ReRetrieves specific evaluation objective ratings using property values.
* `POST /ed-fi/evaluationObjectiveRating`
    Creates or updates evaluation objective ratings based on natural key values.
* `GET /evaluationObjectiveRating{id}`
    Retrieves a specific evaluation objective rating by ID.
* `PUT /ed-fi/evaluationObjectiveRating{id}`
    Updates a specific evaluation objective rating by ID.
* `DELETE /ed-fi/evaluationObjectiveRating/{id}`
    Deletes a specific evaluation objective rating by ID.

* `GET /ed-fi/performanceEvaluation`
    Retrieves performance evaluations using property values.
* `POST /ed-fi/performanceEvaluation`
    Creates or updates performance evaluations based on natural key values.
* `GET /performanceEvaluation{id}`
    Retrieves a specific performance evaluation by ID.
* `PUT /ed-fi/performanceEvaluation{id}`
    Updates a specific performance evaluation by ID.
* `DELETE /ed-fi/performanceEvaluation/{id}`
    Deletes a specific performance evaluation by ID.

* `GET /ed-fi/performanceEvaluationRating`
    Retrieves specific performance evaluation ratings using property values.
* `POST /ed-fi/performanceEvaluationRating`
    Creates or updates performance evaluation ratings based on natural key values.
* `GET /performanceEvaluationRating{id}`
    Retrieves a specific performance evaluation ratings by ID.
* `PUT /ed-fi/performanceEvaluationRating{id}`
    Updates a specific performance evaluation ratings by ID.
* `DELETE /ed-fi/performanceEvaluationRating/{id}`
    Deletes a specific performance evaluation ratings by ID.

### Recruitment And Staffing Domain Additions

* `GET /ed-fi/application`
    Retrieves specific applications using property values.
* `POST /ed-fi/application`
    Creates or updates a applications events based on natural key values.
* `GET /application{id}`
    Retrieves a specific application by ID.
* `PUT /ed-fi/application{id}`
    Updates a specific application by ID.
* `DELETE /ed-fi/application/{id}`
    Deletes a specific application by ID.

* `GET /ed-fi/applicationEvent`
    Retrieves specific application events using property values.
* `POST /ed-fi/applicationEvent`
    Creates or updates a application events based on natural key values.
* `GET /applicationEvent{id}`
    Retrieves a specific application event by ID.
* `PUT /ed-fi/applicationEvent{id}`
    Updates a specific application event by ID.
* `DELETE /ed-fi/applicationEvent/{id}`
    Deletes a specific application event by ID.

* `GET /ed-fi/applicantProfile`
    Retrieves specific applicant profiles using property values.
* `POST /ed-fi/applicantProfile`
    Creates or updates applicant profiles based on natural key values.
* `GET /applicantProfile{id}`
    Retrieves a specific applicant profile by ID.
* `PUT /ed-fi/applicantProfile{id}`
    Updates a specific applicant profile by ID.
* `DELETE /ed-fi/applicantProfile/{id}`
    Deletes a specific applicant profile by ID.

* `GET /ed-fi/recruitmentEvent`
    Retrieves specific recruitment events using property values.
* `POST /ed-fi/recruitmentEvent`
    Creates or updates a recruitment events based on natural key values.
* `GET /recruitmentEvent{id}`
    Retrieves a specific recruitment event by ID.
* `PUT /ed-fi/recruitmentEvent{id}`
    Updates a specific recruitment event by ID.
* `DELETE /ed-fi/recruitmentEvent/{id}`
    Deletes a specific recruitment event by ID.

* `GET /ed-fi/recruitmentEventAttendance`
    Retrieves specific recruitment event attendance using property values.
* `POST /ed-fi/recruitmentEventAttendance`
    Creates or updates recruitment event attendance based on natural key values.
* `GET /recruitmentEventAttendance{id}`
    Retrieves a specific recruitment event attendance by ID.
* `PUT /ed-fi/recruitmentEventAttendance{id}`
    Updates a specific recruitment event attendance by ID.
* `DELETE /ed-fi/recruitmentEventAttendance/{id}`
    Deletes a specific recruitment event attendance by ID.

### Student Identification and Demographic Domain Additions

#### studentDemographic

* `GET /ed-fi/studentDemographic`
    Retrieves specific student demographics using property values.
* `POST /ed-fi/studentDemographic`
    Creates or updates student demographics based on natural key values.
* `GET /studentDemographic{id}`
    Retrieves a specific student demographic by ID.
* `PUT /ed-fi/studentDemographic{id}`
    Updates a specific student demographic by ID.
* `DELETE /ed-fi/studentDemographic/{id}`
    Deletes a specific student demographic by ID.

#### studentDirectory

* `GET /ed-fi/studentDirectory`
    Retrieves specific student directory records using property values.
* `POST /ed-fi/studentDirectory`
    Creates or updates student directory records based on natural key values.
* `GET /studentDirectory{id}`
    Retrieves a specific student directory entry by ID.
* `PUT /ed-fi/studentDirectory{id}`
    Updates a specific student directory entry by ID.
* `DELETE /ed-fi/studentDirectory/{id}`
    Deletes a specific student directory entry by ID.

#### studentIdentificationCode

* `GET /ed-fi/studentIdentificationCode`
    Retrieves specific student identification codes using property values.
* `POST /ed-fi/studentIdentificationCode`
    Creates or updates a student identification codes based on natural key values.
* `GET /studentIdentificationCode{id}`
    Retrieves a specific student identification code by ID.
* `PUT /ed-fi/studentIdentificationCode{id}`
    Updates a specific student identification code by ID.
* `DELETE /ed-fi/studentIdentificationCode/{id}`
    Deletes a specific student identification code by ID.

### Staff Domain Additions

#### staffDemographic

* `GET /ed-fi/staffDemographic`
    Retrieves specific staff demographics using property values.
* `POST /ed-fi/staffDemographic`
    Creates or updates staff demographics based on natural key values.
* `GET /staffDemographic{id}`
    Retrieves a specific staff demographic by ID.
* `PUT /ed-fi/staffDemographic{id}`
    Updates a specific staff demographic by ID.
* `DELETE /ed-fi/staffDemographic/{id}`
    Deletes a specific staff demographic by ID.

#### staffDirectory

* `GET /ed-fi/staffDirectory`
    Retrieves specific staff directory records using property values.
* `POST /ed-fi/staffDirectory`
    Creates or updates staff directory records based on natural key values.
* `GET /staffDirectory{id}`
    Retrieves a specific directory record by ID.
* `PUT /ed-fi/staffDirectory{id}`
    Updates a specific directory record by ID.
* `DELETE /ed-fi/staffDirectory/{id}`
    Deletes a specific directory record by ID.

#### staffIdentificationCode

* `GET /ed-fi/staffIdentificationCode`
    Retrieves specific staff identification codes using property values.
* `POST /ed-fi/staffIdentificationCode`
    Creates or updates staff identification codes based on natural key values.
* `GET /staffIdentificationCode{id}`
    Retrieves a specific staff identification code by ID.
* `PUT /ed-fi/staffIdentificationCode{id}`
    Updates a specific staff identification code by ID.
* `DELETE /ed-fi/staffIdentificationCode/{id}`
    Deletes a specific staff identification code by ID.

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
