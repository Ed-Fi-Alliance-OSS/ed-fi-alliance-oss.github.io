---
sidebar_position: 1
---

# Performance Evaluation Domain - Overview

## Key Entities

This domain contains:

* The Performance Evaluation entity is the evaluation of an educator, typically evaluation(s) are regularly scheduled and uniformly applied and may be comprised
    of one or more evaluations.
* The Evaluation entity represents the instrument used to evaluate an educator. The evaluation could be internally developed or could be an industry recognized
    instrument such as TTESS or Marzano.
* The Evaluation Objective entity serves as a sub-component of an Evaluation, a specific educator Objective, or domain of performance that is being evaluated.
    For example, the objectives for a candidate evaluation might include Planning and Preparation, Classroom Management, Delivery of Instruction, Communication, Professional Responsibilities.
* The Evaluation Element entity represents the lowest-level Element or criterion of performance being evaluated by rubric, quantitative measure, or aggregate
    survey response. For example, the criteria for a Delivery of Instruction objective may include Elements like Organization, Clarity, Questioning, and Engagement.

## Key Concepts

The key concepts include the following:

* PerformanceEvaluation entities are associated with Person, since Evaluations can be associated with the different person-role entities, specifically Staff,
    Candidate, and Student.
* For educators who are evaluated across one or more Sections, an optional association is provided from EvaluationRating to Section.
* A Goal entity is defined to record and track performance goals related to an EvaluationElement.
* The model is intended to support the following types of evaluations:
  * By a supervisor, peer, coach, typically using a rubric
  * Based upon a quantitative measure(s), like student growth or teacher attendance
  * Based upon aggregated responses to a survey, like a student survey or peer survey
  * Based upon ratings entered without the details of how it was derived
