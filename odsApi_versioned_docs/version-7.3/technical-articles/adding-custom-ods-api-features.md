# Adding Custom ODS / API Features

The Ed-Fi ODS / API comes with a set of configurable features that can be
enabled or disabled using configuration settings in deployed API. Additional
custom features could be implemented by following the steps outlined here:

## Step 1. Create a Service

```csharp
namespace EdFi.Ods.Services
{
    public class TestService : ITestService
    {
  public void DoSomething() { }
    }
}
```

## Step 2. Add a New Autofac Module Class

2a.  Inherit from ConditionalModule in EdFi.Ods.Common.

2b. Override IsSelected method

2c. Override ApplyConfigurationSpecificRegistrations method

```csharp
using Autofac;
using EdFi.Ods.Common.Constants;
using EdFi.Ods.Common.Container;
using EdFi.Ods.Common.Infrastructure.Configuration;
using EdFi.Ods.TestService;
using Microsoft.FeatureManagement;

namespace EdFi.Ods.Features.Container.Modules
{
    public class TestModule : ConditionalModule
    {
      public TestModule(IFeatureManager featureManager) : base(featureManager) { }

      public override bool IsSelected() => IsFeatureEnabled(ApiFeature.TestService);

      public override void ApplyConfigurationSpecificRegistrations(ContainerBuilder builder)
      {
        // TODO add components to register.
      }
    }
}
```

## Step 3. Add Configuration Setting in appsettings.json in EdFi.Ods.WebApi Project

```json
{
  "FeatureManagement": {
    ...
    "TestService": true
    ...
  }
}
```
