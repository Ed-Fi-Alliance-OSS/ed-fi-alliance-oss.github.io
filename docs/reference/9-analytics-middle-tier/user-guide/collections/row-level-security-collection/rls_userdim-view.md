# rls_UserDim View

## Purpose

This view supports row-level security / authorization by listing all of the
potential users, linking their e-mail address to a UserID. Part of
the [Row-Level Security Collection](./readme.md).

## SQL Object

`analytics.rls_UserDim`

## Data Definition and Sources

The join to the `StaffElectronicMail` table needs to be further limited by
looking at the `ElectronicMailTypeId` field and filtering
on `ElectronicMailType.CodeValue = 'Work'`.

| Column Name | Source Table | Source Column | Data Type |
| --- | --- | --- | --- |
| UserKey | Staff | StaffUniqueId | int |
| UserEmail | StaffElectronicMail | ElectronicMailAddress | nvarchar(128) |
| LastModifiedDate | Staff, ElectronicMailType | Most recent LastModifiedDate | datetime |
