# SchoolDim View

## Purpose

Contains attributes of a school including its local and state education agency
hierarchy. Part of the [Core View Collection](./readme.md).

## SQL Object

`analytics.SchoolDim`

## Usage Notes

The school dimension contains the flattened physical address as a single string.
It also contains the city, county, and state, which can be used as filters or
pivots. The view also includes flattened key and name values for these related
entities: local education agency, state education agency, and education service
center.

## Data Sources

### Data Standard 2.2

![SchoolDim (DS2.2)](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/SchoolDim%20(DS2.2).png)

### Data Standard 3+

![SchoolDim (DS3)](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/SchoolDim%20(DS3).png)

## Structure

| Column Name | Data Type | Source Table | Description |
| --- | --- | --- | --- |
| SchoolKey | int | School.SchoolId | Primary Key |
| SchoolName | string | EducationOrganization.NameOfInstitution |     |
| SchoolType | string | SchoolType.CodeValue |     |
| LocalEducationAgencyName | string | EducationOrganization.NameOfInstitution |     |
| LocalEducationAgencyKey | int | School.LocalEducationOrganizationId |     |
| StateEducationAgencyName | string | EducationOrganization.NameOfInstitution |     |
| StateEducationAgencyKey | int | LocalEducationOrganization.StateEducationAgencyId |     |
| EducationServiceCenterName | string | EducationOrganization.NameOfInstitution |     |
| EducationServiceCenterKey | int | LocalEducationAgency.EducationServiceCenterId |     |
| SchoolAddress | string | Concatenation of StreetNumber, AparatmentRoomSuiteNumber, City, State abbreviation, and PostalCode from EducationOrganizationAddress | Where Descriptor Constant for address type is "Physical". |
| SchoolCity | string | EducationOrganizationAddress.City | Where Descriptor Constant for address type is "Physical". |
| SchoolState | string | StateAbbreviationType.CodeValue (DS 2.2)<br/><br/>Descriptor.CodeValue (DS 3+) | Where Descriptor Constant for address type is "Physical". |
| LastModifiedDate | datetime | Most recent LastModifiedDate value from EducationOrganization, SchoolType, or SchoolAddress |     |
