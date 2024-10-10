# v5 Student Enrollment > StudentSectionAssociation Scenarios

The Student Enrollment interchange describes student enrollments in schools and
in sections.
The StudentSectionAssociation association indicates the course sections to which
a student is assigned.

### **Prerequisites**

* Student
* Section
* Student School Association

### Scenarios

1. Create a Student Section Association for a Student at Grand Bend Elementary
    School.
2. Create a Student Section Association for a Student at Grand Bend High
    School.
3. Update the end date for the Student Section Association at Grand Bend
    Elementary School.
4. Update the end date for the Student Section Association at Grand Bend High
    School.
5. Delete the StudentSectionAssociation for the elementary school student.

| Resource | Property Name | Is Collection | Data Type | Required / Optional | Scenario 1  <br/>POST | Scenario 2  <br/>POST | Scenario 3  <br/>PUT | Scenario 4  <br/>PUT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| StudentSectionAssociations | sectionReference | FALSE | sectionReference | REQUIRED |     |     |     |     |
| sectionReference | localCourseCode | FALSE | string | REQUIRED | ["ELA-01"  if possible<br/><br/>| system value] | ["ALG-2"  if possible<br/><br/>| system value] | ["ELA-01"  if possible<br/><br/>| system value] | ["ALG-2"  if possible<br/><br/>| system value] |
| sectionReference | schoolId | FALSE | integer | REQUIRED | 255901107 | 255901001 | 255901107 | 255901001 |
| sectionReference | schoolYear | FALSE | integer | REQUIRED | <br/>[Current School Year]<br/> | <br/>[Current School Year]<br/> | <br/>[Current School Year]<br/> | <br/>[Current School Year]<br/> |
| sectionReference | sectionIdentifier | FALSE | string | REQUIRED | ["ELA012017RM555"  if possible<br/><br/>| system value] | ["ALG12017RM901"  if possible<br/><br/>| system value] | ["ELA012017RM555"  if possible<br/><br/>| system value] | ["ALG12017RM901"  if possible<br/><br/>| system value] |
| sectionReference | sessionName | FALSE | string | REQUIRED | 2016-2017 Fall Semester | 2016-2017 Fall Semester | 2016-2017 Fall Semester | 2016-2017 Fall Semester |
| StudentSectionAssociations | studentReference | FALSE | studentReference | REQUIRED |     |     |     |     |
| studentReference | studentUniqueId | FALSE | string | REQUIRED | 111111 | 222222 | 111111 | 222222 |
| StudentSectionAssociations | beginDate | FALSE | date | REQUIRED | 09/01/<br/><br/>[Current School Year] | 08/31/<br/><br/>[Current School Year] | 09/01/<br/><br/>[Current School Year] | 08/31/<br/><br/>[Current School Year] |
| StudentSectionAssociations | endDate | FALSE | date | REQUIRED | 12/16/<br/><br/>[Current School Year] | 12/16/<br/><br/>[Current School Year] | **12/10/**<br/><br/>**[Current School Year]** | **12/10/**<br/><br/>**[Current School Year]** |
| StudentSectionAssociations | homeroomIndicator | FALSE | boolean | CONDITIONAL | False | True | False | True |
