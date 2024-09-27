# Coding Standards - General Principles

## Introduction

Coding conventions serve the following purposes:

* They create a consistent look to the code, so that readers can focus on
    content, not layout.

* They enable readers to understand the code more quickly by making
    assumptions based on previous experience.

* They facilitate copying, changing, and maintaining the code.

* They demonstrate best practices.

The principles below broadly apply to all Ed-Fi source code. For
language-specific guidance, please see:

* [C# Coding
    Standards](./c-coding-standards.md)
  * [C# Best
        Practices](./c-best-practices.md)
* [SQL Coding
    Standards](./sql-coding-standards.md)
* [PowerShell Coding
    Standards](./powershell-coding-standards.md)
* [Markdown Best
    Practices](./markdown-best-practices.md)

## General Principles

1. The standards below are a guide, but they are not absolute. Violations of
    the standard can be accepted when two developers on the responsible team
    agree with the justification.
2. Readability is essential:
    1. Be consistent in style.
    2. Use empty lines and spaces appropriately.
    3. Use descriptive names and naming conventions at all times.
    4. Follow existing patterns unless there is a good reason not to do so (and
        justify that in the code review).
    5. Keep methods and classes short and to the point (i.e., adhere to the
        Single Responsibility Principle).
3. When making changes to an existing file, consider several small commits.
    Small commits can help a reviewer more easily understand the changes in the
    diff compared to a single large commit.
4. New language features can be very powerful, but can introduce confusion for
    both developers reading the code and systems that implement it. Be
    conservative about using new language features and consult with the
    development team before doing so.

## Layout Conventions

Good layout uses formatting to expose the structure of your code and to make the
code easier to read. Ed-Fi code conforms to the following conventions:

1. Set your Code Editor to use four-character indents and save tab characters
    as spaces.
2. Write only one statement per line.
3. Write only one declaration per line.

4. If continuation lines are not indented automatically, indent them one tab
    stop (i.e., four spaces).
5. Avoid more than one empty line at at time.
6. Limit the length of a line of code to about 100-110 characters to reduce
    unnecessary horizontal scrolling.
7. In source code repositories that are made available to the public under the
    terms of the Apache license, every file should begin with a license header.
    The example below uses C-style comments; substitute the correct commenting
    style for the language in use.

    **C# Example**

    ```csharp
    // SPDX-License-Identifier: Apache-2.0
    // Licensed to the Ed-Fi Alliance under one or more agreements.
    // The Ed-Fi Alliance licenses this file to you under the Apache License, Version 2.0.
    // See the LICENSE and NOTICES files in the project root for more information.
    ```

## Commenting Conventions

Use comments liberally to provide *useful context* for another developer to be
able to follow the intent and logic of the code. Explain *why*,
not *what.* Prefer using proper English sentences.

1. Place the comment on a separate line, not at the end of a line of code.

2. Prefer use of proper English sentences.
3. Insert one space between the comment delimiter  and the comment text, as
    shown in the following example.

    **C# Example**

    ```csharp
    // The following declaration creates a query. It does not run
    // the query.
    ```

    **SQL Example**

    ```sql
    -- The following declaration creates a query. It does not run
    -- the query.
    ```

4. Do not create formatted blocks of asterisks around comments.

5. Comments should have a blank line before and, at the very least, after the
    segment of code to which the comment applies (thus the line above the
    `ForEach` ).

    **C# Example**

    ```csharp
    var scores = _injectedService.GetScores();
     
    // Calculate the average
    int count = scores.Count;
    double sum = scores.Sum();
    double average = sum / count;
    
    scores.ForEach(x => Console.WriteLine(x.Average));
    ```

6. TODO comments should not be kept in the final code merge. If a change is
    being deferred for some reason, add the ID of the Tracker ticket in which
    the issue will be resolved:

    ```none
    # ODS-9876: needs better null handling
    ```

:::info

Portions of this document are based on the [Microsoft C# Coding
Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/inside-a-program/coding-conventions),
which have been reproduced and modified under the terms of the [Creative
Commons Attribution 4.0 International
license](https://github.com/dotnet/docs/blob/master/LICENSE).

:::
