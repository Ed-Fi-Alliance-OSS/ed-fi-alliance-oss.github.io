# C# Best Practices

## Introduction

This page is a companion to the [C# Coding
Standards](./c-coding-standards.md),
sharing some of the best practices that are generally employed in Ed-Fi Alliance
supported software. While these are not fixed and absolute rules, code reviewers
can and should push back if they feel that a deviation from best practice
hinders any of the *-ilities,* such as readability, maintainability, and so
forth.

## Naming Conventions

What's in a name? Everything. Use clear and descriptive names for classes,
methods, fields and variables to reduce maintenance costs.

1. Make sure that after refactoring code that the names are still appropriate.

    **A Method Name That Does Not Reflect Its Behavior**

    ```csharp
    // The method name includes the text "Not" and returns a boolean value.
    // This could create scenarios where callers are performing double
    // negatives, which are hard to read (e.g., if (!IsNotDuplicate(…) { )
    private static bool IsNotDuplicate(Dictionary<Tuple<string, string>, int> idsByValue,
          Tuple<string, string> key,
          // Since the main behavioral aspect of this method is to modify
          // the StringBuilder, it would make more sense to pass it first
          // in the list of arguments.
          StringBuilder duplicatesMessageBuilder)
    {
        if (idsByValue.ContainsKey(key))
        {
            // The behavior of the method actually appends to the provided
            // StringBuilder, but this is not reflected in the method name
            // at all and is only discoverable by a developer inspecting
            // the code.
            duplicatesMessageBuilder.AppendFormat("\tDescriptor Type: {0}, Code Value: {1}\r\n", key.Item1, key.Item2);
            return false;
        }
          
        return true;
    }
    ```

    **Improved Name and Signature**

    ```csharp
    private static bool TryAppendDuplicateValueMessage(StringBuilder duplicatesMessageBuilder,
          Tuple<string, string> key,
          Dictionary<Tuple<string, string>, int> idsByValue)
    {
        …
    }
    ```

