# What's New - v3.3-a

## Major Changes

### Support for Organization Departments ([DATASTD-1396](https://tracker.ed-fi.org/browse/DATASTD-1396))

This version introduces an OrganizationDepartment entity to capture
sub-structures of larger institutions, such as the "Central Office" of a school
district or the "Math Department" of postsecondary institution. This change is
driven by increasing interest in staff and human resources related data, as well
as growth in adoption in postsecondary use cases and contexts.

OrganizationDepartment is a subclass of the abstract EducationOrganization,
making it usable wherever there is an EducationOrganization reference.

### Mapping Assessment Score Ranges to Learning Standards ([DATASTD-1469](https://tracker.ed-fi.org/browse/DATASTD-1469))

The current assessment domain model did not easily support a systems for mapping
student performance ranges to learning standards. In these models, the student
meets all learning standards below their "score" but does not meet those "above"
their score. This pattern of reporting and analysis was observed with both NWEA
and ACT data.

An AssessmentScoreRangeLearningStandard was added to the model that allows
LearningStandards to be indexed to assessment score ranges.

### Important Updates to Discipline Model ([DATASTD-1393](https://tracker.ed-fi.org/browse/DATASTD-1393), [DATASTD-1527](https://tracker.ed-fi.org/browse/DATASTD-1527))

These changes relate to how behaviors in discipline incidents are applied to
students involved in the incident. The current model made it complex to tie a
Behavior to a DisciplineAction, which is important in many reporting and
operational contexts.

The model was redesigned to support this, and that redesign also generally
cleared up a number of smaller issues making the model much more semantically
clear and usable. See also
[DATASTD-1430](https://tracker.ed-fi.org/browse/DATASTD-1430), which was closed
as a result of these changes.

In addition, the update also includes normative guidance on model usage.

### Expansion of Ethnicity Demographics ([DATASTD-1463](https://tracker.ed-fi.org/browse/DATASTD-1463))

Field work had revealed the need for an element to capture concepts related to
either ethnicity of ancestral origin. Accordingly a descriptor
AncestryEthnicOrigin was adopted from field work to serve this purpose.

### Early Access "Person" Entity

Early access versions of 3.2 contained a "Person" entity and this entity is
included in 3.3-a as well. Person is intended to allow for data modeling use
cases where references can be any one of a diverse set of "Person Roles" (e.g.
an individual is both a Staff and a parent). Person remains experimental and is
appropriate only for projects exploring proper usage via field work.

For use of Person, please see this technical document: [Guidance on Use of Ed-Fi
Person
Entity](https://edfi.atlassian.net/wiki/spaces/EFDS33/pages/26968163/Guidance+on+Use+of+Ed-Fi+Person+Entity)