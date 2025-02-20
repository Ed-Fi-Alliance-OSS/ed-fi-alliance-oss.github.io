---
sidebar_position: 4
hide_table_of_contents: true
---

# Alternative and Supplemental Services Domain - Best Practices

## Definitions and Key Concepts

The Alternative and Supplemental Services domain covers a variety of program
service offerings by educational institutions.  A program refers to a school
sponsored or approved recurring activity, event or function, on- or
off-school premises, where students are under the jurisdiction of the local
education agency (LEA) or are supervised by school staff.  Programs may
provide supplemental instruction, training, services, or benefits. Programs
may also include organized extracurricular activities for students.

The intent of the domain is to support the common federally-sponsored programs,
such as special education, language instruction for English language learners
(ELL), or career and technical education (CTE); as well as to provide a common
pattern that can be used for any other federal, state, or local programs. Key
characteristics of a program are as follows:

* Programs are officially designated by a sponsoring education organization
  and given a unique name.
* Programs often have eligibility requirements that must be met by
  participating students.
* Students are assigned or enrolled in a program for a period of time, with
  an explicit BeginDate and EndDate.
* Instructional or non-instructional service(s) are typically provided to a
  student in the context of a program.
* Staff are assigned to a program for a period of time.

Students explicitly are enrolled or assigned to a program.  Eligibility may
be a simple determination, may require expert opinion, or may require a
formal assessment.  Assignments to a program may occur as part of the
school enrollment process or may occur anytime during the school year.

Most students’ participation in programs occurs in the school where the
student is primarily enrolled, Sometimes to receive services not offered in
the student’s primary enrollment school, a student may be assigned to
participate in a program at another school or education organization. By
policy, these situations may or may not require secondary enrollment in the
school where the student is receiving services.  The Ed-Fi security model
supports both cases, with or without secondary enrollment.

Program information may be collected, stored and loaded into the API/ODS
from different sources:

* Student information systems(s) may capture and manage students’
  participation in designated programs
* Specialized applications exist for specific programs, most notably special
  education, language instruction, and school food service.
* In some cases, program participation is maintained in files and
  spreadsheets that must be manually uploaded.

## Alternative and Supplemental Services Use Cases

The various use cases associated with student enrollment process span several
Ed-Fi domains as shown below.

| Primary Use Cases | Ed-Fi Domains Needed to be Utilized for the Use Case |
| --- | --- |
| <li> Education organization designation of the program(s) to be offered to students </li> | <li> Alternative and Supplemental Services </li> |
| <li>Student evaluation for participation in a program</li> <li>Student selection and enrollment for participation in a program based upon evaluation of eligibility</li> | <li>Student Program Evaluation</li><li>Alternative and Supplemental Services</li> |
| <li>Student enrollment for participation in program in the same school primarily enrolled</li> <li>Student enrollment in a program in a school different from the student’s primary enrollment</li> <li>Student transfer to a program offered in another school as part of transferring schools</li> <li>Student exit or withdrawal from a program</li> | <li>Alternative and Supplemental Services</li> |
| <li>Student secondary registration for a school to participate in a program</li> <li>Exit or withdrawal from school and associated programs</li> | <li>Student Identification and Demographics</li> <li>Student Health</li> <li>Enrollment</li> <li>Alternative and Supplemental Services</li> |
| <li>Staff assignment to a program</li> <li>Staff exit from a program</li> | <li>Alternative and Supplemental Services</li> |
| <li>Attendance for a program and/or receipt of services</li> | <li>Student Attendance</li> <li>Alternative and Supplemental Services</li> |
| <li>Participation in a program as part of section instruction</li> | <li>Teaching and Learning</li> <li>Alternative and Supplemental Services</li> |

These best practices focus on the Alternative and Supplemental Services
domain, consisting of the following entities and associations:

* A Program entity, which defines programs with services offered by an
  education organization.
* A StaffProgramAssociation which links Program entities to assigned staff.
* A StudentProgramAssociation (SPA) entity, which links Program entities
  to participating students – when a subclass is not used and minimal
  information is needed.
* GeneralStudentProgamAssociation with predefined subclasses for major US
  K–12 federal program areas, as follows:

  * _StudentCTEProgramAssociation_
  * _StudentHomelessProgramAssociation_
  * _StudentLanguageInstructionProgramAssociation_
  * _StudentMigrantEducationProgramAssociation_
  * _StudentNeglectedOrDelinquentProgramAssociation_
  * _StudentSchoolFoodServiceProgramAssociation_
  * _StudentSection504ProgramAssociation_
  * _StudentSpecialEducationProgramAssociation_
  * _StudentTitleIPartAProgramAssociation_

  New subclasses of the GeneralStudentProgramAssociation may be defined
  using the Ed-Fi extension mechanism.  Subclasses of the
  GeneralStudentProgramAssociation are generically referred to as
  StudentXxxProgramAssociations (SXPA) (_where “Xxx” represents the name
  of the program_).

