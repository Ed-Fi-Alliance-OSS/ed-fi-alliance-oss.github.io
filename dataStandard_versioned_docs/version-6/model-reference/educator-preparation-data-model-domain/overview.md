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
* The CandidateEducatorPreparationProgramAssociation entity....
* The CandidateIdentificationCode entity holds the different identity codes for
    a Candidate member
* The CandidateRelationshipToStaffAssociation entity ....
* The EducatorPreparationProgram entity that represents a state approved
    course of study, completion of which signifies a candidate will have met all
    requirements necessary to obtain a certification or licensure to teach
    within K-12 schools.
* The FieldworkExperience Entity holds information regarding a post-secondary instructional
    coursework in a particular field of study that typically involves a prescribed number,
    instruction periods, or meetings.
* The FieldworkExperienceSectionAssociation entity ....
* The StaffEducatorPreparationProgramAssociation entity ....

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
