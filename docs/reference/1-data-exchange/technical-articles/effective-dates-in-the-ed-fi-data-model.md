# Effective Dates in the Ed-Fi Data Model

This document provides information on the Ed-Fi Unifying Data Model's (UDM)
approach to effective dates, and gives practical guidance on using the data
model in contexts where effective dates are of particular importance.

## Overview

The Ed-Fi data model is optimized to capture and transmit data that exists
currently in source systems. This characteristic derives from the central Ed-Fi
community use case of aggregating current operational data into a centralized
location so that current, actionable insights and current reports (such as
compliance or other reports) can be derived from that data.

As such, the Ed-Fi data model has limited support for the concept of "effective
dates" — the dates where a transaction occurred or where organizational
recognition of some data (often a demographic fact about an individual) was
judged to be true. These latter entities are often seen in data models by using
fields that employ an "as of" formulation, as in "the student was judged to be
of race 'American Indian or Alaska Native' as of October 1, 2019."

The Ed-Fi data model therefore has no universal feature or strategy to capture
effective or "as of" dates across all data entities, because many effective or
"as of" dates do not exist in source systems.

This does not mean that the Ed-Fi data model does not have dates that can be
used to determine effective dates: there are many such dates in the model. But
those dates tend to be dates that are captured in their original source systems,
because those dates have important value to local operational processes.

## Examples

To clarify, let's consider some data facts that include dates:

1. On August 18, Paula Mills enrolled in the school Grand Bend Elementary.
2. On October 4, Paula Mills was determined to be eligible for Title I
    services.
3. On October 12, Paula Mills' name was changed to "Pauloa Mills."
4. On December 10, Pauloa Mills' race was changed from "Asian" to "American
    Indian or Alaska Native."

Of these facts that involve dates, the first 2 dates can be captured in the core
Ed-Fi data model and the latter 2 cannot. The reasons why illustrate important
patterns for dates in the Ed-Fi data model:

* For facts #1 and #2, the date of an enrollment or program eligibility is a
    strongly governed process date, and so is universally present in student
    information systems (SIS). As such, those SIS systems can provide that date;
    as such those dates are included in the Ed-Fi data model.
* For facts #3 and #4, these are certainly legitimate "event" dates, but
    community experience has shown that student information systems often do not
    capture these dates or if they do, those dates are not easily surfaced in
    data exchange (e.g., the date is buried in an audit log and inaccessible via
    routine processes).

Underlying all of this is Ed-Fi's practical approach to data exchange. It is
certainly possible to produce data models that capture all the possible "event"
or "validity" dates that an organization might be interested in (including dates
for facts #3 and #4 above), but that model can't be easily populated by current
operational data from actual systems.

As a result, Ed-Fi data model does not include such dates. You can see in this
Ed-Fi's focus on actualize-able data exchange rather than possible
organizational data models.

## The Period Entity

Ed-Fi does provide one optional pattern that can be employed to capture
effective dates where they exist.

The Period entity captures a BeginDate and an EndDate and can be used to provide
dates that the value(s) of a data entity was judged to be valid. If you look at
the use of this pattern in the Ed-Fi Address entity, you can see that it is used
to (per the definition there) capture: "the time periods for which the address
is valid."

It is important to note that all uses of the Period entity in the core Ed-Fi UDM
are **optional:** it is this way because the community has evidence that some
systems may capture this information (and be able to efficiently provide it) but
some do not capture that information.

:::caution

Note that there is an active proposal to remove Period from the model, as it has
been found to have limitations and cause complexity in data exchange. See
[DATASTD-1608](https://tracker.ed-fi.org/browse/DATASTD-1608) - Getting issue
details... STATUS for details.

:::

## Guidance for Agencies

* * *

Given this, the Alliance provides the following recommendations.

### When extending the data model to ask systems to exchange data (e.g., via an Ed-Fi API), limit requests for dates to those that are actually known to be present in source systems

Asking for data that source systems do not possess results in localized and
sometimes complex workaround for systems that communicate via Ed-Fi (e.g., "our
SIS doesn't capture dates for a student name change, so I'll just put in the ADA
student count date for the state") or forces the system to invent data (e.g.,
"our SIS doesn't capture the date that a student ethnicity was valid, so we'll
just set the dates to the first and last date of the current term"). Neither is
a desirable outcome for the systems or the community — the date is unreliable
because it is not actually managed by the submitting system.

### Instead of asking for effective dates on data entities, use current collection dates

If an agency is interested in an account of how many students were classified as
"Hispanic or Latino" on October 1, rather than collect "as of" dates on race,
use the state of the collection data on October 1 to capture that data (e.g., by
saving a copy of the submitted data at the end of the October 1, using change
data capture, or a similar strategy).

The reason is identical to the reason behind the first recommendation: most SIS
systems do not capture date changes for many data model entities, including
race. To ask a system to supply historical values forces them to either create
complex workarounds (at best) or to invent data they don't manage in a "best
guess" manner (more likely).

Some agencies are surprised to learn that they can successfully dispense with
many requests for "historical" data. Such asks are often a consequence of an
agency's use of "collection windows" or similar strategies. But the experience
of the Ed-Fi community has demonstrated that this is not only possible, but it
is a far less complex (and likely expensive) process to build an ecosystem based
on current operational data.

Guidance on how to enable and support such a "real-time" ecosystem is beyond the
scope of this document, but readily available within the Ed-Fi community.

### Limit use of the Period pattern by either making its use optional or be certain that all submitting systems in the data exchange context have the relevant date information

The Period pattern is meant to enable optional collection of dates, recognizing
that some systems may have dates while others do not. Agencies should resist
making Period required, unless they are confident that all dependent, submitting
systems have the data being requested.
