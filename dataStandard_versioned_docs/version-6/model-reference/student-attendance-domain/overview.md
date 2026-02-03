---
sidebar_position: 1
---

# Student Attendance Domain - Overview

## Key Entities

This domain contains:

* An AttendanceEvent entities which connect Student entities to Section,
    School, Program, and Intervention entities. The AttendanceEvent can model
    attendance, tardies, and absences for a particular class or school day.
* A SectionAttendanceTakenEvent, which models information about the taking of
    attendance, primarily the date on which attendance was captured.

## Key Concepts

The key concepts include the following:

* Attendance in the Ed-Fi data model can be affirmative, meaning that both
    attendance and absence are recorded, or can be “exception only” reporting,
    providing attendance events only for absences and tardies.
* Attendance in the Ed-Fi data model is event-based, so every instance of
    being absent or tardy is recorded and tied to a specific date. There is no
    built-in aggregate value, as Ed-Fi generally avoids aggregations where
    business rules start to apply.
* The SectionAttendanceEventTaken entity is strictly for recording that
    attendance was taken on a specific day for a specific section (optionally)
    by a specific staff member. It doesn’t affect individual student attendance
    values within the Ed-Fi data model, but can be useful when analyzing trends
    in attendance over the course of a year.