Please consult the other related domains above for best practices on entities
in those domains.
As summarized above, the Alternative and Supplemental Services domain
addresses student program participation and receipt of services, as part of
the following primary use cases:

## Ed-Fi Prerequisites for Writing Alternative and Supplemental Services Domain Entities

The Alternative and Supplemental Services domain has dependencies on other
data that should be entered into the Ed-Fi API/ODS prior to entering program
definition and student program enrollment information, as follows:

* Yearly API/ODS setup. The best practice convention has a separate API/ODS
  for each school year. This means that program enrollments and participation
  recorded in the StudentProgramAssociation or the StudentXxxProgramAssociation
  must be written for each school year.

* Descriptor values need to be loaded. The Alternative and Supplemental
  Services domain has dependency on several sets of descriptors. Many of these
  will be custom descriptors that need to map to current operational program
  practices and reporting.  Default descriptors for the Federally defined
  programs are provided that are based upon the reporting code for those
  programs.

  * _Program_
    * ProgramCharacteristic
    * ProgramSponsor
    * ProgramType
  * _StudentProgramAssociation_
    * Service
  * _GeneralStudentProgramAssociation_ and inherited by all subclasses
    * ParticipationStatus
    * ReasonExited
  * _StudentCTEProgramAssociation_
    * CTEProgramService
    * TechnicalSkillsAssessment
  * _StudentHomelessProgramAssociation_
    * HomelessPrimaryNighttimeResidence
    * HomelessProgramService
  * _StudentLanguageInstructionProgramAssociation_
    * LanguageInstructionProgramService
    * Monitored
    * Participation
    * Proficiency
    * Progress
  * _StudentMigrantEducationProgramAssociation_
    * ContinuationOfServicesReason
    * MigrantEducationProgramService
  * _StudentNeglectedOrDelinquentProgramAssociation_
    * NeglectedOrDelinquentProgram
    * NeglectedOrDelinquentProgramService
    * ELAProgressLevel
    * MathematicsProgressLevel
  * _StudentSchoolFoodServiceProgramAssociation_
    * SchoolFoodServiceProgramService
  * _StudentSection504ProgramAssociation_
    * Section504Disability
  * _StudentSpecialEducationProgramAssociation_
    * SpecialEducationSetting
    * Disability
    * SpecialEducationProgramService
    * SpecialEducationExitReason
  * _StudentTitleIPartAProgramAssociation_
    * TitleIPartAParticipant
    * TitleIPartAProgramService

* EducationOrganizations, minimally Schools and LocalEducationAgency(s), need
  to be created for the scope of the ODS.

* As being part of the key for SPA or SXPA entities, a Student record needs to
  be written before program assignment associations.

* Depending on policy, a StudentSchoolAssociation (SSA) may or may not be
  required prior to a SPA or SXPA being written for a specific student and
  school.

## Alternative Patterns for the Alternative and Supplemental Services Domain

There are three alternative patterns for using the Alternative and Supplemental
Services domain, as follows:

1. Use of a pre-defined StudentXxxProgramAssociation (SXPA) for Federal
programs, specifically for CTE, Homeless, Language Instruction, Migrant
Education, Neglected Or Delinquent, School Food Service, Special Education,
and Title I Part A programs. The attributes of these programs have been defined
to map to federal reporting requirements.
2. Use the Ed-Fi extension mechanism to define a new SXPA as a subclass of the
  GeneralStudentProgramAssociation and add attributes appropriate for that
  program.
3. For simple programs not requiring program-specific attributes, use the
  StudentProgramAssociation (SPA) to denote the assignment of students to
  the program.

For a specific Program, only one of these patterns is used, depending on
the requirements.
Alternatives 1 and 2 use the extension pattern shown in the figure below.
Note the diagram is expanded to depict selective multi-valued commons
defined in the entities.

![Alternative Patterns for the Alternative and Supplemental Services](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/v52/ModelReference_AlternativeAndSupplementalServicesSPAExtensionPattern_DSv52.jpg)

## Alternative and Supplemental Services Domain Anti-Patterns

An anti-pattern is an observed practice for a recurring situation that is
not recommended.

### Misuse of the StudentProgramAssociation

As noted above, the use of the StudentProgramAssociation (SPA) is meant to
associate students via a simple assignment to programs (not requiring program-specific
attributes).  An anti-pattern has been observed where both the SPA and an SXPA
(subclasses of the GeneralStudentProgramAssociation) are written for the same
program assignment to a student.  This pattern is incorrect and should not be
used. The intent is that there is only one SPA or one SXPA for each assignment of
a student to a specific program.

