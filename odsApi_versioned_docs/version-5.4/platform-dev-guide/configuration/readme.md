---
title: Configuration
---

# Configuration

Like most web applications, the Ed-Fi ODS / API has several configuration settings. Some configuration values, such as database connection strings, must be supplied for every instance. Others are optional and change the behavior of the system. This section provides an overview of the primary files that contain configuration settings.

Main configuration location is in the EdFi.Ods.WebApi project (found in the Ed-Fi-ODS-Implementation\Application\EdFi.Ods.WebApi directory of the ODS / API solution) contains the primary configurations for an instance of the Ed-Fi ODS / API. By customizing the appsettings.json you should be able to modify the API to suit your needs. appsettings.json includes settings for database connection strings database partitioning strategy and the settings that enable various configurable features. For more detail on the configuration files and the specific values, see the [Configuration Details](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774317/Configuration+Details) section of this documentation.

log4net.config includes logging configurations for the Ed-Fi ODS / API, see [Logging Configuration](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774324/Logging+Configuration) section for details.

## Security Configuration

In addition to the configuration settings above, the Ed-Fi ODS / API allows implementers to configure several aspects of the application security:

* **Claim Sets.** Changes to claim sets provide fine-grained access control over data accessible by clients.
* **API Profiles.** Profiles allow implementers to create data policy that specify exactly what access is allowed for particular kinds of client systems. For example, student information systems in an enterprise might require broad access to data, including students, grades, attendance, discipline incidents, assessment results, and so forth, while a gradebook application might only need access to student and gradebook data.

For more detail on the security aspects of the Ed-Fi ODS / API, see the [Security](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V54/pages/22774345/Platform+Dev+Guide+-+Security) section of this documentation.

