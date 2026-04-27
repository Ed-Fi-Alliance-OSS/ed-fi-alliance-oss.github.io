---
sidebar_position: 2
hide_table_of_contents: true
---

# Teaching and Learning Domain - Model Diagrams

This section contains reference information for the Teaching and Learning domain
model.

## Teaching and Learning UML Model Diagram

```mermaid
---

config:
  layout: elk
---

erDiagram
    EducationOrganization {
    }
    School {
    }
    Session {
    }
    Student {
    }
    Staff {
    }
    Course {
    }
    CourseOffering {
    }
    Section {
    }
    ClassPeriod {
    }
    Location {
    }
    Program {
    }
    LearningStandard {
    }
    StudentSchoolAssociation {
    }
    StaffSchoolAssociation {
    }
    StaffProgramAssociation {
    }
    GeneralStudentProgramAssociation {
    }
    StudentSectionAssociation {
    }
    StaffSectionAssociation {
    }

    School ||--o{ EducationOrganization : "extends"
    EducationOrganization ||--o{ Session : "has associated"
    EducationOrganization ||--o{ School : "has associated"
    EducationOrganization ||--o{ Course : "has associated"
    Student ||--o{ StudentSchoolAssociation : "participates in"
    Student ||--o{ GeneralStudentProgramAssociation : "participates in"
    Student ||--o{ StudentSectionAssociation : "participates in"
    Staff ||--o{ StaffSchoolAssociation : "has associated"
    Staff ||--o{ StaffProgramAssociation : "has associated"
    Staff ||--o{ StaffSectionAssociation : "has associated"
    School ||--o{ StudentSchoolAssociation : "has associated"
    School ||--o{ StaffSchoolAssociation : "has associated"
    School ||--o{ Session : "has associated"
    Program ||--o{ GeneralStudentProgramAssociation : "has associated"
    Program ||--o{ StaffProgramAssociation : "has associated"
    EducationOrganization ||--o{ GeneralStudentProgramAssociation : "has associated"
    Course ||--o{ CourseOffering : "has associated"
    School ||--o{ CourseOffering : "has associated"
    CourseOffering ||--o{ Section : "has associated"
    Section ||--o{ StudentSectionAssociation : "has associated"
    Section ||--o{ StaffSectionAssociation : "has associated"
    Section ||--o{ ClassPeriod : "has functional component"
    Section ||--o{ Location : "has associated"
    LearningStandard ||--o{ Section : "has associated"
    LearningStandard ||--o{ LearningStandard : "has associated equivalence"
    LearningStandard ||--o{ Course : "has associated"
```

### Course Catalog Subdomain

The model is based upon multiple levels of definition, as follows:

* The CourseOffering entity represents a course that is offered by a school
    during a session. The CourseOffering entity will have a LocalCourseCode
    element and may have a LocalCourseTitle element.
* A school will have one or more sections for each CourseOffering entity.
    Students are enrolled in specific sections. Each Section entity will have
    one or more assigned staff, will typically meet in a specific location in
    the school, and will be assigned a ClassPeriod entity for the session. Since
    early learning instruction is based on programs, students are enrolled by
    association to the Program and Staff entities as well.

#### Teaching and Learning, Course Catalog Model UML Diagram

```mermaid
---

config:
  layout: elk
---

erDiagram
    EducationOrganization {
    }
    School {
    }
    Session {
    }
    Course {
    }
    CourseOffering {
    }
    LearningStandard {
    }

    School ||--o{ EducationOrganization : "extends"
    EducationOrganization ||--o{ Course : "has associated"
    School ||--o{ Session : "has associated"
    School ||--o{ CourseOffering : "has associated"
    Session ||--o{ CourseOffering : "has associated"
    Course ||--o{ CourseOffering : "has associated"
    Course ||--o{ LearningStandard : "has associated"
    LearningStandard ||--o{ LearningStandard : "has functional component"
    LearningStandard ||--o{ LearningStandard : "has associated equivalence"
```

### Sections and Programs Subdomain

A school will have one or more Sections for each CourseOffering. Students are
enrolled in specific Sections. Each Section will have one or more assigned
Staff, will typically meet in a specific location in the school, and be assigned
a ClassPeriod for the Session.

#### Teaching and Learning, Sections and Programs Model UML Diagram

```mermaid
---

config:
  layout: elk
---

erDiagram
    EducationOrganization {
    }
    School {
    }
    Session {
    }
    Student {
    }
    Staff {
    }
    Program {
    }
    ClassPeriod {
    }
    Location {
    }
    Course {
    }
    CourseOffering {
    }
    Section {
    }
    StudentSchoolAssociation {
    }
    StaffSchoolAssociation {
    }
    StaffProgramAssociation {
    }
    GeneralStudentProgramAssociation {
    }
    StudentSectionAssociation {
    }
    StaffSectionAssociation {
    }
    StudentAcademicRecord {
    }
    CourseTranscript {
    }

    School ||--o{ EducationOrganization : "extends"
    EducationOrganization ||--o{ Program : "Is DirectProviderOf"
    EducationOrganization ||--o{ GeneralStudentProgramAssociation : "has associated"
    School ||--o{ Session : "has associated"
    School ||--o{ CourseOffering : "has associated"
    School ||--o{ StudentSchoolAssociation : "has associated"
    School ||--o{ StaffSchoolAssociation : "has associated"
    School ||--o{ Location : "has associated"
    Staff ||--o{ StaffSchoolAssociation : "has associated"
    Staff ||--o{ StaffSectionAssociation : "has associated"
    Staff ||--o{ StaffProgramAssociation : "has associated"
    Student ||--o{ StudentSchoolAssociation : "participates in"
    Student ||--o{ StudentSectionAssociation : "participates in"
    Student ||--o{ GeneralStudentProgramAssociation : "participates in"
    Student ||--o{ StudentAcademicRecord : "has associated"
    Program ||--o{ GeneralStudentProgramAssociation : "has associated"
    Program ||--o{ StaffProgramAssociation : "has associated"
    CourseOffering ||--o{ Section : "has associated"
    Section ||--o{ StudentSectionAssociation : "has associated"
    Section ||--o{ StaffSectionAssociation : "has associated"
    Section ||--o{ ClassPeriod : "has functional component"
    Section ||--o{ Location : "has associated"
    Section ||--o{ Staff : "has responsible teacher"
    CourseOffering ||--o{ ClassPeriod : "has associated"
    StudentSectionAssociation ||--o{ Program : "has associated"
    StudentAcademicRecord ||--o{ CourseTranscript : "has associated"
    CourseTranscript ||--o{ Course : "has associated"
```
