# Elements of an Ed-Fi Architecture

## Overview

Successful Ed-Fi architectures look similar in terms of technical processes. They also share underlying communications and governance processes.

![SEA Architecture Diagram](https://edfidocs.blob.core.windows.net/$web/img/getting-started/sea-playbook/implementation/SEA-Architecture.png)
_Figure 1. SEA Ed-Fi-based architecture_

## Elements of the Architecture

### SEA Data Specifications

State education agencies (SEAs) publish data specifications for technology providers so the technology providers can prepare to support Ed-Fi-based data collection. These specifications include Ed-Fi-defined elements and may also be extended.

We recommend 6-8 months for this step in advance of production.

![SEA Data Specifications](https://edfidocs.blob.core.windows.net/$web/img/getting-started/sea-playbook/implementation/sea-data-specs.png)

Figure 2. SEA data specifications

### Sandboxes for Vendors

Several months prior to entering production, SEAs should publish sandboxes that technology providers can use to prepare their API-based integrations. This is when tech providers should start their development work based on the new specifications.

![REST API Sandbox](https://edfidocs.blob.core.windows.net/$web/img/getting-started/sea-playbook/implementation/sis-sandbox.png)

Figure 3. SIS sandbox

### Data Flow to Production

When technology providers are ready and the school year begins, the system goes into production and near-real-time data begins to flow from districts to the state.

![Data Flow](https://edfidocs.blob.core.windows.net/$web/img/getting-started/sea-playbook/implementation/data-flowing.png)

Figure 4. Data flow

### SIS Integration

Once data is flowing, the state typically provides a submissions report that shows the district that data is flowing and the SIS provides back errors that result from data format errors or other errors that are detectable by the API.

![SIS Integration](https://edfidocs.blob.core.windows.net/$web/img/getting-started/sea-playbook/implementation/sis-integration.png)

Figure 5. SIS integration

### SEA Validations

SEAs periodically move data from the Ed-Fi ODS to an Ed-Fi ODS that is multiyear. This environment generally has some additional columns to allow for multiple years of data to be compared.

States make the decision to migrate to the multi-year environment and run validations either as a nightly process or as soon as the data lands in the Ed-Fi landing zone ODS.

In this environment, the states validate the data according to the state business rules and log the errors. Errors are reported back to the LEA via a state error portal. The LEA then fixes the errors, the data is re-transmitted to the API (generally in near-real-time) and the data quality improves.

![SEA Validations](https://edfidocs.blob.core.windows.net/$web/img/getting-started/sea-playbook/implementation/sea-validations.png)

Figure 6. SEA Validations

### State Longitudinal Data Warehouse System

States populate a longitudinal data warehouse system (SLDS) for their reporting needs. In some cases, this system is based on the Ed-Fi data model. In others, it is a third-party or existing agency system.

From the SLDS, states generate datamarts for state and federal reporting (such as EDFacts).

![State SLDS](https://edfidocs.blob.core.windows.net/$web/img/getting-started/sea-playbook/implementation/SLDS-datamarts.png)

Figure 7. State SLDS

## Individual State Architectures

Some states running on Ed-Fi have shared their architecture diagrams to guide new users! These are provided below.

### Arizona

![Arizona architecture diagram](https://edfidocs.blob.core.windows.net/$web/img/getting-started/sea-playbook/implementation/Slide1.jpg)

Figure 8. Arizona architecture diagram

### Indiana

![Indiana architecture diagram](https://edfidocs.blob.core.windows.net/$web/img/getting-started/sea-playbook/implementation/Slide2.jpg)

Figure 9. Indiana architecture diagram

### Nebraska

![Nebraska architecture diagram](https://edfidocs.blob.core.windows.net/$web/img/getting-started/sea-playbook/implementation/Slide3.jpg)

Figure 10. Nebraska architecture diagram

### Wisconsin

![Wisconsin architecture diagram](https://edfidocs.blob.core.windows.net/$web/img/getting-started/sea-playbook/implementation/image2019-8-9_13-38-31.png)

Figure 11. Wisconsin architecture diagram
