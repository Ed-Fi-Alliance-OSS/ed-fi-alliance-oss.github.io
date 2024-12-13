---
---
# AWS ODS/API Solution - Steps for Quick Validation of Solution in AWS

Once you have the ODS/API solution launched inside of AWS, you can perform a series of steps to simply validate that all of the components are communicating properly.    Please note this is not a tutorial on how to use the ODS/API software suite, but will provide steps for how to navigate the initial setup to simply test an API call with a valid set of keys.

Regardless if you have launched an environment type of `nonprod` or `prod`, these validation steps remain the same.   For your convenience, where applicable, the screen shots that are seen for a 'nonprod' and 'prod' type of environment are clearly listed in each step.  However, the differences are simply in the domain name of the URL being accessed.

This page assumes that you have already successfully launched the [AWS ODS/API solution in either the AWS ODS/API Solution - Launch a Non-Production Environment](./launch-non-prod.md) page, or the [AWS ODS/API Solution - Launch a Production Environment](./launch-prod.md) page.   It also assumes that you have installed the software with the `populated` database set (default setting) and have also installed the SwaggerUI (also the default setting).

Please note that the screenshots for SSL warnings are from a Google Chrome web browser.   Other browsers such as Internet Explorer and Mozilla Firefox will look slightly different, but have a similar process to accept the SSL warnings.

ODS/API Software Version used in steps below: 3.4.0

