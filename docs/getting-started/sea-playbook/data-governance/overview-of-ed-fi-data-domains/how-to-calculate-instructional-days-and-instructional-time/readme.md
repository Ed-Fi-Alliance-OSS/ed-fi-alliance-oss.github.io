# How To: Calculate Instructional Days and Instructional Time

## Background on the School Calendar and Bell Schedule Domains

Instructional Days and/or Instructional Time are common requirements for state reporting for schools. The Ed-Fi model has two domains designed to store this data: School Calendar and Bell Schedule.

### School Calendar Domain

In Ed-Fi v3.1, school days are defined by two main entities: Calendar and CalendarDate. A calendar holds a set of dates for a school within a school year. A school can have multiple calendars when those dates vary by type or grade level. For example, a school may have a student calendar that holds dates associated with student attendance and another staff calendar which would include additional dates for staff development. The School Calendar domain model is fundamentally enumerative: All dates of note (e.g., all instructional dates) are listed as part of the calendar in CalendarEvent.

The CalendarEvent entity identifies a date, a type of activity for the date (e.g., instructional day, holiday, make-up day), and a reference to the calendar to which the calendar event applies. A single date can have multiple calendar event records. For instance, if there were a bad weather delay on January 4th, there would be two records in CalendarEvent for January 4th: "Student late arrival/early dismissal" and "Instructional day". All days are considered "whole days" for this model. Partial days are covered by the Bell Schedule domain.

#### Calendar and CalendarEvent Model

![Calendar and CalendarEvent Model UML](https://edfi.atlassian.net/wiki/download/thumbnails/22905346/Calendar%20UML.png?version=2&modificationDate=1564410017670&cacheVersion=1&api=v2&width=1280&height=839)

### Bell Schedule Domain

The Bell Schedule domain represents the start time and duration of one or more class periods in a day or over a course of days. A fully realized bell schedule for a school will include the dates and all the class period meeting times throughout a school year. A class period does not have to meet every day. Specific meeting days are defined in the Date element on the BellSchedule entity. This allows a school to have a bell schedule that is special for a specific day, such as for a testing day or a late-start day, or to have multiple bell schedules defined on the same calendar time period (e.g., for different grades). The Bell Schedule domain does not currently include a place to store non-instructional time (e.g., lunch, passing time, breaks).

#### Bell Schedule Model

![Bell Schedule Model UML](https://edfi.atlassian.net/wiki/download/thumbnails/22905346/Bell%20Schedule%20UML.png?version=2&modificationDate=1564410044127&cacheVersion=1&api=v2&width=1280&height=639)

## Use Cases

The following use cases represent general, common requests for business analysts at a state or local education agency that need to calculate the total instructional days, total time per day, and total instructional time in minutes for a school in a school year to satisfy state reporting requirements. They may also provide insight into Student Information Systems on how to correctly submit data about instructional days and time to the Ed-Fi Core Student Data API. Note that these use cases are illustrative, not exhaustive: they outline a few high-value uses cases and do not cover all possible use cases.

* [Use Case: Minutes per Day](./use-case-minutes-per-day.md)
* [Use Case: Total Instructional Days](./use-case-total-instructional-days.md)
* [Use Case: Total Instructional Minutes](./use-case-total-instructional-minutes.md)
