# Change Queries via Postman

## Prerequisites

Before using this collection, follow the steps from [Setting Up
Postman](./setting-up-postman.mdx).

## Using the Collections

### Select an Environment

In the top right corner, select an environment from the imported ones:

![Select an Environment](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/image2021-5-24_11-24-28.png)

Click on the "Environments" tab and click the Checkbox for the desired
environment:

![Select an Environment](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/image2021-5-24_11-26-40.png)

### Authorization

In order to authenticate, an environment must be selected. The environment files
includes a _Key_ and _Secret_ value for testing purposes.

In the "Collections" tab, click on the **Ed-Fi Roster** root folder, when the
folder opens, select the "Authorization" tab:

![Authorization](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/image2021-6-16_8-5-57.png)

Scroll down and click **Get New Access Token**.

![Get New Access Token](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/image2021-6-16_8-6-21.png)

The following confirmation message will appear:

![Configuration Message](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/image2021-5-24_11-51-46.png)

Click on **Use Token**:

![Use Token](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/image2021-5-24_11-51-46.png)

The token is ready to be used.

This token expires, therefore, this process must be repeated each time the token
has expired.

All API calls inherit from this authorization token.

## Execute the API calls

The Change Queries Collection is divided into folders per resource, such as
Local Education Agencies, Schools, Staff, Sections, and Students.

To test the Change Queries, the _minChangeVersion_ and _maxChangeVersion_
variables must be set. There are API calls to set the required values.

The best way to execute the API calls is to do it sequentially as shown below:

![Using change queries postman](https://edfidocs.blob.core.windows.net/$web/img/getting-started/solution-guides/rostering-solution-guide/Using%20change%20queries%20postman.gif)

## Execution Steps in Summary

1. **Get Access Token**.
2. **Get Available Change versions**: This will get the initial
    maxChangeVersion.
3. **Get All Students**: This will get all students and will save one of the
    results as the current student. If the variable _student\_unique\_id_ is
    set, it will use that student. If not specified or the id is not found, it
    will use the first item returned.
4. **Get Available Change versions** (optional): This will verify that the GET
    request does not modify the maxChangeVersion.
5. **Update Student**: This will generate a random value for the student
    birthdate and update the student.
6. **Get Available Change versions**: This will get the new maxChangeVersion
    because of the changed data.
7. **Student with change version**: This will get all the students created
    between the initial maxChangeVersion (step 2) and the new maxChangeVersion
    (step 6). Since only one student was modified it must return a student
    object rather than an array of students. The API call will verify that the
    returned data is different than the original student data saved (step 3).
8. **Rollback update students**: This will update the student with its original
    data.
9. **Get student**: This API call does not specify changeVersions, therefore,
    the data returned must be the latest student data, which must equal the data
    saved (step 3).
