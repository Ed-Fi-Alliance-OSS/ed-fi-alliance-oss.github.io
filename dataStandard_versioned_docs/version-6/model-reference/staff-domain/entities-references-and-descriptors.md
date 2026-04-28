---
sidebar_position: 3
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
| StaffDemographic | The demographic information associated to a Staff member. |
| StaffDirectory | The contact information associated to a staff member. |
| StaffEducationOrganizationAssignmentAssociation | This association indicates the education organization to which a staff member provides services; also known as school of service. |
| StaffEducationOrganizationContactAssociation | This association provides the contact information of the staff associated with the education organization. |
| StaffEducationOrganizationEmploymentAssociation | This association indicates the EducationOrganization an employee, contractor, volunteer, or other service provider is formally associated with typically indicated by which organization the staff member has a services contract with or receives compensation from. |
| StaffIdentificationCode | This entity holds different identity codes for staff member. |
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

| Name | Entity | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| AbsenceEventCategory | StaffAbsenceEvent | The code describing the type of absence. | Orthodox |     |     |     |
| AcademicSubject | Credential <br /> OpenStaffPosition <br /> Staff <br /> StaffSchoolAssociation | The academic subject(s) or teaching fields in which the individual is eligible to teach, is deemed to be "highly qualified", or to which the credential pertains. | Local | Yes | Yes |     |
| AccreditationStatus | School | The accreditation status for an education preparation provider. | Standard |     |     |     |
| AchievementCategory | Staff | The category of achievement attributed to the individual. | Local |     |     |     |
| AddressCharacteristic | EducationOrganization <br /> StaffDirectory | The address characteristic mainly to reflect if Primary and type of communication to be received, e.g.: Primary, Validated, Gets Copy of Report, Discipline Correspondence. |     |     |     |     |
| AddressType | EducationOrganization <br /> StaffDirectory | The type of address listed for an individual or organization. (For example:  Physical Address, Mailing Address, Home Address, etc.) | Orthodox | Yes | Yes | Yes |
| AdministrativeFundingControl | School | The type of education institution as classified by its funding source, for example public or private. | Local |     |     |     |
| AncestryEthnicOrigin | StaffDemographic | The original peoples or cultures with which the individual identifies. | Local |     |     | Yes |
| BackgroundCheckStatus | StaffEducationOrganizationEmploymentAssociation | The status of the background check. |     |     |     |     |
| BackgroundCheckType | StaffEducationOrganizationEmploymentAssociation | The type of background check. |     |     |     |     |
| CertificationRoute | Credential | The process, program, or pathway used to obtain certification. | Orthodox |     |     |     |
| CharterApprovalAgencyType | School | The type of agency that approved the establishment or continuation of a charter school. | Standard | Yes | Yes |     |
| CharterStatus | LocalEducationAgency <br /> School | A school or agency providing free public elementary or secondary education to eligible students under a specific charter granted by the state legislature or other appropriate authority and designated by such authority to be a charter school. | Standard | Yes | Yes | Yes |
| CitizenshipStatus | StaffDemographic | An indicator of whether or not the person is a U.S. citizen. | Orthodox |     |     |     |
| Country | EducationOrganization <br /> Staff <br /> StaffDirectory | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     | Yes |     |
| CredentialField | Credential | The field of certification for the credential. | Local |     |     |     |
| CredentialStatus | Credential | The current status of the credential. | Standard |     |     |     |
| CredentialType | Credential | An indication of the category of the credential a person holds. | Local |     |     |     |
| EducationOrganizationCategory | EducationOrganization | The classification of the education agency within the geographic boundaries of a state according to the level of administrative and operational control granted by the state. | Standard |     | Yes | Yes |
| EducatorRole | Credential | The specific roles or positions within an organization that the credential is intended to authorize, typically associated with service and administrative certifications. | Standard |     |     |     |
| ElectronicMailType | StaffDirectory | The type of email listed for an individual or organization. (For example: Home/Personal, Work, etc.) | Standard |     |     |     |
| EmploymentStatus | OpenStaffPosition <br /> StaffEducationOrganizationEmploymentAssociation | Reflects the type of employment or contract. | Orthodox |     |     |     |
| FederalLocaleCode | LocalEducationAgency <br /> School <br /> StatEducationAgency | The federal locale code associated with an education organization. |     |     |     |     |
| FundingSource | OpenStaffPosition | The funding source for the open staff position. |     |     |     |     |
| GradeLevel | Credential <br /> OpenStaffPosition <br /> School <br /> StaffSchoolAssociation | The grade levels that are served at the school, which the position assignment is responsible, or which an individual is eligible and/or certified for teaching. | Orthodox | Yes | Yes |     |
| GunFreeSchoolsActReportingStatus | LocalEducationAgency | An indication of whether the school or Local Education Agency (LEA) submitted a Gun-Free Schools Act (GFSA) of 1994 report to the state, as defined by Title 18, Section 921. | Standard | Yes | Yes |     |
| IdentificationDocumentUse | Staff | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| Indicator | EducationOrganization | The value of the indicator or metric. The semantics of an empty value is "not submitted." | Local |     |     |     |
| IndicatorGroup | EducationOrganization | The name for a group of indicators. | Local |     |     |     |
| IndicatorLevel | EducationOrganization | The value of the indicator or metric, as a value from a controlled vocabulary. The semantics of an empty value is "not submitted." | Local |     |     |     |
| InstitutionTelephoneNumberType | EducationOrganization | The type of communication number listed for an individual or organization. | Orthodox | Yes | Yes | Yes |
| InternetAccess | School | The type of Internet access available. | Flexible |     |     |     |
| Language | StaffDemographic | A specification of which written or spoken communication is being used. | Orthodox | Yes | Yes | Yes |
| LanguageUse | StaffDemographic | A description of how the language is used (e.g. Home Language, Native Language, Spoken Language). | Orthodox |     |     |     |
| LengthOfContract | StaffEducationOrganizationEmploymentAssociation | The length of contract. |     |     |     |     |
| LevelOfEducation | Staff | The extent of formal instruction an individual has received (e.g., the highest grade in school completed or its equivalent or the highest degree received). | Orthodox |     |     |     |
| Locale | EducationOrganization | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Orthodox |     | Yes |     |
| LocalEducationAgencyCategory | LocalEducationAgency | The category of local education agency/district. | Local | Yes | Yes |     |
| MagnetSpecialProgramEmphasisSchool | School | A school that has been designed: 1) to attract students of different racial/ethnic backgrounds for the purpose of reducing, preventing, or eliminating racial isolation; and/or 2) to provide an academic or social focus on a particular theme (e.g., science/math, performing arts, gifted/talented, or foreign language). | Standard | Yes | Yes |     |
| OpenStaffPositionEventStatus | OpenStaffPositionEvent | Reflects the status of the milestone event. |     |     |     |     |
| OpenStaffPositionEventType | OpenStaffPositionEvent | Specifies the type of milestone event. |     |     |     |     |
| OpenStaffPositionReason | OpenStaffPosition | The reason for the open staff position. |     |     |     |     |
| OperationalStatus | EducationOrganization | The current operational status of the education organization (e.g., active, inactive). | Standard | Yes | Yes | Yes |
| OtherNameType | Staff | The types of alternate names for an individual. | Orthodox |     |     |     |
| PersonalInformationVerification | Staff | The category of the document relative to its purpose. | Orthodox |     |     |     |
| PostingResult | OpenStaffPosition | Indication of whether the OpenStaffPosition was filled or retired without filling. | Orthodox |     |     |     |
| ProgramAssignment | OpenStaffPosition <br /> StaffSchoolAssociation | The name of the program for which the individual/ open staff position will be assigned. | Orthodox |     |     |     |
| Race | StaffDemographic | The general racial category which most clearly reflects the individual's recognition of his or her community or with the which the individual most identifies as last reported to the education organization. The data model allows for multiple entries so that each individual can specify all appropriate races. | Standard |     |     |     |
| RecognitionType | Staff | The nature of recognition given to the individual for accomplishments in a co-curricular, or extra-curricular activity. | Flexible |     |     |     |
| SalaryType | StaffEducationOrganizationEmploymentAssociation | The type of salary that a staff member is receiving. |     |     |     |     |
| SchoolCategory | School | The one or more categories of school. | Local |     | Yes |     |
| SchoolChoiceImplementStatus | LocalEducationAgency | An indication of whether the LEA was able to implement the provisions for public school choice under Title I, Part A, Section 1116 of ESEA as amended. | Standard |     |     |     |
| SchoolType | School | The type of education institution as classified by its primary focus. | Standard | Yes | Yes |     |
| Separation | StaffEducationOrganizationEmploymentAssociation | Type of employment separation. | Orthodox |     |     |     |
| SeparationReason | StaffEducationOrganizationEmploymentAssociation | Reason for terminating the employment. | Orthodox |     |     |     |
| Sex | StaffDemographic | The Staff's birth sex as reported to the education organization. | Standard |     |     |     |
| SourceSystem | Person | This descriptor defines the originating record source system for the person. |     |     |     |     |
| StaffClassification | OpenStaffPosition <br /> StaffEducationOrganizationAssignmentAssociation | The titles of employment, official status, or rank of education staff. | Flexible |     |     |     |
| StaffIdentificationSystem | StaffIdentificationCode | A coding scheme that is used for identification and record-keeping purposes by schools, LEAs, SEAs, or other agencies refer to a staff member. | Orthodox |     |     |     |
| StaffLeaveEventCategory | StaffLeave | The code describing the type of leave taken. | Orthodox |     |     |     |
| StateAbbreviation | Credential <br /> EducationOrganization <br /> StaffDirectory | The abbreviation for the state (within the United States) or outlying area in which an address is located. | Standard |     | Yes |     |
| TeachingCredential | Credential | An indication of the category of a legal document giving authorization to perform teaching assignment services. | Orthodox |     |     |     |
| TeachingCredentialBasis | Credential | An indication of the pre-determined criteria for granting the teaching credential that an individual holds. | Orthodox |     |     |     |
| TelephoneNumberType | StaffDirectory | The type of communication number listed for an individual or organization. | Standard |     |     |     |
| Term | OpenStaffPosition | The first term for the session during the school year for which the open staff position is seeking to fill. | Flexible |     |     |     |
| TitleIPartASchoolDesignation | School | Denotes the Title I Part A designation for the school. | Standard | Yes | Yes |     |
| TribalAffiliation | StaffDemographic | An American Indian tribe with which the Staff is affiliated as last reported to the education organization. | Orthodox |     |     |     |
| Visa | StaffDemographic | An indicator of a non-US citizen's Visa type. | Standard |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
