---
sidebar_position: 4
---

# Enrollment Domain - Best Practices

## Definitions and Key Concepts

Enrollment is the process of officially signing a student to attend and receive
instruction in a school. Enrollment is a mature, well-documented process in
schools that is well supported by Student Information Systems (SIS’s).

Enrollment processes differ from state to state, and even across local education
agencies (LEAs), as laws, policies and procedures are tailored to meet local
operational needs. These differences are accommodated by a SIS through the entry
of different information, with customizable "codes" (termed "descriptors" in
Ed-Fi), and with different workflows and business rules.

Ed-Fi provides a standard set of entities with attributes and associations that
model the most common and most pertinent data associated with student
enrollment. In Ed-Fi, customization of the enrollment data to match the local
conventions in the SIS is accomplished through selective use of optional
attributes and associations; customization of the set of allowable descriptor
values; extensions to the enrollment model; and usage conventions and best
practices like this documentation.

Necessarily, the enrollment process also includes the exit or withdrawal of a
student from a school, grade level, and for a school year because there are many
different situations where a student ends an enrollment. It is important to
capture the appropriate reasons for exit/withdrawal.

## Enrollment Process Use Cases

The various use cases associated with student enrollment process span several
Ed-Fi domains as shown below.

| Primary Use Cases | Ed-Fi Domains Needed to be Utilized for the Use Case |
| --- | --- |
| Application process requiring acceptance | Currently not supported in the core model. Applications are part of the _Educator Preparation_ domain which is an extension created and shared by Ed-Fi Alliance. |
| _Registration for school enrollment<br/>_   Exit or withdrawal from school<br/>_Transfer to/from another school<br/>_   Enrolling from the same (or feeder) school through normal promotion<br/>*   Enrolling in a school as a displaced student because of a crisis | _Student Identification and Demographics<br/>_   Student Health<br/>*   Enrollment |
| Evaluation for participation in a program | Student Program Evaluation |
| _Enrollment for participation in program<br/>_   Exit or withdrawal from a program | Alternative and Supplemental Services |
| _Assignment to a specific section for a course<br/>_   Exit from a specific section<br/>*   Transfer to another section of the same course | Teaching and Learning |

This article on the best practices relating the Enrollment domain has specific
focus on the following entities as parts of the domain

* The _StudentSchoolAssociation_ (SSA) entity, which represents a student's
    enrollment in a school.
* The _StudentEducationOrganizationResponsibilityAssociation_ (SEORA) entity,
    which represents an EducationOrganization's responsibility for a student.
* _StudentTransporation_ entity recording the eligibility and bus route
    details assigned to a student for transport to/from school.
* _CrisisEvent_ entity that holds data about each identified crisis that
    displaces impacted students into other schools.

Please refer the best practices documentation of related domains for use cases
listed above that will require Ed-Fi domains other than Enrollment domain.

### Crisis Event Related Use Cases

When a crisis event impacts students, the education agency, typically the State
Education Agency (SEA), determines the requirement to track students who are
displaced as a result.  This determination is accomplished at the time that
policies and guidance are provided to schools to support displaced students
associated with a specific crisis event.  Displaced students may be:

* From another state and newly enrolled in a school.
* Within the state but enrolling in a new school.
* Personally displaced but remaining in the same school may be included, as
    determined by SEA policies.

The determination that an enrolled student is displaced by a crisis event is
recognized during the enrollment process at the new school.

### Student Transportation Related Use Cases

The eligibility for a student to receive transportation services according to
the criteria of the state and the district are typically determined at
enrollment time (or pre-enrollments of they are used).  Depending on the
location(s) for pickup and drop-off, the student is assigned to a bus and bus
route.  The eligibility and bus route information for a student is typically
captured in an automated system, such as:

* Bus routing and planning software
* Student information system with a transportation module
* Other application or web site

From these systems, the student transportation data will flow into the Ed-Fi
API/ODS.  Depending on the source system, new API or batch interfaces may need
to be developed.

There are several possible uses of student transportation data from the ODS that
includes:

* Analyze eligibility criteria met by the student population.
* Average number of riders assigned to be transported as a percentage of total
    district membership.
* Riders assigned to be transported as a percentage of district membership by
    category or demographics.
* Combined with financial data for total expenditures for student
    transportation by student, or category.

## Ed-Fi Prerequisites for Writing Enrollment Domain Entities

The Enrollment domain has dependencies on other data that should be entered into
the Ed-Fi API/ODS prior to entering enrollment information, as follows:

* ODS/API setup needed for each school year. The best practice convention
    suggests that enrollments recorded in the SSA must be written for each
    school year.
