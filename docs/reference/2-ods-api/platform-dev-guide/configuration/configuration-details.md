# Configuration Details

The Ed-Fi ODS / API is configurable in a number of ways. Since the source code
is available to licensees, one could argue that everything is configurable. But,
what we’re discussing in this section are things like settings and options that
do not require a change to the compiled code.

Key configuration points include: OAuth endpoints, Admin and Security datastore
connections, Token timeouts, Enabling / disabling features. See the following
sections for more details on important configuration options

## Required Configuration Settings

Some configuration must be done for every Ed-Fi ODS / API platform instance.
Examples of required configurations include database connection strings, SMTP
server locations, and similar.

To make it easier for developers to install and run the Ed-Fi ODS / API, the
default download from source control is pre-configured with values appropriate
for a developer or single-server test instance of the system.

| Application | Location | Setting Name | Value | Description |
| --- | --- | --- | --- | --- |
| EdFi.Ods.SandboxAdmin | appsettings.json | OAuthUrl | Example: `<http://site-address:port/oauth>` | Points to the root of the authorization API in the Ed-Fi ODS / API. |
| EdFi.Ods.SwaggerUI | appsettings.json | WebApiVersionUrl | Example: `<http://site-address:port/>` | Points to the version endpoint in the Ed-Fi ODS / API. |
| EdFi.Ods.WebApi | appsettings.json | ConnectionStrings:EdFi\_Admin | Server=(local); Database=EdFi\_Admin; Trusted\_Connection=True; Application Name=EdFi.Ods.WebApi; | Connection to Admin database |
| EdFi.Ods.WebApi | appsettings.json | ConnectionStrings:EdFi\_Security | Server=(local); Database=EdFi\_Security; Trusted\_Connection=True; Persist Security Info=True; Application Name=EdFi.Ods.WebApi; | Connection to Security database |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:OdsConnectionStringEncryptionKey | Example: JivjQAm53kz9IaBLUJIk+Rd+1YaKNZ88PkxjiSsQNRQ= | AES Encryption key used to encrypt ODS connection strings configured in the Admin database. (Required everywhere other than development environment) |

A deployment to a staging or production instance is usually more involved, and
requires additional configuration. Required configurations for a production
instance can be found in the
[Deployment](../deployment/readme.md)
section of this documentation.

## Optional Configuration Settings

Although this list of settings is not exhaustive, other important and useful
optional configuration values include:

