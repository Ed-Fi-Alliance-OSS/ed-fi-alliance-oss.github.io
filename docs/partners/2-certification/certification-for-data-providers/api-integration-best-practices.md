# API Integration Best Practices

The following best practices have been identified as widely adopted by the Ed-Fi
community and lead to significant implementation issues when overlooked. Broad
community usage and expectation warrants their elevation to certification requirements.

* Connections and security​
* Performance and optimization​
* API Consumers​
* Error handling​
* UI/UX for admin user to solve errors

## Connections and Security

Products MUST have the ability to allow for multiple Ed-Fi API connections with different
key/secret combinations​.

In an ecosystem, data often needs to flow from one product to multiple other products or systems.
For example, LEA systems may need to meet both API-based state-reporting requirements and connect
to local LEA data systems and warehouses.

Certification will test for the ability of the product to

* Allow LEA IT staff to configure or select which currently supported API version to use in an API
connection.
* Allow LEA IT staff to set up at minimum four API connections, including - if applicable for the
system - API connections restricted to specific years of data.
  * Current and prior year for SEA connection
  * Current and prior year for local/ESA connection

## Performance and Optimization

API clients should minimize API transactions and reduce network traffic.

This set of best practices will help to ensure scalability of API hosts by focusing on efficiency of
integrations. They will minimize unnecessary data transfers, data churn, and network overhead and
thereby also reduce costs. Since API implementation can be shared resources, these can also reduce
overall latency time or similar complications for the entire vendor community transacting with the API.

Certification will test for the product's ability to perform targeted syncs and use a multi-threading
strategy for API transaction management. Updates should only be made to targeted elements and not sync
unaffected resources. This requirement will minimize uncessesary data transfers, data churn and network
overhead. The system should be able to perform the following during scenario testing:

* Resync single records that have previously failed.
* Resync by single API resource (e.g., all sections, all staff).
* Select and resync a smaller subset of API resources (e.g., by time period, by resource, etc.).

In addition, the system’s primary behavior should be to update records in place using POST/PUT rather
than DELETE/POST​.

## API Consumers

API consuming clients should be developed to minimize unnecessary transactions and use the feature of
the API designed to enable this.

Many performance issues in the Ed-Fi ecosystem can be traced back to improper usage patterns of
the Ed-Fi API. ​ The API is a shared resource, and these practices help minimize client API usage​ by
consuming clients.

Certification will ensure the product adheres to the following:

* Do not use the Ed-Fi API as an application backend​. See guidance on [Backend Development Patterns
for Specialized Ed-Fi Applications](https://edfi.atlassian.net/wiki/spaces/rc/pages/82280450/Backend+Development+Patterns+for+Specialized+Ed-Fi+API+Applications).
* For clients retrieving data from the ODS/API, use [Change Queries​ to gather deltas in the data.
Follow Using the Changed Record Queries (v 6.1)](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V61/pages/18811902/Using+the+Changed+Record+Queries).  ​
* Demonstrate and document the use of paging to improve performance​. Follow patterns described
in [Improving Paging Performance on Large API Resources](https://edfi.atlassian.net/wiki/display/ODSAPIS3V61/Improve+Paging+Performance+on+Large+API+Resources).

## Error Handling

API clients MUST develop a user-centric UX to support administrative users in order to reduce the
number of errors and equip LEA staff with the tools to solve those errors.​ API clients should also react
intelligently to common error situations to reduce the confusion of LEA stewards.

The UX and the API client behavior has a substantial impact on the efficiency with which LEAs are able
to resolve errors. In particular, LEAs can become overburdened by very large numbers of error messages,
many of which can be addressed by small improvements to error handling in the UX.

Further, API clients which are not inspecting error behavior and reacting appropriately can continue to
drive unnecessary API transactions and generate even more errors that degrade the experience and efficiency of LEA IT staff.

* During API synchronization, use exponential back off when receiving non-Ed-Fi errors from an Ed-Fi
API (e.g., HTTP/S 500s; request time outs)​.
* During synchronization, demonstrate the API client does not send multiple dependency order children
POST/PUT requests to an API if the parent entity already failed or is missing​.
* For any failed transactions, provide the LEA’s administrative user a view of the JSON document that
was submitted.

## UI/UX for admin user to solve errors

API client implementers should offer some common features that are useful to LEA IT staff in management
of Ed-Fi-based API connections. For example:

* Allow LEA administrators ability to test the API connection and provide embedded suggestions for
how to resolve bad connections as part of the product feature.​
* Provide LEA administrators with access to a resource​ that helps them resolve common Ed-Fi-related data
errors (e.g., error dictionary).
