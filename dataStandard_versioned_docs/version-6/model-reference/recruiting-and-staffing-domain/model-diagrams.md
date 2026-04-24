---
sidebar_position: 2
hide_table_of_contents: true
---

# Recruitment And Staffing Domain - Model Diagrams

## Recruitment And Staffing UML Diagram

```mermaid
---

config:
  layout: elk
---

erDiagram
    ApplicantProfile {
    }
    Application {
    }
    ApplicationEvent {
    }
    OpenStaffPosition {
    }
    RecruitmentEvent {
    }
    RecruitmentEventAttendance {
    }
    ProfessionalDevelopmentEvent {
    }
    ProfessionalDevelopmentEventAttendance {
    }
    Person {
    }
    EducationOrganization {
    }
    Application ||--o{ ApplicantProfile : "relates to"
    Application ||--o{ EducationOrganization : "relates to"
    Application ||--o{ OpenStaffPosition : "relates to"
    Application ||--o{ RecruitmentEventAttendance : "relates to"
    ApplicationEvent ||--o{ Application : "relates to"
    RecruitmentEventAttendance ||--o{ RecruitmentEvent : "relates to"
    RecruitmentEventAttendance ||--o{ RecruitmentEventAttendance : "relates to"
    RecruitmentEvent ||--o{ EducationOrganization : "relates to"
    ProfessionalDevelopmentEvent ||--o{ ProfessionalDevelopmentEventAttendance : "relates to"
    ProfessionalDevelopmentEventAttendance ||--o{ Person : "relates to"
```
