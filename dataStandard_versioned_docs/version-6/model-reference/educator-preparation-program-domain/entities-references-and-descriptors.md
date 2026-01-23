---
sidebar_position: 3
hide_table_of_contents: true
---

# Educator Preparation Program - Entities, References, and Descriptors

## Educator Preparation Program Domain Entities

| Name | Description |
| --- | --- |
| Candidate | A candidate is both a person enrolled in a educator preparation program and a candidate to become an educator. |
| CandidateEducatorPreparationProgramAssociation | Information about the association between the educator candidate and the educator preparation program. |
| CandidateRelationshipToStaffAssociation | Describes the relationship between a  current candidate and a staff person, typically at a K12 partnering district in the role of a mentor teacher, coordinating teacher, supervising principal, etc. It could also describe the relationship between a  current candidate and a university staff member. This is a relationship between two different people|
| CandidateIdentificationCode | This entity holds different identity codes for a candidate. |
| EducatorPreparationProgram | The educator preparation program designed to prepare students to become licensed educators. |
| FieldworkExperience| The information regarding a post-secondary instructional course in a particular field of study that typically involves a prescribed number, instruction periods, or meetings for enrolled students. |
| FieldworkExperienceSectionAssociation | Associates field work experience with a section. |
| StaffEducatorPreparationProgramAssociation | This association indicates the educator preparation program associated with a staff. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| Person | This entity represents a human being. |
| Section | This entity represents a setting in which organized instruction of course content is provided, in-person or otherwise, to one or more students for a given period of time. A course offering may be offered to more than one section. |
| Staff | This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion. |

## Educator Preparation Program Domain Descriptors

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| Candidate | AcademicSubject | The description of the content or subject area of a degree. | Local | Yes | Yes |     |
| EducatorPreparationProgram | AccreditationStatus | The current accreditation status of the educator preparation program. | Standard |     |     |     |
| Candidate | AddressType | The type of address listed for an individual or organization.    For example:  (Physical Address, Mailing Address, Home Address, etc.) |Orthodox | Yes | Yes | Yes |
| Candidate | BackgroundCheckStatus | The status of the background check. |     |     |     |     |
| Candidate | BackgroundCheckType | The type of background check. |     |     |     |     |
| Candidate | CandidateCharacteristic | The characteristic designated for the candidate. |     |     |     |     |
| CandidateIdentificationCode | CandidateIdentificationSystem | A coding scheme that is used for identification and record-keeping. |     |     |     |     |
| Candidate | CitizenshipStatus | An indicator of whether or not the person is a U.S. citizen. | Orthodox |     |     |     |
| CandidateEducatorPreparationProgramAssociation | CohortYearType | The type of cohort year (9th grade, graduation). | Local |     |     |     |
| Candidate | Country | The country in which an individual is born. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     |     |     |
| Candidate | Disability | A disability category that describes a individual's impairment. | Orthodox | Yes | Yes |     |
| Candidate | DisabilityDesignation | Whether the disability is IDEA, Section 504, or other disability designation. | Orthodox |     | Yes |     |
| Candidate | DisabilityDeterminationSourceType | The source that provided the disability determination. | Orthodox |     | Yes |     |
| Candidate | EconomicDisadvantage | An indication of inadequate financial condition of an individual's family, as determined by family income, number of family members/dependents, participation in public assistance programs, and/or other characteristics considered relevant by federal, state, and local policy. | Orthodox |     |     |     |
| Candidate | ElectronicMailType | The type of email listed for an individual or organization. (For example: Home/Personal, Work, etc.) | Standard |     |     |     |
| Candidate | EnglishLanguageExam | Indicates that an individual passed, failed, or did not take an English Language assessment. | Standard |     |     |     |
| Candidate | EPPDegreeType | A code for describing the degree type that a candidate accomplishes. |     |     |     |     |
| CandidateEducatorPreparationProgramAssociation | EPPProgramPathway | The program pathway the candidate is following. | Standard |     |     |     |
| FieldworkExperience | FieldworkType | The type of fieldwork being executed by a staff. |     |     |     |     |
| EducatorPreparationProgram | GradeLevel | The grade levels served at the educator preparation program. | Orthodox | Yes | Yes |     |
| Candidate | Language | A specification of which written or spoken communication is being used. | Orthodox | Yes | Yes | Yes |
| Candidate | LanguageUse | A description of how the language is used (e.g. Home Language, Native Language, Spoken Language). | Orthodox |     |     |     |
| Candidate | LimitedEnglishProficiency | Indicates whether the individual has been identified as limited English proficient (LEP) by the Language Proficiency Assessment Committee (LPAC), or is English proficient. | Standard | Yes | Yes | Yes |
| Candidate | Locale | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Standard |     |     |     |
| Candidate | OtherNameType | The types of alternate names for an individual. | Orthodox |     |     |     |
| Candidate | PreviousCareer | The career previous for an individual. |     |     |     |     |
| EducatorPreparationProgram | ProgramType | The type of program. | Flexible | Yes | Yes | Yes |
| Candidate | Race | The general racial category which most clearly reflects the individual's recognition of his or her community or with which the individual most identifies. The data model allows for multiple entries so that each individual can specify all appropriate races. | Standard |     |     |     |
| CandidateEducatorPreparationProgramAssociation | ReasonExited | The reason exited for the association. |     |     |     |     |
| Candidate | Sex | The sex of the person. | Standard |     |     |     |
| CandidateRelationshipToStaffAssociation | StaffToCandidateRelationship | Defines the staff relationship to the candidate. |     |     |     |     |
| Candidate | StateAbbreviation | The abbreviation for the name of the state (within the United States) or extra-state jurisdiction in which an individual was born. | Standard |     | Yes |     |
| Candidate | TelephoneNumberType | The type of communication number listed for an individual or organization. | Standard |     |     |     |
| CandidateEducatorPreparationProgramAssociation | Term | The term associated with the cohort year; for example, the intended term of graduation. |     |     |     |     |
| Candidate | Visa |  An indicator of a non-US citizen's Visa type. | Standard |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
