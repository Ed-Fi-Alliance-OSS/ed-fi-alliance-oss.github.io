# API Extensions

:::info Key Concepts

* The Ed-Fi ODS/API platform contains a system for extending APIs.
* Be sure to follow [Ed-Fi Data Standard Extension Framework Best Practices](/reference/data-exchange/extensions-framework)

:::

Ed-Fi's ODS/API technology allows for the ODS/API to be extended. The ODS/API technology implements extensibility with a defined toolkit that produces regular and predictable patterns. However, the patterns differ by the technology suite.

Please note that the agency you are partnered with may or may not have extended the API.  Your application will only have to deal with an extended API if they have extended, so the information below may not be relevant to your situation.

The API extension patterns and other relevant information are covered below.

## Why Make an API Extensible?

Extensibility is the opposite of standardization, so why support it in the Ed-Fi technology? There are a couple of reasons.

First, the capability has been critical to many field use cases, such as mandated compliance reporting. In such cases, an education agency is often mandated to collect state-specific indicators that are not in wide use elsewhere in K-12 or applicable in other contexts. In such cases, extensibility has proven critical to allowing adaptation to local requirements and conditions.

Some may complain that by definition such projects are "non-standardized" and therefore don't support interoperability. That position takes a very "all-or-nothing" approach to interoperability. In our view, extensibility allows an agency to be interoperable where it can, and customize where it is mandated to do so and where collaboration cannot or should not occur.

Second, extensibility allows for experimentation on new APIs by using the Ed-Fi technology stack. By allowing for extensibility, the community is able to try out proposed revisions of API models and data exchanges through those. Such information can then be used to inform discussions about "what really works" – too often, discussions about the best designs are overly theoretical and disconnected from actual practice.

Extensibility is a power that is not to be used lightly. Used incorrectly, extensibility is a means of fragmenting the ecosystem in ways that harm the overall goal of interoperability. But handled correctly as a community, customization is an opportunity for further exploration and evolution of the Ed-Fi Data Standard.

## Extensibility in Ed-Fi ODS/API Platform

There are two cases for extensibility: an existing API resource can be extended, or an entirely new API resource can be introduced.

### Extensions on an existing entity

In Ed-Fi ODS/API Platform, extended elements appear in API resources in an "\_ext" object at the root of the JSON for the API resource. Further, extensions are namespaced to provide some indication of their provenance.

Generally, in this context a namespace is a short string rather than a full URI (as are often used for namespaces). These are namespaces more in the style of npm.

A extended field will look like this in the JSON of the API resource (we use a fictitious namespace here "statedoe", short for "state department of education").

```json
{
    "firstName" : "Paul",
    "lastSurname" : "Knowles",
    [other fields here]
    "_ext" : {
        "statedoe" : {
            "employmentStatus" : "Not Employed"
        }
    }
}
```

In this case, there may be some state-mandated reason to track if a student has some kind of external employment, and adding a field here allows that to be included in this API resource.

Extensions can also be objects or arrays - they are not limited to fields. For example, a similar extension that captures more info might look like this:

```json
{
    "firstName" : "Paul",
    "lastSurname" : "Knowles",
    [other fields here]
    "_ext" : {
        "statedoe" : {
            "employmentInfo" : {
               "status" : "Part-time Employed",
               "duration" : "6 months"
            }
        }
    }
}
```

### New, "extension" API resources

The other extension pattern in the ODS/API is when a new API resource is introduced. In this case, the API resource is also namespaced, but the namespace appears on the path rather than in the JSON.

To continue the example from above using "statedoe" namespace, another modeling option would be to create a whole new API resource that looks like this:

```json
{
   "studentReference" : {
   "studentUniqueId" : "77844201"
   },
   "status" : "Part-time Employed",
   "duration" : "6 months"
}
```

Instead of extending /student, this uses a reference to the student resource. Notice that there is no namespace here yet.

The namespace in this case appears on the API resource path, which would be prefixed like this:

```text
[API path]/statedoe/employmentInfo
```

assuming that the API resource is named "employmentInfo".
