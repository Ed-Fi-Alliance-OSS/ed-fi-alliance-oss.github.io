# Correlation IDs

A correlation ID helps your API host find a request in their logs. When you
report an error, give the host the ID returned in the response. It may differ
from the ID your client sent.

## Sending a Correlation ID

By default, the Ed-Fi API generates its own correlation ID. Hosts can choose to
accept client-supplied IDs instead. Ask your host whether this is enabled and
which request header to use. For example, if the host accepts `correlationid`,
send:

```http
GET /api/data/ed-fi/schools HTTP/1.1
Host: api.example.org
Authorization: Bearer <access-token>
correlationid: 94bd4093-faab-4bba-8d02-4ddd5d1cd97f
```

Use a unique ID per request and save it in your client's request record. The
Configuration Service doesn't accept client-supplied correlation IDs; it
always uses its own request trace identifier.

## How the Ed-Fi API Adjusts an ID

The Ed-Fi API adjusts, or _normalizes_, a supplied ID before using it in logs
and error responses. This doesn't cause the request to fail. The steps are:

1. **Shorten values that exceed the maximum length.** The default limit is
   `255`; hosts can set it between `64` and `1024`. Length is measured in UTF-16
   code units, so many emoji count as two. A character that would be split at
   the limit is omitted.
2. **Remove characters that are unsafe in logs.** These include control
   characters (such as carriage return, line feed, tab, and null), invisible
   formatting characters (such as zero-width spaces and text-direction marks),
   and Unicode line and paragraph separators. Punctuation, non-ASCII letters,
   emoji, and spaces are kept.
3. **Use a server-generated ID if nothing usable remains.** This happens when
   the result is empty or contains only whitespace. A missing or empty header
   has the same result.

Common formats such as UUIDs, braced GUIDs, AWS X-Ray IDs, and W3C `traceparent`
values are preserved if they fit the host's length limit.

Shortening happens _before_ characters are removed, so the final ID can be
shorter than the limit. For example, at the default limit, 254 `a` characters
followed by a zero-width space and then `b` becomes just the 254 `a` characters.
The `b` is cut off first, then the zero-width space is removed.

## Finding the ID in a Response

Check the error response for the ID:

- **Most errors:** read `correlationId` from the JSON body.
- **Some `500 Internal Server Error` responses:** the body has `message` and
  `traceId` fields instead of problem details. Read `traceId`.
- **Token errors:** a POST to `/oauth/token` with a supported content type
  returns errors as OAuth JSON, with the ID in the `X-Correlation-ID` response
  header. This also applies to token routes with tenant or qualifier segments.
  See [Authentication](./authentication.md) for token requests.

Decode the token error header once using UTF-8 percent-decoding. For example,
`request%2B42%25` means `request+42%`; don't convert a literal `+` to a space.
The response header name is fixed, regardless of the request header your host
accepts.

Save the returned ID in your client's request record and give it to the host
when reporting an error. If normalization changed the ID, the original value
won't match and isn't logged.

Some responses don't return an ID. In those cases, give the host the request's
timestamp, method, path, and status code. Don't rely on the ID you sent: the
host may have ignored or changed it.

For host settings and log examples, see [Correlation
IDs](../platform-dev-guide/configuration/logging-configuration.md#correlation-ids).