### Multi-Year StudentProgramAssociations or StudentXxxProgramAssociations

Public schools operate on a school year basis that defines the typical increment
of grade-level instruction.   Alternative or supplemental programs are offered
within the context of school years, and a student’s assignment to a program
occurs in the context of a school enrollment.

An anti-pattern is observed where student assignments to programs using the SPA
or SXPA span multiple school years. In these cases, the BeginDate reflects the
first assignment to the Program and the EndDate reflects the last day of
assignment, even if it ends several school years later.

The recommended best practice for multi-year participation in a program is to
end the SPA or SXPA at the end of each school year and create another for the
next school year.  A student should have minimally one SPA or SXPA per program
per school year.

## Alternative and Supplemental Services Domain Best Practices

The following best practices are organized by entity and association in the
Alternative and Supplemental Services domain.

### Program

The Program entity defines the programs which provide supplemental instruction,
training, services, or benefits to students by an education organization.
The following table summarizes the best practice use of the _Program_ attributes.

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| ProgramName (key)<br/>ProgramType (key)<br/>EntrEducationOrganization Date (key)<br/> |  | ProgramId<br/>ProgramSponsor<br/> | ProgramCharacteristic<br/>LearningStandard |

:::note Keys in reading the table and following ones:

* _Required_ attributes in Ed-Fi are hard constraints, meaning that a record or
    API payload will be rejected if the attribute is not present. These
    necessarily include key values.
* _Must Have_ attributes are those whose intended use of the entity requires
    them to be used, even if, upon creation, they may not be present.
* _Recommended_ attributes are those whose best practices encourage their use.
* _As Needed_ attributes are those that should be used when appropriate, based
    upon policy.
:::

<br/>
Business Rules that considered as best practices for the usage of the _Program_ are as follows

:::info

* A _Program_ is created for each designated program offered at an education
  organization.
* The _ProgramName_, as part of key, should be descriptive, popularly used and
  recognized, as well as unique. Assigned identifiers should be stored in
  the ProgramId attribute.
* _Program.EducationOrganization_ should be set to the education organization at
  the right level of granularity for each program offering. Typically, the
  _Program.EducationOrganization_ is at the LocalEducationAgency (LEA) level for
  programs offered across the district. For Programs that are only offered by
  a school, the _Program.EducationOrganization_ references the School. For
  Programs that are offered by an EducationServiceCenter (ESC), the
  _Program.EducationOrganization_ references that ESC.

:::
<br/>

### StaffProgramAssociation

The _StaffProgramAssociation_ indicates the staff assigned to a program, including
those providing services directly to students as part of the program.  An active
staff program assignment is one with a _BeginDate_ and no _EndDate_, meaning the
staff is still assigned to the program. The following table summarizes the
best practice use of the _StaffProgramAssociation_ attributes.

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| Staf (key)<br/>Program (key)<br/>BeginDate (key)<br/> | EndDate |  | StudentRecordAccess |

Business Rules that considered as best practices for the usage of the _StaffProgramAssociation_ are as follows
:::info

* A _StaffProgramAssociation_ is created for each staff assignment to a program.
* Minimally, one _StaffProgramAssociation_ is created for each assigned staff per
  school year.
* At any point in time, a staff should have no more than one active
  _StaffProgramAssociation_ for a single program associated with an education
  organization.
* The _EndDate_ of a _StaffProgramAssociation_ must be equal or after the _BeginDate_.

:::
<br/>

### GeneralStudentProgramAssociation

The _GeneralStudentProgramAssociation_ is the base abstract class for the subclasses
_StudentProgramAssociation_ (SPA) and all _StudentXxxProgramAssociations_ (SXPAs),
including those defined for the Federal programs and any custom extensions.
As such, the _GeneralStudentProgamAssociation_ defines the keys and common
attributes for the SPA and all predefined or extended SXPAs.

The following table summarizes the best practice use of the
_GeneralStudentProgramAssociation_ attributes that are inherited by the SPA and
the SXPA. The following table summarizes the best practice use of the
_GeneralStudentProgramAssociation_ attributes.

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| Student (key)<br/>Program (key)<br/>BeginDate (key)<br/>EducationOrganization (key)<br/> | EndDate<br/>ReasonExited |  | ServedOutsideOfRegularSession<br/>ProgramParticipationStatus |

<br/>
Business Rules that considered as best practices for the usage of the _GeneralStudentProgamAssociation_ are as follows

:::info

