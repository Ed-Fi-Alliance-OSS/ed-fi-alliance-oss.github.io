# ODS Platform Testing

## Introduction

This document describes the specific testing practices used by the ODS Platform
team in maintaining the Ed-Fi ODS / API and its associated utilities (e.g., code
generation, migration utility, database deploy).

*For more context on Ed-Fi testing practices, see* [Testing
Standards](./README.mdx).

## Unit Testing

### Unit Test Toolkit

* Test framework: [NUnit3](https://nunit.org/).
* Mocking framework: [FakeItEasy](https://fakeiteasy.github.io/).
* Assertion library: [Shouldly](http://docs.shouldly-lib.net/v2.4.0/docs).

### Unit Test Base Classes

The ODS solution, as well as related NuGet packages and utility applications,
share a common project reference to `EdFi.TestFixture`, which contains valuable
helpers described below.

#### ScenarioFor

This is a base class that aids in construction of tests with automatic
dependency injection. It is present primarily for legacy purposes and is not
generally used for new tests.

#### TestDbSet

This class inherits from `DbSet`  and serves as a test double. `TestDbSet` is
used with testing repository classes that would otherwise use Entity Framework
directly.

#### TestFixtureBase

Most unit test fixtures in the `Ed-Fi-ODS`
and `Ed-Fi-ODS-Implementation` repositories inherit from this class. The class
provides lightweight scaffolding that aids in structuring low-maintenance test
fixtures. The following code sample highlights some of the features. All
comments in the example have been added in Confluence, and do not exist [in the
original
source](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS/blob/development/tests/EdFi.Common.UnitTests/Configuration/ApiConfigurationProviderTests.cs).

:::tip

Test fixture classes and methods are usually named using snake\_case
instead of Pascal case, except for the outer wrapping class. This makes the
names easier to read and encourages writing meaningful "business language"
descriptions.

:::

```csharp
// Create an outer "container" for all tests that belong to a particular system.
[TestFixture]
[SuppressMessage("ReSharper", "InconsistentNaming")]
public class ApiConfigurationProviderTests
{
    // Create an inner class class whose name describes the action being tested; 
    // it should inherit from TestFixtureBase.
    public class When_getting_a_sandbox_api_mode : TestFixtureBase
    {
        // Variables and properties can go here, with appropriate scope. Example:
        private IConfigConnectionStringsProvider _configConnectionStringsProvider;
        private IConfigValueProvider _configValueProvider;
        private IDatabaseEngineProvider _databaseEngineProvider;

        // Commonly there are variables here to store the system under test
        // and the test result:
        private ApiConfigurationProvider _systemUnderTest;
        private ApiMode _result;

        // Implement the Arrange() method, which the base class will call before 
        // execution of each and every test.
        protected override void Arrange()
        {
            // This section will include initial values, creation of fakes, and 
            // setup of those fakes to inject expected responses (mocks)
            _configValueProvider = A.Fake<IConfigValueProvider>();
            _configConnectionStringsProvider = A.Fake<IConfigConnectionStringsProvider>();
            _databaseEngineProvider = A.Fake<IDatabaseEngineProvider>();

            A.CallTo(() => _configValueProvider.GetValue(ApiConfigurationConstants.ApiStartupType))
                .Returns(ApiConfigurationConstants.Sandbox);

            A.CallTo(() => _configConnectionStringsProvider.ConnectionStringProviderByName)
                .Returns(new Dictionary<string, string> {{"db", ApiConfigurationConstants.SqlServerProviderName}});

            // Commonly, `_systemUnderTest` is initialized using constructor injection 
            // to insert the fake dependencies created above.
            _systemUnderTest = new ApiConfigurationProvider(_configValueProvider, _databaseEngineProvider);
        }

        // Implement the Act() method, which will perform the action whose outcome is 
        // being tested.
        protected override void Act()
        {
            // If the method under test has a return value, that value is commonly stored 
            // in an instance variable defined above, e.g. `_result`.
            _result = _systemUnderTest.Mode;
        }

        // The following two [Test] cases illustrate the rule of "one assertion per test".
        [Test]
        public void Should_not_be_year_specific()
        {
            _systemUnderTest.IsYearSpecific()
                .ShouldBe(false);
        }

        [Test]
        public void Should_parse_the_api_mode_with_success()
        {
            _result.ShouldBe(ApiMode.Sandbox);
        }
    }

    // Here we have a second inner class to test functionality under different conditions.
    public class When_getting_a_year_specific_api_mode : TestFixtureBase
    {
        // Member properties and instance variables...

        protected override void Arrange()
        {
            // Once-per-test setup
        }

        protected override void Act()
        {
            // Call the system under test
        }

        // These two test are similar to the class above this, but with different expected 
        // results due to differing input values in the setup process.
        [Test]
        public void Should_be_year_specific()
        {
            _systemUnderTest.IsYearSpecific()
                .ShouldBe(true);
        }

        [Test]
        public void Should_parse_the_api_mode_with_success()
        {
            _result.ShouldBe(ApiMode.YearSpecific);
        }
    }

 // Add more test classes as needed to cover the functionality in the system under test.
}
```

## Integration Testing with Postman

### Integration Testing Toolkit

ODS / API integration tests use [Postman](https://getpostman.). The following
notes have been helpful for the development team during the adoption of Postman
in 2019.

### Best Practices for Establishing Data for Tests

* Do not use hard-coded values as this makes the tests rigid.
* Interactively inspect the sample ODS database to ensure the data present are
    adequate for testing targeted functionality.
  * If necessary data exists, then add GET requests to initialize any needed
        "known" values (e.g., resource Ids, UniqueIds). Save the known values as
        environment variables (using `pm.environment.set` ) for subsequent use.
        Follow the guidelines on Postman variable usage (see below).
  * If necessary data exists but is difficult to locate through the API, add
        POST requests as necessary.
  * If necessary data is not present, add POST requests as necessary to
        initialize data in the ODS.
* Make sure all data initialized by POST requests have tests that check the
    API's response to make sure data is configured as expected (e.g., ensure
    that requests to create new data return `201 - Created` ).
* For verification, write test scripts to be as flexible as possible in
    verifying targeted functionality.
  * For example, for Composite resource tests, a GET request is used to
        retrieve a page of data which is then processed in its entirety to
        ensure that the expected structure of the composite definition is
        found *somewhere* (as opposed to *everywhere*) in the response.
* When creating new data in PUT and POST requests, omit the following elements
    from the body:

* The `link`  object on references. This is not used for writing.
* The `id`  property
* The `_etag`  property
* All `null`  values. This just adds noise to the body for maintenance. Keep
    it clean.
* Do not include any *optional* values that don't add meaning to the test. For
    example, some requests in the test have empty strings assigned to properties
    that are optional and could just be omitted for the test. Including those
    values can become an unnecessary distraction for future maintainers of these
    tests because they are not relevant to the functionality being tested.
    Here's an example, from a Student POST request:

    ```json
    ...
    "firstName": "{{supplied:firstName}}",
    "generationCodeSuffix": "",
    "identificationDocuments": [ ],
    "lastSurname": "{{supplied:lastSurname}}",
    "maidenName": "",
    "middleName": "",
    ...
    ```

### Environment Variable Naming / Usage

* The names of environment variables should use the following format:
    (*known*|*supplied*)\[:*scenarioId*\]:*name*
  * Use a `known:`  prefix for variables that hold values that are "known"
        from the ODS database. Examples:
    * `known:localEducationAgencyId`. The known Local Education Agency ID.
    * `known:{scenarioId}:studentUniqueId`. A known student Unique ID that
            is the focus of a particular test scenario.
  * Use a `supplied:` prefix for variables that hold values defined by the
        test. Examples:
    * `supplied:{scenarioId}:birthDate`. An arbitrary value created by the
            test (e.g., for use in creating a new Student or Staff resource).
    * `supplied:{scenarioId}:studentUniqueId`. An arbitrary Unique ID
            value created by the test (also, e.g., for use in creating a new
            Student or Staff resource).
  * The "scenarioId" portion is optional, but enables the variable to be
        scoped for a specific scenario (which is something that Postman doesn't
        directly support).
    * Our current approach has been to copy the following boilerplate to
            the "Pre-request Script" of an initialization request:

        ```js
        const uuid = require('uuid');
        function newGuid() { return uuid.v4().toString().replace(/[^a-zA-Z0-9 ]/g,""); }
        function createScenarioId() { return newGuid().substring(0,5); }
         
        // Set the scenarioId for the current scenario
        pm.environment.set('scenarioId', createScenarioId());
         
        // Use the scenarioId to store values for the current scenario
        const scenarioId = pm.environment.get('scenarioId');
        pm.environment.set('supplied:'+scenarioId+':studentUniqueId',  newGuid());
        // ... or use string interpolation
        pm.environment.set(`supplied:${scenarioId}:studentUniqueId`,  newGuid());
        ```

  * The "name" portion should reflect the nature of the data the variable
        represents.
  * We have removed all usages of `pm.variables.set`  because this sets
        transient variables that only exist for the duration of the current
        execution run. When using the Collection Runner, the variable will be
        available throughout the current *run*, but when executing tests
        interactively, the variable will only exist for the duration of the
        current *request*.\
        The issue is that `pm.variables.get` will resolve variables by name all
        the way up a chain of priority:

    * Global
    * Environment
    * Collection
    * Local

        We encountered a situation where there was an identically named variable
        stored in the *environment.* During interactive request executions, the
        value being used was from the environment variable, but during
        Collection Runner test runs the value set by `pm.variables.set` was
        used. This caused the tests to fail during interactive execution which
        was deemed to be an undesirable characteristic of the approach. Thus,
        the approach of naming variables such that they are scoped using a
        middle "scenarioId" segment was taken.

* Add a request at the bottom of the collection that cleans up all environment
    variables. This can be used when running tests interactively to prevent
    bleed over from one scenario to another. For example, you might have a GET
    request on `{{ApiBaseUrl}}` with the following Pre-request script:

    ```js
    const __ = require('lodash');
     
    const keys = __.keys(pm.environment.toObject());
    console.log('Initial keys: ' + JSON.stringify(keys));
     
    const keysToRemove = __.filter(keys, x => __.startsWith(x, 'known:') || __.startsWith(x, 'supplied:'));
     
    __.each(keysToRemove, k => pm.environment.unset(k));
     
    const remainingKeys = __.keys(pm.environment.toObject());
    console.log('Remaining keys:' + JSON.stringify(remainingKeys));
    ```
