# v5 Student Program > StudentCTEProgramAssociation Scenarios

The Student Program interchange loads students' participation in programs.

The Student CTE Program Association represents the career and technical
education program(s) that a student participates in or receives services from.
The association is an extension of the StudentProgramAssociation particular for
CTE programs.

### Prerequisites

- Ed-Org (pre-loaded)
- Program (pre-loaded)
- Student
- Student Enrollment

### Scenarios

1. Create a Student CTE Program Association for a high school student.
2. Modify the Program's Primary Indicator

(Note: the Program's educationOrganizationId is the Local Education Agency ID) |
Resource | Property Name | Is Collection | Data Type | Required / Optional |
Scenario 1 <br/>POST | Scenario 2 <br/>PUT | | --- | --- | --- | --- | --- | ---
| --- | | StudentCTEProgramAssociations | beginDate | FALSE | date | REQUIRED |
8/23/<br/>[Current School Year] | 8/23/<br/>[Current School Year] | |
StudentCTEProgramAssociations | educationOrganizationReference | FALSE |
educationOrganizationReference | REQUIRED | | | | StudentCTEProgramAssociations
| educationOrganizationId | FALSE | integer | REQUIRED | 255901 | 255901 | |
StudentCTEProgramAssociations | programReference | FALSE | programReference |
REQUIRED | | | | programReference | programName | FALSE | string | REQUIRED |
Career and Technical Education | Career and Technical Education | |
programReference | programTypeDescriptor | FALSE | programTypeDescriptor |
REQUIRED | Career and Technical Education | Career and Technical Education | |
programReference | educationOrganizationId | FALSE | integer | REQUIRED | 255901
| 255901 | | StudentCTEProgramAssociations | studentReference | FALSE |
studentReference | REQUIRED | | | | studentReference | studentUniqueId | FALSE |
string | REQUIRED | 222222 | 222222 | | StudentCTEProgramAssociations |
nonTraditionalGenderStatus | FALSE | boolean | REQUIRED | TRUE | TRUE | |
StudentCTEProgramAssociations | privateCTEProgram | FALSE | boolean | REQUIRED |
FALSE | FALSE | | StudentCTEProgramAssociations |
technicalSkillsAssessmentDescriptor | FALSE |
technicalSkillsAssessmentDescriptor | REQUIRED | Passed | Passed | |
StudentCTEProgramAssociations | cteProgramServices | TRUE |
cteProgramService\[\] | REQUIRED | | | | cteProgramServices |
cteProgramServiceDescriptor | FALSE | cteProgramServiceDescriptor | REQUIRED |
Information Technology | Information Technology | | cteProgramServices | cipCode
| FALSE | string | REQUIRED | 11.0103 | 11.0103 | | cteProgramServices |
primaryIndicator | FALSE | boolean | REQUIRED | TRUE | FALSE |
