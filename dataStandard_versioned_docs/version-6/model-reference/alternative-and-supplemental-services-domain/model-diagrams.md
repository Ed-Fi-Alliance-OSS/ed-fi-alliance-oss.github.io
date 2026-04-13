---
sidebar_position: 2
---

# Alternative and Supplemental Services Domain - Model Diagrams

This section contains reference information for the Alternative and Supplemental
Services domain model and subdomains.

```mermaid
erDiagram
    Program {
    }
    Staff {
    }
    GeneralStudentProgramAssociation {
    }
    StaffProgramAssociation {
    }
    Section {
    }
    StudentSectionAssociation {
    }
    Student {
    }
    EducationOrganization {
    }
    StudentSectionAttendanceEvent {
    }
    StudentSchoolAttendanceEvent {
    }
    StudentProgramAttendanceEvent {
    }
    StudentSpecialEducationProgramEligibilityAssociation {
    }
    School {
    }
    EducationOrganization ||--o{ Program : "relates to"
    Student ||--o{ Program : "relates to"
    Program ||--o{ Staff : "relates to"
    Section ||--o{ Program : "relates to"
    Student ||--o{ School : "relates to"
    Student ||--o{ GeneralStudentProgramAssociation : "relates to"
    Student ||--o{ StaffProgramAssociation : "relates to"
    Staff ||--o{ StaffProgramAssociation : "relates to"
    Student ||--o{ StudentSectionAssociation : "relates to"
    Section ||--o{ StudentSectionAssociation : "relates to"
    Student ||--o{ StudentSpecialEducationProgramEligibilityAssociation : "relates to"
    StudentSectionAttendanceEvent ||--o{ Student : "relates to"
    StudentSectionAttendanceEvent ||--o{ Section : "relates to"
    StudentSchoolAttendanceEvent ||--o{ School : "relates to"
    StudentSchoolAttendanceEvent ||--o{ Student : "relates to"
    StudentProgramAttendanceEvent ||--o{ EducationOrganization : "relates to"
    StudentProgramAttendanceEvent ||--o{ Program : "relates to"
```

### Federal Programs Subdomain

#### Alternative and Supplemental Services, Federal Programs Model UML Diagram

![Federal Programs Subdomain](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/AlternativeAndSupplementalServices_FederalPrograms_v6.X.png)

[_Large Version_](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/AlternativeAndSupplementalServices_FederalPrograms_v6.X.png)
