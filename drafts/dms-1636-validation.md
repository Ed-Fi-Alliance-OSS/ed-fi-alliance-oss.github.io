# DMS-1636 Validation Evidence

Status: both database evaluations completed. PostgreSQL deviations and the
readiness-reporting limitation are recorded below.

## Release Inputs

- Data-Management-Service tag `v8.1.0` resolves locally and through GitHub to
  `59937bba526a39526649b0071ceb3342ab359387`.
- Qualified Kafka Connect image:
  `edfialliance/ed-fi-kafka-connect@sha256:bfabcabfd28868d32ab0271b42b7d147b9566c89bfe1747716368208e8291921`.
  Pull by digest succeeded on 2026-11-16.
- The release qualification record identifies companion commit
  `f4f1db3ca7c09a5b2d82830ca6ee264366ab0c71` and qualification run `41711276619`.
- PostgreSQL, Kafka, and Kafka UI use the references shipped in the release's
  Compose files. SQL Server uses the shipped mutable `2025-latest` tag; record
  its resolved identity with the SQL Server result.
- Application images are built from the cloned release under unique local
  names. SchemaTools is published by the release bootstrap from that source.
  No runtime scripts or source files have been patched.
- The walkthrough selects Data Standard 5.2; no claim is made that these runs
  validate 6.1.

Observed PostgreSQL-run image references:

| Service | Image reference or source-build image ID |
| --- | --- |
| PostgreSQL | `postgres:18.6-alpine@sha256:77f585114c32fbca283dc835b0596f4e52b51b4c6662d7810b2f4084f60a1873` |
| Kafka | `apache/kafka:3.9.0@sha256:fbc7d7c428e3755cf36518d4976596002477e4c052d1f80b5b9eafd06d0fff2f` |
| Kafka UI | `provectuslabs/kafka-ui:v0.7.2@sha256:8f2ff02d64b0a7a2b71b6b3b3148b85f66d00ec20ad40c30bdcd415d46d31818` |
| Ed-Fi API, built from the release | `sha256:07afb8c3d8a765d00d3d9fd97613917e50496d28272b51902854762039730d53` |
| Configuration Service, built from the release | `sha256:6f877bbe9789b373cf6bc5bdcddb0010f9dffa158a48f02a0934b220bd4793be` |

The worker used the qualified digest above. Container inspection confirmed these
references and image IDs; bootstrap used schema package build `1.0.335`.

Source references reviewed at the release tag:

| Requirement | Source |
| --- | --- |
| Local support boundary | `reference/cdc-documentation/README.md#supported-deployment` |
| Full preparation and status interpretation | `reference/cdc-documentation/operations-runbook.md#postgresql-setup` and `#sql-server-setup` |
| Retained stop/start | `reference/cdc-documentation/operations-runbook.md#managed-lifecycle` |
| Capture sources | `reference/design/backend-redesign/design-docs/cdc/0001-relational-cdc-projector-and-sources.md` |
| Public fields, ordering, replay, retention, security | `reference/design/backend-redesign/design-docs/cdc/0002-kafka-topic-and-message-contract.md` |
| Settings and commands | `src/dms/clis/EdFi.DataManagementService.SchemaTools/README.md#cdc-deployment-commands` |
| Worker identity | `src/dms/backend/EdFi.DataManagementService.Backend.Cdc/CdcQualifiedWorkerImage.json` |
| Complete protected settings and host/container addresses | `eng/docker-compose/tests/cdc-fixture-inputs.psm1` and the runbook |
| Bootstrap tool acquisition | `eng/docker-compose/bootstrap-schema-tool.psm1` |

## Host and Isolation

Validation host: Ubuntu 24.04.5 LTS, x86_64; PowerShell 7.6.6, .NET SDK
10.0.102, Docker Engine 29.9.2, Docker Compose 5.7.0, Node.js 26.12.1.

A fresh release clone is under
`/tmp/dms-1636-evaluation.4kUJ6f/Data-Management-Service`. Private command output
and working inputs are retained beneath the owner-only parent directory.
Before preparation, no `dms-local` containers or volumes existed and the `dms`
network had no attached containers. The existing unrelated broker and Portainer
containers were not changed. The database alternatives run sequentially.

A preliminary infrastructure run revealed that ordinary Compose startup can
reuse cached local application images. The draft now assigns unique application
image names. Only the newly created infrastructure was removed before restarting
with a fresh database volume and the release-built Configuration Service image.
No CDC source had been provisioned or admitted during that reset.

## Walkthrough Runs

