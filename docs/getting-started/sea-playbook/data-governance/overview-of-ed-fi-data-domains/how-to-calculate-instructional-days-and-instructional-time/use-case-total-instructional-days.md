# Use Case: Total Instructional Days

## Total Instructional Days for a School in a School Year

School X has a school calendar to hold all of the dates associated with the school year. These include instructional days, holidays, teacher-only days, and so forth. At the end of the school year, School X needs to calculate the total number of instructional days for reporting purposes.

### Business Logic

```text
Total Instructional Days = SUM( CalendarDate.Date )

WHERE CalendarDate.CalendarReference → Calendar.SchoolReference → School.SchoolId = ${ Selected School Id }

AND CalendarDate.CalendarReference → Calendar.SchoolYear = ${ Current School Year }

AND CalendarDate.CalendarEventDescriptor IN ("Instructional day","Make-up day","Student late arrival/early dismissal")
```

Assumptions:

* Each school has a single calendar. If a school has multiple calendars, the calculation will need to be repeated for each.
* CalendarEventDescriptor values match the Ed-Fi v3.1 core values.
* Partial days (e.g. Student late arrival/early dismissal) are included as whole days.

### Diagram

![Total Instruction Days Diagram](https://edfi.atlassian.net/wiki/download/attachments/22905412/Total%20Instructional%20Days%20v2.png?api=v2)
