# v5 Descriptor Mapping > Mapping Scenarios

The entity represents a mapping of a descriptor value in one namespace to a
descriptor value in another namespace.

### Prerequisites

* None

### Scenarios

1. Create a descriptor mapping for Scenario 1
2. Create a descriptor mapping for Scenario 2

| Resource | Property Name | Is Collection | Data Type | Required / Optional | Scenario 1 POST | Scenario 2 POST | Scenario 3 POST | Scenario 4 POST |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| DescriptorMapping | Value | FALSE | string | REQUIRED | Algebra II | Life and Physical Sciences I |     |     |
| DescriptorMapping | Namespace | FALSE | string | REQUIRED | \[Native URI\]/AcademicSubjectDescriptor | \[Native URI\]/AcademicSubjectDescriptor |     |     |
| DescriptorMapping | MappedValue | FALSE | string | REQUIRED | Advanced Algebra | Biology 101 |     |     |
| DescriptorMapping | MappedNamespace | FALSE | string | REQUIRED | \[URI of mapped value\]/AcademicSubjectDescriptor | \[URI of mapped value\]/AcademicSubjectDescriptor |     |     |
