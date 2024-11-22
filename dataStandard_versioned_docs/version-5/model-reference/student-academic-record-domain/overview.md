---
sidebar_position: 1
---

# Student Academic Record Domain - Overview

## Key Entities

This domain contains:

* A StudentAcademicRecord entity associated with each Session entity, which in
    turn has a CourseTranscript entity for each course taken. Together, these
    entities form a holistic student transcript, containing information about
    course-level grades and credits.
* A ReportCard entity and a GradingPeriod entity, which contain information
    for grading period grades and competencies. Generally speaking, a report
    card consists of a ReportCard entity for each GradingPeriod entity. A grade
    is associated with each Section entity.
* A GradebookEntry entity which represents an assignment in a gradebook. A
    gradebook contains grades and competencies for classroom quizzes, tests,
    homework, and projects. Each student’s score for an assignment is a
    StudentGradebookEntry, which can be a Grade or a CompetencyLevel entity.

## Key Concepts

The key concepts include the following:

* There are three separate subdomain models within this domain, and they each
    address different but related areas of the academic record.
  * The **Student Transcript** model is strictly concerned with historical
        information. Generally speaking, the Student Transcript records that
        particular student took a certain course during a particular term and
        received a particular grade and credit award.
  * The **Grades and Report Card** model is designed to capture score
        information for Sections for a given GradingPeriod entity. Note that it
        is not required to use the ReportCard entity; in many cases,
        implementations just use Grades (ReportCard adds the ability to capture
        GPAs and other data included on the ReportCard, though often GPAs are
        only captured via the Student Transcript subdomain).
  * The **Gradebook** model includes homework assignments, quizzes, and any
        individual grades earned that would be recorded within a teacher’s
        gradebook.
* While data in each subdomain model can influence others, they aren’t a
    hierarchy. The subdomain documentation in [Student Academic Record Domain -
    Model Diagrams](./diagrams.md) provides additional detail.
