# PowerShell Coding Standards

:::tip

For other important guidance, see also:

* [Coding Standards - General Principles](./README.md)

:::

## PowerShell Version

As of August, 2020, Ed-Fi Alliance PowerShell scripts use version 5.1. Newer
versions should only be used in clear consultation with the core development
team(s).

## Naming Conventions

1. **Use Approved Verbs for a Cmdlet Name**All cmdlet names should begin with
   one of the
   [Approved Verbs for PowerShell Commands](https://docs.microsoft.com/en-us/powershell/scripting/developer/cmdlet/approved-verbs-for-windows-powershell-commands?view=powershell-5.1).
   TIP: `Invoke` can be a useful catch-all when running a discrete "process",
   though the developer should look for a more appropriate verb before
   using `Invoke`.
2. **Use a Specific Noun for a Cmdlet Name** Nouns used in cmdlet naming need to
   be very specific so that the user can discover your cmdlets. Prefix generic
   nouns such as "server" with a shortened version of the product name. For
   example, if a noun refers to a server that is running an instance of
   Microsoft SQL Server, use a noun such as "SQLServer". The combination of
   specific nouns and the short list of approved verbs enable the user to
   quickly discover and anticipate functionality while avoiding duplication
   among cmdlet names.

   To enhance the user experience, the noun that you choose for a cmdlet name
   should be singular. For example, use the name `Get-Process`  instead of
   `Get-Processes`. It is best to follow this rule for all cmdlet names, even
   when a cmdlet is likely to act upon more than one item.

3. **Use Pascal Case for Cmdlet Names** Use Pascal case for parameter names. In
   other words, capitalize the first letter of verb and all terms used in the
   noun. For example, `Clear-ItemProperty`.
4. **Use Standard Parameter Names** Your cmdlet should use standard parameter
   names so that the user can quickly determine what a particular parameter
   means. If a more specific name is required, use a standard parameter name,
   and then specify a more specific name as an alias. For example, the
   `Get-Service` cmdlet has a parameter that has a generic name (`Name`) and a
   more specific alias (`ServiceName`). Both terms can be used to specify the
   parameter.

   For more information about parameter names and their data types, see
   [Cmdlet Parameter Name and Functionality Guidelines](https://docs.microsoft.com/en-us/powershell/scripting/developer/cmdlet/standard-cmdlet-parameter-names-and-types?view=powershell-5.1).

5. **Use Singular Parameter Names** Avoid using plural names for parameters
   whose value is a single element. This includes parameters that take arrays or
   lists because the user might supply an array or list with only one element.

   Plural parameter names should be used only in those cases where the value of
   the parameter is always a multiple-element value. In these cases, the cmdlet
   should verify that multiple elements are supplied, and the cmdlet should
   display a warning to the user if multiple elements are not supplied.

6. **Use Pascal Case for Parameter Names** Use Pascal case for parameter names.
   In other words, capitalize the first letter of each word in the parameter
   name, including the first letter of the name. For example, the parameter name
   `ErrorAction` uses the correct capitalization.

   The following parameter names use incorrect capitalization:

   * ~`errorAction`~

   * ~`erroraction`~

## Formatting

1. Exception to the general principle "write only one statement per line":
   piping output to another command. The following example has two statements:
   the output from the first is piped to the input of the second. This is
   acceptable.

   ```powershell
   # One-line version
   Get-Process | Sort-Object -Property handles

   # Multi-line version
   Get-Process |
    Sort-Object -Property handles
   ```

2. **Semicolons** Semicolons are not required, nor will they be rejected. Most
   Ed-Fi PowerShell scripts do not contain semicolons.
3. **Braces** Unlike C#, PowerShell's opening braces are usually at the end of a
   line. Closing braces are at the beginning of a line, except when passing
   small script blocks.

   ```powershell
   // Good
   if ($a -eq $b) {
       $c = $d;
   }

   // Bad
   if ($a -eq $b)
   {
    $c = $d;
   }

   // Reasonable exception
   $a | ForEach-Object { Write-Host $_ }
   ```

   1. Do not add blank lines between sets of of closing braces.

      ```ps1
      if ($a -eq $b) {
          if ($c -eq $d) {
              if ($e -eq $f) {
                  Invoke-Something
              }
          }

      } # Blank line above this brace should be removed.
      ```

   2. Include blank lines after closing braces as long as the next statement
      isn't part of a continuing language construct (e.g. if / else, try / catch
      / finally).

      ```powershell
      # Good
      function Set-ToCamelCase {
       param (
              [string]
              $text
          )

          if ([string]::IsNullOrWhiteSpace($text))
          {
              return $text
          }

          # Good place for a line break above, to separate following line
       # from the 'if' block.
          $char = [string]$text[0]

          return $char.ToLower($text[0]) + $text.Substring(1)
      }

      # Bad
      function Set-ToCamelCase {
       param (
              [string]
              $text
          )

          if ([string]::IsNullOrWhiteSpace($text))
          {
              return $text
          }
          $char = [string]$text[0]
          return $char.ToLower($text[0]) + $text.Substring(1)
      }
      ```

## Functions and Modules

1. **File Types** Use modules (`*.psm1`) for shared functions and scripts
   (`*.ps1`) to orchestrate processes. For more information on modules, see
   [How to Write a PowerShell Script Module](https://docs.microsoft.com/en-us/powershell/scripting/developer/module/how-to-write-a-powershell-script-module?view=powershell-5.1).
2. **FunctionExports** Add an export statement to the bottom of the module,
   exporting only the "public" functions.

   ```powershell
   # Only one function to export
   Export-ModuleMember -Function "New-ConnectionString"

   # A long-list of functions might be placed in array for readability
   $functions = @(
       "New-ConnectionString"
       "Test-IsPostgreSQL"
       "Set-DatabaseConnections",
       "Install-EdFiApplicationIntoIIS"
       "Set-AuthenticationSettings"
   )

   Export-ModuleMember -Function $functions
   ```

3. **Comment-based Help** Public module functions should have concise
   comment-based documentation, which will be displayed with the `Get-Help`
   command. For detailed information on the topic,
   see [Writing Help for PowerShell](https://docs.microsoft.com/en-us/powershell/scripting/developer/help/writing-help-for-windows-powershell-scripts-and-functions?view=powershell-5.1).
   Basic guidance:

   1. Place a comment block _inside_ the function definition, with, at minimum,
      a `SYNOPSIS`. Placing the block inside the function helps to ensure that
      it is not "left-behind" when moving the function around.

      ```ps1
      function Test-IsPostgreSQL {
          <#
          .SYNOPSIS
              Checks to see if the argument is for PostgreSQL
          #>

         ...
      }
      ```

   2. Prefer adding a longer description and one or more examples to that
      comment block.

      ```powershell
      function Test-IsPostgreSQL {
          <#
          .SYNOPSIS
              Checks to see if the argument is for PostgreSQL

          .EXAMPLE
              Test-IsPostgreSQL "postgres"

              returns $True

          .EXAMPLE
              Test-IsPostgreSQL "PostgreSQL"

              returns $True

          .EXAMPLE
              Test-IsPostgreSQL "SqlServer"

              returns $False
          #>

         ...
      }
      ```

   3. Prefer adding parameter comments directly above the parameter definition,
      so that it is easier to keep them in sync.

      ```powershell
          [Cmdletbinding()]
          param(
              # Database engine. Must be one of SqlServer, PostgreSQL, or Postgres (case insensitive)
              [string]
              [ValidateSet("PostgreSQL","Postgres", "SqlServer")]
              $Engine
          )
      ```

4. **Parameters That Take a List of Options** There are two ways to create a
   parameter whose value can be selected from a set of options.

   1. Define an enumeration type (or use an existing enumeration type) that
      specifies the valid values. Then, use the enumeration type to create a
      parameter of that type.

   2. Add the `ValidateSet` attribute to the parameter declaration. For more
      information about this attribute, see
      [ValidateSet Attribute Declaration](https://docs.microsoft.com/en-us/powershell/scripting/developer/cmdlet/validateset-attribute-declaration?view=powershell-5.1).

5. **Use Standard Types for Parameters**

   To ensure consistency with other cmdlets, use standard types for parameters
   where ever possible. For more information about the types that should be used
   for different parameter, see
   [Standard Cmdlet Parameter Names and Types](https://docs.microsoft.com/en-us/powershell/scripting/developer/cmdlet/standard-cmdlet-parameter-names-and-types?view=powershell-5.1).
   This topic provides links to several topics that describe the names and .NET
   Framework types for groups of standard parameters, such as the "activity
   parameters".

6. **Use Consistent Parameter Types** When the same parameter is used by
   multiple cmdlets, always use the same parameter type. For example, if
   the `Process` parameter is
   an `[System.Int16](https://docs.microsoft.com/en-us/dotnet/api/System.Int16)` type
   for one cmdlet, do not make the `Process` parameter for another cmdlet
   a `[System.Uint16](https://docs.microsoft.com/en-us/dotnet/api/System.UInt16)` type.

7. **Parameters That Take True and False** If your parameter takes
   only `true` and `false`, define the parameter as
   type [System.Management.Automation.SwitchParameter](https://docs.microsoft.com/en-us/dotnet/api/System.Management.Automation.SwitchParameter).
   A switch parameter is treated as `true` when it is specified in a command. If
   the parameter is not included in a command, Windows PowerShell considers the
   value of the parameter to be `false`. Do not define Boolean parameters.

   If your parameter needs to differentiate between three values: `$true` ,
   `$false`  and an "unspecified" value, then define a parameter of type
   `Nullable<bool>`. The need for a third, "unspecified" value typically occurs
   when the cmdlet can modify a Boolean property of an object. In this case,
   "unspecified" means to not change the current value of the property.

## Console Logging and User Feedback

1. Provide useful user feedback with `Write-Host`  and `Write-Error`  messages.

   :::tip

   Some PowerShell guides suggest that `Write-Output`  should be used instead
   of `Write-Host`. Alliance code, however, generally uses `Write-Host` so that
   output automatically displays on the console.

   :::

2. When calling an executable, display the call with arguments in Magenta.

   ```powershell
     $parameters = @(
       "pack",
       "edfi.fif.api.nuspec",
       "-version",
       $FullVersion
     )

     Write-Host "Executing: nuget.exe" @parameters -ForegroundColor Magenta
     &nuget.exe @parameters
   ```

3. Consider using other foreground colors where appropriate in scripts with
   large amounts of output.
   1. **Cyan.** Borders, parameter values.
   2. **Green.** Success messages.
   3. **DarkGray.** Verbose informational messages.
   4. **Yellow.** Warning messages.
   5. **Red.** Error messages (which are automatically Red when
      using `Write-Error`).

:::info

Portions of this document are based on
[Microsoft's Strongly Encouraged Development Guidelines](https://docs.microsoft.com/en-us/powershell/scripting/developer/cmdlet/strongly-encouraged-development-guidelines?view=powershell-5.1),
which have been reproduced and modified under the terms of the
[Creative Commons Attribution 4.0 International license](https://docs.microsoft.com/en-us/powershell/scripting/developer/cmdlet/strongly-encouraged-development-guidelines?view=powershell-7).

:::
