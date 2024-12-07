# Supported Extensions: 1. Adding New Entities

This section covers allowable scenarios for adding entities to the Ed-Fi data
model.

## 1.1. Add New Domain Entity

A domain entity usually represents a real-world noun or concept. Examples in the
core Ed-Fi data model include the Student entity, the Student Assessment entity,
the Education Organization entity, and so forth. New entities may be added to
the Ed-Fi data model.

* MUST contain at least one identity property.
* MUST NOT allow identity property updates for new domain entities that are
    not in the core Ed-Fi data model.
* MAY contain multiple identity properties.
* MAY include any properties as required/optional/single/collection.

Please note that if a new domain entity in an extension re-uses a name from the
core model (say, myextention.Student) and the same common type is applied to
each (edfi.Address), this has caused collisions in some implementations, For
this reason, reuse of a core entity IS NOT RECOMMENDED in the case where the
same common type appears on both.

## 1.2. Add New Association Entity

Association entities usually make a logical connection between domain entities
(e.g., between a staff member and an education organization to which they are
assigned). In the Ed-Fi data model, Association entities almost always carry
additional information about the association itself, such as begin and end
dates. Associations often carry information specific to the association such as
a staff member's specific role at a particular school.

* MUST have a unique name - consider using a semantic differentiator in the
    name if an Association joining the same two entities already exists.
* SHOULD have a name that concatenates the entities being joined ending with
    "Association".
* MAY contain additional attributes beyond the reference to the associated
    entities.
* MAY include any properties as required/optional/single/collection.

## 1.3. Add New Descriptor

Descriptors are a customizable list of values mapped for each implementation.

* MUST NOT include a map type.
* MUST NOT contain "Descriptor" in the name, as this creates redundancy in the
    name and causes downstream problems.
* MUST NOT contain any additional properties.

## 1.4. Add New Shared Simple Type

Shared simple types are elements that can be reused throughout an extension.

* MUST have a unique name.
* MUST contain the minimum appropriate details to define a decimal, string, or
    integer.
* MUST be a shared decimal, shared string, or shared integer.
* MUST NOT include any properties other than the simple type definition.

## 1.5. Add New Common Type

Common types are reusable types that can be referenced by inclusion in an
Extension.

* MUST contain an identity property if used as a collection. MAY otherwise
    contain an identity property.
* MUST include at least one property from the list below.
* MAY include any properties as required/optional/single/collection.
