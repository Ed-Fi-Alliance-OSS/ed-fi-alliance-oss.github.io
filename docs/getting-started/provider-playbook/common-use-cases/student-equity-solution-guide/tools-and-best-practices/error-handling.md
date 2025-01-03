# Error Handling

This section describes error handling and integration best practices of note to
Ed-Fi API client developers.

## Error Handling Overview

Proper API error response handling is a feature critical to the sustainability
and scalability of a robust and efficient API client. Education technology
software that has an integrated API client should plan to develop tools and
processes in that software to handle errors.

When possible, errors should be handled programmatically - i.e., the system
looks at the error properties and – when it is possible – attempts to address
the error without the need for human intervention.

Software should also provide a means for appropriate system users to review and
resolve errors received from the API. Errors should be provided to the users who
are best able to address those issues, or who can raise those issues with those
who are able to fix the problem.

## Error Pass-through

It is recommended to pass through all details of errors received from an API
failure to application users. This occurs frequently with system-to-system
communications, such as with error messages received from an Ed-Fi API that then
need to be surfaced to an application user.

If your application receives an error from an Ed-Fi API, it is recommended that
that original API error be made available to the appropriate system user.  The
error message from the API may be technical in nature, so it advised that your
application first properly frame the error in the context of your application,
then present the original source error. The original API error may have details
useful to your application user.

## Authorization Errors

Many API response errors can be attributed to the authorization strategy of the
Ed-Fi API. The most common issue is that a client may not be able to perform
other operations on a resource it has written until a relationship has been
established between that resource and an education organization or namespace to
which the client has access. For example, a client cannot edit a student record
it has created until an enrollment record has established.

See the section "Authorization" for more information on how authorization works.

## Blind Error Message Resending

Unless an error response is truly transient, it is usually not sufficient to
save the originating request and simply retry the request again at some future
point. Generally, some intervention or process must be performed on the request
or the underlying request data.

A robust client should include logic that can determine if the error is
rectifiable solely through programmatic means or if the error needs to be
surfaced to a system admin or data steward. Client systems will also typically
include tools for a system administrator or data steward to resolve the error
case issue.

## Excessive Syncing

Excessive syncing of a client system to an Ed-Fi API should be avoided.
Circumstances may arise that call for a re-sync to the Ed-Fi API. However, a
preset, short time window scheduled (e.g., daily) re-sync can increase error
responses from the Ed-Fi API.