| Check | PostgreSQL | SQL Server |
| --- | --- | --- |
| Fresh infrastructure and Configuration Service | Passed | Passed |
| Restricted connector login | Passed | Passed |
| Database prerequisites | Logical WAL, 10 slots/senders, active managed slot and publication | RCSI, snapshot isolation, CDC, nested triggers, Agent enabled |
| Managed bootstrap and API startup | Passed | Passed |
| API token and create envelope | Passed, HTTP 201, version 1 | Passed, HTTP 201, version 1 |
| Same-key update, higher version, preserved creation time | Passed, HTTP 204, version 2 | Passed, HTTP 204, version 2 |
| Same-key null tombstone | Passed, HTTP 204 | Passed, HTTP 204 |
| Status result and readiness limitation | Exit 1; see observation below | Exit 1; see observation below |
| Managed stop/start and same-generation delivery | Passed with UI included; new record at offset 3 | Passed with UI included; new record at offset 3 |
| Kafka UI observations | Create, update, and deletion observed | Create, update, and deletion observed |

PowerShell settings and bootstrap commands are extracted from the draft page.
The PostgreSQL `createuser` command is driven through a pseudo-terminal; its
masked prompts receive the password from the protected environment file.
No credentials are included in this evidence.

### PostgreSQL Observation

The same lowercase key `48df446c-5781-db65-506b-9ad65c819567` appeared at
offsets 0, 1, and 2. Create/update versions were 1 and 2; both preserved
`documentCreatedAt: 2026-11-17T05:33:42Z`. The third record was a record-level
null. Kafka UI showed all three; console-consumer output independently confirmed
plain JSON object values and the null tombstone. The live project name is
`Ed-Fi`, so the draft was corrected from the design reference's illustrative
`EdFi` value.

Standalone status exited 1 with aggregate `NotReady`, projection `Unknown`,
and `StatusObservationUnavailable`; the target diagnostic was Projection /
`Unavailable`. It did **not** expose `RuntimeNotObserved`. Binding, source
history, provider setup, connector configuration/runtime, offset store, Kafka
policy, and lag were satisfied; the queue was empty. This is recorded as
unavailable projection evidence, without attributing the specific result to
the documented runtime-observation limitation or claiming aggregate readiness.

The initial managed stop/start succeeded. Kafka UI remained running because
optional service flags are selected per lifecycle invocation. The final page
repeats `-EnableKafkaUI` for stop and start; subsequent validation used those
exact commands. The UI-inclusive stop succeeded and
stopped Kafka UI along with the other evaluation services.

The following start was interrupted with exit 143 before the worker started;
the cause of the termination signal is unknown. The retained inventory was
`Transition`, with the API stopped. A fresh managed stop initially failed
because the worker was unreachable. To restore observation access, the same
retained worker container was started; no configuration, offsets, or state
files were changed. Its connector remained `STOPPED` with no tasks. Status
classified the interval as `NativeRecovery`, with
`unobservedIntervalCertified: false`. This does not certify continuity during
the interruption. A fresh wrapper-managed stop then succeeded and persisted
`Stopped`. Subsequent starts used a fresh verified shutdown checkpoint before
testing another resource on the same topic generation.
Further attached command attempts also ended with signal 143, including one
stop attempt; the signal source remains unknown. Separately supervised commands
retained explicit completion records. A supervised stop completed, while the
next start brought up the broker, worker, and UI but returned a controller
rejection before starting the API. The connector remained stopped. A fresh
managed cycle with the release's sanitized failure-output option enabled
completed successfully, without tracing or source changes; it produced no
failure diagnostic. The earlier rejection's specific cause was not captured.

That final cycle ran the page's stop/start commands with `-EnableKafkaUI` and
exited `0`. A fresh token and the post-restart create command returned HTTP
`201`. Key `48df4470-af97-f0df-b5ac-ff8c68d7a86b`, code value
`CdcDemoAfterRestart`, appeared at offset 3 with `contentVersion: 4` on the
same `edfi.instance.datastore-1-g1.documents.v1` topic. Kafka UI and the console
consumer both confirmed it. The database checks showed the managed publication
and an active `pgoutput` slot. This demonstrates resumed delivery; it does not
certify the earlier interrupted interval or aggregate readiness.

Before switching providers, original runtime settings, deployment inventory,
and source history were archived privately. The original wrapper retired
the disposable PostgreSQL stack with `-d -v -EnableKafkaUI` and exited `0`.
All evaluation containers and volumes were removed; the unrelated broker and
Portainer remained running, and the shared network was empty. No broader prune
or manual state deletion was used.

### SQL Server Observation