* An _SPA_ or an _SXPA_ is created for each student assignment to a program.
* Minimally, one _SPA_ or _SXPA_ is created for each assigned student per school year.
* At any point in time, a student should have no more than one active SPA or _SXPA_
  for a single program associated with an education organization.
* It is possible for a student to be assigned to a program in a school different
  than the student's primary school enrollment. Depending on policy, a secondary
  enrollment _StudentSchoolAssociation_ (SSA) may be required.

:::

For the _SPA_ or _SXPA_, the BeginDate and the _EndDate_ define the period of assignment
or participation in the program. As part of the key inherited from the
_GeneralStudentProgamAssociation_ each _SPA_ or _SXPA_ for a student must have a
_BeginDate_. An active program assignment is one with a _BeginDate_ and no
_EndDate_, meaning the student is still assigned and participating in the program.

:::info

* The _EndDate_ of a _SPA_ or _SXPA_ must be equal or after the _BeginDate_.
* If a student exits from a program during the school year and then is reassigned
  in the same program, multiple _SPA_ or SXPA records are created, one for each
  period of assignment and participation.
* Active program assignments at the same education organization should not overlap,
  meaning that prior enrollments should have an EndDate equal to or before the
  _BeginDate_ of the next.
* Multiple _SPA_ or _SXPA_ records for a student assigned to a program with the
  same education organization should not be combined, even if the _EndDate_ of
  one is the same as the _BeginDate_ of the next.
* If a _SPA_ or _SXPA_ has an _EndDate_, it should have _ReasonExited_ value.

:::

The _ProgramParticipationStatus_ common is used to track the student's participation
in the program, such as whether the student is deemed eligible, not eligible, or is
active in the program, or not. The _ParticipationStatus_ descriptor should be
customized to reflect the program statuses that are important to track. The dates of
student's _ParticipationStatus_ are reflected by a _StatusBeginDate_ and a _StatusEndDate_.
There is no requirement that a student only be designated a single _ParticipationStatus_
at a time, allowing flexibility in the use. A _ParticipationStatus_ with a _StatusBeginDate_
and no _StatusEndDate_ means the status is still active for that student.

:::info

* The _ProgramParticipationStatus.StatusEndDate_ of a _SPA_ or _SXPA_ must be equal or
  after the _ProgramParticipationStatus.StatusBeginDate_.
* The _ProgramParticipationStatus.StatusBeginDate_ and _ProgramParticipationStatus.StatusEndDate_
  may need to be contained within the _BeginDate_ and _EndDate_ of a _SPA_ or _SXPA_
  when the  _ParticipationStatus_ descriptor value is associated with a student's
  status during assignment to the program. The exception is when the _ParticipationStatus_
  descriptor value is associated with preceding activities such as evaluation or eligibility.

:::
<br/>

### StudentProgramAssociation (SPA)

For simple program assignments not requiring program-specific attributes, the _SPA_ is used
to denote the assignment of students to the program. By referring to different programs,
the _SPA_ may be used to denote assignment to many different programs.  Caution should be
noted in the use of the _StudentProgramAssociation.Service_ because the descriptor values
must cover all of the programs that use this pattern. The following table summarizes the
best practice use of the _SPA_ attributes.

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| Student**(key)<br/>Program** (key)<br/>BeginDate**(key)<br/>EducationOrganization** (key)<br/> | EndDate**<br/>ReasonExited** | ProgramParticipationStatus** | ServedOutsideOfRegularSession**<br/>Service |

** Indicates attributes inherited from the _GeneralStudentProgramAssociation_

:::info

* Since the Services descriptor must cover all uses of the _SPA_, the best practice is
  not to use the Services attribute of the _SPA_. An _SXPA_ (either in core or by extension)
  is typically used when the services provided to a student are specified.

:::
<br/>

### StudentCTEProgramAssociation

The _StudentCTEProgramAssociation_ denotes the career and technical education (CTE)
program(s) that a student participates in. The association supports the implementation
of the Perkins Career and Technical Education Act.

The _StudentCTEProgramAssociation_ inherits the attributes and associations of the
_GeneralStudentProgramAssociation_; as a result, the business rules above for the
_GeneralStudentProgramAssociation_ also apply. The following table summarizes the
best practice use of the _StudentCTEProgramAssociation_ attributes.

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| Student**(key)<br/>Program** (key)<br/>BeginDate**(key)<br/>EducationOrganization** (key)<br/> | EndDate**<br/>ReasonExited**<br/>TechnicalSkillsAssessment<br/>CTEProgramService | ProgramParticipationStatus**<br/>PrivateCTEProgram | ServedOutsideOfRegularSession**<br/>NonTraditionalGenderStatus |

** Indicates attributes inherited from the _GeneralStudentProgramAssociation_

