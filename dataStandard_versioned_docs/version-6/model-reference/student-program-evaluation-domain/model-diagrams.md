---
sidebar_position: 2
hide_table_of_contents: true
---

# Student Program Evaluation Domain - Model Diagrams

This section contains reference information for the Student Program Evaluation
domain model. The model includes entities such as StudentProgramEvaluation,
ProgramEvaluation, ProgramEvaluationObjective, ProgramEvaluationElement,
EvaluationRubricDimension. These entities are related to each other to provide
insights into the effectiveness of programs.

## Student Program Evaluation  UML Model Diagram

```mermaid
---
config:
  layout: elk
---
erDiagram
    ProgramEvaluation {
    }
    ProgramEvaluationObjective["ProgramEvaluation<br/>Objective"] {
    }
    ProgramEvaluationElement {
    }
    EvaluationRubricDimension {
    }
    StudentProgramEvaluation {
    }
    StudentEvaluationObjective {
    }
    StudentEvaluationElement {
    }
    GeneralStudentProgramAssociation["GeneralStudent<br/>ProgramAssociation"] {
    }
    StaffProgramAssociation {
    }
    Program {
    }
    Student {
    }
    Staff {
    }
    EducationOrganization {
    }
    School {
    }
    ProgramEvaluation ||--o{ Program : "relates to"
    ProgramEvaluationObjective ||--o{ ProgramEvaluation : "relates to"
    ProgramEvaluationElement ||--o{ ProgramEvaluationObjective : "relates to"
    ProgramEvaluationElement ||--o{ ProgramEvaluation : "relates to"
    EvaluationRubricDimension ||--o{ ProgramEvaluationElement : "relates to"
    StudentProgramEvaluation ||--o{ Student : "relates to"
    StudentProgramEvaluation ||--o{ Staff : "relates to"
    StudentProgramEvaluation ||--o{ ProgramEvaluation : "relates to"
    StudentProgramEvaluation ||--o{ EducationOrganization : "relates to"
    StudentProgramEvaluation ||--o{ StudentEvaluationElement : "relates to"
    StudentProgramEvaluation ||--o{ StudentEvaluationObjective : "relates to"
    StudentEvaluationObjective ||--o{ ProgramEvaluationObjective : "relates to"
    StudentEvaluationElement ||--o{ ProgramEvaluationElement : "relates to"
    GeneralStudentProgramAssociation ||--o{ EducationOrganization : "relates to"
    GeneralStudentProgramAssociation ||--o{ GeneralStudentProgramAssociation : "relates to"
    Program ||--o{ EducationOrganization : "relates to"
    Program ||--o{ Staff : "relates to"
    Program ||--o{ StaffProgramAssociation : "relates to"
    EducationOrganization ||--o{ Program : "relates to"
    School ||--o{ EducationOrganization : "relates to"
    Student ||--o{ Program : "relates to"
    Student ||--o{ School : "relates to"
```
