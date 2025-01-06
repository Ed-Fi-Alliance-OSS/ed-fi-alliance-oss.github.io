# Use Case: Minutes per Day

## Total Time for a School within an Instructional Day

School X has a bell schedule to document all class periods and meeting times within a regular school day. School X needs to document the total time students are in school, including instructional time within class periods and non-instructional time like passing time between classes, lunch, breaks, and recess where applicable. The start of a regular school day corresponds to the StartTime for the first class period. The end of a regular school day corresponds to the EndTime for the last class period. All non-instructional time falls within these two times.

### Business Logic

```text
Time per Day = MAX( BellSchedule.ClassPeriodReference → ClassPeriod.MeetingTime.EndTime ) -

       MIN( BellSchedule.ClassPeriodReference → ClassPeriod.MeetingTime.StartTime )

WHERE BellSchedule.SchoolReference → School.SchoolId = ${ Selected School Id }

AND ClassPeriod.SchoolReference → School.SchoolId = ${ Selected School Id }
```

Assumptions:

* Each school has a single bell schedule. If a school has multiple bell schedules, the calculation will need to be repeated for each.
* All instructional and non-instructional time occurs between the first class period and last class period in the bell schedule.
  * The last class period end time signals the end of the school day.
  * The first class period start time signals the start of the school day.
* ClassPeriod.MeetingTime is an optional common type in the Ed-Fi v3.1 model and must be populated for each class period within the bell schedule.

### Diagram

![Minutes Per Day Diagram](https://edfi.atlassian.net/wiki/download/attachments/22905416/Minutes%20per%20Day%20v2.png?api=v2)
