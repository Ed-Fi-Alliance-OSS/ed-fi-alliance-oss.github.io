# GradingPeriodDim View

## Purpose

Analytics end-users may want to slice and filter presentation views by grading
period information, especially for viewing and aggregating grades. These
calendar-related dimensions are distinct from the [DateDim
View](../datedim-view.md) because that view provides an
industry-standard concept of a Date Table, whereas the school calendar dimension
fields are specific to the education domain. The two could be combined; however,
keeping them separate helps isolate their roles and provide flexibility on
further refinements. Part of the [Core View
Collection](./readme.md).

## SQL Object Name

`analytics.GradingPeriodDim`

## Data Source

Same for both data standards.

![GradingPeriodDim](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/GradingPeriodDim.png)

## Structure

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| GradingPeriodKey | string | `{GradingPeriodDescriptorId}-{SchoolId}-{BeginDate as YYYYMMDD}`, all fields from GradingPeriod | Primary key |
| SchoolKey | int | GradingPeriod.SchoolId |     |
| GradingPeriodDescription | string | Descriptor.CodeValue |     |
| PeriodSequence | int | GradeingPeriod.PeriodSequence |     |
| GradingPeriodBeginDateKey | string | GradingPeriod.BeginDate | YYYY-MM-DD |
| GradingPeriodEndDateKey | string | GradingPeriod.EndDate | YYYY-MM-DD |
| NumberOfDays | int | GradingPeriod.TotalInstructionalDays |     |
| LastModifiedDate | datetime | GradingPeriod.LastModifiedDate |     |
