---
hide_table_of_contents: true
---

# v4 Education Organization > Program Scenarios

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
| learningObjectiveReference      | academicSubjectDescriptor      | FALSE         | academicSubjectDescriptor      | OPTIONAL |                                     |
| learningObjectiveReference      | objective                      | FALSE         | string                         | OPTIONAL |                                     |
| learningObjectiveReference      | objectiveGradeLevelDescriptor  | FALSE         | objectiveGradeLevelDescriptor  | OPTIONAL |                                     |
| learningStandardReference       | learningStandardId             | FALSE         | string                         | OPTIONAL |                                     |
| programCharacteristics           | programCharacteristicDescriptor | FALSE         | programCharacteristicDescriptor | OPTIONAL |                                     |
| programLearningObjectives        | learningObjectiveReference      | FALSE         | learningObjectiveReference      | OPTIONAL |                                     |
| programLearningStandards         | learningStandardReference       | FALSE         | learningStandardReference       | OPTIONAL |                                     |
| Programs                       | learningObjectives             | TRUE          | programLearningObjective[]     | OPTIONAL |                                     |
| Programs                       | learningStandards              | TRUE          | programLearningStandard[]      | OPTIONAL |                                     |
| Programs                       | characteristics                | TRUE          | programCharacteristic[]        | OPTIONAL |                                     |
| Programs                       | programId                      | FALSE         | string                         | REQUIRED | ["101" if possible \| system value] |
| Programs                       | programName                    | FALSE         | string                         | REQUIRED | Grand Bend Bilingual 101            |
| Programs                       | sponsors                       | TRUE          | sponsors{}                    | OPTIONAL |                                     |
| Programs                       | programTypeDescriptor          | FALSE         | programTypeDescriptor          | REQUIRED | Bilingual                           |
| Programs                       | services                       | TRUE          | programService[]              | OPTIONAL |                                     |
| programServices                | serviceDescriptor              | FALSE         | serviceDescriptor              | OPTIONAL |                                     |
| programSponsors                | programSponsorDescriptor        | FALSE         | programSponsorDescriptor        | OPTIONAL |                                     |
