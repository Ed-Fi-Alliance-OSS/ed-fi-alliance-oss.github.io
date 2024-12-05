# What's New - v5.0

## Overview

Data Standard v5.0 is targeted at deployment starting in the 2024-25 school
year. This final release version (v5.0.0) introduces important updates that
impact multiple domains of the Ed-Fi data model. The domains impacted include:

* Alternative and Supplemental Services Domain with Federal Programs Subdomain
* Discipline Domain
* Enrollment Domain
* Graduation Domain
* Intervention Domain
* Student Academic Record Domain
* Student Attendance Domain
* Student Cohort Domain
* Student Identification and Demographics Domain
* Survey Domain
* Teaching and Learning Domain

These changes come from field feedback and are designed to help drive the
community and community innovation forward. There are breaking changes in these
domains, so implementers are advised to review the changes carefully.

Other areas of the model have received minor, non-breaking updates, and API
bindings and implementations in those areas should continue to function as
before.

## Major Changes

### Adding Special Education Program Eligibility Association

[DATASTD-1898](https://tracker.ed-fi.org/browse/DATASTD-1898)

State Education Agencies (SEA's) need to evaluate their efforts to implement the
requirements of the Individuals with Disabilities Education Act of 2004 (IDEA
2004) and to include updates of their continuous improvement of the
implementation through their Annual Performance Report submitted every year. In
alignment with IDEA, states need to meet the two monitoring priorities
identified by the US Department of Education/Office of Special Education
Programs (ED/OSEP).

An Ed-Fi Special Interest Group (SIG) that focuses on Special Education (SpEd)
discussed how to to capture the evaluation information. SEAs in this group
agreed that they need to collect this information at a granular level and ruled
out the option of extending the existing
StudentSpecialEducationProgramAssociation entity. Both the Wisconsin Department
of Public Instruction and the Texas Education Agency had created extensions to
handle this type of data and that lead to the design of a new
entity _StudentSpecialEducationProgramEligibilityAssociation_ in Ed-Fi core
model as presented with this release\*.\*

This addition to the model allows states to collect data required for
improvement and monitoring activities communicated to the Office of Special
Education Program. The details about the entity and the elements that are
included in this new association is as shown below.

| Property | Cardinality | Definition |
| --- | --- | --- |
| EducationOrganization | required | Indicates the education organization where the student was evaluated for special education services.  This could be a school or a district. |
| Student | required | Student who is evaluated by a Local Education Agency or a School.  This is often their resident district.  Students could be enrolled or unenrolled or private schooled or home schooled. |
| Program | required | Indicates the program that the student is being evaluated for.  Example Value - 'Special Education Program' |
| ConsentToEvaluationReceivedDate | required | Indicates the date on which the Local Education Agency received written consent for the evaluation from the student's parent.  This is the first day of the evaluation timeframe. |
| OriginalECIServicesDate | optional | The month, date, and year when an infant or toddler, from birth through age 2, began participating in the early childhood intervention (ECI) program |
| IDEAPart | required | Indicates if the evaluation is done under Part B IDEA or Part C IDEA |
| ConsentToEvaluationDate | optional | The date on which the student's parent gave a consent (Parent Consent Date). |
| EvaluationCompleteIndicator | optional | Indicates the evaluation completed status.  Example Value - 'True' or 'False' |
| EligibilityEvaluationDate | optional | Indicates the month, day, and year when the written individual evaluation report was completed. |
| EligibilityEvaluationType | required | Indicates if this is an initial or reevaluation. |
| EvaluationDelayReason | optional | Refers to the justification as to why the evaluation report was completed beyond the State-established timeframe.  This is a descriptor field and will have allowed reasons as descriptor values. |
| EvaluationLateReason | optional | Refers to additional information for delay in doing the evaluation.  This is a free flow text. |
| EvaluationDelayDays | optional | Indicates the number of student absences, if any, beginning the first instructional day following the date on which the Local Education Agency (LEA) received written parental consent for the evaluation. |
| EligibilityDeterminationDate | optional | Indicates the month, day, and year the LEA held the admission, review, and dismissal committee meeting regarding the child's eligibility determination for special education and related services. An individualized education plan (IEP) would be developed and implemented for a child admitted into special education on this same date |
| IDEAIndicator | optional | Indicates whether or not the student was determined eligible a result of an evaluation. |
| EligibilityDelayReason | optional | The reason why the eligibility determination was completed beyond the required timeframe |
| TransitionNotificationDate | optional | Indicates the month, day, and year the LEA Notification of Potentially Eligible for Special Education Services was sent by the early childhood intervention (ECI) contractor to the local education agency (LEA) to notify them that a child enrolled in ECI will shortly reach the age of eligibility for Part B services and the child is potentially eligible for services under Part B, early childhood special education (ECSE). The LEA Notification constitutes a referral to the LEA for an initial evaluation and eligibility determination of the child which the parent may opt out from the referral. |
| TransitionConferenceDate | optional | Indicates the month, day, and year when the transition conference was held (for a child receiving early childhood intervention (ECI) services) among the lead agency, the family, and the LEA where the child resides to discuss the child’s potential eligibility for early childhood special education (ECSE) services. |
| EligibilityConferenceDate | optional | The month, day, and year when the eligibility conference is held between the parent(s)/guardian(s) and the educational organization responsible staff member(s) to review and make decision on special education related services eligibility. |

More details can be found in the [related](https://tracker.ed-fi.org/browse/DATASTD-1898)
[ticket](https://tracker.ed-fi.org/browse/DATASTD-1898) and the [ED-FI WORKING](https://edfi.atlassian.net/wiki/display/EFDSDRAFT/ED-FI+WORKING+DRAFT+8+-+SPECIAL+EDUCATION+PROGRAM+ELIGIBILITY+MODEL)
[DRAFT](https://edfi.atlassian.net/wiki/display/EFDSDRAFT/ED-FI+WORKING+DRAFT+8+-+SPECIAL+EDUCATION+PROGRAM+ELIGIBILITY+MODEL)
[8](https://edfi.atlassian.net/wiki/display/EFDSDRAFT/ED-FI+WORKING+DRAFT+8+-+SPECIAL+EDUCATION+PROGRAM+ELIGIBILITY+MODEL).

#### Updates on Special Education Program Association

[DATASTD-2105](https://tracker.ed-fi.org/browse/DATASTD-2105)

Ed-Fi Alliance's collaborative work with the SEAs through and after the SpEd SIG
has yielded a decision for adding three new optional attributes to the Student
Special Education Program Association to allow the community members collect
data for the program exit date of the student and the short and long explanation
for the reason(s) of this exit. The additional attributes are listed below.

| Property | Cardinality | Definition |
| --- | --- | --- |
| SpecialEducationExitDate | optional | The month, day and year on which a person stops receiving special education services. |
| SpecialEducationExitReason | optional | The reason why a person stops receiving special education services. |
| SpecialEducationExitExplained | optional | Explanation on why a person stops receiving special education services. |

The SpecialEducationExitExplained attribute is designed to be used for data
collection where the long explanation of reason(s) of student's exit from the
Special Education program where SpecialEducationExitReason is designed as a
descriptor to capture the short explanation/categorization of the exit reason.
Ed-Fi Alliance listed seven predetermined categories for this descriptor and -
as usual feature of descriptors in the model - left the adjustments of these
categories to the community members for more specific and suitable usage of each
educational agents.

### Adding Student Program Evaluation

[DATASTD-1906](https://tracker.ed-fi.org/browse/DATASTD-1906)

A new model for the Student Program Evaluation data domain in the Ed-Fi data
standard has been created to address multiple state agencies' needs to keep
track of student program evaluation data. These needs mainly stems from the
Early Child education program performance tracking of states Wisconsin,
Minnesota and Indiana as well as the 21st CCLC programs implemented in Arizona.
For these programs Ed-Fi community member states indicated that a student
program evaluation model would provide them benefits in

Demonstrating program effectiveness: Program evaluation data can be used to
demonstrate the effectiveness of educational programs to stakeholders,
including funders, accrediting bodies, and policymakers. The data can be
used to show the impact of the program on student outcomes, such as
graduation rates, academic performance, and career success.

Improving student engagement and satisfaction: Student program evaluation
data can provide insights into student engagement and satisfaction with the
program. By using this data, educators can make changes to improve the
student experience and increase engagement and satisfaction.

Identifying areas of improvement: Student program evaluation data provides
valuable insights into areas where programs are succeeding and where they
need improvement. By analyzing the data, educators and administrators can
identify specific areas that require attention and make changes to better
serve their students.

Ensuring accountability: Tracking program evaluation data can help ensure
accountability for educational institutions and programs. By regularly
collecting and analyzing data, educators and administrators can identify
areas where they may not be meeting their goals and take action to address
these issues.

The proposed domain model for the Student Program Evaluation data domain aims to
capture the child outcomes indicator for early childhood evaluations as well as
students' performance in programs. The model includes entities such as
StudentProgramEvaluation, ProgramEvaluation, ProgramEvaluationObjective,
ProgramEvaluationElement, EvaluationRubricDimension. These entities are related
to each other to provide insights into the effectiveness of programs and help in
making data-driven decisions. This model can also accommodate other evaluation
types and can be extended to accommodate additional entities and relationships
as needed.

More details can be found in the [related](https://tracker.ed-fi.org/browse/DATASTD-1906)
[ticket](https://tracker.ed-fi.org/browse/DATASTD-1906) and the [ED-FI WORKING](https://edfi.atlassian.net/wiki/display/EFDSDRAFT/ED-FI+WORKING+DRAFT+12+-+STUDENT+PROGRAM+EVALUATION+DOMAIN+MODEL)
[DRAFT](https://edfi.atlassian.net/wiki/display/EFDSDRAFT/ED-FI+WORKING+DRAFT+12+-+STUDENT+PROGRAM+EVALUATION+DOMAIN+MODEL)
[12](https://edfi.atlassian.net/wiki/display/EFDSDRAFT/ED-FI+WORKING+DRAFT+12+-+STUDENT+PROGRAM+EVALUATION+DOMAIN+MODEL).

### Section Model Updates

[DATASTD-1596](https://tracker.ed-fi.org/browse/DATASTD-1596)

Section in the current model combines the aspects of scheduling of instruction
in a course offering for students and teacher and students' attempted credits,
grades and the responsible teacher/instructor they work with for that course
offering.

### Diversity, Equity and Inclusion Related Updates

In 2022, Data Standard team along with some other members of the Ed-Fi
technology team have received requests from the Ed-Fi community members for a
discussion on a possible implementation of diversity, equity and inclusion (DEI)
related topics and data collection. Following the prevalence assessment of the
request, the Data Standard team established a DEI SIG based on Ed-Fi Governance
policies so that the community members could guide the team through discussions
in these group meetings on topics that are predetermined by Ed-Fi community
members earlier or at these group meetings.

A group of Ed-Fi community members were invited to participate, including local
and state education agencies as well as members of some research institutes and
other organizations that have shown a previous interest on the topic. The [Ed-Fi](https://edfi.atlassian.net/wiki/display/ESIG/DEI+Special+Interest+Group)
[DEI](https://edfi.atlassian.net/wiki/display/ESIG/DEI+Special+Interest+Group)
[SIG](https://edfi.atlassian.net/wiki/display/ESIG/DEI+Special+Interest+Group)
was initiated with its first meeting in February. The group has completed three
meetings with an achievement of fruitful discussions and completion of all
topics that were pointed before and during the existence of the group. It is
decided that the group will give the Ed-Fi Data Standard a time to internally
discuss the guidance provided at these meetings and have a meeting or two later
based on this internal process and for the possible additional topics during
that time.

Main topics discussed during DEI SIG meetings are as follow:

* Renaming the Parent domain entity in the Ed-Fi model to have more inclusive
    approach,
* Adding Preferred First Name and Preferred Last Name in Name common,
* Correcting the vocabulary confusions in the definition of Sex descriptor,
* Considering adding a Gender Identity attribute to the model,
* Considering to add Pronouns string in the model,
* Keeping up with the developments on Race and Ethnicity Standards by U.S.
    Office of Management and Budget Interagency Technical Working Group.

Data standard team have taken these recommendations from the DEI SIG members and
made necessary model changes to reflect these recommendations on to the Data
Standard model after another serious discussions internally and other members of
the Ed-Fi community. Ed-Fi is proud to report that the DEI SIG has been a grate
success with its reflections on the model.

#### Renaming Parent Domain Entity to Contact

[DATASTD-1536](https://tracker.ed-fi.org/browse/DATASTD-1536)
[DATASTD-1940](https://tracker.ed-fi.org/browse/DATASTD-1940)

The topic was discussed by the DEI SIG at its first meeting based on the Ed-Fi
community members' recommendation at the Technical Congress of 2022. The group
had the consensus at the meeting which suggested that the term Parent that is
used for this domain entity is not inclusive despite the fact that in the field
of education the term Parent can be used very liberally. Group discussed if
responsible adult, caregiver or another alternative will be a better fit. After
this discussion responsible adult was ruled out since it is not inclusive either
and data standard team was given the option to have an internal discussion to
choose between contact or caregiver. Considering the currently available
ContactType descriptor, the Data Standard team rename the Parent domain entity
as Contact and downstream that change by updating the name and definition of
StudentParentAssociation, SurveyResponce domain entity and
StudentIdentificationAndDemographics domain.

#### Adding Preferred First Name and Preferred Last Name to the Name Common

[DATASTD-1948](https://tracker.ed-fi.org/browse/DATASTD-1948)

Another topic the Data Standard team picked up from the DEI SIG discussion and
had a conclusion on was the adding the Preferred First Name and Preferred Last
Name. The DEI SIG discussed multiple use cases from the safety concerns of the
persona subject to the use of different first and/or last name to the personal
preference of using an English version or alternative names because of the
pronunciation difficulties of none English names. Data Standard team found the
recommended addition trivial and the argument with use cases convincing and
followed group's recommendation by adding these two field in the Name common.

#### Sex Descriptor Updates and Adding Gender Identity

[DATASTD-1888](https://tracker.ed-fi.org/browse/DATASTD-1888)
[DATASTD-1938](https://tracker.ed-fi.org/browse/DATASTD-1938)

One of the longest conversations Data Standard team had with the community
members with the guidance of the DEI SIG members was about the Sex descriptor
and Gender Identity. As the result of theses conversation, Ed-Fi definition of
the Sex descriptor and where it is collected has been updated and a new string
variable to allow the community members to collect data on Gender Identity when
they needed added to the core model with this release. More details about the
issue can be tracked in the tickets attached here.

### Removal of Previously Deprecated Elements

[DATASTD-1944](https://tracker.ed-fi.org/browse/DATASTD-1944)

The Data Standard team has the tradition of marking an element that is subject
to removal form the Ed-Fi model as "Deprecated" once an element of the model
becomes obsolete based on newly introduce updates in the model. Deprecation
notices are visible in handbooks and UML diagrams.

The purpose of the deprecation note is to inform the community members of intent
to remove the element from the core model after giving the community members
time for preparation. With this intend there has been numerous elements of the
Ed-Fi model that have been marked as deprecated, but not removed.

[DATASTD-1942](https://tracker.ed-fi.org/browse/DATASTD-1942)

The Data Standard team conducted an assessment to find these elements in the
model where their removal was recommended and formulated, but has not been
performed yet. The assessment has shown that there are more than two dozens of
such cases (from a Common to Domain Entity, Boolean to Shared Decimal) all of
which were marked since the system upgrade from Suite 2 to Suite 3. The
assessment has shown that most of the domains listed in the overview section has
some of these elements.

Based on this assessment results, the Data Standard team worked with other Ed-Fi
technology team members not only to perform the removal of these elements but
also to create a policy in guiding future removal. By doing so, Data Standard
hopes to give the community members a better predictable updates in the model in
this regard.

The decision is to have these fields or other elements of the model to be
removed at the second year of breaking changes following the version when the
deprecation note would be introduced. It is also decided that the sample data
for the element which is the subject of the removal will be removed from the
data standard system at the same time when removal will be performed. These two
practices of removal will be performed in consideration with the Break-Rest
policy of data standard team (_or data standard release cadence_).

Considering the current data standard release cadence (_Break-Break-Rest_) that
started implementation with Data Standard v4.0 if an element is marked as
deprecated in a Data Standard model that is introduced with the first breaking
year of the cadence, the removal of that element will be performed in the first
breaking year of the next cycle of the cadence. Similarly, if the deprecation
mark was introduced in the second break year, the removal will be in the second
breaking year of the next cycle. In this way, Ed-Fi community members will have
three years to adopt their system for the removal of obsolete model elements
assuming the continuity of the current release policy.

### Changes on Student School Association

[DATASTD-1939](https://tracker.ed-fi.org/browse/DATASTD-1939)

As a part of state assessment of school funding process for the upcoming school
it was reported by an Ed-Fi community member that some additional fields are
needed as an optional data collection in the Ed-Fi model. Same community member
also shared an extended use of SchoolChoice. Based on these recommendations Data
Standard team implemented following updates on the StudentSchoolAssociation.

* Adding
  * NextYearSchool number,
  * NextYearGradeLevel descriptor,
  * SchoolChoice boolean,
  * SchoolChoiceBasis descriptor,
  * EnrollmentType descriptor,
* Marking SchoolChoiceTransfer as deprecated to be removed from the model on
    Data Standard v7.0 as suggested by the deprecated element removal policy
    aligned with the Data Standard release cadence mentioned earlier.

### Adding Grading Period Name

[DATASTD-1919](https://tracker.ed-fi.org/browse/DATASTD-1919)

It was brought to Ed-Fi Alliance's attention by some Student Information System
(SIS) providers that GradingPeriod descriptor is not fulling their need in some
use cases, specifically for those when SIS vendors need to create a unique
grading period to match their data representation which is also better align
with practices at the local level compared to the pre-defined grading periods by
SEAs. To provide ease to the implementers and local educational agencies in
their accurate data collection and a freedom that fits in their practices, Ed-Fi
created GradingPeriodName as a required attribute in Grading Period entity. With
this addition the definition of the GradingPeriod descriptor in the same entity
has been updated to reflect that it is the naming pre-defined by the SEA and
PeriodSequence attribute made optional instead of required.

## Minor Changes

### Updates on EventDuration Field

[DATASTD-1911](https://tracker.ed-fi.org/browse/DATASTD-1911)

The documentation of the field in the Ed-Fi system has been updated to reflect
that EventDuration is the amount of time as a decimal fraction for the event as
recognized by the school. Minimum and Maximum value constraint are also added to
the field.

### Updates on LetterGradeEarned

[DATASTD-1912](https://tracker.ed-fi.org/browse/DATASTD-1912)

Definition for the LetterGradeEarned has been updated and the Maximum length
value is redefined as 64 instead of 20.

### Updating EarnedCredit as optional on CourseTranscript

[DATASTD-1934](https://tracker.ed-fi.org/browse/DATASTD-1934)

The cardinality of the EarnedCredit on the CourseTranscript domain entity has
updated from required to optional based on the feedback collected from Ed-Fi
community members.

### Update on BeginDate in StaffSectionAssociation

[DATASTD-1744](https://tracker.ed-fi.org/browse/DATASTD-1744)

The BeginDate attribute is made an identity field for the
StaffSectionAssociation to have parallel with the decision made for the same
attribute in the StudentSectionAssociation as introduced by the new Section
model updates.

### Update on the Definition of Term and Session

[DATASTD-1973](https://tracker.ed-fi.org/browse/DATASTD-1973)

We have realized that there has been a confusion among the Ed-Fi community
members about Ed-Fi's definition of Session and Term. To prevent these
confusions and any misusage of them, the definition of these terms are updated
in this version.

### Adding AnnualWage

[DATASTD-2068](https://tracker.ed-fi.org/browse/DATASTD-2068)

Upon a report that indicate the misusage of the HourlyWage field in the core
model because of the lack of attribute for the annual wage of staff in the
StaffEducationOrganizationEmploymentAssociation and an extension created by
another state, the AnnualWage attribute is added to the core model as an
optional data for the association.

### Adding SupporterMilitaryConnection

[DATASTD-2069](https://tracker.ed-fi.org/browse/DATASTD-2069)

After reviewing multiple states' use case for data collection practices on the
military connection of people who are responsible for students,
SupporterMilitaryConnection descriptor is added as optional attribute to the
StudentEducationOrganizationAssociation. Predefined values for this descriptor
are; Active Duty, Reserve, Veteran, DoD Civilian, Not Military Connected and
Unknown.

## List of All Changes

* [SPED Changes based on SC discussion](https://tracker.ed-fi.org/browse/DATASTD-2105)
* [Data Standard v5.0 Final Release Punchlist](https://tracker.ed-fi.org/browse/DATASTD-2076)
* [GradingPeriod Sample Data Updates](https://tracker.ed-fi.org/browse/DATASTD-2074)
* [Consider adding family members' military connection descriptor to StudentEdOrgAssociation](https://tracker.ed-fi.org/browse/DATASTD-2069)
* [Adding AnnualWage to Capture Staff Compensation](https://tracker.ed-fi.org/browse/DATASTD-2068)
* [Entities within StudentProgramEvaluation have duplicate names with TPDM-Core PerformanceEvaluation entities](https://tracker.ed-fi.org/browse/DATASTD-2019)
* [StudentProgramEvaluation duplicates EPDM Evaluation names](https://tracker.ed-fi.org/browse/DATASTD-2018)
* [Data Standard v5.0-pre2 Punchlist](https://tracker.ed-fi.org/browse/DATASTD-2006)
* [Updates to PersonalInformationVerification data in contact data](https://tracker.ed-fi.org/browse/DATASTD-2005)
* [Fix StudentDiscipline.xml sample data](https://tracker.ed-fi.org/browse/DATASTD-2003)
* [Sample Data updates for main from pre-contact-branch fixes](https://tracker.ed-fi.org/browse/DATASTD-2002)
* [Fix sample data for Preferred Names - main](https://tracker.ed-fi.org/browse/DATASTD-1999)
* [Sample data updates requested by platform team](https://tracker.ed-fi.org/browse/DATASTD-1990)
* [Remove TPDM related descriptor files from Ed-Fi-Standard repo](https://tracker.ed-fi.org/browse/DATASTD-1988)
* [Implement Student Program Evaluation Model](https://tracker.ed-fi.org/browse/DATASTD-1986)
* [Create Sample Data for Student Program Evaluation](https://tracker.ed-fi.org/browse/DATASTD-1984)
* [Data Standard v5.0-pre1 PunchList](https://tracker.ed-fi.org/browse/DATASTD-1958)
* [Mobility Rate Indicator](https://tracker.ed-fi.org/browse/DATASTD-1956)
* [Sample Data for PreferedFirstName and PreferedLastSurname](https://tracker.ed-fi.org/browse/DATASTD-1951)
* [Sample Data updates for StudentSchoolAssociation](https://tracker.ed-fi.org/browse/DATASTD-1950)
* [Sample Data updates for Parent to Contact changes](https://tracker.ed-fi.org/browse/DATASTD-1949)
* [Add PreferredFirstName and PreferredLastName to name common](https://tracker.ed-fi.org/browse/DATASTD-1948)
* [Implement changes to StudentSchoolAssociation](https://tracker.ed-fi.org/browse/DATASTD-1941)
* [Updates to Parent and related entities](https://tracker.ed-fi.org/browse/DATASTD-1940)
* [CLONE - Delaware is implementing some extensions to support its' funding process and has several suggestions.](https://tracker.ed-fi.org/browse/DATASTD-1939)
* [Sex and Gender Updates](https://tracker.ed-fi.org/browse/DATASTD-1938)
* [Change schoolId from int32 to varchar 30 or int64](https://tracker.ed-fi.org/browse/DATASTD-1916)
* [Create best practices documentation for Student Transcript Credit Use Cases](https://tracker.ed-fi.org/browse/DATASTD-1915)
* [Update to LetterGradeEarned and GradeEarned](https://tracker.ed-fi.org/browse/DATASTD-1912)
* [Update documentation and add constraints to EventDuration field for StudentSchoolAttendanceEvent](https://tracker.ed-fi.org/browse/DATASTD-1911)
