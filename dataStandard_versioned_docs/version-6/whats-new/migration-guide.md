---
sidebar_position: 3
hide_table_of_contents: false
---

# API Migration Guide from 5.0 to 6.0

## Introduction

The goal of this document is to help ensure a smooth migration for existing clients transitioning from EdFi API 5.x to the 6.0 (or later) release. This page outlines only those endpoints that have changed in a way that breaks the existing model and their data. Those endpoints that are brand new to the 6.X release are NOT covered as part of this documentation.

Endpoints, request parameters, and response schemas have changed significantly between the API in this release and the previous versions. Users will need to review the supporting documentation and update their existing integrations in order to support how the highlighted endpoints have changed to support the ingestion of new data.

Reasons for why these changes are occurring can be found in greater detail on the [What's New - v6.0](whats-new-v60.md) page.

A complete listing of ALL endpoint changes (including new and modified) can be found on the [API Changes from 5.0 to 6.0](api-changes-6.md) page.

:::tip

The [Ed-Fi Swagger documentation site](https://api.ed-fi.org/v7.3.1/docs/swagger/index.html?urls.primaryName=Resources) can be used to view the latest version of the API supporting this release.

:::

## Migrating EconomicDisadvantageBoolean to Descriptor

The EconomicDisadvantage boolean was replaced with a descriptor value on the following endpoints:

* `/ed-fi/applicantProfiles`
* `/ed-fi/candidates`

## Migrating Updates To Assessment

The following changes have been made to the /assessment endpoints:

* AcademicSubject has been changed so it is no longer an array - it is now just a single, required, value.

## Migrating Updates To ObjectiveAssessment

The following changes have been made to the /objectiveAssessment endpoints:

* parentObjectiveAssessments is now available as a COLLECTION.

## Migrating Updates To StudentAssessment

The following changes have been made to the /studentAssessment endpoints:

* SchoolYear changed from Optional to **Required**

## Migrating Updates To SpecialEducationProgramAssociation

These two fields have been renamed:

| 5.X Element Renamed | New Name In 6.X |
| ------------------- | --------------- |
| LastEvaluationDate | IEPLastEvaluationDate |
| IEPReviewDate | IEPLastReviewDate |

## Migration Of StudentEducationOrganizationAssociation

Previously users would submit student demographic, directory (addresses/phone numbers), and identification codes to the StudentEducationOrganizationAssociation.
However, with the new entities introduced as part of 6.X that information now needs to be sent to the following new entities and endpoints:

| Migrated SEOA 5.X Data Element | New Domain Entity For This Data In 6.X | New API Endpoints |
| ------------------------------------ | -------------------------------------- | ----------------- |
| StudentIdentificationCodes | StudentIdentificationCode | [/studentIdentificationCode](#studentidentificationcode) |
| Addresses | StudentDirectory | [/studentDirectories](#studentdirectory) |
| InternationalAddresses | StudentDirectory | [/studentDirectories](#studentdirectory) |
| ElectronicMail | StudentDirectory | [/studentDirectories](#studentdirectory) |
| AncestryEthnicOrigin | StudentDemographic | [/studentDemographics](#studentdemographic) |
| Disabilities | StudentDemographic | [/studentDemographics](#studentdemographic) |
| GenderIdentity | StudentDemographic | [/studentDemographics](#studentdemographic) |
| HispanicLatinoEthnicity | StudentDemographic | [/studentDemographics](#studentdemographic) |
| Languages | StudentDemographic | [/studentDemographics](#studentdemographic) |
| Limited EnglishProficiency Descriptor | StudentDemographic | [/studentDemographics](#studentdemographic) |
| Race | StudentDemographic | [/studentDemographics](#studentdemographic) |
| Sex | StudentDemographic | [/studentDemographics](#studentdemographic) |
| StudentCharacteristics | StudentDemographic | [/studentDemographics](#studentdemographic) |
| SupporterMilitaryConnection | StudentDemographic | [/studentDemographics](#studentdemographic) |
| TribalAffiliation | StudentDemographic | [/studentDemographics](#studentdemographic) |

**Example Of NEW -- /POST studentEducationOrganizationAssociation**

```json
{
    "id": "string",
    "educationOrganizationReference": {
      "educationOrganizationId": 0,
    },
    "studentReference": {
      "studentUniqueId": "string",
    },
    "barrierToInternetAccessInResidenceDescriptor": "string",
    "cohortYears": [
      {
        "cohortYearTypeDescriptor": "string",
        "termDescriptor": "string",
        "schoolYearTypeReference": {
          "schoolYear": 0,
        }
      }
    ],
    "displacedStudents": [
      {
        "displacedStudentStatusDescriptor": "string",
        "crisisHomelessnessIndicator": true,
        "displacedStudentEndDate": "2026-01-14",
        "displacedStudentStartDate": "2026-01-14",
        "crisisEventReference": {
          "crisisEventName": "string",
        }
      }
    ],
    "internetAccessInResidence": true,
    "internetAccessTypeInResidenceDescriptor": "string",
    "internetPerformanceInResidenceDescriptor": "string",
    "loginId": "string",
    "primaryLearningDeviceAccessDescriptor": "string",
    "primaryLearningDeviceAwayFromSchoolDescriptor": "string",
    "primaryLearningDeviceProviderDescriptor": "string",
    "profileThumbnail": "string",
    "studentIndicators": [
      {
        "indicatorName": "string",
        "designatedBy": "string",
        "indicator": "string",
        "indicatorGroup": "string",
        "periods": [
          {
            "beginDate": "2026-01-14",
            "endDate": "2026-01-14"
          }
        ]
      }
    ]
}
```

### StudentDirectory

The following data should be updated via the StudentDirectory endpoints:

* Addresses
* InternationalAddresses
* ElectronicMail

**Example Of NEW -- /POST studentDirectory**

```json
{
  "id": "string",
  "educationOrganizationReference": {
    "educationOrganizationId": 0,
  },
  "studentReference": {
    "studentUniqueId": "string",
  },
  "addresses": [
    {
      "addressTypeDescriptor": "string",
      "stateAbbreviationDescriptor": "string",
      "city": "string",
      "postalCode": "string",
      "streetNumberName": "string",
      "localeDescriptor": "string",
      "apartmentRoomSuiteNumber": "string",
      "buildingSiteNumber": "string",
      "congressionalDistrict": "string",
      "countyFIPSCode": "string",
      "doNotPublishIndicator": true,
      "latitude": "string",
      "longitude": "string",
      "nameOfCounty": "string",
      "periods": [
        {
          "beginDate": "2026-01-14",
          "endDate": "2026-01-14"
        }
      ]
    }
  ],
  "electronicMails": [
    {
      "electronicMailTypeDescriptor": "string",
      "electronicMailAddress": "string",
      "doNotPublishIndicator": true,
      "primaryEmailAddressIndicator": true
    }
  ],
  "internationalAddresses": [
    {
      "addressTypeDescriptor": "string",
      "countryDescriptor": "string",
      "addressLine1": "string",
      "addressLine2": "string",
      "addressLine3": "string",
      "addressLine4": "string",
      "beginDate": "2026-01-14",
      "endDate": "2026-01-14",
      "latitude": "string",
      "longitude": "string"
    }
  ],
  "telephones": [
    {
      "telephoneNumberTypeDescriptor": "string",
      "telephoneNumber": "string",
      "doNotPublishIndicator": true,
      "orderOfPriority": 1,
      "textMessageCapabilityIndicator": true
    }
  ]
}
```

### StudentDemographic

The following data should be updated via the StudentDemographic endpoints:

* AncestryEthnicOrigin
* Disabilities
* GenderIdentity
* HispanicLatinoEthnicity
* Languages
* LimitedEnglishProficiencyDescriptor
* Race
* Sex
* StudentCharacteristics
* SupporterMilitaryConnection
* TribalAffiliation

**Example Of NEW -- /POST studentDemographics**

```json
{
  "id": "string",
  "educationOrganizationReference": {
    "educationOrganizationId": 0,
  },
  "studentReference": {
    "studentUniqueId": "string",
  },
  "ancestryEthnicOrigins": [
    {
      "ancestryEthnicOriginDescriptor": "string"
    }
  ],
  "citizenshipStatusDescriptor": "string",
  "disabilities": [
    {
      "disabilityDescriptor": "string",
      "disabilityDeterminationSourceTypeDescriptor": "string",
      "disabilityDiagnosis": "string",
      "orderOfDisability": 0,
      "designations": [
        {
          "disabilityDesignationDescriptor": "string"
        }
      ]
    }
  ],
  "economicDisadvantageDescriptor": "string",
  "genderIdentity": "string",
  "hispanicLatinoEthnicity": true,
  "identificationDocuments": [
    {
      "identificationDocumentUseDescriptor": "string",
      "personalInformationVerificationDescriptor": "string",
      "issuerCountryDescriptor": "string",
      "documentExpirationDate": "2026-01-14",
      "documentTitle": "string",
      "issuerDocumentIdentificationCode": "string",
      "issuerName": "string"
    }
  ],
  "languages": [
    {
      "languageDescriptor": "string",
      "uses": [
        {
          "languageUseDescriptor": "string"
        }
      ]
    }
  ],
  "limitedEnglishProficiencyDescriptor": "string",
  "races": [
    {
      "raceDescriptor": "string"
    }
  ],
  "sexDescriptor": "string",
  "studentCharacteristics": [
    {
      "studentCharacteristicDescriptor": "string",
      "designatedBy": "string",
      "periods": [
        {
          "beginDate": "2026-01-14",
          "endDate": "2026-01-14"
        }
      ]
    }
  ],
  "supporterMilitaryConnectionDescriptor": "string",
  "tribalAffiliations": [
    {
      "tribalAffiliationDescriptor": "string"
    }
  ],
  "visas": [
    {
      "visaDescriptor": "string"
    }
  ]
}
```

### StudentIdentificationCode

The following data should be updated via the StudentIdentificationCode endpoints:

* StudentIdentificationCodes

**Example Of NEW -- /POST studentIdentificationCode**

```json
{
  "id": "string",
  "studentIdentificationSystemDescriptor": "string",
  "educationOrganizationReference": {
    "educationOrganizationId": 0,
  },
  "studentReference": {
    "studentUniqueId": "string",
  },
  "assigningOrganizationIdentificationCode": "string",
  "identificationCode": "string"
}
```

## Migration Of StaffEducationOrganizationContactAssociation

The entirety of this association has been removed and the information is now stored and updated through the new [/staffDirectories](#staffdirectory) endpoints as shown below:

### StaffDirectory

The following data should be updated via the staffDirectories endpoints:

* Addresses
* ElectronicMail
* InternationalAddresses
* Telephone

**<u>Example Of NEW -- /POST staffDirectories</u>**

```json
{
    "id": "string",
  "educationOrganizationReference": {
    "educationOrganizationId": 0,
  },
  "staffReference": {
    "staffUniqueId": "string",
  },
  "addresses": [
    {
      "addressTypeDescriptor": "string",
      "stateAbbreviationDescriptor": "string",
      "city": "string",
      "postalCode": "string",
      "streetNumberName": "string",
      "localeDescriptor": "string",
      "apartmentRoomSuiteNumber": "string",
      "buildingSiteNumber": "string",
      "congressionalDistrict": "string",
      "countyFIPSCode": "string",
      "doNotPublishIndicator": true,
      "latitude": "string",
      "longitude": "string",
      "nameOfCounty": "string",
      "periods": [
        {
          "beginDate": "2026-01-15",
          "endDate": "2026-01-15"
        }
      ]
    }
  ],
  "electronicMails": [
    {
      "electronicMailTypeDescriptor": "string",
      "electronicMailAddress": "string",
      "doNotPublishIndicator": true,
      "primaryEmailAddressIndicator": true
    }
  ],
  "internationalAddresses": [
    {
      "addressTypeDescriptor": "string",
      "countryDescriptor": "string",
      "addressLine1": "string",
      "addressLine2": "string",
      "addressLine3": "string",
      "addressLine4": "string",
      "beginDate": "2026-01-15",
      "endDate": "2026-01-15",
      "latitude": "string",
      "longitude": "string"
    }
  ],
  "telephones": [
    {
      "telephoneNumberTypeDescriptor": "string",
      "telephoneNumber": "string",
      "doNotPublishIndicator": true,
      "orderOfPriority": 1,
      "textMessageCapabilityIndicator": true
    }
  ]
}
```

## Migration of Teacher Education Preparation Data Model (TPDM) Into Core

The adoption of TPDM into core will require the user to update the routes on their existing endpoints used by that domain as follows:

* All endpoint URLs that previously contained `tpdm` in their routes should be updated to use `ed-fi` instead.

  * Example : `.../data/v3/tpdm/candidates` --> `.../data/v3/ed-fi/candidates`
