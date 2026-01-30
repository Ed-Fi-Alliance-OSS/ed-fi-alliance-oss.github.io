---
sidebar_position: 1
---

# Student Cohort Domain - Overview

## Key Entities

This domain contains:

* The Cohort entity, which can be associated with Intervention entities via
    the StudentInterventionAssociation entity.
* The StudentCohortAssociation entity, which captures the assignment of
    students to cohorts.
* The StaffCohortAssociation entity, which captures the association of staff
    members to a cohort of students.

## Key Concepts

The key concepts include the following:

* The Student Cohort domain is a general-purpose structure for tracking and
    reporting on groups of students. A cohort can represent students
    participating in a program, students whose educational outcomes will be part
    of an analysis, or simply a list of students fitting a particular criteria
    of interest.
* Cohorts may be associated with programs and may have staff associated with
    the cohort that is providing services, oversight, or sponsorship.
* The Cohort entity should not be confused with the graduation year cohort,
    which is defined by enrollment and grade level data.
