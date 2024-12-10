# Assessment Providers - Activity 2

> [!INFO]
>
> * HTTP POST operations are used to add new records to the API.

## Activity 2 - Add a new Student Assessment

In this activity, we will add a new record of the outcomes of a student's interaction with an assessment to the API. In the Ed-Fi data model, this entity is called a **student assessment**. (More data about the overall model will be provided in the [next section](https://edfi.atlassian.net/wiki/display/TT/3.1.4+Assessment+Providers+-+Data+Model), so hold tight!)

Note that steps 1-4 are the same as on the previous page; feel free to skip to step 5 if you just completed the last activity.

1. Open a separate browser window and go to [https://api.ed-fi.org](https://api.ed-fi.org/) This is the public Ed-Fi ODS API Sandbox. It lists all versions of the ODS implementation that are currently under support.
2. Click on the "Documentation & Sandbox" link next to "Ed-Fi ODS / API v2.5"
3. On the next page, click on the "Resources" link. This shows the full ODS API, which is massive. However, be aware that only a small number of these APIs are related to assessment.
4. In the top right corner, click on the "Authorize" button, and click on the "Authorize" button on the popup window. This authorizes your browser to communicate with this API.
5. Scroll down to the "studentAssessments" API resource and click on it. This opens up documentation of all methods available on the /studentAssessments API resource
6. Click on the "POST" link. This expands the info on the POST operation. In it, you can see an example of the JSON object to must submit to do a POST. Note that this is the whole object, and not all of it is required!
7. Copy the JSON object from the box below. Note that you need to fill in an ID below where marked by brackets:

    ```json
    {
      "assessmentReference": {
      "identifier": "01774fa3-06f1-47fe-8801-c8b1e65057f2",
      "namespace": "http://ed-fi.org/Assessment/Assessment.xml"
    },
      "studentReference": {
      "studentUniqueId": "604821"
    },
      "administrationDate": "2019-12-12",
      "administrationEndDate": "2019-12-12",
      "identifier": "[supply an ID here - can be any alphanumeric up to 60 characters]",
      "scoreResults": [
        {
          "assessmentReportingMethodType": "Raw score",
          "resultDatatypeType": "Integer",
          "result": "92"
        }
      ]
    }
    ```

    This is a new student assessment - a score a student received on an assessment. It is quite simple and could be more complex. The full data model will be covered in the next section, but for now you can see that it references an **assessment** ("assessmentReference") a **student** ("studentReference") and has an **identifier** ("identifier") used to uniquely identify it within the scope of the assessment (these are collectively the entity natural key - more on that later).

8. Paste this into the "body" box in the studentAssessment section
9. You need to create an identifier - see the red bold text, and paste that into where the \[\]s above are. Any alphanumeric value of 60 characters or less will do.
10. Scroll down and click the "Try it out" button.

You should have received a response code of "201" which means "created" - a new API resource (a data record) was created.

### Congratulations, you just wrote a record to the API

If you received a different response, check the response code and response body for these issues

| Response Code | Response Body | Issue |
| --- | --- | --- |
| 400 | "message": "The argument 'request' is missing or invalid." | The API is complaining that it can't parse the JSON. Check that the JSON is well-formed. There may be a missing brace or bracket. |
| 403 | "message": "No API key information was available for authorization." | The access token you received in step 4 has expired. Go back and redo step 4. |
| 400 | "message": "Validation of 'StudentAssessment' failed.\\n\\t**\[element name\]** is required.\\n" | A required field is missing and will be filled in where you see the text "element name" |
