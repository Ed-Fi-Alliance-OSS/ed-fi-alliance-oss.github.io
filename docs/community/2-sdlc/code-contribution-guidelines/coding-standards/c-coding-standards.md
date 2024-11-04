# C# Coding Standards

:::tip

For other important guidance, see also:

* [Coding Standards - General Principles](./README.md)
* [c# Best Practices](./c-best-practices.md)

:::

## Naming Conventions

1. Use Pascal casing for type, method names, and constants:

   ```csharp
   public class SomeClass
   {
       private const int DefaultSize = 100;

       public void SomeMethod()
       {
            …
       }
   }
   ```

2. Use camel casing for local variable names and method arguments:

   ```csharp
   public void SomeMethod(int someNumber)
   {
       int number;
       …
   }
   ```

3. Prefix interfaces with `I`:

   ```csharp
   public interface ISomethingProvider
   {
       …
   }
   ```

4. Suffix interface implementations with the non-prefixed interface name:

   ```csharp
   public class ThisSomethingProvider : ISomethingProvider
   {
       …
   }
   ```

5. Prefix all fields with an underscore (`_`). If a file happens to differ in
   style from these guidelines, the existing style in that file takes
   precedence:

   ```csharp
   public class SomeClass
   {
       private ISomethingProvider _thisSomethingProvider;
   }
   ```

6. Name methods using a verb or verb-object pair (unless implementing a fluent
   API):

   ```csharp
   public decimal CalculateTax(decimal amount)
   {
       …
   }
   ```

7. You may use single-character or mnemonic variable names in the following
   scenarios:

   1. In for loops where it is a common convention to use variables like `i` ,
      `j` , and `k` .

   2. In LINQ expressions where it is a common convention to use variables like
      `x` or a mnemonic for the item being represented (e.g., `ssa`  for an
      object of type `StudentSchoolAssociation` ).

8. Do not abbreviate terms or use acronyms as this leads to usage inconsistency
   in the code and other application artifacts and reduces readability.
   Specifically, do not abbreviate "EducationOrganization" as “EdOrg” or
   “LocalEducationAgency” as “Lea”.

   1. Exceptions: well-known terms such as ODS, API, Id, msg, max, min, JSON,
      and so forth.

9. Name abstract classes using a suffix of Base (e.g., `EdFiControllerBase`).

10. Name extension classes and files by the type being extended.

    **ByteArrayExtensions.cs**

    ```csharp
    public static class ByteArrayExtensions
    {
        public static int ToInt32(this byte[] input) => BitConverter.ToInt32(input, 0);

        public static long ToInt64(this byte[] input) => BitConverter.ToInt64(input, 0);

        public static string ToHexString(this byte[] input) => BitConverter.ToString(input).Replace("-", "");
    }
    ```

_See also_ [C# Best Practices: Naming Conventions](./c-best-practices.md).

## Formatting

1. Use
   [Allman style braces](http://en.wikipedia.org/wiki/Indent_style#Allman_style)
   where each brace begins on a new line and use consistent style.

   ```csharp
   // Good
   if (a == b)
   {
       c = d;
   }

   // Bad
   if (a == b) {
    c = d;
   }

   // Bad - inconsistent style
   if (a == b)
    c = d;
   else
   {
    c = e;
   }
   ```

2. Do not add blank lines between sets of closing braces.

   ```csharp
   if (a == b)
   {
       if (c == d)
       {
           if (e == f)
           {
               DoSomething();
           }
       }

   } // The blank line above this brace should be removed.
   ```

3. Include blank lines after closing braces as long as the next statement isn't
   part of a continuing language construct (e.g., if / else, try / catch /
   finally).

   ```csharp
   // Good
   public static string ToCamelCase(this string text)
   {
       if (string.IsNullOrWhiteSpace(text))
       {
           return text;
       }

       return char.ToLower(text[0]) + text.Substring(1);
   }

   // Bad
   public static string ToCamelCase(this string text)
   {
       if (string.IsNullOrWhiteSpace(text))
       {
           return text;
       }
       return char.ToLower(text[0]) + text.Substring(1);
   }
   ```

4. Use parentheses to make clauses in an expression apparent, as shown in the
   following code:

   ```csharp
   if ((val1 > val2) && (val1 > val3))
   {
       // Take appropriate action.
   }
   ```

5. When building multi-line conditional statements, put the conditional operator
   at the beginning of each line.

   ```csharp
   // Good
   public bool IsEmpty()
   {
       return
           !(EducationOrganizationId.HasValue || StateEducationAgencyId.HasValue
             || EducationServiceCenterId.HasValue || LocalEducationAgencyId.HasValue
             || SchoolId.HasValue || EducationOrganizationNetworkId.HasValue)
             && string.IsNullOrWhiteSpace(StaffUniqueId)
             && string.IsNullOrWhiteSpace(StudentUniqueId)
             && string.IsNullOrWhiteSpace(ParentUniqueId)
             && string.IsNullOrWhiteSpace(Namespace)
             && string.IsNullOrWhiteSpace(AssessmentFamilyTitle)
             && string.IsNullOrWhiteSpace(AssessmentTitle);
   }

   // Bad
   public bool IsEmpty()
   {
       return
           !(EducationOrganizationId.HasValue || StateEducationAgencyId.HasValue
             || EducationServiceCenterId.HasValue || LocalEducationAgencyId.HasValue
             || SchoolId.HasValue || EducationOrganizationNetworkId.HasValue) &&
             string.IsNullOrWhiteSpace(StaffUniqueId) &&
             string.IsNullOrWhiteSpace(StudentUniqueId) &&
             string.IsNullOrWhiteSpace(ParentUniqueId) &&
             string.IsNullOrWhiteSpace(Namespace) &&
             string.IsNullOrWhiteSpace(AssessmentFamilyTitle) &&
             string.IsNullOrWhiteSpace(AssessmentTitle);
   }
   ```

6. Put auto-properties on a single line.

   ```csharp
   // Good
   public int Age { get; set; }

   // Bad
   public int Age
   {
        get;
        set;
   }
   ```

7. Bring base or this constructors onto a separate line (indented).

   ```csharp
   public NotFoundException(string message, string typeName, string identifier)
       : base(message)
   {
       TypeName = typeName;
       Identifier = identifier;
   }
   ```

8. Constructors with no bodies can be shortened to one line.

   ```csharp
   public NotFoundException() {}

   public NotFoundException(string message)
       : base(message) {}
   ```

9. Bring constraints for generic types onto separate lines (indented).

   ```csharp
   public abstract class EdFiControllerBase<TResource, TEntityInterface, TAggregateRoot, TGetByKeyRequest, TPutRequest, TPostRequest, TDeleteRequest> : ApiController
       where TResource : IHasIdentifier, IHasETag, new()
       where TEntityInterface : class
       where TAggregateRoot : class, IHasIdentifier, new()
       where TPutRequest : TResource
       where TPostRequest : TResource
       where TDeleteRequest : IHasIdentifier
   {
       …
   }
   ```

10. Namespace imports should be specified at the top of the
    file, outside of namespace declarations and should be sorted alphabetically,
    with System. namespaces at the top.
11. Class artifacts should be organized as follows:

    1. Fields (primarily holding injected dependencies).
    2. Constructor(s).
    3. Public members (properties and methods).
    4. Define property-backing fields immediately before the property.

       ```csharp
       private IEnumerable<Student> _students;

       public IEnumerable<Student> Students
       {
           get { return _students; }
       }
       ```

    5. Define non-shared supporting methods immediately following the method
       they were introduced to support, or use a local method.

       ```csharp
       public void DoSomethingInteresting()
       {
           …
           int something = GetSomething();
           …
           int anotherThing = GetAnotherThing();
       }

       private int GetSomething()
       {
          // ...
       }

       private int GetAnotherThing()
       {
          // ...
       }

       // Local method variant
       public void DoSomethingCompletelyDifferent()
       {
           int something = GetSomething();
           // ...

        int GetSomething()
        {
            // ...
        }
       }
       ```

## Data Types

1. Use idiomatic C# types instead of .NET Framework types.

   | Idiomatic  ✅ | Framework ❌ |
   | ------------- | ------------ |
   | string        | String       |
   | object        | Object       |
   | int           | Int32        |
   | double        | Double       |

2. In general, use `int` rather than unsigned types. The use of `int` is common
   throughout C#, and it is easier to interact with other libraries when you
   use `int`.
3. String Data Type

   1. Use [string interpolation](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/interpolated) to
      concatenate short strings, as shown in the following code:

      ```csharp
      string displayName = $"{nameList[n].LastName}, {nameList[n].FirstName}";
      ```

   2. To append strings in loops, especially when you are working with large
      amounts of text, use
      a [StringBuilder](https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder) object.

      ```csharp
      var phrase = "lalalalalalalalalalalalalalalalalalalalalalalala";
      var manyPhrases = new StringBuilder();
      for (var i = 0; i < 10000; i++)
      {
          manyPhrases.Append(phrase);
      }
      //Console.WriteLine("tra" + manyPhrases);
      ```

   3. Use case-insensitive checks rather than converting the casing of strings
      for case-sensitive comparison.

      ```csharp
      string value1 = "Bob";
      string value2 = "BoB";

      // Good
      if (value1.Equals(value2, StringComparison.InvariantCultureIgnoreCase))
      {
          return true;
      }

      // Bad
      if (value1.ToLower() == value2.ToLower())
      {
          return true;
      }
      ```

4. Implicitly typed local variables are generally preferred over explicit
   typing, unless the programmer or reviewer feels that an explicit type is a
   significant readability improvement.

   ```csharp
   // When the type of a variable is clear from the context, use var
   // in the declaration.
   var var1 = "This is clearly a string.";
   var var2 = 27;
   var var3 = Convert.ToInt32(Console.ReadLine());

   // IntelliSense will prevent you from misusing `var4`, even though
   // the reader cannot see the type in plain text.
   int var4 = ExampleClass.ResultSoFar();
   ```

5. Do not rely on the variable name to specify the type of the variable. It
   might not be correct.

   ```csharp
   // Naming the following variable inputInt is misleading.
   // It is a string.
   var inputInt = Console.ReadLine();
   Console.WriteLine(inputInt);
   ```

6. Do not use the
   C# [dynamic](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/reference-types) type.

## Initialization

1. Arrays: Use the concise syntax when you initialize arrays on the declaration
   line.

   ```csharp
   // Preferred syntax. Note that you cannot use var here instead of string[].
   string[] vowels1 = { "a", "e", "i", "o", "u" };

   // If you use explicit instantiation, you can use var.
   var vowels2 = new string[] { "a", "e", "i", "o", "u" };

   // If you specify an array size, you must initialize the elements one at a time.
   var vowels3 = new string[5];
   vowels3[0] = "a";
   vowels3[1] = "e";
   // And so on.
   ```

2. New Operator: Use the concise form of object instantiation, with implicit
   typing, as shown in the following declaration:

   ```csharp
   var instance1 = new ExampleClass();

   // The previous line is equivalent to the following declaration.
   ExampleClass instance2 = new ExampleClass();
   ```

3. Use object initializers to simplify object creation.

   ```csharp
   // Good
   var claims = new List<Claims>
       {
           new Claim("name1", "value1"),
           new Claim("name2", "value2"),
       };

   var studentById = new Dictionary<int, Student>
       {
           { 123456, new Student { Name = "John Doe", Age = 17} },
           { 234567, new Student { Name = "Jane Doe", Age = 16} },
       };

   // Bad
   var claims = new List<Claims>();
   claims.Add(new Claim("name1", "value1"));
   claims.Add(new Claim("name2", "value2"));

   // Even Worse
   var studentById = new Dictionary<int, Student>();

   var student1 = new Student();
   student1.Name = "John Doe";
   student1.Name = 17;

   var student2 = new Student();
   student2.Name = "Jane Doe";
   student2.Name = 16;

   studentById.Add(123456, student1);
   studentById.Add(234567, student2);
   ```

## Exception Handling

1. Use
   a [try-catch](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/try-catch) statement
   for most exception handling.

   ```csharp
   static string GetValueFromArray(string[] array, int index)
   {
       try
       {
           return array[index];
       }
       catch (System.IndexOutOfRangeException ex)
       {
           Console.WriteLine("Index is out of range: {0}", index);
           throw;
       }
   }
   ```

2. Simplify your code by using the
   C# [using statement](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/using-statement).
   If you have
   a [try-finally](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/try-finally) statement
   in which the only code in the `finally` block is a call to
   the [Dispose](https://docs.microsoft.com/en-us/dotnet/api/system.idisposable.dispose) method,
   use a `using` statement instead.

   ```csharp
   // This try-finally statement only calls Dispose in the finally block.
   Font font1 = new Font("Arial", 10.0f);
   try
   {
       byte charset = font1.GdiCharSet;
   }
   finally
   {
       if (font1 != null)
       {
           ((IDisposable)font1).Dispose();
       }
   }

   // You can do the same thing with a using statement.
   using (Font font2 = new Font("Arial", 10.0f))
   {
       byte charset = font2.GdiCharSet;
   }
   ```

3. Define custom exception classes when you expect the exception to be
   explicitly handled somewhere else in your application. It's a lot more
   reliable to match an exception based on its type than by extracting
   information from the message.

_See also_ [C# Best Practices: Exception Handling](./c-best-practices.md).

## Null Detection

Avoid surprise null reference exceptions by checking for null values before
using an object reference:

1. On public, protected, and internal method arguments:

   ```csharp
   public void Something(Object obj)
   {
       if (obj == null)
    {
           throw new ArgumentNullException(nameof(obj));
       }
   }
   ```

2. On constructor arguments _except when the constructor is invoked by the IoC
   container_. In that case, we tend to trust that the container will not inject
   a null object. Thus this primarily relates to constructors that we expect to
   invoke directly in code.

   ```csharp
   public class A
   {
       private readonly B _b;

       public A(B b)
    {
           _b = b ?? throw new ArgumentNullException(nameof(b));
       }
   }
   ```

3. When receiving a value from a dependency. You may be able to look at the
   dependency code and confirm that it does not _right now_ return a null, but
   it is safer to assume that it _can_ return a null value.

   ```csharp
   public class A
   {
       private readonly ISomeInterface _b;

       public A(ISomeInterface b)
    {
           _b = b;
       }

       public bool DoSomething()
    {
          var c = _b.CallAMethod();

          if (c == null)
       {
              throw new InvalidOperationException("Cannot calculate value due to dependent object returning a null value unexpectedly");
          }

          return c.IsTrue;
       }
   }
   ```

   Alternately, if receiving a null value is acceptable, then be sure to handle
   it per the business requirements. Only do this if `null` is a real expected
   value. Otherwise, if `null` is not expected and you convert to a real value,
   that might be masking an underlying bug in the dependency.

   ```csharp
   public class A
   {
       private readonly ISomeInterface _b;

       public A(ISomeInterface b)
       {
           _b = b;
       }

       public bool DoSomething()
       {
          var c = _b.CallAMethod();

          // Accept null values above, but treat as false
          return c?.IsTrue ?? false;
       }
   }
   ```

   :::tip

   This is an exceptional comment: it explains what the code is doing. In this
   case, it seems reasonable because the code is doing something unusual. The
   comment makes clear that it was quite intentional.

   :::

## LINQ Queries

1. The Alliance development teams generally prefer the
   [Method Syntax over the Query Syntax for LINQ](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/linq/query-syntax-and-method-syntax-in-linq).
   Some older code does contain the Query Syntax; this can be changed
   opportunistically or left as is.
2. Use meaningful names for query variables. The following example
   uses `seattleCustomers` for customers who are located in Seattle.

   ```csharp
   var seattleCustomers = customers.Where(x => x.City == "Seattle")
                                   .Select(x => x.Name);
   ```

3. Use aliases to make sure that property names of anonymous types are correctly
   capitalized, using Pascal casing.

   ```csharp
   var seattleCustomers = customers.Join(distributors,
              customer => customer.City,
              distributor => distributor.City,
              (customer, distributor) => new {
                                             Customer = customer,
                                             Distributor = distributor
                                         });
   ```

4. Rename properties when the property names in the result would be ambiguous.
   For example, if your query returns a customer name and a distributor ID,
   instead of leaving them as `Name` and `Id` in the result, rename them to
   clarify that `Name` is the name of a customer, and `ID` is the ID of a
   distributor.

   ```csharp
   var seattleCustomers = customers.Join(distributors,
              customer => customer.City,
              distributor => distributor.City,
              (customer, distributor) => new {
                                             CustomerName = customer.Name,
                                             DistributorId = distributor.Id
                                         });
   ```

5. Use implicit typing in the declaration of query variables and range
   variables.

   ```csharp
   var seattleCustomers = customers.Where(x => x.City == "Seattle")
                                   .Select(x => x.Name);
   ```

6. Use [Where](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/where-clause) clauses
   before other query clauses to ensure that later query clauses operate on the
   reduced, filtered set of data.

   ```csharp
   var seattleCustomers = customers.Where(x => x.City == "Seattle")
                           .OrderBy(x => x.Age)
                                    .Select(x);
   ```

## Other Rules

1. `&&` and `||` Operators: To avoid exceptions and increase performance by
   skipping unnecessary comparisons,
   use `[&&](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/boolean-logical-operators#conditional-logical-and-operator-)` instead
   of `[&](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/boolean-logical-operators#logical-and-operator-)` and `[||](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/boolean-logical-operators#conditional-logical-or-operator-)` instead
   of `[|](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/boolean-logical-operators#logical-or-operator-)` when
   you perform comparisons, as shown in the following example.

   ```csharp
   Console.Write("Enter a dividend: ");
   var dividend = Convert.ToInt32(Console.ReadLine());

   Console.Write("Enter a divisor: ");
   var divisor = Convert.ToInt32(Console.ReadLine());

   // If the divisor is 0, the second clause in the following condition
   // causes a run-time error. The && operator short circuits when the
   // first expression is false. That is, it does not evaluate the
   // second expression. The & operator evaluates both, and causes
   // a run-time error when divisor is 0.
   if ((divisor != 0) && (dividend / divisor > 0))
   {
       Console.WriteLine("Quotient: {0}", dividend / divisor);
   }
   else
   {
       Console.WriteLine("Attempted division by 0 ends up here.");
   }
   ```

2. Always use explicit scope.

   ```csharp
   // Good
   public class Something
   {
       private const int MaximumAge = 100;

       public int Age { get; set; }

       public void SayHello()
       {
           Console.WriteLine("Hello.");
       }
   }

   // Bad
   class Something
   {
       const int MaximumAge = 100;

       int Age { get; set; }

       void SayHello()
       {
           Console.WriteLine("Hello.");
       }
   }
   ```

3. Use `string.Empty`  rather than empty quotes (`""`) for empty strings. It
   clarifies true intent.
4. Do not exceed about 20-30 lines of code in a single method. After that,
   refactor the method into smaller well-named methods.
5. When using local functions:

   1. Limit use of closure on variables from the enclosing method, as they can
      make it difficult to read and understand the overall method.

      ```csharp
      public void Demonstration(string path)
      {
       var pathComponents = input.Split('/');
       // ...
       // ...

       // Good
       string First(IEnumerable<string> pathComponents)
       {
        if (pathComponents.Any())
        {
         return pathComponents.First();
        }
        throw new InvalidOperationException("Path does not contain any components");
       }

       // Bad
       string First()
       {
        // Where did `pathComponents` come from?
        if (pathComponents.Any())
        // etc.
       }
      }
      ```

   2. Limit local methods to only a few lines of code, and continue keeping the
      entire outer method to a reasonable length. Longer local methods are a
      code smell and make it more difficult to quickly understand the intent.

6. Favor a coding style of "fail fast" (and also "exit fast"). If there is an
   exception to be thrown or a value to be returned with no further logic,
   perform that logic immediately rather than leaving it for an `else` clause.

   ```csharp
   // Good
   public void SomeMethod(ISomethingProvider somethingProvider)
   {
       // Check for known failure condition and exit quickly
       if (somethingProvider == null)
           throw new ArgumentNullException("somethingProvider");

       var things = _somethingElseProvider.GetThoseThings();
       …
   }

   // Bad
   public void SomeMethod(ISomethingProvider somethingProvider)
   {
       if (somethingProvider != null)
       {
           var things = _somethingElseProvider.GetThoseThings();
           … // Lots of logic here that a maintainer has to scroll through.
       }
       else
       {
           // This should be moved to the top of the method
           throw new ArgumentNullException("somethingProvider");
       }
   }
   ```

7. Do not use regions (i.e., `#region`).
8. Avoid the use of the `dynamic` keyword, particularly in code that executes
   frequently. Dynamic dispatch is very expensive and is rarely actually needed.
9. Avoid passing values around using `KeyValuePair<TKey, TValue>`, but if you
   do, use a name format like `{keyName}And{valueName}` to ease maintenance
   (e.g. use `schoolIdAndName` for an entry from a dictionary named
   `schoolNameById`).
10. Use explicit property name on anonymous types, and place each property on a
    separate line.

    ```csharp
    // Assuming there are a couple of objects being mapped into an anonymous type, call them "sourceA" and "sourceB", with various properties on them...

    // Avoid
    var a = { sourceA.Property1, sourceB.Property2 };

    // Instead use
    var a = {
        Property1 = sourceA.Property1,
        Property2 = sourceB.Property2
    };
    ```

11. When using ReSharper, it may occasionally be appropriate to suppress a
    warning, for example when using snake-case naming convention on tests.
    Prefer suppressing messages using the comment syntax rather
    than `[SuppressMessage]` , e.g. `// ReSharper disable InconsistentNaming`.
    Except for this obvious case of test names, these suppression comments
    should include a statement of why ReSharper analysis is being disabled, and
    the code reviewer should carefully consider whether the comment is indeed
    warranted.

:::info

Portions of this document are based on the
[Microsoft C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/inside-a-program/coding-conventions),
which have been reproduced and modified under the terms of the
[Creative Commons Attribution 4.0 International license](https://github.com/dotnet/docs/blob/master/LICENSE).
