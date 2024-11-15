# v5 Student > Student Scenarios

This interchange defines students and contains all their identifying
information.

This entity represents an individual for whom instruction, services, and/or care
are provided in an early childhood, elementary, or secondary educational program
under the jurisdiction of a school, education agency or other institution or
program. A student is a person who has been enrolled in a school or other
educational institution.

### Prerequisites

* None

### Scenarios

1. Create a 7-year-old Student, which will be later enrolled at Grand Bend
   Elementary School.
2. Create a 15-year-old Student, which will be later enrolled at Grand Bend High
   School.
3. Update the Birth date on the first Student.
4. Update the Birth City on the second Student.

| Resource | Property Name          | Is Collection | Data Type              | Required / Optional | Scenario 1: POST | Scenario 2: POST | Scenario 3: PUT | Scenario 4: PUT |
| -------- | ---------------------- | ------------- | ---------------------- | ------------------- | -------------------- | -------------------- | ------------------- | ------------------- |
| Students | studentUniqueId        | FALSE         | string                 | REQUIRED            | 111111               | 222222               | 111111              | 222222              |
| Students | birthCity              | FALSE         | string                 | REQUIRED            | Grand Bend           | Grand Bend           | Grand Bend          | Grand **Oaks**      |
| Students | birthCountryDescriptor | FALSE         | birthCountryDescriptor | REQUIRED            | AG                   | US                   | AG                  | US                  |
| Students | birthDate              | FALSE         | date                   | REQUIRED            | 1/1/2009             | 1/1/2001             | **1/2/2009**        | 1/1/2001            |
| Students | firstName              | FALSE         | string                 | REQUIRED            | Austin               | Madison              | Austin              | Madison             |
| Students | middleName             | FALSE         | string                 | REQUIRED            | Samuel               | Mary                 | Samuel              | Mary                |
| Students | lastSurname            | FALSE         | string                 | REQUIRED            | Jones                | Johnson              | Jones               | Johnson             |
| Students | generationCodeSuffix   | FALSE         | string                 | CONDITIONAL         | JR                   |                      | JR                  |                     |
| Students | personalTitlePrefix    | FALSE         | string                 | CONDITIONAL         | Mr.                  | Ms.                  | Mr.                 | Ms.                 |
