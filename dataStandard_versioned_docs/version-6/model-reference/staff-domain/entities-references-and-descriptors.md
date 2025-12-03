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
| StaffAbsenceEvent | AbsenceEventCategory | The code describing the type of absence. | Orthodox |     |     |     |
| Credential <br /> OpenStaffPosition <br /> Staff <br /> StaffSchoolAssociation | AcademicSubject | The academic subject(s) or teaching fields in which the individual is eligible to teach, is deemed to be "highly qualified", or to which the credential pertains. | Local | Yes | Yes |     |
| School | AccreditationStatus | The accreditation status for an education preparation provider. | Standard |     |     |     |
| EducationOrganization <br /> StaffDirectory | AddressType | The type of address listed for an individual or organization. (For example:  Physical Address, Mailing Address, Home Address, etc.) | Orthodox | Yes | Yes | Yes |
| School | AdministrativeFundingControl | The type of education institution as classified by its funding source, for example public or private. | Local |     |     |     |
| StaffDemographic | AncestryEthnicOrigin | The original peoples or cultures with which the individual identifies. | Local |     |     | Yes |
| StaffEducationOrganizationEmploymentAssociation | BackgroundCheckStatus | The status of the background check. |     |     |     |     |
| StaffEducationOrganizationEmploymentAssociation | BackgroundCheckType | The type of background check. |     |     |     |     |
| Credential | CertificationRoute | The process, program, or pathway used to obtain certification. | Orthodox |     |     |     |
| School | CharterApprovalAgencyType | The type of agency that approved the establishment or continuation of a charter school. | Standard | Yes | Yes |     |
| LocalEducationAgency <br /> School | CharterStatus | A school or agency providing free public elementary or secondary education to eligible students under a specific charter granted by the state legislature or other appropriate authority and designated by such authority to be a charter school. | Standard | Yes | Yes | Yes |
| StaffDemographic | CitizenshipStatus | An indicator of whether or not the person is a U.S. citizen. |  Orthodox |     |     |     |
| EducationOrganization <br /> Staff <br /> StaffDirectory | Country | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     | Yes |     |
| Credential | CredentialField | The field of certification for the credential. | Local |     |     |     |
| Credential | CredentialStatus | The current status of the credential. | Standard |     |     |     |
| Credential | CredentialType | An indication of the category of the credential a person holds. | Local |     |     |     |
| EducationOrganization | EducationOrganizationCategory | The classification of the education agency within the geographic boundaries of a state according to the level of administrative and operational control granted by the state. | Standard |     | Yes | Yes |
| Credential | EducatorRole | The specific roles or positions within an organization that the credential is intended to authorize, typically associated with service and administrative certifications. | Standard |     |     |     |
| StaffDirectory | ElectronicMailType | The type of email listed for an individual or organization. (For example: Home/Personal, Work, etc.) | Standard |     |     |     |
| OpenStaffPosition <br /> StaffEducationOrganizationEmploymentAssociation | EmploymentStatus | Reflects the type of employment or contract. | Orthodox |     |     |     |
| LocalEducationAgency <br /> School <br /> StatEducationAgency | FederalLocaleCode | The federal locale code associated with an education organization. |     |     |     |     |
| OpenStaffPosition | FundingSource | The funding source for the open staff position. |     |     |     |     |
| Credential <br /> OpenStaffPosition <br /> School <br /> StaffSchoolAssociation | GradeLevel | The grade levels that are served at the school, which the position assignment is responsible, or which an individual is eligible and/or certified for teaching.
| LocalEducationAgency | GunFreeSchoolsActReportingStatus | An indication of whether the school or Local Education Agency (LEA) submitted a Gun-Free Schools Act (GFSA) of 1994 report to the state, as defined by Title 18, Section 921. | Standard | Yes | Yes |     |
| EducationOrganization | Indicator | The value of the indicator or metric. The semantics of an empty value is "not submitted." | Local |     |     |     |
| EducationOrganization | IndicatorGroup | The name for a group of indicators. | Local |     |     |     |
| EducationOrganization | IndicatorLevel | The value of the indicator or metric, as a value from a controlled vocabulary. The semantics of an empty value is "not submitted." | Local |     |     |     |
| EducationOrganization | InstitutionTelephoneNumberType | The type of communication number listed for an individual or organization. | Orthodox | Yes | Yes | Yes |
| School | InternetAccess | The type of Internet access available. | Flexible |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
