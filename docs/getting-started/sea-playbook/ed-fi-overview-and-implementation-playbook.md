---
sidebar_position: 2
---

# Ed-Fi Overview and Implementation Playbook

Last updated: December 16, 2024

This playbook provides an overview of Ed-Fi and practical guidance for State Education Agencies
(SEAs) implementing Ed-Fi for data modernization. It covers the problem space, available
implementation approaches, a phased timeline, and best practices for vendor and LEA coordination.

**Download the original slide deck:**

- [PowerPoint Version](https://edfi.atlassian.net/wiki/download/attachments/22905309/SEA%20Ed-Fi%20Overview%20and%20Implementation%20Playbook.pptx?api=v2)
- [PDF Version](https://edfi.atlassian.net/wiki/download/attachments/22905309/SEA%20Ed-Fi%20Overview%20and%20Implementation%20Playbook.pdf?api=v2)

## Data Pain Points

States and districts share related but distinct data challenges.

**State Education Agencies:**

- _Timeliness_ — responding to legislative data requests can take weeks or months
- _Data quality_ — data received from districts is often in different formats and missing
  information
- _Costly collection_ — the average SEA employs 10–15 FTEs ($1.1M+) to process and clean
  district data

**Local Districts:**

- _Reporting burden_ — average of 6 FTEs ($0.5M) per district to collect and format data
- _Absenteeism_ — need earlier alerts of potential chronic absenteeism rather than months later
- _Assessments_ — lack access to a consolidated student-level view of assessment results
- _College and Career Readiness_ — limited visibility into performance against state targets

## Ed-Fi's Mission

Ed-Fi enables data interoperability across K–12 states, districts, and vendors through four
pillars:

```mermaid
flowchart LR
  EdFi(("Ed-Fi"))
  States(["States"])
  Districts(["Districts"])
  Vendors(["Vendors"])
  DS["Data standard<br/>Common taxonomy for student performance data"]
  API["Open-source APIs<br/>Real-time standardized data transfer"]
  ODS["Open-source ODS<br/>Shared platform and tools"]
  Community["Community<br/>Knowledge base, vendor directory, support, events"]
  States --- EdFi
  Districts --- EdFi
  Vendors --- EdFi
  EdFi --> DS
  EdFi --> API
  EdFi --> ODS
  EdFi --> Community
```

## Adoption Growth

State adoption of the Ed-Fi standard has accelerated significantly:

![State adoption growth chart](/img/sea-playbook/page-04.png)

District adoption for data services has grown substantially — roughly an 8× increase from 2019 to
2022, separate from the approximately 1,900 districts in states using Ed-Fi for state reporting:

![District adoption growth chart](/img/sea-playbook/page-05.png)
