# API Changes from 5.1 to 5.2

## New Endpoints

### [Assessment Registration Domain](https://docs.ed-fi.org/reference/data-exchange/data-standard/model-reference/assessment-registration-domain/best-practices)

#### assessmentAdministrations

* **GET** /ed-fi/assessmentAdministrations
    Retrieves specific assessment administrations using property values.
* **POST** /ed-fi/assessmentAdministrations
    Creates or updates assessment administrations based on natural key values.
* **GET** /ed-fi/assessmentAdministrations/{id}
    Retrieves a specific assessment administration by ID.
* **PUT** /ed-fi/assessmentAdministrations/{id}
    Updates a specific assessment administration by ID.
* **DELETE** /ed-fi/assessmentAdministrations/{id}
    Deletes a specific assessment administration by ID.
* **GET** /ed-fi/assessmentAdministrations/deletes
    Retrieves deleted assessment administrations based on change version.

#### assessmentAdministrationParticipations

* **GET** /ed-fi/assessmentAdministrationParticipations
    Retrieves specific assessment administration participations using property values.
* **POST** /ed-fi/assessmentAdministrationParticipations
    Creates or updates assessment administration participations based on natural key values.
* **GET** /ed-fi/assessmentAdministrationParticipations/{id}
    Retrieves a specific assessment administration participation by ID.
* **PUT** /ed-fi/assessmentAdministrationParticipations/{id}
    Updates a specific assessment administration participation by ID.
* **DELETE** /ed-fi/assessmentAdministrationParticipations/{id}
    Deletes a specific assessment administration participation by ID.
* **GET** /ed-fi/assessmentAdministrationParticipations/deletes
    Retrieves deleted assessment administration participations based on change version.

#### assessmentBatteryParts

* **GET** /ed-fi/assessmentBatteryParts
    Retrieves specific assessment battery parts using property values.
* **POST** /ed-fi/assessmentBatteryParts
    Creates or updates assessment battery parts based on natural key values.
* **GET** /ed-fi/assessmentBatteryParts/{id}
    Retrieves a specific assessment battery part by ID.
* **PUT** /ed-fi/assessmentBatteryParts/{id}
    Updates a specific assessment battery part by ID.
* **DELETE** /ed-fi/assessmentBatteryParts/{id}
    Deletes a specific assessment battery part by ID.
* **GET** /ed-fi/assessmentBatteryParts/deletes
    Retrieves deleted assessment battery parts based on change version.

#### studentAssessmentRegistrations

* **GET** /ed-fi/studentAssessmentRegistrations
    Retrieves specific student assessment registrations using property values.
* **POST** /ed-fi/studentAssessmentRegistrations
    Creates or updates student assessment registrations based on natural key values.
* **GET** /ed-fi/studentAssessmentRegistrations/{id}
    Retrieves a specific student assessment registration by ID.
* **PUT** /ed-fi/studentAssessmentRegistrations/{id}
    Updates a specific student assessment registration by ID.
* **DELETE** /ed-fi/studentAssessmentRegistrations/{id}
    Deletes a specific student assessment registration by ID.
* **GET** /ed-fi/studentAssessmentRegistrations/deletes
    Retrieves deleted student assessment registrations based on change version.

#### studentAssessmentRegistrationBatteryPartAssociations

* **GET** /ed-fi/studentAssessmentRegistrationBatteryPartAssociations
    Retrieves specific student assessment registration battery part associations using property values.
* **POST** /ed-fi/studentAssessmentRegistrationBatteryPartAssociations
    Retrieves a specific student assessment registration battery part association by ID.
* **GET** /ed-fi/studentAssessmentRegistrationBatteryPartAssociations/{id}
    Retrieves a specific student assessment registration battery part association by ID.
* **PUT** /ed-fi/studentAssessmentRegistrationBatteryPartAssociations/{id}
    Updates a specific student assessment registration battery part association by ID.
* **DELETE** /ed-fi/studentAssessmentRegistrationBatteryPartAssociations/{id}
    Deletes a specific student assessment registration battery part association by ID.
* **GET** /ed-fi/studentAssessmentRegistrationBatteryPartAssociations/deletes
    Retrieves deleted student assessment registration battery part associations based on change version.

#### studentEducationOrganizationAssessmentAccommodations

* **GET** /ed-fi/studentEducationOrganizationAssessmentAccommodations
    Retrieves specific student education organization assessment accommodations using property values.
* **POST** /ed-fi/studentEducationOrganizationAssessmentAccommodations
    Creates or updates student education organization assessment accommodations based on natural key values.
* **GET** /ed-fi/studentEducationOrganizationAssessmentAccommodations/{id}
    Retrieves a specific student education organization assessment accommodation by ID.
* **PUT** /ed-fi/studentEducationOrganizationAssessmentAccommodations/{id}
    Updates a specific student education organization assessment accommodation by ID.
* **DELETE** /ed-fi/studentEducationOrganizationAssessmentAccommodations/{id}
    Deletes a specific student education organization assessment accommodation by ID.
* **GET** /ed-fi/studentEducationOrganizationAssessmentAccommodations/deletes
    Retrieves deleted student education organization assessment accommodations based on change version.

