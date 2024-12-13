# Assessment Providers - Use Cases

:::info Key Concepts

* The Ed-Fi Data Standard for Assessment is primarily related to student outcomes. It does not cover areas like portability of assessment instruments.
* The use cases included under these specs include both scenarios for near-real-time data flows in formative Assessment Systems to intermittent, "batch" flows that are more common for interim or summative assessments.

:::

## Ed-Fi's Assessment Outcomes API

The Ed-Fi Alliance publishes an Assessment Outcomes API that is designed to allow data on student outcomes to flow from an assessment provider to other systems. The data covered in this API is principally **data directly related to student outcomes and results** that can be used by teachers and others to make instructional decisions to improve student performance. See the diagram below that reflects this primary area of focus:

![assessment standards diagram](https://edfi.atlassian.net/wiki/download/thumbnails/22905149/figure1.png?version=2&modificationDate=1561126886630&cacheVersion=1&api=v2&width=879&height=277)
_Figure 1: Focus of the Assessment API standards_

It is notable that the specifications do not cover related areas:

* Portability of assessment instruments (e.g., test forms, question item banks, scoring algorithms) between LMS or similar systems
* Managing operations of assessments in real time (e.g., the amount of time the student has to perform an assessment)
* Gathering derivative data to assist with the improvement of assessment instruments or to provide a microscopic view into student interactions (e.g., what elements of an interactive question a student clicked on)

## Example Use Cases

The architecture covered by this model of data exchange is intended to serve the use cases such as the following. **Pro tip:** These use cases are illustrative, not exhaustive. They outline a few high-value uses cases and do not cover all possible use cases.

* **Use Case A:** School X has a highly personalized learning process where student mastery is assessed against learning standards on an ongoing basis, sometimes even multiple times during the school day. These mastery levels for each student are recorded in an LMS, assessment, or gradebook system that teachers use to monitor progress and inform lesson planning, including individual student "playlist" assignments. In addition to teacher-delivered instruction and informal assessment, the school relies on external curriculum systems for content delivery. Those systems provide for "exit tickets" that describe the student’s mastery level against a learning standard. The information from the curriculum tools needs to travel to the LMS, assessment, or gradebook system as soon as possible after a student competes a learning unit.
* **Use Case B:** A school district uses an online diagnostic system to measure English Language Learner (ELL) capabilities as part of a larger system of identification and support for ELL students. Diagnostic sessions where the ELL screening assessment are administered are scheduled ad-hoc as students enroll in the district or are otherwise identified. When a student completes a screening assessment, the resulting data needs to travel to a case management system and to the district SIS system.
* **Use Case C:** A provider of interim benchmark assessments (typically given each grading period) needs to transfer results to school districts in machine readable format. The school districts typically aggregate this data alongside other data for the purposes of assessing progress towards overall yearly goals. The individual student level data is also included on quarterly report cards and put into parent portals. Assessment results at an item or learning standard level, both in aggregate and at a student level, are used by teachers for planning. The district wants this data to be available to produce the types of reports and visualizations outlined above and uses the Ed-Fi ODS to power the application and reporting tools.
