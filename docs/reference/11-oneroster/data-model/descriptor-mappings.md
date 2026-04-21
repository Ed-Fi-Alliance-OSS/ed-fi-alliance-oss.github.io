# Descriptor Mappings

Several OneRoster fields are produced by translating Ed-Fi descriptor values
(for example, `SexDescriptor.Female`) into OneRoster enumeration values
(`sex = 'female'`). The translation is done entirely through rows in
`edfi.descriptormapping`, which are seeded when OneRoster SQL artifacts are
deployed and can be extended per implementation.

This page lists the six shipped descriptor mappings, documents the behavior
each mapping produces in the OneRoster output, describes what happens to
Ed-Fi descriptor values that are _not_ in the mapping, and provides an
INSERT template for adding custom entries.

## Where descriptor mappings live

Two SQL files define the shipped mappings:

- `01_descriptors.sql` — inserts the OneRoster-namespaced descriptor rows
  (for example, `uri://1edtech.org/oneroster12/SexDescriptor / female`) into
  `edfi.descriptor` so that `edfi.descriptormapping` can reference them as
  the _mapped_ side.
- `02_descriptorMappings.sql` — inserts the Ed-Fi-namespaced-to-OneRoster
  mapping rows into `edfi.descriptormapping`.

Both files live under
`standard/{dataStandardVersion}/artifacts/{pgsql,mssql}/core/`. Running the
deployment script (`deploy-postgres.sh` / `deploy-mssql.js`) executes both.

## Shipped mappings

Each shipped mapping has a `mappedNamespace` of
`uri://1edtech.org/oneroster12/{Descriptor}`. The tables below list the
exact Ed-Fi value → OneRoster value pairs and the OneRoster field each
mapping populates.

### `CalendarEventDescriptor` → instructional-day flag

Used by `academic_sessions.sql` to decide which Ed-Fi calendar dates count as
school days when computing the school-year start and end dates.

| Ed-Fi value | Mapped value | Contributes to school year? |
|---|---|---|
| `Emergency day` | `FALSE` | No |
| `Holiday` | `FALSE` | No |
| `Instructional day` | `TRUE` | Yes |
| `Make-up day` | `TRUE` | Yes |
| `Non-instructional day` | `FALSE` | No |
| `Other` | `FALSE` | No |
| `Strike` | `FALSE` | No |
| `Student late arrival/early dismissal` | `TRUE` | Yes |
| `Teacher only day` | `FALSE` | No |
| `Weather day` | `FALSE` | No |

### `TermDescriptor` → OneRoster `academicSession.type`

Populates the `type` field on academic session records derived from
`edfi.session`.

| Ed-Fi value | OneRoster `type` |
|---|---|
| `Semester`, `Fall Semester`, `Spring Semester`, `Summer Semester` | `semester` |
| `Quarter`, `First Quarter`, `Second Quarter`, `Third Quarter`, `Fourth Quarter` | `term` |
| `MiniTerm` | `term` |
| `Other` | `term` |
| `Trimester`, `First Trimester`, `Second Trimester`, `Third Trimester` | `gradingPeriod` |
| `Year Round` | `schoolYear` |

### `SexDescriptor` → OneRoster `demographics.sex`

Populates the `sex` field on `/demographics` records.

| Ed-Fi value | OneRoster `sex` |
|---|---|
| `Female` | `female` |
| `Male` | `male` |
| `Non-binary` | `other` |
| `Not Selected` | `unspecified` |

### `RaceDescriptor` → OneRoster race booleans

Populates the five race-flag fields
(`americanIndianOrAlaskaNative`, `asian`, `blackOrAfricanAmerican`,
`nativeHawaiianOrOtherPacificIslander`, `white`) and
`demographicRaceTwoOrMoreRaces` on `/demographics` records.

| Ed-Fi value | OneRoster value |
|---|---|
| `American Indian or Alaska Native` | `americanIndianOrAlaskaNative` |
| `Asian` | `asian` |
| `Black or African American` | `blackOrAfricanAmerican` |
| `Native Hawaiian or Pacific Islander` | `nativeHawaiianOrOtherPacificIslander` |
| `White` | `white` |

