---
sidebar_position: 3
---

# Admin Data and Credentials

## Before and after

| | ODS/API | Ed-Fi API v8 |
| --- | --- | --- |
| Where admin data lives | `EdFi_Admin` and `EdFi_Security` databases | One Configuration Service database (see [Security Configuration Data Stores](/reference/ed-fi-api/8/platform-dev-guide/security/security-configuration-data-stores)) |
| How you manage it | Admin App, Admin API, or SQL run directly against the databases | The Configuration Service API, or Admin App 4.1 and later |
| Vendors and applications | `/v2/vendors`, `/v2/applications` (Admin API 2.x) | `/v3/vendors`, `/v3/applications` (Configuration Service) |
| Which database an application uses | ODS instances (`odsInstanceIds`) | Data stores (`dataStoreIds`) |
| Claimsets | Rows in `EdFi_Security`, or Admin API claimset endpoints | Stored in the Configuration Service; custom claimsets imported with `POST /v3/claimSets/import` |
| Token endpoint | `https://{host}/oauth/token` on the ODS/API | `https://{config-service-host}/connect/token` |

The Configuration Service implements the [Ed-Fi Management API specification V3](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-API-Specifications/tree/main/api-specifications/management). See [Admin API Replaced by Configuration Service](/reference/ed-fi-api/8/whats-new/release-notes#admin-api-replaced-by-configuration-service).

## Step one: get onto the Admin API or Admin App v4

If you manage vendors, applications and claimsets with an Admin App version earlier than 4, with custom tools, or by editing `EdFi_Admin` and `EdFi_Security` directly, move that work to the [Admin API](/reference/admin-api) or [Admin App v4](/reference/admin-app) **before** you migrate. Both have equivalents on Ed-Fi API v8, so the processes you build now carry over. Hand edits to database tables do not.

Admin App 4.1 and later supports Ed-Fi API v8 as well as the ODS/API, so you can keep using Admin App through the migration.

## Example: create a vendor and an application

Before, with Admin API 2.x:

```http
POST /v2/vendors
{
  "company": "Acme Education",
  "namespacePrefixes": "uri://acme.org",
  "contactName": "Jane Smith",
  "contactEmailAddress": "jane@acme.org"
}

POST /v2/applications
{
  "applicationName": "Acme SIS",
  "vendorId": 1,
  "claimSetName": "SIS Vendor",
  "educationOrganizationIds": [255901],
  "odsInstanceIds": [1]
}
```

Now, with the Configuration Service:

```http
POST /v3/vendors
{
  "company": "Acme Education",
  "namespacePrefixes": "uri://acme.org",
  "contactName": "Jane Smith",
  "contactEmailAddress": "jane@acme.org"
}

POST /v3/applications
{
  "applicationName": "Acme SIS",
  "vendorId": 1,
  "claimSetName": "SISVendor",
  "educationOrganizationIds": [255901],
  "dataStoreIds": [1]
}
```

The main differences are the `/v3` routes, `dataStoreIds` in place of `odsInstanceIds`, and the built-in claimset names. The response to `POST /v3/applications` includes the new key and secret. To get a token for calling the Configuration Service itself, see [Configure a Data Store](/reference/ed-fi-api/8/getting-started/configure-data-store).

## Claimsets

Ed-Fi API v8 ships with built-in claimsets such as `SISVendor`, `AssessmentVendor` and `EdFiSandbox`. See [How To: Configure Claim Sets](/reference/ed-fi-api/8/how-to-guides/how-to-configure-claim-sets) for the full list and for importing custom claimsets.

Keep two kinds of claims apart when you plan:

- **Your existing custom claimsets and profiles.** These move across through the Admin API or Admin App v4.
- **Claims for your extension resources.** If you have extensions, you also need claims for the new extension resources. These are written as JSON files kept with your state's extension files. See the Extensions page.

## Vendor credentials

When the Configuration Service creates an application, it generates a new key and secret. Plan to give every vendor new credentials for Ed-Fi API v8, and tell vendors the timeline well before cutover.

Vendors that build the token URL from the API host do not have to change it straight away: Ed-Fi API v8 still answers at `/oauth/token` and forwards the request to the Configuration Service. New and updated clients should call `/connect/token` on the Configuration Service directly. See [Token Endpoint Location](/reference/ed-fi-api/8/whats-new/release-notes#token-endpoint-location).

:::info[Still being worked out]

- **Carrying existing keys and secrets across.** We have not found a supported way to import existing ODS/API keys and secrets into the Configuration Service. Until that is settled, plan for new vendor credentials.
- **Scripts to migrate `EdFi_Admin` and `EdFi_Security`.** Planned for a later date, to the extent possible.

:::
