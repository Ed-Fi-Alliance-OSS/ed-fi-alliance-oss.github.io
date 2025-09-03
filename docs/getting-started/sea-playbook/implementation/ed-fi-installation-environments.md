# Ed-Fi Installation Environments

## Overview

Generally, states have several Ed-Fi deployment environments. Using multiple environments will ensure that the solution is tested rigorously before it gets deployed to production for end users.

## Using a Managed Service Provider

The Ed-Fi Alliance strongly recommends that new SEA implementers use a Managed Service Provider or System Integrator with prior experience deploying Ed-Fi for SEAs.

An MSP or experienced integrator will understand best practice with regards to hosting options, maintaining current Ed-Fi Technology Suite and tools, debugging early integrations, providing vendor support and many other processes. These providers can dramatically accelerate progress.

If you have an existing consultant or a preferred vendor list, SEAs have successfully asked those providers to sub-contract with an experienced Ed-Fi provider.

## Environment Purpose and Links

The recommended practice from the field is to at least have a Sandbox, a UAT and a Production environment. The table below provides the purpose and information pertaining to each of those deployment environments.

### Development

The development environment is what the state uses to prepare their data specifications and APIs. This is usually in a single server model hosting both the Web API and the databases in one server

**Link to Detailed Instructions:** [Source Code Installation](/reference/ods-api/getting-started/source-code-installation)

### UAT and QA environments

This environment generally mimics the production installation, and is used to validate that the environment is ready for production usage, using test data. The test data you use can be a backup of your production data populated in the Ed-Fi ODS.

**Link to Detailed Instructions:** [Production Deployment](/reference/ods-api/platform-dev-guide/deployment)

### Sandbox

A sandbox environment is generally used to support technology providers in preparing their integrations. It is not intended to be a staging environment for the platform host. Instead, this environment hosts the test data and is completely disconnected from production data. Said another way, a Sandbox instance of an API is essentially a copy of the production system’s functionality, populated with test data. This allows API client developers to test their applications during development without affecting production data.

Before installing the Sandbox instance, please visit the Sandbox Deployment document to learn about the Sandbox fundamentals, possible logical models, hardware requirements, sandbox security, and installation procedure.

You can start your implementation with a development environment setup by doing the source code install following the [Getting Started](/reference/ods-api/getting-started) installation instructions. Once your development environment is complete, you can migrate the code from the development environment to the Sandbox environment by following the instructions stated in the "Migrating from a Development Instance" section on the Sandbox Deployment page.

**Link to Detailed Instructions:** [Sandbox Deployment](/reference/ods-api/platform-dev-guide/deployment/sandbox-deployment)

### Production

This is an operational environment hosting real student data, and is the ones that the LEA-based vendor systems connect to.

**Link to Detailed Instructions:** [Production Deployment](/reference/ods-api/platform-dev-guide/deployment/production-deployment)