### [Alternative and Supplemental Services Domain](https://docs.ed-fi.org/reference/data-exchange/data-standard/model-reference/alternative-and-supplemental-services-domain/best-practices)

#### studentSection504ProgramAssociations

* **GET** /ed-fi/studentSection504ProgramAssociations
    Retrieves specific student section 504 progam associations using property values.
* **POST** /ed-fi/studentSection504ProgramAssociations
    Creates or updates student section 504 progam associations based on natural key values.
* **GET** /ed-fi/studentSection504ProgramAssociations/{id}
    Retrieves a specific student section 504 progam association by ID.
* **PUT** /ed-fi/studentSection504ProgramAssociations/{id}
    Updates a specific student section 504 progam association by ID.
* **DELETE** /ed-fi/studentSection504ProgramAssociations/{id}
    Deletes a specific student section 504 progam association by ID.
* **GET** /ed-fi/studentSection504ProgramAssociations/deletes
    Retrieves deleted student section 504 progam associations based on change version.

## Modified Endpoints

### [Enrollment Domain](https://docs.ed-fi.org/reference/data-exchange/data-standard/model-reference/enrollment-domain/best-practices)

#### Add Dual Credit to studentSectionAssociation

* **GET** /ed-fi/studentSectionAssociations 

   **Parameters**
   * **Add** dualCreditEducationOrganizationId //The identifier assigned to an education organization.
   * **Add** dualCreditInstitutionDescriptor //Descriptor for the postsecondary institution offering college credit. This descriptor may be used to select a postsecondary institution that is not defined as an education organization, and/or select a general type of postsecondary institution.
   * **Add** dualCreditTypeDescriptor //For a student taking a dual credit course in a college or high school setting, indicates the type of dual credit program.
   * **Add** dualCreditIndicator //Indicates whether the student assigned to the section is to receive dual credit upon successful completion.
   * **Add** dualHighSchoolCreditIndicator //Indicates whether successful completion of the course will result in credits toward high school graduation.

   **Response**
   * Added property: [n].dualCreditEducationOrganizationReference (object)
   * Added property: [n].dualCreditIndicator (boolean)
   * Added property: [n].dualCreditInstitutionDescriptor (string)
   * Added property: [n].dualCreditTypeDescriptor (string)
   * Added property: [n].dualHighSchoolCreditIndicator (boolean)

* **POST** /ed-fi/studentSectionAssociations

   **Request**
   * Added property: dualCreditEducationOrganizationReference (object)
   * Added property: dualCreditIndicator (boolean)
   * Added property: dualCreditInstitutionDescriptor (string)
   * Added property: dualCreditTypeDescriptor (string)
   * Added property: dualHighSchoolCreditIndicator (boolean)

* **GET** /ed-fi/studentSectionAssociations/{id}

   **Response**
   * Added property: dualCreditEducationOrganizationReference (object)
   * Added property: dualCreditIndicator (boolean)
   * Added property: dualCreditInstitutionDescriptor (string)
   * Added property: dualCreditTypeDescriptor (string)
   * Added property: dualHighSchoolCreditIndicator (boolean)

* **PUT** /ed-fi/studentSectionAssociations/{id}

   **Request**
   * Added property: dualCreditEducationOrganizationReference (object)
   * Added property: dualCreditIndicator (boolean)
   * Added property: dualCreditInstitutionDescriptor (string)
   * Added property: dualCreditTypeDescriptor (string)
   * Added property: dualHighSchoolCreditIndicator (boolean)

### [Alternative and Supplemental Services Domain](https://docs.ed-fi.org/reference/data-exchange/data-standard/model-reference/alternative-and-supplemental-services-domain/best-practices)  

#### Add Shortened School Days for IEP student to studentSpecialEducationProgramAssociations

* **GET** /ed-fi/studentSpecialEducationProgramAssociations

   **Parameters**
   * **Add** reductionInHoursPerWeekComparedToPeers //Records the number of hours reduced for the shortened school day for the IEP student as compared to peers in regular education. //Indicator that the student's IEP requires a shortened school day.
   * **Add** shortenedSchoolDayIndicator //The reason the student left the program within a school or district.
   * **Add** reasonExitedDescriptor 
   * **Add** endDate //Indicates whether the student received services during the summer session or between sessions.
   * **Add** servedOutsideOfRegularSession //Indicates whether the student received services during the summer session or between sessions.

   **Response** 
   * Added property: [n].reductionInHoursPerWeekComparedToPeers (number)
   * Added property: [n].shortenedSchoolDayIndicator (boolean)
   * Changed property: [n].beginDate (string)
   * Changed property: [n].endDate (string)
   * Changed property: [n].iepBeginDate (string)
   * Changed property: [n].iepEndDate (string)
   * Changed property: [n].programParticipationStatuses (array)
   * Changed property: [n].specialEducationProgramServices (array)
   * Changed property: [n].programParticipationStatuses[n].statusBeginDate (string)
   * Changed property: [n].programParticipationStatuses[n].statusEndDate (string)
   * Changed property: [n].specialEducationProgramServices[n].serviceBeginDate (string)
   * Changed property: [n].specialEducationProgramServices[n].serviceEndDate (string)

