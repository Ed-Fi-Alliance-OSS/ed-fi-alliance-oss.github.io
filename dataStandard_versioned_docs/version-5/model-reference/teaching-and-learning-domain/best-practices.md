---
sidebar_position: 4
hide_table_of_contents: true
---

# Teaching and Learning Domain - Best Practice

## Definition and Key Concepts

The Teaching and Learning domain defines the entities and associations for
organizing instruction. Key concepts are as follows:
A course is an organization of subject matter and related learning experiences
provided for the instruction of students on a regular or systematic basis.
Courses reflect the official organization of instruction for teaching by a
school (in a classroom and/or virtually). State Education Agencies (SEAs)
typically define a standard set of courses (with identifiers) that are to be
taught in the schools and may be required in certain combinations for a student
to graduate from high school.

A course offering reflects the offering of teaching a course by a school during
a session. As such, the set of course offerings represents the course catalog of
planned courses at a school for the session. A school’s course offering is
typically associated with a state-defined course. A course may have multiple
course offerings within a school when there are differences in complexity or
difficulty, in target population, or the instructional methods applied.

A section represents the actual delivery of a course offering in a setting
(classroom, virtual, or hybrid), to one or more students for a given period of
time. A course offering may be taught in more than one section. Sections have
staff assigned as teachers and other support. Sections have students enrolled,
or assigned, to the section. When taught in a classroom setting, a section is
defined for a specific time during days of the week, at specific location(s),
and for a single course offering. In practice, it’s possible for multiple
Sections of a Course to be taught within the same classroom by the same teacher,
with the students being administered a different curriculum in each.

A program refers to a school sponsored or approved recurring activity, event,
or function, on- or off-school premises, where students are under the authority
of the local education agency (LEA) or are supervised by school staff. Programs
may provide supplemental instruction, training, services, or benefits. Programs
may also include organized extracurricular activities for students. In some
cases, students participate in a program as part of receiving instruction in a
section. See the Alternative and Supplemental Services domain.

The organization of instruction into the Course–CourseOffering–Section pattern
reflects the typical flow of instructional planning activities by the State
Education Agency (SEA), Local Education Agency (LEA) and School, as depicted
in the following diagram.

![Instructional Planning Flow](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/v52/ModelReference_Teaching&Learning_DSv52.jpg)

In a secondary school context (middle and high school), the sections into which
students are assigned are scheduled for class periods organized by day of the week
and times according to a bell schedule. In an elementary school context where
students may receive all instruction from the same teacher, simple grade-oriented
courses, course offerings, and sections are defined.

## Teaching and Learning Use Cases

The Teaching and Learning domain entities and associations address the use cases
associated with organizing instruction (per the diagram above), assigning teachers
and placing students as shown in the following table.

| Primary Use Cases | Ed-Fi Domain and Entity needed for the Use Case |
| :--- | :--- |
| <li> SEA designation of the courses to be offered in the state. </li> <li> SEA designation of learning standards for instruction and their mapping to courses. </li> <li> SEA designation of the course requirements for graduation. </li> | <li> Teaching and Learning </li> &nbsp;&nbsp; - Course  <br/> <li> Assessment </li> &nbsp;&nbsp; - LearningStandard <br/> <li> Graduation </li> &nbsp;&nbsp; - GraduationPlan |
| <li> LEA designation of the course offerings for a session to be offered at each school. </li> | <li> Teaching and Learning </li> &nbsp;&nbsp; - Course <br/> &nbsp;&nbsp; - CourseOffering |
| <li> School designation of the sections to be scheduled for each course offering according to the population of students requiring that course. </li> | <li> Teaching and Learning </li> &nbsp;&nbsp; - CourseOffering <br/> &nbsp;&nbsp; - Section |
| <li> Student assignment to a specific section for a course offering. </li> <li> Student exit from a section. </li> <li> Student withdrawal from school and exit from all sections. </li> <li> Student completion of a section during a session. </li> <li> Student transfer to another section of the same course offering. </li> <li> Student transfer to another section with different course offering but teaching the same state course. </li> | <li> Teaching and Learning </li> &nbsp;&nbsp; - Section <br/> &nbsp;&nbsp; - StudentSectionAssociation |
| <li> Student participation in a program as part of section instruction </li> <li> Student exit or withdrawal from a program associated with a section. </li> | <li> Teaching and Learning </li> &nbsp;&nbsp; - Section <br/> &nbsp;&nbsp; - StudentSectionAssociation <br/> <li> Alternative and Supplemental Services </li> &nbsp;&nbsp; - Program <br/> &nbsp;&nbsp; - StudentProgramAssociation |
| <li> Staff assignment to a section </li> <li> Staff exit from a section </li> | <li> Teaching and Learning </li> &nbsp;&nbsp; - Section <br/> &nbsp;&nbsp; - StaffSectionAssociation |
|  <li> Student registration for a dual credit (dual enrollment) course at a post-secondary institution </li> <li> Secondary registration at another school to take a course. </li> | <li> Teaching and Learning </li> &nbsp;&nbsp; - Section <br/> &nbsp;&nbsp; - StudentSectionAssociation <li> Enrollment </li> &nbsp;&nbsp; - StudentSchoolAssociation |

