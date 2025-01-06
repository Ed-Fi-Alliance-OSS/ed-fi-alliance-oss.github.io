# Upgrade

## Introduction

This knowledge base article attempts to provide an overview of the decision-making process for upgrading, including considerations for downstream impacts and communicating with the technical providers and districts.

This article assumes prerequisite knowledge from:

* [Ed-Fi 101 – Welcome to Ed-Fi](https://academy.ed-fi.org/learn/course/external/view/elearning/50/ed-fi-101-welcome-to-ed-fi)
* [Ed-Fi 102 – Introduction to the Ed-Fi Technology Suite](https://academy.ed-fi.org/learn/course/external/view/elearning/51/ed-fi-102-introduction-to-ed-fi-technology-suite)

If you have not already completed these courses, we recommend doing so before attempting to digest the information presented in this article.

## Considerations for Planning an Upgrade

### Why Upgrade?

There are many different reasons for upgrading your Ed-Fi Technology Suite Installation; they can be divided into three categories:

* Alignment with Ed-Fi Alliance  
  * As of the writing of this article, each major release is supported by the Alliance for three school years after release. You can always check the following link for the most up to date information on release cadences: [Ed-Fi Release Cadence](/reference/roadmap/cadence/).  Upgrading between sequential major releases means a smaller number of changes than waiting until the release is out of support before upgrading.
* Technology and Security Enhancements
  * With each major release there are improvements and enhancements made to the system which provide better performance, improved security and/or technology upgrades.  Upgrading ensures your system continues to perform at scale and maintain the highest level of data security.
* Updated Data Standards and Technology Partner Alignment  
  * Each major release, and many minor releases, comes with improved data standards, including contributions from the Ed-Fi community.  Upgrading ensures you can make the most of features your technology partners provide and have the most comprehensive data model available.

### Challenges with Upgrading

While keeping your system upgraded provides a great number of benefits, it also comes with some challenges that need to be considered when planning:

* Dependent Systems
  * When upgrading your implementation, you must consider any other systems in your organization that are dependent on the implementation.  Your upgrade plan must consider the needs of these systems and their stakeholders.
* Ongoing Updates
  * When upgrading, you need to evaluate any extensions currently being used by your implementation.  It is possible that the latest data standard version now has built in support for data that you previously needed an extension to access.  Your organization will then need to decide if the built-in implementation will work or if you still want to continue to use the extension.
* Stakeholder Engagement
  * During the upgrade project, you will need to maintain engagement with your stakeholders, not only so they know what to expect from the process, but also to get feedback on any issues they may encounter so you can ensure they are worked out prior to going live.
  * When thinking about stakeholders you need to ensure you have considered the following people who should be communicated with, each should be coordinating with anyone else in their organizations:
    * The lead technical implementor for any systems that interact with your Ed-Fi Implementation
    * The project manager for any systems that interact with your Ed-Fi Implementation
    * At least one person from each Agency that is using your Ed-Fi Implementation

It is important to note that you may have more stakeholders than this if the organizations and agencies you are working with want more people to be kept in the loop.

## Best Practices for Upgrading

### Overview

When your organization decides to upgrade your Ed-Fi Technology Suite Installation, we recommend you follow a few best practices.  The goal is to have a project plan that guides your organization and all stakeholders through the upgrade process and ensures that the end state is what your stakeholders need.

### Upgrade for Next School Year

While it is technically possible to upgrade an existing in-place Ed-Fi Technology Suite Implementation, we rarely would suggest this as a best practice, and you will need to work with your technology partner to determine if this is even feasible with them.  Instead, the recommendation is that each Ed-Fi instance stores a single school years' worth of data, and the upgrades happen before a new school year is started.  This prevents your technology partners having to change integrations mid-year and ensure there are no data issues from the upgrade.

### Creating a Project Plan

To get this project plan, it is necessary that you do discovery and analysis on the current implementation and the changes in the newest version of the Ed-Fi Technology Suite. As part of this discovery, documenting changes to your use cases and any API integration that you will need to address.  You will also need to consider the time needed to update dependent systems and test those integration.

### Communicating the Project Plan

Once your project plan is in place, ensure effective communication with all stakeholders, including those involved in upgrading and testing integrations.  Throughout the upgrade you need to keep these stakeholders informed of where you are at, and anything needed from them to keep the upgrade moving forward.  The more your stakeholders are involved with the upgrade of the system and provide you with their feedback, the smoother the final go\-live of the upgraded installation will be.

## Guidance for Creating a Project Timeline

Many factors go into determining an appropriate timeline; we provided general guidelines here for you to build from.  We always recommend that you look at the pre-release date of the version you are planning to upgrade to and then build your timeline around that.  For this article's purposes, we will use August as the pre-release date and build our timeline from there.  It is important to note that this is a general guideline, and you should always work with your technology providers to understand the scope of the upgrade and if it may need more or less time than this example.  Refer to the following diagram for the four phases of the project timeline:  

![Example Project Timeline](https://edfi.atlassian.net/wiki/download/thumbnails/73072649/Screenshot%202024-02-06%20at%209.06.01%20PM.png?version=1&modificationDate=1714405020787&cacheVersion=1&api=v2&width=1280&height=261)

## Project Planning and Preparation

Starting in August the focus should be on creating a plan specific to the release you are upgrading to.  During this period, you will want to have at least 1 person focused on putting together the plan. Some items you want to be sure to cover include:

* Ensure you have identified all stakeholders, and that you have a plan in place to communicate with them all throughout the process.
* Work with your technology partner to ensure there will be an appropriate sandbox setup for testing once the release is available.
* Evaluate the changes that are coming in the release you are upgrading to and note any changes that will require significant testing.

## Standup Infrastructure

Remember we are using November as the pre-release date for this example, and so during this time frame you should be standing up your testing infrastructure. Some items you want to be sure happen during this phase include:

* All technology partners have access to the testing environment and can send and/or receive data from it.
* If the release is delayed at all, look at your timelines and determine how late you can wait for the release and still get it appropriately tested.
* If this release is delayed past where you can get it appropriately tested, we suggest you fall back to a prior release for upgrading to.

## Development and Testing

During this phase you will work closely with all your technology partners.  The goal is for them to test their integrations with the upgraded system. You will need at least one person to test that the data coming through is correct and provide feedback when it is not.  It is imperative during this phase that communication between your organization and your technology partners happens consistently so they can properly fix any issues as soon as possible.  For those technology partners that are pulling data from the system, they will also need to be testing and validating that their integrations are still valid and updating as needed.  

## Coordinate Cutover

Once you reach this phase you now know that all your technology partners have upgraded their software to work with your upgraded Ed-Fi Implementation.  The work is not complete yet, as everyone is still working in a testing environment.  Communication now becomes even more critical as you work to do the upgrade on the production system and to ensure that all your technology partners have updated to talk to that system instead of your test one.

## Post Rollout Evaluation

Once the rollout is complete, this is a time to evaluate how the upgrade went.  From a functionality level, the upgrade is a success if everyone can still perform the work they did with the prior version, and if all technology partners can send their data to the appropriate API.  We recommend you take it further than that, talk with your stakeholders, including your technology partners, and learn more about their experience with the rollout.  Where could communication be improved?  Were there places in the timeline that had more time than needed?  Maybe places that had not enough time? Use this to inform your next upgrade planning.
