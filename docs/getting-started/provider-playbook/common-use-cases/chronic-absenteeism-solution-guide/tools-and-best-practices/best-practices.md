# Best Practices - Chronic Absenteeism-VDG

The Ed-Fi Alliance, through field experience, has developed additional best
practice recommendations for developers clients that connect to an Ed-Fi API.

## Plan for Multiple API Integrations

Some API clients initially build Ed-Fi integrations assuming a single
integration. But, increasingly, multiple agencies are asking for integrations as
well, resulting in multiple separate API integrations.

The Alliance recommends building under the assumption that there may be multiple
API integrations, each communicating with a different API host.

## Plan to Configure API Resources Per API Integration

A state or district integration may only want a fraction of the API resources.
In some cases, over-sharing is against state or local policy.

Plan for the ability to “turn off” unused/un-requested API resources. The
Alliance further recommends that this capability be exposed to your product's
end users so that they can control this ability without having to raise a
support ticket in your systems.

## Develop for Near Real-time / Transactional but Also for Bulk Updates

Increasingly, the field expectation is that data lands quickly in the API after
it is is added or updated in a source system (i.e., a transactional
near-real-time system of record). However, it is not uncommon that data in the
system can get out of sync with data in the API, due to downtime for your
application or for the API, or due to other errors.

In such cases, the ability to send bulk updates of data is critical. Such bulk
updates are also critical if a LEA starts using the API or system mid-year.
However, be aware of "Excessive Syncing" mentioned in the section "Error
Handling".
