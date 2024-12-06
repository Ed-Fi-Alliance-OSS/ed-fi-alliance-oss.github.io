---
sidebar_position: 1
---

# Student Program Evaluation Domain - Overview

## Key Entities

This domain contains:

* A StudentProgram evaluation entity that describes the results of student
    evaluated in a context of a program.
* A ProgramEvaluation entity that represents the instrument applied to
    evaluate a student.
* ProgramEvaluationObjective used optionally to group the evaluation elements
    into higher level objectives or themes.
* ProgramEvaluationElement that defines the individual elements that is being
    evaluated.
* EvaluationRubricDimension that defines the dimensions or criteria for
    evaluation for each evaluation element.

## Key Concepts

The key concepts include the following:

* The Student Program Evaluation domain stems from the imperative requirement
    to gather comprehensive data from Arizona's 21st Century Community Learning
    Centers (21st CCLC) program and Early Childhood Education (ECE) programs
    operated by various state agencies, such as Wisconsin, Indiana, and
    Minnesota.
* The primary objective of the Student Program Evaluation domain is to
    establish a systematic approach for collecting, analyzing, and interpreting
    data pertaining to student programs. By implementing this domain,
    educational authorities can make informed decisions, improve program
    effectiveness, and drive positive outcomes for students participating in the
    21st CCLC and ECE initiatives and early childhood programs.
* The Student Program Evaluation model draws its foundation primarily from the
    Performance Evaluation framework of the Educator's Preparation Data Model
    (EPDM). The EPDM's Performance Evaluation comprises a 4-layer hierarchical
    structure that defines essential metadata outlining the measurement criteria
    and individual performance ratings.
* The Student Program Evaluation domain comprises essential tables to
    facilitate the storage and management of evaluation data. The primary tables
    in this domain are the StudentProgramEvaluation and ProgramEvaluation
    tables, supported by auxiliary tables like ProgramEvaluationObjective,
    ProgramEvaluationElement, and EvaluationRubricDimension. This domain allows
    for comprehensive storage and assessment of students' performance in a
    program, utilizing rubrics and structured evaluation criteria to record
    results accurately.
