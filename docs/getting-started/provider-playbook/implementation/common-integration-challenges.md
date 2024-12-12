# Common Integration Challenges

Below are a number of challenges that commonly occur in new API-based integrations.

We suggest reviewing the section [Technology Partner - Implementation](./technology-partner-implementation/readme.md) for specific implementation advice. This section is a general discussion of common experiences and pitfalls.

## Data Quality

Above all, data quality issues are the most common issues exposed when system-to-system communications are set up for the first time.

In many cases, an API-based exchange is replacing another (often more informal) process where data was moved in a manual way (sometimes jokingly referred to as a "human API"). Quite often, that manual process was supplementing, validating, or otherwise "munging" the data in important ways.

When that older, intermediate step disappears, data quality problems often become apparent. Often the data was "cleaned up" in this older, intermediate process. Sometimes, data quality problems were known to exist, and the problem is just one of sequence—e.g., the API is providing or receiving data _before_ that data goes through some regular cleanup process.

Regardless, these problems can result in partial or incorrect data being exchanged and can even cause API failure if required elements are missing or source system references aren't correct. (For example, a student ID was incorrectly entered in a different system, so attempting to post records fails when the student can't be looked up.)

These problems should be expected in new integrations and you should budget time to work through them during project planning.

## Local Usage Norms and Patterns

In some cases, the right data is in the source system but it is in the wrong place, or the data is formatted such that there are issues downstream. It is common in any application for local usage patterns to emerge.

For example, a school district staff may decide to start entering teacher certification information into a HR system in the "Notes" field rather than in the "Certifications" entry fields. Maybe that was done because it was possible to easily include additional narrative notes that have proven very useful. There may be very good reasons to have adapted to a new process.

But when the HR system tries to do a standardized API-based exchange, it has no way of knowing about this local practice, and as such, the data does not appear in the API exchange.

These issues are solvable, but they often take some time. Similar to the above issue, you should assume that usage patterns might pose issues.

**Pro tip:** A best practice to discover these usage norms is to integrate early with actual systems. Don't do API or API client development in a vacuum. Test integrations with the real world as early as possible!

## New or Revised Staff Responsibilities

Many staff are not accustomed to direct and automated system-to-system communication. Any new process will change local work responsibilities and requires new skills of existing staff.

For example, as errors appear in API transactions and are surfaced back to school district or technology provider staff, staff will see new information and have to fix problems in ways they are not accustomed to.

For new projects, it is best to clearly assign the new roles for all parties involved. For technology providers, understanding how your customers will report and escalate issues is critical so that integrations do not become a burden on you, but instead unlock value for your customers.

Start small and work closely with early customers so that you can understand their needs (and confusion) and tailor your training, documentation, UX, and support.

## Agency Extensions

Some states have created custom extensions for their Ed-Fi technology implementation.  It is important to understand when doing an integration what extensions are in place with the agency you are working with in order to understand how reusable your integration will be for other agencies. If what you are building is highly customized to a specific extension it may not be portable to other implementations.  To learn more about API Extensions read [API Extensions](../implementation/ed-fi-api-fundamentals/api-extensions.md)
