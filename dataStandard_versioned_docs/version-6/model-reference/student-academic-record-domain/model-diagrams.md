---
sidebar_position: 2
hide_table_of_contents: true
---

# Student Academic Record Domain - Model Diagrams

This section contains reference information for the Student Academic Record
domain model.

## Student Academic Record Model UML Diagram

```mermaid
---

config:
  layout: elk
---

erDiagram
    Student {
    }
    StudentAcademicRecord {
    }
    CourseTranscript {
    }
    ReportCard {
    }
    Grade {
    }
    StudentCompetencyObjective {
    }
    StudentSectionAssociation {
    }
    GeneralStudentProgramAssociation {
    }
    GradebookEntry {
    }
    StudentGradebookEntry {
    }
    CompetencyObjective {
    }
    Course {
    }
    CourseOffering {
    }
    Section {
    }
    Program {
    }
    GradingPeriod {
    }
    Session {
    }
    LearningStandard {
    }
    EducationOrganization {
    }
    School {
    }
    School ||--o{ EducationOrganization : "relates to"
    StudentAcademicRecord ||--o{ Student : "relates to"
    StudentAcademicRecord ||--o{ EducationOrganization : "relates to"
    StudentAcademicRecord ||--o{ ReportCard : "relates to"
    CourseTranscript ||--o{ StudentAcademicRecord : "relates to"
    CourseTranscript ||--o{ Course : "relates to"
    CourseTranscript ||--o{ EducationOrganization : "relates to"
    ReportCard ||--o{ Student : "relates to"
    ReportCard ||--o{ EducationOrganization : "relates to"
    ReportCard ||--o{ GradingPeriod : "relates to"
    ReportCard ||--o{ Grade : "relates to"
    ReportCard ||--o{ StudentCompetencyObjective : "relates to"
    Grade ||--o{ GradingPeriod : "relates to"
    Grade ||--o{ StudentSectionAssociation : "relates to"
    Grade ||--o{ LearningStandard : "relates to"
    StudentCompetencyObjective ||--o{ Student : "relates to"
    StudentCompetencyObjective ||--o{ GradingPeriod : "relates to"
    StudentCompetencyObjective ||--o{ StudentSectionAssociation : "relates to"
    StudentCompetencyObjective ||--o{ GeneralStudentProgramAssociation : "relates to"
    StudentCompetencyObjective ||--o{ CompetencyObjective : "relates to"
    StudentSectionAssociation ||--o{ Student : "relates to"
    StudentGradebookEntry ||--o{ GradebookEntry : "relates to"
    StudentGradebookEntry ||--o{ StudentSectionAssociation : "relates to"
    GeneralStudentProgramAssociation ||--o{ EducationOrganization : "relates to"
    GeneralStudentProgramAssociation ||--o{ StudentGradebookEntry : "relates to"
    GradebookEntry ||--o{ Section : "relates to"
    GradebookEntry ||--o{ GradingPeriod : "relates to"
    GradebookEntry ||--o{ LearningStandard : "relates to"
    CourseOffering ||--o{ Course : "relates to"
    CourseOffering ||--o{ Session : "relates to"
    CourseOffering ||--o{ School : "relates to"
    Section ||--o{ CourseOffering : "relates to"
    Section ||--o{ Program : "relates to"
    Section ||--o{ School : "relates to"
    Course ||--o{ EducationOrganization : "relates to"
    Course ||--o{ LearningStandard : "relates to"
    Program ||--o{ EducationOrganization : "relates to"
    Program ||--o{ LearningStandard : "relates to"
    EducationOrganization ||--o{ Program : "relates to"
    CompetencyObjective ||--o{ EducationOrganization : "relates to"
    Session ||--o{ School : "relates to"
    Session ||--o{ GradingPeriod : "relates to"
    GradingPeriod ||--o{ School : "relates to"
    Student ||--o{ School : "relates to"
    Student ||--o{ Section : "relates to"
    Student ||--o{ Program : "relates to"
    LearningStandard ||--o{ LearningStandard : "relates to"
```

### Student Transcript Subdomain

The Student Transcript Model provides an academic history for a student.