If you encounter any errors in this process, please see the [AWS ODS/API Solution - Frequently Asked Questions](./faq.md), or obtain support by submitting a ticket on the [Ed-Fi Tracker](https://tracker.ed-fi.org/projects/EDFI) with a component of "AWS Deployment Template", and a support engineer will contact you.

## Validation and Testing Process

**Click on any image in this document to zoom in and see further details.**

1. On the CloudFormation stack that you launched, and where you obtained your Outputs, record your Admin Application Endpoint URL and your SwaggerUI URL:

   **Non-Production Output Example**

    Copy the `AdminAppNonProdURL` value and the `SwaggerUINonProdURL` value for later use in this process.

      ![Non prod outputs](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/nonprod-outputs-1.png)

   **Production Output Example**

     Copy the `AdminAppProdURL` value and the `SwaggerUIProdURL` value for later use in this process.

       ![CF Outputs Prod](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/cf-outputs-prod-admin-url-highlighted.png)

2. Open your Admin App URL in a web browser.  (you can also simply click the link in the Outputs tab you may still have open in the previous step).  You will be presented with a SSL warning from your web browser.    This warning will appear regardless of the environment type you have launched.   A sample page is shown below.   For Chrome, you then would click the 'Advanced' button to be presented with the option to accept the risk and proceed to the application.

    ![Admin App SSL Warning](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-ssl-warning.png)

3. After you have accepted the SSL warning, you will be presented with the login page to the Admin Application.

    ![Admin App First Page](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-first-page.png)

4. The Admin Application will require you to create your administrator account.  Form the login page, click the 'Register as a new user' link.   After clicking, the page will be shown below:

   ![Admin App Register User](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-register-user.png)

5. You will be automatically logged in with your created account.   You will then be presented with the following page below.  The Admin Application will need to perform some final setup steps before you can continue.   Click the 'Continue' button.

   ![Admin App Continue](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-continue-running.png)

6. The Admin Application will perform its final setup steps.   DO NOT close your browser.  This process normally takes 1 to 2 minutes.  During this time you will see the screen below:

   ![Admin App Continue Running](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-continue-running.png)

   Once the process completes, your screen will show a green 'Success' message momentarily before automatically redirecting you to the next page.

   ![Admin App Success](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-success.png)

7. You will be taken to the home page of the Admin Application as shown below.  On this page, click the 'Global' link.

   ![Admin App Home Page](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-home-page.png)

8. On the 'Global' page, you will add what is known as a 'Vendor'. Click the 'Add Vendor' button.

   ![Admin App Global](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-global.png)

9. An 'Add Vendor' window will open as shown below.   Fill in the form with your values.   You are free to use the values shown in the screen shot, but you may want to adjust the 'Contact Name' value and 'Email Address'.  Click the 'Save Changes' button when you are ready.

   ![Admin App Add Vendor](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-add-vendor.png)

10. You will be returned to the 'Global' vendors page.  You should now see the Vendor you just added on this page near the bottom.  Click Add Vendor

    ![Admin App Vendor Added](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-vendor-added.png)

11. Click the 'Home' link on the page to go back to the home page of the Admin App.   Once back on the Home Page, click the 'Settings' link.  A screen will show similar to below:

     **Non-Production Environment**

          the ODS/API URL will always show a 'localhost' domain.  This is expected and required for the setup.
          ![Admin App Settings Non-Prod](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-settings.png)

     **Production Environment**

          the ODS/API URL will show the domain name URL that matches your SSL certificate that you provided on launching the environment.
          ![Admin App Settings Prod](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-prod-settings-add-app-page.png)

12. Click the 'Add Application' button to add a test application to begin the process of retrieving an API key pair.  A window will open similar to below.  You should ensure that your provide a name (e.g 'TestApp'), select the 'Local Education Agency', and select the 'Grans Bend ISD' from the drop down list.  In addition, ensure that you select 'Ed-Fi Sandbox' for the Claim Set Name field.  When completed, click the 'Add Application' button on the window.

    ![Admin App Add App](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-add-app.png)

13. After adding the application, you will be be shown a window that contains an API key and secret to test the ODS/API through the SwaggerUI application.    Copy your 'Key' and 'Secret' values as you cannot retrieve them after this window is closed.  When you have copied your values, click the 'I have copied my Key and Secret' link to close the window and return to the 'Settings' page.

    **Non-production Environment:**
     The ODS/API URL will show the 'localhost' domain.  This is not  your actual ODS/API URL for the environment.  That URL is found in your CloudFormation stack's Outputs tab under 'OdsApiNonProdUrl'.
     ![Admin App App Keys](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-app-keys.png)

    **Production Environment:**
     The ODS/API URL that is shown in this window would be the actual ODS/API URL for a production environment.
     ![Admin App Prod Keys Retrieved ](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-prod-keys-retrieved.png)

14. After you have copied your key and secret for the API test, you now will be able to test the API with your keys through the environment's SwaggerUI application.    In another browser tab or window, enter/copy your SwaggerUI URL that you copied in Step #1 of this process.  Depending on your environment, when you attempt to access the URL, you will either get a SSL warning (if a Non-Production environment), or be taken to the SwaggerUI application without issue (a Production Environment).

   **Non-Production Environment**
     accept the SSL warning as you did to access the Admin Application back in Steps #2

    ![Swagger SSL Non-prod](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/swagger-ssl-warning.png)

    **Production Environment**
     you will be taken directly to the SwaggerUI application s your SSL certificate is valid and Matheson the domain name assigned to the ODS/API (this is also what your screen will look like after accepting the SSL warning in a 'nonprod' environment)

     ![Swagger UI Homepage](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/swagger-ui-home-page.png)

15. On the SwaggerUI application's home page, under the 'Resources' section, click the 'Descriptors' link. You will be taken to a window similar to below:

    ![Swagger UI Check](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/swagger-api-check.png)

16. Click the green 'Authorize' button on the page.  A window will open similar to below where you will enter the API Key and Secret that you copied for your environment in Step #13.  When entered, click the green 'Authorize' button.

    1. Add your keys
       ![Add Keys](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/swagger-api-creds.png)
    2. Result after clicking the `Authorize` button:
       ![Swagger API Authorized](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/swagger-api-authoirized.png)

17. Click the 'Close' button in your authorization window.  You will be returned to the 'Descriptors' page.   Expand the descriptor named 'absenceEventCategoryDescriptors' by click the down arrow icon to the right of the name.  After doing this task, the window will look similar to below:

    ![Swagger UI Absence First](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/swagger-ui-absence-first.png)

18. Click the blue 'GET' button and the API call will expand.   Click the 'Try Out' button:

    ![Get Try Out](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/abscence-try-out.png)

19. Click the blue 'Execute' button to test your API call.

    ![Swagger Absence Execute Ready](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/swagger-abscence-execute-ready.png)

20. After clicking the 'Execute' button. if your solution is operating correctly, you will see the output of the API call successful with a 200 HTTP response code, and some JSON data returned.   The output should be similar to below:

    ![Swagger UI Execution Finished](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/swagger-execute-finished.png)

    ** If you see a 200 HTTP Response code and data, you have successfully launched the solution and the software suite is communicating properly.

21. Close out of the SwaggerUI browser window, and return to your Admin Application window.  If you had closed out your API Key window that contained your Key and Secret, your window will look similar to below:

    ![Admin App Added Return](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-app-added-return.png)

22. From here, you can click the 'Descriptors' tab to ensure that the Admin Application can retrieve data as well from the ODS/API database.  Click the down arrow next to any descriptor to see its descriptions.

    ![Admin App Descriptor Expanded](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-descriptor-expanded.png)

23. If you have gotten to this point, all is working as expected!  Click to 'Logout' link in the top right corner of your Admin Application window.   You will be logged out and taken back to a new login page

    ![Admin App Logout Done](https://edfidocs.blob.core.windows.net/$web/img/edfi-exchange/technology/ed-fi-odsapi-cloud-deployment-for-aws-suite-3/ed-fi-odsapi-cloud-deployment-for-aws-deployment-guide/admin-app-logout-done.png)

24. To sign in again to the Admin Application again, your credentials are the email address and password you provided when creating your account in Step #4.

For more information on the Ed-Fi software suites, please see the documentation for the products at [Welcome to TechDocs](/#).
