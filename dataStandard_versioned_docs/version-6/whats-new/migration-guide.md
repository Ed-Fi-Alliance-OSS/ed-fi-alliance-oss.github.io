---
sidebar_position: 3
hide_table_of_contents: true
---

# API Migration Guide from 5.0 to 6.0

## Introduction

The goal of this document is to help ensure a smooth migration for existing clients transitioning from EdFi API 5.x to the 6.0 (or later) release! This page outlines only those endpoints that have changed in a way that breaks existing the existing model and their data. Those endpoints that are brand new to the 6.X release are NOT covered as part of this documentation.

Endpoints, request parameters, and response schemas have changed significantly between the API in this release and the previous versions. Users will need to review the supporting documentation and update their existing integrations in order to support how the highlighted endpoints have changed to support the ingestion of new data.

Reasons for why these changes are occurring can be found in greater detail [here](whats-new-v60.md) for more information.

A complete listing of ALL endpoint changes (including new and modified) can be found [here](api-changes-6.md).

:::tip

The [Ed-Fi Swagger](<https://api.ed-fi.org/v7.3.1/docs/swagger/index.html?urls.primaryName=Resources>) can be used to view the latest version of the API supporting this release.

:::

<!-- need more text here talking about the various endpoints or something, IDK yet. -->

## Migration of Teacher Education Preparation Data Model (TPDM) Into Core

The adoption of TPDM into core will require the user to update the routes on their existing endpoints used by that domain as follows:

* All endpoint URLs that previously contained `tpdm` in their routes should be updated to use `ed-fi` instead.

  * Example : `.../data/v3/tpdm/candidates` --> `.../data/v3/ed-fi/candidates`

## Migration Of StudentEducationOrganizationAssociation

In 6.X the table below shows the data elements that have been migrated off of the StudentEducationOrganizationAssociation and the new Domain Entities and endpoints that will be utilized to capture and store the data.

The new resulting SEOA is much slimmer than its predecessors though this will involve hitting multiple API endpoints in order to update an individual student record depending on the type(s) of information being updated.

| 5.X Fields/Data Element Migrated Off | New Domain Entity For This Data In 6.X | New API Endpoints |
| ------------------------------------ | -------------------------------------- | ----------------- |
| StudentIdentificationCodes | StudentIdentificationCode | [/studentIdentificationCode](###StudentIdentificationCode)|
| Addresses | StudentDirectory | [/studentDirectories](###StudentDirectory) |
| InternationalAddresses| StudentDirectory |  [/studentDirectories](###StudentDirectory) |
| ElectronicMail | StudentDirectory | [/studentDirectories](###StudentDirectory) |
| AncestryEthnicOrigin | StudentDemographic |  [/studentDemographics](###StudentDemographic) |
| Disabilities | StudentDemographic | [/studentDemographics](###StudentDemographic) |
| GenderIdentity |  StudentDemographic | [/studentDemographics](###StudentDemographic) |
| HispanicLatinoEthnicity|   StudentDemographic | [/studentDemographics](###StudentDemographic) |
| Languages |  StudentDemographic | [/studentDemographics](###StudentDemographic) |
| Limited EnglishProficiency Descriptor | StudentDemographic | [/studentDemographics](###StudentDemographic) |
| Race | StudentDemographic | [/studentDemographics](###StudentDemographic) |
| Sex | StudentDemographic | [/studentDemographics](###StudentDemographic) |
| StudentCharacteristics | StudentDemographic | [/studentDemographics](###StudentDemographic) |
| SupporterMilitaryConnection | StudentDemographic | [/studentDemographics](###StudentDemographic) |
| TribalAffiliation | StudentDemographic | [/studentDemographics](###StudentDemographic) |

**<u>Example Of NEW -- /POST studentEducationOrganizationAssociation</u>**

<!--Changes and sample response-->

```json
{
[
  {
    "id": "string",
    "educationOrganizationReference": {
      "educationOrganizationId": 0,
      "link": {
        "rel": "string",
        "href": "string"
      }
    },
    "studentReference": {
      "studentUniqueId": "string",
      "link": {
        "rel": "string",
        "href": "string"
      }
    },
    "barrierToInternetAccessInResidenceDescriptor": "string",
    "cohortYears": [
      {
        "cohortYearTypeDescriptor": "string",
        "termDescriptor": "string",
        "schoolYearTypeReference": {
          "schoolYear": 0,
          "link": {
            "rel": "string",
            "href": "string"
          }
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
          "link": {
            "rel": "string",
            "href": "string"
          }
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
    ],
    "_etag": "string",
    "_lastModifiedDate": "2026-01-14T21:34:23.145Z"
  }
]
}
```

### StudentDirectory

The following data elements now exist and should be updated via the StudentDirectory endpoints:

* Addresses
* InternationalAddresses
* ElectronicMail

**<u>Example Of NEW -- /POST studentDirectory</u>**

```json
{
  "id": "string",
  "educationOrganizationReference": {
    "educationOrganizationId": 0,
    "link": {
      "rel": "string",
      "href": "string"
    }
  },
  "studentReference": {
    "studentUniqueId": "string",
    "link": {
      "rel": "string",
      "href": "string"
    }
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
      "countyFIPSCode": "strin",
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
      "electronicMailAddress": "strings",
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
  ],
  "_etag": "string",
  "_lastModifiedDate": "2026-01-14T22:07:04.738Z"
}
```

### StudentDemographic

The following data elements now exist and should be updated via the StudentDemographic endpoints:

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

**<u>Example Of NEW -- /POST studentDemographics</u>**

```json
{
  "id": "string",
  "educationOrganizationReference": {
    "educationOrganizationId": 0,
    "link": {
      "rel": "string",
      "href": "string"
    }
  },
  "studentReference": {
    "studentUniqueId": "string",
    "link": {
      "rel": "string",
      "href": "string"
    }
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
  ],
  "_etag": "string",
  "_lastModifiedDate": "2026-01-14T22:02:36.658Z"
}
```

### StudentIdentificationCode

The following data elements now exist and should be updated via the StudentIdentificationCode endpoints:

* StudentIdentificationCodes

**<u>Example Of NEW -- /POST studentIdentificationCode</u>**

```json
{
  "id": "string",
  "studentIdentificationSystemDescriptor": "string",
  "educationOrganizationReference": {
    "educationOrganizationId": 0,
    "link": {
      "rel": "string",
      "href": "string"
    }
  },
  "studentReference": {
    "studentUniqueId": "string",
    "link": {
      "rel": "string",
      "href": "string"
    }
  },
  "assigningOrganizationIdentificationCode": "string",
  "identificationCode": "string",
  "_etag": "string",
  "_lastModifiedDate": "2026-01-14T22:08:06.495Z"
}
```

## Migrating EconomicDisadvantageBoolean to Descriptor

The EconomicDisadvantage boolean was replaced with a descriptor value on the following endpoints:

* /applicantProfiles
* /candidates

**<u>Example Of NEW -- /POST studentIdentificationCode</u>**

```json
