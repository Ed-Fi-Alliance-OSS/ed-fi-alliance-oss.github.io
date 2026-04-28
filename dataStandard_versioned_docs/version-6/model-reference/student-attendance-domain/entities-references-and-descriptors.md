---
sidebar_position: 3
hide_table_of_contents: true
---

# Student Attendance Domain - Entities, References, and Descriptors

## Student Attendance Domain Entities

| Name | Description |
| --- | --- |
| SectionAttendanceTakenEvent | Captures attendance taken event for given section. |
| StudentProgramAttendanceEvent | This event entity represents the recording of whether a student is in attendance to receive or participate in program services. |
| StudentSchoolAttendanceEvent | This event entity represents the recording of whether a student is in attendance for a school day. |
| StudentSectionAttendanceEvent | This event entity represents the recording of whether a student is in attendance for a section. |

## Extended References

| Name | Description |
| --- | --- |
| ClassPeriod | This entity represents the designation of a regularly scheduled series of class meetings at designated times and days of the week. |
| Program | This entity represents any program designed to work in conjunction with, or as a supplement to, the main academic program. Programs may provide instruction, training, services, or benefits through federal, state, or local agencies. Programs may also include organized extracurricular activities for students. |
| School | This entity represents an educational organization that includes staff and students who participate in classes and educational activity groups. |
| Section | This entity represents a setting in which organized instruction of course content is provided, in-person or otherwise, to one or more students for a given period of time. A course offering may be offered to more than one section. |
| Session | A term in the school year, generally a unit of time into which courses are scheduled, instruction occurs and by which credits are awarded. Sessions may be interrupted by vacations or other events. |
| Staff | This entity represents an individual who performs specified activities for any public or private education institution or agency that provides instructional and/or support services to students or staff at the early childhood level through high school completion. For example, this includes:  <br/><br/>1\. An "employee" who performs services under the direction of the employing institution or agency is compensated for such services by the employer and is eligible for employee benefits and wage or salary tax withholdings  <br/>2\. A "contractor" or "consultant" who performs services for an agreed upon fee or an employee of a management service contracted to work on site  <br/>3\. A "volunteer" who performs services on a voluntary and uncompensated basis  <br/>4\. An in-kind service provider  <br/>5\. An independent contractor or businessperson working at a school site. |
| Student | This entity represents an individual for whom instruction, services, and/or care are provided in an early childhood, elementary, or secondary educational program under the jurisdiction of a school, education agency or other institution or program. A student is a person who has been enrolled in a school or other educational institution. |
| StudentProgramAssociation | This association represents the Program(s) that a student participates in or is served by. |
| StudentSectionAssociation | This association indicates the course sections to which a student is assigned. |

## Student Attendance Domain Descriptors

