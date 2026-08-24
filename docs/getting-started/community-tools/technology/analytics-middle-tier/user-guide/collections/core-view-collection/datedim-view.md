# DateDim View

## Purpose

A "Date" dimension table typically provides a key that is a simplified string
version of a date (e.g., "20180723") along with many different string
descriptors of that date, making it easy to filter a Fact table based on
different types of date and calendar representations (e.g., day, month,
quarter). These tables do not typically take hour into account unless the
desired analyses require time of day. Accordingly, the DateDim view does not
include a calendar representation shorter than a single day. Part of the [Core
View Collection](./readme.md).

## SQL Object Name

`analytics.DateDim`

## Usage Notes

School Calendar concepts can be important for the overall analytics data model,
but these properties are school-specific dimensions that do not belong in the
Date view.

## Data Source

The range of dates to include is generated from
the `edfi.CalendarDateCalendarEvent` table, removing duplicates due
to `SchoolId` being unnecessary. The example values below are based on July 19,
2018.

## Structure

| Name | Data Type | Description | Example |
| --- | --- | --- | --- |
| DateKey | string | Date without time component | 20180719 |
| Date | DateTime | Raw date at midnight | 2018-07-19 00:00:00.000 |
| Day | tinyint | Day number within a month | 19  |
| Month | tinyint | Numeric month number | 7   |
| MonthName | string | English name | July |
| CalendarQuarter | tinyint | Based on 1: Jan-Mar, 2: Apr-Jun, 3: Jul-Sep, 4: Oct-Dec | 3   |
| CalendarQuarterName | string | Ordinal name | Third |
| CalendarYear | smallint | Full four digit year | 2018 |
