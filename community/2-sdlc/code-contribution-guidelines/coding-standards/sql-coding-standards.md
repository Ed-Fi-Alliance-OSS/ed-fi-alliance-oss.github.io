# SQL Coding Standards

:::tip

For other important guidance, see also:

* [Coding Standards - General Principles](./README.md)

:::

## Naming Conventions

Many projects have more detailed and specific naming conventions. Please review
existing files and consult with the product owner when in doubt. For Analytics
Middle Tier, please consult the [AMT Standards and
Guidelines](https://edfi.atlassian.net/wiki/spaces/EDFITOOLS/pages/24118129/AMT+Standards+and+Guidelines).

1. SQL object names should use Pascal case.

    ```sql
    -- Good
    create view dbo.MyViewName
    
    -- Bad
    create view dbo.my_view_name ...
    create view dbo.myViewName ...
    create view dbo.[my view name] ...
    ```

2. Do not use quoted-strings to enforce the Pascal case naming convention in
   PostgreSQL code

    ```sql
    -- Good
    create view dbo.MyView
    -- (!) it is acceptable that PostgreSQL will treat this as 'dbo.myview'
    
    -- Bad
    create view dbo."MyView"
    ```

3. Object names must be restricted to 63 characters or fewer due to the name
   length restriction in PostgreSQL.
4. Use singular nouns, as a table by definition already implies that there are
   (or could be) multiple records.

    ```sql
    -- Good
    create table dbo.User
    
    -- Bad
    create table dbo.Users
    ```

## Language Conventions

### Data Types

| Conceptual Type           | SQL Server Type                     | PostgreSQL Type         | Notes                                                                                            |
| ------------------------- | ----------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------ |
| ​String                   | `NVARCHAR(size)​`                   | `VARCHAR(size)`​        | Don't just default to `MAX`/unbounded strings - use an appropriate length for the expected data. |
| Dates                     | `DATETIME` or `DATETIME2` as needed | `TIMESTAMP`             | Avoid `TIMESTAMPTZ` on PostgreSQL because the source data generally do not include time zone.    |
| Guids                     | `UNIQUEIDENTIFIER`                  | `UUID`                  |                                                                                                  |
| Booleans                  | `BIT`                               | `BOOL`                  |                                                                                                  |
| Auto-incrementing numbers | INT IDENTITY or LONG IDENTITY       | `serial` or `BIGSERIAL` |                                                                                                  |

## Readability Preferences

1. Joins should include the word "INNER" or "OUTER" for maximum clarity.
2. Avoid aliasing, where possible. Aliases make the reader work harder to
   understand the query. However, there will be times when aliases are required,
   for example when needing to join twice to the same table. Very long table
   names can sometimes benefit from a reasonable alias as well, to keep line
   lengths from becoming excessive.

## SQL Language

1. Where possible, utilize ANSI-SQL for maximum portability between SQL Server
   and PostgreSQL:
    1. Do not use identifier quoting — either `[...]`  or `"..."` .
    2. Prefer the `COALESCE` function over `ISNULL`  when replacing a null value
       with a concrete value.
2. Make sure that search terms are
   [SARGable](https://www.sqlshack.com/how-to-use-sargable-expressions-in-t-sql-queries-performance-advantages-and-examples/)
   in joins and WHERE clauses: don't use put a search term inside a function.
   Examples:

    ```sql
    -- Bad
    WHERE coalesce(table1.Column1, '') = ''
    -- Good
    WHERE table1.Column1 IS NULL or table1.Column1 = ''
    
    -- Bad (SQL Server)
    WHERE YEAR(table1.Column1) = 2019
    -- Bad (PostgreSQL)
    WHERE EXTRACT(YEAR from table1.Column1) = 2019
    -- Good (both engines)
    WHERE table.Column1 BETWEEN '2019-01-01' AND '2019-12-31
    ```

## PostgreSQL Scripting

When writing scripts for PostgreSQL, including stored procedures, use the
**PL/pgSQL** language.

## Formatting

Formatting need not be a strict exercise — adherence to absolute precision in
SQL scripts, where various tools have differing (or no) ability to help format a
file, is difficult to achieve. The code reviewer should ensure that the file is
readable and meets at least the *spirit* of the following *preferences*.

1. Place the `CREATE` statement on a line by itself.
2. For the keywords `WITH` , `SELECT`, `FROM`, `WHERE` , `GROUP BY` , `HAVING`:
    1. Each should be on a line by itself.
    2. Indent once *except when part of a CTE or sub-query.*
3. Within each clause:
    1. Each column or condition should be on a line by itself.
    2. Indent twice (preferably 4 spaces rather than tab character).
    3. This includes joins.
4. In the `ON` clause for joins:
    1. Each criteria should be on a line by itself.
    2. Each criteria should have an additional indentation.
5. Case does not matter — but should be consistent within a query.

### Example: Poor Formatting

```sql
CREATE VIEW 
[analytics].[UserDimension] AS

SELECT  [Staff].[StaffUSI] as [UserKey],
  [StaffElectronicMail].ElectronicMailAddress as [UserEmail],
  ( SELECT 
    MAX([LastModifiedDate])
   from (VALUES ([Staff].[LastModifiedDate])
      -- [StaffElectronicMail] does not have a [LastModifiedDate]
      ,([StaffElectronicMail].[CreateDate])
      ,([ElectronicMailType].[LastModifiedDate])
     ) as value([LastModifiedDate])
  ) as [LastModifiedDate]
 FROM [edfi].[Staff]
 join [edfi].[StaffElectronicMail] ON  [Staff].[StaffUSI] = [StaffElectronicMail].StaffUSI
 JOIN [edfi].[ElectronicMailType] ON [StaffElectronicMail].[ElectronicMailTypeId] = [ElectronicMailType].[ElectronicMailTypeId]
 WHERE [ElectronicMailType].[CodeValue] = 'Work'
```

Problems with this example:

* Need to bring the create statement onto one line.
* The `SELECT` keyword should be indented.
* First column in select statement is on the same line as `SELECT`.
* Mix of case in the SQL keywords (e.g., `SELECT` and `from` are inconsistent).
* Preference to include keyword `INNER` on the joins.
* Join conditions must be separated.
* The `WHERE` condition should be on a line by itself.

### Example: Improved Formatting

```sql
CREATE VIEW analytics.UserDimension AS

 SELECT 
  Staff.StaffUSI as UserKey,
  StaffElectronicMail.ElectronicMailAddress as UserEmail,
  ( SELECT 
    MAX(LastModifiedDate)
   FROM (VALUES (Staff.LastModifiedDate)
      -- StaffElectronicMail does not have a LastModifiedDate
      ,(StaffElectronicMail.CreateDate)
      ,(ElectronicMailType.LastModifiedDate)
     ) as value(LastModifiedDate)
  ) as LastModifiedDate
 FROM 
        edfi.Staff
 INNER JOIN 
        edfi.StaffElectronicMail 
    ON 
     Staff.StaffUSI = StaffElectronicMail.StaffUSI
 INNER JOIN 
        edfi.ElectronicMailType
    ON 
     StaffElectronicMail.ElectronicMailTypeId = ElectronicMailType.ElectronicMailTypeId
 WHERE 
  ElectronicMailType.CodeValue = 'Work'
```