| Name | Entity | Description | Usage Classification | EDFacts Mapping | Commonly Used | Commonly State-Defined |
| --- | --- | --- | --- | --- | --- | --- |
| AcademicSubject | Staff | The academic subject(s) in which the staff is deemed to be "highly qualified". | Local |     |     |     |
| AccreditationStatus | School | The accreditation status for an education preparation provider. | Standard |     |     |     |
| AchievementCategory | Staff | The category of achievement attributed to the individual. | Local |     |     |     |
| AdministrativeFundingControl | School | The type of education institution as classified by its funding source, for example public or private. | Local |     |     |     |
| AttemptStatus | StudentSectionAssociation | An indication of the student's completion status for the section. | Orthodox |     |     |     |
| AttendanceEventCategory | StudentProgramAttendanceEvent <br /> StudentSchoolAttendanceEvent <br /> StudentSectionAttendanceEvent | A code describing the attendance event, for example: (Present, Unexcused absence, Excused absence, Tardy) | Local |     |     |     |
| CharterApprovalAgencyType | School | The type of agency that approved the establishment or continuation of a charter school. | Standard | Yes | Yes |     |
| CharterStatus | School | A school or agency providing free public elementary or secondary education to eligible students under a specific charter granted by the state legislature or other appropriate authority and designated by such authority to be a charter school. | Standard | Yes | Yes | Yes |
| Country | Staff <br /> Student | The name of the country. It is strongly recommended that entries use only ISO 3166 2-letter country codes. | Standard |     | Yes |     |
| CourseLevelCharacteristic | Section | The type of specific program or designation with which the section is associated. This collection should only be populated if it differs from the course level characteristics identified at the course offering level. | Orthodox |     |     |     |
| CreditType | Section | The type of credits or units of value awarded for the completion of a course. | Flexible |     |     |     |
| DualCreditInstitution | StudentSectionAssociation | Descriptor for the postsecondary institution offering college credit. This descriptor may be used to select a postsecondary institution that is not defined as an education organization, and/or select a general type of postsecondary institution. |     |     |     |     |
| DualCreditType | StudentSectionAssociation | For a student taking a dual credit course in a college or high school setting, indicates the type of dual credit program. |     |     |     |     |
| EducationalEnvironment | Section | The setting in which a student receives education and related services. | Orthodox |     |     |     |
| FederalLocaleCode | School | The federal locale code associated with an education organization. |     |     |     |     |
| GradeLevel | School <br /> Section | The grade levels served at the school or grade levels in which the section is offered. | Orthodox | Yes | Yes |     |
| IdentificationDocumentUse | Staff <br /> Student | The primary function of the document used for establishing identity. | Orthodox |     |     |     |
| InternetAccess | School | The type of Internet access available. | Flexible |     |     |     |
| Language | Section | The primary language of instruction. If omitted, English is assumed. | Orthodox | Yes | Yes | Yes |
| LevelOfEducation | Staff | The extent of formal instruction an individual has received (e.g., the highest grade in school completed or its equivalent or the highest degree received). | Orthodox |     |     |     |
| MagnetSpecialProgramEmphasisSchool | School | A school that has been designed: 1) to attract students of different racial/ethnic backgrounds for the purpose of reducing, preventing, or eliminating racial isolation; and/or 2) to provide an academic or social focus on a particular theme (e.g., science/math, performing arts, gifted/talented, or foreign language). | Standard | Yes | Yes |     |
| MediumOfInstruction | Section | The media through which teachers provide instruction to students and students and teachers communicate about instructional matters. | Orthodox |     | Yes |     |
| OtherNameType | Staff <br /> Student | The types of alternate names for an individual. |     |     |     |     |
| PersonalInformationVerification | Staff <br /> Student | The category of the document relative to its purpose. | Orthodox |     |     |     |
| PopulationServed | Section | The type of students the section is offered and tailored to. | Orthodox |     |     |     |
| ProgramCharacteristic | Program | Reflects important characteristics of the program, such as categories or particular indications. | Local | Yes | Yes |     |
| ProgramSponsor | Program | Ultimate and intermediate providers of funds for a particular educational or service program or activity, or for an individual's participation in the program or activity (e.g., Federal, State, ESC, District, School, Private Organization). | Standard |     | Yes |     |
| ProgramType | Program | The type of program. | Flexible | Yes | Yes | Yes |
| RecognitionType | Staff | The nature of recognition given to the individual for accomplishments in a co-curricular, or extra-curricular activity. | Flexible |     |     |     |
| RepeatIdentifier | StudentSectionAssociation | An indication as to whether a student has previously taken a given course. | Orthodox |     |     |     |
| SchoolCategory | School | The one or more categories of school. | Local |     | Yes |     |
| SchoolType | School | The type of education institution as classified by its primary focus. | Standard | Yes | Yes |     |
| SectionCharacteristic | Section | Reflects important characteristics of the section, such as whether or not attendance is taken and the section is graded. | Local |     |     |     |
| SectionType | Section | Specifies whether the section is for attendance only, credit only, or both. | Flexible |     |     |     |
| Service | StudentProgramAssociation | Indicates the service being provided to the student by the program. | Local |     | Yes |     |
| Sex | Student | A person's sex at birth. | Standard |     |     |     |
| StateAbbreviation | Student | The abbreviation for the name of the state (within the United States) or extra-state jurisdiction in which an individual was born. | Standard |     | Yes |     |
| Term | Session | A descriptor value to indicate the term that the session is associated with. | Flexible |     |     |     |
| TitleIPartASchoolDesignation | School | Denotes the Title I Part A designation for the school. | Standard | Yes | Yes |     |

:::tip

See [Non-normative Descriptor
Classifications](/reference/data-exchange/technical-articles/non-normative-descriptor-classifications)
for more information on _Usage Classification_.

:::
