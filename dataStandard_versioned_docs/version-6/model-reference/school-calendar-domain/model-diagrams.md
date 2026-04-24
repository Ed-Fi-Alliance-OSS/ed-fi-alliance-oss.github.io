---
sidebar_position: 2
hide_table_of_contents: true
---

# School Calendar Domain - Model Diagrams

## School Calendar Model UML Diagram

```mermaid
---
config:
  layout: elk
---
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
    style Session color:#000000
    style GradingPeriod color:#000000
    style AcademicWeek color:#000000
    style Calendar color:#000000
    style CalendarDate color:#000000
    style StudentSchoolAssociation color:#000000
    style Student color:#000000
    style EducationOrganization color:#000000
    style School color:#000000
```
