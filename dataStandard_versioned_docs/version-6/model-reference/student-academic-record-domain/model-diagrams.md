---
sidebar_position: 2
---

# Student Academic Record Domain - Model Diagrams

This section contains reference information for the Student Academic Record
domain model.

## Student Academic Record Model UML Diagram

![Student Academic Record Model UML](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/StudentAcademicRecord11072025.png)

[_Large Version_](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/StudentAcademicRecord11072025.png)

### Student Transcript Subdomain

The Student Transcript Model provides an academic history for a student.

#### Student Academic Record, Student Transcript Model UML Diagram

![Student Academic Record - Student Transcript Subdomain](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/StudentAcademicRecord_Transcript11072025.png)

[_Large Version_](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/StudentAcademicRecord_Transcript11072025.png)

### Report Card Subdomain

A Student has a ReportCard for each GradingPeriod. A Grade is associated with
each Section. For early grade levels, a StudentCompetencyObjective is assigned
to CompetencyObjectives.

#### Student Academic Record, Report Card Model UML Diagram

![Student Academic Record - Report Card Subdomain](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/StudentAcademicRecord_ReportCard11072025.png)

[_Large Version_](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/StudentAcademicRecord_ReportCard11072025.png)

### Student Academic Record, Gradebook Model

An individual assignment in a gradebook is represented as a GradebookEntry. A
GradebookEntry may be mapped to LearningStandards. Each student’s score for that
entry is a StudentGradebookEntry which can be a grade or a CompetencyLevel.

#### Student Academic Record, Gradebook Model UML Diagram

![Student Academic Record - Gradebook Subdomain](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/StudentAcademicRecord_GradeBook11072025.png)

[_Large Version_](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/StudentAcademicRecord_GradeBook11072025.png)
