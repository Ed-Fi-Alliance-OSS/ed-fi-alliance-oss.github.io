# Deployment

The Ed-Fi ODS / API can be deployed in a variety of on-premises and cloud-based
platforms. This flexibility ensures the code is suitable for many types and
sizes of organizations, but requires implementers to evaluate and plan for the
deployment solution and configuration best suited to their needs. This
documentation covers the basic knowledge required, provides an overview of
typical installation models, and links to additional resources and information.

This documentation describes two scenarios, one for deploying a Sandbox instance
of the Ed-Fi ODS / API in a production setting and another for deploying a
Production instance.

## Sandbox Deployment

A Sandbox instance of an API is essentially a copy of the production system’s
functionality, but populated with test data. This allows API client developers
to test their applications during development without affecting production data.

The Ed-Fi ODS / API includes support for a Sandbox instance of the API. The
online API documentation typically runs on the Sandbox instance as well.

The [Sandbox Deployment](./sandbox-deployment.md) section of this documentation
describes the particulars of deploying a Sandbox instance, which is often done
at some point prior to going live with a full production system.

## Production Deployment

The variety of deployment models supported by the Ed-Fi ODS / API mean that
there are several considerations that go into selecting the best model for a
particular deployment.

The [Production Deployment](./production-deployment.md) section of this
documentation describes the factors that go into planning an Ed-Fi ODS / API
deployment, along with guidance on creating a secure deployment.