A student associated with two or more _mapped_ race values gets
`demographicRaceTwoOrMoreRaces = 'true'`.

### `StaffClassificationDescriptor` → OneRoster `user.role`

Populates the `role` field on staff `/users` records. Twenty-five Ed-Fi
values ship mapped; the most commonly used are:

| Ed-Fi value (selection) | OneRoster `role` |
|---|---|
| `Teacher`, `Elementary Teacher`, `Secondary Teacher`, `Substitute Teacher`, `Instructional Coordinator`, `Ungraded Teacher`, `Pre-Kindergarten Teacher`, `Kindergarten Teacher` | `teacher` |
| `Paraprofessional/Instructional Aide`, `Instructional Aide` | `aide` |
| `Counselor`, `School Counselor`, `Elementary School Counselor`, `Secondary School Counselor` | `counselor` |
| `Principal`, `Assistant Principal` | `principal` |
| `School Administrator`, `School Administrative Support Staff`, `School Leader` | `siteAdministrator` |
| `LEA Administrator`, `LEA Administrative Support Staff`, `LEA System Administrator`, `Superintendent`, `Assistant Superintendent`, `State Administrator` | `districtAdministrator` |

The full list is in `02_descriptorMappings.sql`. Several Ed-Fi staff
classifications are _deliberately unmapped_ because 1EdTech does not define
a corresponding OneRoster role — see _Unmapped values_ below.

### `ClassroomPositionDescriptor` → OneRoster `enrollment.primary`

:::warning

**Shipped but not consumed in the current release.** `01_descriptors.sql`
and `02_descriptorMappings.sql` seed a `ClassroomPositionDescriptor` mapping
(`Teacher of Record` → `TRUE`, all others → `FALSE`) so that the service
can later flag a primary teacher on each staff enrollment. The current
`enrollments.sql` view hardcodes `role = 'teacher'` and `primary = 'false'`
for all staff-section associations and does not read this mapping.

Until the enrollments view is updated to consume the mapping, extending or
customizing `ClassroomPositionDescriptor` entries has no effect on
OneRoster output.

:::

## Behavior for unmapped values

An _unmapped_ descriptor is an Ed-Fi descriptor value that either:

- Has no row in `edfi.descriptormapping` whose `mappednamespace` is the
  OneRoster 1.2 namespace for that descriptor, or
- Is a locally-added Ed-Fi descriptor value that a deployment has not
  explicitly mapped.

The service does not have a single answer here — each view handles
unmapped values differently, and implementers should be aware of the
differences:

| Descriptor | Join style | Unmapped behavior |
|---|---|---|
| `CalendarEventDescriptor` | Inner join + `WHERE mappedvalue = 'TRUE'` | Unmapped calendar-event values are not counted as school days. School-year start/end dates are computed from only mapped-TRUE events. |
| `TermDescriptor` | Inner join | **The entire session is dropped from `/academicSessions`.** Any `edfi.session` whose `TermDescriptor` is unmapped will not appear in OneRoster output. |
| `SexDescriptor` | Left join | `sex` is emitted as `null` on `/demographics`. The student is still returned. |
| `RaceDescriptor` | Left join + `array_remove(..., null)` | Unmapped race values are silently dropped from the student's race array. If _all_ of a student's race values are unmapped, every race boolean is `'false'` and `demographicRaceTwoOrMoreRaces = 'false'`. The student is still returned. |
| `StaffClassificationDescriptor` | Left join + `coalesce(..., 'teacher')` when staff has any section assignment | If the staff member has _any_ `edfi.staffSectionAssociation`, their role defaults to `'teacher'` when unmapped. If they have no section assignment _and_ no mapped classification, **they are filtered out of `/users`** entirely. |
| `ClassroomPositionDescriptor` | Not consumed | No effect (see warning above). |

:::warning

The two high-impact cases are `TermDescriptor` and `StaffClassificationDescriptor`:

- Custom `TermDescriptor` values (for example, district-specific term names)
  require a descriptor mapping or the corresponding sessions will be invisible
  to OneRoster clients.
