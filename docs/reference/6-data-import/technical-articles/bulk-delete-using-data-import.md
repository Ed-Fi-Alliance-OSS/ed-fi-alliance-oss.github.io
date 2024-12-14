# Bulk Delete using Data Import

Beginning with [v2.2](https://edfi.atlassian.net/wiki/pages/viewpage.action?pageId=24119656#What%27sNewinDataImport(2.2precopy)-What%27sNewinDataImportv2.1) the Data Import tool has the capability to bulk delete resources from csv files. This functionality is supported in two ways, **delete by Id** and **delete by natural key**. If you have access to the primary key `Id` of the resources you wish to delete, deleting by Id is simpler and faster. However, if you do not have access to that data, you can easily map to the natural key members of the resource you wish to delete.

_Please note:_  the delete functionality is destructive to ODS / API data by design, please ensure database backups and other protections are in place to meet implementation expectations.

# Step 1: Create a DELETE Data Map

## Option1: Create a DELETE By Id Data Map

When creating a new Data Map you have the option to create a DELETE Map. Check the checkbox indicating **This is a DELETE Map** and make sure the radio **Delete by Id** is selected.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/image-2023-12-28_11-50-42.png)

Upload a csv file having a column that maps to the `Id` of the resource you wish to delete. In the **CSV Fields** section you will only have one field to map - whichever field in your csv maps to the Resources `Id` .

Save your Data Map.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/image-2023-12-28_11-44-35.png)

## Option 2: Create a DELETE by Natural Key Data Map

When creating a new Data Map you have the option to create a DELETE Map. Check the checkbox indicating **This is a DELETE Map** and make sure the radio **Delete by natural key** is selected.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/image-2023-12-28_11-49-15.png)

Upload a csv file that has at a fields for the required parts of the natural key. In the **CSV Fields** section, you will be prompted to map your source data to the fields that make up the natural key of your resource. All fields are required. When your map is complete, press **Save**.

![](https://edfidocs.blob.core.windows.net/$web/img/reference/data-import/technical-articles/image-2023-12-28_11-52-8.png)

# Step 2: Create an Agent that uses your newly created DELETE Map

Create an agent as usual. Choose the DELETE Data Map you created above when saving the agent.

# Step 3: Upload a csv file with the resources you wish to bulk delete

This step is performed the same as with the usual Insert / Update data import functionality.

**WARNING: The delete operations performed by the tool are permanent. You will not be prompted to preview, cancel or undo any deletes issued by the Data Import tool. Use with caution and always operate with a backup mechanism in place.**
