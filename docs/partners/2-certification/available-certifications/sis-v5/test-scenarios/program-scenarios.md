---
hide_table_of_contents: true
---

# v5 Education Organization > Program Scenarios

This entity represents any program designed to work in conjunction with, or as a
supplement to, the main academic program. Programs may provide instruction,
training, services, or benefits through federal, state, or local agencies.
Programs may also include organized extracurricular activities for students.

## Prerequisites

* None

## Scenarios

1. Create a Bilingual Program.
2. Delete the Bilingual Program.

| Resource                       | Property Name                  | Is Collection | Data Type                      | Required | Scenario 1: POST                    |
| ------------------------------ | ------------------------------ | ------------- | ------------------------------ | -------- | ----------------------------------- |
| Programs                       | educationOrganizationReference | FALSE         | educationOrganizationReference | REQUIRED |                                     |
| educationOrganizationReference | educationOrganizationId        | FALSE         | int                            | REQUIRED | 255901                              |
| Programs                       | programId                      | FALSE         | string                         | REQUIRED | ["101" if possible \| system value] |
| Programs                       | programName                    | FALSE         | string                         | REQUIRED | Grand Bend Bilingual 101            |
| Programs                       | programTypeDescriptor          | FALSE         | programTypeDescriptor          | REQUIRED | Bilingual                           |
