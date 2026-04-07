# API Changes from 6.0 to 6.1

## New Endpoints

### Special Education Data Model Domain (NEW)

#### IDEAEvent

* `GET /ed-fi/ideaEvents`
    Retrieves specific IDEA events using property values.
* `POST /ed-fi/ideaEvents`
    Creates or updates IDEA events based on natural key values.
* `GET /ed-fi/ideaEvents/{id}`
    Retrieves a specific IDEA event by ID.
* `PUT /ed-fi/ideaEvents/{id}`
    Updates a specific IDEA event by ID.
* `DELETE /ed-fi/ideaEvents/{id}`
    Deletes a specific IDEA event by ID.

#### StudentIEP

* `GET /ed-fi/studentIEPs`
    Retrieves specific student IEPs using property values.
* `POST /ed-fi/studentIEPs`
    Creates or updates student IEPs based on natural key values.
* `GET /ed-fi/studentIEPs/{id}`
    Retrieves a specific student IEP by ID.
* `PUT /ed-fi/studentIEPs/{id}`
    Updates a specific student IEP by ID.
* `DELETE /ed-fi/studentIEPs/{id}`
    Deletes a specific student IEP by ID.

#### StudentIEPServicePrescription

* `GET /ed-fi/studentIEPServicePrescriptions`
    Retrieves specific student IEP service prescriptions using property values.
* `POST /ed-fi/studentIEPServicePrescriptions`
    Creates or updates student IEP service prescriptions based on natural key values.
* `GET /ed-fi/studentIEPServicePrescriptions/{id}`
    Retrieves a specific student IEP service prescription by ID.
* `PUT /ed-fi/studentIEPServicePrescriptions/{id}`
    Updates a specific student IEP service prescription by ID.
* `DELETE /ed-fi/studentIEPServicePrescriptions/{id}`
    Deletes a specific student IEP service prescription by ID.

#### StudentIEPServiceDelivery

* `GET /ed-fi/studentIEPServiceDeliveries`
    Retrieves specific student IEP service deliveries using property values.
* `POST /ed-fi/studentIEPServiceDeliveries`
    Creates or updates student IEP service deliveries based on natural key values.
* `GET /ed-fi/studentIEPServiceDeliveries/{id}`
    Retrieves a specific student IEP service delivery by ID.
* `PUT /ed-fi/studentIEPServiceDeliveries/{id}`
    Updates a specific student IEP service delivery by ID.
* `DELETE /ed-fi/studentIEPServiceDeliveries/{id}`
    Deletes a specific student IEP service delivery by ID.

#### StudentIEPGoal

* `GET /ed-fi/studentIEPGoals`
    Retrieves specific student IEP goals using property values.
* `POST /ed-fi/studentIEPGoals`
    Creates or updates student IEP goals based on natural key values.
* `GET /ed-fi/studentIEPGoals/{id}`
    Retrieves a specific student IEP goal by ID.
* `PUT /ed-fi/studentIEPGoals/{id}`
    Updates a specific student IEP goal by ID.
* `DELETE /ed-fi/studentIEPGoals/{id}`
    Deletes a specific student IEP goal by ID.

## Modified Endpoints

### studentEducationOrganizationResponsibilityAssociation Endpoints and Associated Domains

* Enrollment Domain

#### Changes to studentEducationOrganizationResponsibilityAssociation

* `GET /ed-fi/studentEducationOrganizationResponsibilityAssociation`

  * **Parameters**
    * **Added** ResponsibleEducationOrganizationReference - The organization for which the responsibility relationship to the student exists.

  * **Response**
    * **Added** property: ResponsibleEducationOrganizationReference (object)

* `POST /ed-fi/studentEducationOrganizationResponsibilityAssociation`

  * **Request**
    * **Added** property: ResponsibleEducationOrganizationReference (object)

* `GET /ed-fi/studentEducationOrganizationResponsibilityAssociation{id}`

  * **Response**
    * **Added** property: ResponsibleEducationOrganizationReference (object)

* `PUT /ed-fi/studentEducationOrganizationResponsibilityAssociation{id}`

  * **Request**
    * **Added** property: ResponsibleEducationOrganizationReference (object)

## addressCharacteristicDescriptors Endpoints and Associated Domains

