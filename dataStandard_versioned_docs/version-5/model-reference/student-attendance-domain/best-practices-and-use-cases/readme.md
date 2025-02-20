---
hide_table_of_contents: true
---

# Student Attendance Domain - Best Practices and Use Cases

## Definition and Key Concepts

Research shows that student attendance is an important factor in student
achievement. Excessive or chronic student absences negatively impact student
achievement because of the lost opportunities to learn. [High quality and timely attendance data](https://nces.ed.gov/pubs2009/attendancedata/chapter1a.asp) is needed to:

* Support research on the near term and long term impacts of chronic absenteeism.
* Analyze student attendance data to correlate with student demographic groups,
  academic performance, grade levels, retention patterns, school completion,
  and graduation.
* Provide early warning to identify specific students who are chronically absent
  or at risk of being chronically absent.
* Track student’s absences due to disciplinary detention, suspension, or
  expulsion.
* Inform student and family supports and interventions to improve a student’s
  attendance.

In addition, student attendance may be used to determine state school funding or
program grant funding, making attendance data high-stakes. [**Attendance**](<https://nces.ed.gov/pubs2009/attendancedata/chapter2a.asp>)
is defined as when a student is identified, or _marked_, as being Absent,
Present, or Tardy, in whole or in part. Attendance may be collected at
different levels of granularity:

* **School attendance**, indicating whether the student has attended the school
  for the entire school day, a portion of the school day, or has been absent
  for the entire school day. School attendance is marked for each instructional
  day in the school year.
* **Section attendance** – used in secondary education settings which organizes
  the instruction into sections – indicating full or partial attendance or
  absence for each period the section meets. Section attendance is marked
  for each class period the section meets.
* **Program attendance**, tracking a student’s participation in a program
  and/or a student receiving services as part of a program. Program attendance
  is marked for each scheduled time the student is to participate in the
  program or receive program services.
* **Intervention attendance**, marking the student as present or absent for
  scheduled intervention activities. Intervention attendance is marked for each
  scheduled time the student is receiving intervention instruction or services.

The Ed-Fi attendance domain supports all of these options. There are generally
two popular practices for taking attendance:

* **Negative attendance**: the practice of taking student attendance when a
  teacher marks a student is absent. Marking negative attendance most often
  involves a manual process whereby a teacher or other staff marks a student
  absent into an automated system, most likely the student information system (SIS).
* **Positive attendance**: the practice of taking student attendance when students
  identify themselves as being present. Positive attendance is often supported by
  hardware or other mechanisms that allow the student to “check in” without
  regular manual teacher actions.

**Partial attendance** – where a student arrives late (tardy) or leaves early – may
be marked as part of either positive or negative attendance practices. Attendance
in Ed-Fi is event-based. An **attendance event** represents the recording in the
Ed-Fi API whether a student is Present or Absent (or Tardy) for the school day,
for a scheduled section, program, or intervention activity. This is typically
written by the SIS.

Note that the negative or positive attendance practices in the school and classroom
are independent of whether only Absent attendance events, only Present attendance
events, or both are written into the Ed-Fi API. For example, the process may only
mark absences, but the SIS may write both absent and present, assuming any student
that is not absent is present. The same may be true for positive attendance.

An attendance event has the following attributes and associations:

* Reference to the Student
* Reference to the appropriate School, Section, Program or Intervention
* Date of the attendance event
* The category of the attendance event, indicating whether the event is recording
  “present,” “absent” or “partial attendance” (arrives late (tardy) or leaves early).
  It may also include other key categorizations such as
  * If present, the modality of learning (e.g., classroom, remote, blended)
  * If absent, whether the absence is excused or not excused.
  * If absent or tardy, the associated category for the reason

Optionally, an attendance event may also include:

* The detailed reason for the absent, present, or partial attendance, as applicable
* The education environment (setting) where the (present) student receives instruction
  or services
* The arrival and departure times of the student
* The duration of the attendance event

It is important to remember that statutes and practices differ from state to state and
across localities concerning recognized reasons for student absences.

## Student Attendance Use Cases

The attendance domain addresses all use cases related to school, section, program,
and intervention attendance, as shown in the following table. Each type of
attendance event has its own specific attendance event entity.

| Primary Use Cases | Student Attendance Domain Entity that needs to be Utilized for the Use Case |
| --- | --- |
| - Student arrives at school on time and is present for the entire school day.<br/> - Student arrives late to school but is present for the rest of the day. <br/> - Student arrives at school on time but leaves early. <br/> - Student is absent for the entire school day. <br/> - Student arrives late to school after being marked absent. <br/> - Student receives instruction remotely by digital means. <br/> - Student is absent and not receiving instruction because of a discipline action. <br/> - Student is receiving instruction in a nontraditional school setting. <br/> - Student is out of school but involved in an instructional program or school-approved extracurricular or co-curricular activity. | - _StudentSchoolAttendanceEvent_ |
| - Student is on time for a section period and is present for the entire section. <br/> - Student arrives late to a section period. <br/> - Student leaves early from the section period. <br/> - Student is absent for the entire section period. <br/> - Student arrives late to the section after being marked absent. <br/> - Student receives instruction remotely by digital means for the section period. <br/> - Student is absent for the section period and not receiving instruction because of a discipline action. <br/> - Student is receiving instruction for the section in a nontraditional school setting. <br/> - Student is absent from the section but involved in an instructional program or school-approved extracurricular or co-curricular activity. <br/> - Section attendance is not taken. <br/> - Section attendance is taken but reported at a later date. <br/> - Section attendance is taken but reported at a later date. <br/> - Section attendance is not taken by the responsible teacher, for example, by a substitute. | - _StudentSectionAttendanceEvent_ <br/> - _SectionAttendanceTakenEvent_  |
| - Student is on time for a program activity or service and is present for the entire scheduled duration. <br/> - Student arrives late to a program activity or service. <br/> - Student leaves early from a program activity or service. <br/> - Student is absent for the entire program activity or service. <br/> - Student arrives late for the program service after being marked absent. <br/> - Student receives program services remotely by digital means. <br/> - Student is absent for the program activity or service because of a discipline action. <br/> - Student is participating in a program activity or service nontraditional school setting. <br/> - Student is absent from the program activity or service but involved in an instructional program or school-approved extracurricular or co-curricular activity.  | - _StudentProgramAttendanceEvent_ |
| - Student is on time for intervention instruction or services and is present for the entire scheduled duration. <br/> - Student arrives late for intervention instruction or services. <br/> - Student leaves early from intervention instruction or services period. <br/> - Student is absent for the scheduled for intervention instruction or services. <br/> - Student arrives late to the intervention after being marked absent. <br/> - Student receives instruction remotely by digital means for the intervention instruction or services. <br/> - Student is absent from the intervention instruction or services because of a discipline action. <br/> - Student is receiving intervention instruction or services in a nontraditional school setting. <br/> - Student is absent from the scheduled intervention instruction or services but involved in an instructional program or school-approved extracurricular or co-curricular activity. | - _StudentInterventionAttendanceEvent_ |

<br/>
These best practices focus on the Attendance domain, consisting of the following
entities and associations:

* _StudentSchoolAttendanceEvent_ represents the recording of whether a student is in
  attendance for a school day.
* _StudentSectionAttendanceEvent_ represents the recording of whether a student is in
  attendance for a section.
* _SectionAttendanceTakenEvent_ captures whether attendance was taken event for given
  section.
* _StudentProgramAttendanceEvent_ represents the recording of whether a student is in
  attendance to receive or participate in program services.
* _StudentInterventionAttendanceEvent_ represents the recording of whether a student
  is in attendance for an intervention service.

Note that staff attendance, known as staff leave, is captured by the _StaffLeave_
entity in the Staff domain.

## Ed-Fi Prerequisites for Writing Attendance Domain Entities

The attendance domain has dependencies on other data that should be entered into
the Ed-Fi API prior to writing attendance events, as follows:

* Yearly API setup. The best practice convention has a separate API for each school
  year. This means that attendance events must be written into the appropriate API
  for the appropriate school year.
* _EducationOrganizations_, minimally Schools and LocalEducationAgency(s), need to be
  created for the scope of the ODS.
* Calendar(s) for the various Schools and GradeLevel(s), indicating the designated
  school (instructional) days by _CalendarDate_, the _Sessions_, and _GradingPeriods_.
* As being part of the key for the various types of attendance events, a Student
  entity needs to be written before any attendance event is entered.
A _StudentSchoolAssociation_ (or _StudentEducationOrganizationResponsibilityAssociation_)
needs to be written for the student before a StudentSchoolAttendanceEvent is
entered for the corresponding school.
* For school and grade levels with a bell schedule for sections, The BellSchedule
  and ClassPeriods need to be defined.
* A Section entity and a _StudentSectionAssociation_ needs to be written before a
  _StudentSectionAttendanceEvent_ is entered for the corresponding student and section.
* A Program entity and a _StudentProgramAssociation_ or any _StudentXxxProgramAssociation_
  needs to be written before a _StudentProgramAttendanceEvent_ is entered for the
  corresponding program.
* An Intervention entity and a _StudentInterventionAssociation_ needs to be written
  before a _StudentInterventionAttendanceEvent_ is entered for the corresponding
  program.
* Descriptor values need to be loaded. The Attendance domain has dependency on two
  sets of descriptors that are part of the _AttendanceEvent_ common that is the used
  by the StudentSchoolAttendanceEvent, the _StudentSectionAttendanceEvent_, the
  _StudentProgramAttendanceEvent_, and the _StudentInterventionAttendanceEvent_.
  * _AttendanceEventCategory_ is a required descriptor which typically has custom
    values associated associated with the attendance codes collected in the Student
    Information System. The descriptor values typically include:
    * For absent events, whether the absence is excused or unexcused.
    * For absent events, a categorization of the reason for the absence, as per
    policy
    * For partial attendance, whether tardy or left early.
    * For present events, modality of learning (e.g., classroom, remote, blended)
  * _EducationalEnvironment_ is an optional descriptor indicating the setting in which
    a child receives education and related services. As an attribute of the
    _StudentSectionAttendanceEvent_, the attribute is typically only used if it
    differs from the _EducationalEnvironment_ of the associated Section.

## Recommended Patterns for the Attendance Domain

### Understand positive and negative attendance practices

It is important to understand the kind of attendance practices in the classroom
and distinguish how they are reported by the SIS into the Ed-Fi API/ODS.

* **Negative attendance** assumes that all students are present unless marked
  as being absent by the teacher. This process requires classroom time and the
  teacher’s attention. The negative attendance process is disrupted by
  late-arriving students who now must be marked tardy instead of absent. SIS
  features are often able to write both absent and present attendance events
  even though the process only captures absences.
* **Positive attendance** starts with a clean slate, recording students as present
  only when they check in to the classroom. There are several hardware options
  and other mechanisms supported by a SIS to implement this check-in process
  that minimizes the time required by the teacher. With these systems, students
  that do not check-in are marked as absent.

### Consistent attendance marking practices

It is important that attendance marking (the process of taking attendance) and
attendance reporting to the API/ODS be consistent, as follows:

* The choice of the attendance taking process – negative or positive – should
  be defined in policy and consistently applied.
* School, section, program, and intervention attendance practices should be
  applied uniformly.
* Attendance practices should be included in staff training and compliance
  with those practices should be monitored. The SectionAttendanceTakenEvent
  is used for this purpose.
* Attendance should be taken daily and reported to the API/ODS the same day.
* Changes to a student’s attendance events, for example, changing from an
  unexcused absence to an excused absence when a parent’s response is received,
  should be promptly reported.

### Write both absent and present attendance events

Best practices indicate that both absent and present attendance events be
written to the API/ODS independent of whether a negative or positive attendance
process is used.

* Writing both absent and present improves the quality of attendance data
  since the lack of an attendance event for a school day, section class period,
  or program or intervention time period indicates a missing attendance event.
* For absent attendance events, the AttendanceEventCategory descriptor value
  records the reason for the absence and whether the absence is excused or
  unexcused.
* For present attendance events, the AttendanceEventCategory may indicate the
  modality of learning (e.g., classroom, remote, blended), reflecting for
  example that a student who normally attends class in person was present
  but joining remotely. The EducationalEnvironment attribute may reflect the
  setting where the student received instruction or services.
* For tardy attendance events, the AttendanceEventCategory descriptor value
  records the reason for the tardy.

It should be noted that attendance events are typically the largest number
of records written to an Ed-Fi API/ODS. Writing only absent and tardy
attendance event will substantially reduce the number of attendance event
records but should only be done if there is no additional information
captured as part of a positive attendance process.

### Map attendance codes to the AttendanceEventCategory descriptor

The categorization of attendance events using codes defined in the
Student Information System (SIS) is a common practice. In some cases,
the operation of the schools may define a set of attendance codes that
are more granular than is desired to be reported to the API/ODS. In
these cases, an explicit, published mapping of SIS attendance codes to
the AttendanceEventCategory descriptor values should be defined. Most
SIS with an Ed-Fi API/ODS interface supports mapping SIS codes into
Ed-Fi descriptors.

### Deriving school day attendance from section-based attendance

School-only attendance practices are common in primary grades and grades when the
school day is not organized into section periods. When section attendance is taken
for each class period in a day, policy will define how school-level attendance is
derived; there are many options, including:

* Designation of a homeroom section when daily attendance is taken
* Designation of a homeroom class period during the school day when daily attendance
  is taken
* Specification of a minimum duration of time (or alternatively begin and end times),
  across all class periods in a school day that a student must be in attendance in order
  to be counted as present for an entire day. Similar business rules may be defined for
  portions of the school day.
* Similar computation rules are needed to compute school tardy events from section tardy
  or absent events.

Care must be taken in cases of block scheduling, when different sections meet on different
days of the week.

According to policy, the derivation of school-level attendance from section attendance
should be computed and reported by the SIS as a StudentSchoolAttendanceEvent, rather than
leaving the computation to a downstream report. This ensures consistency across all data
sources.

When school attendance is derived from section attendance, the importance of section attendance
is raised. Use of the SectionAttendanceTakenEvent is recommended to validate the quality of
the section attendance.

## Best Practices in Using the Attendance Domain

### AttendanceEvent common

All of the attendance event entities (_StudentSchoolAttendanceEvent_, _StudentSectionAttendanceEvent_,
_StudentProgramAttendanceEvent_, and _StudentInterventionAttendanceEvent_) use the _AttendanceEvent_
common for the details of the attendance event. The following table summarizes the best practice use
of the AttendanceEvent common attributes.

Best Practices for the use of the AttendanceEvent Common Attributes

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| EventDate (key) <br/> AttendanceEventCategory (key) | | AttendanceEventReason | EducationalEnvironment <br/> EventDuration |

:::note Keys in reading the table and following ones:

* Required attributes in Ed-Fi are hard constraints, meaning that a record or API payload will be
  rejected if the attribute is not present. These necessarily include key values.
* Must Have attributes are those whose intended use of the entity requires them to be used, even if,
  upon creation, they may not be present.
* Recommended attributes are those whose best practices encourage their use.
* As Needed attributes are those that should be used when appropriate, based upon policy.

:::

<br/>
Best Practices for the use of the _AttendanceEvent_ Common

:::info

* When the operational attendance codes are mapped to a smaller set of AttendanceEventCategory
  descriptor values, use the AttendanceEventReason to capture the more detailed information from
  the attendance codes.

:::

### StudentSchoolAttendanceEvent

The StudentSchoolAttendanceEvent records whether a student is Absent, Present or Tardy for a school
day according to attendance policies. Each school in which a student is enrolled (whether singly- or
dually-enrolled) is responsible for taking attendance for the day or portion of the day.

Best Practices for the use of the _StudentSchoolAttendanceEvent_ Attributes

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| EventDate (key from AttendanceEvent common) <br/> AttendanceEventCategory (key from AttendanceEvent common) <br/> Student (key) <br/> School (key) <br/> Session (key) | | AttendanceEventReason (from AttendanceEvent common) | SchoolAttendanceDuration <br/> ArrivalTime <br/> DepartureTime <br/> EducationalEnvironment (from AttendanceEvent common) <br/> EventDuration (from AttendanceEvent common) |

<br/>
Business Rules that considered as best practices for the usage of the _StudentSchoolAttendanceEvent_ are as follows

:::info

* The student associated with the _StudentSchoolAttendanceEvent_ must have an active
  _StudentSchoolAssociation_ for the school. Students who have transferred out of the school,
  dropped out, completed school, or are otherwise not enrolled are not counted as present or absent.
* The AttendanceEvent.EventDate for the StudentSchoolAttendanceEvent must be a designated “in-session”
  school day for the Calendar associated with the StudentSchoolAssociation. Attendance events are not
  recorded when the school is closed to students.
* The AttendanceEvent.EventDate for the StudentSchoolAttendanceEvent must be part of the designated
  Session.
* Use the AttendanceEvent.Duration to reflect StudentSchoolAttendanceEvents (Absent, Present, or Tardy)
  to reflect portions of a school day.
* Use the SchoolAttendanceDuration to reflect the instructional minutes received as part of a Present or
  Tardy attendance event, as required.

:::

### StudentSectionAttendanceEvent

The StudentSectionAttendanceEvent records whether a student is Absent, Present or Tardy for
a section that meets during a class period during a school day, according to attendance policies.

Best Practices for the use of the _StudentSectionAttendanceEvent_ Attributes

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| EventDate (key from AttendanceEvent common) <br/> AttendanceEventCategory (key from AttendanceEvent common) <br/> Student (key)  <br/> Section (key) | | AttendanceEventReason (from AttendanceEvent common) | SectionAttendanceDuration <br/> ArrivalTime <br/> DepartureTime <br/> ClassPeriod <br/>  EducationalEnvironment (from AttendanceEvent common) <br/> EventDuration (from AttendanceEvent common) |

<br/>
Business Rules that considered as best practices for the usage of the _StudentSectionAttendanceEvent_ are as follows

:::info

* The student associated with the _StudentSectionAttendanceEvent_ must have an active
  _StudentSectionAssociation_ for the section.
* The _AttendanceEvent.EventDate_ for the _StudentSectionAttendanceEvent_ must be a
  designated school day in the Calendar associated with the StudentSchoolAssociation.
  Attendance events are not recorded when the school is closed to students.
* The AttendanceEvent.EventDate for the StudentSectionAttendanceEvent must be for Section
  with a designated ClassPeriod that meets on a school day as part of the BellSchedule
  associated with the student. Attendance events are not recorded for days the section does
  not meet.
* As discussed above, the StudentSectionAttendanceEvents associated with a student for a
  school day should be consistent with the reported StudentSchoolAttendanceEvent reported for
  that school day per the attendance policies.
* Use the SectionAttendanceDuration to reflect the instructional minutes received as part of a
  Present or Tardy section attendance event, as required.
* The AttendanceEvent.EducationalEnvironment attribute should be used when the setting the child
  receives education differs from that identified for the Section. This attribute applies to
  Present and Tardy  StudentSectionAttendanceEvents.
* The ClassPeriod attribute should be used to differentiate when a Section meets on multiple
  class periods during a day.

:::

### SectionAttendanceTakenEvent

The _SectionAttendanceEventTaken_ entity is used to record and monitor whether attendance was
taken for a given section for each day the section meets.   The entity is written for each
time attendance as taken.  The lack of a _SectionAttendanceTakenEvent_ for a section on a meeting
day means that attendance was not taken.

Best Practices for the use of the _SectionAttendanceEventTaken_ Attributes

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| Section (key) <br/> CalendarDat (key)| | Staff | EventDate |

<br/>
Business Rules that considered as best practices for the usage of the _SectionAttendanceEventTaken_ are as follows

:::info

* If a SectionAttendanceTakenEvent is recorded for a section on a school day, there should
  also be StudentSectionAttendanceEvents recorded, as per the attendance practices.
* Use the EventDate when the SectionAttendanceTakenEvent is recorded on a day different from
  the CalendarDate.
* Recording the Staff responsible for taking section attendance that day is recommended to
  identify those staff (and substitutes) that are complying with attendance taking policies.

:::

### StudentProgramAttendanceEvent

The _StudentProgramAttendanceEvent_ records whether a student is Absent, Present or Tardy for
a designated time period to receive services or participate in the program, according to
attendance policies.

Best Practices for the use of the _StudentProgramAttendanceEvent_ Attributes

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| EventDate (key from AttendanceEvent common) <br/> AttendanceEventCategory (key from AttendanceEvent common) <br/> Student (key) <br/> Program (key) <br/> EducationOrganization (key) | | AttendanceEventReason (from AttendanceEvent common) | ProgramAttendanceDuration <br/> EducationalEnvironment (from AttendanceEvent common) <br/> EventDuration (from AttendanceEvent common) |

<br/>
Business Rules that considered as best practices for the usage of the _StudentProgramAttendanceEvent_ are as follows

:::info

* The student associated with the StudentProgramAttendanceEvent must have an active
  StudentProgramAssociation or program-specific StudentXxxProgramAssociation for the program.
* The AttendanceEvent.EventDate for the StudentProgramAttendanceEvent must be part of the school
  year in the Calendar associated with the StudentSchoolAssociation. Program attendance events may
  or may not be on designated school days.
* Use the ProgramAttendanceDuration to reflect the service or participation minutes as part of a
  Present or Tardy section attendance event, as required.
* The EducationOrganization of the StudentProgramAttendanceEvent should be consistent with the
  EducationOrganization of the active StudentProgramAssociation or program-specific
  StudentXxxProgramAssociation.
* The AttendanceEvent.EducationalEnvironment attribute should be used when the setting the child
  receives education or services differs from that identified for the program – for example, the
  SpecialEducationSetting for the StudentSpecialEducationProgramAssociation.  This attribute
  applies to Present and Tardy StudentProgramAttendanceEvents.

:::

### StudentInterventionAttendanceEvent

The _StudentInterventionAttendanceEvent_ records whether a student is Absent, Present or Tardy for
a designated time period for intervention services, according to attendance policies.

Best Practices for the use of the _StudentInterventionAttendanceEvent_ Attributes

| Required | Must Have | Recommended | As Needed |
| --- | --- | --- | --- |
| EventDate (key from AttendanceEvent common) <br/> AttendanceEventCategory (key from AttendanceEvent common) <br/> Student (key) <br/> Intervention (key) | | AttendanceEventReason (from AttendanceEvent common) | InterventionDuration <br/> EducationalEnvironment (from AttendanceEvent common) <br/> EventDuration (from AttendanceEvent common) |

<br/>
Business Rules that considered as best practices for the usage of the _StudentInterventionAttendanceEvent_ are as follows

:::info

* The student associated with the StudentInterventionAttendanceEvent must have an active
  StudentInterventionAssociation for the intervention
* The AttendanceEvent.EventDate for the StudentInterventionAttendanceEvent must be part of
  the school year in the Calendar associated with the StudentSchoolAssociation. Intervention
  attendance events may or may not be on designated school days.
* Use the InterventionDuration to reflect the intervention minutes received as part of a Present
  or Tardy intervention attendance event, as required.

:::

## Sample Use Cases

* [Expected and Actual Program/Intervention
    Attendance](./expected-and-actual-programintervention-attendance.md)
* [Expected and Actual Section
    Attendance](./expected-and-actual-section-attendance.md)
* [Expected and Actual School Day
    Attendance](./expected-and-actual-school-day-attendance.md)
