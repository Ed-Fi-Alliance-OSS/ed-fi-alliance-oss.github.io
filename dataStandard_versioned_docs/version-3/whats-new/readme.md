---
sidebar_position: 1
---

# What's New

## Overview

Data Standard v3.3, currently in early access, introduces changes to the core
data model for domains commonly used by student information systems and
assessment systems. It is the successor to [Ed-Fi Data Standard
v3.2](https://edfi.atlassian.net/wiki/spaces/EFDS31/overview). This
documentation describes important properties and features of this release, and
links to additional detail on specific data model changes.

* [What's New - v3.3-a](./whats-new-v33-a.md)
* [What's New - v3.3-b](./whats-new-v33-b.md)

For more on data standard versioning and where to find source materials, please
consult: [Ed-Fi Data Standard Versioning and
Releases](/reference/data-exchange/versioning-and-releases).

For information on future Data Standard releases, please consult  the [Ed-Fi
Technology
Roadmap](/reference/roadmap/)

## Other Notes

### Non-breaking API Binding

The changes in this release are intended to be **non-breaking** to most API
clients. "Non-breaking" in this context generally means that data model changes
are additive and optional, data types are generalized, or field lengths are
expanded. However, any change to a data model is potentially breaking given the
specific API client behavior, so all API users are cautioned to review the
changes carefully.

### Deprecation

In order to limit the impacts to field work derived from the API, including to
help make the API binding changes non-breaking, the release uses **deprecation** of
data model elements. Deprecation communicates that a data element or other API
behavior is intended for removal in a future release, typically the next major
release. Deprecation is therefore a recommendation to avoid use of certain data
fields or features. Deprecation notices may be accompanied by information
listing alternative or preferred options.

## All Changes

View all [Data Standard 3.3 changes on the Ed-Fi
Tracker](https://tracker.ed-fi.org/issues/?jql=project%20%3D%20DATASTD%20AND%20(%20fixVersion%20IN%20(%22Data%20Standard%20v3.3.0-a%22%2C%22Data%20Standard%20v3.3-b%22)%20)%20%20%20)
