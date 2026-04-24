---
sidebar_position: 2
hide_table_of_contents: true
---

# Alternative and Supplemental Services Domain - Model Diagrams

This section contains reference information for the Alternative and Supplemental
Services domain model and subdomains.

## Alternative and Supplemental Services Model UML Diagram

```mermaid
---

config:
  layout: elk
---

erDiagram

    Program {
    }
    Staff {
    }
    GeneralStudentProgramAssociation["GeneralStudent<br/>ProgramAssociation"] {
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
    StudentSectionAttendanceEvent["StudentSection<br/>AttendanceEvent"] {
    }
    StudentSchoolAttendanceEvent["StudentSchool<br/>AttendanceEvent"] {
    }
    StudentProgramAttendanceEvent["StudentProgram<br/>AttendanceEvent"] {
    }
    StudentSpecialEducationProgramEligibilityAssociation["StudentSpecialEducation<br/>ProgramEligibility<br/>Association"] {
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

```mermaid
---

config:
  layout: elk
---

erDiagram
    Program {
    }
    Student {
    }
    EducationOrganization {
    }
    GeneralStudentProgramAssociation {
    }
    StudentCTEProgramAssociation {
    }
    StudentHomelessProgramAssociation {
    }
    StudentLanguageInstructionProgramAssociation {
    }
    StudentMigrantEducationProgramAssociation {
    }
    StudentNeglectedOrDelinquentProgramAssociation {
    }
    StudentProgramAssociation {
    }
    StudentSchoolFoodServiceProgramAssociation {
    }
    StudentSpecialEducationProgramAssociation {
    }
    StudentTitleIPartAProgramAssociation {
    }
    StudentSpecialEducationProgramEligibilityAssociation {
    }
    StudentSection504ProgramAssociation {
    }
    EducationOrganization ||--o{ Program : "relates to"
    Student ||--o{ Program : "relates to"
    GeneralStudentProgramAssociation ||--o{ EducationOrganization : "relates to"
    StudentSpecialEducationProgramEligibilityAssociation ||--o{ EducationOrganization : "relates to"
    StudentCTEProgramAssociation ||--o{ GeneralStudentProgramAssociation : "relates to"
    StudentHomelessProgramAssociation ||--o{ GeneralStudentProgramAssociation : "relates to"
    StudentLanguageInstructionProgramAssociation ||--o{ GeneralStudentProgramAssociation : "relates to"
    StudentMigrantEducationProgramAssociation ||--o{ GeneralStudentProgramAssociation : "relates to"
    StudentNeglectedOrDelinquentProgramAssociation ||--o{ GeneralStudentProgramAssociation : "relates to"
    StudentProgramAssociation ||--o{ GeneralStudentProgramAssociation : "relates to"
    StudentSchoolFoodServiceProgramAssociation ||--o{ GeneralStudentProgramAssociation : "relates to"
    StudentSpecialEducationProgramAssociation ||--o{ GeneralStudentProgramAssociation : "relates to"
    StudentTitleIPartAProgramAssociation ||--o{ GeneralStudentProgramAssociation : "relates to"
    StudentSection504ProgramAssociation ||--o{ GeneralStudentProgramAssociation : "relates to"
```
