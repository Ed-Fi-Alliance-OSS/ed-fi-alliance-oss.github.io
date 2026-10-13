# How To: Enable OneRoster with the Ed-Fi ODS / API

The Ed‑Fi ODS / API supports integration with **OneRoster API** as an optional
platform feature. When enabled, the ODS / API issues JWT‑based OAuth 2.0 access
tokens that are trusted by a separately deployed OneRoster service. Both
services share a common token issuer and audience configuration, allowing
clients to use the same credentials across APIs.

This documentation describes the **required configuration steps** to enable
OneRoster support in the ODS / API and the corresponding configuration required
in the OneRoster service.

## Prerequisites

Before enabling OneRoster support, ensure the following:

- A deployed Ed‑Fi ODS / API instance
- A deployed OneRoster service
- Ability to modify:
  - `appsettings.json` for the ODS / API
  - `.env` configuration for the OneRoster service
- PowerShell 7, required for generating public/private key pairs for JWT signing

## Step 1: Enable the OneRoster Feature in the ODS / API

OneRoster support is disabled by default and must be explicitly enabled through
configuration. The OneRoster feature is managed on the deployed code by changing
the `appsettings.json` file of the EdFi.Ods.WebApi project. This is
the `appsettings.json` of the "Api" component of the deployed solution. The app
setting `FeatureManagement:OneRoster` should be set to the value "true".

```json
"FeatureManagement": {
    ...
    "OneRoster": true,
    ...
}
```

## Step 2: Configure JWT‑Based Security in the ODS / API

OneRoster integration requires the ODS / API to issue JWT access tokens that can
be validated by the OneRoster service.

Configure the following settings in `appsettings.json` file of the
EdFi.Ods.WebApi project.

- The app setting `Security:AccessTokenType` should be set to the value "jwt".
- The app setting `Security:AccessTokenType:Jwt:Issuer` should be set to the
  ODS/API root URL
- The app setting `Security:AccessTokenType:Jwt:Audiences` list must include
  ODS/API root URL and the OneRoster root URL
- The app setting `Security:AccessTokenType:Jwt:SigningKey` must be configured
  with public and private key for JWT signing.

:::warning
The private key is used by the ODS / API to sign tokens and must be kept
secure. The public key will be shared with the OneRoster service.
:::

```json

"Security": {
    "AccessTokenType": "jwt",
    "Jwt": {
      "Issuer": "http://localhost:54746",
      "Audiences": [
            "http://localhost:54746",
            "http://localhost:3000"
        ],
        "SigningKey": {
            "PublicKey": "",
            "PrivateKey": ""
        }
    }
}

```

## Step 3: Configure the OneRoster Service to Trust the ODS / API

The OneRoster service must be configured to trust the ODS / API as the token
issuer in the OneRoster .env file.

### Issuer Configuration

The ODS / API root URL must be configured as the issuer in the OneRoster .env
file:

```ini
OAUTH2_ISSUERBASEURL=http://localhost:54746
```

### Public Key Configuration

Copy the public key used by the ODS / API into the OneRoster .env file and
configure the signing algorithm:

```ini
OAUTH2_PUBLIC_KEY_PEM=-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A...\n-----END PUBLIC KEY-----
OAUTH2_TOKENSIGNINGALG=RS256
```

This enables the OneRoster service to validate JWTs issued by the ODS / API.

## Downloads

:::note

The following GitHub links contain the PowerShell script that can be
used to generate a public/private key pair. This requires Powershell 7+ : [Key
Generation
Script](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/blob/main/logistics/scripts/modules/utility/public-private-key-pair.psm1)
:::
