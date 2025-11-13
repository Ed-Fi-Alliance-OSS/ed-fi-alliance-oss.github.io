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
| OpenStaffPositionEvent| Represents significant milestones related to an open staff position. |
| Person | This entity represents a human being. |
| Staff | This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion. For example, this includes:  <br/>1\. An "employee" who performs services under the direction of the employing institution or agency is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings.  <br/>2\. A "contractor" or "consultant" who performs services for an agreed upon fee or an employee of a management service contracted to work on site.  <br/>3\. A "volunteer" who performs services on a voluntary and uncompensated basis.  <br/>4\. An in-kind service provider.  <br/>5\. An independent contractor or businessperson working at a school site. |
| StaffAbsenceEvent | This event entity represents the recording of the dates of staff absence. |
| StaffDemographic | The demographic information associated to a Staff member |
| StaffDirectory | The contact information associated to a staff member. |
| StaffEducationOrganizationAssignmentAssociation | This association indicates the education organization to which a staff member provides services; also known as school of service. |
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

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| StaffAbsenceEvent | AbsenceEventCategory | The code describing the type of absence. | Orthodox |     |     |     |
| Credential <br /> OpenStaffPosition <br /> StaffSchoolAssociation | AcademicSubject | The code describing the of the content or subject area (e.g., arts, mathematics, reading, stenography, or a foreign language). | Local |     |     |     |
| School | AccreditationStatus | The accreditation status for an education preparation provider. |     |     |     |     |
| EducationOrganization <br /> StaffDirectory <br /> | AddressType | The set of elements that describes an address, including the street address, city, state, and ZIP code. | Orthodox |     |     |     |
| School | AdministrativeFundingControl | The type of education institution as classified by its funding source, for example public or private. |     |     |     |     |
| StaffDemographic | AncestryEthnicOrigin | The original peoples or cultures with which the individual identifies. | Local |     |  Yes   |     |
| StaffEducationOrganizationEmploymentAssociation | BackgroundCheckStatus | The status of the background check. |     |     |     |     |
| StaffEducationOrganizationEmploymentAssociation | BackgroundCheckType | The type of background check. |     |     |     |     |
| Credential | CertificationRoute | The process, program, or pathway used to obtain certification. |     |     |     |     |
| School | CharterApprovalAgencyType | The type of agency that approved the establishment or continuation of a charter school. |     |     |     |     |
| School | CharterStatus | A school or agency providing free public elementary or secondary education to eligible students under a specific charter granted by the state legislature or other appropriate authority and designated by such authority to be a charter school. |     |     |     |     |
| StaffDemographic | CitizenshipStatus | An indicator of whether or not the person is a U.S. citizen. | Orthodox |     |     |     |
| EducationOrganization <br /> StaffDirectory <br /> | Country | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| Credential | CredentialField | The field of certification for the credential. | Local |     |     |     |
| Credential | CredentialStatus | The current status of the credential. | Local |     |     |     |
| Credential | CredentialType | An indication of the category of the credential a person holds. | Local |     |     |     |
| EducationOrganization | EducationOrganizationCategory | The classification of the education agency within the geographic boundaries of a state according to the level of administrative and operational control granted by the state. | Orthodox |     |     |     |
| EducationOrganizationIdentificationCode | EducationOrganizationIdentificationSystem | A coding scheme that is used for identification and record-keeping. |     |     |     |     |
| Credential | EducatorRole | The specific roles or positions within an organization that the credential is intended to authorize, typically associated with service and administrative certifications. | Local |     |     |     |
| StaffDirectory | ElectronicMailType | The type of email listed for an individual or organization. (For example: Home/Personal, Work, etc.) | Orthodox |     |     |     |
| StaffEducationOrganizationEmploymentAssociation | EmploymentStatus | Reflects the type of employment or contract. | Orthodox |     |     |     |
| School | FederalLocaleCode | The federal locale code associated with an education organization. | Standard |     |     |     |
| OpenStaffPosition | FundingSource | The funding source for the open staff position. |     |     |     |     |
| Credential <br /> School <br /> StaffSchoolAssociation <br /> | GradeLevel | This defines the set of grade levels. | Orthodox |     |     |     |
| LocalEducationAgency | GunFreeSchoolsActReportingStatus | An indication of whether the school or Local Education Agency (LEA) submitted a Gun-Free Schools Act (GFSA) of 1994 report to the state, as defined by Title 18, Section 921. |     |     |     |     |
| Staff | HighestCompletedLevelOfEducation | The extent of formal instruction an individual has received (e.g., the highest grade in school completed or its equivalent or the highest degree received). | Orthodox |     |     |     |
| Staff | HighlyQualifiedAcademicSubject | The academic subject(s) in which the staff is deemed to be "highly qualified". | Orthodox |     |     |     |
| Staff <br /> StaffDemographic | IdentificationDocumentUse | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| EducationOrganization | Indicator | The name or code for the indicator or metric. |     |     |     |     |
| EducationOrganization | IndicatorGroup | The name for a group of indicators. |     |     |     |     |
| EducationOrganization | IndicatorLevel | The value of the indicator or metric, as a value from a controlled vocabulary. The semantics of an empty value is ""not submitted."" |     |     |     |     |
| EducationOrganization | InstitutionTelephoneNumberType | The type of communication number listed for an individual or organization. | Standard |     |     |     |
| School | InternetAccess | The type of Internet access available. |     |     |     |     |
| OpenStaffPosition | InstructionalGradeLevel | The set of grade levels for which the position's assignment is responsible. | Orthodox |     |     |     |
| Staff <br /> StaffDemographic | IssuerCountry | Country of origin of the document. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| StaffDemographic | Language | A specification of which written or spoken communication is being used. | Orthodox |     |     |     |
| StaffDemographic | LanguageUse | A description of how the language is used (e.g. Home Language, Native Language, Spoken Language). | Orthodox |     |     |     |
| StaffEducationOrganizationEmploymentAssociation | LengthOfContract | The length of contract. |     |     |     |     |
| EducationOrganization <br /> StaffDirectory  | Locale | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Standard |     |     |     |
| LocalEducationAgency | LocalEducationAgencyCategory | The category of local education agency/district. |     |     |     |     |
| School | MagnetSpecialProgramEmphasisSchool | A school that has been designed: 1) to attract students of different racial/ethnic backgrounds for the purpose of reducing, preventing, or eliminating racial isolation; and/or 2) to provide an academic or social focus on a particular theme (e.g., science/math, performing arts, gifted/talented, or foreign language). |     |     |     |     |
| OpenStaffPositionEvent | OpenStaffPositionEventStatus | Reflects the status of the milestone event. |     |     |     |     |
| OpenStaffPositionEvent | OpenStaffPositionEventType | Specifies the type of milestone event. |     |     |     |     |
| OpenStaffPosition | OpenStaffPositionReason | The reason for the open staff position. |     |     |     |     |
| EducationOrganization | OperationalStatus | The current operational status of the education organization (e.g., active, inactive). |     |     |     |     |
| Staff | OtherNameType | The types of alternate names for an individual. | Orthodox |     |     |     |
| StaffDemographic | PersonalInformationVerification | The category of the document relative to its purpose. | Orthodox |     |     |     |
| OpenStaffPosition | PostingResult | Indication of whether the OpenStaffPosition was filled or retired without filling. | Orthodox |     |     |     |
| OpenStaffPosition <br /> StaffSchoolAssociation | ProgramAssignment |The name of the program for which the individual or open staff position will be assigned. | Orthodox |     |     |     |
| StaffDirectory | Race | The general racial category which most clearly reflects the individual's recognition of his or her community or with the which the individual most identifies as last reported to the education organization. The data model allows for multiple entries so that each individual can specify all appropriate races. | Standard |     |     |     |
| Staff | RecognitionType | The nature of recognition given to the individual for accomplishments in a co-curricular, or extra-curricular activity. | Flexible |     |     |     |
| StaffEducationOrganizationEmploymentAssociation | SalaryType | The type of salary that a staff member is receiving. |     |     |     |     |
| School | SchoolCategory | The one or more categories of school. |     |     |     |     |
| LocalEducationAgency | SchoolChoiceImplementStatus | An indication of whether the LEA was able to implement the provisions for public school choice under Title I, Part A, Section 1116 of ESEA as amended. |     |     |     |     |
| School | SchoolType | The type of education institution as classified by its primary focus. |     |     |     |     |
| StaffEducationOrganizationEmploymentAssociation | Separation | Type of employment separation | Orthodox |     |     |     |
| StaffEducationOrganizationEmploymentAssociation | SeparationReason | Reason for terminating the employment. | Orthodox |     |     |     |
| StaffDemographic | Sex | The Staff's birth sex as reported to the education organization. | Standard |     |     |     |
| Person | SourceSystem | This descriptor defines the originating record source system for the person. |     |     |     |     |
| OpenStaffPosition <br /> StaffEducationOrganizationAssignmentAssociation | StaffClassification | The titles of employment, official status, or rank of education staff. | Flexible |     |     |     |
|StaffIdentificationCode | StaffIdentificationSystem | A coding scheme that is used for identification and record-keeping purposes by schools, LEAs, SEAs, or other agencies to refer to a staff member | Orthodox |     |     |     |
| StaffLeave | StaffLeaveEventCategory | The code describing the type of leave taken. | Orthodox |     |     |     |
| EducationOrganization <br /> StaffDirectory | StateAbbreviation | The abbreviation for the state (within the United States) or outlying area in which an address is located. | Standard |     |     |     |
| Credential | StateOfIssueStateAbbreviation | The abbreviation for the name of the state (within the United States) or extra-state jurisdiction in which a license/credential was issued. | Standard |     |     |     |
| Credential | TeachingCredential | An indication of the category of a legal document giving authorization to perform teaching assignment services. | Orthodox |     |     |     |
| Credential | TeachingCredentialBasis | An indication of the pre-determined criteria for granting the teaching credential that a person holds.| Orthodox |     |     |     |
| StaffDirectory | TelephoneNumberType | The type of communication number listed for an individual or organization. | Standard |     |     |     |
| OpenStaffPosition | Term | The first term for the session during the school year for which the open staff position is seeking to fill. |     |     |     |     |
| School | TitleIPartASchoolDesignation | Denotes the Title I Part A designation for the school. |     |     |     |     |
| StaffDemographic | TribalAffiliation | An American Indian tribe with which the Staff is affiliated as last reported to the education organization. | Orthodox |     |     |     |
| StaffDemographic | Visa | An indicator of a non-US citizen's Visa type. | Standard |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
