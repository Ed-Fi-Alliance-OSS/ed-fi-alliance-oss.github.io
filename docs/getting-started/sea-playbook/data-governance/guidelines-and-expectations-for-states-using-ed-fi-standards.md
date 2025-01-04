# Guidelines and Expectations for States Using Ed-Fi Standards

By using Ed-Fi API standards for data collection, states are basing their data collections on the Ed-Fi API Data Standard and its semantics. The expectation is that states will follow these standards to the maximum extent permitted. This document describes some of the most important ways that states can align to Ed-Fi standards.

There are important reasons why it is important for states to be strongly aligned.

* **Following the standard supports the vendor market and lowers costs to LEAs.** Vendors and other community stakeholders rely on states for alignment so that their support for Ed-Fi is portable across state boundaries. Unnecessary deviations result in costs to vendors to support non-standard elements, and those costs are ultimately borne by LEAs.

* **State data ecosystems depend on standardization.** In adopting Ed-Fi, a state is beginning to build a standards-based data ecosystem in their state. Over time, states who do not follow the standards closely also come to understand their own internal costs for these decisions and costs that are borne by their state ecosystem (poor vendor access and additional costs of customized data flows). Over time, states that did not align well to Ed-Fi standards end up re-aligning and absorbing additional, unnecessary change management costs.

States may perceive that they cannot meet some of these expectations due to policy reasons. On this point it is important to remember that Ed-Fi is a standard, and that – in using a standard – states have a responsibility to align to ensure that the entire community benefits from industry-standard interfaces.

## **Avoid unnecessary API Extensions**

Ed-Fi API Extensions are available in recognition that each state will have unique data elements not present in Ed-Fi. However, extensions should not be used when unnecessary, and in particular should not duplicate elements that are already present in the data model.

## **Avoid aggregate data elements**

The Ed-Fi Data Standard is based on granular student-level data, as it is modeled and represented in source systems. In the design of extensions, states should avoid creating data elements which aggregate data across multiple data elements. States should avoid “counts” of elements and instead opt to collect the granular elements that make up the collection.

For example, instead of an extension “numCollegeCounselorMeetings” to designate the number of times a student met with the school college counselor the state should collect a record of each individual meeting.

## **Avoid data elements that encapsulate business logic, and instead derive downstream metrics from the granular data**

States should avoid creating data elements that require complex business logic calculations by vendors and instead derive those calculations on their systems from the raw, granular data.

Many states are accustomed to pushing metrics calculations upstream to vendors and LEAs in their legacy collections systems; however, because the vision of Ed-Fi is an interoperability ecosystem of maximum utility to all stakeholders, states need to restrict this practice and instead perform business logic calculations on the state systems.

For example, a state could publish a rule for a data element such as “if a student leaves a school and then re-registers within 60 days, send a single enrollment record to the state.” In Ed-Fi, the state should instead allow the vendor/LEA to send the student's complete enrollment history (an enrollment, a withdrawal, and a re-enrollment) and the state should calculate the value needed based on the dates of those events.

## **Avoid re-writing the definitions of Ed-Fi data elements**

States should avoid changing the semantics of the Ed-Fi data elements unnecessarily, and instead default to the Ed-Fi definitions to the maximum extent possible.

For example, a state might choose to redefine the field AttemptedCredits on the CourseTranscript object as:

The number of credits a student attempted and could earn for successfully completing a given course. _Put ‘0' here if credits were not earned because of the final grade_.”

The first sentence here is the Ed-Fi definition for the element, but the second sentence (in italics) was added by the state. The second sentence changes the meaning of the data element, essentially re-writing the element’s semantics. This change is not only unnecessary (the state can see elsewhere on the CourseTranscript record if the student passed the course) but also forces vendors to make an exception in their Ed-Fi support for this case, increasing their costs and the costs to LEAs.
