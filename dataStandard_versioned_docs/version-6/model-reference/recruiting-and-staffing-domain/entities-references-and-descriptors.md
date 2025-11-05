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

| Entity | Name | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| ApplicantProfile <br /> Application | AcademicSubject | The academic subject for which the (HighNeeds) application is made, teaching field required, or "highly qualified" filed of the applicant. |     |     |     |     |
| ApplicantProfile | AddressType | The type of address listed for an individual or organization. For example: (Physical Address, Mailing Address, Home Address, etc.) |     |     |     |     |
| ApplicationEvent | ApplicationEventResult | The recommendation, result or conclusion of the application event. |     |     |     |     |
| ApplicationEvent |ApplicationEventType | Description of the application event. |     |     |     |     |
| Application | ApplicationSource | Specifies the source for the application. |     |     |     |     |
| Application | ApplicationStatus | Indicates the current status of the application. |     |     |     |     |
| Application | AssessmentReportingMethod | The method that the administrator of the assessment uses to report the performance and achievement of all students. It may be a qualitative method such as performance level descriptors or a quantitative method such as a numerical grade or cut score. More than one type of reporting method may be used. |     |     |     |     |
| ProfessionalDevelopmentEventAttendance | AttendanceEventCategory | A code describing the attendance event.  |     |     |     |     |
| ApplicantProfile | BackgroundCheckStatus | The status of the background check. |     |     |     |     |
| ApplicantProfile | BackgroundCheckType | The type of background check. |     |     |     |     |
| ApplicantProfile | CitizenshipStatus | An indicator of whether or not the person is a U.S. citizen. |     |     |     |     |
| ApplicantProfile | Country | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. |     |     |     |     |
| ApplicantProfile | Disability | A disability category that describes a individual's impairment.  |     |     |     |     |
| ApplicantProfile | DisabilityDesignation | Whether the disability is IDEA, Section 504, or other disability designation.  |     |     |     |     |
| ApplicantProfile | DisabilityDeterminationSourceType | The source that provided the disability determination. |     |     |     |     |
| ApplicantProfile | ElectronicMailType | The type of email listed for an individual or organization. (For example: Home/Personal, Work, etc.) |     |     |     |     |
| RecruitmentEventAttendance | GradeLevel | The set of grade levels for which the individual's assignment is responsible. |     |     |     |     |
| ApplicantProfile |GradePointAverageType | The system used for calculating the grade point average for an individual. |     |     |     |     |
| Application | HireStatus | Indicates the current status of the application for hire. |     |     |     |     |
| Application | HireStatus | The source for the application. |     |     |     |     |
| ApplicantProfile | Language | A specification of which written or spoken communication is being used. |     |     |     |     |
| ApplicantProfile | LanguageUse | A description of how the language is used (e.g. Home Language, Native Language, Spoken Language). |     |     |     |     |
| ApplicantProfile | LevelOfEducation | The extent of formal instruction an individual has received. |     |     |     |     |
| ApplicantProfile | Locale | A general geographic indicator that categorizes U.S. territory (e.g., City, Suburban). |     |     |     |     |
| ProfessionalDevelopmentEvent | ProfessionalDevelopmentOfferedBy | A code describing an organization that is offering a specific professional development. |     |     |     |     |
| ApplicantProfile | Race | The general racial category which most clearly reflects the individual's recognition of his or her community or with which the individual most identifies. The way this data element is listed, it must allow for multiple entries so that each individual can specify all appropriate races. |     |     |     |     |
| RecruitmentEventAttendance | RecruitmentEventAttendeeType | Reflects the type of prospect, such as EPP Applicant, Hire, or Mentor Teacher. |     |     |     |     |
| RecruitmentEvent | RecruitmentEventType | The type of event. |     |     |     |     |
| Application | ResultDatatypeType | The datatype of the result. The results can be expressed as a number, percentile, range, level, etc. |     |     |     |     |
| ApplicantProfile | Sex | A person's birth sex. |     |     |     |     |
| ApplicantProfile | StateAbbreviation | The abbreviation for the state (within the United States) or outlying area in which an address is located. |     |     |     |     |
| ApplicantProfile | StudentCharacteristic | The characteristic designated for the student applicant.  |     |     |     |     |
| ApplicantProfile | TelephoneNumberType | The type of communication number listed for an individual or organization. |     |     |     |     |
| Application <br /> ApplicationEvent | Term | Defines the intended term of enrollment for which the application is being submitted, or session during the school year. |     |     |     |     |
| ApplicantProfile | Visa | An indicator of a non-US citizen's Visa type. |     |     |     |     |
| Application | WithdrawReason | Reason applicant withdrew application. |
