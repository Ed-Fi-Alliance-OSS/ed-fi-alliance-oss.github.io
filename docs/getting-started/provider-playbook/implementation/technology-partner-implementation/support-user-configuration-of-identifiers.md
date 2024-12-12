# Support User Configuration of Identifiers

In the K-12 ecosystem, there are often multiple, overlapping systems of identifiers.

For example, most students in the United States have several student identifiers, including:

* A local district student identifier
* A state student identifier
* A student number - sometimes provided as an "easy" way for students to access services or self-roster online
* Identifiers from other widely-used platforms, such as a Google ID/Google email

**You may be called upon to use different IDs in different contexts.**

For example, for local operations, the district identifier is likely  the most commonly used ID. However, if a provider needs to send data to the state, the state identifier might be required. If an integration is occurring within the context of a platform provider (for example, into the Google Classroom context) a provider might be relying on yet another ID.

Most rostering specifications—including the Ed-Fi Enrollment API—provide for storage of multiple IDs in order to account for this. Technology providers should allow users to configure which IDs are applicable to which systems for API-based data exchange.
