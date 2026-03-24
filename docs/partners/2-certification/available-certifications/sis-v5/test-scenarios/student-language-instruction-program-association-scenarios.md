---
hide_table_of_contents: true
---

# v5 Student Program > StudentLanguageInstructionProgramAssociation Scenarios

The Student Program interchange loads students' participation in programs.

The Student Language Instruction Program Association represents the Title III,
language instruction program(s) that a student participates in or receives
services from. The association is an extension of the StudentProgramAssociation
particular for language instruction programs.

## Prerequisites

* Ed-Org (pre-loaded)
* Program (pre-loaded)
* Student
* Student Enrollment

## Scenarios

1. Create a Student Language Instruction Program Association for a high school
   student.
2. Update the English Language Proficiency Assessment Participation from Not
   Proficient to Proficient.

(Note: the Program's educationOrganizationId is the Local Education Agency ID)

| Resource                                      | Property Name                               | Is Collection | Data Type                                   | Required | Scenario 1: POST                   | Scenario 2 <br/>PUT                |
| --------------------------------------------- | ------------------------------------------- | ------------- | ------------------------------------------- | -------- | ---------------------------------- | ---------------------------------- |
| StudentLanguageInstructionProgramAssociations | beginDate                                   | FALSE         | date                                        | REQUIRED | 8/23/\[Current School Year\]       | 8/23/\[Current School Year\]       |
| StudentLanguageInstructionProgramAssociations | endDate                                     | FALSE         | date                                        | REQUIRED | 5/23/\[Current School Year\]       | 5/23/\[Current School Year\]       |
| StudentLanguageInstructionProgramAssociations | educationOrganizationReference              | FALSE         | educationOrganizationReference              | REQUIRED |                                    |                                    |
| StudentLanguageInstructionProgramAssociations | educationOrganizationId                     | FALSE         | integer                                     | REQUIRED | 255901                             | 255901                             |
| StudentLanguageInstructionProgramAssociations | programReference                            | FALSE         | programReference                            | REQUIRED |                                    |                                    |
| programReference                              | programName                                 | FALSE         | string                                      | REQUIRED | English as a Second Language (ESL) | English as a Second Language (ESL) |
| programReference                              | programTypeDescriptor                       | FALSE         | programTypeDescriptor                       | REQUIRED | English as a Second Language (ESL) | English as a Second Language (ESL) |
| programReference                              | educationOrganizationId                     | FALSE         | integer                                     | REQUIRED | 255901                             | 255901                             |
| StudentLanguageInstructionProgramAssociations | studentReference                            | FALSE         | studentReference                            | REQUIRED |                                    |                                    |
| studentReference                              | studentUniqueId                             | FALSE         | string                                      | REQUIRED | 222222                             | 222222                             |
| StudentLanguageInstructionProgramAssociations | englishLanguageProficiencyAssessments       | TRUE          | englishLanguageProficiencyAssessment[]      | REQUIRED |                                    |                                    |
| schoolYearTypeReference                       | schoolYear                                  | FALSE         | int                                         | REQUIRED | [Current School Year]              | [Current School Year]              |
| englishLanguageProficiencyAssessments         | participationDescriptor                     | FALSE         | participationDescriptor                     | REQUIRED | Completed                          | Completed                          |
| englishLanguageProficiencyAssessments         | proficiencyDescriptor                       | FALSE         | proficiencyDescriptor                       | REQUIRED | Not Proficient                     | **Proficient**                     |
| englishLanguageProficiencyAssessments         | monitoredDescriptor                         | FALSE         | monitoredDescriptor                         | REQUIRED | Year 1                             | Year 1                             |
| StudentLanguageInstructionProgramAssociations | languageInstructionProgramServices          | TRUE          | service[]                                   | REQUIRED |                                    |                                    |
| languageInstructionProgramServices            | languageInstructionProgramServiceDescriptor | FALSE         | languageInstructionProgramServiceDescriptor | REQUIRED | Structured English Immersion       | Structured English Immersion       |
| StudentLanguageInstructionProgramAssociations | englishLearnerParticipation                 | FALSE         | boolean                                     | REQUIRED | TRUE                               | TRUE                               |
