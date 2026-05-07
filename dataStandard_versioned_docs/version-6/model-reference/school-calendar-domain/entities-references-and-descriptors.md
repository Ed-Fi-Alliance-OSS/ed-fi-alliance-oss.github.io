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

| Name | Entity | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| AccreditationStatus | School | The accreditation status for an education preparation provider. | Standard |     |     |     |
| AddressCharacteristic | EducationOrganization | The address characteristic mainly to reflect if Primary and type of communication to be received, e.g.: Primary, Validated, Gets Copy of Report, Discipline Correspondence. |     |     |     |     |
| AddressType | EducationOrganization | The type of address listed for an individual or organization. (For example: Physical Address, Mailing Address, Home Address, etc.) | Orthodox | Yes | Yes | Yes |
| AdministrativeFundingControl | School | The type of education institution as classified by its funding source, for example public or private. | Local |     |     |     |
| CalendarEvent | CalendarDate | The type of scheduled or unscheduled event for the day. | Flexible |     |     |     |
| CalendarType | Calendar | Indicates the type of calendar. | Flexible |     |     |     |
| CharterApprovalAgencyType | School | The type of agency that approved the establishment or continuation of a charter school. | Standard | Yes | Yes |     |
| CharterStatus | School | A school or agency providing free public elementary or secondary education to eligible students under a specific charter granted by the state legislature or other appropriate authority and designated by such authority to be a charter school. | Standard | Yes | Yes | Yes |
| Country | Education Organization <br /> Student | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     | Yes |     |
| EducationOrganizationCategory | EducationOrganization | The classification of the education agency within the geographic boundaries of a state according to the level of administrative and operational control granted by the state. | Standard |     | Yes | Yes |
| EducationPlan | StudentSchoolAssociation | The type of education plan(s) the student is following, if appropriate. | Local |     | Yes |     |
| EnrollmentType | StudentSchoolAssociation | The type of enrollment reflected by the StudentSchoolAssociation. |     |     |     |     |
| EntryGradeLevelReason | StudentSchoolAssociation | The primary reason as to why a staff member determined that a student should be promoted or not (or be demoted) at the end of a given school term. | Local |     |     |     |
| EntryType | StudentSchoolAssociation | The process by which a student enters a school during a given academic session. | Local |     | Yes |     |
| ExitWithdrawType | StudentSchoolAssociation | The circumstances under which the student exited from membership in an educational institution. | Local |     | Yes |     |
| FederalLocaleCode | School | The federal locale code associated with an education organization. |     |     |     |     |
| GradeLevel | Calendar <br /> School <br /> StudentSchoolAssociation | Indicates the grade level(s) associated with the calendar, school, or student receiving services. | Orthodox | Yes | Yes |     |
| GradingPeriod | GradingPeriod | The state's name of the period for which grades are reported. | Flexible |     |     |     |
| IdentificationDocumentUse | Student | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| Indicator | EducationOrganization | The value of the indicator or metric. The semantics of an empty value is "not submitted." | Local |     |     |     |
| IndicatorGroup | EducationOrganization | The name for a group of indicators. | Local |     |     |     |
| IndicatorLevel | EducationOrganization | The value of the indicator or metric, as a value from a controlled vocabulary. The semantics of an empty value is "not submitted." | Local |     |     |     |
| InstitutionTelephoneNumberType | EducationOrganization | The type of communication number listed for an individual or organization. | Orthodox | Yes | Yes | Yes |
| InternetAccess | School | The type of Internet access available. | Flexible |     |     |     |
| Locale | EducationOrganization | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Orthodox |     | Yes |     |
| MagnetSpecialProgramEmphasisSchool | School | A school that has been designed: 1) to attract students of different racial/ethnic backgrounds for the purpose of reducing, preventing, or eliminating racial isolation; and/or 2) to provide an academic or social focus on a particular theme (e.g., science/math, performing arts, gifted/talented, or foreign language). | Standard | Yes | Yes |     |
| OperationalStatus | EducationOrganization | The current operational status of the education organization (e.g., active, inactive). | Standard | Yes | Yes | Yes |
| OtherNameType | Student | The types of alternate names for an individual. | Orthodox |     |     |     |
| PersonalInformationVerification | Student | The category of the document relative to its purpose. | Orthodox |     |     |     |
| ResidencyStatus | StudentSchoolAssociation | An indication of the location of a persons legal residence relative to (within or outside of) the boundaries of the public school attended and its administrative unit. | Local |     | Yes |     |
| SchoolCategory | School | The one or more categories of school. | Local |     | Yes |     |
| SchoolChoiceBasis | StudentSchoolAssociation | The legal basis for the school choice enrollment according to local, state or federal policy or regulation. (The descriptor provides the list of available bases specific to the state.) |     |     |     |     |
| SchoolType | School | The type of education institution as classified by its primary focus. | Standard | Yes | Yes |     |
| Sex | Student | A person's sex at birth. | Standard |     |     |     |
| StateAbbreviation | EducationOrganization <br /> Student | The abbreviation for the state (within the United States) or outlying area in which an address is located or individual was born. | Standard |     | Yes |     |
| Term | Session | A descriptor value to indicate the term that the session is associated with. | Flexible |     |     |     |
| TitleIPartASchoolDesignation | School | Denotes the Title I Part A designation for the school. | Standard | Yes | Yes |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
