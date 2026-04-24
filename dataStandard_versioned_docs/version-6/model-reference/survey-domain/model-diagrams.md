---
sidebar_position: 2
hide_table_of_contents: true
---


# Survey Domain - Model Diagrams

This section contains reference information for the Assessment domain model and
subdomains.

## Survey Model UML Diagram

```mermaid
---
config:
  layout: elk
---
erDiagram
    Survey {
    }
    SurveySection {
    }
    SurveyQuestion {
    }
    SurveyResponse {
    }
    SurveySectionResponse {
    }
    SurveyQuestionResponse["SurveyQuestion<br/>Response"] {
    }
    SurveyProgramAssociation["SurveyProgram<br/>Association"] {
    }
    SurveyCourseAssociation {
    }
    SurveySectionAssociation {
    }
    SurveyResponseEducationOrganizationTargetAssociation["SurveyResponse<br/>EducationOrganization<br/>TargetAssociation"] {
    }
    SurveyResponseStaffTargetAssociation["SurveyResponse<br/>StaffTarget<br/>Association"] {
    }
    SurveySectionResponseEducationOrganizationTargetAssociation["SurveySection<br/>ResponseEducationOrganization<br/>TargetAssociation"] {
    }
    SurveySectionResponseStaffTargetAssociation["SurveySection<br/>ResponseStaff<br/>TargetAssociation<"] {
    }
    Session {
    }
    Course {
    }
    Program {
    }
    Section {
    }
    Student {
    }
    Contact {
    }
    Staff {
    }
    Person {
    }
    EducationOrganization {
    }
    Survey ||--o{ EducationOrganization : "relates to"
    Survey ||--o{ Session : "relates to"
    Survey ||--o{ Program : "relates to"
    Survey ||--o{ Course : "relates to"
    Survey ||--o{ Section : "relates to"
    SurveySection ||--o{ Survey : "relates to"
    SurveyQuestion ||--o{ Survey : "relates to"
    SurveyQuestion ||--o{ SurveySection : "relates to"
    SurveyResponse ||--o{ Survey : "relates to"
    SurveyResponse ||--o{ Student : "relates to"
    SurveyResponse ||--o{ Staff : "relates to"
    SurveyResponse ||--o{ Contact : "relates to"
    SurveyResponse ||--o{ EducationOrganization : "relates to"
    SurveyResponse ||--o{ Person : "relates to"
    SurveySectionResponse ||--o{ SurveyResponse : "relates to"
    SurveySectionResponse ||--o{ SurveySection : "relates to"
    SurveySectionResponse ||--o{ EducationOrganization : "relates to"
    SurveySectionResponse ||--o{ Contact : "relates to"
    SurveyQuestionResponse ||--o{ SurveyQuestion : "relates to"
    SurveyQuestionResponse ||--o{ SurveyResponse : "relates to"
    SurveyProgramAssociation ||--o{ Survey : "relates to"
    SurveyCourseAssociation ||--o{ Survey : "relates to"
    SurveySectionAssociation ||--o{ SurveyResponse : "relates to"
    Session ||--o{ SurveyResponseEducationOrganizationTargetAssociation : "relates to"
    Staff ||--o{ SurveyResponseStaffTargetAssociation : "relates to"
    EducationOrganization ||--o{ SurveySectionResponseEducationOrganizationTargetAssociation : "relates to"
    Contact ||--o{ SurveySectionResponseStaffTargetAssociation : "relates to"
    style Survey color:#000000
    style SurveySection color:#000000
    style SurveyQuestion color:#000000
    style SurveyResponse color:#000000
    style SurveySectionResponse color:#000000
    style SurveyQuestionResponse color:#000000
    style SurveyProgramAssociation color:#000000
    style SurveyCourseAssociation color:#000000
    style SurveySectionAssociation color:#000000
    style SurveyResponseEducationOrganizationTargetAssociation color:#000000
    style SurveyResponseStaffTargetAssociation color:#000000
    style SurveySectionResponseEducationOrganizationTargetAssociation color:#000000
    style SurveySectionResponseStaffTargetAssociation color:#000000
    style Session color:#000000
    style Course color:#000000
    style Program color:#000000
    style Section color:#000000
    style Student color:#000000
    style Contact color:#000000
    style Staff color:#000000
    style Person color:#000000
    style EducationOrganization color:#000000
```
