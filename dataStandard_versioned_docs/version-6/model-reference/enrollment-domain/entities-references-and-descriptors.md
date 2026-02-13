---
sidebar_position: 3
hide_table_of_contents: true
---

# Enrollment Domain - Entities, References, and Descriptors

## Enrollment Domain Entities

| Name | Description |
| --- | --- |
| AccountabilityRating| An accountability rating for a school or district. |
| CrisisEvent | This entity represents natural or man-made event that causes the disruption of school-level activities and temporary or permanent displacement of students. |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| FinancialAid | This entity represents the financial aid a person is awarded. |
| GraduationPlan | This entity is a plan outlining the required credits, credits by subject, credits by course, and other criteria required for graduation. A graduation plan may be one or more standard plans defined by an education organization and/or individual plans for some or all students. |
| LocalEducationAgency | This entity represents an administrative unit at the local level which exists primarily to operate schools or to contract for educational services. It includes school districts, charter schools, charter management organizations, or other local administrative organizations. |
| School | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentTransportation | This entity captures detailed information about student transportation arrangements, including the responsible organization, eligibility for public expense coverage, transportation type, special accommodations, and specific bus details. |
| StudentEducationOrganizationAssociation | This association represents student information as reported in the context of the student's relationship to the education organization. Enrollment relationship semantics are covered by StudentSchoolAssociation. |
| StudentEducationOrganizationResponsibilityAssociation | This association indicates a relationship between a student and an education organization other than an enrollment relationship, and generally indicating some kind of responsibility of the education organization for the student. Enrollment relationship semantics are covered by StudentSchoolAssociation. |
| StudentSchoolAssociation | This association represents the school in which a student is enrolled. The semantics of enrollment may differ slightly by state. Non-enrollment relationships between a student and an education organization may be described using the StudentEducationOrganizationAssociation. |

## Extended References

| Name | Description |
| --- | --- |
| Calendar | A set of dates associated with an organization. |
| EducationServiceCenter | This entity represents a regional, multi-services public agency authorized by state law to develop, manage and provide services, programs, or other support options (e.g., construction, food services, and technology services) to LEAs. |
| StateEducationAgency | This entity represents the agency of the state charged with the primary responsibility for coordinating and supervising public instruction, including the setting of standards for elementary and secondary instructional programs. |
| PostSecondaryInstitution | An organization that provides educational programs for individuals who have completed or otherwise left educational programs in secondary school(s). |
| Person | This entity represents a human being. |

