---
sidebar_position: 3
hide_table_of_contents: true
---

# Recruitment And Staffing Domain - Entities, References, and Descriptors

## Recruitment And Staffing Domain Entities

| Name | Description |
| --- | --- |
| ApplicantProfile | The profile of the person making an application. |
| Application | An application for employment or acceptance. |
| ApplicationEvent | The life cycle event associated with an application.|
| ProfessionalDevelopmentEvent | Information about a professional development event. |
| ProfessionalDevelopmentEventAttendance | This event entity represents the recording of whether a staff is in attendance for professional development. |
| RecruitmentEvent | Events associated with the recruitment process. |
| RecruitmentEventAttendance |  A prospect for employment or acceptance that has not yet made a formal application but has attended a recruitment event, such as a job fair or university recruiting visit. |

## Extended References

| Name | Description |
| --- | --- |
| EducationOrganization | This entity represents any public or private institution, organization, or agency that provides instructional or support services to students or staff at any level. |
| OpenStaffPosition | This entity represents an open staff position that the education organization is seeking to fill. |
| Person | This entity represents a human being. |

## Recruitment And Staffing Domain Descriptors

| Name | Entity | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| AcademicSubject | ApplicantProfile <br /> Application | The academic subject for which the (HighNeeds) application is made, teaching field required, or "highly qualified" field of the applicant. | Local | Yes | Yes |     |
| AddressCharacteristic | ApplicantProfile | The address characteristic mainly to reflect if Primary and type of communication to be received, e.g.: Primary, Validated, Gets Copy of Report, Discipline Correspondence. |     |     |     |     |
| AddressType | ApplicantProfile | The type of address listed for an individual or organization. For example: (Physical Address, Mailing Address, Home Address, etc.) | Orthodox | Yes | Yes |     |
| ApplicationEventResult | ApplicationEvent | The recommendation, result or conclusion of the application event. |     |     |     |     |
| ApplicationEventType | ApplicationEvent | Description of the application event. |     |     |     |     |
| ApplicationSource | Application | Specifies the source for the application. |     |     |     |     |
| ApplicationStatus | Application | Indicates the current status of the application. |     |     |     |     |
| AssessmentReportingMethod | Application | The method that the administrator of the assessment uses to report the performance and achievement of all students. It may be a qualitative method such as performance level descriptors or a quantitative method such as a numerical grade or cut score. More than one type of reporting method may be used. | Local | Yes | Yes |     |
| AttendanceEventCategory | ProfessionalDevelopmentEventAttendance | A code describing the attendance event. | Local | Yes | Yes |     |
| BackgroundCheckStatus | ApplicantProfile | The status of the background check. |     |     |     |     |
| BackgroundCheckType | ApplicantProfile | The type of background check. |     |     |     |     |
| CitizenshipStatus | ApplicantProfile | An indicator of whether or not the person is a U.S. citizen. | Orthodox |     |     |     |
| Country | ApplicantProfile | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     | Yes |     |
| Disability | ApplicantProfile | A disability category that describes a individual's impairment. | Orthodox | Yes | Yes |     |
| DisabilityDesignation | ApplicantProfile | Whether the disability is IDEA, Section 504, or other disability designation. | Orthodox |     | Yes |     |
| DisabilityDeterminationSourceType | ApplicantProfile | The source that provided the disability determination. | Orthodox |     | Yes |     |
| EconomicDisadvantage | ApplicantProfile | An indication of inadequate financial condition of an individual's family, as determined by family income, number of family members/dependents, participation in public assistance programs, and/or other characteristics considered relevant by federal, state, and local policy. | Orthodox |     |     |     |
| ElectronicMailType | ApplicantProfile | The type of email listed for an individual or organization. (For example: Home/Personal, Work, etc.) | Standard |     |     |     |
| GradeLevel | RecruitmentEventAttendance | The set of grade levels for which the individual's assignment is responsible. | Orthodox | Yes | Yes |     |
| GradePointAverageType | ApplicantProfile | The system used for calculating the grade point average for an individual. | Standard |     |     |     |
| HireStatus | Application | Indicates the current status of the application for hire. |     |     |     |     |
| HiringSource | Application | The source for the application. |     |     |     |     |
| IdentificationDocumentUse | ApplicantProfile | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| Language | ApplicantProfile | A specification of which written or spoken communication is being used. | Orthodox | Yes | Yes | Yes |
| LanguageUse | ApplicantProfile | A description of how the language is used (e.g. Home Language, Native Language, Spoken Language). | Orthodox |     |     |     |
| LevelOfEducation | ApplicantProfile | The extent of formal instruction an individual has received. | Orthodox |     |     |     |
| Locale | ApplicantProfile | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). | Standard |     |     |     |
| PersonalInformationVerification | ApplicantProfile | The category of the document relative to its purpose. | Orthodox |     |     |     |
| ProfessionalDevelopmentOfferedBy | ProfessionalDevelopmentEvent | A code describing an organization that is offering a specific professional development. |     |     |     |     |
| Race | ApplicantProfile | The general racial category which most clearly reflects the individual's recognition of his or her community or with which the individual most identifies. The way this data element is listed, it must allow for multiple entries so that each individual can specify all appropriate races. | Standard |     |     |     |
| RecruitmentEventAttendeeType | RecruitmentEventAttendance | Reflects the type of prospect, such as EPP Applicant, Hire, or Mentor Teacher. |     |     |     |     |
| RecruitmentEventType | RecruitmentEvent | The type of event. |     |     |     |     |
| ResultDatatypeType | Application | The datatype of the result. The results can be expressed as a number, percentile, range, level, etc. |     |     |     |     |
| Sex | ApplicantProfile | A person's birth sex. | Standard |     |     |     |
| StateAbbreviation | ApplicantProfile | The abbreviation for the state (within the United States) or outlying area in which an address is located. | Standard |     | Yes |     |
| StudentCharacteristic | ApplicantProfile | The characteristic designated for the student applicant. | Local |     |     |     |
| TelephoneNumberType | ApplicantProfile | The type of communication number listed for an individual or organization. | Standard |     |     |     |
| Term | Application <br /> ApplicationEvent | Defines the intended term of enrollment for which the application is being submitted, or session during the school year. |     |     |     |     |
| Visa | ApplicantProfile | An indicator of a non-US citizen's Visa type. | Standard |     |     |     |
| WithdrawReason | Application | Reason applicant withdrew application. |     |     |     |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
