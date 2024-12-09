# Descriptor Mapping

## Introduction

This section discusses descriptor mapping, which is an essential part of the
Analytics Middle Tier setup and configuration. The instructions below can be
followed immediately after installation and/or revisited at any time in the
future.

Some views in the Analytics Middle Tier need to filter data by a string value.
For example, a query on the attendance events table looking only for the excused
absences uses a string value to represent the concept of excused absences. This
is because the Ed-Fi ODS database provides enumerations such as "Excused
Absence" and "Unexcused Absence" via Ed-Fi Descriptors. Descriptors are
customizable, and so each installation of the Ed-Fi ODS may have different
descriptor values for the same "universal" concept. Therefore, the views cannot
simply include a preset, static filter for the concepts expressed by a
Descriptor value.

To get around this variability, the Analytics Middle Tier introduces a
DescriptorConstant table to represent those universal values. Each installation
of the Analytics Middle Tier must then map its Descriptors to the
DescriptorConstants as appropriate for the situation, visa the DescriptorMap
table.

An example: Let's say there is a Descriptor value "Absent due to band trip".
Should this be mapped to the constant "AttendanceEvent.ExcusedAbsence"? At first
glance this might seem appropriate. However, it is important to know that
"Excused Absence" is used to calculate attendance rates. For the purpose of an
early warning system, if the student who is on a band trip should be treated the
same as the student who is sitting in the classroom, then the two values _should
not be linked_ via the DescriptorMap table. On the other hand, a Descriptor
value of "Excused absence" really _should_ be mapped to the
constant AttendanceEvent.ExcusedAbsence.

For Data Standard v2.2 support, there is similarly a TypeMap table for queries
that must refer to the various "Type" tables. In theory, the "Type" tables were
supposed to be universal; in practice they were not, which is why they were
removed from Data Standard v3.x.

