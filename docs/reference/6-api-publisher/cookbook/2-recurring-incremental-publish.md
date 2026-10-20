---
description: A district publishes the changes made since the last run to the state on a schedule.
---

# Recurring Incremental Publish from a District to the State

## When to Use It

A district publishes its data to the state once, and from then on publishes
only the changes made since the last run, on a schedule.

## What You Need

- The source and target API clients from
  [Set Up the Source and Target API Clients](./1-set-up-api-clients.md).
- A configuration store that keeps the last change version published: SQL
  Server, PostgreSQL or AWS Systems Manager Parameter Store. The plain text
  store does not keep it.

Tested with Ed-Fi ODS/API 7.3.2 (Data Standard 6.1, Docker, PostgreSQL) and the
PostgreSQL configuration store.

## Steps

The API Publisher keeps the connections and the last change version published
in the configuration store. Each run publishes only the changes made after the
stored version.

1. Set up the configuration store and point the API Publisher at it, as
   described on the page of the store:
   [SQL Server](../ConfigurationStore/Sql-Server.md) or
   [PostgreSQL](../ConfigurationStore/PostgreSql.md).

2. Define two named connections in the store, `District` and `State`, with the
   base URL, key and secret of each API client, as shown on the same page.

3. Run the first publish by connection name, in PowerShell 7, from the folder
   where the API Publisher is installed:

   ```powershell
   .\EdFiApiPublisher.exe --sourceName=District --targetName=State `
     --includeDescriptors=true --ignoreIsolation=true
   ```

   `--ignoreIsolation=true` reads the source's live data, because an Ed-Fi ODS/API
   7.x source has no snapshot configured by default. Remove it when the source has
   a snapshot configured; see
   [Sources Without a Configured Snapshot](../Known-Issues-Details.md#sources-without-a-configured-snapshot).
   When the run succeeds, the log shows
   `Updating last processed change version from '0' to '<version>' for target connection 'State'`,
   and the store holds the value under
   `/ed-fi/apiPublisher/connections/District/lastChangeVersionsProcessed`:

   ```json
   {"State":<version>}
   ```

4. Schedule the same command, for example with Windows Task Scheduler, with the
   store's settings available to the account that runs it, such as the
   encryption password. Leave enough time between runs for one to finish
   before the next starts. Each run reads the stored version, publishes only
   the changes made after it (including deletes and key changes), and stores
   the new version.

## Check the Result

Every run exits with code `0`. After the first one, the run summary lists only
the resources that changed. A run with nothing new to publish ends in a few
seconds, and its log says that all available changes have already been
published.

On Ed-Fi ODS/API 7.3.2, the `Ed-Fi API Publisher - Reader` claim set does not
include the survey resources, so the source answers `403` for them. The run
exits with code `0` only when they are left out with `--exclude=surveys`;
otherwise it exits with code `2`, although the rest of the data is published,
and the change version is not stored, so every run publishes all the data
again. On 7.3.2, add `--exclude=surveys` to the command in steps 3 and 4.

## Common Errors

| Error | Cause | Fix |
| --- | --- | --- |
| The run exits with a code other than `0` | Documents were rejected, or the run did not finish. | Read the run summary and the errors in the log, and fix the cause. The stored version is not updated, so the next run publishes the same changes again. |
| PostgreSQL store: the run exits with code `2` and the log says "The PostgreSQL Configuration Store encryption key for storing API keys and secrets was not provided" | The encryption password was not supplied. | Supply it as described in [Encryption Password](../ConfigurationStore/PostgreSql.md#encryption-password). |
| The run exits with code `2` with a `NullReferenceException` from the store's `NamedApiConnectionDetailsReader` | The connection name in `--sourceName` or `--targetName` does not exist in the store. | Check the names under `/ed-fi/apiPublisher/connections/`. |

## Related Topics

- [Configuration Store for SQL Server](../ConfigurationStore/Sql-Server.md)
- [Configuration Store for PostgreSQL](../ConfigurationStore/PostgreSql.md)
- [API Connection Management](../API-Connection-Management.md)
- [Run outcome and exit codes](../API-Publisher-Configuration.md#run-outcome-and-exit-codes)
