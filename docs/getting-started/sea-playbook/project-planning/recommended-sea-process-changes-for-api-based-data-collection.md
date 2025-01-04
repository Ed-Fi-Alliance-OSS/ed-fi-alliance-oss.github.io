# Recommended SEA Process Changes  for API-based Data Collection

## Overview

Making the transition to Ed-Fi involves more than implementing a new technology and open standard –  it also requires SEAs to re-think and re-engineer their processes. This document covers key differences between SEA process for legacy file-based collection systems and those for API-based systems.

Using Ed-Fi Standards to facilitate the flow of data from vendor systems to the state means that there are **no longer LEA staff who can manually fix files or make changes to submission files**. This is a critically important process change and its impacts can be hard for SEA teams to understand at first. This document will help guide SEA teams through this change.

Not only are there important process changes, but there are benefits to SEAs in this re-thinking: making changes can allow the state to harness the power of a near-real-time data feeds.

It is critical that states start the work of redesigning their process in the planning phase, as states need to alter the timelines and practices they are accustomed to.

## SEAs should handle data snapshots and avoid "as-of" dates in their specifications

In file-based collections, it is common for states to ask for data as it was on a certain date - e.g.

_send all student school enrollments as of October 10_
or
_send student school attendance for the first Tuesday of each month_

While these requirements make sense for a file-based system, they are not needed – in fact they are problematic – in an API-based system.

Ed-Fi's specifications are designed and intended to provide an ongoing, regular (and if needed near real-time) synchronization between IT systems, where the data provided is the data as it exists _at the current moment_ in the source system. To ask for "as-of" date logic introduces considerable complexity into the LEA and vendor experience. It creates complexity for vendors, and forces these vendors to add custom state-specific logic to their Ed-Fi implementations. These drive up costs for vendors and, ultimately, for LEAs.

Rather than use "as-of" dates, the recommendation is for the SEA to perform snapshots on their data at the milestones called for by their policies. This is consistent with the design and intent of Ed-Fi's API standards.

## Re-thinking reporting windows

Related to the recommendation on avoiding "as-of" dates, states are also encouraged to re-think the use of reporting windows and major milestones, and instead move towards a reporting cadence that is ongoing and reduces the reliance on "key moments" in the school year.

In a file-based collections system, to require LEAs to submit data in a particular area – say student enrollment or attendance – many times a year would have been very burdensome.

However, in a system based on Ed-Fi APIs that uses a direct system-to-system communication, systems are able to regularly and automatically synchronize. This can have several benefits:

* Rather than the system pushing LEAs to meet major milestones, LEA staff can manage towards a series of smaller milestones, reducing stress and your agency's need to intervene or fix LEA data issues after these milestones
* It reduces the infrastructure costs for SEA systems by distributing the API transaction load more evenly. Major milestones lead to lots of re-synching – often unnecessary – of LEA systems that lead to higher costs for IT hosting services
* It encourages regular maintenance of data quality by LEAs. Major milestones mean that locally the data only has to be correct on a certain date once a year. This points schools in the wrong direction: SEA want their states to have a healthy data ecosystem where data in LEA systems is well-maintained and accurate throughout the school year.

It might be useful to consider the experience of Arizona Department of Education - see the blurb below.

:::info Case Study: Arizona Department of Education
When the Arizona DOE made the transition to Ed-Fi, they changed many of their reporting milestones from annual to monthly.

At the conclusion of each month, the state would snapshot the data (per the recommendation above) and use that data for SEA reporting, including calculations of state aid to the LEAs.

This monthly cadence meant that local data staff were encouraged to maintain data in an ongoing basis rather than build towards a few large, critical milestones.

It also meant that mistakes LEAs might make were limited in impact - if a LEA counts were off, the LEA could correct that in the subsequent month. This reduced the demand on the SEA for remediation processes.

Important to Arizona's success was also its data portal that clearly showed each LEA exactly what their reporting data looked like and how that data would be used.
:::

## Timelines and release patterns must consider vendor software release cycles

In a file-based collections system, the SEA collection specifications releases or updates can be made closer to key collection milestones. What makes this possible is the ability of LEA staff to make manual changes to submission files, even just prior to a submission window or milestone.

In an API-based data collections system, this human intervention is no longer possible: there are no longer any files an LEA data steward can modify. This changes the patterns and timelines for SEA specifications changes and releases.

What is important to realize is that changes must be made early enough so that vendors can develop and release their changes. Whereas before late changes were possible because the rate-limiting step was educating the LEA collections coordinator – i.e., weeks –  now the rate-limiting step is the need of the vendor to redevelop their API implementation and deploy that software out to their schools – i.e., months, a software development cycle.

In the [State Education Agencies - Implementation Playbook](../../readme.md) the Ed-Fi Alliance publishes recommended lead times for publishing vendor specifications; these timelines have been proven to help create successful Ed-Fi implementations.

## The SEA data portal

In a file-based collections system, LEAs will be more aware of the exact data they are submitting to the SEA, as LEA staff have the ability to view and manually modify file submissions. In a API-based system, LEAs no longer have that option, and this puts more responsibility on the SEA to develop a data portal that lets LEA staff understand their state submissions.

The data portal provided by the SEA should perform these functions for the LEA:

1. Allow the LEA to see what data has been submitted. Of particular importance are the counts that are important to compliance reporting and funding
2. Allow the LEA to understand the impacts of the data or how the data will be used. For example, if the data is being used to calculate funding or a particular policy metric, the SEA should show those outcome values
3. See when the data was last updated or when a snapshot was taken

Ideally, the data portal also allows a LEA to re-run validations or calculations, if these are only run periodically. That functionality needs to be provided at the SEA's discretion, as such functions can be computationally intensive. However, these will permit a LEA more control and improve accuracy of their submissions.

Without the above elements, LEAs are more likely to open support requests and more likely to experience the submissions process as higher stress.

## Case Study: WI DPI WISE Data Portal

Wisconsin DPI WISE Data Portal - follow link for details: [https://dpi.wi.gov/wisedata/help/mini-tutorials/wdp-homepage](https://dpi.wi.gov/wisedata/help/mini-tutorials/wdp-homepage)
