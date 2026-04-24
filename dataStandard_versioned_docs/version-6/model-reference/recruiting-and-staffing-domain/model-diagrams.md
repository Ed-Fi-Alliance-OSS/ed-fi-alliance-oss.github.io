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
    RecruitmentEventAttendance["RecruitmentEvent<br/>Attendance"] {
    }
    ProfessionalDevelopmentEvent["ProfessionalDevelopment<br/>Event"] {
    }
    ProfessionalDevelopmentEventAttendance["ProfessionalDevelopment<br/>EventAttendance"] {
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
    style ApplicantProfile color:#000000
    style Application color:#000000
    style ApplicationEvent color:#000000
    style OpenStaffPosition color:#000000
    style RecruitmentEvent color:#000000
    style RecruitmentEventAttendance color:#000000
    style ProfessionalDevelopmentEvent color:#000000
    style ProfessionalDevelopmentEventAttendance color:#000000
    style Person color:#000000
    style EducationOrganization color:#000000
```
