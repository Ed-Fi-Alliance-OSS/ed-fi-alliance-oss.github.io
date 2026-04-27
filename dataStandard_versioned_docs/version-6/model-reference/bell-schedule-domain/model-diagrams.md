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
    School ||--o{ EducationOrganization : "has associated"
    BellSchedule ||--o{ School : "has associated"
    BellSchedule ||--o{ ClassPeriod : "has associated"
    ClassPeriod ||--o{ School : "has associated"
    Session ||--o{ School : "has associated"
    Section ||--o{ ClassPeriod : "has associated"
```
