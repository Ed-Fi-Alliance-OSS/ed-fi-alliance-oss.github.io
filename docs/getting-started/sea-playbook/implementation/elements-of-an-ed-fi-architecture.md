# Elements of an Ed-Fi Architecture

## Overview

Successful Ed-Fi architectures look similar in terms of technical processes. They also share underlying communications and governance processes.

![SEA Architecture Diagram](https://edfi.atlassian.net/wiki/download/thumbnails/22905876/SEA-Architecture.png?version=2&modificationDate=1709073064803&cacheVersion=1&api=v2&width=1280&height=629)
_Figure 1. SEA Ed-Fi-based architecture_

## Elements of the Architecture

### SEA Data Specifications

State education agencies (SEAs) publish data specifications for technology providers so the technology providers can prepare to support Ed-Fi-based data collection. These specifications include Ed-Fi-defined elements and may also be extended.

We recommend 6-8 months for this step in advance of production.

![SEA Data Specifications](https://edfi.atlassian.net/wiki/download/thumbnails/22905876/sea-data-specs.png?version=1&modificationDate=1568392621383&cacheVersion=1&api=v2&width=341&height=344)

Figure 2. SEA data specifications

### Sandboxes for Vendors

Several months prior to entering production, SEAs should publish sandboxes that technology providers can use to prepare their API-based integrations. This is when tech providers should start their development work based on the new specifications.

![REST API Sandbox](https://edfi.atlassian.net/wiki/download/thumbnails/22905876/sis-sandbox.png?version=1&modificationDate=1568392688383&cacheVersion=1&api=v2&width=250&height=246)

Figure 3. SIS sandbox

### Data Flow to Production

When technology providers are ready and the school year begins, the system goes into production and near-real-time data begins to flow from districts to the state.

![Data Flow](https://edfi.atlassian.net/wiki/download/thumbnails/22905876/data-flowing.png?version=1&modificationDate=1568392490047&cacheVersion=1&api=v2&width=335&height=553)

Figure 4. Data flow

### SIS Integration

Once data is flowing, the state typically provides a submissions report that shows the district that data is flowing and the SIS provides back errors that result from data format errors or other errors that are detectable by the API.

![SIS Integration](https://edfi.atlassian.net/wiki/download/thumbnails/22905876/sis-integration.png?version=1&modificationDate=1568392374287&cacheVersion=1&api=v2&width=460&height=464)

Figure 5. SIS integration

### SEA Validations

SEAs periodically move data from the Ed-Fi ODS to an Ed-Fi ODS that is multiyear. This environment generally has some additional columns to allow for multiple years of data to be compared.

States make the decision to migrate to the multi-year environment and run validations either as a nightly process or as soon as the data lands in the Ed-Fi landing zone ODS.

In this environment, the states validate the data according to the state business rules and log the errors. Errors are reported back to the LEA via a state error portal. The LEA then fixes the errors, the data is re-transmitted to the API (generally in near-real-time) and the data quality improves.

![SEA Validations](https://edfi.atlassian.net/wiki/download/thumbnails/22905876/sea-validations.png?version=1&modificationDate=1568393271870&cacheVersion=1&api=v2&width=454&height=710)

Figure 6. SEA Validations

### State Longitudinal Data Warehouse System

States populate a longitudinal data warehouse system (SLDS) for their reporting needs. In some cases, this system is based on the Ed-Fi data model. In others, it is a third-party or existing agency system.

From the SLDS, states generate datamarts for state and federal reporting (such as EDFacts).

![State SLDS](https://edfi.atlassian.net/wiki/download/thumbnails/22905876/SLDS-datamarts.png?version=1&modificationDate=1568393581647&cacheVersion=1&api=v2&width=550&height=356)

Figure 7. State SLDS

## Individual State Architectures

Some states running on Ed-Fi have shared their architecture diagrams to guide new users! These are provided below.

### Arizona

![Arizona architecture diagram](https://edfi.atlassian.net/wiki/download/thumbnails/22908223/Slide1.jpg?version=1&modificationDate=1707943685407&cacheVersion=1&api=v2&width=1280&height=720)

Figure 8. Arizona architecture diagram

### Indiana

![Indiana architecture diagram](https://edfi.atlassian.net/wiki/download/thumbnails/22908223/Slide2.jpg?version=1&modificationDate=1707943685490&cacheVersion=1&api=v2&width=1280&height=720)

Figure 9. Indiana architecture diagram

### Nebraska

![Nebraska architecture diagram](https://edfi.atlassian.net/wiki/download/thumbnails/22908223/Slide3.jpg?version=1&modificationDate=1707943685507&cacheVersion=1&api=v2&width=1280&height=720)

Figure 10. Nebraska architecture diagram

### Wisconsin

![Wisconsin architecture diagram](https://edfi.atlassian.net/wiki/download/thumbnails/22908223/image2019-8-9_13-38-31.png?version=1&modificationDate=1707943685523&cacheVersion=1&api=v2&width=1280&height=724)

Figure 11. Wisconsin architecture diagram