The Teaching and Learning domain includes the following entities and associations:
* Course: An organization of subject matter and related learning experiences
provided for the instruction of students on a regular or systematic basis.
* CourseOffering: An available course offered by a school during a session. The
course offerings represent the course catalog available to students.
* Location: The space, typically physical, where students gather for a
particular section. Virtual (online) spaces and applications may also be
defined as Locations.
* Section: The school setting in which organized instruction of a course offering
is provided, in-person or virtual, to one or more students for a given period of
time. A course offering may be offered in more than one section.
* StaffSectionAssociation: Indicates the sections to which a staff member,
typically a teacher, is assigned.
* StudentSectionAssociation: Indicates the sections into which a student is
assigned to receive instruction.

## Prerequisites for Writing the Teaching and Learning Domain Entities

The Teaching and Learning domain has dependencies on other data that should be
entered into the Ed-Fi API prior to writing domain entities and associations,
as follows:

* Year-based setup: The best practice convention has a separate Ed-Fi API instance for each school
year. This means that teaching and learning entities and associations must be written
into the appropriate Ed-Fi API instance for the school year.
* EducationOrganizations, minimally Schools, LocalEducationAgency(s) and the
StateEducationAgency, need to be created for the scope of the Ed-Fi API.
* LearningStandards need to be written before defining Courses of instruction are
organized by learning standard.
* School calendar entities (minimally the Sessions) need to be written before the
CourseOfferings are defined for a School and a Session.
* Courses need to be defined before writing CourseOfferings.
* CourseOfferings need to be defined before writing Sections.
* Locations for each School, if used, need to be defined before writing Sections.
* BellSchedules and ClassPeriods need to be defined before writing Sections.
* A Student entity and a StudentSchoolAssociation (school enrollment) needs to be
written before assigning students to sections using the StudentSectionAssociation.
* A Staff entity and the StaffSchoolAssociation needs to be written before assigning
the teachers to sections using the StaffSectionAssociation.
* Programs that are associated with Sections need to be defined before writing
Sections or StudentSectionAssociations that are associated with a program.
* A Section entity needs to be written writing a StudentSectionAssociation or a
StaffSectionAssociation.
* Descriptor values need to be loaded, organized by the referring entities and
associations, as follows.
	* Course
		* AcademicSubject, an optional collection of descriptor values to indicate
		the intended major subject area(s) of the course.
		* CareerPathway, optionally indicates the career cluster or pathway the course
		is associated with as part of a CTE curriculum.
		* CompetencyLevel, an optional collection of descriptor values for competency
		levels defined to rate the student for the course.
		* CourseDefinedBy, optionally specifies whether the course was defined by the
		SEA, LEA, School, or national organization.
		* CourseGPAApplicability, an optional indicator of whether or not the course
		being described is included in the computation of the student's Grade Point
		Average, and if so, if it is weighted differently from regular courses.
		* CourseIdentificationSystem, a required descriptor for the optional
		CourseIdentificationCode common that specifies the system that is used to
		alternatively identify the Course.
		* CourseLevelCharacteristic, an optional collection of descriptor values to
		indicate various designation(s) with which the course is associated (e.g.,
		AP, IB, Dual Credit, CTE).
		* CreditType, optionally used as part of the MinimumAvailableCredits and
		MaximumAvailableCredits commons to specify type of credits or units of value
		awarded for the completion of a course.
		* OfferedGradeLevel, an optional collection of descriptor values using the
		GradeLevel descriptor, indicating the grade level(s) in which the course is
		offered.
	* CourseOffering
		* CourseLevelCharacteristic, an optional collection of descriptor values to
		indicate various designation(s) with which the course offering is associated
		(e.g., AP, IB, Dual Credit, CTE). The collection should be populated if it
		differs from the CourseLevelCharacteristics identified at the Course level.
		* CurriculumUsed, an optional collection of descriptor values to indicate the
		type of curriculum used in classroom or group.
		* OfferedGradeLevel, an optional collection of descriptor values using the
		GradeLevel descriptor, indicating the grade level(s) in which the course
		offering is offered. This collection should be populated if it differs from
		the OfferedGradeLevels identified at the Course level.
	* Section
		* CourseLevelCharacteristic, an optional collection of descriptor values to
		indicate various designation(s) with which the section is associated (e.g.,
		AP, IB, Dual Credit, CTE). The collection should be populated if it differs
		from the CourseLevelCharacteristics identified at the CourseOffering level.
		* CreditType, the type of credits or units of value awarded for the
		completion of a course.
		* EducationalEnvironment, the setting in which a child receives education
		and related services; for example: center-based instruction, home based
		instruction, hospital class, mainstream, residential care and treatment
		facility.
		* InstructionLanguage, the primary language of instruction; if omitted
		English is assumed.
		* OfferedGradeLevel, an optional collection of descriptor values using the
		GradeLevel descriptor, indicating the grade level(s) in which the section
		is offered. This collection should only be populated if it differs from the
		OfferedGradeLevels identified at the Course Offering level.
		* MediumOfInstruction, the media through which teachers provide instruction
		to students and students and teachers communicate about instructional matters;
		for example: technology-based instruction in classroom, correspondence
		instruction, face-to-face instruction, virtual/on-line distance learning,
		center-based instruction.
		* PopulationServed, the type of students the Section is offered and tailored
		to; for example: bilingual students, remedial education students, gifted and
		talented students, Career and Technical Education students, special education
		students.
		* SectionCharacteristic reflects important characteristics of the Section,
		such as whether or not attendance is taken, and whether the Section is
		graded and awards credits.
		* SectionType specifies whether the section is for attendance only, credit
		only, or both.
	* StudentSectionAssociation
		* AttemptStatus, an indication of the student's completion status for the
		section.
		* RepeatIdentifier, an indication as to whether a student has previously
		taken a given course. Repeated, counted in grade point average, Repeated,
		not counted in grade point average, Not repeated, Other.
	* StaffSectionAssociation
		* ClassroomPosition indicates the type of position the Staff member holds in
		the specific section; for example: teacher of record, assistant teacher,
		support teacher, substitute teacher.

