# How To: Enable Cascading Updates on ODS / API Resources

The Ed-Fi ODS SQL Server data store allows for the configuration of Cascading
Updates on entities. Cascading Update specifies that if an update is made to a key
value in a data row where the key value is referenced by foreign keys, then all
existing foreign key values are updated to the new key value.¹

The following ODS / API resources are already configured for Cascading Updates
in the as-shipped solution:

* Class Period
* Grade
* GradebookEntry
* Location
* Section
* Session
* Student School Association
* Student Section Association

As an illustrative example, the Grade table has an association to Student
Section that is updated whenever the Student Section Association changes. The Grade
table declarations have the following SQL:

```sql
ALTER TABLE [edfi].[Grade] ADD CONSTRAINT [FK_Grade_StudentSectionAssociation]
    FOREIGN KEY ([StudentUSI], [SchoolId], [ClassPeriodName], [ClassroomIdentificationCode], [LocalCourseCode], [UniqueSectionCode], [SequenceOfCourse], [SchoolYear], [TermDescriptorId], [BeginDate])
    REFERENCES [edfi].[StudentSectionAssociation]([StudentUSI], [SchoolId], [ClassPeriodName], [ClassroomIdentificationCode], [LocalCourseCode], [UniqueSectionCode], [SequenceOfCourse], [SchoolYear], [TermDescriptorId], [BeginDate])
    ON UPDATE CASCADE
```

## Configuration Steps

Some implementers will find it useful to enable Cascading Updates on additional
resources. To configure Cascading Updates on a resource, modify the 0030-ForeignKeys.sql file that enables the `ON UPDATE CASCADE` syntax on the foreign keys that reference the base table's primary key.

For an example of how this is done, see the code snippets related to the Grade
resource, above.

---

¹ For more details on Table Cascading Updates, see [here](https://technet.microsoft.com/en-us/library/ms188066(v=sql.110).aspx).
