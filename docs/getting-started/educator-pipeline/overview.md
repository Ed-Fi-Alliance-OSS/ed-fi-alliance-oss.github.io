---
sidebar_position: 1
---
# EPDM Overview

## Background

The preparation and support of educators is a shared responsibility between educator preparation programs (EPPs), certification agencies, and those hiring program completers. When everyone works together, the quality of the teaching profession is strengthened. To do their part and align their goals with a continuous improvement cycle, each of these groups needs access to better data at specific times in the educator pipeline.

In response to this need, UPD (now Crocus) conducted research, gathered requirements and developed technology to create the Teacher Preparation Data Model (TPDM), involving key players as stakeholders in the process and was developed from 2015-2018.In 2019, the Ed-Fi Alliance received funding from the Bill & Melinda Gates Foundation to further

## About the Educator Preparation Data Model

The EPDM (formerly Teacher Preparation Data Model) extension enables comprehensive data aggregation over the span of a educator's entire career, from application to and enrollment into an EPP, through knowledge and skills demonstrated in fieldwork experiences, to placement and performance as an in-service educator. Educator preparation programs (EPPs), State education agencies (SEAs), Local education agencies (LEAs), and schools can access and review data through automated data connections to develop strategies to ensure educators are prepared to meet the needs of their students.

The Ed-Fi Alliance in November of 2021 released the EPDM Community and EPDM Core options for the EPP community. /wiki/spaces/GOV/pages/20334458 describes the additions and revisions identified to move a set of entities from the EPDM model into the Ed-Fi Standard- based on Ed-Fi EPP Starter Kit use cases. The  following provides a conceptual overview of the EPDM and the basic technology facts useful for those considering or starting a EPDM based implementation project:

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
| Install the Ed-Fi ODS/API platform v5.3 (defaults to including EPDM-Core extension) | EPDM-Community: Install the Ed-Fi ODS/API platform v5.3, but change the EPDM extension to be installed to EPDM-Community. This is done by following these [installation instructions](#). |

### Visual Representation

#### EPDM-Core

![EPDM-Core](https://edfidocs.blob.core.windows.net/$web/img/getting-started/epp/overview/epdm_core.png)

#### EPDM-Community

![EPDM-Community](https://edfidocs.blob.core.windows.net/$web/img/getting-started/epp/overview/epdm_community.png)

More details about [TPDM-Core](https://techdocs.ed-fi.org/display/ETKB/TPDM-Core+Details) and [TPDM-Community](https://techdocs.ed-fi.org/display/ETKB/TPDM-Community+Details).

## ​Changing the EPDM model installed

If you start with EPDM-Core, and decide later that you need EPDM-Community, you can make the change by installing a new instance of the ODS/API and following the install instructions.​

If you have already loaded data, the choices are:​

You can re-load data into the ODS/API without changes (since EPDM-Core is a strict subset) ​
If data can’t be reloaded for some reason, it would be possible to write database scripts to migrate data – but this would incur some additional time/cost​

## Future Plans

The Alliance plans to continue to work with the EPP community to identify further entities that are mature enough to move into Ed-Fi Core.

The following are resources for getting information and engaging in the process:

* [Ed-Fi Community Governance](https://edfi.org/community-governance/) – for convening the community and sharing information.
* [Ed-Fi Technology Roadmap](https://techdocs.ed-fi.org/display/ETKB/Roadmap) - for details on upcoming releases.
* [Ed-Fi Tracker](https://tracker.ed-fi.org/) – for submitting tickets.

## Links to resources and documentation

* [EPDM-Core Details](https://techdocs.ed-fi.org/display/ETKB/EPDM-Core+Details)
* [EPDM-Community Details](https://techdocs.ed-fi.org/display/ETKB/EPDM-Community+Details)
* [EPDM Technical Resources](https://techdocs.ed-fi.org/display/ETKB/EPDM+Technical+Resources)
* [Educator Prep Data Model Work Group](https://techdocs.ed-fi.org/display/ETKB/Educator+Prep+Data+Model+Work+Group)
* [Clinical Experience and Performance Starter Kit](https://techdocs.ed-fi.org/display/ETKB/Clinical+Experience+and+Performance+Starter+Kit)
* [Program Diversity and Persistence Starter Kit](https://techdocs.ed-fi.org/display/ETKB/Program+Diversity+and+Persistence+Starter+Kit)
* [Educator Preparation Resources](https://techdocs.ed-fi.org/display/ETKB/Educator+Preparation+Resources)
* [Ed-Fi Exchange Resources](https://techdocs.ed-fi.org/display/ETKB/Ed-Fi+Exchange+Resources)
  * [Educator Preparation Dashboards](https://techdocs.ed-fi.org/display/ETKB/Educator+Preparation+Dashboards) - A Collaborative EPP Dashboard project led by Crocus to gather requirements, feedback, and best practices from EPPs and partners.
  * [EPDM Implementation Resources](https://techdocs.ed-fi.org/display/ETKB/EPDM+Implementation+Resources)

:::tip
The Educator Pipeline is currently undergoing migration. [Reference to the previous overview can be found here](https://edfi.atlassian.net/wiki/spaces/EPP/pages/23170337/EPDM+Overview)

:::
