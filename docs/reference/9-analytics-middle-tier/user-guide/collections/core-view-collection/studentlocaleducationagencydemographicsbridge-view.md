# StudentLocalEducationAgencyDemographicsBridge View

## Purpose

This view provides student demographic information by linking
the [StudentLocalEducationAgencyDim
View](./studentlocaleducationagencydim-view.md) to
the [DemographicDim View](./demographicdim-view.md). Part
of the [Core View Collection](./readme.md).

## SQL Object

`analytics.StudentLocalEducationAgencyDemographicsBridge`

## Usage Notes

See [How to Use the Student
Dimensions](../../../user-guide/how-to-use-the-student-dimensions.md) for
detailed examples.

## Data Sources

### Data Standard 2.2

In the older data standard, the demographics were all stored in the school
relationship — therefore these are the same data sources as for
the [StudentSchoolDemographicsBridge
View](./studentschooldemographicsbridge-view.md).

![Cohort Year](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/CohortYear%20DS2.2.png)

![Disability](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Disability%20DS2.2.png)

![Language](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Language%20DS2.2.png)

![Language Use](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/LanguageUse%20DS2.2.png)

![Race](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Race%20DS2.2.png)

![Student Characteristic](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/StudentCharacteristic%20DS2.2.png)

### Data Standard 3+

![Cohort Year](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Cohort%20Year%20DS3.x.png)

![Disability](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Disabilty%20DS3.x.png)

![Disability Designation](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Disability%20Designation%20DS3.x.png)

![Language](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Language%20DS3.x.png)

![Language Use](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Language%20Use%20DS3.x.png)

![Race](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Race%20DS3.x.png)

![Tribal Affiliation](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Tribal%20Affiliation%20DS3.x.png)

![Student Characteristic](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Student%20Characteristic%20DS3.x.png)

## Structure

Structure is the same for both data standards when taking the different data
sources into account. Filtered by students who are currently enrolled in a
school that belongs to the Local Education Agency
(`StudentSchoolAssociation.ExitWithdrawDate` is null or is a future date).

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| StudentLocalEducationAgencyDemographicBridgeKey | String | `{DemographicKey}-{StudentLocalEducationAgencyKey}` | Primary key |
| StudentLocalEducationAgencyKey | String | `{Student.StudentUniqueId}-{StudentEducationOrganization.EducationOrganizationId}` |     |
| DemographicKey | String | `{Demographic}:{Descriptor.CodeValue}` |     |
