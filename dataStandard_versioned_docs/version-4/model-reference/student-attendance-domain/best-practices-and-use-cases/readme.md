# Student Attendance Domain - Best Practices and Use Cases

## All Attendance vs Negative Attendance Capture

The Ed-Fi Student Attendance domain model supports two styles for reporting
attendance:

1. **All attendance events** are captured: one attendance event is recorded for
   each student against each school day, section, program, or intervention. In
   this model, both "positive" ("In Attendance") and "negative" attendance
   events ("Excused Absence", "Excused Absence", "Tardy", etc.) are captured.
2. **Negative attendance only**. In this model, "positive" attendance is not
   captured, and only the exceptions to being in attendance are captured
   ("Excused Absence", "Excused Absence", "Tardy", etc.)

Both models are possible, but the RECOMMENDED pattern is to use negative
attendance only for school and section based attendance UNLESS there is
additional data captured as part of the positive attendance record.

There are two reasons to prefer the negative-only capture:

* Sending all attendance events has the effect of exploding the volume of record
  exchange (generally negative attendance is < 10% of all events)
* The data on positive attendance can – by using standard calendar data exports
  – be inferred and is therefore redundant

Capturing both positive and negative attendance events is RECOMMENDED when there
is additional data capture associated with the positive attendance record. For
example, a school offering students both a "remote" and "on campus" option may
choose to capture how attendance is verified for "remote" attendance, and
therefore use codes such as "In attendance - completed assignment" or "In
attendance - participated synchronously online", etc. In this case, the capture
of positive attendance is needed to capture this additional data.

## School Day vs Section Period Attendance

There are two common ways to mark
attendance, **school-based** and **section-based**. School-based models are
common in lower grades where a student's attendance is assessed against the
entire school day. Section-based models are common in upper grades where a
student's attendance is assessed against specific section periods. When multiple
periods exist for a section on the same day, the one or more class periods may
be referenced.

Generally, a section-based model "rolls up" to a school-based model as well. In
other words, the student was "Tardy" for "Period 1" and is also "Tardy" for the
overall school day.

In using Ed-Fi to represent attendance, systems SHOULD provide overall
school-based attendance. This ensures that systems that are looking for
simplified views on a student's overall school attendance patterns have a
simplified way of understanding how school day attendance was assessed, without
having to replicate the business logic of converting from section-based
attendance to school day attendance, which involves business logic likely opaque
to downstream systems.

However, where section based attendance is captured, compliant systems SHOULD
also provide section-based attendance events.

## Sample Use Cases

* [Expected and Actual School Day
  Attendance](./expected-and-actual-school-day-attendance.md)
* [Expected and Actual Section
  Attendance](./expected-and-actual-section-attendance.md)
* [Expected and Actual Program/Intervention
  Attendance](./expected-and-actual-programintervention-attendance.md)
