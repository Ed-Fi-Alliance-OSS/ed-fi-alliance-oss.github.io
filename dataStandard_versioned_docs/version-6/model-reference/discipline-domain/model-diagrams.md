---
sidebar_position: 2
hide_table_of_contents: true
---

# Discipline Domain - Model Diagrams

## Discipline Model UML Diagram

```mermaid
---
config:
  layout: elk
---
erDiagram
    DisciplineIncident {
    }
    DisciplineAction {
    }
    StaffDisciplineIncidentAssociation["StaffDiscipline<br/>IncidentAssociation"] {
    }
    StudentDisciplineIncidentBehaviorAssociation["StudentDiscipline<br/>IncidentBehaviorAssociation"] {
    }
    StudentDisciplineIncidentNonOffenderAssociation["StudentDiscipline<br/>IncidentNonOffender<br/>Association"] {
    }
    Student {
    }
    Staff {
    }
    School {
    }
    Student ||--o{ School : "has associated"
    Student ||--o{ DisciplineIncident : "has associated"
    DisciplineAction ||--o{ Student : "has associated"
    DisciplineAction ||--o{ StudentDisciplineIncidentBehaviorAssociation : "has associated"
    DisciplineAction ||--o{ Staff : "has associated"
    DisciplineAction ||--o{ School : "has associated"
    DisciplineIncident ||--o{ School : "has associated"
    DisciplineIncident ||--o{ StaffDisciplineIncidentAssociation : "has associated"
    StaffDisciplineIncidentAssociation ||--o{ DisciplineIncident : "has associated"
    StudentDisciplineIncidentBehaviorAssociation ||--o{ DisciplineIncident : "has associated"
    StudentDisciplineIncidentNonOffenderAssociation ||--o{ DisciplineIncident : "has associated"
    Staff ||--o{ School : "has associated"
```
