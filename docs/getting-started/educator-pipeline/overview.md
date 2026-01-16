---
sidebar_position: 1
---
# EPDM Overview

## Overview

Preparing and supporting effective educators is a shared responsibility among educator preparation programs (EPPs), certification agencies, and the districts and schools that ultimately hire program completers. When these groups work together, the entire teaching profession benefits. To align their efforts with continuous improvement, each stakeholder needs access to stronger, more connected data about the educator pipeline.

To meet this need, the education community conducted research, identified data requirements, and built the first iteration of the **Teacher Preparation Data Model (TPDM)**—an extension of the Ed‑Fi Data Standard designed to capture key data across the educator pipeline. The model enabled comprehensive, longitudinal information spanning an educator’s journey: from application and enrollment in an EPP, to fieldwork experiences and demonstrated competencies, through certification, placement, and performance.

In 2019, a partnership with the Gates Foundation supported the model’s evolution and renaming, resulting in two versions:

* Educator Preparation Data Model (EPDM) Core - A streamlined set of foundational entities commonly used across educator‑pipeline implementations.
* Educator Preparation Data Model (EPDM) Community - A comprehensive, full‑featured extension designed to support broader use cases, including statewide implementations.

Following field implementation, the entities and descriptors from the EPDM Community version were incorporated into **Ed‑Fi Data Standard v6,** meaning they are now part of the core standard rather than a separate extension. This change promotes consistency and expands applicability across states and programs.

![Overview](https://edfidocs.blob.core.windows.net/$web/img/getting-started/epp/overview/tpdm_to_epdm_timeline.png)

[Navigate to the Ed-Fi Data Standard reference](https://docs.ed-fi.org/reference/data-exchange/data-standard/) page to access additional Ed-Fi Data Standard v6 Technical Resources, which include information about EPDM related entities.

[Navigate to the Technical reference](https://edfi.atlassian.net/wiki/spaces/EPP/pages/23171694/EPDM+Technical+Resources) page to access additional EPDM Technical Resources.

[Navigate to Educator Pipeline Use Cases](https://docs.ed-fi.org/getting-started/educator-pipeline/use-cases/) for additional context on EPDM backed tools and solutions.

## Visual Overview of EPDM

Below are visual representations of the EPDM model and its components. These images provide a conceptual understanding of the EPDM and its evolution over time.

### Prior to November 2021

![EPDM Prior to November 2021](https://edfidocs.blob.core.windows.net/$web/img/getting-started/epp/overview/tpdm_nov_2021.PNG)

### Current State

![EPDM Current State](https://edfidocs.blob.core.windows.net/$web/img/getting-started/epp/overview/epdm_current.png)

## Which is best for my organization - EPDM-Core or EPDM-Community?

| Choose EPDM-Core if... | Choose EPDM-Community if... |
|------------------------|----------------------------|
| I want to get started as quickly and simply as possible – using Ed-Fi EPP Starter Kits | I am currently using, or plan to use EPDM entities that are not currently in EPDM-Core |
| My use cases focus on candidate demographics, candidate enrollment, or performance (candidate or others) | |

If you are upgrading from TPDM v1.0 (and not using starter kits), or are unsure, start with TPDM-Community.

## Installing EPDM

| Installing EPDM-CORE | Installing EPDM-Community |
|----------------------|---------------------------|
| Install the Ed-Fi ODS/API platform v5.3 (defaults to including EPDM-Core extension) | EPDM-Community: Install the Ed-Fi ODS/API platform v5.3, but change the EPDM extension to be installed to EPDM-Community. This is done by following these [installation instructions](https://edfi.atlassian.net/wiki/spaces/EPP/pages/23169945/Installing+Ed-Fi+ODS+API+5.3+with+EPDM-Community+v1.1). |

### Visual Representation

#### EPDM-Core

![EPDM-Core](https://edfidocs.blob.core.windows.net/$web/img/getting-started/epp/overview/epdm_core.png)

#### EPDM-Community

![EPDM-Community](https://edfidocs.blob.core.windows.net/$web/img/getting-started/epp/overview/epdm_community.png)

More details about [TPDM-Core](https://edfi.atlassian.net/wiki/display/EFDS33/Educator+Preparation+Data+Model+Domain) and [TPDM-Community](https://edfi.atlassian.net/wiki/display/TPDMX/TPDM+Community?src=contextnavpagetreemode).

## ​Changing the EPDM model installed

If you start with EPDM-Core, and decide later that you need EPDM-Community, you can make the change by installing a new instance of the ODS/API and following the install instructions.​

If you have already loaded data, the choices are:​

You can re-load data into the ODS/API without changes (since EPDM-Core is a strict subset) ​
If data can’t be reloaded for some reason, it would be possible to write database scripts to migrate data – but this would incur some additional time/cost​

## Future Plans

The Alliance plans to continue to work with the EPP community to identify further entities that are mature enough to move into Ed-Fi Core.

The following are resources for getting information and engaging in the process:

* [Ed-Fi Community Governance](https://edfi.atlassian.net/wiki/display/GOV/Ed-Fi+Governance) – for convening the community and sharing information.
* [Roadmap for the Ed-Fi Technology Suite](/reference/roadmap/) - for details on upcoming releases.
* [Ed-Fi Tracker](https://tracker.ed-fi.org/secure/RapidBoard.jspa?rapidView=175) – for submitting tickets.

## Links to resources and documentation

* [EPDM-Core Details](https://edfi.atlassian.net/wiki/display/EFDS33/Educator+Preparation+Data+Model+Domain)
* [EPDM-Community Details](https://edfi.atlassian.net/wiki/display/EPP/EPDM+Community)
* [EPDM Technical Resources](https://edfi.atlassian.net/wiki/spaces/EPP/pages/23171694/EPDM+Technical+Resources)
* [Educator Prep Data Model Work Group](https://edfi.atlassian.net/wiki/spaces/GOV/pages/20335903/Educator+Prep+Program+EPP+Work+Group)
* [Clinical Experience and Performance Starter Kit](https://edfi.atlassian.net/wiki/display/SK/Clinical+Experience+and+Performance+Starter+Kit)
* [Program Diversity and Persistence Starter Kit](https://edfi.atlassian.net/wiki/display/SK/Program+Diversity+and+Persistence+Starter+Kit)
* [Educator Preparation Resources](https://edfi.atlassian.net/wiki/display/TPDMX/TPDM+Resources)

:::tip
The Educator Pipeline is currently undergoing migration. [Reference to the previous overview can be found here](https://edfi.atlassian.net/wiki/spaces/EPP/pages/23170337/EPDM+Overview)

:::
