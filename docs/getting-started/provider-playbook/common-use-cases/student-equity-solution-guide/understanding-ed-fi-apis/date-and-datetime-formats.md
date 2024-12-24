# Date and DateTime Formats

When developing client systems for the Ed-Fi API, you should be aware of how the
platform handles dates and datetime values.

When working with datetime elements, the API has the following behavior:

* On data in, clients should send datetime values
    in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format with a time
    zone designator (e.g., 2019-12-30T11:55:26Z). This can include an offset or
    can be expressed in UTC (i.e., with a zero offset). This approach avoids any
    ambiguity around the time zone. If the client system omits any precision
    information (which is allowable under ISO-8601), UTC is assumed.
* Data in the Ed-Fi ODS / API platform is stored as UTC.
* Data is provided to clients in ISO-8601 UTC format.

When working with date fields, the API has the following behavior:

* The API rejects input if a datetime value is provided to a date-only
    element.
* The API only returns a date-part for date elements.
