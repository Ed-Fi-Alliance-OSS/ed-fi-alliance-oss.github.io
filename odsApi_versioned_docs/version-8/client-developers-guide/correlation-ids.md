# Correlation IDs

A correlation ID connects an API request to the host's logs. When you report an
error, quote the `correlationId` returned in the response body, or `traceId` when
the response uses that field instead. That value is the one recorded in the
Ed-Fi API's request logs as `TraceId`; it may differ from an identifier your
client sent.

The Configuration Service doesn't accept client-supplied correlation IDs;
it uses its server-generated request trace identifier.

## Sending a Correlation ID

By default, the Ed-Fi API uses a server-generated trace identifier and ignores
client-supplied correlation IDs. Hosts can accept them by configuring
`AppSettings:CorrelationIdHeader`. Ask your host which request header to use;
there's no enabled header name by default. For example, if the host configures
`correlationid`, send:

```http
GET /api/data/ed-fi/schools HTTP/1.1
Host: api.example.org
Authorization: Bearer <access-token>
correlationid: 94bd4093-faab-4bba-8d02-4ddd5d1cd97f
```

Use a unique identifier per request and keep it in your client's request record.
The Ed-Fi API normalizes the supplied value before using it. Normalization
adjusts the identifier without rejecting the request: the request still succeeds
or fails on its own merits.

## Normalization Rules

The Ed-Fi API applies these steps in order:

1. **Truncate to the host's maximum length.** The default is `255`; hosts can
   configure any value from `64` through `1024`, inclusive, with
   `AppSettings:CorrelationIdMaxLength`. Length is measured in UTF-16 code
   units: many emoji use two units. If the cut would split a character, that
   character is omitted.
2. **Remove characters that are unsafe in logs.** The Ed-Fi API removes control
   characters (such as carriage return, line feed, tab, and null), invisible
   formatting characters (such as zero-width spaces and text-direction marks),
   and Unicode line and paragraph separators. All other characters are kept,
   including punctuation, non-ASCII letters, emoji, and spaces.
3. **Fall back when no usable value remains.** If the normalized value is empty
   or contains only whitespace, use the server-generated trace identifier
   instead. An absent or empty header has the same result.

The allowlist preserves common identifier formats, including UUIDs, braced
GUIDs, AWS X-Ray IDs, and W3C `traceparent` values, provided they fit the host's
length limit.

Truncation happens _before_ filtering. For example, at the default limit, a
value containing 254 `a` characters, then `U+200B` ZERO WIDTH SPACE, then `b`
is first cut to 255 units. The zero-width space is then removed, leaving only
the 254 `a` characters. The trailing `b` isn't brought back to fill the gap.
The result can therefore be shorter than the configured maximum. If the
retained prefix contains only removed characters or whitespace, the Ed-Fi API
uses the server-generated identifier even if usable text followed the cut.

## Finding the ID in a Response

For errors with a problem-details body, read `correlationId` from that body:

```json
{
  "detail": "The specified data could not be found.",
  "type": "urn:ed-fi:api:not-found",
  "title": "Not Found",
  "status": 404,
  "correlationId": "94bd4093-faab-4bba-8d02-4ddd5d1cd97f"
}
```

Some `500 Internal Server Error` responses, including unexpected pipeline
exceptions and certain authorization failures, use a body with `message` and
`traceId` instead of problem details. Read and report `traceId` for those
responses. It contains the same normalized ID used in the request logs; an
absent `correlationId` field doesn't mean the response has no ID.

Save the returned ID alongside the original ID, timestamp, request method, path,
and status code. Give the host the returned ID when asking them to search their
logs. The original ID alone may no longer match, and the Ed-Fi API deliberately
doesn't log the original value when normalization changes it.

The Ed-Fi API doesn't generally return a correlation ID response header. Token
errors are an exception. A POST to `/oauth/token` with a supported content type,
including routes with tenant or qualifier segments, returns errors as OAuth JSON
and puts the normalized ID in the `X-Correlation-ID` response header. Decode
that header once using UTF-8 percent-decoding before searching the logs; for
example, `request%2B42%25` represents `request+42%`. A literal `+` is not a
space. This response header name is fixed and is independent of the configured
request header. See [Authentication](./authentication.md) for token requests.

Some errors return no correlation ID, including certain management and metadata
`404` responses and non-token `413` responses with no body. Successful responses
also need not return one. If no ID is returned, give the host the request's
timestamp, method, path, and status code. A supplied ID helps only when the host
accepted it and normalization left it unchanged; don't assume the value you
sent is a reliable log search key.

For host settings and log examples, see [Correlation
IDs](../platform-dev-guide/configuration/logging-configuration.md#correlation-ids).
