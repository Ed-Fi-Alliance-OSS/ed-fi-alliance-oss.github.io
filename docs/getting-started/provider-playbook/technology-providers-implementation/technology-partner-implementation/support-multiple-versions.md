# Support Multiple Versions

The Ed-Fi Alliance will periodically release new versions of the Ed-Fi Platform that add support for newer versions of the Data Standard. API clients should access the base Ed-Fi API URL to see what Ed-Fi Data Model version number the Ed-Fi API is using. This will inform the API client as to what actions it should and should not take.

```json
{
  "version": "5.3",
  "informationalVersion": "5.3",
  "suite": "3",
  "build": "5.3.1434.0",
  "apiMode": "Year Specific",
  "dataModels": [
    {
      "name": "Ed-Fi",
      "version": "3.3.1-b",
      "informationalVersion": "Latest Ed-Fi Data Model v3.3b"
    },
    {
      "name": "TPDM",
      "version": "1.1.0",
      "informationalVersion": "TPDM-Core"
    }
  ],
  ...
}
```

In the example above, the education agency's Ed-Fi API is running Ed-Fi Data Model v3.3.1-b. A later version, v4.0-a, of the Data Standard added two new fields to the `/ed-fi/grades` endpoint to broaden the scope to include student course grades for active grading periods. This means an API client would need to know what version of the Data Standard the API supports and use that information to know what to send and what not to send.

Data Standard releases and detailed What's New notes can be found [here](https://edfi.atlassian.net/wiki/display/ETKB/Ed-Fi+Standards).
