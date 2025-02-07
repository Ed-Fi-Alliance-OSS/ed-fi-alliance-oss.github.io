---
hide_table_of_contents: true
---

# v4 Education Organization > School Scenarios

This entity represents an educational organization that includes staff and
students who participate in classes and educational activity groups.

## Prerequisites

* None

## Scenarios

1. Add Grand Oaks High School
2. Add Grand Oaks Middle School
3. Update Grand Oaks High School street address
4. Update Grand Oaks Middle School postal code

:::note

shortNameOfInstitution can duplicate the value in nameOfInstitution if not
tracked in your SIS.

:::

| Resource                        | Property Name                           | Is Collection | Data Type                       | Required    | Scenario 1: POST       | Scenario 2: POST         | Scenario 3: PUT        | Scenario 4: PUT          |
| ------------------------------- | --------------------------------------- | ------------- | ------------------------------- | ----------- | ---------------------- | ------------------------ | ---------------------- | ------------------------ |
| Schools                         | addresses                               | TRUE          | educationOrganizationAddress[]  | REQUIRED    |                        |                          |                        |                          |
| educationOrganizationAddresses  | addressTypeDescriptor                   | FALSE         | string                          | REQUIRED    | Physical               | Physical                 | Physical               | Physical                 |
| educationOrganizationAddresses  | apartmentRoomSuiteNumber                | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationAddresses  | buildingSiteNumber                      | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationAddresses  | city                                    | FALSE         | string                          | REQUIRED    | Grand Oaks             | Grand Oaks               | Grand Oaks             | Grand Oaks               |
| educationOrganizationAddresses  | congressionalDistrict                   | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationAddresses  | countyFIPSCode                         | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationAddresses  | latitude                                | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationAddresses  | localeDescriptor                        | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationAddresses  | longitude                               | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationAddresses  | nameOfCounty                           | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationAddresses  | postalCode                              | FALSE         | string                          | REQUIRED    | 73334                  | 73334                    | 73334                  | 73335                    |
| educationOrganizationAddresses  | stateAbbreviationDescriptor             | FALSE         | string                          | REQUIRED    | TX                     | TX                       | TX                     | TX                       |
| educationOrganizationAddresses  | streetNumberName                        | FALSE         | string                          | REQUIRED    | 456 Oaks Street        | 9993 West Blvd.          | 456 Cedar Street       | 9993 West Blvd.          |
| educationOrganizationAddresses  | doNotPublishIndicator                   | FALSE         | Boolean                         | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationAddresses  | periods                                 | TRUE          | Periods[]                      | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationAddressPeriods | beginDate                            | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationAddressPeriods | endDate                              | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| Schools                         | administrativeFundingControlDescriptor   | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| Schools                         | charterApprovalAgencyTypeDescriptor      | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| Schools                         | charterApprovalSchoolYearTypeReference   | FALSE         | schoolYearTypeReference         | OPTIONAL    |                        |                          |                        |                          |
| schoolYearTypeReference        | schoolYear                              | FALSE         | int                             | OPTIONAL    |                        |                          |                        |                          |
| Schools                         | charterStatusDescriptor                  | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| Schools                         | educationOrganizationCategories          | TRUE          | educationOrganizationCategory[] | REQUIRED    |                        |                          |                        |                          |
| educationOrganizationCategories | educationOrganizationCategoryDescriptor   | FALSE         | string                          | REQUIRED    | School                 | School                   | School                 | School                   |
| Schools                         | identificationCodes                     | TRUE          | educationOrganizationIdentificationCode[] | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationIdentificationCodes | educationOrganizationIdentificationSystemDescriptor | FALSE | string | OPTIONAL |                        |                          |                        |                          |
| educationOrganizationIdentificationCodes | identificationCode                  | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| Schools                         | educationOrganizationIndicators          | TRUE          | educationOrganizationIndicators[] | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationIndicators | indicatorDescriptor                     | FALSE         | indicatorDescriptor             | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationIndicators | designatedBy                            | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationIndicators | indicatorGroupDescriptor                | FALSE         | indicatorGroupDescriptor        | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationIndicators | indicatorLevelDescriptor                | FALSE         | indicatorLevelDescriptor        | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationIndicators | indicatorValue                          | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationIndicators | periods                                 | TRUE          | periods[]                      | OPTIONAL    |                        |                          |                        |                          |
| periods                         | beginDate                               | FALSE         | date                            | OPTIONAL    |                        |                          |                        |                          |
| periods                         | endDate                                 | FALSE         | date                            | OPTIONAL    |                        |                          |                        |                          |
| Schools                         | gradeLevels                             | TRUE          | schoolGradeLevel[]              | REQUIRED    |                        |                          |                        |                          |
| schoolGradeLevels               | gradeLevelDescriptor                    | FALSE         | string                          | REQUIRED    | Ninth grade            | Sixth grade              | Ninth grade            | Sixth grade              |
| schoolGradeLevels               | gradeLevelDescriptor                    | FALSE         | string                          | REQUIRED    | Tenth grade            | Seventh grade            | Tenth grade            | Seventh grade            |
| schoolGradeLevels               | gradeLevelDescriptor                    | FALSE         | string                          | REQUIRED    | Eleventh grade         | Eighth grade             | Eleventh grade         | Eighth grade             |
| schoolGradeLevels               | gradeLevelDescriptor                    | FALSE         | string                          | REQUIRED    | Twelfth grade          |                          | Twelfth grade          |                          |
| Schools                         | institutionTelephones                   | TRUE          | educationOrganizationInstitutionTelephone[] | OPTIONAL |                        |                          |                        |                          |
| educationOrganizationInstitutionTelephones | institutionTelephoneNumberTypeDescriptor | FALSE | string | OPTIONAL |                        |                          |                        |                          |
| educationOrganizationInstitutionTelephones | telephoneNumber                   | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| Schools                         | internationalAddresses                  | TRUE          | educationOrganizationInternationalAddress[] | OPTIONAL |                        |                          |                        |                          |
| educationOrganizationInternationalAddresses | addressLine1                     | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationInternationalAddresses | addressLine2                     | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationInternationalAddresses | addressLine3                     | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationInternationalAddresses | addressLine4                     | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationInternationalAddresses | addressTypeDescriptor           | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationInternationalAddresses | beginDate                       | FALSE         | date                            | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationInternationalAddresses | countryDescriptor               | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationInternationalAddresses | endDate                         | FALSE         | date                            | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationInternationalAddresses | latitude                        | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| educationOrganizationInternationalAddresses | longitude                       | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| Schools                         | internetAccessDescriptor               | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| Schools                         | localEducationAgencyReference          | FALSE         | localEducationAgencyReference   | REQUIRED    |                        |                          |                        |                          |
| localEducationAgencyReference   | localEducationAgencyId                 | FALSE         | int                             | REQUIRED    | 255901                 | 255901                   | 255901                 | 255901                   |
| Schools                         | magnetSpecialProgramEmphasisSchoolDescriptor | FALSE | string | OPTIONAL |                        |                          |                        |                          |
| Schools                         | nameOfInstitution                       | FALSE         | string                          | REQUIRED    | Grand Oaks High School | Grand Oaks Middle School | Grand Oaks High School | Grand Oaks Middle School |
| Schools                         | operationalStatusDescriptor             | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| Schools                         | schoolCategories                        | TRUE          | schoolCategory[]               | OPTIONAL    |                        |                          |                        |                          |
| schoolCategories                | schoolCategoryDescriptor                | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| Schools                         | schoolId                                | FALSE         | int                             | REQUIRED    | 255901333              | 255901444                | 255901333              | 255901444                |
| Schools                         | schoolTypeDescrptor                    | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| Schools                         | shortNameOfInstitution                  | FALSE         | string                          | CONDITIONAL | GOHS                   | GOMS                     | GOHS                   | GOMS                     |
| Schools                         | titleIPartASchoolDesignationDescriptor  | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
| Schools                         | webSite                                 | FALSE         | string                          | OPTIONAL    |                        |                          |                        |                          |