![Table showing descriptor mappings](https://edfidocs.blob.core.windows.net/$web/img/reference/analytics-middle-tier/image2021-4-12_15-43-10.png)

## List of Descriptor Constants

| ConstantName | Collection | Purpose |
| --- | --- | --- |
| Address.Home | Base | Looking up ContactPerson's Home address. |
| Address.Mailing | Base | Looking up ContactPerson's Mailing address. |
| Address.Physical | Base | Looking up ContactPerson's Physical address. |
| Address.Temporary | Base | Looking up ContactPerson's Temporary address. |
| Address.Work | Base | Looking up ContactPerson's Work address. |
| Email.Personal | Base | Looking up ContactPerson's home or personal e-mail address. |
| Email.Work | Base | Looking up ContactPerson's work e-mail address. |
| Foodservice.FullPrice | Base | Determines if a student is eligible for school food service. |
| TelephoneNumber.Home | Base | Looking up ContactPerson's Home phone number. |
| TelephoneNumber.Mobile | Base | Looking up ContactPerson's Mobile phone number. |
| TelephoneNumber.Work | Base | Looking up ContactPerson's Work phone number. |
| AttendanceEvent.ExcusedAbsence | EWS | Looking up student attendance events (either section or school related) that should be treated as an "Excused Absences" in an Early Warning System.<br/><br/>As an example, an Ed-Fi installation might have an attendance event descriptor value of "Field Trip". When calculating attendance in the [Early Warning System Collection](../user-guide/collections/early-warning-system-collection/readme.md), should the student be counted as absent or present on that day? If treated an Excused Absence, then the student's attendance rate will go down for every field trip. This is probably not the desired effect. Therefore "Field Trip" would b e mapped to "AttendanceEvent.IsPresent" instead of "AttendanceEvent.ExcusedAbsence." |
| AttendanceEvent.UnexcusedAbsence | EWS | Looking up student attendance events that should be treated as "Unexcused Absences" in an Early Warning System. |
| AttendanceEvent.Tardy | EWS | Looking up student attendance events that should be treated as "Tardy" in an Early Warning System. |
| AttendanceEvent.IsPresent | EWS | Looking up student attendance events that should be treated as "Is Present" in an Early Warning System.<br/><br/>If the local education agency does not track "presence", instead only tracking absence events, then there would not be any descriptors to map to "IsPresent". |
| Behavior.StateOffense | EWS | Looking up discipline incidents that are deemed state-level offenses (criminal). |
| Behavior.SchoolCodeOfConductOffense | EWS | Looking up discipline incidents that are deemed to be violations of the school code of conduct. |
| InstructionalDay | EWS | Determining if a given calendar event date corresponds with an instructional day. |
| GradingPeriod | EWS | Looking up the Grade records by the most granular period, which by default is "Grading Period". Some implementations might instead use terms like "Quarter" or "Six Weeks". |
| AuthorizationScope.Section | RLS | Supports creation of row-level authorization data. |
| AuthorizationScope.School | RLS | Supports creation of row-level authorization data. |
| AuthorizationScope.District | RLS | Supports creation of row-level authorization data. |

## Default Mappings

The installation process will attempt to install the following mappings by
default. If the descriptor (or type value in v2.2) does not exist, then the
installation tool will ignore it. For example, if your installation does not
have a school food service descriptor with code value "FullPrice", then the
default mapping of "FullPrice" will be ignored.

### Data Standard v3.x

| DescriptorConstant.ConstantName | Descriptor.CodeValue |
| --- | --- |
| Address.Home | Home |
| Address.Physical | Physical |
| Address.Mailing | Mailing |
| Address.Work | Work |
| Address.Temporary | Temporary |
| Telephone.Home | Home |
| Telephone.Mobile | Mobile |
| Telephone.Work | Work |
| Email.Personal | Home/Personal |
| Email.Work | Work |
| AttendanceEvent.ExcusedAbsence | Excused Absence |
| AttendanceEvent.UnexcusedAbsence | Unexcused Absence |
| AttendanceEvent.Tardy | Tardy |
| AttendanceEvent.Present | In Attendance |
| InstructionalDay | Instructional day |
| InstructionalDay | Make-up day |
| Behavior.StateOffense | State Offense |
| Behavior.SchoolCodeOfConductOffense | School Code of Conduct |
| GradingPeriod | Grading Period |
| AuthorizationScope.District | Superintendent |
| AuthorizationScope.School | Principal |
| AuthorizationScope.Section | Teacher |

### Data Standard v2.2

#### Descriptors

| ConstantName | Descriptor Table | CodeValue |
| --- | --- | --- |
| Foodservice.FullPrice |     | FullPrice |
| AttendanceEvent.ExcusedAbsence |     | Excused Absence |
| AttendanceEvent.UnexcusedAbsence |     | Unexcused Absence |
| AttendanceEvent.Tardy |     | Tardy |
| AttendanceEvent.Present |     | In Attendance |
| InstructionalDay | CalendarEventDescriptor | Instructional day |
| InstructionalDay | CalendarEventDescriptor | Make-up day |
| Behavior.StateOffense | BehaviorDescriptor | 01 (State Offense) |
| Behavior.StateOffense | BehaviorDescriptor | 46 (Aggravated Robbery) |
| Behavior.SchoolCodeOfConductOffense | BehaviorDescriptor | 04 (School Code of Conduct) |
| Behavior.SchoolCodeOfConductOffense | BehaviorDescriptor | 21 (Violation of Student Code of Conduct) |
| AuthorizationScope.District |     | Superintendent |
| AuthorizationScope.School |     | Principal |
| AuthorizationScope.Section |     | Teacher |

#### Types

| DescriptorConstant.ConstantName | Type Table | CodeValue |
| --- | --- | --- |
| Address.Home | AddressType | Home |
| Address.Physical | AddressType | Physical |
| Address.Mailing | AddressType | Mailing |
| Address.Work | AddressType | Work |
| Address.Temporary | AddressType | Temporary |
| Telephone.Home | TelephoneNumberType | Home |
| Telephone.Mobile | TelephoneNumberType | Mobile |
| Telephone.Work | TelephoneNumberType | Work |
| Email.Personal | ElectronicMailType | Home/Personal |
| Email.Work | ElectronicMailType | Work |
| GradingPeriod | GradeType | Grading Period |

## Review, Manage, and Save Updates

Review each descriptor constant carefully for your installation to see if there
are additional mappings or changes that should be applied. We recommend that you
write changes via INSERT, UPDATE, and DELETE SQL statements — and save the file
in source control or another secure location, so that you can easily recreate
your mappings if you need to create a fresh ODS database / Analytics Middle Tier
installation.

The [`samples`
directory](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Analytics-Middle-Tier/tree/main/samples)
in the source code repository has three SQL files that can be helpful when
reviewing your mappings and trying to choose values that might be applicable in
your situation:

* For Data Standard v3.x: `descriptor-maps-DS3.sql`
* For Data Standard v2.2: `descriptor-maps-DS22.sql`  and `type-maps.sql`.
