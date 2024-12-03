# AMT Collections

The Analytics Middle Tier contains a [core collection of views and configuration
tables](./core-view-collection/readme.md) that are always installed.
The core collection provides views for a robust set of common use cases.

The Analytics Middle Tier also provides optional collections that can be
installed at any time. Each of these optional collections is tuned to a specific
use case, and therefore may have logic that is not appropriate for other use
cases. The [AMT Deployment
Guide](../../deployment-guide/readme.mdx) describes the
process of deploying a use-case specific collection. Each collection has a
formal name and short code name which is used during the deployment process
(e.g. "EWS" for the "Early Warning System" collection).

The following table shows the optional collections:

| Install Code | Full Name | When to Use |
| --- | --- | --- |
| RLS | [Row-Level Security](./row-level-security-collection/readme.md) | _Can be used to assist in securing an end-user application by restricting access to student information at the level of the district (LEA), school, or section.<br/>_   ​Required for the [https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22487840](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22487840). |
| ​EWS | [Early Warning System​](./early-warning-system-collection/readme.md) | _​Required for the [https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22487840](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22487840).<br/>_   Note, a separate collection to support the AWS QuickSight EWS Starter Kit can be found [https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22488932](https://edfi.atlassian.net/wiki/spaces/EXCHANGE/pages/22488932). |
| CHRAB | [Chronic Absenteeism](https://edfi.atlassian.net/wiki/display/EDFITOOLS/Chronic+Absenteeism+Collection) | _Required for the [Chronic Absenteeism Quick Start Guide for Metabase](https://github.com/Ed-Fi-Exchange-OSS/Ed-Fi-MetabaseChronicAbsenteeismQuickStart)<br/>_   Can be used to evaluate chronic absenteeism as described in [CHRONIC ABSENTEEISM IN THE NATION'S SCHOOLS: A hidden educational crisis](https://www2.ed.gov/datastory/chronicabsenteeism.html) by the U.S. Department of Education. |
| ASMT | [Assessment](https://edfi.atlassian.net/wiki/display/EDFITOOLS/Assessment+Collection) | _Required for the Assessment Starter Kit<br/>_   Can be used to see students scores, performance levels, and learning standards across assessments and objective assessments |
| EQUITY | [Student Equity](https://edfi.atlassian.net/wiki/display/EDFITOOLS/Student+Equity+Collection) | _Required for the Student Equity Starter Kit<br/>_   Includes student discipline, feeder schools, student food service programs, and student history. |
| ENGAGE | [Student Engagement](./engage-online-learners-collection/readme.md) | _Required for the Engage Online Learners Starter Kit<br/>_   Includes student assignment and student assignment submission information. |
| EPP | [Educator Prep Program](https://edfi.atlassian.net/wiki/display/EDFITOOLS/Educator+Preparation+Collection) | _Clinical Experience and Performance Collection <br/>_   Program Diversity and Persistence |

## Contents

* [Core View Collection](./core-view-collection/readme.md)
* [Row-Level Security
    Collection](./row-level-security-collection/readme.md)
* [Assessment Collection](./assessment-collection/readme.md)
* [Chronic Absenteeism
    Collection](./chronic-absenteeism-collection/readme.md)
* [Early Warning System
    Collection](./early-warning-system-collection/readme.md)
* [Engage Online Learners
    Collection](./engage-online-learners-collection/readme.md)
* [Student Equity Collection](./student-equity-collection/readme.md)
* [Installation Journal
    Tables](./installation-journal-tables.md)
* [Educator Preparation
    Collection](./educator-preparation-collection/readme.md)
