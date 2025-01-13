# Year 2 and Beyond

## Introduction

This knowledge base article attempts to provide high-level descriptions of some typical tasks an SEA (or Collaborative) must be aware of to be able to more efficiently plan the start and close of a school year within their Ed-Fi Technology Suite implementation.  

This article assumes prerequisite knowledge from:

* [Ed-Fi 101 – Welcome to Ed-Fi](https://academy.ed-fi.org/courses/ed-fi-101-welcome-to-ed-fi/)
* [Ed-Fi 102 – Introduction to the Ed-Fi Technology Suite](https://academy.ed-fi.org/courses/ed-fi-102-data-management/)

If you have not already completed these courses, we recommend doing so before attempting to digest the information presented in this article. These recommendations are also based on the following assumptions:  

* The Ed-Fi ODS/API is configured as a single, school year specific instance.  
* Some of these tasks will overlap depending on the actual beginning and end dates of your school year therefore sequential execution is **not** implied.
* While this article focuses on the Ed-Fi ODS/API instance, you will want to do a similar planning exercise for the systems downstream from your instance.

## Start of School Year

The start of the school year refers to the point at which you are considering accepting data submissions for a new school year. Keep in mind that this start does not necessarily equate to the actual beginning of the school year. Some implementations will start standing up the new Ed-Fi ODS/API instance well ahead of the beginning of school year. Here are some tasks that are typical for accomplishing this.

1. **Review your MSP/SI documentation.** If you are working with a Managed Service Provider (MSP) or Systems Implementer (SI), they should provide thorough documentation of any tasks specific to the beginning of the new school year. If the documentation doesn’t exist, request that they create it as they go through the process.
2. **Stand up a new school year Ed-Fi ODS/API instance.** You will want to do this with enough time ahead of when the districts want to start sending data.
    * Some states/collaboratives have multiple instances running at the same time. If that’s the case for your implementation, make sure there are school year specific URLs for the Ed-Fi API and communicate with districts to convey the new URL to vendors, coordinate the rollover period (e.g. moving from one school year to the next within the Student Information System), and work with districts for testing out the new URL.
    * Preload the ODS with all the required data e.g. Descriptors (commonly known as “code tables” or “code sets”), LEA Information, School Information, Course Information  
3. **Verify that all state-required data has been imported.** This includes any new data that might be introduced for the first time in the new school year. There are usually updates to the core state-required data (e.g. new/closed schools) that need to be verified.
4. **Ensure that the new Ed-Fi ODS/API instance and downstream systems incorporate any newly added extension fields for the new school year.** One example of a downstream system is a validation engine that runs checks for state-specific business rules on the data in the Ed-Fi ODS.
5. **Add the new Ed-Fi ODS name to your nightly backup processes.**
6. **Use the Admin App / Admin API to update access for districts and vendors.** Verify that access for new organizations has been granted. If you reset keys and secrets, then make sure they are ready when districts and vendors want to start sending data.  

## Close of School Year

Like the start of a school year, the close of the school year refers to the point at which you are planning to stop receiving updates for that school year. For some implementations, this could be more than two years after the actual end of the school year. Here are some tasks to plan for when approaching this point in your implementation.

1. **Review your MSP/SI documentation.** Just as you did for the start of a school year, you should review the documentation for closing out a school year.
2. **Turn off the connection to the closing school year Ed-Fi API instance.** For states with multiple school year instances running at the same time, only turn off the one of interest.
    * Shutting down the Ed-Fi API application service prevents any updates to the Ed-Fi ODS.
    * Communicate with all districts when turning off access. Districts may want to turn off Ed-Fi API access for their SIS at the same time to prevent connection failure errors.
3. **Use the Admin App **/ Admin API** to update access for districts and vendors.** Similar to the start of a school year, you may need to remove access for organizations.
4. **Take final backups,** once all the data has been loaded and the connection has been turned off.  

### Snapshots

Snapshots are essentially a frozen point-in-time version of the data. They serve as a pivotal tool for state administrators seeking to generate reports at specific points in time over the school year. By capturing the data at a particular moment, snapshots mitigate the risk of inconsistent reporting, especially in Ed-Fi ODS/API environments where data is subject to frequent changes. This approach ensures the reliability of generated reports by providing a stable dataset, crucial for maintaining the integrity and precision of educational data analysis. Here are a few tasks we’ve seen in practice for using snapshots.

1. **Communicate snapshot period dates to districts.** We’ve seen states provide snapshot dates to their districts, allowing them to submit data within a given period before “closing” the snapshot.
2. **Allow a period for corrections to be submitted.** Often times, data integrity issues are discovered when submitting for a snapshot period. Having a period for submitting corrections is beneficial for districts.

As an example, the diagram shown below shows how the state education agency in Wisconsin uses snapshots in their Ed-Fi Technology Suite integration lifecycle to facilitate state and federal reporting.

![WISEData Technology Suite integration lifecycle](https://edfi.atlassian.net/wiki/download/thumbnails/22908274/image-2024-2-14_17-1-17.png?version=1&modificationDate=1707951677347&cacheVersion=1&api=v2&width=1280&height=642)