Business rules that considered as best practices for the usage of the
_StudentCTEProgramAssociation_ are shown below. Note that the business rules do
not deal with the specific rules of the Federal program but relate to the use
of the _StudentCTEProgramAssociation_ to support the implementation of the program.

:::info

* The _CTEProgramService.ServiceEndDate_ must be equal or after the
  _CTEProgramService.ServiceBeginDate_ for a specific _CTEProgramService_.
* The _CTEProgramService.ServiceBeginDate_ and _CTEProgramService.ServiceEndDate_ must
  be contained within the _BeginDate_ and _EndDate_ of a _StudentCTEProgramAssociation_.

:::
<br/>

### StudentHomelessProgramAssociation

The _StudentHomelessProgramAssociation_ indicates the homeless program(s) that a
student from which the student receives services.  The association supports the
implementation of the McKinney-Vento Homeless Assistance Act.

The _StudentHomelessProgramAssociation_ inherits the attributes and associations
of the _GeneralStudentProgramAssociation_; as a result, the business rules above for
the _GeneralStudentProgramAssociation_ also apply.

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| Student**(key)<br/>Program** (key)<br/>BeginDate**(key)<br/>EducationOrganization** (key)<br/> | EndDate**<br/>ReasonExited**<br/>HomelessPrimaryNighttimeResidence<br/>HomelessUnaccompaniedYouth<br/>HomelessProgramService | ProgramParticipationStatus**<br/>PrivateCTEProgram | ServedOutsideOfRegularSession**<br/>AwaitingFosterCare |

** Indicates attributes inherited from the _GeneralStudentProgramAssociation_

Business rules that considered as best practices for the usage of the
_StudentHomelessProgramAssociation_ are shown below. Note that the business rules
do not deal with the specific rules of the Federal program but relate to the use
of the _StudentHomelessProgramAssociation_ to support the implementation of the program.

:::info

* The _HomelessProgramService.ServiceEndDate_ must be equal or after the
  _HomelessProgramService.ServiceBeginDate_ for a specific _HomelessProgramService_.
* The _HomelessProgramService.ServiceBeginDate_ and _HomelessProgramService.ServiceEndDate_
  must be contained within the _BeginDate_ and _EndDate_ of a _StudentHomelessProgramAssociation_.

:::
<br/>

### StudentLanguageInstructionProgramAssociation

The _StudentLanguageInstructionProgramAssociation_ indicates the language instruction program(s)
for English learners and immigrant students from which the student receives services. The
association supports implementation of Title III Language Instruction for Limited English
Proficient and Immigrant Students.

The _StudentLanguageInstructionProgramAssociation_ inherits the attributes and associations of
the _GeneralStudentProgramAssociation_; as a result, the business rules above for the
_GeneralStudentProgramAssociation_ also apply. The following table summarizes the
best practice use of the _StudentLanguageInstructionProgramAssociation_ attributes.

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| Student**(key)<br/>Program** (key)<br/>BeginDate**(key)<br/>EducationOrganization** (key)<br/> | EndDate**<br/>ReasonExited**<br/>EnglishLanguageProficiencyAssessment<br/>EnglishLearnerParticipation<br/>LanguageInstructionProgramService | ProgramParticipationStatus**<br/>Dosage | ServedOutsideOfRegularSession** |

** Indicates attributes inherited from the _GeneralStudentProgramAssociation_

Business rules that considered as best practices for the usage of the
_StudentLanguageInstructionProgramAssociation_ are shown below. Note that the business rules do
not deal with the specific rules of the Federal program but relate to the use of
the _StudentLanguageInstructionProgramAssociation_ to support the implementation of
the program.

:::info

* The _LanguageInstructionProgramService.ServiceEndDate_ must be equal or after the
  _LanguageInstructionProgramService.ServiceBeginDate_ for a specific _LanguageInstructionProgramService_.
* The _LanguageInstructionProgramService.ServiceBeginDate_ and
  _LanguageInstructionProgramService.ServiceEndDate_ must be contained within the
  _BeginDate_ and _EndDate_ of a StudentLanguageInstructionProgramAssociation.

:::
<br/>

### StudentMigrantEducationProgramAssociation

The _StudentMigrantEducationProgramAssociation_ indicates the migrant instruction program(s)
from which the student receives services. The association supports implementation of the
Title I, Part C: Migrant Education Program (MEP).

The _StudentMigrantEducationProgramAssociation_ inherits the attributes and associations of
the GeneralStudentProgramAssociation; as a result, the business rules above for the
_GeneralStudentProgramAssociation_ also apply.

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| Student**(key)<br/>Program** (key)<br/>BeginDate**(key)<br/>EducationOrganization** (key)<br/> | EndDate**<br/>ReasonExited**<br/>PriorityForServices<br/>QualifyingArrivalDate<br/>EligibilityExpirationDate<br/>ContinuationOfServicesReason<br/>MigrantEducationProgramService | ProgramParticipationStatus**<br/>LastQualifyingMove<br/>USInitialEntry<br/>USMostRecentEntry<br/>USInitialSchoolEntry<br/>StateResidencyDate | ServedOutsideOfRegularSession** |

