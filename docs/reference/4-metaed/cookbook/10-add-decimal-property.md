# 10 - Add Decimal Property

## Problem

The design of a MetaEd model requires the addition of a decimal property to an
entity.

## Solution

Identify the affected entity in the MetaEd source files. Add the decimal
property and rebuild MetaEd. All technical artifacts related to the property
will be updated.

## Discussion

A decimal property defines a decimal simple type for the containing entity. A
decimal simple type has a total number of digits, a number of decimal places,
and optionally a minimum and maximum value. The decimal property cannot be
shared outside of the containing entity, and must have a name that is unique
across all simple types.

Consider the following code snippet:

```metaed
Common CalendarEvent
    documentation "The calendar event associated with a calendar date."
    descriptor CalendarEvent
        documentation "The type of scheduled or unscheduled event for the day."
        is part of identity
```

Imagine that the common CalendarEvent should also have an EventDuration as a
required decimal value. It should hold up to three digits with up to two after
the decimal place. After adding the decimal property, the code for CalendarEvent
should look like:

```metaed
Common CalendarEvent
    documentation "The calendar event associated with a calendar date."
    descriptor CalendarEvent
        documentation "The type of scheduled or unscheduled event for the day."
        is part of identity
    decimal EventDuration
        documentation "The amount of time for the event as recognized by the school."
        is required
        total digits 3
        decimal places 2
```
