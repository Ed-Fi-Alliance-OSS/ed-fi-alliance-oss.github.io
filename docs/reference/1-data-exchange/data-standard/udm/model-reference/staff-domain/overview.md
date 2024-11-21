---
sidebar_position: 1
---

# Staff Domain - Overview

## Key Entities

This domain contains:

* The Staff entity, which models individuals like teachers, principals,
    administrators, counselors who provide instructional or support services to
    students.
* The StaffSchoolAssociation entity, which captures additional information and
    associations relating to instructional duties.
* The StaffEducationOrganizationEmploymentAssociation entity, which represents
    employment information.
* The StaffEducationOrganizationAssignmentAssociation entity, which represents
    position assignments and roles.
* The StaffLeave entity which tracks staff leave history and StaffAbsenceEvent
    which tracks staff attendance.
* The OpenStaffPosition entity, which indicates the employment postings for an
    education organization and captures the result of that posting.
* The Credential entity which captures staff credentials.

## Key Concepts

The key concepts include the following:

* There are three distinct associations between a Staff member and an
    EducationOrganization. Note that there is also a StaffSectionAssociation
    relationship; that relationship is detailed in the [Teaching and Learning
    Domain](../../unifying-data-model-v5-model-reference/teaching-and-learning-domain.md).

  * The StaffEducationOrganizationEmploymentAssociation entity is primarily
        for the financial relationship with the entity that is responsible for
        paying the staff member. This relationship also models volunteer staff
        or contract employees of an educational organization with which the
        staff member signed a volunteer or contract agreement.

  * The StaffEducationOrganizationAssignmentAssociation entity provides
        information on the education organization where a staff member provides
        services (i.e., the staff member's school of service).

  * The StaffEducationOrganizationContactAssociation entity which is used to
        capture contact information to be used for a staff member at a
        particular educational organization.

* Some additional information related to the assignment association is
    captured in the StaffSchoolAssociation, but this pertains more to specific
    duties at the school rather than a description of the actual relationship.

* If an assignment is directly tied to employment (i.e., the staff member's
    pay would differ based upon the assignments), then an association is used
    from the StaffEducationOrganizationAssignmentAssociation entity to the
    StaffEducationOrganizationEmploymentAssociation entity.
