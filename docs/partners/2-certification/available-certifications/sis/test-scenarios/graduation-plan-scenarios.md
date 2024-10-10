# v5 Student Enrollment > Graduation Plan Scenarios

The Student Enrollment interchange describes student enrollments in schools and
in sections.

The Graduation Plan entity is a plan outlining the required credits, credits by
subject, credits by course, and other criteria required for graduation. A
graduation plan may be one or more standard plans defined by an education
organization and/or individual plans for some or all students.

## Prerequisites

* None

## Scenarios

1. Create a Graduation Plan with 28 required credits for Grand Bend High
    School.
2. Create a Graduation Plan with 26 required credits for Grand Bend High
    School.
3. Update the "Recommended" Graduation Plan with 30 required credits for Grand
    Bend High School.
4. Update the "Minimum" Graduation Plan with 24 required credits for Grand Bend
    High School.

| Resource | Property Name | Is Collection | Data Type | Required / Optional | Scenario 1  <br/>POST | Scenario 2  <br/>POST | Scenario 3  <br/>PUT | Scenario 4  <br/>PUT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| GraduationPlans | educationOrganizationReference | FALSE | educationOrganizationReference | REQUIRED |     |     |     |     |
| educationOrganizationReference | educationOrganizationId | FALSE | integer | REQUIRED | 255901001 | 255901001 | 255901001 | 255901001 |
| GraduationPlans | graduationSchoolYearTypeReference | FALSE | graduationSchoolYearTypeReference | REQUIRED |     |     |     |     |
| schoolYearTypeReference | schoolYear | FALSE | integer | REQUIRED | 2020 | 2020 | 2020 | 2020 |
| GraduationPlans | totalRequiredCredits | FALSE | number | REQUIRED | 28  | 26  | 30  | 24  |
| GraduationPlans | graduationPlanTypeDescriptor | FALSE | graduationPlanTypeDescriptor | REQUIRED | Recommended | Minimum | Recommended | Minimum |
