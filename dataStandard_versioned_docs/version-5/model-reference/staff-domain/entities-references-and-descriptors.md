---
hide_table_of_contents: true
---

# Staff Domain - Entities, References, and Descriptors

## Staff Domain Entities

| Name | Description |
| --- | --- |
| Credential | The legal document giving authorization to perform teaching assignment services. |
| OpenStaffPosition | This entity represents an open staff position that the education organization is seeking to fill. |
| Person | This entity represents a human being. |
| Staff | This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion. For example, this includes:  <br/>1\. An "employee" who performs services under the direction of the employing institution or agency is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings.  <br/>2\. A "contractor" or "consultant" who performs services for an agreed upon fee or an employee of a management service contracted to work on site.  <br/>3\. A "volunteer" who performs services on a voluntary and uncompensated basis.  <br/>4\. An in-kind service provider.  <br/>5\. An independent contractor or businessperson working at a school site. |
| StaffAbsenceEvent | This event entity represents the recording of the dates of staff absence. |
| StaffEducationOrganizationAssignmentAssociation | This association indicates the education organization to which a staff member provides services; also known as school of service. |
| StaffEducationOrganizationContactAssociation | This association provides the contact information of the staff associated with the education organization. |
| StaffEducationOrganizationEmploymentAssociation | This association indicates the EducationOrganization an employee, contractor, volunteer, or other service provider is formally associated with typically indicated by which organization the staff member has a services contract with or receives compensation from. |
| StaffLeave | This entity represents the recording of the dates of staff leave (e.g., sick leave, personal time, vacation). |
| StaffSchoolAssociation | This association indicates the School(s) at which a staff member provides instructional services. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| EducationServiceCenter | This entity represents a regional, multi-services public agency authorized by state law to develop, manage and provide services, programs, or other support options (e.g., construction, food services, and technology services) to LEAs. |
| LocalEducationAgency | This entity represents an administrative unit at the local level which exists primarily to operate schools or to contract for educational services. It includes school districts, charter schools, charter management organizations, or other local administrative organizations. |
| School | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| StateEducationAgency | This entity represents the agency of the state charged with the primary responsibility for coordinating and supervising public instruction, including the setting of standards for elementary and secondary instructional programs. |