## Alternative Patterns for the Teaching and Learning Domain

As discussed above, the primary mechanism for structuring teaching and learning is
the Course–CourseOffering–Section pattern. This document section discusses the best
practices for how to apply this pattern to common special cases.

### Elementary School Sections

In the Ed-Fi, the Course–CourseOffering–Section pattern is central to supporting
secondary teaching and learning where the section is the mechanism to assign students
and teachers, take attendance, and post grades.

However, elementary school teaching and learning is often organized with students
spending their instructional time in a single classroom where all subjects are covered.
Best practices have the following approach:
1. Courses are defined for each subject and grade, for example Grade 1 Mathematics,
Grade 1 Language Arts and Reading, and so forth.
2. CourseOfferings are defined for each of the subject-grade Courses available at a
school.
3. Sections are defined for each subject-grade Course-CourseOffering to support the
assignment of students and teachers to classrooms. These subject-grade sections provide
the mechanism to organize multiple classrooms for a grade level and to record grades by
subject.

### Local Course Offerings

The Course entity typically captures the state’s instructional requirements for
organizing teaching, for grade level advancement, and ultimately for high school
graduation. Districts (and perhaps even schools) may be given the flexibility to define
local courses to best serve the educational development needs of their students.

Conceptually, this may seem like there would be a CouseOffering without an associated
Course entity (which would be an anti-pattern). The Course–CourseOffering–Section pattern
requires a CourseOffering to be associated with a Course. Best practices find there are
two ways to handle the situation of locally-defined courses:
* The state may define open-ended courses that are specifically identified for local course
offerings. For example, a Course could be defined for “Advanced Mathematics” to which a local
CourseOffering for “Topology” could be associated. The advantage of this approach is that the
state’s graduation requirements can address the credits associated with any “Advanced
Mathematics” course offering.
* Alternatively, the state may allow the districts (or schools) to define Courses for these
local course offerings. In the example a local CourseOffering for “Topology” would create a
Course for “Topology.”  In this case, it is important that the local Course be properly
identified:
	* Course.EducationOrganization should reference the LocalEducationAgency or School
	that defines the local course offering; and
	* Course.CourseDefinedBy descriptor value should indicate whether it was defined by an
	LEA or a school.

