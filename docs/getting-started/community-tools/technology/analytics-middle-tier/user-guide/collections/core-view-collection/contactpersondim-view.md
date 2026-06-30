# ContactPersonDim View

## Purpose

Contains names and contact information for a student's parents and/or guardians.
Part of the [Core View Collection](./readme.md).

## SQL Object

`analytics.ContactPersonDim`

## Usage Notes

When using the `ContactPersonDimension`, it may be important to pay attention to
the `ContactRestrictions` value. This field may indicate that a parent should
not be contacted, for example, due to a restraining order.

This view flattens the `edfi.StudentParentAssociation` into a single structure,
so a surrogate key is introduced as `UniqueKey`. This facilitates loading the
data into modeling tools that require a single unique primary key on each table.
This value is not used anywhere else in the Analytics Middle Tier semantic
model.

## Sources

### Data Standard 2.2

![ContactPerson Sources (DS2.2) Copy](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/ContactPerson%20Sources%20(DS2.2)%20Copy.png)

### Data Standard 3+

![ContactPerson Sources (DS3) Copy](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/ContactPerson%20Sources%20(DS3)%20Copy.png)

## Structure

Same for both 2.2 and 3+ data standards.

| Column | Data Type | Source | Description |
| --- | --- | --- | --- |
| UniqueKey | String | `{Parent.ParentUniqueId}-{Student.StudentUniqueId}` | Surrogate key so that modeling tools will have a unique primary key |
| ContactPersonKey | String | Parent.ParentUniqueId |     |
| StudentKey | String | Student.StudentUniqueId |     |
| ContactFirstName | String | Parent.FirstName |     |
| ContactLastName | String | Parent.LastName |     |
| RelationshipToStudent | String | RelationType.CodeValue |     |
| ContactHomeAddress | String | `{ParentAddress.StreetNumberName}`, `{ParentAddress.ApartmentRoomSuiteNumber}`, `{ParentAddress.City}`, `{StateAbbreviationType.CodeValue}`, `{ParentAddress.PostalCodeValue}` | Where Descriptor Constant= "Home" |
| ContactPhysicalAddress | String | see above | Where Descriptor Constant= "Home" |
| ContactMailingAddress | String | see above | Where Descriptor Constant= "Mailing" |
| ContactWorkAddress | String | see above | Where Descriptor Constant= "Work" |
| ContactTemporaryAddress | String | see above | Where Descriptor Constant= "Temporary" |
| HomePhoneNumber | String | ParentTelephone.TelephoneNumber | Where Descriptor Constant = "Home" |
| MobilePhoneNumber | String | ParentTelephone.TelephoneNumber | Where Descriptor Constant = "Mobile" |
| WorkPhoneNumber | String | ParentTelephone.TelephoneNumber | Where Descriptor Constant = "Work" |
| PrimaryEmailAddress | String | ParentElectronicMail.PrimaryEmailAddressIndicator | "Work" if the work email address is primary, or "Personal" if the personal address is the primary, or "Not Specified" |
| PersonalEmailAddress | String | ParentElectronicMail.ElectronicMailAddress | Where Descriptor Constant = "Home/Personal" |
| WorkEmailAddress | String | ParentElectronicMail.ElectronicMailAddress | Where Descriptor Constant = "Work" |
| IsPrimaryContact | Boolean | StudentParentAssociation.PrimaryContactStatus | ⚠️ The Ed-Fi data model does not preclude having multiple primary contacts. |
| StudentLivesWith | Boolean | StudentParentAssociation.LivesWith |     |
| IsEmergenyContact | Boolean | StudentParentAssociation.EmergencyContactStatus |     |
| ContactPriority | Int | StudentParentAssociation.ContactPriority |     |
| ContactRestrictions | String | StudentParentAssociation.ContactRestrictions |     |
| LastModifiedDate | Date | Most recent of (StudentParentAssociation.LastModifiedDate, Parent.LastModifiedDate, ParentElectronicMail.LastModifiedDate, ParentTelephone.LastModifiedDate, ParentAddress.LastModifiedDate) |     |
