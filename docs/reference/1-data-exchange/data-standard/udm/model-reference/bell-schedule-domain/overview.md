---
sidebar_position: 1
---


# Bell Schedule Domain - Overview

## Key Entities

This domain contains:

* A BellSchedule entity, which defines the meeting times and dates for each
    logical class period.
* A ClassPeriod entity, which allows Sections and Bell Schedules to change
    independently.
* A Section entity, which is related to a ClassPeriod entity that represents
    the basic unit for scheduling a section.

## Key Concepts

The key concepts include the following:

* The model accommodates a wide variety of bell schedules, including block
    schedules.
* A fully realized bell schedule will include the dates of all the class
    period meeting times for a particular school throughout a school year.
* A class period does not have to meet every day. Specific meeting days are
    defined in the Date element on the BellSchedule entity. This allows a school
    to have a bell schedule that is special for a specific day, such as for a
    testing day or a late-start day.
* A school may have multiple bell schedules defined and may have different
    bell schedules on the same calendar time period (e.g., for different
    grades).
* The BellSchedule entity connects to a Section entity through a ClassPeriod
    reference. For example, a Section might be assigned to a class period named
    Block A. The BellSchedule entity contains the information about what time
    Block A starts and ends on a given date.
* StartTime, EndTime, and TotalInstructionalTime can be defined for a
    BellSchedule to aid in state and federal reporting requirements.

## Key Entity Connections

The following diagram uses data to illustrate the connections between the key
entities in the Bell Schedule domain:

![Bell-Schedule-Data-Diagram](../../../img/Bell-Schedule-Data-Diagram.png)
