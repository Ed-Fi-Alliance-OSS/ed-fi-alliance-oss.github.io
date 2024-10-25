# Reverse Paging

This is the result documentation of
[APIPUB-62](https://edfi.atlassian.net/browse/APIPUB-62)

## In relation to how Publisher does pagination

Publisher does pagination in 2 levels. The first one is done using the Change
Version feature from the Web Api. The second one is done using the offset and
limit parameters.

At a high level, the execution it works like this.

1. Get the total number of records.
2. Using the changeVersionPagingWindowSize app setting determine how many
   windows will be processed.
3. Loop trough the number of Change Query windows.
   1. Get the total number of records for that specific Change Query window.
   2. Based on that number determine how many Offset-Limit windows will be
      processed.
4. Based on all this information prepare the GET requests that will be sent on
   the next step.

Notice that at this point Publisher does not get the real data yet. It just
prepares all the GET requests that will be necessary to retrieve all the
records. It is until the previous process ends (when all the GET requests have
been prepared), that Publisher starts actually getting the data from the source.

## The problem

The problem where a record (or a number of records) can be skipped is described
[here](https://github.com/edanalytics/edfi_api_client?tab=readme-ov-file#change-version-stepping)
(taken from the Jira ticket).

At a high level, the problem they describe is that there could be scenarios
where one or more records can be skkiped from the process and so they will never
be published to the target. Part of this problem accurs because they execute
Publisher on an active database.

What they propose to fix the problem is to execute the Offset-Limit pagination
in reverse mode, so that the last page is processed first, and the first one is
processed last.

## Reproducing the issue on Publisher

Reproducing this problem seemed to be trick. But the help of Visual Studio and
the execution in Debug mode (with break points, etc.) we accomplish to reproduce
it, so the problem does exist.

## In relation to how to implement this on Publisher

1. We will add a flag (on false by default) where the user will be able to
   decide if he wants to execute Publisher in reverse paging mode.

## Other notes

1. Tests will be tricky without the capabilities of Visual Studio in debug mode
   and with a set of break points.
