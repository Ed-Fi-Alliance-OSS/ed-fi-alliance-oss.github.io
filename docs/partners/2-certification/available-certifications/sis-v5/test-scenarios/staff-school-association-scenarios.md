---
hide_table_of_contents: true
---

# v5 StaffAssociation > StaffSchoolAssociation Scenarios

StaffAssociation defines staff information. It can be used to define employment,
assignment, and teaching associations, as well as staff positions
and staff leave events.

The StaffSchoolAssociation indicates the School(s) to which a staff member
provides instructional services.

## Prerequisites

* Staff
* StaffEducationOrganizationAssignmentAssociations

## Scenarios

1. Create a StaffSchoolAssociation for a staff record at Grand Bend Elementary
   School.
2. Create a StaffSchoolAssociation for a staff record at Grand Bend High School.
3. Delete the StaffSchoolAssociation at Grand Bend Elementary School.

| Resource                | Property Name               | Is Collection | Data Type                   | Required | Scenario 1: POST                       | Scenario 2: POST                       |
| ----------------------- | --------------------------- | ------------- | --------------------------- | -------- | -------------------------------------- | -------------------------------------- |
| StaffSchoolAssociations | schoolReference             | FALSE         | schoolReference             | REQUIRED |                                        |                                        |
| schoolReference         | schoolId                    | FALSE         | integer                     | REQUIRED | 255901107                              | 255901001                              |
| StaffSchoolAssociations | staffReference              | FALSE         | integer                     | REQUIRED |                                        |                                        |
| staffReference          | staffUniqueId               | FALSE         | string                      | REQUIRED | ["207220" if possible \| system value] | ["207269" if possible \| system value] |
| StaffSchoolAssociations | programAssignmentDescriptor | FALSE         | programAssignmentDescriptor | REQUIRED | Regular education                      | Regular education                      |
