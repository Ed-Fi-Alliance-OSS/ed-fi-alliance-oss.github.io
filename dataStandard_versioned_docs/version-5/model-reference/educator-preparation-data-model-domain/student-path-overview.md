---
sidebar_position: 4
---

# Student Path Domain - Overview

:::note
StudentPath is currently part of the EPDM community extension
:::

## Key Entities

This domain contains:

* The Path entity that represents a "scheme for achieving milestones organized by phases for students to follow and be tracked against"
    This is often a generic plan to orient students toward and educational goal such as certification or graduation and is defined and associated to an Education Organization
* The StudentPath entity represents the association of a student along a particular defined path. The students individual progression is  
    further tracked at a more granular level based on particular milestones and phases outlined in the path set by the education organization

## Key Concepts

The key concepts include the following:

* Path Phases represent the overall progress a student is expected to follow on their process toward either the given education or
    certification goal. These are typically organized based around a concept such as school year, range of credits, or other defined progress indicator.
* Path Milestones represent the smaller goals expected to be accomplished within each phase of a path. These are tracked back to the
    individual student as they progress through one or more plans they may be associated to.
* Depending on the data available and granularity of tracking from each organization status can be set to be tracked via
    CompletionIndicators or using the more descriptive Status Events
* Similar to other concepts within the EPDM Domain a Student can also be associated to a Candidate via the Person entity.
