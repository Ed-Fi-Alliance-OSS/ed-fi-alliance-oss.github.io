# Securing OAuth Secrets

A secure password storage strategy is critical to mitigating data breaches. This
article provides an overview and practical details on securing OAuth Secrets in
the Ed-Fi ODS / API.

## Overview

Hashing is the foundation of secure password storage. It guards against the
possibility that someone who gains unauthorized access to the database can
retrieve the password for every client in the system.

Hashing performs a one-way transformation on a password, turning the password
into a string called the hashed password. "One-way" simply means that it is
practically impossible to derive the original password once it has been
transformed into the hashed password. There are several mathematically complex
hashing algorithms that work for this purpose.

By default, the Ed-Fi ODS / API stores OAuth secrets securely using
PBKDF2-HMACSHA1 algorithm in deployment environments. For ease of use, the
development environment does not use hashing by default.

The hash implementation in the Ed-Fi ODS / API is resilient to hash algorithm
changes in future and allows for customization if implementations require a
different hashing algorithm. The OAuth secret database (`EdFi_Admin`) stores the
hashing details used when the hash was generated so those settings can be used
to regenerate the password hash from plain text while transitioning to a new
provider. The general flow for updates is that an OAuth secret is presented to
the application and the secret is verified using the hash method indicated in
the database. If valid, the original OAuth secret that was presented is
re-hashed using the new algorithm and the hashing method details are updated.

## Default Hashing

As noted above, the default algorithm used for hashing is PBKDF2-HMACSHA1, and
is implemented in EdFi.Common.Security. The ODS / API uses the
following values. No manual scripts are necessary to hash existing
secrets. Existing vendor secrets are upgraded from plain text to the a hashed
version when the vendor connects to the ODS / API for the first time. Plain text
secrets are not retrievable from the database for the vendor after that first
connection.

```csharp
namespace EdFi.Common.Security
{
    public class DefaultHashConfigurationProvider : IHashConfigurationProvider
    {
        private const string DefaultAlgorithm = Pbkdf2HmacSha1SecureHasher.ConfigurationAlgorithmName;
        private const int DefaultIterations = 10000;
        private const int DefaultSaltSize = 128;

        private readonly HashConfiguration _hashConfiguration;

        public DefaultHashConfigurationProvider()
        {
            _hashConfiguration = new HashConfiguration
            {
                Algorithm = DefaultAlgorithm,
                Iterations = DefaultIterations,
                SaltSize = DefaultSaltSize
            };
        }

        public HashConfiguration GetHashConfiguration()
        {
            return _hashConfiguration;
        }
    }
}
```

## Development Environment

The following setting in appsettings.Development.json of EdFi.Ods.WebApi
application sets the API to use plain text secrets for the development
environment by default.

```json
   "ApiSettings": {
        ...
        "PlainTextSecrets": true,
        ...
    }
```

:::caution
It goes without saying, but we'll say it anyway: disabling hash configuration
touches on the security of the ODS / API and should not be done on production
deployment environments.
:::

Hashing can be instated in a development environment by removing the above
entry. If hashing is enabled, the secret will be in plain text when first stored
in the database. After the first use, the API will hash the secret and it will
no longer be retrievable from the database.
