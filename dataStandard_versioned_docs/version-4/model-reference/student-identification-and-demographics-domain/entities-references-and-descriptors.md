---
sidebar_position: 3
hide_table_of_contents: true
---

# Student Identification and Demographics Domain - Entities, References, and Descriptors

## Student Identification and Demographics Domain Entities

| Name | Description |
| --- | --- |
| Contact | This entity represents a contact of a student, such as a parent, guardian or caretaker. |
| Person | This entity represents a human being. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentEducationOrganizationAssociation | This association represents student information that is specific to a student's relationship with an EducationOrganization. Often, these student properties are the result of evaluations administered by Local Education Agencies and therefore may have different values if the student is enrolled at more than one Local Education Agency. |
| StudentContactAssociation | This association relates students to their parents, guardians, or caretakers. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |

### Student Identification and Demographics Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| Parent | AddressType | The type of address listed for an individual or organization. For example: Physical Address, Mailing Address, Home Address, etc.) | Orthodox |     |     |     |
| Parent | Country | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| Parent | ElectronicMailType | The type of email listed for an individual or organization. For example: Home/Personal, Work, etc.) | Standard |     |     |     |
| Parent | HighestCompletedLevelOfEducation | The extent of formal instruction an individual has received (e.g., the highest grade in school completed or its equivalent or the highest degree received). | Orthodox |     |     |     |
| Parent | IdentificationDocumentUse | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| Parent | IssuerCountry | Country of origin of the document. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| Parent | Language | A specification of which written or spoken communication is being used. | Orthodox |     |     |     |
| Parent | LanguageUse | A description of how the language is used (e.g., Home Language, Native Language, Spoken Language). | Orthodox |     |     |     |
| Parent | Locale | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Standard |     |     |     |
| Parent | OtherNameType | The types of alternate names for a person. | Orthodox |     |     |     |
| Parent | PersonalInformationVerification | The category of the document relative to its purpose. | Orthodox |     |     |     |
| Parent | Sex | A person's gender. | Flexible |     |     |     |
| Parent | StateAbbreviation | The abbreviation for the state (within the United States) or outlying area in which an address is located. | Standard |     |     |     |
| Parent | TelephoneNumberType | The type of communication number listed for an individual or organization. | Standard |     |     |     |
| Person | SourceSystem | This descriptor defines the originating record source system for the person. | Local |     |     |     |
| Student | BirthCountry | The country in which an individual is born. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| Student | BirthSex | A person's gender at birth. | Standard |     |     |     |
| Student | BirthStateAbbreviation | The abbreviation for the name of the state (within the United States) or extra-state jurisdiction in which an individual was born. | Standard |     |     |     |
| Student | CitizenshipStatus | An indicator of whether or not the person is a U.S. citizen. | Orthodox |     |     |     |
| Student | IdentificationDocumentUse | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| Student | IssuerCountry | Country of origin of the document. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| Student | OtherNameType | The types of alternate names for a person. | Orthodox |     |     |     |
| Student | PersonalInformationVerification | The category of the document relative to its purpose. | Orthodox |     |     |     |
| Student | Visa | An indicator of a non-US citizen's Visa type. | Standard |     |     |     |
| StudentEducationOrganizationAssociation | AddressType | The type of address listed for an individual or organization. For example: Physical Address, Mailing Address, Home Address, etc.) | Orthodox |     |     |     |
| StudentEducationOrganizationAssociation | AncestryEthnicOrigin | The original peoples or cultures with which the individual identifies. | Local |     |     | Yes |
| StudentEducationOrganizationAssociation | BarrierToInternetAccessInResidence | An indication of the barrier to having internet access in the student’s primary place of residence. | Flexible |     |     |     |
| StudentEducationOrganizationAssociation | CohortYearType | The type of cohort year (9th grade, graduation). | Local |     |     |     |
| StudentEducationOrganizationAssociation | Country | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| StudentEducationOrganizationAssociation | Disability | A disability category that describes a child's impairment. | Orthodox |     |     |     |
| StudentEducationOrganizationAssociation | DisabilityDesignation | Whether the disability is IDEA, Section 504, or other disability designation. | Orthodox |     |     |     |
| StudentEducationOrganizationAssociation | DisabilityDeterminationSourceType | The source that provided the disability determination. | Orthodox |     |     |     |
| StudentEducationOrganizationAssociation | ElectronicMailType | The type of email listed for an individual or organization. For example: Home/Personal, Work, etc.) | Standard |     |     |     |
| StudentEducationOrganizationAssociation | InternetAccessTypeInResidence | The primary type of internet service used in the student’s primary place of residence. | Flexible |     |     |     |
| StudentEducationOrganizationAssociation | InternetPerformanceInResidence | An indication of whether the student can complete the full range of learning activities, including video streaming and assignment upload, without interruptions caused by poor internet performance in their primary place of residence. | Flexible |     |     |     |
| StudentEducationOrganizationAssociation | Language | A specification of which written or spoken communication is being used. | Orthodox |     |     |     |
| StudentEducationOrganizationAssociation | LanguageUse | A description of how the language is used (e.g., Home Language, Native Language, Spoken Language). | Orthodox |     |     |     |
| StudentEducationOrganizationAssociation | LimitedEnglishProficiency | An indication that the student has been identified as limited English proficient by the Language Proficiency Assessment Committee (LPAC), or English proficient. | Standard | Yes | Yes | Yes |
| StudentEducationOrganizationAssociation | Locale | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Standard |     |     |     |
| StudentEducationOrganizationAssociation | OldEthnicity | **Deprecated.** Previous definition of Ethnicity combining Hispanic/Latino and race: 1 - American Indian or Alaskan Native, 2 - Asian or Pacific Islander, 3 - Black, not of Hispanic origin, 4 - Hispanic, 5 - White, not of Hispanic origin. | Standard |     |     |     |
| StudentEducationOrganizationAssociation | PrimaryLearningDeviceAccess | An indication of whether the primary learning device is shared or not shared with another individual. | Flexible |     |     |     |
| StudentEducationOrganizationAssociation | PrimaryLearningDeviceAwayFromSchool | The type of device the student uses most often to complete learning activities away from school. | Flexible |     |     |     |
| StudentEducationOrganizationAssociation | PrimaryLearningDeviceProvider | The provider of the primary learning device. | Flexible |     |     |     |
| StudentEducationOrganizationAssociation | Race | The general racial category which most clearly reflects the individual's recognition of his or her community or with which the individual most identifies as last reported to the education organization. The data model allows for multiple entries so that each individual can specify all appropriate races. | Standard |     |     |     |
| StudentEducationOrganizationAssociation | Sex | The student's gender as last reported to the education organization. | Flexible |     |     |     |
| StudentEducationOrganizationAssociation | StateAbbreviation | The abbreviation for the state (within the United States) or outlying area in which an address is located. | Standard |     |     |     |
| StudentEducationOrganizationAssociation | StudentCharacteristic | Reflects important characteristics of a student. If a student has a characteristic present, that characteristic is considered true or active for that student. If a characteristic is not present, no assumption is made as to the applicability of the characteristic, but local policy may dictate otherwise. | Local |     |     |     |
| StudentEducationOrganizationAssociation | StudentIdentificationSystem | A coding scheme that is used for identification and record-keeping purposes by schools, social services, or other agencies to refer to a student. | Orthodox |     |     |     |
| StudentEducationOrganizationAssociation | TelephoneNumberType | The type of communication number listed for an individual or organization. | Standard |     |     |     |
| StudentEducationOrganizationAssociation | TribalAffiliation | An American Indian tribe with which the student is affiliated as last reported to the education organization. | Orthodox |     |     |     |
| StudentEducationOrganizationAssociation | SupporterMilitaryConnection | Military connection of the person/people whom the student is a dependent of | Standard |     |     |     |
| StudentContactAssociation | Relation | The nature of an individual's relationship to a student; for example: Father, Mother, Step Father, Step Mother, Foster Father, Foster Mother, Guardian, etc. | Orthodox |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
