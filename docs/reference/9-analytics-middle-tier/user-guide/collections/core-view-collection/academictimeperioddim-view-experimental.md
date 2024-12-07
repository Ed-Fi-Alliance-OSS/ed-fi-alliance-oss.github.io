# AcademicTimePeriodDim View

## Purpose

Brings together the School Year, Session, and Grading Period in a manner that
facilitates creating a hierarchy, for example in Power BI.

* School Year
  * Session
    * Grading Period

## SQL Object

`analytics.AcademicTimePeriodDim`

## Usage Notes

Can join to the `analytics.GradingPeriodDim`  to get a grading period's

* `PeriodSequence`
* `BeginDate`
* `EndDate`

## Sources

### Data Standard 2.2

![AcademicTimePeriod, DS 2.2](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/AcademicTimePeriod,%20DS%202.2.png)

### Data Standard 3+

![AcademicTimePeriod for DS3.x](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/AcademicTimePeriod%20for%20DS3.x.png)

## Structure

Same for both 2.2 and 3+ data standards.

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| AcademicTimePeriodKey | String | `{Session.SchoolId}-{Session.SchoolYear}-{Session.TermDescriptorId}-{GradingPeriod.GradingPeriodDescriptorId}-{GradingPeriod.BeginDate}` | Surrogate key so that modeling tools will have a unique primary key |
| SchoolYearKey | String | SchoolYearType.SchoolYear |     |
| SchoolYearName | String | SchoolYearType.SchoolYearDescription |     |
| IsCurrentSchoolYear | Bool | SchoolYearType.CurrentSchoolYear |     |
| SchoolKey | String | Session.SchoolId |     |
| SessionKey | String | `{Session.SchoolId}-{Session.SchoolYear}-{Session.TermDescriptorId}` |     |
| SessionName | String | Session.SessionName |     |
| TermName | String | Descriptor.Description |     |
| GradingPeriodKey | String | `{GradingPeriod.GradingPeriodDescriptorId}-{GradingPeriod.SchoolId}-{GradingPeriod.BeginDate}` |     |
| GradingPeriodName | String | Descriptor.Description |     |
| LastModifiedDate | Date | Most recent of (SchoolYearType.LastModifiedDate, Session.LastModifiedDate, GradingPeriod.LastModifiedDate,) |     |
