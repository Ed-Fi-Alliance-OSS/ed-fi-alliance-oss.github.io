---
sidebar_position: 2
hide_table_of_contents: true
---

# School Calendar Domain - Model Diagrams

## School Calendar Model UML Diagram

```mermaid
erDiagram
    Session {
    }
    GradingPeriod {
    }
    AcademicWeek {
    }
    Calendar {
    }
    CalendarDate {
    }
    StudentSchoolAssociation {
    }
    Student {
    }
    EducationOrganization {
    }
    School {
    }
    Session ||--o{ School : "relates to"
    Session ||--o{ AcademicWeek : "relates to"
    Session ||--o{ GradingPeriod : "relates to"
    GradingPeriod ||--o{ School : "relates to"
    Calendar ||--o{ School : "relates to"
    CalendarDate ||--o{ Calendar : "relates to"
    StudentSchoolAssociation ||--o{ Calendar : "relates to"
    StudentSchoolAssociation ||--o{ Student : "relates to"
    School ||--o{ StudentSchoolAssociation : "relates to"
    School ||--o{ EducationOrganization : "relates to"
    Student ||--o{ School : "relates to"
```