| Application | Location | Setting Name | Value | Description |
| --- | --- | --- | --- | --- |
| EdFi.Ods.SwaggerUI | appsettings.json | SwaggerUIOptions:OAuthConfigObject:ClientId | Example:  <br/>rcKsguTICAaBm9PxyUW4i | Optionally provides the value to prefill in the "key" field of auth. |
| EdFi.Ods.SwaggerUI | appsettings.json | SwaggerUIOptions:OAuthConfigObject:ClientSecret | Example:  <br/>t0CklTOfMBGZNPgVQDLHh | Optionally provides the value to prefill in the "secret" field of auth. |
| EdFi.Ods.SwaggerUI | appsettings.json | Tenants | Example:<br/><br/>```<br/> "Tenants": [<br/>    {<br/>      "Tenant": "Tenant1"<br/>    }<br/>  ],<br/>``` | Optionally provides the name of a tenant. This setting is required if using [Multi Tenant Configuration](https://edfi.atlassian.net/wiki/display/ODSAPIS3V70/Single+and+Multi-Tenant+Configuration#SingleandMultiTenantConfiguration-multiTenantSetting). A valid tenant name is required for SwaggerUI to retrieve the API metadata. |
| EdFi.Ods.SandboxAdmin | appsettings.json | User | Example:<br/><br/>```<br/>Contents on appsettings.json<br/> "User": {<br/>        "Test Admin": {<br/>            "Email": "test@ed-fi.org",<br/>            "Admin": "true",<br/>            "NamespacePrefixes": [<br/>                "uri://ed-fi.org",<br/>                "uri://gbisd.org"<br/>            ],<br/>            "Password": "zSKj8DdR4mQlPp3X2i1ra",<br/>            "Sandboxes": {<br/>                "Minimal Demonstration Sandbox": {<br/>                    "Key": "FLqUvMPSoG4ryp7HiRBmX",<br/>                    "Type": "Minimal",<br/>                    "Secret": "bhJfA6qt7iNP3Xd5as9O0",<br/>                    "Refresh": "false"<br/>                },<br/>                "Populated Demonstration Sandbox": {<br/>                    "Key": "rcKsguTICAaBm9PxyUW4i",<br/>                    "Type": "Sample",<br/>                    "Secret": "t0CklTOfMBGZNPgVQDLHh",<br/>                    "Refresh": "false"<br/>                }<br/>            }<br/>        }<br/>    }<br/>``` | Defines automatically created user accounts and sandboxes. Also configures automatic refreshes of sandboxes to a clean state. Each user entry will be created with the given email/password, and the sandboxes defined underneath it will also be created for the type and key/secret values.<br/><br/>New: Must include the NamespacePrefixes elements, to deploy what namespaces for the associated vendor. This collection is required, and at least one namespace prefix is required. |
| EdFi.Ods.SandboxAdmin | appsettings.json | MaximumSandboxesPerUser | Example: 5 | The maximum number of sandboxes a sandbox admin user can create. |
| EdFi.Ods.SandboxAdmin | appsettings.json | DefaultClaimSetName | Example: SIS Vendor | The claim set name for the default application for sandbox application clients. |
| EdFi.Ods.SandboxAdmin | appsettings.json | MailSettings:Smtp:UserName | Example: User.Name | The username of the credentials that are used to create an SMTP client for sending email messages from the Sandbox Admin application for new user creation and password resets |
| EdFi.Ods.SandboxAdmin | appsettings.json | MailSettings:Smtp:Password | Example: abcd1234 | The password of the credentials that are used to create an SMTP client for sending email messages from the Sandbox Admin application for new user creation and password resets |
| EdFi.Ods.SandboxAdmin | appsettings.json | MailSettings:Smtp:From | Example: `<no-reply@ed-fi.org>` | The email address that will show up in the FROM field of any email messages sent from the Sandbox Admin application |
| EdFi.Ods.SandboxAdmin | appsettings.json | MailSettings:Smtp:Host | Example: smtp.example.com | The SMTP server that is used for sending email messages from the Sandbox Admin application. This value is necessary when the DeliveryMethod of Network is specified |
| EdFi.Ods.SandboxAdmin | appsettings.json | MailSettings:Smtp:Port | Example: 25 | The port number used by the SMTP server for email messages. If no value is specified, then the default of 25 is used. |
| EdFi.Ods.SandboxAdmin | appsettings.json | MailSettings:Smtp:DeliveryMethod | Example: Network | Specifies how email messages are delivered. The valid choices for this are:  <br/><br/>_Network - Email is sent through the network to an existing SMTP server<br/>_   PickupDirectoryFromIis - Email is copied to the pickup directory used by IIS for delivery via its SMTP service<br/>*   SpecifiedPickupDirectory - Email is copied to the specified directory for processing by an external mail application |
| EdFi.Ods.SandboxAdmin | appsettings.json | MailSettings:Smtp:SpecifiedPickupDirectory:PickupDirectoryLocation | Example: C:\\\\temp\\\\location\\\\emails | When a Delivery Method of SpecifiedPickupDirectory is used, this is the folder where email messages will be saved to, to be picked up by an external mail application for processing and sending |
| EdFi.Ods.SandboxAdmin | appsettings.json | MailSettings:Smtp:EnableSsl | Example: true | Indicates whether SSL encryption is used when establishing a connection with the SMTP server. This value is only applicable when the DeliveryMethod of Network is specified |
| EdFi.Ods.WebApi | appsettings.json | QueueAutoCreate | Example: 1 | Whether or not a message queue should be created if it is not found. For Azure or Active Directory queues, this should be 0. |
| EdFi.Ods.WebApi | appsettings.json | CommitUploadCommandMessageEndPoint | Example: localhost | The server hosting the message queues. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:BearerTokenTimeoutMinutes | Example: 30 | The amount of time that an OAuth token remains valid. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:Caching:Security:AbsoluteExpirationMinutes | Example: 10 | The amount of time the security metadata from EdFi\_Security database is cached. E.g., if it is set to 10 mins, the claim set changes will reflect in the API at least after 10 mins without needing to recycle API process. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:Caching:Descriptors:AbsoluteExpirationSeconds | Example: 1800 | Number of seconds after which the descriptor cache is refreshed. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:Caching:Descriptors:UseExternalCache | Example: true | When true, the Descriptor cache will use the configured external cache provider. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:Caching:PersonUniqueIdToUsi:AbsoluteExpirationSeconds | Example: 14400 | Number of seconds after which the PersonUniqueIdToUsi mapping is refreshed. This settings is applied only when SlidingExpirationSeconds is not provided or set to 0. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:Caching:PersonUniqueIdToUsi:SlidingExpirationSeconds | Example: 14400 | Number of seconds after which a PersonUniqueIdToUsi mapping is refreshed if not accessed. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:Caching:PersonUniqueIdToUsi:UseProgressiveLoading | Example: false | When set to true, PersonUniqueIdToUsi mapping is loaded progressively as needed to fulfill the API requests (rather than being fully initialized in the background upon first request). |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:Caching:PersonUniqueIdToUsi:CacheSuppression:Student | Example: false | Indicates whether student UniqueId/USI mappings should be cached, or retrieved on demand with each request. When set to true,  caching is suppressed. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings**:**Caching:PersonUniqueIdToUsi:CacheSuppression:Staff | Example: false | Indicates whether staff UniqueId/USI mappings should be cached, or retrieved on demand with each request. When set to true,  caching is suppressed. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:Caching:PersonUniqueIdToUsi:CacheSuppression:Parent | Example: false | Indicates whether parent UniqueId/USI mappings should be cached, or retrieved on demand with each request. When set to true, caching is suppressed. For use with data standard 4.0 and below. This setting has no affect after data standard 4.0. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:Caching:PersonUniqueIdToUsi:CacheSuppression:Contact | Example: true | Indicates whether contact UniqueId/USI mappings should be cached, or retrieved on demand with each request. When set to true, caching is suppressed. For use with data standard 5.0 and above. This setting has no affect before data standard 5.0. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:Caching:PersonUniqueIdToUsi:UseExternalCache | Example: true | When true, the Person cache will use the configured external cache provider. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:ApiClientDetails:UseExternalCache | Example: true | When true, the API Client cache will use the configured external cache provider. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:ApiClientDetails:AbsoluteExpirationSeconds | Example: 14400 | Number of seconds after which API Client information is refreshed if not accessed. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:Caching:ExternalCacheProvider | Example: "Redis" | Currently the only available option is "Redis". When left blank (default), the application will use in-memory caching rather than an external provider, if any of the "UseExternalCache" options is set to true. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:Services:Redis:Configuration | Example: [see this document](https://stackexchange.github.io/StackExchange.Redis/Configuration.html) | When `ExternalCacheProvider=="Redis"` , provide the connection string information here. Default: an empty string |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:Caching:Security:AbsoluteExpirationMinutes | Example: 10 | The amount of time the security metadata from EdFi\_Security database is cached. E.g., if it is set to 10 mins, the claim set changes will reflect in the API at least after 10 mins without needing to recycle API process. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:Caching:Profiles:AbsoluteExpirationSeconds | Example: 1800 | Number of seconds after which API client profile information is refreshed if not accessed. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:Caching:OdsInstances:AbsoluteExpirationSeconds | Example: 300 | Number of seconds after which ODS Instance mapping information is refreshed if not accessed. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:Caching:Tenants:AbsoluteExpirationSeconds | Example: 600 | Number of seconds after which Tenant information is refreshed if not accessed. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:Features:Extensions | true | Enables the API endpoints created for all Extensions. An installation that is not customized at all and still has the GrandBend and Sample extensions can disable this feature in production. |
| EdFi.Ods.WebApi | appsettings.json | ApiSettings:Features:UniqueIdValidation | false | Enables [Unique ID System Integration](../../technical-articles/unique-id-system-integration.md). Must implement IUniqueIdToIdValueMapper and register within the implementation within the WebApi. |
| EdFi.Ods.Web.Api | appsettings.json | ApiSettings:Features:TokenInfo | true | Enables the token\_info introspective endpoint. |
| EdFi.Ods.Web.Api | appsettings.json | Plugin:Folder | Example: ../../Plugin | Configures the plugin folder that API looks to deploy extensions dynamically. |
| EdFi.Ods.Web.Api | appsettings.json | Plugin:Scripts | Example: \[ tpdm \] | Configures the script (located in plugin folder by default) responsible for downloading the extension plugins and placing them in the plugin folder. |

## Environment Configuration

While _appsettings.json_ provides the primary configuration for the ASP.NET Core
applications in the ODS / API solution, _appsettings.**Environment**.json_ can
be used to override the settings in _appsettings.json_ in deployment
environments. In development environment, initdev creates
_appsettings.**Development**.json_ to override settings for development
environment. Note that the settings in _appsettings.**Development**.json_ are
overwritten every time initdev is executed. See [Configuration in ASP.NET
Core](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/?view=aspnetcore-8.0)
for more details.

## Secret Manager

In development environments ASP.NET Core applications in the ODS / API solution
uses secret manager tool to provide a way for setting overrides away from the
projects so that they aren't accidentally checked into source control. To set
overrides, you can either use the [.NET
CLI Tool](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-8.0&tabs=windows#set-a-secret)

```pwsh
PS D:\Ed-Fi-ODS-Implementation\Application\EdFi.Ods.WebApi> dotnet user-secrets set "ApiSettings:PopulatedTemplateScript" "Glendale"
Successfully saved ApiSettings:PopulatedTemplateScript = Glendale to the secret store.
```

or [Manage User
Secrets](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-3.1&tabs=windows#json-structure-flattening-in-visual-studio)
in Visual Studio.

![Manage User Secrets](/img/reference/ods-api/manage-user-secrets.webp)

Both of the above methods will create a _secret.json_ file in the local
machine's user profile folder and will override settings
in _appsettings_._**Development**_._json._

| Website | secrets.json location in Windows |
| --- | --- |
| Ed-Fi ODS / API | %APPDATA%\\Microsoft\\UserSecrets\\f1506d66-289c-44cb-a2e2-80411cc690ec |
| Sandbox Administration | %APPDATA%\\Microsoft\\UserSecrets\\f1506d66-289c-44cb-a2e2-80411cc690ea |
| Ed-Fi ODS / API Documentation | %APPDATA%\\Microsoft\\UserSecrets\\f1506d66-289c-44cb-a2e2-80411cc690eb |

e.g., Following _secret.json_ overrides the default 'GrandBend' dataset and
deploys with 'Glendale' sample dataset.

```json
{
  "ApiSettings": {
    "PopulatedTemplateScript": "Glendale",
  }
}
```

See [Safe storage of app secrets in development in ASP.NET
Core](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-8.0&tabs=windows)
for more details.