* AlternativeAndSupplementalServices Domain
* BellSchedule Domain
* EducationOrganization Domain
* EducatorPreparationProgram Domain
* Enrollment Domain
* Finance Domain
* Graduation Domain
* Intervention Domain
* RecruitingAndStaffing Domain
* SchoolCalendar Domain
* SpecialEducation Domain
* Staff Domain
* StudentAcademicRecord Domain
* StudentCohort Domain
* StudentHealth Domain
* StudentIdentificationAndDemographics Domain
* Survey Domain
* TeachingAndLearning Domain
* CourseCatalog Domain
* ReportCard Domain
* SectionsAndPrograms Domain
* StudentTranscript Domain

### Changes to addressCharacteristicDescriptors

* `GET /ed-fi/addressCharacteristicDescriptors`

  * **Response**
    * **Added** property: addressCharacteristicDescriptor (string) - A characteristic of the address, such as physically located at the address.

* `POST /ed-fi/addressCharacteristicDescriptors`

  * **Request**
    * **Added** property: addressCharacteristicDescriptor (string) - A characteristic of the address, such as physically located at the address.

* `GET /ed-fi/addressCharacteristicDescriptors/{id}`

  * **Response**
    * **Added** property: addressCharacteristicDescriptor (string) - A characteristic of the address, such as physically located at the address.

* `PUT /ed-fi/addressCharacteristicDescriptors/{id}`

  * **Request**
    * **Added** property: addressCharacteristicDescriptor (string) - A characteristic of the address, such as physically located at the address.

## applicantProfiles Endpoints and Associated Domains

* RecruitingAndStaffing Domain

### Changes to applicantProfiles

* `GET /ed-fi/applicantProfiles`

  * **Parameters**
    * **Added** addressCharacteristicDescriptor - A characteristic of the address, such as physically located at the address.

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `POST /ed-fi/applicantProfiles`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `GET /ed-fi/applicantProfiles/{id}`

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `PUT /ed-fi/applicantProfiles/{id}`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

## candidates Endpoints and Associated Domains

* EducatorPreparationProgram Domain

### Changes to candidates

* `GET /ed-fi/candidates`

  * **Parameters**
    * **Added** addressCharacteristicDescriptor - A characteristic of the address, such as physically located at the address.

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `POST /ed-fi/candidates`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `GET /ed-fi/candidates/{id}`

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `PUT /ed-fi/candidates/{id}`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

## communityOrganizations Endpoints and Associated Domains

* EducationOrganization Domain

### Changes to communityOrganizations

* `GET /ed-fi/communityOrganizations`

  * **Parameters**
    * **Added** addressCharacteristicDescriptor - A characteristic of the address, such as physically located at the address.

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `POST /ed-fi/communityOrganizations`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `GET /ed-fi/communityOrganizations/{id}`

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `PUT /ed-fi/communityOrganizations/{id}`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

## communityProviders Endpoints and Associated Domains

* EducationOrganization Domain

### Changes to communityProviders

* `GET /ed-fi/communityProviders`

  * **Parameters**
    * **Added** addressCharacteristicDescriptor - A characteristic of the address, such as physically located at the address.

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `POST /ed-fi/communityProviders`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `GET /ed-fi/communityProviders/{id}`

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `PUT /ed-fi/communityProviders/{id}`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

## contacts Endpoints and Associated Domains

* StudentIdentificationAndDemographics Domain
* Survey Domain

### Changes to contacts

* `GET /ed-fi/contacts`

  * **Parameters**
    * **Added** addressCharacteristicDescriptor - A characteristic of the address, such as physically located at the address.

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `POST /ed-fi/contacts`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `GET /ed-fi/contacts/{id}`

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `PUT /ed-fi/contacts/{id}`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

## educationOrganizationNetworks Endpoints and Associated Domains

* EducationOrganization Domain

### Changes to educationOrganizationNetworks

* `GET /ed-fi/educationOrganizationNetworks`

  * **Parameters**
    * **Added** addressCharacteristicDescriptor - A characteristic of the address, such as physically located at the address.

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `POST /ed-fi/educationOrganizationNetworks`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `GET /ed-fi/educationOrganizationNetworks/{id}`

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `PUT /ed-fi/educationOrganizationNetworks/{id}`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

## educationServiceCenters Endpoints and Associated Domains

* EducationOrganization Domain
* Staff Domain

