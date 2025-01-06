# Use Case: Total Instructional Minutes

## Total Instructional Time for a School within a School Year

School X has a bell schedule to document all class periods and meeting times within a regular school day. At the end of the school year, School X needs to calculate the total number of instructional minutes for reporting purposes. Instructional time for a regular school day would include all minutes between the StartTime and EndTime for class periods. Days with irregular meeting times would have a separate bell schedule with the dates associated. The sum of all instructional minutes for all bell schedules and associated dates would provide the final calculation at the end of the school year.

### Business Logic

```text
Total Instructional Time = ( SUM( BellSchedule.ClassPeriodReference → ( ClassPeriod.MeetingTime.EndTime - ClassPeriod.MeetingTime.StartTime ) ) ) \*

( COUNT( BellSchedule.Date ) )

WHERE BellSchedule.SchoolReference → School.SchoolId = ${ Selected School Id }

AND BellSchedule.ClassPeriodReference → ClassPeriod.SchoolReference →School.SchoolId = ${ Selected School Id }
```

Assumptions:

* Each school has a single bell schedule. If a school has multiple bell schedules, the calculation will need to be repeated for each.
* Class period meeting times do not include non-instructional time (e.g. passing time, breaks, lunch).
* ClassPeriod.MeetingTime and BellSchedule.Date are optional fields in the Ed-Fi v3.1 model and must be populated.

### Diagram

![Total Instructional Time Minutes Diagram](https://edfi.atlassian.net/wiki/download/attachments/22905420/Total%20Instructional%20Time%20v2.png?api=v2)
