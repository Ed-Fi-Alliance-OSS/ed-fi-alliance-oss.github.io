# Best Practices for Coordinating with Technology Providers

## Overview

This document summarizes recommended best guidance for states in working with Technology Providers, such as Student Information Systems (SIS) or assessment providers.

## Strive for a Working Relationship with Vendors

Your state should target creating a strong working relationship with the vendor community in your state. In particular, vendors can be critical partners in helping your state understand how to most efficiently map data and reduce burden on the LEAs in the state.

Using API-based data exchanges means that 2 systems are **directly connected** and exchanging data; this is in contrast to many file-based exchanges where data flows through an intermediary and can be – and often is – corrected, amended or otherwise touched in the middle of moving between organizations or systems. Connecting vendor systems directly to your systems increases the importance of working with these vendors directly.

## Communicate Early and Iterate

Your technology providers or vendors need to time to plan for integrations and to code. Most technology providers use short, highly iterative development cycles.

It is best to release information to your technology providers as early as possible and to follow these early releases with increasingly specific API information, rather than waiting to do a single “big reveal” of your API plans. This allows vendors to plan resources, get started, and work iteratively.

## Create Regular Online Interaction

SEAs and their tech providers have reported vastly better experiences working together on Ed-Fi when the states hold regular meetings, so the tech providers can ask questions about technical or data model definitions and details. These meetings have been regarded as a significant help in “unblocking” tech providers, and also in developing state understandings of community readiness for API usage.

During peak development times, you should take part in a weekly, one-hour meeting with all technology providers staffed by the SEA project leads.

## Publish the Resources to Vendor's Need to Perform API Development

Helping vendors with their development efforts is critically important. While some vendors are experienced with Ed-Fi technology and Ed-Fi-based data flows, every state and region will have some vendors who are not. In addition, there remains a strong network of smaller technology providers in K-12 for whom API-based data exchange will be new and challenging. States need to support these organizations in particular.

There is a lot of best practice in this area, so it has been separated into its own page; see [Vendor Support - Technical Resources to Support API Development](../support-plan/vendor-support-technical-resources-to-support-api-development.md)

## Publish a Data Portal or “Clearinghouse” for All Vendor Info

Along with sandboxes, SEAs typically provide a public portal that contains all data on API data models and interaction requirements. This data needs to include both the data model information typical of state data collection efforts, and the technical information needed by API client developers. For the latter, [our Docs reference](/reference) can often be a good source of info, but it is best to identify and refer to specific pages rather than linking to the Docs home page.

## Align Closely to Ed-Fi's Standards and Get Help

Your state data specifications should align closely to Ed-Fi's standards. Doing so will assist vendors and in the process lead to a more predictable and smooth modernization process for your state.

If your standards don't align closely, you increase vendor development work which increases their support burden as well as increases bugs and errors that impact you. It also makes it more difficult for you to share tools and best practice with other states who use Ed-Fi.

Below are a few recommended points for in this area.

### Engage a Managed Service Provider or Ed-Fi Integrator

These professionals will have knowledge of how to map your state data needs into Ed-Fi, avoiding many errors common among new states. They can also do this work considerably faster. They are a more efficient path for you, and they also help the health of the overall vendor ecosystem by increasing alignment of data to Ed-Fi's standards.

### Avoid adding entities that duplicate entities already in the Ed-Fi model

In API integrations, it can be tempting to copy elements of the existing state data collection system into your Ed-Fi-based specifications. But doing so can result in cases where there is both an Ed-Fi core entity and your entity that share the same semantics. This duplication causes confusion for API client developers and also reduces the ability of a tech provider to reuse production-quality code and mappings across states. For SEAs, these custom integrations result in lower data quality and API errors.

### When extending the APIs, ask for granular, not aggregate data

Similar to the above point, it can be very tempting to ask for aggregate data when extending the Ed-Fi APIs. As an example, if a state needs to know the number of days a student was in attendance for a grading period, why not just extend the model to ask for this aggregate number?

The Ed-Fi model is built on the notion that granular data is inherently more useful and informative, and also on the vision of establishing industry-wide data exchange models where all systems benefit from standardization. Aggregate data makes both more difficult. In the above example, different states may have different ways of counting absences; does a medical release or home-bound day constitute an absence? How about a student's early release?

Aggregate fields often require specific business rules that result in complex, state-specific logic falling on the API client, and this reduces the reusability of API client code across state boundaries. As a result, the ecosystem does not enjoy the benefits of standardized data exchange, and this means lower data quality for your agency.
