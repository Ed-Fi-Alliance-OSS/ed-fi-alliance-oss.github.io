---
sidebar_position: 2
---

# Guidance on Multi-Year Data in ODS

This article provides essential information for education agencies and other
platform hosts to understand limitations of storing multiple years of data in a
single ODS and provides guidance on how to solve for multi-year use cases.

## Recommendation

The Ed-Fi Alliance recommends that implementers use the ODS for single year data
collection, regardless of ODS deployment mode used.

There may be applicable cases where multiple years of data can be collected in
the ODS, but agencies are cautioned to understand limitations of that deployment
model before using that model.

## ODS Deployment Modes

The ODS / API provides multiple deployment options for segregating data in the
ODS. When setting up Ed-Fi ODS / API environment intended for production data
collection, implementers have the option to configure the API to run on Shared
Instance, Year Specific, District Specific or Instance-Year Specific modes. See the [Extensibility & Customization](../platform-dev-guide/extensibility-customization/readme.md) section for details.

While none of the modes prevent multi-year data being stored in the ODS, some of
the modes (i.e., Year Specific) are more aligned with single year data capture
with year-based ODS naming convention and separate year-specific API URL, others
(i.e., Shared Instance, District Specific) do not provide clear indication of
whether data in the ODS spans across multiple years.

## Rationale for Single-year Collection

The following are key reasons behind the recommendation to use the ODS for
single-year collection only.

* **Vendor data integration issues in second year and beyond:** Ed-Fi API specifications and certifications assume and require single-year
data feeds from vendor systems only. In an ODS database that spans multiple years,
a vendor systems attempting to synchronize data with the API will read back from
the API multiple years of data, and this causes various problems in the SIS
synchronization, such as attempts to delete older records not in the current year
vendor system.
* **Data over-writes in second year and beyond:** as the Ed-Fi data model is not fully multi-year (because it mirrors the SIS
database, which is generally also not fully multi year), some data elements will
be over-written in the ODS's second year with current year values.*
* **Query performance issues:** over time, the accumulation of data in a single database across many years
will degrade query performance, slowing report and analytics generation.
* **Inability to pick up new releases without complex and possibly risky data
migrations:** agencies who use a multi-year databases tend to have trouble moving to newer
releases of the ODS, as doing so requires data migration. By staying on older
versions, this also increases ecosystem fragmentation, as vendors are forced to maintain multiple API versions. At scale,
fragmentation threatens the overall Ed-Fi mission.
* **Can create additional complexity for data analysts:** keeping data in a single datastore as a way of managing complexity is
appealing. However, in practice this forces analysts to use more complex and monolithic
data schemas, as opposed to simpler data schemas that are aligned to the trends
and analytics the agency is actually tracking.
* **General misalignment with industry best practice in data management:** data management best practice is generally to separate operational and
historical data due to the complexity combining it creates (see all reasons above).

*Note: it is tempting to argue that the solution is to make the Ed-Fi model
multi-year. However, pursuing so that ends up offloading additional complexity onto
the SIS as the SIS now has to now explicitly version entities for the API that
are only implicitly versioned (by school year)  in the SIS. This complexity also
affects business analysts and others who have to use the ODS database. This
strategy ends up mixing operational and historical data into a very "muddled"
schema optimized for neither case.

## What Does a Multi-Year Deployment Look Like?

Following configurations show how multiple years of data can be collected using
Ed-Fi technology where each ODS collects data for single school year and data
for multiple years can be brought together downstream at the data warehouse layer.

![Multi-Year Configuration](https://edfi.atlassian.net/wiki/download/thumbnails/22775315/Possible%20Multi-Year%20Configuration.jpg?version=2&modificationDate=1645806730337&cacheVersion=1&api=v2&width=1280&height=399)

## End of Year Considerations

When configurating your ODS to collect "single-year" data, there are a few of
things to consider during yearly rollover process:

| End of Year Rollover | Details |
| --- | --- |
| Determination of need for continued API access of prior year ODS | <ul><li>Once API access to prior year data is no longer needed, the API can be taken down.</li></ul> |
| Deploy new ODS / API school year ODS | <ul><li>Consider upgrading to ODS / API to stay close to the latest data model.</li><li>The Deployment process should be updated to include the new year ODS.</li><li>Updated Security for new or changing vendor/district pairings should be set up.</li></ul> |
| Load or migrate initial data | <ul><li>Any data that can be migrated from the prior year should be migrated at this point. Descriptors, and Education Organization Data valid for the new year should be loaded, if your agency is handling that responsibility (some SIS systems may do this work instead - consult your SIS for the support they offer)</li></ul> |
| Inform vendors of new URL | <ul><li>If there is a change in the API URL, vendors will need to be made aware when the new school year ODS is available.</li></ul> |
| Open collection for new year | <ul><li>Vendors begin submissions for new school year collection</li></ul> |

## Possible Uses for Multi-Year Data in Single ODS

In ODS implementations where only very limited data elements are being used, and
where those elements are natively multi-year in the Ed-Fi data model (generally
because they are natively multi-year in the source system as well), a
multi-year database / deployment model may work OK.

For example, if an agency is just collecting a limited set of assessment data,
this pattern may work well enough, as assessment data is very "event-based" and
therefore is largely natively multi-year.

Although collecting multiple years of data may work in these use cases, it is
still not recommended as it will have some of the limitations listed above. In
particular, this model will also discourage agencies in updating to newer ODS
versions, which increases ecosystem and vendor fragmentation.
