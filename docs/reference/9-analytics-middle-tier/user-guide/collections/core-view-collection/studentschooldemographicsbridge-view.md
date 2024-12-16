# StudentSchoolDemographicsBridge View

## Purpose

This view provides student demographic information by linking
the [StudentSchoolDim View](./studentschooldim-view.md) to
the [DemographicDim View](./demographicdim-view.md). Part
of the [Core View Collection](./readme.md).

## SQL Object

`analytics.StudentSchoolDemographicsBridge`

## Usage Notes

See [How to Use the Student
Dimensions](../../../user-guide/how-to-use-the-student-dimensions.md) for
detailed examples.

## Data Sources

### Data Standard 2.2

![CohortYear
DS2.2](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/CohortYear%20DS2.2.png)

![Disability
DS2.2](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Disability%20DS2.2.png)

![Language
DS2.2](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Language%20DS2.2.png)

![LanguageUse
DS2.2](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/LanguageUse%20DS2.2.png)

![Race
DS2.2](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Race%20DS2.2.png)

![StudentCharacteristic
DS2.2](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/StudentCharacteristic%20DS2.2.png)

### Data Standard 3+

![Cohort Year
DS3.x](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Cohort%20Year%20DS3.x.png)

![Disability
DS3.x](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Disabilty%20DS3.x.png)

![Disability Designation
DS3.x](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Disability%20Designation%20DS3.x.png)

![Language
DS3.x](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Language%20DS3.x.png)

![Language Use
DS3.x](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Language%20Use%20DS3.x.png)

![Race
DS3.x](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Race%20DS3.x.png)

![Tribal Affiliation
DS3.x](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Tribal%20Affiliation%20DS3.x.png)

![Student Characteristic
DS3.x](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Student%20Characteristic%20DS3.x.png)

### Structure

Structure is the same for both data standards when taking the different data
sources into account. Filtered by students who are currently enrolled
(`StudentSchoolAssociation.ExitWithdrawDate` is null or is a future date).

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| StudentSchoolDemographicBridgeKey | String | `{DemographicKey}-{StudentSchoolKey}` | Primary key |
| ​StudentSchoolKey | String | `{Student.StudentUniqueId}-{StudentSchoolAssociation.SchoolId}` |     |
| DemographicKey | String | `{Demographic}:{Descriptor.CodeValue}` |     |
