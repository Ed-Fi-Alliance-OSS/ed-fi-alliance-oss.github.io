# Remediations

Remediations allow you to extend the API Publisher with custom behavior to
remediate failed POST requests against the target API. The remediations are
defined in a JavaScript file whose file system path is provided using the
`--remediationScriptFile` command-line argument (or the `remediationsScriptFile`
setting in the `options` section of the `apiPublisherSettings.js` file).

:::warning This feature uses Node.js for JavaScript execution, and the
JavaScript code does not run in a sandbox. You must take appropriate steps to
only allow trusted remediation scripts to be executed. :::

## Dependency

The remediations feature has a dependency on [Node.js](https://nodejs.org/en/)
which must be available on the `PATH` environment variable.

## Parameters

### FailureContext (input)

The input parameter, `failureContext`, contains information about the failed
request. For example:

```javascript
{
  resourceUrl: "/ed-fi/disciplineActions",
  requestBody: "{ ... }",  // Body of failing request is passed as string
  responseStatusCode: 400,
  responseBody: "{ message: 'Error message.' }", // Body of error response is passed as string
  sourceConnectionName: "MySourceApi",
  targetConnectionName: "MyTargetApi"
}
```

### RemediationPlan (output)

The return value is a remediation plan containing an optional modified version
of the original request and/or an array of additional requests to be POSTed
against the target API. For example:

```javascript
{
  modifiedRequestBody: { ... }, // Optional - include if original request is modified
  additionalRequests: [ // Optional - include if additional requests are to be performed
    {
      resource: '/ed-fi/staffs',
      body: {
        "staffUniqueId": "ABC123",
        "firstName": "John",
        "lastName": "Smith"
      }
    },
    {
      resource: '/ed-fi/sections',
      body: {
        ...
      }
    }
  ]
}
```

Upon return, the API Publisher will POST the returned requests in sequence
against the specified resources on the target API, before retrying the original
failing request.

## Sample Remediations

The following remediations module demonstrates how the remediation functions are
written for specific resources and status codes. The functions will receive
information about the failed POST request and return a "remediation plan"
containing zero or more POST requests to be applied against the target API.

The sample is based on a scenario encountered while publishing data from a state
education agency to a local education agency. Some of the discipline actions
being published were for a student who had been registered at another local
education agency. Because of this, some of the discipline actions for this
student referenced staff (in the `staffs` collection of the resource) that
worked for the other local education agency and were not available for
publishing.

### Solution 1: Add Resource Items for Missing References

To remediate these POST requests failing with a `400 Bad Request` status against
the `/ed-fi/disciplineActions` resource, the following remediation module will
create minimal staff resource items for the unresolveable staff associations:

```javascript
module.exports = {
  // Remediate requests
  '/ed-fi/disciplineActions/400': async (failureContext) => {
    // Parse the request/response data
    const request = JSON.parse(failureContext.requestBody);
    const response = JSON.parse(failureContext.responseBody);

    // Ensure the error message contains the text associated with the failure we're remediating
    if (
      response.message.includes(
        "Validation of 'DisciplineActionStaffs' failed.",
      ) &&
      response.message.includes('Staff reference could not be resolved.')
    ) {
      // Define a regular expression to extract the array index values from the validation message
      const indexRegEx = /DisciplineActionStaff\[(?<Index>[0-9]+)\]/gi;

      // Perform regular expression matching
      const matches = [...response.message.matchAll(indexRegEx)];

      // Prepare the additional requests of the remediation plan
      return {
        additionalRequests:
          // Map the missing staff into requests for the remediation
          matches.map((m) => {
            return {
              resource: '/ed-fi/staffs',
              body: {
                staffUniqueId: `${request.staffs[m.groups['Index']].staffReference.staffUniqueId}`,
                firstName: 'Unknown Staff',
                lastSurname: 'Unknown Staff',
              },
            };
          }),
      };
    }

    // Take no action for the current request
    return null;
  },
};
```

### Solution 2: Remove the Unresolved References from the Request

To remediate these POST requests failing with a `400 Bad Request` status against
the `/ed-fi/disciplineActions` resource, the following remediation module will
remove the `staffs` child collection items for the unresolveable staff
associations:

```javascript
module.exports = {
  // Remediate requests
  '/ed-fi/disciplineActions/400': async (failureContext) => {
    // Parse the request/response data
    const request = JSON.parse(failureContext.requestBody);
    const response = JSON.parse(failureContext.responseBody);

    // Ensure the error message contains the text associated with the failure we're remediating
    if (
      response.message.includes(
        "Validation of 'DisciplineActionStaffs' failed.",
      ) &&
      response.message.includes('Staff reference could not be resolved.')
    ) {
      // Define a regular expression to extract the array index values from the validation message
      const indexRegEx = /DisciplineActionStaff\[(?<Index>[0-9]+)\]/gi;

      // Perform regular expression matching
      const matches = [...response.message.matchAll(indexRegEx)];

      // Delete the offending entries in the array (NOTE: does not remove the array items)
      matches.forEach((m) => delete request.staffs[m.groups['Index']]);

      // Filter the array down to just the non-deleted items, and reassign
      request.staffs = request.staffs.filter((i) => i != null);

      // Return the modified request body
      return { modifiedRequestBody: request };
    }

    // Take no action for the current request
    return null;
  },
};
```
