# StudentSchoolDim View

## Purpose

Contains attributes of a student including name, enrollment, and demographic
information as defined in relationship to a school at which the student is
currently enrolled. Part of the [Core View
Collection](./readme.md).

## SQL Object

`analytics.StudentSchoolDim`

## Usage Notes

See [How to Use the Student
Dimensions](../../../user-guide/how-to-use-the-student-dimensions.md).

## Data Sources

### Data Standard 2.2

![Student to Characteristic Relationships (DS 2) Copy
Copy](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/Student%20to%20Characteristic%20Relationships%20(DS%202)%20Copy%20Copy.png)

### Data Standard 3+

![StudentSchoolDim ERD Copy
Copy](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/StudentSchoolDim%20ERD%20Copy%20Copy.png)

## Structure

### Data Standard 2.2 Structure

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| StudentSchoolKey | String | `{Student.StudentUniqueId}-{StudentSchoolAssociation.SchoolId}` | Primary key |
| ​StudentKey | String | edfi.Student.UniqueId​ |     |
| SchoolKey | String | edfi.StudentSchoolAssociation.SchoolId |     |
| SchoolYear | String | edfi.StudentSchoolAssocation.SchoolYear | convert to string to signal to modeling tools that this is not an aggregatable number |
| StudentFirstName | String | edfi.Student.FirstName |     |
| StudentMiddleName | String | edfi.Student.MiddleName |     |
| StudentLastName | String | edfi.Student.LastSurname |     |
| EnrollmentDateKey | String | edfi.StudentSchoolAssociation.EntryDate | formatted as YYYY-MM-DD |
| GradeLevel | String | edfi.Descriptor.CodeValue via edfi.StudentSchoolAssociation.EntryGradeLevelDescriptorId |     |
| LimitedEnglishProficiency | String | edfi.Descriptor.CodeValue via edfi.Student.LimitedEnglishProficiencyDescriptorId | Replace null with "Not Applicable" |
| IsHispanic | Boolean | edfi.Student.HispanicLatinoEthnicity | Replace null with 0 |
| Sex | String | edfi.SexType.CodeValue via edfi.Student.SexTypeId |     |
| LastModifiedDate | DateTime | Most recent date from any source that has a LastModifiedDate column |     |

### Data Standard 3+ Structure

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| StudentSchoolKey | String | `{Student.StudentUniqueId}-{StudentSchoolAssociation.SchoolId}` | Primary key |
| ​StudentKey | String | edfi.Student.UniqueId​ |     |
| SchoolKey | String | edfi.StudentSchoolAssociation.SchoolId |     |
| SchoolYear | String | edfi.StudentSchoolAssocation.SchoolYear | convert to string to signal to modeling tools that this is not an aggregatable number |
| StudentFirstName | String | edfi.Student.FirstName |     |
| StudentMiddleName | String | edfi.Student.MiddleName |     |
| StudentLastName | String | edfi.Student.LastSurname |     |
| EnrollmentDateKey | String | edfi.StudentSchoolAssociation.EntryDate | formatted as YYYY-MM-DD |
| GradeLevel | String | edfi.Descriptor.CodeValue via edfi.StudentSchoolAssociation.EntryGradeLevelDescriptorId |     |
| LimitedEnglishProficiency | String | edfi.Descriptor.CodeValue via edfi.StudentEducationOrganizationAssociation.LimitedEnglishProficiencyDescriptorId | Replace null with "Not Applicable" |
| IsHispanic | Boolean | edfi.StudentEducationOrganizationAssociation.HispanicLatinoEthnicity | Replace null with 0 |
| Sex | String | edfi.Descriptor.CodeValue via edfi.StudentEducationOrganizationAssociation.SexDescriptorId |     |
| LastModifiedDate | DateTime | Most recent date from any source that has a LastModifiedDate column |     |
