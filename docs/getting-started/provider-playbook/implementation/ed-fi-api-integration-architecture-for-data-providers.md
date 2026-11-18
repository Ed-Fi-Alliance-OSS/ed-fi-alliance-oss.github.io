# Ed-Fi API Integration Architecture for Data Providers

## Recommended Integration Pattern

A data provider, such as a student information system (SIS) or an assessment platform, integrates by pushing data from its application to an education agency's Ed-Fi API as that data changes. This article recommends an integration with three parts:

- **Ingestion:** read source data from a read-replica of the application database, optionally using change data capture (CDC), so the integration does not slow down the production system.
- **Sync service:** a process that runs separately from the main application, often on a workflow orchestrator. It turns source records into Ed-Fi API payloads and validates them before sending.
- **Sync database:** stores, for each record, the source system's ID, the Ed-Fi API `id`, and hashes of the record's natural keys and full payload. Each run compares against it and sends only what changed: POST for new records, PUT for changed records, and DELETE for deleted records. [The Reconciliation Process](#the-reconciliation-process) gives the steps, including natural key changes and incremental runs.

The same pattern works with ODS/API 7.x and with Ed-Fi API v8. A few client details differ; see [ODS/API 7.x and Ed-Fi API v8](#odsapi-7x-and-ed-fi-api-v8).

For the concepts behind this pattern (the push model, data mapping, and tracking deletes and natural key changes), see [What Does it Mean to Build an Ed-Fi Integration?](../project-planning/what-does-it-mean-to-build-an-ed-fi-integration.md). For where this work fits in the overall process, see the [Technology Provider Ed-Fi Journey](../project-planning/technology-provider-ed-fi-journey.md).

## Introduction

This article walks through the architecture of an Ed-Fi API integration in more detail. If you are new to Ed-Fi APIs, start with [Getting Started with APIs](./getting-started-with-apis/readme.md), which covers what an Ed-Fi API is, the prerequisites, and a hands-on tutorial.

## Background

Architecting an Ed-Fi API integration can be complex. This document seeks to surface things one should consider when implementing an integration for their application. In this document, we try to not be overly prescriptive when it comes to programming language or software. We acknowledge that programming languages and tools can look very different from vendor to vendor and by staying tool agnostic, we hope to provide guidance that is usable by all.

While this knowledgebase article does not go deep into the dependency order built into the Ed-Fi API, you can find more information in Resource Dependency Order for [ODS/API 7.3](/reference/ed-fi-api/client-developers-guide/resource-dependency-order) and [Ed-Fi API v8](/reference/ed-fi-api/8/client-developers-guide/resource-dependency-order).

Throughout this document, we will be using a fictional student information system, Limitless SIS, to better explain various aspects of architecting an Ed-Fi API integration. For the sake of brevity, let’s imagine that Limitless has decided they will sync information from their SIS to the Ed-Fi API resources below.

 ![SIS Resources Diagram](https://edfidocs.blob.core.windows.net/$web/img/getting-started/provider-playbook/implementation/image-2024-2-11_19-5-23.png)

The arrows note the dependency order that must be adhered to. While data may be sent to Local Education Agencies and Students at the same time, data must be sent to Local Education Agencies prior to sending data to Schools.

While this document is written to assist source system vendors who are developing an Ed-Fi API integration in-house, we also encourage you to seek out a managed service provider or system integrator who can lend their expertise when it comes to developing or even hosting the integration for you. You can find a list of managed providers on our [registry](/partners/badging/registry-of-ed-fi-badges) and discuss this with our Vendor Team directly.

 Early on in your development of an Ed-Fi API integration, you will want to understand how your data conforms to the Ed-Fi API. We refer to this as the mapping process. Understanding how the data in your application is represented in the Ed-Fi Data Standard can greatly ease the initial development of the integration as it provides something tangible to work towards.

## Architecture

### Overview

The goal of any Ed-Fi API integration is to create, update, and delete data on a target Ed-Fi API as it changes in the source system. The Ed-Fi API is a RESTful architecture and conforms to the rules one would expect in that architecture when interfacing with API resources.

In our example, Limitless SIS has already mapped the data from their application to the Ed-Fi API resources below.

 ![SIS Resource Diagram](https://edfidocs.blob.core.windows.net/$web/img/getting-started/provider-playbook/implementation/image-2024-2-11_19-5-23-1.png) Their Ed-Fi API integration has the following components which we will dive into in the following sections:

- A read-replica of their application database to reduce strain on production systems
- An Ed-Fi sync service which is the codebase that is processing the data and calling the Ed-Fi API
- A sync database to store information related to previous syncs

![Ed-Fi Sync Diagram](https://edfidocs.blob.core.windows.net/$web/img/getting-started/provider-playbook/implementation/image-2024-2-11_19-5-23-2.png)

### Ingestion

One of the first things an Ed-Fi sync needs to do is retrieve data from the application database and transform it into Ed-Fi API payloads. This should be done in such a manner that it is not going to negatively impact the production system and should be as efficient as possible. Using a read-replica of your database and enabling change data capture (CDC) are two things to consider.

#### Read-replica

In an ideal implementation, an Ed-Fi API integration should be as near real-time as possible. Tangibly this means that throughout the day, your integration is regularly making API calls on the Ed-Fi API to keep the data in sync with your application. It is important to note that the integration does not have to be event based. An alternative could be a sync that runs on a schedule throughout the day.

Further, it is best practice to allow your customer to manually trigger an Ed-Fi sync. This means architecting an Ed-Fi API integration that reduces strain on your source database instance. Consider implementing a read-replica of the primary source database and running all SQL queries related to your Ed-Fi API integration on the read-replica.

![Read Replica Diagram](https://edfidocs.blob.core.windows.net/$web/img/getting-started/provider-playbook/implementation/image-2024-2-11_19-5-23-3.png)

#### Change Data Capture

Change data capture (CDC) is a feature typically available on major relational database management systems such as Microsoft SQL Server, PostgreSQL, etc. CDC keeps track of what data has changed (inserted, updated, and deleted). Let's imagine Limitless SIS is going to retrieve data from their application database so they may create the JSON payloads for Student School Attendance Events. Without CDC, they will query the database for all attendance for the respective school year. Their sync process will then look at the sync database (explained in a future section) to determine what API calls need to be triggered on the Ed-Fi API. With CDC, one would be able to query the application database for only the attendance records that have changed since the last Ed-Fi sync occurred.

While CDC is not a necessary component, you can see how utilizing it can greatly increase the efficiency of an Ed-Fi sync process.

## Sync Service and Database

### Section Overview

In the architecture seen above, the Ed-Fi sync service sits separately from the main application. Said another way, building upon your SIS or assessment platform’s code base to implement an Ed-Fi API integration may not be the best architecture. Ed-Fi syncs can on occasion be long running batch style jobs better suited to be managed and executed on a workflow/data orchestrator (ie. Azure Data Factory, Airflow, Dagster, Prefect, etc). Leveraging an orchestrator provides one with a framework that more easily allows for unified logging, metadata management, and concurrency / parallelism.

Back to our fictional SIS, let’s imagine that Limitless develops their integration separate from their SIS application. This allows them more flexibility with programming language and architecture. Importantly, it allows them to run their Ed-Fi sync code via an orchestrator (ie. Airflow, Dagster) providing them with a framework to work within and an environment with separate compute resources.

The diagram below shows a generalized architecture of a workflow / data orchestrator. Typically, these platforms are deployed in a container orchestration system such as Kubernetes allowing pods to be created so a specific job can be run in an environment with its own compute and memory. These pods are ephemeral and are stopped after execution completes.

 ![Orchestrator Diagram](https://edfidocs.blob.core.windows.net/$web/img/getting-started/provider-playbook/implementation/image-2024-2-11_19-5-23-4.png)

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

Let’s look at what a simplified sync database could look like and how it is used. This design would likely be built out further in a full production Ed-Fi deployment to take into account things like supporting multiple Ed-Fi sync profiles. Imagine a table per Ed-Fi API resource along with four columns per table:

- **source\_id**: the ID of the record in the source system, such as the primary key of the enrollment row. It does not change when the record's natural keys change, so it is how the sync service finds a record it has sent before.
- **edfi\_id**: this is the ID that is returned by the Ed-Fi API when a record is successfully created
- **natural\_key\_hash**: this is a hash of only the natural keys for the respective Ed-Fi API resource
- **full\_record\_hash**: this is a hash of the full JSON payload

The example record below shows the last three columns.

 ![Sync Database Example Record](https://edfidocs.blob.core.windows.net/$web/img/getting-started/provider-playbook/implementation/image-2024-2-11_19-5-23-5.png)

### The Reconciliation Process

Each run builds a list of Ed-Fi API payloads. A _full run_ builds a payload for every source record. An _incremental run_ builds payloads only for the records that changed since the last run, for example using [change data capture](#change-data-capture). For each payload in the list:

1. Look up the record in the sync database by its `source_id`.
2. If no row is found, the record is new: run a POST, then store the `source_id`, the returned Ed-Fi API ID, and both hashes.
3. If a row is found and the natural key hash has not changed:
   - If the full record hash has changed, run a PUT using the stored Ed-Fi API ID, then store the new full record hash.
   - If the full record hash has **not** changed, do nothing.
4. If a row is found and the natural key hash has changed, a natural key has changed. Follow [Natural Key Changes](#natural-key-changes).

Then send deletes. How depends on the kind of run:

- **Full run:** a sync database row whose record was not in the list was likely deleted in the source system. Run a DELETE using its Ed-Fi API ID, then remove the row.
- **Incremental run:** do not treat missing records as deleted. Unchanged records are also missing from the list, so this would delete them. Instead, run a DELETE for each delete that the change data reports, using the Ed-Fi API ID stored for that `source_id`, then remove the row.

 ![POST PUT DELETE Diagram](https://edfidocs.blob.core.windows.net/$web/img/getting-started/provider-playbook/implementation/image-2024-2-11_19-5-23-6.png)

POST and PUT calls should run in dependency order and DELETE calls should run in reverse dependency order.

#### Natural Key Changes

Some Ed-Fi API resources let a PUT change a record's natural key. To find out which ones, see [Cascading Key Updates on ODS/API Resources](/reference/ed-fi-api/technical-articles/cascading-key-updates-on-ods-api-resources) for ODS/API 7.3, and [Identifying Resources that Support Natural Key Updates](/reference/ed-fi-api/8/client-developers-guide/using-the-online-documentation#identifying-resources-that-support-natural-key-updates) for Ed-Fi API v8.

- **If the resource supports natural key updates,** run a PUT with the new payload using the stored Ed-Fi API ID. The record keeps its Ed-Fi API ID. Store the new natural key hash and full record hash.
- **If it does not,** run a DELETE using the stored Ed-Fi API ID, then POST the record under its new natural key, and store the new Ed-Fi API ID and both hashes. Other records that reference the old natural key also have changed natural keys, so handle them in the same run: delete them before the record they reference, and POST them again after it.

## ODS/API 7.x and Ed-Fi API v8

The architecture in this article applies to both platforms. Ed-Fi API v8 uses the same resources and REST design as the ODS/API, so the ingestion, sync service, sync database, and reconciliation process do not change. These client details differ:

- **Property names are case-sensitive in Ed-Fi API v8.** POST and PUT bodies must use the exact `camelCase` names from the resource's OpenAPI specification. If an optional property is cased wrongly, Ed-Fi API v8 drops it without returning an error. The ODS/API does not check casing, so an integration that works against ODS/API 7.x can lose data on v8. Check property names in your validation step.
- **Resource URLs drop the `v3` segment.** For example, `/data/v3/ed-fi/students` on the ODS/API is `/api/data/ed-fi/students` on Ed-Fi API v8 (the host sets the prefix).
- **The token endpoint moves.** Ed-Fi API v8 issues tokens from the Configuration Service at `/connect/token`. The Ed-Fi API keeps an `/oauth/token` endpoint that forwards requests there, so existing clients keep working.
- **Ed-Fi API v8.1 limits request rates.** The ODS/API has no built-in rate limiting. Ed-Fi API v8.1 limits requests for each host name by default and returns `429 Too Many Requests` with a `Retry-After` header when a client goes over the limit. A sync service, especially during a first full load, should handle `429` responses by waiting for the `Retry-After` time and then retrying.

Some ODS/API features are not available in every v8 release. For example, ownership-based authorization is available in Ed-Fi API v8.1 but not in v8.0. See the [feature availability table](/reference/ed-fi-api/8/whats-new/release-notes#feature-availability) for details.

Because an education agency may host either platform, keep the API base URL and token URL configurable for each customer rather than hard-coding them. For what to collect from each customer (base URL, client key and secret, Data Standard version), see [Getting Started with APIs](./getting-started-with-apis/readme.md#prerequisites).

For the full list of differences, see the Ed-Fi API v8 [breaking changes and migration checklist](/reference/ed-fi-api/8/whats-new/release-notes#ed-fi-api-v80---breaking-changes-from-previous-releases). For which platform an agency should use, see [Should a new Ed-Fi implementation use ODS/API 7.x or Ed-Fi API v8?](/reference/roadmap/api-faq#q-should-a-new-ed-fi-implementation-use-odsapi-7x-or-ed-fi-api-v8). For support windows, see [Supported Versions](/reference/roadmap/supported-versions).

## Summary

Leveraging an architecture as described in this knowledgebase article can provide you with an Ed-Fi API integration that is efficient, does not make unnecessary API calls, and runs in such a way where your application’s production system is not impacted (using an orchestrator).

We hope this article has helped you understand how to approach architecting an Ed-Fi API integration for your application. For further reading on best practices related to interfacing with the Ed-Fi API, we recommend you read our article [Best Practices - API Integration](./best-practices-api-integration.md).
