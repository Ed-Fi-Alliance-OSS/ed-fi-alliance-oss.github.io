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
    ProgramEvaluation ||--o{ Program : "has associated"
    ProgramEvaluationObjective ||--o{ ProgramEvaluation : "has associated"
    ProgramEvaluationElement ||--o{ ProgramEvaluationObjective : "has associated"
    ProgramEvaluationElement ||--o{ ProgramEvaluation : "has associated"
    EvaluationRubricDimension ||--o{ ProgramEvaluationElement : "has associated"
    StudentProgramEvaluation ||--o{ Student : "has associated"
    StudentProgramEvaluation ||--o{ Staff : "has associated"
    StudentProgramEvaluation ||--o{ ProgramEvaluation : "has associated"
    StudentProgramEvaluation ||--o{ EducationOrganization : "has associated"
    StudentProgramEvaluation ||--o{ StudentEvaluationElement : "has associated"
    StudentProgramEvaluation ||--o{ StudentEvaluationObjective : "has associated"
    StudentEvaluationObjective ||--o{ ProgramEvaluationObjective : "has associated"
    StudentEvaluationElement ||--o{ ProgramEvaluationElement : "has associated"
    GeneralStudentProgramAssociation ||--o{ EducationOrganization : "has associated"
    GeneralStudentProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    Program ||--o{ EducationOrganization : "has associated"
    Program ||--o{ Staff : "has associated"
    Program ||--o{ StaffProgramAssociation : "has associated"
    EducationOrganization ||--o{ Program : "has associated"
    School ||--o{ EducationOrganization : "has associated"
    Student ||--o{ Program : "has associated"
    Student ||--o{ School : "has associated"
```
