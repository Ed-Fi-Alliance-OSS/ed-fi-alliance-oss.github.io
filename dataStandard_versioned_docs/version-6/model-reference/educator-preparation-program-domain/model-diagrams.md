---
sidebar_position: 2
hide_table_of_contents: true
---

# Educator Preparation Program Model Domain - Model Diagrams

## Educator Preparation Program Model Domain UML Diagram

```mermaid
---
config:
  layout: elk
---
erDiagram
    Candidate {
    }
    CandidateIdentificationCode["CandidateIdentification<br/>Code"] {
    }
    EducatorPreparationProgram["EducatorPreparation<br/>Program"] {
    }
    FieldworkExperience {
    }
    CandidateEducatorPreparationProgramAssociation["CandidateEducator<br/>PreparationProgram<br/>Association"] {
    }
    CandidateRelationshipToStaffAssociation["Candidate<br/>RelationshipTo<br/>StaffAssociation"] {
    }
    StaffEducatorPreparationProgramAssociation["StaffEducatorPreparation<br/>ProgramAssociation"] {
    }
    Person {
    }
    Staff {
    }
    EducationOrganization {
    }
    Section {
    }
    Candidate ||--o{ Person : "has associated"
    Staff ||--o{ Person : "has associated"
    Candidate ||--o{ EducatorPreparationProgram : "has associated"
    CandidateEducatorPreparationProgramAssociation ||--o{ Candidate : "has associated"
    CandidateEducatorPreparationProgramAssociation ||--o{ EducatorPreparationProgram : "has associated"
    Staff ||--o{ Candidate : "has associated"
    CandidateRelationshipToStaffAssociation ||--o{ Candidate : "has associated"
    CandidateRelationshipToStaffAssociation ||--o{ Staff : "has associated"
    StaffEducatorPreparationProgramAssociation ||--o{ Staff : "has associated"
    StaffEducatorPreparationProgramAssociation ||--o{ EducatorPreparationProgram : "has associated"
    EducationOrganization ||--o{ EducatorPreparationProgram : "has associated"
    Staff ||--o{ EducationOrganization : "has associated"
    FieldworkExperience ||--o{ EducatorPreparationProgram : "has associated"
    FieldworkExperience ||--o{ Section : "has associated"
    CandidateIdentificationCode ||--o{ Candidate : "has associated"
    CandidateIdentificationCode ||--o{ EducationOrganization : "has associated"
    EducationOrganization ||--o{ EducationOrganization : "has associated"
```