** Indicates attributes inherited from the _GeneralStudentProgramAssociation_

Business rules that considered as best practices for the usage of the
_StudentMigrantEducationProgramAssociation_ are shown below. Note that the business
rules do not deal with the specific rules of the Federal program but relate to the
use of the  StudentMigrantEducationProgramAssociation to support the implementation
of the program.

:::info

* The _MigrantEducationProgramService.ServiceEndDate_ must be equal or after the
  _MigrantEducationProgramService.ServiceBeginDate_ for a specific
  _MigrantEducationProgramService_.
* The _MigrantEducationProgramService.ServiceBeginDate_ and
  _MigrantEducationProgramService.ServiceEndDate_ must be contained within the
  _BeginDate_ and _EndDate_ of a _StudentMigrantEducationProgramAssociation_.

:::
<br/>

### StudentNeglectedOrDelinquentProgramAssociation

This _StudentNeglectedOrDelinquentProgramAssociation_ indicates the Neglected or
program(s) from which the student receives services. The association supports
the implementation of the Title I, Part D program for the Prevention and
Intervention Programs for Children and Youth Who Are Neglected, Delinquent or
At Risk.

The _StudentNeglectedOrDelinquentProgramAssociation_ inherits the attributes and
associations of the _GeneralStudentProgramAssociation_; as a result, the business
rules above for the _GeneralStudentProgramAssociation_ also apply. The following table summarizes the
best practice use of the _StudentNeglectedOrDelinquentProgramAssociation_ attributes.

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| Student**(key)<br/>Program** (key)<br/>BeginDate**(key)<br/>EducationOrganization** (key)<br/> | EndDate**<br/>ReasonExited**<br/>NeglectedOrDelinquentProgram<br/>ELAProgressLevel<br/>MathematicsProgressLevel<br/>NeglectedOrDelinquentProgramService | ProgramParticipationStatus** | ServedOutsideOfRegularSession** |

** Indicates attributes inherited from the _GeneralStudentProgramAssociation_

Business rules that considered as best practices for the usage of the
_StudentNeglectedOrDelinquentProgramAssociation_ are shown below. Note that
the business rules do not deal with the specific rules of the Federal program but
relate to the use of the _StudentNeglectedOrDelinquentProgramAssociation_ to support
the implementation of the program

:::info

* The _NeglectedOrDelinquentProgramService.ServiceEndDate_ must be equal or after
  the _NeglectedOrDelinquentProgramService.ServiceBeginDate_ for a specific
  _NeglectedOrDelinquentProgramService_.

* The _NeglectedOrDelinquentProgramService.ServiceBeginDate_ and
  _NeglectedOrDelinquentProgramService.ServiceEndDate_ must be contained within
  the _BeginDate_ and _EndDate_ of a _StudentNeglectedOrDelinquentProgramAssociation_.

:::
<br/>

### StudentSchoolFoodServiceProgramAssociation

The _StudentSchoolFoodServiceProgramAssociation_ indicates the school food service
program from which the student may receive free or reduced food services. The
association supports the implementation of the National School Lunch Program,
School Breakfast Program, and Special Milk Program.

The _StudentSchoolFoodServiceProgramAssociation_ inherits the attributes and associations
of the _GeneralStudentProgramAssociation_; as a result, the business rules above
for the _GeneralStudentProgramAssociation_ also apply. The following table summarizes the
best practice use of the _StudentSchoolFoodServiceProgramAssociation_ attributes.

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| Student**(key)<br/>Program** (key)<br/>BeginDate**(key)<br/>EducationOrganization** (key)<br/> | EndDate**<br/>ReasonExited**<br/>DirectCertification<br/>SchoolFoodServiceProgramService | ProgramParticipationStatus** | ServedOutsideOfRegularSession** |

** Indicates attributes inherited from the _GeneralStudentProgramAssociation_

Business rules that considered as best practices for the usage of the
_StudentSchoolFoodServiceProgramAssociation_ are shown below. Note that the business rules do
not deal with the specific rules of the Federal program but relate to the use of
the _StudentSchoolFoodServiceProgramAssociation_ to support the implementation of the
program.

:::info

* The _SchoolFoodServiceProgramService.ServiceEndDate_ must be equal or after the
_SchoolFoodServiceProgramService.ServiceBeginDate_ for a specific _SchoolFoodServiceProgramService_.

