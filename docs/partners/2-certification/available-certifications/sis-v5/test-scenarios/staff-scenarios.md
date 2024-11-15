# v5 StaffAssociation > Staff Scenarios

StaffAssociation defines staff information. It can be used to define employment,
assignment, and teaching associations, as well as staff positions
and staff leave events.

The Staff represents an individual who performs specified activities for any
public or private education institution or agency that provides instructional
and/or support services to students or staff at the early childhood level
through high school completion. For example, this includes:

* An "employee" who performs services under the direction of the employing
  institution or agency is compensated for such services by the employer and is
  eligible for employee benefits and wage or salary tax withholdings.
* A "contractor" or "consultant" who performs services for an agreed upon fee or
  an employee of a management service contracted to work on site.
* A "volunteer" who performs services on a voluntary and uncompensated basis.
* An in-kind service provider.
* An independent contractor or businessperson working at a school site.

## Prerequisites

* Before executing the PUT Statements, you must
  create [StaffEducationOrganizationAssignmentAssociation](./staff-education-organization-assignment-association-scenarios.md)
  records to establish ownership of this staff record by the district.

## Scenarios

1. Create a Staff Record
2. Create a second Staff Record
3. Update the HighlyQualifiedTeacher status on the first staff record
4. Update the hispanicLatinoEthnicity on the second staff record

Additional Requirements for highly qualified teacher requirements:

* A teacher's highly qualified status may be recorded either at the Staff level
  or at the Staff Section Association level.

| Resource             | PropertyName                               | IsCollection | DATA_TYPE             | REQUIRED/ OPTIONAL | POST 1                                 | POST 2                                  | PUT 1                                   | PUT 2                                   |
| -------------------- | ------------------------------------------ | ------------ | --------------------- | ------------------ | -------------------------------------- | --------------------------------------- | --------------------------------------- | --------------------------------------- |
| Staffs               | staffUniqueId                              | FALSE        | string                | REQUIRED           | ["207220" if possible \| system value] | ["207269" if possible  \| system value] | ["207220" if possible  \| system value] | ["207269" if possible  \| system value] |
| Staffs               | firstName                                  | FALSE        | string                | REQUIRED           | John                                   | Jane                                    | John                                    | Jane                                    |
| Staffs               | hispanicLatinoEthnicity                    | FALSE        | boolean               | REQUIRED           | true                                   | true                                    | true                                    | **false**                               |
| Staffs               | lastSurname                                | FALSE        | string                | REQUIRED           | Loyo                                   | Smith                                   | Loyo                                    | Smith                                   |
| Staffs               | birthDate                                  | FALSE        | datetime              | CONDITIONAL        | 1959-04-30                             | 1973-07-20                              | 1959-04-30                              | 1973-07-20                              |
| Staffs               | generationCodeSuffix                       | FALSE        | string                | REQUIRED           | Sr                                     |                                         | Sr                                      |                                         |
| Staffs               | highestCompletedLevelOfEducationDescriptor | FALSE        | integer               | REQUIRED           | Master's                               | Doctorate                               | Master's                                | Doctorate                               |
| Staffs               | highlyQualifiedTeacher                     | FALSE        | boolean               | REQUIRED           | true                                   | true                                    | **false**                               | true                                    |
| Staffs               | middleName                                 | FALSE        | string                | REQUIRED           |                                        | Marcy                                   |                                         | Marcy                                   |
| Staffs               | sexType                                    | FALSE        | integer               | REQUIRED           | Male                                   | Female                                  | Male                                    | Female                                  |
| Staffs               | electronicMails                            | TRUE         | staffElectronicMail[] | REQUIRED           |                                        |                                         |                                         |                                         |
| StaffElectronicMails | electronicMailAddress                      | FALSE        | string                | REQUIRED           | `johnloyo@edficert.org`                | `janesmith@edficert.org`                | `johnloyo@edficert.org`                 | `janesmith@edficert.org`                |
| StaffElectronicMails | electronicMailType                         | FALSE        | integer               | CONDITIONAL        | Work                                   | Work                                    | Work                                    | Work                                    |
