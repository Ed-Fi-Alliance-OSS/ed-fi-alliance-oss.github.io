---
hide_table_of_contents: true
---

# v5 StaffAssociation > StaffSectionAssociation Scenarios

StaffAssociation defines staff information. It can be used to define employment,
assignment, and teaching associations, as well as staff positions
and staff leave events.

The StaffSchoolAssociation indicates the School(s) to which a staff member
provides instructional services.

## Prerequisites

* Section
* Staff

### Scenarios

1. Create a StaffSectionAssociation for a staff record at Grand Bend Elementary
   School and the English Language Arts, Grade 1 section.
2. Create a StaffSectionAssociation for a staff record at Grand Bend High School
   and the ALGEBRA 1 section.
3. Update the classroomPositionDescriptor on the first StaffSectionAssociation.
4. Update the endDate for the second StaffSectionAssociation record
5. Delete the StaffSectionAssociation for the English Language Arts, Grade 1
   section at Grand Bend Elementary School.

## Additional Requirements

* A teacher's highly qualified status may be recorded either at the Staff level
  or at the Staff Section Association level.

| Resource                 | Property Name               | Is Collection | Data Type                   | Required | Scenario 1: POST                               | Scenario 2: POST                              | Scenario 3: PUT                                | Scenario 4: PUT                               |
| ------------------------ | --------------------------- | ------------- | --------------------------- | -------- | ---------------------------------------------- | --------------------------------------------- | ---------------------------------------------- | --------------------------------------------- |
| StaffSectionAssociations | sectionReference            | FALSE         | sectionReference            | REQUIRED |                                                |                                               |                                                |                                               |
| sectionReference         | localCourseCode             | FALSE         | string                      | REQUIRED | ["ELA-01" if possible \| system value]         | ["ALG-2" if possible  \| system value]        | ["ELA-01" if possible \| system value]         | ["ALG-2" if possible \| system value]         |
| sectionReference         | schoolId                    | FALSE         | integer                     | REQUIRED | 255901107                                      | 255901001                                     | 255901107                                      | 255901001                                     |
| sectionReference         | schoolYear                  | FALSE         | integer                     | REQUIRED | 2017                                           | 2017                                          | 2017                                           | 2017                                          |
| sectionReference         | sessionName                 | FALSE         | string                      | REQUIRED | 2016-2017 Fall Semester                        | 2016-2017 Fall Semester                       | 2016-2017 Fall Semester                        | 2016-2017 Fall Semester                       |
| sectionReference         | sectionIdentifier           | FALSE         | string                      | REQUIRED | ["ELA012017RM555" if possible \| system value] | ["ALG12017RM901" if possible \| system value] | ["ELA012017RM555" if possible \| system value] | ["ALG12017RM901" if possible \| system value] |
| StaffSectionAssociations | staffReference              | FALSE         | staffReference              | REQUIRED |                                                |                                               |                                                |                                               |
| staffReference           | staffUniqueId               | FALSE         | string                      | REQUIRED | ["207220" if possible \| system value]         | ["207269" if possible \| system value]        | ["207220" if possible \| system value]         | ["207269" if possible \| system value]        |
| StaffSectionAssociations | classroomPositionDescriptor | FALSE         | classroomPositionDescriptor | REQUIRED | Teacher of Record                              | Teacher of Record                             | **Assistant Teacher**                          | Teacher of Record                             |
| StaffSectionAssociations | beginDate                   | FALSE         | date                        | REQUIRED | [Current School Year]-08-31                    | [Current School Year]-08-31                   | [Current School Year]-08-31                    |                                               |
| StaffSectionAssociations | endDate                     | FALSE         | date                        | REQUIRED |                                                |                                               |                                                | [Current School Year]-**06-01**               |
