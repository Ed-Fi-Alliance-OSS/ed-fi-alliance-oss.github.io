# Invest in a Strong UX

In some implementations, data exchange is considered a "back-end" concern and is accordingly developed in a "back-end" fashion, using less-friendly command-line tools and separate developer-like utilities. This is often a very serious mistake.

In data exchange, particularly regular and automated exchange, your users or customers are taking a greater dependence on your system's data, and as such are relying on that data more, not less.  If users are not provided a good user experience (UX), they can waste valuable time trying to understand how to manage the exchanges and their inefficiency will become yours as they open support tickets or otherwise try to contact you.

A thoughtful and unified user experience prevents many issues from escalating. Don't force users to go to separate applications or utilities to get a single job done. Generally, a unified set of webpages that covers the necessary functions and is targeted at existing product users will help a great deal.

Other items that should be considered when building the frontend to your Ed-Fi integration:

* Including downloadable error logs
* The capability to see API JSON payloads for failed requests
* The capability to trigger results of specific API resources more broadly and for specific records
* and providing meaningful error messages with clear actions to remediate them

Many people working in educational data are educators _first_… and technologists _second_. The time they waste trying to learn how to manage your Ed-Fi integration will become a burden to you as they open support tickets or otherwise try to contact you.

## Initial Configuration

In general, configuration and management should be simple enough for a data steward to be able to set up and maintain without interaction from source system support staff. Complexities should be fully documented and that documentation should be available on demand. Keep in mind that the agency/data steward may be assisted by service agencies who do not have direct access to your support model.

### URL Fields

* URL text fields should not be added to by the programming behind the scenes. Only the text that is presented to the user in the UI should be used. Any non-UI additions to the URL make the connection difficult to troubleshoot as the data steward will not know the full text of the connection URL.

### Security Considerations

* The key may be displayed but the secret should be hidden, and stored in encrypted form. The source system should be prepared for expiry schemes on the part of ODS platform management.

### Setting Up Connectivity

* There should be functionality to test the ODS/API connection with feedback to include http/s response and suggestions for how to resolve bad connections.
* There should be a general clear progression from configuration to data flow. Do not separate screens/functionality across multiple menu items or logical areas. Data stewards should not have to hunt across the source system for logically connected configuration and data submission screens.
* Connections should take a profile based approach that allows for multiple connections to different stores that are potentially on different Ed-Fi API versions. (as an example, sandbox vs production; or multiple instance year specific production connections).
* The system should allow for cloning of initial configuration from year to year so that the entire configuration process does not have to be redone for each school year or connection. Be sure to include descriptors in this approach. The key/secret is the only exception to this; the system should force reentry of key and secret.

### Version Support

* The source system will generally be in the position of having to support multiple Ed-Fi versions, as well as multiple extension versions. The configuration of the connections should be clear and recognizable.

### Descriptive Text

* All user entered fields should have descriptive text/examples if possible. Ed-Fi or Source system specific “lingo” should be defined and clear to the end user. On-line or on-demand help documentation is acceptable if on-screen examples would complicate the UX.

## Descriptors

Simplicity is critical. There should be some functionality to “pre-map” obvious choices (gender and grade level are generally good examples), but always give data stewards the opportunity and ability to change those mappings.

### Operational Context for Descriptors

* Local vs state vs `ed-fi.org`
  * Consult specifications for each state geography when considering help documentation. It is not the role of the source system to determine the correct descriptor mapping, as long as the actual method of mapping is easy to navigate.
  * Make sure to clearly document the decision tree of descriptor mappings.
  * Always display the namespace associated with each descriptor value to avoid confusion in the case of obvious semantic duplication.
* There should be some functionality to create and push local descriptors, as that may be required by some geographies. Be aware that authorization restrictions may block this functionality. Make the data steward aware of potential issues.
* The UX should clearly indicate where the user should navigate in order to start sending local descriptors, if this is required.

## Synching

### Dependency Order

* The system should clearly describe and model the dependency order (for instance, by ordering API resources on a sync page in dependency order). This could be potentially automated by accessing the dependencies endpoint for the API connection, but be prepared to fall back on a static depiction of the order.
* Dependency order should be interactive to allow for the data steward to adjust for local use cases where a specific endpoint’s source of truth is not this system (example: the staff record may be owned by the HR/Finance application but the Staff Section is owned by the SIS). Consider these cases when developing error troubleshooting screens.
* Consider a hierarchical model where core resources are turned on by default, but state and local resources available are turned off until interaction from the data steward.

### Frequency of Synching & Scheduling

* The Ed-Fi standard specifies “near” real time transmission. This means:
  * That the data submission should not be dependent on the data steward to manually push - there should be scheduling/automated approaches easily accessible.
  * That whenever possible updates (including adds and deletes) should be sent immediately upon saving the record.
  * When immediate sends are not possible (such as when a system calculation needs to occur) that they happen quickly (5-15 minute batching).
  * That when batching occurs there is always a functionality for the data steward to immediately start the batch.
  * That domains/data elements that cannot be sent in real time be fully documented with timing and reasoning.
  * You may find that a regularly scheduled re-sync is valuable for your system. This does not violate the near-real-time requirement.
* Since some sort of scheduling is almost always necessary, the source system should re-use whatever scheduling functionality already exists and is known to the data steward. You should not reinvent the wheel.

## Error Messaging & Troubleshooting

### Communicating Errors to Users

* Provide documentation for likely API error messages, including how the errors are generally corrected in the source system. This documentation may develop over time with input from your customer success team.

### Handling Large Systemic Errors

* Some errors (such as dependency order errors) may cascade. Whenever possible the system should have logic to determine the root cause, or at least some in-system recognition of the possibility of a cascade that is communicated to the user.
* Certain kinds of errors tend to happen in large blocks (again, such as dependency order errors). You should provide a way to summarize large numbers that are indicative of a systematic/procedural error rather than a single record. Errors of this type should be prioritized in some fashion.

### Helping the User Debug Issues

* It should be easy for the end user to see/access the JSON for a particular payload, within the UI. If possible without introducing excessive complexity, the JSON should be displayed along with the error and the source data. It may also be helpful to show the record as it exists in the ODS and potentially examples of successful record updates for that resource. These resources are especially valuable in cases where there is an implementation partner external to the agency or where the error needs to be escalated.
* The data steward should be able to resend records from the error troubleshooting screen. The data steward should not need to schedule a complete resync to clear specific errors.
* Error logs should be exportable for use by data steward staff or external implementers for troubleshooting. Appropriate care should be taken to protect PII, either by not including it in the logs or by informing the data steward what PII will be present.
* The source system staff should work closely with SEAs to develop an approach to higher level validation errors that are not regulated by the API. One approach under development is to implement the validation API; however there are a limited number of SEAs that support that model at this time.
