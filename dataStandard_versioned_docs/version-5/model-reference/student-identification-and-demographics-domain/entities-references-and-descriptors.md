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
| Contact | AddressType | The type of address listed for an individual or organization. For example: Physical Address, Mailing Address, Home Address, etc.) | Orthodox |     |     |     |
| Country | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| ElectronicMailType | The type of email listed for an individual or organization. For example: Home/Personal, Work, etc.) | Standard |     |     |     |
| HighestCompletedLevelOfEducation | The extent of formal instruction an individual has received (e.g., the highest grade in school completed or its equivalent or the highest degree received). | Orthodox |     |     |     |
| IdentificationDocumentUse | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| IssuerCountry | Country of origin of the document. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| Language | A specification of which written or spoken communication is being used. | Orthodox |     |     |     |
| LanguageUse | A description of how the language is used (e.g., Home Language, Native Language, Spoken Language). | Orthodox |     |     |     |
| Locale | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Standard |     |     |     |
| OtherNameType | The types of alternate names for a person. | Orthodox |     |     |     |
| PersonalInformationVerification | The category of the document relative to its purpose. | Orthodox |     |     |     |
| Sex | A person's gender. | Flexible |     |     |     |
| StateAbbreviation | The abbreviation for the state (within the United States) or outlying area in which an address is located. | Standard |     |     |     |
| TelephoneNumberType | The type of communication number listed for an individual or organization. | Standard |     |     |     |
| Person | SourceSystem | This descriptor defines the originating record source system for the person. | Local |     |     |     |
| Student | BirthCountry | The country in which an individual is born. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| BirthSex | A person's gender at birth. | Standard |     |     |     |
| BirthStateAbbreviation | The abbreviation for the name of the state (within the United States) or extra-state jurisdiction in which an individual was born. | Standard |     |     |     |
| CitizenshipStatus | An indicator of whether or not the person is a U.S. citizen. | Orthodox |     |     |     |
| IdentificationDocumentUse | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| IssuerCountry | Country of origin of the document. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| OtherNameType | The types of alternate names for a person. | Orthodox |     |     |     |
| PersonalInformationVerification | The category of the document relative to its purpose. | Orthodox |     |     |     |
| Visa | An indicator of a non-US citizen's Visa type. | Standard |     |     |     |
| StudentEducationOrganizationAssociation | AddressType | The type of address listed for an individual or organization. For example: Physical Address, Mailing Address, Home Address, etc.) | Orthodox |     |     |     |
| AncestryEthnicOrigin | The original peoples or cultures with which the individual identifies. | Local |     |     | Yes |
| BarrierToInternetAccessInResidence | An indication of the barrier to having internet access in the student’s primary place of residence. | Flexible |     |     |     |
| CohortYearType | The type of cohort year (9th grade, graduation). | Local |     |     |     |
| Country | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| Disability | A disability category that describes a child's impairment. | Orthodox |     |     |     |
| DisabilityDesignation | Whether the disability is IDEA, Section 504, or other disability designation. | Orthodox |     |     |     |
| DisabilityDeterminationSourceType | The source that provided the disability determination. | Orthodox |     |     |     |
| ElectronicMailType | The type of email listed for an individual or organization. For example: Home/Personal, Work, etc.) | Standard |     |     |     |
| InternetAccessTypeInResidence | The primary type of internet service used in the student’s primary place of residence. | Flexible |     |     |     |
| InternetPerformanceInResidence | An indication of whether the student can complete the full range of learning activities, including video streaming and assignment upload, without interruptions caused by poor internet performance in their primary place of residence. | Flexible |     |     |     |
| Language | A specification of which written or spoken communication is being used. | Orthodox |     |     |     |
| LanguageUse | A description of how the language is used (e.g., Home Language, Native Language, Spoken Language). | Orthodox |     |     |     |
| LimitedEnglishProficiency | An indication that the student has been identified as limited English proficient by the Language Proficiency Assessment Committee (LPAC), or English proficient. | Standard | Yes | Yes | Yes |
| Locale | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Standard |     |     |     |
| PrimaryLearningDeviceAccess | An indication of whether the primary learning device is shared or not shared with another individual. | Flexible |     |     |     |
| PrimaryLearningDeviceAwayFromSchool | The type of device the student uses most often to complete learning activities away from school. | Flexible |     |     |     |
| PrimaryLearningDeviceProvider | The provider of the primary learning device. | Flexible |     |     |     |
| Race | The general racial category which most clearly reflects the individual's recognition of his or her community or with which the individual most identifies as last reported to the education organization. The data model allows for multiple entries so that each individual can specify all appropriate races. | Standard |     |     |     |
| Sex | The student's gender as last reported to the education organization. | Flexible |     |     |     |
| StateAbbreviation | The abbreviation for the state (within the United States) or outlying area in which an address is located. | Standard |     |     |     |
| StudentCharacteristic | Reflects important characteristics of a student. If a student has a characteristic present, that characteristic is considered true or active for that student. If a characteristic is not present, no assumption is made as to the applicability of the characteristic, but local policy may dictate otherwise. | Local |     |     |     |
| StudentIdentificationSystem | A coding scheme that is used for identification and record-keeping purposes by schools, social services, or other agencies to refer to a student. | Orthodox |     |     |     |
| TelephoneNumberType | The type of communication number listed for an individual or organization. | Standard |     |     |     |
| TribalAffiliation | An American Indian tribe with which the student is affiliated as last reported to the education organization. | Orthodox |     |     |     |
|     | SupporterMilitaryConnection | Military connection of the person/people whom the student is a dependent of | Standard |     |     |     |
| StudentContactAssociation | Relation | The nature of an individual's relationship to a student; for example: Father, Mother, Step Father, Step Mother, Foster Father, Foster Mother, Guardian, etc. | Orthodox |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