* **POST** /ed-fi/studentSpecialEducationProgramAssociations

   **Request** 
   * Added property: reductionInHoursPerWeekComparedToPeers (number)
   * Added property: shortenedSchoolDayIndicator (boolean)
   * Changed property: beginDate (string)
   * Changed property: endDate (string)
   * Changed property: iepBeginDate (string)
   * Changed property: iepEndDate (string)
   * Changed property: programParticipationStatuses (array)
   * Changed property: specialEducationProgramServices (array)
   * Changed property: programParticipationStatuses[n].statusBeginDate (string)
   * Changed property: programParticipationStatuses[n].statusEndDate (string)
   * Changed property: specialEducationProgramServices[n].serviceBeginDate (string)
   * Changed property: specialEducationProgramServices[n].serviceEndDate (string)

* **GET** /ed-fi/studentSpecialEducationProgramAssociations/{id}

   **Response**
   * Added property: reductionInHoursPerWeekComparedToPeers (number)
   * Added property: shortenedSchoolDayIndicator (boolean)
   * Changed property: beginDate (string)
   * Changed property: endDate (string)
   * Changed property: iepBeginDate (string)
   * Changed property: iepEndDate (string)
   * Changed property: programParticipationStatuses (array)
   * Changed property: specialEducationProgramServices (array)
   * Changed property: programParticipationStatuses[n].statusBeginDate (string)
   * Changed property: programParticipationStatuses[n].statusEndDate (string)
   * Changed property: specialEducationProgramServices[n].serviceBeginDate (string)
   * Changed property: specialEducationProgramServices[n].serviceEndDate (string)

* **PUT** /ed-fi/studentSpecialEducationProgramAssociations/{id}

   **Request**
   * Added property: reductionInHoursPerWeekComparedToPeers (number)
   * Added property: shortenedSchoolDayIndicator (boolean)
   * Changed property: beginDate (string)
   * Changed property: endDate (string)
   * Changed property: iepBeginDate (string)
   * Changed property: iepEndDate (string)
   * Changed property: programParticipationStatuses (array)
   * Changed property: specialEducationProgramServices (array)
   * Changed property: programParticipationStatuses[n].statusBeginDate (string)
   * Changed property: programParticipationStatuses[n].statusEndDate (string)
   * Changed property: specialEducationProgramServices[n].serviceBeginDate (string)
   * Changed property: specialEducationProgramServices[n].serviceEndDate (string)

### Time Variable Definition Updates

The definition for the following time-related data elements have been updated.

**/ed-fi/assessmentItems**
expectedTimeAssessed //change into The duration allotted for the assessment item expressed in minutes.
**/ed-fi/educationContents**
timeRequired //change into Indicates if the total number of items available should be returned in the 'Total-Count' header of the response. If set to false, 'Total-Count' header will not be provided. Must be false when using cursor paging (with pageToken).
**/ed-fi/studentInterventionAttendanceEvents**
eventDuration //change into The amount of time in days for the event as recognized by the school: 1 day = 1, 1/2 day = 0.5, 1/3 day = 0.33.
interventionDuration //change into The duration in minutes of the intervention attendance event.
**/ed-fi/studentProgramEvaluations**
evaluationDuration //change into The actual number of minutes to conduct the evaluation.
**/ed-fi/surveyResponses**
responseTime //change into The amount of time in seconds it took for the respondent to complete the survey.

### [Discipline Domain](https://docs.ed-fi.org/reference/data-exchange/data-standard/model-reference/discipline-domain/best-practices)

##### Add DisciplineIncident as an optional reference to restraintEvents

* **GET** /ed-fi/restraintEvents

   **Parameters**
   * **Add** incidentIdentifier

   **Response**
   * Added property: [n].disciplineIncidentReference (object)

* **POST** /ed-fi/restraintEvents

   **Request**
   * Added property: disciplineIncidentReference (object)

* **GET** /ed-fi/restraintEvents/{id}

   **Response**
   * Added property: disciplineIncidentReference (object)

* **PUT** /ed-fi/restraintEvents/{id}

   **Request**
   * Added property: disciplineIncidentReference (object)

#### Add weapons descriptor to studentDisciplineIncidentBehaviorAssociations

* **GET** /ed-fi/studentDisciplineIncidentBehaviorAssociations

   **Response**
   * Added property: [n].weapons (array)

* **POST** /ed-fi/studentDisciplineIncidentBehaviorAssociations

   **Request**
   * Added property: weapons (array)

* **GET** /ed-fi/studentDisciplineIncidentBehaviorAssociations/{id}

   **Response**
   * Added property: weapons (array)

* **PUT** /ed-fi/studentDisciplineIncidentBehaviorAssociations/{id}

   **Request**
   * Added property: weapons (array)

### Update definition for Begin and EndDate Data Elements
The definitions for date-related data elements have been updated to include the following note: 'Note: Date interpretation may vary. Ed-Fi recommends inclusive dates, but state-specific definitions may differ. For calculations, adhere to local guidelines.'