* The _SchoolFoodServiceProgramService.ServiceBeginDate_ and
  _SchoolFoodServiceProgramService.ServiceEndDate_ must be contained within the
  _BeginDate_ and _EndDate_ of a _StudentSchoolFoodServiceProgramAssociation_.

:::
<br/>

### StudentSection504ProgramAssociation

The _StudentSection504ProgramAssociation_ indicates the students that qualify for
special disability accommodation per Section 504 of the Rehabilitation Act of 1973.

The _StudentSection504ProgramAssociation_ inherits the attributes and associations of
the _GeneralStudentProgramAssociation_; as a result, the business rules above for the
GeneralStudentProgramAssociation also apply. The following table summarizes the
best practice use of the _StudentSection504ProgramAssociation_ attributes.

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| Student**(key)<br/>Program** (key)<br/>BeginDate**(key)<br/>EducationOrganization** (key)<br/>Section504Eligibility<br/> | EndDate**<br/>ReasonExited**<br/>Section504DisabilityType | ProgramParticipationStatus**<br/>AccommodationPlan<br/>Section504MeetingDate<br/>Section504EligibilityDecisionDate | ServedOutsideOfRegularSession** |

** Indicates attributes inherited from the _GeneralStudentProgramAssociation_

Business rules that considered as best practices for the usage of the
_StudentSection504ProgramAssociation_ are shown below. Note that the
business rules do not deal with the specific rules of the Section 504
Federal regulations but relate to the use of the
_StudentSection504ProgramAssociation_ to support the implementation of
the program.

:::info

* If the _StudentSection504ProgramAssociation.AccommodationPlan_ is TRUE
  the _StudentSection504ProgramAssociation.Section504Eligibility_ must be
  TRUE.
* The _StudentSection504ProgramAssociation.Section504MeetingDate_ or the
  _StudentSection504ProgramAssociation.Section504EligibilityDate_ may precede,
  equal or follow the _StudentSection504ProgramAssociation.BeginDate_.

:::
<br/>

### StudentSpecialEducationProgramAssociation

The _StudentSpecialEducationProgramAssociation_ indicates the special education
program(s) from which students with disabilities receive services. The
association supports the implementation of the Individuals with Disabilities
Education Act (IDEA).

The _StudentSpecialEducationProgramAssociation_ (SSEPA) inherits the attributes
and associations of the _GeneralStudentProgramAssociation_; as a result, the
business rules above for the _GeneralStudentProgramAssociation_ also apply. The
following table summarizes the best practice use of the
_StudentSpecialEducationProgramAssociation_ attributes.

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| Student**(key)<br/>Program** (key)<br/>BeginDate**(key)<br/>EducationOrganization** (key)<br/> | EndDate**<br/>ReasonExited**<br/>IdeaEligibility<br/>SpecialEducationSetting<br/>Disability<br/>MultiplyDisabled<br/>SpecialEducationExitDate<br/>SpecialEducationExitReason<br/>SpecialEducationProgramService<br/>SpecialEducationHours PerWeek<br/>SchoolHoursPerWeek<br/>LastEvaluationDate<br/>IEPReviewDate<br/>IEPBeginDate<br/>IEPEndDate | ProgramParticipationStatus**<br/>MedicallyFragile<br/>ServiceProvider | ServedOutsideOfRegularSession**<br/>SpecialEducationExitExplained |

** Indicates attributes inherited from the _GeneralStudentProgramAssociation_

Business rules that considered as best practices for the usage of the
_StudentSpecialEducationProgramAssociation_ are shown below. Note that
the business rules do not deal with the specific rules of the Federal program
but relate to the use of the _StudentSpecialEducationProgramAssociation_ to support
the implementation of the program.

:::info

* The _SpecialEducationProgramService.ServiceEndDate_ must be equal or after the
  _SpecialEducationProgramService.ServiceBeginDate_ for a specific
  _SpecialEducationProgramService_.
* The _SpecialEducationProgramService.ServiceBeginDate_ and
  _SpecialEducationProgramService.ServiceEndDate_ must be contained within the
  _BeginDate_ and _EndDate_ of a _StudentSpecialEducationProgramAssociation_.

:::
<br/>

A separate _StudentSpecialEducationProgramAssociation_ (SSEPA) should be created
when the student’s participation in the Special Education program fundamentally
changes. This can occur when the student is diagnosed with a different or
additional disability, when the special education services setting or dosage
change, and/or when a new Individualized Education Program (IEP) is defined.
This is accomplished by writing an _EndDate_ and an associated _ReasonExited_ to
indicate a change in program attributes.  A new
_StudentSpecialEducationProgramAssociation_ is created with the new attribute
values and with the same _BeginDate_.

