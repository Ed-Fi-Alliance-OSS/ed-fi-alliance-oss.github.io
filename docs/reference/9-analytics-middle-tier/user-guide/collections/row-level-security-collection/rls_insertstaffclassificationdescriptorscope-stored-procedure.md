# rls_InsertStaffClassificationDescriptorScope Stored Procedure

## Purpose

Insert staff classification/scope records into the [Descriptor
Mapping](../../../deployment-guide/descriptor-mapping.md) table. Part of the [Row-Level Security
Collection](./readme.md).

## SQL Object

`analytics_config.rls_InsertStaffClassificationDescriptorScope`

## Usage

Map staff with classification code value  "Counselor" to the "Section" scope of
permissions:

```sql
exec [analytics_config].[InsertStaffClassificationDescriptorScope] @StaffDescriptor = 'Counselor', @Scope = 'Section'

-- alternate, using Id values
exec [analytics_config].[InsertStaffClassificationDescriptorScope] @StaffDescriptorId = 154, @ScopeId = 1
```