### Dual Credit Courses

In a general sense, dual credit courses refer to situations where the student can earn credits
for both high school and college by taking a single course. There are three variants:
1. Dual enrollment involves students taking college courses while in high school. A dual
enrollment experience earns college credit and may or may not allow students to earn
simultaneous credits for high school.
2. Advanced course eligible for college credit are high school programs, such as Advanced
Placement (AP) or International Baccalaureate (IB), that allow students to earn academic credit
that is accepted by some colleges and universities. This experience may or may not allow
students to earn simultaneous credits for both high school and college for the course taken in
high school.
3. Concurrent enrollment courses (as the subset of dual enrollment) are taught by
college-approved high school teachers in a secondary environment earning college credit and
may or may not allow students to earn high school credits.

The following table outlines the distinctions between these variants.

| Type of Dual Credit | Type of curriculum | Teaching and learning setting | High school credit | College credit |
| :--- | :--- | :--- | :--- | :--- |
| Dual enrollment | College | College | Maybe | Yes |
| Advanced course eligible for college credit | High school | High school | Yes | Maybe |
| Concurrent enrollment | College | High school | Maybe | Yes |

To address these situations, the Teaching and Learning model requires that a Course
be defined to earn the high school credits, independent of whether the course is
taught at a college or if it is taught in the high school.

The descriptor Course.CourseLevelCharacteristic is used to identify courses that
are specifically designated as dual credit. The same descriptor value may be used
for course offerings (CourseOffering.CourseLevelCharacteristic) when it differs
from that specified by the Course. Similarly, at the section level, the Section.
CourseLevelCharacteristic may be used where the section value differs from that
specified by the Course or CourseOffering. This approach provides a large amount
of flexibility to manage different approaches for dual credit situations.

### Credit Recovery

Credit recovery sections are organized to bring several students into a specific
location and class period to study courses required for graduation that they
have previously missed or didn’t pass previously.  A credit recovery section may
be staffed by one or several teachers, each assigned course(s) to teach in their
field. The Ed-Fi section model supports credit recovery with the approach that
every different course taught must have a section defined, identifying the
specific teacher(s) assigned and those students that are studying that course.

School districts operate credit recovery sections somewhat differently, including
as follows:
1. The different courses to be taught for credit recovery in a section are
determined before student assignments to sections. Sections are defined for each
course, assigned a teacher, and assigned the same ClassPeriod and Location.
2. A “Credit Recovery” section is defined for students to register in and be
assigned. At the first meeting of the section, the needs of the students for
credit recovery are assessed and additional Sections are defined for each different
course and assigned the same ClassPeriod and Location.

The first approach is easily supported by the Section model. The details of the
latter case are as follows:
* A credit recovery section is defined for students that need to make up credits.
The Section is for “Credit Recovery” and is defined in the SIS and scheduled for an
assigned Location and a ClassPeriod in the Bell Schedule with Section.SectionType
equal to “Attendance Only.”  A teacher or proctor may be assigned to that section
using the StaffSectionAssociation.
* Students are assigned to the “Credit Recovery” section at registration time using
the StudentSectionAssociation.
* For those students assigned to the “Credit Recovery” Section, the needs of the
students are assessed, and it is determined which courses need be studied, which
students need those courses (a student may study more than one), and which teachers
are assigned to cover those courses. A new instructional Section is defined for each
of those courses and assigned the same ClassPeriod and Location; the Section.SectionType
equal to “Credit Only”.  The appropriate StudentSectionAssociation assigns specific
students to specific instructional courses for credit recovery. The
StaffSectionAssociation identifies which teachers are responsible for which
instructional courses for credit recovery.
* In this variant, daily section attendance is only taken for the “Credit Recovery”
Section. A different variant may involve each teacher individually taking attendance
for the courses they teach. Grades and credits are awarded for each instructional
Section as usual.

### Program Participation as Part of a Section

