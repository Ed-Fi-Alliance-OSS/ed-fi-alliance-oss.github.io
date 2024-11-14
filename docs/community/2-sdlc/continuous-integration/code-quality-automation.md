---
description: Guidance for automating code quality checks.
---

# Code Quality Automation

## Introduction

All Ed-Fi source code should have a linter built in for detecting common style
bugs and enforcing style consistency. While these tools can sometimes be seen as
an annoyance, they frequently identify real problems in code; they train
developers in best practices; and they create a level playing field for all
contributors, regardless of experience with the language or with the project
norms.

Basic requirements for a project linter:

1. MUST: be configurable
2. MUST: be runnable at the command line
3. MUST: be runnable in GitHub Actions
4. MUST: be free to use
5. SHOULD: be integrated into common IDEs, or have equivalent replacements that
   use the same rules.

## C

Historically, the Alliance has relied on ReSharper for detecting common code
smells, style inconsistencies, and more. However, it does not meet the
requirements above for a good linter in several respects. Instead, the Alliance
is adopting a combination of two tools:

* Microsoft's
  [.NET compiler platform analyzers](https://docs.microsoft.com/en-us/dotnet/fundamentals/code-analysis/overview)
  (Roslyn), and
* [SonarLint](https://www.sonarlint.org) by SonarSource (makers of SonarQube),
  which builds on the Roslyn framework.

In combination with a [.editorconfig file](https://editorconfig.org/), these
tools provide robust analysis and reporting, whether from the command line,
Visual Studio, or Visual Studio Code.  Furthermore, the `.editorconfig` rules
provide the configuration needed to run the
[dotnet format](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-format)
command for automatic reformatting of source code files.

## Customization

The style rules can be tweaked by the Ed-Fi Tech Team with careful review. The
following articles are helpful in understanding the various options:

* [Analyze Configuration (Overview)](https://docs.microsoft.com/en-us/visualstudio/code-quality/use-roslyn-analyzers?view=vs-2022)
  * [Language Rules](https://docs.microsoft.com/en-us/dotnet/fundamentals/code-analysis/style-rules/language-rules)
  * [Naming Rules](https://docs.microsoft.com/en-us/dotnet/fundamentals/code-analysis/style-rules/naming-rules)
  * [Quality Rules](https://docs.microsoft.com/en-us/dotnet/fundamentals/code-analysis/quality-rules/)
* [SonarLint C# Rules](https://rules.sonarsource.com/csharp)

We **install these analyzers as NuGet package dependencies** in C# projects. For
each project:

```powershell
cd <project directory>
dotnet add package Microsoft.CodeAnalysis
dotnet add package Microsoft.CodeAnalysis.CSharp.CodeStyle
dotnet add package SonarAnalyzer.CSharp
```

:::note

To reduce scope of changes, it is recommended to apply this to one or a >small
number of projects at time; see migration plan below.

:::

Next, **copy the appopriate `.editorconfig` file and the `Directory.Build.props`
file from the
[DevSecOps/dotnet tools](https://github.com/Ed-Fi-Alliance-OSS/DevSecOps/tree/main/dotnet)**.
Paste them into the same directory as the **solution file**. If there is already
a build props file, update it to include the extra two lines in this sample
(treating warnings as errors, and outputting a sarif log file).

Finally, for open source projects, adjust the GitHub Actions build configuration
by adding step(s) to upload sarif log file into the CodeQL results. This will
integrate any build failure messages into GitHub for easy viewing. This feature
requires a substantially more expensive license for the closed source
repositories and thus will not be used.

:::warning

SonarLint provides extensions ([VS Code](https://www.sonarlint.org/vscode/),
[Rider](https://www.sonarlint.org/jetbrains/)) that are supposed to provide good
integration with these tools; however, your author's experience was that the VS
Code extension literally did nothing, out of the box.

:::

### Example Output

When you run msbuild at the command line, warnings will now  be treated as
errors - thus causing the build to fail, and giving us strict enforcement.

```powershell
...
Build FAILED.

C:\source\ed-fi\ed-fi-ods-implementation\Application\EdFi.Ods.SandboxAdmin\Controllers\Api\SandboxControll
er.cs(13,18): error S101: Rename class 'SandboxDTO' to match pascal case naming rules, consider using 'San
dboxDto'. [C:\source\ed-fi\ed-fi-ods-implementation\Application\EdFi.Ods.SandboxAdmin\EdFi.Ods.SandboxAdmi
n.csproj]
    0 Warning(s)
    1 Error(s)

Time Elapsed 00:00:46.71
```

### Disabling Warnings

Most of the recommendations should be followed closely. However, there will be
cases where the code cannot be changed, it is impractical to test the change, or
we simply have a well-reasoned disagreement. Within Visual Studio it is easy to
right-click on the problem and "disable it". Please put in a custom comment
explaining why the issue is not being dealt with. The code reviewer should
inspect that line of reasoning; if there is disagreement, then ask a third
person to join the conversation. In the following example, the comment starts
with the code smell "Types should be named in PascalCase", and continues with
our own comment explaining why we disabled the warning.

```csharp
#pragma warning disable S101 // Types should be named in PascalCase, however, uppercase is preferred for acronyms such as "DTO"
    public class SandboxDTO
#pragma warning restore S101 // Types should be named in PascalCase
```

:::tip

It is not too difficult to deal with this in Visual Studio Code or Rider as
well, even if you don't have the integrated IDE controls: simply wrap
`pragma warning disable CODE`  and `pragma warning restore CODE`  around the
line of source code, using the proper error code. Look carefully at the error
message above and you'll see code "S101". The "S" prefix tells you that this is
a Sonar warning, rather than a built-in C# warning. You can search on that code
to find more information, or just modify the following URL to have the desired
numeric portion of the code:
[https://rules.sonarsource.com/csharp/RSPEC-101](https://rules.sonarsource.com/csharp/RSPEC-101)

:::

## Migration Plan

If a repository has more than 2-3 projects, then introducing these rules and
updating the code to correct the warnings will take some time to code, test, and
review. Thus it is recommended to introduce the analyzers to only 2-3 projects -
or, only a single project if it has many files (e.g. `EdFi.Ods.Api`).

After adding the analyzers, `.editorconfig` , and `Directory.Build.props` , it
may be useful to run the `dotnet format`  command on the _projects_ (not the
entire solution) as a first step, and commit just those file changes. Please
note that many files will experience what will look like strange churn, due to
changes at the top and bottom of the file:

* this will strip out a UTF byte order mark (BOM), if present
* and it will ensure there is an extra line break at the end of the file, which
  helps view the file correctly in Unix-like environments.

## Proof-of-Concept Spikes

The following pull requests show proof-of-concept spikes in several different
repositories. Note that the Data Import spike is in a closed source repo and
only a small number of developers can access it.

* [Analytics-Middle-Tier](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Analytics-Middle-Tier/pull/215)
  * this includes integration of Sarif log files into CodeQL.
* [Ed-Fi-ODS-Implementation](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-ODS-Implementation/pull/463)
* [Data-Import](https://github.com/Ed-Fi-Closed/Ed-Fi-DataImport/pull/365)

## JavaScript and TypeScript

JavaScript has long had excellent tools for style and rule enforcement.
Following the lead of the MetaEd project, JavaScript and TypeScript projects
must use

1. the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript),
   and enforce that style with [ESLint](https://eslint.org/) using Airbnb's
   rules
   in [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb).
2. [Prettier](https://prettier.io/) for code formatting and enforce that via
   ESLint using `eslint-plugin-prettier`  and `eslint-config-prettier` .

**Install the following packages as dev dependencies:**

* `@types/eslint`
* `@typescript-eslint/eslint-plugin`
* `@typescript-eslint/parser`
* `eslint`
* `eslint-config-airbnb-base`
* `eslint-config-prettier`
* `eslint-config-typescript`
* `eslint-plugin-import`
* `eslint-plugin-jasmine`
* `eslint-plugin-json`
* `eslint-plugin-prettier`
* `prettier`

**And then add copy the appropriate configuration files from
[DevSecOps/JavaScript tools](https://github.com/Ed-Fi-Alliance-OSS/DevSecOps/tree/main/javascript)\*\***.\*\*

## Python

Like JavaScript, the Python community has a long history of good tooling.
Following the lead of the LMS Toolkit project, other Python code must use:

1. [Flake8](https://flake8.pycqa.org/en/latest/) for style enforcement
2. [MyPy](http://mypy-lang.org/) for type checking
   1. [Pylance in VS Code](https://marketplace.visualstudio.com/items?itemName=ms-python.python&WT.mc_id=devcloud-00000-cxa)
      will follow the same configuration
3. [Black](https://black.readthedocs.io/en/stable/) for formatting

**Install the following packages as dev dependencies:**

* `flake8`
* `mypy`
* `black`

**And then add copy the appropriate configuration files from
[DevSecOps/Python tools](https://github.com/Ed-Fi-Alliance-OSS/DevSecOps/tree/main/python)\*\***.\*\*

## PowerShell

For PowerShell, we can use the
[PSScriptAnalyzer](https://docs.microsoft.com/en-us/powershell/module/psscriptanalyzer/?view=ps-modules)
to review the scripts and modules.

To do so, clone:
[powershell-analyzer](https://github.com/Ed-Fi-Alliance-OSS/Ed-Fi-Actions/tree/main/powershell-analyzer)
and run `analyze.ps1`

This script takes different options as parameters, the required parameter is the
`-Directory` where you can specify a file or a folder, and this will review the
file or folder and subfolders included.

The flag `-SaveToFile` defines if it should only print the results into the
console or save to a [SARIF](https://sarifweb.azurewebsites.net/) file. The
SARIF file can be viewed in VSCode with an
[extension](https://marketplace.visualstudio.com/items?itemName=MS-SarifVSCode.sarif-viewer).

Additionally, you can specify the path where to save the results in the
`-ResultsPath` parameter or specify a comma separated list of rules to be
excluded with the `-ExcludedRules` parameter.

Example:

```powershell
.\analyze.ps1 -Directory "Ed-Fi-ODS-AdminApp\eng\send-test-results.ps1" -SaveToFile $False -ExcludedRules PSReviewUnusedParameter, PSAvoidUsingWriteHost
```

If a warning should be ignored, annotate your class or function with the
following:

`[Diagnostics.CodeAnalysis.SuppressMessageAttribute('PSUseDeclaredVarsMoreThanAssignments', 'unused', Justification = 'False positives')]`

[List of PowerShell Rules](https://learn.microsoft.com/en-us/powershell/utility-modules/psscriptanalyzer/rules-recommendations?view=ps-modules)
