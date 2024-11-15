---
hide_table_of_contents: true
---

# v5 Contact > StudentContactAssociation Scenarios

This interchange defines contacts and captures the relationship between the
student and the guardian as well as indicators for the contact's residence,
primary guardian, and emergency contact.

The StudentContactAssociation relates students to their parents, guardians or
caretakers.

## Prerequisites

* None

## Scenarios

1. Create a student contact association between student, Austin Jones, and first
   parent.
2. Create a student contact association between student, Madison Johnson, and
   second parent.
3. Update the "primary contact status" indicator for the Austin Jones
   association.
4. Update "emergency contact status" indicator for the Madison Johnson
   association.

| Resource                   | Property Name          | Is Collection | Data Type          | Required | Scenario 1: POST                       | Scenario 2: POST                       | Scenario 3: PUT                        | Scenario 4: PUT                        |
| -------------------------- | ---------------------- | ------------- | ------------------ | -------- | -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| StudentContactAssociations | contactReference       | FALSE         | contactReference   | REQUIRED |                                        |                                        |                                        |                                        |
| contactReference           | contactUniqueId        | FALSE         | string             | REQUIRED | ["333333" if possible \| system value] | ["444444" if possible \| system value] | ["333333" if possible \| system value] | ["444444" if possible \| system value] |
| StudentContactAssociations | studentReference       | FALSE         | studentReference   | REQUIRED |                                        |                                        |                                        |                                        |
| studentReference           | studentUniqueId        | FALSE         | string             | REQUIRED | 111111                                 | 222222                                 | 111111                                 | 222222                                 |
| StudentContactAssociations | emergencyContactStatus | FALSE         | boolean            | REQUIRED | TRUE                                   | TRUE                                   | TRUE                                   | FALSE                                  |
| StudentContactAssociations | primaryContactStatus   | FALSE         | boolean            | REQUIRED | TRUE                                   | TRUE                                   | FALSE                                  | TRUE                                   |
| StudentContactAssociations | relationDescriptor     | FALSE         | relationDescriptor | REQUIRED | Father                                 | Mother                                 | Father                                 | Mother                                 |
