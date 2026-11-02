# Date & DateTime Elements

When developing client systems for the Ed-Fi API, you should be aware of how
the platform handles dates and datetime values.

When working with datetime elements, the Ed-Fi API has the following behavior:

- On data in, clients should send datetime values in
  [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format with a time zone
  designator (e.g., `2019-12-30T11:55:26Z`). This can include an offset or can
  be expressed in UTC (i.e., with a zero offset). This approach avoids any
  ambiguity around the time zone. If the value has no offset or time zone
  designator, UTC is assumed.
- Data is stored as UTC, to the second. Fractional seconds are dropped.
- Data is provided to clients in ISO-8601 UTC format, `yyyy-MM-ddTHH:mm:ssZ`
  (e.g., `2019-12-30T11:55:26Z`).

The API also accepts some other datetime formats and converts them to UTC. For
example, a date with no time (`2019-12-30`) is stored as midnight UTC
(`2019-12-30T00:00:00Z`), and values with slash-separated dates
(`12/30/2019`) or AM/PM times are accepted. Send ISO-8601 values anyway,
because slash-separated dates are read month-first: `5/1/2019` is May 1, not
January 5.

When working with date fields, the Ed-Fi API has the following behavior:

- The API rejects input if a datetime value is provided to a date-only element.
- The API only returns a date-part for date elements.
