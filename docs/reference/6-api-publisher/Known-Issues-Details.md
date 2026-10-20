# Known Issues Details

The notes below apply to Ed-Fi API Publisher 1.4. They are grouped by the API in
use as source or target: the [Ed-Fi ODS/API](#ed-fi-odsapi),
[Ed-Fi API v8](#ed-fi-api-v8), or [both](#all-apis).

## Ed-Fi ODS/API

### Sources Without a Configured Snapshot

For an Ed-Fi ODS/API version 7 or later source, the publisher reads from a
snapshot so that the data it walks cannot change mid-run. The Ed-Fi ODS/API does
not configure a snapshot by default. Without one, every source request fails
with `404 Snapshot not found.` and nothing is published.

This applies to the source of a run, not the target.

There are two ways to publish from such a source:

* **Configure a snapshot on the source.** The run then reads from a frozen copy,
  so the data it reads cannot change while it is being walked.
* **Set `--ignoreIsolation=true`.** The run reads live data instead. This is
  simpler, but changes made at the source during the run may not be captured
  consistently.

Setting the option while a snapshot is configured still reads live data, which
is rarely what is intended.

## Ed-Fi API v8

### Snapshots on an Ed-Fi API v8.0 Source

Ed-Fi API v8.0 does not support snapshots. It ignores the request for one and
serves live data, so a run from an Ed-Fi API v8.0 source succeeds with or
without `--ignoreIsolation`, but always reads data that can change while it is
being walked. Publish from it when the source is not being written to, or rely
on the next incremental run to pick up changes made during the run. Support for
snapshots is planned for Ed-Fi API v8.1.

### Paging on an Ed-Fi API v8.0 Source

Ed-Fi API v8.0 does not support cursor paging, so a run from an Ed-Fi API v8.0
source always uses offset paging. The log shows a `WARN` line for each resource
("Request to Source API for the /partitions child resource was unsuccessful");
this is expected and needs no action. Support for cursor paging is planned for
Ed-Fi API v8.1.

### Rate Limit on an Ed-Fi API v8.0 Target

By default, Ed-Fi API v8.0 accepts 5000 requests per 10 seconds and answers the
requests above that with `429 Too Many Requests`. The publisher does not retry a
write rejected this way: the run reports the failed documents and exits with a
non-zero code, but the target is left incomplete. To stay under the limit, turn
on the publisher's own rate limiting, for example
`--enableRateLimit=true --rateLimitNumberExecutions=200 --rateLimitTimeSeconds=1`
(or the same options in `apiPublisherSettings.json`), or raise
`RateLimit:PermitLimit` on the Ed-Fi API.

### Descriptors With Trailing Spaces on an Ed-Fi API v8 Source (Data Standard 5.x)

Three default tribal affiliation descriptors in Data Standard 5.x end with a
space ("Little Shell Tribe ", "Pechanga Band of Indians ", "Yuhaaviatam of San
Manuel Nation "). The Ed-Fi ODS/API keeps the space; Ed-Fi API v8 removes it.
Publishing from Ed-Fi API v8 into an ODS/API therefore creates a second
descriptor next to each of the three, and records that reference them point to
the new one. Data Standard 6.1 is not affected.

## All APIs

### Extensions Present Only on the Target

By default the publisher builds its list of resources from the target. If the
target has an extension the source does not (for example TPDM), reading those
resources from the source fails and the run ends with an error. Exclude the
extension's resources with `--exclude`.

### Writes That Time Out on Every Retry

If the target does not respond to a write within the HTTP timeout on every
retry, the publisher drops that document without reporting it as failed, and a
run with no other errors exits with code 0. A target that refuses or resets the
connection is reported correctly. The run does not advance its last change
version and logs "This run did not finish without losing documents", so a later
incremental run republishes the affected changes. After a one-time full
publish, check the run summary: a resource whose Published count is lower than
its Attempted count lost documents. Reducing parallelism lowers the load on a
target that is close to its limits.
