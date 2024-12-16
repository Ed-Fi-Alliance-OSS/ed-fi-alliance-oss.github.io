# Key Structure

:::info Key Concepts

* Ed-Fi employs both a natural key and a REST API identity system.
* There are sometimes options for selecting a natural key, and a few principles can help the provider select an optimal key.

:::

## Natural Keys

To help improve data quality and maximize the possibility for data to move between systems, Ed-Fi’s data model uses natural keys. The key for an entity can be looked up by using the [Ed-Fi UDM Handbook entry for Assessment](http://schema.ed-fi.org/datahandbook-v22/Ed-Fi-UDM-Handbook-Index.html#/Assessment540) and looking under the column “Identity” – key fields are indicated there.1

![udm handbook screenshot](https://edfi.atlassian.net/wiki/download/thumbnails/22905188/handbook.png?version=2&modificationDate=1561126765323&cacheVersion=1&api=v2&width=1271&height=313)

_Figure 1: natural key fields are shown by looking at the "identity" column in the UDM Handbook._

You can see that the entity has two key fields: an AssessmentIdentifier and a Namespace – in the API, these appear as the fields identifier and namespace in the JSON:

![swagger screenshot](https://edfi.atlassian.net/wiki/download/thumbnails/22905188/swagger.png?version=2&modificationDate=1561126422937&cacheVersion=1&api=v2&width=665&height=348)
_Figure 2: the key fields shown in the Assessment JSON - "identifer" and "namespace" fields_

So where do we get these values from in our sample score report? If we look at the original report we find some data that looks appropriate to identify the assessment…

![assessment screenshot](https://edfi.atlassian.net/wiki/download/thumbnails/22905188/mathwhale-assessment.png?version=2&modificationDate=1561126760020&cacheVersion=1&api=v2&width=985&height=63)

_Figure 3: the key fields in the original score report._

…it looks like we have several options for an identifier. Is it the version number? Or the name? Or that long string of letters and numbers below the assessment title? Further, there is no namespace listed – and what is a namespace anyhow?

Since Ed-Fi’s Data Model uses natural keys, there are sometimes options in assigning identity to entities. In assigning identity, we need to consider these factors:

* **Uniqueness** – above all, keys must be unique
* **Stability** – keys -- and key fields by extension -- should not change
* **Existing usage in the ecosystem** – has the ecosystem already adopted keys for inter-system interoperability, and can we re-use those?

So there is no correct answer, but the object is to maximize for the principles above.

If you are the assessment provider, and your assessment has no well-known value that meets these needs, the recommended way to supply the identity is by using your system key as the identifier, and supply a namespace in URI format for a domain under your control. That produces a key that is highly unique and stable.

In the score report, the long alphanumeric is designed to represent a database UUID (these are often not exposed on score reports, but it is shown here to make the example clear). That would lead us to something like:

identifier: 3b82bbde-674f-4fc7-b431-57327d59266f
namespace: [http://mathwhale.com](http://mathwhale.com)

:::warning
If you are NOT the assessment provider, but a 3rd party mapping this data into the API, you may not know if that long string of characters beginning with “3b82…” is a stable identifier or not.

In such as case, you might elect to use the name and version number as the identifier, and assign the namespace to a domain known to be controlled by the vendor. Such a key is likely to be unique-enough, but might be somewhat un-stable (titles can change over time, even retrospectively).

You will note that neither option performs well against using an existing identifier already well known in the ecosystem. However, it is not common for assessment instruments to have existing keys, but it is common with other entities (e.g. students with student IDs, schools with state or federal assigned school IDs, etc.).
:::

Given this key structure, the basic JSON for the Assessment entity looks like this so far:

```json Assessment JSON
{
    "identifier": "3b82bbde-674f-4fc7-b431-57327d59266f",
    "namespace": "http://mathwhale.com", ...
}
```

## Resource IDs

In the API, Ed-Fi API resources are assigned an additional Resource ID by the API implementation, for compatibility with REST conventions. However, the natural key is still available for lookups and must be unique.

[1](https://dellfoundation.sharepoint.com/ed-fi/technology/2019%20Projects/Data%20Exchange%20Standards/Data%20Standard/Use%20Case-based%20Documentation/Assessment%20-%20Use%20Case%20Based.docx#_ftnref2). In Ed-Fi ODS API v3 and higher, natural key fields are also tagged in Open API/Swagger metadata with the tag ‘x-Ed-Fi-isIdentity’
