---
sidebar_position: 1
---

# School Calendar Domain - Overview

## Key Entities

This domain contains:

* The Session entity, which models an instructional span of time such as a
    term or semester.
* The GradingPeriod and AcademicWeek entities, which group calendar events
    according to start and end dates, accordingly.
* The Calendar entity which represents a collection of dates.
* The CalendarEvent entity, which identifies a date and a type of activity for
    the date such as instructional day, holiday, make-up day, and so forth.

## Key Concepts

The key concepts include the following:

* The School Calendar domain model is fundamentally enumerative: all dates of
    note (e.g., all instructional dates) are listed as part of the calendar.
    Humans generally think of calendars as being “all non-weekend and
    non-vacation days between date A and date B,” but in K–12 systems such as
    SIS systems, calendars are rarely implemented that way. This domain follows
    suit.
* Note that the Session entity BeginDate and EndDate elements may be needed to
    determine instructional dates within a session. However, it is not
    recommended to have a calendar for each session: sessions capture terms on
    which credits are awarded. Rather, the recommended practice is to have an
    annual calendar. If it is necessary to know the instructional dates for a
    term or session, look to the session dates to determine those.
* The Ed-Fi data model has no district or local education agency calendars.
    Calendars in the Ed-Fi data model represent instructional days and so are
    school-level and below. A district calendar would therefore be a collection
    of identical school calendars.