2. Name dictionaries using a name format of `{ValueName}By{KeyName}`.

    * Precisely describe the keys and values (e.g., `SchoolNameById` would
        indicate that you can obtain a school's name by its identifier).

    * If each entry’s value is a single item, the name should be singularized
        (e.g., `StudentById`).

    * If each entry’s value is a collection, the name should be pluralized
        (e.g., `StudentsBySectionId`).

3. Use the following guidelines when defining generic types:

    * For types with a single generic type, prefer the use of `T`.

        ```csharp
        public interface IList<T>
        ```

    * For types with multiple generic types, use a capital "T" followed by an
        optional secondary name for additional clarity. In all cases, start the
        type with a capital letter.

        ```csharp
        public interface IService<TRequest, TResponse>
        ```

4. Name custom attribute and exception classes using suffixes
    of `Attribute` and `Exception`, respectively.

5. Name enumerations in the singular (e.g., `FileMode`) unless the enumeration
    is representing a bit flag value (e.g., `FileAttributes`) in which case
    the `[Flags]` attribute should also be applied.

## Exception Handling

1. Express exception messages as grammatically correct sentences.

    1. When appropriate, format the message using string interpolation.

        ```csharp
        throw new Exception($"There is no data for resource '{resourceName}'.");
         
        throw new Exception($"Type '{typeName}' not found in assembly '{assemblyName}'.");
        ```

    2. For exceptions that are targeted for a developer audience (such as
        configuration errors that shouldn't happen in production), you may
        include a helpful suggestion or question to help resolve the error
        message.

2. Before throwing `Exception`, consider whether a custom exception or one of
    the following .NET exceptions would provide semantic value:
    1. [ArgumentException](https://docs.microsoft.com/en-us/dotnet/api/system.argumentexception?view=netframework-4.7.2).
    2. [ArgumentOutOfRangeException](https://docs.microsoft.com/en-us/dotnet/api/system.argumentoutofrangeexception?view=netframework-4.7.2).
    3. [ArgumentNullException](https://docs.microsoft.com/en-us/dotnet/api/system.argumentnullexception?view=netframework-4.7.2).
    4. [IndexOutOfRangeException](https://docs.microsoft.com/en-us/dotnet/api/system.indexoutofrangeexception?view=netframework-4.7.2).
    5. [InvalidOperationException](https://docs.microsoft.com/en-us/dotnet/api/system.invalidoperationexception?view=netframework-4.7.2). Per
        the Microsoft .NET documentation, "Typically, it is thrown when the
        state of an object cannot support the method call" such as when an
        instance variable is null and therefore you can't reference a property
        on that variable.
    6. [NotImplementedException](https://docs.microsoft.com/en-us/dotnet/api/system.notimplementedexception?view=netframework-4.7.2).
3. Do not reuse .NET exceptions outside of their semantic context
    (e.g., `ObjectNotFoundException` is defined in multiple places,
    and `AuthorizationFailedException` and `SecurityAccessDeniedException` have
    specific contexts in which they're used).

## Using Static Structures

1. Call [static](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/static) members
    by using the class name: `ClassName.StaticMember`. This practice makes code
    more readable by making static access clear.
2. Do not qualify a static member defined in a base class with the name of a
    derived class. While that code compiles, the code readability is misleading,
    and the code may break in the future if you add a static member with the
    same name to the derived class.
3. Avoid taking dependencies on static .NET Framework classes whose results are
    not idempotent or require access to infrastructure
    (e.g., `System.DateTime`, `System.IO.File`, and `System.Configuration.ConfigurationManager`,
    but not `System.IO.Path`). Instead, define an interface using a naming
    convention of `I{StaticClassName}` and build a minimal (but expanding, as
    necessary) facade with an implementation named as
    `{StaticClassName}Wrapper`. This will enable the behavior to be controlled
    for testing purposes.

    1. For `System.IO.File`, this would look like this:

        ```csharp
        public interface IFile
        {
            bool Exists(string path);
        }

        public class FileWrapper : IFile
        {
            public bool Exists(string path)
            {
                return File.Exists(path);
            }
        }
        ```

    2. The functionality of the `ConfigurationManager` has been abstracted
        using a different approach due to legacy code reuse. Review
        the `IConfigValueProvider`, `IConfigSectionProvider` and `IConfigConnectionStringsProvider` interfaces
        and associated implementations.

## Design Guidance

### SOLID Principles

Apply SOLID principles everywhere. Chapters 8–12 of [Agile Principles, Patterns,
and
Practices](http://www.amazon.com/Agile-Principles-Patterns-Practices-C/dp/0131857258) by
Robert C. Martin are highly recommended reading.

1. ***S**ingle Responsibility Principle.* There should only be one reason for a
    class to change. If you're having to change an existing class, ask yourself,
    "Is there an abstraction (interface) missing here?"
2. ***O**pen/Closed Principle.* The system should be open for extension, but
    closed to modification. You should be able to change the behavior of the
    system by adding a new implementation of an existing interface.
3. ***L**iskov Substitution Principle.* A derived class should be substitutable
    for its base class, and should not change the fundamental nature of the
    abstraction.
4. ***I**nterface Segregation Principle.* An interface should be highly
    focused. Many interfaces in the Ed-Fi ODS / API have just one or two
    methods. If you implement some methods of an interface using `new
    NotImplementedException()`, the interface probably needs to be decomposed.
5. ***D**ependency Inversion Principle.* External dependencies are injected
    into classes, preferably via their constructors. The Ed-Fi ODS / API uses
    Castle Windsor as its Inversion of Control container.

### Class Design

1. Avoid deep class hierarchies (more than 2 total levels). Prefer [composition
    over
    inheritance](https://www.thoughtworks.com/insights/blog/composition-vs-inheritance-how-choose).
2. Keep logic in constructors simple, primarily focused on capturing the
    injected dependencies to the field values.
3. Prefer constructor injection to property injection.
    1. A property injector may be appropriate for injecting a fake during unit
        testing, where changing the constructor and setting up the IoC container
        might not be worthwhile. Use sparingly.
4. Do not use properties to modify class state outside of the property being
    set. If other state must be changed, prefer the use of a read-only property
    in combination with a well-named method.
5. Prefer the use of return types that are abstractions rather than concrete
    types from public members. In other words,
    prefer `IList<T>` to `List<T>` and `IDictionary<TKey,
    TValue>` over `Dictionary<TKey, TValue>`.
6. Make sure the return types from public members match the intended semantics.
    In other words,
    prefer `IEnumerable<T>` over `IList<T>` and `IReadOnlyDictionary<TKey,
    TValue>` over `IDictionary<TKey, TValue>`, unless modifications by the
    caller are intended.

    ```csharp
    // Good
    public interface IStudentDataProvider
    {
        IEnumerable<Student> GetAll();
        IReadOnlyDictionary<string, Student> GetStudentByNameDictionary();
    }
     
    // Potentially problematic for maintenance, due to semantics of returned values
    public interface IStudentDataProvider
    {
        IList<Student> GetAll();
        IDictionary<string, Student> GetStudentByNameDictionary();
    }
    ```

7. Do not use the `new` inheritance qualifier. Instead, reevaluate the design
    of the class.
8. Do not make members of a class `public` for the sake of unit testing. Find a
    better way to test the functionality.

9. When providing an implementation of an interface that does nothing, use the
    [Null Object Pattern](http://en.wikipedia.org/wiki/Null_Object_pattern).

    ```csharp
    public interface IETagProvider
    {
        string GetETag(object value);
     
        DateTime GetDateTime(string etag);
    }
    
    public class NullETagProvider : IETagProvider
    {
        public string GetETag(object value)
        {
            return string.Empty;
        }
     
        public DateTime GetDateTime(string etag)
        {
            return default(DateTime);
        }
    }
    ```

10. The Provider Pattern (also known as the [Strategy
     Pattern](http://en.wikipedia.org/wiki/Strategy_pattern)) is used heavily in
     the code base.

    1. If the contract being defined basically allows the caller to *get* something, the `Provider` suffix is preferred.
    2. If the contract allows the caller to *get* and *set* something, consider splitting the methods into `Reader` and `Writer` interfaces (which could still be implemented by the same class).  The intent here is to provide more clearly stated intent when a caller intends to modify the underlying data exposed by the provider.

        ```csharp
        // Instead of this...
        public interface ICacheProvider
        {
            void RemoveCachedObjects(string keyContains);
            void RemoveCachedObject(string keyName);
            bool TryGetCachedObject(string key, out object value);
            void SetCachedObject(string keyName, object obj);
            void Insert(string key, object value, System.Web.Caching.CacheDependency dependencies, DateTime absoluteExpiration, TimeSpan slidingExpiration);
            void Insert(string key, object value, DateTime absoluteExpiration, TimeSpan slidingExpiration);
        }
        
        // Consider decomposing the interfaces ...
        public interface ICacheReader
        {
            bool TryGetCachedObject(string key, out object value);
        }
        
        public interface ICacheWriter
        {
            void RemoveCachedObjects(string keyContains);
            void RemoveCachedObject(string keyName);
            void SetCachedObject(string keyName, object obj);
            void Insert(string key, object value, System.Web.Caching.CacheDependency dependencies, DateTime absoluteExpiration, TimeSpan slidingExpiration);
            void Insert(string key, object value, DateTime absoluteExpiration, TimeSpan slidingExpiration);
        } 
        ```

    3. If the contract being defined performs some sort of action, the suffix may be removed entirely.

        ```csharp
        public interface IObjectValidator
        {
            ICollection<ValidationResult> ValidateObject(object @object);
        }
        ```

11. Use creational patterns for creating objects that involve significant
    logic.
    1. When the logic required to create something doesn't fit well into
    a class constructor, use a creational pattern like the [Factory
    Pattern](http://en.wikipedia.org/wiki/Factory_%28object-oriented_programming%29).
    2. When an item can built in one step, use "Create" semantics (see the
    [Factory Method
    Pattern](http://en.wikipedia.org/wiki/Factory_method_pattern)). 
    3. When an
    item is built up over multiple steps, using "Build" semantics (see the
    [Builder Pattern](http://en.wikipedia.org/wiki/Builder_pattern)).
12. When a class has the concept of an empty instance, implement a static
     read-only `Empty` property.

    ```csharp
    public class UserLookupResult
    {
        public static readonly UserLookupResult Empty = new UserLookupResult();
        …
    } 
    ```

:::info

Portions of this document are based on the [Microsoft csharp Coding
Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/inside-a-program/coding-conventions),
which have been reproduced and modified under the terms of the [Creative
Commons Attribution 4.0 International
license](https://github.com/dotnet/docs/blob/master/LICENSE).

:::
