---
sidebar_position: 1
---


# Educator Preparation Data Model Domain - Overview

:::warning
The Teacher Preparation Data Model has been renamed to the Educator Preparation
Data Model to better reflect the capability of the model to support all types of
educator preparation. Read more about the name change [We're renaming TPDM,
here's
why](https://edfi.atlassian.net/wiki/display/EPP/We%27re+renaming+TPDM%2C+here%27s+why).
:::

## Key Entities

This domain contains:

* The Candidate entity that represents a "candidate for certification or
    licensure", or a student that is attending a university or alternate
    certification provider and is enrolled in a program that will meet the
    necessary requirements for certification as defined by the state, and has
    not yet received certification.
* The EducatorPreparationProgram entity that represents a state approved
    course of study, completion of which signifies a candidate will have met all
    requirements necessary to obtain a certification or licensure to teach
    within K-12 schools.
* The PerformanceEvaluation entity and related entities that Educator
    Preparation Programs (EPPs) can use to capture performance data about
    Candidates and Staff teachers to drive the analysis of effectiveness and
    improvement.
* An expansion to the Credential entity which uses the early-access person
    entity to associate to a credential, so any person-role (e.g., Student,
    Candidate) can be associated with a credential.
* An expansion to the Survey entity and related entities to support survey
    requirements that are a cornerstone of most EPP implementations.
* The Student Path is a community extension that tracks the progress of an individual
    from being a student to becoming an educator. This domain tracks various
    assessments , fieldwork, and certifications from third party and state education
    agencies. The [Student Path Domain](student-path-overview.md) community extension can be reviewed in greater detail by following the link.

## Key Concepts

The key concepts include the following:

* A key design decision was to define Candidate as separate from the current
    Ed-Fi Student. Candidates will take courses related to their certification
    and then have rounds of clinical placement, shadowing staff at a K-12 school
    initially and then teaching the classroom themselves.
* In the Ed-Fi model enrollment is generally handled by an association to a
    school (StudentSchoolAssociation or
    StudentEducationOrganizationAssociation), but EPPs track and care about
    improvement at the program level. Therefore, educator preparation programs
    are the primary source of "enrollment" within the model for the candidate.
* Performance evaluation is a 4-layer hierarchical structure that defines the
    metadata (how a person will be measured) and the individual ratings. This
    allows EPPs to capture performance data about Candidates and Staff teachers
    to drive the analysis of effectiveness and improvement.
* The credential model as defined in EPDM uses the Person entity to associate
    credentials, so any person-role (e.g., Candidate, Student, Staff, etc.) can
    be associated with a credential.
* SurveyResponse is extended to include an optional Person reference.
