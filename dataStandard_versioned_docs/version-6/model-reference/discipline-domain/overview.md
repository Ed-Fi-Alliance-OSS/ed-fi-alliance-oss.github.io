---
sidebar_position: 1
---

# Discipline Domain - Overview

## Key Entities

This domain contains:

* A DisciplineIncident entity, which represents the actions or behaviors that
    constitute an “offense” in violation of laws, rules, policies, or norms of
    behavior. This entity is associated with the school where the incident
    occurred.
* A StudentDisciplineIncidentBehaviorAssociation entity, which links students
    to DisciplineIncident entities and indicates their behavior in that
    incident.
* A StudentDisciplineIncidentNonOffenderAssociation entity, which links
    students to DisciplineIncident entities and indicates their non-offender
    role in that incident.
* A StaffDisciplineIncidentAssociation entity, which links staff members to
    DisciplineIncident entities and indicates their role in that incident.
* A DisciplineAction entity, which represents the punitive or other action
    taken against a student or students.

## Key Concepts

The key concepts include the following:

* One or more discipline actions may be applied to one DisciplineIncident
    entity (e.g., suspension plus after-school study hall). Alternatively, one
    DisciplineAction entity could have multiple DisciplineIncident entities as
    an attribute to accomplish the same thing.
* When multiple students are involved in a discipline incident, the
    StudentDisciplineIncidentBehaviorAssociation and
    StudentDisciplineIncidentNonOffenderAssociation entities indicates the role
    of the students in that incident (e.g., perpetrator, victim, witness). The
    Behaviors element is used when students have different levels of
    involvement, and therefore different offenses, for the same discipline
    incident (i.e., one might have used a knife in a fight against another who
    fought without a weapon).
* The DisciplineIncidentExternalParticipant attributes may be used to document
    participants in a DisciplineIncident that are not staff members or students.
* Take note of the various ways a school may be associated with a discipline
    action. Especially, keep in mind that a school responsible for a discipline
    action may not be the school to which a student is transferred for a
    disciplinary reason.
