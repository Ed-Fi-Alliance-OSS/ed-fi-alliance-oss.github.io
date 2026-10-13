---
description: Release notes for Ed-Fi API Publisher v1.4.
sidebar_position: 2
---

# Release Notes

This section provides a comprehensive list of the improvements, updates, fixes,
and changes in the Ed-Fi API Publisher v1.4 release.

:::tip

The lists below include ticket numbers from Jira. The Jira project can only be
seen by the development team. However, anyone can look for that ticket number in
the Git commit history in the
[Ed-Fi-Alliance-OSS/Ed-Fi-API-Publisher](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-API-Publisher)
GitHub repository to find the changes for that specific update.

:::

## Ed-Fi API Publisher v1.4.0 - Release Notes

### Important Epics

* APIPUB-107 - Ed-Fi API v8 support
* APIPUB-135 - Cursor paging and partitions

### Breaking Changes

* APIPUB-116 - The API Publisher requires .NET 10.
* APIPUB-120 - New exit codes: `0` success, `1` documents rejected beyond the
  tolerance, `2` run incomplete, `3` authentication failure, `4` invalid
  configuration. A run that loses documents no longer exits with `0`.
* APIPUB-108 - Resource paths are taken from the API's Discovery document. A
  proxy in front of Ed-Fi API v8 that only routes `/data/v3/` answers `404`;
  set `dataManagementUrlSegment` to keep the previous path.
* APIPUB-109 - The token endpoint is taken from the API's Discovery document.
  Set `authUrl` on a connection when the API declares an address its callers
  cannot reach.

### General Improvements & Enhancements

* APIPUB-108 - Take the API's resource paths from its Discovery document
* APIPUB-109 - Take the token endpoint from the API's Discovery document
* APIPUB-113 - Add an option to process deletes and key changes on a full
  publish
* APIPUB-131 - Read Ed-Fi ODS/API 7.3 sources with cursor paging and partitions
* APIPUB-139 - Add cursor paging with partitions and the `disableCursorPaging`
  option
* APIPUB-140 - Honor `Retry-After` on `429` source responses and cap concurrent
  source requests
* APIPUB-142 - Resume a run that failed partway through
* APIPUB-112 - Reduce memory growth on long runs
* APIPUB-133 - Bound the memory used by retry passes
* APIPUB-134 - Stream source pages instead of reading them as strings
* APIPUB-116 - Run on .NET 10
* APIPUB-121 - Update the Docker images to .NET 10

### Bug Fixes

* APIPUB-102, APIPUB-103 - Report a source item with an invalid `id` as a
  controlled error instead of an exception
* APIPUB-104 - Fix an exception when `lastChangeVersionProcessed` is provided
  and `includeOnly` has a single resource
* APIPUB-114 - Fix a non-concurrent collection error with a remediation script
  and parallel POST requests
* APIPUB-119 - Retry a failed bearer token refresh and handle `401` responses
  instead of silently voiding the rest of a run
* APIPUB-120 - Exit with a non-zero code when documents were dropped
* APIPUB-132 - Fix a `KeyNotFoundException` when publishing from a Data
  Standard 5.x source with the shipped configuration
* APIPUB-160 - Keep the `id` in key change requests so that Ed-Fi API v8
  accepts them
