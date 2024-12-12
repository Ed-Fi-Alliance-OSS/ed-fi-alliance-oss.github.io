# Ed-Fi API Integration Architecture for Data Providers

## Introduction

This knowledge base article attempts to provide an overview of the architecting an Ed-Fi API integration.  

If you haven’t already completed:

* [Ed-Fi 101 – Welcome to Ed-Fi](https://academy.ed-fi.org/courses/ed-fi-101-welcome-to-ed-fi/)
* [Ed-Fi 102 – Introduction to the Ed-Fi Technology Suite](https://academy.ed-fi.org/courses/ed-fi-102-data-management/)
* [Ed-Fi 251 – Technology Providers Playbook](https://academy.ed-fi.org/courses/ed-fi-251/) - Particularly the _**Mapping to the Data Standard**_ section  

We recommend doing so before attempting to digest all the information presented in this article.

## Background

Architecting an Ed-Fi API integration can be complex. This document seeks to surface things one should consider when implementing an integration for their application. In this document, we try to not be overly prescriptive when it comes to programming language or software. We acknowledge that programming languages and tools can look very different from vendor to vendor and by staying tool agnostic, we hope to provide guidance that is usable by all.

While this knowledgebase article does not go deep into the dependency order built into the Ed-Fi API, you can find more information in [Resource Dependency Order](/reference/ods-api/client-developers-guide/resource-dependency-order) as well as the Ed-Fi API Resource Dependency page in the Ed-Fi Academy course [Publishing Your First Set of Data](https://academy.ed-fi.org/courses/ed-fi-142-publishing-your-first-set-of-data/lessons/ed-fi-api/topic/ed-fi-api-resource-dependency-2/).

Throughout this document, we will be using a fictional student information system, Limitless SIS, to better explain various aspects of architecting an Ed-Fi API integration. For the sake of brevity, let’s imagine that Limitless has decided they will sync information from their SIS to the Ed-Fi API resources below.

 ![SIS Resources Diagram](https://edfi.atlassian.net/wiki/download/thumbnails/22908163/image-2024-2-11_19-5-23.png?version=1&modificationDate=1707699923973&cacheVersion=1&api=v2&width=1136&height=300)

The arrows note the dependency order that must be adhered to. While data may be sent to Local Education Agencies and Students at the same time, data must be sent to Local Education Agencies prior to sending data to Schools.

While this document is written to assist source system vendors who are developing an Ed-Fi API integration in-house, we also encourage you to seek out a managed service provider or system integrator who can lend their expertise when it comes to developing or even hosting the integration for you. You can find a list of managed providers on our [registry](/partners/badging/registry-of-ed-fi-badges) and discuss this with our Vendor Team directly.

 Early on in your development of an Ed-Fi API integration, you will want to understand how your data conforms to the Ed-Fi API. We refer to this as the mapping process. Understanding how the data in your application is represented in the Ed-Fi Data Standard can greatly ease the initial development of the integration as it provides something tangible to work towards.

## Architecture

### Overview

The goal of any Ed-Fi API integration is to create, update, and delete data on a target Ed-Fi API as it changes in the source system. The Ed-Fi API is a RESTful architecture and conforms to the rules one would expect in that architecture when interfacing with API resources.

In our example, Limitless SIS has already mapped the data from their application to the Ed-Fi API resources below.

 ![SIS Resource Diagram](https://edfi.atlassian.net/wiki/download/thumbnails/22908163/image-2024-2-11_19-5-23-1.png?version=1&modificationDate=1707699925507&cacheVersion=1&api=v2&width=1136&height=300) Their Ed-Fi API integration has the following components which we will dive into in the following sections:

* A read-replica of their application database to reduce strain on production systems
* An Ed-Fi sync service which is the codebase that is processing the data and calling the Ed-Fi API
* A sync database to store information related to previous syncs  

![Ed-Fi Sync Diagram](https://edfi.atlassian.net/wiki/download/thumbnails/22908163/image-2024-2-11_19-5-23-2.png?version=1&modificationDate=1707699926183&cacheVersion=1&api=v2&width=1072&height=500)

### Ingestion

One of the first things an Ed-Fi sync needs to do is retrieve data from the application database and transform it into Ed-Fi API payloads. This should be done in such a manner that it is not going to negatively impact the production system and should be as efficient as possible. Using a read-replica of your database and enabling change data capture (CDC) are two things to consider.  

#### Read-replica

In an ideal implementation, an Ed-Fi API integration should be as near real-time as possible. Tangibly this means that throughout the day, your integration is regularly making API calls on the Ed-Fi API to keep the data in sync with your application. It is important to note that the integration does not have to be event based. An alternative could be a sync that runs on a schedule throughout the day.

Further, it is best practice to allow your customer to manually trigger an Ed-Fi sync. This means architecting an Ed-Fi API integration that reduces strain on your source database instance. Consider implementing a read-replica of the primary source database and running all SQL queries related to your Ed-Fi API integration on the read-replica.

![Read Replica Diagram](https://edfi.atlassian.net/wiki/download/thumbnails/22908163/image-2024-2-11_19-5-23-3.png?version=1&modificationDate=1707699926657&cacheVersion=1&api=v2&width=600&height=500)

####  Change Data Capture

Change data capture (CDC) is a feature typically available on major relational database management systems such as Microsoft SQL Server, PostgreSQL, etc. CDC keeps track of what data has changed (inserted, updated, and deleted). Let's imagine Limitless SIS is going to retrieve data from their application database so they may create the JSON payloads for Student School Attendance Events. Without CDC, they will query the database for all attendance for the respective school year. Their sync process will then look at the sync database (explained in a future section) to determine what API calls need to be triggered on the Ed-Fi API. With CDC, one would be able to query the application database for only the attendance records that have changed since the last Ed-Fi sync occurred.

While CDC is not a necessary component, you can see how utilizing it can greatly increase the efficiency of an Ed-Fi sync process.  

## Sync Service and Database

### Section Overview

In the architecture seen above, the Ed-Fi sync service sits separately from the main application. Said another way, building upon your SIS or assessment platform’s code base to implement an Ed-Fi API integration may not be the best architecture. Ed-Fi syncs can on occasion be long running batch style jobs better suited to be managed and executed on a workflow/data orchestrator (ie. Azure Data Factory, Airflow, Dagster, Prefect, etc). Leveraging an orchestrator provides one with a framework that more easily allows for unified logging, metadata management, and concurrency / parallelism.

Back to our fictional SIS, let’s imagine that Limitless develops their integration separate from their SIS application. This allows them more flexibility with programming language and architecture. Importantly, it allows them to run their Ed-Fi sync code via an orchestrator (ie. Airflow, Dagster) providing them with a framework to work within and an environment with separate compute resources.  

The diagram below shows a generalized architecture of a workflow / data orchestrator. Typically, these platforms are deployed in a container orchestration system such as Kubernetes allowing pods to be created so a specific job can be run in an environment with its own compute and memory. These pods are ephemeral and are stopped after execution completes.

 ![Orchestrator Diagram](https://edfi.atlassian.net/wiki/download/thumbnails/22908163/image-2024-2-11_19-5-23-4.png?version=1&modificationDate=1707699927050&cacheVersion=1&api=v2&width=1280&height=479)

The diagram above shows a SIS application using an API provided by the orchestrator to trigger jobs and read back metadata to report back via their UI the status and result of the job.

Calling an orchestrator’s API allows the front-end application to provide their customers with a unified front end. It is this architecture that allows them to run Ed-Fi syncs throughout the day without ever worrying about affecting application performance in the SIS itself.

Let’s step through what actually happens when Limitless SIS kicks off a sync of their supported Ed-Fi API resources and how the sync database is used. For this example, we will focus on Students, Student School Associations, and Student School Attendance Events.

### Natural Keys

The Students resource has only one natural key, **studentUniqueId**. A SIS has multiple identifiers for a student and should consider a configuration setting in their UI to allow the LEA the choice of identifier for **studentUniqueId** (ie. State student ID, local student ID, SIS student ID, etc).

The Student School Associations resource has three natural keys: **schoolId**, **studentUniqueId**, and **entryDate**.

The Student School Attendance Events resource has six natural keys: **schoolId**, **schoolYear**, **sessionName**, **studentUniqueId**, **eventDate**, and **attendanceEventCategoryDescriptor**.

### Fetching Data from the Application

The first thing the sync service does is fetch the necessary data from the application database to create the JSON payloads for the API resources. At this stage, consider using a data validation library such as pydantic or FluentValidation. This will allow you to check the validity of records against what the Ed-Fi API requires (ie. Students must have a birthdate) and discard records early in the process that will be rejected by the Ed-Fi API.

We now have our data transformed into the format the Ed-Fi API expects.

```json
{ 
  "studentUniqueId": "604822", 
  "birthDate": "1980-07-31", 
  "firstName": "Harry", 
  "lastSurname": "Potter" 
} 
```

(valid Students payload)

### The Sync Database

Let’s look at what a simplified sync database could look like and how it is used. This design would likely be built out further in a full production Ed-Fi deployment to take into account things like supporting multiple Ed-Fi sync profiles. Imagine a table per Ed-Fi API resource along with three columns per table:

* **edfi\_id**: this is the ID that is returned by the Ed-Fi API when a record is successfully created
* **natural\_key\_hash**: this is a hash of only the natural keys for the respective Ed-Fi API resource
* **full\_record\_hash**: this is a hash of the full JSON payload

 ![Sync Database Example Record](https://edfi.atlassian.net/wiki/download/thumbnails/22908163/image-2024-2-11_19-5-23-5.png?version=1&modificationDate=1707699927467&cacheVersion=1&api=v2&width=876&height=300)

### The Reconciliation Process

After the full list of Ed-Fi API records are created, we can perform the following reconciliation process:

1. Create a hash of the natural keys
2. Check the sync database using the natural key hash to see if the record has been sent previously
3. If a record is found for the natural key hash and the full record has changed, we know we need to run a PUT using the Ed-Fi API ID to update the record
4. If a record is found for the natural key hash and the full record has **not** changed, we don’t need to do anything
5. If a record in the sync database was not checked, it is likely that the record was deleted in the source system application database and we should run a DELETE using the Ed-Fi API ID.

 ![POST PUT DELETE Diagram](https://edfi.atlassian.net/wiki/download/thumbnails/22908163/image-2024-2-11_19-5-23-6.png?version=1&modificationDate=1707699927910&cacheVersion=1&api=v2&width=886&height=300)

POST and PUT calls should run in dependency order and DELETE calls should run in reverse dependency order.  

## Summary

Leveraging an architecture as described in this knowledgebase article can provide you with an Ed-Fi API integration that is efficient, does not make unnecessary API calls, and runs in a such a way where your application’s production system is not impacted (using an orchestrator).

We hope this article has helped you understand how to approach architecting an Ed-Fi API integration for your application. For further reading on best practices related to interfacing with the Ed-Fi API, we recommend you read our article [Best Practices - API Integration](https://edfi.atlassian.net/wiki/display/EDFICERT/Best+Practices+-+API+Integration).
