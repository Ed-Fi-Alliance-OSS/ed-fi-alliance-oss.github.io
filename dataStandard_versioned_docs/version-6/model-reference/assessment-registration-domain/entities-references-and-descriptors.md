---
sidebar_position: 3
hide_table_of_contents: true
---

# Assessment Registration Domain - Entities, References, and Descriptors

## Assessment Registration Domain Entities

| Name | Description |
| --- | --- |
| AssessmentAdministration | The anticipated administration of an assessment under the purview of an EducationOrganization. |
| AssessmentAdministrationParticipation | Identifies the point of contact for the administration of an assessment under the purview of an EducationOrganization. |
| StudentAssessmentRegistration | Identifies an assessment registration that a student is expected to participate in including the testing organization, reporting organization and assessment delivery details. |
| AssessmentBatteryPart | The parts organized for administering an assessment which together provide a comprehensive assessment of the students. |
| StudentAssessmentRegistrationBatteryPartAssociation | The association to the part(s) of the assessment battery that the student is to be tested for this administration of the assessment. |
| StudentEducationOrganizationAssessmentAccommodation |  The accommodation(s) required or expected for administering assessments as determined by the education organization. |

## Extended References

| Name | Description |
| --- | --- |
| Assessment | This entity represents a tool, instrument, process, or exhibition composed of a systematic sampling of behavior for measuring a student's competence, knowledge, skills, or behavior. An assessment can be used to measure differences in individuals or groups and changes in performance from one occasion to the next. |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| ObjectiveAssessment | This entity represents subtests that assess specific learning objectives. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentDemographic | The demographic information associated to a student. |

## Assessment Domain Descriptors

| Name | Entity | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| Accommodation | StudentAssessmentRegistration <br /> StudentEducationOrganizationAssessmentAccommodation <br /> StudentAssessmentRegistrationBatteryPartAssociation | The special variation(s) to be used for the specific part of the assessment battery on how is presented, how it is administered, or how the test taker is allowed to respond. | Local |     | Yes |     |
| AncestryEthnicOrigin | StudentDemographic | The original peoples or cultures with which the individual identifies. | Local |     |     | Yes |
| CitizenshipStatus | StudentDemographic | An indicator of whether or not the person is a U.S. citizen. | Orthodox |     |     |     |
| Country | StudentDemographic | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     | Yes |     |
| Disability | StudentDemographic | A disability category that describes a individual's impairment. | Orthodox | Yes | Yes |     |
| DisabilityDesignation | StudentDemographic | Whether the disability is IDEA, Section 504, or other disability designation. | Orthodox |     | Yes |     |
| DisabilityDeterminationSourceType | StudentDemographic | The source that provided the disability determination. | Orthodox |     | Yes |     |
| EconomicDisadvantage | StudentDemographic | The indication of an inadequate financial condition of an individual's family, as determined by family income, number of family members/dependents, participation in public assistance programs, and/or other characteristics considered relevant by federal, state, and local policy. |     |     |     |     |
| GradeLevel | StudentAssessmentRegistration | The grade level or primary instructional level at which the student is to be assessed. | Orthodox | Yes | Yes |     |
| PlatformType | StudentAssessmentRegistration | The environment or format in which the assessment is expected to be administered. | Orthodox |     |     |     |
| IdentificationDocumentUse | StudentDemographic | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| Language | StudentDemographic | A specification of which written or spoken communication is being used. | Standard | Yes | Yes |     |
| LanguageUse | StudentDemographic | A description of how the language is used (e.g. Home Language, Native Language, Spoken Language). | Orthodox |     |     |     |
| LimitedEnglishProficiency | StudentDemographic | An indication that the student has been identified as limited English proficient by the Language Proficiency Assessment Committee (LPAC), or English proficient. | Standard | Yes |     |     |
| PersonalInformationVerification | StudentDemographic | The category of the document relative to its purpose. | Orthodox |     |     |     |
| Race | StudentDemographic | The general racial category which most clearly reflects the individual's recognition of his or her community or with the which the individual most identifies as last reported to the education organization. The data model allows for multiple entries so that each individual can specify all appropriate races. | Standard |     |     |     |
| Sex | StudentDemographic | The student's birth sex as reported to the education organization. | Standard |     |     |     |
| StudentCharacteristic | StudentDemographic | The characteristic designated for the student. | Local |     |     |     |
| SupporterMilitaryConnection | StudentDemographic | Military connection of the person/people whom the student is a dependent of. | Standard |     |     |     |
| TribalAffiliation | StudentDemographic | An American Indian tribe with which the student is affiliated as last reported to the education organization. | Orthodox |     |     |     |
| Visa | StudentDemographic | An indicator of a non-US citizen's Visa type. | Standard |     |     |     |

:::tip

See [Non-normative Descriptor Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
