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
    GeneralStudentProgramAssociation["GeneralStudent<br/>ProgramAssociation"]  {
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
    EducationOrganization ||--o{ Program : "has associated"
    Student ||--o{ Program : "has associated"
    Program ||--o{ Staff : "has associated"
    Section ||--o{ Program : "has associated"
    Student ||--o{ School : "has associated"
    Student ||--o{ GeneralStudentProgramAssociation : "has associated"
    Student ||--o{ StaffProgramAssociation : "has associated"
    Staff ||--o{ StaffProgramAssociation : "has associated"
    Student ||--o{ StudentSectionAssociation : "has associated"
    Section ||--o{ StudentSectionAssociation : "has associated"
    Student ||--o{ StudentSpecialEducationProgramEligibilityAssociation : "has associated"
    StudentSectionAttendanceEvent ||--o{ Student : "has associated"
    StudentSectionAttendanceEvent ||--o{ Section : "has associated"
    StudentSchoolAttendanceEvent ||--o{ School : "has associated"
    StudentSchoolAttendanceEvent ||--o{ Student : "has associated"
    StudentProgramAttendanceEvent ||--o{ EducationOrganization : "has associated"
    StudentProgramAttendanceEvent ||--o{ Program : "has associated"
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
    EducationOrganization ||--o{ Program : "has associated"
    Student ||--o{ Program : "has associated"
    GeneralStudentProgramAssociation ||--o{ EducationOrganization : "has associated"
    StudentSpecialEducationProgramEligibilityAssociation ||--o{ EducationOrganization : "has associated"
    StudentCTEProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentHomelessProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentLanguageInstructionProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentMigrantEducationProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentNeglectedOrDelinquentProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentSchoolFoodServiceProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentSpecialEducationProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentTitleIPartAProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
    StudentSection504ProgramAssociation ||--o{ GeneralStudentProgramAssociation : "has associated"
```
