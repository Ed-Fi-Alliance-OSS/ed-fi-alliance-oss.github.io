---
sidebar_position: 2
hide_table_of_contents: true
---

# Student Identification and Demographics Domain - Model Diagrams

## Student Identification and Demographics Model UML Diagram

```mermaid
---
config:
  layout: elk
---
erDiagram
    Student {
    }
    StudentIdentificationCode {
    }
    StudentDirectory {
    }
    StudentDemographic {
    }
    StudentEducationOrganizationAssociation {
    }
    StudentContactAssociation {
    }
    Contact {
    }
    ContactIdentificationCode {
    }
    FinancialAid {
    }
    Person {
    }
    EducationOrganization {
    }
    Student ||--o{ Contact : "has associated"
    Student ||--o{ EducationOrganization : "has associated"
    Student ||--o{ Person : "has associated"
    StudentContactAssociation ||--o{ StudentContactAssociation : "has associated"
    StudentContactAssociation ||--o{ StudentEducationOrganizationAssociation : "has associated"
    StudentIdentificationCode ||--o{ Student : "has associated"
    StudentIdentificationCode ||--o{ StudentDemographic : "has associated"
    StudentDemographic ||--o{ Student : "has associated"
    StudentDemographic ||--o{ StudentDirectory : "has associated"
    StudentDirectory ||--o{ Student : "has associated"
    EducationOrganization ||--o{ StudentDemographic : "has associated"
    EducationOrganization ||--o{ StudentIdentificationCode : "has associated"
    EducationOrganization ||--o{ Contact : "has associated"
    EducationOrganization ||--o{ ContactIdentificationCode : "has associated"
    ContactIdentificationCode ||--o{ EducationOrganization : "has associated"
    Contact ||--o{ Person : "has associated"
    FinancialAid ||--o{ Student : "has associated"
```