### Changes to educationServiceCenters

* `GET /ed-fi/educationServiceCenters`

  * **Parameters**
    * **Added** addressCharacteristicDescriptor - A characteristic of the address, such as physically located at the address.

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `POST /ed-fi/educationServiceCenters`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `GET /ed-fi/educationServiceCenters/{id}`

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `PUT /ed-fi/educationServiceCenters/{id}`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

## localEducationAgencies Endpoints and Associated Domains

* EducationOrganization Domain
* Enrollment Domain
* Staff Domain

### Changes to localEducationAgencies

* `GET /ed-fi/localEducationAgencies`

  * **Parameters**
    * **Added** addressCharacteristicDescriptor - A characteristic of the address, such as physically located at the address.

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `POST /ed-fi/localEducationAgencies`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `GET /ed-fi/localEducationAgencies/{id}`

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `PUT /ed-fi/localEducationAgencies/{id}`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

## organizationDepartments Endpoints and Associated Domains

* EducationOrganization Domain

### Changes to organizationDepartments

* `GET /ed-fi/organizationDepartments`

  * **Parameters**
    * **Added** addressCharacteristicDescriptor - A characteristic of the address, such as physically located at the address.

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `POST /ed-fi/organizationDepartments`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `GET /ed-fi/organizationDepartments/{id}`

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `PUT /ed-fi/organizationDepartments/{id}`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

## postSecondaryInstitutions Endpoints and Associated Domains

* EducationOrganization Domain
* Graduation Domain

### Changes to postSecondaryInstitutions

* `GET /ed-fi/postSecondaryInstitutions`

  * **Parameters**
    * **Added** addressCharacteristicDescriptor - A characteristic of the address, such as physically located at the address.

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `POST /ed-fi/postSecondaryInstitutions`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `GET /ed-fi/postSecondaryInstitutions/{id}`

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `PUT /ed-fi/postSecondaryInstitutions/{id}`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

## schools Endpoints and Associated Domains

* AlternativeAndSupplementalServices Domain
* BellSchedule Domain
* Discipline Domain
* EducationOrganization Domain
* Enrollment Domain
* Graduation Domain
* SchoolCalendar Domain
* SpecialEducation Domain
* Staff Domain
* StudentAcademicRecord Domain
* StudentAttendance Domain
* TeachingAndLearning Domain
* CourseCatalog Domain
* SectionsAndPrograms Domain

### Changes to schools

* `GET /ed-fi/schools`

  * **Parameters**
    * **Added** addressCharacteristicDescriptor - A characteristic of the address, such as physically located at the address.

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `POST /ed-fi/schools`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `GET /ed-fi/schools/{id}`

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `PUT /ed-fi/schools/{id}`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

## staffDirectories Endpoints and Associated Domains

* Staff Domain

### Changes to staffDirectories

* `GET /ed-fi/staffDirectories`

  * **Parameters**
    * **Added** addressCharacteristicDescriptor - A characteristic of the address, such as physically located at the address.

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `POST /ed-fi/staffDirectories`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `GET /ed-fi/staffDirectories/{id}`

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `PUT /ed-fi/staffDirectories/{id}`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

## stateEducationAgencies Endpoints and Associated Domains

* EducationOrganization Domain
* Staff Domain

### Changes to stateEducationAgencies

* `GET /ed-fi/stateEducationAgencies`

  * **Parameters**
    * **Added** addressCharacteristicDescriptor - A characteristic of the address, such as physically located at the address.

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `POST /ed-fi/stateEducationAgencies`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `GET /ed-fi/stateEducationAgencies/{id}`

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `PUT /ed-fi/stateEducationAgencies/{id}`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

## studentDirectories Endpoints and Associated Domains

* Enrollment Domain
* StudentIdentificationAndDemographics Domain

### Changes to studentDirectories

* `GET /ed-fi/studentDirectories`

  * **Parameters**
    * **Added** addressCharacteristicDescriptor - A characteristic of the address, such as physically located at the address.

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `POST /ed-fi/studentDirectories`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `GET /ed-fi/studentDirectories/{id}`

  * **Response**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)

* `PUT /ed-fi/studentDirectories/{id}`

  * **Request**
    * **Added** property: addresses[].characteristics[].addressCharacteristicDescriptor (string)
