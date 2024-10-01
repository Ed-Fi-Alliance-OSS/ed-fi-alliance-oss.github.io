# v5 MasterSchedule > CourseOffering Scenarios

The Master Schedule interchange loads education course offerings and their
schedule. It can be used to exchange data regarding the course offerings,
sections, and bell schedule for a school.

The Course Offering entity represents an entry in the course catalog of
available courses offered by the school during a session. This Step is typically
provided by the SIS Vendor and is required.

### Prerequisites

* Course (ODS is pre-populated with Course records)
* Session

### Scenarios

1. Create a Course Offering for Grand Bend Elementary School for Fall Semester
    2015 which references the Course"English Language Arts, Grade 1"
2. Create a Course Offering for Grand Bend High School for Fall Semester
    2015 which references the Course "ALGEBRA 1"
3. Update the LocalCourseTitle  on the newly added Course offering for Grand
    Bend Elementary School
4. Update the LocalCourseTitle  on the newly added Course offering for Grand
    Bend High School

 *Note: localCourseTitle can duplicate the value in courseCode if not tracked in
 your SIS.*

| Resource | Property Name | Is Collection | Data Type | Required / Optional | Scenario 1  <br/>POST | Scenario 2  <br/>POST | Scenario 3  <br/>PUT | Scenario 4  <br/>PUT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CourseOfferings | courseReference | FALSE | courseReference | REQUIRED |     |     |     |     |
| courseReference | courseCode | FALSE | string | REQUIRED | ELA-01 | ALG-01 | ELA-01 | ALG-01 |
| courseReference | educationOrganizationId | FALSE | integer | REQUIRED | 255901107 | 255901001 | 255901107 | 255901001 |
| CourseOfferings | schoolReference | FALSE | integer | REQUIRED |     |     |     |     |
| schoolReference | schoolId | FALSE | integer | REQUIRED | 255901107 | 255901001 | 255901107 | 255901001 |
| CourseOfferings | sessionReference | FALSE | sessionReference | REQUIRED |     |     |     |     |
| sessionReference | sessionName | FALSE | string | REQUIRED | 2016-2017 Fall Semester | 2016-2017 Fall Semester | 2016-2017 Fall Semester | 2016-2017 Fall Semester |
| sessionReference | schoolId | FALSE | integer | REQUIRED | 255901107 | 255901001 | 255901107 | 255901001 |
| sessionReference | schoolYear | FALSE | integer | REQUIRED | [Current School Year] | [Current School Year] | [Current School Year] | [Current School Year] |
| CourseOfferings | localCourseTitle | FALSE | string | REQUIRED | English Language Arts GB Elementary | Algebra 02 GBHS | English Language Arts, Grade 1 | Algebra II |
| CourseOfferings | localCourseCode | FALSE | string | REQUIRED | ["ELA-01"  if possible<br/><br/>| system value] | ALG-2 | ["ELA-01"  if possible<br/><br/>| system value] | ALG-2 |
