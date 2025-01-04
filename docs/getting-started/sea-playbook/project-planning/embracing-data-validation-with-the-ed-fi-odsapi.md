# Embracing Data Validation with the Ed-Fi ODS/API

## Introduction

The aim of this article is to offer a better understanding of the process of data validation against business rules and how to document those rules to prepare you for a successful Ed-Fi ODS/API implementation.

Data validation stands as a critical and necessary element in successful Ed-Fi ODS/API implementations. Its role is central in ensuring the integrity and accuracy of data, which directly influences the strategies and outcomes in education. This article is dedicated to underscoring the importance of data validation within the Ed-Fi ODS/API implementation and guiding education organizations on how to implement these practices effectively.

In the context of the Ed-Fi ODS/API, where standardization and interoperability of data are key, robust data validation processes are indispensable. They ensure that the data driving educational decisions and policies is reliable and aligns with the structured data models of the Ed-Fi Data Standard.  

This article assumes prerequisite knowledge from:

* [Ed-Fi 101 – Welcome to Ed-Fi](https://academy.ed-fi.org/courses/ed-fi-101-welcome-to-ed-fi/)
* [Ed-Fi 102 – Introduction to the Ed-Fi Technology Suite](https://academy.ed-fi.org/courses/ed-fi-102-data-management/)

 If you have not already completed these courses, we recommend doing so before attempting to digest the information presented in this article.

## Understanding Levels of Data Validation

In the context of the Ed-Fi ODS/API, data validation is categorized into two levels: Level 1 and Level 2.

* Level 1 data validation is executed when data is sent to the Ed-Fi API. This stage of validation is crucial as it involves the initial checks for accuracy and consistency. The primary focus here is to ensure that the data is in the correct format and meets the basic requirements to be accepted by the Ed-Fi API and stored in the Ed-Fi ODS successfully.
* Level 2 data validation is conducted on data stored in the Ed-Fi ODS after it has been collected. This level of validation is also referred to as business rules data validation. This knowledge base article focuses on planning and designing Level 2 data validations but be aware that there are often validations that happen outside the ODS e.g. data warehouse with prior year enrollment data.

## The Impact of Poor Data Validation

As the Ed-Fi API is a standard designed for interoperability, the consequences of poor validation extend beyond individual systems, affecting your entire educational technology ecosystem. Below is a list of ways inadequate data validation can significantly impact educational decision-making and data systems' integrity.

* **Compliance and Financial Implications:** States and districts typically have established business rules for data management. Inadequate validation can result in non-compliance with these rules, leading to inaccuracies in state reporting, financial mismanagement, and legal challenges.
* **Data Privacy and Security Issues:** Inaccurate data can lead to the wrong people accessing PII and sensitive data. The process of data validation helps to identify incorrect data to help alleviate data privacy and security related issues that might occur based on outdated or inaccurate data within the system.
* **Widespread Data Integrity Issues:** In an Ed-Fi ODS/API implementation, incorrect data in the Ed-Fi ODS can proliferate across all interconnected systems via interoperability. This can lead to misinformation spread, affecting multiple applications and decision-making processes.
* **Risk of Inaccurate Decisions and Impaired Decision-Making:** Data inaccuracies resulting from poor validation can lead to flawed decisions, impacting everything from student performance tracking to resource distribution and policy planning. Inaccurate data undermines the accuracy and effectiveness of strategies and policies.
* **Erosion of Trust:** Stakeholders' confidence in data systems is vital. Poor validation can erode trust in the data, impacting the credibility of institutions and their decision-makers.
* **Operational Inefficiencies:** Handling inaccuracies and inconsistencies due to poor validation can strain resources, leading to operational inefficiencies and wasted effort that could be better spent on educational initiatives.
* **Barrier to Data-Driven Culture:** The Ed-Fi Alliance aims to foster a data-driven culture in education. Inadequate validation undermines this goal by affecting the reliability of data, crucial for building this culture.  

## Proactive Data Validation: A Key to Success

Proactive data validation is fundamental to the success of any Ed-Fi implementation. By integrating data validation early in project planning, education organizations can reap significant benefits, ensuring that their data is not only accurate but also effectively meets their specific needs. Embracing proactive data validation in Ed-Fi ODS/API projects is not just best practice; it is a strategic move that sets the foundation for high data quality, efficient resource utilization, and overall project success. Here are the benefits:

* **Cost Efficiency:** Proactively incorporating data validation avoids the higher costs associated with retrofitting a solution later. Early integration allows for a more cost-effective approach, both in time and resources.
* **Resource Planning:** Early consideration of data validation facilitates better planning for the necessary resources. This includes determining whether existing data validations are in place, how they can be adapted to the Ed-Fi Data Standard, and what resources are required for implementation.
* **Preventing Data Propagation Issues:** A proactive approach helps prevent or reduce the propagation of bad data. By addressing data validation at the outset, institutions can ensure that the data entering their systems is clean from the start, reducing the likelihood of errors spreading through interconnected systems.
* **Documentation and Implementation of Business Rules:** Proactive validation includes assessing and documenting existing business rules in an easily understood way. This step is crucial for transforming these rules into ones that align with the Ed-Fi Data Standard and deciding on the best implementation strategy e.g. custom SQL, programming, or an Ed-Fi Alliance badged solution.  

## Starting Point: Downloadable Self-Assessment

A crucial initial step in your journey toward effective data validation is understanding where your institution currently stands. To facilitate this, we introduce a downloadable self-assessment tool, designed to help you gauge your readiness for implementing Level 2 data validation.

This self-assessment tool is more than just a checklist; it is a comprehensive guide that prompts you to examine various aspects of your current data validation processes.

We highly recommend downloading and completing this self-assessment as your first step. It will provide a clear picture of your current capabilities and areas that need attention, setting you on the right path toward a successful data validation process. This self-assessment is instrumental in ensuring that your journey towards data validation is well-informed and strategically planned.

**[Click Here to Download the Self-Assessment for Data Validation Readiness](https://edfi.atlassian.net/wiki/download/attachments/19334220/Self_Assessment_For_Data_Validation_Readiness.docx?version=1&modificationDate=1711424183807&cacheVersion=1&api=v2)**

## Documenting Data Validation Rules

Documenting data validation rules is a critical step in ensuring the success of data validation within an Ed-Fi ODS/API implementation. By thoroughly documenting your data validation rules, you not only ensure a smoother implementation process but also lay a foundation for consistent data quality.  

### Tips for Documentation  

Below are some tips for documenting your data validation rules.

* **Start with Existing Rules:** Begin by identifying and documenting any existing business rules your institution currently employs. Consider how these align with the Ed-Fi Data Standard and what modifications might be necessary.
* **Documentation and Accessibility of Business Rules:** Evaluate how your business rules are documented and whether they are easily understandable for implementation within the Ed-Fi Data Standard.
* **Plan for Presenting Business Rules:** Think about how you will present these business rules to your users, distribute requirements, and convey essential information.  
* **Map Rules for Ed-Fi ODS/API Implementation:** Contemplate how to take your existing rules and map them into rules leveraging the Ed-Fi Data Standard. This will help in visualizing how they will be implemented and how they interconnect within your data system.
* **Define New Rules:** You may choose to develop new validation rules that are specific to your needs within the Ed\-Fi Data Standard. Keep the existing rules in mind when adding new ones.
* **Develop a System of Error Codes and Messages:** Determine if your organization has an established system of error codes and messages and how these can be aligned or modified for the Ed-Fi Data Standard.
* **Use Clear and Consistent Language:** Write your rules in clear, understandable language. Avoid technical jargon where possible to ensure that the rules are accessible to all relevant stakeholders.
* **Be Detailed and Specific:** Each rule should be detailed and specific. Include information about why the rule is necessary, what it checks for, and how it fits within the broader data validation framework. Rules should be individually actionable.  For example, instead of a rule that states '10% of courses are missing an instructor", there is a specific validation result for each course that is missing an instructor.
* **Organize Logically:** Organize your rules in a logical manner. Group similar validations together and create a structure that makes it easy to find and understand each rule. Several agencies use rule versioning as well.
* **Include Examples:** Where possible, provide examples of the data validation rule in action. This can help clarify the rule's purpose and application.
* **Review and Update Regularly:** Data validation is not a one-time process. Your needs and business practices change and evolve over time. It is important to work with your team to evaluate your business rules regularly. At a minimum, this should be done once a year as new legislation and business practices are updated in your organization. Regularly review and update your rules to ensure they continue to meet your organization’s evolving needs and stay aligned with the Ed-Fi Data Standard.

### Excel Workbook Template

This downloadable spreadsheet is designed to assist you in effectively documenting your business validations. It is tailored for educational organizations transitioning to or integrating with the Ed-Fi ODS/API. The spreadsheet comprises several worksheets, each serving a specific purpose in the documentation and management of your data validation processes. Feel free to modify the spreadsheet to better fit your organization’s specific needs and processes.

The Data Validation Documentation Workbook is a living document that should evolve with your data validation processes. It serves as a central repository for all your data validation rules, error handling protocols, and mapping strategies. By diligently maintaining and referring to this document, your organization can ensure a cohesive and efficient approach to data validation, aligned with the Ed-Fi Data Standard.

The workbook contains three different worksheets. Each of these worksheets has a different purpose in the documentation process. Each worksheet is described below.

* **Error Codes, Messages, and Resolutions:** This worksheet is designed to catalog all error codes, corresponding messages, and their resolutions.
* **Validation Rules:** This worksheet is designed to document the details of each validation rule in both natural language and technical terms. This is the heart of the documentation process for documenting validation rules.
* **Validation Rule Mapping:** This worksheet is designed to help plan and track the transition of validation rules from your current system to the Ed-Fi standards.

**[Click Here to Download the Data Validation Documentation Workbook](https://edfi.atlassian.net/wiki/download/attachments/19334220/Data_Validation_Documentation_Workbook.xlsx?version=1&modificationDate=1711423298007&cacheVersion=1&api=v2)**

### Implementing Data Validation: Best Practices

Effective implementation of data validation is a strategic and dynamic process. The following streamlined best practices ensure a successful, efficient, and reliable data validation system:

* **Be prepared with documentation before choosing your implementation method.** At a minimum, understand where you are at with documentation and identify if you will want to get help with the documentation process from a vendor or consultant. The downloads in this article will help you determine where you are at regarding readiness for implementation.
* **Decide Your Implementation Method:** Determine your implementation method (custom SQL/programming, Ed-Fi Alliance badged solutions, etc.) from the outset. This choice guides the entire process, impacting resource allocation and training. See the _Useful Links_ section for more information on implementation methods proposed by the Open-Source Rules Engine and Validation API special interest group.
* **Use development, test, and production environment from Day One.** Establish separate development, testing, and production environments. This delineation allows for controlled implementation stages, reducing risk and enhancing evaluation at each step.
* **Leverage a phased implementation approach.** Start with smaller-scale implementations, allowing for manageable testing and adjustments. Gradually expand to larger datasets and broader system areas, confirming stability at each phase.
* **Setup an error management framework.** Establish robust error reporting and tracking mechanisms. Prioritize errors based on impact and develop a clear resolution workflow with assigned responsibilities and timelines.
* **Consider your error reporting to end users.** At the end of the day, your end users need an easy-to-use interface for viewing the results of data validation. Consider how you will display this data to your end users based on your organization's requirements and end user needs.
* **Perform comprehensive testing and training.** Regardless of what technology you choose to implement, you will need to perform extensive testing at each phase to identify and resolve issues early. This will help to ensure a stable production implementation. Include all support staff in the training from the beginning, ensuring a well-informed team for effective support and ongoing management.
* **Encourage a collaborative and informed process.** Foster collaboration among vendors to integrate cohesive solutions tailored to your needs. Keep stakeholders well-informed and involved, encompassing data entry staff to decision-makers, ensuring clarity in roles and the benefits of data validation.
* **Monitor and continuously evaluate all rules and processes.** Regularly monitor and evaluate your data validation system, being ready to adjust based on performance data and feedback. Build annual evaluation processes to update your rules for new or changing legislation and business practices.
* **Performance Focus:** Prioritize system efficiency during the rule design phase. Test under various loads to gauge performance impacts and ensure efficient system operation.
* **Correct data at the source.** Data needs to be corrected at the source. Your current process might include direct file uploads or other processes where users can correct the data after export from the source system. If a user corrects the data in the export but not in the source, that data will continue to be submitted with invalid data. Additionally, correcting the data at the source - such as the Student Information System, improves the data for use both vertically and horizontally and affects a positive change on the source data in the long term.
* **Re-validate all data any time data changes.** Minor changes can significantly impact data quality. Sometimes, a single data point can trigger a cascade of data validation issues. Ensure your system is configured to thoroughly evaluate every record against all relevant business rules each time data is submitted.

Dedicating effort to effective data validation unlocks the power of educational data, enhancing learning and administrative processes. Adopting the discussed principles and tools leads educational institutions toward a data-driven, efficient, and successful future.

## Useful Links

Here are links to the tools referenced in this article along with a few other useful links to continue your learning:

* [Self-Assessment for Data Validation Readiness](https://edfi.atlassian.net/wiki/download/attachments/19334220/Self_Assessment_For_Data_Validation_Readiness.docx?version=1&modificationDate=1711424183807&cacheVersion=1&api=v2)
* [Data Validation Documentation: Excel Workbook](https://edfi.atlassian.net/wiki/download/attachments/19334220/Data_Validation_Documentation_Workbook.xlsx?version=1&modificationDate=1711423298007&cacheVersion=1&api=v2)
* [Open-Source Rules Engine and Validation API Special Interest Group](https://edfi.atlassian.net/wiki/display/ESIG/Open+Source+Rules+Engine+and+Validation+API)  
* Example: Texas Student Data System Data Validation Rules, see link on [TSDS ODS Upgrade Data Standards page](https://www.texasstudentdatasystem.org/tsds/teds/ods-upgrade-data-standards)  
* [Example: WISEdata Validation Rule List (GoogleSheet)](https://docs.google.com/spreadsheets/d/10Wk6o20-HSw6qed7EK7nso0-eK9n1W9Ped9MRcM_4Mo/edit#gid=0)
* [Example: Nebraska Adviser Validation Guide (PDF)](https://www.education.ne.gov/wp-content/uploads/2019/05/ADVISER-Validation-Quick-Reference-Guide_Apr-2019.pdf)
