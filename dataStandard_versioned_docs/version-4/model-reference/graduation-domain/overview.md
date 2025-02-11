---
sidebar_position: 1
---


# Graduation Domain - Overview

## Key Entities

This domain contains:

* A GraduationPlan entity, which represents either a generic graduation plan
    for all or many students or an individualized graduation plan. The
    GraduationPlan entity supports several levels of detail, from overall credit
    requirements and credits by subject area to specific courses to be taken.
* A PostSecondaryEvent entity, which represents significant postsecondary
    education information, such as college applications, remedial course
    enrollment, and acceptances acceptances, that can be tied to a
    PostSecondaryInstitution.

## Key Concepts

The key concepts include the following:

* Graduation plans may be defined at a general level for an entire education
    organization or may be personalized to a specific student or group of
    students.

* A student may have more than one plan, but all plans are associated through
    an enrollment record (i.e., the StudentSchoolAssociation entity).
* Graduation certificate information, including associated honors and
    recognitions, is stored in the Diploma element in the StudentAcademicRecord
    entity.
