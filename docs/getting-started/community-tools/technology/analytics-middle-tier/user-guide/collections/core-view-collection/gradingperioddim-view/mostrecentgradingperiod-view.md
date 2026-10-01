# MostRecentGradingPeriod View

## Purpose

This is a convenience view that was helpful in building out the PowerBI and
QuickSight starter kits. For a given school, it simply selects the most recent
grading period from the [GradingPeriodDim View](./readme.md).
Part of the [Core View Collection](../readme.md).

## SQL Object

`analytics.MostRecentGradingPeriod`

## Usage Notes

This view may have poor performance. It is not recommended to rely directly on
it for real-time access. In the two starter kits, the view contents are read
into separate data models and cached periodically (either in the SQL Server
Analysis Services tabular data model, for PowerBI, or in the "EWS Data Mart"
database for QuickSight).

## Structure

| Column | Source Table | Source Column or Value | Data Type |
| --- | --- | --- | --- |
| ​SchoolKey | GradingPeriodDimension​ | SchoolKey​ | int​ |
| GradingPeriodBeginDateKey | GradingPeriodDimension​ | Max(GradingPeriodBeginDateKey) | nvarchar(30) |
