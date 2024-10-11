# v5 Education Organization > School Scenarios

This entity represents an educational organization that includes staff and
students who participate in classes and educational activity groups.

### Prerequisites

- None

### Scenarios

1. Add Grand Oaks High School
2. Add Grand Oaks Middle School
3. Update Grand Oaks High School street address
4. Update Grand Oaks Middle School postal code

_Note: shortNameOfInstitution can duplicate the value in nameOfInstitution if
 not tracked in your SIS._

| Resource                        | Property Name                           | Is Collection | Data Type                       | Required / Optional | Scenario 1 <br/>POST   | Scenario 2 <br/>POST     | Scenario 3 <br/>PUT    | Scenario 4 <br/>PUT      |
| ------------------------------- | --------------------------------------- | ------------- | ------------------------------- | ------------------- | ---------------------- | ------------------------ | ---------------------- | ------------------------ |
| Schools                         | addresses                               | TRUE          | educationOrganizationAddress[]  | REQUIRED            |                        |                          |                        |                          |
| educationOrganizationAddresses  | addressTypeDescriptor                   | FALSE         | string                          | REQUIRED            | Physical               | Physical                 | Physical               | Physical                 |
| educationOrganizationAddresses  | city                                    | FALSE         | string                          | REQUIRED            | Grand Oaks             | Grand Oaks               | Grand Oaks             | Grand Oaks               |
| educationOrganizationAddresses  | postalCode                              | FALSE         | string                          | REQUIRED            | 73334                  | 73334                    | 73334                  | 73335                    |
| educationOrganizationAddresses  | stateAbbreviationDescriptor             | FALSE         | string                          | REQUIRED            | TX                     | TX                       | TX                     | TX                       |
| educationOrganizationAddresses  | streetNumberName                        | FALSE         | string                          | REQUIRED            | 456 Oaks Street        | 9993 West Blvd.          | 456 Cedar Street       | 9993 West Blvd.          |
| Schools                         | educationOrganizationCategories         | TRUE          | educationOrganizationCategory[] | REQUIRED            |                        |                          |                        |                          |
| educationOrganizationCategories | educationOrganizationCategoryDescriptor | FALSE         | string                          | REQUIRED            | School                 | School                   | School                 | School                   |
| Schools                         | gradeLevels                             | TRUE          | schoolGradeLevel[]              | REQUIRED            |                        |                          |                        |                          |
| schoolGradeLevels               | gradeLevelDescriptor                    | FALSE         | string                          | REQUIRED            | Ninth grade            | Sixth grade              | Ninth grade            | Sixth grade              |
| schoolGradeLevels               | gradeLevelDescriptor                    | FALSE         | string                          | REQUIRED            | Tenth grade            | Seventh grade            | Tenth grade            | Seventh grade            |
| schoolGradeLevels               | gradeLevelDescriptor                    | FALSE         | string                          | REQUIRED            | Eleventh grade         | Eighth grade             | Eleventh grade         | Eighth grade             |
| schoolGradeLevels               | gradeLevelDescriptor                    | FALSE         | string                          | REQUIRED            | Twelfth grade          |                          | Twelfth grade          |                          |
| Schools                         | localEducationAgencyReference           | FALSE         | localEducationAgencyReference   | REQUIRED            |                        |                          |                        |                          |
| localEducationAgencyReference   | localEducationAgencyId                  | FALSE         | int                             | REQUIRED            | 255901                 | 255901                   | 255901                 | 255901                   |
| Schools                         | nameOfInstitution                       | FALSE         | string                          | REQUIRED            | Grand Oaks High School | Grand Oaks Middle School | Grand Oaks High School | Grand Oaks Middle School |
| Schools                         | schoolId                                | FALSE         | int                             | REQUIRED            | 255901333              | 255901444                | 255901333              | 255901444                |
| Schools                         | shortNameOfInstitution                  | FALSE         | string                          | CONDITIONAL         | GOHS                   | GOMS                     | GOHS                   | GOMS                     |