:::info

* Recommended attributes whose change triggers a new _StudentSpecialEducationProgramAssociation_
  are: _IdeaEligibility_, _SpecialEducationSetting_, _Disability_, _SpecialEducationHoursPerWeek_,
  or _IEPBeginDate_.

:::
<br/>

Note that a new _SSEPA_ is not needed when only the services that the student
receives change, because these can be indicated using the _SpecialEducationProgramService_
collection. However, when the services change, it often occurs when related special education
program characteristics may change and trigger a new _SSEPA_.

The _SSEPA_ attribute _SpecialEducationExitDate_, denotes the date the student exited the
special education program and stopped receiving special education services altogether.
Contrast this with the (inherited) _EndDate_ of the _SSEPA_ which denotes the end of the _SSEPA_
which may the same as exiting the special education program or may be the end of an _SSEPA_
where the student’s situation has changed or at the end of a school year, and be
followed with a new _SSEPA_. An _SSEPA_ with an _EndDate_ but a null _SpecialEducationExitDate_
means the _SSEPA_ record is closed, but the student is still participating in the special
education program.

:::info

* The _EndDate_ of the _SSEPA_ must be before or equal to the _SpecialEducationExitDate_, if
  it exists in the _SSEPA_.
* The attribute _SpecialEducationExitReason_ descriptor value must be entered if there
  is a _SpecialEducationExitDate_.

:::
<br/>

The _SSEPA_ attributes for _IEPReviewDate_, _IEPBeginDate_, and _IEPEndDate_ relate to the
dates associated with the most recent IEP. The semantics of an _IEPBeginDate_ with a
null _IEPEndDate_ means that the IEP is still active. When a new IEP is created, the
EndDate and the _IEPEndDate_ of the current _SSEPA_ is written and the _ServiceEndDate_
set for any active services. A new _SSEPA_ is created with new _BeginDate_,
_IEPBeginDate_, and _ServiceBeginDates_, as appropriate.

:::info

* The _IEPEndDate_ must be equal or after the _IEPBeginDate_.
* The _SpecialEducationProgramService.ServiceEndDate_ must be before or equal to the
  EndDate and the _SpecialEducationExitDate_, if present.

:::
<br/>

### StudentTitleIPartAProgramAssociation

The _StudentTitleIPartAProgramAssociation_ indicates the type of Title I Part A programs
and services that a student receives. The association supports the implementation of
Title I, Part A: Improving Basic Programs Operated By Local Educational Agencies.

The _StudentTitleIPartAProgramAssociation_ inherits the attributes and associations of
the _GeneralStudentProgramAssociation_; as a result, the business rules above for the
_GeneralStudentProgramAssociation_ also apply. The following table summarizes the
best practice use of the _StudentTitleIPartAProgramAssociation_ attributes.

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| Student**(key)<br/>Program** (key)<br/>BeginDate**(key)<br/>EducationOrganization** (key)<br/> | EndDate**<br/>ReasonExited**<br/>TitleIPartAParticipant<br/>TitleIPartAProgramService | ProgramParticipationStatus** | ServedOutsideOfRegularSession** |

** Indicates attributes inherited from the _GeneralStudentProgramAssociation_

Business rules that considered as best practices for the usage of the
_StudentTitleIPartAProgramAssociation_ are shown below. Note that the business
rules do not deal with the specific rules of the Federal program but relate
to the use of the _StudentTitleIPartAProgramAssociation_ to support the
implementation of the program.

:::info

* The _TitleIPartAProgramService.ServiceEndDate_ must be equal or after the
  _TitleIPartAProgramService.ServiceBeginDate_ for a specific
  _TitleIPartAProgramService_.
* The _TitleIPartAProgramService.ServiceBeginDate_ and _TitleIPartAProgramService.ServiceEndDate_
  must be contained within the _BeginDate_ and _EndDate_ of a _StudentTitleIPartAProgramAssociation_.

:::
<br/>

A separate _StudentTitleIPartAProgramAssociation_ should be created when the student’s
participation in the type of Title I Part A program changes as denoted by the
_TitleIPartAParticipant_ descriptor value. This is accomplished by writing an
_EndDate_ and an associated _ReasonExited_ to indicate a change in program attributes.
A new _StudentTitleIPartAProgramAssociation_ is created with the new attribute
values and with the same _BeginDate_.

:::info

* Recommended attributes whose change triggers a new
  _StudentTitleIPartAProgramAssociation_ is _TitleIPartAParticipant_.

:::
<br/>

Note that a new _StudentTitleIPartAProgramAssociation_ is not needed when the
services that the student receives change, because these can be indicated
using the _TitleIPartAProgramService_ collection.
