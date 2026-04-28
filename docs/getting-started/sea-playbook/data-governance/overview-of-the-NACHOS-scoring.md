# Measuring and Reducing Complexity in State Ed‑Fi Implementations

## What is NACHOS?

**NACHOS** (Numerical Aggregate of the Complexity for Handling complex data Over Simple data) is an Ed‑Fi Alliance program and scoring methodology designed to **measure and reduce implementation complexity** in state Ed‑Fi data reporting.

The methodology evaluates **state‑specific business logic, calculations, and structural deviations** introduced on top of the Ed‑Fi Data Standard that increase implementation effort for SIS and other vendors.

## Program Goals

The goals of the NACHOS program are to:

- Provide an **objective way to quantify implementation complexity**
- Identify **avoidable vs. necessary deviations** from the Ed‑Fi Data Standard
- Enable **data‑driven conversations with states** about reducing complexity
- Inform **Ed‑Fi Data Standard improvements** and alignment across states
- Reduce **vendor cost, time, and risk** associated with state‑specific reporting

NACHOS enables the community to move from anecdotal feedback (“this is hard to implement”) to **measurable, comparable evidence** of complexity and its root causes.

## Basis of the Methodology

NACHOS analyzes **state reporting artifacts** (such as API definitions, extensions, and documentation) at the **data‑element level**, assessing the business logic required to populate each element.

The methodology is grounded in the following principles:

- Complexity is driven primarily by **business logic**, not data volume
- Business logic is evaluated **where it is implemented** (at the element level)
- Extensions are not inherently problematic, but they **require additional effort to maintain and to ensure data quality**
- Complexity increases when logic spans **multiple entities, calculations, or transformations**
- The score is a relative measure of code complexity, not the absolute value.

The NACHOS methodology has been validated with vendors and applied consistently across states to enable reliable comparison. Because the Ed‑Fi Alliance does not have access to vendor source code, it is not possible to calculate absolute code complexity using standard software metrics such as Halstead Metrics or Cyclomatic Complexity. As a result, the NACHOS score represents a **relative assessment of coding effort**, rather than a direct measurement of code complexity.

In practice, the effort implied by Halstead-style metrics for a script that performs an aggregation (for example, calculating a value using a SUM function) is significantly higher than for code that simply sends granular data elements. NACHOS captures this relative difference in effort. However, it does not account for additional optimizations a developer may apply when implementing logic across the full set of state requirements.

## What Is a NACHOS Score?

A **NACHOS score** represents the **base complexity** of populating a data element, based on the level of business logic required. The NACHOS score for a given data element therefore serves as a reference indicator of the relative effort required to populate that element when modified business logic is introduced. Scores range from 0 to 3.

At a high level:

- A Zero score indicates **simple, direct data mapping**
- A base logic for sending descriptor values is considered standard data practice and carries a score of zero.
- Higher scores reflect **conditional logic, calculations, or other transformations** needed to populate data elements.
- The maximum score is capped at three, representing the highest level of business‑logic complexity required to populate the element.

Base NACHOS scores are applied consistently across domains to support aggregation, and to identify common needs that drive complex business logic.

---

## What Is an Adjusted NACHOS Score?

The **Adjusted NACHOS score** extends the base score to account for additional **structural or architectural complexity**, including:

- Use of **extensions**, particularly when equivalent Ed‑Fi core elements exist
- Dependencies that span **multiple entities**

Adjusted NACHOS more accurately reflects a **full implementation burden** experienced by vendors and is often used for impact analysis.  The base NACHOS score for each data attribute may be incremented (by 0.5 or 1) to account for additional effort introduced when the attribute is an extension or when its logic references multiple entities.  These adjustments are not meant to penalize state implementations.  When extensions are required because the base model version lacks the necessary elements, the Adjusted NACHOS scores are increased at a lower weight.  Therefore, the Adjusted NACHOS scores show a picture of added work to send the data, resulting from either state-specific deviation or gaps in the model itself.  This approach helps the Ed-Fi Alliance better understand where gaps in the data model may be driving additional work, informing both state conversations and future improvements to the standard.

## What Is A Good NACHOS Score?

It is still early to define a single benchmark for a “good” NACHOS score. Complexity drivers vary based on the breadth of use cases supported by a state, and the version of the Ed‑Fi Data Standard in use.

Importantly, NACHOS is designed to quantify the gap between state needs, implementation and model coverage. As common use cases are evaluated across states, NACHOS helps surface where similar needs are being addressed through different customizations or business logic.  By identifying these patterns, states can work collaboratively with the Ed‑Fi Alliance to converge toward lower complexity over time, either by aligning implementations or by informing improvements to the Ed‑Fi Data Standard that reduce the need for custom logic.

---

## What Happens After NACHOS Is Scored?

Scoring is the beginning—not the end—of the NACHOS process. After scoring, the program focuses on action and improvement:

1. **Identify high‑complexity domains and key drivers**
2. **Engage state agencies** to review findings and validate intent
3. Define **state commitments** to simplify or reduce requirements
4. Inform **Ed‑Fi Data Standard enhancements** where systemic gaps exist
5. Track **before‑and‑after impact** as changes are implemented

This continuous cycle supports measurable reductions in complexity and stronger alignment across states.

---

## Why NACHOS Matters to the Ed‑Fi Community

By making complexity measurable and actionable, NACHOS:

- Lowers the cost of state reporting
- Improves vendor scalability and implementation timelines
- Encourages cross‑state alignment
- Strengthens the value of the Ed‑Fi Data Standard as a shared foundation

NACHOS provides the Ed‑Fi community with **an evidence‑based approach** to improving implementation fidelity and reducing fragmentation.
