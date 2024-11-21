# School Calendar Domain - Best Practices

## Sessions, Grading Periods, Calendars, and Calendar Dates

The Ed-Fi data model allows fine-grained modeling of instructional schedules,
but it's useful to know where to look.

* The _Session_ entity models concepts like terms and semesters (e.g., Fall
    Semester, First Quarter) along with a span of time.
* The _GradingPeriod_ entity models a span of time for which grades are
    reported (e.g., First Six Weeks, First Trimester). The grading period is
    often, but not necessarily, a division of a session.
* The _Calendar_ entity represents a set of specific dates. In the context of
    the School Calendar domain, these usually represent instructional days.
* The _CalendarDate_ entity models a specific date, and allows additional
    information to describe the type of date (e.g., Instructional day, Holiday,
    Weather day).

This raises a modeling question. Why not use the _Session_ or _GradingPeriod_
entities to hold the collection of _CalendarDate_ entities? In the Ed-Fi data
model, we've kept the two separate to allow flexibility while avoiding duplicate
data. This allows schools to have multiple sessions (e.g., for different grade
levels) and grading periods (e.g., for different programs) while maintaining a
single calendar for the school as a whole.

In order to provide a consistent granular specification of every student’s
calendar, during enrollment the _StudentSchoolAssociation.Calendar_ reference
MUST be populated, whether the School has single or multiple calendars.

## Multiple Calendars

Schools in K–12 often have multiple calendars. While schools may have an overall
calendar that applies to everyone, others sometimes have slightly different
calendars for various grade levels. For example, perhaps the Pre-K in a school
starts a week later than the rest of the school. Further, it is also possible
for a student to have an individualized calendar, perhaps due to an IEP or to
support participation in a district CTE program.

The following are best practice guidelines for these scenarios:

* If a school has grade level calendars, then there SHOULD be multiple
    Calendars and the _GradeLevels_ on _Calendar_ (_Calendar.GradeLevel_
    collection) for each SHOULD be populated and all calendar dates for that
    calendar populated. In this case there SHOULD NOT be an overall School
    calendar listing all _GradeLevels_, and such calendars should not attempt to
    show differences or "exceptions" from such an overall model.
* When using individual (or small group) calendars, it is RECOMMENDED that the
    _StudentSchoolAssociation.Calendar_ reference for a student be populated
    with the unique, individualized calendar, and not a school or grade level
    calendar. Such calendars SHOULD have a _Calendar.CalendarType_ set to an
    appropriate descriptor value (e.g., "Student Specific" or "IEP") to ensure
    clarity on the scope and avoid confusion with a school or grade-level
    calendar.
