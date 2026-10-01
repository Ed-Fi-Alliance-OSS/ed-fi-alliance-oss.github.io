# StudentLocalEducationAgencyDim View

## Purpose

Contains attributes of a student including name and demographic information as
defined in relationship to the local education agency in which the student is
currently enrolled. Part of the [Core View
Collection](./readme.md).

## SQL Object

`analytics.StudentLocalEducationAgencyDim`

## Usage Notes

See [How to Use the Student
Dimensions](../../../user-guide/how-to-use-the-student-dimensions.md).

## Data Sources

### Data Standard 2.2

In the older data standard, the demographics were all stored in the school
relationship - therefore this is little different than the [StudentSchoolDim
View](./studentschooldim-view.md).

![StudentLocalEducationAgencyDim for DS 2.2 Copy
Copy](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/StudentLocalEducationAgencyDim%20for%20DS%202.2%20Copy%20Copy.png)

### Data Standard 3+

![StudentLocalEducationAgencyDim Copy
Copy](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/StudentLocalEducationAgencyDim%20Copy%20Copy.png)

## Structure

### Data Standard 2.2 Structure

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| StudentLocalEducationAgencyKey | String | `{Student.StudentUniqueId}-{School.LocalEducationAgencyId}` | Primary key |
| ​StudentKey | String | edfi.Student.UniqueId​ |     |
| LocalEducationAgencyKey | String | edfi.School.LocalEducationAgencyId |     |
| StudentFirstName | String | edfi.Student.FirstName |     |
| StudentMiddleName | String | edfi.Student.MiddleName |     |
| StudentLastName | String | edfi.Student.LastSurname |     |
| LimitedEnglishProficiency | String | edfi.Descriptor.CodeValue via edfi.Student.LimitedEnglishProficiencyDescriptorId | Replace null with "Not Applicable" |
| IsHispanic | Boolean | edfi.Student.HispanicLatinoEthnicity | Replace null with 0 |
| Sex | String | edfi.SexType.CodeValue via edfi.Student.SexTypeId |     |
| LastModifiedDate | DateTime | Most recent date from any source that has a LastModifiedDate column |     |

### Data Standard 3+ Structure

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| StudentLocalEducationAgencyKey | String | `{Student.StudentUniqueId}-{School.LocalEducationAgencyId}` | Primary key |
| ​StudentKey | String | edfi.Student.UniqueId​ |     |
| LocalEducationAgencyKey | String | edfi.School.LocalEducationAgencyId |     |
| SchoolYear | String | edfi.StudentSchoolAssocation.SchoolYear | convert to string to signal to modeling tools that this is not an aggregatable number |
| StudentFirstName | String | edfi.Student.FirstName |     |
| StudentMiddleName | String | edfi.Student.MiddleName |     |
| StudentLastName | String | edfi.Student.LastSurname |     |
| LimitedEnglishProficiency | String | edfi.Descriptor.CodeValue via edfi.StudentEducationOrganizationAssociation.LimitedEnglishProficiencyDescriptorId | Replace null with "Not Applicable" |
| IsHispanic | Boolean | edfi.StudentEducationOrganizationAssociation.HispanicLatinoEthnicity | Replace null with 0 |
| Sex | String | edfi.Descriptor.CodeValue via edfi.StudentEducationOrganizationAssociation.SexDescriptorId |     |
| LastModifiedDate | DateTime | Most recent date from any source that has a LastModifiedDate column |     |
| InternetAccessInResidence | String | edfi.StudentEducationOrganizationAssociationStudentIndicator.Indicator  (edfi.StudentEducationOrganizationAssociationStudentIndicator.IndicatorName='InternetAccessInResidence') | Replace null with "n/a" |
| InternetAccessTypeInResidence | String | edfi.StudentEducationOrganizationAssociationStudentIndicator.Indicator  (edfi.StudentEducationOrganizationAssociationStudentIndicator.IndicatorName='InternetAccessTypeInResidence') | Replace null with "n/a" |
| InternetPerformance | String | edfi.StudentEducationOrganizationAssociationStudentIndicator.Indicator  (edfi.StudentEducationOrganizationAssociationStudentIndicator.IndicatorName='InternetPerformance') | Replace null with "n/a" |
| DigitalDevice | String | edfi.StudentEducationOrganizationAssociationStudentIndicator.Indicator  (edfi.StudentEducationOrganizationAssociationStudentIndicator.IndicatorName='DigitalDevice') | Replace null with "n/a" |
| DeviceAccess | String | edfi.StudentEducationOrganizationAssociationStudentIndicator.Indicator  (edfi.StudentEducationOrganizationAssociationStudentIndicator.IndicatorName='DeviceAccess') | Replace null with "n/a" |
