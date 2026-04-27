---
sidebar_position: 2
hide_table_of_contents: true
---

# Credential Data Model Domain - Model Diagrams

## Credential UML Diagram

```mermaid
---
config:
  layout: elk
---
erDiagram
    Credential {
    }
    CredentialEvent {
    }
    Certification {
    }
    CertificationExam {
    }
    CertificationExamResult {
    }
    Person {
    }
    Staff {
    }
    StudentAcademicRecord {
    }
    EducationOrganization {
    }
    StudentAssessment {
    }
    Staff ||--o{ Person : "has associated"
    Staff ||--o{ EducationOrganization : "has associated"
    Credential ||--o{ Staff : "has associated"
    Credential ||--o{ Person : "has associated"
    Credential ||--o{ Certification : "has associated"
    Credential ||--o{ StudentAcademicRecord : "has associated"
    CredentialEvent ||--o{ Credential : "has associated"
    Certification ||--o{ CertificationExam : "has associated"
    Certification ||--o{ EducationOrganization : "has associated"
    CertificationExam ||--o{ EducationOrganization : "has associated"
    CertificationExamResult ||--o{ CertificationExam : "has associated"
    CertificationExamResult ||--o{ Person : "has associated"
    CertificationExamResult ||--o{ StudentAssessment : "has associated"
```
