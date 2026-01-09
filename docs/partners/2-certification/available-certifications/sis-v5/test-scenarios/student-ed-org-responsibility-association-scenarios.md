---
hide_table_of_contents: true
---

# v5 Student Enrollment > StudentEdOrgResponsibilityAssociation Scenarios

The StudentEducationOrganizationResponsibilityAssociation (SEORA) indicates a relationship between a student and an education organization other than an enrollment relationship,
and generally indicates some kind of accountability or responsibility of the education organization for the student. The kind of responsibility is specified in the Responsibility
descriptor value according to policy.

Enrollment relationship semantics are covered by [StudentSchoolAssociation. Domain: Enrollment](https://docs.ed-fi.org/reference/data-exchange/data-standard/model-reference/enrollment-domain/best-practices/#best-practices-related-to-the-studenteducationorganizationresponsibilityassociation-seora)

This association represents student information that is specific to a student's
relationship with an EducationOrganization. Enrollment relationship semantics
are covered
by [https://edfi.atlassian.net/wiki/spaces/EDFI/pages/22450000](https://edfi.atlassian.net/wiki/spaces/EDFI/pages/22450000).

## Prerequisites

* Student
* School

## Scenarios

1. Create a second Student EdOrg Responsibility Association for an elementary Student at Grand Bend
   School District.
2. Update the responsibility descriptor on the student.

### Additional Notes

* A SEORA is written when the responsibility for a student is a different education organization than the enrollment school in the SSA.
* The BeginDate and EndDate of the SEORA should be informed by the EntryDate and ExitWithdrawDate of a student’s SSA(s). There may be circumstances when they may be legitimately different.

| Resource                                                           | Property Name                           | Is Collection | Data Type                             | Required    | Scenario 1: POST                         | Scenario 2: POST                         |
| ------------------------------------------------------------------ | --------------------------------------- | ------------- | ------------------------------------- | ----------- | ---------------------------------------- | ---------------------------------------- |
| StudentEducationOrganizationResponsibilityAssociations             | educationOrganizationReference          | FALSE         | educationOrganizationReference        | REQUIRED    |                                          |                                          |
| educationOrganizationReference                                     | educationOrganizationId                 | FALSE         | integer                               | REQUIRED    | 255901                                   | 255901                                   |
| StudentEducationOrganizationResponsibilityAssociations             | studentReference                        | FALSE         | studentReference                      | REQUIRED    |                                          |                                          |
| studentReference                                                   | studentUniqueId                         | FALSE         | string                                | REQUIRED    | 111111                                   | 222222                                   |
| StudentEducationOrganizationResponsibilityAssociations             | beginDate                               | FALSE         | string                                | REQUIRED    | [current school year]-08-23              |                                          |
| StudentEducationOrganizationResponsibilityAssociations             | responsibilityDescriptor                | FALSE         | string                                | REQUIRED    | Residency                                | Individualized Education Program         |
| StudentEducationOrganizationResponsibilityAssociations             | endDate                                 | FALSE         | string                                | REQUIRED    | [current school year]-06-01              | [current school year]-06-01              |
