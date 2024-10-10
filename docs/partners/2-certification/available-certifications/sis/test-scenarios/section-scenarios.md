# v5 MasterSchedule > Section Scenarios

The Master Schedule interchange loads education course offerings and their
schedule. It can be used to exchange data regarding the course offerings,
sections, and bell schedule for a school.

The Section entity represents a setting in which organized instruction of course
content is provided, in-person or otherwise, to one or more students for a given
period of time. A course offering may be associated to more than one section.

### Prerequisites

* Class Period
* Location
* Course Offering

### Scenarios

1. Create a Section for Grand Bend Elementary School which references the
    Course Offering added for "English Language Arts, Grade 1"
2. Create a Section for Grand Bend High School which references the Course
    Offering added for  "ALGEBRA 1"
3. Update the availableCredits for the for Grand Bend Elementary School Section
4. Update the availableCredits for the Grand Bend High School section

| Resource | Property Name | Is Collection | Data Type | Required / Optional | Scenario 1  <br/>POST | Scenario 2  <br/>POST | Scenario 3  <br/>PUT | Scenario 4  <br/>PUT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Sections | classPeriods | TRUE | classPeriods{} | REQUIRED |     |     |     |     |
| classPeriods | classPeriodReference | FALSE | classPeriodReference | REQUIRED |     |     |     |     |
| classPeriodReference | classPeriodName | FALSE | string | REQUIRED | ["Class Period 01" if possible<br/><br/>| system value] | ["Class Period 01" if possible<br/><br/>| system value] | ["Class Period 01" if possible<br/><br/>| system value] | ["Class Period 01" if possible<br/><br/>| system value] |
| classPeriodReference | schoolId | FALSE | integer | REQUIRED | 255901107 | 255901001 | 255901107 | 255901001 |
| Sections | courseOfferingReference | FALSE | courseOfferingReference | REQUIRED |     |     |     |     |
| courseOfferingReference | sessionName | FALSE | string | REQUIRED | 2016-2017 Fall Semester | 2016-2017 Fall Semester | 2016-2017 Fall Semester | 2016-2017 Fall Semester |
| courseOfferingReference | localCourseCode | FALSE | string | REQUIRED | ["ELA-01"  if possible<br/><br/>| system value] | ["ALG-2"  if possible<br/><br/>| system value] | ["ELA-01"  if possible<br/><br/>| system value] | ["ALG-2"  if possible<br/><br/>| system value] |
| courseOfferingReference | schoolId | FALSE | integer | REQUIRED | 255901107 | 255901001 | 255901107 | 255901001 |
| courseOfferingReference | schoolYear | FALSE | integer | REQUIRED | 2017 | 2017 | 2017 | 2017 |
| Sections | locationReference | FALSE | locationReference | REQUIRED |     |     |     |     |
| locationReference | classroomIdentificationCode | FALSE | string | REQUIRED | ["501"  if possible<br/><br/>| system value] | ["901"  if possible<br/><br/>| system value] | ["501"  if possible<br/><br/>| system value] | ["901"  if possible<br/><br/>| system value] |
| locationReference | schoolId | FALSE | integer | REQUIRED | 255901107 | 255901001 | 255901107 | 255901001 |
| Sections | schoolReference | FALSE | integer | REQUIRED |     |     |     |     |
| schoolReference | schoolId | FALSE | integer | REQUIRED | 255901107 | 255901001 | 255901107 | 255901001 |
| Sections | sequenceOfCourse | FALSE | integer | REQUIRED | 1   | 1   | 1   | 1   |
| Sections | sectionIdentifier | FALSE | nvarchar | REQUIRED | ["ELA012017RM555"  if possible<br/><br/>| system value] | ["ALG12017RM901"  if possible<br/><br/>| system value] | ["ELA012017RM555"  if possible<br/><br/>| system value] | ["ALG12017RM901"  if possible<br/><br/>| system value] |
| Sections | availableCredits | FALSE | number | REQUIRED | 1   | 1   | **2** | **3** |
| Sections | educationalEnvironmentDescriptor | FALSE | educationalEnvironmentDescriptor | REQUIRED | Classroom | Classroom | Classroom | Classroom |
