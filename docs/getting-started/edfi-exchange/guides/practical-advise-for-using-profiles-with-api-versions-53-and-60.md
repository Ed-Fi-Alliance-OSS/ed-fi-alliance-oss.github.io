# Practical Advice for using profiles with API versions 5.3 and 6.0

This document lists some lessons-learned that the customer success team has come across in our use of the Profile feature that we did not find in the documentation.  This should be considered a supplement to the documentation  [API Profiles](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V61/pages/18810074/API+Profiles) and  [How To: Add Profiles to the Ed-Fi ODS / API Solution](https://edfi.atlassian.net/wiki/spaces/ODSAPIS3V61/pages/18811173).

## Content-Type reference

In order for a Profile to be applied, the API requests need to reference the profile in the Content-Type of the header.
The following example shows what a Students post should look like before and after a profile named "sis" is being referenced:
without profile:

```sh
curl -X 'POST' \
'[http://localhost:54746/data/v3/ed-fi/students](http://localhost:54746/data/v3/ed-fi/students)' \
-H 'accept: application/json' \
-H 'authorization: Bearer ad8bc20a62fd4ad08677b9473d5bfa8e' \
-H 'Content-Type: application/json' \
-d '{
"studentUniqueId": "604822",
"birthDate": "2008-09-13",
"firstName": "Lisa",
"lastSurname": "Woods",
"middleName": "Sybil",
"personalTitlePrefix": "Ms",
"citizenshipStatusDescriptor": "uri://[ed-fi.org/CitizenshipStatusDescriptor#Refugee](https://ed-fi.org/CitizenshipStatusDescriptor#Refugee)"}'

```

With profile :

```sh
curl -X 'POST' \
'[http://localhost:54746/data/v3/ed-fi/students](http://localhost:54746/data/v3/ed-fi/students)' \
-H 'accept: application/json' \
-H 'Content-Type: application/vnd.ed-fi.student.sis.writable+json' \
-d '{
"studentUniqueId": "604822",
"birthDate": "2008-09-13",
"firstName": "Lisa",
"lastSurname": "Woods",
"middleName": "Sybil",
"personalTitlePrefix": "Ms",
"citizenshipStatusDescriptor": "uri://[ed-fi.org/CitizenshipStatusDescriptor#Refugee](https://ed-fi.org/CitizenshipStatusDescriptor#Refugee)"}'

```

Notice that the Content-Type header not only has to reference the name of the profile ("sis") but also the name of the API endpoint ('vnd.ed-fi.student') and the fact that it is the 'writable' part of the profile. This means that even if the Profile has accommodations for multiple resources, the Content-Type header will need to be rewritten for each one.

## Using Profiles for the first time

The instructions for adding a profile to the API do not mention that this profile is not available in the API or the database until the API web application runs for the first time. It seems to take a few seconds after the API runs for the first time before you will see the profile(s) in the Admin database "Profiles" table. They will also not appear in swagger.

## Using Swagger

This content-type header will happen in Swagger when the profile is referenced in the pull down at the top right of the screen, as referenced in the install documentation. However because the profile is probably not there the first time swagger starts (because the API has not run yet), it may not appear until after the API has been run and the browser cache has been cleared. I have even had to restart IIS before.
