---
sidebar_position: 2
hide_table_of_contents: true
---


# Graduation Domain - Model Diagrams

## Graduation Model UML Diagram

```mermaid
---

config:
  layout: elk
---

erDiagram
    Student {
    }
    StudentSchoolAssociation {
    }
    StudentAcademicRecord {
    }
    GraduationPlan {
    }
    PostSecondaryEvent {
    }
    PostSecondaryInstitution {
    }
    EducationOrganization {
    }
    School {
    }
    Student ||--o{ EducationOrganization : "relates to"
    Student ||--o{ School : "relates to"
    StudentSchoolAssociation ||--o{ GraduationPlan : "relates to"
    StudentAcademicRecord ||--o{ Student : "relates to"
    StudentAcademicRecord ||--o{ EducationOrganization : "relates to"
    GraduationPlan ||--o{ EducationOrganization : "relates to"
    PostSecondaryEvent ||--o{ Student : "relates to"
    PostSecondaryEvent ||--o{ StudentSchoolAssociation : "relates to"
    PostSecondaryEvent ||--o{ PostSecondaryInstitution : "relates to"
    PostSecondaryInstitution ||--o{ EducationOrganization : "relates to"
    School ||--o{ EducationOrganization : "relates to"
```
