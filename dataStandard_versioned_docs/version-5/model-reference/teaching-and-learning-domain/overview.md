# Teaching and Learning Domain - Overview

## Key Entities

This domain contains:

* The Course and CourseOfferings entities, which represent subject matter and
    course availability at a school in each session.
* The Section entity, which represents the specific classroom unit where
    instruction is provided.
* The Program entity, which represents any program that works in conjunction
    with, or as a supplement to, the main academic program.
* The StudentSectionAssociation entity, which represents a student’s class
    enrollments in sections, and the StaffSectionAssociation entity that
    indicates the teacher(s) assigned to that section.

## Key Concepts

The key concepts include the following:

* The Course entity is the actual definition of the material to be taught,
    often defined at a state level by the Board of Education to meet certain
    learning standards.
* A CourseOffering entity is simply the local availability of a course at a
    school during a specific session. It’s the equivalent of an entry in the
    school’s annual or semester course catalog.
* The Section entity represents the specific classroom unit where attendance
    is taken and content is delivered.
* In practice, it’s possible for multiple sections of a Course to be taught
    within the same classroom by the same teacher, with the students being
    administered a slightly different curriculum in each. The model provides
    support for this situation.
* Program entities are associated at the Section entity level. This is
    somewhat counter-intuitive since students in different sections may be in
    the same program. However, this model allows for flexibility and keeps the
    two entities aligned with regard to how attendance is modeled.
