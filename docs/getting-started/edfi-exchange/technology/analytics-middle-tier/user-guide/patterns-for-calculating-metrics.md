# Patterns for Calculating Metrics

## Overview

In the K–12 space, metrics include concepts such as attendance and grade point
average - values that can be calculated from granular data in the ODS. States
and districts will have differing business rules for calculating metrics. For
example, one state might count attendance "at school," while another might look
at attendance "in all classes" for the day, and yet another might look to a
student's presence in a specific "homeroom." For examples of metrics
calculations using the dimensional views, see the [Early Warning
System](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Analytics-Middle-Tier/blob/main/docs/early-warning-system.md) samples.

## Calculations in SQL Server

Skilled developers can easily perform calculations/aggregations in Transact-SQL
running in the database hosting the Analytics Middle Tier views. Taking this
approach would strongly reinforce the need to adopt one or more of the solutions
listed above for limiting negative impact on the production ODS performance.
Samples queries calculating various metrics are demonstrated in the [Early
Warning
System](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Analytics-Middle-Tier/blob/main/samples/RiskIndicators.sql) scripts.

Where a BI tool has an advanced analytics engine, we recommend preferring it for
these calculations rather than running them in SQL Server. The Analytics Middle
Tier source code attempts to minimize the use of formulas, emphasizing instead
the reshaping of data into a model that is more easily consumed by the BI tool
of choice.

## Calculations in the Analytics Engine

Analytics engines in modern BI platforms have powerful capabilities for
aggregating large volumes of data and applying filters. These capabilities may
be closely connected with their use of database engines optimized for high
performance querying. When the BI tool is configured to import data into its own
database (see, e.g., [Analytics Engine
Caching](../deployment-guide/limiting-impact-on-the-production-ods.md)),
that tool's native capabilities should be leveraged for calculating metrics.

For example, Microsoft's SQL Server Analysis Services (SSAS) has a powerful
database product, the Tabular Data Model. A data model created with this tool
can incorporate metrics written using the DAX scripting language. Taking the
approach of first importing the Analytics Middle Tier views into a Tabular Data
Model, and then building metrics in DAX, is a highly efficient solution for
delivering data to presentation layers built in tools including Excel
PowerPivot, PowerBI, Tableau, and Vertica.

Non-Microsoft solutions typically have similar, and equally powerful,
capabilities for creating calculated fields and calculated tables. In some
cases, however, the analytics engine's ability to perform calculations on the
data model provided by the Analytics Middle Tier may be limited to simple
aggregations. Calculated tables and more complex formulas may be difficult or
impossible to represent in some tools. When this is the case, some calculations
might need to be offloaded into SQL before importing data into the analytics
database.

As a case in point, in the Alliance's proof-of-concept work using Amazon
QuickSight, the SPICE in-memory engine was found to be highly capable of
calculating aggregations and trends using the dimensional views, but further
transformation in SQL was required in order to develop risk indicators based on
calculations. In other words, we did not see a way to create a calculated field
("risk indicator") based on another calculated field ("average math grade").
Additional custom views, deployed in addition to the Analytics Middle Tier
views, were used to get to the desired risk indicator measures.
