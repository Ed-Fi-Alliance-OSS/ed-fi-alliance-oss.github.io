---
sidebar_position: 1
hide_table_of_contents: true
---

# Data Requirements

The following shows the tables and fields from the Ed-Fi ODS v5.3, which comes with EPDM-Core, that were used to build the visualizations above to answers questions related to Educator Preparation Program Persistence and Diversity.

We have created a Google Sheets workbook for mapping data specifically for the Diversity and Persistence Dashboard, which can be [found here](https://docs.google.com/spreadsheets/d/1eAb3-XQgIrNkyEsSHYik8HNDvv85MRdq66CY7Cu27uw/edit#gid=1865042024)

| Fields | EPDM Description | EPDM DataType | Other Comment |
| --- | --- | --- | --- |
| **Candidate - All fields required** |   |   |   |
| CandidateIdentifier | A unique identifier for each candidate record. | String (60) | Identifiers can be determined by SI if they don't already exist |
| FirstName | Candidate first name. | String (75) |   |
| LastName | Candidate last name. | String (75) |   |
| Sex | A person's gender. | DescriptorDataType (enumeration) | Female, Male, Non-Binary, Not Selected |
| BirthDate | The month, day, and year on which an individual was born. | Date |   |
| Person | Relates the candidate to a generic person. | Person reference | If institution uses a person ID system, will use that info, otherwise created by SI |
| Race |  The general racial category which most clearly reflects the individual's recognition of his or her community or with which the individual most identifies.  /><br />The data model allows for multiple entries so that each individual can specify all appropriate races. | DescriptorDataType (enumeration) | American Indian - Alaska Native, Asian, Black - African American, Choose Not to Respond, Hispanic/Latino, Native Hawaiian - Pacific Islander, Other, White |
| **Credential - All fields required** |   |   |   |
| CredentialIdentifier | A unique identifier assigned to each record in the Credential Extension table. | String (60) |   |
| CredentialField | The field of certification for the certificate (e.g., Mathematics, Music). | DescriptorDataType (enumeration) | See DescriptorValues tab for possible values |
| IssuanceDate | The month, day, and year on which an active credential was issued to an individual. | Date |   |
| CredentialType | An indication of the category of credential an individual holds. | DescriptorDataType (enumeration) | See DescriptorValues tab for possible values |
| GradeLevel | The grade level(s) certified for teaching. | DescriptorDataType (enumeration) collection | See DescriptorValues tab for possible values |
| StateAbbreviation | The abbreviation for the name of the state (within the United States) or extra-state jurisdiction in which a license/credential was issued. | DescriptorDataType (enumeration) | Standard two character abreviation for State of issueance - See DescriptorValues tab for possible values |
| TeachingCredential | An indication of the category of a legal document giving authorization to perform teaching assignment services. | DescriptorDataType (enumeration) |   |
| Namespace | Namespace for the Credential. | String (255) | string of the form `uri:://your_instiution.edu` will be determined by SI |
| Person | The person who obtained and is holding the credential. | Person reference | created by SI |
| **EducatorPreparationProgram - All fields required** |   |   |   |
| EducationOrganization | Relates the program to an EducationOrganization. | EducationOrganization reference | education organizations will be created by SI |
| ProgramName | The name of the Educator Preparation Program. | String (255) |   |
| ProgramType | The type of program. | DescriptorDataType (enumeration) | See DescriptorValues tab for possible values |
| **CandidateEducatorPreparationProgramAssociation - All fields required** |   |   |   |
| Candidate | Candidate for the association. | Candidate reference |   |
| EducatorPreparationProgram | The Program associated to the Candidate. | EducatorPreparationProgram reference |   |
| BeginDate | The begin date for the association. | Date |   |
| ReasonExited | The reason the candidate exited the program. |   | For determining program completion for the dashboard, the descriptor value must be set to 'Completed' |
| CohortYear.SchoolYear | The value for the school year for the cohort | enumeration | four-digit year |
| CohortYear.CohortYearType | The type of the cohort year | DescriptorDataType (enumeration) |   |
| CohortYear.Term | The term for the cohort | DescriptorDataType (enumeration) |   |
| **FinancialAid - All fields required** |   |   |   |
| BeginDate | The date the aid took effect | Date |   |
| AidType | The classification of financial aid awarded to a person for the academic term/year. | DescriptorDataType (enumeration) |   |
| Student | Student for the association | Student reference | A student entity must be created to use financial aid, in most cases the student identifier will be the candidate identifier. If you are using a SI, this will be handled by the SI |
