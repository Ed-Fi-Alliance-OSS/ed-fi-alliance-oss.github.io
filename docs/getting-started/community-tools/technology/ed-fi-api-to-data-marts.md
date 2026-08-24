# Ed-Fi API to Data Marts

![K12 Analytics Engineering](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/Logo%20-%20Copy.png)

## Description

This repository contains code that pulls data from a target Ed-Fi API and creates data marts in BigQuery that serve the analytics use case.

Demonstration video: [https://youtu.be/A1a7C9pDVL4](https://youtu.be/A1a7C9pDVL4)

More specifically, this repository is a Dagster workspace that contains a job designed to:

* Extract data from a set of Ed-Fi API endpoints
* Store the data as JSON files in a cloud based blob storage service
* Query the JSON files from a cloud data warehouse to produce:
  * Tables that represent the Ed-Fi API endpoints
  * Dimension and fact tables

## Download

* **Code:** [https://github.com/K12-Analytics-Engineering/dagster](https://github.com/K12-Analytics-Engineering/dagster)
* **Documentation: [https://github.com/K12-Analytics-Engineering/dagster](https://github.com/K12-Analytics-Engineering/dagster)**

## Details

* **By:** [Alcozer Consulting](https://www.alcozer.dev/)
* ****License terms:**** Apache 2.0
* **Released:** December 2021

## **At a Glance**

**Generation:** Tech Suite 3