There are cases where students (or a subset of students) assigned to a section
may also be participating in a defined program. For example, this may occur when
special education students are also receiving services while learning in a section,
or for CTE students that are getting on-the-job experience or exposure while also
receiving classroom instruction.

These cases are handled as follows:
* Students are assigned to a Section using the StudentSectionAssociation as normal.
* If one or more students in a section are associated with program(s) the
Section.Program collection references those Program(s).
* Each student participating in a program must also have an associated
StudentProgramAssociation (or a specific StudentXxxProgramAssociation).
 
## Teaching and Learning Best Practices

The following best practices are organized by entity and association in the
Teaching and Learning domain.

### Course

The Course entity reflects the organization of instruction into courses for
teaching by a school, whether that occurs in a classroom and/or virtually.
The following table summarizes the best practice use of the Course attributes.

| Required | Must Have | Recommended | As Needed |
| :--- | :--- | :--- | :--- |
| CourseCode (key) <br/> EducationOrganization (key) <br/> CourseTitle <br/> NumberOfParts <br/> CourseIdentificationCode.IdentificationCode <br/> CourseIdentificationCode.CourseIdentificationSystem | CourseLevelCharacteristic <br/> OfferedGradeLevel <br/> AcademicSubject <br/> CareerPathway | CourseDescription <br/> DateCourseAdopted <br/> CourseDefinedBy <br/> MinimumAvailableCredits <br/> MaximumAvailableCredits | CourseIdentificationCode.AssigningOrganizationIdentificationCode <br/> CourseIdentificationCode.CourseCatalogURL <br/> TimeRequiredForCompletion <br/> HighSchoolCourseRequirement <br/> CourseGPAApplicability <br/> CompetencyLevel <br/> LearningStandard <br/> MaxCompletionsForCredit |

:::note Keys in reading the table and following ones:

* _Required_ attributes in Ed-Fi are hard constraints, meaning that a record or
    API payload will be rejected if the attribute is not present. These
    necessarily include key values.
* _Must Have_ attributes are those whose intended use of the entity requires
    them to be used, even if, upon creation, they may not be present.
* _Recommended_ attributes are those whose best practices encourage their use.
* _As Needed_ attributes are those that should be used when appropriate, based
    upon policy.

:::

<br/>
Best practices for the use of Course and its attributes
:::info

* In the school-year-specific situation, the set of Courses should reflect only those
  “active” courses that are available for being offered during that school year.
* The Course.CourseCode (key) should reflect the unique identifier established
  by the assigning (managing) Course.EducationOrganization. Additional
  identifiers, such as the SCED Code (School Codes for the Exchange of Data)
  should be included in the Course.CourseIdentificationCode collection.
* All CTE (Career and Technical Education) courses should populate the
* Course.CareerPathway attribute.

::::

### CourseOffering

The CourseOffering entity represents the course catalog of planned courses
to be offered at a school for the session. The following table summarizes
the best practice use of the CourseOffering attributes.

| Required | Must Have | Recommended | As Needed |
|:---|:---|:---|:---|
| LocalCourseCode (key) <br/> School (key) <br/> Session (key) <br/> Course | LocalCourseTitle | CourseLevelCharacteristic <br/> OfferedGradeLevel | InstructionalTimePlanned <br/> CurriculumUsed |

<br/>
Best practices for the use of CourseOffering and its attributes
:::info

* CourseOffering.CourseLevelCharacteristic collection should be populated
  if it differs from the CourseLevelCharacteristics identified at the
  Course level. For clarity, the attribute may be populated in all cases.
* CourseOffering.OfferedGradeLevel collection should be populated if it
  differs from the OfferedGradeLevels identified at the Course level. For
  clarity, the attribute may be populated in all cases.

::::

### Location

The Location entity represents the space, physical or virtual, where
students gather for a particular Section. The following table summarizes
the best practice use of the Location attributes.

| Required | Must Have | Recommended | As Needed |
|:---|:---|:---|:---|
| School (key) <br/> ClassroomIdentificationCode (key) |  |  | MaximumNumberOfSeats <br/> OptimalNumberOfSeats |

<br/>
Best practices for the use of CourseOffering and its attributes
:::info

* If used for a physical classroom location for a section, the
  Location should provide a unique ClassroomIdentificationCode within
  a school, indicating, for example, the building and room number.
  Normally, this would match the classroom location provided to
  students in their schedule.