- Staff with an unmapped `StaffClassificationDescriptor` who do not teach
  sections are filtered out. A principal or counselor with a non-shipped
  local classification and no section assignments will not appear in
  `/users` until the descriptor is mapped.

:::

## Extending a mapping

Additional mappings are added by inserting rows into `edfi.descriptormapping`.
Use the OneRoster 1.2 namespace for the `mappednamespace` and the same
`mappedvalue` as one of the shipped rows for that descriptor so the view's
downstream logic keeps working.

### Generic INSERT template

```sql
INSERT INTO edfi.descriptormapping
    (namespace,                     value,                  mappednamespace,                                 mappedvalue, discriminator)
VALUES
    ('<ed-fi namespace>',         '<ed-fi value>',         'uri://1edtech.org/oneroster12/<Descriptor>',   '<oneroster value>', 'edfi.<Descriptor>')
ON CONFLICT DO NOTHING;
```

For Microsoft SQL Server, replace `ON CONFLICT DO NOTHING` with an
`IF NOT EXISTS` guard or a MERGE statement.

### Worked examples

Adding a custom state-defined `StaffClassificationDescriptor` value
`Intervention Specialist` as an aide:

```sql
INSERT INTO edfi.descriptormapping
    (namespace, value, mappednamespace, mappedvalue, discriminator)
VALUES
    ('uri://mystate.gov/StaffClassificationDescriptor',
     'Intervention Specialist',
     'uri://1edtech.org/oneroster12/StaffClassificationDescriptor',
     'aide',
     'edfi.StaffClassificationDescriptor')
ON CONFLICT DO NOTHING;
```

Adding a custom `TermDescriptor` value `Intersession` as a term:

```sql
INSERT INTO edfi.descriptormapping
    (namespace, value, mappednamespace, mappedvalue, discriminator)
VALUES
    ('uri://ed-fi.org/TermDescriptor',
     'Intersession',
     'uri://1edtech.org/oneroster12/TermDescriptor',
     'term',
     'edfi.TermDescriptor')
ON CONFLICT DO NOTHING;
```

Mapping a locally-added `CalendarEventDescriptor` value `Remote instructional
day` as an instructional day so it counts toward the school year:

```sql
INSERT INTO edfi.descriptormapping
    (namespace, value, mappednamespace, mappedvalue, discriminator)
VALUES
    ('uri://mydistrict.edu/CalendarEventDescriptor',
     'Remote instructional day',
     'uri://1edtech.org/oneroster12/CalendarEventDescriptor',
     'TRUE',
     'edfi.CalendarEventDescriptor')
ON CONFLICT DO NOTHING;
```

### Applying changes

After inserting new `descriptormapping` rows, refresh the OneRoster views so
the new mapping takes effect:

- PostgreSQL: run the refresh via pg-boss or manually:
  `REFRESH MATERIALIZED VIEW CONCURRENTLY oneroster12.<view_name>;`
- Microsoft SQL Server: run the refresh procedure:
  `EXEC oneroster12.sp_refresh_<table_name>;`
  (or `EXEC oneroster12.sp_refresh_all;` to refresh everything)

See [Configuration](../configuration/readme.md) for the scheduled refresh
cadence.

## Known unmapped Ed-Fi `StaffClassificationDescriptor` values

Several Ed-Fi-shipped values have no corresponding OneRoster `RoleEnum`
entry and are intentionally left unmapped by the service. They are listed
(as comments) at the bottom of `02_descriptorMappings.sql`:

- `Librarian/Media Specialist`
- `Library/Media Support Staff`
- `School Psychologist`
- `Student Support Services Staff (w/o Psychology)`
- `All Other Support Staff`
- `Instr Coordinator and Supervisor to the Staff`
- `Missing`
- `LEA Specialist`
- `Operational Support`
- `Other`
- `School Specialist`
- `Support Services Staff`

Teams using these values should add their own mapping rows pointing at the
OneRoster role that best fits their deployment's conventions (commonly
`teacher`, `aide`, or `siteAdministrator`).
