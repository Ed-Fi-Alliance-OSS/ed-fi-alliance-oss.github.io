
# OneRoster API

## Overview

The Ed‑Fi OneRoster API provides a standards‑based, secure way for Ed-Fi API
Hosts to expose rostering data using the 1EdTech OneRoster® 1.2 specification,
powered by data already present in an Ed‑Fi Operational Data Store (ODS). This
capability enables organizations to support common rostering use cases—such as
LMS provisioning and instructional tool onboarding—without introducing new data
pipelines or duplicating security infrastructure.

The OneRoster API is delivered as a separate API deployment, built from the
open‑source project, while relying on database views deployed directly on the
ODS for data access and consistency. This approach allows states and districts to
adopt a widely supported rostering standard while continuing to leverage their
existing Ed‑Fi data investments.

## Key Design Principles

### Separation of Concerns

The Ed-Fi OneRoster API service is **logically and operationally distinct** from the core
Ed‑Fi ODS/API.

- **Separate API service** The OneRoster API is deployed independently from the
  ODS/API application, allowing organizations to scale, secure, and operate it
  according to rostering‑specific needs.

- **Shared ODS data layer** The OneRoster API reads from **database views
  created on the Ed‑Fi ODS**, ensuring data consistency while avoiding
  duplication or synchronization overhead.

This architecture enables agencies to add OneRoster capabilities without
impacting existing Ed‑Fi API integrations.

### Standards Alignment

The API implements **OneRoster® 1.2 REST endpoints**, mapped directly from Ed‑Fi
Data Standard entities and relationships.

Supported endpoints include (non‑exhaustive):

- Organizations and schools
- Academic sessions, terms, and grading periods
- Courses and classes
- Users (students and teachers)
- Enrollments and demographics

Endpoints conform to OneRoster pagination, versioning, and resource conventions
defined by the OneRoster 1.2 specification.

## Security and Authentication Model

### Unified OAuth 2.0 Authentication

A core design goal of the Ed‑Fi OneRoster API is **seamless security
integration**.

- OAuth 2.0 client credentials are issued and managed through the **Ed‑Fi
  ODS/API security infrastructure**
- API clients use the **same key and secret** to access:
  - The Ed‑Fi ODS/API service
  - The Ed‑Fi OneRoster API service

This unified authentication approach eliminates the need for separate credential
management while maintaining consistent authorization patterns across APIs.

### Consistent Authorization Semantics

OneRoster authorization is integrated into the existing Ed‑Fi claims‑based security mode:

- OAuth scopes align to OneRoster resources
- Authorization decisions are enforced consistently with Ed‑Fi claims‑based
  access control
- Security configuration is managed centrally through the ODS/API security
  metadata

This ensures OneRoster access follows the same governance and policy controls
already established for Ed‑Fi API consumers.

### Enabling the OneRoster Feature

For a complete walkthrough of enabling OneRoster integration with Ed-Fi ODS/API,
see the article [How To: Enable OneRoster with the Ed-Fi ODS /
API](../../how-to-guides/how-to-oneroster-with-the-ed-fi-ods-api.md).

## Downloads

:::note

The following link contains the source code and docker image for the Ed-Fi
OneRoster implementation:

- Source Code:
  [edfi-oneroster](https://github.com/Ed-Fi-Alliance-OSS/edfi-oneroster)
- Docker Image:
  [edfi-oneroster-docker](https://hub.docker.com/repository/docker/edfialliance/one-roster-api/general)

:::
