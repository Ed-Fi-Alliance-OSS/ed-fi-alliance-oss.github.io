# What Does it Mean to Build an Ed-Fi Integration?

:::warning Audience Note
From this section on, the content is mostly technical. This info applies to software developers and business analysts doing the work of building integration functionality using Ed-Fi's standards.
:::

## Push model

The Ed-Fi API is a "push" model for data flow, and not a "pull" model where the data provider (you) stands up or "publishes" an API.  This model is intended to be near real time, meaning it is important that the data is pushed quickly, versus waiting a long time to send.  If you are an assessment vendor this "push" model may not work for you - you can look at [Assessment Providers: Data PULL Model](../specifics-by-provider-type/assessment-providers/assessment-providers-implementation/assessment-providers-data-pull-model.md) to learn more about an alternate approach.

![push model diagram](https://edfi.atlassian.net/wiki/download/thumbnails/22907299/figure2.png?version=1&modificationDate=1659385195573&cacheVersion=1&api=v2&width=300&height=106)

## Data mapping

The first step in building an Ed-Fi integration is to understand how the information in your application maps to the Ed-Fi Data Standard. There is likely already some overlap, for example both systems may use the term student. However, there may be semantic differences. For example, you may refer to a student's overall attendance for a specific date as their daily attendance where as the Ed-Fi Data Standard refers to this as the student's school attendance event. During this phase you are encouraged to reach out to the Ed-Fi Alliance for feedback on your data mapping.

![vendor process diagram](https://edfi.atlassian.net/wiki/download/thumbnails/22907299/Vendor%20Process.png?version=1&modificationDate=1659367987197&cacheVersion=1&api=v2&width=750&height=188)

## Ed-Fi API client

After you've created your mapping, the technical work begins. Data from your system will be sent to an education agency's Ed-Fi API using the mapping you created. You will need to track when data in your source system and used by your Ed-Fi integration is created, updated, or deleted so that your API client can make the appropriate API calls to the education agency's Ed-Fi API.

Technology stacks vary greatly. Some use relational databases (SQL Server, PostgreSQL, Oracle, etc) while others use document-oriented databases such (MongoDB, etc). Some will follow monolithic application patterns while others are more micro-service focused. From the technical side, there is no one way to build an Ed-Fi API client. The sections below are meant to communicate various best practices seen in the community. You may find yourself using some of the patterns below in your work or not.

### Query-based Ed-Fi API payloads

If your application's database tables contain an updated\_at or similar column that uses a timestamp to track the time a record was created or updated, you may be able to take a query based approach to your Ed-Fi sync. It is recommended to run these queries on a read-replica of the production database to not put strain on the main production system.

The query below queries an application's database tables to build out a `/ed-fi/studentSchoolAssociations` payload. Note this query only retrieves records that have been updated since the last Ed-Fi sync.

```sql
with records as (

    select
        enrollment.school_enter_date                                     as entryDate,
        json_build_object('schoolId', enrollment.school_id)              as schoolReference,
        json_build_object('studentUniqueId', student.local_student_id)   as studentReference,
        code_table.descriptor_value                                      as entryGradeLevelDescriptor
    from enrollment
    left join student on enrollment.student_id = student.id
    left join code_table
        on enrollment.enter_grade_level = code_table.grade_level
        and code_table.category = 'grade_level_descriptors'
    where enrollment.updated_at > date 'TIMESTAMP_LAST_RUN'

)

select row_to_json(records) from records
```

The query above will return all records created or updated since the last time an Ed-Fi sync has occurred. Here is what a row of data looks like:

```json
{  "entryDate": "2021-09-02", "schoolReference": { "schoolId": 1234 }, "studentReference": {  "studentUniqueId": "40670327" } }
```

The row of data above is exactly what the `/ed-fi/studentSchoolAssociations` expects and can be sent without any additional transformation.

### Transaction table

An Ed-Fi transaction table that logs various pieces of information every time an API call is made can help helpful towards knowing what has been sent to an Ed-Fi API. Below is an example of what a record in the table would look like after sending the API payload in the example above.

| Table column name | Sample value |
| --- | --- |
| Ed-Fi API endpoint name | studentSchoolAssociations |
| Natural keys | ```json {"entryDate": "2021-09-02", "schoolReference": { "schoolId": 1234 },  "studentReference": {  "studentUniqueId": "40670327" }}``` |
| Ed-Fi API ID | 12546a2c3c7b5485f93310d432dd55afb |
| Natural keys hash | wR6EK1uJRDyAr11k496kWQ== |
| Is deleted | False |
| Last modified date | 2022-06-06T22:23:28Z |

### Updated natural keys and deletes

The "Query-based Ed-Fi API payloads" section above looked at tracking when a record has changed and needs to be updated on an education agency's Ed-Fi API. If a record has been updated, but the has of the natural keys has not changed, you can safely POST the updated record to the Ed-Fi API endpoint.

However, if a natural key has changed, the existing record must be deleted and a new record sent. Adding some more complexity, you will also need to know when records in the application database are deleted and thus, deletes need to be sent to the Ed-Fi API. The SQL query above will only return a record when a payload has changed. It’s not going to surface deletes.

You have at least two options here and deciding which one to use will depend on how your application database is structured. If the application database supports soft deletes, you can continue using only the SQL query approach for the Ed-Fi sync. The SQL query above can be expanded to return records that have been deleted. When a record has been deleted, the natural keys will be hashed, looked up in the transaction table to retrieve the Ed-Fi API, and a DELETE would be run on the appropriate endpoint.

However, it is also common for applications to allow for hard deletes. When hard deletes are allowed in an application database, there needs to be a process to track deletes. This process will look different depending on the RDBMS used by the vendor.

Microsoft SQL Server has a feature, Change Tracking, that can be enabled on specific tables in a database where you want to track when rows have been created, updated, or deleted. A read-replica is still recommended to reduce strain on the main production system. This will surface when a record has been deleted from the application database and thus needs to be deleted on the Ed-Fi API.

More broadly, databases frequently support the use of triggers. Triggers are stored procedures that are run when certain actions (create, update, delete) are taken on a table and can be configured to run before or after an event occurs. In this example, a vendor would create a trigger on their database to store the natural keys before the delete action is taken. This would allow the vendor to run a sync step where they hash the keys, lookup the Ed-Fi API ID in the transaction table, and delete the record from the target Ed-Fi API.
