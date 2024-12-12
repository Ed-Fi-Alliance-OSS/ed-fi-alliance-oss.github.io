# Technology Partner - Implementation

This section contains best practice guidance on implementing an API client to support regular and secure data exchange. This best practice has been observed from current Ed-Fi field work. If you have other suggestions for best practices, please send us your thoughts by submitting a case in the [Ed-Fi Community Hub](https://community.ed-fi.org) and we will continue to add to this section!

In the case of each of these best practices, we are trying to promote reliability and stability—while reducing labor.

Catastrophic failures and over-sharing all increase inefficiency and create work for people. Automation is powerful and can complete millions of transactions per second, so we need to be careful about how we limit the effect of repeated errors.

Priorities and values underpinning these practices include:

* Safeguarding student privacy and data privacy
* Using least rights principles (only send required data)
* Making API clients configurable by customers
* Making troubleshooting clear and understandable
* And providing clear data reconciliation error messaging and actions to remediate

* [Invest in a Strong UX](./invest-in-a-strong-ux.md)
* [Support Multiple Versions](./support-multiple-versions.md)
* [Support User Configuration of Identifiers](./support-user-configuration-of-identifiers.md)
* [Support Data Selection](./support-data-selection.md)
* [Error Handling](./error-handling.md)
* [Implement Data Reconciliation](./implement-data-reconciliation.md)
