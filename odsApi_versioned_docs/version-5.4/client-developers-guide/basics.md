---
sidebar_position: 2
---

# Basics

An Ed-Fi ODS / API platform is a secure, modern, RESTful interface for hosting and
exchanging commonly shared K–12 education information. The API exchanges data
using JSON and XML, so client application developers can connect using any modern
platform and programming language.

This section covers fundamental information about how client applications
interact with an Ed-Fi ODS / API platform.

## Data Model Overview

What kind of data is contained in an Ed-Fi ODS / API platform? How is it
structured?

An Ed-Fi ODS / API platform supports a rich and detailed data model about
students, teachers, grades, assessments, and other data typically found in the K–12
education space. The data model is extensible, which means that platform hosts can
customize the information to suit their specific needs. The core data model
used by most implementers contains detailed data structures and associations for
the following information domains:

* Assessment
* Bell Schedule
* Discipline
* Education Organization
* Enrollment
* Finance
* Graduation
* Intervention
* School Calendar
* Staff
* Student Academic Record
* Student Attendance
* Student Cohort
* Student Identification and Demographics
* Teaching and Learning
* Alternative/Supplemental Services, including:
  * Career and Technical Education
  * Migrant Education
  * Special Education
  * Title I Part A Services

The data model used in an Ed-Fi ODS / API is based on the Ed-Fi Data Standard.
If you're new to the Ed-Fi Data Standard, the [Unifying Data Model](https://edfi.atlassian.net/wiki/display/EFDS33/Ed-Fi+Unifying+Data+Model) documentation is useful in exploring the details of the domain models listed
above. The [Using the Online Documentation](./using-the-online-documentation.md) section provides a great overview of the API surface — and the [documentation](https://api.ed-fi.org/v5.4/docs) itself is a complete reference for a core API implementation that defines the
endpoints, JSON payloads, element definitions, parameter options, and other useful
technical information.

## Data Exchange

How do clients exchange information with the API? What format is used?

The API supports transactional data loading scenarios, so client applications
can stay connected in near real-time. The API uses JSON for real-time and
transactional data exchange. However there are utilities that can aid in uploading data
in batch mode via the API (e.g., [Bulk Load Client Utility](../platform-dev-guide/utilities/bulk-load-client-utility.md) can be used to bulk load XML data and [Data Import](https://edfi.atlassian.net/wiki/spaces/EDFITOOLS/pages/24119638/Data+Import) can be used to bulk load CSV data).

## Security

How is the student information exchanged between clients and platforms kept
secure? What technologies are involved?

The Ed-Fi ODS / API uses OAuth 2.0 Client Credentials Grant Flow for
authentication. API platform hosts manage and securely distribute the OAuth keys and secrets
required to connect to production platforms. Not surprisingly, clients and
platforms talk to each other over HTTPS. If you've used OAuth before, the steps will
be familiar — but if you haven't, the [Authentication](./authentication) section of this documentation has a step-by-step walkthrough of the process.

Once client systems are authenticated, authorization in the Ed-Fi ODS / API
works like a typical system: client applications are associated with a set of
permissions that define the API resources available and what operations can be done on
those resources. Some ODS / API platform hosts assign "profiles" to clients
according to the general type of system. These profiles work similarly to a
database view, constraining what a client application can "see." See the [Authorization](./authorization.md) section of this documentation for a conceptual overview and implementation
details.

## Code Generation & SDKs for Clients

The surface of the API seems to cover a lot of information – which means
developers need to write a lot of code. Can any of that be automated?

We're glad you asked: yes. The Ed-Fi ODS / API exposes metadata according to the
excellent, open-source [OpenAPI](https://swagger.io/resources/open-api/) specification — which allows client developers to generate data access code
directly from the API surface. This generated code is referred to as an SDK. Some
API platform hosts will publish an SDK aligned to their specific system – but
most simply expose the metadata that allows clients to do the data access code
generation themselves. This allows client developers to tailor the data access to
their particular coding style and performance needs. Another advantage of these
SDKs is that they can easily be regenerated to reflect any changes to the
underlying data model of the host's data model.

The [Using Code Generation to Create an SDK](./using-code-generation-to-create-an-sdk.md) section of this documentation has more detail and a complete walkthrough on
generating the SDKs using [Swagger CodeGen](https://swagger.io/swagger-codegen/).
