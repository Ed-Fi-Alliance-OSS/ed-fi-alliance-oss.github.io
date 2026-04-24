---
sidebar_position: 2
hide_table_of_contents: true
---

# Bell Schedule Domain - Model Diagrams

## Bell Schedule Model UML Diagram

```mermaid
---
config:
  layout: elk
---
erDiagram
    BellSchedule {
    }
    ClassPeriod {
    }
    Session {
    }
    Section {
    }
    EducationOrganization {
    }
    School {
    }
    School ||--o{ EducationOrganization : "relates to"
    BellSchedule ||--o{ School : "relates to"
    BellSchedule ||--o{ ClassPeriod : "relates to"
    ClassPeriod ||--o{ School : "relates to"
    Session ||--o{ School : "relates to"
    Section ||--o{ ClassPeriod : "relates to"
    style BellSchedule color:#000000
    style ClassPeriod color:#000000
    style Session color:#000000
    style Section color:#000000
    style EducationOrganization color:#000000
    style School color:#000000
```