* If used for an online or virtual course section, the Location
  should provide a unique ClassroomIdentificationCode, such as the
  web domain or the URL for the online section.

::::

### Section

The Section entity represents the delivery of a course offering in
a setting (classroom, virtual, or hybrid), to one or more students,
typically at a given period of time. Multiple Sections may be
defined for a single CourseOffering at a School. The following
table summarizes the best practice use of the Section attributes.

| Required | Must Have | Recommended | As Needed |
|:---|:---|:---|:---|
| SectionIdentifier (key) <br/> CourseOffering (key) | SequenceOfCourse <br/> AvailableCredits <br/> ClassPeriod <br/> Program | SectionName <br/> EducationalEnvironment <br/> MediumOfInstruction <br/> PopulationServed <br/> CourseLevelCharacteristic <br/> OfferedGradeLevel | SectionType <br/> SectionCharacteristic <br/> InstructionLanguage <br/> LocationSchool <br/> Location <br/> OfficialAttendancePeriod |

<br/>
Best practices for the use of Section and its attributes
:::info

* The Section.SectionIdentifier is the unique identifier for
  the section assigned within the Student Information System (SIS).
* The Section.Program collection is populated with the program
  reference(s) to which one or more students may be assigned in
  association with the section. Individual students may or may
  not participate in specific program(s).
* Section.CourseLevelCharacteristic collection should be
  populated if it differs from the CourseLevelCharacteristics
  identified at the CourseOffering level (or at the Course level).
  For clarity, the attribute may be populated in all cases.
* Section.OfferedGradeLevel collection should only populated if
  it differs from the OfferedGradeLevels identified at the
  CourseOffering level (or at the Course level). For clarity,
  the attribute may be populated in all cases.

::::


### StaffSectionAssociation

The StaffSectionAssociation indicates the Section to which a
staff member(s), typically a teacher(s) or supporting staff, is
assigned. The following table summarizes the best practice use of
the StaffSectionAssociation attributes.

| Required | Must Have | Recommended | As Needed |
|:---|:---|:---|:---|
| Staff (key) <br/> Section (key) <br/> ClassroomPosition <br/> BeginDate (key) | EndDate | HighlyQualifiedTeacher <br/> PercentageContribution | TeacherStudentDataLinkExclusion |

<br/>
Best practices for the use of StaffSectionAssociation and its attributes
:::info

* A Staff member with a StaffSectionAssociation must have a
  StaffSchoolAssociation for the same school as the section is being
  offered.
* A StaffSectionAssociation is created for each staff assignment to
  a Section, including the teacher of record and all supporting staff.
* Minimally, one StaffSectionAssociation is created for each assigned
  Staff member per Section during a Session.
* At any point in time, a staff member should have no more than one
  active StaffStaffAssociation for a single Section.
* Staff assigned via a StaffSectionAssociation that is also responsible
  for students’ participation in a Program must also have a
  corresponding StaffProgramAssociation.

::::

### StudentSectionAssociation

The StudentSectionAssociation indicates the Section into which students
are assigned to receive instruction. The following table summarizes the
best practice use of the StudentSectionAssociation attributes.

| Required | Must Have | Recommended | As Needed |
|:---|:---|:---|:---|
| Student (key) <br/> Section (key) <br/> BeginDate (key) | EndDate <br/> AttemptStatus <br/> Program | RepeatIdentifier | HomeroomIndicator <br/> TeacherStudentDataLinkExclusion |

<br/>
Best practices for the use of StudentSectionAssociation and its attributes
:::info

* A Student with a StudentSectionAssociation must have a 
  StudentSchoolAssociation for the same School where the Section is being 
  offered, reflecting either a primary or secondary enrollment.
* The period (defined by the BeginDate and EndDate) specified in the 
  StudentSectionAssociation must be contained within the period 
  (defined by the BeginDate and EndDate) specified in the associated 
  StudentSchoolAssociation.
* A StudentSectionAssociation is created for each student assignment to 
  a Section during a session.
* The EndDate of a StudentSectionAssociation must be equal or after the 
  BeginDate.
* When students complete a section at the end of the session, the 
  StudentSectionAssociation.EndDate must be written to reflect the 
  Session.EndDate.
* A Program identified in the StudentSectionAssociation that the student 
  is participating in the context of the Section must also have a 
  corresponding StudentProgramAssociation (SPA or SXPA).

::::