## Staff Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| Credential | AcademicSubject | The academic subjects to which the credential pertains. | Local |     |     |     |
| CredentialField | The field of certification for the certificate (e.g., Mathematics, Music). | Local |     |     |     |
| CredentialType | An indication of the category of credential an individual holds. | Local |     |     |     |
| GradeLevel | The grade level(s) certified for teaching. | Orthodox |     |     |     |
| StateOfIssueStateAbbreviation | The abbreviation for the name of the state (within the United States) or extra-state jurisdiction in which a license/credential was issued. | Standard |     |     |     |
| TeachingCredential | An indication of the category of a legal document giving authorization to perform teaching assignment services. | Orthodox |     |     |     |
| TeachingCredentialBasis | An indication of the pre-determined criteria for granting the teaching credential that an individual holds. | Orthodox |     |     |     |
| OpenStaffPosition | AcademicSubject | The teaching field required for the OpenStaffPosition, for example English/Language Arts, Reading, Mathematics, Science, Social Sciences, etc. | Local |     |     |     |
| EmploymentStatus | Reflects the type of employment or contract desired for the position; for example: Probationary, Contractual, Substitute/temporary, Tenured or permanent, Volunteer/no contract... | Orthodox |     |     |     |
| InstructionalGradeLevel | The set of grade levels for which the position's assignment is responsible. | Orthodox |     |     |     |
| PostingResult | Indication of whether the OpenStaffPosition was filled or retired without filling. | Orthodox |     |     |     |
| ProgramAssignment | The name of the program for which the OpenStaffPosition will be assigned; for example: Regular education, Title I, Academic, Title I-Non-Academic, Special Education', Bilingual/English as a Second Language. | Orthodox |     |     |     |
| StaffClassification | The titles of employment, official status, or rank of education staff. | Flexible |     |     |     |
| Person | SourceSystem | This descriptor defines the originating record source system for the person. |     |     |     |     |
| Staff | AchievementCategory | The category of achievement attributed to the learner. | Local |     |     |     |
| AchievementCategorySystem | The system that defines the categories by which an achievement is attributed to the learner. |     |     |     |     |
| AddressType | The type of address listed for an individual or organization. For example: Physical Address, Mailing Address, Home Address, etc.) | Orthodox |     |     |     |
| AncestryEthnicOrigin | The original peoples or cultures with which the individual identifies. | Local |     |     | Yes |
| CitizenshipStatus | An indicator of whether or not the person is a U.S. citizen. | Orthodox |     |     |     |
| Country | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| ElectronicMailType | The type of email listed for an individual or organization. For example: Home/Personal, Work, etc.) | Standard |     |     |     |
| HighestCompletedLevelOfEducation | The extent of formal instruction an individual has received (e.g., the highest grade in school completed or its equivalent or the highest degree received). | Orthodox |     |     |     |
| IdentificationDocumentUse | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| IssuerCountry | Country of origin of the document. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| Language | A specification of which written or spoken communication is being used. | Orthodox |     |     |     |
| LanguageUse | A description of how the language is used (e.g. Home Language, Native Language, Spoken Language). | Orthodox |     |     |     |
| Locale | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Standard |     |     |     |
| OldEthnicity | **Deprecated.** Previous definition of Ethnicity combining Hispanic/Latino and race: 1 - American Indian or Alaskan Native, 2 - Asian or Pacific Islander, 3 - Black, not of Hispanic origin, 4 - Hispanic, 5 - White, not of Hispanic origin. | Standard |     |     |     |
| OtherNameType | The types of alternate names for a person. | Orthodox |     |     |     |
| PersonalInformationVerification | The category of the document relative to its purpose. | Orthodox |     |     |     |
| Race | The general racial category which most clearly reflects the individual's recognition of his or her community or with which the individual most identifies. The way this data element is listed, it must allow for multiple entries so that each individual can specify all appropriate races. | Standard |     |     |     |
| RecognitionType | The nature of recognition given to the learner for accomplishments in a co-curricular, or extra-curricular activity. | Flexible |     |     |     |
| Sex | A person's gender. | Standard |     |     |     |
| StaffIdentificationSystem | A coding scheme that is used for identification and record-keeping purposes by schools, social services, or other agencies to refer to a staff member. | Orthodox |     |     |     |
| StateAbbreviation | The abbreviation for the state (within the United States) or outlying area in which an address is located. | Standard |     |     |     |
| TelephoneNumberType | The type of communication number listed for an individual or organization. | Standard |     |     |     |
| TribalAffiliation | An American Indian tribe with which the staff member is affiliated. | Orthodox |     |     |     |
| Visa | An indicator of a non-US citizen's Visa type. | Standard |     |     |     |
| StaffAbsenceEvent | AbsenceEventCategory | The code describing the type of absence. | Orthodox |     |     |     |
| StaffEducationOrganizationAssignmentAssociation | PositionTitle | The descriptive name of an individual's position. |     |     |     |     |
| StaffClassification | The titles of employment, official status, or rank of education staff. | Flexible |     |     |     |
| StaffEducationOrganizationContactAssociation | AddressType | The type of address listed for an individual or organization. For example: Physical Address, Mailing Address, Home Address, etc.) | Orthodox |     |     |     |
| ContactType | Indicates the type for the contact information. | Local |     |     |     |
| Locale | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Standard |     |     |     |
| StateAbbreviation | The abbreviation for the state (within the United States) or outlying area in which an address is located. | Standard |     |     |     |
| TelephoneNumberType | The type of communication number listed for an individual or organization. | Standard |     |     |     |
| StaffEducationOrganizationEmploymentAssociation | EmploymentStatus | Reflects the type of employment or contract; for example: Probationary, Contractual, Substitute/temporary, Tenured or permanent, Volunteer/no contract... | Orthodox |     |     |     |
| Separation | Type of employment separation; for example: Voluntary separation, Involuntary separation, Mutual agreement, Other, etc. | Orthodox |     |     |     |
| SeparationReason | Reason for terminating the employment; for example: Employment in education, Employment outside of education, Retirement, Family/personal relocation, Change of assignment. | Orthodox |     |     |     |
| StaffLeave | StaffLeaveEventCategory | The code describing the type of leave taken, for example: Sick, Personal, Vacation. | Orthodox |     |     |     |
| StaffSchoolAssociation | AcademicSubject | The academic subjects the individual is eligible to teach. | Local |     |     |     |
| GradeLevel | The grade levels the individual is eligible to teach. | Orthodox |     |     |     |
| ProgramAssignment | The name of the program for which the individual is assigned; for example: Regular education, Title I-Academic, Title I-Non-Academic, Special Education, Bilingual/English as a Second Language. | Orthodox |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
