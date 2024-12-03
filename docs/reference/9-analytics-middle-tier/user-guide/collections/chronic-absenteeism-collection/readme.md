# Chronic Absenteeism Collection

## Introduction

> "Students who are chronically absent—meaning they miss at least 15 days of
> school in a year—are at serious risk of falling behind in school. Yet, for too
> long, this crisis in our nation's public elementary and secondary schools has
> not been fully understood."

From the introduction to [CHRONIC ABSENTEEISM IN THE NATION'S SCHOOLS: A hidden
educational crisis](https://www2.ed.gov/datastory/chronicabsenteeism.html) by
the U.S. Department of Education.

## Views in this Collection

![Chronic Absenteeism Collection](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/chrab_diagram.png)

## Installation

Install using the option code "CHRAB"

`.\EdFi.AnalyticsMiddleTier.Console.exe -c "..." -o CHRAB`

For more information, see the [AMT Deployment
Guide](https://edfi.atlassian.net/wiki/display/EDFITOOLS/AMT+Deployment+Guide).

## Functional Vision

A new use case, Chronic Absenteeism or "chrab", will expand the [Analytics
Middle Tier
Enhancements](https://edfi.atlassian.net/wiki/spaces/EFTD/pages/24805936/Analytics+Middle+Tier+Enhancements)
by providing one or more views that facilitate exploration of chronic
absenteeism across various demographic perspectives, as available from the Ed-Fi
ODS database.

As noted in the quotation above, "chronic absenteeism" will be defined as
missing at least 15 days of school in a year, whether through an excused or
unexcused absence. An early warning can be signaled during the year by looking
at the percentage of absences relative to number of instructional days: for
example if the school calendar has 180 instructional days, then a student could
be flagged with a warning at any time if attendance falls below 92% (that is,
(180-15/180)). In keeping with the spirit of the Analytics Middle Tier, the
views provided will not calculate attendance rate or determine chronic
absenteeism in and of themselves: rather, they will make the raw data more
accessible, facilitating the ability of education agency data analysts to
implement locally defined algorithms.

Although there are similarities with the Early Warning System views, this
Chronic Absenteeism use case will provide different shapes to the data and may
provide additional demographic information that were not relevant to the
Balfanz-model of early warning for potential high school dropout.

## Example Queries

:::warning

This sample query assumes the Texas model of counting attendance by
home room, and it assumes that attendance is being handle "negatively": that
is, a student is assumed present unless marked as absent.

```sql title="Attendance Rate Now"
with aggr as (
  select
    StudentKey,
    SchoolKey,
    count(1) as DaysEnrolled,
    sum(IsAbsentFromHomeRoom) as DaysAbsent,
  from
 analytics.chrab_AttendanceFact
  group by
    StudentKey,
    SchoolKey
)
select
  (DaysEnrolled - DaysAbsent) / DaysEnrolled as AttendanceRate
from
  aggr
```

```sql title="Historic Attendance Rate"
select
  DateDim.DateKey,
  Attendance.StudentKey,
  Attendance.SchoolKey,
  (Attendance.DaysEnrolled - Attendance.DaysAbsent) / Attendance.DaysEnrolled as AttendanceRateToDate
from
  analytics.DateDim
outer apply (
  select
    StudentKey,
    SchoolKey,
    count(1) as DaysEnrolled,
    sum(IsAbsentFromHomeRoom) as DaysAbsent
  from
    analytics.chrab_AttendanceFact
  where
    chrab_AttendanceFact.DateKey < DateDim.DateKey
  group by
    StudentKey,
    SchoolKey
) as Attendance
```

:::
