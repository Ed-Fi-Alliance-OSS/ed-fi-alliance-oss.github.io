---
sidebar_position: 3
hide_table_of_contents: true
---

# Student Cohort Domain - Entities, References, and Descriptors

## Student Cohort Domain Entities

| Name | Description |
| --- | --- |
| Cohort | This entity represents any type of list of designated students for tracking, analysis, or intervention. |
| StaffCohortAssociation | This association indicates the Staff associated with a cohort of students. |
| StudentCohortAssociation | This association represents the Cohort(s) for which a student is designated. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| Intervention | An implementation of an instructional approach focusing on the specific techniques and materials used to teach a given subject. |
| Program | This entity represents any program designed to work in conjunction with, or as a supplement to, the main academic program. Programs may provide instruction, training, services, or benefits through federal, state, or local agencies. Programs may also include organized extracurricular activities for students. |
| Section | This entity represents a setting in which organized instruction of course content is provided, in-person or otherwise, to one or more students for a given period of time. A course offering may be offered to more than one section. |
| Staff | This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion. For example, this includes:  <br/>1\. An "employee" who performs services under the direction of the employing institution or agency is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings  <br/>2\. A "contractor" or "consultant" who performs services for an agreed upon fee or an employee of a management service contracted to work on site  <br/>3\. A "volunteer" who performs services on a voluntary and uncompensated basis  <br/>4\. An in-kind service provider  <br/>5\. An independent contractor or businessperson working at a school site. |
| StaffSectionAssociation | This association indicates the class sections to which a staff member is assigned. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentInterventionAssociation | This association indicates the students participating in an intervention. |
| StudentSectionAssociation | This association indicates the course sections to which a student is assigned. |

## Student Cohort Domain Descriptors

| Name | Entity | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| AcademicSubject | Cohort | The academic subject associated with an academic intervention. | Local |     |     |     |
| AchievementCategory | Staff | The category of achievement attributed to the individual. | Local |     |     |     |
| AddressCharacteristic | EducationOrganization | The address characteristic mainly to reflect if Primary and type of communication to be received, e.g.: Primary, Validated, Gets Copy of Report, Discipline Correspondence. |     |     |     |     |
| AddressType | EducationOrganization | The type of address listed for an individual or organization. (For example:  Physical Address, Mailing Address, Home Address, etc.) | Orthodox | Yes | Yes | Yes |
| AttemptStatus | StudentSectionAssociation | An indication of the student's completion status for the section. | Orthodox |     |     |     |
| ClassroomPosition | StaffSectionAssociation | The type of position the staff member holds in the specific class/section. | Orthodox |     |     |     |
| CohortScope | Cohort | The scope of cohort (e.g., school, district, classroom). | Orthodox |     |     |     |
| CohortType | Cohort | The type of cohort (e.g., academic intervention, classroom breakout). | Local |     |     |     |
| Country | EducationOrganization <br /> Student | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     | Yes |     |
| CourseLevelCharacteristic | Section | The type of specific program or designation with which the section is associated. This collection should only be populated if it differs from the course level characteristics identified at the course offering level. | Orthodox |     |     |     |
| CreditType | Section | The type of credits or units of value awarded for the completion of a course. | Flexible |     |     |     |
| DeliveryMethod | Intervention | The way in which an intervention was implemented. | Standard |     |     |     |
| Diagnosis | Intervention | Targeted purpose of the intervention. | Local |     |     |     |
| DualCreditInstitution | StudentSectionAssociation | Descriptor for the postsecondary institution offering college credit. This descriptor may be used to select a postsecondary institution that is not defined as an education organization, and/or select a general type of postsecondary institution. |     |     |     |     |
| DualCreditType | StudentSectionAssociation | For a student taking a dual credit course in a college or high school setting, indicates the type of dual credit program. |     |     |     |     |
| EducationalEnvironment | Section | The setting in which a student receives education and related services. | Orthodox |     |     |     |
| EducationOrganizationCategory | EducationOrganization | The classification of the education agency within the geographic boundaries of a state according to the level of administrative and operational control granted by the state. | Standard |     | Yes | Yes |
| GradeLevel | Intervention <br /> Section | Grade levels for the intervention or grade levels in which the section is offered. | Orthodox | Yes | Yes |     |
| IdentificationDocumentUse | Staff <br /> Student | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| Indicator | EducationOrganization | The name or code for the indicator or metric. | Local |     |     |     |
| IndicatorGroup | EducationOrganization | The name for a group of indicators. | Local |     |     |     |
| IndicatorLevel | EducationOrganization | The value of the indicator or metric, as a value from a controlled vocabulary. The semantics of an empty value is "not submitted." | Local |     |     |     |
| InstitutionTelephoneNumberType | EducationOrganization | The type of communication number listed for an individual or organization. | Orthodox | Yes | Yes | Yes |
| InterventionClass | Intervention | The way in which an intervention is used: curriculum, supplement, or practice. | Flexible |     |     |     |
| InterventionEffectivenessRating | StudentInterventionAssociation | An intervention demonstrates effectiveness if the research has shown that the program caused an improvement in outcomes. Values: positive effects, potentially positive effects, mixed effects, potentially negative effects, negative effects, and no discernible effects. |     |     |     |     |
| Language | Section | The primary language of instruction. If omitted, English is assumed. | Orthodox |     |     |     |
| LevelOfEducation | Staff | The extent of formal instruction an individual has received (e.g., the highest grade in school completed or its equivalent or the highest degree received). | Orthodox |     |     |     |
| Locale | EducationOrganization | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Orthodox |     | Yes |     |
| MediumOfInstruction | Section | The media through which teachers provide instruction to students and students and teachers communicate about instructional matters. | Orthodox |     |     |     |
| OperationalStatus | EducationOrganization | The current operational status of the education organization (e.g., active, inactive). | Standard | Yes | Yes | Yes |
| OtherNameType | Staff <br /> Student | The types of alternate names for an individual. | Orthodox |     |     |     |
| PersonalInformationVerification | Staff <br /> Student | The category of the document relative to its purpose. | Orthodox |     |     |     |
| PopulationServed | Intervention <br /> Section | A subset of students that are the focus of the intervention study, or the type of students the section is offered and tailored to. | Orthodox |     |     |     |
| ProgramCharacteristic | Program | Reflects important characteristics of the program, such as categories or particular indications. | Local | Yes | Yes |     |
| ProgramSponsor | Program | Ultimate and intermediate providers of funds for a particular educational or service program or activity, or for an individual's participation in the program or activity (e.g., Federal, State, ESC, District, School, Private Organization). | Standard |     | Yes |     |
| ProgramType | Program | The type of program. | Flexible | Yes | Yes | Yes |
| RecognitionType | Staff | The nature of recognition given to the individual for accomplishments in a co-curricular, or extra-curricular activity. | Flexible |     |     |     |
| RepeatIdentifier | StudentSectionAssociation | An indication as to whether a student has previously taken a given course. | Orthodox |     |     |     |
| SectionCharacteristic | Section | Reflects important characteristics of the section, such as whether or not attendance is taken and the section is graded. | Local |     |     |     |
| SectionType | Section | Specifies whether the section is for attendance only, credit only, or both. | Flexible |     |     |     |
| Sex | Intervention <br /> Student | Sexes for the intervention. A person's sex at birth. | Standard |     |     |     |
| StateAbbreviation | EducationOrganization <br /> Student | The abbreviation for the state (within the United States) or outlying area in which an address is located. | Standard |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
