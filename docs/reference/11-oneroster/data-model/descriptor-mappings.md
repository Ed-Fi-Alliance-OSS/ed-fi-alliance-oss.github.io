# Descriptor Mappings

Several OneRoster© fields are produced by translating Ed-Fi descriptor
values (for example, `SexDescriptor.Female`) into OneRoster© enumeration
values (`sex = 'female'`). The translation uses rows in
`edfi.descriptormapping` that are seeded when the OneRoster© SQL artifacts
are deployed. Implementations can extend the mapping with their own
`INSERT` statements.

This page lists the six shipped descriptor mappings, documents what each
mapping produces in OneRoster© output, describes what happens to Ed-Fi
descriptor values that are not in the mapping, and shows the `INSERT`
template for extending a mapping.

## Where descriptor mappings live

Two SQL files define the shipped mappings:

- `01_descriptors.sql` inserts the OneRoster©-namespaced descriptor rows
  (for example, `uri://1edtech.org/oneroster12/SexDescriptor / female`)
  into `edfi.descriptor` so that `edfi.descriptormapping` can reference
  them on the mapped side.
- `02_descriptorMappings.sql` inserts the Ed-Fi-to-OneRoster© mapping rows
  into `edfi.descriptormapping`.

Both files live under
`standard/{dataStandardVersion}/artifacts/{pgsql,mssql}/core/`. Running
the deployment script (`deploy-postgres.sh` or `deploy-mssql.js`) executes
both.

## Shipped mappings

Each shipped mapping uses a `mappedNamespace` of
`uri://1edtech.org/oneroster12/{Descriptor}`. The tables below list the
Ed-Fi value to OneRoster© value pairs and the OneRoster© field each
mapping populates.

### `CalendarEventDescriptor` (10 shipped entries)

Used by `academic_sessions.sql` to decide which Ed-Fi calendar dates count
as school days when computing the school-year start and end dates.

| Ed-Fi value | Mapped value | Contributes to school year? |
| --- | --- | --- |
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

### `TermDescriptor` (16 shipped entries)

Populates the `type` field on academic-session records derived from
`edfi.session`.

| Ed-Fi value | OneRoster© `type` |
| --- | --- |
| `Semester`, `Fall Semester`, `Spring Semester`, `Summer Semester` | `semester` |
| `Quarter`, `First Quarter`, `Second Quarter`, `Third Quarter`, `Fourth Quarter` | `term` |
| `MiniTerm` | `term` |
| `Other` | `term` |
| `Trimester`, `First Trimester`, `Second Trimester`, `Third Trimester` | `gradingPeriod` |
| `Year Round` | `schoolYear` |

### `SexDescriptor` (4 shipped entries)

Populates the `sex` field on `/demographics` records.

| Ed-Fi value | OneRoster© `sex` |
| --- | --- |
| `Female` | `female` |
| `Male` | `male` |
| `Non-binary` | `other` |
| `Not Selected` | `unspecified` |

### `RaceDescriptor` (5 shipped entries)

Populates the five race-flag fields on `/demographics` records
(`americanIndianOrAlaskaNative`, `asian`, `blackOrAfricanAmerican`,
`nativeHawaiianOrOtherPacificIslander`, `white`) and the derived
`demographicRaceTwoOrMoreRaces` boolean.

| Ed-Fi value | OneRoster© value |
| --- | --- |
| `American Indian or Alaska Native` | `americanIndianOrAlaskaNative` |
| `Asian` | `asian` |
| `Black or African American` | `blackOrAfricanAmerican` |
| `Native Hawaiian or Pacific Islander` | `nativeHawaiianOrOtherPacificIslander` |
| `White` | `white` |

A student associated with two or more _mapped_ race values gets
`demographicRaceTwoOrMoreRaces = 'true'`.

### `StaffClassificationDescriptor` (25 shipped entries)

Populates the `role` field on staff `/users` records. The most commonly
used entries are grouped below. The full list is in
`02_descriptorMappings.sql`.

| Ed-Fi value | OneRoster© `role` |
| --- | --- |
| `Teacher`, `Elementary Teacher`, `Secondary Teacher`, `Substitute Teacher`, `Instructional Coordinator`, `Ungraded Teacher`, `Pre-Kindergarten Teacher`, `Kindergarten Teacher` | `teacher` |
| `Paraprofessional/Instructional Aide`, `Instructional Aide` | `aide` |
| `Counselor`, `School Counselor`, `Elementary School Counselor`, `Secondary School Counselor` | `counselor` |
| `Principal`, `Assistant Principal` | `principal` |
| `School Administrator`, `School Administrative Support Staff`, `School Leader` | `siteAdministrator` |
| `LEA Administrator`, `LEA Administrative Support Staff`, `LEA System Administrator`, `Superintendent`, `Assistant Superintendent`, `State Administrator` | `districtAdministrator` |

Several Ed-Fi staff classifications are left unmapped in the shipped SQL.
See _Known unmapped Ed-Fi StaffClassificationDescriptor values_ below.

