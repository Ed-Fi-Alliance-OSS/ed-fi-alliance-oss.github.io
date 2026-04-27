---
sidebar_position: 2
hide_table_of_contents: true
---

# Student Attendance Domain - Model Diagrams

## Student Attendance Model UML Diagram

```mermaid
---
config:
  layout: elk
---
erDiagram
    Student {
    }
    StudentSchoolAttendanceEvent["StudentSchool<br/>AttendanceEvent"] {
    }
    StudentSectionAttendanceEvent["StudentSection<br/>AttendanceEvent"] {
    }
    StudentProgramAttendanceEvent["StudentProgram<br/>AttendanceEvent"] {
    }
    StudentSectionAssociation {
    }
    GeneralStudentProgramAssociation["GeneralStudent<br/>ProgramAssociation"] {
    }
    SectionAttendanceTakenEvent["SectionAttendance<br/>TakenEvent"] {
    }
    Session {
    }
    Section {
    }
    Program {
    }
    School {
    }
    Staff {
    }
    StudentSchoolAttendanceEvent ||--o{ Student : "relates to"
    StudentSchoolAttendanceEvent ||--o{ School : "relates to"
    StudentSchoolAttendanceEvent ||--o{ Session : "relates to"
    StudentSectionAttendanceEvent ||--o{ Student : "relates to"
    StudentSectionAttendanceEvent ||--o{ Section : "relates to"
    StudentSectionAttendanceEvent ||--o{ StudentSectionAssociation : "relates to"
    StudentProgramAttendanceEvent ||--o{ Student : "relates to"
    StudentProgramAttendanceEvent ||--o{ Program : "relates to"
    SectionAttendanceTakenEvent ||--o{ Section : "relates to"
    SectionAttendanceTakenEvent ||--o{ Staff : "relates to"
    Student ||--o{ School : "relates to"
    Student ||--o{ Section : "relates to"
    Student ||--o{ Program : "relates to"
    Session ||--o{ School : "relates to"
    Section ||--o{ School : "relates to"
    Section ||--o{ Program : "relates to"
    Program ||--o{ Staff : "relates to"
    Staff ||--o{ School : "relates to"
    Staff ||--o{ Section : "relates to"
```
