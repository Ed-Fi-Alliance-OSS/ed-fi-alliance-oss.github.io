# v5 Contact > Contact Scenarios

This interchange defines contacts (originally parent) and captures the
relationship between the student and the guardian as well as indicators for the
contact for residence, primary parental contact, and emergency contact. The
Contact resource represents a parent or guardian of a student, such as mother,
father or caretaker.

## Prerequisites

- None

## Scenarios

1. Load Contact 1

2. Load Contact 2

3. Update the email address of the first contact created.

4. Update the address of the second contact created.

| Resource               | Property Name                | Is Collection | Data Type                    | Required / Optional | Scenario 1 <br/>POST                               | Scenario 2 <br/>POST                               | Scenario 3 <br/>PUT                                | Scenario 4 <br/>PUT                                |
| ---------------------- | ---------------------------- | ------------- | ---------------------------- | ------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| Contacts               | contactUniqueId              | FALSE         | string                       | REQUIRED            | \["333333"  if possible<br/><br/>\| system value\] | \["444444"  if possible<br/><br/>\| system value\] | \["333333"  if possible<br/><br/>\| system value\] | \["444444"  if possible<br/><br/>\| system value\] |
| Contacts               | firstName                    | FALSE         | string                       | REQUIRED            | Michael                                            | Alexis                                             | Michael                                            | Alexis                                             |
| Contacts               | lastSurname                  | FALSE         | string                       | REQUIRED            | Jones                                              | Johnson                                            | Jones                                              | Johnson                                            |
| Contacts               | sexDescriptor                | FALSE         | string                       | CONDITIONAL         | Male                                               | Female                                             | Male                                               | Female                                             |
| Contacts               | addresses                    | TRUE          | contactAddress\[\]           | REQUIRED            |                                                    |                                                    |                                                    |                                                    |
| contactAddresses       | addressTypeDescriptor        | FALSE         | addressTypeDescriptor        | REQUIRED            | Home                                               | Home                                               | Home                                               | Home                                               |
| contactAddresses       | city                         | FALSE         | string                       | REQUIRED            | Grand Bend                                         | Grand Bend                                         | Grand Bend                                         | Grand Bend                                         |
| contactAddresses       | postalCode                   | FALSE         | string                       | REQUIRED            | 78834                                              | 78834                                              | 78834                                              | 78834                                              |
| contactAddresses       | stateAbbreviationDescriptor  | FALSE         | stateAbbreviationDescriptor  | REQUIRED            | TX                                                 | TX                                                 | TX                                                 | TX                                                 |
| contactAddresses       | streetNumberName             | FALSE         | string                       | REQUIRED            | 654 Mission Hills                                  | 456 Cedar Street                                   | 654 Mission Hills                                  | 456 Cedar Bend                                     |
| contactAddresses       | apartmentRoomSuiteNumber     | FALSE         | string                       | REQUIRED            | 100                                                |                                                    | 100                                                |                                                    |
| contactAddresses       | nameOfCounty                 | FALSE         | string                       | CONDITIONAL         | WILLISTON                                          | WILLISTON                                          | WILLISTON                                          | WILLISTON                                          |
| contactAddresses       | doNotPublishIndicator        | FALSE         | boolean                      | REQUIRED            | TRUE                                               |                                                    | TRUE                                               |                                                    |
| Contacts               | electronicMails              | TRUE          | contactElectronicMail\[\]    | REQUIRED            |                                                    |                                                    |                                                    |                                                    |
| contactElectronicMails | electronicMailAddress        | FALSE         | string                       | REQUIRED            | <michaeljones@example.com>                         | <alexisjohnson@example.com>                        | <mJones@example.com>                               | <alexisjohnson@example.com>                        |
| contactElectronicMails | electronicMailTypeDescriptor | FALSE         | electronicMailTypeDescriptor | CONDITIONAL         | Home/Personal                                      | Home/Personal                                      | Home/Personal                                      | Home/Personal                                      |
| contactElectronicMails | primaryEmailAddressIndicator | FALSE         | boolean                      | REQUIRED            | TRUE                                               |                                                    | TRUE                                               |                                                    |
