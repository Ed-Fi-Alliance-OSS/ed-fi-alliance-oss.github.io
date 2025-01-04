# Overview of Ed-Fi Data Domains

## Overview

The Ed-Fi Data Model, also called the Ed-Fi Unifying Data Model or UDM, is extensive and crosses many domains common in K-12 education. It is student-centric, meaning it is optimized for capture of granular data about student learning and other school activities.

The UDM documentation provides details pertaining to the 16 domains in the Ed-Fi Data Standard.

UDM documentation for the latest version of the data model can be found here: [Unifying Data Model Reference](reference/data-exchange/data-standard/model-reference/)

The [video](https://vimeo.com/294250718) below explains the Ed-Fi Unified Data Model using a simple enrollment use case to describe what the entities, attributes, and associations are.

_Link to video: [https://vimeo.com/294250718](https://vimeo.com/294250718)_

## Sample Calculations Based on Use Cases

A new data model can be imposing, even to experienced business analysts and developers. To assist with this, we have developed a few sample use cases that walk a new business analyst through common calculations.

The following example uses the "Calendar" and "Bell Schedule" models for calculating the total instructional days in a year, total instructional minutes in a year, and instructional minutes in a day. A general introduction is followed by specific examples that build on the entities explored in the prior use cases.

| Use Case | Page |
| --- | --- |
| **A general introduction to the Ed-Fi Calendar domain.** | [How To: Calculate Instructional Days and Instructional Time](../overview-of-ed-fi-data-domains/how-to-calculate-instructional-days-and-instructional-time.md) |
| **Total Instructional Days/School Year** - Calculate the total number of instructional days in a school for a school year for reporting purposes. | [Use Case: Total Instructional Days](../overview-of-ed-fi-data-domains/how-to-calculate-instructional-days-and-instructional-time/use-case-total-instructional-days.md) |
| **Total Instructional Minutes/School Year** - Calculate the total number of instructional minutes for a school year for reporting purposes | [Use Case: Total Instructional Minutes](../overview-of-ed-fi-data-domains/how-to-calculate-instructional-days-and-instructional-time/use-case-total-instructional-minutes.md) |
| **Total Minutes/Day** - Calculate the total time students are in school, including instructional time within class periods and non-instructional time like passing time between classes, lunch, breaks, and recess. | [Use Case: Minutes per Day](../overview-of-ed-fi-data-domains/how-to-calculate-instructional-days-and-instructional-time/use-case-minutes-per-day.md) |
| **October 1 Student Count** - For the October 1 Child Count, the student must be enrolled in the school and receiving services to be included. Each student for whom the count date occurs on or between the entry date and the exit withdraw date shall be identified as one of Present - Receiving Services, Absent - Receiving Services, or Not Receiving Services. This element must NOT be sent for enrollment periods that do not include the count date. Leave the field blank. | - |
| **Special Education Student Count** - List of students receiving special student services with an indicator of whether the student was counted on the federally reported ESS October 1 count. | - |