### `ClassroomPositionDescriptor` (4 shipped entries)

:::warning

**Shipped but not consumed in the current release.** `01_descriptors.sql`
and `02_descriptorMappings.sql` seed a `ClassroomPositionDescriptor`
mapping (`Teacher of Record` maps to `TRUE`, the three other shipped
values map to `FALSE`) so that the service can later flag a primary
teacher on each staff enrollment. The current `enrollments.sql` view
hardcodes `role = 'teacher'` and `primary = 'false'` for all
staff-section associations and does not read this mapping.

Until the enrollments view is updated to consume the mapping, extending
or customizing `ClassroomPositionDescriptor` entries has no effect on
OneRoster© output.

:::

## Behavior for unmapped values

An _unmapped_ descriptor is an Ed-Fi descriptor value that has no row in
`edfi.descriptormapping` whose `mappednamespace` is the OneRoster© v1.2
namespace for that descriptor. This includes Ed-Fi values that ship
unmapped and locally-added descriptor values that a deployment has not
mapped itself.

The behavior is not uniform across descriptors. Each view handles
unmapped values differently:

| Descriptor | Join style in the view | Unmapped behavior |
| --- | --- | --- |
| `CalendarEventDescriptor` | Inner join with `WHERE mappedvalue = 'TRUE'` | Unmapped calendar-event values are not counted as school days. School-year start and end dates are computed only from mapped-`TRUE` events. |
| `TermDescriptor` | Inner join | **The entire session is dropped from `/academicSessions`.** Any `edfi.session` whose `TermDescriptor` is unmapped will not appear in OneRoster© output. |
| `SexDescriptor` | Left join | `sex` is emitted as `null` on `/demographics`. The student is still returned. |
| `RaceDescriptor` | Left join plus `array_remove(..., null)` | Unmapped race values are dropped from the student's race array. If all of a student's race values are unmapped, every race boolean is `'false'` and `demographicRaceTwoOrMoreRaces = 'false'`. The student is still returned. |
| `StaffClassificationDescriptor` | Left join plus `coalesce(..., 'teacher')` when the staff member has any `staffSectionAssociation` | If the staff member has any section assignment, their role defaults to `'teacher'` when unmapped. If they have no section assignment and no mapped classification, **they are filtered out of `/users`**. |
| `ClassroomPositionDescriptor` | Not consumed | No effect. See the warning above. |

:::warning

The two high-impact cases are `TermDescriptor` and
`StaffClassificationDescriptor`:

- Custom `TermDescriptor` values (for example, district-specific term
  names) require a descriptor mapping or the corresponding sessions will
  not appear in OneRoster© output.
- A principal or counselor with a non-shipped local classification and no
  section assignments will not appear in `/users` until the descriptor is
  mapped.

:::

## Extending a mapping

Additional mappings are added by inserting rows into
`edfi.descriptormapping`. Use the OneRoster© v1.2 namespace for
`mappednamespace` and the same `mappedvalue` as one of the shipped rows
for that descriptor so the view's downstream logic continues to work.

### Generic `INSERT` template

```sql
INSERT INTO edfi.descriptormapping
    (namespace,             value,           mappednamespace,                                 mappedvalue,         discriminator)
VALUES
    ('<ed-fi namespace>',   '<ed-fi value>', 'uri://1edtech.org/oneroster12/<Descriptor>',    '<oneroster value>', 'edfi.<Descriptor>')
ON CONFLICT DO NOTHING;
```

On Microsoft SQL Server, replace `ON CONFLICT DO NOTHING` with an
`IF NOT EXISTS` guard or a `MERGE` statement.

### Worked examples

Map a custom state-defined `StaffClassificationDescriptor` value
`Intervention Specialist` to `aide`:

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

Map a custom `TermDescriptor` value `Intersession` to `term`:

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

Map a locally-added `CalendarEventDescriptor` value `Remote instructional
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

After inserting new `descriptormapping` rows, refresh the OneRoster©
views so the new mapping takes effect.

On PostgreSQL, run the refresh via pg-boss, or manually:

```sql
REFRESH MATERIALIZED VIEW CONCURRENTLY oneroster12.<view_name>;
```

On Microsoft SQL Server, run the refresh procedure for the affected
entity, or run `sp_refresh_all`:

```sql
EXEC oneroster12.sp_refresh_<table_name>;
EXEC oneroster12.sp_refresh_all;
```

See [Configuration](../configuration/readme.mdx) for the scheduled
refresh cadence.

## Known unmapped Ed-Fi `StaffClassificationDescriptor` values

Twelve Ed-Fi-shipped values have no mapping row in
`02_descriptorMappings.sql`. They are listed as comments at the bottom of
that file:

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

Deployments that use any of these values should add their own mapping
rows, pointing at the OneRoster© role that best fits their deployment's
conventions (commonly `teacher`, `aide`, or `siteAdministrator`).
