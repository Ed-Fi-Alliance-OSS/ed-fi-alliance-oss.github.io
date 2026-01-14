---
sidebar_position: 3
hide_table_of_contents: true
---

# API Migration Guide from 5.0 to 6.0

## Introduction

The goal of this document is to help ensure a smooth migration for existing clients transitioning from EdFi API 5.x to the 6.0 (or later) release!

Endpoints, request parameters, and response schemas have changed significantly between the API in this release and the previous versions.

Reasons for why these changes are occurring can be found in greater detail [here](whats-new-v60.md) for more information.

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

**<u>Example Of NEW -- /POST StudentEducationOrganizationAssociation</u>**

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

The following data elements now exist on the StudentDirectory endpoints:

* Addresses
* InternationalAddresses
* ElectronicMail

### StudentDemographic

The following data elements now exist on the StudentDemographic endpoints:

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

### StudentIdentificationCode

The following data elements now exist on the StudentIdentificationCode endpoints:

* StudentIdentificationCodes
