# API Changes from 5.0 to 6.0

:::warning

Developer note: see the 5.1 to 5.2 document for a good example

:::

## New Endpoints

### Education Organization Domain Additions

* `GET /ed-fi/educationOrganizationIdentificationCode`
    Retrieves specific assessment administrations using property values.

### Educator Preparation Program Domain Additions

`GET /ed-fi/candidateIdentificationCode`

### Student Identification and Demographic Domain Additions

#### studentDemographics

* `GET /ed-fi/studentDemographics`

### Staff Domain Additions

* `GET /ed-fi/studentDemographics`

## Modified Endpoints

* `GET /ed-fi/studentSectionAssociations`

  * **Parameters**
    * **Add** dualCreditEducationOrganizationId - The identifier assigned to an education organization.
    * **Add** dualCreditInstitutionDescriptor - Descriptor for the postsecondary institution offering college credit. This descriptor may be used to select a postsecondary institution that is not defined as an education organization, and/or select a general type of postsecondary institution.
    * **Add** dualCreditTypeDescriptor - For a student taking a dual credit course in a college or high school setting, indicates the type of dual credit program.
    * **Add** dualCreditIndicator - Indicates whether the student assigned to the section is to receive dual credit upon successful completion.
    * **Add** dualHighSchoolCreditIndicator - Indicates whether successful completion of the course will result in credits toward high school graduation.
    * **Changed** property: beginDate (string)

  * **Response**
    * **Added** property: [n].dualCreditEducationOrganizationReference (object)
    * **Added** property: [n].dualCreditIndicator (boolean)
    * **Added** property: [n].dualCreditInstitutionDescriptor (string)
    * **Added** property: [n].dualCreditTypeDescriptor (string)
    * **Added** property: [n].dualHighSchoolCreditIndicator (boolean)
