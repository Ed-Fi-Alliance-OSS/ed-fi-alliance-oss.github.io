# rls_RemoveStaffClassificationDescriptorScope Stored Procedure

## Purpose

Removes staff classification/scope records from the [Descriptor
Mapping](../../../deployment-guide/descriptor-mapping.md) table. Part of the [Row-Level Security
Collection](./readme.md).

## SQL Object

`analytics_config.rls_RemoveStaffClassificationDescriptorScope`

## Usage

Remove mapping for classification code value  "Counselor" to the "Section" scope
of permissions:

```sql
exec [analytics_config].[RemoveStaffClassificationDescriptorScope] (@StaffDescriptor = 'Counselor', @Scope = 'Section')

-- alternate, using Id values
exec [analytics_config].[RemoveStaffClassificationDescriptorScope] (@StaffDescriptorId = 154, @ScopeId = 1)
```
