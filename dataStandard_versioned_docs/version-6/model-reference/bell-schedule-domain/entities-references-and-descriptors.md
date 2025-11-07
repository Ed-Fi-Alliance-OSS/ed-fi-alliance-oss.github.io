---
sidebar_position: 3
hide_table_of_contents: true
---

# Bell Schedule Domain - Entities, References, and Descriptors

## Bell Schedule Domain Entities

| Name | Description |
| --- | --- |
| BellSchedule | This entity represents the schedule of class period meeting times. |
| ClassPeriod | This entity represents the designation of a regularly scheduled series of class meetings at designated times and days of the week. |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| School | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| Section | This entity represents a setting in which organized instruction of course content is provided, in-person or otherwise, to one or more students for a given period of time. A course offering may be offered to more than one section. |
| Session | A term in the school year, generally a unit of time into which courses are scheduled, instruction occurs and by which credits are awarded. Sessions may be interrupted by vacations or other events. |

## Extended References

| Name | Description |
| --- | --- |
| AcademicWeek | The academic weeks associated with the school year. |
| GradingPeriod | Grading periods associated with the session. |
| LocalEducationAgency | LEA of which the School is an organizational component. |
| PostSecondaryInstitiution | The postsecondary institution or university associated as an organization component for the school, if applicable. |

## Bell Schedule Domain Descriptors

| Entity | Descriptor | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| School | AccreditationStatus | The accreditation status for an education preparation provider. |     |     |     |     |
| EducationOrganization | AddressType | The type of address listed for an individual or organization. (For example:  Physical Address, Mailing Address, Home Address, etc.) |     |     |     |     |
| School | AdministrativeFundingControl | The type of education institution as classified by its funding source, for example public or private. |     |     |     |     |
| School | CharterApprovalAgencyType | The type of agency that approved the establishment or continuation of a charter school. |     |     |     |     |
| School | CharterStatus | A school or agency providing free public elementary or secondary education to eligible students under a specific charter granted by the state legislature or other appropriate authority and designated by such authority to be a charter school. |     |     |     |     |
| EducationOrganization | Country | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. |     |     |     |     |
| Section | CourseLevelCharacteristic | The type of specific program or designation with which the section is associated. This collection should only be populated if it differs from the course level characteristics identified at the course offering level. |     |     |     |     |
| Section | CreditType | The type of credits or units of value awarded for the completion of a course. |     |     |     |     |
| Section | EducationalEnvironment | The setting in which a student receives education and related services. |     |     |     |     |
| EducationOrganization | EducationOrganizationCategory | The classification of the education agency within the geographic boundaries of a state according to the level of administrative and operational control granted by the state. |     |     |     |     |
| School | FederalLocaleCode | The federal locale code associated with an education organization. |     |     |     |     |
| BellSchedule | GradeLevel | The grade levels the particular BellSchedule applies to. | Orthodox | Yes | Yes |     |
| EducationOrganization | Indicator | The name or code for the indicator or metric. |     |     |     |     |
| EducationOrganization | IndicatorLevel | The value of the indicator or metric, as a value from a controlled vocabulary. The semantics of an empty value is "not submitted." |     |     |     |     |
| EducationOrganization | IndicatorGroup | The name for a group of indicators. |     |     |     |     |
| EducationOrganization | InstitutionTelephone | The type of communication number listed for an individual or organization. |     |     |     |     |
| School | InternetAccess | The type of Internet access available. |     |     |     |     |
| Section | Language | The primary language of instruction. If omitted, English is assumed. |     |     |     |     |
| EducationOrganization | Locale | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). |     |     |     |     |
| School | MagnetSpecialProgramEmphasisSchool | A school that has been designed: 1) to attract students of different racial/ethnic backgrounds for the purpose of reducing, preventing, or eliminating racial isolation; and/or 2) to provide an academic or social focus on a particular theme (e.g., science/math, performing arts, gifted/talented, or foreign language). |     |     |     |     |
| Section | MediumOfInstruction | The media through which teachers provide instruction to students and students and teachers communicate about instructional matters. |     |     |     |     |
| EducationOrganization | OperationalStatus | The current operational status of the education organization (e.g., active, inactive). |     |     |     |     |
| Section | PopulationServed | The type of students the section is offered and tailored to. |     |     |     |     |
| School | SchoolCategory | The one or more categories of school. |     |     |     |     |
| School | SchoolType | The type of education institution as classified by its primary focus. |     |     |     |     |
| Section | SectionCharacteristic | Reflects important characteristics of the section, such as whether or not attendance is taken and the section is graded. |     |     |     |     |
| Section | SectionType | Specifies whether the section is for attendance only, credit only, or both. |     |     |     |     |
| EducationOrganization | StateAbbreviation | The abbreviation for the state (within the United States) or outlying area in which an address is located. |     |     |     |     |
| Session | Term | A descriptor value to indicate the term that the session is associated with. |     |     |     |     |
| School | TitleIPartASchoolDesignation | Denotes the Title I Part A designation for the school. |     |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
