# StudentInternetAccessDim View

## Purpose

Describe's a Student's Internet Access, as defined for a student's relationship
with the _school._

## SQL Object

`analytics.AcademicTimePeriodDim`

## Usage Notes

As with many other views, this query relies on the Student's
relationship with an EducationOrganization, via
the `StudentEducationOrganization`  table in the ODS. Thus it is possible that
the Student's InternetAccess could be recorded for the student's relationship
with one or more agency, including School, Local Education Agency, Service
Network, etc. For this view's purpose, only the School relationship is
considered. Data recorded for any other type of Education Agency will be
ignored.

:::warning

Not available for Data Standard 2.2, as the underlying entities were
added in Data Standard 3.

:::


For more information on recording appropriate student indicator data for
Internet Access, please
see [DIGITAL EQUITY COLLECTION](https://edfi.atlassian.net/wiki/spaces/EFDSDRAFT/pages/22773854).

## Sources

### Data Standard 2.2

Not available for Data Standard 2.

### Data Standard 3+

![StudentInternetAccessDim](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/StudentInternetAccessDim.png)

There are five joins to
the `StudentEducationOrganizationAssociationStudentIndicator` , one for each of
the following indicators:

* InternetAccessInResidence
* InternetAccessTypeInResidence
* InternetPerformance
* DigitalDevice
* DeviceAccess

## Structure

Same for both 2.2 and 3+ data standards.

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| StudentSchoolKey | String | `{Student.StudentUniqueId}-{School.SchoolId}` | Surrogate key so that modeling tools will have a unique primary key |
| StudentKey | String | Student.StudentUniqueId |     |
| SchoolKey | String | School.SchoolId |     |
| InternetAccessInResidence | String | Indicator from <br/><br/>StudentEducationOrganizationAssociationStudentIndicator <br/><br/>if available, otherwise "n/a" |     |
| InternetAccessTypeInResidence | String | Indicator from <br/><br/>StudentEducationOrganizationAssociationStudentIndicator <br/><br/>if available, otherwise "n/a" |     |
| InternetPerformance | String | Indicator from <br/><br/>StudentEducationOrganizationAssociationStudentIndicator <br/><br/>if available, otherwise "n/a" |     |
| DigitalDevice | String | Indicator from <br/><br/>StudentEducationOrganizationAssociationStudentIndicator <br/><br/>if available, otherwise "n/a" |     |
| DeviceAccess | String | Indicator from <br/><br/>StudentEducationOrganizationAssociationStudentIndicator <br/><br/>if available, otherwise "n/a" |     |
