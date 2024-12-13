# Ed-Fi ODS API Authorization for Assessment Providers

:::warning Scope: Ed-Fi ODS / API Only
Note that the information in this section covers assessment authorization and applies ONLY to users of the Ed-Fi ODS/API. Other API implementations may have different authorization features. Please consult the API developer's documentation for those details.
:::

The Ed-Fi ODS/API uses namespace-based authorization to secure the data entities in the assessment domain. API clients must have first been granted a claim set that covers access to the assessment domain API resources. Also, each API client for the ODS/API is assigned – by the API host – a namespace; this namespace is usually a URI formatted domain name under the providers control, e.g. '[http://mathwhale.org](http://mathwhale.org)'.

With these in place, according to this authorization strategy:

* To read or write an Assessment, the namespace of the API client must match the namespace of the Assessment.
* To read or write an Objective Assessment, the namespace of the API client must match the namespace of the Assessment for the Objective Assessment (the item's parent object).
* To read or write an Assessment Item, the namespace of the API client must match the namespace of the Assessment for the Assessment Item (the item's parent object).
* To read or write a Student Assessment, the namespace of the API client must match the namespace of the Assessment for the Student Assessment (the Assessment for which scores are being provided).

The namespace for an Assessment is simply the field labeled "namespace", as can be seen in this snippet of the Assessment API resource  JSON, which is just a string datatype:

```json
{
  "id": "string",
  "assessmentFamilyReference": {
    "title": "string"
  },
  "educationOrganizationReference": {
    "educationOrganizationId": 0
  },
  "identifier": "string",
  "periodDescriptor": "string",
  "title": "string",
  "maxRawScore": 0,
  "namespace": "string",
  "nomenclature": "string",
...
}
```
