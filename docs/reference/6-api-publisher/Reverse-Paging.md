# Reverse Paging

Reverse paging divides each change version window into pages counted back from
its last record, and queues them from the last page to the first. It is
intended for a source API that is updated while the publish runs and does not
provide a snapshot: with forward `offset`/`limit` paging, records that move
between pages during the publish can be skipped and never reach the target.
The problem is described in the
[edfi_api_client documentation on change version stepping](https://github.com/edanalytics/edfi_api_client?tab=readme-ov-file#change-version-stepping).

A snapshot of the source avoids the problem altogether, and is the recommended
option. See
[Considerations for API Hosts](Considerations-for-API-Hosts.md#provide-snapshot-isolation-for-client-publishingsynchronization).

## Enabling Reverse Paging

Reverse paging works on top of change version paging, so both options must be
set:

```sh
--useChangeVersionPaging=true --useReversePaging=true
```

`ChangeVersionPagingWindowSize` sets the size of each change version window.
Like change version paging, reverse paging reads with `offset`/`limit`, so
cursor paging is not used.

Set `UseReversePaging` only together with `UseChangeVersionPaging`. On its own,
it does not change the order in which pages are read, but it still turns off
cursor paging.
