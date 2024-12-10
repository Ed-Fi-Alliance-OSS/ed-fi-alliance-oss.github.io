# DemographicDim View

## Purpose

Describes the student demographics available for analysis via the
[StudentSchoolDemographicsBridge
View](./studentschooldemographicsbridge-view.md)
and [StudentLocalEducationAgencyDemographicsBridge
View](./studentlocaleducationagencydemographicsbridge-view.md).
Part of the [Core View Collection](./readme.md).

## SQL Object

`analytics.DemographicDim`

## Usage Notes

See [How to Use the Student
Dimensions](../../../user-guide/how-to-use-the-student-dimensions.md) for usage
examples.

The data have an implicit parent-child relationship. Run the following query for
a list the "parent" demographic keys:

```sql
select
 distinct
 DemographicParentKey
from
 analytics.DemographicDim
```

This gives us the following parent keys:

* CohortYear
* Disability
* DisabilityDesignation
* Language
* LanguageUse
* Race
* StudentCharacteristic
* TribalAffiliation

The `DemographicKey` column exists in order to establish a unique key for
indexing purposes. As a general rule, the column need not be used or made
available to report designers. The `DemographicLabel` column is the one of
primary interest for use in filters and/or visual display, as can be seen in the
following sample rows (two for each parent key):

| DemographicKey | DemographicParentKey | DemographicLabel |
| --- | --- | --- |
| CohortYear:2003-Eighth grade | CohortYear | 2003-Eighth grade |
| CohortYear:2024-Eighth grade | CohortYear | 2024-Eighth grade |
| Disability:Motor impairment | Disability | Motor impairment |
| Disability:AUT | Disability | AUT |
| DisabilityDesignation:Individuals with Disabilities Education Act | DisabilityDesignation | Individuals with Disabilities Education Act |
| DisabilityDesignation:Other | DisabilityDesignation | Other |
| Language:aar | Language | aar |
| Language:abk | Language | abk |
| LanguageUse:Correspondence language | LanguageUse | Correspondence language |
| LanguageUse:Dominant language | LanguageUse | Dominant language |
| Race:American Indian - Alaska Native | Race | American Indian - Alaska Native |
| Race:Asian | Race | Asian |
| StudentCharacteristic:Displaced Homemaker | StudentCharacteristic | Displaced Homemaker |
| StudentCharacteristic:Foster Care | StudentCharacteristic | Foster Care |
| TribalAffiliation:Absentee-Shawnee | TribalAffiliation | Absentee-Shawnee |
| TribalAffiliation:Afognak | TribalAffiliation | Afognak |

## Data Sources

### Data Standard 2.2

In the older data standard, the demographics were all stored in the school
relationship — therefore this is little different than the [StudentSchoolDim
View](./studentschooldim-view.md).

![DemographicsDim 2.2](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/DemographicsDim%202.2.png)

### Data Standard 3+

![DemographicsDim 3.x](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/DemographicsDim%203.x.png)

## Structure

### Data Standard 2.2 Structure

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| DemographicKey | String | `{DemographicParentKey}:{DemographicLabel}` | Primary key |
| ​DemographicParentKey | String | Hard-coded value |     |
| DemographicLabel | String | Descriptor.CodeValue from various source tables |     |

### Data Standard 3+ Structure

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| DemographicKey | String | `{DemographicParentKey}:{DemographicLabel}` | Primary key |
| ​DemographicParentKey | String | Hard-coded value |     |
| DemographicLabel | String | Descriptor.CodeValue from various source tables |     |
