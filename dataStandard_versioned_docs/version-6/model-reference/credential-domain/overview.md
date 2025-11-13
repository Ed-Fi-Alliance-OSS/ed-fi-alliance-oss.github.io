---
sidebar_position: 1
---

# Credential Domain - Overview

## Key Entities

This domain contains:

* The Credential entity describes the certification or license obtained by a person indicating their capability and suitability to perform a job function, such
    as fulfill a teaching assignment.
* The Certification entity describes an offering by an official granting authority of a certification or license that qualifies persons to perform specific job
    functions, such as to fulfill a teaching assignment.

## Key Concepts

The key concepts include the following:

* The Credential domain allows users to link credentials with Candidates and track their progress for achieving them.
* Allows users to track the lifecycle of credentials after issuance (e.g., renewed, revoked, retired).
* In addition to being referenced by Staff, a Credential may reference a Person, allowing its use with other person-roles, such as Candidate or Student.
* To support Credentials for Students, the GraduationPlan will optionally identify RequiredCertifications. Acquired Credentials by a Student may be optionally
    associated with the StudentAcademicRecord.
* An optional association is included in the Professional Development domain from ProfessionalDevelopmentEventAttendance to Certification.