#### Student Academic Record, Student Transcript Model UML Diagram

```mermaid
---

config:
  layout: elk
---

erDiagram
    Student {
    }
    StudentAcademicRecord {
    }
    CourseTranscript {
    }
    Course {
    }
    EducationOrganization {
    }
    CourseTranscript ||--o{ StudentAcademicRecord : "relates to"
    CourseTranscript ||--o{ Course : "relates to"
    CourseTranscript ||--o{ EducationOrganization : "relates to"
    StudentAcademicRecord ||--o{ Student : "relates to"
    StudentAcademicRecord ||--o{ EducationOrganization : "relates to"
    Course ||--o{ EducationOrganization : "relates to"
```

### Report Card Subdomain

A Student has a ReportCard for each GradingPeriod. A Grade is associated with
each Section. For early grade levels, a StudentCompetencyObjective is assigned
to CompetencyObjectives.

#### Student Academic Record, Report Card Model UML Diagram

# StudentAcademicRecordReportCardDataModel

```mermaid
---

config:
  layout: elk
---

erDiagram
    Student {
    }
    ReportCard {
    }
    Grade {
    }
    StudentCompetencyObjective {
    }
    StudentSectionAssociation {
    }
    GeneralStudentProgramAssociation {
    }
    GradingPeriod {
    }
    CompetencyObjective {
    }
    Section {
    }
    Program {
    }
    LearningStandard {
    }
    EducationOrganization {
    }
    ReportCard ||--o{ Student : "relates to"
    ReportCard ||--o{ GradingPeriod : "relates to"
    ReportCard ||--o{ EducationOrganization : "relates to"
    ReportCard ||--o{ Grade : "relates to"
    ReportCard ||--o{ StudentCompetencyObjective : "relates to"
    Grade ||--o{ GradingPeriod : "relates to"
    Grade ||--o{ StudentSectionAssociation : "relates to"
    Grade ||--o{ LearningStandard : "relates to"
    StudentCompetencyObjective ||--o{ Student : "relates to"
    StudentCompetencyObjective ||--o{ GradingPeriod : "relates to"
    StudentCompetencyObjective ||--o{ CompetencyObjective : "relates to"
    StudentCompetencyObjective ||--o{ GeneralStudentProgramAssociation : "relates to"
    StudentCompetencyObjective ||--o{ StudentSectionAssociation : "relates to"
    StudentSectionAssociation ||--o{ Student : "relates to"
    GeneralStudentProgramAssociation ||--o{ EducationOrganization : "relates to"
    GeneralStudentProgramAssociation ||--o{ StudentSectionAssociation : "relates to"
    Student ||--o{ Section : "relates to"
    Student ||--o{ Program : "relates to"
    Section ||--o{ Program : "relates to"
    Program ||--o{ EducationOrganization : "relates to"
    CompetencyObjective ||--o{ EducationOrganization : "relates to"
    LearningStandard ||--o{ LearningStandard : "relates to"
```

### Student Academic Record, Gradebook Model

An individual assignment in a gradebook is represented as a GradebookEntry. A
GradebookEntry may be mapped to LearningStandards. Each student’s score for that
entry is a StudentGradebookEntry which can be a grade or a CompetencyLevel.

#### Student Academic Record, Gradebook Model UML Diagram

# StudentAcademicRecordGradebookDataModel

```mermaid
---

config:
  layout: elk
---

erDiagram
    Course {
    }
    LearningStandard {
    }
    GradebookEntry {
    }
    StudentGradebookEntry {
    }
    StudentSectionAssociation {
    }
    Section {
    }
    Student {
    }
    Course ||--o{ LearningStandard : "relates to"
    LearningStandard ||--o{ LearningStandard : "relates to"
    GradebookEntry ||--o{ LearningStandard : "relates to"
    GradebookEntry ||--o{ Section : "relates to"
    StudentGradebookEntry ||--o{ GradebookEntry : "relates to"
    StudentGradebookEntry ||--o{ StudentSectionAssociation : "relates to"
    StudentSectionAssociation ||--o{ Student : "relates to"
    Student ||--o{ Section : "relates to"
```
