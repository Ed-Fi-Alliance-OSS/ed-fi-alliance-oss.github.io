---
sidebar_position: 4
---

# Discipline Domain - Best Practices

## Summary

The Discipline domain records discipline incidents, the people involved in
them, and the discipline actions taken in response. In Data Standard v6,
student involvement in a discipline incident is captured with two associations:

* StudentDisciplineIncidentBehaviorAssociation, for students who were
    responsible for one or more behaviors in the incident.
* StudentDisciplineIncidentNonOffenderAssociation, for students who were
    involved in the incident but were not offenders (for example, victims,
    witnesses, or reporters).

Staff involvement is captured with StaffDisciplineIncidentAssociation. The
following documentation clarifies best practices for storing Discipline data
with these entities.

## Locations for the Behavior Descriptor

The Behavior descriptor captures the nature of the behavior of an individual
involved in a discipline incident. This descriptor is located in two places
within the Discipline domain:

1. As an optional collection on DisciplineIncident, which captures all
    behaviors that occurred in the incident.
2. As a required field on StudentDisciplineIncidentBehaviorAssociation, where
    it is part of the key and ties a behavior to the student responsible for
    it.

## Use Cases

There are four identified use cases these elements address.

### Behaviors in an Incident

In a DisciplineIncident, it is assumed that there may be multiple behaviors
performed by multiple students within a single incident. For this reason, the
Behavior descriptor is an optional collection on DisciplineIncident. All
behaviors associated with the incident SHOULD be recorded here, regardless of
which student or non-student participant was responsible for each Behavior.

:::note
If an incident involves students associated to another school, each school should
record an incident relative to the student or students involved as part of the DisciplineIncident.
:::

### Student Behaviors

The second use case is to tie these behaviors to the individuals responsible. To
do this, use the StudentDisciplineIncidentBehaviorAssociation. Behavior is part
of the key of this association and so must be defined. If a student is
responsible for more than one behavior in a single incident, create one
StudentDisciplineIncidentBehaviorAssociation record for each behavior.

StudentDisciplineIncidentBehaviorAssociation also includes an optional Weapon
collection. Use it to identify the weapon or weapons used by that student, while
the Weapon collection on DisciplineIncident continues to capture all weapons
involved in the incident.

### Behavior Consequences

The third use case is to tie these students and behaviors to a DisciplineAction.
DisciplineAction has a required collection of references to
StudentDisciplineIncidentBehaviorAssociation, so every DisciplineAction must
reference at least one StudentDisciplineIncidentBehaviorAssociation record. This
allows for one or more behaviors to be tied to a single action. Because each
DisciplineAction applies to a single student, every referenced
StudentDisciplineIncidentBehaviorAssociation must be for that same student.

Alternatively, if there are different actions required for each behavior,
multiple DisciplineAction records can be created to reference each
StudentDisciplineIncidentBehaviorAssociation record.

Because the reference is required, the DisciplineIncident and the student's
StudentDisciplineIncidentBehaviorAssociation records must exist before the
DisciplineAction can be recorded.

:::note
This collection was optional in Data Standard v5 and became required in Data
Standard v6.0. See [API Changes from 5.0 to
6.0](../../whats-new/api-changes-6.md#discipline-action-endpoint-and-associated-domains)
for details.
:::

### Capture of Non-offender Data

The final use case involves recording information related to students who were
involved in an incident but were not offenders. Use
StudentDisciplineIncidentNonOffenderAssociation for these students, with its
optional DisciplineIncidentParticipationCode collection describing each
student's role (for example, victim, witness, or reporter). This association
does not include the Behavior descriptor, as it is assumed there is no Behavior
or DisciplineAction required for students that were not the perpetrators of the
incident.
