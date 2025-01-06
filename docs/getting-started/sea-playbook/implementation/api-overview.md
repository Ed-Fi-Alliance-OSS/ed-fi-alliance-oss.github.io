# API Overview

## Introduction

This knowledge base article attempts to provide an overview of the Ed-Fi API, along with considerations around hosting, deployment, and integration by technology partners.  

If you haven’t already completed:

* [Ed-Fi 101 – Welcome to Ed-Fi](https://academy.ed-fi.org/courses/ed-fi-101-welcome-to-ed-fi/)
* [Ed-Fi 102 – Introduction to the Ed-Fi Technology Suite](https://academy.ed-fi.org/courses/ed-fi-102-data-management/)

We recommend doing so before attempting to digest all the information presented in this article.

:::note
This article is written about the Ed-Fi ODS/API 3 v7.1, links to other supported versions can be found at [Ed-Fi Technical Suite Supported Versions](/reference/roadmap/supported-versions)
:::

## Overview of APIs usage in the Ed-Fi Technology Suite

### Overview of APIs

Data from technology partners is stored and retrieved via the Ed-Fi API. An API can be thought of as a “contract” between data sources and client applications to send and receive data. The Ed-Fi API uses standard REST conventions and JSON as its data format language.

A REST API is a common pattern in software development; if you are not familiar with this pattern, we recommend these resources:

[REST API Overview](https://en.wikipedia.org/wiki/Representational_state_transfer)

[Video about REST APIs](https://www.youtube.com/watch?v=Q-BpqyOT3a8&)  The Ed-Fi API is built around Resources such as schools, students, grades, and assessments. In the Ed-Fi API, a Resource either represents an entity or composition of entities wrapped up as a single entity known as “domain aggregate” in the Ed-Fi Data Model. Your technology partner will send or receive data to these Resources via HTTPS (Hypertext Transfer Protocol Secure), using the HTTP methods (GET, PUT, POST, DELETE).  The diagram below shows an LEA SIS interacting with the Ed-Fi ODS/API.

![LEA SIS Ed-Fi ODS/API Interaction Diagram](https://edfi.atlassian.net/wiki/download/thumbnails/19334211/image-2024-2-11_19-30-9.png?version=1&modificationDate=1707701409610&cacheVersion=1&api=v2&width=884&height=300)

See the Data Exchange section of [API Developers Guide: Basics](/reference/ods-api/client-developers-guide/basics) to understand more about the difference between the GET, PUT, POST and DELETE endpoints.  It is important to note that most of the Core API endpoints have all HTTP methods implemented, and what each technology provider can do is controlled by the platform host via the security setup which we will discuss later in this article.

### How Ed-Fi Technology Suite Utilizes APIs

The Ed-Fi Technology Suite uses APIs to store, update and retrieve data from the Ed-Fi ODS.

### API Route Naming

To use the Ed-Fi API you must know how the routes are constructed.  The route contains the following pieces of information:

* Configuration – an example of configuration is school year
* Schema – this denotes if the API being addressed is in the Ed-Fi Core or an extension data model
* Resource – the denotes the specific type of resource being retrieved – e.g. Student or SchoolThe route construction rarely changes, and you can find the details as of version 7.1 here: [API Client Developers Guide: API Routes](/reference/ods-api/client-developers-guide/api-routes)

### Understanding Resources

Each Ed-Fi API endpoint addresses a specific Resource or domain aggregate.  A domain aggregate is made up of multiple entities in the Ed-Fi Data Model.  For instance, let’s look at the domain aggregate Course, which is made up of seven different entities:

| Domain Aggregate | Entities |
| --- | --- |
| Course | Course |
|  |  CourseAcademicSubject |
|  | CourseCompetencyLevel |
|  | CourseldentificationCode |
|  | CourseLearningStandard |
|  | CourseLevelCharacteristic |
|  | CourseOfferedGradeLevel |

What this means is to access CourseCompetencyLevel, for example, you would first get the Course resource via the Ed-Fi API and the CourseCompetencyLevel entity would be a part of that resource.

## Overview of Data Standard to APIs

### Relationship between the Data Standard and the API

The Ed-Fi Data Standard contains many different entities which are aggregated into domain specific resources.  As mentioned above each of those resources is then exposed through an Ed-Fi API endpoint and the entities that compose it can be accessed through the resource returned.

### Explanation of Composite Keys

Every resource will have an ID that will be returned with the API. It is important to note this is for convention and while they will be unique, they are not the actual key for the resource in the database.  Instead, the Ed-Fi API relies on a composite key approach based on the natural keys from the upstream datasource.  This allows the database to maintain a high level of referential integrity and ensure that the data is correctly linked throughout the database.

To learn more about why composite keys are used in the database see: [Technical Articles: Key Structure in the Ed-Fi ODS / API](/reference/ods-api/technical-articles/key-structure-in-the-ed-fi-ods-api/#unified-keys-in-the-as-shipped-ed-fi-ods)

## Overview of Deployment Options

### Ed-Fi Technology Suite Deployment

In the sample technology stack for an Ed-Fi Technology Suite installation that is pictured below, you can see how the Ed-Fi API sits between the various external systems and the Ed-Fi ODS.

 ![Sample Technology Stack for Ed-Fi Technology Suite](https://edfi.atlassian.net/wiki/download/thumbnails/19334211/image-2024-2-11_19-30-9-2.png?version=1&modificationDate=1707701411450&cacheVersion=1&api=v2&width=966&height=500)

When planning your Ed-Fi Technology Suite deployment you have three options, each with its own benefits and drawbacks.

1. **Binary Deployment –** This is the easiest of the deployment options as there is little configuration.  The downside is that other than the configuration there is little customization to be done. To learn more about Binary Deployment see: [Getting Started – Binary Installation](/reference/ods-api/getting-started/binary-installation)

2. **Core Binary Deployment + Source Code Extension Deployment –** This gives your organization the same fast deployment benefit of the binary deployment, with the ability to extend the Ed-Fi Data Model with an extension deployment. To see an example of this type of deployment see the following GitHub repository and build: C# Extension Project and [Extension Project Plugin Build](https://github.com/Ed-Fi-Alliance-OSS/Starter-Kit-SEA-Modernization/actions)

3. **Source Code Deployment –** This deployment will take the longest to set up as it is more involved, with more customization.  This gives full control of the deployment, including ability to extend the data model, customize the Identity API, and deploy bug fixes from the Ed-Fi source ahead of Ed-Fi releases. To learn more about Source Code Deployment see: [Getting Started – Source Code Installation](/reference/ods-api/getting-started/source-code-installation)

In all cases, the compiled code can run directly on a machine, e.g. in IIS on a Windows server, or they can run as a Docker image in a container network.  

### Ed-Fi ODS Database Choice

The Ed-Fi ODS can be run on either Microsoft SQL Server or PostgreSQL, the choice is up to your organization.

### Ed-Fi ODS Database Segmentation

Segmenting the Ed-Fi ODS allows your organization to break it into smaller databases.  There are different segmentation options depending on what you are trying to achieve, two of the most common are segmenting by school district and/or by school year. To learn more about the segmentation options and what each can achieve see: [Platform Dev Guide - Extensibility & Customization: Database Segmentation](/reference/ods-api/platform-dev-guide/extensibility-customization/#database-segmentation-strategy)

## Overview of API Versioning

### Latest Version

The Ed-Fi Alliance is continuing to work to extend and improve the Ed-Fi API which means there will continue to be updates to the Ed-Fi API. Information on which versions are supported as well as the newest versions available can be found here: [Ed-Fi Technical Suite Supported Versions](/reference/roadmap/supported-versions)

### Planning for upgrades

Typically, organizations undertake the Ed-Fi API upgrade  during the summer. The organization may choose to either archive the existing ODS(s) for the current school year or may keep the existing API and the ODS running to continue data collection for previous school years. This upgrade will live side-by-side with any existing systems to allow continued access to previous data.  This will mean that all of your technology partners will need to be issued new key/secrets for this new instance of the Ed-Fi API.  It is important to remember that with each upgrade your organization also needs to consider the following:

1. The lead time needed for any of your technology partners to upgrade.
2. Any state or district certifications that need to occur.
3. Any downstream systems (i.e. Reporting systems) that may be affected.

### Extending the Ed-Fi API

The Ed-Fi API is extendable to allow for use cases that are not already in place to be implemented. Check out this article for more information on when and how to create an extension: [Ed-Fi Data Standard Extension Framework Best Practices](/reference/data-exchange/extensions-framework/#best-practices)

## Technology Partner Specifics

### Security Setup

Security is imperative when dealing with student data.  The Ed-Fi ODS/API provide keys and secrets to the client applications that require access, and those determine what access is provided.  All communication is done over HTTPS which is more secure the HTTP.  To learn more about how the Authentication works see: [API Client Developers’ Guide: Authentication](/reference/ods-api/client-developers-guide/authentication)

### Working with Key/Secrets

The platform host for the Ed-Fi Technology Suite implementation will provide your organization with key/secret pairs to use as authorization credentials for their Ed-Fi ODS/API instance.  If you have multiple users of your system with varied access levels, you will be provided with multiple key and secret pairs.  It is imperative that these are kept secure to ensure no one unauthorized can gain access to the Ed-Fi ODS/API.  To learn more about Authorization see: [API Client Developers' Guide: Authorization](/reference/ods-api/client-developers-guide/authorization)

### Resource Loading Dependencies

When loading resources into the Ed-Fi ODS/API there is a set dependency order.  This can change between versions, Ed-Fi API provides a dependency order endpoint which can be used by your client application to programmatically load data in the dependency order

To learn more about resource loading dependencies see: [API Client Developers' Guide: Resource Dependency Order](/reference/ods-api/client-developers-guide/resource-dependency-order)

## Closing Summary/Useful Links

Here are a few other useful links to continue your learning:

* [API Developers Guide: Basics](/reference/ods-api/client-developers-guide/basics)
* [API Client Developers’ Guide](/reference/ods-api/client-developers-guide)
* [Platform Developers’ Guide](/reference/ods-api/platform-dev-guide)
* [Ed-Fi Technical Suite Supported Versions](/reference/roadmap/supported-versions)
* [Ed-Fi Data Standard Extension Framework Best Practices](/reference/data-exchange/extensions-framework/#best-practices)
