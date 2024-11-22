# Reporting Issues and Making Suggestions

To evolve and grow Ed-Fi data exchange standards and Ed-Fi Unified Data Model
(UDM), community input is essential. This page describes how to participate by
submitting new ideas and tracking the status of existing suggestions.

## Ed-Fi Tracker Overview

The Ed-Fi Alliance tracks issues and feature requests in a tool called Tracker,
a JIRA-based system available at
[https://tracker.ed-fi.org](https://tracker.ed-fi.org). This allows the Ed-Fi
Community to:

* Search for an view existing ideas
* View work in progress
* Vote on issues
* Add and comment on issues
* View code commits and pull requests related to issues

To get started with Tracker, you need a login: you can get one by [creating an
Ed-Fi Account](https://www.ed-fi.org/create-an-account/). This will provide an
SSO login that covers most Ed-Fi online services.

Below are a few helpful outlines on common tasks with Ed-Fi Tracker tickets.

## Submit an Issue

Reporting an issue is covered in the page [How To: Get Technical Help or Provide
Feedback](https://edfi.atlassian.net/wiki/spaces/ETKB/pages/20874815/How+To%3A+Get+Technical+Help+or+Provide+Feedback)

Please use this process to submit any ideas for improvement, blocking questions,
or other issues you run into.

## Track an Issue

Once an issue has been created, it can be followed to see subsequent work and
action. The Ed-Fi Tracker allows for users to easily follow tickets and receive
email updates when new comments are posted, changes to the ticket are made, or
the status is updated.

1. To track an issue, go
    to [https://tracker.ed-fi.org](http://tracker.ed-fi.org/) and log in if you
    are not already.

2. You can search for a ticket using the search at the top right of the page or
    with the filter.

3. To expand the filter options, click View all issues and filters.

![Tracker Search](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/tracker%20search.png)

4. Once you have selected the ticket you wish to track, click the Start
    watching this issue hyperlink.
![Tracker Watch Issue](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/tracker%20watch%20issue.PNG)

The number to the left shows how many people are currently watching this
    issue.

5. As updates occur to the ticket, you will receive an email alert with a link
    to the ticket.

6. To stop tracking a ticket, click the Stop watching this issue hyperlink.

![Tracker Stop Watch Issue](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/tracker%20stop%20watch%20issue.PNG)

## Vote or Comment on an Issue

Often others have similar issues to yours and tickets on those issues already
exist. It is a good idea, therefore, to search for existing issues and add your
comments to those tickets where possible. Commenting or voting for an issue is
the best way to ensure the Ed-Fi community has as much information as possible,
all in the same place.

1. To vote or comment on an issue, go
    to [https://tracker.ed-fi.org](http://tracker.ed-fi.org/) and log in if you
    are not already.

2. You can search for a ticket using the search at the top right of the page or
    with the filter.

3. To expand the filter options, click View all issues and filters.

![Tracker Search](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/tracker%20search.png)

4. Once you have selected the ticket, you can vote by clicking the Vote for
    this issue hyperlink on the right side of the page.

![Tracker Vote Issue](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/tracker%20vote%20issue.PNG)

5. And you can comment by scrolling down to the Comments section.

![Tracker Comments Section](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/tracker%20comments%20section.PNG)

6. Click the Comment button and include information like additional use cases
    or questions.

![Tracker Add New Comment](https://edfidocs.blob.core.windows.net/$web/img/reference/data-standard/tracker%20add%20new%20comment.PNG)

## Example Tickets

### Question

:::info

Summary: How to record credits for multi-part course

Issue Type: Question Fix

Version/s: v3.0

Description: As a school administrator, I want to know the best way to record
a student's credits to the course transcript for a course that has multiple
parts. I would like to know how to properly record data around courses with
multiple parts and student credits. Specifically, I need to address the
following use cases:

* Use Case 1 - A student was enrolled in a course with two parts offered in the
  Fall and Spring, passed both semesters, and earned credits for both course
  parts.
* Use Case 2 - A student was enrolled in a course with two parts offered in the
  Fall and Spring, failed the first semester and passed the second semester, and
  earned credits for both course parts.
* Use Case 3 - A student was enrolled in a course with two parts offered in the
  Fall and Spring, failed the first semester and passed the second semester, and
  earned credits for ONLY the second course part.
* Use Case 4 - A student was enrolled in a course with two parts offered in the
  Fall and Spring, failed both semesters, and did not earn any credits.

:::

### Reporting a Bug

:::info

Summary: StudentProgramAttendanceEvent can have records without a corresponding
StudentProgramAssociation

Issue Type: Bug Fix

Version/s: v3.0, v3.1

Description: It has come to our attention that because the
StudentProgramAttendanceEvent has separate references for Student, Program, and
EducationOrganization, that an attendance event record can be created without
the student having a StudentProgramAssociation record. Unless there is a use
case where this would be necessary, we would recommend replacing the three
separate references with a single StudentProgramAssociation reference instead.

:::

### New Feature Request

:::info

Summary: Add enrollment type to StudentSchoolAssociation

Issue Type: New Feature

Fix Version/s: v3.1

Description: As a SIS vendor, I would like to request an
Enrollment/Membership type on the StudentSchoolAssociation to accommodate state
implementation requirements. A handful of state implementations record
additional information on student enrollment/membership beyond knowing which
school is the PrimarySchool for the student. We come across this need repeatedly
in the field and would like to standardize how and where the information is
recorded. Adding a EnrollmentTypeDescriptor with the most commonly recorded
values as part of Ed-Fi core would remove the need for extensions across
multiple implementations and provide the flexibility to add custom descriptor
values.

:::
