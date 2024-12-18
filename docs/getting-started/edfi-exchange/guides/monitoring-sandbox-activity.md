# Monitoring Sandbox activity

During the stage of an implementation where different vendors and districts are interfacing with their own sandbox ODS instances, it can be challenging to track what resources have been submitted by which parties.  The attached script will loop through the ODS instances on a MS Sql Server database, and for each instance it will look at a collection of tables to see how many records have been submitted and when the latest submissions (either as updates or inserts) were. These results are sent to a temporary table, and at the end of the query the temporary table is deleted.

The first part of the query will do a collection of Ed-Fi tables. Edit the 'in' clause  to include what tables are pulled.

The second part of the query will look at extension tables. This section will not be relevant if there are not extensions.  The schema name will have to be updated to match the name of the schema for the extensions in the ODS>

Please note that this script will require elevated permissions in order to create and drop the temp table and query the system views to get a list of databases. It also can amount to a large number of SQL statements and could have a performance impact on an active sandbox database server. Use at your own risk.
