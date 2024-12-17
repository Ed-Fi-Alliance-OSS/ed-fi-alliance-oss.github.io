# Manually Restricting Access to a Single Education Organization

## Overview

Apply restrictions or provide authorization for resources can be achieved with customizing the claim set, using Admin App Claim set editor.

Documentation on how to use Claim Set Editor can be found here: [https://edfi.atlassian.net/wiki/display/ADMIN/Claim+Set+Editor](https://edfi.atlassian.net/wiki/display/ADMIN/Claim+Set+Editor).

## Use Case

Restrict the education organization read permission. If user try to get list of schools using specific key and secret, then resultant list should only contain the school/ schools associated with provided key and secret.

## Steps to Achieve the Filtered List

1\. On Admin App Claim set editor, user can create copy of existing claim sets. User cannot customize the existing standard claim sets. But can customize newly added or copied claim set.

The following list shows existing standard claim sets on Admin app.

 ![View Claimsets](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2021-3-17_18-8-17.png)

 2. User can click on the copy (highlighted on the above screen shot) link to create copy of a specific claim set. In our example, we are creating a copy of SIS Vendor claim set.

![Copy Claimset Dialogue](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2021-3-17_18-9-44.png)

   3.  We created SIS Vendor copy claim set, which is customizable

 ![Claim Set Copy Prompt to Restart](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2021-3-17_18-10-35.png)

Clicking on the Edit link on SIS Vendor Copy Claim set will lead user to claim set edit page:

![Claim Set Editor Preview](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2021-3-17_18-11-0.png)

Here user can check or uncheck the resource permissions (Read, create, Update and Delete).

Some of the resources will have child resources associated with it.

Ex: people resource has student, staff, and parent as child resources. So, making any permission changes to people will reflect on child resources.

4. In this use case user wants to restrict the education organizations resource.

![User Attribute restrictions](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2021-3-17_18-11-45.png)

The existing education organization resource only has Read permission with “No further authorization required” strategy, which is why school list shows all the schools.

Now we are going to restrict that by overriding the default authorization strategy.

Clicking on the ![Info Image](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2021-3-17_18-12-25.png)

 will open the Authorization strategy override window.

![Open Override Authorization Strategy](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2021-3-17_18-12-36.png)

Now need to restrict the Read action by editing the authorization strategy.

![Override Authorization Strategy](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2021-3-17_18-12-57.png)

Now we did override the Read action’s authorization strategy to “Relationships with Education Organizations only”.

![Override Authorization Strategy](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2021-3-17_18-13-36.png)

This override will restrict the education organization read action strategy.

Note: The latest claim set addition/ update  will reflect automatically on ODS API after 10 mins.

If user wants to have the changes reflected immediately, then need to restart the ODS API manually.

![Warning to restart ODS](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2021-3-17_18-13-58.png)

5. Next step is to create an application using this newly created claim set and associate it to specific education organization on Admin App.

![Adding Application Vendor](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2021-3-17_18-14-27.png)

User must have a key and secret provided during the application creation.

Using these key and secret value towards ODS API call will provide expected education organization list.

Ex: We created application using SIS vendor Copy claim set and associated with Grand bend high school.

So, School list will be having only “Grand Bend High School”

Output on swagger end point using the generated key and secret:

![Swagger200 Success Response](https://edfidocs.blob.core.windows.net/$web/img/reference/admin-app/technical-articles/image2021-3-17_18-14-49.png)
