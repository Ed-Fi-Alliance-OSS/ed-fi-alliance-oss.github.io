# How To: Extend the Ed-Fi Identities API

The [Ed-Fi Identities API](../technical-articles/identities-api.md) provides an
optional standardized interface for integrating with a native identity system.
As with any abstraction, there may be a need to extend it in the context of a
specific implementation. This document provides a reference implementation for
extending the data elements supported by the Identity API.

The sample code defines a custom identity service by creating custom request and
response models, a service interface, a service implementation, and a
controller. There are 5 main sections in the reference example, described below.

## Plugin Module

The “plugin” module registers CustomIdentityService if the identity management
feature is enabled and registers the custom identity service as a singleton.

:::info

Note the implementation of the ICustomModule interface. This is a
“marker” interface makes the “plugin” discoverable at startup by the API’s
built-in plugin support, resulting in the automatic invocation of the
registration logic to register the necessary components in the Autofac
container. No additional code changes are required to integrate this code from
a separate assembly – it just needs to either be referenced by the “WebApi”
project or discoverable in the configured Plugin folder at runtime.

:::

```csharp
public class CustomIdentityServiceModule : ConditionalModule, ICustomModule
{
    public CustomIdentityServiceModule(ApiSettings apiSettings)
        : base(apiSettings, nameof(CustomIdentityServiceModule)) { }

    public override bool IsSelected() => IsFeatureEnabled(ApiFeature.IdentityManagement);

    public override void ApplyConfigurationSpecificRegistrations(ContainerBuilder builder)
    {
        builder.RegisterType<CustomIdentityService>()
            .AsImplementedInterfaces()
            .SingleInstance();
    }
}
```

## Custom Models

This section of the sample defines request and response models for the API that
extend the out-of-the-box models with some additional properties:

```csharp
public class CustomSearchRequest : IdentitySearchRequest
{
    public bool CreateUICOnNoMatch { get; set; }
    public string SchoolFacilityEntityid { get; set; }
    public string OperatingDistrictEntityid { get; set; }
    public string LocalIdentifier { get; set; }
}

public class CustomCreateRequest : IdentityCreateRequest
{
    public string ReasonForRequest { get; set; }
    public string SchoolFacilityEntityid { get; set; }
    public string OperatingDistrictEntityid { get; set; }
    public string LocalIdentifier { get; set; }
}

public class CustomIdentityResponse : IdentityResponse
{
    public string FavoriteColor { get; set; }
}

public class CustomSearchResponse : IdentitySearchResponse<CustomIdentityResponse>
{
    // No additions, and technically not required
}
```

## Service Interface

This interface extends the generic identity service interface definitions,
closing the generic types with the previously defined custom models.

```csharp
public interface IIdentityServiceWithCustomModels
    : IIdentityService<CustomCreateRequest, CustomSearchRequest, CustomSearchResponse, CustomIdentityResponse>,
        IIdentityServiceAsync<CustomSearchRequest, CustomSearchResponse, CustomIdentityResponse> { }
```

## Controller

This controller class derives from the abstract base identities controller,
closing the generic types with the previously defined custom models. This allows
the controller to be discovered and registered by ASP.NET.

```csharp
public class CustomIdentitiesController
    : IdentitiesControllerBase<CustomCreateRequest, CustomSearchRequest, CustomSearchResponse, CustomIdentityResponse>
{
    public CustomIdentitiesController(
        IIdentityService<CustomCreateRequest, CustomSearchRequest, CustomSearchResponse, CustomIdentityResponse>
            identitySubsystem,
        IIdentityServiceAsync<CustomSearchRequest, CustomSearchResponse, CustomIdentityResponse> identitySubsystemAsync)
        : base(identitySubsystem, identitySubsystemAsync) { }
}
```

## Service Implementation

Provides the custom integration logic for the external identity system by
implementing the custom service interface defined above (which closes all the
generic model types using the custom models defined earlier).

The sample code is too long to show inline (see the full example source code
file, attached), but the basic structure of this class is as follows:

```csharp
public class CustomIdentityService : IIdentityServiceWithCustomModels
{
    public IdentityServiceCapabilities IdentityServiceCapabilities { get; } =
        IdentityServiceCapabilities.Create | IdentityServiceCapabilities.Results;

    public Task<IdentityResponseStatus<string>> Create(CustomCreateRequest createRequest)
    {
        ...
    }

    Task<IdentityResponseStatus<CustomSearchResponse>>
        IIdentityService<CustomCreateRequest, CustomSearchRequest, CustomSearchResponse, CustomIdentityResponse>.
        Find(params string[] findRequest)
    {
        ...
    }

    Task<IdentityResponseStatus<string>> IIdentityServiceAsync<CustomSearchRequest, CustomSearchResponse, CustomIdentityResponse>.
        Search(params CustomSearchRequest[] searchRequest)
    {
        ...
    }

    public Task<IdentityResponseStatus<CustomSearchResponse>> Response(string requestToken)
    {
        ...
    }

    Task<IdentityResponseStatus<string>> IIdentityServiceAsync<CustomSearchRequest, CustomSearchResponse, CustomIdentityResponse>.
        Find(params string[] findRequest)
    {
        ...
    }

    Task<IdentityResponseStatus<CustomSearchResponse>>
        IIdentityService<CustomCreateRequest, CustomSearchRequest, CustomSearchResponse, CustomIdentityResponse>.
        Search(params CustomSearchRequest[] searchRequest)
    {
        ...
    }
}
```

:::info

The following GitHub link contains code sample for extending Identities API:
[CustomIdentityServiceExample.cs](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/blob/main/Examples/How%20To%20-%20Extend%20the%20Ed-Fi%20Identities%20API/CustomIdentityServiceExample.cs)

:::
