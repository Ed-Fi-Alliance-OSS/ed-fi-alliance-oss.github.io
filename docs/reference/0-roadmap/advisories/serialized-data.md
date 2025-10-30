---
sidebar_position: 1
---

# Advisory: Issues in Serialized Data Feature – Update and Resolution

Sept 18, 2025

This advisory outlines recently identified issues in the Ed-Fi ODS/API platform's [Serialized Data](/reference/ods-api/platform-dev-guide/features/serialized-data) feature. The identified issues affect the **accuracy and consistency** of serialized representations.

The optional Serialized Data feature was introduced to enhance performance by storing resource data in a serialized binary format. To ensure data integrity during cascading key changes, the feature compares the `LastModifiedDate` of the resource table with the `LastModifiedDate` embedded in the binary data to determine whether the serialized data is current.

---

## Issue 1: Triggers on Aggregate Root Tables with Volatile Foreign Keys

- **Problem**: Triggers on aggregate root tables do not update the `LastModifiedDate` when foreign key values change due to cascading updates.
- **Impact**: The API incorrectly assumes the serialized data is current, even when foreign key changes should invalidate it.
- **Resolution**: Trigger logic has been revised to ensure `LastModifiedDate` is updated appropriately when foreign keys change.

---

## Issue 2: PUT Logic and Key Change Discrepancy

- **Problem**: When identity fields are modified via PUT, the two-step update process causes a mismatch between the `LastModifiedDate` on the record and the serialized data, falsely marking the serialized data as stale.
  - Step 1: Entity is updated with general changes, including `LastModifiedDate`.
  - Step 2: Key change is applied separately.

- **Impact**: Incorrect stale data determination subverts the serialized data optimization.
- **Resolution**: `LastModifiedDate` is now aligned with the serialized data after a key change, allowing the serialized version of the resource to be reused rather than rebuilt.

---

## Issue 3: HREF Resolution in Child Items with Unified Keys

- **Problem**: Child items with unified keys fail to resolve `href` values correctly.
- **Impact**: Serialized output contains placeholder GUIDs (e.g., `0s`) instead of valid references.
- **Resolution**: Serialization logic has been updated to correctly resolve unified foreign keys in the context of the parent entity.

---

## Affected Versions

The following ODS/API version is affected:

- 7.3.0

## Patch Availability

Fixes have been released in a patch for **ODS/API v7.3.0**.

### NuGet Packages

- Refer [7.3 Binary Releases](https://docs.ed-fi.org/reference/ods-api/getting-started/binary-installation/binary-releases) for updated packages.
- To install:
  - Rename the download by changing the extension `.nupkg` to `.zip`.
  - Open the zip file, extract the DLL files.
  - Copy them into the binary directory for your installation.

### Source Code Releases

Updated source code is available at:

- [Ed-Fi-ODS](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/tree/v7.3-patch2)
- [Ed-Fi-ODS-Implementation](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/tree/v7.3-patch2)

Review the linked tags above and cherry-pick the commits included in the release.

:::note
Database changes are required on the Operational Data Store.
Review the relevant [commit](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/commit/6f536794d6ed6d5ed40ac541ad1620b9c7ac52d9) and apply updates.
MetaEd extension users may need to update DDL scripts.
:::

:::info
The Serialized Data feature is optional and can be disabled.
To disable, set `ApiSettings:Features:SerializedData` configuration to `false`.
Refer to the [Configuration Details](/reference/ods-api/platform-dev-guide/configuration/configuration-details) page.
:::
