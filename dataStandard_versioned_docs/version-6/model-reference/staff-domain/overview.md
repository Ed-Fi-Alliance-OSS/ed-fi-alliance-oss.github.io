---
sidebar_position: 1
---

# Staff Domain - Overview

## Key Entities

This domain contains:

* The Credential entity which captures staff credentials.
* The OpenStaffPosition entity, which indicates the employment postings for an
    education organization and captures the result of that posting.
* The Person entity which represents a single individual who is linked to one or more staff records.
* The School entity represents an educational organization that includes staff, students and candidates who participate in classes and educational activity groups, inclusive of school in a post secondary institution.
* The Staff entity, which models individuals like teachers, principals,
    administrators, counselors who provide instructional or support services to
    students.
* The StaffDemographic entity represents the demographic information associated to a staff member.
* The StaffDirectory entity represents the contact information associated to a staff member.
* The StaffEducationOrganizationEmploymentAssociation entity, which represents
    employment information.
* The StaffEducationOrganizationAssignmentAssociation entity, which represents
    position assignments and roles.
* The StaffIdentificationCode entity holds the different identity codes for a staff member.
* The StaffLeave entity which tracks staff leave history and StaffAbsenceEvent
    which tracks staff attendance.
* The StaffSchoolAssociation entity, which captures additional information and
    associations relating to instructional duties.

## Key Concepts

The key concepts include the following:

* In prior versions data related to contact, demographic, and identification codes
    of a staff record were part of the StaffEducationOrganizationContactAssociation
    entity. This entity has been removed and replaced with three new entities to
    improve flexibility as follows:

  * StaffDemographic entity which is used to capture demographic information related
        to a Staff member at a particular educational organization. Information
        includes data such as Citizenship, Race, Sex, Language etc.

  * StaffDirectory entity which is used to capture contact information to be used for
        a staff member at a particular educational organization.

  * StaffIdentificationCode entity which is used to capture identification code related
        to a Staff member at a particular educational organization.

* There are two distinct associations between a Staff member and an
    EducationOrganization. Note that there is also a StaffSectionAssociation
    relationship; that relationship is detailed in the [Teaching and Learning
    Domain](../teaching-and-learning-domain/overview.md).

  * The StaffEducationOrganizationEmploymentAssociation entity is primarily
        for the financial relationship with the entity that is responsible for
        paying the staff member. This relationship also models volunteer staff
        or contract employees of an educational organization with which the
        staff member signed a volunteer or contract agreement.

  * The StaffEducationOrganizationAssignmentAssociation entity provides
        information on the education organization where a staff member provides
        services (i.e., the staff member's school of service).

* Some additional information related to the assignment association is
    captured in the StaffSchoolAssociation, but this pertains more to specific
    duties at the school rather than a description of the actual relationship.

* If an assignment is directly tied to employment (i.e., the staff member's
    pay would differ based upon the assignments), then an association is used
    from the StaffEducationOrganizationAssignmentAssociation entity to the
    StaffEducationOrganizationEmploymentAssociation entity.
