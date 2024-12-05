# Student Academic Record Domain - Model Diagrams

This section contains reference information for the Student Academic Record
domain model.

## Student Academic Record Model UML Diagram

![Student Academic Record Model UML](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Student%20Academic%20Record%20Model%20UML.png)

[_Large Version_](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Student%20Academic%20Record%20Model%20UML.png)

### Student Transcript Subdomain

The Student Transcript Model provides an academic history for a student.

#### Student Academic Record, Student Transcript Model UML Diagram

![Student Academic Record - Student Transcript Subdomain](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Student%20Academic%20Record%20-%20Student%20Transcript%20Subdomain.png)

[_Large Version_](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Student%20Academic%20Record%20-%20Student%20Transcript%20Subdomain.png)

### Report Card Subdomain

A Student has a ReportCard for each GradingPeriod. A Grade is associated with
each Section. For early grade levels, a StudentCompetencyObjective is assigned
to CompetencyObjectives.

#### Student Academic Record, Report Card Model UML Diagram

![Student Academic Record - Report Card Subdomain](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Report%20Card%20Subdomain%20UML.png)

[_Large Version_](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Report%20Card%20Subdomain%20UML.png)

### Student Academic Record, Gradebook Model

An individual assignment in a gradebook is represented as a GradebookEntry. A
GradebookEntry may be mapped to LearningStandards. Each student’s score for that
entry is a StudentGradebookEntry which can be a grade or a CompetencyLevel.

#### Student Academic Record, Gradebook Model UML Diagram

![Student Academic Record - Gradebook Subdomain](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Student%20Academic%20Record%20-%20Gradebook.png)

[_Large Version_](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/Student%20Academic%20Record%20-%20Gradebook.png)
