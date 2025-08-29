---
description: Guidance for usage of descriptors in the Ed-Fi Data Standard
---

# Descriptor Guidance

## Purpose and Scope

The term "descriptor" in the Ed-Fi Data Standard refers to data model elements that capture a controlled enumeration value. These are often referred to as "code sets" by those who manage the source systems from which Ed-Fi data originates. GradeLevel, AcademicSubject, and AttendanceEventCategory are all examples of Ed-Fi descriptors.

This document covers guidance for usage of descriptors in the Ed-Fi Data Standard. The Ed-Fi Data Standard provides for a conceptual model and standard REST API and other bindings for that conceptual model. However, Ed-Fi standards as a whole can and do include additional standards that provide additional normative rules and guidance, and those downstream rules and guidance can include additional prescriptions and guidance on the use of descriptors. If such downstream prescriptions exist, those must be followed. (See section below on "Specific API Prescriptions for Ed-Fi Values" for an example case).

These are the guidance for descriptor usage beyond any such prescriptions. These guidelines represent and are drawn from observations from production field work in which Ed-Fi-defined data is flowing between systems.

## Code Values and Definitions

Descriptor **code values** and **definitions** should be those that are needed to enable the core use cases for the data exchange context.

* If the context is a **individual local education agency (LEA)**, the code values should generally be the values as they appear in the source system. These are the values that LEA staff are accustomed to; switching values is generally disruptive. As the intent is not for data to flow outside of this context, other standardized values provide little new value.
* If the context is an **education service agency (ESA) or similar collaboration of LEAs** it is common for that organization to adopt a hybrid approach. For some descriptors, the managing organization will  develop values needed to enable the data services provided for those LEAs for some descriptors; for other descriptors, the services may be able to consume and use local code values. The managing organization will make this determination. See also the section below on descriptor mapping as a newer construct in the Data Standard to support multiple contexts.
* If the context is a **state education agency (SEA) and the use case is limited to state data collections**, states most often use the values they currently use in their data collections, in order to limit the change management burden for LEAs and vendors. However, modernization projects often lead to rethinking code sets, and that process may lead to development and use of new values.
* If a **state education agency is doing data collections and is also working to support local data interoperability for LEAs in the state**, then the state should work to align its descriptors with the needs of the ESAs or other organizations that are managing those local data services.
* In such a context, the goal is for both the state and the local education agency to share data specifications in order to limit the burden on vendors.
* As part of that responsibility, the state should work with the organizations within the state to manage descriptor sets to ensure the clarity and coherence of those sets for vendors and source system operators who must use them (including removing duplicate values, ensuring clarity of definitions /avoiding semantic overlap in definitions).
* See also the section below on descriptor mapping as a newer construct in the Data Standard to support multiple contexts.

Note that best practice at all levels for **code values** and **definitions** is to use values that are as close to source-system values (e.g., represent less aggregation; use code sets at similar granularity; etc.) as the context and use cases will permit. Values closer to the source system context provides more definition around the individual student; that provides is a richer context for decision-making which can improve student performance.

## Namespaces

Descriptor **namespaces** should clearly indicate the organization that governs the value; this is often the education agency for local operational code sets, but in some cases code sets may be governed by external organizations (vendors, ESAs, states, etc.).

Best practice is to use a URI-format that indicates a domain name owned by the organization, to facilitate the ability of users to discover and learn about the organization that governs the value.

## Use of uri://ed-fi.org Descriptor Values

The default `uri://ed-fi.org` standards values can be useful as a means of populating descriptors that the Data Standard requires but that the agency does not depend on for its core use cases. When a use case relies on a specific descriptor, values in the `uri://ed-fi.org` namespace should generally be avoided.  

Over many years, the Alliance has learned that code sets are nearly always context-dependent, and even when values can be successfully mapped to Ed-Fi governed values, this practice introduces confusion to data users who must learn code values they have not seen before.

Organizations must not edit or change code sets or definitions in the `uri://ed-fi.org` context. These values are governed by the Ed-Fi Alliance on behalf of the Ed-Fi community.

### Specific API Prescriptions for `uri://ed-fi.org` Values

Please note that per the guidance at top, specific Ed-Fi API specifications that are downstream of the Data Standard may add additional requirements that reflect community goals to better coordinate data exchange. Included in these requirements can be requirements to use `uri://ed-fi.org` descriptors. As an example, the proposed Ed-Fi Enrollment API  requires the use of `uri://ed-fi.org` descriptors because the API envisions a K12-wide context for use of that API; see (see [ED-FI RFC 19 - ENROLLMENT API FOR SUITE 3](https://edfi.atlassian.net/wiki/spaces/EFDSRFC/pages/25363105) under section "Enumerations (Descriptors)."

## Use of Provider (Vendor) Values

Note that there may be situations and use cases where organizations choose to use provider-defined values. For example, many assessment vendors work across the K12 landscape and have created enumeration values whose semantics are very specific, well-documented and well-understood. Such values are often used locally, even though they are vendor-defined. Use of these values is not uncommon in some domains.

As with `uri://ed-fi.org` values, values or definitions in the namespace of another organization should not be modified by anyone other than the organization that owns them.

When such values exist in REST API context, vendors are often permitted to write these values; this tends to simplify the setup of the data exchange and allow the vendor control over descriptor management.

## Descriptor Mapping as Data

Data Standard v4.0 introduced a new feature: the ability to capture descriptor mappings as data (see [What's New - v4.0 - Descriptor Mapping](https://edfi.atlassian.net/wiki/spaces/EFDS4X/pages/24412967#What&#39;sNew-v4.0-DescriptorMapping)). This feature promises to allow data elements with descriptors to retain more local fidelity as the element moves between data exchange contexts.

Commonly in K12, source systems will contain descriptor mappings to multiple contexts. For example, a Student Information System typically has both local LEA descriptor values and also mappings of those values to state values. This is also true of other systems as well -- assessment, intervention, etc. Sometimes, the mapping is between local/state contexts, but there are also mappings between vendor/local contexts, state/federal contexts, vendor/state contexts, and others.

Allowing these canonical mappings to be captured as data promises to allow a system to transmit data that retains important contextual information for multiple contexts and use cases.

The Alliance hopes that this feature can be useful to projects; we invite feedback on its utility for inclusion in future descriptor guidance.

:::tip

Also see: [Non-Normative Descriptor Classifications](./non-normative-descriptor-classifications.md)

:::
