# Supported Extensions: 3. Subclassing Existing Entities

This section covers allowable scenarios for subclassing existing entities in the
Ed-Fi data model and extensions.

## 3.1. Subclass Domain Entities and Associations

Domain Entities and Associations may be subclassed when an entity needs
additional data to support a _specialization_ of the model.

Currently, only the subclassing of abstract entities, such as
EducationOrganization and GeneralStudentProgramAssociation (formerly
StudentProgramAssociation in v2.x) and subclassing of composite parts classes
(sometimes referred to as "common types", e.g., Ed-Fi Address or MeetingTime) ,
is supported.

* MUST NOT contain any identity properties.
* MUST contain at least one property.
* SHOULD NOT contain properties included in the parent entity unless
    additional context is provided.
* SHOULD follow the same naming conventions as are applicable for the parent
    entity.
* MUST subclass domain entities and associations only.
* MUST NOT subclass a subclassed entity.
