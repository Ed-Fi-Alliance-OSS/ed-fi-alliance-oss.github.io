---
sidebar_position: 3
hide_table_of_contents: true
---

# Education Organization Domain - Entities and Descriptors

## Education Organization Domain Entities

| Name | Description |
| --- | --- |
| AccountabilityRating | An accountability rating for a school or district. |
| CommunityOrganization | This entity represents an administrative unit at the state level which exists primarily to operate local community providers. |
| CommunityProvider | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| CommunityProviderLicense | The legal document held by the CommunityProvider that authorizes the holder to perform certain functions and or services. |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| EducationOrganizationIdentificationCode | This entity holds different identity codes for an education organization. |
| EducationOrganizationNetwork | This entity is a self-organized membership network of peer-level education organizations intended to provide shared services or collective procurement. |
| EducationOrganizationNetworkAssociation | Properties of the association between the EducationOrganization and its network(s). |
| EducationOrganizationPeerAssociation | The association from an education organization to its peers. |
| EducationServiceCenter | This entity represents a regional, multi-services public agency authorized by state law to develop, manage and provide services, programs, or other support options (e.g., construction, food services, and technology services) to LEAs. |
| FeederSchoolAssociation | The association from feeder school to the receiving school. |
| LocalEducationAgency | This entity represents an administrative unit at the local level which exists primarily to operate schools or to contract for educational services. It includes school districts, charter schools, charter management organizations, or other local administrative organizations. |
| OrganizationDepartment | An organizational unit of another education organization, often devoted to a particular academic discipline, area of study, or organization function. |
| PostSecondaryInstitution | This entity represents an educational organization that provides programs for individuals who have completed or otherwise left educational programs in secondary school(s). |
| School | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| StateEducationAgency | This entity represents the agency of the state charged with the primary responsibility for coordinating and supervising public instruction, including the setting of standards for elementary and secondary instructional programs. |

## Education Organization Domain Descriptors

| Name | Entity | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| AcademicSubject | OrganizationalDepartment | The intended major subject area of the department. |     |     |     |     |
| AccreditationStatus | School | The accreditation status for an education preparation provider. |     |     |     |     |
| AddressCharacteristic | EducationOrganization | The address characteristic mainly to reflect if Primary and type of communication to be received, e.g.: Primary, Validated, Gets Copy of Report, Discipline Correspondence. |     |     |     |     |
| AddressType | EducationOrganization | The type of address listed for an individual or organization. (For example:  Physical Address, Mailing Address, Home Address, etc.) | Orthodox | Yes | Yes | Yes |
| AdministrativeFundingControl | PostSecondaryInstitution <br /> School | The type of education institution as classified by its funding source, for example public or private. | Local |     |     |     |
| CharterApprovalAgencyType | School | The type of agency that approved the establishment or continuation of a charter school. | Standard | Yes | Yes |     |
| CharterStatus | LocalEducationAgency <br /> School | A school or agency providing free public elementary or secondary education to eligible students under a specific charter granted by the state legislature or other appropriate authority and designated by such authority to be a charter school. | Standard | Yes | Yes | Yes |
| Country | EducationOrganization | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     | Yes |     |
| EducationOrganizationCategory | EducationOrganization | The classification of the education agency within the geographic boundaries of a state according to the level of administrative and operational control granted by the state. | Standard |     | Yes | Yes |
| EducationOrganizationIdentificationSystem | EducationOrganizationIdentificationCode | A coding scheme that is used for identification and record-keeping. |     |     |     |     |
| FederalLocaleCode | School | The federal locale code associated with an education organization. |     |     |     |     |
| GradeLevel | School | The grade levels served at the school. | Orthodox | Yes | Yes |     |
| GunFreeSchoolsActReportingStatus | LocalEducationAgency | An indication of whether the school or Local Education Agency (LEA) submitted a Gun-Free Schools Act (GFSA) of 1994 report to the state, as defined by Title 18, Section 921. | Standard | Yes | Yes |     |
| Indicator | EducationOrganization | The name or code for the indicator or metric. | Local |     |     |     |
| IndicatorGroup | EducationOrganization | The name for a group of indicators. | Local |     |     |     |
| IndicatorLevel | EducationOrganization | The value of the indicator or metric, as a value from a controlled vocabulary. The semantics of an empty value is "not submitted." | Local |     |     |     |
| InstitutionTelephoneNumberType | EducationOrganization | The type of communication number listed for an individual or organization. | Orthodox | Yes | Yes | Yes |
| InternetAccess | School | The type of Internet access available. | Flexible |     |     |     |
| LicenseStatus | CommunityProviderLicense | An indication of the status of the license. | Flexible |     |     |     |
| LicenseType | CommunityProviderLicense | An indication of the category of the license. | Flexible |     |     |     |
| Locale | EducationOrganization | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Orthodox |     | Yes |     |
| LocalEducationAgencyCategory | LocalEducationAgency | The category of local education agency/district. | Local | Yes | Yes |     |
| MagnetSpecialProgramEmphasisSchool | School | A school that has been designed: 1) to attract students of different racial/ethnic backgrounds for the purpose of reducing, preventing, or eliminating racial isolation; and/or 2) to provide an academic or social focus on a particular theme (e.g., science/math, performing arts, gifted/talented, or foreign language). | Standard | Yes | Yes |     |
| MediumOfInstruction | PostSecondaryInstitution | The categories in which an institution serves the students. | Orthodox |     | Yes |     |
| NetworkPurpose | EducationOrganizationNetwork | The purpose(s) of the network (e.g., shared services, collective procurement). | Flexible |     |     |     |
| OperationalStatus | EducationOrganization | The current operational status of the education organization (e.g., active, inactive). | Standard | Yes | Yes | Yes |
| PostSecondaryInstitutionLevel | PostSecondaryInstitution | A classification of whether a post secondary institution's highest level of offering is a program of 4-years or higher (4 year), 2-but-less-than 4-years (2 year), or less than 2-years. | Local |     |     |     |
| ProviderCategory | CommunityProvider | Indicates the category of the provider. | Local |     |     |     |
| ProviderProfitability | CommunityProvider | Indicates the profitability status of the provider. | Standard |     |     |     |
| ProviderStatus | CommunityProvider | Indicates the status of the provider. | Flexible |     |     |     |
| SchoolCategory | School | The one or more categories of school. | Local |     | Yes |     |
| SchoolChoiceImplementStatus | LocalEducationAgency | An indication of whether the LEA was able to implement the provisions for public school choice under Title I, Part A, Section 1116 of ESEA as amended. | Standard |     |     |     |
| SchoolType | School | The type of education institution as classified by its primary focus. |     |     |     |     |
| StateAbbreviation | EducationOrganization | The abbreviation for the state (within the United States) or outlying area in which an address is located. | Standard |     | Yes |     |
| TitleIPartASchoolDesignation | School | Denotes the Title I Part A designation for the school. | Standard | Yes | Yes |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
