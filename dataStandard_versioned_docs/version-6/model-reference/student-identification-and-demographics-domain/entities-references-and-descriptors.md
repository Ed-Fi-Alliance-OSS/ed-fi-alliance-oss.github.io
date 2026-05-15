---
sidebar_position: 3
hide_table_of_contents: true
---

# Student Identification and Demographics Domain - Entities, References, and Descriptors

## Student Identification and Demographics Domain Entities

| Name | Description |
| --- | --- |
| Contact | This entity represents a contact of a student, such as a parent, guardian or caretaker. |
| ContactIdentificationCode| This entity holds different identity codes associated to a contact. |
| Person | This entity represents a human being. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentDemographic| The demographic information associated to a student. |
| StudentDirectory | The contact information associated to a student. |
| StudentIdentificationCode | This entity holds different identity codes for a student. |
| StudentEducationOrganizationAssociation | This association represents student information that is specific to a student's relationship with an EducationOrganization. Often, these student properties are the result of evaluations administered by Local Education Agencies and therefore may have different values if the student is enrolled at more than one Local Education Agency. |
| StudentContactAssociation | This association relates students to their parents, guardians, or caretakers. |

## Extended References

| Name | Description |
| --- | --- |
| FinancialAid | This entity represents the financial aid a person is awarded. |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |

### Student Identification and Demographics Domain Descriptors

| Name | Entity | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| AddressCharacteristic | Contact <br /> StudentDirectory | The address characteristic mainly to reflect if Primary and type of communication to be received, e.g.: Primary, Validated, Gets Copy of Report, Discipline Correspondence. |     |     |     |     |
| AddressType | Contact <br /> StudentDirectory | The type of address listed for an individual or organization. (For example: Physical Address, Mailing Address, Home Address, etc.) | Orthodox |     |     |     |
| AidType | FinancialAid | The classification of financial aid awarded to a person for the academic term/year. | Orthodox |     |     |     |
| AncestryEthnicOrigin | StudentDirectory | The original peoples or cultures with which the individual identifies. | Local |     |     | Yes |
| BarrierToInternetAccessInResidence | StudentEducationOrganizationAssociation | An indication of the barrier to having internet access in the student's primary place of residence. | Flexible |     |     |     |
| CitizenshipStatus | StudentDemographic | An indicator of whether or not the person is a U.S. citizen. | Orthodox |     |     |     |
| CohortYearType | StudentEducationOrganizationAssociation | The type and year of a cohort (e.g., 9th grade) the student belongs to as determined by the year that student entered a specific grade. | Local |     |     |     |
| ContactIdentificationSystem | ContactIdentificationCode | A coding scheme that is used for identification and record-keeping. |     |     |     |     |
| Country | Contact <br /> Student <br /> StudentDemographic <br /> StudentDirectory | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| Disability | StudentDemographic | The disability condition(s) that best describes an individual's impairment, as determined by evaluation(s) conducted by the education organization. | Orthodox |     |     |     |
| DisabilityDesignation | StudentDemographic | Whether the disability is IDEA, Section 504, or other disability designation. | Orthodox |     |     |     |
| DisabilityDeterminationSourceType | StudentDemographic | The source that provided the disability determination. | Orthodox |     |     |     |
| DisplacedStudentStatus | StudentEducationOrganizationAssociation | Indicates whether a student has been displaced as a result of a crisis event. | Orthodox |     |     |     |
| EconomicDisadvantage | StudentDemographic | The indication of an inadequate financial condition of an individual's family, as determined by family income, number of family members/dependents, participation in public assistance programs, and/or other characteristics considered relevant by federal, state, and local policy. | Orthodox |     |     |     |
| ElectronicMailType | Contact <br /> StudentDirectory | The type of email listed for an individual or organization. (For example: Home/Personal, Work, etc.) | Standard |     |     |     |
| IdentificationDocumentUse | Student <br /> StudentDemographic | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| InternetAccessTypeInResidence | StudentEducationOrganizationAssociation | The primary type of internet service used in the student's primary place of residence. | Orthodox |     |     |     |
| InternetPerformanceInResidence | StudentEducationOrganizationAssociation | An indication of whether the student can complete the full range of learning activities, including video streaming and assignment upload, without interruptions caused by poor internet performance in their primary place of residence. | Orthodox |     |     |     |
| Language | StudentDemographic | A specification of which written or spoken communication is being used. | Orthodox |     |     |     |
| LanguageUse | StudentDemographic | A description of how the language is used (e.g. Home Language, Native Language, Spoken Language). | Orthodox |     |     |     |
| LevelOfEducation | Contact | The extent of formal instruction an individual has received (e.g., the highest grade in school completed or its equivalent or the highest degree received). | Orthodox |     |     |     |
| LimitedEnglishProficiency | StudentDemographic | An indication that the student has been identified as limited English proficient by the Language Proficiency Assessment Committee (LPAC), or English proficient. | Orthodox | Yes | Yes | Yes |
| Locale | Contact <br /> StudentDirectory | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Standard |     |     |     |
| OtherNameType | Contact <br /> Student | The types of alternate names for an individual. | Orthodox |     |     |     |
| PersonalInformationVerification | StudentDemographic | The category of the document relative to its purpose. | Orthodox |     |     |     |
| PrimaryLearningDeviceAccess | StudentEducationOrganizationAssociation | An indication of whether the primary learning device is shared or not shared with another individual. | Flexible |     |     |     |
| PrimaryLearningDeviceAwayFromSchool | StudentEducationOrganizationAssociation | The type of device the student uses most often to complete learning activities away from school. | Flexible |     |     |     |
| PrimaryLearningDeviceProvider | StudentEducationOrganizationAssociation | The provider of the primary learning device. | Flexible |     |     |     |
| Race | StudentDemographic | The general racial category which most clearly reflects the individual's recognition of his or her community or with the which the individual most identifies as last reported to the education organization. The data model allows for multiple entries so that each individual can specify all appropriate races. | Standard |     |     |     |
| Relation | StudentContactAssociation | The nature of an individual's relationship to a student, primarily used to capture family relationships. | Orthodox |     |     |     |
| Sex | Contact <br /> Student <br /> StudentDemographic | The individual's birth sex as reported to the education organization. | Standard |     |     |     |
| SourceSystem | Person | This descriptor defines the originating record source system for the person. | Local |     |     |     |
| StateAbbreviation | Contact <br /> Student <br /> StudentDemographic | The abbreviation for the state (within the United States) or outlying area in which an address is located. | Standard |     |     |     |
| StudentCharacteristic | StudentDemographic | The characteristic designated for the student. | Local |     |     |     |
| StudentIdentificationSystem | StudentIdentificationCode | A coding scheme that is used for identification and record-keeping purposes by schools, LEAs, SEAs, or other agencies to refer to a student. | Orthodox |     |     |     |
| SupporterMilitaryConnection | StudentDemographic | Military connection of the person/people whom the student is a dependent of. | Standard |     |     |     |
| TelephoneNumberType | Contact <br /> StudentDemographic | The type of communication number listed for an individual or organization. | Standard |     |     |     |
| Term | StudentEducationOrganizationAssociation | The term associated with the cohort year; for example, the intended term of graduation. |     |     |     |     |
| TribalAffiliation | StudentDemographic | An American Indian tribe with which the student is affiliated as last reported to the education organization. | Standard |     |     |     |
| Visa | StudentDemographic | An indicator of a non-US citizen's Visa type. | Standard |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
