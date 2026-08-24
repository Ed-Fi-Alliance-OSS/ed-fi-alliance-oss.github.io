# Education Nexus Broker

![EdNexus Logo](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ednexuslogo.png)

## Description

Web application to facilitate the transfer of student records. The Broker extracts data from sources as defined for each district using the connectors installed for each Broker. And then those same connectors facilitate the transforming and loading of that data into the destination SIS.

## Download

* [**Broker Repo:**](https://github.com/ednexusdata/broker-app) This is the main application repo. Releases are available for download in the repo and can either be downloaded or deployed as part of a container image hosted on GitHub.

* [**Community Ed-Fi Connector:**](https://github.com/ednexusdata/broker-connector-edfi) The Broker understands how to communicate with systems using connectors. This is the Ed-Fi connector that can be installed in the Broker. Its job is to extract data from Ed-Fi ODSes.

* [**Build Your Own Connector:**](https://github.com/ednexusdata/broker-common) This repository is the base library used to build connectors. The broker application references types in this repository to understand the brokers that are

## Details

* **By:**  [Education Nexus](https://ednexusdata.org/)
* **License terms:** [PolyForm Noncommercial License 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0/)
* **Released:** September 2025
* **For**: ODS/API 5.4, 6.x, 7.x
