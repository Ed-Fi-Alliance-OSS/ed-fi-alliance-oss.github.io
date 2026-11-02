# Error Handling & Best Practices

This section describes error handling and integration best practices of note to
Ed-Fi API client developers.

## Error Handling

Proper API error response handling is a feature critical to the sustainability
and scalability of a robust and efficient Ed-Fi API client. Education technology
software that has an integrated API client should plan to develop tools and
processes in that software to handle errors programmatically when possible and a
workflow and tools for the appropriate system user to review and resolve errors
received from the API.

## Authorization Errors

Many API response errors can be attributed to the relationship-based
authorization strategy of the Ed-Fi API. The most common issue is that a client
may not be able to perform other operations on a resource it has written until a
relationship has been established between that resource and an education
organization to which the client has access. For example, a client cannot edit a
student record it has created until an enrollment record has been established.

The same applies when a client re-sends a POST for a record that already
exists: the API treats that POST as an update, so it is authorized as an
update.

Relationship-based authorization is not the only source of `403 Forbidden`
responses. Namespace-based, ownership-based, and custom view-based
authorization also deny requests with `403 Forbidden`. To see which check
failed, read the `type`, `detail`, and `errors` in the response body together,
because the `type` alone may be the generic
`urn:ed-fi:api:security:authorization`. For examples and fixes, see the [Error
Response Knowledge Base](./error-response-knowledge-base.md#403-forbidden). For
ownership denials, see [Ownership-Based
Authorization](../platform-dev-guide/security/ownership-based-authorization.md).

## Concurrency Errors

If a client sends an `If-Match` header and the resource has changed since the
client read it, the API returns `412 Precondition Failed`. Rather than resending
the same request, GET the resource again, reapply the change, and send the
request with the resource's new `_etag` value in the `If-Match` header.

The API also returns `412 Precondition Failed` when a request sends `If-Match`
for a resource that does not exist. In that case, don't retry with `If-Match`:
create the resource first, or send the request without `If-Match`. See [412
Precondition Failed](./error-response-knowledge-base.md#412-precondition-failed)
for details.

## Blind Error Message Resending

Unless an error response is truly transient, it is usually not sufficient to
save the originating request and simply retry the request again at some future
point. Generally, some intervention or process must be performed on the request
or the underlying request data. A robust client should include logic that can
determine if the error is rectifiable solely through programmatic means or if
the error needs to be surfaced to a system admin or data steward. Client systems
will also typically include tools for a system administrator or data steward to
resolve the error case issue.

## Excessive Syncing

Excessive syncing of a client system to an Ed-Fi API should be avoided.
Circumstances may arise that call for a re-sync to the Ed-Fi API. However, a
preset, short time window scheduled (e.g., daily) re-sync can increase error
responses from the Ed-Fi API.

## Best Practices

The Ed-Fi Alliance, through field experience, has developed additional best
practices. These best practices are some features and capabilities that an API
client considers when designing the Ed-Fi API client in the software system.

### Plan for Multiple API Integrations

Some API clients initially built Ed-Fi integrations assuming a single
integration (often with an SEA). But, increasingly, LEAs are asking for
integration as well, resulting in two separate API integrations.
Theoretically, even more integrations are possible (though probably of a
smaller scope of data – see the next item below).

### Plan to Configure API Resources Per API Integration

A state or district integration may only want a fraction of the API resources,
so plan for the ability to "turn off" unused/un-requested API resources. In
some cases, over-sharing is even against state or local policy.

### Plan for Transactional and Bulk Updates

The field expectation is increasingly that data lands quickly in the API after
the data is added or updated in a source system (i.e., a transactional
near-real-time system of record). However, in some cases, data in the system can
get out of sync with data in the API. In such cases, the ability to send bulk
data can be critical. Such bulk updates are also critical if a LEA starts using
the API or system mid year. However, be aware of "Excessive Syncing" mentioned
above.

With that out of the way, let's look at how to use code generation to create an
SDK. The [next section](./using-code-generation-to-create-an-sdk.md) has
details.
