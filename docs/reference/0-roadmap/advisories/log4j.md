---
sidebar_position: 9
---

# Advisory: Analysis of the Log4j Vulnerability CVE-2021-44228

15 December 2021

## Introduction

As described in NIST vulnerability report
[CVE-2021-44228](https://nvd.nist.gov/vuln/detail/CVE-2021-44228), certain
versions of Log4j contain a CRITICAL security vulnerability.

Log4j is a widely used logging framework for Java applications. Fortunately, the
Ed-Fi product portfolio has very little Java code in it. Many of Ed-Fi's .NET
Framework-based applications use log4net, which was originally based on Log4j.
However, NIST confirms that log4net is not impacted:

_"Note that this vulnerability is specific to log4j-core and does not affect
log4net, log4cxx, or other Apache Logging Services projects."_

## Vulnerability Assessment

### Core Ed-Fi Products

None of these products is subject to the Log4j vulnerability.

| Ed-Fi Asset                             | Main Language       | Uses Log4j |
| --------------------------------------- | ------------------- | ---------- |
| ODS / API Platform, Suite 2 and Suite 3 | C#                  | No         |
| MetaEd IDE                              | JavaScript          | No         |
| MappingEDU                              | AngularJS + C# .NET | No         |
| Sample Data Generator                   | C#                  | No         |
| Analytics Middle Tier                   | T-SQL               | No         |
| Admin App                               | C#                  | No         |
| Data Import                             | C#                  | No         |
| LMS Toolkit                             | Python              | No         |
| Learning Standards Sync Utility         | C#                  | No         |
| Docker Deployment                       | Docker              | No         |
| Migration Utility                       | C#                  | No         |
| Tech Suite Installer                    | InstallShield       | No         |

### Ed-Fi Exchange Contributions

After a manual scan through the solutions posted to the [Ed-Fi
Exchange](http://exchange.ed-fi.org), one was found that is potentially
vulnerable: [Chronic Absenteeism Quick Start
(Metabase)](http://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22493734/Chronic+Absenteeism+Quick+Start+Metabase).

Metabase is a business intelligence tool built on Java, and it does use Log4j.
Metabase has published [their own security
advisory](https://github.com/metabase/metabase/security/advisories/GHSA-vmm4-cwrm-38rj)on
this with information on how to upgrade or work around the problem. The
maintainer of this Exchange contribution has been notified of the need to
upgrade.

### Popular in the Ed-Fi Community

:::info

The following is community-sourced information. The Ed-Fi Alliance does not
directly support these products and does not make any guarantees about the
accuracy of the statements below or the stated claims for security. The
following is provided for informational purposes only and is not to be relied
upon in lieu of direct and independent analysis.

:::

| Asset                                                       | Programming Language | Uses Log4j                                                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ​**Swagger Code Generation Tool** (for SDK auto-generation) | Java​                | ​**Yes.** SmartBear [is researching](https://smartbear.com/security/cve-2021-44228/) the impact on their tools. Ed-Fi's analysis: unlikely to be a problem, since this is a command-line tool that does not operate over the Internet.                                                                             |
| **TeamCity**                                                | Java                 | **Yes.** [JetBrains states](https://youtrack.jetbrains.com/issue/TW-74298) that TeamCity is safe from this attack. However, this might not apply to all plugins (see below).                                                                                                                                       |
| **Octopus Deploy**                                          | .NET                 | While Octopus Deploy itself does not use Log4j, **the Octopus Deploy plugin for TeamCity _does_ use it.** Please see [this advisory](https://advisories.octopus.com/adv/2021-12---Octopus-Deploy-TeamCity-Plugin-log4j2-dependency.2306410241.html)for more information on mitigating this attack vector. |
