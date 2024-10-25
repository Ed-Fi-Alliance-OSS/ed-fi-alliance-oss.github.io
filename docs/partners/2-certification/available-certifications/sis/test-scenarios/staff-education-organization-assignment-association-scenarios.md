# v5 StaffAssociation > StaffEducationOrganizationAssignmentAssociation Scenarios

StaffAssociation defines staff information. It can be used to define employment,
assignment, and teaching associations, as well as staff positions and staff
leave events.

The StaffEducationOrganizationAssignmentAssociation indicates the education
organization to which a staff member provides services; also known as school of
service.

### Prerequisites

* Staff

### Scenarios

1. Create a StaffEducationOrganizationAssignmentAssociation for a staff record
   at Grand Bend Elementary School
2. Create a StaffEducationOrganizationAssignmentAssociation for a staff record
   at Grand Bend High School
3. Update the positionTitle on the first association record, and remove the end
   date.
4. Update the positionTitle on the second association record.

**\*Note:** **positionTitle** can duplicate the value in **staffClassification**
if not tracked in your SIS.\*

| Resource                                         | Property Name                  | Is Collection | Data Type                      | Required / Optional | Scenario 1: POST             | Scenario 2: POST             | Scenario 3: PUT              | Scenario 4: PUT              |
| ------------------------------------------------ | ------------------------------ | ------------- | ------------------------------ | ------------------- | -------------------------------- | -------------------------------- | -------------------------------- | -------------------------------- | -------------------------- | ------------- | -------------------------- | ------------- |
| StaffEducationOrganizationAssignmentAssociations | staffReference                 | FALSE         | staffReference                 | REQUIRED            |                                  |                                  |                                  |                                  |
| staffReference                                   | staffUniqueId                  | FALSE         | string                         | REQUIRED            | ["207220" if possible<br/>       | system value]                    | ["207269" if possible<br/>       | system value]                    | ["207220" if possible<br/> | system value] | ["207269" if possible<br/> | system value] |
| StaffEducationOrganizationAssignmentAssociations | beginDate                      | FALSE         | date                           | REQUIRED            | 01/02/<br/>[Current School Year] | 08/01/<br/>[Current School Year] | 01/01/<br/>[Current School Year] | 08/01/<br/>[Current School Year] |
| StaffEducationOrganizationAssignmentAssociations | educationOrganizationReference | FALSE         | educationOrganizationReference | REQUIRED            |                                  |                                  |                                  |                                  |
| educationOrganizationReference                   | educationOrganizationId        | FALSE         | integer                        | REQUIRED            | 255901107                        | 255901001                        | 255901107                        | 255901001                        |
| StaffEducationOrganizationAssignmentAssociations | staffClassificationDescriptor  | FALSE         | staffClassificationDescriptor  | REQUIRED            | Teacher                          | Teacher                          | Teacher                          | Teacher                          |
| StaffEducationOrganizationAssignmentAssociations | endDate                        | FALSE         | date                           | REQUIRED            | 01/03/[Current School Year]      |                                  |                                  |                                  |
| StaffEducationOrganizationAssignmentAssociations | positionTitle                  | FALSE         | string                         | REQUIRED            | 1st Grade teacher                | 9th Grade Teacher                | 2nd Grade teacher                | 10th Grade Teacher               |
