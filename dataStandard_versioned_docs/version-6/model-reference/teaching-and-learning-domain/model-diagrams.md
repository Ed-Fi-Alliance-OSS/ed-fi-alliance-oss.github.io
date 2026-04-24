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
    EducationOrganization ||--o{ Session : "HasAssociated"
    EducationOrganization ||--o{ School : "HasAssociated"
    EducationOrganization ||--o{ Course : "HasAssociated"
    Student ||--o{ StudentSchoolAssociation : "ParticipatesIn"
    Student ||--o{ GeneralStudentProgramAssociation : "ParticipatesIn"
    Student ||--o{ StudentSectionAssociation : "ParticipatesIn"
    Staff ||--o{ StaffSchoolAssociation : "HasAssociated"
    Staff ||--o{ StaffProgramAssociation : "HasAssociated"
    Staff ||--o{ StaffSectionAssociation : "HasAssociated"
    School ||--o{ StudentSchoolAssociation : "HasAssociated"
    School ||--o{ StaffSchoolAssociation : "HasAssociated"
    School ||--o{ Session : "HasAssociated"
    Program ||--o{ GeneralStudentProgramAssociation : "HasAssociated"
    Program ||--o{ StaffProgramAssociation : "HasAssociated"
    EducationOrganization ||--o{ GeneralStudentProgramAssociation : "HasAssociated"
    Course ||--o{ CourseOffering : "HasAssociated"
    School ||--o{ CourseOffering : "HasAssociated"
    CourseOffering ||--o{ Section : "HasAssociated"
    Section ||--o{ StudentSectionAssociation : "HasAssociated"
    Section ||--o{ StaffSectionAssociation : "HasAssociated"
    Section ||--o{ ClassPeriod : "HasFunctionalComponent"
    Section ||--o{ Location : "HasAssociated"
    LearningStandard ||--o{ Section : "HasAssociated"
    LearningStandard ||--o{ LearningStandard : "HasAssociatedEquivalence"
    LearningStandard ||--o{ Course : "HasAssociated"
    style EducationOrganization color:#000000
    style School color:#000000
    style Session color:#000000
    style Student color:#000000
    style Staff color:#000000
    style Course color:#000000
    style CourseOffering color:#000000
    style Section color:#000000
    style ClassPeriod color:#000000
    style Location color:#000000
    style Program color:#000000
    style LearningStandard color:#000000
    style StudentSchoolAssociation color:#000000
    style StaffSchoolAssociation color:#000000
    style StaffProgramAssociation color:#000000
    style GeneralStudentProgramAssociation color:#000000
    style StudentSectionAssociation color:#000000
    style StaffSectionAssociation color:#000000
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
    EducationOrganization ||--o{ Course : "HasAssociated"
    School ||--o{ Session : "HasAssociated"
    School ||--o{ CourseOffering : "HasAssociated"
    Session ||--o{ CourseOffering : "HasAssociated"
    Course ||--o{ CourseOffering : "HasAssociated"
    Course ||--o{ LearningStandard : "HasAssociated"
    LearningStandard ||--o{ LearningStandard : "HasFunctionalComponent"
    LearningStandard ||--o{ LearningStandard : "HasAssociatedEquivalence"
    style EducationOrganization color:#000000
    style School color:#000000
    style Session color:#000000
    style Course color:#000000
    style CourseOffering color:#000000
    style LearningStandard color:#000000
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
    EducationOrganization ||--o{ Program : "IsDirectProviderOf"
    EducationOrganization ||--o{ GeneralStudentProgramAssociation : "HasAssociated"
    School ||--o{ Session : "HasAssociated"
    School ||--o{ CourseOffering : "HasAssociated"
    School ||--o{ StudentSchoolAssociation : "HasAssociated"
    School ||--o{ StaffSchoolAssociation : "HasAssociated"
    School ||--o{ Location : "HasAssociated"
    Staff ||--o{ StaffSchoolAssociation : "HasAssociated"
    Staff ||--o{ StaffSectionAssociation : "HasAssociated"
    Staff ||--o{ StaffProgramAssociation : "HasAssociated"
    Student ||--o{ StudentSchoolAssociation : "ParticipatesIn"
    Student ||--o{ StudentSectionAssociation : "ParticipatesIn"
    Student ||--o{ GeneralStudentProgramAssociation : "ParticipatesIn"
    Student ||--o{ StudentAcademicRecord : "HasAssociated"
    Program ||--o{ GeneralStudentProgramAssociation : "HasAssociated"
    Program ||--o{ StaffProgramAssociation : "HasAssociated"
    CourseOffering ||--o{ Section : "HasAssociated"
    Section ||--o{ StudentSectionAssociation : "HasAssociated"
    Section ||--o{ StaffSectionAssociation : "HasAssociated"
    Section ||--o{ ClassPeriod : "HasFunctionalComponent"
    Section ||--o{ Location : "HasAssociated"
    Section ||--o{ Staff : "HasResponsibleTeacher"
    CourseOffering ||--o{ ClassPeriod : "HasAssociated"
    StudentSectionAssociation ||--o{ Program : "HasAssociated"
    StudentAcademicRecord ||--o{ CourseTranscript : "HasAssociated"
    CourseTranscript ||--o{ Course : "HasAssociated"
    style EducationOrganization color:#000000
    style School color:#000000
    style Session color:#000000
    style Student color:#000000
    style Staff color:#000000
    style Program color:#000000
    style ClassPeriod color:#000000
    style Location color:#000000
    style Course color:#000000
    style CourseOffering color:#000000
    style Section color:#000000
    style StudentSchoolAssociation color:#000000
    style StaffSchoolAssociation color:#000000
    style StaffProgramAssociation color:#000000
    style GeneralStudentProgramAssociation color:#000000
    style StudentSectionAssociation color:#000000
    style StaffSectionAssociation color:#000000
    style StudentAcademicRecord color:#000000
    style CourseTranscript color:#000000
```