## Enrollment Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| GraduationPlan | AcademicSubject | The intended major subject area of the graduation requirement. | Local |     |     |     |
| StudentDemographic | Accommodation | The special variation(s) to be used for the specific part of the assessment battery on how is presented, how it is administered, or how the test taker is allowed to respond.| Local |     | Yes |     |
| School | AccreditationStatus | The accreditation status for an education preparation provider. | Standard |     |     |     |
| EducationOrganization <br /> StudentDirectory | AddressType | The type of address listed for an individual or organization. (For example:  Physical Address, Mailing Address, Home Address, etc.) |     |     |     |     |
| School | AdministrativeFundingControl | The type of education institution as classified by its funding source, for example public or private. |     |     |     |     |
| FinancialAid  | AidType | The classification of financial aid awarded to a person for the academic term/year. | Orthodox |     |     |     |
| StudentDemographic | AncestryEthnicOrigin |  The original peoples or cultures with which the individual identifies. | Local |     |     | Yes |
| GraduationPlan | AssessmentReportingMethod | The method that the administrator of the assessment uses to report the performance and achievement of all students. It may be a qualitative method such as performance level descriptors or a quantitative method such as a numerical grade or cut score. More than one type of reporting method may be used. | Local |     | Yes | Yes |
| StudentEducationOrganizationAssociation | BarrierToInternetAccessInResidence | An indication of the barrier to having internet access in the student’s primary place of residence. |     |     |     |     |
| StudentTransportation | BusRoute | Identifies the specific route taken by a bus for student transportation. |     |     |     |     |
| GraduationPlan | CertificationRoute | The process, program, or pathway used to obtain a certification. | Orthodox |     |     |     |
| School | CharterApprovalAgencyType | The type of agency that approved the establishment or continuation of a charter school. | Standard | Yes | Yes |     |
| LocalEducationAgency <br /> School | CharterStatus | A school or agency providing free public elementary or secondary education to eligible students under a specific charter granted by the state legislature or other appropriate authority and designated by such authority to be a charter school. | Standard | Yes | Yes | Yes |
| StudentDemographic | CitizenshipStatus | An indicator of whether or not the person is a U.S. citizen. | Orthodox |     |     |     |
| StudentEducationOrganizationAssociation | CohortYearType | The type of cohort year (9th grade, graduation). | Local |     |     |     |
| EducationOrganization <br /> Student <br /> StudentDemographic <br /> StudentDirectory | Country | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     | Yes |     |
| GraduationPlan | CreditCategory | "A categorization for the course transcript credits awarded in the course transcript. | Flexible |     |     |     |
| GraduationPlan | CreditType | The type of credits or units of value awarded for the completion of a course. | Flexible |     |     |     |
| CrisisEvent | CrisisType | The type or category of crisis. | Standard |     | Yes | Yes |
| StudentDemographic | Disability | A disability category that describes a individual's impairment. | Orthodox | Yes | Yes |     |
| StudentDemographic | DisabilityDesignation | Whether the disability is IDEA, Section 504, or other disability designation. | Orthodox |     | Yes |     |
| StudentDemographic | DisabilityDeterminationSourceType | The source that provided the disability determination. | Orthodox |     | Yes |     |
| StudentEducationOrganizationAssociation | DisplacedStudentStatus | Indicates whether a student has been displaced as a result of a crisis event. |     |     |     |     |
| StudentDemographic | EconomicDisadvantage | The indication of an inadequate financial condition of an individual's family, as determined by family income, number of family members/dependents, participation in public assistance programs, and/or other characteristics considered relevant by federal, state, and local policy. |     |     |     |     |
| EducationOrganization | EducationOrganizationCategory | The classification of the education agency within the geographic boundaries of a state according to the level of administrative and operational control granted by the state. |     |     |     |     |
| StudentSchoolAssociation | EducationPlan | The type of education plan(s) the student is following, if appropriate. |     |     |     |     |
| StudentDirectory | ElectronicMailType | The type of email listed for an individual or organization. (For example: Home/Personal, Work, etc.) | Standard |     |     |     |
| StudentSchoolAssociation | EnrollmentType | The type of enrollment reflected by the StudentSchoolAssociation. |     |     |     |     |
| StudentSchoolAssociation | EntryGradeLevelReason | The primary reason as to why a staff member determined that a student should be promoted or not (or be demoted) at the end of a given school term. |     |     |     |     |
| StudentSchoolAssociation | EntryType | The process by which a student enters a school during a given academic session. |     |     |     |     |
| StudentSchoolAssociation | ExitWithdrawType | The circumstances under which the student exited from membership in an educational institution. |     |     |     |     |
| LocalEducationAgency <br /> PostSecondaryInstitution <br /> School | FederalLocaleCode | The federal locale code associated with an education organization. |     |     |     |     |
| School <br /> StudentSchoolAssociation | GradeLevel | The grade levels served at and/or primary instructional level at which a student enters and receives services in a school or an educational institution during a given academic session. |     |     |     |     |
| GraduationPlan | GraduationPlanType | The type of academic plan the student is following for graduation. |     |     |     |     |
| LocalEducationAgency | GunFreeSchoolsActReportingStatus | An indication of whether the school or Local Education Agency (LEA) submitted a Gun-Free Schools Act (GFSA) of 1994 report to the state, as defined by Title 18, Section 921. |     |     |     |     |
| Student <br /> StudentDemographic | IdentificationDocumentUse | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| EducationOrganization | Indicator | The name or code for the indicator or metric. |     |     |     |     |
| EducationOrganization | IndicatorGroup | The name for a group of indicators. |     |     |     |     |
| EducationOrganization | IndicatorLevel | The value of the indicator or metric, as a value from a controlled vocabulary. The semantics of an empty value is "not submitted." |     |     |     |     |
| EducationOrganization | InstitutionTelephoneNumberType | The type of communication number listed for an individual or organization. |     |     |     |     |
| School | InternetAccess | The type of Internet access available. |     |     |     |     |
| StudentEducationOrganizationAssociation | InternetAccessTypeInResidence | The primary type of internet service used in the student’s primary place of residence. |     |     |     |     |
| StudentEducationOrganizationAssociation | InternetPerformanceInResidence | An indication of whether the student can complete the full range of learning activities, including video streaming and assignment upload, without interruptions caused by poor internet performance in their primary place of residence. |     |     |     |     |
| StudentDemographic | Language | A specification of which written or spoken communication is being used.   | Standard | Yes | Yes |     |
| StudentDemographic | LanguageUse | A description of how the language is used (e.g. Home Language, Native Language, Spoken Language). | Orthodox |     |     |     |
| StudentDemographic | LimitedEnglishProficiency | An indication that the student has been identified as limited English proficient by the Language Proficiency Assessment Committee (LPAC), or English proficient. | Standard | Yes |     |     |
| EducationOrganization <br /> StudentDirectory | Locale | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). |     |     |     |     |
| LocalEducationAgency | LocalEducationAgencyCategory | The category of local education agency/district. |     |     |     |     |
| School | MagnetSpecialProgramEmphasisSchool | A school that has been designed: 1) to attract students of different racial/ethnic backgrounds for the purpose of reducing, preventing, or eliminating racial isolation; and/or 2) to provide an academic or social focus on a particular theme (e.g., science/math, performing arts, gifted/talented, or foreign language). |     |     |     |     |
| EducationOrganization | OperationalStatus | The current operational status of the education organization (e.g., active, inactive). |     |     |     |     |
| Student | OtherNameType | The types of alternate names for an individual. | Orthodox |     |     |     |
| GraduationPlan | PerformanceLevel | The performance level(s) defined for the assessment. | Local | Yes | Yes |      |
| Student <br /> StudentDemographic | PersonalInformationVerification | The category of the document relative to its purpose. | Orthodox |     |     |     |
| StudentEducationOrganizationAssociation | PrimaryLearningDeviceAccess | An indication of whether the primary learning device is shared or not shared with another individual. |     |     |     |     |
| StudentEducationOrganizationAssociation | PrimaryLearningDeviceAwayFromSchool | The type of device the student uses most often to complete learning activities away from school. |     |     |     |     |
| StudentEducationOrganizationAssociation | PrimaryLearningDeviceProvider | The provider of the primary learning device. |     |     |     |     |
| StudentDemographic | Race | The general racial category which most clearly reflects the individual's recognition of his or her community or with the which the individual most identifies as last reported to the education organization. The data model allows for multiple entries so that each individual can specify all appropriate races. | Standard |     |     |     |
| StudentSchoolAssociation | ResidencyStatus | An indication of the location of a persons legal residence relative to (within or outside of) the boundaries of the public school attended and its administrative unit. |     |     |     |     |
| StudentEducationOrganizationResponsibilityAssociation | Responsibility | Indications of an education organization's responsibility for a student, such as accountability, attendance, funding, etc. |     |     |     |     |
| GraduationPlan | ResultDatatypeType | The datatype of the result. The results can be expressed as a number, percentile, range, level, etc. | Orthodox |     |     | Yes |
| School | SchoolCategory | The one or more categories of school. |     |     |     |     |
| StudentSchoolAssociation | SchoolChoiceBasis | The legal basis for the school choice enrollment according to local, state or federal policy or regulation. (The descriptor provides the list of available bases specific to the state. |     |     |     |     |
| LocalEducationAgency | SchoolChoiceImplementStatus | An indication of whether the LEA was able to implement the provisions for public school choice under Title I, Part A, Section 1116 of ESEA as amended. |     |     |     |     |
| School | SchoolType | The type of education institution as classified by its primary focus. |     |     |     |     |
| Student <br /> StudentDemographic | Sex | A person's sex at birth. | Standard |     |     |     |
| EducationOrganization <br /> StudentDirectory | StateAbbreviation | The abbreviation for the state (within the United States) or outlying area in which an address is located. | Standard |     | Yes |     |
| StudentDemographic | StudentCharacteristic | The characteristic designated for the student. | Local |     |     |     |
| StudentIdentificationCode | StudentIdentificationSystem | A coding scheme that is used for identification and record-keeping purposes by schools, LEAs, SEAs, or other agencies refer to a student. | Orthodox |     |     |     |
| StudentDemographic | SupporterMilitaryConnection | Military connection of the person/people whom the student is a dependent of. | Standard |     |     |     |
| StudentDirectory | TelephoneNumberType | The type of communication number listed for an individual or organization. | Standard |     |     |     |
| StudentEducationOrganizationAssociation | Term | The term associated with the cohort year; for example, the intended term of graduation. |     |     |     |     |
| School | TitleIPartASchoolDesignation | Denotes the Title I Part A designation for the school. |     |     |     |     |
| StudentTransportation | TransportationPublicExpenseEligibilityType | The primary type of eligibility for transporting a student at public expense. |     |     |     |     |
| StudentTransportation | TransportationType | The mode or type of transportation utilized by a student to commute to and from school. |     |     |     |     |
| StudentTransportation | TravelDayofWeek | Specifies the day(s) of the week on which student transportation occurs. |     |     |     |     |
| StudentTransportation | TravelDirection | Indicates the direction of travel for the student transportation route (e.g., to school, from school). |     |     |     |     |
| StudentDemographic | TribalAffiliation | An American Indian tribe with which the student is affiliated as last reported to the education organization. | Orthodox |     |     |     |
| StudentDemographic | Visa | An indicator of a non-US citizen's Visa type. | Standard |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
