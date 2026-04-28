---
sidebar_position: 3
hide_table_of_contents: true
---

# Graduation Domain - Entities, References, and Descriptors

## Graduation Domain Entities

| Name | Description |
| --- | --- |
| GraduationPlan | This entity is a plan outlining the required credits, credits by subject, credits by course, and other criteria required for graduation. A graduation plan may be one or more standard plans defined by an education organization and/or individual plans for some or all students. |
| PostSecondaryEvent | This entity captures significant postsecondary events during a student's high school tenure (e.g., FAFSA application or college application, acceptance, and enrollment) or during a student's enrollment at a postsecondary institution. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| PostSecondaryInstitution | This entity represents an educational organization that provides programs for individuals who have completed or otherwise left educational programs in secondary school(s). |
| School | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentAcademicRecord | This educational entity represents the cumulative record of academic achievement for a student. |
| StudentSchoolAssociation | This association represents the School in which a student is enrolled. The semantics of enrollment may differ slightly by state. Non-enrollment relationships between a student and an education organization may be described using the StudentEducationOrganizationAssociation. |

## Graduation Domain Descriptors

| Name | Entity | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| AcademicHonorCategory | StudentAcademicRecord | A designation of the type of academic distinctions earned by or awarded to the individual. |     |     |     |     |
| AcademicSubject | GraduationPlan | The intended major subject area of the graduation requirement. |     |     |     |     |
| AccreditationStatus | School | The accreditation status for an education preparation provider. | Standard |     |     |     |
| AchievementCategory | StudentAcademicRecord | The category of achievement attributed to the individual. | Local |     |     |     |
| AddressCharacteristic | EducationOrganization | The address characteristic mainly to reflect if Primary and type of communication to be received, e.g.: Primary, Validated, Gets Copy of Report, Discipline Correspondence. |     |     |     |     |
| AddressType | EducationOrganization | The type of address listed for an individual or organization. (For example:  Physical Address, Mailing Address, Home Address, etc.) |     |     |     |     |
| AdministrativeFundingControl | School | The type of education institution as classified by its funding source, for example public or private. |     |     |     |     |
| AssessmentReportingMethod | GraduationPlan | The method that the instructor of the class uses to report the performance and achievement of all students. It may be a qualitative method such as individualized teacher comments or a quantitative method such as a letter or numerical grade. In some cases, more than one type of reporting method may be used. | Local |     | Yes | Yes |
| CertificationRoute | GraduationPlan | The process, program, or pathway used to obtain a certification. |     |     |     |     |
| CharterApprovalAgencyType | School | The type of agency that approved the establishment or continuation of a charter school. |     |     |     |     |
| CharterStatus | School | A school or agency providing free public elementary or secondary education to eligible students under a specific charter granted by the state legislature or other appropriate authority and designated by such authority to be a charter school. | Standard | Yes | Yes | Yes |
| Country | EducationOrganization | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. |     |     |     |     |
| CreditCategory | GraduationPlan | A categorization for the course transcript credits awarded in the course transcript. |     |     |     |     |
| CreditType | GraduationPlan | The type of credits or units of value awarded for the completion of a course. |     |     |     |     |
| DiplomaLevel | StudentAcademicRecord | The level of diploma/credential that is awarded to a student in recognition of completion of the curricular requirements. |     |     |     |     |
| DiplomaType | StudentAcademicRecord | The type of diploma/credential that is awarded to a student in recognition of his/her completion of the curricular requirements. |     |     |     |     |
| EducationOrganizationCategory | EducationOrganization | The classification of the education agency within the geographic boundaries of a state according to the level of administrative and operational control granted by the state. |     |     |     |     |
| EducationPlan | StudentSchoolAssociation | The type of education plan(s) the student is following, if appropriate. |     |     |     |     |
| EnrollmentType | StudentSchoolAssociation | The type of enrollment reflected by the StudentSchoolAssociation. |     |     |     |     |
| EntryGradeLevelReason | StudentSchoolAssociation | The primary reason as to why a staff member determined that a student should be promoted or not (or be demoted) at the end of a given school term. |     |     |     |     |
| EntryType | StudentSchoolAssociation | The process by which a student enters a school during a given academic session. |     |     |     |     |
| ExitWithdrawType | StudentSchoolAssociation | The circumstances under which the student exited from membership in an educational institution. |     |     |     |     |
| FederalLocaleCode | PostSecondaryInstitution <br /> School | The federal locale code associated with an education organization. |     |     |     |     |
| GradeLevel | School <br /> StudentSchoolAssociation | The grade levels served at the school. |     |     |     |     |
| GradePointAverageType | StudentAcademicRecord | The system used for calculating the grade point average for an individual. |     |     |     |     |
| GraduationPlanType | GraduationPlan | The type of academic plan the student is following for graduation. |     |     |     |     |
| IdentificationDocumentUse | Student | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| Indicator | EducationOrganization | The name or code for the indicator or metric. |     |     |     |     |
| IndicatorLevel | EducationOrganization | The value of the indicator or metric, as a value from a controlled vocabulary. The semantics of an empty value is "not submitted." |     |     |     |     |
| IndicatorGroup | EducationOrganization | The name for a group of indicators. |     |     |     |     |
| InstitutionTelephoneNumberType | EducationOrganization | The type of communication number listed for an individual or organization. |     |     |     |     |
| InternetAccess | School | The type of Internet access available. |     |     |     |     |
| Locale | EducationOrganization | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). |     |     |     |     |
| MagnetSpecialProgramEmphasisSchool | School | A school that has been designed: 1) to attract students of different racial/ethnic backgrounds for the purpose of reducing, preventing, or eliminating racial isolation; and/or 2) to provide an academic or social focus on a particular theme (e.g., science/math, performing arts, gifted/talented, or foreign language). |     |     |     |     |
| MediumOfInstruction | PostSecondaryInstitution | The categories in which an institution serves the students. |     |     |     |     |
| OperationalStatus | EducationOrganization | The current operational status of the education organization (e.g., active, inactive). |     |     |     |     |
| OtherNameType | Student | The types of alternate names for an individual. |     |     |     |     |
| PerformanceLevel | GraduationPlan | The performance level(s) defined for the assessment. | Local | Yes | Yes |     |
| PersonalInformationVerification | Student | The category of the document relative to its purpose. | Orthodox |     |     |     |
| PostSecondaryEventCategory | PostSecondaryEvent | The post secondary event that is logged. |     |     |     |     |
| PostSecondaryInstitutionLevel | PostSecondaryEvent | A classification of whether a post secondary institution's highest level of offering is a program of 4-years or higher (4 year), 2-but-less-than 4-years (2 year), or less than 2-years. |     |     |     |     |
| RecognitionType | StudentAcademicRecord | The nature of recognition given to the individual for accomplishments in a co-curricular, or extra-curricular activity. |     |     |     |     |
| ResidencyStatus | StudentSchoolAssociation | An indication of the location of a persons legal residence relative to (within or outside of) the boundaries of the public school attended and its administrative unit. |     |     |     |     |
| ResultDatatypeType | GraduationPlan | The datatype of the result. The results can be expressed as a number, percentile, range, level, etc. |     |     |     |     |
| SchoolCategory | School | The one or more categories of school. |     |     |     |     |
| SchoolChoiceBasis | StudentSchoolAssociation | The legal basis for the school choice enrollment according to local, state or federal policy or regulation. (The descriptor provides the list of available bases specific to the state.) |     |     |     |     |
| SchoolType | School | The type of education institution as classified by its primary focus. |     |     |     |     |
| Sex | Student | A person's sex at birth. | Standard |     |     |     |
| StateAbbreviation | EducationOrganization <br /> Student | The abbreviation for the name of the state (within the United States) or extra-state jurisdiction in which an individual was born. |     |     |     |     |
| Term | StudentAcademicRecord | The term for the session during the school year. |     |     |     |     |
| TitleIPartASchoolDesignation | School | Denotes the Title I Part A designation for the school. |     |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
