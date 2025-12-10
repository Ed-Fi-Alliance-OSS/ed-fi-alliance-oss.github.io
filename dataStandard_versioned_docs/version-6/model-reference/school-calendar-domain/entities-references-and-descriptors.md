---
sidebar_position: 3
hide_table_of_contents: true
---

# School Calendar Domain - Entities, References, and Descriptors

## School Calendar Domain Entities

| Name | Description |
| --- | --- |
| AcademicWeek | This entity represents the academic weeks for a school year, optionally captured to support analyses. |
| Calendar | A set of dates associated with an organization. |
| CalendarDate | The type of scheduled or unscheduled event for the day. |
| GradingPeriod | This descriptor defines the name of the period for which grades are reported. |
| Session | A term in the school year, generally a unit of time into which courses are scheduled, instruction occurs and by which credits are awarded. Sessions may be interrupted by vacations or other events. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| School | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentSchoolAssociation | This association represents the School in which a student is enrolled. The semantics of enrollment may differ slightly by state. Non-enrollment relationships between a student and an education organization may be described using the StudentEducationOrganizationAssociation. |

## School Calendar Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| School | AccreditationStatus | The accreditation status for an education preparation provider. | Standard |     |     |     |
| EducationOrganization | AddressType | The type of address listed for an individual or organization. (For example: Physical Address, Mailing Address, Home Address, etc.) | Orthodox | Yes | Yes | Yes |
| School | AdministrativeFundingControl | The type of education institution as classified by its funding source, for example public or private. | Local |     |     |     |
| CalendarDate | CalendarEvent | The type of scheduled or unscheduled event for the day. | Flexible |     |     |     |
| Calendar | CalendarType | Indicates the type of calendar. | Flexible |     |     |     |
| School | CharterApprovalAgencyType | The type of agency that approved the establishment or continuation of a charter school. | Standard | Yes | Yes |     |
| School | CharterStatus | A school or agency providing free public elementary or secondary education to eligible students under a specific charter granted by the state legislature or other appropriate authority and designated by such authority to be a charter school. | Standard | Yes | Yes | Yes |
| Education Organization <br /> Student | Country | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     | Yes |     |
| EducationOrganization | EducationOrganizationCategory | The classification of the education agency within the geographic boundaries of a state according to the level of administrative and operational control granted by the state. | Standard |     | Yes | Yes |
| StudentSchoolAssociation | EducationPlan | The type of education plan(s) the student is following, if appropriate. | Local |     | Yes |     |
| StudentSchoolAssociation | EnrollmentType | The type of enrollment reflected by the StudentSchoolAssociation. |     |     |     |     |
| StudentSchoolAssociation | EntryGradeLevelReason | The primary reason as to why a staff member determined that a student should be promoted or not (or be demoted) at the end of a given school term. | Local |     |     |     |
| StudentSchoolAssociation | EntryType | The process by which a student enters a school during a given academic session. | Local |     | Yes |     |
| StudentSchoolAssociation | ExitWithdrawType | The circumstances under which the student exited from membership in an educational institution. | Local |     | Yes |     |
| School | FederalLocaleCode | The federal locale code associated with an education organization. |     |     |     |     |
| Calendar <br /> School <br /> StudentSchoolAssociation | GradeLevel | Indicates the grade level(s) associated with the calendar, school, or student receiving services. | Orthodox | Yes | Yes |     |
| GradingPeriod | GradingPeriod | The state's name of the period for which grades are reported. | Flexible |     |     |     |
| EducationOrganization | Indicator | The value of the indicator or metric. The semantics of an empty value is "not submitted." | Local |     |     |     |
| EducationOrganization | IndicatorGroup | The name for a group of indicators. | Local |     |     |     |
| EducationOrganization | IndicatorLevel | The value of the indicator or metric, as a value from a controlled vocabulary. The semantics of an empty value is "not submitted." | Local |     |     |     |
| EducationOrganization | InstitutionTelephoneNumberType | The type of communication number listed for an individual or organization. | Orthodox | Yes | Yes | Yes |
| School | InternetAccess | The type of Internet access available. | Flexible |     |     |     |
| EducationOrganization | Locale | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Orthodox |     | Yes |     |
| School | MagnetSpecialProgramEmphasisSchool | A school that has been designed: 1) to attract students of different racial/ethnic backgrounds for the purpose of reducing, preventing, or eliminating racial isolation; and/or 2) to provide an academic or social focus on a particular theme (e.g., science/math, performing arts, gifted/talented, or foreign language). | Standard | Yes | Yes |     |
| EducationOrganization | OperationalStatus | The current operational status of the education organization (e.g., active, inactive). | Standard | Yes | Yes | Yes |
| Student | OtherNameType | The types of alternate names for an individual. | Orthodox |     |     |     |
| StudentSchoolAssociation | ResidencyStatus | An indication of the location of a persons legal residence relative to (within or outside of) the boundaries of the public school attended and its administrative unit. | Local |     | Yes |     |
| School | SchoolCategory | The one or more categories of school. | Local |     | Yes |     |
| StudentSchoolAssociation | SchoolChoiceBasis | The legal basis for the school choice enrollment according to local, state or federal policy or regulation. (The descriptor provides the list of available bases specific to the state. |     |     |     |     |
| School | SchoolType | The type of education institution as classified by its primary focus. | Standard | Yes | Yes |     |
| Student | Sex | A person's sex at birth. | Standard |     |     |     |
| EducationOrganization <br /> Student | StateAbbreviation | The abbreviation for the state (within the United States) or outlying area in which an address is located or individual was born. | Standard |     | Yes |     |
| Session | Term | A descriptor value to indicate the term that the session is associated with. | Flexible |     |     |     |
| School | TitleIPartASchoolDesignation | Denotes the Title I Part A designation for the school. | Standard | Yes | Yes |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