The separate clean clone used the same release commit and the same qualified
Kafka, Connect, and UI images. The shipped `2025-latest` SQL Server reference
resolved to
`mcr.microsoft.com/mssql/server@sha256:05644dad1266ca3d445d1e8f6d2ebb9a6a03df9a39376e0f7b48917356dca9d9`.
The release-built API image ID was
`sha256:0a7fa810936ec8454486c2f978fd0bf84834d42f70afecd2c562000ef40e9a35`;
Configuration Service was
`sha256:8954b1c375365c30048b582c94b74731a02c714f3cb1ecf2621fd12cb51de9ba`.

Initial preparation through successful bootstrap completed without a retry.
The final database checks confirmed RCSI `1`, snapshot isolation `ON`, CDC `1`,
nested triggers `1`, and SQL Server Agent `Running`. Their display was refined
to avoid SQL variant padding, then the final command was rerun successfully.

Key `48df4472-7a2b-9a50-109c-ada91acf27cf` appeared at offsets 0, 1, and 2.
The create returned HTTP `201` and version `1`; update returned `204` and
version `2`, preserving `documentCreatedAt: 2026-11-17T06:17:37Z`. Delete
returned `204` and a same-key record-level null. Each operation was observed in
Kafka UI before the next mutation; console-consumer output confirmed the values.

Standalone status exited `1` with aggregate `NotReady` and projection
`Unknown` / `StatusObservationUnavailable`. The only diagnostic was Projection /
`Unavailable`; `RuntimeNotObserved` was not exposed. All other applicable
components, including source history, connector runtime, and lag, were satisfied.
This is an unavailable projection observation, not aggregate readiness proof.

The page's managed stop/start commands, including `-EnableKafkaUI`, completed
on the first attempt with exit `0`. The post-restart create returned HTTP `201`;
key `48df4473-50d8-8da1-c0ac-4faa75d3ce44`, code value `CdcDemoAfterRestart`,
appeared at offset 3 with `contentVersion: 51` on the same
`edfi.instance.datastore-1-g1.documents.v1` topic. Kafka UI and the console
consumer both confirmed resumed delivery. Original settings, inventory, and
source history were archived privately before governed evaluation cleanup.
The original wrapper's `-d -v -EnableKafkaUI` cleanup exited `0`; no evaluation
containers or volumes remain. The unrelated broker and Portainer are unchanged.

## Documentation Checks

- Changed-file Markdown lint: passed for all seven changed/new `.md` files.
- Changed-file MDX format and ESLint: passed for both changed `.mdx` files.
- Full Docusaurus build after wording/UI refinements: passed on 2026-11-17. The rendered
  horizontal diagram was too small; the revised vertical diagram is readable
  and its labels and connections were visually checked.
- `git diff --check`: passed.
- Full lint rerun: exactly 52 errors in the same nine files, all byte-for-byte
  unchanged from base commit `68c41d1`. No new errors. The authorized inherited
  lint exception was applied.
- New external links: HTTP 200 for the worker Docker Hub page and three
  release source pages; referenced anchors verified in the matching source.
- PowerShell snippets: parser validation passed.
- Rendered feature, walkthrough, Docker, configuration, and package inventory
  reviewed. All four database tab groups switch together; the selected engine's
  commands are visible, links resolve, and the browser console reports no errors.
  The autogenerated How-To index includes the walkthrough. Existing package
  heading anchors are preserved under the v8 headings.

## Review Summary

For [DMS-1636](https://edfi.atlassian.net/browse/DMS-1636), this change replaces
the Kafka feature placeholder with the public message contract and consumer
guidance. It adds a complete local walkthrough with PostgreSQL and SQL Server
tabs, and connects the Docker, configuration, feature overview, and package
inventory pages. Public explanations use Ed-Fi API v8 and plain technical
language; exact release inputs remain in commands and artifact references.
Required setup and troubleshooting stay on the public documentation site.
Existing package-page anchors are preserved.

Both engines passed fresh bootstrap, API authentication, create/update/delete
observations, and same-generation delivery after managed stop/start. Changed
Markdown and MDX lint and the full site build pass. Repository-wide lint still
reports the same 52 inherited errors in nine unchanged files; the user-authorized
exception in `PLAN.md` permits continuing validation without unrelated cleanup.

The deployment remains a local evaluation with Kafka authorization disabled.
Standalone projection observations were unavailable on both engines, so delivery
does not establish aggregate readiness. PostgreSQL required reconciliation and
retries after interrupted attempts; the successful final cycle and earlier
failures are distinguished above. No runtime source changes were used.
