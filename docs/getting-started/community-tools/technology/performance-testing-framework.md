# Performance Testing Framework

![Ed-Fi Logo](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/image.png)

## Description

This test suite provides two suites of performance tests for the ODS/API version 5.1, 5.2, and 5.3: GET paging, and SIS Certification tests.

### GET Paging

 These tests execute GET requests across all selected resources, paging through all available data. This functionality therefore supports running before/after comparison testing on GET requests, which can help identify missing indexes, assess performance changes in the .NET code, or validate the effects of infrastructure changes (such as adding webserver load balancing or upsizing a virtual machine).

There are two ways to run these Paging Volume Tests:

* Directly run the [edfi-paging-test](https://github.com/Ed-Fi-Exchange-OSS/Suite-3-Performance-Testing/blob/main/src/edfi-paging-test) package against an ODS/API 5.1, 5.2, or 5.3 instance, running in any environment and with any database.
  * See the [README](https://github.com/Ed-Fi-Exchange-OSS/Suite-3-Performance-Testing/blob/main/src/edfi-paging-test/README.md) for details on how to run this tool.
* Or, call `run-tests.ps1` to capture additional Windows Server metrics and logging when running the ODS/API in IIS on Windows with SQL Server on the backend.
  * See the [User Guide](https://github.com/Ed-Fi-Exchange-OSS/Suite-3-Performance-Testing/blob/main/docs/user-guide.md) for a full description of requirements and run instructions.

### SIS Certification Tests

This test suite runs POST, PUT, and DELETE tests on the API resources used in the SIS Certification tests. They can be run in several different modes:

* Pipeclean - a fast test to ensure all of the endpoints are working
* Volume - runs many (configurable) clients in parallel for 30 minutes, thus simulating a large volume of simultaneous requests
* Load - volume testing with a larger client count
* Soak - longer-term volume testing with a mid-range client count
* Change Queries - runs through all of the change queries endpoints

There are two ways to run these tests:

* Directly run the [edfi-performance-test](https://github.com/Ed-Fi-Exchange-OSS/Suite-3-Performance-Testing/tree/main/src/edfi-performance-test) package against an ODS/API 5.1, 5.2, or 5.3 instance in any environment and with any database.
  * See the [README](https://github.com/Ed-Fi-Exchange-OSS/Suite-3-Performance-Testing/tree/main/src/edfi-performance-test) for details on how to run this tool.
* Or, call `run-tests.ps1` to capture additional Windows Server metrics and logging when running the ODS/API in IIS on Windows with SQL Server on the backend.
  * See the [User Guide](https://github.com/Ed-Fi-Exchange-OSS/Suite-3-Performance-Testing/blob/main/docs/user-guide.md) for a full description of requirements and run instructions.

## Download

* **Code:** [https://github.com/Ed-Fi-Exchange-OSS/Suite-3-Performance-Testing](https://github.com/Ed-Fi-Exchange-OSS/Suite-3-Performance-Testing)
* **Documentation:** [README.md](https://github.com/Ed-Fi-Exchange-OSS/Suite-3-Performance-Testing/blob/main/README.md)

## Details

* **By:** [Ed-Fi Alliance](https://exchange.ed-fi.org)
* **License terms:** Apache-2.0
* **Released: 17 Aug 2022**

## **At a Glance**

**Generation:** Tech Suite 3
**For:** ODS/API v5.1+
