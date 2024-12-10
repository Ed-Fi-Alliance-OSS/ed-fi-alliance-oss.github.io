# Implement Data Reconciliation

Data exchange is a way of synchronizing data across system boundaries. But systems can experience technical or user-induced problems, leaving data synchronization incomplete or in a bad (misaligned) state.

In implementing an API client, you need to provide support to recover from synchronization problems. For example, if your product is an API client that regularly writes data to an API, you need to consider how to ensure that all data is present. If both systems are down for a period of time, it may for example become unclear what transactions were sent, and what the overall state of synchronization is.

As such, it is important to support some kind of data reconciliation process where your system checks that all records are present. In some cases, as Ed-Fi APIs are idempotent (that is, repeated API calls produce the same system state), it may be acceptable to just re-run all transactions. However, if that is several years worth of attendance records for a whole district, you may overwhelm the API by sending everything! Instead, you may want to take a more targeted approach (i.e. check for the existence of records).

In general, there are a few main guidelines to follow:

* Support a process to re-sync data.
* Allow your users to control when such a re-sync occurs so that they can consider the impact on downstream systems and ensure data is correct when they need it most (i.e. before the state's "student count" deadline!).
* Consider if, for your use case, a periodic reconciliation process is useful, and if so, build it into your product design.
