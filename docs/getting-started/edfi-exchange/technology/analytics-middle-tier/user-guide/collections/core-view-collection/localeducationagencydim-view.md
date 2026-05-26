# LocalEducationAgencyDim View

## Purpose

Provides information about a Local Education Agency, which could be an
independent school district or a charter network. Hierarchically, public schools
usually belong to a Local Education Agency.

## SQL Object

`analytics.LocalEducationAgencyDim`

## Usage Notes

As districts can cross municipal boundaries, and initial thinking about use
cases does not reveal a need to display district addresses, no geographical
information has been included other than that implied by the agency name and
(where available) its state agency name.

## Data Sources

### Data Standard 2.2

![LocalEducationAgencyDim (DS2.2)](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/LocalEducationAgencyDim%20(DS2.2).png)

### Data Standard 3+

![LocalEducationAgencyDim (DS3)](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/LocalEducationAgencyDim%20(DS3).png)

## Structure

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| ​LocalEducationAgencyKey | int | ​LocalEducationAgency.LocalEducationAgencyId | Primary Key​ |
| LocalEducationAgencyName | string | EducationOrganization.NameOfInstitution |     |
| LocalEducationAgencyType | string | LocalEducationAgencyCategoryType.CodeValue (DS 2.2)<br/><br/>Descriptor.CodeValue (DS 3+) |     |
| LocalEducationAgencyParentLocalEducationAgencyKey | string | LocalEducationAgency.ParentLoclaEducationAgencyId |     |
| LocalEducationAgencyStateEducationAgencyName | int | EducationOrganization.NameOfInstitution via LocalEducationAgency.StateEducationAgencyId |     |
| LocalEducationAgencyStateEducationAgencyKey | string | LocalEducationAgency.StateEducationAgencyId |     |
| LocalEducaitonAgencyServiceCenterName | int | EducationOrganization.NameOfInstitution via LocalEducationAgency.EducationServiceCenterId |     |
| LocalEducaitonAgencyServiceCenterKey | string | LocalEducationAgency.EducationServiceCenterId |     |
| LocalEducationAgencyCharterStatus | int | ChartStatusType.CodeValue (DS 2.2)<br/><br/>Descriptor.CodeValue (DS 3+) |     |
| LastModifiedDate | DateTime | Most recent LastModifiedDate from EducationOrganization (LEA) or  EducationServiceCenter |     |
