---
sidebar_position: 2
---

# Ed-Fi Data Standard Extension Framework Best Practices

## Introduction

The Ed-Fi Data Standard and related technologies can be extended to add new
entities and elements. The set of standard extensions are codified in the Ed-Fi
Extension Framework, documented herein. This knowledge base article attempts to provide an overview and best practices
for the Ed-Fi Data Standard Extension Framework.

This article assumes prerequisite knowledge from the [Ed-Fi
Academy](https://academy.ed-fi.org):

* [Ed-Fi 101 – Welcome to
  Ed-Fi](https://academy.ed-fi.org/courses/ed-fi-101-welcome-to-ed-fi/)
* [Ed-Fi 102 – Introduction to the Ed-Fi Technology
  Suite](https://academy.ed-fi.org/courses/ed-fi-102-data-management/)

If you have not already completed these courses, we recommend doing so
before attempting to digest the information presented in this article.

## Overview of the Ed-Fi Data Standard Extension Framework

### Framework Reference Implementation

An implementation of the Ed-Fi Extension Framework is provided via the MetaEd
IDE. The Ed-Fi Community has relied heavily on this reference implementation and
downstream technology implementations (e.g., the API implementation in the Ed-Fi
ODS/API, etc.) to define patterns that have proven stable and are believed to be
widely implementable.

The Alliance and the Ed-Fi community welcome other Extension Framework
implementations to contribute their tools and knowledge to this effort.

### What is the Extension Framework?

Ed-Fi Data Standard Extension Framework is the new entities, attributes and/or
associations Ed-Fi Alliance Community members can include in their local Ed-Fi
Technology Suite implementation (as an addition to those already included in the
Ed-Fi Data Standard Core Model) according to the guidance provided by the Ed-Fi
Alliance.

![depiction of the framework](https://edfidocs.blob.core.windows.net/$web/img/reference/extension-framework.webp)

### Why are Extensions necessary?

Extensions serve a pivotal role in the evolution of the Ed-Fi Data Standard,
reflecting the Ed-Fi Alliance’s commitment to an adaptive, user-driven
framework. By allowing for the organic growth of the standard through real-world
use cases, extensions become a dynamic tool for addressing the diverse and
evolving needs of the community. Far from being mere stop-gap solutions,
extensions embody our proactive approach to expanding standardization and
ensuring that the Ed-Fi Data Standard remains an organically growing, responsive
entity that accommodates the complexities and nuances of educational data.

Extensions become imperative when the Ed-Fi Data Standard core offering falls
short of meeting specific requirements for a given implementation in a given
time frame. In such cases, extensions serve as a deliberate and strategic
response to bridge the gap between the standard and the unique or specific needs
of individual Ed-Fi states and collaboratives.

### What type of Extensions are supported?

The framework allows adding new entities, extending existing entities, or
subclassing existing entities. Extensions in this category generally have
implementation and documentation support in Ed-Fi technology such as the
Ed-Fi ODS / API. See the [Supported Extensions Tech Docs page](./supported-extensions/readme.md) for more specific guidelines.

Extensions not in the Extension Framework are
not allowed. The documentation attempts to enumerate the most common of
those. The Extension Framework evolves over time, so there are some
community input mechanisms in place to help the community explore new models
that may be candidates for support. See [Unsupported Modifications](./unsupported-modifications.md) for commonly encountered scenarios.

## When to Extend the Ed-Fi Data Standard

Deciding whether an extension is necessary involves a thoughtful assessment of
your specific data requirements within the Ed-Fi Data Standard framework. Follow
the steps below to make this determination:

1. **Start your data mapping.** Begin by conducting a comprehensive data mapping
   exercise. Evaluate your organization's data needs against the existing Ed-Fi
   Data Standard. Identify any gaps or instances where the standard does not
   adequately address your specific use cases. As you identify gaps, work with
   the appropriate business owners to see if their process can be modified to
   align with the standard instead of defaulting to the other way around.  
2. **Engage the Ed-Fi Data Standard team.** If your data mapping reveals a gap
   in the Ed-Fi Data Standard that cannot be resolved through modification of an
   internal business process, don't hesitate to engage with the Ed-Fi Data
   Standard team. Seek their expertise and guidance to understand whether your
   identified gaps are intentional design choices or if they represent areas
   that may benefit from extension.
3. **Collaborate with the Ed-Fi Community.** Leverage the collaborative nature
   of the Ed-Fi community. Discuss your findings and potential requirements with
   other stakeholders who may have faced similar challenges. Community insights
   can provide valuable perspectives on whether an extension is a shared need or
   a more isolated requirement. This also includes the vendors that are sources
   of the data to confirm the impact on their integration effort.

## How to Extend the Ed-Fi Data Standard

Implementing an extension involves using the MetaEd Integrated Development
Environment (IDE). The MetaEd IDE is a powerful tool designed to simplify the
process of creating, managing, and deploying extensions. Here's a high-level
overview of the steps involved:

1. **Understand the MetaEd IDE.** Start by familiarizing yourself with the
   MetaEd IDE. This tool serves as the central hub for extension development
   within the Ed-Fi ecosystem. For an in-depth understanding, refer to the
   [MetaEd Page](../../4-metaed/readme.md).
2. **Define and build the extension.** See the [How To: Extend the Ed-Fi ODS /
   API - Alternative Education Program
   Example](/reference/ods-api/how-to-guides/how-to-extend-the-ed-fi-ods-api-alternative-education-program-example)
   for step-by-step guide using the Student Transportation extension as an
   example.
3. **Create an Extension Plugin.** See the [How To: Create an
   Extension](/reference/ods-api/how-to-guides/how-to-create-an-extension-plugin)
   page.
4. **Deploy an Extension Plugin.** See the [How To: Deploy an
   Extension](/reference/ods-api/how-to-guides/how-to-deploy-an-extension-plugin)
   page.

## Best Practices

Below is a list of best practices to consider when working with the Extensions
Framework.

* **If possible, avoid extensions.** Carefully assess your need to extend the
  core Ed-Fi Data Model and justify the assessment result by comparing it with
  the previous work and conversation of the Ed-Fi Community.
* **Get help with data mapping.** The Ed-Fi Data Standard team is here to assist
  with your data mapping questions and guide you with the extension modeling.
  You can connect with them by going to the
  [Community Hub](https://community.ed-fi.org/)
* **Refrain from making unsupported modifications.** Do not extend the Ed-Fi
  Data Model in ways that are not supported. See the [Supported Extensions](./supported-extensions/readme.md)
  for more specific guidelines.
* **Be cautious about aggregate data.**The idea of using extensions to hold
  aggregate data elements comes up often in data mapping exercises. In general,
  the Ed-Fi Alliance recommends avoiding aggregates in favor of the underlying
  discrete data used to compute them.  
* **Assess the impact and long-term viability of an extension.** Consider the
  potential impact of introducing an extension on your system and data ecosystem
  (including your vendors). Evaluate whether the extension aligns with your
  long-term goals and whether it is a sustainable solution for addressing your
  unique data needs.
* **Evaluate future standard updates.** As mentioned earlier, Ed-Fi extensions
    play a key role in ensuring the Ed-Fi Data Standard continues to stay
    relevant as new data collection sources come online.  Stay informed about
    upcoming releases and updates to the Ed-Fi Data Standard. Some of your
    identified gaps may be addressed in future versions. Assess whether waiting
    for an upcoming release is a viable option for your organization. Also,
    develop a plan to share your extension with the Ed-Fi Alliance Community
    members for a larger adoption if you go that route.
    If you are a state education agency or a regional agency, connect with your
    community peers to understand if they created an extension for a similar use
    case and how they have done it.  The Ed-Fi Alliance’s governance workgroups
    (SEA Working Group and Collaborative Working Group) can facilitate these
    discussions, you can email them at
    [governance@ed-fi.org](mailto:governance@ed-fi.org).