* Descriptor values need to be loaded. The Enrollment domain has dependency on
    several sets of descriptors. Most of these will be custom descriptors that
    are mapped to current operational enrollment practices and reporting. In
    most cases they will match the code lists already set up in the SIS.
    Followings are the list of these descriptors.

_StudentSchoolAssociation_: EntryType, EntryGradeLevel, EntryGradeLevelReason, ResidencyStatus, ExitWithdrawType, EducationPlan, GraduationPlanType

_StudentEducationOrganizationResponsibilityAssociation_: Responsibility

_StudentTransportation_: TransportationPublicExpenseEligibilityType, TransportationType, BusRoute, TravelDaysofWeek, TravelDirection

_CrisisEvent_: CrisisType

* EducationOrganizations, minimally Schools and LocalEducationAgency(s), need
    to be created for the scope of the ODS.
* Calendar(s) for the various Schools and GradeLevel(s) needs to be created.
* Graduation Plan(s) for the various tracks for graduation needs to be
    created.
* A Student record needs to be written before enrollment data in the
    StudentSchoolAssociation

## Enrollment Domain Anti-Patterns

An _anti-pattern_ is a practice Ed-Fi Alliance has observed for a recurring
situation that is not recommended.

### Fictitious Schools

NCES defines a [public
school](https://nces.ed.gov/Pubs2003/100_largest/meth_def.asp) as an institution
that provides educational services and...

* has one or more grade groups (pre-kindergarten through grade 12) or is
    ungraded;
* has one or more teachers to give instruction;
* is located in one or more buildings or sites;
* has an assigned administrator;
* receives public funds as primary support; and
* is operated by an education agency.

This definition does not exclude _virtual schools_ (even though it is in
conflict with the third criteria), nor does it exclude _specialized schools_
such as career and technical education (CTE) schools, special education schools,
or alternative education schools.

However, a common anti-pattern is observed where _fictitious_ schools are
created to track students’ participation in a specialized _program_ that is
administered as part of a recognized school. These fictitious schools do not
have the totality of administration that is necessary for recognized schools.
While there are gray areas, these are better characterized in Ed-Fi as a
Program.

A confusing factor is that there exist legitimate virtual schools, but also
specialized virtual programs. There are special education schools and there are
special education programs. There are CTE schools and CTE programs; and so
forth.

An acid test evaluating whether to characterize as a _School_ or a _Program_ is
whether the school is recognized by the state as a school (and appears in state
directories) and is reported for Federal accountability as a school. If not, it
is better characterized in Ed-Fi as a Program. A school identifier being
assigned is not sufficient evidence of a legitimate school.

### Multi-Year Enrollments

Public schools operate on a _school year_ basis that defines the typical
increment of grade-level instruction.

An anti-pattern is observed where the StudentSchoolAssociation reflects student
enrollments that span multiple school years. This practice does not capture the
proper EntryDate. For example, if a student enrolled in 9th grade in 2020, their
11th grade 2022 enrollment would still report their original 2020 9th grade
EntryDate. A student should have minimally one enrollment SSA per SchoolYear and
minimally one SSA per GradeLevel.

## Best Practices in Using the Enrollment Domain

The following best practices are organized by entity in the enrollment domain.

### Best Practices Related to the StudentSchoolAssociation (SSA)

The _SSA_ is the primary entity associated with school enrollment, associating
the student with the school in which a student is enrolled. Note that attributes
of _Student_ and the _StudentEducationOrganization_ are also typically written
at the time of enrollment.

_Best Practices for the use of the SSA Attributes_

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| Student (key)<br/><br/>School (key)<br/><br/>EntryDate (key)<br/><br/>EntryGradeLevel | EntryType<br/><br/>PrimarySchool<br/><br/>SchoolYear<br/><br/>EnrollmentType<br/><br/>ResidencyStatus<br/><br/>ExitWithdrawDate<br/><br/>ExitWithdrawType<br/><br/>Calendar<br/><br/>FullTimeEquivalency | EntryGradeLevelReason<br/><br/>RepeatGradeIndicator<br/><br/>ClassOfSchoolYear<br/><br/>GraduationPlan | EducationPlan<br/><br/>AlternativeGraduationPlan<br/><br/>EmployedWhileEnrolled<br/><br/>SchoolChoice<br/><br/>SchoolChoiceBasis<br/><br/>TermCompletionIndicator<br/><br/>NextYearSchool<br/><br/>NextYearGradeLevel |

Keys in reading the table:

* Required attributes in Ed-Fi are hard constraints, meaning that a record or
    API payload will be rejected if the attribute is not present. These
    necessarily include key values.
* Must Have attributes are those whose intended use of the entity requires
    them to be used, even if, upon creation, they may not be present.
* Recommended attributes are those whose best practices encourage their use.
* As Needed attributes are those that should be used when appropriate, based
    upon policy.

Business Rules that considered as best practices for the usage of the _SSA_ as
follows

:::info

*SSA*s are created for each student enrollment per school.

* Minimally, one _SSA_ is created for each enrolled student per school year.
* At any point in time, a student should have no more than one active _SSA_ for
  a single school.
* If a student may be enrolled in multiple schools at the same time, the student
  will have multiple _SSA_s, one with each school. In these cases, the
  _PrimarySchool_ attribute should indicate the primary enrollment.
* A student should not have more than one _PrimarySchool_ enrollment at any
  point in time.
* A separate _SSA_ should be created when a student’s enrollment status
  fundamentally changes. The recommended attributes whose change would trigger a
  new SSA are _SchoolYear, GradeLevel, PrimarySchool, ResidencyStatus,
  EnrollmentType, FullTimeEquivalency, EntryType_, and _Calendar_ reference.
* An _SSA_ should only be deleted if it is a mistake. Deletion of the _SSA_
* should not be used for no shows (see below).

:::

For the _StudentSchoolAssociation_, the _EntryDate_ and the _ExitWithdrawDate_
define the period of enrollment. As part of the key for the _SSA_, each _SSA_
for a student and school must have an _EntryDate_. An _active_ enrollment _SSA_
is one with an _EntryDate_ and no _ExitWithdrawDate_, meaning the student is
still enrolled.

:::info

* The _ExitWithdrawDate_ must be equal or after the _EntryDate_ of an _SSA_.
* If a student withdraws from a school during the school year and then
  re-enrolls in the same school, multiple _SSA_ records are created, one for
  each period of enrollment.
* Active enrollments at the same school should not overlap, meaning that prior
  enrollments should have an _ExitWithdrawDate_ equal to or before the
  _EntryDate_ of the next.
* Multiple _SSA_ records for a student at a school should not be combined, even
  if the _ExitWithdrawDate_ of one _SSA_ is the same as the _EntryDate_ of the
  next _SSA_.

:::

The _EntryType_ and _ExitWithdrawType_ descriptors are used to capture the
important circumstances for a student’s enrollment entry and exit. The set of
descriptor values should reflect operationally the codes captured at the time
enrollment entry and exit.

:::info

* Every _SSA_ should have an _EntryDate_ and an _EntryType_ value.
* If the _SSA_ has an _ExitWithdrawDate_, it should have an _ExitWithdrawType_
  value.
* If an enrollment is a no show, meaning that the student enrolled and then
  never attended the school, the _SSA_ should be updated with an
  _ExitWithdrawDate_ of when the no show was realized according to policy, and
  the _ExitWithdrawType_ reflect an appropriate descriptor value indicating a no
  show.
* School year completers, who were enrolled through the last day of the school
  year, should have their _SSA_ updated with an _ExitWithdrawDate_ as the last
  day of school, and an appropriate _ExitWithdrawType_ descriptor value
  indicating successful (or unsuccessful) completion of the grade, graduation,
  etc.
* After all the updates to the Ed-Fi API/ODS are made for the end of the school
  year, there should be no _SSA_ without an _ExitWithdrawDate_ and an
  _ExitWithdrawType_.

:::

There are additional attributes of the _SSA_ where best practices indicate the
attribute must be used, as follows.

:::info

* Use the _ResidencyStatus_ descriptor to record the location of a student’s legal
  residence with respect to the boundaries of the school being enrolled in; for
  example, within the school boundaries, outside the school boundaries but in
  the district boundaries, outside the district boundaries but within the state,
  etc.
* _FullTimeEquivalency_ represents whether the student’s enrollment to the
  school for instruction and services is considered full time or some lesser
  portion. Use the _FullTimeEquivalency_ value to denote the planned level of
  instruction and services as defined by policy (full time, half time, etc.) for
  the student’s enrollment type and grade level. Note this is for what is
  planned, rather than reporting a high-precision measure based upon minutes of
  instruction.
* Use the _EnrollmentType_ descriptor to denote distinct types of primary
  enrollments (e.g., general instruction, provisional, summer school, etc.) and
  secondary enrollments (e.g., special services, supplemental, etc.), as defined
  by policy.
* Provide a reference to the school _Calendar_ the student is assigned to
  specify the granular definition of the calendar the student will be following.

:::

The _Student_ and _SEOA_ are important companions to the _SSA_. The Student
entity captures identity information and the _SEAO_ holds important demographics
and student characteristics.

:::info

* Before an _SSA_ is written, the _Student_ record must be created or updated to
  reflect the identity information at the time of enrollment.
* When an _SSA_ is written, the _SEOA_ should be subsequently created or updated
  to reflect the demographics and student characteristics at the time of
  enrollment.

:::

### Best Practices Related to the StudentEducationOrganizationResponsibilityAssociation (SEORA)

The StudentEducationOrganizationResponsibilityAssociation (SEORA) indicates a
relationship between a student and an education organization other than an
enrollment relationship, and generally indicates some kind of accountability or
responsibility of the education organization for the student. The kind of
responsibility is specified in the Responsibility descriptor value according to
policy.

_Best Practices _for the use of the_
StudentEducationOrganizationResponsibilityAssociation Attributes_

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| Student (key)<br/><br/>EducationOrganization (key)<br/><br/>Responsibility<br/><br/>BeginDate | EndDate |     |     |

Business Rules that considered as best practices for the usage of the _SEORA_ as
follows

:::info

* A _SEORA_ is written when the responsibility for a student is a different
  education organization than the enrollment school in the _SSA_.
* The _BeginDate_ and _EndDate_ of the _SEORA_ should be informed by the
  _EntryDate_ and _ExitWithdrawDate_ of a student’s _SSA_(s). There may be
  circumstances when they may be legitimately different.

:::

### Best Practices Related to StudentTransportation

The StudentTransportation entity captures a student’s eligibility and specific
transportation arrangements to/from school.

_Best Practices _for the use of the StudentTransportation_ Attributes_

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| Student (key)<br/><br/>TransportationEducationOrganization (key) | TransportationPublicExpenseEligibilityType | TransportationType<br/><br/>SpecialAccommodationRequirements<br/><br/>StudentBusDetails (common) |     |

Business Rules that considered as best practices for the usage of
the _StudentTransportation_ as follows

:::info

* The _TransportationEducationOrganization_ (the education organization
  accountable for managing the student’s transportation to/from school) may
  be different from the student’s enrolled school in the _SSA_.
* A _StudentTransportation_ record should only be written if the student has an
  _SSA_ and/or a student program association with the school the student is being
  transported to/from.
* Use the _TransportationEducationOrganization_ to specify the Local
  Education Organization (LEA) responsible for a student’s transportation.
* Use the _TransportationPublicExpenseEligibilityType_ descriptor to specify
  the student’s eligibility for transportation according to policy.

:::

### Best Practices Related to CrisisEvent

The crisis event data model is used to track displaced students that are
educationally impacted by crises, such as natural disasters or emergencies. The
_CrisisEvent_ entity is created to hold data about each identified crisis that
displaces impacted students. The identification of specific displaced students
is made using the common _DisplacedStudent_ in the
_StudentEducationOrganizationAssociation_.

_Best Practices _for the use of the CrisisEvent_ Attributes_

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| CrisisEventName (key) | CrisisType<br/><br/>CrisisStartDate<br/><br/>CrisisEndDate | CrisisDescription |     |

Business Rules that considered as best practices for the usage of the
CrisisEvent as follows

:::info

* The _CrisisEvent_ entity should be written upon recognition (according to
  policy) as potentially resulting in displaced students. Typically, the State
  Education Agency (SEA), determines the requirement to track students who are
  displaced at the time that policies and guidance are provided to schools to
  support displaced students associated with a specific crisis event.
* The _CrisisName_ should be thoughtfully constructed to ensure past and future
  uniqueness. For example, “Downtown Tornado” would not be unique if there a
  second tornado in the same area; “Hurricane Katrina 2005” would be a better
  name, since a storm name is only used once in a year. Consider including
  information on the location, type of crisis, and date in the name.
* For the _CrisisType_ descriptor values, use those defined by the Federal
  Emergency Management Agency (FEMA) for different types of natural and man-made
  hazards.
* The _BeginDate_ of the _CrisisEvent_ is the first date the crisis could
  potentially displace students. In many cases, it is the date the crisis
  occurred. However, the _BeginDate_ could be different, for example if
  evacuation orders are implemented in anticipation of a crisis.
* The _EndDate_ of the _CrisisEvent_ designates when the crisis ceases to
  displace students. Students who may still be designated as being displaced on
  that date should be reevaluated as to whether the student has actually been
  relocated.
* During the enrollment process of displaced students, the _SEOA_ information
  of the _DisplacedStudent_ should be written referencing the appropriate
  _CrisisEvent_.

:::
